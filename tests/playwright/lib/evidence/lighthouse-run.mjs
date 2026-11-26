/**
 * Runs Lighthouse for `evidence.mjs run --lighthouse desktop`.
 *
 * Calls the CLI of the pinned `lighthouse` package, one process and one
 * fresh Chromium per run, with Playwright's Chromium build (CHROME_PATH)
 * on a free port that Lighthouse picks. It uses Lighthouse's desktop preset
 * unchanged and runs the performance category only (owner decisions 4 and
 * 6 in docs/architecture/SUSTAINABILITY-REPORTING.md). Pages run one at a
 * time, after the Playwright tests have finished, and only when the site's
 * server tracing is off.
 *
 * Writes the full result of each run to <run dir>/lighthouse/<page id>/run-<n>.json
 * and a summary to <run dir>/lighthouse/results.json, which lighthouse.mjs
 * turns into manifest entries when the manifest is built.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium, request } from '@playwright/test';
import { PAGES, RESULTS_FILE, RUNS_PER_PAGE } from './lighthouse.mjs';

const CLI = fileURLToPath(import.meta.resolve('lighthouse/cli/index.js'));
// Certificate errors are ignored as in playwright.config.ts (ignoreHTTPSErrors),
// for the local DDEV certificate.
export const CHROME_FLAGS = ['--headless=new', '--ignore-certificate-errors'];
const RUN_TIMEOUT_MS = 5 * 60000;

/** Asks the site whether server tracing is on, as the specs do. */
async function serverTracing(baseURL) {
  const context = await request.newContext({ baseURL, ignoreHTTPSErrors: true });
  try {
    const response = await context.get('/user/login');
    return response.headers()['traceresponse'] ? 'enabled' : 'disabled';
  }
  finally {
    await context.dispose();
  }
}

/**
 * Runs every page of PAGES RUNS_PER_PAGE times and writes results.json.
 * Returns the summary it wrote.
 */
export async function runLighthouse({ runDir, baseURL }) {
  const chromiumPath = chromium.executablePath();
  const results = {
    // Read from the binary: Lighthouse's user agent string gives only the major version.
    chromium_version: /([\d.]+)\s*$/.exec(spawnSync(chromiumPath, ['--version'], { encoding: 'utf8' }).stdout ?? '')?.[1] ?? null,
    preset: 'desktop',
    runs_per_page: RUNS_PER_PAGE,
    chrome_flags: CHROME_FLAGS,
    server_tracing: 'unknown',
    status: 'PASS',
    reason: null,
    pages: [],
  };
  const done = () => {
    fs.mkdirSync(path.join(runDir, path.dirname(RESULTS_FILE)), { recursive: true });
    fs.writeFileSync(path.join(runDir, RESULTS_FILE), JSON.stringify(results, null, 2) + '\n');
    return results;
  };
  try {
    results.server_tracing = await serverTracing(baseURL);
  }
  catch (error) {
    console.error(`Lighthouse: could not reach the site: ${error.message.split('\n')[0]}`);
    results.status = 'INFRASTRUCTURE_ERROR';
    results.reason = 'the site did not answer the server tracing check';
    return done();
  }
  if (results.server_tracing !== 'disabled') {
    console.error('Lighthouse: server tracing is on, so Lighthouse does not run (see SUSTAINABILITY-REPORTING.md, rule 4).');
    results.status = 'SKIPPED';
    results.reason = 'server tracing was on; Lighthouse runs only with tracing off';
    return done();
  }
  const env = { ...process.env, CHROME_PATH: chromiumPath };
  for (const page of PAGES) {
    const entry = { page_id: page.id, path: page.path, runs: [] };
    results.pages.push(entry);
    for (let n = 1; n <= RUNS_PER_PAGE; n++) {
      const rel = `lighthouse/${page.id}/run-${n}.json`;
      const file = path.join(runDir, rel);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      const r = spawnSync(process.execPath, [
        CLI, new URL(page.path, baseURL).href,
        `--preset=${results.preset}`,
        '--only-categories=performance',
        '--output=json',
        `--output-path=${file}`,
        `--chrome-flags=${CHROME_FLAGS.join(' ')}`,
        '--no-enable-error-reporting',
        '--quiet',
      ], { env, encoding: 'utf8', timeout: RUN_TIMEOUT_MS });
      const written = fs.existsSync(file);
      entry.runs.push({ path: written ? rel : null, exit_status: r.status });
      console.log(`Lighthouse ${page.id}, run ${n} of ${RUNS_PER_PAGE}: ${r.status === 0 ? 'done' : `exit ${r.status ?? r.signal}`}`);
      if (r.status !== 0) {
        console.error((r.error?.message ?? r.stderr ?? '').trim().split('\n').slice(0, 3).join('\n'));
      }
    }
  }
  return done();
}
