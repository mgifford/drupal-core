/**
 * Pure logic for the multi-page axe-core crawl
 * (tests/crawl/a11y-axe-crawl.spec.ts). No browser and no Drush here, so
 * everything is covered by tests/unit/crawl.test.mjs.
 *
 * A crawl run uses one profile:
 *   installed   the site's themes as they are; the crawl changes nothing
 *   <id>        a theme config from lib/theme-configs.ts (CRAWL_THEME=<id>);
 *               the crawl switches themes with Drush and restores them
 */
import { assertScenarioId } from './evidence/ids.mjs';

// No import.meta here: Playwright loads this file as CommonJS from specs.

export const INSTALLED_PROFILE = 'installed';

/** WCAG 2.x A and AA plus axe best practices: the old crawl's full rule set. */
export const CRAWL_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa', 'best-practice'];

export const BASELINE_POLICY =
  'Recorded from one complete crawl run with scripts/crawl-baseline.mjs. Every key was found in that run. ' +
  'No key has been reviewed by a person, and a listed key is not an accepted barrier: the baseline only lets ' +
  'the crawl fail on findings that are new since the recording. Remove keys the crawl reports as resolved. ' +
  'Re-record only from a complete run, and review the diff before committing it.';

/**
 * @param {string|undefined} value  CRAWL_THEME
 * @template {{id: string, colorScheme: 'light'|'dark'}} T
 * @param {T[]} themeConfigs
 * @returns {{id: string, themeConfig: T|null, colorScheme: 'light'|'dark'}}
 */
export function resolveProfile(value, themeConfigs) {
  const id = (value ?? '').trim();
  if (!id || id === INSTALLED_PROFILE) {
    return { id: INSTALLED_PROFILE, themeConfig: null, colorScheme: 'light' };
  }
  const themeConfig = themeConfigs.find((config) => config.id === id);
  if (!themeConfig) {
    const known = [INSTALLED_PROFILE, ...themeConfigs.map((config) => config.id)].join(', ');
    throw new Error(`CRAWL_THEME=${id} is not a crawl profile. Use one of: ${known}.`);
  }
  return { id: themeConfig.id, themeConfig, colorScheme: themeConfig.colorScheme };
}

/** Stable scenario id for one page in one profile, e.g. crawl-installed-user-login. */
export function crawlScenarioId(profileId, pageId) {
  return assertScenarioId(`crawl-${profileId}-${pageId}`);
}

export function baselineFileName(profileId) {
  return `crawl-${profileId}.json`;
}

/**
 * Names the configuration findings were seen in, for the occurrence
 * fingerprint: the same rule and element under other themes is another
 * occurrence.
 */
export function testProfile(themes) {
  return `axe-crawl:${themes.default}+${themes.admin}`;
}

/** Why a page is not scanned in this run, or null when it is. */
export function skipReason(page, { themeConfig, hasCredentials }) {
  if (themeConfig && page.requiresAuth && !themeConfig.testAdmin) {
    return `Theme config ${themeConfig.id} does not test pages that need a login.`;
  }
  if (themeConfig && !page.requiresAuth && !themeConfig.testAnonymous) {
    return `Theme config ${themeConfig.id} does not test anonymous pages.`;
  }
  if (page.requiresAuth && !hasCredentials) {
    return 'DRUPAL_TEST_USER and DRUPAL_TEST_PASS are not set, so pages that need a login were not scanned.';
  }
  return null;
}

/**
 * Statuses the crawl expects where lib/pages.ts sets none. Kept here, not in
 * lib/pages.ts, because the multi-scanner spec skips 403 pages that have no
 * expectedStatus, and should keep doing so.
 */
export const CRAWL_EXPECTED_STATUS = {
  // Since upstream 308cba9319 (drupal.org #3590882) the Standard front page
  // is /admin/welcome, so an anonymous visitor gets "Access denied".
  front: 403,
  // Standard sets user.settings register: admin_only (drupal.org #3453676).
  'user-register': 403,
};

/** The HTTP status the crawl expects for a page, or undefined for "below 400". */
export function expectedStatusFor(page) {
  return page.expectedStatus ?? CRAWL_EXPECTED_STATUS[page.id];
}

/**
 * Guards against scanning an error page by mistake: a missing route renders
 * a themed page that would yield a near-clean, useless result.
 *
 * @returns {string|null} the problem, or null when the status is as expected
 */
export function statusProblem(pagePath, actual, expected) {
  if (expected !== undefined && expected !== null) {
    return actual === expected ? null : `${pagePath} returned HTTP ${actual}, expected ${expected}.`;
  }
  if (!actual || actual >= 400) {
    return `${pagePath} returned HTTP ${actual || 'no response'}. A page in lib/pages.ts is missing or broken: ` +
      'fix the site setup, or update lib/pages.ts if upstream removed the page.';
  }
  return null;
}

/**
 * Picks the baseline keys for one page and says whether the baseline fits
 * this run.
 *
 * @param {object|null} baseline  parsed baselines/axe/crawl-<profile>.json, or null if absent
 * @param {string} pageId
 * @param {{themes: {default: string, admin: string}, colorScheme: string, tags: string[], axeVersion: string|null}} current
 * @returns {{accepted: string[], problems: string[], warnings: string[]}}
 *   problems: the baseline cannot be used, so nothing counts as accepted;
 *   warnings: comparison still runs, but read new findings with care.
 */
export function baselineFor(baseline, pageId, current) {
  const problems = [];
  const warnings = [];
  if (!baseline) {
    return { accepted: [], problems: ['No baseline file for this profile: record one with scripts/crawl-baseline.mjs.'], warnings };
  }
  const themes = baseline.themes ?? {};
  if (themes.default !== current.themes.default || themes.admin !== current.themes.admin) {
    problems.push(`Baseline was recorded with themes ${themes.default}+${themes.admin}; this run used ${current.themes.default}+${current.themes.admin}.`);
  }
  if (baseline.color_scheme !== current.colorScheme) {
    problems.push(`Baseline was recorded in the ${baseline.color_scheme} color scheme; this run used ${current.colorScheme}.`);
  }
  if (JSON.stringify(baseline.tags) !== JSON.stringify(current.tags)) {
    problems.push(`Baseline was recorded with axe tags ${JSON.stringify(baseline.tags)}; this run used ${JSON.stringify(current.tags)}.`);
  }
  const recordedAxe = baseline.recorded_from?.axe_core ?? null;
  if (recordedAxe !== current.axeVersion) {
    warnings.push(`Baseline was recorded with axe-core ${recordedAxe}; this run used ${current.axeVersion}. New findings may come from changed rules, not from Drupal.`);
  }
  if (problems.length) {
    return { accepted: [], problems, warnings };
  }
  const entry = baseline.pages?.[pageId];
  if (!entry) {
    return { accepted: [], problems: [`The baseline has no entry for page ${pageId}.`], warnings };
  }
  return { accepted: entry.accepted, problems, warnings };
}

/**
 * Builds the coverage summary: every planned page with what happened to it.
 *
 * @param {object} input
 * @param {string} input.runId
 * @param {{id: string}} input.profile
 * @param {Array<{id: string, path: string}>} input.pages  the planned pages, in order
 * @param {object[]} input.records  scenario records from the run folder; those
 *   without a `crawl` field are ignored. A retried page keeps its latest attempt.
 */
export function summarizeCoverage({ runId, profile, pages, records }) {
  const latest = new Map();
  for (const record of records) {
    if (!record.crawl) continue;
    const at = record.attempt?.completed_at ?? record.attempt?.started_at ?? '';
    const previous = latest.get(record.crawl.page_id);
    if (!previous || at >= previous.at) {
      latest.set(record.crawl.page_id, { at, record });
    }
  }
  // Run metadata from a scanned page: skipped or failed pages may lack it.
  const found = [...latest.values()].map((entry) => entry.record.crawl);
  const first = found.find((crawl) => crawl.status === 'scanned') ?? found[0] ?? null;
  const rows = pages.map((page) => {
    const found = latest.get(page.id);
    if (!found) {
      return {
        page_id: page.id, path: page.path, scenario_id: crawlScenarioId(profile.id, page.id),
        status: 'not-run', reason: 'No result was recorded: the test was filtered out or the run stopped first.',
        http_status: null, violation_keys: [], incomplete: 0, new: [], resolved: [],
      };
    }
    const { crawl } = found.record;
    return {
      page_id: page.id,
      path: page.path,
      scenario_id: found.record.scenario_id,
      status: crawl.status,
      reason: crawl.reason,
      http_status: crawl.http_status,
      violation_keys: crawl.violation_keys,
      incomplete: crawl.incomplete,
      new: crawl.baseline?.added ?? [],
      resolved: crawl.baseline?.resolved ?? [],
    };
  });
  const count = (status) => rows.filter((row) => row.status === status).length;
  return {
    artifact_type: 'axe-crawl-coverage',
    schema_version: 1,
    run_id: runId,
    profile: profile.id,
    themes: first?.themes ?? null,
    color_scheme: first?.color_scheme ?? null,
    tags: first?.tags ?? null,
    axe_core: first?.axe_core ?? null,
    pages: rows,
    totals: {
      planned: rows.length,
      scanned: count('scanned'),
      skipped: count('skipped'),
      not_scanned: count('not-scanned'),
      not_run: count('not-run'),
      violations: rows.reduce((sum, row) => sum + row.violation_keys.length, 0),
      new: rows.reduce((sum, row) => sum + row.new.length, 0),
      resolved: rows.reduce((sum, row) => sum + row.resolved.length, 0),
    },
  };
}

/**
 * Turns the coverage of one complete run into a baseline file. Refuses a
 * run where any planned page was not scanned, so a baseline never silently
 * misses a page.
 */
export function baselineFromCoverage(coverage, { drupalCommit, recordedAt }) {
  const missing = coverage.pages.filter((page) => page.status !== 'scanned');
  if (missing.length) {
    throw new Error(`Not recording a baseline from an incomplete run. Not scanned: ${missing.map((page) => `${page.page_id} (${page.status})`).join(', ')}.`);
  }
  return {
    profile: coverage.profile,
    themes: coverage.themes,
    color_scheme: coverage.color_scheme,
    tags: coverage.tags,
    policy: BASELINE_POLICY,
    recorded_from: {
      run_id: coverage.run_id,
      drupal_commit: drupalCommit,
      axe_core: coverage.axe_core,
      recorded_at: recordedAt,
    },
    pages: Object.fromEntries(coverage.pages.map((page) => [page.page_id, { path: page.path, accepted: page.violation_keys }])),
  };
}

// ---------------------------------------------------------------- site state

/** Drupal machine names and the config values used here; anything else is refused before it reaches a shell. */
export function assertSafeValue(value, what) {
  if (typeof value !== 'string' || !/^[a-z0-9_]+$/.test(value)) {
    throw new Error(`refusing unexpected ${what}: ${JSON.stringify(value)}`);
  }
  return value;
}

/**
 * Drush (`dr`) commands that apply a theme config.
 *
 * @param {{defaultTheme: string, adminTheme: string}} themeConfig
 * @param {string[]} installedThemes  themes installed right now
 */
export function switchCommands(themeConfig, installedThemes) {
  const themes = [...new Set([themeConfig.defaultTheme, themeConfig.adminTheme])].map((theme) => assertSafeValue(theme, 'theme name'));
  const commands = [];
  const toInstall = themes.filter((theme) => !installedThemes.includes(theme));
  if (toInstall.length) {
    commands.push(['ex:install', toInstall.join(','), '-y']);
  }
  commands.push(['config:set', '-n', 'system.theme', 'default', themeConfig.defaultTheme]);
  commands.push(['config:set', '-n', 'system.theme', 'admin', themeConfig.adminTheme]);
  if (themes.includes('default_admin')) {
    // 'auto' follows prefers-color-scheme, so Playwright's colorScheme
    // emulation shows the theme's real dark mode.
    commands.push(['config:set', '-n', 'default_admin.settings', 'enable_dark_mode', 'auto']);
  }
  commands.push(['cache:rebuild']);
  return commands;
}

/**
 * Drush (`dr`) commands that put back the state captured before the crawl.
 *
 * @param {{defaultTheme: string, adminTheme: string, installedThemes: string[], darkMode: string|null}} original
 * @param {string[]} installedThemes  themes installed right now
 */
export function restoreCommands(original, installedThemes) {
  assertSafeValue(original.defaultTheme, 'theme name');
  assertSafeValue(original.adminTheme, 'theme name');
  const commands = [
    ['config:set', '-n', 'system.theme', 'default', original.defaultTheme],
    ['config:set', '-n', 'system.theme', 'admin', original.adminTheme],
  ];
  if (original.darkMode !== null && installedThemes.includes('default_admin')) {
    commands.push(['config:set', '-n', 'default_admin.settings', 'enable_dark_mode', assertSafeValue(original.darkMode, 'enable_dark_mode value')]);
  }
  // Uninstall only after the defaults point back at the original themes.
  const added = installedThemes.filter((theme) => !original.installedThemes.includes(theme)).map((theme) => assertSafeValue(theme, 'theme name'));
  if (added.length) {
    commands.push(['ex:uninstall', added.join(','), '-y']);
  }
  commands.push(['cache:rebuild']);
  return commands;
}
