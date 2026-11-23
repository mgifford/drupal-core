/**
 * Records which Drupal requests each browser action caused.
 *
 * The recorder listens to one Playwright page. It never adds headers to
 * requests. For each request to the site's own origin it keeps the method,
 * sanitized URL, status, timing, Drupal cache headers and the server's
 * `traceresponse` trace id. Requests to other origins are only counted.
 *
 * Because it is bound to one page, two tests running at once (in different
 * pages or workers) cannot mix their requests.
 */
import { newId } from './ids.mjs';
import { parseTraceHeader } from './trace-context.mjs';
import { sanitizeUrl } from './sanitize.mjs';

// Resource types that Drupal itself answers, so a trace is expected. Other
// types (CSS, images, fonts) are usually served by the web server directly.
const DRUPAL_TYPES = new Set(['document', 'xhr', 'fetch']);

const iso = () => new Date().toISOString();

/**
 * Decides the trace status of one request.
 *
 * @param {object} input
 * @param {'enabled'|'disabled'|'unknown'} input.instrumentation
 * @param {string} input.resourceType
 * @param {string|null} input.failure  Network error text, if no response.
 * @param {string|undefined} input.headerValue  The traceresponse header.
 * @param {boolean} [input.responded]  False if no response arrived at all.
 */
export function classifyRequestTrace({ instrumentation, resourceType, failure, headerValue, responded = true }) {
  if (instrumentation === 'disabled') {
    return { status: 'instrumentation-disabled', reason: 'server tracing was off for this run' };
  }
  const parsed = parseTraceHeader(headerValue);
  if (parsed.ok) {
    return { status: 'correlated', trace_id: parsed.traceId, span_id: parsed.spanId, reason: null };
  }
  if (parsed.reason === 'malformed') {
    return { status: 'malformed', reason: 'traceresponse header is not valid W3C Trace Context' };
  }
  if (!DRUPAL_TYPES.has(resourceType)) {
    return { status: 'not-expected', reason: `${resourceType} requests are usually served without Drupal` };
  }
  if (failure) {
    return { status: 'missing', reason: `no response: ${failure}` };
  }
  if (!responded) {
    return { status: 'missing', reason: 'no response before recording stopped' };
  }
  return { status: 'missing', reason: 'response had no traceresponse header' };
}

/**
 * Summarizes correlation for one attempt from its classified requests.
 */
export function summarizeCorrelation(requests, instrumentation) {
  if (instrumentation === 'disabled') {
    return {
      status: 'instrumentation-disabled', trace_ids: [], expected: 0, matched: 0, exported: null,
      notes: ['Server tracing was off, so no request was expected to carry a trace id.'],
    };
  }
  const expected = requests.filter((r) => ['correlated', 'missing', 'malformed'].includes(r.trace.status));
  const matched = expected.filter((r) => r.trace.status === 'correlated');
  const malformed = expected.filter((r) => r.trace.status === 'malformed');
  const checked = matched.filter((r) => r.trace.exported && r.trace.exported !== 'not-checked');
  const exported = checked.length ? checked.filter((r) => r.trace.exported === 'found').length : null;
  const notes = [];
  let status;
  if (expected.length === 0) {
    status = 'unavailable';
    notes.push('No request in this attempt was one Drupal would answer.');
  }
  else if (matched.length === 0) {
    status = malformed.length ? 'correlation-failed' : 'unavailable';
    notes.push(`${expected.length} request(s) expected a trace id; none returned one.`);
  }
  else if (matched.length === expected.length && (exported === null || exported === matched.length)) {
    status = 'correlated';
  }
  else {
    status = 'partially-correlated';
    if (matched.length < expected.length) {
      notes.push(`${expected.length - matched.length} of ${expected.length} expected request(s) returned no valid trace id.`);
    }
    if (exported !== null && exported < matched.length) {
      notes.push(`${matched.length - exported} returned trace id(s) had no spans in the trace store.`);
    }
  }
  return {
    status,
    trace_ids: [...new Set(matched.map((r) => r.trace.trace_id))],
    expected: expected.length,
    matched: matched.length,
    exported,
    notes,
  };
}

export class EvidenceRecorder {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {object} options
   * @param {string} options.baseURL  The site under test; only its origin is detailed.
   * @param {'enabled'|'disabled'|'unknown'} options.instrumentation
   * @param {number} [options.retry]
   */
  constructor(page, { baseURL, instrumentation, retry = 0 }) {
    this.page = page;
    this.origin = new URL(baseURL).origin;
    this.instrumentation = instrumentation;
    this.attempt = {
      attempt_id: newId('att'),
      retry,
      status: 'NOT_RUN',
      failure_reason: null,
      started_at: iso(),
      completed_at: null,
      actions: [],
      requests: [],
      other_origin_requests: 0,
    };
    this.records = new Map();
    this.pending = new Set();
    this.currentAction = null;
    this.pageActionId = null;
    this.handlers = {
      request: (request) => this.onRequest(request),
      response: (response) => this.onResponse(response),
      requestfinished: (request) => this.onDone(request, null),
      requestfailed: (request) => this.onDone(request, request.failure()?.errorText ?? 'failed'),
    };
  }

  start() {
    for (const [event, handler] of Object.entries(this.handlers)) {
      this.page.on(event, handler);
    }
    return this;
  }

  /** Runs fn as one labelled browser action and returns its result. */
  async step(label, fn) {
    const action = { action_id: newId('act'), label, started_at: iso(), completed_at: null, status: 'completed' };
    this.attempt.actions.push(action);
    const previous = this.currentAction;
    this.currentAction = action;
    try {
      return await fn();
    }
    catch (error) {
      action.status = 'failed';
      throw error;
    }
    finally {
      action.completed_at = iso();
      this.currentAction = previous;
    }
  }

  onRequest(request) {
    let origin;
    try {
      origin = new URL(request.url()).origin;
    }
    catch {
      return;
    }
    if (origin !== this.origin) {
      this.attempt.other_origin_requests++;
      return;
    }
    const from = request.redirectedFrom();
    const record = {
      request_id: newId('req'),
      action_id: this.currentAction?.action_id ?? null,
      method: request.method(),
      url: sanitizeUrl(request.url()),
      resource_type: request.resourceType(),
      redirected_from: from && this.records.has(from) ? this.records.get(from).record.request_id : null,
      status: null,
      failure: null,
      started_at: iso(),
      duration_ms: null,
      transfer_bytes: null,
      drupal_cache: { page: null, dynamic_page: null },
      trace: { status: 'missing', reason: 'not yet classified' },
    };
    if (request.resourceType() === 'document' && request.frame() === this.page.mainFrame()) {
      this.pageActionId = record.action_id;
    }
    this.records.set(request, { record, header: undefined });
    this.attempt.requests.push(record);
  }

  onResponse(response) {
    const entry = this.records.get(response.request());
    if (!entry) {
      return;
    }
    const headers = response.headers();
    entry.record.status = response.status();
    entry.header = headers['traceresponse'];
    entry.record.drupal_cache = {
      page: headers['x-drupal-cache'] ?? null,
      dynamic_page: headers['x-drupal-dynamic-cache'] ?? null,
    };
  }

  onDone(request, failure) {
    const entry = this.records.get(request);
    if (!entry) {
      return;
    }
    entry.record.failure = failure;
    const work = (async () => {
      const timing = request.timing();
      if (timing && timing.responseEnd >= 0) {
        entry.record.duration_ms = Math.round(timing.responseEnd * 10) / 10;
      }
      if (!failure) {
        try {
          const sizes = await request.sizes();
          entry.record.transfer_bytes = sizes.responseBodySize + sizes.responseHeadersSize;
        }
        catch {
          // The page closed first; leave transfer_bytes null.
        }
      }
    })();
    this.pending.add(work);
    work.finally(() => this.pending.delete(work));
  }

  /**
   * Stops recording and returns the attempt record.
   *
   * @param {object} result
   * @param {string} result.status  PASS, FAIL, SKIPPED, ...
   * @param {string|null} [result.failureReason]
   */
  async stop({ status, failureReason = null }) {
    for (const [event, handler] of Object.entries(this.handlers)) {
      this.page.off(event, handler);
    }
    await Promise.allSettled([...this.pending]);
    for (const { record, header } of this.records.values()) {
      record.trace = classifyRequestTrace({
        instrumentation: this.instrumentation,
        resourceType: record.resource_type,
        failure: record.failure,
        headerValue: header,
        responded: record.status !== null,
      });
    }
    this.attempt.status = status;
    this.attempt.failure_reason = failureReason;
    this.attempt.completed_at = iso();
    this.attempt.correlation = summarizeCorrelation(this.attempt.requests, this.instrumentation);
    return this.attempt;
  }
}
