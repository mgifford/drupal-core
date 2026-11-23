/**
 * Where a test writes evidence for the current run, and how.
 *
 * `node tests/playwright/scripts/evidence.mjs run` sets EVIDENCE_RUN_ID and
 * EVIDENCE_DIR for every worker, so all attempts of one run share a folder
 * and two runs never share one.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { newRunId } from './ids.mjs';

// No import.meta here: Playwright loads this file as CommonJS from specs.

let fallbackRunId = null;

/**
 * Returns { runId, runDir } for this test process.
 *
 * @param {string} defaultRoot  Evidence folder to use when EVIDENCE_DIR is
 *   not set, normally tests/playwright/reports/evidence.
 */
export function currentRun(defaultRoot) {
  let runId = process.env.EVIDENCE_RUN_ID;
  if (!runId) {
    // Run outside the evidence runner: give this worker its own run.
    fallbackRunId ??= newRunId();
    runId = fallbackRunId;
  }
  const runDir = path.join(process.env.EVIDENCE_DIR ?? defaultRoot, runId);
  return { runId, runDir };
}

/** Writes JSON under the run folder and returns its relative path. */
export function writeRunFile(runDir, relativePath, data) {
  const file = path.join(runDir, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  return relativePath;
}
