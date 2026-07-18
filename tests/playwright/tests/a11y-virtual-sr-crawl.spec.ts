/**
 * Virtual Screen Reader full-site crawl for Drupal Core.
 *
 * Uses @guidepup/virtual-screen-reader to validate that Drupal's markup
 * produces the correct accessibility tree across all pages, themes,
 * viewports, and color schemes.
 *
 * Runs alongside the axe-core crawl (a11y-axe-crawl.spec.ts) and
 * cross-references findings to distinguish real barriers from false
 * positives. See lib/virtual-sr.ts for the cross-validation logic.
 *
 * Run locally:
 *   cd core && yarn test:a11y:playwright --grep "Virtual SR"
 *
 * This test reuses the same page inventory, theme configs, auth setup,
 * and shard infrastructure as the axe crawl.
 */
import { test, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { anonymousPages, adminPages, PageEntry } from '../../../core/tests/playwright/lib/pages';
import { THEME_CONFIGS, ThemeConfig } from '../../../core/tests/playwright/lib/theme-configs';
import { AUTH_STATE_FILE } from '../../../core/tests/playwright/lib/auth-setup';
import {
  TEMP_DIR,
  drush,
  captureOriginalSettingsOnce,
} from '../../../core/tests/playwright/lib/crawl-finalize';
import {
  injectVirtualSR,
  getSpokenPhraseLog,
  analyzeVirtualSR,
  crossReference,
  VirtualSRFinding,
  VirtualSRResult,
} from '../lib/virtual-sr';
import AxeBuilder from '@axe-core/playwright';

// ── Types ────────────────────────────────────────────────────────────────────

interface VirtualSRResultRecord {
  theme: string;
  page: string;
  path: string;
  viewport: { width: number; height: number };
  screen: string;
  colorScheme: 'light' | 'dark';
  timestamp: string;
  /** Full spoken phrase log. */
  srLog: string[];
  /** Findings from virtual SR pattern analysis. */
  findings: VirtualSRFinding[];
  /** Axe violations on the same page (for cross-reference). */
  axeViolations: Array<{ id: string; description: string; impact: string | null }>;
  /** Cross-reference results. */
  crossRef: {
    confirmed: Array<{ rule: string; description: string; axeRule?: string }>;
    axeOnly: Array<{ rule: string; description: string }>;
    virtualSROnly: VirtualSRFinding[];
  };
}

// ── Constants ────────────────────────────────────────────────────────────────

const WCAG_TAGS = [
  'wcag2a', 'wcag2aa',
  'wcag21a', 'wcag21aa',
  'wcag22a', 'wcag22aa',
  'best-practice',
];

const DEFAULT_BASE_URL = process.env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';

/** Standard viewports — matches the axe crawl. */
const STANDARD_VIEWPORTS = [
  { label: ' [desktop]', screen: 'desktop', width: 1280, height: 800 },
  { label: ' [tablet]', screen: 'tablet', width: 768, height: 1024 },
  { label: ' [tablet-landscape]', screen: 'tablet-landscape', width: 1024, height: 768 },
  { label: ' [mobile-portrait]', screen: 'mobile', width: 375, height: 812 },
  { label: ' [mobile-landscape]', screen: 'mobile-landscape', width: 812, height: 375 },
] as const;

// ── Helpers ──────────────────────────────────────────────────────────────────

function switchTheme(config: ThemeConfig): void {
  const themesToEnable = [...new Set([config.defaultTheme, config.adminTheme])].join(' ');
  drush(`theme:enable ${themesToEnable} -y`);
  drush(`config:set system.theme default ${config.defaultTheme} -y`);
  drush(`config:set system.theme admin ${config.adminTheme} -y`);
  if (config.defaultTheme === 'default_admin' || config.adminTheme === 'default_admin') {
    drush(`config:set default_admin.settings enable_dark_mode auto -y`);
  }
  drush(`cache:rebuild`);
}

function resolveRoute(page: Page, route: string): string {
  const configuredBaseUrl = (page.context() as any)._options.baseURL ?? DEFAULT_BASE_URL;
  return new URL(route, configuredBaseUrl).toString();
}

async function ensurePageReady(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('html', { state: 'attached', timeout: 10000 });
  await page.waitForSelector('body', { state: 'attached', timeout: 10000 });
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => undefined);
}

/**
 * Visit a route, run both axe and virtual SR, and return the combined
 * result record with cross-reference analysis.
 */
async function scanRoute(
  page: Page,
  opts: {
    themeId: string;
    testName: string;
    routePath: string;
    viewport: { width: number; height: number };
    screen: string;
    colorScheme: 'light' | 'dark';
    expectedStatus?: number;
  },
): Promise<VirtualSRResultRecord> {
  await page.setViewportSize({ width: opts.viewport.width, height: opts.viewport.height });
  const response = await page.goto(resolveRoute(page, opts.routePath), {
    waitUntil: 'domcontentloaded',
  });

  const status = response?.status() ?? 0;
  if (opts.expectedStatus !== undefined) {
    if (status !== opts.expectedStatus) {
      throw new Error(
        `Route ${opts.routePath} returned HTTP ${status}, expected ${opts.expectedStatus}.`,
      );
    }
  } else if (status >= 400) {
    throw new Error(
      `Route ${opts.routePath} returned HTTP ${status} — page missing on this site.`,
    );
  }

  await ensurePageReady(page);

  // Run axe-core.
  const axeResults = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

  // Run virtual screen reader.
  const srResult = await (async (): Promise<VirtualSRResult> => {
    await injectVirtualSR(page);
    await page.waitForTimeout(1500);
    const log = await getSpokenPhraseLog(page);
    const findings = analyzeVirtualSR(log);
    return { log, findings, timestamp: new Date().toISOString() };
  })();

  // Cross-reference.
  const crossRef = crossReference(srResult.findings, axeResults.violations as any);

  const record: VirtualSRResultRecord = {
    theme: opts.themeId,
    page: opts.testName,
    path: opts.routePath,
    viewport: opts.viewport,
    screen: opts.screen,
    colorScheme: opts.colorScheme,
    timestamp: srResult.timestamp,
    srLog: srResult.log,
    findings: srResult.findings,
    axeViolations: axeResults.violations.map((v: any) => ({
      id: v.id,
      description: v.description,
      impact: v.impact,
    })),
    crossRef: {
      confirmed: crossRef.confirmed.map((c) => ({ rule: c.rule, description: c.description, axeRule: c.axeRule })),
      axeOnly: crossRef.axeOnly,
      virtualSROnly: crossRef.virtualSROnly,
    },
  };

  if (record.findings.length > 0 || record.crossRef.confirmed.length > 0) {
    console.log(
      `  ⚠️  [${opts.themeId}/${opts.viewport.width}px/${opts.colorScheme}] ` +
      `${record.findings.length} SR findings, ${record.crossRef.confirmed.length} confirmed, ` +
      `${record.crossRef.virtualSROnly.length} SR-only on ${opts.testName}:`,
      [...record.findings, ...record.crossRef.virtualSROnly].map((f) => f.rule).join(', '),
    );
  }

  return record;
}

function writeResultShard(shardId: string, records: VirtualSRResultRecord[]): void {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
  const shardFile = path.join(TEMP_DIR, `${shardId}.json`);
  fs.writeFileSync(shardFile, JSON.stringify(records, null, 2));
}

// ── Tests ────────────────────────────────────────────────────────────────────

test.describe('Virtual SR Crawl — Multi-Theme', () => {
  for (const themeConfig of THEME_CONFIGS) {
    const pagesToTest = [
      ...(themeConfig.testAnonymous ? anonymousPages : []),
      ...(themeConfig.testAdmin ? adminPages : []),
    ];

    if (pagesToTest.length === 0) continue;

    test.describe(`Theme: ${themeConfig.label} (${themeConfig.colorScheme})`, () => {
      let allRecords: VirtualSRResultRecord[] = [];

      test.beforeAll(() => {
        captureOriginalSettingsOnce();
        switchTheme(themeConfig);
      });

      test.afterAll(() => {
        writeResultShard(`virtual-sr-${themeConfig.id}`, allRecords);
        allRecords = [];
      });

      for (const pageEntry of pagesToTest) {
        for (const viewport of STANDARD_VIEWPORTS) {
          const testLabel = `${pageEntry.name}${viewport.label}`;

          test(testLabel, async ({ page }) => {
            const record = await scanRoute(page, {
              themeId: themeConfig.id,
              testName: pageEntry.name,
              routePath: pageEntry.path,
              viewport: { width: viewport.width, height: viewport.height },
              screen: viewport.screen,
              colorScheme: themeConfig.colorScheme,
              expectedStatus: pageEntry.expectedStatus,
            });

            allRecords.push(record);

            // Log SR-only findings (potential semantic issues axe misses).
            if (record.crossRef.virtualSROnly.length > 0) {
              console.log(
                `    SR-only findings on ${pageEntry.name}:`,
                record.crossRef.virtualSROnly.map((f) => `${f.rule}: ${f.description}`),
              );
            }
          });
        }
      }
    });
  }
});
