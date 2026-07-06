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
 * Scan matrix (kept deliberately small — matrix economics):
 *
 *   1. Canonical crawl: every page × 4 viewports × each theme config, with
 *      the full WCAG 2.x + best-practice rule set. Dark mode is scanned ONLY
 *      for themes that actually support it (the Gin-based Default Admin
 *      theme via its `enable_dark_mode: auto` setting + Playwright
 *      prefers-color-scheme emulation). Olivero and Claro have no dark
 *      mode, so dark scans of them would duplicate the light results.
 *
 *   2. Accent presets (Default Admin only): applied via the REAL
 *      `default_admin.settings preset_accent_color` theme setting through
 *      drush — NOT by patching CSS variables client-side, which misses the
 *      derived color palette the theme computes. Accents can only change
 *      colors, so these scans run color-related rules only, on admin pages,
 *      desktop viewport, light + dark.
 *
 *   3. RTL (opt-in): set RTL_LANG=he (or ar) to crawl language-prefixed
 *      paths (e.g. /he/admin/content). This requires the language to be
 *      installed on the site with URL-prefix negotiation:
 *        ddev drush en language locale -y
 *        ddev drush language:add he   # or: ar
 *      Real RTL rendering (server-side dir attribute, RTL stylesheets,
 *      logical-property fallbacks) cannot be simulated by flipping
 *      document.dir client-side, so no synthetic RTL scans are performed.
 *
 * The test intentionally does NOT hard-fail on violations — instead it
 * records all findings so the pattern analyzer can group them by template.
 * Hard failures are reserved for the regression tests (a11y-regressions.spec.ts).
 *
 * Result accumulation strategy:
 *   Each inner describe writes a partial JSON shard to .tmp-crawl/ in its
 *   own afterAll. Merging into reports/axe-results.json and restoring the
 *   site's settings happen in globalTeardown (lib/crawl-finalize.ts), which
 *   runs exactly once after all workers exit. afterAll is NOT safe for
 *   merging: hooks run per worker, and every scan group gets its own worker
 *   because its test.use() options differ.
 *
 * NOTE: drush cache:rebuild takes 5–10 s per call. Budget ~30 s overhead
 * per unique Drupal theme switch and ~10 s per accent preset switch.
 *
 * To add a hard gate once a rule is clean, promote it to a11y-regressions.spec.ts.
 */
import { test, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';
import { anonymousPages, adminPages, PageEntry } from '../lib/pages';
import { THEME_CONFIGS, ThemeConfig } from '../lib/theme-configs';
import { AUTH_STATE_FILE } from '../lib/auth-setup';
import { TEMP_DIR, drush, captureOriginalSettingsOnce } from '../lib/crawl-finalize';

// ── Types ────────────────────────────────────────────────────────────────────

interface AxeViolation {
  id: string;
  impact: string | null;
  description: string;
  helpUrl: string;
  /**
   * Axe rule tags (wcag2a, wcag2aa, wcag143, best-practice, …). Recorded so
   * the analyzer can distinguish WCAG conformance failures from Deque best
   * practices using the same axe version that produced the results.
   */
  tags: string[];
  nodes: Array<{
    html: string;
    target: string[];
    failureSummary: string;
  }>;
}

/**
 * Per-page resource metrics captured during full-rule scans, for the
 * sustainability trend report (WSG alignment). Sizes come from the
 * Resource Timing API on a cold cache (each Playwright test gets a fresh
 * context), so transferBytes reflects a first-visit page load.
 */
interface PageMetrics {
  /** Navigation + subresource request count. */
  requests: number;
  /** Total bytes over the wire (transferSize, cold cache). */
  transferBytes: number;
  /** Total decoded body bytes (post-decompression). */
  decodedBytes: number;
  /** Number of DOM elements after load. */
  domNodes: number;
  /** Requests/bytes grouped by resource class (script, css, image, font, other). */
  byType: Record<string, { count: number; transferBytes: number }>;
  /** Image requests/bytes grouped by file format (png, jpg, webp, avif, svg, …). */
  imageFormats: Record<string, { count: number; transferBytes: number }>;
}

/** Per-page findings record written into the sharded axe results bundle. */
interface AxeResultRecord {
  /** Theme config id (e.g. 'olivero', 'admin-dark', 'admin-accent-teal'). */
  theme: string;
  page: string;
  path: string;
  viewport: { width: number; height: number };
  /** Screen label matching the viewport (desktop/tablet/mobile/mobile-landscape). */
  screen: string;
  /** Browser color scheme preference used during this scan. */
  colorScheme: 'light' | 'dark';
  /** Accent preset used for this scan (Default Admin theme only). */
  accentPreset?: string;
  /** HTML lang of the crawled path (en, or RTL_LANG for RTL scans). */
  language?: string;
  /** Text direction of the crawled path. */
  direction?: 'ltr' | 'rtl';
  timestamp: string;
  violations: AxeViolation[];
  incomplete: AxeViolation[];
  /** Present on full-rule scans only (not accent quick scans). */
  pageMetrics?: PageMetrics;
}

// ── Constants ────────────────────────────────────────────────────────────────

/** Full WCAG 2.x tag set — no rules suppressed. */
const WCAG_TAGS = [
  'wcag2a', 'wcag2aa',
  'wcag21a', 'wcag21aa',
  'wcag22a', 'wcag22aa',
  'best-practice',
];

/**
 * Rules re-run for accent preset variants. Accent presets can only change
 * colors, so running the full rule set for every preset adds scan time and
 * CO2 without any possible new findings outside these rules.
 */
const COLOR_RULES = ['color-contrast', 'link-in-text-block'];

const DEFAULT_BASE_URL = process.env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';

/**
 * Opt-in real-RTL crawl. Set RTL_LANG=he (or ar) and install the language
 * first — see the header comment. Unset = no RTL scans.
 */
const RTL_LANG = process.env.RTL_LANG?.trim() || null;

/**
 * Standard viewports for every canonical page scan.
 * Includes desktop, tablet, and smartphone in portrait + landscape.
 */
const STANDARD_VIEWPORTS = [
  { label: ' [desktop]', screen: 'desktop', width: 1280, height: 800 },
  { label: ' [tablet]', screen: 'tablet', width: 768, height: 1024 },
  { label: ' [mobile-portrait]', screen: 'mobile', width: 375, height: 812 },
  { label: ' [mobile-landscape]', screen: 'mobile-landscape', width: 812, height: 375 },
] as const;

/** Reduced viewport set for RTL scans — direction bugs show at both extremes. */
const RTL_VIEWPORTS = [STANDARD_VIEWPORTS[0], STANDARD_VIEWPORTS[2]] as const;

/**
 * Default Admin accent presets. 'blue' is the shipped default and is already
 * covered by the canonical crawl, so only the others are re-scanned.
 */
const DEFAULT_ADMIN_ACCENTS = [
  'light_blue',
  'dark_purple',
  'purple',
  'teal',
  'green',
  'pink',
  'red',
  'orange',
  'yellow',
  'neutral',
] as const;

// ── Drush helpers ────────────────────────────────────────────────────────────
// Shared drush plumbing (drush(), TEMP_DIR, settings capture/restore) lives
// in lib/crawl-finalize.ts so the globalTeardown can reuse it.

/**
 * Apply a theme configuration to the running Drupal site via drush.
 * Runs synchronously so Playwright's beforeAll sequencing is respected.
 * Dark/light variants of the same Drupal theme share one switch call.
 */
function switchTheme(config: ThemeConfig): void {
  const themesToEnable = [...new Set([config.defaultTheme, config.adminTheme])].join(' ');
  drush(`theme:enable ${themesToEnable} -y`);
  drush(`config:set system.theme default ${config.defaultTheme} -y`);
  drush(`config:set system.theme admin ${config.adminTheme} -y`);
  if (config.defaultTheme === 'default_admin' || config.adminTheme === 'default_admin') {
    // 'auto' follows prefers-color-scheme, so Playwright's colorScheme
    // emulation drives the theme's real dark mode without a config change
    // between the light and dark scan groups.
    drush(`config:set default_admin.settings enable_dark_mode auto -y`);
  }
  drush(`cache:rebuild`);
}

/** Apply a Default Admin accent preset via its real theme setting. */
function setAccentPreset(preset: string): void {
  drush(`config:set default_admin.settings preset_accent_color ${preset} -y`);
  drush(`cache:rebuild`);
}

/** Whether a langcode is installed on the site (for the opt-in RTL crawl). */
function isLanguageInstalled(langcode: string): boolean {
  try {
    return drush(`config:get language.entity.${langcode} id --format=string`).trim() === langcode;
  }
  catch {
    return false;
  }
}

// ── Axe helper ───────────────────────────────────────────────────────────────

function buildAxeBuilder(page: Page, rules?: readonly string[]): AxeBuilder {
  const builder = new AxeBuilder({ page });
  return rules ? builder.withRules([...rules]) : builder.withTags(WCAG_TAGS);
}

function resolveRoute(page: Page, route: string): string {
  const configuredBaseUrl = (page.context() as any)._options.baseURL ?? DEFAULT_BASE_URL;
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

/**
 * Collect resource/DOM metrics from the loaded page via the Resource Timing
 * API. Runs before axe so the entry buffer only holds page-load resources.
 * transferSize is 0 for cross-origin resources without Timing-Allow-Origin;
 * on the local DDEV site everything is same-origin so sizes are complete.
 */
async function collectPageMetrics(page: Page): Promise<PageMetrics> {
  return page.evaluate(() => {
    const IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg', 'ico'];
    const FONT_EXTS = ['woff', 'woff2', 'ttf', 'otf', 'eot'];

    const nav = performance.getEntriesByType('navigation')[0] as PerformanceResourceTiming | undefined;
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const all = nav ? [nav, ...resources] : resources;

    const byType: Record<string, { count: number; transferBytes: number }> = {};
    const imageFormats: Record<string, { count: number; transferBytes: number }> = {};

    const bump = (
      bucket: Record<string, { count: number; transferBytes: number }>,
      key: string,
      bytes: number,
    ) => {
      bucket[key] = bucket[key] ?? { count: 0, transferBytes: 0 };
      bucket[key].count += 1;
      bucket[key].transferBytes += bytes;
    };

    for (const entry of resources) {
      const bytes = entry.transferSize || 0;
      let ext = '';
      try {
        const pathname = new URL(entry.name, location.href).pathname;
        ext = (pathname.match(/\.([a-z0-9]+)$/i)?.[1] ?? '').toLowerCase();
      } catch {
        // Ignore unparseable URLs (data:, blob:).
      }

      let type = 'other';
      if (IMAGE_EXTS.includes(ext) || entry.initiatorType === 'img') {
        type = 'image';
        bump(imageFormats, ext || 'unknown', bytes);
      }
      else if (ext === 'css' || entry.initiatorType === 'link') type = 'css';
      else if (ext === 'js' || ext === 'mjs' || entry.initiatorType === 'script') type = 'script';
      else if (FONT_EXTS.includes(ext)) type = 'font';
      else if (entry.initiatorType === 'xmlhttprequest' || entry.initiatorType === 'fetch') type = 'xhr';
      bump(byType, type, bytes);
    }

    return {
      requests: all.length,
      transferBytes: all.reduce((n, e) => n + (e.transferSize || 0), 0),
      decodedBytes: all.reduce((n, e) => n + (e.decodedBodySize || 0), 0),
      domNodes: document.getElementsByTagName('*').length,
      byType,
      imageFormats,
    };
  });
}

/**
 * Visit a route, run axe, and return the findings record.
 * Shared by the canonical, RTL, and accent scan groups.
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
    rules?: readonly string[];
    accentPreset?: string;
    language?: string;
    direction?: 'ltr' | 'rtl';
    /** HTTP status the route is expected to return (default 200/3xx). */
    expectedStatus?: number;
  },
): Promise<AxeResultRecord> {
  await page.setViewportSize({ width: opts.viewport.width, height: opts.viewport.height });
  const response = await page.goto(resolveRoute(page, opts.routePath), { waitUntil: 'domcontentloaded' });

  // Guard against silently scanning error pages: a missing route renders a
  // themed 404 that passes the readiness check and yields a useless
  // near-clean record. Only the inventory's intentional error pages (with
  // expectedStatus set) may scan a non-2xx/3xx response.
  const status = response?.status() ?? 0;
  if (opts.expectedStatus !== undefined) {
    if (status !== opts.expectedStatus) {
      throw new Error(`Route ${opts.routePath} returned HTTP ${status}, expected ${opts.expectedStatus}.`);
    }
  }
  else if (status >= 400) {
    throw new Error(
      `Route ${opts.routePath} returned HTTP ${status} — the page is missing on this site. ` +
      `Fix the site setup (see A11Y-PROCESS.md First-time setup) or remove the entry from lib/pages.ts.`,
    );
  }

  await ensurePageReadyForScan(page, opts.routePath);

  // Metrics only on full-rule scans: accent quick scans revisit the same
  // pages and would add no new resource data.
  const pageMetrics = opts.rules ? undefined : await collectPageMetrics(page);

  const axeResults = await buildAxeBuilder(page, opts.rules).analyze();

  const record: AxeResultRecord = {
    theme: opts.themeId,
    page: opts.testName,
    path: opts.routePath,
    viewport: opts.viewport,
    screen: opts.screen,
    colorScheme: opts.colorScheme,
    accentPreset: opts.accentPreset,
    language: opts.language ?? 'en',
    direction: opts.direction ?? 'ltr',
    timestamp: new Date().toISOString(),
    violations: axeResults.violations as AxeViolation[],
    incomplete: axeResults.incomplete as AxeViolation[],
    pageMetrics,
  };

  if (record.violations.length > 0) {
    console.log(
      `  ⚠️  [${opts.themeId}/${opts.viewport.width}px/${opts.colorScheme}${opts.accentPreset ? `/${opts.accentPreset}` : ''}${opts.direction === 'rtl' ? '/rtl' : ''}] ${record.violations.length} violation(s) on ${opts.testName}:`,
      record.violations.map((v) => `${v.id} [${v.impact}]`).join(', '),
    );
  }

  return record;
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

// ── Test suite ───────────────────────────────────────────────────────────────
//
// Shard merging and site-settings restore happen in globalTeardown
// (lib/crawl-finalize.ts), which runs exactly once after all workers exit.
// They must NOT happen in afterAll: Playwright runs beforeAll/afterAll per
// worker, and each scan group gets its own worker because their test.use()
// options differ — an afterAll merge would run dozens of times and its
// cleanup would delete every earlier group's shards.

test.describe('Axe crawl — multi-theme', () => {
  test.use({
    baseURL: DEFAULT_BASE_URL,
    ignoreHTTPSErrors: true,
  });

  test.beforeAll(async () => {
    // First worker records the site's original settings (before any theme
    // switching) so globalTeardown can restore them; later workers no-op.
    captureOriginalSettingsOnce();
  });

  // ── Canonical per-theme scan groups (full rule set) ───────────────────────

  for (const themeConfig of THEME_CONFIGS) {
    const scanGroup = (
      groupLabel: string,
      pages: readonly PageEntry[],
      useAuth: boolean,
    ) => {
      test.describe(`Theme: ${themeConfig.label} — ${groupLabel}`, () => {
        if (useAuth) {
          test.use({ storageState: AUTH_STATE_FILE, colorScheme: themeConfig.colorScheme });
        }
        else {
          test.use({ colorScheme: themeConfig.colorScheme });
        }

        const shardRecords: AxeResultRecord[] = [];

        test.beforeAll(() => {
          // Only switch the Drupal theme when colorScheme is 'light' (the first
          // variant). The dark variant uses the same Drupal theme; no switch needed.
          if (themeConfig.colorScheme === 'light') {
            switchTheme(themeConfig);
          }
        });

        test.afterAll(() => {
          writeResultShard(`${themeConfig.id}-${useAuth ? 'admin' : 'anon'}`, shardRecords);
        });

        for (const entry of pages) {
          for (const vp of STANDARD_VIEWPORTS) {
            const testName = `${entry.name}${vp.label}`;
            test(testName, async ({ page }) => {
              shardRecords.push(await scanRoute(page, {
                themeId: themeConfig.id,
                testName,
                routePath: entry.path,
                expectedStatus: entry.expectedStatus,
                viewport: { width: vp.width, height: vp.height },
                screen: vp.screen,
                colorScheme: themeConfig.colorScheme,
              }));
            });
          }
        }
      });
    };

    if (themeConfig.testAnonymous) {
      scanGroup('anonymous pages', anonymousPages, false);
    }
    if (themeConfig.testAdmin) {
      scanGroup('admin pages', adminPages, true);
    }
  }

  // ── RTL scan groups (opt-in, real language install required) ─────────────

  if (RTL_LANG) {
    const rtlAvailable = isLanguageInstalled(RTL_LANG);
    if (!rtlAvailable) {
      console.warn(
        `⚠️  RTL_LANG=${RTL_LANG} requested but the language is not installed. ` +
        `Run: ddev drush en language locale -y && ddev drush language:add ${RTL_LANG}`,
      );
    }

    // One RTL pass per unique Drupal theme (light only — direction bugs are
    // independent of color scheme).
    const rtlConfigs = THEME_CONFIGS.filter((c) => c.colorScheme === 'light');

    for (const themeConfig of rtlConfigs) {
      const rtlGroup = (
        groupLabel: string,
        pages: readonly PageEntry[],
        useAuth: boolean,
      ) => {
        test.describe(`RTL (${RTL_LANG}): ${themeConfig.label} — ${groupLabel}`, () => {
          test.skip(!rtlAvailable, `Language ${RTL_LANG} is not installed on the site.`);
          if (useAuth) {
            test.use({ storageState: AUTH_STATE_FILE, colorScheme: 'light' });
          }
          else {
            test.use({ colorScheme: 'light' });
          }

          const shardRecords: AxeResultRecord[] = [];

          test.beforeAll(() => {
            if (rtlAvailable) {
              switchTheme(themeConfig);
            }
          });

          test.afterAll(() => {
            writeResultShard(`${themeConfig.id}-rtl-${useAuth ? 'admin' : 'anon'}`, shardRecords);
          });

          for (const entry of pages) {
            for (const vp of RTL_VIEWPORTS) {
              const testName = `${entry.name}${vp.label} [${RTL_LANG}-rtl]`;
              test(testName, async ({ page }) => {
                shardRecords.push(await scanRoute(page, {
                  themeId: themeConfig.id,
                  testName,
                  routePath: `/${RTL_LANG}${entry.path}`,
                  expectedStatus: entry.expectedStatus,
                  viewport: { width: vp.width, height: vp.height },
                  screen: vp.screen,
                  colorScheme: 'light',
                  language: RTL_LANG,
                  direction: 'rtl',
                }));
              });
            }
          }
        });
      };

      if (themeConfig.testAnonymous) {
        rtlGroup('anonymous pages', anonymousPages, false);
      }
      if (themeConfig.testAdmin) {
        rtlGroup('admin pages', adminPages, true);
      }
    }
  }

  // ── Accent preset scan groups (Default Admin, color rules only) ──────────

  const accentBaseConfig = THEME_CONFIGS.find(
    (c) => c.adminTheme === 'default_admin' && c.colorScheme === 'light',
  );

  if (accentBaseConfig) {
    for (const accentPreset of DEFAULT_ADMIN_ACCENTS) {
      for (const colorScheme of ['light', 'dark'] as const) {
        test.describe(`Accent: ${accentPreset} (${colorScheme}) — admin pages, color rules`, () => {
          test.use({ storageState: AUTH_STATE_FILE, colorScheme });

          const shardRecords: AxeResultRecord[] = [];

          test.beforeAll(() => {
            // The Drupal theme is already default_admin from the canonical
            // groups; only the accent preset changes (light/dark share it).
            if (colorScheme === 'light') {
              switchTheme(accentBaseConfig);
              setAccentPreset(accentPreset);
            }
          });

          test.afterAll(() => {
            writeResultShard(`accent-${accentPreset}-${colorScheme}`, shardRecords);
          });

          const vp = STANDARD_VIEWPORTS[0]; // desktop only — color is viewport-independent
          for (const entry of adminPages) {
            const testName = `${entry.name}${vp.label} [accent:${accentPreset}]`;
            test(testName, async ({ page }) => {
              shardRecords.push(await scanRoute(page, {
                themeId: `${accentBaseConfig.id}-accent-${accentPreset}`,
                testName,
                routePath: entry.path,
                expectedStatus: entry.expectedStatus,
                viewport: { width: vp.width, height: vp.height },
                screen: vp.screen,
                colorScheme,
                rules: COLOR_RULES,
                accentPreset,
              }));
            });
          }
        });
      }
    }
  }
});
