/**
 * Observability pilot: links browser actions, Drupal server traces and axe
 * findings in one evidence record (docs/observability/README.md).
 *
 * Run it through the evidence runner, which sets the run id and builds the
 * manifest and report afterwards:
 *   node tests/playwright/scripts/evidence.mjs run
 *
 * Server tracing is optional. The test asks the site whether it returns a
 * `traceresponse` header and records "enabled" or "disabled"; it passes
 * either way. Needs DRUPAL_TEST_USER and DRUPAL_TEST_PASS (see PLAYWRIGHT.md).
 */
import { test, expect, type Page, type TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as path from 'path';
import { EvidenceRecorder } from '../../lib/evidence/recorder.mjs';
import { currentRun, writeRunFile } from '../../lib/evidence/run-dir.mjs';
import { sanitizeOrigin, sanitizePath } from '../../lib/evidence/sanitize.mjs';

const USER = process.env.DRUPAL_TEST_USER;
const PASS = process.env.DRUPAL_TEST_PASS;
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const REPRODUCE = 'node tests/playwright/scripts/evidence.mjs run';

type Scan = { tool: { name: string; version: string | null }; action_id: string; page_action_id: string | null; url: string; results_file: string };

/** Asks the site whether server tracing is on, without recording anything. */
async function probeTracing(page: Page): Promise<'enabled' | 'disabled'> {
  const response = await page.request.get('/user/login');
  return response.headers()['traceresponse'] ? 'enabled' : 'disabled';
}

async function recordScenario(
  page: Page,
  testInfo: TestInfo,
  meta: { id: string; title: string },
  body: (recorder: EvidenceRecorder, scans: Scan[], artifacts: object[], runDir: string) => Promise<void>,
) {
  const { runDir } = currentRun(path.join(path.dirname(testInfo.config.configFile ?? testInfo.config.rootDir), 'reports/evidence'));
  const instrumentation = await probeTracing(page);
  const recorder = new EvidenceRecorder(page, { baseURL: testInfo.project.use.baseURL!, instrumentation, retry: testInfo.retry }).start();
  const scans: Scan[] = [];
  const artifacts: object[] = [];
  let failure: string | null = null;
  try {
    await body(recorder, scans, artifacts, runDir);
  }
  catch (error) {
    failure = error instanceof Error ? error.message.split('\n')[0] : String(error);
    throw error;
  }
  finally {
    const attempt = await recorder.stop({ status: failure ? 'FAIL' : 'PASS', failureReason: failure });
    writeRunFile(runDir, `scenarios/${meta.id}-${attempt.attempt_id}.json`, {
      scenario_id: meta.id,
      title: meta.title,
      spec: `${testInfo.file.split('tests/playwright/')[1] ?? testInfo.file} > ${testInfo.title}`,
      reproduce: REPRODUCE,
      instrumentation,
      install_profile: process.env.OBSERVATORY_INSTALL_PROFILE || null,
      recipes: process.env.OBSERVATORY_RECIPES ? process.env.OBSERVATORY_RECIPES.split(',') : [],
      environment: {
        base_url: sanitizeOrigin(testInfo.project.use.baseURL!),
        browser: { name: testInfo.project.use.browserName ?? 'chromium', version: page.context().browser()?.version() ?? null },
        viewport: page.viewportSize(),
        color_scheme: testInfo.project.use.colorScheme ?? null,
        reduced_motion: testInfo.project.use.reducedMotion ?? null,
        runner: process.env.CI ? 'github-actions' : 'local-ddev',
      },
      tools: [
        { name: 'playwright', version: testInfo.config.version },
        ...scans.map((scan) => scan.tool),
      ],
      attempt,
      scans,
      artifacts,
    });
  }
}

test.describe('Observability pilot', () => {
  test.skip(!USER || !PASS, 'Set DRUPAL_TEST_USER and DRUPAL_TEST_PASS to a dedicated test account (see docs/testing/PLAYWRIGHT.md).');

  test('content overview: browser actions, server traces and axe findings', async ({ page }, testInfo) => {
    await recordScenario(page, testInfo, { id: 'admin-content-overview', title: 'Content overview as an editor' }, async (recorder, scans, artifacts, runDir) => {
      await recorder.step('Open the login form', async () => {
        await page.goto('/user/login');
      });
      await recorder.step('Log in as the test user', async () => {
        await page.getByRole('textbox', { name: 'Username' }).fill(USER!);
        await page.getByLabel('Password', { exact: true }).fill(PASS!);
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page).not.toHaveURL(/\/user\/login/);
      });
      await recorder.step('Open the content overview', async () => {
        const response = await page.goto('/admin/content');
        expect(response?.status()).toBe(200);
        await expect(page.getByRole('heading', { level: 1, name: 'Content' })).toBeVisible();
      });
      const pageActionId = recorder.pageActionId;
      await recorder.step('Scan the content overview with axe', async () => {
        const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
        const resultsFile = writeRunFile(runDir, `artifacts/axe-${recorder.attempt.attempt_id}.json`, results);
        const shot = `artifacts/content-overview-${recorder.attempt.attempt_id}.png`;
        await page.screenshot({ path: `${runDir}/${shot}`, fullPage: true });
        artifacts.push({ kind: 'screenshot', path: shot, visibility: 'private', note: 'Shows the test site as the test user saw it.' });
        scans.push({
          tool: { name: 'axe-core', version: results.testEngine.version },
          action_id: recorder.currentAction!.action_id,
          page_action_id: pageActionId,
          url: sanitizePath(new URL(page.url()).pathname + new URL(page.url()).search),
          results_file: resultsFile,
        });
      });
      await recorder.step('Open a page that does not exist', async () => {
        const response = await page.goto('/admin/observatory-pilot-missing');
        expect(response?.status()).toBe(404);
      });
    });
  });

  test('login form loaded twice anonymously', async ({ page }, testInfo) => {
    // Records the page cache headers Drupal returned; it does not assert them.
    // Whether the first load is a miss depends on earlier requests, including
    // the tracing probe.
    await recordScenario(page, testInfo, { id: 'anonymous-login-page-cache', title: 'Login form, loaded twice anonymously' }, async (recorder) => {
      await recorder.step('Open the login form', async () => {
        await page.goto('/user/login');
      });
      await recorder.step('Open the login form again', async () => {
        await page.goto('/user/login');
        await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
      });
    });
  });
});
