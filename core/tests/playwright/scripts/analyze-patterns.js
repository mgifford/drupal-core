#!/usr/bin/env node
/**
 * Accessibility Pattern Analyzer for Drupal Core
 *
 * Reads reports/axe-results.json and groups violations by:
 *   1. Rule + CSS selector — same violation on N pages = template issue
 *   2. Impact level — Critical/Serious first
 *   3. Likely Twig template — inferred from Drupal CSS class naming conventions
 *
 * Outputs:
 *   reports/pattern-report.json  — structured data for further tooling
 *   reports/PATTERN-REPORT.md    — human-readable prioritized report
 *
 * Usage:
 *   node scripts/analyze-patterns.js
 *   node scripts/analyze-patterns.js --min-pages 2  (only show patterns on ≥2 pages)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.join(__dirname, '../reports');
const INPUT_FILE = path.join(REPORTS_DIR, 'axe-results.json');
const JSON_OUTPUT = path.join(REPORTS_DIR, 'pattern-report.json');
const MD_OUTPUT = path.join(REPORTS_DIR, 'PATTERN-REPORT.md');

const args = process.argv.slice(2);
const minPagesArg = args.indexOf('--min-pages');
const MIN_PAGES = minPagesArg >= 0 ? parseInt(args[minPagesArg + 1], 10) : 1;

const IMPACT_ORDER = { critical: 0, serious: 1, moderate: 2, minor: 3, null: 4 };

// Maps common Drupal CSS class fragments to likely Twig template files.
// Extend this map as you discover new patterns.
const TEMPLATE_HINTS = [
  { pattern: /field--type-([a-z-]+)/, template: 'field.html.twig', hint: 'Field type template' },
  { pattern: /field--name-([a-z-]+)/, template: 'field.html.twig', hint: 'Named field template' },
  { pattern: /node--type-([a-z-]+)/, template: 'node--{type}.html.twig', hint: 'Node type template' },
  { pattern: /\bnode\b/, template: 'node.html.twig', hint: 'Node template' },
  { pattern: /block--([a-z-]+)/, template: 'block--{id}.html.twig', hint: 'Block template' },
  { pattern: /\bblock\b/, template: 'block.html.twig', hint: 'Block template' },
  { pattern: /views-row|views-field|view-content/, template: 'views-view-*.html.twig', hint: 'Views template' },
  { pattern: /\bregion--([a-z-]+)/, template: 'region--{name}.html.twig', hint: 'Region template' },
  { pattern: /\bregion\b/, template: 'region.html.twig', hint: 'Region template' },
  { pattern: /form-item|form-type-|form-wrapper/, template: 'form-element.html.twig', hint: 'Form element template' },
  { pattern: /\bmenu\b/, template: 'menu.html.twig', hint: 'Menu template' },
  { pattern: /breadcrumb/, template: 'breadcrumb.html.twig', hint: 'Breadcrumb template' },
  { pattern: /pager/, template: 'pager.html.twig', hint: 'Pager template' },
  { pattern: /header|site-header/, template: 'page.html.twig', hint: 'Page header region' },
  { pattern: /footer|site-footer/, template: 'page.html.twig', hint: 'Page footer region' },
  { pattern: /layout-container|layout-sidebar/, template: 'page.html.twig', hint: 'Page layout template' },
  { pattern: /admin-toolbar|toolbar/, template: 'toolbar (admin theme)', hint: 'Admin toolbar' },
  { pattern: /claro|olivero/, template: '(theme-specific template)', hint: 'Theme template' },
];

function inferTemplate(selector) {
  const flat = Array.isArray(selector) ? selector.join(' ') : selector;
  for (const { pattern, template, hint } of TEMPLATE_HINTS) {
    if (pattern.test(flat)) {
      return { template, hint };
    }
  }
  return { template: 'unknown', hint: 'Could not infer template from selector' };
}

function selectorKey(node) {
  // Normalize selector arrays to a stable string key.
  return (node.target ?? []).join(' >> ');
}

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ ${INPUT_FILE} not found. Run 'yarn test:a11y:playwright' first.`);
    process.exit(1);
  }

  const rawResults = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));

  // Build a map: ruleId + selectorKey → { pages, impact, nodes, ... }
  const patternMap = new Map();

  for (const pageResult of rawResults) {
    for (const violation of pageResult.violations) {
      for (const node of violation.nodes) {
        const key = `${violation.id}::${selectorKey(node)}`;

        if (!patternMap.has(key)) {
          patternMap.set(key, {
            ruleId: violation.id,
            impact: violation.impact,
            description: violation.description,
            helpUrl: violation.helpUrl,
            selector: node.target,
            selectorKey: selectorKey(node),
            html: node.html,
            failureSummary: node.failureSummary,
            pages: [],
            templateHint: inferTemplate(node.target),
          });
        }

        patternMap.get(key).pages.push({
          name: pageResult.page,
          path: pageResult.path,
        });
      }
    }
  }

  // Convert to array, filter by min-pages, sort by impact then page count.
  const patterns = Array.from(patternMap.values())
    .filter((p) => p.pages.length >= MIN_PAGES)
    .sort((a, b) => {
      const impactDiff = (IMPACT_ORDER[a.impact] ?? 4) - (IMPACT_ORDER[b.impact] ?? 4);
      if (impactDiff !== 0) return impactDiff;
      return b.pages.length - a.pages.length; // More pages = higher priority.
    });

  // Summary stats.
  const summary = {
    totalPages: rawResults.length,
    totalViolations: rawResults.reduce((n, r) => n + r.violations.length, 0),
    uniquePatterns: patterns.length,
    templateLevelPatterns: patterns.filter((p) => p.pages.length >= 3).length,
    byImpact: {
      critical: patterns.filter((p) => p.impact === 'critical').length,
      serious: patterns.filter((p) => p.impact === 'serious').length,
      moderate: patterns.filter((p) => p.impact === 'moderate').length,
      minor: patterns.filter((p) => p.impact === 'minor').length,
    },
  };

  // Write JSON output.
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(JSON_OUTPUT, JSON.stringify({ summary, patterns }, null, 2));
  console.log(`✅ Pattern report written to ${JSON_OUTPUT}`);

  // Write Markdown report.
  const lines = [];
  lines.push('# Drupal Core Accessibility Pattern Report');
  lines.push('');
  lines.push(`> Generated: ${new Date().toISOString()}`);
  lines.push(`> Source: axe-results.json`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`| Metric | Value |`);
  lines.push(`| :--- | :--- |`);
  lines.push(`| Pages crawled | ${summary.totalPages} |`);
  lines.push(`| Total violations | ${summary.totalViolations} |`);
  lines.push(`| Unique patterns | ${summary.uniquePatterns} |`);
  lines.push(`| Template-level patterns (≥3 pages) | ${summary.templateLevelPatterns} |`);
  lines.push(`| Critical | ${summary.byImpact.critical} |`);
  lines.push(`| Serious | ${summary.byImpact.serious} |`);
  lines.push(`| Moderate | ${summary.byImpact.moderate} |`);
  lines.push(`| Minor | ${summary.byImpact.minor} |`);
  lines.push('');
  lines.push('## Patterns (sorted by impact, then page count)');
  lines.push('');
  lines.push('Patterns appearing on ≥3 pages are marked 🔁 — likely a shared Twig template.');
  lines.push('');

  for (const [i, p] of patterns.entries()) {
    const isTemplate = p.pages.length >= 3;
    lines.push(`### ${i + 1}. ${p.ruleId} — ${p.impact ?? 'unknown impact'} ${isTemplate ? '🔁' : ''}`);
    lines.push('');
    lines.push(`**Description:** ${p.description}`);
    lines.push(`**Reference:** ${p.helpUrl}`);
    lines.push(`**Likely template:** ${p.templateHint.template} *(${p.templateHint.hint})*`);
    lines.push(`**Pages affected (${p.pages.length}):** ${p.pages.map((pg) => `\`${pg.path}\``).join(', ')}`);
    lines.push('');
    lines.push('**Selector:**');
    lines.push('```');
    lines.push(p.selectorKey);
    lines.push('```');
    lines.push('');
    lines.push('**HTML:**');
    lines.push('```html');
    lines.push(p.html ?? '');
    lines.push('```');
    lines.push('');
    lines.push('**Failure summary:**');
    lines.push(`> ${(p.failureSummary ?? '').replace(/\n/g, '\n> ')}`);
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  fs.writeFileSync(MD_OUTPUT, lines.join('\n'));
  console.log(`✅ Markdown report written to ${MD_OUTPUT}`);
  console.log('');
  console.log(`📊 Summary:`);
  console.log(`   ${summary.totalPages} pages crawled`);
  console.log(`   ${summary.uniquePatterns} unique patterns found`);
  console.log(`   ${summary.templateLevelPatterns} template-level patterns (≥3 pages)`);
  console.log(`   Critical: ${summary.byImpact.critical} | Serious: ${summary.byImpact.serious} | Moderate: ${summary.byImpact.moderate} | Minor: ${summary.byImpact.minor}`);
}

main();
