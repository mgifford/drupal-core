#!/usr/bin/env node
/**
 * Batch Patch Evaluator
 *
 * Evaluates all patches and generates a comprehensive summary report.
 *
 * Usage:
 *   node evaluate-all-patches.js
 *   PATCH_FILTER=priority-1 node evaluate-all-patches.js  (optional: filter by priority)
 *
 * Output:
 *   reports/PATCH-EVALUATION-SUMMARY.md
 *   reports/PATCH-EVALUATION-SUMMARY.json
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const config = require('./lib/patch-evaluator-config');

// ── Config ────────────────────────────────────────────────────────────────────
const REPORTS_DIR = path.resolve(__dirname, '../../../..', 'reports');
const REPO_ROOT = path.resolve(__dirname, '../../../..');
const patchFilter = process.env.PATCH_FILTER;

// Categorize patches by priority (based on patch name)
function getPriority(patchName) {
  if (patchName.includes('DRUPAL-A11Y-001') ||
      patchName.includes('DRUPAL-A11Y-002') ||
      patchName.includes('DRUPAL-A11Y-005')) {
    return 'priority-1';
  }
  if (patchName.includes('DRUPAL-A11Y-006') ||
      patchName.includes('DRUPAL-A11Y-007')) {
    return 'priority-2';
  }
  return 'priority-3';
}

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

// ── Main evaluation flow ──────────────────────────────────────────────────────
(async () => {
  const summary = {
    timestamp: new Date().toISOString(),
    totalPatches: 0,
    passed: 0,
    failed: 0,
    error: 0,
    patches: [],
  };

  const patches = Object.keys(config);
  let filteredPatches = patches;

  if (patchFilter) {
    filteredPatches = patches.filter((p) => getPriority(p) === patchFilter);
    log(`Filtering patches by ${patchFilter}: ${filteredPatches.length} patches`);
  }

  log(`Starting batch evaluation of ${filteredPatches.length} patches...\n`);

  for (const patchName of filteredPatches) {
    log(`\n${'='.repeat(80)}`);
    log(`Evaluating: ${patchName}`);
    log(`${'='.repeat(80)}`);

    const patchResult = {
      name: patchName,
      priority: getPriority(patchName),
      status: 'unknown',
      error: null,
    };

    try {
      const evaluatePath = path.join(__dirname, 'evaluate-patch.js');
      execSync(`node "${evaluatePath}" "${patchName}"`, {
        cwd: REPO_ROOT,
        stdio: 'inherit',
      });
      patchResult.status = 'pass';
      summary.passed++;
      log(`✅ PASS`);
    } catch (err) {
      patchResult.status = err.status === 1 ? 'fail' : 'error';
      patchResult.error = err.message;
      if (err.status === 1) {
        summary.failed++;
        log(`❌ FAIL`);
      } else {
        summary.error++;
        log(`❌ ERROR: ${err.message}`);
      }
    }

    summary.patches.push(patchResult);
    summary.totalPatches++;
  }

  // ── Generate summary report ──────────────────────────────────────────────────
  log(`\n${'='.repeat(80)}`);
  log('BATCH EVALUATION SUMMARY');
  log(`${'='.repeat(80)}\n`);

  const lines = [];
  lines.push(`# Patch Evaluation Batch Summary`);
  lines.push('');
  lines.push(`**Generated:** ${new Date().toLocaleDateString('en-CA')} at ${new Date().toLocaleTimeString()}`);
  lines.push('');
  lines.push(`## Results`);
  lines.push('');
  lines.push(`| Metric | Count |`);
  lines.push(`|--------|-------|`);
  lines.push(`| **Total patches** | ${summary.totalPatches} |`);
  lines.push(`| **Passed** ✅ | ${summary.passed} |`);
  lines.push(`| **Failed** ❌ | ${summary.failed} |`);
  lines.push(`| **Error** ⚠️ | ${summary.error} |`);
  lines.push('');
  lines.push(`**Pass rate:** ${((summary.passed / summary.totalPatches) * 100).toFixed(1)}%`);
  lines.push('');
  lines.push(`---`);
  lines.push('');
  lines.push(`## Patch Details`);
  lines.push('');

  const byPriority = {
    'priority-1': [],
    'priority-2': [],
    'priority-3': [],
  };

  for (const patch of summary.patches) {
    byPriority[patch.priority].push(patch);
  }

  for (const [priority, patches] of Object.entries(byPriority)) {
    if (patches.length === 0) continue;
    lines.push(`### ${priority.toUpperCase().replace('-', ' ')}`);
    lines.push('');
    lines.push(`| Patch | Status |`);
    lines.push(`|-------|--------|`);
    for (const p of patches) {
      const statusIcon = p.status === 'pass' ? '✅' : p.status === 'fail' ? '❌' : '⚠️';
      const statusText = p.status === 'pass' ? 'PASS' : p.status === 'fail' ? 'FAIL' : 'ERROR';
      lines.push(`| \`${p.name}\` | ${statusIcon} ${statusText} |`);
    }
    lines.push('');
  }

  lines.push(`---`);
  lines.push('');
  lines.push(`## Recommendations`);
  lines.push('');
  if (summary.passed === summary.totalPatches) {
    lines.push(`✅ **All patches pass evaluation.** Ready for deployment.`);
  } else {
    lines.push(`⚠️ **${summary.failed + summary.error} patches need attention:**`);
    lines.push('');
    for (const patch of summary.patches) {
      if (patch.status !== 'pass') {
        lines.push(`- \`${patch.name}\`: ${patch.status === 'fail' ? 'Introduces new violations' : 'Evaluation error'}`);
        if (patch.error) {
          lines.push(`  - ${patch.error}`);
        }
      }
    }
    lines.push('');
    lines.push(`Review detailed evaluation reports in the \`patches/\` directory.`);
  }
  lines.push('');

  const md = lines.join('\n');

  // Write markdown
  const mdPath = path.join(REPORTS_DIR, 'PATCH-EVALUATION-SUMMARY.md');
  fs.writeFileSync(mdPath, md);
  log(`✅ Summary written to ${mdPath}`);

  // Write JSON
  const jsonPath = path.join(REPORTS_DIR, 'PATCH-EVALUATION-SUMMARY.json');
  fs.writeFileSync(jsonPath, JSON.stringify(summary, null, 2));
  log(`✅ JSON data written to ${jsonPath}`);

  // Console output
  console.log(md);

  // Exit with appropriate code
  const exitCode = summary.failed + summary.error > 0 ? 1 : 0;
  log(`\nExit code: ${exitCode}`);
  process.exit(exitCode);
})();
