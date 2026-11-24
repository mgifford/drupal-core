/**
 * Rechecks findings that a person has mapped to a drupal.org issue.
 *
 * For each map entry it finds the latest run that covered the same page or
 * scenario under conditions comparable with the run the mapping was made
 * from, and says whether the pattern was observed there. A pattern that is
 * not observed is reported as "not observed on commit X", never as fixed:
 * coverage, rule or engine changes can also make a finding disappear.
 */
import { comparability } from '../../../tests/playwright/lib/evidence/compare.mjs';
import { issueNid } from './drupal-org.mjs';

const EXECUTED = new Set(['PASS', 'FAIL']);
const DAY_MS = 24 * 60 * 60 * 1000;

const pathOf = (url) => String(url ?? '').split(/[?#]/)[0];
export const shortCommit = (sha) => (sha ? sha.slice(0, 10) : null);

/**
 * Map entries (reports/pattern-tracker-map.json format) that point at a
 * drupal.org issue. Optional fields read here: url, scenario_id, evidence_run_id.
 */
export function mappedEntries(map) {
  return (map?.entries ?? [])
    .map((entry) => ({
      pattern: entry.a11y_pattern_display_id ?? entry.pattern_id ?? null,
      legacy_id: entry.pattern_id ?? null,
      nid: issueNid(entry.tracker_id),
      tracker_id: entry.tracker_id,
      relationship: entry.relationship ?? null,
      summary: entry.summary ?? null,
      rule_id: entry.rule_id ?? null,
      url: entry.url ? pathOf(entry.url) : null,
      scenario_id: entry.scenario_id ?? null,
      evidence_run_id: entry.evidence_run_id ?? null,
    }))
    .filter((entry) => entry.nid !== null && entry.pattern);
}

/**
 * True when an executed attempt of the run produced axe results and either
 * ran the entry's scenario or loaded the entry's page. Loading the page
 * alone is not enough: it does not show the page was scanned.
 */
export function coversEntry(manifest, entry) {
  const axeArtifacts = new Set((manifest.artifacts ?? []).filter((a) => a.kind === 'axe-results').map((a) => a.artifact_id));
  for (const scenario of manifest.scenarios ?? []) {
    for (const attempt of scenario.attempts ?? []) {
      if (!EXECUTED.has(attempt.status)) continue;
      if (!(attempt.artifact_ids ?? []).some((id) => axeArtifacts.has(id))) continue;
      if (entry.scenario_id && scenario.scenario_id === entry.scenario_id) return true;
      if (entry.url && (attempt.requests ?? []).some((request) => request.resource_type === 'document'
        && pathOf(request.url) === entry.url && request.status !== null && request.status < 400)) {
        return true;
      }
    }
  }
  return false;
}

function commitPhrase(manifest) {
  const source = manifest.target?.source ?? {};
  const commit = shortCommit(source.commit);
  const base = commit ? `commit ${commit}` : 'an unrecorded commit';
  return source.dirty ? `${base} (checkout had uncommitted changes)` : base;
}

/**
 * @param {object} entry     From mappedEntries().
 * @param {object[]} manifests  Every available manifest.
 */
export function recheckEntry(entry, manifests) {
  const runs = manifests.filter((m) => !m.run.synthetic).sort((a, b) => b.run.run_id.localeCompare(a.run.run_id));
  const base = { entry, status: 'cannot-check', run_id: null, commit: null, basis: null, statement: null, skipped: [] };

  if (!entry.url && !entry.scenario_id) {
    return { ...base, statement: 'The map entry has no url or scenario_id, so no run can be shown to have covered it.' };
  }

  const reference = entry.evidence_run_id ? manifests.find((m) => m.run.run_id === entry.evidence_run_id) ?? null : null;
  const basis = reference
    ? `compared with reference run ${reference.run.run_id}`
    : entry.evidence_run_id
      ? `reference run ${entry.evidence_run_id} not found, so conditions were not compared`
      : 'no reference run recorded, so conditions were not compared';

  let latest = null;
  const skipped = [];
  for (const manifest of runs) {
    if (reference && manifest.run.run_id < reference.run.run_id) break;
    if (reference) {
      const { comparable, differences } = comparability(reference, manifest);
      if (!comparable) {
        skipped.push({ run_id: manifest.run.run_id, reason: `differs in ${differences.map((d) => d.field).join(', ')}` });
        continue;
      }
    }
    if (!coversEntry(manifest, entry)) {
      skipped.push({ run_id: manifest.run.run_id, reason: 'did not scan the page or scenario' });
      continue;
    }
    latest = manifest;
    break;
  }

  if (!latest) {
    return { ...base, basis, skipped, statement: `No available run scanned ${entry.url ?? entry.scenario_id} (${basis}).` };
  }

  const status = latest.run.status === 'PASS' ? '' : ` (run status ${latest.run.status})`;
  const where = `${commitPhrase(latest)}, run ${latest.run.run_id}${status}`;
  const result = { ...base, run_id: latest.run.run_id, commit: latest.target?.source?.commit ?? null, basis, skipped };
  const findings = latest.findings ?? [];
  const observed = findings.filter((f) => f.fingerprint?.pattern === entry.pattern);
  if (observed.length) {
    const rejected = observed.every((f) => f.verification === 'human-rejected') ? ' A person marked it human-rejected in that run.' : '';
    return { ...result, status: 'observed', statement: `Observed on ${where}.${rejected}` };
  }
  const sameRule = findings.filter((f) => entry.rule_id && f.rule_id === entry.rule_id && (!entry.url || pathOf(f.url) === entry.url));
  if (sameRule.length) {
    return {
      ...result,
      status: 'rule-still-reported',
      statement: `Pattern ${entry.pattern} not observed on ${where}, but axe rule \`${entry.rule_id}\` is still reported there (${sameRule.map((f) => f.fingerprint?.pattern ?? f.finding_id).join(', ')}). Fingerprints can change between versions; check by hand.`,
    };
  }
  return {
    ...result,
    status: 'not-observed',
    statement: `Not observed on ${where}. This is not evidence of a fix: coverage, rule or engine changes can also hide a finding.`,
  };
}

/** Facts about the drupal.org issue itself: status and days since its last change. */
export function issueFacts(issue, { now = Date.now(), staleDays = 180 } = {}) {
  if (!issue) return null;
  const changedMs = issue.changed ? Date.parse(issue.changed) : NaN;
  const idleDays = Number.isFinite(changedMs) ? Math.floor((now - changedMs) / DAY_MS) : null;
  return {
    nid: issue.nid,
    status_label: issue.status_label,
    open: issue.open,
    changed: issue.changed,
    idle_days: idleDays,
    stale: idleDays !== null && idleDays > staleDays && issue.open,
  };
}
