/**
 * Renders one evidence manifest as a static, self-contained HTML page.
 *
 * The page shows only what the manifest records. It links public artifacts
 * that exist, and says plainly when evidence is private, expired or was not
 * collected. It needs no JavaScript.
 */

const escape = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const CLASSIFICATION_TEXT = {
  new: 'New: not seen in earlier comparable runs',
  recurring: 'Recurring: also seen in the baseline run',
  changed: 'Changed: seen in the baseline with a different impact',
  reintroduced: 'Reintroduced: seen before, absent from the baseline, seen again',
  resolved: 'Not observed now (the scenario ran); not proof of a fix',
  unverified: 'Unverified: the scenario did not complete in this run',
  'not-comparable': 'Not comparable: test conditions differ from the baseline',
};

const CORRELATION_TEXT = {
  correlated: 'Correlated: every expected request returned a server trace',
  'partially-correlated': 'Partly correlated: some expected server traces are missing',
  unavailable: 'Unavailable: no server trace was returned',
  'instrumentation-disabled': 'Server tracing was off for this run',
  'correlation-failed': 'Correlation failed: trace headers were invalid',
};

function table(id, caption, headers, rows) {
  if (!rows.length) {
    return '';
  }
  return `<div class="table-wrap" role="region" aria-labelledby="${id}" tabindex="0">
<table>
<caption id="${id}">${escape(caption)}</caption>
<thead><tr>${headers.map((h) => `<th scope="col">${escape(h)}</th>`).join('')}</tr></thead>
<tbody>
${rows.map((cells) => `<tr>${cells.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('\n')}
</tbody>
</table>
</div>`;
}

function artifactLink(artifact) {
  if (!artifact) {
    return 'No artifact recorded';
  }
  if (artifact.availability !== 'available') {
    return `${escape(artifact.kind)}: ${escape(artifact.availability.replace('-', ' '))}${artifact.note ? ` (${escape(artifact.note)})` : ''}`;
  }
  if (artifact.visibility === 'private') {
    return `${escape(artifact.kind)}: kept privately with the run, not published${artifact.note ? ` (${escape(artifact.note)})` : ''}`;
  }
  return `<a href="../${escape(artifact.path)}">${escape(artifact.kind)}</a> (${escape(artifact.bytes)} bytes, sha256 ${escape(artifact.sha256.slice(0, 12))}…)`;
}

function executionSummary(request) {
  const s = request.trace.summary;
  const lines = [`Browser: ${escape(request.method)} ${escape(request.url)} returned ${escape(request.status ?? 'no response')}${request.failure ? ` (${escape(request.failure)})` : ''}`];
  if (!s) {
    const why = request.trace.status === 'correlated'
      ? `trace ${escape(request.trace.trace_id)} was returned, but its spans were ${escape(request.trace.exported === 'not-found' ? 'not found in the trace store' : 'not checked')}`
      : escape(request.trace.reason ?? request.trace.status);
    lines.push(`Drupal execution: no server spans available (${why}).`);
    return `<ul>${lines.map((l) => `<li>${l}</li>`).join('')}</ul>`;
  }
  lines.push(`Server trace <code>${escape(request.trace.trace_id)}</code>: ${escape(s.span_count)} span(s), ${escape(s.duration_ms)} ms`);
  if (s.drupal_route_name || s.http_route) {
    lines.push(`Route resolved: ${escape(s.drupal_route_name ?? 'unknown name')} (${escape(s.http_route ?? 'unknown path')})`);
  }
  if (s.page_cache || s.dynamic_page_cache) {
    lines.push(`Cache: page cache ${escape(s.page_cache ?? 'not reported')}, dynamic page cache ${escape(s.dynamic_page_cache ?? 'not reported')}`);
  }
  const ops = Object.entries(s.db_operations).map(([k, v]) => `${escape(k)} ${escape(v)}`).join(', ');
  lines.push(`Database: ${escape(s.db_statement_count)} statement(s), ${escape(s.db_total_ms)} ms${ops ? ` (${ops})` : ''}${s.db_failures ? `, ${escape(s.db_failures)} failed` : ''}`);
  if (s.exception_types.length) {
    lines.push(`Exceptions recorded: ${s.exception_types.map(escape).join(', ')}`);
  }
  lines.push(`Response: HTTP ${escape(s.http_status ?? 'not recorded')}`);
  return `<ul>${lines.map((l) => `<li>${l}</li>`).join('')}</ul>`;
}

/**
 * @param {object} manifest
 * @param {object} [comparison]  Output of compareRuns(), current = manifest.
 */
export function renderReport(manifest, comparison = null) {
  const { run, target, environment, instrumentation } = manifest;
  const artifactsById = new Map(manifest.artifacts.map((a) => [a.artifact_id, a]));
  const classOf = new Map((comparison?.findings ?? []).filter((f) => f.current_finding_id).map((f) => [f.current_finding_id, f.classification]));
  const commit = target.source.commit ?? 'unknown';
  const title = `Evidence report ${run.run_id}`;

  const scenarioRows = manifest.scenarios.flatMap((scenario) => scenario.attempts.map((attempt) => [
    `<a href="#${escape(scenario.scenario_id)}">${escape(scenario.title)}</a>`,
    escape(attempt.status),
    escape(CORRELATION_TEXT[attempt.correlation.status]),
    escape(manifest.findings.filter((f) => f.attempt_id === attempt.attempt_id).length),
  ]));

  const scenarioSections = manifest.scenarios.map((scenario) => scenario.attempts.map((attempt) => {
    const actions = attempt.actions.map((action) => {
      const requests = attempt.requests.filter((r) => r.action_id === action.action_id && ['document', 'xhr', 'fetch'].includes(r.resource_type));
      const others = attempt.requests.filter((r) => r.action_id === action.action_id).length - requests.length;
      return `<li><p><strong>${escape(action.label)}</strong> (${escape(action.status)})</p>
${requests.map((r) => `<details><summary>${escape(r.method)} ${escape(r.url)}: HTTP ${escape(r.status ?? 'no response')}, trace ${escape(r.trace.status)}</summary>${executionSummary(r)}</details>`).join('\n')}
${others > 0 ? `<p>${escape(others)} other request(s) (styles, scripts, images) not traced.</p>` : ''}</li>`;
    }).join('\n');
    const findings = manifest.findings.filter((f) => f.attempt_id === attempt.attempt_id);
    const findingItems = findings.map((f) => {
      const classification = classOf.get(f.finding_id);
      const mapping = f.source_mapping.candidates.length
        ? `${escape(f.source_mapping.classification)} mapping: ${f.source_mapping.candidates.map((c) => `${escape(c.kind)} <code>${escape(c.value)}</code> (${escape(c.evidence)})`).join('; ')}`
        : 'Unknown: no evidence links this finding to a Drupal component.';
      return `<li><article aria-labelledby="h-${escape(f.finding_id)}">
<h4 id="h-${escape(f.finding_id)}">${escape(f.message ?? f.rule_id)}</h4>
<dl>
<dt>Result</dt><dd>${escape(f.result === 'violation' ? 'Rule violation' : 'Needs human review')}${f.impact ? `, impact ${escape(f.impact)}` : ''}; ${escape(f.verification.replace(/-/g, ' '))}</dd>
<dt>Detected by</dt><dd>${escape(f.tool.name)} ${escape(f.tool.version ?? '')}, rule <code>${escape(f.rule_id)}</code>${/^https?:\/\//.test(f.rule_url ?? '') ? ` (<a href="${escape(f.rule_url)}">rule description</a>)` : ''}</dd>
<dt>Compared with earlier runs</dt><dd>${escape(classification ? CLASSIFICATION_TEXT[classification] : 'No comparison was made for this report')}</dd>
<dt>WCAG success criteria (candidates from engine tags)</dt><dd>${f.wcag_candidates.length ? escape(f.wcag_candidates.join(', ')) : 'None supplied'}</dd>
<dt>Where</dt><dd>${escape(f.url)}, element <code>${escape(f.target.join(' '))}</code></dd>
${f.html ? `<dt>Element (sanitized)</dt><dd><pre><code>${escape(f.html)}</code></pre></dd>` : ''}
<dt>Drupal execution evidence</dt><dd>${f.related_trace_ids.length ? `Server trace(s) of the page load: ${f.related_trace_ids.map((t) => `<code>${escape(t)}</code>`).join(', ')}` : 'No server trace is linked'}</dd>
<dt>Components possibly involved</dt><dd>${mapping}</dd>
<dt>Fix tested</dt><dd>No fix evidence is recorded in this run.</dd>
<dt>Identity</dt><dd>${escape(f.fingerprint.occurrence)} (pattern ${escape(f.fingerprint.pattern)}, ${escape(f.fingerprint.status)})</dd>
<dt>Evidence</dt><dd>${f.artifact_ids.map((id) => artifactLink(artifactsById.get(id))).join('<br>')}</dd>
</dl>
</article></li>`;
    }).join('\n');
    return `<section aria-labelledby="${escape(scenario.scenario_id)}">
<h2 id="${escape(scenario.scenario_id)}">${escape(scenario.title)}</h2>
<p>Status: ${escape(attempt.status)}${attempt.failure_reason ? `. Reason: ${escape(attempt.failure_reason)}` : ''}. ${escape(CORRELATION_TEXT[attempt.correlation.status])} (${escape(attempt.correlation.matched)} of ${escape(attempt.correlation.expected)} expected requests).</p>
${attempt.correlation.notes.length ? `<ul>${attempt.correlation.notes.map((n) => `<li>${escape(n)}</li>`).join('')}</ul>` : ''}
${scenario.reproduce ? `<p>Reproduce: <code>${escape(scenario.reproduce)}</code></p>` : ''}
<h3>Browser actions and Drupal requests</h3>
<ol>${actions}</ol>
<h3>Findings (${escape(findings.length)})</h3>
${findings.length ? `<ol>${findingItems}</ol>` : '<p>No automated findings were recorded for this attempt. That does not mean the page is accessible.</p>'}
</section>`;
  }).join('\n')).join('\n');

  const artifactRows = manifest.artifacts.map((a) => [escape(a.kind), escape(a.availability), escape(a.visibility), artifactLink(a)]);
  const comparisonBlock = comparison
    ? `<section aria-labelledby="comparison"><h2 id="comparison">Comparison with ${escape(comparison.baseline_run_id)}</h2>
<p>${comparison.comparable ? 'The runs are comparable.' : 'The runs are not comparable, so no finding is classified as new or resolved.'} Baseline commit ${escape(comparison.baseline_commit ?? 'unknown')}, current commit ${escape(comparison.current_commit ?? 'unknown')}.</p>
${table('cmp-diff', 'Conditions that differ', ['Condition', 'Baseline', 'Current'], comparison.differences.map((d) => [escape(d.field), escape(d.baseline), escape(d.current)]))}
${table('cmp-find', 'Finding classifications', ['Occurrence', 'Rule', 'Classification'], comparison.findings.map((f) => [escape(f.occurrence), `<code>${escape(f.rule_id)}</code>`, escape(CLASSIFICATION_TEXT[f.classification])]))}
</section>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<style>
:root { color-scheme: light dark; font-family: system-ui, sans-serif; line-height: 1.5; }
html { background: Canvas; color: CanvasText; }
body { margin: 0 auto; max-width: 70rem; padding: 1rem; overflow-wrap: anywhere; }
:focus-visible { outline: 3px solid; outline-offset: 2px; }
.skip { position: absolute; left: -100vw; }
.skip:focus { position: static; }
.notice { border: 2px solid; padding: 0.5rem 1rem; }
.table-wrap { overflow-x: auto; }
table { border-collapse: collapse; margin: 1rem 0; }
th, td { border: 1px solid; padding: 0.25rem 0.5rem; text-align: left; vertical-align: top; }
caption { text-align: left; font-weight: bold; }
pre { white-space: pre-wrap; }
details { margin: 0.25rem 0; }
summary { cursor: pointer; }
dt { font-weight: bold; }
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto; transition: none; animation: none; } }
</style>
</head>
<body>
<a class="skip" href="#main">Skip to the report</a>
<header>
<h1>${escape(title)}</h1>
${run.synthetic ? '<p class="notice"><strong>Synthetic fixture.</strong> This record was made by hand to test the tooling. It is not evidence about Drupal.</p>' : ''}
<p class="notice">Automated results only. They do not establish WCAG conformance, and a passing rule is not proof of accessibility. Server traces show what Drupal did during a request; they do not prove what caused a finding.</p>
</header>
<nav aria-label="Report sections"><ul>
<li><a href="#about">About this run</a></li>
${manifest.scenarios.map((s) => `<li><a href="#${escape(s.scenario_id)}">${escape(s.title)}</a></li>`).join('\n')}
${comparison ? '<li><a href="#comparison">Comparison</a></li>' : ''}
<li><a href="#artifacts">Evidence files</a></li>
</ul></nav>
<main id="main">
<section aria-labelledby="about">
<h2 id="about">About this run</h2>
<dl>
<dt>Status</dt><dd>${escape(run.status)} (${escape(run.mode)} run, ${escape(run.trigger)})</dd>
<dt>Started</dt><dd><time datetime="${escape(run.started_at)}">${escape(run.started_at)}</time> (UTC)</dd>
<dt>Drupal source</dt><dd>${escape(target.product)} ${escape(target.drupal_version ?? '')}, commit <code>${escape(commit)}</code>${target.source.dirty ? ' with uncommitted changes' : ''}</dd>
<dt>Environment</dt><dd>${escape(environment.browser.name)} ${escape(environment.browser.version ?? '')}${environment.viewport ? `, ${escape(environment.viewport.width)}×${escape(environment.viewport.height)}` : ''}${target.php_version ? `, PHP ${escape(target.php_version)}` : ''}</dd>
<dt>Server tracing</dt><dd>${escape(instrumentation.server_tracing)}${instrumentation.implementation ? ` (${escape(instrumentation.implementation)})` : ''}</dd>
<dt>Tools</dt><dd>${manifest.tools.map((t) => `${escape(t.name)} ${escape(t.version ?? '')}`).join(', ')}</dd>
</dl>
${run.notes?.length ? `<ul>${run.notes.map((n) => `<li>${escape(n)}</li>`).join('')}</ul>` : ''}
${table('scenario-table', 'Scenarios', ['Scenario', 'Status', 'Server trace correlation', 'Findings'], scenarioRows)}
</section>
${scenarioSections}
${comparisonBlock}
<section aria-labelledby="artifacts">
<h2 id="artifacts">Evidence files</h2>
${table('artifact-table', 'Evidence files for this run', ['Kind', 'Availability', 'Visibility', 'Details'], artifactRows)}
</section>
</main>
<footer><p>Generated from evidence manifest schema ${escape(manifest.schema_version)}. See docs/observability/README.md in the repository.</p></footer>
</body>
</html>
`;
}
