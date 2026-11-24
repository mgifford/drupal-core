import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { newId, newRunId } from '../playwright/lib/evidence/ids.mjs';
import { parseTraceHeader } from '../playwright/lib/evidence/trace-context.mjs';
import { sanitizeUrl, sanitizeHtmlSnippet, sanitizeRepository } from '../playwright/lib/evidence/sanitize.mjs';
import { classifyRequestTrace, summarizeCorrelation, EvidenceRecorder } from '../playwright/lib/evidence/recorder.mjs';
import { spansFromExport, summarizeTrace } from '../playwright/lib/evidence/otlp.mjs';
import { buildManifest, wcagCandidates } from '../playwright/lib/evidence/manifest.mjs';
import { validate } from '../playwright/lib/evidence/validate.mjs';
import { compareRuns } from '../playwright/lib/evidence/compare.mjs';
import { renderReport } from '../playwright/lib/evidence/report.mjs';
import { buildInvestigationRequest } from '../playwright/lib/evidence/investigation.mjs';

const TRACE = '4bf92f3577b34da6a3ce929d0e0e4736';
const SPAN = '00f067aa0ba902b7';
const ORIGIN = 'https://site.test';

// ---------------------------------------------------------------- ids, headers

test('ids have the documented shapes', () => {
  assert.match(newId('req'), /^req-[0-9a-f]{12}$/);
  assert.match(newRunId(new Date('2026-11-23T14:15:00.123Z')), /^run-20261123T141500Z-[0-9a-f]{8}$/);
  assert.throws(() => newId('trace'));
});

test('parseTraceHeader accepts valid traceresponse values only', () => {
  assert.deepEqual(parseTraceHeader(`00-${TRACE}-${SPAN}-01`), { ok: true, traceId: TRACE, spanId: SPAN, sampled: true });
  assert.equal(parseTraceHeader(undefined).reason, 'absent');
  assert.equal(parseTraceHeader('00-xyz').reason, 'malformed');
  assert.equal(parseTraceHeader(`00-${'0'.repeat(32)}-${SPAN}-01`).reason, 'malformed');
  assert.equal(parseTraceHeader(`ff-${TRACE}-${SPAN}-01`).reason, 'malformed');
  assert.equal(parseTraceHeader(`00-${TRACE.toUpperCase()}-${SPAN}-01`).reason, 'malformed');
});

// ---------------------------------------------------------------- sanitizing

test('sanitizeUrl drops origin, credentials, fragments and query values', () => {
  assert.equal(sanitizeUrl('https://user:pw@site.test/node/1?destination=/admin&token=abc#x'), '/node/1?destination=REDACTED&token=REDACTED');
});

test('sanitizeUrl redacts one-time login links and token-like segments', () => {
  assert.equal(sanitizeUrl('https://site.test/user/reset/2/1700000000/AbCdEf123/login'), '/user/reset/:uid/:timestamp/:hash/login');
  assert.equal(sanitizeUrl(`https://site.test/batch/${'a'.repeat(43)}`), '/batch/:token');
  assert.equal(sanitizeUrl('not a url'), '[unparseable url]');
});

test('sanitizeRepository drops credentials from URL remotes only', () => {
  assert.equal(sanitizeRepository('https://x-access-token:secret@github.com/o/r.git'), 'https://github.com/o/r.git');
  assert.equal(sanitizeRepository('https://secret@github.com/o/r.git'), 'https://github.com/o/r.git');
  assert.equal(sanitizeRepository('https://github.com/o/r.git?token=secret#x'), 'https://github.com/o/r.git');
  assert.equal(sanitizeRepository('ssh://git:secret@host.test:2222/o/r.git'), 'ssh://host.test:2222/o/r.git');
  assert.equal(sanitizeRepository('user:secret@host.test:o/r.git'), 'host.test:o/r.git');
  assert.equal(sanitizeRepository('git@github.com:o/r.git'), 'git@github.com:o/r.git');
  assert.equal(sanitizeRepository('/srv/checkouts/drupal'), '/srv/checkouts/drupal');
  assert.equal(sanitizeRepository('C:\\checkouts\\drupal'), 'C:\\checkouts\\drupal');
  assert.equal(sanitizeRepository('C:\\Users\\a@b\\repo'), 'C:\\Users\\a@b\\repo');
  assert.equal(sanitizeRepository(null), null);
});

test('sanitizeHtmlSnippet removes value attributes and truncates', () => {
  const html = '<input type="hidden" name="form_token" value="secret-token">';
  assert.equal(sanitizeHtmlSnippet(html), '<input type="hidden" name="form_token" value="REDACTED">');
  assert.equal(sanitizeHtmlSnippet('<input value=abc>'), '<input value="REDACTED">');
  assert.equal(sanitizeHtmlSnippet('<meta name="csrf" content="tok">'), '<meta name="csrf" content="REDACTED">');
  assert.equal(sanitizeHtmlSnippet('<a href="/user/reset/1/2/hash?x=1">'), '<a href="/user/reset/:uid/:timestamp/:hash?x=REDACTED">');
  assert.equal(sanitizeHtmlSnippet("<form action='/node/add?token=s'>"), '<form action="/node/add?token=REDACTED">');
  assert.equal(sanitizeHtmlSnippet('x'.repeat(500), 10), 'x'.repeat(10) + '…');
  assert.equal(sanitizeHtmlSnippet(undefined), null);
});

// ---------------------------------------------------------------- correlation

const req = (status, extra = {}) => ({ trace: { status, ...(status === 'correlated' ? { trace_id: TRACE, span_id: SPAN } : {}), ...extra } });

test('classifyRequestTrace distinguishes every trace state', () => {
  const header = `00-${TRACE}-${SPAN}-01`;
  assert.equal(classifyRequestTrace({ instrumentation: 'enabled', resourceType: 'document', headerValue: header }).status, 'correlated');
  assert.equal(classifyRequestTrace({ instrumentation: 'enabled', resourceType: 'document' }).status, 'missing');
  assert.equal(classifyRequestTrace({ instrumentation: 'enabled', resourceType: 'stylesheet' }).status, 'not-expected');
  assert.equal(classifyRequestTrace({ instrumentation: 'enabled', resourceType: 'fetch', headerValue: 'garbage' }).status, 'malformed');
  assert.match(classifyRequestTrace({ instrumentation: 'enabled', resourceType: 'document', failure: 'net::ERR_ABORTED' }).reason, /ERR_ABORTED/);
  assert.match(classifyRequestTrace({ instrumentation: 'enabled', resourceType: 'document', responded: false }).reason, /before recording stopped/);
  const off = classifyRequestTrace({ instrumentation: 'disabled', resourceType: 'document', headerValue: header });
  assert.equal(off.status, 'instrumentation-disabled');
  assert.equal(off.trace_id, undefined, 'never keeps a trace id when tracing is off');
});

test('summarizeCorrelation reports full, partial, missing and failed correlation', () => {
  assert.equal(summarizeCorrelation([req('correlated'), req('not-expected')], 'enabled').status, 'correlated');
  assert.equal(summarizeCorrelation([req('correlated'), req('missing')], 'enabled').status, 'partially-correlated');
  assert.equal(summarizeCorrelation([req('missing')], 'enabled').status, 'unavailable');
  assert.equal(summarizeCorrelation([req('malformed')], 'enabled').status, 'correlation-failed');
  assert.equal(summarizeCorrelation([req('not-expected')], 'enabled').status, 'unavailable');
  assert.equal(summarizeCorrelation([req('correlated')], 'disabled').status, 'instrumentation-disabled');
  const notExported = summarizeCorrelation([req('correlated', { exported: 'not-found' })], 'enabled');
  assert.equal(notExported.status, 'partially-correlated');
  assert.equal(notExported.exported, 0);
});

// A minimal stand-in for a Playwright page, enough for the recorder.
function fakePage() {
  const handlers = {};
  const frame = {};
  return {
    on: (event, fn) => { (handlers[event] ??= []).push(fn); },
    off: (event, fn) => { handlers[event] = (handlers[event] ?? []).filter((h) => h !== fn); },
    mainFrame: () => frame,
    emit: (event, arg) => (handlers[event] ?? []).forEach((fn) => fn(arg)),
    frame,
  };
}

function fakeRequest(page, url, { type = 'document', method = 'GET', from = null, failure = null } = {}) {
  return {
    url: () => url, method: () => method, resourceType: () => type, redirectedFrom: () => from,
    frame: () => page.frame, timing: () => ({ responseEnd: 12.34 }),
    sizes: async () => ({ responseBodySize: 100, responseHeadersSize: 20 }),
    failure: () => (failure ? { errorText: failure } : null),
  };
}

function respond(page, request, status, headers = {}) {
  page.emit('response', { request: () => request, status: () => status, headers: () => headers });
  page.emit('requestfinished', request);
}

test('recorder keeps two concurrent pages apart and follows redirects', async () => {
  const pageA = fakePage();
  const pageB = fakePage();
  const a = new EvidenceRecorder(pageA, { baseURL: ORIGIN, instrumentation: 'enabled' }).start();
  const b = new EvidenceRecorder(pageB, { baseURL: ORIGIN, instrumentation: 'enabled' }).start();

  await a.step('log in', async () => {
    const post = fakeRequest(pageA, `${ORIGIN}/user/login`, { method: 'POST' });
    pageA.emit('request', post);
    respond(pageA, post, 303, { traceresponse: `00-${TRACE}-${SPAN}-01` });
    const get = fakeRequest(pageA, `${ORIGIN}/user/2`, { from: post });
    pageA.emit('request', get);
    respond(pageA, get, 200, { traceresponse: `00-${'1'.repeat(32)}-${SPAN}-01`, 'x-drupal-dynamic-cache': 'MISS' });
    pageA.emit('request', fakeRequest(pageA, 'https://other.example/x.js', { type: 'script' }));
  });
  await b.step('broken page', async () => {
    const bad = fakeRequest(pageB, `${ORIGIN}/admin/missing?x=1`);
    pageB.emit('request', bad);
    pageB.emit('requestfailed', Object.assign(bad, { failure: () => ({ errorText: 'net::ERR_FAILED' }) }));
  });

  const attemptA = await a.stop({ status: 'PASS' });
  const attemptB = await b.stop({ status: 'FAIL', failureReason: 'page did not load' });

  assert.equal(attemptA.requests.length, 2);
  assert.equal(attemptB.requests.length, 1);
  assert.equal(attemptA.other_origin_requests, 1);
  assert.equal(attemptA.requests[1].redirected_from, attemptA.requests[0].request_id);
  assert.equal(attemptA.requests[1].drupal_cache.dynamic_page, 'MISS');
  assert.equal(attemptA.requests[0].transfer_bytes, 120);
  assert.equal(attemptA.correlation.status, 'correlated');
  assert.equal(attemptA.correlation.trace_ids.length, 2, 'one scenario can hold several server traces');
  assert.equal(attemptB.requests[0].url, '/admin/missing?x=REDACTED');
  assert.equal(attemptB.requests[0].trace.status, 'missing');
  assert.equal(attemptB.correlation.status, 'unavailable');
  assert.notEqual(attemptA.attempt_id, attemptB.attempt_id);
});

// ---------------------------------------------------------------- OTLP

function otlpExport(traceId, { route = '/admin/content', withDb = true, exception = false } = {}) {
  const span = (spanId, parent, name, start, end, attrs, extra = {}) => ({
    traceId, spanId, parentSpanId: parent, name, kind: parent ? 1 : 2,
    startTimeUnixNano: String(start), endTimeUnixNano: String(end),
    attributes: Object.entries(attrs).map(([key, v]) => ({ key, value: typeof v === 'number' ? { intValue: String(v) } : { stringValue: v } })),
    ...extra,
  });
  const spans = [span('a'.repeat(16), '', 'GET /admin/content', 0, 25_000_000, {
    'http.route': route, 'drupal.route.name': 'system.admin_content', 'http.response.status_code': 200,
    'drupal.dynamic_page_cache': 'MISS', 'db.query.text': undefined,
  }, exception ? { events: [{ name: 'exception', attributes: [{ key: 'exception.type', value: { stringValue: 'RuntimeException' } }, { key: 'exception.message', value: { stringValue: 'secret detail' } }] }] } : {})];
  if (withDb) {
    spans.push(span('b'.repeat(16), 'a'.repeat(16), 'SELECT', 1_000_000, 3_000_000, { 'db.system.name': 'mysql', 'db.operation.name': 'SELECT', 'db.query.text': 'SELECT * FROM users WHERE name = :name' }));
    spans.push(span('c'.repeat(16), 'a'.repeat(16), 'UPDATE', 4_000_000, 5_000_000, { 'db.system.name': 'mysql', 'db.operation.name': 'UPDATE', 'db.query.text': 'UPDATE x' }, { status: { code: 2 } }));
  }
  return { resourceSpans: [{ resource: { attributes: [{ key: 'process.runtime.version', value: { stringValue: '8.5.0' } }] }, scopeSpans: [{ spans }] }] };
}

test('summarizeTrace keeps counts and routes, not query text or messages', () => {
  const summary = summarizeTrace(spansFromExport(otlpExport(TRACE, { exception: true })));
  assert.equal(summary.duration_ms, 25);
  assert.equal(summary.http_route, '/admin/content');
  assert.equal(summary.drupal_route_name, 'system.admin_content');
  assert.equal(summary.db_statement_count, 2);
  assert.equal(summary.db_total_ms, 3);
  assert.deepEqual(summary.db_operations, { SELECT: 1, UPDATE: 1 });
  assert.equal(summary.db_failures, 1);
  assert.deepEqual(summary.exception_types, ['RuntimeException']);
  assert.ok(!JSON.stringify(summary).includes('users WHERE'), 'no query text');
  assert.ok(!JSON.stringify(summary).includes('secret detail'), 'no exception message');
});

// ---------------------------------------------------------------- manifest

function syntheticRun({ instrumentation = 'enabled', traceIds = [TRACE], storeHas = [TRACE] } = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'evidence-'));
  const runId = newRunId();
  const runDir = path.join(dir, runId);
  fs.mkdirSync(path.join(runDir, 'scenarios'), { recursive: true });
  fs.mkdirSync(path.join(runDir, 'artifacts'), { recursive: true });
  const pageAction = 'act-000000000001';
  const scanAction = 'act-000000000002';
  const requests = traceIds.map((id, i) => ({
    request_id: `req-00000000000${i}`, action_id: pageAction, method: 'GET', url: '/admin/content', resource_type: 'document',
    redirected_from: null, status: 200, failure: null, started_at: '2026-11-23T10:00:00.000Z', duration_ms: 30, transfer_bytes: 5000,
    drupal_cache: { page: null, dynamic_page: 'MISS' },
    trace: instrumentation === 'enabled' ? { status: 'correlated', trace_id: id, span_id: SPAN, reason: null } : { status: 'instrumentation-disabled', reason: 'off' },
  }));
  const attempt = {
    attempt_id: 'att-000000000001', retry: 0, status: 'PASS', failure_reason: null,
    started_at: '2026-11-23T10:00:00.000Z', completed_at: '2026-11-23T10:00:05.000Z',
    actions: [
      { action_id: pageAction, label: 'Open content overview', started_at: '2026-11-23T10:00:00.000Z', completed_at: '2026-11-23T10:00:01.000Z', status: 'completed' },
      { action_id: scanAction, label: 'Scan with axe', started_at: '2026-11-23T10:00:01.000Z', completed_at: '2026-11-23T10:00:02.000Z', status: 'completed' },
    ],
    requests, other_origin_requests: 0,
    correlation: summarizeCorrelation(requests, instrumentation),
  };
  fs.writeFileSync(path.join(runDir, 'artifacts/axe.json'), JSON.stringify({
    violations: [{ id: 'label', help: 'Form <elements> must have labels', helpUrl: 'https://dequeuniversity.com/rules/axe/4.12/label', impact: 'critical', tags: ['wcag2a', 'wcag412', 'cat.forms'],
      nodes: [{ target: ['#edit-title'], html: '<input id="edit-title" value="private draft">', impact: 'critical' }] }],
    incomplete: [],
  }));
  fs.writeFileSync(path.join(runDir, 'scenarios/s.json'), JSON.stringify({
    scenario_id: 'synthetic-admin-content', title: 'SYNTHETIC: content overview', spec: 'unit test', reproduce: null, instrumentation,
    environment: { base_url: ORIGIN, browser: { name: 'chromium', version: '149.0' }, viewport: { width: 1280, height: 720 }, color_scheme: 'light', reduced_motion: 'no-preference', runner: 'unit-test' },
    tools: [{ name: 'playwright', version: '1.61.1' }, { name: 'axe-core', version: '4.12.1' }],
    attempt,
    scans: [{ tool: { name: 'axe-core', version: '4.12.1' }, action_id: scanAction, page_action_id: pageAction, url: '/admin/content', results_file: 'artifacts/axe.json' }],
  }));
  const store = path.join(dir, 'traces.jsonl');
  fs.writeFileSync(store, storeHas.map((id) => JSON.stringify(otlpExport(id))).join('\n') + '\nnot json\n');
  return { dir, runDir, runId, store };
}

test('buildManifest links findings to the server trace of the page load', () => {
  const { runDir, runId, store, dir } = syntheticRun();
  const manifest = buildManifest({ runDir, runId, traceStore: store, sourceDir: dir, synthetic: true });
  assert.equal(validate('quality-evidence', manifest).valid, true);
  const [finding] = manifest.findings;
  assert.deepEqual(finding.related_trace_ids, [TRACE]);
  assert.deepEqual(finding.wcag_candidates, ['4.1.2']);
  assert.equal(finding.html, '<input id="edit-title" value="REDACTED">');
  assert.equal(finding.source_mapping.classification, 'candidate');
  assert.equal(finding.source_mapping.candidates[0].value, 'system.admin_content');
  assert.equal(finding.verification, 'automated-unreviewed');
  assert.equal(manifest.target.php_version, '8.5.0');
  assert.equal(manifest.scenarios[0].attempts[0].correlation.status, 'correlated');
  assert.equal(manifest.instrumentation.notes[0], '1 unreadable line(s) in the trace store were skipped.');
  assert.ok(manifest.measurements.some((m) => m.name === 'server.duration' && m.value === 25 && m.instrumented));
  const raw = fs.readFileSync(path.join(runDir, 'private/otlp-traces.jsonl'), 'utf8');
  assert.ok(raw.includes(TRACE));
  assert.equal(manifest.artifacts.find((a) => a.kind === 'otlp-traces').visibility, 'private');
});

test('buildManifest removes credentials from the recorded repository', () => {
  const { runDir, runId, store, dir } = syntheticRun();
  fs.writeFileSync(path.join(runDir, 'run-info.json'), JSON.stringify({
    source: { repository: 'https://user:hunter2@example.test/r.git', requested_ref: 'main', resolved_commit: 'a'.repeat(40), dirty: false },
  }));
  const manifest = buildManifest({ runDir, runId, traceStore: store, sourceDir: dir, synthetic: true });
  assert.equal(manifest.target.source.repository, 'https://example.test/r.git');
  assert.ok(!JSON.stringify(manifest).includes('hunter2'));
});

test('buildManifest records returned trace ids with no exported spans', () => {
  const { runDir, runId, store, dir } = syntheticRun({ traceIds: [TRACE], storeHas: [] });
  const manifest = buildManifest({ runDir, runId, traceStore: store, sourceDir: dir, synthetic: true });
  const attempt = manifest.scenarios[0].attempts[0];
  assert.equal(attempt.requests[0].trace.exported, 'not-found');
  assert.equal(attempt.correlation.status, 'partially-correlated');
  assert.equal(manifest.artifacts.find((a) => a.kind === 'otlp-traces').availability, 'not-collected');
});

test('buildManifest works with tracing disabled', () => {
  const { runDir, runId, dir } = syntheticRun({ instrumentation: 'disabled' });
  const manifest = buildManifest({ runDir, runId, traceStore: null, sourceDir: dir, synthetic: true });
  assert.equal(manifest.instrumentation.server_tracing, 'disabled');
  assert.equal(manifest.scenarios[0].attempts[0].correlation.status, 'instrumentation-disabled');
  assert.deepEqual(manifest.findings[0].related_trace_ids, []);
  assert.equal(manifest.findings[0].source_mapping.classification, 'unknown');
  assert.ok(manifest.measurements.every((m) => !m.instrumented));
});

test('schema rejects invented trace ids, unsafe paths and unverified artifacts', () => {
  const { runDir, runId, store, dir } = syntheticRun();
  const good = buildManifest({ runDir, runId, traceStore: store, sourceDir: dir, synthetic: true });
  const clone = () => JSON.parse(JSON.stringify(good));
  const invented = clone();
  invented.scenarios[0].attempts[0].requests[0].trace = { status: 'missing', trace_id: TRACE, reason: 'x' };
  assert.equal(validate('quality-evidence', invented).valid, false);
  const absolute = clone();
  absolute.artifacts[0].path = '/etc/passwd';
  assert.equal(validate('quality-evidence', absolute).valid, false);
  const parent = clone();
  parent.artifacts[0].path = '../secrets.json';
  assert.equal(validate('quality-evidence', parent).valid, false);
  const unhashed = clone();
  delete unhashed.artifacts[0].sha256;
  assert.equal(validate('quality-evidence', unhashed).valid, false);
});

test('wcagCandidates reads only success-criterion tags', () => {
  assert.deepEqual(wcagCandidates(['wcag2a', 'wcag21aa', 'wcag111', 'wcag1411', 'best-practice']), ['1.1.1', '1.4.11']);
});

// ---------------------------------------------------------------- comparison

function manifestWith(findings, { status = 'PASS', axe = '4.12.1', runId = newRunId() } = {}) {
  return {
    run: { run_id: runId, mode: 'diagnostic', synthetic: true },
    target: { source: { commit: null }, recipes: [] },
    environment: { browser: { name: 'chromium', version: '149' } },
    instrumentation: { server_tracing: 'enabled' },
    tools: [{ name: 'axe-core', version: axe }],
    scenarios: [{ scenario_id: 's', attempts: [{ status }] }],
    findings: findings.map(([occurrence, impact]) => ({ finding_id: newId('fnd'), rule_id: 'label', scenario_id: 's', impact, fingerprint: { occurrence, pattern: 'P' } })),
  };
}

test('compareRuns classifies new, recurring, changed, reintroduced and resolved findings', () => {
  const older = manifestWith([['O-reint', 'serious']]);
  const base = manifestWith([['O-same', 'serious'], ['O-changed', 'minor'], ['O-gone', 'serious']]);
  const now = manifestWith([['O-same', 'serious'], ['O-changed', 'critical'], ['O-new', 'serious'], ['O-reint', 'serious']]);
  const result = compareRuns(base, now, [older]);
  const cls = Object.fromEntries(result.findings.map((f) => [f.occurrence, f.classification]));
  assert.deepEqual(cls, { 'O-same': 'recurring', 'O-changed': 'changed', 'O-new': 'new', 'O-reint': 'reintroduced', 'O-gone': 'resolved' });
});

test('compareRuns never calls a finding resolved when its scenario did not run', () => {
  const base = manifestWith([['O-gone', 'serious']]);
  const now = manifestWith([], { status: 'SKIPPED' });
  assert.equal(compareRuns(base, now).findings[0].classification, 'unverified');
});

test('compareRuns refuses to classify across different scanner versions', () => {
  const result = compareRuns(manifestWith([['A', 'serious']]), manifestWith([['B', 'serious']], { axe: '4.13.0' }));
  assert.equal(result.comparable, false);
  assert.deepEqual(result.differences, [{ field: 'tools.axe-core', baseline: '4.12.1', current: '4.13.0' }]);
  assert.ok(result.findings.every((f) => f.classification === 'not-comparable'));
});

// ---------------------------------------------------------------- report and export

test('renderReport escapes content, flags synthetic runs and withholds private files', () => {
  const { runDir, runId, store, dir } = syntheticRun();
  const manifest = buildManifest({ runDir, runId, traceStore: store, sourceDir: dir, synthetic: true });
  const html = renderReport(manifest);
  assert.match(html, /Synthetic fixture/);
  assert.match(html, /Form &lt;elements&gt; must have labels/);
  assert.ok(!html.includes('<elements>'), 'scanner text is escaped');
  assert.match(html, /kept privately with the run, not published/);
  assert.ok(!html.includes('href="../private/'), 'private files are not linked');
  assert.match(html, /Route resolved: system.admin_content/);
});

test('buildInvestigationRequest exports a valid Core Lab hand-off record', () => {
  const { runDir, runId, store, dir } = syntheticRun();
  const manifest = buildManifest({ runDir, runId, traceStore: store, sourceDir: dir, synthetic: true });
  const request = buildInvestigationRequest(manifest, manifest.findings[0].finding_id, 'manifest.json');
  assert.equal(validate('investigation-request', request).valid, true);
  assert.equal(request.finding.rule_id, 'label');
  assert.equal(request.reproduction.steps[0], 'Open content overview');
  assert.throws(() => buildInvestigationRequest(manifest, 'fnd-000000000000', 'manifest.json'));
});
