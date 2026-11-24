<?php

declare(strict_types=1);

namespace Drupal\observatory_trace;

use Drupal\Core\DestructableInterface;
use Drupal\Core\Database\Event\StatementExecutionEndEvent;
use Drupal\Core\Database\Event\StatementExecutionFailureEvent;
use Drupal\Core\Routing\RouteObjectInterface;
use Drupal\Core\State\StateInterface;
use OpenTelemetry\API\Common\Time\Clock;
use OpenTelemetry\API\Trace\Propagation\TraceContextPropagator;
use OpenTelemetry\API\Trace\SpanInterface;
use OpenTelemetry\API\Trace\SpanKind;
use OpenTelemetry\API\Trace\StatusCode;
use OpenTelemetry\API\Trace\TracerInterface;
use OpenTelemetry\Context\Context;
use OpenTelemetry\Contrib\Otlp\ContentTypes;
use OpenTelemetry\Contrib\Otlp\OtlpHttpTransportFactory;
use OpenTelemetry\Contrib\Otlp\SpanExporter;
use OpenTelemetry\SDK\Common\Attribute\Attributes;
use OpenTelemetry\SDK\Resource\ResourceInfo;
use OpenTelemetry\SDK\Trace\Sampler\AlwaysOnSampler;
use OpenTelemetry\SDK\Trace\Sampler\ParentBased;
use OpenTelemetry\SDK\Trace\SpanProcessor\BatchSpanProcessor;
use OpenTelemetry\SDK\Trace\TracerProvider;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Records one server span per main request, with database statement spans.
 *
 * Uses the OpenTelemetry SDK that Drupal core already requires for
 * development (open-telemetry/sdk, open-telemetry/exporter-otlp). Tracing is
 * on only when an OTLP/HTTP endpoint is set, in this order:
 * - the OTEL_EXPORTER_OTLP_ENDPOINT environment variable;
 * - the state value observatory_trace.otlp_endpoint.
 * OTEL_SDK_DISABLED=true turns it off whatever the endpoint.
 *
 * Never recorded as attributes: the URL path (one-time login links carry
 * tokens in it; the route pattern is recorded instead), request or response
 * headers, cookies, bodies, query strings, or database statement arguments.
 * Spans do hold statement text with placeholders, exception messages and
 * code locations, so the trace store is private test evidence, not something
 * to publish. Exception messages can contain URLs: Symfony's 404 message
 * names the request URL and the Referer header.
 */
class RequestTracer implements DestructableInterface {

  /**
   * The state key that holds the OTLP/HTTP endpoint.
   */
  public const STATE_ENDPOINT = 'observatory_trace.otlp_endpoint';

  /**
   * The state key that holds the tested source commit, if the runner sets it.
   */
  public const STATE_COMMIT = 'observatory_trace.source_commit';

  /**
   * The tracer provider for this request, once tracing has started.
   */
  protected ?TracerProvider $provider = NULL;

  /**
   * The tracer for this request.
   */
  protected ?TracerInterface $tracer = NULL;

  /**
   * The span for the main request.
   */
  protected ?SpanInterface $rootSpan = NULL;

  public function __construct(
    protected readonly StateInterface $state,
  ) {}

  /**
   * Returns the OTLP/HTTP base endpoint, or NULL when tracing is off.
   */
  public function endpoint(): ?string {
    if (filter_var(getenv('OTEL_SDK_DISABLED'), FILTER_VALIDATE_BOOL)) {
      return NULL;
    }
    if (!class_exists(TracerProvider::class) || !class_exists(SpanExporter::class)) {
      // The OpenTelemetry SDK is a development dependency of core. Without
      // it this module does nothing.
      return NULL;
    }
    $endpoint = getenv('OTEL_EXPORTER_OTLP_ENDPOINT') ?: $this->state->get(self::STATE_ENDPOINT);
    if (!is_string($endpoint) || !preg_match('#^https?://#', $endpoint)) {
      return NULL;
    }
    return rtrim($endpoint, '/');
  }

  /**
   * Whether a request span is open.
   */
  public function isRecording(): bool {
    return $this->rootSpan !== NULL;
  }

  /**
   * Starts the server span for a main request, if tracing is configured.
   */
  public function start(Request $request): void {
    $endpoint = $this->endpoint();
    if ($endpoint === NULL || $this->rootSpan !== NULL) {
      return;
    }
    // Export anything left from an earlier main request in this process.
    $this->destruct();
    $attributes = [
      'service.name' => 'drupal',
      'service.version' => \Drupal::VERSION,
      'deployment.environment.name' => 'test',
      'process.runtime.name' => 'php',
      'process.runtime.version' => PHP_VERSION,
    ];
    $commit = $this->state->get(self::STATE_COMMIT);
    if (is_string($commit) && preg_match('/^[0-9a-f]{40}$/', $commit)) {
      $attributes['vcs.ref.head.revision'] = $commit;
    }
    // A short timeout and no retries: a missing collector must not slow the
    // site down more than once per request.
    $transport = (new OtlpHttpTransportFactory())->create($endpoint . '/v1/traces', ContentTypes::JSON, [], NULL, 1.0, 100, 0);
    // autoFlush is off, so spans are exported once, after the response is sent.
    $processor = new BatchSpanProcessor(new SpanExporter($transport), Clock::getDefault(), 8192, 5000, 2000, 8192, FALSE);
    $this->provider = new TracerProvider(
      $processor,
      new ParentBased(new AlwaysOnSampler()),
      ResourceInfo::create(Attributes::create($attributes)),
    );
    $this->tracer = $this->provider->getTracer('drupal.observatory_trace');

    // Continue the caller's trace if it sent W3C Trace Context headers.
    $carrier = array_filter([
      'traceparent' => $request->headers->get('traceparent'),
      'tracestate' => $request->headers->get('tracestate'),
    ]);
    // The root context is passed explicitly everywhere: Drupal renders inside
    // PHP Fibers, where reading the current OpenTelemetry context warns.
    $parent = TraceContextPropagator::getInstance()->extract($carrier, NULL, Context::getRoot());

    $start = $request->server->get('REQUEST_TIME_FLOAT');
    $builder = $this->tracer->spanBuilder($request->getMethod())
      ->setSpanKind(SpanKind::KIND_SERVER)
      ->setParent($parent)
      ->setAttribute('http.request.method', $request->getMethod())
      ->setAttribute('url.scheme', $request->getScheme());
    if (is_numeric($start)) {
      $builder->setStartTimestamp((int) ($start * 1e9));
    }
    $this->rootSpan = $builder->startSpan();
  }

  /**
   * Records a finished or failed database statement as a child span.
   */
  public function recordStatement(StatementExecutionEndEvent $event, string $driver): void {
    if ($this->tracer === NULL || $this->rootSpan === NULL) {
      return;
    }
    $operation = strtoupper(strtok(ltrim($event->queryString), " \n\t(") ?: 'UNKNOWN');
    $builder = $this->tracer->spanBuilder($operation)
      ->setSpanKind(SpanKind::KIND_CLIENT)
      ->setParent($this->rootSpan->storeInContext(Context::getRoot()))
      ->setStartTimestamp((int) ($event->startTime * 1e9))
      ->setAttribute('db.system.name', $driver)
      ->setAttribute('db.namespace', $event->key . '.' . $event->target)
      ->setAttribute('db.operation.name', $operation)
      // Placeholders only; $event->args is never recorded.
      ->setAttribute('db.query.text', $event->queryString);
    if (isset($event->caller['function'])) {
      $function = isset($event->caller['class']) ? $event->caller['class'] . '::' . $event->caller['function'] : $event->caller['function'];
      $builder->setAttribute('code.function.name', $function);
    }
    $span = $builder->startSpan();
    if ($event instanceof StatementExecutionFailureEvent) {
      $span->setStatus(StatusCode::STATUS_ERROR, $event->exceptionClass);
      $span->setAttribute('error.type', $event->exceptionClass);
    }
    $span->end((int) ($event->time * 1e9));
  }

  /**
   * Records an exception on the request span.
   */
  public function recordException(\Throwable $exception): void {
    $this->rootSpan?->recordException($exception);
  }

  /**
   * Ends the request span and adds the traceresponse header.
   */
  public function finish(Request $request, Response $response): void {
    if ($this->rootSpan === NULL) {
      return;
    }
    $span = $this->rootSpan;
    $status = $response->getStatusCode();
    $span->setAttribute('http.response.status_code', $status);
    $route = $request->attributes->get(RouteObjectInterface::ROUTE_OBJECT);
    if ($route !== NULL && method_exists($route, 'getPath')) {
      $span->setAttribute('http.route', $route->getPath());
      $span->updateName($request->getMethod() . ' ' . $route->getPath());
    }
    $routeName = $request->attributes->get(RouteObjectInterface::ROUTE_NAME);
    if (is_string($routeName)) {
      $span->setAttribute('drupal.route.name', $routeName);
    }
    foreach (['X-Drupal-Cache' => 'drupal.page_cache', 'X-Drupal-Dynamic-Cache' => 'drupal.dynamic_page_cache'] as $header => $attribute) {
      if ($response->headers->has($header)) {
        $span->setAttribute($attribute, (string) $response->headers->get($header));
      }
    }
    // Server errors only: a 4xx response is the client's error (OpenTelemetry
    // HTTP semantic conventions).
    if ($status >= 500) {
      $span->setStatus(StatusCode::STATUS_ERROR);
    }
    $context = $span->getContext();
    // W3C Trace Context Level 2 draft, traceresponse header:
    // https://www.w3.org/TR/trace-context-2/#traceresponse-header
    $response->headers->set('traceresponse', sprintf('00-%s-%s-%s', $context->getTraceId(), $context->getSpanId(), $context->isSampled() ? '01' : '00'));
    $span->end();
    $this->rootSpan = NULL;
  }

  /**
   * Exports the recorded spans, after the response has been sent.
   *
   * Drupal calls destruct() on services tagged needs_destruction even for
   * page cache hits, when HTTP kernel terminate() is skipped.
   */
  public function destruct(): void {
    if ($this->provider === NULL) {
      return;
    }
    $this->provider->shutdown();
    $this->provider = NULL;
    $this->tracer = NULL;
  }

}
