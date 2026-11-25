import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { addModelledEmissions, emissionsParameters, CO2JS_VERSION, CHECKED_RELEASES, NAME } from '../playwright/lib/evidence/emissions.mjs';
import { validate } from '../playwright/lib/evidence/validate.mjs';
import { newId } from '../playwright/lib/evidence/ids.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
// A real run under schema 0.1.0, with two browser.transfer_bytes measurements.
const EXAMPLE = path.join(ROOT, 'schemas/examples/quality-evidence-run.example.json');
const example = () => JSON.parse(fs.readFileSync(EXAMPLE, 'utf8'));
const bytesOf = (manifest) => manifest.measurements.filter((m) => m.name === 'browser.transfer_bytes');
const modelledOf = (manifest) => manifest.measurements.filter((m) => m.name === NAME);

test('the installed CO2.js is the pinned version and its facts were checked', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'tests/playwright/package.json'), 'utf8'));
  assert.equal(pkg.devDependencies['@tgwf/co2'], CO2JS_VERSION, 'exact pin matches what is installed');
  assert.ok(CHECKED_RELEASES[CO2JS_VERSION], `add CO2.js ${CO2JS_VERSION} to CHECKED_RELEASES after checking its data year and embodied intensity`);
});

test('adds one modelled value per transfer_bytes measurement, linked by inputs', () => {
  const manifest = example();
  const before = JSON.parse(JSON.stringify(bytesOf(manifest)));
  addModelledEmissions(manifest);
  assert.equal(manifest.schema_version, '0.2.0');
  assert.deepEqual(validate('quality-evidence', manifest), { valid: true, errors: [] });
  assert.deepEqual(bytesOf(manifest), before, 'the byte values are not changed');
  const modelled = modelledOf(manifest);
  assert.equal(modelled.length, before.length);
  for (const [i, m] of modelled.entries()) {
    assert.deepEqual(m.inputs, [before[i].measurement_id]);
    assert.equal(m.kind, 'emissions-modelled');
    assert.equal(m.unit, 'g');
    assert.equal(m.scenario_id, before[i].scenario_id);
    assert.equal(m.attempt_id, before[i].attempt_id);
    assert.equal(m.instrumented, before[i].instrumented);
    assert.deepEqual(m.tool, { name: '@tgwf/co2', version: CO2JS_VERSION });
    assert.deepEqual(m.parameters, {
      model: 'swd',
      model_version: 4,
      grid_intensity_g_per_kwh: { device: 472.94, network: 472.94, data_center: 472.94 },
      grid_intensity_source: 'CO2.js bundled annual average for WORLD (averageIntensity.data.WORLD), applied to operational energy in all three segments',
      grid_intensity_year: 2024,
      embodied_grid_intensity_g_per_kwh: 494,
      green_hosting_factor: 0,
    });
    assert.match(m.method, /not a measurement; never added to energy values/);
  }
  assert.ok(manifest.tools.some((t) => t.name === '@tgwf/co2' && t.version === CO2JS_VERSION));
});

test('values follow Sustainable Web Design v4 with the recorded intensities', () => {
  const manifest = addModelledEmissions(example());
  // SWD v4 per GB: operational 0.055 + 0.059 + 0.08 kWh, embodied 0.012 +
  // 0.013 + 0.081 kWh (SWDV4 in CO2.js 0.19.0, dist/esm/constants/index.js).
  const perByte = (0.194 * 472.94 + 0.106 * 494) / 1e9;
  for (const m of modelledOf(manifest)) {
    const bytes = manifest.measurements.find((b) => b.measurement_id === m.inputs[0]).value;
    assert.ok(Math.abs(m.value - bytes * perByte) < 1e-12, `${m.value} g for ${bytes} bytes`);
  }
});

test('energy measurements are neither read nor changed', () => {
  const plain = addModelledEmissions(example());
  const manifest = example();
  const energy = { ...bytesOf(manifest)[0], measurement_id: newId('msr'), name: 'client.energy_incremental', value: 12.5, unit: 'J', kind: 'energy-measured' };
  manifest.measurements.push(energy);
  addModelledEmissions(manifest);
  assert.deepEqual(modelledOf(manifest).map((m) => m.value), modelledOf(plain).map((m) => m.value));
  assert.ok(modelledOf(manifest).every((m) => !m.inputs.includes(energy.measurement_id)));
  assert.deepEqual(manifest.measurements.find((m) => m.measurement_id === energy.measurement_id), energy);
});

test('the method counts requests with no size and other-origin requests', () => {
  const manifest = example();
  const attempt = manifest.scenarios[0].attempts[0];
  attempt.requests[0].transfer_bytes = null;
  attempt.other_origin_requests = 3;
  addModelledEmissions(manifest);
  const m = modelledOf(manifest).find((x) => x.attempt_id === attempt.attempt_id);
  assert.match(m.method, new RegExp(`Bytes from ${attempt.requests.length} same-origin request\\(s\\); 1 had no size and counted as 0 bytes; 3 request\\(s\\) to other origins are not included\\.`));
});

test('zero bytes model to zero grams', () => {
  const manifest = example();
  bytesOf(manifest)[0].value = 0;
  addModelledEmissions(manifest);
  assert.equal(modelledOf(manifest)[0].value, 0);
});

test('an unchecked CO2.js version records its year and embodied intensity as unknown', () => {
  const checked = CHECKED_RELEASES[CO2JS_VERSION];
  delete CHECKED_RELEASES[CO2JS_VERSION];
  try {
    const p = emissionsParameters({ device: { value: 1 }, network: { value: 2 }, dataCenter: { value: 3 } });
    assert.deepEqual(p.grid_intensity_g_per_kwh, { device: 1, network: 2, data_center: 3 });
    assert.equal(p.grid_intensity_year, null);
    assert.equal(p.embodied_grid_intensity_g_per_kwh, null);
  }
  finally {
    CHECKED_RELEASES[CO2JS_VERSION] = checked;
  }
});

test('a missing byte value is not modelled, never zero', () => {
  const manifest = example();
  bytesOf(manifest)[0].value = null;
  addModelledEmissions(manifest);
  const [first] = modelledOf(manifest);
  assert.equal(first.value, null);
  assert.equal(first.method, 'Not modelled: browser.transfer_bytes has no value.');
  assert.equal(validate('quality-evidence', manifest).valid, true);
});

test('a manifest without transfer bytes is left as it was; a second pass is refused', () => {
  const manifest = example();
  manifest.measurements = manifest.measurements.filter((m) => m.name !== 'browser.transfer_bytes');
  const copy = JSON.parse(JSON.stringify(manifest));
  assert.deepEqual(addModelledEmissions(manifest), copy);
  const twice = addModelledEmissions(example());
  assert.throws(() => addModelledEmissions(twice), /already has browser.co2e_modelled/);
});
