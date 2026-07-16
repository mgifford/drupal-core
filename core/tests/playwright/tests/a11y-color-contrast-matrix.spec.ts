/**
 * Starter matrix test for collecting color-contrast evidence.
 *
 * Purpose:
 * - Generate repeatable evidence across light/dark and LTR/RTL contexts.
 * - Capture axe color-contrast findings for one selector on one route.
 * - Save a JSON artifact suitable for Drupal.org issue comments.
 *
 * Environment variables:
 * - MATRIX_TARGET_PATH: route to test (default: /admin/config/system/site-information)
 * - MATRIX_TARGET_SELECTOR: selector to include in axe scan (default: label[for="edit-preferred-theme"])
 * - MATRIX_RTL_LANG: installed RTL lang prefix (example: he or ar). If unset, RTL rows are skipped.
 * - MATRIX_FORCE_COLORS: set to 1 to include forced-colors rows.
 * - MATRIX_VIEWPORT_SET: all | desktop | tablet | mobile (default: all)
 *
 * Example:
 *   cd core/tests/playwright
 *   MATRIX_TARGET_PATH=/admin/modules \
 *   MATRIX_TARGET_SELECTOR='label[for="edit-preferred-theme"]' \
 *   MATRIX_RTL_LANG=he \
 *   npx playwright test tests/a11y-color-contrast-matrix.spec.ts
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { AUTH_STATE_FILE } from '../lib/auth-setup';

interface MatrixRow {
  id: string;
  colorScheme: 'light' | 'dark';
  direction: 'ltr' | 'rtl';
  forcedColors: 'none' | 'active';
}

interface MatrixFinding {
  id: string;
  impact: string | null;
  description: string;
  helpUrl: string;
  nodes: Array<{
    target: string[];
    html: string;
    failureSummary: string;
  }>;
}

interface MatrixViewport {
  id: string;
  label: string;
  width: number;
  height: number;
}

interface MatrixRowResult {
  row: MatrixRow;
  viewport: MatrixViewport;
  path: string;
  resolvedUrl?: string;
  htmlDir?: string | null;
  selectorCount?: number;
  violations?: MatrixFinding[];
  incompleteCount?: number;
  skipped?: boolean;
  skipReason?: string;
}

const TARGET_PATH = process.env.MATRIX_TARGET_PATH ?? '/admin/config/system/site-information';
const TARGET_SELECTOR = process.env.MATRIX_TARGET_SELECTOR ?? 'label[for="edit-preferred-theme"]';
const RTL_LANG = process.env.MATRIX_RTL_LANG?.trim();
const INCLUDE_FORCED_COLORS = process.env.MATRIX_FORCE_COLORS === '1';
const VIEWPORT_SET = (process.env.MATRIX_VIEWPORT_SET ?? 'all').toLowerCase();

const BASE_ROWS: MatrixRow[] = [
  { id: 'light-ltr', colorScheme: 'light', direction: 'ltr', forcedColors: 'none' },
  { id: 'dark-ltr', colorScheme: 'dark', direction: 'ltr', forcedColors: 'none' },
  { id: 'light-rtl', colorScheme: 'light', direction: 'rtl', forcedColors: 'none' },
  { id: 'dark-rtl', colorScheme: 'dark', direction: 'rtl', forcedColors: 'none' },
];

const FORCED_COLOR_ROWS: MatrixRow[] = [
  { id: 'forced-colors-ltr', colorScheme: 'light', direction: 'ltr', forcedColors: 'active' },
  { id: 'forced-colors-rtl', colorScheme: 'light', direction: 'rtl', forcedColors: 'active' },
];

const MATRIX_VIEWPORTS: MatrixViewport[] = [
  { id: 'desktop', label: 'Desktop (1280x800)', width: 1280, height: 800 },
  { id: 'tablet-portrait', label: 'Tablet Portrait (768x1024)', width: 768, height: 1024 },
  { id: 'tablet-landscape', label: 'Tablet Landscape (1024x768)', width: 1024, height: 768 },
  { id: 'mobile-portrait', label: 'Mobile Portrait (375x812)', width: 375, height: 812 },
  { id: 'mobile-landscape', label: 'Mobile Landscape (812x375)', width: 812, height: 375 },
];

function resolvePathForDirection(routePath: string, direction: 'ltr' | 'rtl'): string {
  if (direction === 'ltr') {
    return routePath;
  }

  if (!RTL_LANG) {
    return routePath;
  }

  if (routePath === '/') {
    return `/${RTL_LANG}`;
  }

  return `/${RTL_LANG}${routePath.startsWith('/') ? routePath : `/${routePath}`}`;
}

function resolveViewports(): MatrixViewport[] {
  switch (VIEWPORT_SET) {
    case 'desktop':
      return MATRIX_VIEWPORTS.filter((viewport) => viewport.id === 'desktop');
    case 'tablet':
      return MATRIX_VIEWPORTS.filter((viewport) => viewport.id.startsWith('tablet-'));
    case 'mobile':
      return MATRIX_VIEWPORTS.filter((viewport) => viewport.id.startsWith('mobile-'));
    case 'all':
    default:
      return MATRIX_VIEWPORTS;
  }
}

test.describe('A11y matrix - color contrast evidence', () => {
  test.use({ storageState: AUTH_STATE_FILE });

  test('collects light/dark, LTR/RTL, and responsive viewport evidence for one selector', async ({ page }, testInfo) => {
    const rows = INCLUDE_FORCED_COLORS ? [...BASE_ROWS, ...FORCED_COLOR_ROWS] : BASE_ROWS;
    const viewports = resolveViewports();
    const results: MatrixRowResult[] = [];

    for (const row of rows) {
      for (const viewport of viewports) {
        const resolvedPath = resolvePathForDirection(TARGET_PATH, row.direction);

        if (row.direction === 'rtl' && !RTL_LANG) {
          results.push({
            row,
            viewport,
            path: TARGET_PATH,
            skipped: true,
            skipReason: 'Set MATRIX_RTL_LANG to an installed RTL langcode (for example: he or ar).',
          });
          continue;
        }

        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        await page.emulateMedia({
          colorScheme: row.colorScheme,
          forcedColors: row.forcedColors,
        });

        await page.goto(resolvedPath, { waitUntil: 'networkidle' });

        const selectorCount = await page.locator(TARGET_SELECTOR).count();
        const htmlDir = await page.locator('html').getAttribute('dir');

        const axeResults = await new AxeBuilder({ page })
          .withRules(['color-contrast'])
          .include(TARGET_SELECTOR)
          .analyze();

        const violations: MatrixFinding[] = axeResults.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          description: violation.description,
          helpUrl: violation.helpUrl,
          nodes: violation.nodes.map((node) => ({
            target: node.target,
            html: node.html,
            failureSummary: node.failureSummary,
          })),
        }));

        results.push({
          row,
          viewport,
          path: resolvedPath,
          resolvedUrl: page.url(),
          htmlDir,
          selectorCount,
          violations,
          incompleteCount: axeResults.incomplete.length,
        });
      }
    }

    const reportDir = path.resolve(__dirname, '../reports/color-contrast-matrix');
    fs.mkdirSync(reportDir, { recursive: true });

    const report = {
      generatedAt: new Date().toISOString(),
      targetPath: TARGET_PATH,
      targetSelector: TARGET_SELECTOR,
      rtlLang: RTL_LANG ?? null,
      forcedColorsRowsIncluded: INCLUDE_FORCED_COLORS,
      viewportSet: VIEWPORT_SET,
      viewports,
      rows: results,
    };

    const reportPath = path.join(
      reportDir,
      `color-contrast-matrix-${testInfo.project.name}-${Date.now()}.json`,
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

    // Auto-generate a paste-ready comment artifact next to the JSON report.
    try {
      const generatorPath = path.resolve(__dirname, '../scripts/generate-color-contrast-matrix-comment.js');
      const commentPath = reportPath.replace(/\.json$/, '-comment.txt');
      execFileSync(process.execPath, [
        generatorPath,
        '--input', reportPath,
        '--format', 'both',
        '--output', commentPath,
      ]);

      await testInfo.attach('color-contrast-matrix-comment', {
        path: commentPath,
        contentType: 'text/plain',
      });
    }
    catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await testInfo.attach('color-contrast-matrix-comment-error', {
        body: Buffer.from(message, 'utf8'),
        contentType: 'text/plain',
      });
    }

    await testInfo.attach('color-contrast-matrix-json', {
      path: reportPath,
      contentType: 'application/json',
    });

    const executedRows = results.filter((result) => !result.skipped);
    expect(executedRows.length).toBeGreaterThan(0);
  });
});
