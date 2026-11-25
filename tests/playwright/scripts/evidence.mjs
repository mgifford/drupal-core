#!/usr/bin/env node
/**
 * Evidence runner and tools. See docs/observability/README.md.
 *
 *   evidence.mjs run [options] [-- <extra playwright args>]
 *   evidence.mjs build <run dir> [options]
 *   evidence.mjs validate <file>...
 *   evidence.mjs report <manifest> [--compare <baseline manifest>]
 *   evidence.mjs compare <baseline manifest> <current manifest>
 *   evidence.mjs export-investigation <manifest> <finding id> [--core-lab-issue <nid>] [--out <file>]
 *
 * Options for run and build:
 *   --trace-store <file>   Collector output (default reports/evidence/otel/otel-traces.jsonl if present)
 *   --trigger <manual|ci|scheduled>   default manual
 *   --mode <diagnostic|benchmark>     default diagnostic
 *   --retention-days <n>   Recorded on large private artifacts
 *   --baseline <manifest>  Compare with this earlier run in the report
 *   --install-profile <name>, --recipes <a,b>  What the runner installed (run only;
 *                          recorded as declared, not checked)
 *   --tests <path>         Specs to run (run only; default tests/observability,
 *                          tests/crawl for the axe crawl)
 *   --provenance-record <file>  Source provenance record (docs/testing/SOURCES.md);
 *                          copied into the run folder and named in the manifest
 *
 * run and build also add modelled emissions from transferred bytes with
 * CO2.js (lib/evidence/emissions.mjs).
 *
 * The tested Drupal checkout is DRUPAL_SOURCE_DIR, as for run-info.ts, or this
 * repository. Its core/lib/Drupal.php and composer.lock are recorded.
 *
 * Exit codes: 0 success, 1 tests failed, no scenario passed, or invalid
 * file, 2 usage error.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { newRunId } from '../lib/evidence/ids.mjs';
import { readTraceStore } from '../lib/evidence/otlp.mjs';
import { buildManifest } from '../lib/evidence/manifest.mjs';
import { validate } from '../lib/evidence/validate.mjs';
import { compareRuns } from '../lib/evidence/compare.mjs';
import { renderReport } from '../lib/evidence/report.mjs';
import { buildInvestigationRequest } from '../lib/evidence/investigation.mjs';

const PLAYWRIGHT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = path.resolve(process.env.DRUPAL_SOURCE_DIR ?? path.resolve(PLAYWRIGHT_DIR, '../..'));
const EVIDENCE_ROOT = path.join(PLAYWRIGHT_DIR, 'reports/evidence');
const DEFAULT_STORE = path.join(EVIDENCE_ROOT, 'otel/otel-traces.jsonl');

function usage(message) {
  console.error(`evidence: ${message}\nRun with no arguments for usage.`);
  process.exit(2);
}

function parse(args) {
  const options = { positional: [], extra: [] };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--') {
      options.extra = args.slice(i + 1);
      break;
    }
    if (arg.startsWith('--')) {
      const value = args[i + 1];
      if (value === undefined || value.startsWith('--')) usage(`${arg} needs a value`);
      options[arg.slice(2)] = value;
      i++;
    }
    else {
      options.positional.push(arg);
    }
  }
  return options;
}

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeJson = (file, data) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
};

function traceStoreOption(options) {
  if (options['trace-store']) return path.resolve(options['trace-store']);
  return fs.existsSync(DEFAULT_STORE) ? DEFAULT_STORE : null;
}

/** Waits until every returned trace id is in the store, or the timeout. */
async function waitForTraces(runDir, store, timeoutMs = 10000) {
  const scenarioDir = path.join(runDir, 'scenarios');
  if (!store || !fs.existsSync(scenarioDir)) return;
  const ids = fs.readdirSync(scenarioDir).flatMap((f) => readJson(path.join(scenarioDir, f)).attempt.requests)
    .filter((r) => r.trace.status === 'correlated').map((r) => r.trace.trace_id);
  const wanted = new Set(ids);
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const found = new Set(readTraceStore(store, [...wanted]).spans.map((s) => s.traceId));
    if (found.size >= wanted.size) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

async function build(runDir, options) {
  // Loaded here, so the commands that do not build keep working without CO2.js.
  const { addModelledEmissions, NAME: EMISSIONS } = await import('../lib/evidence/emissions.mjs');
  const runId = path.basename(runDir);
  const traceStore = traceStoreOption(options);
  let provenanceRecord = null;
  if (options['provenance-record']) {
    provenanceRecord = 'source-provenance.json';
    fs.copyFileSync(path.resolve(options['provenance-record']), path.join(runDir, provenanceRecord));
  }
  const manifest = addModelledEmissions(buildManifest({
    runDir,
    runId,
    traceStore,
    sourceDir: SOURCE_DIR,
    trigger: options.trigger ?? 'manual',
    mode: options.mode ?? 'diagnostic',
    retentionDays: options['retention-days'] ? Number(options['retention-days']) : null,
    provenanceRecord,
  }));
  const manifestFile = path.join(runDir, 'manifest.json');
  writeJson(manifestFile, manifest);
  const comparison = options.baseline ? compareRuns(readJson(options.baseline), manifest) : null;
  if (comparison) writeJson(path.join(runDir, 'comparison.json'), comparison);
  const reportFile = path.join(runDir, 'report/index.html');
  fs.mkdirSync(path.dirname(reportFile), { recursive: true });
  fs.writeFileSync(reportFile, renderReport(manifest, comparison));
  console.log(`\nRun ${manifest.run.run_id}: ${manifest.run.status}, server tracing ${manifest.instrumentation.server_tracing}`);
  for (const scenario of manifest.scenarios) {
    for (const attempt of scenario.attempts) {
      const c = attempt.correlation;
      console.log(`  ${scenario.scenario_id}: ${attempt.status}, correlation ${c.status} (${c.matched}/${c.expected} returned, ${c.exported ?? 'not checked'} exported), ${manifest.findings.filter((f) => f.attempt_id === attempt.attempt_id).length} finding(s)`);
    }
  }
  const modelled = manifest.measurements.filter((m) => m.name === EMISSIONS);
  if (modelled.length) {
    const p = modelled[0].parameters;
    console.log(`Modelled emissions, not measured (CO2.js ${modelled[0].tool.version}, SWD v${p.model_version}, grid intensity ${p.grid_intensity_g_per_kwh.device} g/kWh for ${p.grid_intensity_year ?? 'an unchecked year'}, embodied ${p.embodied_grid_intensity_g_per_kwh ?? 'unchecked'} g/kWh):`);
    for (const m of modelled) console.log(`  ${m.scenario_id ?? 'run'}: ${m.value ?? 'not modelled'} g CO2e`);
  }
  console.log(`Manifest: ${path.relative(process.cwd(), manifestFile)}\nReport:   ${path.relative(process.cwd(), reportFile)}`);
  return manifest;
}

async function run(options) {
  const startedAt = Date.now();
  const runId = newRunId();
  const runDir = path.join(EVIDENCE_ROOT, runId);
  fs.mkdirSync(runDir, { recursive: true });
  const result = spawnSync('npx', ['playwright', 'test', options.tests ?? 'tests/observability', '--project=chromium', ...options.extra], {
    cwd: PLAYWRIGHT_DIR,
    stdio: 'inherit',
    env: {
      ...process.env,
      EVIDENCE_RUN_ID: runId,
      EVIDENCE_DIR: EVIDENCE_ROOT,
      SKIP_ADMIN_LOGIN: '1',
      OBSERVATORY_INSTALL_PROFILE: options['install-profile'] ?? '',
      OBSERVATORY_RECIPES: options.recipes ?? '',
    },
  });
  if (result.error) {
    console.error(`evidence: could not start Playwright: ${result.error.message}`);
    process.exit(1);
  }
  // Only this run's record: a file older than the run belongs to another run.
  const runInfo = path.join(PLAYWRIGHT_DIR, 'reports/run-info.json');
  if (fs.existsSync(runInfo) && fs.statSync(runInfo).mtimeMs >= startedAt) {
    fs.copyFileSync(runInfo, path.join(runDir, 'run-info.json'));
  }
  await waitForTraces(runDir, traceStoreOption(options));
  const manifest = await build(runDir, options);
  // Playwright exits 0 when every test was skipped; a run with nothing
  // passed (NOT_RUN, SKIPPED) is not a success.
  process.exit(result.status === 0 && manifest.run.status === 'PASS' ? 0 : 1);
}

function validateFiles(files) {
  let failed = false;
  for (const file of files) {
    const data = readJson(file);
    const schema = data.artifact_type === 'investigation-request' ? 'investigation-request' : 'quality-evidence';
    const { valid, errors } = validate(schema, data);
    console.log(`${valid ? 'valid  ' : 'INVALID'} ${file} (${schema})`);
    for (const error of errors) console.log(`  ${error}`);
    failed ||= !valid;
  }
  process.exit(failed ? 1 : 0);
}

const [command, ...rest] = process.argv.slice(2);
const options = parse(rest);
switch (command) {
  case 'run':
    await run(options);
    break;
  case 'build':
    if (!options.positional[0]) usage('build needs a run folder');
    await build(path.resolve(options.positional[0]), options);
    break;
  case 'validate':
    if (!options.positional.length) usage('validate needs at least one file');
    validateFiles(options.positional);
    break;
  case 'report': {
    const [file] = options.positional;
    if (!file) usage('report needs a manifest');
    const manifest = readJson(file);
    const comparison = options.compare ? compareRuns(readJson(options.compare), manifest) : null;
    const out = path.join(path.dirname(file), 'report/index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, renderReport(manifest, comparison));
    console.log(out);
    break;
  }
  case 'compare': {
    const [baseline, current] = options.positional;
    if (!baseline || !current) usage('compare needs two manifests');
    console.log(JSON.stringify(compareRuns(readJson(baseline), readJson(current)), null, 2));
    break;
  }
  case 'export-investigation': {
    const [file, findingId] = options.positional;
    if (!file || !findingId) usage('export-investigation needs a manifest and a finding id');
    const out = options.out ?? path.join(path.dirname(file), `investigation-${findingId}.json`);
    const request = buildInvestigationRequest(readJson(file), findingId, path.relative(path.dirname(out), file) || 'manifest.json', { issue: options['core-lab-issue'] ?? null });
    writeJson(out, request);
    console.log(out);
    break;
  }
  default: {
    const lines = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n');
    console.log(lines.slice(2, lines.indexOf(' */')).map((l) => l.replace(/^ \* ?/, '')).join('\n'));
    process.exit(command ? 2 : 0);
  }
}
