/**
 * Site state and run summary for the axe crawl (tests/crawl/a11y-axe-crawl.spec.ts).
 *
 * Registered as Playwright's globalTeardown, so it runs once per
 * invocation after every worker has exited, also when tests failed. It must
 * not be an afterAll: Playwright runs afterAll per worker, and a failed test
 * restarts the worker. The teardown:
 *
 * 1. Restores the site state this run's crawl captured before switching
 *    themes. State captured by another run is left alone: that crawl may
 *    still be running in another terminal.
 * 2. Writes <run dir>/crawl-coverage.json when the run recorded crawl pages.
 *
 * It does nothing for runs that neither switched themes nor crawled. A run
 * that is interrupted (Ctrl-C) or killed may end before this teardown: the
 * next crawl restores the state it left first, and
 * `npm --prefix tests/playwright run crawl:restore` does so by hand.
 *
 * Drush runs through `ddev exec dr` in DRUPAL_SOURCE_DIR (the checkout the
 * site is served from; default: this repository).
 */
import * as fs from 'fs';
import * as path from 'path';
import { anonymousPages, adminPages } from './pages';
import { THEME_CONFIGS } from './theme-configs';
import { resolveProfile, summarizeCoverage } from './crawl.mjs';
import { crawlSite, describeRestore } from './crawl-site.mjs';

/** Every page the crawl plans to visit, in order. */
export const CRAWL_PAGES = [...anonymousPages, ...adminPages];

/** The site under test, with its state file (gitignored under reports/). */
export const site = crawlSite({
  siteDir: path.resolve(process.env.DRUPAL_SOURCE_DIR ?? path.join(__dirname, '../../..')),
  stateFile: path.join(__dirname, '../reports/crawl-site-state.json'),
});

function writeCoverage(): void {
  const runId = process.env.EVIDENCE_RUN_ID;
  if (!runId) {
    return;
  }
  const runDir = path.join(process.env.EVIDENCE_DIR ?? path.join(__dirname, '../reports/evidence'), runId);
  const scenarioDir = path.join(runDir, 'scenarios');
  if (!fs.existsSync(scenarioDir)) {
    return;
  }
  const records = fs.readdirSync(scenarioDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => JSON.parse(fs.readFileSync(path.join(scenarioDir, file), 'utf8')))
    .filter((record) => record.crawl);
  if (!records.length) {
    return;
  }
  const profile = resolveProfile(process.env.CRAWL_THEME, THEME_CONFIGS);
  const coverage = summarizeCoverage({ runId, profile, pages: CRAWL_PAGES, records });
  const file = path.join(runDir, 'crawl-coverage.json');
  fs.writeFileSync(file, JSON.stringify(coverage, null, 2) + '\n');

  const t = coverage.totals;
  console.log(`\ncrawl: profile ${coverage.profile}, ${t.scanned} of ${t.planned} pages scanned, ${t.skipped} skipped, ` +
    `${t.not_scanned} not scanned, ${t.not_run} not run; ${t.violations} violation(s), ${t.new} new, ${t.resolved} resolved.`);
  for (const page of coverage.pages.filter((row) => row.status !== 'scanned')) {
    console.log(`  ${page.status}: ${page.page_id} (${page.path}): ${page.reason}`);
  }
  console.log(`  Coverage: ${path.relative(process.cwd(), file)}`);
}

export default async function crawlFinalize(): Promise<void> {
  let restoreError: Error | null = null;
  try {
    const restored = site.restoreOwn(process.env.EVIDENCE_RUN_ID);
    if (restored) {
      console.log(describeRestore(restored));
    }
  }
  catch (error) {
    restoreError = error as Error;
  }
  writeCoverage();
  if (restoreError) {
    throw restoreError;
  }
}
