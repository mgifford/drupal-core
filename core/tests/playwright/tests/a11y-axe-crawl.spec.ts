/**
 * Axe-core full-site crawl for Drupal Core.
 *
 * Runs axe against every page in the inventory (anonymous + admin).
 * Violations are written to reports/axe-results.json for pattern analysis.
 *
 * Run locally:
 *   cd core && yarn test:a11y:playwright
 *
 * The test intentionally does NOT hard-fail on violations — instead it
 * records all findings so the pattern analyzer can group them by template.
 * Hard failures are reserved for the regression tests (a11y-regressions.spec.ts).
 *
 * To add a hard gate once a rule is clean, promote it to a11y-regressions.spec.ts.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';
import { anonymousPages, adminPages, PageEntry } from '../lib/pages';
import { AUTH_STATE_FILE } from '../lib/auth-setup';

// AxeResultRecord stores the per-page findings for later pattern analysis.
interface AxeResultRecord {
  page: string;
  path: string;
  viewport: { width: number; height: number };
  timestamp: string;
  violations: AxeViolation[];
  incomplete: AxeViolation[];
}

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

const results: AxeResultRecord[] = [];
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa', 'best-practice'];

function buildAxeBuilder(page: any, entry: PageEntry): AxeBuilder {
  let builder = new AxeBuilder({ page }).withTags(WCAG_TAGS);
  for (const { rule } of entry.disabledRules ?? []) {
    builder = builder.disableRules([rule]);
  }
  return builder;
}

// Anonymous pages — no auth needed.
test.describe('Axe crawl — anonymous pages (Olivero)', () => {
  for (const entry of anonymousPages) {
    test(entry.name, async ({ page }) => {
      if (entry.viewport) {
        await page.setViewportSize(entry.viewport);
      }

      await page.goto(entry.path, { waitUntil: 'networkidle' });

      const axeResults = await buildAxeBuilder(page, entry).analyze();

      results.push({
        page: entry.name,
        path: entry.path,
        viewport: entry.viewport ?? { width: 1280, height: 800 },
        timestamp: new Date().toISOString(),
        violations: axeResults.violations as AxeViolation[],
        incomplete: axeResults.incomplete as AxeViolation[],
      });

      // Log to test output so CI has inline visibility.
      if (axeResults.violations.length > 0) {
        console.log(
          `  ⚠️  ${axeResults.violations.length} violation(s) on ${entry.name}:`,
          axeResults.violations.map((v) => `${v.id} [${v.impact}]`).join(', '),
        );
      }
    });
  }
});

// Admin pages — use stored auth session.
test.describe('Axe crawl — admin pages (Claro)', () => {
  test.use({
    storageState: AUTH_STATE_FILE,
  });

  for (const entry of adminPages) {
    test(entry.name, async ({ page }) => {
      if (entry.viewport) {
        await page.setViewportSize(entry.viewport);
      }

      await page.goto(entry.path, { waitUntil: 'networkidle' });

      const axeResults = await buildAxeBuilder(page, entry).analyze();

      results.push({
        page: entry.name,
        path: entry.path,
        viewport: entry.viewport ?? { width: 1280, height: 800 },
        timestamp: new Date().toISOString(),
        violations: axeResults.violations as AxeViolation[],
        incomplete: axeResults.incomplete as AxeViolation[],
      });

      if (axeResults.violations.length > 0) {
        console.log(
          `  ⚠️  ${axeResults.violations.length} violation(s) on ${entry.name}:`,
          axeResults.violations.map((v) => `${v.id} [${v.impact}]`).join(', '),
        );
      }
    });
  }
});

// Write combined results after all tests complete.
test.afterAll(async () => {
  const outDir = path.join(__dirname, '../reports');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, 'axe-results.json'),
    JSON.stringify(results, null, 2),
  );
  console.log(`\n📊 Axe results written to core/tests/playwright/reports/axe-results.json`);
  console.log(`   Run: yarn a11y:analyze to generate the pattern report.`);
});
