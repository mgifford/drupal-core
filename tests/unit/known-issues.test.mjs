import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  createClient, resolveTagIds, fetchTaggedIssues, fetchIssue, normalizeIssue, plainText, issueNid,
  DrupalOrgError, USER_AGENT, OPEN_STATUSES,
} from '../../tools/lib/known-issues/drupal-org.mjs';
import {
  loadManifest, listManifests, groupFindings, scoreIssue, matchGroups, containsToken, containsPath,
  selectorTokens, titleNamesWords, InputError,
} from '../../tools/lib/known-issues/match.mjs';
import { mappedEntries, recheckEntry, coversEntry, issueFacts } from '../../tools/lib/known-issues/recheck.mjs';
import { renderMatchReport, renderRecheckReport, observationDraft, escapeMarkdown } from '../../tools/lib/known-issues/report.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const FIXTURES = path.join(ROOT, 'tests/unit/fixtures/known-issues');
const EXAMPLE = path.join(ROOT, 'schemas/examples/quality-evidence-run.example.json');
const fixture = (name) => JSON.parse(fs.readFileSync(path.join(FIXTURES, name), 'utf8'));
const clone = (value) => structuredClone(value);
const example = () => clone(JSON.parse(fs.readFileSync(EXAMPLE, 'utf8')));

/** A fake fetch that serves the recorded fixtures and records each request. */
function fixtureFetch({ fail = {} } = {}) {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init });
    if (fail[calls.length]) return fail[calls.length]();
    const u = new URL(url);
    let body;
    if (u.pathname === '/api-d7/taxonomy_term.json') {
      const name = u.searchParams.get('name').toLowerCase();
      const file = path.join(FIXTURES, `taxonomy-term-${name}.json`);
      body = fs.existsSync(file) ? fixture(`taxonomy-term-${name}.json`) : { list: [] };
    }
    else if (u.pathname === '/api-d7/node.json') {
      const file = `node-list-status-${u.searchParams.get('field_issue_status')}-page-${u.searchParams.get('page')}.json`;
      body = fs.existsSync(path.join(FIXTURES, file)) ? fixture(file) : fixture('node-list-empty.json');
    }
    else if (u.pathname === '/api-d7/node/3088500.json') {
      body = fixture('node-3088500.json');
    }
    else {
      return new Response('not found', { status: 404 });
    }
    return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
  };
  return { fetchImpl, calls };
}

const quiet = { sleep: async () => {}, now: () => 0 };

// ---------------------------------------------------------------- client

test('the client sends only GETs to api-d7 with a generic User-Agent', async () => {
  const { fetchImpl, calls } = fixtureFetch();
  const client = createClient({ fetchImpl, ...quiet });
  await client.getJson('node/3088500.json');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://www.drupal.org/api-d7/node/3088500.json');
  assert.equal(calls[0].init.method, 'GET');
  assert.equal(calls[0].init.headers['User-Agent'], USER_AGENT);
  assert.equal(calls[0].init.credentials, 'omit');
  assert.doesNotMatch(USER_AGENT, /@|github|mgifford|civicactions/i);
  await assert.rejects(client.getJson('https://example.com/api-d7/x'), DrupalOrgError);
  await assert.rejects(client.getJson('../node/1.json'), /only https:\/\/www\.drupal\.org\/api-d7\//);
  assert.equal(calls.length, 1, 'refused URLs are never requested');
});

test('the client spaces requests by at least one second', async () => {
  const sleeps = [];
  let clock = 0;
  const { fetchImpl } = fixtureFetch();
  const client = createClient({ fetchImpl, delayMs: 0, now: () => clock, sleep: async (ms) => { sleeps.push(ms); clock += ms; } });
  await client.getJson('node/3088500.json');
  await client.getJson('node/3088500.json');
  clock += 400;
  await client.getJson('node/3088500.json');
  assert.deepEqual(sleeps, [1000, 600]);
  assert.equal(client.requests, 3);
});

test('the client retries once on 503 and network errors, then gives up', async () => {
  const unavailable = () => new Response('busy', { status: 503 });
  const { fetchImpl, calls } = fixtureFetch({ fail: { 1: unavailable } });
  const client = createClient({ fetchImpl, ...quiet });
  assert.equal((await client.getJson('node/3088500.json')).nid, '3088500');
  assert.equal(calls.length, 2);

  const down = createClient({ fetchImpl: async () => { throw new TypeError('fetch failed', { cause: { code: 'ENOTFOUND' } }); }, ...quiet });
  await assert.rejects(down.getJson('node/1.json'), /ENOTFOUND/);
  assert.equal(down.requests, 2);

  const missing = createClient({ fetchImpl, ...quiet });
  await assert.rejects(missing.getJson('node/1.json'), (error) => error instanceof DrupalOrgError && error.status === 404);
  assert.equal(missing.requests, 1, '404 is not retried');
});

test('the client honours Retry-After up to 60 s and does not follow redirects', async () => {
  const sleeps = [];
  const busy = () => new Response('slow down', { status: 429, headers: { 'retry-after': '120' } });
  const { fetchImpl, calls } = fixtureFetch({ fail: { 1: busy } });
  await createClient({ fetchImpl, now: () => 0, sleep: async (ms) => { sleeps.push(ms); } }).getJson('node/3088500.json');
  assert.ok(sleeps.includes(60000), `slept ${sleeps}`);
  assert.equal(calls[0].init.redirect, 'manual');

  const moved = () => new Response('', { status: 301, headers: { location: 'https://example.com/' } });
  const redirecting = fixtureFetch({ fail: { 1: moved } });
  const client = createClient({ fetchImpl: redirecting.fetchImpl, ...quiet });
  await assert.rejects(client.getJson('node/3088500.json'), (error) => error instanceof DrupalOrgError && error.status === 301);
  assert.equal(redirecting.calls.length, 1, 'the redirect target is never requested');
});

test('resolveTagIds picks the tag vocabulary and maps unknown names to null', async () => {
  const { fetchImpl } = fixtureFetch();
  const ids = await resolveTagIds(createClient({ fetchImpl, ...quiet }), ['Accessibility', 'wcag143', 'wcag131', 'wcag999']);
  assert.deepEqual(ids, { Accessibility: '1101', wcag143: '204420', wcag131: '195698', wcag999: null });
});

test('fetchTaggedIssues pages through each open status and keeps no personal data', async () => {
  const { fetchImpl, calls } = fixtureFetch();
  const lines = [];
  const { issues, truncated } = await fetchTaggedIssues(createClient({ fetchImpl, ...quiet }), { tagId: '1101', log: (l) => lines.push(l) });
  assert.equal(truncated, false);
  assert.equal(calls.length, OPEN_STATUSES.length + 1, 'status 1 has two pages');
  const first = new URL(calls[0].url).searchParams;
  assert.deepEqual(Object.fromEntries(first), {
    type: 'project_issue', field_project: '3060', taxonomy_vocabulary_9: '1101', field_issue_status: '1',
    limit: '50', page: '0', sort: 'nid', direction: 'ASC',
  });
  assert.deepEqual(issues.map((i) => i.nid), [3084554, 3088500, 3540337, 3636986]);
  const issue = issues.find((i) => i.nid === 3540337);
  assert.equal(issue.text, 'Fixture text. The <button> has low contrast & no focus ring.');
  assert.equal(issue.status_label, 'Active');
  assert.equal(issue.open, true);
  assert.equal(issue.url, 'https://www.drupal.org/i/3540337');
  for (const record of issues) {
    assert.deepEqual(Object.keys(record).sort(), ['category', 'changed', 'component', 'created', 'nid', 'open', 'priority', 'status', 'status_label', 'tag_ids', 'text', 'title', 'url', 'version']);
  }
});

test('fetchTaggedIssues reports truncation at the page limit', async () => {
  const { fetchImpl } = fixtureFetch();
  const { truncated } = await fetchTaggedIssues(createClient({ fetchImpl, ...quiet }), { tagId: '1101', statuses: [1], maxPages: 1 });
  assert.equal(truncated, true);
});

test('fetchIssue normalizes one node and rejects non-numeric ids', async () => {
  const { fetchImpl } = fixtureFetch();
  const client = createClient({ fetchImpl, ...quiet });
  const issue = await fetchIssue(client, 3088500);
  assert.equal(issue.status_label, 'Needs work');
  assert.equal(issue.changed, '2023-10-02T12:55:59.000Z');
  await assert.rejects(fetchIssue(client, '1/../2'), DrupalOrgError);
});

test('plainText drops markup and comments and decodes entities once', () => {
  assert.equal(plainText('<p>a&nbsp;&lt;b&gt;</p><!-- hidden --><script>x()</script>&#66;&#x41;&amp;lt;'), 'a <b> BA&lt;');
  assert.equal(plainText(null), '');
});

test('issueNid accepts drupal.org issue URLs only', () => {
  assert.equal(issueNid('https://www.drupal.org/project/drupal/issues/3318394'), 3318394);
  assert.equal(issueNid('https://www.drupal.org/i/3088500'), 3088500);
  assert.equal(issueNid('https://www.drupal.org/node/3088500#comment-1'), 3088500);
  assert.equal(issueNid('https://www.drupal.org/project/drupal/issues/new'), null);
  assert.equal(issueNid('https://evil.example/i/1'), null);
});

// ---------------------------------------------------------------- matching

const issuesFromFixtures = () => [
  ...fixture('node-list-status-1-page-0.json').list,
  ...fixture('node-list-status-1-page-1.json').list,
  ...fixture('node-list-status-13-page-0.json').list,
].map(normalizeIssue);

test('loadManifest and listManifests accept evidence manifests only', () => {
  assert.equal(loadManifest(EXAMPLE).run.run_id, 'run-20261124T134220Z-1ca3d340');
  assert.throws(() => loadManifest(path.join(FIXTURES, 'node-3088500.json')), InputError);
  const hostile = example();
  hostile.run.run_id = '../../escape';
  const hostileFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'known-issues-')), 'manifest.json');
  fs.writeFileSync(hostileFile, JSON.stringify(hostile));
  assert.throws(() => loadManifest(hostileFile), /run_id is missing or malformed/, 'the run id names output files');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'known-issues-'));
  for (const name of ['run-20261124T134220Z-1ca3d340', 'run-20261123T172501Z-e4faaff8', 'otel', 'run-20261125T000000Z-00000000']) {
    fs.mkdirSync(path.join(dir, name));
  }
  fs.copyFileSync(EXAMPLE, path.join(dir, 'run-20261124T134220Z-1ca3d340/manifest.json'));
  fs.copyFileSync(EXAMPLE, path.join(dir, 'run-20261123T172501Z-e4faaff8/manifest.json'));
  assert.deepEqual(listManifests(dir).map((f) => path.basename(path.dirname(f))), ['run-20261123T172501Z-e4faaff8', 'run-20261124T134220Z-1ca3d340']);
  assert.deepEqual(listManifests(path.join(dir, 'missing')), []);
});

test('groupFindings groups by pattern and leaves out rejected findings', () => {
  const manifest = example();
  const extra = clone(manifest.findings[0]);
  extra.finding_id = 'fnd-000000000001';
  extra.url = '/admin/content?page=1';
  manifest.findings.push(extra);
  const rejected = clone(manifest.findings[1]);
  rejected.finding_id = 'fnd-000000000002';
  rejected.fingerprint.pattern = 'A11Y-PAT-000000000000';
  rejected.verification = 'human-rejected';
  manifest.findings.push(rejected);

  const result = groupFindings(manifest);
  assert.equal(result.rejected, 1);
  assert.equal(result.groups.length, 2);
  const contrast = result.groups.find((g) => g.rule_id === 'color-contrast');
  assert.deepEqual(contrast.finding_ids, ['fnd-6cf44d08a4e6', 'fnd-000000000001']);
  assert.deepEqual(contrast.urls, ['/admin/content'], 'query strings do not make a new page');
  assert.deepEqual(contrast.routes, ['system.admin_content']);
  assert.deepEqual(contrast.wcag, ['1.4.3']);
});

test('token and path matching respect identifier boundaries', () => {
  assert.equal(containsToken('fails th-has-data-cells.', 'th-has-data-cells'), true);
  assert.equal(containsToken('regions', 'region'), false);
  assert.equal(containsToken('aria-region', 'region'), false);
  assert.equal(containsPath('on /admin/content.', '/admin/content'), true);
  assert.equal(containsPath('see /admin/content?type=page', '/admin/content'), true);
  assert.equal(containsPath('/admin/content/media', '/admin/content'), false);
  assert.equal(containsPath('anything /', '/'), false, 'the front page path is too common to match');
  assert.equal(containsPath('presented on admin/content so', '/admin/content'), true, 'two segments match without the slash');
  assert.equal(containsPath('see x/admin/content', '/admin/content'), false);
  assert.equal(containsPath('go to admin/content/ and', '/admin/content'), true, 'a trailing slash is the same page');
  assert.equal(containsPath('the node page', '/node'), false, 'one segment needs its slash');
  assert.equal(titleNamesWords(new Set(['un', 'sticky', 'table', 'headers']), 'sticky-table-header'), true);
  assert.equal(titleNamesWords(new Set(['sticky', 'table', 'not']), 'sticky-table-header'), false, 'every word is needed');
  assert.equal(titleNamesWords(new Set(['button']), 'button--action'), false);
  assert.equal(titleNamesWords(new Set(['button', 'action']), 'button--action'), true);
  assert.deepEqual(selectorTokens(['table.sticky-table-header > th', '#edit-submit', '.button', 'div.a-b']), ['sticky-table-header', 'edit-submit']);
});

test('scoreIssue explains each signal and ranks a specific match high', () => {
  const { groups } = groupFindings(example());
  const tables = groups.find((g) => g.rule_id === 'th-has-data-cells');
  const issue = issuesFromFixtures().find((i) => i.nid === 3088500);
  const result = scoreIssue(tables, issue, { wcag131: '195698' });
  assert.deepEqual(result.signals.map((s) => s.kind), ['rule', 'location', 'selector', 'words']);
  assert.equal(result.score, 10);
  assert.equal(result.confidence, 0.83);
  assert.equal(result.band, 'high');
  assert.equal(result.eligible, true);
  assert.match(result.signals.find((s) => s.kind === 'selector').evidence, /sticky-table-header/);
});

test('scoreIssue counts the words of a class name in the title', () => {
  const { groups } = groupFindings(example());
  const tables = groups.find((g) => g.rule_id === 'th-has-data-cells');
  const issue = { nid: 3583518, title: 'Modernize table sticky header by using position: sticky', text: 'Uses a second table.', component: 'Admin theme', tag_ids: ['1101'] };
  const result = scoreIssue(tables, issue, {});
  assert.deepEqual(result.signals.map((s) => [s.kind, s.points]), [['selector', 3], ['words', 1]]);
  assert.match(result.signals[0].evidence, /title has the words of `sticky-table-header`/);
  assert.equal(result.band, 'medium');
  assert.equal(result.eligible, true);
});

test('scoreIssue uses wcag tags and keeps weak matches low', () => {
  const { groups } = groupFindings(example());
  const contrast = groups.find((g) => g.rule_id === 'color-contrast');
  const tagged = {
    nid: 1, title: 'Improve color contrast of buttons', text: '', component: 'system.module', tag_ids: ['1101', '204420'],
  };
  const result = scoreIssue(contrast, tagged, { wcag143: '204420' });
  assert.deepEqual(result.signals.map((s) => [s.kind, s.points]), [['wcag', 3], ['component', 1], ['words', 2]]);
  assert.equal(result.band, 'low');
  assert.equal(result.eligible, true);

  const pathOnly = issuesFromFixtures().find((i) => i.nid === 3084554);
  const weak = scoreIssue(contrast, pathOnly, {});
  assert.equal(weak.score, 3);
  assert.equal(weak.eligible, false, 'below the minimum score');

  const common = { ...contrast, rule_id: 'region' };
  const word = scoreIssue(common, { nid: 2, title: 'Content outside a region', text: '', component: null, tag_ids: [] }, {});
  assert.deepEqual(word.signals.map((s) => [s.kind, s.points]), [['rule', 1]]);
});

test('matchGroups returns at most five candidates, best first', () => {
  const { groups } = groupFindings(example());
  const many = Array.from({ length: 8 }, (_, i) => ({
    nid: 100 + i, url: `https://www.drupal.org/i/${100 + i}`, title: 'Table headers', status_label: 'Active', component: null,
    changed: `2026-01-0${i + 1}T00:00:00.000Z`, tag_ids: [], text: i === 7 ? 'th-has-data-cells on /admin/content' : 'th-has-data-cells',
  }));
  const [, tables] = matchGroups(groups, many, {});
  assert.equal(tables.candidates.length, 5);
  assert.equal(tables.candidates[0].nid, 107);
  assert.deepEqual(tables.candidates.slice(1).map((c) => c.nid), [106, 105, 104, 103], 'ties go to the most recently changed');
});

// ---------------------------------------------------------------- recheck

const PATTERN = 'A11Y-PAT-DC08C1EBAE11';
const entry = (extra = {}) => ({
  pattern: PATTERN, nid: 3084554, rule_id: 'color-contrast', url: '/admin/content', scenario_id: null,
  evidence_run_id: 'run-20261124T134220Z-1ca3d340', summary: 'test', ...extra,
});
function laterRun(id, change = () => {}) {
  const manifest = example();
  manifest.run.run_id = id;
  manifest.target.source.commit = 'abcdef0123456789abcdef0123456789abcdef01';
  change(manifest);
  return manifest;
}

test('mappedEntries reads the committed tracker map; entries without a page cannot be checked', () => {
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'reports/pattern-tracker-map.json'), 'utf8'));
  const entries = mappedEntries(map);
  assert.deepEqual(entries.map((e) => e.nid), [3318394, 3318396]);
  const result = recheckEntry(entries[0], [example()]);
  assert.equal(result.status, 'cannot-check');
  assert.match(result.statement, /no url or scenario_id/);
});

test('recheck says observed on the latest comparable run', () => {
  const result = recheckEntry(entry(), [example()]);
  assert.equal(result.status, 'observed');
  assert.equal(result.statement, 'Observed on commit e181ce0d86, run run-20261124T134220Z-1ca3d340.');
});

test('recheck words a missing pattern as not observed on a commit, never fixed', () => {
  const later = laterRun('run-20261201T000000Z-00000001', (m) => {
    m.findings = m.findings.filter((f) => f.rule_id !== 'color-contrast');
  });
  const result = recheckEntry(entry(), [example(), later]);
  assert.equal(result.status, 'not-observed');
  assert.match(result.statement, /^Not observed on commit abcdef0123, run run-20261201T000000Z-00000001\./);
  assert.doesNotMatch(result.statement, /\bfixed\b|\bresolved\b/i);
  assert.equal(result.basis, 'compared with reference run run-20261124T134220Z-1ca3d340');
});

test('recheck flags a changed fingerprint when the rule is still reported on the page', () => {
  const later = laterRun('run-20261201T000000Z-00000001', (m) => {
    m.findings[0].fingerprint.pattern = 'A11Y-PAT-111111111111';
  });
  const result = recheckEntry(entry(), [example(), later]);
  assert.equal(result.status, 'rule-still-reported');
  assert.match(result.statement, /A11Y-PAT-111111111111/);
});

test('recheck passes over runs that are not comparable or did not cover the page', () => {
  const otherAxe = laterRun('run-20261203T000000Z-00000003', (m) => {
    m.tools.find((t) => t.name === 'axe-core').version = '9.9.9';
    m.findings = [];
  });
  const skipped = laterRun('run-20261202T000000Z-00000002', (m) => {
    for (const scenario of m.scenarios) for (const attempt of scenario.attempts) attempt.status = 'SKIPPED';
    m.findings = [];
  });
  const result = recheckEntry(entry(), [example(), otherAxe, skipped]);
  assert.equal(result.status, 'observed');
  assert.equal(result.run_id, 'run-20261124T134220Z-1ca3d340');
  assert.deepEqual(result.skipped.map((s) => s.run_id), ['run-20261203T000000Z-00000003', 'run-20261202T000000Z-00000002']);
  assert.match(result.skipped[0].reason, /tools\.axe-core/);
  assert.equal(coversEntry(skipped, entry()), false);
});

test('recheck needs axe results for the page, not just a visit', () => {
  const visitedOnly = laterRun('run-20261201T000000Z-00000001', (m) => {
    m.artifacts = m.artifacts.filter((a) => a.kind !== 'axe-results');
    m.findings = [];
  });
  assert.equal(coversEntry(visitedOnly, entry()), false);
  const result = recheckEntry(entry(), [example(), visitedOnly]);
  assert.equal(result.status, 'observed', 'falls back to the reference run, which scanned the page');
  assert.equal(result.skipped[0].reason, 'did not scan the page or scenario');
});

test('recheck states a non-PASS run status and a rejected finding', () => {
  const later = laterRun('run-20261201T000000Z-00000001', (m) => {
    m.run.status = 'FAIL';
    for (const finding of m.findings) finding.verification = 'human-rejected';
  });
  const result = recheckEntry(entry(), [example(), later]);
  assert.equal(result.status, 'observed');
  assert.equal(result.statement, 'Observed on commit abcdef0123, run run-20261201T000000Z-00000001 (run status FAIL). A person marked it human-rejected in that run.');
});

test('recheck without a reference run says conditions were not compared', () => {
  const result = recheckEntry(entry({ evidence_run_id: null, url: null, scenario_id: 'admin-content-overview' }), [example()]);
  assert.equal(result.status, 'observed');
  assert.equal(result.basis, 'no reference run recorded, so conditions were not compared');
  const none = recheckEntry(entry({ url: '/not-scanned' }), [example()]);
  assert.equal(none.status, 'cannot-check');
});

test('issueFacts reports idle days and staleness of open issues only', () => {
  const now = Date.parse('2026-11-24T00:00:00Z');
  const issue = { nid: 1, status_label: 'Needs work', open: true, changed: '2026-01-01T00:00:00.000Z' };
  assert.deepEqual(issueFacts(issue, { now }), { nid: 1, status_label: 'Needs work', open: true, changed: issue.changed, idle_days: 327, stale: true });
  assert.equal(issueFacts({ ...issue, open: false }, { now }).stale, false);
  assert.equal(issueFacts(null), null);
});

// ---------------------------------------------------------------- reports and drafts

test('escapeMarkdown neutralizes links, HTML and table cells from drupal.org titles', () => {
  assert.equal(escapeMarkdown('[x](javascript:alert(1)) <img> a|b `c`'), '\\[x\\](javascript:alert(1)) \\<img\\> a\\|b \\`c\\`');
});

test('the observation draft fills every field of the Observation template', () => {
  const manifest = example();
  const { groups } = groupFindings(manifest);
  const draft = observationDraft(groups[1], manifest, []);
  const template = fs.readFileSync(path.join(ROOT, '.github/ISSUE_TEMPLATE/observation.yml'), 'utf8');
  const labels = [...template.matchAll(/^\s+label: (.+)$/gm)].map((m) => m[1].trim());
  assert.ok(labels.length >= 9);
  for (const label of labels) assert.ok(draft.includes(`### ${label}\n`), `draft has a "${label}" section`);
  assert.match(draft, /^<!-- Draft aid for the owner/);
  assert.match(draft, /Label: observation/);
  assert.match(draft, /e181ce0d86/);
  assert.match(draft, /No candidate found\. Search by hand: https:\/\/www\.drupal\.org\/project\/issues\/search\/drupal\?text=th\+has\+data\+cells&issue_tags=Accessibility/);
});

test('the match report lists candidates with evidence and labels drafts as aids', () => {
  const manifest = example();
  const { groups } = groupFindings(manifest);
  const hostile = { ...issuesFromFixtures().find((i) => i.nid === 3088500), title: 'sticky [table](javascript:x) <b>' };
  const results = matchGroups(groups, [hostile], { wcag131: '195698' });
  const report = renderMatchReport({
    manifest, results, rejected: 0, requests: 0, offline: true, manifestPath: 'manifest.json', generatedAt: '2026-11-24T00:00:00.000Z',
    queue: { issues: [hostile], tag: 'Accessibility', fetched_at: '2026-11-24T00:00:00.000Z', truncated: false },
  });
  assert.match(report, /Draft aid for the owner/);
  assert.match(report, /Nothing was posted anywhere/);
  assert.match(report, /\| \[#3088500\]\(https:\/\/www\.drupal\.org\/i\/3088500\) sticky \\\[table\\\]\(javascript:x\) \\<b\\> \|/);
  assert.match(report, /0\.83 \(high\)/);
  assert.match(report, /Groups with at least one candidate: 1 \(best candidate high 1, medium 0, low 0\)/);
  assert.match(report, /0 \(offline, from the cached queue\)/);
  assert.doesNotMatch(report, /drupal\.org\/user|\bauthor\b/i);
});

test('the recheck report counts each result and never calls a finding fixed', () => {
  const rows = [
    { result: recheckEntry(entry(), [example()]), facts: issueFacts({ nid: 3084554, status_label: 'Closed (fixed)', open: false, changed: '2026-11-01T00:00:00.000Z' }, { now: Date.parse('2026-11-24T00:00:00Z') }), error: null },
    { result: recheckEntry(entry({ url: null, evidence_run_id: null }), [example()]), facts: null, error: 'HTTP 404' },
  ];
  const report = renderRecheckReport({ rows, mapPath: 'map.json', evidenceDir: 'evidence', manifests: 1, requests: 2, staleDays: 180, generatedAt: 'now' });
  assert.match(report, /- Observed: 1\n- Not observed: 0\n- Rule still reported: 0\n- Cannot check: 1/);
  assert.match(report, /closed but the pattern is still observed/);
  assert.match(report, /could not be read \(HTTP 404\)/);
});

// ---------------------------------------------------------------- command line

// Every command-line test preloads this, so no test can reach the network.
const NO_NETWORK = `data:text/javascript,${encodeURIComponent('globalThis.fetch = async () => { throw new TypeError("fetch failed", { cause: { code: "BLOCKED_IN_TESTS" } }); };')}`;

function cli(args) {
  return spawnSync(process.execPath, ['--import', NO_NETWORK, path.join(ROOT, 'tools/known-issues.mjs'), ...args], { encoding: 'utf8' });
}

test('the command rejects bad usage with exit 2', () => {
  assert.equal(cli([]).status, 2);
  assert.equal(cli(['post']).status, 2);
  assert.equal(cli(['match', '--delay-ms', 'fast']).status, 2);
  assert.equal(cli(['match', '--map', 'x']).status, 2, 'options belong to one command');
});

test('the command exits 4 when drupal.org cannot be reached', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'known-issues-down-'));
  fs.mkdirSync(path.join(dir, 'evidence/run-20261124T134220Z-1ca3d340'), { recursive: true });
  fs.copyFileSync(EXAMPLE, path.join(dir, 'evidence/run-20261124T134220Z-1ca3d340/manifest.json'));
  // The preloaded fetch fails at once; the one retry waits 5 s.
  const result = cli(['match', '--evidence-dir', path.join(dir, 'evidence'), '--out', path.join(dir, 'out')]);
  assert.equal(result.status, 4, result.stderr);
  assert.match(result.stderr, /drupal\.org request failed: .*BLOCKED_IN_TESTS/);
});

test('match --offline and recheck --offline run end to end without the network', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'known-issues-cli-'));
  const evidence = path.join(dir, 'evidence');
  const out = path.join(dir, 'out');
  fs.mkdirSync(path.join(evidence, 'run-20261124T134220Z-1ca3d340'), { recursive: true });
  fs.copyFileSync(EXAMPLE, path.join(evidence, 'run-20261124T134220Z-1ca3d340/manifest.json'));

  const offlineFirst = cli(['match', '--offline', '--evidence-dir', evidence, '--out', out]);
  assert.equal(offlineFirst.status, 2, offlineFirst.stderr);
  assert.match(offlineFirst.stderr, /no cached queue/);

  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'drupal-org-queue-accessibility.json'), JSON.stringify({
    fetched_at: '2026-11-24T00:00:00.000Z', tag: 'Accessibility', truncated: false,
    tag_ids: { Accessibility: '1101', wcag131: '195698' }, issues: issuesFromFixtures(),
  }));
  const match = cli(['match', '--offline', '--evidence-dir', evidence, '--out', out]);
  assert.equal(match.status, 0, match.stderr);
  assert.match(match.stdout, /Groups with candidates: 1; without: 1\. Requests sent: 0\./);
  assert.match(match.stdout, /Not checked offline \(tag ids not cached\): wcag143\./);
  const data = JSON.parse(fs.readFileSync(path.join(out, 'match-run-20261124T134220Z-1ca3d340.json'), 'utf8'));
  assert.equal(data.groups.find((g) => g.rule_id === 'th-has-data-cells').candidates[0].nid, 3088500);
  assert.ok(fs.existsSync(path.join(out, 'match-run-20261124T134220Z-1ca3d340.md')));

  const map = path.join(dir, 'map.json');
  fs.writeFileSync(map, JSON.stringify({ entries: [{ pattern_id: PATTERN, a11y_pattern_display_id: PATTERN, tracker_id: 'https://www.drupal.org/project/drupal/issues/3084554', rule_id: 'color-contrast', url: '/admin/content', evidence_run_id: 'run-20261124T134220Z-1ca3d340' }] }));
  const recheck = cli(['recheck', '--offline', '--map', map, '--evidence-dir', evidence, '--out', out]);
  assert.equal(recheck.status, 0, recheck.stderr);
  assert.match(recheck.stdout, /Mapped entries: 1; observed 1\. Manifests: 1\. Requests sent: 0\./);
});
