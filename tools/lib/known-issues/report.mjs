/**
 * Markdown reports and draft text for tools/known-issues.mjs.
 *
 * Drafts are aids for the owner. They are never posted by the tool. They
 * target GitHub observation issues in this repository, not drupal.org:
 * drupal.org text is written by the owner (core/AGENTS.md).
 */
import { shortCommit } from './recheck.mjs';

const OBSERVATION_TEMPLATE = '.github/ISSUE_TEMPLATE/observation.yml';
const DRAFT_NOTICE = 'Draft aid for the owner, made by tools/known-issues.mjs from automated evidence. Reproduce the problem and rewrite this before filing. An automated finding is evidence, not proof of a barrier.';

/** Escapes text from drupal.org or a page so it cannot form Markdown links, HTML or table cells. */
export function escapeMarkdown(text) {
  return String(text ?? '').replace(/[\\`*_[\]<>|#]/g, '\\$&').replace(/\s+/g, ' ').trim();
}

const code = (text) => `\`${String(text ?? '').replace(/`/g, "'")}\``;

function fence(text, language = '') {
  const body = String(text ?? '');
  const ticks = '`'.repeat(Math.max(3, ...[...body.matchAll(/`+/g)].map((m) => m[0].length + 1)));
  return `${ticks}${language}\n${body}\n${ticks}`;
}

function searchUrl(group) {
  const words = group.rule_id.replace(/-/g, ' ');
  return `https://www.drupal.org/project/issues/search/drupal?${new URLSearchParams({ text: words, issue_tags: 'Accessibility' })}`;
}

function runLine(manifest) {
  const source = manifest.target?.source ?? {};
  return `${manifest.run.run_id} (status ${manifest.run.status}, commit ${shortCommit(source.commit) ?? 'not recorded'}${source.dirty ? ', checkout had uncommitted changes' : ''})`;
}

/** Text for a GitHub observation issue, field by field as in the Observation template. */
export function observationDraft(group, manifest, candidates) {
  const source = manifest.target?.source ?? {};
  const env = manifest.environment ?? {};
  const scenarios = (manifest.scenarios ?? []).filter((s) => group.scenario_ids.includes(s.scenario_id));
  const tool = `${group.tool?.name ?? 'scanner'} ${group.tool?.version ?? ''}`.trim();
  const pages = group.urls.map(code).join(', ');
  const lines = [];

  lines.push(`<!-- ${DRAFT_NOTICE} -->`, '');
  lines.push(`Title: [Observation]: ${group.message ?? group.rule_id} (${group.rule_id}) on ${group.urls.join(', ')}`);
  lines.push('Label: observation', '');

  lines.push('### What happened', '');
  lines.push(`${tool} reported rule ${code(group.rule_id)} as ${group.result}${group.impact ? `, impact ${group.impact}` : ''}, on ${pages}.`);
  if (group.message) lines.push(`Rule message: ${group.message}.`);
  lines.push(`Element${group.targets.length > 1 ? 's' : ''}: ${group.targets.map(code).join(', ')}.`);
  if (group.html) lines.push('', 'Sanitized snippet as recorded:', '', fence(group.html, 'html'));
  lines.push('');

  lines.push('### Steps that led to it', '');
  if (scenarios.length) {
    for (const scenario of scenarios) {
      lines.push(`- Scenario ${code(scenario.scenario_id)}: ${scenario.title}`);
      if (scenario.reproduce) lines.push(`  - Rerun: ${code(scenario.reproduce)}`);
    }
  }
  else {
    lines.push('- Not recorded in the manifest.');
  }
  lines.push('- Then open the page in a browser and check the element by hand before filing.', '');

  lines.push('### Drupal core commit', '');
  lines.push(`${shortCommit(source.commit) ?? 'Not recorded'}${source.dirty ? ' (the checkout had uncommitted changes)' : ''}`, '');
  lines.push('### Branch of this repository', '');
  lines.push(`${source.requested_ref ?? 'Not recorded'}`, '');
  lines.push('### How the site was installed', '');
  lines.push('Not recorded in the evidence manifest. Choose it in the form.', '');
  lines.push('### Install profile or recipe', '');
  lines.push([manifest.target?.install_profile, ...(manifest.target?.recipes ?? [])].filter(Boolean).join(', ') || 'Not recorded', '');

  lines.push('### Environment', '');
  lines.push(`- PHP: ${manifest.target?.php_version ?? 'not recorded'}`);
  lines.push('- Database: not recorded in the manifest');
  lines.push('- DDEV: not recorded in the manifest');
  lines.push(`- Browser: ${[env.browser?.name, env.browser?.version].filter(Boolean).join(' ') || 'not recorded'}`);
  if (env.viewport) lines.push(`- Viewport: ${env.viewport.width}x${env.viewport.height}`);
  if (env.color_scheme) lines.push(`- Colour scheme: ${env.color_scheme}`);
  lines.push('');

  lines.push('### Evidence', '');
  lines.push(`- Run: ${code(manifest.run.run_id)}, status ${manifest.run.status}, mode ${manifest.run.mode}`);
  lines.push(`- Finding ids: ${group.finding_ids.map(code).join(', ')}`);
  if (group.pattern_id) lines.push(`- Pattern fingerprint: ${code(group.pattern_id)} (${group.fingerprint_status ?? 'status not recorded'})`);
  if (group.wcag.length) lines.push(`- WCAG candidates from the engine's tags (not a conformance judgement): ${group.wcag.join(', ')}`);
  if (group.rule_url) lines.push(`- Rule documentation: ${group.rule_url}`);
  lines.push(`- Verification: ${group.verification.join(', ')}`);
  lines.push('');

  lines.push('### Possible drupal.org issues', '');
  if (candidates.length) {
    lines.push('Candidates from tools/known-issues.mjs. None is confirmed. Read each one before adding the `upstream-reported` label.', '');
    for (const candidate of candidates) {
      lines.push(`- ${candidate.url} ${escapeMarkdown(candidate.title)} (${candidate.status_label}; confidence ${candidate.confidence}, ${candidate.band})`);
    }
  }
  else {
    lines.push(`No candidate found. Search by hand: ${searchUrl(group)}`);
  }
  lines.push('');
  lines.push('### Workaround or fix found', '', 'None recorded.');
  return lines.join('\n');
}

function candidateTable(candidates) {
  const rows = ['| Issue | Status | Component | Confidence | Match evidence |', '| --- | --- | --- | --- | --- |'];
  for (const c of candidates) {
    rows.push(`| [#${c.nid}](${c.url}) ${escapeMarkdown(c.title)} | ${escapeMarkdown(c.status_label)} | ${escapeMarkdown(c.component ?? '')} | ${c.confidence} (${c.band}) | ${c.signals.map((s) => s.evidence.replace(/\|/g, '\\|')).join('; ')} |`);
  }
  return rows.join('\n');
}

/**
 * @param {object} data
 * @param {object} data.manifest
 * @param {object[]} data.results  From matchGroups().
 * @param {number} data.rejected   Findings left out because a person rejected them.
 * @param {object} data.queue      Cached queue: fetched_at, tag, issues, truncated, statuses.
 * @param {number} data.requests   Requests sent to drupal.org in this run.
 * @param {boolean} data.offline   True when the cached queue was used.
 * @param {string} data.manifestPath
 * @param {string} data.generatedAt
 */
export function renderMatchReport({ manifest, results, rejected, queue, requests, offline, manifestPath, generatedAt }) {
  const withCandidates = results.filter((r) => r.candidates.length);
  const bands = { high: 0, medium: 0, low: 0 };
  for (const r of withCandidates) bands[r.candidates[0].band]++;
  const lines = [];

  lines.push('# drupal.org known-issue candidates', '');
  lines.push(`> ${DRAFT_NOTICE}`);
  lines.push('> Nothing was posted anywhere. Each candidate needs a person to read the drupal.org issue and confirm it describes the same problem.');
  lines.push('> Confidence is a heuristic score for ordering, not a probability, and it is not calibrated.', '');

  lines.push('| Item | Value |', '| --- | --- |');
  lines.push(`| Generated | ${generatedAt} |`);
  lines.push(`| Evidence run | ${runLine(manifest)} |`);
  lines.push(`| Manifest | ${code(manifestPath)} |`);
  lines.push(`| Findings | ${(manifest.findings ?? []).length} findings in ${results.length} groups${rejected ? `; ${rejected} rejected by a person and left out` : ''} |`);
  lines.push(`| drupal.org queue | ${queue.issues.length} open Drupal core issues tagged ${escapeMarkdown(queue.tag)}, fetched ${queue.fetched_at}${queue.truncated ? ' (truncated: page limit reached)' : ''} |`);
  lines.push(`| Requests to drupal.org | ${requests}${offline ? ' (offline, from the cached queue)' : ''} |`);
  lines.push('');

  lines.push('## Summary', '');
  lines.push(`- Groups with at least one candidate: ${withCandidates.length} (best candidate high ${bands.high}, medium ${bands.medium}, low ${bands.low})`);
  lines.push(`- Groups with no candidate: ${results.length - withCandidates.length}`);
  if (manifest.run.status !== 'PASS') lines.push(`- The run status is ${manifest.run.status}; findings may be incomplete.`);
  lines.push('');
  lines.push(`Next steps follow docs/testing/recording-issues.md: confirm a finding by hand, file it with the Observation template (${OBSERVATION_TEMPLATE}), then link the drupal.org issue and record the mapping for \`recheck\`.`, '');

  for (const { group, candidates } of results) {
    lines.push(`## ${escapeMarkdown(group.rule_id)} on ${group.urls.map(code).join(', ')}`, '');
    lines.push(`- Pattern: ${group.pattern_id ? code(group.pattern_id) : 'no fingerprint'}; result ${group.result}${group.impact ? `, impact ${group.impact}` : ''}`);
    lines.push(`- WCAG candidates: ${group.wcag.join(', ') || 'none'}; elements: ${group.targets.map(code).join(', ')}`);
    lines.push(`- Findings: ${group.finding_ids.map(code).join(', ')} (${group.verification.join(', ')})`);
    lines.push('');
    if (candidates.length) {
      lines.push(candidateTable(candidates));
    }
    else {
      lines.push(`No candidate among ${queue.issues.length} issues. Search by hand before opening a new drupal.org issue: ${searchUrl(group)}`);
    }
    lines.push('');
    lines.push('<details><summary>Draft GitHub observation issue (aid for the owner)</summary>', '');
    lines.push(fence(observationDraft(group, manifest, candidates), 'markdown'));
    lines.push('', '</details>', '');
  }
  return lines.join('\n');
}

const STATUS_LABEL = {
  observed: 'Observed',
  'not-observed': 'Not observed',
  'rule-still-reported': 'Rule still reported',
  'cannot-check': 'Cannot check',
};

/**
 * @param {object} data
 * @param {object[]} data.rows  { result: recheckEntry(), facts: issueFacts() | null, error: string | null }
 */
export function renderRecheckReport({ rows, mapPath, evidenceDir, manifests, requests, offline, staleDays, generatedAt }) {
  const counts = {};
  for (const { result } of rows) counts[result.status] = (counts[result.status] ?? 0) + 1;
  const lines = [];
  lines.push('# Recheck of findings mapped to drupal.org issues', '');
  lines.push('> Made by tools/known-issues.mjs. "Not observed" means the latest comparable run did not report the pattern. It is not evidence of a fix.');
  lines.push('> Nothing was posted anywhere.', '');
  lines.push('| Item | Value |', '| --- | --- |');
  lines.push(`| Generated | ${generatedAt} |`);
  lines.push(`| Map | ${code(mapPath)} |`);
  lines.push(`| Evidence | ${manifests} manifests in ${code(evidenceDir)} |`);
  lines.push(`| Requests to drupal.org | ${requests}${offline ? ' (offline: issue status not checked)' : ''} |`);
  lines.push('');
  lines.push('## Summary', '');
  for (const status of Object.keys(STATUS_LABEL)) lines.push(`- ${STATUS_LABEL[status]}: ${counts[status] ?? 0}`);
  lines.push(`- drupal.org issues with no change for over ${staleDays} days: ${rows.filter((r) => r.facts?.stale).length}`);
  lines.push('');
  for (const { result, facts, error } of rows) {
    const { entry } = result;
    lines.push(`## ${code(entry.pattern)} and drupal.org #${entry.nid}`, '');
    lines.push(`- Map entry: ${escapeMarkdown(entry.summary ?? '')}${entry.rule_id ? ` (rule ${code(entry.rule_id)})` : ''}`);
    lines.push(`- Result: **${STATUS_LABEL[result.status]}.** ${result.statement}`);
    if (result.basis && result.status !== 'cannot-check') lines.push(`- Comparability: ${result.basis}.`);
    if (result.skipped.length) lines.push(`- Runs passed over: ${result.skipped.map((s) => `${s.run_id} (${s.reason})`).join('; ')}`);
    if (facts) {
      lines.push(`- drupal.org: [#${entry.nid}](https://www.drupal.org/i/${entry.nid}) is ${facts.status_label}, last changed ${facts.changed?.slice(0, 10) ?? 'unknown'}${facts.idle_days !== null ? ` (${facts.idle_days} days ago)` : ''}.`);
      if (facts.stale) lines.push(`- The drupal.org issue is open and has not changed for over ${staleDays} days.`);
      if (!facts.open && result.status === 'observed') lines.push('- The drupal.org issue is closed but the pattern is still observed.');
    }
    else if (error) {
      lines.push(`- drupal.org: [#${entry.nid}](https://www.drupal.org/i/${entry.nid}) could not be read (${error}).`);
    }
    lines.push('');
  }
  return lines.join('\n');
}
