#!/usr/bin/env node
/**
 * Writes the interim sustainability summary for one axe crawl run.
 * See "Interim baseline" in docs/architecture/SUSTAINABILITY-REPORTING.md.
 *
 *   sustainability-summary.mjs <run dir> --out <path without extension> --title <text>
 *
 * Writes <out>.html and <out>.json. Exit codes: 0 written, 1 the run cannot
 * be summarized, 2 usage error.
 */
import fs from 'node:fs';
import path from 'node:path';
import { summarize, renderHtml } from '../lib/evidence/sustainability-summary.mjs';

const args = process.argv.slice(2);
const runDir = args[0];
const option = (name) => {
  const i = args.indexOf(name);
  return i > 0 ? args[i + 1] : undefined;
};
const out = option('--out');
const title = option('--title');
if (!runDir || !out || !title) {
  console.error('Usage: sustainability-summary.mjs <run dir> --out <path without extension> --title <text>');
  process.exit(2);
}

try {
  const manifest = JSON.parse(fs.readFileSync(path.join(runDir, 'manifest.json'), 'utf8'));
  const scenarioDir = path.join(runDir, 'scenarios');
  const records = fs.readdirSync(scenarioDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(scenarioDir, f), 'utf8')));
  const summary = summarize(manifest, records);
  const html = renderHtml(summary, {
    title,
    archiveHref: 'sustainability-report-latest.html',
    indexHref: 'index.html',
  });
  fs.writeFileSync(`${out}.json`, `${JSON.stringify(summary, null, 2)}\n`);
  fs.writeFileSync(`${out}.html`, html);
  console.log(`Wrote ${out}.html and ${out}.json (${summary.pages.length} pages).`);
} catch (error) {
  console.error(`sustainability-summary: ${error.message}`);
  process.exit(1);
}
