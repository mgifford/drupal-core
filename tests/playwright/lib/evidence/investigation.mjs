/**
 * Exports one finding as an investigation request
 * (schemas/investigation-request.schema.json), for Drupal Core Lab or any
 * other project that reproduces and tests fixes. Nothing here depends on
 * Core Lab being installed.
 */
import { validate } from './validate.mjs';

/**
 * @param {object} manifest  A validated evidence manifest.
 * @param {string} findingId
 * @param {string} manifestPath  The manifest's path, relative to where the request is stored.
 * @param {{issue?: string|null, experiment?: string|null}} [coreLab]
 */
export function buildInvestigationRequest(manifest, findingId, manifestPath, coreLab = {}) {
  const finding = manifest.findings.find((f) => f.finding_id === findingId);
  if (!finding) {
    throw new Error(`no finding ${findingId} in run ${manifest.run.run_id}`);
  }
  const scenario = manifest.scenarios.find((s) => s.scenario_id === finding.scenario_id);
  const attempt = scenario?.attempts.find((a) => a.attempt_id === finding.attempt_id);
  // Steps up to and including the action that loaded the scanned page.
  const actions = attempt?.actions ?? [];
  const lastIndex = actions.findIndex((a) => a.action_id === finding.page_action_id);
  const steps = (lastIndex >= 0 ? actions.slice(0, lastIndex + 1) : actions).map((a) => a.label);
  const request = {
    schema_version: '0.1.0',
    artifact_type: 'investigation-request',
    source_project: 'drupal-core',
    created_at: new Date().toISOString(),
    synthetic: manifest.run.synthetic,
    run_id: manifest.run.run_id,
    finding_id: finding.finding_id,
    drupal_commit: manifest.target.source.commit,
    scenario_id: finding.scenario_id,
    finding: {
      tool: finding.tool,
      rule_id: finding.rule_id,
      result: finding.result,
      impact: finding.impact ?? null,
      url: finding.url,
      target: finding.target ?? [],
      wcag_candidates: finding.wcag_candidates ?? [],
      occurrence: finding.fingerprint.occurrence,
      verification: finding.verification,
    },
    reproduction: {
      route: finding.url,
      steps: steps.length ? steps : [`Open ${finding.url}`],
      command: scenario?.reproduce ?? null,
      install_profile: manifest.target.install_profile ?? null,
      recipes: manifest.target.recipes ?? [],
      browser: `${manifest.environment.browser.name} ${manifest.environment.browser.version ?? ''}`.trim(),
    },
    related_trace_ids: finding.related_trace_ids,
    evidence_manifest: manifestPath,
    core_lab: { issue: coreLab.issue ?? null, experiment: coreLab.experiment ?? null },
  };
  const { valid, errors } = validate('investigation-request', request);
  if (!valid) {
    throw new Error(`investigation request does not match the schema:\n${errors.join('\n')}`);
  }
  return request;
}
