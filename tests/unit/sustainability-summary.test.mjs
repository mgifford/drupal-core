import test from 'node:test';
import assert from 'node:assert/strict';
import { summarize, renderHtml } from '../playwright/lib/evidence/sustainability-summary.mjs';

const PARAMETERS = {
  model: 'swd',
  model_version: 4,
  grid_intensity_g_per_kwh: { device: 472.94, network: 472.94, data_center: 472.94 },
  grid_intensity_year: 2024,
  embodied_grid_intensity_g_per_kwh: 494,
  green_hosting_factor: 0,
};

function page(id, attempt, bytes, requests, co2e) {
  return [
    { name: 'browser.transfer_bytes', value: bytes, kind: 'resource-proxy', scenario_id: id, attempt_id: attempt },
    { name: 'browser.request_count', value: requests, kind: 'resource-proxy', scenario_id: id, attempt_id: attempt },
    { name: 'browser.co2e_modelled', value: co2e, kind: 'emissions-modelled', scenario_id: id, attempt_id: attempt, parameters: PARAMETERS, method: 'CO2.js on bytes' },
    { name: 'server.duration', value: 12, kind: 'server-execution', scenario_id: id, attempt_id: attempt },
  ];
}

function fixture(extra = []) {
  const manifest = {
    run: { run_id: 'run-x', started_at: '2026-11-26T19:14:02Z', completed_at: '2026-11-26T19:20:00Z', trigger: 'manual', mode: 'diagnostic', status: 'PASS' },
    target: { product: 'drupal-core', drupal_version: '12.0-dev', php_version: '8.5', source: { commit: 'eff737307a59292a483e', dirty: false } },
    environment: { browser: { name: 'chromium', version: '149' }, viewport: { width: 1280, height: 720 }, color_scheme: 'light', runner: 'local-ddev' },
    instrumentation: { server_tracing: 'enabled' },
    tools: [{ name: 'playwright', version: '1.61.1' }, { name: '@tgwf/co2', version: '0.19.0' }],
    scenarios: [
      { scenario_id: 'crawl-installed-admin', attempts: [{ attempt_id: 'att-a', status: 'PASS', failure_reason: null }] },
      { scenario_id: 'crawl-installed-user-login', attempts: [{ attempt_id: 'att-b', status: 'PASS', failure_reason: null }] },
      { scenario_id: 'crawl-installed-front', attempts: [{ attempt_id: 'att-c', status: 'PASS', failure_reason: null }] },
    ],
    measurements: [
      ...page('crawl-installed-user-login', 'att-b', 188000, 17, 0.027),
      ...page('crawl-installed-admin', 'att-a', 255000, 27, 0.037),
      ...page('crawl-installed-front', 'att-c', 187000, 17, 0.0271),
      ...extra,
    ],
  };
  const records = [
    { attempt: { attempt_id: 'att-a' }, crawl: { path: '/admin', requires_auth: true, http_status: 200, status: 'scanned' } },
    { attempt: { attempt_id: 'att-b' }, crawl: { path: '/user/login', requires_auth: false, http_status: 200, status: 'scanned' } },
    { attempt: { attempt_id: 'att-c' }, crawl: { path: '/', requires_auth: false, http_status: 403, status: 'scanned' } },
  ];
  return { manifest, records };
}

test('summarize: one row per page, sorted by path, with medians', () => {
  const { manifest, records } = fixture();
  const s = summarize(manifest, records);
  assert.deepEqual(s.pages.map((p) => p.path), ['/', '/admin', '/user/login']);
  assert.deepEqual(s.pages[1], {
    path: '/admin', scenario_id: 'crawl-installed-admin', requires_auth: true, http_status: 200, status_expected: true,
    transfer_bytes: 255000, request_count: 27, co2e_g: 0.037,
  });
  assert.equal(s.pages[0].status_expected, true);
  assert.equal(s.summary.pages, 3);
  assert.equal(s.summary.median_transfer_bytes, 188000);
  assert.equal(s.summary.median_co2e_g, 0.0271);
  assert.equal(s.emissions_model.parameters.grid_intensity_year, 2024);
  assert.equal(s.run.date, '2026-11-26');
  assert.equal(s.run.status, 'PASS');
  assert.deepEqual(s.run.scenarios_not_passed, []);
  assert.equal(s.server_tracing, 'enabled');
  assert.equal(s.not_measured.length, 3);
});

test('summarize: only the last attempt of a retried page counts', () => {
  const { manifest, records } = fixture(page('crawl-installed-admin', 'att-a0', 999999, 99, 0.5));
  manifest.scenarios[0].attempts.unshift({ attempt_id: 'att-a0', status: 'FAIL', failure_reason: 'timeout' });
  records.push({ attempt: { attempt_id: 'att-a0' }, crawl: { path: '/admin', requires_auth: true, http_status: 200, status: 'scanned' } });
  const s = summarize(manifest, records);
  assert.equal(s.pages.length, 3);
  assert.equal(s.pages.find((p) => p.path === '/admin').transfer_bytes, 255000);
  assert.deepEqual(s.run.scenarios_not_passed, []);
});

test('summarize: lists pages that did not pass and says whether they were scanned', () => {
  const { manifest, records } = fixture();
  manifest.run.status = 'FAIL';
  manifest.scenarios[0].attempts[0] = { attempt_id: 'att-a', status: 'FAIL', failure_reason: 'new axe findings' };
  const s = summarize(manifest, records);
  assert.deepEqual(s.run.scenarios_not_passed, [{ path: '/admin', status: 'FAIL', reason: 'new axe findings', scanned: true }]);
  const html = renderHtml(s, { title: 't', archiveHref: 'a.html', indexHref: 'index.html' });
  assert.match(html, /Run status: FAIL\./);
  assert.match(html, /<code>\/admin<\/code>: FAIL, new axe findings\. The page loaded and was scanned\./);
});

test('summarize: refuses a run that has Lighthouse or energy measurements', () => {
  for (const extra of [
    { name: 'lighthouse.lcp', value: 1, kind: 'browser-timing', scenario_id: 's', attempt_id: 'a' },
    { name: 'browser.energy', value: 1, kind: 'energy-measured', scenario_id: 's', attempt_id: 'a' },
    { name: 'host.energy', value: 1, kind: 'energy-measured', scenario_id: 's', attempt_id: 'a' },
  ]) {
    const { manifest, records } = fixture([extra]);
    assert.throws(() => summarize(manifest, records), /does not render/);
  }
});

test('summarize: refuses a page with no crawl record, or emissions without model parameters', () => {
  const { manifest, records } = fixture();
  assert.throws(() => summarize(manifest, records.slice(1)), /No crawl record/);
  for (const m of manifest.measurements) {
    if (m.parameters) m.parameters = { ...PARAMETERS, grid_intensity_year: undefined };
  }
  assert.throws(() => summarize(manifest, records), /model parameters/);
});

test('renderHtml: data table, units, not-measured sections and escaping', () => {
  const { manifest, records } = fixture();
  records[1].crawl.path = '/user/<login>';
  const html = renderHtml(summarize(manifest, records), { title: 'Baseline & test', archiveHref: 'july.html', indexHref: 'index.html' });
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Baseline &amp; test<\/title>/);
  assert.match(html, /<caption id="pages-caption">/);
  assert.match(html, /<th scope="col" class="num">Transferred \(kB, 1 kB = 1,000 bytes\)<\/th>/);
  assert.match(html, /<code>\/user\/&lt;login&gt;<\/code>/);
  assert.doesNotMatch(html, /<login>/);
  assert.match(html, /<td class="num">255\.0<\/td>/);
  assert.match(html, /<td>403 \(expected by the crawl\)<\/td>/);
  assert.match(html, /Run status: PASS\./);
  assert.equal(html.match(/Status: Not measured\./g).length, 3);
  assert.doesNotMatch(html, /undefined|NaN/);
});
