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
const PATCHES_DIR = path.resolve(__dirname, '../../../..', 'patches');
const REPO_ROOT = path.resolve(__dirname, '../../../..');
const patchFilter = process.env.PATCH_FILTER;
const variantIdRaw = process.env.A11Y_VARIANT_ID || 'default';
const variantId = String(variantIdRaw).replace(/[^a-zA-Z0-9._-]/g, '-');
const outputSuffix = variantId === 'default' ? '' : `-${variantId}`;

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

function readEvaluationJson(patchName) {
  const filePath = path.join(PATCHES_DIR, `${patchName}-evaluation${outputSuffix}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function collectConditionSummary(evalData) {
  const summary = {
    screenTypes: new Set(),
    orientations: new Set(),
    colorModes: new Set(),
    directions: new Set(),
    themes: new Set(),
    colorSchemesDetected: new Set(),
    forcedColors: new Set(),
    prefersContrast: new Set(),
    viewports: new Set(),
  };

  const cases = Array.isArray(evalData?.testCases) ? evalData.testCases : [];
  for (const tc of cases) {
    const contexts = [tc?.conditions?.before, tc?.conditions?.after].filter(Boolean);
    for (const ctx of contexts) {
      if (ctx.screenType) summary.screenTypes.add(ctx.screenType);
      if (ctx.orientation) summary.orientations.add(ctx.orientation);
      if (ctx.colorMode) summary.colorModes.add(ctx.colorMode);
      if (ctx.direction) summary.directions.add(ctx.direction);
      if (ctx.theme) summary.themes.add(ctx.theme);
      if (ctx.colorSchemeDetected) summary.colorSchemesDetected.add(ctx.colorSchemeDetected);
      if (ctx.forcedColors) summary.forcedColors.add(ctx.forcedColors);
      if (ctx.prefersContrast) summary.prefersContrast.add(ctx.prefersContrast);
      if (ctx.viewport && typeof ctx.viewport.width === 'number' && typeof ctx.viewport.height === 'number') {
        summary.viewports.add(`${ctx.viewport.width}x${ctx.viewport.height}`);
      }
    }
  }

  return {
    screenTypes: Array.from(summary.screenTypes),
    orientations: Array.from(summary.orientations),
    colorModes: Array.from(summary.colorModes),
    directions: Array.from(summary.directions),
    themes: Array.from(summary.themes),
    colorSchemesDetected: Array.from(summary.colorSchemesDetected),
    forcedColors: Array.from(summary.forcedColors),
    prefersContrast: Array.from(summary.prefersContrast),
    viewports: Array.from(summary.viewports),
  };
}

// ── Main evaluation flow ──────────────────────────────────────────────────────
(async () => {
  const summary = {
    timestamp: new Date().toISOString(),
    variantId,
    totalPatches: 0,
    passed: 0,
    inconclusive: 0,
    failed: 0,
    error: 0,
    patches: [],
    conditionCoverage: {
      screenTypes: [],
      orientations: [],
      colorModes: [],
      directions: [],
      themes: [],
      colorSchemesDetected: [],
      forcedColors: [],
      prefersContrast: [],
      viewports: [],
    },
  };

  const globalConditionSets = {
    screenTypes: new Set(),
    orientations: new Set(),
    colorModes: new Set(),
    directions: new Set(),
    themes: new Set(),
    colorSchemesDetected: new Set(),
    forcedColors: new Set(),
    prefersContrast: new Set(),
    viewports: new Set(),
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
      outcomeReason: null,
      instanceSummary: null,
      conditionSummary: null,
      idValidation: null,
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
      patchResult.status = err.status === 2 ? 'inconclusive' : err.status === 1 ? 'fail' : 'error';
      patchResult.error = err.message;
      if (err.status === 2) {
        summary.inconclusive++;
        log(`🟨 INCONCLUSIVE`);
      } else if (err.status === 1) {
        summary.failed++;
        log(`❌ FAIL`);
      } else {
        summary.error++;
        log(`❌ ERROR: ${err.message}`);
      }
    }

    const evalData = readEvaluationJson(patchName);
    if (evalData?.summary?.outcomeReason) {
      patchResult.outcomeReason = evalData.summary.outcomeReason;
    }
    if (evalData?.instanceReport?.summary) {
      patchResult.instanceSummary = evalData.instanceReport.summary;
    }
    patchResult.conditionSummary = collectConditionSummary(evalData);
    patchResult.idValidation = evalData?.idValidation || null;

    for (const key of Object.keys(globalConditionSets)) {
      const list = patchResult.conditionSummary[key] || [];
      for (const value of list) {
        globalConditionSets[key].add(value);
      }
    }

    summary.patches.push(patchResult);
    summary.totalPatches++;
  }

  // ── Generate summary report ──────────────────────────────────────────────────
  summary.conditionCoverage = {
    screenTypes: Array.from(globalConditionSets.screenTypes),
    orientations: Array.from(globalConditionSets.orientations),
    colorModes: Array.from(globalConditionSets.colorModes),
    directions: Array.from(globalConditionSets.directions),
    themes: Array.from(globalConditionSets.themes),
    colorSchemesDetected: Array.from(globalConditionSets.colorSchemesDetected),
    forcedColors: Array.from(globalConditionSets.forcedColors),
    prefersContrast: Array.from(globalConditionSets.prefersContrast),
    viewports: Array.from(globalConditionSets.viewports),
  };

  log(`\n${'='.repeat(80)}`);
  log('BATCH EVALUATION SUMMARY');
  log(`${'='.repeat(80)}\n`);

  const lines = [];
  lines.push(`# Patch Evaluation Batch Summary`);
  lines.push('');
  lines.push(`**Generated:** ${new Date().toLocaleDateString('en-CA')} at ${new Date().toLocaleTimeString()}`);
  lines.push(`**Variant:** \`${variantId}\``);
  lines.push('');
  lines.push(`## Results`);
  lines.push('');
  lines.push(`| Metric | Count |`);
  lines.push(`|--------|-------|`);
  lines.push(`| **Total patches** | ${summary.totalPatches} |`);
  lines.push(`| **Passed** ✅ | ${summary.passed} |`);
  lines.push(`| **Inconclusive** 🟨 | ${summary.inconclusive} |`);
  lines.push(`| **Failed** ❌ | ${summary.failed} |`);
  lines.push(`| **Error** ⚠️ | ${summary.error} |`);
  lines.push('');
  lines.push(`**Pass rate:** ${((summary.passed / summary.totalPatches) * 100).toFixed(1)}%`);
  lines.push('');
  lines.push('### Condition Coverage Captured');
  lines.push('');
  lines.push(`- **Screen types:** ${summary.conditionCoverage.screenTypes.join(', ') || '-'}`);
  lines.push(`- **Orientations:** ${summary.conditionCoverage.orientations.join(', ') || '-'}`);
  lines.push(`- **Color modes requested:** ${summary.conditionCoverage.colorModes.join(', ') || '-'}`);
  lines.push(`- **Detected color schemes:** ${summary.conditionCoverage.colorSchemesDetected.join(', ') || '-'}`);
  lines.push(`- **Directionality:** ${summary.conditionCoverage.directions.join(', ') || '-'}`);
  lines.push(`- **Themes:** ${summary.conditionCoverage.themes.join(', ') || '-'}`);
  lines.push(`- **Forced colors:** ${summary.conditionCoverage.forcedColors.join(', ') || '-'}`);
  lines.push(`- **Contrast preferences:** ${summary.conditionCoverage.prefersContrast.join(', ') || '-'}`);
  lines.push(`- **Viewports:** ${summary.conditionCoverage.viewports.join(', ') || '-'}`);
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
    lines.push(`| Patch | Status | Reason | Instance Progress |`);
    lines.push(`|-------|--------|--------|-------------------|`);
    for (const p of patches) {
      const statusIcon = p.status === 'pass' ? '✅' : p.status === 'inconclusive' ? '🟨' : p.status === 'fail' ? '❌' : '⚠️';
      const statusText = p.status === 'pass' ? 'PASS' : p.status === 'inconclusive' ? 'INCONCLUSIVE' : p.status === 'fail' ? 'FAIL' : 'ERROR';
      const reason = p.outcomeReason || '-';
      const progress = p.instanceSummary
        ? `${p.instanceSummary.fixed || 0} fixed / ${p.instanceSummary.remaining || 0} remaining / ${p.instanceSummary.notObserved || 0} not-observed`
        : '-';
      lines.push(`| \`${p.name}\` | ${statusIcon} ${statusText} | \`${reason}\` | ${progress} |`);
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
    lines.push(`⚠️ **${summary.failed + summary.error} patches failed and ${summary.inconclusive} were inconclusive:**`);
    lines.push('');
    for (const patch of summary.patches) {
      if (patch.status !== 'pass') {
        const statusText =
          patch.status === 'inconclusive'
            ? 'inconclusive (test did not observe baseline target)'
            : patch.status === 'fail'
              ? 'failed'
              : 'evaluation error';
        lines.push(`- \`${patch.name}\`: ${statusText}`);
        if (patch.outcomeReason) {
          lines.push(`  - reason: \`${patch.outcomeReason}\``);
        }
        if (patch.instanceSummary) {
          lines.push(`  - instance coverage: ${patch.instanceSummary.fixed || 0} fixed, ${patch.instanceSummary.remaining || 0} remaining, ${patch.instanceSummary.notObserved || 0} not observed`);
        }
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
  const mdPath = path.join(REPORTS_DIR, `PATCH-EVALUATION-SUMMARY${outputSuffix}.md`);
  fs.writeFileSync(mdPath, md);
  log(`✅ Summary written to ${mdPath}`);

  // Write JSON
  const jsonPath = path.join(REPORTS_DIR, `PATCH-EVALUATION-SUMMARY${outputSuffix}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(summary, null, 2));
  log(`✅ JSON data written to ${jsonPath}`);

  // Console output
  console.log(md);

  // Exit with appropriate code
  const exitCode = summary.failed + summary.error > 0 ? 1 : 0;
  log(`\nExit code: ${exitCode}`);
  process.exit(exitCode);
})();
