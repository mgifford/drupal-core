#!/usr/bin/env node
/**
 * Merge virtual SR crawl shards into a single report.
 *
 * Usage:
 *   node merge-results.js
 *
 * Reads all virtual-sr-*.json files from reports/.tmp-crawl/ and writes
 * a merged JSON report and a human-readable Markdown report.
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

// ── JSON report ──────────────────────────────────────────────────────────────

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

fs.mkdirSync(REPORTS_DIR, { recursive: true });
const date = new Date().toISOString().split('T')[0];
fs.writeFileSync(path.join(REPORTS_DIR, 'virtual-sr-results.json'), JSON.stringify(report, null, 2));
fs.writeFileSync(path.join(REPORTS_DIR, `virtual-sr-results-${date}.json`), JSON.stringify(report, null, 2));

console.log(`\nWrote reports/virtual-sr-results.json`);

// ── Markdown report ──────────────────────────────────────────────────────────

const lines = [];
lines.push('# Virtual Screen Reader Accessibility Report');
lines.push('');
lines.push(`**Date:** ${date}`);
lines.push(`**Pages scanned:** ${allRecords.length}`);
lines.push(`**Themes:** ${themes.join(', ')}`);
lines.push('');
lines.push('## Summary');
lines.push('');
lines.push('| Category | Count |');
lines.push('| :--- | ---: |');
lines.push(`| Confirmed barriers (both tools) | ${confirmedCount} |`);
lines.push(`| Axe-only findings (visual/structural) | ${axeOnlyCount} |`);
lines.push(`| SR-only findings (semantic) | ${srOnlyCount} |`);
lines.push('');

// SR-only findings detail
const srOnlyFindings = [];
for (const r of allRecords) {
  for (const f of (r.crossRef?.virtualSROnly ?? [])) {
    srOnlyFindings.push({ theme: r.theme, page: r.page, ...f });
  }
}

if (srOnlyFindings.length > 0) {
  lines.push('## SR-Only Findings (semantic issues axe misses)');
  lines.push('');
  lines.push('These issues were detected by the virtual screen reader but not by axe-core.');
  lines.push('They indicate problems with the accessibility tree that automated WCAG checks miss.');
  lines.push('');
  lines.push('| Theme | Page | Rule | Severity | Description |');
  lines.push('| :--- | :--- | :--- | :--- | :--- |');
  for (const f of srOnlyFindings) {
    lines.push(`| ${f.theme} | ${f.page} | ${f.rule} | ${f.severity} | ${f.description} |`);
  }
  lines.push('');
}

// Axe-only findings detail
const axeOnlyFindings = [];
for (const r of allRecords) {
  for (const f of (r.crossRef?.axeOnly ?? [])) {
    axeOnlyFindings.push({ theme: r.theme, page: r.page, ...f });
  }
}

if (axeOnlyFindings.length > 0) {
  lines.push('## Axe-Only Findings (visual/structural)');
  lines.push('');
  lines.push('These issues were detected by axe-core but the accessibility tree is correct.');
  lines.push('They typically require CSS or HTML fixes.');
  lines.push('');
  lines.push('| Theme | Page | Rule | Description |');
  lines.push('| :--- | :--- | :--- | :--- |');
  for (const f of axeOnlyFindings) {
    lines.push(`| ${f.theme} | ${f.page} | ${f.rule} | ${f.description} |`);
  }
  lines.push('');
}

// Per-theme breakdown
lines.push('## Per-Theme Breakdown');
lines.push('');
for (const theme of themes) {
  const themeRecords = allRecords.filter(r => r.theme === theme);
  const themeConfirmed = themeRecords.reduce((s, r) => s + (r.crossRef?.confirmed?.length ?? 0), 0);
  const themeAxeOnly = themeRecords.reduce((s, r) => s + (r.crossRef?.axeOnly?.length ?? 0), 0);
  const themeSROnly = themeRecords.reduce((s, r) => s + (r.crossRef?.virtualSROnly?.length ?? 0), 0);
  lines.push(`### ${theme}`);
  lines.push('');
  lines.push(`- **Records:** ${themeRecords.length}`);
  lines.push(`- **Confirmed:** ${themeConfirmed}`);
  lines.push(`- **Axe-only:** ${themeAxeOnly}`);
  lines.push(`- **SR-only:** ${themeSROnly}`);
  lines.push('');
}

// Reference
lines.push('---');
lines.push('');
lines.push('## Cross-Reference Legend');
lines.push('');
lines.push('| Scenario | Meaning | Action |');
lines.push('| :--- | :--- | :--- |');
lines.push('| Both tools flag | Confirmed barrier | Fix it |');
lines.push('| Axe only | Visual/structural issue | CSS or HTML fix |');
lines.push('| Virtual SR only | Semantic issue | Accessibility tree fix |');
lines.push('| Neither flag | Likely OK | No action needed |');
lines.push('');

fs.writeFileSync(path.join(REPORTS_DIR, `VIRTUAL-SR-REPORT-${date}.md`), lines.join('\n'));
fs.writeFileSync(path.join(REPORTS_DIR, 'VIRTUAL-SR-REPORT-latest.md'), lines.join('\n'));

console.log(`Wrote reports/VIRTUAL-SR-REPORT-${date}.md`);
console.log(`Wrote reports/VIRTUAL-SR-REPORT-latest.md`);
