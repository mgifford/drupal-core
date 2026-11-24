/**
 * Reads W3C Trace Context values returned by the server.
 *
 * The site's test-only module (modules/custom/observatory_trace) returns a
 * `traceresponse` header, from the Trace Context Level 2 draft:
 *   traceresponse: 00-<32 hex trace-id>-<16 hex span-id>-<2 hex flags>
 * The span-id is the server's request span. The test runner never invents
 * trace ids: if the header is absent or invalid, there is no trace id.
 *
 * https://www.w3.org/TR/trace-context-2/#traceresponse-header
 */

const PATTERN = /^([0-9a-f]{2})-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})$/;

/**
 * Parses a traceresponse (or traceparent) value.
 *
 * @returns {{ok: true, traceId: string, spanId: string, sampled: boolean}
 *   | {ok: false, reason: string}}
 */
export function parseTraceHeader(value) {
  if (value === undefined || value === null || value === '') {
    return { ok: false, reason: 'absent' };
  }
  const match = PATTERN.exec(String(value).trim());
  if (!match) {
    return { ok: false, reason: 'malformed' };
  }
  const [, version, traceId, spanId, flags] = match;
  // Version ff is forbidden; all-zero ids are invalid (Trace Context 3.2.2).
  if (version === 'ff' || /^0+$/.test(traceId) || /^0+$/.test(spanId)) {
    return { ok: false, reason: 'malformed' };
  }
  return { ok: true, traceId, spanId, sampled: (parseInt(flags, 16) & 1) === 1 };
}
