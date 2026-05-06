#!/usr/bin/env node
/**
 * Batch Module Evaluator
 *
 * Tests accessibility impact of all modules.
 *
 * Usage:
 *   node evaluate-all-modules.js
 *
 * Output:
 *   reports/MODULE-EVALUATION-SUMMARY.md
 *   reports/MODULE-EVALUATION-SUMMARY.json
 *   Individual module evaluation reports
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const config = require('./lib/module-evaluator-config');

// ── Config ────────────────────────────────────────────────────────────────────
const REPORTS_DIR = path.resolve(__dirname, '../../../..', 'reports');
const REPO_ROOT = path.resolve(__dirname, '../../../..');

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

// ── Main evaluation flow ──────────────────────────────────────────────────────
(async () => {
  const summary = {
    timestamp: new Date().toISOString(),
    totalModules: 0,
    improving: 0,
    neutral: 0,
    regressing: 0,
    error: 0,
    modules: [],
  };

  const modules = Object.keys(config);
  log(`Starting batch evaluation of ${modules.length} modules...\n`);

  for (const moduleName of modules) {
    log(`\n${'='.repeat(80)}`);
    log(`Evaluating: ${moduleName}`);
    log(`${'='.repeat(80)}`);

    const moduleResult = {
      name: moduleName,
      displayName: config[moduleName].name,
      status: 'unknown',
      impact: 0,
      error: null,
    };

    try {
      const evaluatePath = path.join(__dirname, 'evaluate-module.js');
      execSync(`node "${evaluatePath}" "${moduleName}"`, {
        cwd: REPO_ROOT,
        stdio: 'inherit',
      });

      // Read the evaluation JSON to get the impact
      const jsonPath = path.join(REPORTS_DIR, `${moduleName}-evaluation.json`);
      if (fs.existsSync(jsonPath)) {
        const evaluation = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        moduleResult.impact = evaluation.summary.impact.net_change;

        if (evaluation.summary.impact.net_change < 0) {
          moduleResult.status = 'improves';
          summary.improving++;
        } else if (evaluation.summary.impact.net_change > 0) {
          moduleResult.status = 'regresses';
          summary.regressing++;
        } else {
          moduleResult.status = 'neutral';
          summary.neutral++;
        }
      }

      log(`✅ Complete (Impact: ${moduleResult.impact > 0 ? '+' : ''}${moduleResult.impact})`);
    } catch (err) {
      moduleResult.status = 'error';
      moduleResult.error = err.message;
      summary.error++;
      log(`❌ ERROR: ${err.message}`);
    }

    summary.modules.push(moduleResult);
    summary.totalModules++;
  }

  // ── Generate summary report ──────────────────────────────────────────────────
  log(`\n${'='.repeat(80)}`);
  log('BATCH EVALUATION SUMMARY');
  log(`${'='.repeat(80)}\n`);

  const lines = [];
  lines.push(`# Module Accessibility Impact Summary`);
  lines.push('');
  lines.push(`**Generated:** ${new Date().toLocaleDateString('en-CA')} at ${new Date().toLocaleTimeString()}`);
  lines.push('');
  lines.push(`## Overview`);
  lines.push('');
  lines.push(`This report evaluates the accessibility impact of various Drupal modules by comparing`);
  lines.push(`axe-core scan results with each module enabled and disabled.`);
  lines.push('');
  lines.push(`| Category | Count |`);
  lines.push(`|----------|-------|`);
  lines.push(`| **Total modules** | ${summary.totalModules} |`);
  lines.push(`| **Improves accessibility** ✅ | ${summary.improving} |`);
  lines.push(`| **Neutral** ➡️ | ${summary.neutral} |`);
  lines.push(`| **Regresses accessibility** ⚠️ | ${summary.regressing} |`);
  lines.push(`| **Evaluation errors** ❌ | ${summary.error} |`);
  lines.push('');

  // Group by impact
  const improving = summary.modules.filter((m) => m.status === 'improves');
  const neutral = summary.modules.filter((m) => m.status === 'neutral');
  const regressing = summary.modules.filter((m) => m.status === 'regressing');

  if (improving.length > 0) {
    lines.push(`## ✅ Improves Accessibility`);
    lines.push('');
    lines.push(`These modules reduce the number of accessibility violations when enabled.`);
    lines.push('');
    lines.push(`| Module | Display Name | Impact |`);
    lines.push(`|--------|---|---|`);
    for (const m of improving.sort((a, b) => a.impact - b.impact)) {
      lines.push(`| \`${m.name}\` | ${m.displayName} | **${m.impact}** violations |`);
    }
    lines.push('');
  }

  if (neutral.length > 0) {
    lines.push(`## ➡️ No Accessibility Impact`);
    lines.push('');
    lines.push(`These modules have no measurable impact on accessibility violations.`);
    lines.push('');
    lines.push(`| Module | Display Name |`);
    lines.push(`|--------|---|`);
    for (const m of neutral) {
      lines.push(`| \`${m.name}\` | ${m.displayName} |`);
    }
    lines.push('');
  }

  if (regressing.length > 0) {
    lines.push(`## ⚠️ Regresses Accessibility`);
    lines.push('');
    lines.push(`These modules introduce accessibility violations when enabled. Review the detailed reports for analysis.`);
    lines.push('');
    lines.push(`| Module | Display Name | Impact |`);
    lines.push(`|--------|---|---|`);
    for (const m of regressing.sort((a, b) => b.impact - a.impact)) {
      lines.push(`| \`${m.name}\` | ${m.displayName} | **+${m.impact}** violations |`);
    }
    lines.push('');
  }

  lines.push(`---`);
  lines.push('');
  lines.push(`## Detailed Reports`);
  lines.push('');
  lines.push(`Individual evaluation reports are available in the reports directory:`);
  lines.push('');
  for (const m of summary.modules) {
    if (m.status !== 'error') {
      lines.push(`- [\`${m.name}\`](./${m.name}-evaluation.md) — ${m.displayName} (${m.status === 'improves' ? '✅' : m.status === 'regressing' ? '⚠️' : '➡️'} ${m.impact > 0 ? '+' : ''}${m.impact})`);
    }
  }
  lines.push('');

  const md = lines.join('\n');

  // Write markdown
  const mdPath = path.join(REPORTS_DIR, 'MODULE-EVALUATION-SUMMARY.md');
  fs.writeFileSync(mdPath, md);
  log(`✅ Summary written to ${mdPath}`);

  // Write JSON
  const jsonPath = path.join(REPORTS_DIR, 'MODULE-EVALUATION-SUMMARY.json');
  fs.writeFileSync(jsonPath, JSON.stringify(summary, null, 2));
  log(`✅ JSON data written to ${jsonPath}`);

  // Console output
  console.log(md);

  // Exit with appropriate code
  const exitCode = regressing.length > 0 ? 1 : 0;
  log(`\nExit code: ${exitCode}`);
  process.exit(exitCode);
})();
