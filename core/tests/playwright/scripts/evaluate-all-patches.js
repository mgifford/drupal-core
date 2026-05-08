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
const { loadCanonicalPatchNames } = require('./lib/canonical-patch-map');

// ── Config ────────────────────────────────────────────────────────────────────
const REPORTS_DIR = path.resolve(__dirname, '../../../..', 'reports');
const PATCHES_DIR = path.resolve(__dirname, '../../../..', 'patches');
const REPO_ROOT = path.resolve(__dirname, '../../../..');
const patchFilter = process.env.PATCH_FILTER;
const earlyStopOnBlocking = process.env.A11Y_EARLY_STOP_ON_BLOCKING !== '0';
const earlyStopMinBlocking = Math.max(1, Number.parseInt(process.env.A11Y_EARLY_STOP_MIN_BLOCKING || '2', 10) || 2);
const sampleSize = Math.max(0, Number.parseInt(process.env.A11Y_PATCH_SAMPLE_SIZE || '0', 10) || 0);
const randomSample = process.env.A11Y_RANDOM_SAMPLE_PATCHES !== '0';
const enforceCanonicalPatches = process.env.A11Y_ENFORCE_CANONICAL_PATCHES !== '0';
const variantIdRaw = process.env.A11Y_VARIANT_ID || 'default';
const variantId = String(variantIdRaw).replace(/[^a-zA-Z0-9._-]/g, '-');
const outputSuffix = variantId === 'default' ? '' : `-${variantId}`;
const canonicalPatchMap = loadCanonicalPatchNames({
  repoRoot: REPO_ROOT,
  fallbackNames: Object.keys(config),
});
const canonicalPatchSet = new Set(canonicalPatchMap.names);

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

function shuffleArray(input) {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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

function classifyPatchRootCause(evalData, patchResult) {
  if (!evalData || !Array.isArray(evalData.testCases)) {
    return patchResult.outcomeReason || 'unknown';
  }

  const preflightError = evalData?.runContext?.patchApplicability?.success === false
    ? String(evalData?.runContext?.patchApplicability?.error || '')
    : '';
  if (preflightError.includes('patch does not apply')) {
    return 'patch-does-not-apply';
  }
  if (preflightError.includes('corrupt patch')) {
    return 'patch-file-corrupt';
  }
  if (preflightError.includes('No such file or directory')) {
    return 'patch-target-file-missing';
  }

  const testCaseErrors = evalData.testCases
    .map((tc) => tc?.error)
    .filter(Boolean)
    .map((err) => String(err));

  if (testCaseErrors.some((err) => err.includes('patch does not apply'))) {
    return 'patch-does-not-apply';
  }
  if (testCaseErrors.some((err) => err.includes('corrupt patch'))) {
    return 'patch-file-corrupt';
  }
  if (testCaseErrors.some((err) => err.includes('No such file or directory'))) {
    return 'patch-target-file-missing';
  }

  const skippedRouteUnavailable = evalData.testCases.some((tc) => tc?.skipReason === 'route-unavailable');
  if (skippedRouteUnavailable) {
    return 'route-unavailable';
  }

  const authSetupFailed = evalData.testCases.some((tc) =>
    String(tc?.error || '').includes('Authentication not established before test case')
  );
  if (authSetupFailed) {
    return 'authentication-not-established';
  }

  if (patchResult.outcomeReason === 'no-baseline-instances-observed') {
    return 'baseline-not-reproduced';
  }

  const selectorMisses = evalData.testCases.flatMap((tc) => {
    const misses = [];
    for (const shot of tc?.before?.screenshots || []) {
      if (shot && shot.success === false && String(shot.error || '').includes('Element not found')) {
        misses.push(shot.error);
      }
    }
    return misses;
  });
  if (selectorMisses.length > 0) {
    return 'expected-selector-not-found';
  }

  return patchResult.outcomeReason || 'unknown';
}

// ── Main evaluation flow ──────────────────────────────────────────────────────
(async () => {
  const summary = {
    timestamp: new Date().toISOString(),
    variantId,
    plannedPatches: 0,
    totalPatches: 0,
    passed: 0,
    inconclusive: 0,
    failed: 0,
    error: 0,
    blocking: 0,
    earlyStopped: false,
    earlyStopReason: null,
    skippedDueToEarlyStop: 0,
    patches: [],
    actionablePatches: [],
    patchHygieneIssues: [],
    testStateTriage: [],
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

  const isBlockingStatus = (status) => status === 'inconclusive' || status === 'fail' || status === 'error';

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

  let patches = Object.keys(config);
  if (enforceCanonicalPatches) {
    patches = patches.filter((patchName) => canonicalPatchSet.has(patchName));
  }
  let filteredPatches = patches;

  if (canonicalPatchMap.warning) {
    log(`Warning: ${canonicalPatchMap.warning}`);
  }
  if (enforceCanonicalPatches && canonicalPatchMap.source) {
    log(`Canonical patch map: ${canonicalPatchMap.source}`);
  }

  if (patchFilter) {
    filteredPatches = patches.filter((p) => getPriority(p) === patchFilter);
    log(`Filtering patches by ${patchFilter}: ${filteredPatches.length} patches`);
  }

  if (sampleSize > 0 && sampleSize < filteredPatches.length) {
    const sourcePatches = randomSample ? shuffleArray(filteredPatches) : filteredPatches;
    filteredPatches = sourcePatches.slice(0, sampleSize);
    log(`Patch sampling enabled: evaluating ${filteredPatches.length} of ${sourcePatches.length} patches (${randomSample ? 'random' : 'ordered'} sample).`);
  }

  log(`Starting batch evaluation of ${filteredPatches.length} patches...\n`);
  summary.plannedPatches = filteredPatches.length;

  for (const patchName of filteredPatches) {
    log(`\n${'='.repeat(80)}`);
    log(`Evaluating: ${patchName}`);
    log(`${'='.repeat(80)}`);

    const patchResult = {
      name: patchName,
      priority: getPriority(patchName),
      testUrls: [],
      status: 'unknown',
      error: null,
      outcomeReason: null,
      instanceSummary: null,
      conditionSummary: null,
      idValidation: null,
      baselineObservedInstances: 0,
      eligibleForPatchRecommendation: false,
      rootCause: null,
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
      patchResult.error = err.status === 2 ? null : err.message;
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
    patchResult.testUrls = Array.from(new Set(
      (evalData?.testCases || []).map((tc) => tc?.url).filter(Boolean),
    ));
    if (evalData?.instanceReport?.summary) {
      patchResult.instanceSummary = evalData.instanceReport.summary;
    }
    patchResult.baselineObservedInstances =
      evalData?.validationEvidence?.baselineObservedInstances
      ?? evalData?.instanceReport?.summary?.observedBefore
      ?? 0;
    patchResult.eligibleForPatchRecommendation =
      Boolean(evalData?.summary?.eligibleForPatchRecommendation)
      || (patchResult.baselineObservedInstances > 0 && patchResult.status !== 'error');
    patchResult.conditionSummary = collectConditionSummary(evalData);
    patchResult.idValidation = evalData?.idValidation || null;
    patchResult.rootCause = classifyPatchRootCause(evalData, patchResult);

    for (const key of Object.keys(globalConditionSets)) {
      const list = patchResult.conditionSummary[key] || [];
      for (const value of list) {
        globalConditionSets[key].add(value);
      }
    }

    summary.patches.push(patchResult);
    if (patchResult.eligibleForPatchRecommendation) {
      summary.actionablePatches.push({
        name: patchResult.name,
        status: patchResult.status,
        outcomeReason: patchResult.outcomeReason,
        baselineObservedInstances: patchResult.baselineObservedInstances,
      });
    }
    summary.totalPatches++;

    if (isBlockingStatus(patchResult.status)) {
      summary.blocking++;
    }

    if (earlyStopOnBlocking && summary.blocking >= earlyStopMinBlocking) {
      summary.earlyStopped = true;
      summary.skippedDueToEarlyStop = Math.max(0, filteredPatches.length - summary.totalPatches);
      summary.earlyStopReason = `Reached ${summary.blocking} blocking outcomes (threshold ${earlyStopMinBlocking})`;
      log(`⏹ Early stop: ${summary.earlyStopReason}`);
      break;
    }
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
  lines.push(`| **Planned patches** | ${summary.plannedPatches} |`);
  lines.push(`| **Passed** ✅ | ${summary.passed} |`);
  lines.push(`| **Inconclusive** 🟨 | ${summary.inconclusive} |`);
  lines.push(`| **Failed** ❌ | ${summary.failed} |`);
  lines.push(`| **Error** ⚠️ | ${summary.error} |`);
  lines.push(`| **Blocking (non-pass)** ⛔ | ${summary.blocking} |`);
  lines.push(`| **Skipped after early stop** | ${summary.skippedDueToEarlyStop} |`);
  lines.push('');
  if (summary.earlyStopped) {
    lines.push(`- **Early stop:** yes (${summary.earlyStopReason})`);
    lines.push('');
  }
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
  lines.push(`- **Actionable patches (baseline observed):** ${summary.actionablePatches.length}`);
  const rootCauseCounts = summary.patches.reduce((acc, patch) => {
    const key = patch.rootCause || 'unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  lines.push(`- **Root-cause categories:** ${Object.keys(rootCauseCounts).length}`);
  lines.push('');
  lines.push('### Root Cause Breakdown');
  lines.push('');
  for (const [cause, count] of Object.entries(rootCauseCounts).sort((a, b) => b[1] - a[1])) {
    lines.push(`- \`${cause}\`: ${count}`);
  }
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

  summary.patchHygieneIssues = summary.patches.filter((p) => (
    p.rootCause === 'patch-file-corrupt'
    || p.rootCause === 'patch-does-not-apply'
    || p.rootCause === 'patch-target-file-missing'
  ));
  summary.testStateTriage = summary.patches.filter(
    (p) => p.rootCause === 'baseline-not-reproduced' || p.rootCause === 'route-unavailable',
  );

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
      lines.push(`| \`${p.name}\` | ${statusIcon} ${statusText} | \`${reason}\` (${p.rootCause || 'unknown'}) | ${progress} |`);
    }
    lines.push('');
  }

  lines.push(`---`);
  lines.push('');
  lines.push(`## Recommendations`);
  lines.push('');
  if (summary.actionablePatches.length === 0) {
    lines.push('⚠️ **No actionable patch recommendations** because baseline target violations were not observed under current test conditions.');
    lines.push('');
  }
  lines.push('### Patch Hygiene (Fix Before Validation)');
  lines.push('');
  if (summary.patchHygieneIssues.length === 0) {
    lines.push('- None.');
  } else {
    for (const patch of summary.patchHygieneIssues) {
      lines.push(`- \`${patch.name}\` (${patch.rootCause})`);
    }
  }
  lines.push('');
  lines.push('### Test-State Triage (Baseline Not Reproduced / Route Unavailable)');
  lines.push('');
  if (summary.testStateTriage.length === 0) {
    lines.push('- None.');
  } else {
    for (const patch of summary.testStateTriage) {
      const urls = patch.testUrls.length ? patch.testUrls.join(', ') : '-';
      lines.push(`- \`${patch.name}\` on ${urls} (${patch.rootCause || 'unknown'})`);
    }
  }
  lines.push('');
  if (summary.passed === summary.totalPatches) {
    lines.push(`✅ **All patches pass evaluation.** Ready for deployment.`);
  } else {
    const blockingCount = summary.blocking;
    lines.push(`⚠️ **${blockingCount} patches are blocking (all non-pass outcomes treated equally):**`);
    lines.push('');
    for (const patch of summary.patches) {
      if (isBlockingStatus(patch.status)) {
        let statusText;
        if (patch.status === 'inconclusive') {
          if (patch.rootCause && patch.rootCause !== 'baseline-not-reproduced' && patch.rootCause !== 'route-unavailable') {
            statusText = `blocking (inconclusive, patch preflight issue: ${patch.rootCause})`;
          } else if (patch.rootCause === 'route-unavailable') {
            statusText = 'blocking (inconclusive, target route unavailable in this environment)';
          } else {
            statusText = 'blocking (inconclusive, test did not observe baseline target)';
          }
        } else if (patch.status === 'fail') {
          statusText = 'blocking (failed)';
        } else {
          statusText = 'blocking (evaluation error)';
        }
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
    const nonActionable = summary.patches.filter((p) => !p.eligibleForPatchRecommendation);
    if (nonActionable.length > 0) {
      lines.push('### Excluded From Patch Recommendation (No Baseline Evidence)');
      lines.push('');
      for (const patch of nonActionable.filter((p) => p.rootCause === 'baseline-not-reproduced' || p.rootCause === 'route-unavailable')) {
        lines.push(`- \`${patch.name}\` (baseline observed: ${patch.baselineObservedInstances})`);
      }
      lines.push('');
    }
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
  const exitCode = summary.blocking > 0 ? 1 : 0;
  log(`\nExit code: ${exitCode}`);
  process.exit(exitCode);
})();
