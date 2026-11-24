/**
 * Compares two evidence manifests and classifies findings.
 *
 * Classifications:
 *   new           seen now, never in a comparable earlier run
 *   recurring     seen now and in the baseline
 *   changed       seen now and in the baseline, with a different impact
 *   reintroduced  seen now, not in the baseline, but in an older run
 *   resolved      in the baseline, not seen now, and its scenario ran to
 *                 completion now. "Not observed", not proof of a fix.
 *   unverified    in the baseline, not seen now, and its scenario did not
 *                 run to completion now (skipped, failed to start, missing)
 *   not-comparable  the runs differ in a condition that changes results
 *
 * Findings are matched by their occurrence fingerprint (tools/a11y-fingerprints.js).
 */

// Conditions that must match for findings to be compared. A different Drupal
// commit is the point of comparing, so it is reported but not blocking.
const CONDITIONS = [
  ['run.mode', (m) => m.run.mode],
  ['instrumentation.server_tracing', (m) => m.instrumentation.server_tracing],
  ['environment.browser', (m) => `${m.environment.browser.name} ${m.environment.browser.version}`],
  ['environment.viewport', (m) => JSON.stringify(m.environment.viewport ?? null)],
  ['environment.color_scheme', (m) => m.environment.color_scheme ?? null],
  ['environment.reduced_motion', (m) => m.environment.reduced_motion ?? null],
  ['tools.axe-core', (m) => m.tools.find((t) => t.name === 'axe-core')?.version ?? null],
  ['target.install_profile', (m) => m.target.install_profile ?? null],
  ['target.recipes', (m) => JSON.stringify([...(m.target.recipes ?? [])].sort())],
];

const EXECUTED = new Set(['PASS', 'FAIL']);

export function comparability(baseline, current) {
  const differences = [];
  for (const [field, read] of CONDITIONS) {
    const before = read(baseline);
    const after = read(current);
    if (before !== after) {
      differences.push({ field, baseline: before, current: after });
    }
  }
  if (baseline.run.synthetic !== current.run.synthetic) {
    differences.push({ field: 'run.synthetic', baseline: baseline.run.synthetic, current: current.run.synthetic });
  }
  return { comparable: differences.length === 0, differences };
}

function executedScenarios(manifest) {
  const ids = new Set();
  for (const scenario of manifest.scenarios) {
    if (scenario.attempts.some((attempt) => EXECUTED.has(attempt.status))) {
      ids.add(scenario.scenario_id);
    }
  }
  return ids;
}

function byOccurrence(manifest) {
  const map = new Map();
  for (const finding of manifest.findings) {
    if (!map.has(finding.fingerprint.occurrence)) {
      map.set(finding.fingerprint.occurrence, finding);
    }
  }
  return map;
}

/**
 * @param {object} baseline  Earlier manifest.
 * @param {object} current   Later manifest.
 * @param {object[]} [older] Manifests before the baseline, for "reintroduced".
 */
export function compareRuns(baseline, current, older = []) {
  const { comparable, differences } = comparability(baseline, current);
  const before = byOccurrence(baseline);
  const now = byOccurrence(current);
  const ranNow = executedScenarios(current);
  const seenOlder = new Set(older.filter((m) => comparability(m, current).comparable).flatMap((m) => m.findings.map((f) => f.fingerprint.occurrence)));
  const results = [];
  const entry = (finding, classification, beforeFinding, nowFinding) => ({
    occurrence: finding.fingerprint.occurrence,
    pattern: finding.fingerprint.pattern,
    rule_id: finding.rule_id,
    scenario_id: finding.scenario_id,
    classification,
    baseline_finding_id: beforeFinding?.finding_id ?? null,
    current_finding_id: nowFinding?.finding_id ?? null,
  });
  for (const [key, finding] of now) {
    const earlier = before.get(key);
    let classification;
    if (!comparable) classification = 'not-comparable';
    else if (earlier) classification = earlier.impact === finding.impact ? 'recurring' : 'changed';
    else if (seenOlder.has(key)) classification = 'reintroduced';
    else classification = 'new';
    results.push(entry(finding, classification, earlier, finding));
  }
  for (const [key, finding] of before) {
    if (now.has(key)) continue;
    let classification;
    if (!comparable) classification = 'not-comparable';
    else classification = ranNow.has(finding.scenario_id) ? 'resolved' : 'unverified';
    results.push(entry(finding, classification, finding, null));
  }
  return {
    artifact_type: 'quality-evidence-comparison',
    baseline_run_id: baseline.run.run_id,
    current_run_id: current.run.run_id,
    baseline_commit: baseline.target.source.commit,
    current_commit: current.target.source.commit,
    comparable,
    differences,
    findings: results,
  };
}
