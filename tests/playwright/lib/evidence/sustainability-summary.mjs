/**
 * Interim sustainability summary for one evidence run.
 *
 * Builds the public page and JSON described under "Interim baseline" in
 * docs/architecture/SUSTAINABILITY-REPORTING.md: per-page transfer size,
 * request count and modelled emissions (section 1 of the summary page).
 * Sections 2 to 4 are reported as "Not measured". If the run has
 * measurements for those sections, summarize() refuses rather than hide them.
 *
 * Only public values are copied: page paths, HTTP statuses, numbers, tool
 * versions and the model parameters. No hosts, HTML snippets or private
 * artifacts.
 */

const escape = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const NOT_MEASURED = [
  {
    id: 'lab-performance',
    heading: '2. Lab performance (Lighthouse)',
    reason: 'No Lighthouse measurements in this run.',
    present: (m) => m.tool?.name === 'lighthouse' || m.name.startsWith('lighthouse.'),
  },
  {
    id: 'browser-energy',
    heading: '3. Measured browser energy',
    reason: 'No measured browser energy in this run.',
    present: (m) => m.kind === 'energy-measured' && !m.name.startsWith('host.'),
  },
  {
    id: 'host-energy',
    heading: '4. Host energy while serving Drupal',
    reason: 'No measured host energy in this run.',
    present: (m) => m.kind === 'energy-measured' && m.name.startsWith('host.'),
  },
];

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * @param {object} manifest  A quality-evidence manifest (schema 0.2.0 or later).
 * @param {object[]} scenarioRecords  The run's scenarios/*.json records; each
 *   crawl record gives the page path, whether it needs a login and the HTTP status.
 */
export function summarize(manifest, scenarioRecords) {
  for (const section of NOT_MEASURED) {
    if (manifest.measurements.some(section.present)) {
      throw new Error(`The run has measurements for "${section.heading}", which this interim page does not render.`);
    }
  }
  const pageByAttempt = new Map(scenarioRecords
    .filter((r) => r.crawl && r.attempt)
    .map((r) => [r.attempt.attempt_id, r.crawl]));
  // A retried scenario has several attempts; only the last one counts.
  const lastAttempt = new Map((manifest.scenarios ?? [])
    .filter((s) => s.attempts?.length)
    .map((s) => [s.scenario_id, s.attempts.at(-1)]));
  const rows = new Map();
  let emissionsModel = null;
  for (const m of manifest.measurements) {
    if (lastAttempt.has(m.scenario_id) && lastAttempt.get(m.scenario_id).attempt_id !== m.attempt_id) continue;
    const key = `${m.scenario_id} ${m.attempt_id}`;
    const row = rows.get(key) ?? { scenario_id: m.scenario_id, attempt_id: m.attempt_id };
    if (m.name === 'browser.transfer_bytes') row.transfer_bytes = m.value;
    else if (m.name === 'browser.request_count') row.request_count = m.value;
    else if (m.name === 'browser.co2e_modelled') {
      row.co2e_g = m.value;
      emissionsModel ??= { parameters: m.parameters, method: m.method };
    } else continue;
    rows.set(key, row);
  }
  const pages = [...rows.values()].map((row) => {
    const crawl = pageByAttempt.get(row.attempt_id);
    if (!crawl) throw new Error(`No crawl record for ${row.scenario_id} (${row.attempt_id}).`);
    for (const field of ['transfer_bytes', 'request_count', 'co2e_g']) {
      if (typeof row[field] !== 'number') throw new Error(`${row.scenario_id} has no ${field}.`);
    }
    return {
      path: crawl.path,
      scenario_id: row.scenario_id,
      requires_auth: Boolean(crawl.requires_auth),
      http_status: crawl.http_status,
      // The crawl scans a non-200 page only when that status is expected for it.
      status_expected: crawl.http_status === 200 || crawl.status === 'scanned',
      transfer_bytes: row.transfer_bytes,
      request_count: row.request_count,
      co2e_g: row.co2e_g,
    };
  }).sort((a, b) => a.path.localeCompare(b.path));
  if (!pages.length) throw new Error('The run has no per-page byte measurements.');
  const paths = pages.map((p) => p.path);
  const duplicate = paths.find((p, i) => paths.indexOf(p) !== i);
  if (duplicate) throw new Error(`Page ${duplicate} appears more than once.`);
  const params = emissionsModel?.parameters;
  if (!params?.model_version || !params.grid_intensity_g_per_kwh?.network || !params.grid_intensity_year
    || !params.embodied_grid_intensity_g_per_kwh) {
    throw new Error('The emissions measurements do not record the CO2.js model parameters.');
  }
  const pathByScenario = new Map(pages.map((p) => [p.scenario_id, p.path]));
  const notPassed = [...lastAttempt.entries()]
    .filter(([, attempt]) => attempt.status !== 'PASS')
    .map(([scenarioId, attempt]) => ({
      path: pathByScenario.get(scenarioId) ?? scenarioId,
      status: attempt.status,
      reason: attempt.failure_reason ?? null,
      scanned: pageByAttempt.get(attempt.attempt_id)?.status === 'scanned',
    }))
    .sort((a, b) => a.path.localeCompare(b.path));

  const tools = (manifest.tools ?? []).map((t) => ({ name: t.name, version: t.version }));
  return {
    schema: 'observatory-sustainability-summary/0.1',
    status: 'interim-baseline',
    comparability: 'First run of a new series. Not comparable with the July 2026 report.',
    run: {
      run_id: manifest.run.run_id,
      date: manifest.run.completed_at?.slice(0, 10) ?? manifest.run.started_at.slice(0, 10),
      trigger: manifest.run.trigger,
      mode: manifest.run.mode,
      status: manifest.run.status ?? 'unknown',
      scenarios_not_passed: notPassed,
    },
    target: {
      product: manifest.target.product,
      drupal_version: manifest.target.drupal_version,
      php_version: manifest.target.php_version ?? null,
      commit: manifest.target.source?.commit ?? null,
      dirty: manifest.target.source?.dirty ?? null,
    },
    environment: {
      browser: manifest.environment.browser,
      viewport: manifest.environment.viewport,
      color_scheme: manifest.environment.color_scheme,
      runner: manifest.environment.runner,
    },
    server_tracing: manifest.instrumentation?.server_tracing ?? 'unknown',
    tools,
    emissions_model: emissionsModel,
    summary: {
      pages: pages.length,
      median_transfer_bytes: median(pages.map((p) => p.transfer_bytes)),
      median_request_count: median(pages.map((p) => p.request_count)),
      median_co2e_g: median(pages.map((p) => p.co2e_g)),
    },
    pages,
    not_measured: NOT_MEASURED.map(({ id, heading, reason }) => ({ id, heading, reason })),
  };
}

const kB = (bytes) => (bytes / 1000).toLocaleString('en', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const grams = (g) => g.toLocaleString('en', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

function statusNote(page) {
  if (page.http_status === 200) return '200';
  return `${page.http_status} (${page.status_expected ? 'expected by the crawl' : 'not expected'})`;
}

function runStatus(run) {
  if (!run.scenarios_not_passed.length) {
    return `<p><strong>Run status: ${escape(run.status)}.</strong></p>`;
  }
  const items = run.scenarios_not_passed
    .map((s) => `<li><code>${escape(s.path)}</code>: ${escape(s.status)}${s.reason ? `, ${escape(s.reason)}` : ''}. ${s.scanned ? 'The page loaded and was scanned.' : 'The page was not scanned.'}</li>`)
    .join('\n');
  return `<p><strong>Run status: ${escape(run.status)}.</strong> These pages did not pass the crawl's checks. Their resource figures are still listed below; this page covers resource use only.</p>
<ul>
${items}
</ul>`;
}

/** Renders the summary as a static, self-contained HTML page. */
export function renderHtml(summary, { title, archiveHref, indexHref }) {
  const p = summary.emissions_model?.parameters ?? {};
  const grid = p.grid_intensity_g_per_kwh ?? {};
  const toolList = summary.tools.map((t) => `${escape(t.name)} ${escape(t.version)}`).join(', ');
  const rows = summary.pages.map((page) => `<tr>
<th scope="row"><code>${escape(page.path)}</code></th>
<td>${page.requires_auth ? 'Logged in' : 'Anonymous'}</td>
<td>${escape(statusNote(page))}</td>
<td class="num">${kB(page.transfer_bytes)}</td>
<td class="num">${page.request_count}</td>
<td class="num">${grams(page.co2e_g)}</td>
</tr>`).join('\n');
  const notMeasured = summary.not_measured.map((s) => `<section aria-labelledby="${s.id}">
<h2 id="${s.id}">${escape(s.heading)}</h2>
<p><strong>Status: Not measured.</strong> ${escape(s.reason)}</p>
</section>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<style>
:root { color-scheme: light dark; --bg: #ffffff; --fg: #1a1a1a; --muted: #4a4a4a; --line: #c8c8c8; --note-bg: #fff6d6; --note-line: #8a6d00; --link: #0b57d0; }
@media (prefers-color-scheme: dark) { :root { --bg: #121212; --fg: #f0f0f0; --muted: #c4c4c4; --line: #555555; --note-bg: #2b2410; --note-line: #e0b84a; --link: #8ab4f8; } }
body { margin: 0; background: var(--bg); color: var(--fg); font: 1rem/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }
main { max-width: 60rem; margin: 0 auto; padding: 1.5rem 1rem 3rem; }
a { color: var(--link); }
a:focus-visible, .table-wrap:focus-visible { outline: 3px solid var(--link); outline-offset: 2px; }
.notice { border-left: 4px solid var(--note-line); background: var(--note-bg); padding: 0.75rem 1rem; }
dl { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 0.25rem 1rem; }
dt { font-weight: 600; }
dd { margin: 0; overflow-wrap: anywhere; }
li code { overflow-wrap: anywhere; }
.table-wrap { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; }
caption { text-align: left; font-weight: 600; padding: 0.5rem 0; }
th, td { border-bottom: 1px solid var(--line); padding: 0.4rem 0.6rem; text-align: left; vertical-align: top; }
.num { text-align: right; font-variant-numeric: tabular-nums; }
small, .muted { color: var(--muted); }
</style>
</head>
<body>
<main>
<p><a href="${escape(indexHref)}">All reports</a></p>
<h1>${escape(title)}</h1>
<div class="notice">
<p><strong>Interim baseline.</strong> One run on ${escape(summary.run.date)}. ${escape(summary.comparability)} The <a href="${escape(archiveHref)}">July 2026 report</a> used another script, other pages and other themes, and cannot be reproduced.</p>
<p>It measures this repository's fork of Drupal core (${escape(summary.target.drupal_version)} at commit <code>${escape((summary.target.commit ?? '').slice(0, 10))}</code>), not upstream Drupal, with server tracing ${escape(summary.server_tracing)}. The CO2e figures are modelled from transferred bytes. They are not measured energy.</p>
</div>

<section aria-labelledby="resource-use">
<h2 id="resource-use">1. Resource use and modelled emissions</h2>
<p><strong>Status: Measured</strong> for ${summary.summary.pages} pages. Median per page: ${kB(summary.summary.median_transfer_bytes)} kB transferred, ${summary.summary.median_request_count} requests, ${grams(summary.summary.median_co2e_g)} g CO2e (modelled).</p>
${runStatus(summary.run)}
<h3>Method</h3>
<ul>
<li>Each page was opened in a new browser context, so nothing was cached, then scanned with axe-core. Bytes are the response headers and bodies of requests to the site that finished while the page was open and being scanned. Requests to other origins are not included.</li>
<li>Emissions: CO2.js, Sustainable Web Design model version ${escape(p.model_version)}, applied to the transferred bytes. Grid intensity ${escape(grid.network)} g/kWh (${escape(p.grid_intensity_year)} global average bundled with CO2.js) for operational energy, ${escape(p.embodied_grid_intensity_g_per_kwh)} g/kWh for embodied energy, no green hosting. This is a model applied to bytes, not a measurement.</li>
<li>Tools: ${toolList}. Browser: ${escape(summary.environment.browser?.name)} ${escape(summary.environment.browser?.version)}, ${escape(summary.environment.viewport?.width)} by ${escape(summary.environment.viewport?.height)} pixels, ${escape(summary.environment.color_scheme)} colour scheme.</li>
</ul>
<div class="table-wrap" role="region" aria-labelledby="pages-caption" tabindex="0">
<table>
<caption id="pages-caption">Per-page resource use and modelled emissions, one view of each page</caption>
<thead><tr>
<th scope="col">Page</th>
<th scope="col">Visitor</th>
<th scope="col">HTTP status</th>
<th scope="col" class="num">Transferred (kB, 1 kB = 1,000 bytes)</th>
<th scope="col" class="num">Requests</th>
<th scope="col" class="num">CO2e, modelled (g)</th>
</tr></thead>
<tbody>
${rows}
</tbody>
</table>
</div>
</section>

${notMeasured}

<section aria-labelledby="run-details">
<h2 id="run-details">Run details</h2>
<dl>
<dt>Run</dt><dd><code>${escape(summary.run.run_id)}</code> (${escape(summary.run.trigger)}, ${escape(summary.run.mode)})</dd>
<dt>Target</dt><dd>${escape(summary.target.product)} ${escape(summary.target.drupal_version)}, fork commit <code>${escape(summary.target.commit)}</code>${summary.target.dirty ? ' (uncommitted changes)' : ''}</dd>
<dt>Runner</dt><dd>${escape(summary.environment.runner)}</dd>
<dt>Server tracing</dt><dd>${escape(summary.server_tracing)}</dd>
<dt>Figures as JSON</dt><dd>published next to this page with the same name and a <code>.json</code> extension</dd>
</dl>
</section>
</main>
</body>
</html>
`;
}
