#!/usr/bin/env node
/**
 * Module Accessibility Evaluator
 *
 * Tests accessibility with and without a specific module enabled.
 * Identifies module-specific accessibility impacts (positive or negative).
 *
 * Usage:
 *   node evaluate-module.js <module-name>
 *   node evaluate-module.js inline_form_errors
 *
 * Output:
 *   reports/<module-name>-evaluation.md
 *   reports/<module-name>-evaluation.html
 *   reports/<module-name>-evaluation.json
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { chromium } = require('playwright');
const { injectAxe, checkAxe } = require('axe-playwright');
const config = require('./lib/module-evaluator-config');

// ── Config ────────────────────────────────────────────────────────────────────
const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Usage: node evaluate-module.js <module-name>');
  console.error('Example: node evaluate-module.js inline_form_errors');
  process.exit(1);
}

const moduleConfig = config[moduleName];
if (!moduleConfig) {
  console.error(`Module not found in config: ${moduleName}`);
  console.error('Available modules:', Object.keys(config).join(', '));
  process.exit(1);
}

const REPORTS_DIR = path.resolve(__dirname, '../../../..', 'reports');
const REPO_ROOT = path.resolve(__dirname, '../../../..');
const BASE_URL = 'http://drupal-core.ddev.site';

// ── Utilities ─────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function getModuleState(name) {
  try {
    const output = execSync(`ddev drush pm:list --type=module --status=enabled --format=list`, {
      cwd: REPO_ROOT,
      encoding: 'utf-8',
    });
    return output.includes(name);
  } catch (err) {
    return false;
  }
}

function enableModule(name) {
  try {
    log(`Enabling module: ${name}`);
    execSync(`ddev drush pm:enable ${name} --yes`, { cwd: REPO_ROOT, stdio: 'pipe' });
    log('Module enabled');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function disableModule(name) {
  try {
    log(`Disabling module: ${name}`);
    execSync(`ddev drush pm:disable ${name} --yes`, { cwd: REPO_ROOT, stdio: 'pipe' });
    log('Module disabled');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function clearCache() {
  try {
    log('Clearing Drupal cache');
    execSync('ddev drush cache-rebuild', { cwd: REPO_ROOT, stdio: 'pipe' });
    log('Cache cleared');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function runAxeScan(page) {
  try {
    await injectAxe(page);
    const results = await checkAxe(page);
    return { success: true, results };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function formatAxeResults(results) {
  if (!results || !results.violations) {
    return { total: 0, byRule: {}, byImpact: {} };
  }
  const byRule = {};
  const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };

  for (const v of results.violations) {
    byRule[v.id] = (byRule[v.id] || 0) + v.nodes.length;
    const impact = v.impact || 'unknown';
    if (byImpact.hasOwnProperty(impact)) {
      byImpact[impact] += v.nodes.length;
    }
  }

  return {
    total: results.violations.reduce((sum, v) => sum + v.nodes.length, 0),
    byRule,
    byImpact,
    violations: results.violations,
  };
}

async function takeScreenshot(page, selector, description) {
  try {
    const element = await page.$(selector);
    if (!element) return null;
    const box = await element.boundingBox();
    if (!box) return null;
    const screenshotPath = path.join(REPORTS_DIR, `${moduleName}-${description}-${Date.now()}.png`);
    await page.screenshot({
      path: screenshotPath,
      clip: {
        x: Math.max(0, box.x - 10),
        y: Math.max(0, box.y - 10),
        width: box.width + 20,
        height: box.height + 20,
      },
    });
    return screenshotPath;
  } catch (err) {
    return null;
  }
}

// ── Main evaluation flow ──────────────────────────────────────────────────────
(async () => {
  const browser = await chromium.launch();
  const context = await browser.createBrowserContext();
  const page = await context.newPage();

  const evaluation = {
    module: moduleName,
    config: moduleConfig,
    timestamp: new Date().toISOString(),
    testCases: [],
    summary: {
      moduleDisabled: { total: 0, byRule: {}, byImpact: {} },
      moduleEnabled: { total: 0, byRule: {}, byImpact: {} },
      impact: {
        violations_fixed: 0,
        violations_added: 0,
        net_change: 0,
      },
    },
  };

  try {
    // ── PHASE 1: Module DISABLED ──────────────────────────────────────────────
    log(`\n=== PHASE 1: Module DISABLED ===`);

    const disableResult = disableModule(moduleName);
    if (!disableResult.success) {
      console.error('Failed to disable module:', disableResult.error);
      process.exit(1);
    }

    const cacheResult1 = clearCache();
    if (!cacheResult1.success) {
      console.error('Failed to clear cache:', cacheResult1.error);
      process.exit(1);
    }

    // Wait for cache to propagate
    await new Promise((r) => setTimeout(r, 1000));

    // Test each page with module disabled
    for (let i = 0; i < moduleConfig.testCases.length; i++) {
      const testCase = moduleConfig.testCases[i];
      log(`\nTest ${i + 1}/${moduleConfig.testCases.length}: ${testCase.name}`);
      log(`  URL: ${testCase.url}`);

      const testResult = {
        name: testCase.name,
        url: testCase.url,
        disabled: { screenshots: [], axe: {} },
        enabled: { screenshots: [], axe: {} },
      };

      try {
        // Navigate and execute custom actions
        log(`  Navigating...`);
        await page.goto(`${BASE_URL}${testCase.url}`, { waitUntil: 'networkidle', timeout: 30000 });

        if (testCase.action) {
          log(`  Running custom actions...`);
          await testCase.action(page);
        }

        // Take screenshots
        for (const selector of testCase.selectors) {
          const ss = await takeScreenshot(page, selector, `disabled-test${i + 1}`);
          if (ss) testResult.disabled.screenshots.push({ selector, path: ss });
        }

        // Run axe scan
        log(`  Scanning with axe (module disabled)...`);
        const axeDisabled = await runAxeScan(page);
        testResult.disabled.axe = formatAxeResults(axeDisabled.results);
        evaluation.summary.moduleDisabled.total += testResult.disabled.axe.total;
        for (const [rule, count] of Object.entries(testResult.disabled.axe.byRule)) {
          evaluation.summary.moduleDisabled.byRule[rule] = (evaluation.summary.moduleDisabled.byRule[rule] || 0) + count;
        }
        for (const [impact, count] of Object.entries(testResult.disabled.axe.byImpact)) {
          evaluation.summary.moduleDisabled.byImpact[impact] = (evaluation.summary.moduleDisabled.byImpact[impact] || 0) + count;
        }

        log(`    Violations: ${testResult.disabled.axe.total}`);
        evaluation.testCases.push(testResult);
      } catch (err) {
        log(`  Error: ${err.message}`);
        testResult.disabled.error = err.message;
        evaluation.testCases.push(testResult);
      }
    }

    // ── PHASE 2: Module ENABLED ───────────────────────────────────────────────
    log(`\n\n=== PHASE 2: Module ENABLED ===`);

    const enableResult = enableModule(moduleName);
    if (!enableResult.success) {
      console.error('Failed to enable module:', enableResult.error);
      process.exit(1);
    }

    const cacheResult2 = clearCache();
    if (!cacheResult2.success) {
      console.error('Failed to clear cache:', cacheResult2.error);
      process.exit(1);
    }

    // Wait for cache to propagate
    await new Promise((r) => setTimeout(r, 1000));

    // Test each page with module enabled
    for (let i = 0; i < moduleConfig.testCases.length; i++) {
      const testCase = moduleConfig.testCases[i];
      const testResult = evaluation.testCases[i];

      log(`\nTest ${i + 1}/${moduleConfig.testCases.length}: ${testCase.name}`);
      log(`  URL: ${testCase.url}`);

      try {
        // Navigate and execute custom actions
        log(`  Navigating...`);
        await page.goto(`${BASE_URL}${testCase.url}`, { waitUntil: 'networkidle', timeout: 30000 });

        if (testCase.action) {
          log(`  Running custom actions...`);
          await testCase.action(page);
        }

        // Take screenshots
        for (const selector of testCase.selectors) {
          const ss = await takeScreenshot(page, selector, `enabled-test${i + 1}`);
          if (ss) testResult.enabled.screenshots.push({ selector, path: ss });
        }

        // Run axe scan
        log(`  Scanning with axe (module enabled)...`);
        const axeEnabled = await runAxeScan(page);
        testResult.enabled.axe = formatAxeResults(axeEnabled.results);
        evaluation.summary.moduleEnabled.total += testResult.enabled.axe.total;
        for (const [rule, count] of Object.entries(testResult.enabled.axe.byRule)) {
          evaluation.summary.moduleEnabled.byRule[rule] = (evaluation.summary.moduleEnabled.byRule[rule] || 0) + count;
        }
        for (const [impact, count] of Object.entries(testResult.enabled.axe.byImpact)) {
          evaluation.summary.moduleEnabled.byImpact[impact] = (evaluation.summary.moduleEnabled.byImpact[impact] || 0) + count;
        }

        log(`    Violations: ${testResult.enabled.axe.total}`);

        // ── Analyze per-test impact ───────────────────────────────────────────
        const disabledCount = testResult.disabled.axe.total;
        const enabledCount = testResult.enabled.axe.total;
        const delta = enabledCount - disabledCount;

        if (delta < 0) {
          evaluation.summary.impact.violations_fixed += Math.abs(delta);
        } else if (delta > 0) {
          evaluation.summary.impact.violations_added += delta;
        }
      } catch (err) {
        log(`  Error: ${err.message}`);
        testResult.enabled.error = err.message;
      }
    }

    // ── Calculate final impact ────────────────────────────────────────────────
    evaluation.summary.impact.net_change = 
      evaluation.summary.moduleEnabled.total - evaluation.summary.moduleDisabled.total;

    // ── Generate report ──────────────────────────────────────────────────────
    const lines = [];
    lines.push(`# Module Accessibility Evaluation: ${moduleConfig.name}`);
    lines.push('');
    lines.push(`**Generated:** ${new Date().toLocaleDateString('en-CA')} at ${new Date().toLocaleTimeString()}`);
    lines.push('');
    lines.push(`## Summary`);
    lines.push('');
    lines.push(`- **Module:** ${moduleName}`);
    lines.push(`- **Name:** ${moduleConfig.name}`);
    lines.push(`- **Description:** ${moduleConfig.description}`);
    lines.push(`- **Documentation:** [${moduleConfig.url}](${moduleConfig.url})`);
    lines.push(`- **WCAG Criteria:** ${moduleConfig.wcag.join(', ')}`);
    lines.push('');
    lines.push(`## Impact Assessment`);
    lines.push('');

    const status = evaluation.summary.impact.net_change < 0 
      ? '✅ **IMPROVES** accessibility' 
      : evaluation.summary.impact.net_change > 0
        ? '⚠️ **REGRESSES** accessibility'
        : '➡️ **NO NET CHANGE** to accessibility';

    lines.push(`**Status:** ${status}`);
    lines.push('');
    lines.push(`| Metric | Without Module | With Module | Change |`);
    lines.push(`|--------|---|---|---|`);
    lines.push(`| **Total violations** | ${evaluation.summary.moduleDisabled.total} | ${evaluation.summary.moduleEnabled.total} | ${evaluation.summary.impact.net_change > 0 ? '+' : ''}${evaluation.summary.impact.net_change} |`);
    lines.push('');
    lines.push(`### By Impact Level`);
    lines.push('');
    lines.push(`| Severity | Without Module | With Module | Change |`);
    lines.push(`|----------|---|---|---|`);
    for (const impact of ['critical', 'serious', 'moderate', 'minor']) {
      const disabledCount = evaluation.summary.moduleDisabled.byImpact[impact] || 0;
      const enabledCount = evaluation.summary.moduleEnabled.byImpact[impact] || 0;
      const change = enabledCount - disabledCount;
      lines.push(`| **${impact}** | ${disabledCount} | ${enabledCount} | ${change > 0 ? '+' : ''}${change} |`);
    }
    lines.push('');

    if (Object.keys(evaluation.summary.moduleDisabled.byRule).length > 0) {
      lines.push(`### By Rule (Module Disabled)`);
      lines.push('');
      for (const [rule, count] of Object.entries(evaluation.summary.moduleDisabled.byRule).sort((a, b) => b[1] - a[1])) {
        lines.push(`- \`${rule}\`: ${count} violations`);
      }
      lines.push('');
    }

    if (Object.keys(evaluation.summary.moduleEnabled.byRule).length > 0) {
      lines.push(`### By Rule (Module Enabled)`);
      lines.push('');
      for (const [rule, count] of Object.entries(evaluation.summary.moduleEnabled.byRule).sort((a, b) => b[1] - a[1])) {
        lines.push(`- \`${rule}\`: ${count} violations`);
      }
      lines.push('');
    }

    // Analyze which rules changed
    const fixedRules = {};
    const addedRules = {};

    for (const [rule, disabledCount] of Object.entries(evaluation.summary.moduleDisabled.byRule)) {
      const enabledCount = evaluation.summary.moduleEnabled.byRule[rule] || 0;
      if (enabledCount < disabledCount) {
        fixedRules[rule] = disabledCount - enabledCount;
      }
    }

    for (const [rule, enabledCount] of Object.entries(evaluation.summary.moduleEnabled.byRule)) {
      const disabledCount = evaluation.summary.moduleDisabled.byRule[rule] || 0;
      if (enabledCount > disabledCount) {
        addedRules[rule] = enabledCount - disabledCount;
      }
    }

    if (Object.keys(fixedRules).length > 0) {
      lines.push(`### ✅ Fixed By Module`);
      lines.push('');
      for (const [rule, count] of Object.entries(fixedRules).sort((a, b) => b[1] - a[1])) {
        lines.push(`- \`${rule}\`: −${count}`);
      }
      lines.push('');
    }

    if (Object.keys(addedRules).length > 0) {
      lines.push(`### ⚠️ Regressions Introduced By Module`);
      lines.push('');
      for (const [rule, count] of Object.entries(addedRules).sort((a, b) => b[1] - a[1])) {
        lines.push(`- \`${rule}\`: +${count}`);
      }
      lines.push('');
    }

    lines.push(`---`);
    lines.push('');
    lines.push(`## Detailed Test Results`);
    lines.push('');

    for (let i = 0; i < evaluation.testCases.length; i++) {
      const tc = evaluation.testCases[i];
      lines.push(`### Test ${i + 1}: ${tc.name}`);
      lines.push('');
      lines.push(`**URL:** \`${BASE_URL}${tc.url}\``);
      lines.push('');
      lines.push(`| State | Violations | Critical | Serious | Moderate | Minor |`);
      lines.push(`|-------|---|---|---|---|---|`);
      
      if (tc.disabled.error) {
        lines.push(`| Module Disabled | ERROR | — | — | — | — |`);
      } else {
        lines.push(`| **Module Disabled** | ${tc.disabled.axe.total} | ${tc.disabled.axe.byImpact.critical || 0} | ${tc.disabled.axe.byImpact.serious || 0} | ${tc.disabled.axe.byImpact.moderate || 0} | ${tc.disabled.axe.byImpact.minor || 0} |`);
      }

      if (tc.enabled.error) {
        lines.push(`| Module Enabled | ERROR | — | — | — | — |`);
      } else {
        lines.push(`| **Module Enabled** | ${tc.enabled.axe.total} | ${tc.enabled.axe.byImpact.critical || 0} | ${tc.enabled.axe.byImpact.serious || 0} | ${tc.enabled.axe.byImpact.moderate || 0} | ${tc.enabled.axe.byImpact.minor || 0} |`);
        
        if (!tc.disabled.error && !tc.enabled.error) {
          const delta = tc.enabled.axe.total - tc.disabled.axe.total;
          const symbol = delta < 0 ? '✅' : delta > 0 ? '⚠️' : '➡️';
          lines.push(`| **Change** | ${symbol} ${delta > 0 ? '+' : ''}${delta} | — | — | — | — |`);
        }
      }
      lines.push('');
    }

    lines.push(`---`);
    lines.push('');
    lines.push(`## WCAG Criteria Addressed`);
    lines.push('');
    for (const criterion of moduleConfig.wcagCriteria) {
      lines.push(`- ${criterion}`);
    }
    lines.push('');
    lines.push(`## Screenshots`);
    lines.push('');
    lines.push(`Before and after screenshots have been captured in the reports directory.`);
    lines.push('');

    const md = lines.join('\n');
    const reportPath = path.join(REPORTS_DIR, `${moduleName}-evaluation.md`);
    fs.writeFileSync(reportPath, md);
    log(`\n✅ Report written to ${reportPath}`);

    // JSON data file
    const jsonPath = path.join(REPORTS_DIR, `${moduleName}-evaluation.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(evaluation, null, 2));
    log(`✅ Data written to ${jsonPath}`);

    // Ensure module is re-enabled before exit
    log(`\nCleaning up: ensuring module is enabled`);
    enableModule(moduleName);
    clearCache();

    log(`\nEvaluation complete`);
    process.exit(evaluation.summary.impact.net_change > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal error:', err);
    // Attempt cleanup
    try {
      enableModule(moduleName);
    } catch (e) {
      console.error('Cleanup failed:', e.message);
    }
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
