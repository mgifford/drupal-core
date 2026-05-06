#!/usr/bin/env node
/**
 * @file
 * Analyze accessibility impact across all Drupal Core modules.
 *
 * Workflow:
 * 1. Load module config from .drupal-a11y-module-config.json
 * 2. For each high-priority module (experimental + optional):
 *    a. Call test-module-accessibility.js
 *    b. Capture impact analysis results
 * 3. Aggregate all module impact data
 * 4. Generate summary report with rankings
 * 5. Output: module-impact-summary.md + module-impact-summary.json
 *
 * Usage:
 *   node analyze-module-impact.js
 *   node analyze-module-impact.js --all (test all 100+ modules, slow!)
 *   node analyze-module-impact.js --verbose
 *
 * Output:
 *   reports/module-impact-summary.md
 *   reports/module-impact-summary.json
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── Config ────────────────────────────────────────────────────────────────────
const testAll = process.argv.includes('--all');
const verbose = process.argv.includes('--verbose');

const DRUPAL_ROOT = path.join(__dirname, '../../..');
const CONFIG_FILE = path.join(DRUPAL_ROOT, '.drupal-a11y-module-config.json');
const REPORTS_DIR = path.join(DRUPAL_ROOT, 'reports');

// High-priority modules to test by default
const HIGH_PRIORITY_MODULES = [
  'layout_builder',
  'workspaces',
  'views_ui',
  'contextual_links',
  'big_pipe',
  'comment',
  'taxonomy',
  'media',
  'search',
  'field_ui'
];

// ── Utilities ─────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function logVerbose(msg) {
  if (verbose) {
    console.log(`  ${msg}`);
  }
}

/**
 * Load module config
 */
function loadModuleConfig() {
  try {
    const configData = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(configData);
  } catch (e) {
    log(`❌ Error: Failed to load module config`);
    log(`   Run: npm run a11y:discover-modules`);
    process.exit(1);
  }
}

/**
 * Test single module
 */
function testModule(moduleName) {
  try {
    logVerbose(`Testing module: ${moduleName}`);
    execSync(`node ${path.join(__dirname, 'test-module-accessibility.js')} ${moduleName}`, {
      stdio: 'pipe'
    });
    return true;
  } catch (e) {
    logVerbose(`  ⚠ Failed to test module: ${moduleName}`);
    return false;
  }
}

/**
 * Load impact analysis for a module
 */
function loadModuleImpact(moduleName) {
  const analysisFile = path.join(REPORTS_DIR, 'module-impact', moduleName, 'impact-analysis.json');
  if (fs.existsSync(analysisFile)) {
    try {
      return JSON.parse(fs.readFileSync(analysisFile, 'utf-8'));
    } catch (e) {
      return null;
    }
  }
  return null;
}

/**
 * Generate summary report
 */
function generateSummaryReport(results, moduleConfig) {
  // Sort by impact score
  const sorted = results.sort((a, b) => b.impact_score - a.impact_score);

  // Categorize by status
  const byStatus = {
    'PASS': results.filter(r => r.status === 'PASS'),
    'FAIL': results.filter(r => r.status === 'FAIL'),
    'MIXED': results.filter(r => r.status === 'MIXED'),
    'NO_IMPACT': results.filter(r => r.status === 'NO_IMPACT')
  };

  const report = `# Module Accessibility Impact Summary

**Generated:** ${new Date().toISOString()}

## Overview

- Modules tested: ${results.length}
- Modules with regressions: ${byStatus.FAIL.length}
- Modules with improvements: ${byStatus.PASS.length}
- Mixed impact: ${byStatus.MIXED.length}
- No impact: ${byStatus.NO_IMPACT.length}

## Critical Regressions ❌ (${byStatus.FAIL.length})

${byStatus.FAIL.length > 0 ? `
| Module | Category | Violations Added | Status |
|---|---|---|---|
${byStatus.FAIL.map(r => `| **${r.module}** | ${r.config.category} | +${r.metrics.violations_added} | FAIL |`).join('\n')}

**Action:** Do not enable these modules. File issues for accessibility fixes.
` : 'None detected.'}

## High Regressions ⚠️ (${byStatus.MIXED.filter(r => r.metrics.violations_added > 5).length})

${byStatus.MIXED.filter(r => r.metrics.violations_added > 5).length > 0 ? `
| Module | Category | Added | Fixed | Impact |
|---|---|---|---|---|
${byStatus.MIXED.filter(r => r.metrics.violations_added > 5).map(r => `| **${r.module}** | ${r.config.category} | +${r.metrics.violations_added} | -${r.metrics.violations_fixed} | ${r.impact_score > 0 ? '+' : ''}${r.impact_score} |`).join('\n')}

**Action:** Review carefully. Consider feature-gating or disabling until fixes available.
` : 'None detected.'}

## Positive Impact ✅ (${byStatus.PASS.length})

${byStatus.PASS.length > 0 ? `
| Module | Category | Violations Fixed |
|---|---|---|
${byStatus.PASS.map(r => `| **${r.module}** | ${r.config.category} | -${r.metrics.violations_fixed} |`).join('\n')}

**Action:** Safe to enable. These modules improve accessibility.
` : 'None detected.'}

## No Impact ◎ (${byStatus.NO_IMPACT.length})

${byStatus.NO_IMPACT.length > 0 ? `
| Module | Category |
|---|---|
${byStatus.NO_IMPACT.map(r => `| **${r.module}** | ${r.config.category} |`).join('\n')}

**Action:** Safe to enable. No accessibility impact detected.
` : 'None detected.'}

## Ranked by Impact Score

${sorted.map((r, i) => `${i + 1}. **${r.module}** (${r.config.category}): ${r.impact_score > 0 ? '+' : ''}${r.impact_score} | ${r.status}`).join('\n')}

---

**Next Steps:**

1. **File issues** for modules with critical regressions (FAIL)
2. **Feature-gate** modules with high regressions (MIXED with >5 added)
3. **Enable by default** modules with positive impact (PASS)
4. **Monitor** modules with no impact for future compatibility changes

---

Generated by: npm run a11y:analyze-modules
`;

  return report;
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  try {
    log('\n📊 Analyzing module accessibility impact across Drupal Core');

    // Load module config
    const config = loadModuleConfig();
    const allModules = Object.keys(config.modules);

    // Determine which modules to test
    let modulesToTest;
    if (testAll) {
      log(`Testing ALL ${allModules.length} modules (this will take a while...)`);
      modulesToTest = allModules.filter(m => config.modules[m].category !== 'test_only');
    } else {
      log(`Testing ${HIGH_PRIORITY_MODULES.length} high-priority modules`);
      modulesToTest = HIGH_PRIORITY_MODULES.filter(m => allModules.includes(m));
    }

    log(`Modules to test: ${modulesToTest.join(', ')}\n`);

    // Test each module
    const results = [];
    for (let i = 0; i < modulesToTest.length; i++) {
      const moduleName = modulesToTest[i];
      log(`[${i + 1}/${modulesToTest.length}] Testing ${moduleName}...`);

      testModule(moduleName);
      const impact = loadModuleImpact(moduleName);

      if (impact) {
        results.push(impact);
        log(`  ✓ ${impact.status} (Impact: ${impact.impact_score > 0 ? '+' : ''}${impact.impact_score})`);
      } else {
        log(`  ⚠ No analysis available`);
      }
    }

    // Generate summary report
    log(`\n📋 Generating summary report...`);
    const summary = generateSummaryReport(results, config);

    // Save summary
    fs.writeFileSync(path.join(REPORTS_DIR, 'module-impact-summary.md'), summary);
    fs.writeFileSync(
      path.join(REPORTS_DIR, 'module-impact-summary.json'),
      JSON.stringify(
        {
          generated: new Date().toISOString(),
          modules_tested: modulesToTest.length,
          modules_passed: results.filter(r => r.status === 'PASS').length,
          modules_failed: results.filter(r => r.status === 'FAIL').length,
          modules_mixed: results.filter(r => r.status === 'MIXED').length,
          modules_no_impact: results.filter(r => r.status === 'NO_IMPACT').length,
          results
        },
        null,
        2
      )
    );

    log(`\n✓ Summary saved to: reports/module-impact-summary.md`);
    log(`✓ Summary JSON saved to: reports/module-impact-summary.json`);

    process.exit(0);

  } catch (error) {
    log(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
})();
