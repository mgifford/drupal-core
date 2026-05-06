#!/usr/bin/env node
/**
 * Per-theme accessibility reports
 *
 * Generates one Markdown + HTML report per theme group:
 *   - admin (Gin)
 *   - claro + claro-dark
 *   - olivero + olivero-dark
 *
 * Each report contains:
 *   - Summary table by rule (impact, unique pages, total nodes)
 *   - Per-rule detail section with selectors, HTML snippets, affected paths
 *   - Composite priority score (impactWeight × log₂(1 + pageCount))
 *   - Drupal issue queue search links
 *
 * Usage: node generate-theme-reports.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { loadAxeResults } = require('./lib/axe-results-store');
const { renderMarkdownReport } = require('./lib/render-markdown-report');

// ── Config ───────────────────────────────────────────────────────────────────
const REPORTS_DIR = path.resolve(__dirname, '../../../..', 'reports');
const THEMES_DIR = path.join(REPORTS_DIR, 'themes');
const INPUT_FILE = path.join(REPORTS_DIR, 'axe-results.json');

const IMPACT_WEIGHT = { critical: 4, serious: 3, moderate: 2, minor: 1 };
const IMPACT_LABEL = { critical: '🔴 Critical', serious: '🟠 Serious', moderate: '🟡 Moderate', minor: '🔵 Minor' };
const AXE_DOC_BASE = 'https://dequeuniversity.com/rules/axe/4.11';
const WCAG_MAP = {
  'color-contrast':                      { sc: '1.4.3', name: 'Contrast (Minimum)', level: 'AA' },
  'color-contrast-enhanced':             { sc: '1.4.6', name: 'Contrast (Enhanced)', level: 'AAA' },
  'label':                               { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
  'label-title-only':                    { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
  'heading-order':                       { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
  'empty-heading':                       { sc: '2.4.6', name: 'Headings and Labels', level: 'AA' },
  'page-has-heading-one':                { sc: '2.4.6', name: 'Headings and Labels', level: 'AA' },
  'empty-table-header':                  { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
  'region':                              { sc: '1.3.6', name: 'Identify Purpose', level: 'AAA' },
  'landmark-contentinfo-is-top-level':   { sc: '1.3.6', name: 'Identify Purpose', level: 'AAA' },
  'landmark-no-duplicate-contentinfo':   { sc: '1.3.6', name: 'Identify Purpose', level: 'AAA' },
  'landmark-unique':                     { sc: '1.3.6', name: 'Identify Purpose', level: 'AAA' },
  'summary-name':                        { sc: '4.1.2', name: 'Name, Role, Value', level: 'A' },
  'tabindex':                            { sc: '2.1.1', name: 'Keyboard', level: 'A' },
};

// Theme groups: each group gets its own report.
const THEME_GROUPS = [
  {
    id: 'admin',
    label: 'Admin / Gin',
    themes: ['admin'],
    description: 'The **Gin administration theme** (`admin`) — a contributed theme for Drupal that replaces the default toolbar and admin UI. Issues here should be reported to the [Gin project issue queue](https://www.drupal.org/project/issues/gin?status[]=Open&issue_tags=Accessibility).',
    issueQueue: 'https://www.drupal.org/project/issues/gin?status[]=Open&issue_tags=Accessibility',
    issueQueueLabel: 'Gin project issue queue',
  },
  {
    id: 'claro',
    label: 'Claro',
    themes: ['claro', 'claro-dark'],
    description: 'The **Claro administration theme** (`claro`, `claro-dark`) — ships with Drupal core as the default administration theme. Issues should be reported to the [Drupal core Accessibility queue](https://www.drupal.org/project/issues/search?text=claro&projects=drupal&status[]=Open&issue_tags=Accessibility).',
    issueQueue: 'https://www.drupal.org/project/issues/search?text=claro&projects=drupal&status[]=Open&issue_tags=Accessibility',
    issueQueueLabel: 'Drupal core issue queue (Claro + Accessibility)',
  },
  {
    id: 'olivero',
    label: 'Olivero',
    themes: ['olivero', 'olivero-dark'],
    description: 'The **Olivero front-end theme** (`olivero`, `olivero-dark`) — ships with Drupal core as the default public-facing theme. Issues should be reported to the [Drupal core Accessibility queue](https://www.drupal.org/project/issues/search?text=olivero&projects=drupal&status[]=Open&issue_tags=Accessibility).',
    issueQueue: 'https://www.drupal.org/project/issues/search?text=olivero&projects=drupal&status[]=Open&issue_tags=Accessibility',
    issueQueueLabel: 'Drupal core issue queue (Olivero + Accessibility)',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function drupalIssueLink(ruleId) {
  return `https://www.drupal.org/project/issues/search?text=${encodeURIComponent(ruleId)}&projects=drupal&status[]=Open&issue_tags=Accessibility`;
}

function pad(n) { return n.toString().padStart(2, '0'); }
const now = new Date();
const DATE_STAMP = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

// ── Load results ──────────────────────────────────────────────────────────────
const rawResults = loadAxeResults(INPUT_FILE);
console.log(`✅ Loaded ${rawResults.length} crawl records`);

if (!fs.existsSync(THEMES_DIR)) fs.mkdirSync(THEMES_DIR, { recursive: true });

// ── Build per-theme-group index ───────────────────────────────────────────────
// For each theme group, collect violations indexed by ruleId → selector → entry

function buildGroupIndex(records, themeSet) {
  // ruleMap: ruleId → { impact, helpUrl, selectors: Map<selector, entry> }
  const ruleMap = new Map();

  for (const record of records) {
    if (!themeSet.has(record.theme)) continue;

    for (const violation of (record.violations || [])) {
      if (!ruleMap.has(violation.id)) {
        ruleMap.set(violation.id, {
          ruleId: violation.id,
          impact: violation.impact,
          helpUrl: violation.helpUrl,
          description: violation.description,
          selectors: new Map(),
        });
      }
      const rule = ruleMap.get(violation.id);
      // Update impact to worst seen (should be consistent but guard anyway)
      if ((IMPACT_WEIGHT[violation.impact] || 0) > (IMPACT_WEIGHT[rule.impact] || 0)) {
        rule.impact = violation.impact;
      }

      for (const node of (violation.nodes || [])) {
        const selector = (node.target || []).join(', ') || node.html?.slice(0, 80) || '(unknown)';

        if (!rule.selectors.has(selector)) {
          rule.selectors.set(selector, {
            selector,
            htmlSnippet: node.html?.slice(0, 300) || '',
            failureSummary: node.failureSummary || '',
            themes: new Set(),
            paths: new Set(),
            contexts: [],   // {theme, path, direction, viewport, accentPreset}
            nodeCount: 0,
          });
        }
        const sel = rule.selectors.get(selector);
        sel.themes.add(record.theme);
        sel.paths.add(record.path);
        sel.nodeCount += 1;
        sel.contexts.push({
          theme: record.theme,
          path: record.path,
          direction: record.direction || 'ltr',
          viewport: record.viewport,
          accentPreset: record.accentPreset || 'default',
          language: record.language || 'en',
        });
        // Keep the first HTML snippet we find
        if (!sel.htmlSnippet && node.html) sel.htmlSnippet = node.html.slice(0, 300);
      }
    }
  }

  return ruleMap;
}

// ── Score and sort helpers ────────────────────────────────────────────────────
function compositeScore(impact, pageCount) {
  const w = IMPACT_WEIGHT[impact] || 1;
  return parseFloat((w * Math.log2(1 + pageCount)).toFixed(3));
}

function sortedRules(ruleMap) {
  return [...ruleMap.values()].map((rule) => {
    const allPaths = new Set([...rule.selectors.values()].flatMap((s) => [...s.paths]));
    const totalNodes = [...rule.selectors.values()].reduce((n, s) => n + s.nodeCount, 0);
    const score = compositeScore(rule.impact, allPaths.size);
    return { ...rule, uniquePathCount: allPaths.size, totalNodes, compositeScore: score };
  }).sort((a, b) => b.compositeScore - a.compositeScore || b.totalNodes - a.totalNodes);
}

// ── Markdown generation ───────────────────────────────────────────────────────
function generateMarkdown(group, rules, totalRecords) {
  const lines = [];
  const dateStr = new Date().toLocaleDateString('en-CA');

  lines.push(`# Accessibility Report: ${group.label} Theme`);
  lines.push('');
  lines.push(`Generated: ${dateStr}  `);
  lines.push(`Crawl records for this theme group: **${totalRecords}**`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(`## About ${group.label}`);
  lines.push('');
  lines.push(group.description);
  lines.push('');
  lines.push(`**Issue queue:** [${group.issueQueueLabel}](${group.issueQueue})`);
  lines.push('');
  lines.push('---');
  lines.push('');

  if (rules.length === 0) {
    lines.push('_No violations found for this theme group._');
    return lines.join('\n');
  }

  // Summary table
  lines.push('## Summary by Rule');
  lines.push('');
  lines.push('Composite score = `impactWeight × log₂(1 + uniquePageCount)`. Higher = higher priority.');
  lines.push('');
  lines.push('| Rank | Score | Rule | Impact | WCAG | Unique pages | Total nodes | Selectors |');
  lines.push('|------|-------|------|--------|------|-------------|-------------|-----------|');
  rules.forEach((rule, i) => {
    const wcag = WCAG_MAP[rule.ruleId];
    const wcagStr = wcag ? `${wcag.sc} (${wcag.level})` : '—';
    const selectorCount = rule.selectors.size;
    lines.push(`| ${i + 1} | ${rule.compositeScore} | [\`${rule.ruleId}\`](${rule.helpUrl || AXE_DOC_BASE + '/' + rule.ruleId}) | ${IMPACT_LABEL[rule.impact] || rule.impact} | ${wcagStr} | ${rule.uniquePathCount} | ${rule.totalNodes} | ${selectorCount} |`);
  });
  lines.push('');

  // TOC for rule sections
  lines.push('---');
  lines.push('');
  lines.push('## Rule Details');
  lines.push('');
  lines.push(rules.map((r, i) => `${i + 1}. [\`${r.ruleId}\`](#rule-${r.ruleId.replace(/[^a-z0-9]/g, '-')})`).join('  \n'));
  lines.push('');

  // Per-rule detail sections
  for (const rule of rules) {
    const wcag = WCAG_MAP[rule.ruleId];
    const anchor = `rule-${rule.ruleId.replace(/[^a-z0-9]/g, '-')}`;
    lines.push('---');
    lines.push('');
    lines.push(`### \`${rule.ruleId}\` {#${anchor}}`);
    lines.push('');
    lines.push(`**Impact:** ${IMPACT_LABEL[rule.impact] || rule.impact}  `);
    if (wcag) lines.push(`**WCAG:** ${wcag.sc} — ${wcag.name} (Level ${wcag.level})  `);
    lines.push(`**Axe docs:** ${rule.helpUrl || AXE_DOC_BASE + '/' + rule.ruleId}  `);
    lines.push(`**Unique pages affected:** ${rule.uniquePathCount}  `);
    lines.push(`**Total violation nodes:** ${rule.totalNodes}  `);
    lines.push(`**Composite score:** ${rule.compositeScore}  `);
    lines.push('');
    if (rule.description) {
      lines.push(`> ${rule.description}`);
      lines.push('');
    }

    // Selector table
    const selectors = [...rule.selectors.values()]
      .sort((a, b) => b.paths.size - a.paths.size || b.nodeCount - a.nodeCount);

    lines.push('#### Failing selectors');
    lines.push('');
    lines.push('| Selector | Themes | Pages affected | Nodes |');
    lines.push('|----------|--------|---------------|-------|');
    for (const sel of selectors) {
      const themeList = [...sel.themes].sort().join(', ');
      lines.push(`| \`${sel.selector.slice(0, 80)}\` | ${themeList} | ${sel.paths.size} | ${sel.nodeCount} |`);
    }
    lines.push('');

    // Details for top selectors (up to 5 with HTML snippet + paths)
    const topSels = selectors.slice(0, 5);
    if (topSels.some((s) => s.htmlSnippet || s.failureSummary)) {
      lines.push('#### Details');
      lines.push('');
      topSels.forEach((sel, si) => {
        lines.push(`**${si + 1}. Selector:** \`${sel.selector.slice(0, 100)}\``);
        lines.push('');
        if (sel.failureSummary) {
          // strip "Fix any of the following:" prefix for readability
          const summary = sel.failureSummary.replace(/^Fix (any|all) of the following:\s*/i, '').trim();
          lines.push(`_${summary}_`);
          lines.push('');
        }
        if (sel.htmlSnippet) {
          lines.push('```html');
          lines.push(sel.htmlSnippet);
          lines.push('```');
          lines.push('');
        }
        // List unique paths (up to 8)
        const paths = [...sel.paths].sort().slice(0, 8);
        lines.push(`Pages: ${paths.map((p) => `\`${p}\``).join(', ')}${sel.paths.size > 8 ? ` +${sel.paths.size - 8} more` : ''}`);
        lines.push('');
      });
    }

    // Issue queue link
    lines.push(`**Search Drupal issue queue:** [${rule.ruleId} + Accessibility](${drupalIssueLink(rule.ruleId)})`);
    lines.push('');
  }

  // Filing guidance
  lines.push('---');
  lines.push('');
  lines.push('## How to File Issues');
  lines.push('');
  lines.push(`When filing accessibility issues for the ${group.label} theme, include:`);
  lines.push('');
  lines.push('1. **The axe rule ID** (e.g. `color-contrast`, `label`)');
  lines.push('2. **The WCAG Success Criterion** — see the Summary table above');
  lines.push('3. **The failing selector** and **HTML snippet** from the Rule Details above');
  lines.push('4. **Which pages are affected** — listed per selector');
  lines.push('5. **Steps to reproduce** — load the page in Drupal, run `axe` in browser DevTools');
  lines.push('');
  lines.push(`File against: [${group.issueQueueLabel}](${group.issueQueue})`);
  lines.push('');
  lines.push('Add the tag `Accessibility` and reference the WCAG criterion in the issue summary.');
  lines.push('');

  return lines.join('\n');
}

// ── Main: generate one report per theme group ─────────────────────────────────
const allThemes = new Set(rawResults.map((r) => r.theme));
console.log('Themes found in data:', [...allThemes].join(', '));

for (const group of THEME_GROUPS) {
  const themeSet = new Set(group.themes);
  const groupRecords = rawResults.filter((r) => themeSet.has(r.theme));

  if (groupRecords.length === 0) {
    console.log(`⚠️  No records found for theme group: ${group.label} (${group.themes.join(', ')})`);
    continue;
  }

  const ruleMap = buildGroupIndex(rawResults, themeSet);
  const rules = sortedRules(ruleMap);
  const markdown = generateMarkdown(group, rules, groupRecords.length);
  const htmlTitle = `Accessibility Report: ${group.label} Theme`;

  // Write dated + latest copies
  const mdLatest = path.join(THEMES_DIR, `${group.id}-latest.md`);
  const mdDated = path.join(THEMES_DIR, `${group.id}-${DATE_STAMP}.md`);
  const htmlLatest = path.join(THEMES_DIR, `${group.id}-latest.html`);
  const htmlDated = path.join(THEMES_DIR, `${group.id}-${DATE_STAMP}.html`);

  fs.writeFileSync(mdLatest, markdown);
  fs.writeFileSync(mdDated, markdown);

  const html = renderMarkdownReport({
    title: htmlTitle,
    markdown,
    sourceLabel: `themes/${group.id}-latest.md`,
  });
  fs.writeFileSync(htmlLatest, html);
  fs.writeFileSync(htmlDated, html);

  console.log(`✅ ${group.label}: ${rules.length} rules, ${groupRecords.length} records → themes/${group.id}-latest.md`);

  // Quick summary to stdout
  const top3 = rules.slice(0, 3);
  top3.forEach((r, i) => {
    console.log(`   ${i + 1}. ${r.ruleId} (${r.impact}) — score ${r.compositeScore} — ${r.uniquePathCount} pages, ${r.totalNodes} nodes`);
  });
}

// Write a JSON index of all theme reports for the landing page
const index = THEME_GROUPS.map((g) => ({
  id: g.id,
  label: g.label,
  themes: g.themes,
  latestMd: `themes/${g.id}-latest.md`,
  latestHtml: `themes/${g.id}-latest.html`,
  datedMd: `themes/${g.id}-${DATE_STAMP}.md`,
  datedHtml: `themes/${g.id}-${DATE_STAMP}.html`,
  issueQueue: g.issueQueue,
}));
fs.writeFileSync(path.join(THEMES_DIR, 'index.json'), JSON.stringify(index, null, 2));
console.log('');
console.log(`📁 All theme reports written to ${THEMES_DIR}/`);
