import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { addLighthouse, METRICS, MEDIAN_RULE, PAGES, RESULTS_FILE, RUNS_PER_PAGE } from '../playwright/lib/evidence/lighthouse.mjs';
import { addModelledEmissions } from '../playwright/lib/evidence/emissions.mjs';
import { validate } from '../playwright/lib/evidence/validate.mjs';
import { newId } from '../playwright/lib/evidence/ids.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
// A real run under schema 0.1.0; the Lighthouse results below are made by hand.
const EXAMPLE = path.join(ROOT, 'schemas/examples/quality-evidence-run.example.json');
const example = () => JSON.parse(fs.readFileSync(EXAMPLE, 'utf8'));
const lighthouseOf = (manifest) => manifest.measurements.filter((m) => m.name.startsWith('lighthouse.'));
const tempDirs = [];
test.after(() => tempDirs.forEach((dir) => fs.rmSync(dir, { recursive: true, force: true })));
const THROTTLING = { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 };

/** A Lighthouse result with only the fields the build step reads, plus a category score. */
function lhr({ fcp, tti, lcp = fcp + 100, bytes = 200000, runtimeError = null, drop = [] }) {
  const audits = {
    'first-contentful-paint': { numericValue: fcp },
    interactive: { numericValue: tti },
    'largest-contentful-paint': { numericValue: lcp },
    'total-blocking-time': { numericValue: 0 },
    'speed-index': { numericValue: fcp + 50 },
    'mainthread-work-breakdown': { numericValue: 310.5 },
    'cumulative-layout-shift': { numericValue: 0.012 },
    'total-byte-weight': { numericValue: bytes },
  };
  for (const audit of drop) delete audits[audit];
  return {
    lighthouseVersion: '13.6.0',
    fetchTime: '2026-11-26T12:00:00.000Z',
    requestedUrl: 'https://site.test/',
    environment: { hostUserAgent: 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/149.0.0.0 Safari/537.36', networkUserAgent: 'x', benchmarkIndex: 2600 },
    configSettings: { formFactor: 'desktop', onlyCategories: ['performance'], throttlingMethod: 'simulate', throttling: THROTTLING },
    categories: { performance: { id: 'performance', score: 0.98 } },
    audits,
    ...(runtimeError ? { runtimeError: { code: runtimeError, message: 'The page at https://site.test/ failed' } } : {}),
  };
}

/**
 * Writes a run folder. pages maps a page id to its runs: an LHR object, or
 * null for a run that wrote no file.
 */
function runFolder(pages, { status = 'PASS', reason = null, serverTracing = 'disabled' } = {}) {
  const runDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lighthouse-test-'));
  tempDirs.push(runDir);
  const results = {
    chromium_version: '149.0.7827.55',
    preset: 'desktop',
    runs_per_page: RUNS_PER_PAGE,
    chrome_flags: ['--headless=new', '--ignore-certificate-errors'],
    server_tracing: serverTracing,
    status,
    reason,
    pages: Object.entries(pages).map(([id, runs]) => ({
      page_id: id,
      path: PAGES.find((p) => p.id === id).path,
      runs: runs.map((result, i) => {
        if (!result) return { path: null, exit_status: 1 };
        const rel = `lighthouse/${id}/run-${i + 1}.json`;
        fs.mkdirSync(path.join(runDir, path.dirname(rel)), { recursive: true });
        fs.writeFileSync(path.join(runDir, rel), JSON.stringify(result));
        return { path: rel, exit_status: result.runtimeError ? 1 : 0 };
      }),
    })),
  };
  fs.mkdirSync(path.join(runDir, 'lighthouse'), { recursive: true });
  fs.writeFileSync(path.join(runDir, RESULTS_FILE), JSON.stringify(results));
  return runDir;
}

// Median FCP 1000 and TTI 2000: run 3 is nearest, though it is neither first nor fastest.
const THREE_RUNS = () => [lhr({ fcp: 1200, tti: 2600, lcp: 1500 }), lhr({ fcp: 900, tti: 1800, lcp: 950 }), lhr({ fcp: 1000, tti: 2000, lcp: 1100 })];

test('the installed Lighthouse is the pinned version', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'tests/playwright/package.json'), 'utf8'));
  const require = createRequire(path.join(ROOT, 'tests/playwright/package.json'));
  assert.equal(pkg.devDependencies.lighthouse, require('lighthouse/package.json').version, 'exact pin matches what is installed');
});

test('the page set is a subset of the anonymous crawl pages in lib/pages.ts', () => {
  const pages = fs.readFileSync(path.join(ROOT, 'tests/playwright/lib/pages.ts'), 'utf8');
  for (const page of PAGES) {
    assert.ok(pages.includes(`{ id: '${page.id}', name:`) && new RegExp(`id: '${page.id}', name: '[^']+', path: '${page.path}', requiresAuth: false`).test(pages), `${page.id} at ${page.path}`);
  }
});

test('adds the median run of each page as browser-timing and resource-proxy measurements', () => {
  const manifest = example();
  const runDir = runFolder({ 'user-login': THREE_RUNS(), 'user-password': THREE_RUNS() });
  assert.equal(addLighthouse(manifest, runDir), 'PASS');
  assert.equal(manifest.schema_version, '0.2.0');
  assert.deepEqual(validate('quality-evidence', manifest), { valid: true, errors: [] });

  const artifacts = manifest.artifacts.filter((a) => a.kind === 'lighthouse');
  assert.equal(artifacts.length, 6, 'every run is kept');
  assert.ok(artifacts.every((a) => a.visibility === 'private' && a.availability === 'available' && /^[0-9a-f]{64}$/.test(a.sha256)));

  const added = lighthouseOf(manifest);
  assert.equal(added.length, METRICS.length * 2);
  const login = added.filter((m) => m.parameters.page_id === 'user-login');
  assert.deepEqual(login.map((m) => [m.name, m.kind, m.unit]), METRICS.map((x) => [x.name, x.kind, x.unit]));
  const median = artifacts.find((a) => a.path === 'lighthouse/user-login/run-3.json');
  for (const m of login) {
    assert.equal(m.artifact_id, median.artifact_id, 'linked to the median run');
    assert.equal(m.instrumented, false);
    assert.deepEqual(m.tool, { name: 'lighthouse', version: '13.6.0' });
    assert.equal(m.inputs, undefined, 'not derived from other measurements');
    assert.match(m.method, /not energy and not emissions, and never combined with them/);
    assert.equal(m.parameters.median_run, 3);
    assert.equal(m.parameters.median_rule, MEDIAN_RULE);
    assert.equal(m.parameters.runs_per_page, 3);
    assert.equal(m.parameters.valid_runs, 3);
    assert.equal(m.parameters.form_factor, 'desktop');
    assert.equal(m.parameters.preset, 'desktop');
    assert.equal(m.parameters.lighthouse_version, '13.6.0');
    assert.equal(m.parameters.chromium_version, '149.0.7827.55', 'from the binary, not the reduced user agent');
    assert.equal(m.parameters.throttling_method, 'simulate');
    assert.deepEqual(m.parameters.throttling, THROTTLING);
    assert.equal(m.parameters.benchmark_index, 2600);
    assert.equal(m.parameters.page_path, '/user/login');
  }
  const lcp = login.find((m) => m.name === 'lighthouse.largest_contentful_paint');
  assert.equal(lcp.value, 1100, 'the median run, not the per-metric median or a mean');
  assert.deepEqual([lcp.parameters.run_values, lcp.parameters.lowest, lcp.parameters.highest], [[1500, 950, 1100], 950, 1500]);
  assert.equal(login.find((m) => m.name === 'lighthouse.total_byte_weight').value, 200000);
  assert.ok(manifest.tools.some((t) => t.name === 'lighthouse' && t.version === '13.6.0'));
  assert.match(manifest.run.notes.at(-1), /^Lighthouse lab performance \(desktop preset, 3 runs per page, median run reported\): PASS, 2 of 2 page\(s\) measured\./);
});

test('category scores are not copied into the manifest', () => {
  const manifest = example();
  addLighthouse(manifest, runFolder({ 'user-login': THREE_RUNS() }));
  assert.doesNotMatch(JSON.stringify(lighthouseOf(manifest)), /score/i);
  assert.ok(lighthouseOf(manifest).every((m) => !/score/i.test(m.name)));
});

test('energy and emissions values are neither read, changed nor combined', () => {
  const manifest = example();
  const bytes = manifest.measurements.find((m) => m.name === 'browser.transfer_bytes');
  const energy = { ...bytes, measurement_id: newId('msr'), name: 'client.energy_incremental', value: 12.5, unit: 'J', kind: 'energy-measured' };
  manifest.measurements.push(energy);
  addModelledEmissions(manifest);
  const before = JSON.parse(JSON.stringify(manifest.measurements));
  addLighthouse(manifest, runFolder({ 'user-login': THREE_RUNS() }));
  assert.deepEqual(manifest.measurements.slice(0, before.length), before, 'earlier measurements are unchanged');
  // The other order: CO2.js still models only browser.transfer_bytes.
  const other = example();
  addLighthouse(other, runFolder({ 'user-login': THREE_RUNS() }));
  addModelledEmissions(other);
  const lighthouseIds = new Set(lighthouseOf(other).map((m) => m.measurement_id));
  const modelled = other.measurements.filter((m) => m.kind === 'emissions-modelled');
  assert.equal(modelled.length, other.measurements.filter((m) => m.name === 'browser.transfer_bytes').length);
  assert.ok(modelled.every((m) => m.inputs.every((id) => !lighthouseIds.has(id))));
});

test('failed runs are left out of the median, shown as null, and make the step inconclusive', () => {
  const manifest = example();
  const runs = [lhr({ fcp: 1, tti: 1, runtimeError: 'ERRORED_DOCUMENT_REQUEST' }), null, lhr({ fcp: 1000, tti: 2000, lcp: 1100 })];
  assert.equal(addLighthouse(manifest, runFolder({ 'user-login': runs })), 'INCONCLUSIVE', 'three runs per page were asked for');
  assert.equal(manifest.run.notes.at(-1), 'Lighthouse: measured user-login from 1 of 3 runs (run 1: ERRORED_DOCUMENT_REQUEST; run 2: Lighthouse exited with status 1 and wrote no result).');
  const lcp = lighthouseOf(manifest).find((m) => m.name === 'lighthouse.largest_contentful_paint');
  assert.equal(lcp.value, 1100);
  assert.equal(lcp.parameters.valid_runs, 1);
  assert.equal(lcp.parameters.median_run, 3);
  assert.deepEqual([lcp.parameters.run_values, lcp.parameters.lowest, lcp.parameters.highest], [[null, null, 1100], 1100, 1100]);
  assert.equal(manifest.artifacts.filter((a) => a.kind === 'lighthouse').length, 2, 'the run that wrote no file has no artifact');
});

test('a page with no valid run is "Not measured", never zero', () => {
  const manifest = example();
  const failed = [lhr({ fcp: 1, tti: 1, runtimeError: 'ERRORED_DOCUMENT_REQUEST' }), null, lhr({ fcp: 1000, tti: 2000, drop: ['interactive'] })];
  assert.equal(addLighthouse(manifest, runFolder({ 'user-login': THREE_RUNS(), 'user-password': failed })), 'INCONCLUSIVE');
  assert.ok(lighthouseOf(manifest).every((m) => m.parameters.page_id === 'user-login'));
  const note = manifest.run.notes.at(-1);
  assert.equal(note, 'Lighthouse: not measured for user-password (run 1: ERRORED_DOCUMENT_REQUEST; run 2: Lighthouse exited with status 1 and wrote no result; run 3: no First Contentful Paint or Time to Interactive value).');
  assert.doesNotMatch(manifest.run.notes.join(' '), /site\.test/, 'no URL in the published notes');
  assert.equal(validate('quality-evidence', manifest).valid, true);
});

test('no page measured is an infrastructure error', () => {
  const manifest = example();
  assert.equal(addLighthouse(manifest, runFolder({ 'user-login': [null, null, null] })), 'INFRASTRUCTURE_ERROR');
  assert.equal(lighthouseOf(manifest).length, 0);
});

test('an audit missing from the median run is recorded as not measured', () => {
  const manifest = example();
  addLighthouse(manifest, runFolder({ 'user-login': [lhr({ fcp: 1000, tti: 2000, drop: ['total-byte-weight'] })] }));
  const weight = lighthouseOf(manifest).find((m) => m.name === 'lighthouse.total_byte_weight');
  assert.equal(weight.value, null);
  assert.equal(weight.method, 'Not measured: the median Lighthouse run has no total-byte-weight value.');
  assert.deepEqual([weight.parameters.lowest, weight.parameters.highest], [null, null]);
});

test('a skipped step adds a note and a not-collected artifact, and no values', () => {
  const manifest = example();
  const runDir = runFolder({}, { status: 'SKIPPED', reason: 'server tracing was on; Lighthouse runs only with tracing off', serverTracing: 'enabled' });
  assert.equal(addLighthouse(manifest, runDir), 'SKIPPED');
  assert.equal(manifest.schema_version, '0.1.0', 'nothing that needs 0.2.0 was added');
  assert.equal(lighthouseOf(manifest).length, 0);
  assert.deepEqual(manifest.artifacts.filter((a) => a.kind === 'lighthouse').map((a) => [a.availability, a.note]), [['not-collected', 'Not measured: server tracing was on; Lighthouse runs only with tracing off.']]);
  assert.equal(manifest.run.notes.at(-1), 'Lighthouse lab performance (desktop preset, 3 runs per page, median run reported): SKIPPED. Not measured: server tracing was on; Lighthouse runs only with tracing off.');
  assert.equal(validate('quality-evidence', manifest).valid, true);
});

test('a second pass is refused', () => {
  const manifest = example();
  const runDir = runFolder({ 'user-login': THREE_RUNS() });
  addLighthouse(manifest, runDir);
  assert.throws(() => addLighthouse(manifest, runDir), /already has Lighthouse measurements/);
});

test('run refuses a form factor other than desktop before running anything', () => {
  const r = spawnSync(process.execPath, [path.join(ROOT, 'tests/playwright/scripts/evidence.mjs'), 'run', '--lighthouse', 'mobile'], { encoding: 'utf8' });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /--lighthouse takes desktop/);
});
