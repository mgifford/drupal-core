<?php

declare(strict_types=1);

namespace Drupal\observatory_trace\StackMiddleware;

use Drupal\Core\Database\Connection;
use Drupal\Core\Database\Event\StatementEvent;
use Drupal\observatory_trace\RequestTracer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;

/**
 * Opens a server span around each main request, including page cache hits.
 */
class TraceMiddleware implements HttpKernelInterface {

  public function __construct(
    protected readonly HttpKernelInterface $httpKernel,
    protected readonly RequestTracer $tracer,
    protected readonly Connection $connection,
  ) {}

  /**
   * {@inheritdoc}
   */
  public function handle(Request $request, int $type = self::MAIN_REQUEST, bool $catch = TRUE): Response {
    if ($type !== self::MAIN_REQUEST) {
      return $this->httpKernel->handle($request, $type, $catch);
    }
    $this->tracer->start($request);
    if ($this->tracer->isRecording()) {
      // Statement events are off by default because they cost time. The end
      // and failure events fire only when the start event is enabled too.
      $this->connection->enableEvents(StatementEvent::all());
    }
    try {
      $response = $this->httpKernel->handle($request, $type, $catch);
    }
    catch (\Throwable $exception) {
      // Only reached when $catch is FALSE; Drupal normally turns exceptions
      // into responses, which TraceSubscriber records.
      $this->tracer->recordException($exception);
      $this->tracer->finish($request, new Response('', 500));
      throw $exception;
    }
    $this->tracer->finish($request, $response);
    return $response;
  }

}
