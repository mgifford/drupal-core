/**
 * Lighthouse lab results in an evidence manifest.
 *
 * Reads what lighthouse-run.mjs left in <run dir>/lighthouse/ and adds, for
 * each page, the median run's lab metrics as measurements (kinds
 * browser-timing and resource-proxy) and every run's full result as a
 * private artifact of kind `lighthouse`. See
 * docs/architecture/SUSTAINABILITY-REPORTING.md, section 2, and owner
 * decisions 4 to 6 there.
 *
 * These are lab values from one machine. They are not energy and not
 * emissions, and they are never added to, averaged with or weighted against
 * energy or emissions values. Category scores are not copied into the
 * manifest: they stay in the private results, for the summary page, where
 * they are shown as lab scores (decision 5).
 *
 * Needs the `lighthouse` package for its median-run rule, so evidence.mjs
 * loads this file only for a run folder that has Lighthouse results.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { computeMedianRun, filterToValidRuns } from 'lighthouse/core/lib/median-run.js';
import { newId } from './ids.mjs';
import { artifactRecord } from './manifest.mjs';
import { validate } from './validate.mjs';

export const RESULTS_FILE = 'lighthouse/results.json';
export const RUNS_PER_PAGE = 3;

/**
 * The starting page set (decision 4: small and representative), with the
 * ids and paths of lib/pages.ts. On a fresh install of upstream's Standard
 * profile these are the anonymous pages that render: its front page is
 * /admin/welcome and it creates no content, and /user/register is closed
 * to visitors. Pages behind a login need Lighthouse to carry a session and
 * come later. The set grows once a real run has been timed.
 */
export const PAGES = [
  { id: 'user-login', path: '/user/login' },
  { id: 'user-password', path: '/user/password' },
];

/** Lighthouse audits recorded as measurements, and how. */
export const METRICS = [
  { audit: 'first-contentful-paint', name: 'lighthouse.first_contentful_paint', unit: 'ms', kind: 'browser-timing' },
  { audit: 'largest-contentful-paint', name: 'lighthouse.largest_contentful_paint', unit: 'ms', kind: 'browser-timing' },
  { audit: 'total-blocking-time', name: 'lighthouse.total_blocking_time', unit: 'ms', kind: 'browser-timing' },
  { audit: 'speed-index', name: 'lighthouse.speed_index', unit: 'ms', kind: 'browser-timing' },
  { audit: 'mainthread-work-breakdown', name: 'lighthouse.main_thread_time', unit: 'ms', kind: 'browser-timing' },
  { audit: 'cumulative-layout-shift', name: 'lighthouse.cumulative_layout_shift', unit: 'unitless', kind: 'browser-timing' },
  { audit: 'total-byte-weight', name: 'lighthouse.total_byte_weight', unit: 'bytes', kind: 'resource-proxy' },
];

export const MEDIAN_RULE = 'Lighthouse computeMedianRun (core/lib/median-run.js): of the runs that have First Contentful Paint and Time to Interactive values, the run nearest to the median of both; a tie goes to the lower Time to Interactive. Every metric is read from that one run.';

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const value = (lhr, audit) => (Number.isFinite(lhr?.audits?.[audit]?.numericValue) ? lhr.audits[audit].numericValue : null);

/** Why a run gave no values, without the URL or anything else private. */
function runProblem(run, lhr) {
  if (!lhr) return `run ${run.number}: Lighthouse exited with status ${run.exit_status ?? 'none'} and wrote no result`;
  if (lhr.runtimeError) return `run ${run.number}: ${lhr.runtimeError.code}`;
  return `run ${run.number}: no First Contentful Paint or Time to Interactive value`;
}

/**
 * Adds the Lighthouse measurements and artifacts of one run folder to its
 * manifest, which is changed in place and validated. Returns the status of
 * the Lighthouse step, in the execution status vocabulary: PASS when every
 * run of every page gave values, INCONCLUSIVE when a page was left out or
 * measured from fewer runs, INFRASTRUCTURE_ERROR when no page was measured,
 * and the runner's own SKIPPED or INFRASTRUCTURE_ERROR when it ran nothing.
 */
export function addLighthouse(manifest, runDir, { retentionDays = null } = {}) {
  if (manifest.measurements.some((m) => m.name.startsWith('lighthouse.'))) {
    throw new Error('the manifest already has Lighthouse measurements');
  }
  const results = readJson(path.join(runDir, RESULTS_FILE));
  const setting = `${results.preset} preset, ${results.runs_per_page} runs per page, median run reported`;
  const notes = (manifest.run.notes ??= []);
  const added = [];
  const unmeasured = [];
  const partial = [];
  let tool = null;

  for (const page of results.pages) {
    const runs = page.runs.map((run, i) => {
      const number = i + 1;
      if (!run.path) return { ...run, number, lhr: null, artifact: null };
      const artifact = artifactRecord(runDir, { kind: 'lighthouse', path: run.path, visibility: 'private', note: `Full Lighthouse result, page ${page.page_id}, run ${number} of ${results.runs_per_page}. Private: it holds screenshots and URLs of the test site.` }, retentionDays);
      manifest.artifacts.push(artifact);
      return { ...run, number, artifact, lhr: artifact.availability === 'available' ? readJson(path.join(runDir, run.path)) : null };
    });
    const valid = new Set(filterToValidRuns(runs.filter((r) => r.lhr && !r.lhr.runtimeError).map((r) => r.lhr)));
    if (!valid.size) {
      unmeasured.push(`${page.page_id} (${runs.map((r) => runProblem(r, r.lhr)).join('; ')})`);
      continue;
    }
    if (valid.size < results.runs_per_page) {
      partial.push(`${page.page_id} from ${valid.size} of ${results.runs_per_page} runs (${runs.filter((r) => !valid.has(r.lhr)).map((r) => runProblem(r, r.lhr)).join('; ')})`);
    }
    const lhr = computeMedianRun([...valid]);
    const median = runs.find((r) => r.lhr === lhr);
    tool ??= { name: 'lighthouse', version: lhr.lighthouseVersion };
    const settings = lhr.configSettings;
    for (const metric of METRICS) {
      const runValues = runs.map((r) => (valid.has(r.lhr) ? value(r.lhr, metric.audit) : null));
      const known = runValues.filter((v) => v !== null);
      const measured = value(lhr, metric.audit);
      added.push({
        measurement_id: newId('msr'),
        name: metric.name,
        value: measured,
        unit: metric.unit,
        kind: metric.kind,
        tool: { name: 'lighthouse', version: lhr.lighthouseVersion },
        measured_at: lhr.fetchTime,
        instrumented: results.server_tracing !== 'disabled',
        method: measured === null
          ? `Not measured: the median Lighthouse run has no ${metric.audit} value.`
          : `Lighthouse ${metric.audit} audit, page ${page.page_id}, from the median of ${valid.size} valid run(s) (${setting}). A lab value from one machine: not energy and not emissions, and never combined with them.`,
        artifact_id: median.artifact.artifact_id,
        parameters: {
          page_id: page.page_id,
          page_path: page.path,
          audit: metric.audit,
          lighthouse_version: lhr.lighthouseVersion,
          chromium_version: results.chromium_version ?? null,
          chrome_flags: results.chrome_flags,
          preset: results.preset,
          form_factor: settings.formFactor,
          only_categories: settings.onlyCategories,
          throttling_method: settings.throttlingMethod,
          throttling: settings.throttling,
          benchmark_index: lhr.environment?.benchmarkIndex ?? null,
          runs_per_page: results.runs_per_page,
          valid_runs: valid.size,
          median_rule: MEDIAN_RULE,
          median_run: median.number,
          run_values: runValues,
          lowest: known.length ? Math.min(...known) : null,
          highest: known.length ? Math.max(...known) : null,
        },
      });
    }
  }

  let status = results.status;
  if (status === 'PASS') {
    const measured = results.pages.length - unmeasured.length;
    if (measured === 0) status = 'INFRASTRUCTURE_ERROR';
    else if (unmeasured.length || partial.length) status = 'INCONCLUSIVE';
    notes.push(`Lighthouse lab performance (${setting}): ${status}, ${measured} of ${results.pages.length} page(s) measured. Lab values, not energy or emissions; category scores are kept in the private results only.`);
    for (const page of partial) notes.push(`Lighthouse: measured ${page}.`);
    for (const page of unmeasured) notes.push(`Lighthouse: not measured for ${page}.`);
  }
  else {
    notes.push(`Lighthouse lab performance (${setting}): ${status}. Not measured: ${results.reason}.`);
    manifest.artifacts.push({ artifact_id: newId('art'), kind: 'lighthouse', visibility: 'private', availability: 'not-collected', note: `Not measured: ${results.reason}.` });
  }

  if (added.length) {
    manifest.schema_version = '0.2.0';
    manifest.measurements.push(...added);
    if (!manifest.tools.some((t) => t.name === tool.name && t.version === tool.version)) {
      manifest.tools.push(tool);
    }
  }
  const { valid, errors } = validate('quality-evidence', manifest);
  if (!valid) {
    throw new Error(`manifest with Lighthouse results does not match the schema:\n${errors.join('\n')}`);
  }
  return status;
}
