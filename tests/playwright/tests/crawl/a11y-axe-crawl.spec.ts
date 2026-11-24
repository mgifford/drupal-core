/**
 * Multi-page axe-core crawl of Drupal core pages, restored from commit
 * d8a45b3fe0 (core/tests/playwright/tests/a11y-axe-crawl.spec.ts).
 *
 * Run it through the evidence runner, which gives the run one id and builds
 * the manifest afterwards:
 *   npm --prefix tests/playwright run test:crawl
 * Run any other way, every test here is reported as skipped.
 *
 * For each page in lib/pages.ts (anonymous and logged-in pages) it:
 * - checks the HTTP status, so an error page is never scanned by mistake;
 * - runs axe-core with the old crawl's full tag set (WCAG 2.x A and AA plus
 *   best practices) and keeps the unmodified results in the run folder;
 * - writes a scenario record, so the findings land in the evidence manifest
 *   and `evidence.mjs compare` can classify them across runs;
 * - fails on violations that are not in baselines/axe/crawl-<profile>.json.
 *   The baseline never hides a finding: every violation stays in the raw
 *   results, the manifest and crawl-coverage.json.
 *
 * Profiles (one per run, docs/testing/PLAYWRIGHT.md):
 * - installed (default): the site's themes as they are. Nothing is changed.
 * - CRAWL_THEME=<id> from lib/theme-configs.ts: the crawl captures the site
 *   state, switches themes with Drush, and the global teardown
 *   (lib/crawl-finalize.ts) restores the state, also when tests fail. If a
 *   run is interrupted before its teardown, the next crawl restores first
 *   (or run `npm --prefix tests/playwright run crawl:restore`).
 *
 * Not restored from the old crawl yet: the other viewports, Default Admin
 * accent presets, RTL scans, page resource metrics and accessibility-tree
 * snapshots.
 *
 * A clean scan is not WCAG conformance: axe finds only some barriers.
 */
import { test as base, expect, type BrowserContext, type Page, type TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';
import { adminPages, anonymousPages, type PageEntry } from '../../lib/pages';
import { THEME_CONFIGS } from '../../lib/theme-configs';
import { compareWithBaseline, violationKeys } from '../../lib/axe-baseline.mjs';
import {
  CRAWL_TAGS, baselineFileName, baselineFor, crawlScenarioId, expectedStatusFor, resolveProfile, skipReason, statusProblem, testProfile,
} from '../../lib/crawl.mjs';
import { site } from '../../lib/crawl-finalize';
import { describeRestore } from '../../lib/crawl-site.mjs';
import { EvidenceRecorder } from '../../lib/evidence/recorder.mjs';
import { currentRun, writeRunFile } from '../../lib/evidence/run-dir.mjs';
import { sanitizeOrigin, sanitizePath } from '../../lib/evidence/sanitize.mjs';

const USER = process.env.DRUPAL_TEST_USER;
const PASS = process.env.DRUPAL_TEST_PASS;
const PROFILE = resolveProfile(process.env.CRAWL_THEME, THEME_CONFIGS);
const BASELINE_FILE = path.join(__dirname, '../../baselines/axe', baselineFileName(PROFILE.id));
const REPRODUCE = `${PROFILE.themeConfig ? `CRAWL_THEME=${PROFILE.id} ` : ''}npm --prefix tests/playwright run test:crawl`;

type Themes = { default: string; admin: string };
type CrawlRecord = {
  page_id: string; path: string; requires_auth: boolean; profile: string; themes: Themes | null;
  color_scheme: 'light' | 'dark'; tags: string[]; axe_core: string | null;
  status: 'scanned' | 'skipped' | 'not-scanned'; reason: string | null; http_status: number | null;
  violation_keys: string[]; incomplete: number;
  baseline: { file: string; problems: string[]; warnings: string[]; added: string[]; resolved: string[] } | null;
};

// Set once per worker.
let themes: Themes | null = null;
let setupError: string | null = null;
let loginError: string | null = null;
let instrumentation: 'enabled' | 'disabled' | null = null;

type SessionState = Awaited<ReturnType<BrowserContext['storageState']>>;

/**
 * Logs in once per worker, on the first logged-in page, and shares the
 * session with the rest. A failed login is recorded against those pages
 * instead of failing the anonymous ones.
 */
const test = base.extend<{ asEditor: boolean }, { editorSession: () => Promise<SessionState | undefined> }>({
  asEditor: [false, { option: true }],
  editorSession: [async ({ browser }, use, workerInfo) => {
    let session: Promise<SessionState | undefined> | null = null;
    const logIn = async (): Promise<SessionState | undefined> => {
      if (!USER || !PASS) {
        return undefined;
      }
      const context = await browser.newContext({ baseURL: workerInfo.project.use.baseURL, ignoreHTTPSErrors: true });
      try {
        const page = await context.newPage();
        await page.goto('/user/login');
        await page.getByRole('textbox', { name: 'Username' }).fill(USER);
        await page.getByLabel('Password', { exact: true }).fill(PASS);
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page, 'still on the login form').not.toHaveURL(/\/user\/login/);
        return await context.storageState();
      }
      catch (error) {
        loginError = `Login as DRUPAL_TEST_USER failed: ${firstLine(error)}`;
        return undefined;
      }
      finally {
        await context.close();
      }
    };
    await use(() => (session ??= logIn()));
  }, { scope: 'worker' }],
  storageState: async ({ asEditor, editorSession, storageState }, use) => {
    await use(asEditor ? await editorSession() : storageState);
  },
});

test.skip(!process.env.EVIDENCE_RUN_ID, 'Run the crawl with npm --prefix tests/playwright run test:crawl (see docs/testing/PLAYWRIGHT.md).');
test.use({ colorScheme: PROFILE.colorScheme });

test.beforeAll(() => {
  try {
    // A run that was interrupted may have left the site switched: put it
    // back before anything is scanned or captured.
    const runId = process.env.EVIDENCE_RUN_ID!;
    const restored = PROFILE.themeConfig ? site.capture(runId) : site.restoreStale(runId);
    if (restored) {
      console.log(describeRestore(restored));
    }
    if (PROFILE.themeConfig) {
      site.apply(PROFILE.themeConfig);
    }
    themes = site.readThemes();
    if (PROFILE.themeConfig && (themes.default !== PROFILE.themeConfig.defaultTheme || themes.admin !== PROFILE.themeConfig.adminTheme)) {
      throw new Error(`theme switch did not apply: site uses ${themes.default}+${themes.admin}`);
    }
  }
  catch (error) {
    setupError = `Site setup failed: ${(error as Error).message.split('\n')[0]}`;
  }
});

/** Asks the site whether server tracing is on, without recording anything. */
async function probeTracing(page: Page): Promise<'enabled' | 'disabled'> {
  const response = await page.request.get('/user/login');
  return response.headers()['traceresponse'] ? 'enabled' : 'disabled';
}

/** Waits until the page is a complete document; some admin pages briefly have an empty title. */
async function ensurePageReadyForScan(page: Page, route: string): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  // Network idle can time out on pages with background requests.
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => undefined);
  await page.waitForFunction(() => document.title.trim().length > 0, undefined, { timeout: 4000 }).catch(() => undefined);
  const state = await page.evaluate(() => ({
    title: document.title.trim(),
    lang: document.documentElement.getAttribute('lang'),
    error: (document.body?.innerText ?? '').includes('The website encountered an unexpected error'),
  }));
  if (state.error) {
    throw new Error(`${route} rendered a Drupal error page instead of the target page.`);
  }
  if (!state.title || !state.lang) {
    throw new Error(`${route} has no usable document to scan (title="${state.title}", lang=${state.lang ?? 'null'}).`);
  }
}

function firstLine(error: unknown): string {
  return (error instanceof Error ? error.message : String(error)).split('\n')[0];
}

/** Scans one page and records it. Returns a skip reason, or null when the page was attempted. */
async function crawlPage(page: Page, testInfo: TestInfo, entry: PageEntry): Promise<string | null> {
  const scenarioId = crawlScenarioId(PROFILE.id, entry.id);
  const evidenceRoot = path.join(path.dirname(testInfo.config.configFile ?? testInfo.config.rootDir), 'reports/evidence');
  const { runDir } = currentRun(evidenceRoot);
  const baseURL = testInfo.project.use.baseURL!;
  instrumentation ??= setupError ? null : await probeTracing(page);

  const crawl: CrawlRecord = {
    page_id: entry.id, path: entry.path, requires_auth: entry.requiresAuth, profile: PROFILE.id, themes,
    color_scheme: PROFILE.colorScheme, tags: CRAWL_TAGS, axe_core: null,
    status: 'not-scanned', reason: null, http_status: null, violation_keys: [], incomplete: 0, baseline: null,
  };
  const skip = setupError ? null : skipReason(entry, { themeConfig: PROFILE.themeConfig, hasCredentials: Boolean(USER && PASS) });
  // Problems with the site or the test account, not with the page.
  const infrastructureError = setupError ?? (entry.requiresAuth && !skip ? loginError : null);
  const recorder = new EvidenceRecorder(page, { baseURL, instrumentation: instrumentation ?? 'unknown', retry: testInfo.retry }).start();
  const scans: object[] = [];
  let failure: string | null = null;
  try {
    if (infrastructureError) {
      throw new Error(infrastructureError);
    }
    if (skip) {
      crawl.status = 'skipped';
      crawl.reason = skip;
      return skip;
    }
    await recorder.step(`Open ${entry.path}`, async () => {
      const response = await page.goto(entry.path, { waitUntil: 'domcontentloaded' });
      crawl.http_status = response?.status() ?? null;
      const problem = statusProblem(entry.path, crawl.http_status, expectedStatusFor(entry));
      if (problem) {
        throw new Error(problem);
      }
      await ensurePageReadyForScan(page, entry.path);
    });
    const pageActionId = recorder.pageActionId;
    const results = await recorder.step('Scan with axe-core', async () => {
      const axe = await new AxeBuilder({ page }).withTags(CRAWL_TAGS).analyze();
      const resultsFile = writeRunFile(runDir, `artifacts/axe-${scenarioId}-${recorder.attempt.attempt_id}.json`, axe);
      const url = new URL(page.url());
      scans.push({
        tool: { name: 'axe-core', version: axe.testEngine.version },
        action_id: recorder.currentAction!.action_id,
        page_action_id: pageActionId,
        url: sanitizePath(url.pathname + url.search),
        results_file: resultsFile,
        test_profile: testProfile(themes!),
      });
      return axe;
    });

    crawl.status = 'scanned';
    crawl.axe_core = results.testEngine.version;
    crawl.violation_keys = violationKeys(results.violations);
    crawl.incomplete = results.incomplete.reduce((sum, rule) => sum + rule.nodes.length, 0);
    const known = baselineFor(fs.existsSync(BASELINE_FILE) ? JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8')) : null, entry.id, {
      themes: themes!, colorScheme: PROFILE.colorScheme, tags: CRAWL_TAGS, axeVersion: crawl.axe_core,
    });
    const { added, resolved } = compareWithBaseline(results.violations, known.accepted);
    crawl.baseline = { file: path.basename(BASELINE_FILE), problems: known.problems, warnings: known.warnings, added, resolved };

    for (const note of [...known.problems, ...known.warnings]) {
      testInfo.annotations.push({ type: 'baseline', description: note });
    }
    if (resolved.length) {
      testInfo.annotations.push({ type: 'baseline-resolved', description: `No longer found, remove from ${path.basename(BASELINE_FILE)}: ${resolved.join('; ')}` });
    }
    console.log(`crawl ${scenarioId}: ${crawl.violation_keys.length} violation(s), ${added.length} new, ` +
      `${resolved.length} resolved, ${crawl.incomplete} need review`);
    expect(added, `axe violations not in ${path.basename(BASELINE_FILE)}${known.problems.length ? ` (${known.problems.join(' ')})` : ''}`).toEqual([]);
    return null;
  }
  catch (error) {
    failure = firstLine(error);
    throw error;
  }
  finally {
    if (crawl.status === 'not-scanned') {
      crawl.reason = failure;
    }
    const status = crawl.status === 'skipped' ? 'SKIPPED' : infrastructureError ? 'INFRASTRUCTURE_ERROR' : failure ? 'FAIL' : 'PASS';
    const attempt = await recorder.stop({ status, failureReason: failure ?? crawl.reason });
    writeRunFile(runDir, `scenarios/${scenarioId}-${attempt.attempt_id}.json`, {
      scenario_id: scenarioId,
      title: `axe crawl (${PROFILE.id}): ${entry.name} (${entry.path})`,
      spec: `${testInfo.file.split('tests/playwright/')[1] ?? testInfo.file} > ${testInfo.titlePath.slice(1).join(' > ')}`,
      reproduce: REPRODUCE,
      instrumentation: instrumentation ?? 'unknown',
      install_profile: process.env.OBSERVATORY_INSTALL_PROFILE || null,
      recipes: process.env.OBSERVATORY_RECIPES ? process.env.OBSERVATORY_RECIPES.split(',') : [],
      environment: {
        base_url: sanitizeOrigin(baseURL),
        browser: { name: testInfo.project.use.browserName ?? 'chromium', version: page.context().browser()?.version() ?? null },
        viewport: page.viewportSize(),
        color_scheme: PROFILE.colorScheme,
        reduced_motion: null,
        runner: process.env.CI ? 'github-actions' : 'local-ddev',
      },
      tools: [{ name: 'playwright', version: testInfo.config.version }, ...scans.map((scan) => (scan as { tool: object }).tool)],
      attempt,
      scans,
      artifacts: [],
      crawl,
    });
  }
}

function crawlGroup(title: string, pages: PageEntry[], asEditor: boolean) {
  test.describe(title, () => {
    test.use({ asEditor });
    for (const entry of pages) {
      test(`${entry.name} (${entry.path})`, async ({ page }, testInfo) => {
        const skip = await crawlPage(page, testInfo, entry);
        test.skip(skip !== null, skip ?? '');
      });
    }
  });
}

crawlGroup('axe crawl: anonymous pages', anonymousPages, false);
crawlGroup('axe crawl: pages that need a login', adminPages, true);
