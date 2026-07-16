#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.resolve(__dirname, '../reports/color-contrast-matrix');

function usage() {
  console.log([
    'Usage:',
    '  node tests/playwright/scripts/generate-color-contrast-matrix-comment.js [options]',
    '',
    'Options:',
    '  --input <file>      Explicit JSON report path',
    '  --latest            Use newest JSON report in reports/color-contrast-matrix (default)',
    '  --output <file>     Write combined output to file',
    '  --format <type>     markdown | html | drupal-html | both (default: both)',
    '  --help              Show this help',
    '',
    'Examples:',
    '  node tests/playwright/scripts/generate-color-contrast-matrix-comment.js --latest',
    '  node tests/playwright/scripts/generate-color-contrast-matrix-comment.js --input core/tests/playwright/reports/color-contrast-matrix/color-contrast-matrix-chromium-123456.json --format drupal-html',
    '  node tests/playwright/scripts/generate-color-contrast-matrix-comment.js --latest --output reports/matrix-comment.txt',
  ].join('\n'));
}

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : null;
  };

  return {
    input: get('--input'),
    latest: args.includes('--latest') || !args.includes('--input'),
    output: get('--output'),
    format: (get('--format') || 'both').toLowerCase(),
    help: args.includes('--help'),
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getLatestReportPath() {
  if (!fs.existsSync(REPORTS_DIR)) {
    throw new Error(`Report directory not found: ${REPORTS_DIR}`);
  }

  const files = fs.readdirSync(REPORTS_DIR)
    .filter((name) => name.endsWith('.json'))
    .map((name) => path.join(REPORTS_DIR, name));

  if (files.length === 0) {
    throw new Error(`No JSON reports found in: ${REPORTS_DIR}`);
  }

  files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0];
}

function readReport(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw);

  if (!parsed || !Array.isArray(parsed.rows)) {
    throw new Error('Invalid matrix report: expected top-level rows array.');
  }

  return parsed;
}

function titleCase(value) {
  if (!value) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function extractRatiosFromViolations(violations) {
  const ratios = [];
  const regexes = [
    /contrast ratio of\s+([0-9]+(?:\.[0-9]+)?)/i,
    /insufficient color contrast of\s+([0-9]+(?:\.[0-9]+)?)/i,
    /\bof\s+([0-9]+(?:\.[0-9]+)?)\b/i,
  ];

  for (const violation of violations || []) {
    for (const node of violation.nodes || []) {
      const summary = node.failureSummary || '';
      for (const regex of regexes) {
        const match = summary.match(regex);
        if (match) {
          ratios.push(Number(match[1]));
          break;
        }
      }
    }
  }

  return ratios.filter((value) => Number.isFinite(value));
}

function summarizeRow(report, rowResult) {
  const row = rowResult.row || {};
  const isSkipped = Boolean(rowResult.skipped);
  const violations = rowResult.violations || [];
  const fail = !isSkipped && violations.length > 0;

  const mode = row.forcedColors === 'active'
    ? 'Forced-colors'
    : titleCase(row.colorScheme || 'light');

  const direction = (row.direction || 'ltr').toUpperCase();
  const viewport = rowResult.viewport?.label || 'Viewport unknown';
  const state = 'Default';
  const selector = report.targetSelector || '';

  let ratio = 'n/a';
  if (fail) {
    const ratios = extractRatiosFromViolations(violations);
    if (ratios.length > 0) {
      ratio = `${Math.min(...ratios).toFixed(2)}:1`;
    }
  }
  else if (!isSkipped) {
    ratio = '>= 4.50:1 (axe pass)';
  }

  let passFail = 'pass';
  if (isSkipped) {
    passFail = 'skipped';
  }
  else if (fail) {
    passFail = 'fail';
  }

  const note = isSkipped
    ? (rowResult.skipReason || 'Row skipped')
    : (fail ? `${violations.length} violation(s)` : 'No color-contrast violations');

  const details = (violations || []).map((violation) => ({
    id: violation.id,
    impact: violation.impact || 'unknown',
    nodeCount: (violation.nodes || []).length,
  }));

  return {
    mode,
    direction,
    viewport,
    state,
    selector,
    ratio,
    passFail,
    note,
    details,
  };
}

function renderMarkdown(report, inputPath) {
  const rows = report.rows.map((row) => summarizeRow(report, row));
  const lines = [];

  lines.push('Matrix evidence summary (ready to paste)');
  lines.push('');
  lines.push(`- Generated: ${report.generatedAt || 'unknown'}`);
  lines.push(`- Source report: ${inputPath}`);
  lines.push(`- Target route: ${report.targetPath || 'unknown'}`);
  lines.push(`- Target selector: ${report.targetSelector || 'unknown'}`);
  lines.push(`- RTL language: ${report.rtlLang || 'not set'}`);
  lines.push('');
  lines.push('| Mode | Direction | Viewport | State | Selector | Ratio | Pass/Fail | Notes |');
  lines.push('| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |');

  for (const row of rows) {
    lines.push(`| ${row.mode} | ${row.direction} | ${row.viewport} | ${row.state} | ${row.selector} | ${row.ratio} | ${row.passFail} | ${row.note} |`);
  }

  const failures = rows.filter((row) => row.passFail === 'fail');
  if (failures.length > 0) {
    lines.push('');
    lines.push('Failure details:');
    for (const row of failures) {
      for (const detail of row.details) {
        lines.push(`- ${row.mode}/${row.direction}: ${detail.id} (${detail.impact}, nodes=${detail.nodeCount})`);
      }
    }
  }

  return lines.join('\n');
}

function renderHtml(report) {
  const rows = report.rows.map((row) => summarizeRow(report, row));
  const failures = rows.filter((row) => row.passFail === 'fail');

  const tableRows = rows.map((row) => `
    <tr>
      <td>${escapeHtml(row.mode)}</td>
      <td>${escapeHtml(row.direction)}</td>
      <td>${escapeHtml(row.viewport)}</td>
      <td>${escapeHtml(row.state)}</td>
      <td><code>${escapeHtml(row.selector)}</code></td>
      <td>${escapeHtml(row.ratio)}</td>
      <td>${escapeHtml(row.passFail)}</td>
      <td>${escapeHtml(row.note)}</td>
    </tr>`).join('');

  let detailBlock = '<p>No failing rows in this matrix sample.</p>';
  if (failures.length > 0) {
    const items = [];
    for (const row of failures) {
      for (const detail of row.details) {
        items.push(`<li><strong>${escapeHtml(row.mode)} / ${escapeHtml(row.direction)}</strong>: <code>${escapeHtml(detail.id)}</code> (${escapeHtml(detail.impact)}, nodes=${detail.nodeCount})</li>`);
      }
    }
    detailBlock = `<ul>${items.join('')}</ul>`;
  }

  return [
    '<p><strong>Matrix evidence summary</strong></p>',
    `<p><strong>Target route:</strong> <code>${escapeHtml(report.targetPath || 'unknown')}</code><br>`,
    `<strong>Target selector:</strong> <code>${escapeHtml(report.targetSelector || 'unknown')}</code><br>`,
    `<strong>Generated:</strong> ${escapeHtml(report.generatedAt || 'unknown')}</p>`,
    '<table>',
    '<thead>',
    '<tr>',
    '<th>Mode</th>',
    '<th>Direction</th>',
    '<th>Viewport</th>',
    '<th>State</th>',
    '<th>Selector</th>',
    '<th>Ratio</th>',
    '<th>Pass/Fail</th>',
    '<th>Notes</th>',
    '</tr>',
    '</thead>',
    '<tbody>',
    tableRows,
    '</tbody>',
    '</table>',
    '<p><strong>Failure details</strong></p>',
    detailBlock,
  ].join('\n');
}

function renderDrupalHtml(report) {
  const rows = report.rows.map((row) => summarizeRow(report, row));
  const failures = rows.filter((row) => row.passFail === 'fail');

  const tableRows = rows.map((row) => `
    <tr>
      <td>${escapeHtml(row.mode)}</td>
      <td>${escapeHtml(row.direction)}</td>
      <td>${escapeHtml(row.viewport)}</td>
      <td>${escapeHtml(row.state)}</td>
      <td>${escapeHtml(row.ratio)}</td>
      <td>${escapeHtml(row.passFail)}</td>
    </tr>`).join('');

  const detailItems = [];
  for (const row of failures) {
    for (const detail of row.details) {
      detailItems.push(`<li>${escapeHtml(row.mode)} / ${escapeHtml(row.direction)} / ${escapeHtml(row.viewport)}: <code>${escapeHtml(detail.id)}</code> (${escapeHtml(detail.impact)})</li>`);
    }
  }

  const detailBlock = detailItems.length > 0
    ? `<ul>${detailItems.join('')}</ul>`
    : '<p>No failing rows in this matrix sample.</p>';

  return [
    '<p><strong>Matrix evidence</strong></p>',
    `<p><strong>Route:</strong> <code>${escapeHtml(report.targetPath || 'unknown')}</code> | <strong>Selector:</strong> <code>${escapeHtml(report.targetSelector || 'unknown')}</code></p>`,
    '<table>',
    '<thead>',
    '<tr>',
    '<th>Mode</th>',
    '<th>Direction</th>',
    '<th>Viewport</th>',
    '<th>State</th>',
    '<th>Ratio</th>',
    '<th>Pass/Fail</th>',
    '</tr>',
    '</thead>',
    '<tbody>',
    tableRows,
    '</tbody>',
    '</table>',
    '<p><strong>Failure details</strong></p>',
    detailBlock,
  ].join('\n');
}

function main() {
  const args = parseArgs();

  if (args.help) {
    usage();
    process.exit(0);
  }

  if (!['markdown', 'html', 'drupal-html', 'both'].includes(args.format)) {
    throw new Error('Invalid --format value. Use markdown, html, drupal-html, or both.');
  }

  const inputPath = args.input
    ? path.resolve(args.input)
    : getLatestReportPath();

  const report = readReport(inputPath);

  const blocks = [];
  if (args.format === 'markdown' || args.format === 'both') {
    blocks.push('=== MARKDOWN ===');
    blocks.push(renderMarkdown(report, inputPath));
  }
  if (args.format === 'html' || args.format === 'both') {
    if (blocks.length > 0) {
      blocks.push('');
    }
    blocks.push('=== HTML ===');
    blocks.push(renderHtml(report));
  }
  if (args.format === 'drupal-html') {
    if (blocks.length > 0) {
      blocks.push('');
    }
    blocks.push(renderDrupalHtml(report));
  }

  const output = `${blocks.join('\n')}\n`;

  if (args.output) {
    const outputPath = path.resolve(args.output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, output, 'utf8');
    console.log(`Wrote matrix comment output: ${outputPath}`);
    return;
  }

  process.stdout.write(output);
}

try {
  main();
}
catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
