/**
 * Matches Observatory findings (evidence manifests, schemas/quality-evidence.schema.json)
 * against drupal.org issues.
 *
 * The score is a heuristic for ordering candidates for a person to read.
 * It is not a probability and it has not been calibrated. A candidate is
 * never a confirmed match.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

// 0.2.0 added measurement fields and an artifact kind; findings are unchanged.
export const SCHEMA_VERSIONS = ['0.1.0', '0.2.0'];
export const MAX_CANDIDATES = 5;
const MIN_SCORE = 4;
const FULL_SCORE = 12;

const RUN_ID = /^run-\d{8}T\d{6}Z-[0-9a-f]{8}$/;

export class InputError extends Error {}

export function loadManifest(file) {
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  catch (error) {
    throw new InputError(`${file}: cannot read JSON (${error.message})`);
  }
  if (manifest?.artifact_type !== 'quality-evidence-run' || !SCHEMA_VERSIONS.includes(manifest?.schema_version)) {
    throw new InputError(`${file}: not a quality-evidence-run manifest, schema ${SCHEMA_VERSIONS.join(' or ')}`);
  }
  // The run id names output files, so it must have the schema's shape.
  if (!RUN_ID.test(String(manifest.run?.run_id))) {
    throw new InputError(`${file}: run.run_id is missing or malformed`);
  }
  return manifest;
}

/** Manifest files under an evidence directory, oldest run first. */
export function listManifests(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((name) => RUN_ID.test(name))
    .sort()
    .map((name) => path.join(dir, name, 'manifest.json'))
    .filter((file) => fs.existsSync(file));
}

const pathOf = (url) => String(url ?? '').split(/[?#]/)[0];

/**
 * Groups a manifest's findings by pattern fingerprint, so one problem seen
 * on several pages or elements is matched once. Findings a person rejected
 * are left out.
 */
export function groupFindings(manifest) {
  const groups = new Map();
  let rejected = 0;
  for (const finding of manifest.findings ?? []) {
    if (finding.verification === 'human-rejected') {
      rejected++;
      continue;
    }
    const key = finding.fingerprint?.pattern
      ?? `${finding.rule_id}|${pathOf(finding.url)}|${(finding.target ?? []).join(' ')}`;
    let group = groups.get(key);
    if (!group) {
      group = {
        key,
        pattern_id: finding.fingerprint?.pattern ?? null,
        fingerprint_status: finding.fingerprint?.status ?? null,
        tool: finding.tool,
        rule_id: finding.rule_id,
        rule_url: finding.rule_url ?? null,
        result: finding.result,
        impact: finding.impact ?? null,
        message: finding.message ?? null,
        html: finding.html ?? null,
        wcag: [],
        urls: [],
        targets: [],
        routes: [],
        modules: [],
        scenario_ids: [],
        finding_ids: [],
        verification: [],
      };
      groups.set(key, group);
    }
    const add = (list, value) => {
      if (value && !list.includes(value)) list.push(value);
    };
    for (const sc of finding.wcag_candidates ?? []) add(group.wcag, sc);
    add(group.urls, pathOf(finding.url));
    add(group.targets, (finding.target ?? []).join(' '));
    for (const candidate of finding.source_mapping?.candidates ?? []) {
      if (candidate.kind === 'route') add(group.routes, candidate.value);
      if (candidate.kind === 'module') add(group.modules, candidate.value);
    }
    add(group.scenario_ids, finding.scenario_id);
    add(group.finding_ids, finding.finding_id);
    add(group.verification, finding.verification);
  }
  return { groups: [...groups.values()], rejected };
}

/** WCAG success criterion "1.4.3" -> drupal.org tag name "wcag143". */
export const wcagTagName = (sc) => `wcag${sc.replace(/\./g, '')}`;

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** True when token appears in text, not as part of a longer identifier. */
export function containsToken(text, token) {
  if (!token) return false;
  return new RegExp(`(?:^|[^a-z0-9_-])${escapeRegExp(token.toLowerCase())}(?![a-z0-9_-])`).test(text);
}

/**
 * True when a URL path appears in text and is not part of a longer path.
 * Paths of two or more segments also match without the leading slash, as
 * issues often write "admin/content".
 */
export function containsPath(text, urlPath) {
  if (!urlPath || urlPath === '/') return false;
  const full = urlPath.toLowerCase();
  const end = '/?(?![a-z0-9_/-])';
  if (new RegExp(`(?:^|[^a-z0-9_/-])${escapeRegExp(full)}${end}`).test(text)) return true;
  const bare = full.replace(/^\//, '');
  return bare.includes('/') && new RegExp(`(?:^|[^a-z0-9_/.-])${escapeRegExp(bare)}${end}`).test(text);
}

/**
 * True when a title has every word of a class or id name of two or more
 * words, in any order and allowing a plural ("sticky table headers" for
 * sticky-table-header).
 */
export function titleNamesWords(titleWords, token) {
  const parts = [...new Set(token.split(/[-_]+/).filter((part) => part.length >= 3))];
  return parts.length >= 2 && parts.every((part) => titleWords.has(part) || titleWords.has(`${part}s`));
}

/** Class and id names from CSS selectors that are distinctive enough to search for. */
export function selectorTokens(selectors) {
  const tokens = new Set();
  for (const selector of selectors) {
    for (const match of String(selector).matchAll(/[.#]([a-zA-Z_][\w-]*)/g)) {
      const name = match[1].toLowerCase();
      if (name.length >= 5 && /[-_]/.test(name)) tokens.add(name);
    }
  }
  return [...tokens];
}

const STOPWORDS = new Set(['must', 'have', 'with', 'that', 'this', 'from', 'when', 'should', 'elements', 'element', 'ensure', 'ensures', 'page', 'pages', 'drupal', 'their', 'there', 'refer', 'meet', 'minimum']);

export function keywords(text) {
  return [...new Set(String(text ?? '').toLowerCase().split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3 && !STOPWORDS.has(word)))];
}

/** drupal.org component names a module could be filed under. */
function componentsFor(group) {
  const modules = new Set(group.modules);
  for (const route of group.routes) modules.add(route.split('.')[0]);
  return new Set([...modules].flatMap((name) => [`${name}.module`, `${name} system`]));
}

/**
 * Scores one finding group against one issue.
 *
 * Signals and points (one of each kind at most):
 *   rule      axe rule id named in the title (4) or summary (3); a rule id
 *             without a hyphen, such as "region", is a common word (1)
 *   wcag      issue tagged wcagNNN (3), or the criterion number in the text (2)
 *   location  the page path or route name in the title or summary (3)
 *   selector  a class or id from the reported element in the summary (3),
 *             or the words of that name in the title (3)
 *   component the route's module matches the issue component (1)
 *   words     words shared by the rule message and the title (1 each, up to 2)
 */
export function scoreIssue(group, issue, tagIds = {}) {
  const title = issue.title.toLowerCase();
  const text = `${title}\n${String(issue.text ?? '').toLowerCase()}`;
  const signals = [];

  const rule = String(group.rule_id ?? '').toLowerCase();
  if (rule.includes('-')) {
    if (containsToken(title, rule)) signals.push({ kind: 'rule', points: 4, specific: true, evidence: `title names axe rule \`${rule}\`` });
    else if (containsToken(text, rule)) signals.push({ kind: 'rule', points: 3, specific: true, evidence: `summary names axe rule \`${rule}\`` });
  }
  else if (rule && containsToken(text, rule)) {
    signals.push({ kind: 'rule', points: 1, specific: false, evidence: `mentions the word "${rule}" (also the axe rule id)` });
  }

  let wcag = null;
  for (const sc of group.wcag) {
    const tag = wcagTagName(sc);
    if (tagIds[tag] && issue.tag_ids.includes(String(tagIds[tag]))) {
      wcag = { kind: 'wcag', points: 3, specific: false, evidence: `tagged \`${tag}\`` };
      break;
    }
    if (!wcag && new RegExp(`(?<![0-9.])${escapeRegExp(sc)}(?![0-9])`).test(text)) {
      wcag = { kind: 'wcag', points: 2, specific: false, evidence: `mentions WCAG ${sc}` };
    }
  }
  if (wcag) signals.push(wcag);

  const where = [
    ...group.urls.filter((url) => containsPath(text, url.toLowerCase())).map((url) => `page path \`${url}\``),
    ...group.routes.filter((route) => containsToken(text, route.toLowerCase())).map((route) => `route \`${route}\``),
  ];
  if (where.length) signals.push({ kind: 'location', points: 3, specific: true, evidence: `mentions ${where.join(', ')}` });

  const tokens = selectorTokens(group.targets);
  const selectors = tokens.filter((token) => containsToken(text, token));
  const titleWordSet = new Set(title.split(/[^a-z0-9]+/));
  const named = tokens.filter((token) => titleNamesWords(titleWordSet, token));
  if (selectors.length) signals.push({ kind: 'selector', points: 3, specific: true, evidence: `mentions ${selectors.map((s) => `\`${s}\``).join(', ')}` });
  else if (named.length) signals.push({ kind: 'selector', points: 3, specific: true, evidence: `title has the words of ${named.map((s) => `\`${s}\``).join(', ')}` });

  if (issue.component && componentsFor(group).has(issue.component)) {
    signals.push({ kind: 'component', points: 1, specific: false, evidence: `component "${issue.component}" matches the route's module` });
  }

  const titleWords = new Set(keywords(title));
  const shared = keywords(group.message).filter((word) => titleWords.has(word));
  if (shared.length >= 1) {
    signals.push({ kind: 'words', points: Math.min(2, shared.length), specific: false, evidence: `title shares ${shared.slice(0, 4).map((w) => `"${w}"`).join(', ')}` });
  }

  const score = signals.reduce((sum, signal) => sum + signal.points, 0);
  const specific = signals.filter((signal) => signal.specific).length;
  const band = specific >= 2 || (specific === 1 && score >= 8) ? 'high' : specific === 1 ? 'medium' : 'low';
  return {
    score,
    confidence: Math.round(Math.min(1, score / FULL_SCORE) * 100) / 100,
    band,
    signals: signals.map(({ kind, points, evidence }) => ({ kind, points, evidence })),
    eligible: score >= MIN_SCORE && (specific > 0 || Boolean(wcag)),
  };
}

/** Best candidates for each group, highest score first, then most recently changed. */
export function matchGroups(groups, issues, tagIds = {}) {
  return groups.map((group) => {
    const candidates = issues
      .map((issue) => ({ issue, ...scoreIssue(group, issue, tagIds) }))
      .filter((candidate) => candidate.eligible)
      .sort((a, b) => b.score - a.score || String(b.issue.changed).localeCompare(String(a.issue.changed)) || a.issue.nid - b.issue.nid)
      .slice(0, MAX_CANDIDATES)
      .map(({ issue, score, confidence, band, signals }) => ({
        nid: issue.nid,
        url: issue.url,
        title: issue.title,
        status_label: issue.status_label,
        component: issue.component,
        changed: issue.changed,
        score,
        confidence,
        band,
        signals,
      }));
    return { group, candidates };
  });
}
