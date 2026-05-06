#!/usr/bin/env node
/**
 * RTL + Theme-Specific Accessibility Analysis
 *
 * Identifies:
 *   1. Violations that appear ONLY in RTL/Hebrew contexts (not present in
 *      matching LTR/English contexts for the same path, theme, and rule).
 *   2. Which violations belong exclusively to Admin (Gin) and/or Claro themes
 *      versus being cross-theme.
 *   3. A composite priority score: axe severity × frequency (pages affected)
 *      across all dimensions.
 *
 * Usage: node rtl-theme-analysis.js [--results path/to/axe-results.json]
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { loadAxeResults } = require('./lib/axe-results-store');

// ── Config ───────────────────────────────────────────────────────────────────
const REPORTS_DIR = path.resolve(__dirname, '../../../..', 'reports');
const INPUT_FILE = path.join(REPORTS_DIR, 'axe-results.json');
const OUTPUT_JSON = path.join(REPORTS_DIR, 'rtl-theme-analysis-latest.json');
const OUTPUT_MD = path.join(REPORTS_DIR, 'RTL-THEME-ANALYSIS-latest.md');

const IMPACT_WEIGHT = { critical: 4, serious: 3, moderate: 2, minor: 1 };

// Admin theme = Gin in Drupal, registered as "admin" in test matrix.
// Claro ships in Drupal core with its dark variant.
const ADMIN_THEMES = new Set(['admin']);
const CLARO_THEMES = new Set(['claro', 'claro-dark']);
const OLIVERO_THEMES = new Set(['olivero', 'olivero-dark']);

// ── Load results ─────────────────────────────────────────────────────────────
const rawResults = loadAxeResults(INPUT_FILE);
const totalRecords = rawResults.length;
console.log(`✅ Loaded ${totalRecords} crawl records`);

// ── Build lookup: key → [violation, ...]
// key = `${theme}::${path}::${ruleId}::${selector}::${direction}`
// This lets us compare (same path + same theme + same rule + same selector) across directions.
const violationIndex = new Map(); // keyed by `theme::path::ruleId::selector::direction`
const nodeIndex = new Map();      // keyed by `theme::path::ruleId::selector` → { ltr: [...nodes], rtl: [...nodes] }

for (const record of rawResults) {
  const dir = record.direction || 'ltr';
  const theme = record.theme;
  const pagePath = record.path;

  for (const violation of (record.violations || [])) {
    for (const node of (violation.nodes || [])) {
      const selector = (node.target || []).join(', ') || node.html?.slice(0, 80) || '(unknown)';
      const fullKey = `${theme}::${pagePath}::${violation.id}::${selector}`;
      const dirKey = `${fullKey}::${dir}`;

      if (!violationIndex.has(dirKey)) {
        violationIndex.set(dirKey, { theme, path: pagePath, ruleId: violation.id, impact: violation.impact, selector, dir, nodes: [] });
      }
      violationIndex.get(dirKey).nodes.push(node);

      if (!nodeIndex.has(fullKey)) {
        nodeIndex.set(fullKey, { theme, path: pagePath, ruleId: violation.id, impact: violation.impact, selector, ltr: [], rtl: [] });
      }
      nodeIndex.get(fullKey)[dir].push({ record, node, violation });
    }
  }
}

// ── RTL-Exclusive analysis ───────────────────────────────────────────────────
// An issue is RTL-exclusive when it appears in rtl records but has zero ltr records
// for the same (theme, path, ruleId, selector) combination.
const rtlExclusive = [];
const rtlAmplified = [];  // present in both but worse (more nodes) in rtl

for (const [fullKey, data] of nodeIndex.entries()) {
  const ltrCount = data.ltr.length;
  const rtlCount = data.rtl.length;
  if (rtlCount === 0) continue;

  const representative = data.rtl[0];
  const htmlSnippet = representative.node.html?.slice(0, 200) || '';

  // Collect unique pages for each direction
  const ltrPages = new Set(data.ltr.map((e) => `${e.record.theme}::${e.record.path}::${e.record.accentPreset || 'default'}`));
  const rtlPages = new Set(data.rtl.map((e) => `${e.record.theme}::${e.record.path}::${e.record.accentPreset || 'default'}`));

  const entry = {
    key: fullKey,
    theme: data.theme,
    path: data.path,
    ruleId: data.ruleId,
    impact: data.impact,
    selector: data.selector,
    htmlSnippet,
    ltrNodeInstances: ltrCount,
    rtlNodeInstances: rtlCount,
    ltrPageContexts: ltrPages.size,
    rtlPageContexts: rtlPages.size,
  };

  if (ltrCount === 0) {
    rtlExclusive.push(entry);
  } else if (rtlCount > ltrCount) {
    entry.amplificationRatio = (rtlCount / ltrCount).toFixed(2);
    rtlAmplified.push(entry);
  }
}

// Sort by impact then rtl page count
const sortByImpactFreq = (a, b) => {
  const ia = IMPACT_WEIGHT[a.impact] || 0;
  const ib = IMPACT_WEIGHT[b.impact] || 0;
  if (ib !== ia) return ib - ia;
  return b.rtlPageContexts - a.rtlPageContexts;
};
rtlExclusive.sort(sortByImpactFreq);
rtlAmplified.sort(sortByImpactFreq);

// ── Theme-specific analysis ──────────────────────────────────────────────────
// Build a map: ruleId+selector → { themes seen, nodeCount per theme }
const ruleThemeMap = new Map();

for (const record of rawResults) {
  const theme = record.theme;
  for (const violation of (record.violations || [])) {
    for (const node of (violation.nodes || [])) {
      const selector = (node.target || []).join(', ') || node.html?.slice(0, 80) || '(unknown)';
      const key = `${violation.id}::${selector}`;
      if (!ruleThemeMap.has(key)) {
        ruleThemeMap.set(key, {
          ruleId: violation.id,
          impact: violation.impact,
          selector,
          htmlSnippet: node.html?.slice(0, 200) || '',
          themeNodeCounts: {},
          themePaths: {},
        });
      }
      const entry = ruleThemeMap.get(key);
      entry.themeNodeCounts[theme] = (entry.themeNodeCounts[theme] || 0) + 1;
      if (!entry.themePaths[theme]) entry.themePaths[theme] = new Set();
      entry.themePaths[theme].add(record.path);
    }
  }
}

// Categorise per-entry
const adminOnly = [];
const claroOnly = [];
const adminAndClaro = [];
const notInOlivero = [];
const crossTheme = [];

for (const [, entry] of ruleThemeMap.entries()) {
  const themes = new Set(Object.keys(entry.themeNodeCounts));
  const hasAdmin = [...themes].some((t) => ADMIN_THEMES.has(t));
  const hasClaro = [...themes].some((t) => CLARO_THEMES.has(t));
  const hasOlivero = [...themes].some((t) => OLIVERO_THEMES.has(t));

  // Serialise path sets
  const serialised = {
    ruleId: entry.ruleId,
    impact: entry.impact,
    selector: entry.selector,
    htmlSnippet: entry.htmlSnippet,
    themes: [...themes],
    nodeCountByTheme: entry.themeNodeCounts,
    pathsByTheme: Object.fromEntries(
      Object.entries(entry.themePaths).map(([t, s]) => [t, [...s]])
    ),
  };

  if (hasAdmin && !hasClaro && !hasOlivero) {
    adminOnly.push(serialised);
  } else if (hasClaro && !hasAdmin && !hasOlivero) {
    claroOnly.push(serialised);
  } else if ((hasAdmin || hasClaro) && !hasOlivero) {
    adminAndClaro.push(serialised);
  } else if (hasAdmin || hasClaro) {
    notInOlivero.push({ ...serialised, inOlivero: false });
    crossTheme.push(serialised);
  } else {
    crossTheme.push(serialised);
  }
}

const sortSerialised = (a, b) => {
  const ia = IMPACT_WEIGHT[a.impact] || 0;
  const ib = IMPACT_WEIGHT[b.impact] || 0;
  if (ib !== ia) return ib - ia;
  const countA = Object.values(a.nodeCountByTheme).reduce((s, n) => s + n, 0);
  const countB = Object.values(b.nodeCountByTheme).reduce((s, n) => s + n, 0);
  return countB - countA;
};
adminOnly.sort(sortSerialised);
claroOnly.sort(sortSerialised);
adminAndClaro.sort(sortSerialised);

// ── Composite priority list ──────────────────────────────────────────────────
// Score = impactWeight × log2(1 + uniquePageCount)
// Higher score = higher priority. This combines severity with spread.
const compositeMap = new Map();

for (const record of rawResults) {
  const theme = record.theme;
  const dir = record.direction || 'ltr';

  for (const violation of (record.violations || [])) {
    for (const node of (violation.nodes || [])) {
      const selector = (node.target || []).join(', ') || node.html?.slice(0, 80) || '(unknown)';
      const key = `${violation.id}::${selector}`;

      if (!compositeMap.has(key)) {
        compositeMap.set(key, {
          ruleId: violation.id,
          impact: violation.impact,
          helpUrl: violation.helpUrl,
          selector,
          htmlSnippet: node.html?.slice(0, 200) || '',
          themes: new Set(),
          paths: new Set(),
          ltrPaths: new Set(),
          rtlPaths: new Set(),
          totalNodes: 0,
        });
      }
      const e = compositeMap.get(key);
      e.themes.add(theme);
      e.paths.add(record.path);
      if (dir === 'rtl') e.rtlPaths.add(`${record.theme}::${record.path}`);
      else e.ltrPaths.add(`${record.theme}::${record.path}`);
      e.totalNodes += 1;
    }
  }
}

const priorityList = [];
for (const [, entry] of compositeMap.entries()) {
  const weight = IMPACT_WEIGHT[entry.impact] || 1;
  const pageCount = entry.paths.size;
  const score = weight * Math.log2(1 + pageCount);
  const themes = [...entry.themes];
  const isAdminTheme = themes.some((t) => ADMIN_THEMES.has(t));
  const isClaroTheme = themes.some((t) => CLARO_THEMES.has(t));
  const isOliveroTheme = themes.some((t) => OLIVERO_THEMES.has(t));
  const isRtlExclusiveRule = entry.ltrPaths.size === 0 && entry.rtlPaths.size > 0;
  const isRtlAmplified = entry.rtlPaths.size > entry.ltrPaths.size && entry.ltrPaths.size > 0;

  priorityList.push({
    ruleId: entry.ruleId,
    impact: entry.impact,
    helpUrl: entry.helpUrl,
    selector: entry.selector,
    htmlSnippet: entry.htmlSnippet,
    themes,
    uniquePathCount: pageCount,
    totalNodes: entry.totalNodes,
    compositeScore: parseFloat(score.toFixed(3)),
    isAdminTheme,
    isClaroTheme,
    isOliveroTheme,
    isAdminOrClaroOnly: (isAdminTheme || isClaroTheme) && !isOliveroTheme,
    isRtlExclusive: isRtlExclusiveRule,
    isRtlAmplified,
    rtlContextCount: entry.rtlPaths.size,
    ltrContextCount: entry.ltrPaths.size,
  });
}

priorityList.sort((a, b) => b.compositeScore - a.compositeScore);

// ── Write JSON output ────────────────────────────────────────────────────────
const output = {
  generatedAt: new Date().toISOString(),
  totalRecords,
  rtl: {
    exclusive: rtlExclusive,
    amplified: rtlAmplified,
  },
  themeSpecific: {
    adminOnly,
    claroOnly,
    adminAndClaro,
  },
  priorityList,
};

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(output, null, 2));
console.log(`✅ JSON analysis written to ${OUTPUT_JSON}`);

// ── Write Markdown report ────────────────────────────────────────────────────
const IMPACT_LABEL = { critical: '🔴 Critical', serious: '🟠 Serious', moderate: '🟡 Moderate', minor: '🔵 Minor' };
const WCAG_MAP = {
  'color-contrast': { sc: '1.4.3', name: 'Contrast (Minimum)', level: 'AA' },
  'label': { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
  'label-title-only': { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
  'heading-order': { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
  'region': { sc: '1.3.6', name: 'Identify Purpose', level: 'AAA' },
  'landmark-contentinfo-is-top-level': { sc: '1.3.6', name: 'Identify Purpose', level: 'AAA' },
  'landmark-no-duplicate-contentinfo': { sc: '1.3.6', name: 'Identify Purpose', level: 'AAA' },
  'landmark-unique': { sc: '1.3.6', name: 'Identify Purpose', level: 'AAA' },
  'page-has-heading-one': { sc: '2.4.6', name: 'Headings and Labels', level: 'AA' },
  'empty-heading': { sc: '2.4.6', name: 'Headings and Labels', level: 'AA' },
  'empty-table-header': { sc: '1.3.1', name: 'Info and Relationships', level: 'A' },
  'summary-name': { sc: '4.1.2', name: 'Name, Role, Value', level: 'A' },
  'tabindex': { sc: '2.1.1', name: 'Keyboard', level: 'A' },
};

const drupalIssueSearch = (ruleId, selector) => {
  const terms = encodeURIComponent(`${ruleId} ${selector}`.slice(0, 60));
  return `https://www.drupal.org/project/issues/search?text=${terms}&projects=drupal&status[]=Open&issue_tags=Accessibility`;
};

const lines = [];

lines.push('# RTL / Theme-Specific Accessibility Analysis');
lines.push('');
lines.push(`Generated: ${new Date().toLocaleDateString('en-CA')}  `);
lines.push(`Total crawl records analysed: **${totalRecords}**`);
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Table of Contents');
lines.push('');
lines.push('1. [RTL-Exclusive Issues (Hebrew only, not in English)](#rtl-exclusive-issues)');
lines.push('2. [RTL-Amplified Issues (worse in Hebrew than English)](#rtl-amplified-issues)');
lines.push('3. [Admin (Gin) Theme Only](#admin-gin-theme-only)');
lines.push('4. [Claro / Claro Dark Theme Only](#claro-theme-only)');
lines.push('5. [Admin + Claro (not Olivero)](#admin-and-claro-not-olivero)');
lines.push('6. [Master Priority List (all issues, composite score)](#master-priority-list)');
lines.push('7. [How to Use This Report with the Drupal Issue Queue](#drupal-issue-queue)');
lines.push('');

// ── Section 1: RTL-Exclusive ─────────────────────────────────────────────────
lines.push('---');
lines.push('');
lines.push('## RTL-Exclusive Issues');
lines.push('');
lines.push('These violations appear **only** when Drupal is rendered in Hebrew (RTL). They have zero matching violations in the equivalent English (LTR) page+theme+rule combination. This likely indicates either:');
lines.push('');
lines.push('- An element that only renders in RTL context (e.g. the Hebrew language switcher link)');
lines.push('- A CSS layout or text rendering issue triggered by `dir="rtl"` that changes the computed colour or position enough to fail');
lines.push('');
if (rtlExclusive.length === 0) {
  lines.push('_No purely RTL-exclusive violations found in current dataset._');
} else {
  lines.push(`**${rtlExclusive.length} unique selector/rule combinations found exclusively in RTL contexts.**`);
  lines.push('');
  lines.push('| # | Rule | Impact | Theme | Path | Selector | RTL contexts |');
  lines.push('|---|------|--------|-------|------|----------|-------------|');
  rtlExclusive.forEach((e, i) => {
    const wcag = WCAG_MAP[e.ruleId];
    const wcagStr = wcag ? `WCAG ${wcag.sc} (${wcag.level})` : '';
    lines.push(`| ${i + 1} | [\`${e.ruleId}\`](${`https://dequeuniversity.com/rules/axe/4.11/${e.ruleId}`}) ${wcagStr} | ${IMPACT_LABEL[e.impact] || e.impact} | \`${e.theme}\` | \`${e.path}\` | \`${e.selector.slice(0, 60)}\` | ${e.rtlPageContexts} |`);
  });
  lines.push('');
  lines.push('### RTL-Exclusive Details');
  lines.push('');
  rtlExclusive.forEach((e, i) => {
    const wcag = WCAG_MAP[e.ruleId];
    lines.push(`#### RTL-${i + 1}: \`${e.ruleId}\` on \`${e.path}\``);
    lines.push('');
    lines.push(`- **Impact:** ${IMPACT_LABEL[e.impact] || e.impact}`);
    lines.push(`- **Theme:** \`${e.theme}\``);
    lines.push(`- **Selector:** \`${e.selector}\``);
    if (wcag) lines.push(`- **WCAG:** ${wcag.sc} ${wcag.name} (${wcag.level})`);
    lines.push(`- **Axe docs:** ${`https://dequeuniversity.com/rules/axe/4.11/${e.ruleId}`}`);
    lines.push(`- **RTL contexts affected:** ${e.rtlPageContexts}`);
    lines.push(`- **LTR contexts affected:** ${e.ltrNodeInstances} (zero)`);
    if (e.htmlSnippet) lines.push(`- **HTML:**\n\n  \`\`\`html\n  ${e.htmlSnippet}\n  \`\`\``);
    lines.push(`- **Drupal issue search:** ${drupalIssueSearch(e.ruleId, e.selector)}`);
    lines.push('');
  });
}

// ── Section 2: RTL-Amplified ─────────────────────────────────────────────────
lines.push('---');
lines.push('');
lines.push('## RTL-Amplified Issues');
lines.push('');
lines.push('These violations exist in both English and Hebrew, but appear **more frequently** in Hebrew/RTL contexts. The amplification ratio shows RTL-instance-count ÷ LTR-instance-count.');
lines.push('');
if (rtlAmplified.length === 0) {
  lines.push('_No amplified RTL violations found._');
} else {
  lines.push(`**${rtlAmplified.length} issues are more severe in RTL.**`);
  lines.push('');
  lines.push('| # | Rule | Impact | Theme | Path | Selector | LTR nodes | RTL nodes | Ratio |');
  lines.push('|---|------|--------|-------|------|----------|-----------|-----------|-------|');
  rtlAmplified.slice(0, 20).forEach((e, i) => {
    lines.push(`| ${i + 1} | \`${e.ruleId}\` | ${IMPACT_LABEL[e.impact] || e.impact} | \`${e.theme}\` | \`${e.path}\` | \`${e.selector.slice(0, 50)}\` | ${e.ltrNodeInstances} | ${e.rtlNodeInstances} | ${e.amplificationRatio}× |`);
  });
}

// ── Section 3: Admin Only ────────────────────────────────────────────────────
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Admin (Gin) Theme Only');
lines.push('');
lines.push('These violations are found in the **Admin/Gin theme but not in Claro or Olivero**. Issues here are specific to the Gin administration theme which ships separately from Drupal core.');
lines.push('');
if (adminOnly.length === 0) {
  lines.push('_No violations found exclusively in the Admin/Gin theme._');
  lines.push('');
  lines.push('> Note: The "admin" theme in the test matrix corresponds to the Gin administration theme. No issues were found that uniquely exist in Gin but not in other themes at this selector/rule level of granularity.');
} else {
  lines.push('| # | Rule | Impact | Selector | Pages | Node count |');
  lines.push('|---|------|--------|----------|-------|------------|');
  adminOnly.forEach((e, i) => {
    const pages = Object.values(e.pathsByTheme).flat().filter((v, idx, a) => a.indexOf(v) === idx).length;
    const nodes = Object.values(e.nodeCountByTheme).reduce((s, n) => s + n, 0);
    lines.push(`| ${i + 1} | \`${e.ruleId}\` | ${IMPACT_LABEL[e.impact] || e.impact} | \`${e.selector.slice(0, 60)}\` | ${pages} | ${nodes} |`);
  });
}

// ── Section 4: Claro Only ────────────────────────────────────────────────────
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Claro Theme Only');
lines.push('');
lines.push('These violations exist in **Claro or Claro-Dark but not in Admin or Olivero**. Issues here belong to Drupal core\'s Claro administration theme.');
lines.push('');
if (claroOnly.length === 0) {
  lines.push('_No violations found exclusively in Claro themes._');
} else {
  lines.push('| # | Rule | Impact | Selector | Pages | Node count |');
  lines.push('|---|------|--------|----------|-------|------------|');
  claroOnly.forEach((e, i) => {
    const pages = Object.values(e.pathsByTheme).flat().filter((v, idx, a) => a.indexOf(v) === idx).length;
    const nodes = Object.values(e.nodeCountByTheme).reduce((s, n) => s + n, 0);
    lines.push(`| ${i + 1} | \`${e.ruleId}\` | ${IMPACT_LABEL[e.impact] || e.impact} | \`${e.selector.slice(0, 60)}\` | ${pages} | ${nodes} |`);
  });
}

// ── Section 5: Admin + Claro, not Olivero ────────────────────────────────────
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Admin and Claro (not Olivero)');
lines.push('');
lines.push('These violations appear in admin-facing themes (Gin and/or Claro) but **not** in Olivero (the front-end theme). This makes them administration UI issues rather than front-end concerns, and the most relevant for the Admin theme accessibility report.');
lines.push('');
if (adminAndClaro.length === 0) {
  lines.push('_No violations found in this category._');
} else {
  lines.push(`**${adminAndClaro.length} selector/rule combinations found only in admin-facing themes.**`);
  lines.push('');
  lines.push('| # | Rule | Impact | Themes | Selector | Total nodes | Drupal core? |');
  lines.push('|---|------|--------|--------|----------|-------------|--------------|');
  adminAndClaro.forEach((e, i) => {
    const nodes = Object.values(e.nodeCountByTheme).reduce((s, n) => s + n, 0);
    const inCore = e.themes.includes('claro') || e.themes.includes('claro-dark');
    lines.push(`| ${i + 1} | \`${e.ruleId}\` | ${IMPACT_LABEL[e.impact] || e.impact} | \`${e.themes.join(', ')}\` | \`${e.selector.slice(0, 55)}\` | ${nodes} | ${inCore ? '✅ Yes (Claro)' : '🔧 Gin only'} |`);
  });
  lines.push('');
  lines.push('### Admin + Claro Details');
  lines.push('');
  adminAndClaro.slice(0, 15).forEach((e, i) => {
    const wcag = WCAG_MAP[e.ruleId];
    const nodes = Object.values(e.nodeCountByTheme).reduce((s, n) => s + n, 0);
    const inCore = e.themes.includes('claro') || e.themes.includes('claro-dark');
    lines.push(`#### AC-${i + 1}: \`${e.ruleId}\` — \`${e.selector.slice(0, 80)}\``);
    lines.push('');
    lines.push(`- **Impact:** ${IMPACT_LABEL[e.impact] || e.impact}`);
    lines.push(`- **Themes affected:** ${e.themes.map((t) => `\`${t}\``).join(', ')}`);
    lines.push(`- **In Drupal core Claro:** ${inCore ? 'Yes' : 'No — Gin/Admin theme only'}`);
    if (wcag) lines.push(`- **WCAG:** ${wcag.sc} ${wcag.name} (${wcag.level})`);
    lines.push(`- **Axe docs:** https://dequeuniversity.com/rules/axe/4.11/${e.ruleId}`);
    lines.push(`- **Total violation nodes:** ${nodes}`);
    const allPaths = [...new Set(Object.values(e.pathsByTheme).flat())];
    lines.push(`- **Paths:** ${allPaths.slice(0, 5).map((p) => `\`${p}\``).join(', ')}${allPaths.length > 5 ? ` +${allPaths.length - 5} more` : ''}`);
    if (e.htmlSnippet) lines.push(`- **HTML:**\n\n  \`\`\`html\n  ${e.htmlSnippet}\n  \`\`\``);
    lines.push(`- **Drupal issue search:** ${drupalIssueSearch(e.ruleId, e.selector)}`);
    lines.push('');
  });
}

// ── Section 6: Master Priority List ─────────────────────────────────────────
lines.push('---');
lines.push('');
lines.push('## Master Priority List');
lines.push('');
lines.push('Composite score = `impactWeight × log₂(1 + uniquePathCount)`.  ');
lines.push('Impact weights: Critical=4, Serious=3, Moderate=2, Minor=1.  ');
lines.push('This ranks issues that are both severe **and** widespread highest.');
lines.push('');
lines.push('| Rank | Score | Rule | Impact | Unique paths | Nodes | Admin/Claro? | RTL effect | Themes |');
lines.push('|------|-------|------|--------|-------------|-------|-------------|-----------|--------|');

priorityList.slice(0, 30).forEach((e, i) => {
  const rtlTag = e.isRtlExclusive ? '🔴 RTL only' : e.isRtlAmplified ? '🟡 RTL worse' : '—';
  const themeTag = e.isAdminOrClaroOnly ? '✅ Admin/Claro' : e.isOliveroTheme ? '🌐 All' : '—';
  const themeList = e.themes.slice(0, 3).join(', ') + (e.themes.length > 3 ? '…' : '');
  lines.push(`| ${i + 1} | ${e.compositeScore} | [\`${e.ruleId}\`](${e.helpUrl || '#'}) | ${IMPACT_LABEL[e.impact] || e.impact} | ${e.uniquePathCount} | ${e.totalNodes} | ${themeTag} | ${rtlTag} | \`${themeList}\` |`);
});

lines.push('');

// ── Section 7: Drupal Issue Queue guidance ───────────────────────────────────
lines.push('---');
lines.push('');
lines.push('## Drupal Issue Queue');
lines.push('');
lines.push('Each issue below links directly to a filtered Drupal.org issue queue search.');
lines.push('When filing or updating issues, include the pattern ID (DRU-XXXXXXXX from bugs-latest.json),');
lines.push('the axe rule ID, the WCAG criterion, and the HTML snippet from this report.');
lines.push('');
lines.push('### Suggested search links by rule');
lines.push('');

const seenRules = new Set();
for (const e of priorityList.slice(0, 20)) {
  if (seenRules.has(e.ruleId)) continue;
  seenRules.add(e.ruleId);
  const wcag = WCAG_MAP[e.ruleId];
  const search = `https://www.drupal.org/project/issues/search?text=${encodeURIComponent(e.ruleId)}&projects=drupal&status[]=Open&issue_tags=Accessibility`;
  lines.push(`- **[\`${e.ruleId}\`](${e.helpUrl || '#'})**${wcag ? ` — WCAG ${wcag.sc} ${wcag.name} (${wcag.level})` : ''}  `);
  lines.push(`  [Search Drupal issue queue](${search})`);
  lines.push('');
}

lines.push('### RTL-specific issues — Hebrew/RTL component in Drupal core');
lines.push('');
lines.push('RTL-exclusive issues should be filed/searched against the **Language** or **RTL** tags in addition to Accessibility:');
lines.push('');
lines.push('- [Search for RTL + Accessibility issues](https://www.drupal.org/project/issues/search?text=RTL+accessibility&projects=drupal&status[]=Open&issue_tags=Accessibility)');
lines.push('- [Search for Hebrew language issues](https://www.drupal.org/project/issues/search?text=Hebrew+accessibility&projects=drupal&status[]=Open)');
lines.push('');
lines.push('### Admin/Gin theme issues');
lines.push('');
lines.push('The Admin theme in this test matrix corresponds to the **Gin** theme. Issues specific to Gin should be searched/filed against the Gin project:');
lines.push('');
lines.push('- [Gin project issue queue (Accessibility)](https://www.drupal.org/project/issues/gin?text=&status[]=Open&issue_tags=Accessibility)');
lines.push('- [Claro theme issues in Drupal core](https://www.drupal.org/project/issues/search?text=claro+accessibility&projects=drupal&status[]=Open&issue_tags=Accessibility)');
lines.push('');

const markdown = lines.join('\n');
fs.writeFileSync(OUTPUT_MD, markdown);
console.log(`✅ Markdown report written to ${OUTPUT_MD}`);

// ── Console summary ──────────────────────────────────────────────────────────
console.log('');
console.log('📊 Analysis Summary:');
console.log(`   RTL-exclusive violations:  ${rtlExclusive.length}`);
console.log(`   RTL-amplified violations:  ${rtlAmplified.length}`);
console.log(`   Admin-only (Gin) findings: ${adminOnly.length}`);
console.log(`   Claro-only findings:       ${claroOnly.length}`);
console.log(`   Admin+Claro (not Olivero): ${adminAndClaro.length}`);
console.log(`   Total prioritised rules:   ${priorityList.length}`);
console.log('');
console.log('🏆 Top 5 by composite priority score:');
priorityList.slice(0, 5).forEach((e, i) => {
  const rtl = e.isRtlExclusive ? ' [RTL-ONLY]' : e.isRtlAmplified ? ' [RTL-WORSE]' : '';
  const theme = e.isAdminOrClaroOnly ? ' [Admin/Claro]' : '';
  console.log(`   ${i + 1}. ${e.ruleId} (${e.impact}) — score ${e.compositeScore} — ${e.uniquePathCount} paths${rtl}${theme}`);
});
