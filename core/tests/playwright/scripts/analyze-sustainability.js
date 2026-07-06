'use strict';

/**
 * Sustainability trend analysis for the Drupal core crawl (WSG alignment).
 *
 * Reads the pageMetrics captured by a11y-axe-crawl.spec.ts (transfer size,
 * request count, DOM nodes, image formats), estimates CO2 per page view with
 * CO2.js (Sustainable Web Design model v4), and:
 *
 *   1. Appends this run to reports/sustainability/history.json — one entry
 *      per scan date, so trends per page/theme are queryable over time and
 *      regressions (bytes, requests, DOM, CO2, a11y violations) are visible.
 *   2. Writes SUSTAINABILITY-YYYY-MM-DD.md / -latest.md (+ HTML) for
 *      https://mgifford.github.io/drupal-core/
 *
 * Trend records use canonical scans only (desktop, light, LTR, no accent):
 * one comparable measurement per theme × page per run.
 *
 * Run: npm run a11y:sustainability   (after yarn test:a11y:playwright)
 */

const fs = require('fs');
const path = require('path');
const { renderMarkdownReport } = require('./lib/render-markdown-report');
const { loadAxeResults } = require('./lib/axe-results-store');

const REPORTS_DIR = process.env.A11Y_REPORTS_DIR
  ? path.resolve(process.env.A11Y_REPORTS_DIR)
  : path.resolve(__dirname, '../../../../reports');
const INPUT_FILE = path.join(REPORTS_DIR, 'axe-results.json');
const HISTORY_DIR = path.join(REPORTS_DIR, 'sustainability');
const HISTORY_FILE = path.join(HISTORY_DIR, 'history.json');
const AX_TREE_DIR = path.join(REPORTS_DIR, 'ax-tree', 'latest');
const BASE_URL = process.env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';

// Expected/beneficial plaintext assets (WSG STAR expected-files,
// beneficial-files). Checked once per run against the live site.
const WELL_KNOWN_FILES = [
  { path: '/robots.txt', kind: 'expected' },
  { path: '/favicon.ico', kind: 'expected' },
  { path: '/sitemap.xml', kind: 'expected' },
  { path: '/humans.txt', kind: 'beneficial' },
  { path: '/.well-known/security.txt', kind: 'beneficial' },
  { path: '/carbon.txt', kind: 'beneficial' },
];

const pad = (n) => n.toString().padStart(2, '0');
const now = new Date();
const DATE_STAMP = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const MD_OUTPUT = path.join(REPORTS_DIR, `SUSTAINABILITY-${DATE_STAMP}.md`);
const MD_LATEST = path.join(REPORTS_DIR, 'SUSTAINABILITY-latest.md');
const HTML_OUTPUT = path.join(REPORTS_DIR, `sustainability-report-${DATE_STAMP}.html`);
const HTML_LATEST = path.join(REPORTS_DIR, 'sustainability-report-latest.html');

// Modern vs legacy raster formats — WSG asks for efficient media formats.
const MODERN_IMAGE_FORMATS = ['avif', 'webp', 'svg'];

/** CO2.js is optional: report grams as null if the dependency is missing. */
function makeCo2Estimator() {
  try {
    const { co2 } = require('@tgwf/co2');
    const model = new co2({ model: 'swd', version: 4 });
    return {
      label: 'CO2.js Sustainable Web Design v4 (per byte, global grid average)',
      perByte: (bytes) => model.perByte(bytes),
    };
  }
  catch (error) {
    console.warn(`⚠️ @tgwf/co2 not available (${error.message}); CO2 columns will be empty.`);
    return { label: 'unavailable — install @tgwf/co2', perByte: () => null };
  }
}

function isCanonical(record) {
  return Boolean(
    record.pageMetrics
    && record.colorScheme === 'light'
    && record.screen === 'desktop'
    && !record.accentPreset
    && (record.direction ?? 'ltr') === 'ltr',
  );
}

function violationCounts(record) {
  const counts = { total: 0, critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const violation of record.violations ?? []) {
    const instances = (violation.nodes ?? []).length || 1;
    counts.total += instances;
    if (violation.impact && counts[violation.impact] !== undefined) {
      counts[violation.impact] += instances;
    }
  }
  return counts;
}

function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function avg(values) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function grams(value) {
  return value === null || value === undefined ? 'n/a' : `${value.toFixed(3)} g`;
}

function delta(current, previous, format = (v) => v.toFixed(1)) {
  if (previous === null || previous === undefined || previous === 0) return '—';
  const diff = current - previous;
  const sign = diff > 0 ? '+' : '';
  const pct = (diff / previous) * 100;
  return `${sign}${format(diff)} (${sign}${pct.toFixed(1)}%)`;
}

function mergeFormatBuckets(target, source) {
  for (const [format, data] of Object.entries(source ?? {})) {
    target[format] = target[format] ?? { count: 0, transferBytes: 0 };
    target[format].count += data.count;
    target[format].transferBytes += data.transferBytes;
  }
}

/**
 * Probe the well-known/expected files once per run (curl handles the DDEV
 * self-signed cert). Returns null when the site is unreachable so report
 * generation still works offline from recorded data.
 */
function checkWellKnownFiles() {
  const { execSync } = require('child_process');
  try {
    execSync(`curl -sk -m 10 -o /dev/null "${BASE_URL}/"`);
  }
  catch {
    console.warn(`⚠️ ${BASE_URL} unreachable — skipping well-known file checks.`);
    return null;
  }
  return WELL_KNOWN_FILES.map((file) => {
    let status = 0;
    try {
      status = parseInt(execSync(
        `curl -sk -m 10 -o /dev/null -w "%{http_code}" "${BASE_URL}${file.path}"`,
      ).toString().trim(), 10);
    }
    catch {
      status = 0;
    }
    return { ...file, status, present: status >= 200 && status < 400 };
  });
}

/**
 * Write each canonical page's accessibility-tree snapshot to
 * reports/ax-tree/latest/. The files are committed, so git history diffs
 * them across scans — a silent accessible-name or role change shows up as
 * a reviewable diff even when no axe rule fires.
 */
function writeAxTrees(records) {
  const withTrees = records.filter((r) => r.axTree);
  if (withTrees.length === 0) return 0;

  fs.rmSync(AX_TREE_DIR, { recursive: true, force: true });
  fs.mkdirSync(AX_TREE_DIR, { recursive: true });
  for (const record of withTrees) {
    const safePath = record.path === '/' ? 'front' : record.path.replace(/^\//, '').replace(/[^a-zA-Z0-9._-]+/g, '_');
    fs.writeFileSync(path.join(AX_TREE_DIR, `${record.theme}__${safePath}.yml`), record.axTree);
  }
  return withTrees.length;
}

function loadHistory() {
  if (!fs.existsSync(HISTORY_FILE)) {
    return { format: 'a11y-sustainability-history-v1', runs: [] };
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    if (parsed && Array.isArray(parsed.runs)) return parsed;
  }
  catch (error) {
    console.warn(`⚠️ Could not parse ${HISTORY_FILE}: ${error.message}. Starting fresh (old file backed up).`);
    fs.copyFileSync(HISTORY_FILE, `${HISTORY_FILE}.bak-${DATE_STAMP}`);
  }
  return { format: 'a11y-sustainability-history-v1', runs: [] };
}

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ ${INPUT_FILE} not found. Run 'yarn test:a11y:playwright' first.`);
    process.exit(1);
  }

  const estimator = makeCo2Estimator();
  const rawResults = loadAxeResults(INPUT_FILE);
  const canonical = rawResults.filter(isCanonical);

  if (canonical.length === 0) {
    console.error('❌ No canonical records with pageMetrics found. Re-run the crawl with the metrics-enabled spec (desktop/light scans capture metrics).');
    process.exit(1);
  }

  // ── Per-page trend records ────────────────────────────────────────────────
  const pages = canonical.map((record) => {
    const m = record.pageMetrics;
    const a11y = violationCounts(record);
    return {
      theme: record.theme,
      path: record.path,
      transferBytes: m.transferBytes,
      decodedBytes: m.decodedBytes,
      requests: m.requests,
      domNodes: m.domNodes,
      co2Grams: estimator.perByte(m.transferBytes),
      byType: m.byType,
      imageFormats: m.imageFormats,
      // Present from the first scan after the WSG checks landed; older
      // records won't have it.
      wsg: m.wsg ?? null,
      a11y,
    };
  }).sort((a, b) => a.theme.localeCompare(b.theme) || a.path.localeCompare(b.path));

  // ── Run summary ───────────────────────────────────────────────────────────
  const transferValues = pages.map((p) => p.transferBytes);
  const imageFormatTotals = {};
  for (const page of pages) mergeFormatBuckets(imageFormatTotals, page.imageFormats);

  const co2Values = pages.map((p) => p.co2Grams).filter((v) => v !== null);
  const summary = {
    pagesMeasured: pages.length,
    themes: [...new Set(pages.map((p) => p.theme))].sort(),
    totalTransferBytes: transferValues.reduce((a, b) => a + b, 0),
    medianTransferBytes: median(transferValues),
    avgTransferBytes: avg(transferValues),
    avgRequests: avg(pages.map((p) => p.requests)),
    avgDomNodes: avg(pages.map((p) => p.domNodes)),
    totalCo2Grams: co2Values.length ? co2Values.reduce((a, b) => a + b, 0) : null,
    imageFormatTotals,
    a11y: {
      totalViolations: pages.reduce((n, p) => n + p.a11y.total, 0),
      critical: pages.reduce((n, p) => n + p.a11y.critical, 0),
      serious: pages.reduce((n, p) => n + p.a11y.serious, 0),
    },
  };

  // ── WSG once-per-run checks + AX-tree extraction ─────────────────────────
  const wellKnown = checkWellKnownFiles();
  const axTreeCount = writeAxTrees(canonical);
  summary.wsg = {
    pagesWithThirdParty: pages.filter((p) => p.wsg && p.wsg.thirdParty.count > 0).length,
    pagesWithRenderBlockingScripts: pages.filter((p) => p.wsg && p.wsg.renderBlockingScripts > 0).length,
    wellKnownFiles: wellKnown,
    axTreeSnapshots: axTreeCount,
  };

  // ── History append (replace same-date entry on re-run) ───────────────────
  const history = loadHistory();
  history.runs = history.runs.filter((run) => run.date !== DATE_STAMP);
  const previousRun = history.runs.length ? history.runs[history.runs.length - 1] : null;
  let coreCommit = null;
  try {
    coreCommit = require('child_process')
      .execSync('git rev-parse HEAD', { cwd: path.resolve(__dirname, '../../../..') })
      .toString().trim();
  }
  catch { /* not in a git checkout */ }

  history.runs.push({
    date: DATE_STAMP,
    generatedAt: now.toISOString(),
    coreCommit,
    co2Model: estimator.label,
    summary,
    pages,
  });
  history.runs.sort((a, b) => a.date.localeCompare(b.date));

  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

  // ── Markdown report ───────────────────────────────────────────────────────
  const lines = [];
  lines.push('# Drupal Core Sustainability Report');
  lines.push('');
  lines.push(`> **Generated:** ${now.toISOString()}`);
  lines.push(`> **CO2 model:** ${estimator.label}`);
  lines.push('> **Method:** Resource Timing API on cold-cache page loads (fresh browser context per page), desktop viewport, light mode, LTR, default accent. Same-origin DDEV site, so transfer sizes are complete.');
  lines.push('> **Standard:** [W3C Web Sustainability Guidelines (draft)](https://www.w3.org/TR/web-sustainability-guidelines/)');
  lines.push('');

  lines.push('## Summary');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('| :--- | :--- |');
  lines.push(`| Pages measured (theme × page) | ${summary.pagesMeasured} |`);
  lines.push(`| Themes | ${summary.themes.join(', ')} |`);
  lines.push(`| Median page weight (transfer) | ${kb(summary.medianTransferBytes)} |`);
  lines.push(`| Average page weight (transfer) | ${kb(summary.avgTransferBytes)} |`);
  lines.push(`| Average requests per page | ${summary.avgRequests.toFixed(1)} |`);
  lines.push(`| Average DOM nodes per page | ${Math.round(summary.avgDomNodes)} |`);
  lines.push(`| Estimated CO2, one view of every page | ${grams(summary.totalCo2Grams)} |`);
  lines.push(`| Accessibility violations on measured pages | ${summary.a11y.totalViolations} (${summary.a11y.critical} critical, ${summary.a11y.serious} serious) |`);
  lines.push('');

  // ── Trend vs previous run ────────────────────────────────────────────────
  if (previousRun) {
    lines.push(`## Trend vs ${previousRun.date}`);
    lines.push('');
    lines.push('| Metric | Previous | Current | Change |');
    lines.push('| :--- | ---: | ---: | ---: |');
    lines.push(`| Median page weight | ${kb(previousRun.summary.medianTransferBytes)} | ${kb(summary.medianTransferBytes)} | ${delta(summary.medianTransferBytes / 1024, previousRun.summary.medianTransferBytes / 1024, (v) => `${v.toFixed(1)} KB`)} |`);
    lines.push(`| Average requests | ${previousRun.summary.avgRequests.toFixed(1)} | ${summary.avgRequests.toFixed(1)} | ${delta(summary.avgRequests, previousRun.summary.avgRequests)} |`);
    lines.push(`| Average DOM nodes | ${Math.round(previousRun.summary.avgDomNodes)} | ${Math.round(summary.avgDomNodes)} | ${delta(summary.avgDomNodes, previousRun.summary.avgDomNodes, (v) => v.toFixed(0))} |`);
    if (summary.totalCo2Grams !== null && previousRun.summary.totalCo2Grams !== null) {
      lines.push(`| CO2 per full crawl | ${grams(previousRun.summary.totalCo2Grams)} | ${grams(summary.totalCo2Grams)} | ${delta(summary.totalCo2Grams, previousRun.summary.totalCo2Grams, (v) => `${v.toFixed(3)} g`)} |`);
    }
    lines.push(`| A11y violations | ${previousRun.summary.a11y.totalViolations} | ${summary.a11y.totalViolations} | ${delta(summary.a11y.totalViolations, previousRun.summary.a11y.totalViolations, (v) => v.toFixed(0))} |`);
    lines.push('');

    // Per-page regressions: pages that got ≥10% heavier since last run.
    const prevPages = new Map(previousRun.pages.map((p) => [`${p.theme}::${p.path}`, p]));
    const regressions = pages
      .map((p) => {
        const prev = prevPages.get(`${p.theme}::${p.path}`);
        if (!prev || prev.transferBytes === 0) return null;
        const pct = ((p.transferBytes - prev.transferBytes) / prev.transferBytes) * 100;
        return pct >= 10 ? { ...p, previousBytes: prev.transferBytes, pct } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.pct - a.pct);

    if (regressions.length > 0) {
      lines.push('### ⚠️ Page-weight regressions (≥10% heavier than previous run)');
      lines.push('');
      lines.push('| Theme | Page | Previous | Current | Change |');
      lines.push('| :--- | :--- | ---: | ---: | ---: |');
      for (const r of regressions) {
        lines.push(`| ${r.theme} | \`${r.path}\` | ${kb(r.previousBytes)} | ${kb(r.transferBytes)} | +${r.pct.toFixed(1)}% |`);
      }
      lines.push('');
    }
    else {
      lines.push('No page gained ≥10% weight since the previous run. ✅');
      lines.push('');
    }
  }
  else {
    lines.push('## Trend');
    lines.push('');
    lines.push('First recorded run — trends appear from the second scan onward.');
    lines.push('');
  }

  // ── Per-theme table ──────────────────────────────────────────────────────
  lines.push('## Per-Theme Baseline');
  lines.push('');
  lines.push('| Theme | Pages | Median weight | Avg requests | Avg DOM nodes | CO2 (all pages) |');
  lines.push('| :--- | ---: | ---: | ---: | ---: | ---: |');
  for (const theme of summary.themes) {
    const themePages = pages.filter((p) => p.theme === theme);
    const themeCo2 = themePages.map((p) => p.co2Grams).filter((v) => v !== null);
    lines.push([
      `| ${theme}`,
      `${themePages.length}`,
      kb(median(themePages.map((p) => p.transferBytes))),
      avg(themePages.map((p) => p.requests)).toFixed(1),
      `${Math.round(avg(themePages.map((p) => p.domNodes)))}`,
      `${themeCo2.length ? grams(themeCo2.reduce((a, b) => a + b, 0)) : 'n/a'} |`,
    ].join(' | '));
  }
  lines.push('');

  // ── Heaviest pages ───────────────────────────────────────────────────────
  lines.push('## Heaviest Pages (top 10 by transfer size)');
  lines.push('');
  lines.push('| Theme | Page | Transfer | Requests | DOM nodes | CO2/view |');
  lines.push('| :--- | :--- | ---: | ---: | ---: | ---: |');
  for (const p of [...pages].sort((a, b) => b.transferBytes - a.transferBytes).slice(0, 10)) {
    lines.push(`| ${p.theme} | \`${p.path}\` | ${kb(p.transferBytes)} | ${p.requests} | ${p.domNodes} | ${grams(p.co2Grams)} |`);
  }
  lines.push('');

  // ── Image formats ────────────────────────────────────────────────────────
  lines.push('## Image Formats');
  lines.push('');
  lines.push('WSG favours efficient media formats (AVIF/WebP/SVG) over legacy raster formats.');
  lines.push('');
  lines.push('| Format | Requests | Transfer | Modern? |');
  lines.push('| :--- | ---: | ---: | :--- |');
  const formats = Object.entries(imageFormatTotals).sort((a, b) => b[1].transferBytes - a[1].transferBytes);
  for (const [format, data] of formats) {
    const modern = MODERN_IMAGE_FORMATS.includes(format) ? '✅' : '⚠️ legacy';
    lines.push(`| ${format} | ${data.count} | ${kb(data.transferBytes)} | ${modern} |`);
  }
  if (formats.length === 0) {
    lines.push('| (no images loaded on measured pages) | | | |');
  }
  lines.push('');

  // ── WSG STAR page checks ─────────────────────────────────────────────────
  const wsgPages = pages.filter((p) => p.wsg);
  if (wsgPages.length > 0) {
    lines.push('## WSG Checks');
    lines.push('');
    lines.push('Page-level checks from the [STAR techniques](WSG-STAR-AUTOMATION.md).');
    lines.push('');

    const thirdPartyPages = wsgPages.filter((p) => p.wsg.thirdParty.count > 0);
    if (thirdPartyPages.length === 0) {
      lines.push('- **Third-party resources (self-hosting):** none on any measured page. ✅');
    }
    else {
      lines.push(`- **Third-party resources (self-hosting):** ⚠️ ${thirdPartyPages.length} page(s) load cross-origin assets:`);
      for (const p of thirdPartyPages.slice(0, 10)) {
        lines.push(`  - ${p.theme} \`${p.path}\` — ${p.wsg.thirdParty.count} request(s) from ${p.wsg.thirdParty.domains.join(', ')}`);
      }
    }

    const blockingPages = wsgPages.filter((p) => p.wsg.renderBlockingScripts > 0);
    if (blockingPages.length === 0) {
      lines.push('- **Render-blocking head scripts (asynchronous-code):** none. ✅');
    }
    else {
      lines.push(`- **Render-blocking head scripts (asynchronous-code):** ⚠️ ${blockingPages.length} page(s):`);
      for (const p of blockingPages.slice(0, 10)) {
        lines.push(`  - ${p.theme} \`${p.path}\` — ${p.wsg.renderBlockingScripts} blocking script(s)`);
      }
    }

    const requiredChecks = ['doctype', 'htmlLang', 'title', 'viewportMeta', 'metaDescription', 'structuredData'];
    lines.push('- **Required/beneficial elements (required-elements, meta-tags, structured-data):**');
    for (const check of requiredChecks) {
      const missing = wsgPages.filter((p) => !p.wsg.requiredElements[check]);
      if (missing.length === 0) {
        lines.push(`  - ${check}: present on all pages ✅`);
      }
      else {
        const examples = missing.slice(0, 3).map((p) => `\`${p.path}\``).join(', ');
        lines.push(`  - ${check}: missing on ${missing.length} page(s) (e.g. ${examples})`);
      }
    }
    lines.push('');
  }

  // ── Well-known files (expected-files, beneficial-files) ─────────────────
  if (wellKnown) {
    lines.push('### Expected & beneficial files');
    lines.push('');
    lines.push('| File | Kind | Status |');
    lines.push('| :--- | :--- | :--- |');
    for (const file of wellKnown) {
      lines.push(`| \`${file.path}\` | ${file.kind} | ${file.present ? `✅ ${file.status}` : `⚠️ missing (${file.status})`} |`);
    }
    lines.push('');
  }

  // ── Accessibility trees ──────────────────────────────────────────────────
  if (axTreeCount > 0) {
    lines.push('## Accessibility Trees');
    lines.push('');
    lines.push(`${axTreeCount} canonical page snapshots written to [\`ax-tree/latest/\`](ax-tree/latest/) — the tree assistive tech (and AI agents) actually consume. Because these files are committed, \`git diff\` surfaces silent name/role/structure changes between scans even when no axe rule fires.`);
    lines.push('');
  }

  lines.push('## Data');
  lines.push('');
  lines.push(`- Full per-page history: [\`sustainability/history.json\`](sustainability/history.json) — ${history.runs.length} run(s) recorded, append-only, one entry per scan date.`);
  lines.push('- Query examples:');
  lines.push('');
  lines.push('```bash');
  lines.push('# Page weight of /admin/content in Claro over time');
  lines.push("jq -r '.runs[] | [.date, (.pages[] | select(.theme==\"claro\" and .path==\"/admin/content\") | .transferBytes)] | @tsv' reports/sustainability/history.json");
  lines.push('');
  lines.push('# CO2 trend for the whole crawl');
  lines.push("jq -r '.runs[] | [.date, .summary.totalCo2Grams] | @tsv' reports/sustainability/history.json");
  lines.push('```');
  lines.push('');

  const markdown = lines.join('\n');
  const html = renderMarkdownReport({
    title: 'Drupal Core Sustainability Report',
    description: 'Page weight, requests, DOM size, image formats, and CO2 estimates per core theme, tracked over time.',
    markdown,
    sourceLabel: path.basename(MD_LATEST),
  });

  fs.writeFileSync(MD_OUTPUT, markdown);
  fs.writeFileSync(MD_LATEST, markdown);
  fs.writeFileSync(HTML_OUTPUT, html);
  fs.writeFileSync(HTML_LATEST, html);

  console.log(`✅ Sustainability report written to ${MD_OUTPUT}`);
  console.log(`✅ History updated: ${HISTORY_FILE} (${history.runs.length} run(s))`);
  console.log(`   Pages measured: ${summary.pagesMeasured} | Median weight: ${kb(summary.medianTransferBytes)} | CO2: ${grams(summary.totalCo2Grams)}`);
}

main();
