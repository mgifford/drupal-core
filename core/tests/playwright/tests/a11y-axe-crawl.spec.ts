/**
 * Multi-theme axe-core full-site crawl for Drupal Core.
 *
 * Iterates over THEME_CONFIGS, switches the live Drupal site theme via drush,
 * then runs axe against every page in the inventory (anonymous + admin).
 * Violations are written to reports/axe-results.json for pattern analysis.
 *
 * Run locally:
 *   cd core && yarn test:a11y:playwright
 *
 * The test intentionally does NOT hard-fail on violations — instead it
 * records all findings so the pattern analyzer can group them by template.
 * Hard failures are reserved for the regression tests (a11y-regressions.spec.ts).
 *
 * NOTE: drush cache:rebuild takes 5–10 s per call. With 3 theme switches ×
 * 2 page groups each, budget ~60 s of overhead on top of axe scan time.
 *
 * To add a hard gate once a rule is clean, promote it to a11y-regressions.spec.ts.
 */
import { test } from '@playwright/test';
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
  /** Theme config id (e.g. 'olivero', 'claro', 'admin'). */
  theme: string;
  page: string;
  path: string;
  viewport: { width: number; height: number };
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

// Accumulated across all themes and all pages.
const results: AxeResultRecord[] = [];

// ── Theme switching ──────────────────────────────────────────────────────────

/**
 * Apply a theme configuration to the running Drupal site via drush.
 * Runs synchronously so Playwright's beforeAll sequencing is respected.
 * NOTE: cache:rebuild can take 5–10 s — this is expected.
 */
function switchTheme(config: ThemeConfig): void {
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

// ── Test suite ───────────────────────────────────────────────────────────────

test.describe('Axe crawl — multi-theme', () => {
  // Capture original theme settings so we can restore them after the full run.
  let originalDefault: string;
  let originalAdmin: string;

  test.beforeAll(async () => {
    originalDefault = getThemeSetting('default');
    originalAdmin = getThemeSetting('admin');
  });

  test.afterAll(async () => {
    // Restore the site to its original theme configuration.
    execSync(`ddev drush config:set system.theme default ${originalDefault} -y`);
    execSync(`ddev drush config:set system.theme admin ${originalAdmin} -y`);
    execSync(`ddev drush cache:rebuild`);

    // Write results to the root-level /reports directory.
    // __dirname = core/tests/playwright/tests/  →  ../../../../reports = repo-root/reports/
    const outDir = path.resolve(__dirname, '../../../../reports');
    fs.mkdirSync(outDir, { recursive: true });

    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const datedFile = path.join(outDir, `axe-results-${date}.json`);
    const latestFile = path.join(outDir, 'axe-results.json');

    const json = JSON.stringify(results, null, 2);
    fs.writeFileSync(datedFile, json);
    fs.writeFileSync(latestFile, json);

    console.log(`\n📊 Axe results written to:`);
    console.log(`   ${datedFile}`);
    console.log(`   ${latestFile} (latest)`);
    console.log(`   Run: yarn a11y:analyze to generate the pattern report.`);
  });

  // ── Per-theme test groups ─────────────────────────────────────────────────

  for (const themeConfig of THEME_CONFIGS) {
    // Anonymous pages — no auth required.
    if (themeConfig.testAnonymous) {
      test.describe(`Theme: ${themeConfig.label} — anonymous pages`, () => {
        test.beforeAll(() => {
          switchTheme(themeConfig);
        });

        for (const entry of anonymousPages) {
          test(entry.name, async ({ page }) => {
            if (entry.viewport) {
              await page.setViewportSize(entry.viewport);
            }

            await page.goto(entry.path, { waitUntil: 'networkidle' });

            const axeResults = await buildAxeBuilder(page).analyze();

            results.push({
              theme: themeConfig.id,
              page: entry.name,
              path: entry.path,
              viewport: entry.viewport ?? { width: 1280, height: 800 },
              timestamp: new Date().toISOString(),
              violations: axeResults.violations as AxeViolation[],
              incomplete: axeResults.incomplete as AxeViolation[],
            });

            if (axeResults.violations.length > 0) {
              console.log(
                `  ⚠️  [${themeConfig.id}] ${axeResults.violations.length} violation(s) on ${entry.name}:`,
                axeResults.violations.map((v) => `${v.id} [${v.impact}]`).join(', '),
              );
            }
          });
        }
      });
    }

    // Admin pages — use stored auth session.
    if (themeConfig.testAdmin) {
      test.describe(`Theme: ${themeConfig.label} — admin pages`, () => {
        test.use({ storageState: AUTH_STATE_FILE });

        test.beforeAll(() => {
          switchTheme(themeConfig);
        });

        for (const entry of adminPages) {
          test(entry.name, async ({ page }) => {
            if (entry.viewport) {
              await page.setViewportSize(entry.viewport);
            }

            await page.goto(entry.path, { waitUntil: 'networkidle' });

            const axeResults = await buildAxeBuilder(page).analyze();

            results.push({
              theme: themeConfig.id,
              page: entry.name,
              path: entry.path,
              viewport: entry.viewport ?? { width: 1280, height: 800 },
              timestamp: new Date().toISOString(),
              violations: axeResults.violations as AxeViolation[],
              incomplete: axeResults.incomplete as AxeViolation[],
            });

            if (axeResults.violations.length > 0) {
              console.log(
                `  ⚠️  [${themeConfig.id}] ${axeResults.violations.length} violation(s) on ${entry.name}:`,
                axeResults.violations.map((v) => `${v.id} [${v.impact}]`).join(', '),
              );
            }
          });
        }
      });
    }
  }
});

