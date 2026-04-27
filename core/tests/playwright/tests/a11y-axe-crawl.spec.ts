/**
 * Multi-theme axe-core full-site crawl for Drupal Core.
 *
 * Iterates over THEME_CONFIGS, switches the live Drupal site theme via drush,
 * then runs axe against every page in the inventory (anonymous + admin).
 * Each page is tested at both desktop (1280×800) and mobile (375×812) viewports.
 * Each Drupal theme is tested in both light and dark color scheme modes.
 * Violations are written to reports/axe-results.json for pattern analysis.
 *
 * Run locally:
 *   cd core && yarn test:a11y:playwright
 *
 * The test intentionally does NOT hard-fail on violations — instead it
 * records all findings so the pattern analyzer can group them by template.
 * Hard failures are reserved for the regression tests (a11y-regressions.spec.ts).
 *
 * Result accumulation strategy:
 *   Each inner describe writes a partial JSON shard to .tmp-crawl/ in its
 *   own afterAll. The outer afterAll merges all shards into axe-results.json.
 *   This avoids a Playwright timing issue where the outer afterAll can fire
 *   before inner describe tests push their results when test.use() is present.
 *
 * NOTE: drush cache:rebuild takes 5–10 s per call. Budget ~30 s overhead
 * per unique Drupal theme switch (light + dark share the same switch).
 *
 * To add a hard gate once a rule is clean, promote it to a11y-regressions.spec.ts.
 */
import { test, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { anonymousPages, adminPages } from '../lib/pages';
import { THEME_CONFIGS, ThemeConfig } from '../lib/theme-configs';
import { AUTH_STATE_FILE } from '../lib/auth-setup';

// ── Types ────────────────────────────────────────────────────────────────────

interface AxeViolation {
  id: string;
  impact: string | null;
  description: string;
  helpUrl: string;
  nodes: Array<{
    html: string;
    target: string[];
    failureSummary: string;
  }>;
}

/** Per-page findings record written to axe-results.json. */
interface AxeResultRecord {
  /** Theme config id (e.g. 'olivero', 'claro-dark', 'admin'). */
  theme: string;
  page: string;
  path: string;
  viewport: { width: number; height: number };
  /** Browser color scheme preference used during this scan. */
  colorScheme: 'light' | 'dark';
  timestamp: string;
  violations: AxeViolation[];
  incomplete: AxeViolation[];
}

// ── Constants ────────────────────────────────────────────────────────────────

/** Full WCAG 2.x tag set — no rules suppressed. */
const WCAG_TAGS = [
  'wcag2a', 'wcag2aa',
  'wcag21a', 'wcag21aa',
  'wcag22a', 'wcag22aa',
  'best-practice',
];

const DEFAULT_BASE_URL = process.env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';

/**
 * Standard viewports for every page scan.
 * All pages are tested at both sizes; no separate "(mobile)" page entries needed.
 */
const STANDARD_VIEWPORTS = [
  { label: '',          width: 1280, height: 800  }, // desktop
  { label: ' (mobile)', width: 375,  height: 812  }, // mobile
] as const;

/** Temp directory for per-describe partial result shards. */
const OUT_DIR = path.resolve(__dirname, '../../../../reports');
const TEMP_DIR = path.join(OUT_DIR, '.tmp-crawl');

// ── Theme switching ──────────────────────────────────────────────────────────

/**
 * Apply a theme configuration to the running Drupal site via drush.
 * Runs synchronously so Playwright's beforeAll sequencing is respected.
 * Dark/light variants of the same Drupal theme share one switch call.
 */
function switchTheme(config: ThemeConfig): void {
  const themesToEnable = [...new Set([config.defaultTheme, config.adminTheme])].join(' ');
  execSync(`ddev drush theme:enable ${themesToEnable} -y`);
  execSync(`ddev drush config:set system.theme default ${config.defaultTheme} -y`);
  execSync(`ddev drush config:set system.theme admin ${config.adminTheme} -y`);
  execSync(`ddev drush cache:rebuild`);
}

/**
 * Read a single system.theme config value from the live site.
 * Returns the trimmed string value (e.g. "admin", "olivero").
 */
function getThemeSetting(key: 'default' | 'admin'): string {
  return execSync(`ddev drush config:get system.theme ${key} --format=string`)
    .toString()
    .trim();
}

// ── Axe helper ───────────────────────────────────────────────────────────────

function buildAxeBuilder(page: any): AxeBuilder {
  return new AxeBuilder({ page }).withTags(WCAG_TAGS);
}

function resolveRoute(page: Page, route: string): string {
  const configuredBaseUrl = page.context()._options.baseURL ?? DEFAULT_BASE_URL;
  return new URL(route, configuredBaseUrl).toString();
}

/**
 * Wait for page content to stabilize before running axe.
 * Some admin pages can briefly report an empty <title> if scanned too early.
 */
async function ensurePageReadyForScan(page: Page, route: string): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('html', { state: 'attached', timeout: 10000 });
  await page.waitForSelector('body', { state: 'attached', timeout: 10000 });

  // Network-idle can timeout for pages with long-polling/background requests.
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => undefined);

  await page
    .waitForFunction(() => document.readyState === 'complete', undefined, { timeout: 10000 })
    .catch(() => undefined);

  const hasNonEmptyTitle = async (): Promise<boolean> => {
    const title = await page.title();
    return title.trim().length > 0;
  };

  if (await hasNonEmptyTitle()) {
    return;
  }

  await page
    .waitForFunction(() => document.title.trim().length > 0, undefined, { timeout: 4000 })
    .catch(() => undefined);

  const pageState = await page.evaluate(() => ({
    title: document.title.trim(),
    lang: document.documentElement.getAttribute('lang'),
    bodyText: document.body?.innerText ?? '',
  }));

  if (pageState.title && pageState.lang) {
    return;
  }

  if (pageState.bodyText.includes('The website encountered an unexpected error')) {
    throw new Error(`Route ${route} rendered a Drupal exception page instead of the target document.`);
  }

  throw new Error(
    `Route ${route} did not expose a valid HTML document for scanning (title="${pageState.title}", lang=${pageState.lang ?? 'null'}).`,
  );
}

// ── Shard helpers ─────────────────────────────────────────────────────────────

/**
 * Write a partial result shard to TEMP_DIR so results survive even if the
 * outer afterAll fires before all inner describes have pushed their data.
 */
function writeResultShard(shardId: string, records: AxeResultRecord[]): void {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
  const shardFile = path.join(TEMP_DIR, `${shardId}.json`);
  fs.writeFileSync(shardFile, JSON.stringify(records, null, 2));
}

/**
 * Merge all shard files written by inner describes into the final output files.
 */
function mergeAndWriteResults(originalDefault: string, originalAdmin: string): void {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let allResults: AxeResultRecord[] = [];

  if (fs.existsSync(TEMP_DIR)) {
    const shards = fs.readdirSync(TEMP_DIR).filter((f) => f.endsWith('.json'));
    for (const shard of shards.sort()) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(TEMP_DIR, shard), 'utf8'));
        allResults = allResults.concat(data);
      } catch {
        console.warn(`  ⚠️  Could not read shard ${shard}, skipping.`);
      }
    }
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  const date = new Date().toISOString().slice(0, 10);
  const datedFile = path.join(OUT_DIR, `axe-results-${date}.json`);
  const latestFile = path.join(OUT_DIR, 'axe-results.json');
  const json = JSON.stringify(allResults, null, 2);

  fs.writeFileSync(datedFile, json);
  fs.writeFileSync(latestFile, json);

  console.log(`\n📊 Axe results written to:`);
  console.log(`   ${datedFile}`);
  console.log(`   ${latestFile} (latest)`);
  console.log(`   Total records: ${allResults.length}`);
  console.log(`   Run: yarn a11y:analyze to generate the pattern report.`);

  // Restore the site to its original theme configuration.
  execSync(`ddev drush config:set system.theme default ${originalDefault} -y`);
  execSync(`ddev drush config:set system.theme admin ${originalAdmin} -y`);
  execSync(`ddev drush cache:rebuild`);
}

// ── Test suite ───────────────────────────────────────────────────────────────

test.describe('Axe crawl — multi-theme', () => {
  test.use({
    baseURL: DEFAULT_BASE_URL,
    ignoreHTTPSErrors: true,
  });

  // Capture original theme settings so we can restore them after the full run.
  let originalDefault: string;
  let originalAdmin: string;

  test.beforeAll(async () => {
    // Clear any leftover shards from a previous partial run.
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
    originalDefault = getThemeSetting('default');
    originalAdmin = getThemeSetting('admin') || 'claro';
  });

  test.afterAll(async () => {
    mergeAndWriteResults(originalDefault, originalAdmin);
  });

  // ── Per-theme test groups ─────────────────────────────────────────────────

  for (const themeConfig of THEME_CONFIGS) {
    // Anonymous pages — no auth required.
    if (themeConfig.testAnonymous) {
      test.describe(`Theme: ${themeConfig.label} — anonymous pages`, () => {
        test.use({ colorScheme: themeConfig.colorScheme });

        const shardRecords: AxeResultRecord[] = [];

        test.beforeAll(() => {
          // Only switch the Drupal theme when colorScheme is 'light' (the first
          // variant). The dark variant uses the same Drupal theme; no switch needed.
          if (themeConfig.colorScheme === 'light') {
            switchTheme(themeConfig);
          }
        });

        test.afterAll(() => {
          writeResultShard(`${themeConfig.id}-anon`, shardRecords);
        });

        for (const entry of anonymousPages) {
          for (const vp of STANDARD_VIEWPORTS) {
            const testName = `${entry.name}${vp.label}`;
            test(testName, async ({ page }) => {
              await page.setViewportSize({ width: vp.width, height: vp.height });
              await page.goto(resolveRoute(page, entry.path), { waitUntil: 'domcontentloaded' });
              await ensurePageReadyForScan(page, entry.path);

              const axeResults = await buildAxeBuilder(page).analyze();

              shardRecords.push({
                theme: themeConfig.id,
                page: testName,
                path: entry.path,
                viewport: { width: vp.width, height: vp.height },
                colorScheme: themeConfig.colorScheme,
                timestamp: new Date().toISOString(),
                violations: axeResults.violations as AxeViolation[],
                incomplete: axeResults.incomplete as AxeViolation[],
              });

              if (axeResults.violations.length > 0) {
                console.log(
                  `  ⚠️  [${themeConfig.id}/${vp.width}px] ${axeResults.violations.length} violation(s) on ${entry.name}:`,
                  axeResults.violations.map((v) => `${v.id} [${v.impact}]`).join(', '),
                );
              }
            });
          }
        }
      });
    }

    // Admin pages — use stored auth session.
    if (themeConfig.testAdmin) {
      test.describe(`Theme: ${themeConfig.label} — admin pages`, () => {
        test.use({ storageState: AUTH_STATE_FILE, colorScheme: themeConfig.colorScheme });

        const shardRecords: AxeResultRecord[] = [];

        test.beforeAll(() => {
          if (themeConfig.colorScheme === 'light') {
            switchTheme(themeConfig);
          }
        });

        test.afterAll(() => {
          writeResultShard(`${themeConfig.id}-admin`, shardRecords);
        });

        for (const entry of adminPages) {
          for (const vp of STANDARD_VIEWPORTS) {
            const testName = `${entry.name}${vp.label}`;
            test(testName, async ({ page }) => {
              await page.setViewportSize({ width: vp.width, height: vp.height });
              await page.goto(resolveRoute(page, entry.path), { waitUntil: 'domcontentloaded' });
              await ensurePageReadyForScan(page, entry.path);

              const axeResults = await buildAxeBuilder(page).analyze();

              shardRecords.push({
                theme: themeConfig.id,
                page: testName,
                path: entry.path,
                viewport: { width: vp.width, height: vp.height },
                colorScheme: themeConfig.colorScheme,
                timestamp: new Date().toISOString(),
                violations: axeResults.violations as AxeViolation[],
                incomplete: axeResults.incomplete as AxeViolation[],
              });

              if (axeResults.violations.length > 0) {
                console.log(
                  `  ⚠️  [${themeConfig.id}/${vp.width}px] ${axeResults.violations.length} violation(s) on ${entry.name}:`,
                  axeResults.violations.map((v) => `${v.id} [${v.impact}]`).join(', '),
                );
              }
            });
          }
        }
      });
    }
  }
});

