import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CRAWL_TAGS, INSTALLED_PROFILE, baselineFor, baselineFromCoverage, crawlScenarioId, expectedStatusFor, resolveProfile,
  restoreCommands, skipReason, statusProblem, summarizeCoverage, switchCommands, testProfile,
} from '../playwright/lib/crawl.mjs';

const CONFIGS = [
  { id: 'admin', defaultTheme: 'default_admin', adminTheme: 'default_admin', testAnonymous: true, testAdmin: true, colorScheme: 'light' },
  { id: 'admin-dark', defaultTheme: 'default_admin', adminTheme: 'default_admin', testAnonymous: true, testAdmin: true, colorScheme: 'dark' },
  { id: 'front-only', defaultTheme: 'stark', adminTheme: 'default_admin', testAnonymous: true, testAdmin: false, colorScheme: 'light' },
];
const THEMES = { default: 'default_admin', admin: 'default_admin' };
const CURRENT = { themes: THEMES, colorScheme: 'light', tags: CRAWL_TAGS, axeVersion: '4.12.1' };

// ---------------------------------------------------------------- profiles and ids

test('resolveProfile defaults to the installed themes and rejects unknown ids', () => {
  assert.deepEqual(resolveProfile(undefined, CONFIGS), { id: INSTALLED_PROFILE, themeConfig: null, colorScheme: 'light' });
  assert.equal(resolveProfile('  ', CONFIGS).id, INSTALLED_PROFILE);
  assert.equal(resolveProfile('installed', CONFIGS).themeConfig, null);
  const dark = resolveProfile('admin-dark', CONFIGS);
  assert.equal(dark.themeConfig.id, 'admin-dark');
  assert.equal(dark.colorScheme, 'dark');
  assert.throws(() => resolveProfile('olivero', CONFIGS), /Use one of: installed, admin, admin-dark, front-only/);
});

test('crawlScenarioId is stable and within the schema limits', () => {
  assert.equal(crawlScenarioId('installed', 'user-login'), 'crawl-installed-user-login');
  assert.equal(crawlScenarioId('admin-dark', 'text-format-restricted-html'), 'crawl-admin-dark-text-format-restricted-html');
  assert.throws(() => crawlScenarioId('installed', 'Bad Id'));
  assert.throws(() => crawlScenarioId('installed', 'x'.repeat(60)));
});

test('testProfile names both themes', () => {
  assert.equal(testProfile(THEMES), 'axe-crawl:default_admin+default_admin');
});

test('skipReason explains every page that is not scanned', () => {
  const anon = { requiresAuth: false };
  const admin = { requiresAuth: true };
  assert.equal(skipReason(anon, { themeConfig: null, hasCredentials: false }), null);
  assert.match(skipReason(admin, { themeConfig: null, hasCredentials: false }), /DRUPAL_TEST_USER/);
  assert.equal(skipReason(admin, { themeConfig: null, hasCredentials: true }), null);
  assert.match(skipReason(admin, { themeConfig: CONFIGS[2], hasCredentials: true }), /front-only does not test pages that need a login/);
  assert.match(skipReason(anon, { themeConfig: { ...CONFIGS[0], testAnonymous: false }, hasCredentials: true }), /does not test anonymous pages/);
});

test('expectedStatusFor adds the crawl-only 403 pages without changing lib/pages.ts', () => {
  assert.equal(expectedStatusFor({ id: 'front' }), 403);
  assert.equal(expectedStatusFor({ id: 'user-register' }), 403);
  assert.equal(expectedStatusFor({ id: 'not-found', expectedStatus: 404 }), 404);
  assert.equal(expectedStatusFor({ id: 'admin' }), undefined);
});

test('statusProblem never lets an error page pass as the target page', () => {
  assert.equal(statusProblem('/user/login', 200), null);
  assert.equal(statusProblem('/admin', 302), null);
  assert.match(statusProblem('/admin/modules', 404), /returned HTTP 404/);
  assert.match(statusProblem('/admin/modules', 500), /returned HTTP 500/);
  assert.match(statusProblem('/admin/modules', null), /no response/);
  assert.equal(statusProblem('/', 403, 403), null);
  assert.match(statusProblem('/', 200, 403), /returned HTTP 200, expected 403/);
});

// ---------------------------------------------------------------- baselines

const BASELINE = {
  profile: 'installed', themes: THEMES, color_scheme: 'light', tags: CRAWL_TAGS,
  recorded_from: { run_id: 'run-x', drupal_commit: 'a'.repeat(40), axe_core: '4.12.1', recorded_at: '2026-11-24T00:00:00Z' },
  pages: { 'user-login': { path: '/user/login', accepted: ['region ["#x"]'] } },
};

test('baselineFor returns the accepted keys when the baseline fits the run', () => {
  assert.deepEqual(baselineFor(BASELINE, 'user-login', CURRENT), { accepted: ['region ["#x"]'], problems: [], warnings: [] });
});

test('baselineFor accepts nothing when the baseline is missing or recorded differently', () => {
  assert.match(baselineFor(null, 'user-login', CURRENT).problems[0], /No baseline file/);
  const otherThemes = baselineFor({ ...BASELINE, themes: { default: 'stark', admin: 'default_admin' } }, 'user-login', CURRENT);
  assert.deepEqual(otherThemes.accepted, []);
  assert.match(otherThemes.problems[0], /stark\+default_admin/);
  assert.match(baselineFor(BASELINE, 'user-login', { ...CURRENT, colorScheme: 'dark' }).problems[0], /light color scheme/);
  assert.match(baselineFor(BASELINE, 'user-login', { ...CURRENT, tags: ['wcag2a'] }).problems[0], /axe tags/);
  const unknownPage = baselineFor(BASELINE, 'admin', CURRENT);
  assert.deepEqual(unknownPage.accepted, []);
  assert.match(unknownPage.problems[0], /no entry for page admin/);
});

test('baselineFor still compares across axe-core versions, with a warning', () => {
  const result = baselineFor(BASELINE, 'user-login', { ...CURRENT, axeVersion: '4.13.0' });
  assert.deepEqual(result.accepted, ['region ["#x"]']);
  assert.match(result.warnings[0], /axe-core 4.12.1; this run used 4.13.0/);
});

// ---------------------------------------------------------------- coverage

function record(pageId, status, completedAt, extra = {}) {
  return {
    scenario_id: `crawl-installed-${pageId}`,
    attempt: { started_at: completedAt, completed_at: completedAt },
    crawl: {
      page_id: pageId, path: `/${pageId}`, themes: THEMES, color_scheme: 'light', tags: CRAWL_TAGS, axe_core: '4.12.1',
      status, reason: null, http_status: 200, violation_keys: [], incomplete: 0, baseline: null, ...extra,
    },
  };
}

const PAGES = [{ id: 'a', path: '/a' }, { id: 'b', path: '/b' }, { id: 'c', path: '/c' }, { id: 'd', path: '/d' }];

test('summarizeCoverage lists every planned page, including ones with no result', () => {
  const coverage = summarizeCoverage({
    runId: 'run-x',
    profile: { id: 'installed' },
    pages: PAGES,
    records: [
      record('a', 'scanned', '2026-11-24T10:00:00Z', { violation_keys: ['k1', 'k2'], baseline: { added: ['k2'], resolved: ['k0'] } }),
      record('b', 'skipped', '2026-11-24T10:00:01Z', { reason: 'no credentials', http_status: null }),
      record('c', 'not-scanned', '2026-11-24T10:00:02Z', { reason: '/c returned HTTP 404.', http_status: 404 }),
      { scenario_id: 'admin-content-overview', attempt: {} },
    ],
  });
  assert.deepEqual(coverage.pages.map((p) => p.status), ['scanned', 'skipped', 'not-scanned', 'not-run']);
  assert.equal(coverage.pages[1].reason, 'no credentials');
  assert.match(coverage.pages[3].reason, /filtered out or the run stopped/);
  assert.equal(coverage.pages[3].scenario_id, 'crawl-installed-d');
  assert.deepEqual(coverage.totals, { planned: 4, scanned: 1, skipped: 1, not_scanned: 1, not_run: 1, violations: 2, new: 1, resolved: 1 });
  assert.deepEqual(coverage.themes, THEMES);
  assert.equal(coverage.axe_core, '4.12.1');
});

test('summarizeCoverage takes run metadata from a scanned page', () => {
  const coverage = summarizeCoverage({
    runId: 'run-x',
    profile: { id: 'installed' },
    pages: PAGES.slice(0, 2),
    records: [
      record('a', 'not-scanned', 't1', { themes: null, axe_core: null }),
      record('b', 'scanned', 't2'),
    ],
  });
  assert.deepEqual(coverage.themes, THEMES);
  assert.equal(coverage.axe_core, '4.12.1');
});

test('summarizeCoverage keeps the latest attempt of a retried page', () => {
  const coverage = summarizeCoverage({
    runId: 'run-x',
    profile: { id: 'installed' },
    pages: [PAGES[0]],
    records: [
      record('a', 'scanned', '2026-11-24T10:00:05Z'),
      record('a', 'not-scanned', '2026-11-24T10:00:00Z', { reason: 'timeout' }),
    ],
  });
  assert.equal(coverage.pages[0].status, 'scanned');
});

test('baselineFromCoverage records every scanned page and refuses incomplete runs', () => {
  const complete = summarizeCoverage({
    runId: 'run-x', profile: { id: 'installed' }, pages: PAGES.slice(0, 2),
    records: [record('a', 'scanned', 't1', { violation_keys: ['k1'] }), record('b', 'scanned', 't2')],
  });
  const baseline = baselineFromCoverage(complete, { drupalCommit: 'c'.repeat(40), recordedAt: '2026-11-24T12:00:00Z' });
  assert.deepEqual(baseline.pages, { a: { path: '/a', accepted: ['k1'] }, b: { path: '/b', accepted: [] } });
  assert.equal(baseline.recorded_from.run_id, 'run-x');
  assert.equal(baseline.recorded_from.axe_core, '4.12.1');
  assert.deepEqual(baseline.tags, CRAWL_TAGS);
  assert.match(baseline.policy, /not an accepted barrier/);
  // A baseline written from a run must fit that run.
  assert.deepEqual(baselineFor(baseline, 'a', CURRENT), { accepted: ['k1'], problems: [], warnings: [] });

  const partial = summarizeCoverage({ runId: 'run-y', profile: { id: 'installed' }, pages: PAGES.slice(0, 2), records: [record('a', 'scanned', 't1')] });
  assert.throws(() => baselineFromCoverage(partial, { drupalCommit: null, recordedAt: 'now' }), /incomplete run\. Not scanned: b \(not-run\)/);
});

// ---------------------------------------------------------------- site state

test('switchCommands installs only missing themes and sets dark mode to follow the browser', () => {
  assert.deepEqual(switchCommands(CONFIGS[1], ['default_admin', 'stark']), [
    ['config:set', '-n', 'system.theme', 'default', 'default_admin'],
    ['config:set', '-n', 'system.theme', 'admin', 'default_admin'],
    ['config:set', '-n', 'default_admin.settings', 'enable_dark_mode', 'auto'],
    ['cache:rebuild'],
  ]);
  const commands = switchCommands({ defaultTheme: 'olivero', adminTheme: 'claro' }, ['default_admin']);
  assert.deepEqual(commands[0], ['ex:install', 'olivero,claro', '-y']);
  assert.ok(!commands.some((c) => c.includes('enable_dark_mode')));
});

test('restoreCommands resets themes and dark mode, then uninstalls what the crawl installed', () => {
  const original = { defaultTheme: 'default_admin', adminTheme: 'default_admin', installedThemes: ['default_admin', 'stark'], darkMode: 'light' };
  assert.deepEqual(restoreCommands(original, ['default_admin', 'stark', 'olivero']), [
    ['config:set', '-n', 'system.theme', 'default', 'default_admin'],
    ['config:set', '-n', 'system.theme', 'admin', 'default_admin'],
    ['config:set', '-n', 'default_admin.settings', 'enable_dark_mode', 'light'],
    ['ex:uninstall', 'olivero', '-y'],
    ['cache:rebuild'],
  ]);
  const noDarkMode = restoreCommands({ ...original, darkMode: null }, ['default_admin', 'stark']);
  assert.ok(!noDarkMode.some((c) => c.includes('enable_dark_mode')));
});

test('site state commands refuse values that are not machine names', () => {
  assert.throws(() => switchCommands({ defaultTheme: 'x; rm -rf /', adminTheme: 'default_admin' }, []), /unexpected theme name/);
  const original = { defaultTheme: 'default_admin', adminTheme: 'default_admin', installedThemes: ['default_admin'], darkMode: 'auto' };
  assert.throws(() => restoreCommands({ ...original, defaultTheme: '$(id)' }, ['default_admin']), /unexpected theme name/);
  assert.throws(() => restoreCommands({ ...original, darkMode: 'a b' }, ['default_admin']), /enable_dark_mode value/);
});
