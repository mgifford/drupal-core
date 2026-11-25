#!/usr/bin/env node
/**
 * Records the axe crawl baseline from one complete crawl run.
 *
 *   node tests/playwright/scripts/crawl-baseline.mjs <run dir>
 *
 * Reads <run dir>/crawl-coverage.json and <run dir>/run-info.json, both
 * written by `npm --prefix tests/playwright run test:crawl`, and writes
 * tests/playwright/baselines/axe/crawl-<profile>.json. Refuses a run in
 * which any planned page was not scanned. Review the diff before committing.
 *
 * Exit codes: 0 written, 1 refused or unreadable input, 2 usage error.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { baselineFileName, baselineFromCoverage } from '../lib/crawl.mjs';

const BASELINE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../baselines/axe');

const [runDir] = process.argv.slice(2);
if (!runDir) {
  console.error('usage: crawl-baseline.mjs <run dir>');
  process.exit(2);
}

try {
  const coverage = JSON.parse(fs.readFileSync(path.join(runDir, 'crawl-coverage.json'), 'utf8'));
  const runInfoFile = path.join(runDir, 'run-info.json');
  const runInfo = fs.existsSync(runInfoFile) ? JSON.parse(fs.readFileSync(runInfoFile, 'utf8')) : null;
  const baseline = baselineFromCoverage(coverage, {
    drupalCommit: runInfo?.source?.resolved_commit ?? null,
    recordedAt: new Date().toISOString(),
  });
  const file = path.join(BASELINE_DIR, baselineFileName(coverage.profile));
  fs.writeFileSync(file, JSON.stringify(baseline, null, 2) + '\n');
  const keys = Object.values(baseline.pages).reduce((sum, page) => sum + page.accepted.length, 0);
  console.log(`Wrote ${path.relative(process.cwd(), file)}: ${Object.keys(baseline.pages).length} pages, ${keys} key(s).`);
  if (runInfo?.source?.dirty) {
    console.log('Note: the tested checkout had uncommitted changes (run-info.json dirty: true).');
  }
  console.log('Review the diff before committing it.');
}
catch (error) {
  console.error(`crawl-baseline: ${error.message}`);
  process.exit(1);
}
