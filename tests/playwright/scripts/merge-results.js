#!/usr/bin/env node
/**
 * Merge virtual SR crawl shards into a structured accessibility report.
 *
 * Follows ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES:
 * https://mgifford.github.io/ACCESSIBILITY.md/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.html
 *
 * Usage:
 *   node merge-results.js
 *
 * Reads all virtual-sr-*.json files from reports/.tmp-crawl/ and writes:
 *   - reports/virtual-sr-results.json (full structured data)
 *   - reports/VIRTUAL-SR-REPORT-latest.md (human-readable)
 *   - reports/bugs-virtual-sr.json (deduplicated bug reports)
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const CRAWL_DIR = path.resolve(__dirname, '../../../reports/.tmp-crawl');
const REPORTS_DIR = path.resolve(__dirname, '../../../reports');
const PREFIX = 'VSR';
const MOBILE_BREAKPOINT = 768;

// ── WCAG mapping for virtual SR rules ────────────────────────────────────────

const WCAG_MAP = {
  'empty-link':      { sc: '4.1.2', name: 'Name, Role, Value', level: 'A' },
  'empty-button':    { sc: '4.1.2', name: 'Name, Role, Value', level: 'A' },
  'image-no-alt':    { sc: '1.1.1', name: 'Non-text Content', level: 'A' },
  'heading-skip':    { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
  'missing-main':    { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
  'missing-nav':     { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
  'input-no-label':  { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
};

const SEVERITY_MAP = {
  critical: 'critical',
  serious: 'high',
  moderate: 'medium',
  minor: 'low',
};

// ── ID generation ────────────────────────────────────────────────────────────

function detectScreenType(viewport) {
  return viewport && viewport.width < MOBILE_BREAKPOINT ? 'mobile' : 'desktop';
}

function generateId(inputs, prefix) {
  const hash = crypto.createHash('sha256').update(inputs).digest('hex').slice(0, 8);
  return `${prefix}-${hash}`;
}

// ── Load shards ──────────────────────────────────────────────────────────────

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

// ── Build deduplicated bug reports ───────────────────────────────────────────

const bugs = new Map(); // key → bug object

function addBug(bug) {
  const key = `${bug.rule_id}|${bug.xpath}|${bug.screen_type}|${bug.color_mode}`;
  if (bugs.has(key)) {
    const existing = bugs.get(key);
    existing.frequency.instances_on_page += 1;
    if (!existing.affected_pages.includes(bug.page)) {
      existing.affected_pages.push(bug.page);
      existing.frequency.pages_affected = existing.affected_pages.length;
    }
    if (!existing.affected_themes.includes(bug.theme)) {
      existing.affected_themes.push(bug.theme);
    }
    existing.urls.push(bug.url);
  } else {
    bugs.set(key, bug);
  }
}

for (const record of allRecords) {
  const screenType = detectScreenType(record.viewport);
  const pagePath = record.path;
  const baseUrl = process.env.DRUPAL_BASE_URL || 'https://drupal-core.ddev.site';

  // SR-only findings
  for (const f of (record.crossRef?.virtualSROnly ?? [])) {
    const wcag = WCAG_MAP[f.rule] || { sc: 'unknown', name: 'Unknown', level: 'A' };
    const selector = `[data-vsr-rule="${f.rule}"]`;
    const instanceId = generateId(`${pagePath}|${selector}|${f.rule}|${screenType}`, PREFIX);
    const patternId = generateId(`${selector}|${f.rule}|${screenType}`, PREFIX);

    addBug({
      instance_id: instanceId,
      pattern_id: patternId,
      rule_id: f.rule,
      tool: 'Guidepup Virtual Screen Reader',
      wcag_sc: wcag.sc,
      wcag_level: wcag.level,
      wcag_name: wcag.name,
      severity: SEVERITY_MAP[f.severity] || f.severity,
      summary: `${f.rule} — ${f.description} (WCAG ${wcag.sc})`,
      description: f.description,
      impact: ['blind', 'low-vision'],
      screen_type: screenType,
      color_mode: record.colorScheme,
      url: `${baseUrl}${record.path}`,
      xpath: `//${f.rule}`,
      xpath_full: `//body`,
      html_snippet: `<!-- ${f.rule}: ${f.description} -->`,
      theme: record.theme,
      page: record.page,
      page_path: record.path,
      viewport: `${record.viewport.width}x${record.viewport.height}`,
      frequency: { instances_on_page: 1, pages_affected: 1, total_pages_scanned: allRecords.length },
      affected_themes: [record.theme],
      affected_pages: [record.page],
      urls: [`${baseUrl}${record.path}`],
      environment: {
        browser: 'Chromium (Playwright)',
        os: process.platform,
        screen_reader: 'Guidepup Virtual SR (simulated)',
        tool_version: '@guidepup/virtual-screen-reader',
      },
      steps_to_reproduce: [
        `Navigate to ${baseUrl}${record.path}`,
        'Run virtual screen reader audit',
        `Observe: ${f.description}`,
      ],
    });
  }

  // Confirmed findings (both tools)
  for (const f of (record.crossRef?.confirmed ?? [])) {
    const wcag = WCAG_MAP[f.rule] || { sc: 'unknown', name: 'Unknown', level: 'A' };
    const axeRule = f.axeRule || f.rule;
    const selector = `[data-confirmed="${f.rule}"]`;
    const instanceId = generateId(`${pagePath}|${selector}|${axeRule}|${screenType}`, PREFIX);
    const patternId = generateId(`${selector}|${axeRule}|${screenType}`, PREFIX);

    addBug({
      instance_id: instanceId,
      pattern_id: patternId,
      rule_id: axeRule,
      tool: 'axe-core + Guidepup Virtual SR (confirmed)',
      wcag_sc: wcag.sc,
      wcag_level: wcag.level,
      wcag_name: wcag.name,
      severity: SEVERITY_MAP[f.severity] || 'medium',
      summary: `[CONFIRMED] ${f.rule} — ${f.description} (WCAG ${wcag.sc})`,
      description: `${f.description}. Confirmed by both axe-core and virtual screen reader.`,
      impact: ['blind', 'low-vision', 'motor'],
      screen_type: screenType,
      color_mode: record.colorScheme,
      url: `${baseUrl}${record.path}`,
      xpath: `//${f.rule}`,
      xpath_full: `//body`,
      html_snippet: `<!-- ${f.rule}: confirmed by both tools -->`,
      theme: record.theme,
      page: record.page,
      page_path: record.path,
      viewport: `${record.viewport.width}x${record.viewport.height}`,
      frequency: { instances_on_page: 1, pages_affected: 1, total_pages_scanned: allRecords.length },
      affected_themes: [record.theme],
      affected_pages: [record.page],
      urls: [`${baseUrl}${record.path}`],
      environment: {
        browser: 'Chromium (Playwright)',
        os: process.platform,
        screen_reader: 'Guidepup Virtual SR (simulated)',
        tool_version: '@guidepup/virtual-screen-reader + @axe-core/playwright',
      },
      steps_to_reproduce: [
        `Navigate to ${baseUrl}${record.path}`,
        'Run axe-core WCAG 2.2 audit',
        'Run virtual screen reader audit',
        `Both tools flag: ${f.description}`,
      ],
    });
  }
}

const bugArray = [...bugs.values()];

console.log(`\nDeduplicated to ${bugArray.length} unique bugs`);

// ── Write bugs JSON ──────────────────────────────────────────────────────────

fs.mkdirSync(REPORTS_DIR, { recursive: true });
const date = new Date().toISOString().split('T')[0];

const bugsReport = {
  timestamp: new Date().toISOString(),
  tool: 'Guidepup Virtual Screen Reader + axe-core',
  summary: {
    total_records: allRecords.length,
    total_unique_bugs: bugArray.length,
    themes: [...new Set(allRecords.map(r => r.theme))],
    confirmed_bugs: bugArray.filter(b => b.summary.startsWith('[CONFIRMED]')).length,
    sr_only_bugs: bugArray.filter(b => !b.summary.startsWith('[CONFIRMED]')).length,
  },
  bugs: bugArray,
};

fs.writeFileSync(path.join(REPORTS_DIR, 'bugs-virtual-sr.json'), JSON.stringify(bugsReport, null, 2));
fs.writeFileSync(path.join(REPORTS_DIR, `bugs-virtual-sr-${date}.json`), JSON.stringify(bugsReport, null, 2));
console.log(`Wrote reports/bugs-virtual-sr.json`);

// ── Write full results JSON ──────────────────────────────────────────────────

const fullReport = {
  timestamp: new Date().toISOString(),
  summary: {
    totalRecords: allRecords.length,
    themes: [...new Set(allRecords.map(r => r.theme))],
    confirmedBarriers: allRecords.reduce((s, r) => s + (r.crossRef?.confirmed?.length ?? 0), 0),
    axeOnlyFindings: allRecords.reduce((s, r) => s + (r.crossRef?.axeOnly?.length ?? 0), 0),
    virtualSROnlyFindings: allRecords.reduce((s, r) => s + (r.crossRef?.virtualSROnly?.length ?? 0), 0),
  },
  records: allRecords,
};

fs.writeFileSync(path.join(REPORTS_DIR, 'virtual-sr-results.json'), JSON.stringify(fullReport, null, 2));
fs.writeFileSync(path.join(REPORTS_DIR, `virtual-sr-results-${date}.json`), JSON.stringify(fullReport, null, 2));

// ── Markdown report ──────────────────────────────────────────────────────────

const lines = [];
lines.push('# Virtual Screen Reader Accessibility Report');
lines.push('');
lines.push(`**Date:** ${date}`);
lines.push(`**Tool:** Guidepup Virtual Screen Reader + axe-core`);
lines.push(`**Pages scanned:** ${allRecords.length}`);
lines.push(`**Themes:** ${bugsReport.summary.themes.join(', ')}`);
lines.push(`**Unique bugs:** ${bugArray.length}`);
lines.push('');
lines.push('## Summary');
lines.push('');
lines.push('| Category | Count |');
lines.push('| :--- | ---: |');
lines.push(`| Confirmed barriers (both tools) | ${bugsReport.summary.confirmed_bugs} |`);
lines.push(`| SR-only findings (semantic) | ${bugsReport.summary.sr_only_bugs} |`);
lines.push('');

// Bug reports
if (bugArray.length > 0) {
  lines.push('## Bug Reports');
  lines.push('');
  lines.push('Each bug follows the [Accessibility Bug Reporting Best Practices](https://mgifford.github.io/ACCESSIBILITY.md/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.html).');
  lines.push('');

  for (const bug of bugArray) {
    lines.push(`### ${bug.summary}`);
    lines.push('');
    lines.push(`| Field | Value |`);
    lines.push(`| :--- | :--- |`);
    lines.push(`| **Bug ID** | \`${bug.instance_id}\` (instance) / \`${bug.pattern_id}\` (pattern) |`);
    lines.push(`| **URL** | ${bug.url} |`);
    lines.push(`| **XPath** | \`${bug.xpath}\` |`);
    lines.push(`| **WCAG SC** | ${bug.wcag_sc} — ${bug.wcag_name} (Level ${bug.wcag_level}) |`);
    lines.push(`| **Rule** | ${bug.rule_id} — ${bug.tool} |`);
    lines.push(`| **Severity** | ${bug.severity} |`);
    lines.push(`| **Frequency** | ${bug.frequency.instances_on_page} instance(s) on ${bug.frequency.pages_affected} page(s) |`);
    lines.push(`| **Screen type** | ${bug.screen_type} |`);
    lines.push(`| **Colour mode** | ${bug.color_mode} |`);
    lines.push(`| **Themes** | ${bug.affected_themes.join(', ')} |`);
    lines.push('');
    lines.push('**Description:**');
    lines.push(bug.description);
    lines.push('');
    if (bug.steps_to_reproduce?.length) {
      lines.push('**Steps to Reproduce:**');
      bug.steps_to_reproduce.forEach((s, i) => lines.push(`${i + 1}. ${s}`));
      lines.push('');
    }
    lines.push('**Testing Environment:**');
    lines.push('');
    lines.push('| Item | Value |');
    lines.push('| :--- | :--- |');
    lines.push(`| Browser | ${bug.environment.browser} |`);
    lines.push(`| OS | ${bug.environment.os} |`);
    lines.push(`| Screen reader | ${bug.environment.screen_reader} |`);
    lines.push(`| Tool | ${bug.environment.tool_version} |`);
    lines.push('');
    lines.push('---');
    lines.push('');
  }
}

// Per-theme breakdown
lines.push('## Per-Theme Breakdown');
lines.push('');
for (const theme of bugsReport.summary.themes) {
  const themeBugs = bugArray.filter(b => b.affected_themes.includes(theme));
  const themeRecords = allRecords.filter(r => r.theme === theme);
  lines.push(`### ${theme}`);
  lines.push('');
  lines.push(`- **Records:** ${themeRecords.length}`);
  lines.push(`- **Unique bugs:** ${themeBugs.length}`);
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
