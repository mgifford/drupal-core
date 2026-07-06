'use strict';

/**
 * Known-issues sync + reconciliation against the drupal.org core queue.
 *
 * Answers three questions before anything gets filed:
 *   1. What accessibility bugs are already known? (open core issues tagged
 *      `Accessibility`, cached locally with their wcagXXX tags)
 *   2. Which of OUR discovered patterns look already-filed? (keyword match
 *      → candidates for openacr/issue-map.json, and a guard against
 *      duplicate filing — rubric gate 4)
 *   3. Which existing d.o issues could use a nudge? (drafts a comment per
 *      matched issue with the pattern ID, current-scan evidence, and a
 *      report link — pattern-ID retrofits for issues filed by others.
 *      Drafts ONLY: a human reviews and posts; nothing is submitted
 *      automatically.)
 *
 * Usage:
 *   npm run a11y:known-issues            # fetch + reconcile + drafts
 *   npm run a11y:known-issues -- --offline   # reconcile from cached fetch
 *
 * Outputs (in reports/):
 *   known-issues.json           — cached queue snapshot (refreshed on fetch)
 *   KNOWN-ISSUES-RECONCILIATION-latest.md — match report + comment drafts
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPORTS_DIR = process.env.A11Y_REPORTS_DIR
  ? path.resolve(process.env.A11Y_REPORTS_DIR)
  : path.resolve(__dirname, '../../../../reports');
const BUGS_FILE = path.join(REPORTS_DIR, 'bugs-latest.json');
const CACHE_FILE = path.join(REPORTS_DIR, 'known-issues.json');
const OUT_MD = path.join(REPORTS_DIR, 'KNOWN-ISSUES-RECONCILIATION-latest.md');

const API = 'https://www.drupal.org/api-d7';
const DRUPAL_PROJECT_NID = 3060;
const ACCESSIBILITY_TID = 1101; // taxonomy_vocabulary_9 term "Accessibility"
// Open issue statuses: active, needs work, needs review, RTBC, postponed,
// patch to be ported, postponed (info).
const OPEN_STATUSES = [1, 13, 8, 14, 4, 15, 16];
const PAGE_LIMIT = 100;
const REQUEST_DELAY_MS = 1500; // be polite to drupal.org
const MAX_PAGES_PER_STATUS = 30; // safety valve

const OFFLINE = process.argv.includes('--offline');

function fetchJson(url) {
  // curl keeps TLS simple and respects system proxies; retry once.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return JSON.parse(execSync(`curl -s -m 60 "${url}"`, { maxBuffer: 64 * 1024 * 1024 }).toString());
    }
    catch (error) {
      if (attempt === 1) throw error;
      sleep(3000);
    }
  }
  return null;
}

function sleep(ms) {
  execSync(`sleep ${(ms / 1000).toFixed(1)}`);
}

/** Resolve tids for the wcagXXX tag names we reference, cached in the snapshot. */
function resolveWcagTagIds(scNumbers, previousCache) {
  const map = { ...(previousCache?.wcagTagIds ?? {}) };
  for (const sc of scNumbers) {
    const tagName = `wcag${sc.replace(/\./g, '')}`;
    if (tagName in map) continue;
    const data = fetchJson(`${API}/taxonomy_term.json?name=${tagName}`);
    const term = (data?.list ?? []).find((t) => String(t.vocabulary?.id) === '9');
    map[tagName] = term ? Number(term.tid) : null;
    sleep(REQUEST_DELAY_MS);
  }
  return map;
}

function fetchOpenAccessibilityIssues() {
  const issues = new Map();
  for (const status of OPEN_STATUSES) {
    for (let page = 0; page < MAX_PAGES_PER_STATUS; page++) {
      const url = `${API}/node.json?type=project_issue&field_project=${DRUPAL_PROJECT_NID}`
        + `&taxonomy_vocabulary_9=${ACCESSIBILITY_TID}&field_issue_status=${status}`
        + `&limit=${PAGE_LIMIT}&page=${page}&sort=changed&direction=DESC`;
      const data = fetchJson(url);
      const list = data?.list ?? [];
      for (const node of list) {
        issues.set(node.nid, {
          nid: Number(node.nid),
          title: node.title,
          status: Number(node.field_issue_status),
          component: node.field_issue_component ?? null,
          priority: Number(node.field_issue_priority ?? 0),
          version: node.field_issue_version ?? null,
          changed: Number(node.changed),
          url: `https://www.drupal.org/i/${node.nid}`,
          tagIds: (node.taxonomy_vocabulary_9 ?? []).map((t) => Number(t.id)),
        });
      }
      console.log(`  status ${status} page ${page}: ${list.length} issue(s)`);
      if (list.length < PAGE_LIMIT) break;
      sleep(REQUEST_DELAY_MS);
    }
  }
  return [...issues.values()];
}

// ─── Matching ────────────────────────────────────────────────────────────────

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'in', 'on', 'for', 'to', 'is', 'are',
  'with', 'ensure', 'ensures', 'every', 'all', 'page', 'pages', 'element',
  'elements', 'has', 'have', 'not', 'be', 'should', 'must', 'drupal',
]);

function tokens(text) {
  return new Set(
    String(text).toLowerCase()
      .replace(/[^a-z0-9\s#._-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w)),
  );
}

/**
 * Score a pattern against an issue title + tags. Deliberately conservative:
 * high scores are review candidates, never auto-confirmed matches.
 */
function scoreMatch(pattern, issue, wcagTidToTag) {
  const issueTokens = tokens(issue.title);
  let score = 0;
  const reasons = [];

  // Rule id appearing in the title is a strong signal (some issues cite it).
  if (issueTokens.has(pattern.rule_id.toLowerCase())) {
    score += 4;
    reasons.push(`title mentions rule \`${pattern.rule_id}\``);
  }

  // Shared meaningful words between our summary and the issue title.
  const summaryTokens = tokens(`${pattern.summary} ${pattern.selector ?? ''} ${pattern.likely_template ?? ''}`);
  const shared = [...summaryTokens].filter((t) => issueTokens.has(t));
  if (shared.length >= 2) {
    score += Math.min(shared.length, 5);
    reasons.push(`shared terms: ${shared.slice(0, 5).join(', ')}`);
  }

  // Matching wcagXXX tag on the issue.
  if (pattern.wcag_sc) {
    const wanted = `wcag${pattern.wcag_sc.replace(/\./g, '')}`;
    const issueTags = issue.tagIds.map((tid) => wcagTidToTag[tid]).filter(Boolean);
    if (issueTags.includes(wanted)) {
      score += 3;
      reasons.push(`issue tagged \`${wanted}\``);
    }
  }

  return { score, reasons };
}

function draftComment(pattern, bugsSummary) {
  const lines = [];
  lines.push(`(Draft — review before posting. Evidence from the automated multi-theme crawl.)`);
  lines.push('');
  lines.push(`This issue is still reproducible as of ${bugsSummary.generatedAt?.slice(0, 10) ?? 'the latest scan'} against a current core checkout.`);
  lines.push('');
  lines.push(`Automated tracking data that may help move this along:`);
  lines.push(`- Stable pattern ID: **${pattern.pattern_id}** (first 8 hex of SHA-256 of normalized selector + rule — the same finding keeps this ID across scans, so a fix is verifiable by its disappearance)`);
  lines.push(`- axe rule: \`${pattern.rule_id}\` — ${pattern.axe_rule_url ?? ''}`);
  if (pattern.wcag_sc) {
    lines.push(`- WCAG SC: ${pattern.wcag_sc} (${pattern.wcag_name ?? ''}, Level ${pattern.wcag_level ?? '?'})`);
  }
  lines.push(`- Currently affects ${pattern.frequency?.pages_affected ?? '?'} crawled page(s); selector: \`${pattern.selector}\``);
  if (pattern.likely_template && pattern.likely_template !== 'unknown') {
    lines.push(`- Likely template: \`${pattern.likely_template}\``);
  }
  lines.push(`- Full evidence and reproduction steps: https://mgifford.github.io/drupal-core/ (pattern ${pattern.pattern_id})`);
  return lines.join('\n');
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(BUGS_FILE)) {
    console.error(`❌ ${BUGS_FILE} not found — run the crawl + analyzer first.`);
    process.exit(1);
  }
  const bugs = JSON.parse(fs.readFileSync(BUGS_FILE, 'utf8'));
  const previousCache = fs.existsSync(CACHE_FILE)
    ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
    : null;

  let cache = previousCache;
  if (!OFFLINE) {
    console.log('Fetching open Accessibility-tagged core issues from drupal.org…');
    const scNumbers = [...new Set(bugs.issues.map((i) => i.wcag_sc).filter(Boolean))];
    const wcagTagIds = resolveWcagTagIds(scNumbers, previousCache);
    const issues = fetchOpenAccessibilityIssues();
    cache = {
      fetchedAt: new Date().toISOString(),
      project: 'drupal',
      tag: 'Accessibility',
      wcagTagIds,
      issues,
    };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    console.log(`✅ ${issues.length} open issues cached to ${CACHE_FILE}`);
  }
  else if (!cache) {
    console.error(`❌ --offline but no cache at ${CACHE_FILE}. Run once without --offline.`);
    process.exit(1);
  }

  const wcagTidToTag = Object.fromEntries(
    Object.entries(cache.wcagTagIds ?? {})
      .filter(([, tid]) => tid !== null)
      .map(([tag, tid]) => [tid, tag]),
  );

  // ── Reconcile our patterns against the queue ──────────────────────────────
  const matched = [];
  const unmatched = [];
  for (const pattern of bugs.issues) {
    const candidates = cache.issues
      .map((issue) => ({ issue, ...scoreMatch(pattern, issue, wcagTidToTag) }))
      .filter((c) => c.score >= 4)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    if (candidates.length > 0) {
      matched.push({ pattern, candidates });
    }
    else {
      unmatched.push(pattern);
    }
  }

  // ── Report ────────────────────────────────────────────────────────────────
  const lines = [];
  lines.push('# Known-Issues Reconciliation');
  lines.push('');
  lines.push(`> Queue snapshot: ${cache.issues.length} open \`Accessibility\`-tagged Drupal core issues (fetched ${cache.fetchedAt}).`);
  lines.push(`> Our scan: ${bugs.issues.length} patterns (${bugs.summary?.byClassification?.wcagFailures ?? '?'} WCAG failures).`);
  lines.push('> Matching is keyword-based and conservative — every match below needs human confirmation before acting.');
  lines.push('');

  lines.push(`## Likely already filed (${matched.length} patterns) — confirm, then map + nudge`);
  lines.push('');
  lines.push('Confirmed matches belong in `openacr/issue-map.json` (pattern_id → issue URL), and the drafted comment below can retrofit the issue with a trackable pattern ID.');
  lines.push('');
  for (const { pattern, candidates } of matched) {
    lines.push(`### ${pattern.pattern_id} — ${pattern.summary}`);
    lines.push('');
    for (const c of candidates) {
      lines.push(`- [#${c.issue.nid}: ${c.issue.title}](${c.issue.url}) — score ${c.score} (${c.reasons.join('; ')})`);
    }
    lines.push('');
    lines.push('<details><summary>Draft comment (review before posting)</summary>');
    lines.push('');
    lines.push('```markdown');
    lines.push(draftComment(pattern, bugs.summary ?? {}));
    lines.push('```');
    lines.push('</details>');
    lines.push('');
  }

  lines.push(`## No match found (${unmatched.length} patterns) — candidates for filing`);
  lines.push('');
  lines.push('Run each through the confidence rubric (bug-reporting skill) before filing; the per-pattern search link in the pattern report is the manual double-check for this automated pass.');
  lines.push('');
  for (const pattern of unmatched) {
    lines.push(`- ${pattern.pattern_id} — ${pattern.summary} (${pattern.classification}; ${pattern.frequency?.pages_affected ?? '?'} pages) — [manual search](${pattern.drupal_issue_search_url})`);
  }
  lines.push('');

  fs.writeFileSync(OUT_MD, lines.join('\n'));
  console.log(`✅ Reconciliation written to ${OUT_MD}`);
  console.log(`   Likely filed: ${matched.length} | No match: ${unmatched.length}`);
}

main();
