/**
 * Modelled emissions from transferred bytes, with CO2.js (@tgwf/co2).
 *
 * For each browser.transfer_bytes measurement in a manifest, adds one
 * browser.co2e_modelled measurement for the same scenario attempt. See
 * docs/architecture/SUSTAINABILITY-REPORTING.md, section 1, and owner
 * decisions 1 and 2 there.
 *
 * The result is a model applied to bytes, not a measurement. It is kept
 * apart from energy values and never added to them.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { co2, averageIntensity } from '@tgwf/co2';
import { newId } from './ids.mjs';
import { validate } from './validate.mjs';

export const NAME = 'browser.co2e_modelled';
const MODEL = { model: 'swd', version: 4 };
const PACKAGE = '@tgwf/co2';

/** The version of a package as installed, read from its package.json. */
function installedVersion(name) {
  let dir = path.dirname(fileURLToPath(import.meta.resolve(name)));
  while (dir !== path.dirname(dir)) {
    const file = path.join(dir, 'package.json');
    if (fs.existsSync(file)) {
      const json = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (json.name === name) return json.version;
    }
    dir = path.dirname(dir);
  }
  return null;
}

export const CO2JS_VERSION = installedVersion(PACKAGE);

// Facts about a CO2.js release that its package does not state, checked by
// hand for each pinned version:
// - world_year: the data year of the bundled WORLD average. Read from
//   data/output/average-intensities.json at the co2.js tag v0.19.0
//   ("World", year 2024, 472.94 g/kWh) on 2026-11-25.
// - embodied_g_per_kwh: Sustainable Web Design v4 in CO2.js works out
//   embodied emissions with the model's own global intensity and ignores
//   the gridIntensity option for them (dist/esm/sustainable-web-design-v4.js,
//   embodiedEmissions()).
// An unchecked version records null, and the unit tests fail until it is
// added here.
export const CHECKED_RELEASES = {
  '0.19.0': { world_year: 2024, embodied_g_per_kwh: 494 },
};

/** The settings every modelled value of this run shares. */
export function emissionsParameters(gridIntensity) {
  const facts = CHECKED_RELEASES[CO2JS_VERSION] ?? null;
  return {
    model: MODEL.model,
    model_version: MODEL.version,
    grid_intensity_g_per_kwh: {
      device: gridIntensity.device.value,
      network: gridIntensity.network.value,
      data_center: gridIntensity.dataCenter.value,
    },
    grid_intensity_source: 'CO2.js bundled annual average for WORLD (averageIntensity.data.WORLD), applied to operational energy in all three segments',
    grid_intensity_year: facts?.world_year ?? null,
    embodied_grid_intensity_g_per_kwh: facts?.embodied_g_per_kwh ?? null,
    green_hosting_factor: 0,
  };
}

function coverage(attempt) {
  const requests = attempt?.requests ?? [];
  const unsized = requests.filter((r) => r.transfer_bytes === null || r.transfer_bytes === undefined).length;
  const other = attempt?.other_origin_requests ?? 0;
  return `Bytes from ${requests.length} same-origin request(s); ${unsized} had no size and counted as 0 bytes; ${other} request(s) to other origins are not included.`;
}

/**
 * Adds one browser.co2e_modelled measurement per browser.transfer_bytes
 * measurement. Sets schema_version to 0.2.0, because the new measurements
 * use parameters and inputs. Returns the manifest, which is changed in
 * place and validated.
 */
export function addModelledEmissions(manifest) {
  if ((manifest.measurements ?? []).some((m) => m.name === NAME)) {
    throw new Error(`the manifest already has ${NAME} measurements`);
  }
  const world = averageIntensity.data.WORLD;
  const options = { gridIntensity: { device: world, network: world, dataCenter: world } };
  const model = new co2({ model: MODEL.model, version: MODEL.version });
  const tool = { name: PACKAGE, version: CO2JS_VERSION };
  const attempts = new Map((manifest.scenarios ?? []).flatMap((s) => s.attempts.map((a) => [a.attempt_id, a])));
  const added = [];
  for (const bytes of (manifest.measurements ?? []).filter((m) => m.name === 'browser.transfer_bytes')) {
    const known = Number.isFinite(bytes.value);
    // The trace is run on 0 bytes when the value is missing, only to read
    // the grid intensities, so the parameters are the same for every value.
    const trace = model.perByteTrace(known ? bytes.value : 0, false, options);
    added.push({
      measurement_id: newId('msr'),
      name: NAME,
      value: known ? trace.co2 : null,
      unit: 'g',
      kind: 'emissions-modelled',
      tool,
      measured_at: bytes.measured_at,
      instrumented: bytes.instrumented,
      method: known
        ? `CO2.js perByteTrace() on browser.transfer_bytes: Sustainable Web Design model v4, not green hosted. A model applied to bytes, not a measurement; never added to energy values. ${coverage(attempts.get(bytes.attempt_id))}`
        : 'Not modelled: browser.transfer_bytes has no value.',
      ...(bytes.scenario_id ? { scenario_id: bytes.scenario_id } : {}),
      ...(bytes.attempt_id ? { attempt_id: bytes.attempt_id } : {}),
      parameters: emissionsParameters(trace.variables.gridIntensity),
      inputs: [bytes.measurement_id],
    });
  }
  if (added.length) {
    manifest.schema_version = '0.2.0';
    manifest.measurements.push(...added);
    if (!manifest.tools.some((t) => t.name === tool.name && t.version === tool.version)) {
      manifest.tools.push(tool);
    }
  }
  const { valid, errors } = validate('quality-evidence', manifest);
  if (!valid) {
    throw new Error(`manifest with modelled emissions does not match the schema:\n${errors.join('\n')}`);
  }
  return manifest;
}
