/**
 * Lighthouse accessibility audit crawl for Drupal Core.
 *
 * Uses playwright-lighthouse to run Lighthouse against every page
 * in the inventory and collect accessibility scores and audit details.
 *
 * Output: reports/lighthouse-results.json
 *
 * Run locally:
 *   cd core && yarn test:a11y:lighthouse
 *
 * Lighthouse scores complement axe — they surface issues axe misses
 * (colour contrast via rendered CSS, tap target sizes, etc.) and
 * provide a single headline score useful for tracking trends over time.
 */
import { test } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import * as fs from 'fs';
import * as path from 'path';
import { anonymousPages, adminPages } from '../lib/pages';
import { AUTH_STATE_FILE } from '../lib/auth-setup';

interface LighthouseRecord {
  page: string;
  path: string;
  viewport: { width: number; height: number };
  timestamp: string;
  scores: {
    accessibility: number | null;
    performance: number | null;
    bestPractices: number | null;
    seo: number | null;
  };
  failedAudits: Array<{
    id: string;
    title: string;
    description: string;
    score: number | null;
  }>;
}

const results: LighthouseRecord[] = [];

const LIGHTHOUSE_CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    // Only run the accessibility category for faster runs.
    // Remove the onlyCategories filter to get all scores.
    onlyCategories: ['accessibility'],
    formFactor: 'desktop' as const,
    screenEmulation: { disabled: true },
  },
};

const THRESHOLDS = {
  accessibility: 90, // Warn (not fail) when below 90.
};

async function auditPage(page: any, pageName: string, pagePath: string, viewport?: { width: number; height: number }) {
  if (viewport) {
    await page.setViewportSize(viewport);
  }

  await page.goto(pagePath, { waitUntil: 'networkidle' });

  // playwright-lighthouse connects to Chrome's remote debugging port.
  const result = await playAudit({
    page,
    config: LIGHTHOUSE_CONFIG,
    thresholds: THRESHOLDS,
    reports: {
      formats: { json: true },
      directory: path.join(__dirname, '../reports/lighthouse'),
      name: pageName.replace(/[^a-z0-9]/gi, '-').toLowerCase(),
    },
  });

  const lhr = result.lhr;
  const accessibilityScore = lhr.categories.accessibility?.score != null
    ? Math.round(lhr.categories.accessibility.score * 100)
    : null;

  const failedAudits = Object.values(lhr.audits)
    .filter((audit) => audit.score !== null && audit.score < 1 && audit.score !== undefined)
    .map((audit) => ({
      id: audit.id,
      title: audit.title,
      description: audit.description,
      score: audit.score,
    }));

  const record: LighthouseRecord = {
    page: pageName,
    path: pagePath,
    viewport: viewport ?? { width: 1280, height: 800 },
    timestamp: new Date().toISOString(),
    scores: {
      accessibility: accessibilityScore,
      performance: null,
      bestPractices: null,
      seo: null,
    },
    failedAudits,
  };

  results.push(record);

  if (accessibilityScore !== null && accessibilityScore < THRESHOLDS.accessibility) {
    console.log(`  ⚠️  Accessibility score ${accessibilityScore}/100 on ${pageName}`);
  } else {
    console.log(`  ✅ Accessibility score ${accessibilityScore}/100 on ${pageName}`);
  }
}

test.describe('Lighthouse crawl — anonymous pages (Olivero)', () => {
  for (const entry of anonymousPages) {
    test(entry.name, async ({ page }) => {
      await auditPage(page, entry.name, entry.path, entry.viewport);
    });
  }
});

test.describe('Lighthouse crawl — admin pages (Claro)', () => {
  test.use({ storageState: AUTH_STATE_FILE });

  for (const entry of adminPages) {
    test(entry.name, async ({ page }) => {
      await auditPage(page, entry.name, entry.path, entry.viewport);
    });
  }
});

test.afterAll(async () => {
  const outDir = path.join(__dirname, '../reports');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, 'lighthouse-results.json'),
    JSON.stringify(results, null, 2),
  );
  console.log(`\n📊 Lighthouse results written to core/tests/playwright/reports/lighthouse-results.json`);
});
