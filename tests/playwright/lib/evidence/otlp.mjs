/**
 * Reads server spans written by the OpenTelemetry Collector's file exporter
 * (OTLP/JSON, one export request per line) and summarizes them.
 *
 * Summaries hold only what is safe to publish: names, routes, status codes,
 * cache headers, counts and durations. Query text, exception messages, stack
 * traces and code locations stay in the private trace file.
 *
 * OTLP/JSON encoding: https://opentelemetry.io/docs/specs/otlp/#json-protobuf-encoding
 */
import * as fs from 'node:fs';

const ERROR_STATUS = new Set([2, 'STATUS_CODE_ERROR']);

function attributeValue(value) {
  if (!value || typeof value !== 'object') {
    return null;
  }
  if ('stringValue' in value) return value.stringValue;
  if ('intValue' in value) return Number(value.intValue);
  if ('doubleValue' in value) return Number(value.doubleValue);
  if ('boolValue' in value) return value.boolValue;
  if ('arrayValue' in value) return (value.arrayValue.values ?? []).map(attributeValue);
  return null;
}

function attributes(list) {
  const out = {};
  for (const item of list ?? []) {
    out[item.key] = attributeValue(item.value);
  }
  return out;
}

/** Parses one OTLP/JSON export request into flat span objects. */
export function spansFromExport(exportRequest) {
  const spans = [];
  for (const resourceSpans of exportRequest.resourceSpans ?? []) {
    const resource = attributes(resourceSpans.resource?.attributes);
    for (const scopeSpans of resourceSpans.scopeSpans ?? []) {
      for (const span of scopeSpans.spans ?? []) {
        spans.push({
          traceId: String(span.traceId ?? '').toLowerCase(),
          spanId: String(span.spanId ?? '').toLowerCase(),
          parentSpanId: span.parentSpanId ? String(span.parentSpanId).toLowerCase() : '',
          name: span.name ?? '',
          kind: span.kind ?? null,
          startNs: BigInt(span.startTimeUnixNano ?? 0),
          endNs: BigInt(span.endTimeUnixNano ?? 0),
          attributes: attributes(span.attributes),
          events: (span.events ?? []).map((event) => ({ name: event.name, attributes: attributes(event.attributes) })),
          error: ERROR_STATUS.has(span.status?.code),
          resource,
        });
      }
    }
  }
  return spans;
}

/**
 * Reads a file-exporter output file and returns the spans whose trace id is
 * in `traceIds`, and the raw lines that held them (for the private copy).
 */
export function readTraceStore(file, traceIds) {
  const wanted = new Set(traceIds);
  const result = { spans: [], lines: [], unreadableLines: 0 };
  if (!file || !fs.existsSync(file)) {
    return result;
  }
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) {
      continue;
    }
    let parsed;
    try {
      parsed = JSON.parse(line);
    }
    catch {
      result.unreadableLines++;
      continue;
    }
    const spans = spansFromExport(parsed).filter((span) => wanted.has(span.traceId));
    if (spans.length) {
      result.spans.push(...spans);
      result.lines.push(line);
    }
  }
  return result;
}

const ms = (ns) => Math.round(Number(ns) / 1e4) / 100;

/** Summarizes the spans of one trace for publication. */
export function summarizeTrace(spans) {
  const ids = new Set(spans.map((span) => span.spanId));
  const root = spans.find((span) => !span.parentSpanId || !ids.has(span.parentSpanId)) ?? null;
  const db = spans.filter((span) => span.attributes['db.system.name'] !== undefined);
  const operations = {};
  for (const span of db) {
    const name = String(span.attributes['db.operation.name'] ?? 'unknown');
    operations[name] = (operations[name] ?? 0) + 1;
  }
  const exceptionTypes = new Set();
  for (const span of spans) {
    for (const event of span.events) {
      if (event.name === 'exception' && event.attributes['exception.type']) {
        exceptionTypes.add(String(event.attributes['exception.type']));
      }
    }
  }
  const attr = (key) => (root && root.attributes[key] !== undefined ? root.attributes[key] : null);
  return {
    root_span_name: root?.name ?? null,
    duration_ms: root ? ms(root.endNs - root.startNs) : null,
    http_route: attr('http.route'),
    drupal_route_name: attr('drupal.route.name'),
    http_status: attr('http.response.status_code'),
    page_cache: attr('drupal.page_cache'),
    dynamic_page_cache: attr('drupal.dynamic_page_cache'),
    span_count: spans.length,
    db_statement_count: db.length,
    db_total_ms: db.length ? Math.round(db.reduce((sum, span) => sum + Number(span.endNs - span.startNs), 0) / 1e4) / 100 : 0,
    db_operations: operations,
    db_failures: db.filter((span) => span.error).length,
    exception_types: [...exceptionTypes],
  };
}

/** Groups spans by trace id. */
export function groupByTrace(spans) {
  const groups = new Map();
  for (const span of spans) {
    if (!groups.has(span.traceId)) {
      groups.set(span.traceId, []);
    }
    groups.get(span.traceId).push(span);
  }
  return groups;
}
