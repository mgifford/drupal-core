#!/usr/bin/env node
/**
 * Merge virtual SR crawl shards into a single report.
 *
 * Usage:
 *   node merge-results.js
 *
 * Reads all virtual-sr-*.json files from reports/.tmp-crawl/ and writes
 * a merged report to reports/virtual-sr-results.json and a dated copy.
 */
const fs = require('fs');
const path = require('path');

const CRAWL_DIR = path.resolve(__dirname, '../../../reports/.tmp-crawl');
const REPORTS_DIR = path.resolve(__dirname, '../../../reports');

const files = fs.readdirSync(CRAWL_DIR)
  .filter(f => f.startsWith('virtual-sr-') && f.endsWith('.json'))
  .sort();

if (files.length === 0) {
  console.log('No virtual SR shards found in', CRAWL_DIR);
  process.exit(0);
}

const allRecords = [];
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(CRAWL_DIR, file), 'utf8'));
  allRecords.push(...data);
  console.log(`  ${file}: ${data.length} records`);
}

// Summary
const themes = [...new Set(allRecords.map(r => r.theme))];
const confirmedCount = allRecords.reduce((sum, r) => sum + (r.crossRef?.confirmed?.length ?? 0), 0);
const axeOnlyCount = allRecords.reduce((sum, r) => sum + (r.crossRef?.axeOnly?.length ?? 0), 0);
const srOnlyCount = allRecords.reduce((sum, r) => sum + (r.crossRef?.virtualSROnly?.length ?? 0), 0);

console.log(`\nMerged ${allRecords.length} records across themes: ${themes.join(', ')}`);
console.log(`  Confirmed barriers: ${confirmedCount}`);
console.log(`  Axe-only findings: ${axeOnlyCount}`);
console.log(`  SR-only findings: ${srOnlyCount}`);

const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalRecords: allRecords.length,
    themes,
    confirmedBarriers: confirmedCount,
    axeOnlyFindings: axeOnlyCount,
    virtualSROnlyFindings: srOnlyCount,
  },
  records: allRecords,
};

// Write latest
fs.mkdirSync(REPORTS_DIR, { recursive: true });
fs.writeFileSync(path.join(REPORTS_DIR, 'virtual-sr-results.json'), JSON.stringify(report, null, 2));

// Write dated
const date = new Date().toISOString().split('T')[0];
fs.writeFileSync(path.join(REPORTS_DIR, `virtual-sr-results-${date}.json`), JSON.stringify(report, null, 2));

console.log(`\nWrote reports/virtual-sr-results.json`);
console.log(`Wrote reports/virtual-sr-results-${date}.json`);
