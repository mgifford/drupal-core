/**
 * Builds an evidence manifest (schemas/quality-evidence.schema.json) from
 * the files one run left in its evidence directory:
 *
 *   <run dir>/scenarios/*.json    one record per scenario attempt (scenario-record.mjs)
 *   <run dir>/artifacts/...       raw scanner output and screenshots, kept unchanged
 *   <run dir>/run-info.json       copy of tests/playwright/reports/run-info.json
 *
 * Server spans are read from the Collector's trace file. Only this run's
 * spans are copied, to <run dir>/private/otlp-traces.jsonl.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { newId } from './ids.mjs';
import { readTraceStore, groupByTrace, summarizeTrace } from './otlp.mjs';
import { summarizeCorrelation } from './recorder.mjs';
import { sanitizeHtmlSnippet, sanitizePath, sanitizeRepository } from './sanitize.mjs';
import { validate } from './validate.mjs';

const require = createRequire(import.meta.url);
const fingerprints = require('../../../../tools/a11y-fingerprints.js');

const MEDIA = { '.json': 'application/json', '.jsonl': 'application/x-ndjson', '.png': 'image/png', '.zip': 'application/zip', '.html': 'text/html' };

export function sha256File(file) {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

/** Turns axe tags such as "wcag1411" into "1.4.11". Other tags are ignored. */
export function wcagCandidates(tags) {
  const out = new Set();
  for (const tag of tags ?? []) {
    const match = /^wcag([1-4])([1-9])(\d{1,2})$/.exec(tag);
    if (match) {
      out.add(`${match[1]}.${match[2]}.${Number(match[3])}`);
    }
  }
  return [...out];
}

// Same rule as the schema's relative_path: no leading slash, no '..', no scheme.
const RELATIVE_PATH = /^(?![/\\])(?!.*\.\.)(?![a-zA-Z][a-zA-Z0-9+.-]*:).+$/;

export function artifactRecord(runDir, { kind, path: rel, visibility, note = null }, retentionDays) {
  if (!RELATIVE_PATH.test(rel)) {
    throw new Error(`artifact path must stay inside the run folder: ${rel}`);
  }
  const file = path.join(runDir, rel);
  if (!fs.existsSync(file)) {
    return { artifact_id: newId('art'), kind, visibility, availability: 'not-collected', note: note ?? `${rel} was not written` };
  }
  return {
    artifact_id: newId('art'),
    kind,
    path: rel,
    media_type: MEDIA[path.extname(rel)] ?? 'application/octet-stream',
    sha256: sha256File(file),
    bytes: fs.statSync(file).size,
    visibility,
    availability: 'available',
    retention_days: retentionDays,
    note,
  };
}

function runStatus(statuses) {
  if (statuses.length === 0) return 'NOT_RUN';
  for (const status of ['INFRASTRUCTURE_ERROR', 'FAIL', 'INCONCLUSIVE']) {
    if (statuses.includes(status)) return status;
  }
  if (statuses.every((status) => status === 'SKIPPED')) return 'SKIPPED';
  return statuses.includes('PASS') ? 'PASS' : 'NOT_RUN';
}

function drupalVersion(sourceDir) {
  try {
    const text = fs.readFileSync(path.join(sourceDir, 'core/lib/Drupal.php'), 'utf8');
    return /const VERSION = '([^']+)'/.exec(text)?.[1] ?? null;
  }
  catch {
    return null;
  }
}

/**
 * @param {object} options
 * @param {string} options.runDir
 * @param {string} options.runId
 * @param {string|null} options.traceStore  Collector file-exporter output, or null.
 * @param {string} options.sourceDir  The Drupal checkout that was tested.
 * @param {'manual'|'scheduled'|'ci'} [options.trigger]
 * @param {'diagnostic'|'benchmark'} [options.mode]
 * @param {boolean} [options.synthetic]
 * @param {number|null} [options.retentionDays]  For large private artifacts.
 * @param {string|null} [options.provenanceRecord]  Source provenance record, relative to runDir.
 */
export function buildManifest(options) {
  const { runDir, runId, traceStore, sourceDir, trigger = 'manual', mode = 'diagnostic', synthetic = false, retentionDays = null, provenanceRecord = null } = options;
  const scenarioDir = path.join(runDir, 'scenarios');
  const records = fs.existsSync(scenarioDir)
    ? fs.readdirSync(scenarioDir).filter((f) => f.endsWith('.json')).sort().map((f) => JSON.parse(fs.readFileSync(path.join(scenarioDir, f), 'utf8')))
    : [];
  const runInfoFile = path.join(runDir, 'run-info.json');
  const runInfo = fs.existsSync(runInfoFile) ? JSON.parse(fs.readFileSync(runInfoFile, 'utf8')) : null;

  const instrumentationModes = new Set(records.map((r) => r.instrumentation));
  const serverTracing = instrumentationModes.size === 1 ? [...instrumentationModes][0] : 'unknown';

  // Server spans for every trace id any request returned.
  const allRequests = records.flatMap((r) => r.attempt.requests);
  const traceIds = [...new Set(allRequests.filter((r) => r.trace.status === 'correlated').map((r) => r.trace.trace_id))];
  const store = traceStore ? readTraceStore(traceStore, traceIds) : { spans: [], lines: [], unreadableLines: 0 };
  const traces = groupByTrace(store.spans);
  const artifacts = [];
  const instrumentationNotes = [];
  let traceArtifact = null;
  if (store.lines.length) {
    fs.mkdirSync(path.join(runDir, 'private'), { recursive: true });
    fs.writeFileSync(path.join(runDir, 'private/otlp-traces.jsonl'), store.lines.join('\n') + '\n');
    traceArtifact = artifactRecord(runDir, { kind: 'otlp-traces', path: 'private/otlp-traces.jsonl', visibility: 'private', note: 'Raw server spans for this run: may include query text, stack traces and code locations.' }, retentionDays);
    artifacts.push(traceArtifact);
  }
  else if (serverTracing === 'enabled') {
    artifacts.push({ artifact_id: newId('art'), kind: 'otlp-traces', visibility: 'private', availability: 'not-collected', note: traceStore ? 'No spans for this run were found in the trace store.' : 'No trace store was given.' });
  }
  if (store.unreadableLines) {
    instrumentationNotes.push(`${store.unreadableLines} unreadable line(s) in the trace store were skipped.`);
  }
  const phpVersions = new Set(store.spans.map((s) => s.resource['process.runtime.version']).filter(Boolean));

  const tools = new Map();
  const scenarios = [];
  const findings = [];
  const measurements = [];
  const environment = records[0]?.environment ?? { base_url: null, browser: { name: 'unknown', version: null } };

  for (const record of records) {
    for (const tool of record.tools ?? []) {
      tools.set(`${tool.name}@${tool.version}`, tool);
    }
    const attempt = record.attempt;
    const instrumented = record.instrumentation === 'enabled';

    for (const request of attempt.requests) {
      if (request.trace.status !== 'correlated') {
        continue;
      }
      const spans = traces.get(request.trace.trace_id);
      if (!traceStore) {
        request.trace.exported = 'not-checked';
        continue;
      }
      request.trace.exported = spans ? 'found' : 'not-found';
      if (!spans) {
        continue;
      }
      request.trace.summary = summarizeTrace(spans);
      const common = { measured_at: attempt.completed_at ?? attempt.started_at, instrumented: true, scenario_id: record.scenario_id, attempt_id: attempt.attempt_id, request_id: request.request_id, trace_id: request.trace.trace_id, tool: { name: 'observatory_trace', version: null }, kind: 'server-execution' };
      if (traceArtifact) common.artifact_id = traceArtifact.artifact_id;
      measurements.push(
        { measurement_id: newId('msr'), name: 'server.duration', value: request.trace.summary.duration_ms, unit: 'ms', method: 'Duration of the root server span, from the request middleware to the end of the response. Excludes work after the response is sent.', ...common },
        { measurement_id: newId('msr'), name: 'db.statement_count', value: request.trace.summary.db_statement_count, unit: 'count', method: 'Database statement spans in the trace (statements before the middleware ran are not counted).', ...common },
        { measurement_id: newId('msr'), name: 'db.total_duration', value: request.trace.summary.db_total_ms, unit: 'ms', method: 'Sum of database statement span durations.', ...common },
      );
    }
    // Downgrade correlation if returned trace ids had no exported spans.
    attempt.correlation = summarizeCorrelation(attempt.requests, record.instrumentation);
    if (record.instrumentation !== 'disabled' && !traceStore) {
      attempt.correlation.notes.push('Trace ids were returned but no trace store was read.');
    }

    const same = attempt.requests;
    const measuredAt = attempt.completed_at ?? attempt.started_at;
    const playwrightTool = (record.tools ?? []).find((t) => t.name === 'playwright') ?? { name: 'playwright', version: null };
    measurements.push(
      { measurement_id: newId('msr'), name: 'browser.request_count', value: same.length, unit: 'count', kind: 'resource-proxy', tool: playwrightTool, measured_at: measuredAt, instrumented, method: 'Requests to the site origin seen by the browser during the attempt.', scenario_id: record.scenario_id, attempt_id: attempt.attempt_id },
      { measurement_id: newId('msr'), name: 'browser.transfer_bytes', value: same.reduce((sum, r) => sum + (r.transfer_bytes ?? 0), 0), unit: 'bytes', kind: 'resource-proxy', tool: playwrightTool, measured_at: measuredAt, instrumented, method: 'Sum of response header and body sizes from Playwright request.sizes(). A resource proxy, not an energy measurement.', scenario_id: record.scenario_id, attempt_id: attempt.attempt_id },
    );

    const attemptArtifactIds = [];
    for (const extra of record.artifacts ?? []) {
      const artifact = artifactRecord(runDir, extra, retentionDays);
      artifacts.push(artifact);
      attemptArtifactIds.push(artifact.artifact_id);
    }

    for (const scan of record.scans ?? []) {
      const artifact = artifactRecord(runDir, { kind: 'axe-results', path: scan.results_file, visibility: 'private', note: 'Unmodified axe-core output. Private: snippets may contain form tokens.' }, retentionDays);
      artifacts.push(artifact);
      attemptArtifactIds.push(artifact.artifact_id);
      if (artifact.availability !== 'available') {
        continue;
      }
      const results = JSON.parse(fs.readFileSync(path.join(runDir, scan.results_file), 'utf8'));
      const pageRequests = same.filter((r) => r.action_id === scan.page_action_id && r.resource_type === 'document');
      const related = [...new Set(pageRequests.filter((r) => r.trace.status === 'correlated').map((r) => r.trace.trace_id))];
      const finalDoc = [...pageRequests].reverse().find((r) => r.trace.summary);
      const scanUrl = sanitizePath(scan.url);
      const routePath = finalDoc?.trace.summary.http_route ?? scanUrl.split('?')[0];
      const candidates = finalDoc?.trace.summary.drupal_route_name
        ? [{ kind: 'route', value: finalDoc.trace.summary.drupal_route_name, evidence: `Server trace ${finalDoc.trace.trace_id} of the request that loaded the scanned page.` }]
        : [];
      for (const [group, result] of [['violations', 'violation'], ['incomplete', 'needs-review']]) {
        for (const rule of results[group] ?? []) {
          for (const node of rule.nodes ?? []) {
            const selector = (node.target ?? []).map(String).join(' ');
            const pattern = fingerprints.computeA11yPatternFingerprint(selector, 'axe-core', rule.id, null);
            // A scan may name its test profile (the axe crawl names its themes),
            // so the same rule and element under another configuration is a
            // different occurrence. Scans without one keep the null profile.
            const occurrence = fingerprints.computeA11yOccurrenceFingerprint(pattern.fingerprint, routePath, scan.test_profile ?? null);
            findings.push({
              finding_id: newId('fnd'),
              tool: scan.tool,
              rule_id: rule.id,
              rule_url: /^https?:\/\//.test(rule.helpUrl ?? '') ? rule.helpUrl : null,
              result,
              impact: node.impact ?? rule.impact ?? null,
              engine_tags: rule.tags ?? [],
              wcag_candidates: wcagCandidates(rule.tags),
              act_rule_ids: [],
              scenario_id: record.scenario_id,
              attempt_id: attempt.attempt_id,
              action_id: scan.action_id,
              page_action_id: scan.page_action_id,
              url: scanUrl,
              target: (node.target ?? []).map(String),
              html: sanitizeHtmlSnippet(node.html),
              message: rule.help ?? null,
              related_trace_ids: related,
              fingerprint: {
                pattern: pattern.displayId,
                occurrence: occurrence.displayId,
                status: 'provisional',
                note: 'Selector as reported by axe; the a11y/css-locator/v1 normalization is not applied yet.',
              },
              verification: 'automated-unreviewed',
              source_mapping: { classification: candidates.length ? 'candidate' : 'unknown', candidates },
              artifact_ids: [artifact.artifact_id],
            });
          }
        }
      }
    }
    attempt.artifact_ids = attemptArtifactIds;
    scenarios.push({ scenario_id: record.scenario_id, title: record.title, spec: record.spec ?? null, reproduce: record.reproduce ?? null, attempts: [attempt] });
  }

  const lockFile = path.join(sourceDir, 'composer.lock');
  const manifest = {
    schema_version: '0.2.0',
    artifact_type: 'quality-evidence-run',
    run: {
      run_id: runId,
      synthetic,
      mode,
      trigger,
      started_at: records.map((r) => r.attempt.started_at).sort()[0] ?? new Date().toISOString(),
      completed_at: records.map((r) => r.attempt.completed_at).filter(Boolean).sort().pop() ?? null,
      status: runStatus(records.map((r) => r.attempt.status)),
      notes: mode === 'diagnostic' && serverTracing === 'enabled' ? ['Instrumented run: timings include tracing overhead and are not comparable with benchmark runs.'] : [],
    },
    target: {
      product: 'drupal-core',
      source: {
        repository: sanitizeRepository(runInfo?.source?.repository ?? null),
        requested_ref: runInfo?.source?.requested_ref ?? null,
        commit: runInfo?.source?.resolved_commit ?? null,
        dirty: runInfo?.source?.dirty ?? null,
        ...(provenanceRecord ? { provenance_record: provenanceRecord } : {}),
      },
      drupal_version: drupalVersion(sourceDir),
      php_version: phpVersions.size === 1 ? [...phpVersions][0] : null,
      install_profile: records[0]?.install_profile ?? null,
      recipes: records[0]?.recipes ?? [],
      composer_lock_sha256: fs.existsSync(lockFile) ? sha256File(lockFile) : null,
    },
    environment,
    instrumentation: {
      server_tracing: serverTracing,
      implementation: serverTracing === 'enabled' ? 'observatory_trace (modules/custom/observatory_trace)' : null,
      trace_store: traceArtifact ? traceArtifact.path : null,
      notes: instrumentationNotes,
    },
    tools: [...tools.values()],
    scenarios,
    findings,
    measurements,
    artifacts,
  };
  const { valid, errors } = validate('quality-evidence', manifest);
  if (!valid) {
    throw new Error(`manifest does not match the schema:\n${errors.join('\n')}`);
  }
  return manifest;
}
