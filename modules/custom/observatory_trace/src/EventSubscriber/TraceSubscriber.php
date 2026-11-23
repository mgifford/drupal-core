<?php

declare(strict_types=1);

namespace Drupal\observatory_trace\EventSubscriber;

use Drupal\Core\Database\Database;
use Drupal\Core\Database\Event\StatementExecutionEndEvent;
use Drupal\Core\Database\Event\StatementExecutionFailureEvent;
use Drupal\observatory_trace\RequestTracer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Adds database statements and exceptions to the open request span.
 */
class TraceSubscriber implements EventSubscriberInterface {

  public function __construct(
    protected readonly RequestTracer $tracer,
  ) {}

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      StatementExecutionEndEvent::class => 'onStatement',
      StatementExecutionFailureEvent::class => 'onStatement',
      // Before Drupal's exception subscribers turn it into a response.
      KernelEvents::EXCEPTION => ['onException', 1000],
    ];
  }

  /**
   * Records a database statement.
   */
  public function onStatement(StatementExecutionEndEvent $event): void {
    if ($this->tracer->isRecording()) {
      $this->tracer->recordStatement($event, Database::getConnection($event->target, $event->key)->driver());
    }
  }

  /**
   * Records an exception, including 403 and 404 exceptions.
   */
  public function onException(ExceptionEvent $event): void {
    $this->tracer->recordException($event->getThrowable());
  }

}
