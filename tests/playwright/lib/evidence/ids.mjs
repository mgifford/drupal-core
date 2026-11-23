/**
 * Identifiers for evidence records (schemas/quality-evidence.schema.json).
 *
 * Every id is random and local to this project. None of them is an
 * OpenTelemetry id: trace and span ids only ever come from the server's
 * `traceresponse` header (see trace-context.mjs).
 */
import { randomBytes } from 'node:crypto';

const PREFIXES = ['att', 'act', 'req', 'fnd', 'msr', 'art'];

/** Returns a new id such as "req-1a2b3c4d5e6f" for one of PREFIXES. */
export function newId(prefix) {
  if (!PREFIXES.includes(prefix)) {
    throw new Error(`unknown id prefix: ${prefix}`);
  }
  return `${prefix}-${randomBytes(6).toString('hex')}`;
}

/** Returns a run id that sorts by start time, e.g. run-20261123T141500Z-0a1b2c3d. */
export function newRunId(date = new Date()) {
  const stamp = date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  return `run-${stamp}-${randomBytes(4).toString('hex')}`;
}

/** Scenario ids are chosen by the test author: lowercase words and hyphens. */
export function assertScenarioId(id) {
  if (!/^[a-z0-9][a-z0-9-]{1,63}$/.test(id)) {
    throw new Error(`invalid scenario id: ${id}`);
  }
  return id;
}
