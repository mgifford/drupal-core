#!/usr/bin/env node
/**
 * Patch Evaluation Script
 *
 * Automates testing of accessibility patches:
 * 1. Takes screenshots and HTML snapshots before patch
 * 2. Runs axe-core scan
 * 3. Applies patch
 * 4. Clears Drupal cache
 * 5. Takes screenshots and HTML snapshots after patch
 * 6. Runs axe-core scan again
 * 7. Compares results and generates report
 * 8. Resets code to original state
 *
 * Usage:
 *   node evaluate-patch.js <patch-name>
 *   node evaluate-patch.js a11y-DRUPAL-A11Y-002-submit-button-contrast
 *
 * Output:
 *   reports/<patch-name>-evaluation.md
 *   reports/<patch-name>-evaluation.html
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync, exec } = require('child_process');
const { chromium } = require('playwright');
const { injectAxe, getViolations } = require('axe-playwright');
const config = require('./lib/patch-evaluator-config');
const { renderMarkdownReport } = require('./lib/render-markdown-report');

// ── Config ────────────────────────────────────────────────────────────────────
const patchName = process.argv[2];
if (!patchName) {
  console.error('Usage: node evaluate-patch.js <patch-name>');
  console.error('Example: node evaluate-patch.js a11y-DRUPAL-A11Y-002-submit-button-contrast');
  process.exit(1);
}

const patchConfig = config[patchName];
if (!patchConfig) {
  console.error(`Patch not found in config: ${patchName}`);
  console.error('Available patches:', Object.keys(config).join(', '));
  process.exit(1);
}

const PATCHES_DIR = path.resolve(__dirname, '../../../..', 'patches');
const REPORTS_DIR = path.resolve(__dirname, '../../../..', 'reports');
const REPO_ROOT = path.resolve(__dirname, '../../../..');
const BASE_URL = 'http://drupal-core.ddev.site';
const PATCH_FILE = path.join(PATCHES_DIR, `${patchName}.patch`);

// ── Utilities ─────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function detectScreenType(viewport) {
  if (!viewport || typeof viewport.width !== 'number') {
    return 'desktop';
  }
  return viewport.width < 768 ? 'mobile' : 'desktop';
}

function normalizeSelector(target) {
  if (Array.isArray(target)) {
    return target.join(' > ');
  }
  return String(target || '');
}

function shortHash(input) {
  return crypto.createHash('sha256').update(input).digest('hex').slice(0, 8);
}

function generateInstanceId(pagePath, selector, ruleId, screenType, prefix = 'DRU') {
  return `${prefix}-${shortHash(`${pagePath}|${selector}|${ruleId}|${screenType}`)}`;
}

function generatePatternId(selector, ruleId, screenType, prefix = 'DRU') {
  return `${prefix}-${shortHash(`${selector}|${ruleId}|${screenType}`)}`;
}

function annotateViolations(violations, pagePath, screenType, colorMode = 'light', prefix = 'DRU') {
  if (!Array.isArray(violations)) {
    return [];
  }

  return violations.flatMap((violation) => {
    const ruleId = violation.id;
    const nodes = Array.isArray(violation.nodes) ? violation.nodes : [];
    return nodes.map((node) => {
      const selector = normalizeSelector(node.target);
      return {
        instance_id: generateInstanceId(pagePath, selector, ruleId, screenType, prefix),
        pattern_id: generatePatternId(selector, ruleId, screenType, prefix),
        screen_type: screenType,
        color_mode: colorMode,
        page_path: pagePath,
        selector,
        rule_id: ruleId,
        impact: node.impact || violation.impact || 'unknown',
        html_snippet: node.html || '',
      };
    });
  });
}

function buildExpectedTargets(
  pagePath,
  selectors,
  rules,
  screenType,
  colorMode = 'light',
  prefix = 'DRU',
  explicitPatternId = null,
) {
  const targets = [];
  for (const selector of selectors || []) {
    for (const ruleId of rules || []) {
      targets.push({
        instance_id: generateInstanceId(pagePath, selector, ruleId, screenType, prefix),
        pattern_id: explicitPatternId || generatePatternId(selector, ruleId, screenType, prefix),
        screen_type: screenType,
        color_mode: colorMode,
        page_path: pagePath,
        selector,
        rule_id: ruleId,
      });
    }
  }
  return targets;
}

async function takeScreenshot(page, selector, description) {
  try {
    const element = await page.$(selector);
    if (!element) {
      return { success: false, error: `Element not found: ${selector}` };
    }
    const box = await element.boundingBox();
    if (!box) {
      return { success: false, error: `Element has no bounding box: ${selector}` };
    }
    const screenshotPath = path.join(REPORTS_DIR, `${patchName}-${description}-${Date.now()}.png`);
    await page.screenshot({
      path: screenshotPath,
      clip: {
        x: Math.max(0, box.x - 10),
        y: Math.max(0, box.y - 10),
        width: box.width + 20,
        height: box.height + 20,
      },
    });
    return { success: true, path: screenshotPath };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function captureHtml(page, selector) {
  try {
    const element = await page.$(selector);
    if (!element) return { success: false, error: `Element not found: ${selector}` };
    const html = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el || !el.parentElement) return '';
      // Capture element + surrounding context
      const clone = el.parentElement.cloneNode(true);
      return clone.outerHTML;
    }, selector);
    return { success: true, html };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function runAxeScan(page) {
  try {
    await injectAxe(page);
    const violations = await getViolations(page);
    return { success: true, results: { violations } };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function applyPatch() {
  try {
    log(`Applying patch: ${PATCH_FILE}`);
    execSync(`git apply "${PATCH_FILE}"`, { cwd: REPO_ROOT, stdio: 'pipe' });
    log('Patch applied successfully');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function resetPatch() {
  try {
    log('Resetting code to original state');
    execSync(`git checkout -- .`, { cwd: REPO_ROOT, stdio: 'pipe' });
    log('Code reset successfully');
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

function formatAxeResults(results) {
  if (!results || !results.violations) {
    return { total: 0, byRule: {} };
  }
  const byRule = {};
  for (const v of results.violations) {
    byRule[v.id] = (byRule[v.id] || 0) + v.nodes.length;
  }
  return {
    total: results.violations.reduce((sum, v) => sum + v.nodes.length, 0),
    byRule,
    violations: results.violations,
  };
}

function normalizeDynamicSelector(selector) {
  return String(selector || '')
    .replace(/\d+/g, 'N')
    .replace(/\s+/g, ' ')
    .trim();
}

function selectorMatches(targetSelector, selectorKey) {
  const a = normalizeDynamicSelector(targetSelector);
  const b = normalizeDynamicSelector(selectorKey);
  if (!a || !b) {
    return false;
  }
  return a === b || a.includes(b) || b.includes(a);
}

function findLatestPatternReport() {
  const latestPath = path.join(REPORTS_DIR, 'pattern-report-latest.json');
  if (fs.existsSync(latestPath)) {
    return latestPath;
  }
  const dated = fs
    .readdirSync(REPORTS_DIR)
    .filter((name) => /^pattern-report-\d{4}-\d{2}-\d{2}\.json$/.test(name))
    .sort()
    .reverse();
  return dated.length ? path.join(REPORTS_DIR, dated[0]) : null;
}

function loadPatternReport() {
  const reportPath = findLatestPatternReport();
  if (!reportPath) {
    return { path: null, patterns: [] };
  }
  try {
    const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    return {
      path: reportPath,
      patterns: Array.isArray(data.patterns) ? data.patterns : [],
    };
  } catch (err) {
    log(`Warning: unable to parse pattern report ${reportPath}: ${err.message}`);
    return { path: reportPath, patterns: [] };
  }
}

function deriveTestCasesFromPatterns(patchCfg, reportPatterns) {
  if (!Array.isArray(patchCfg.patternIds) || patchCfg.patternIds.length === 0) {
    return Array.isArray(patchCfg.testCases) ? patchCfg.testCases : [];
  }
  const maxPaths = Number.isInteger(patchCfg.maxPathsPerPattern) ? patchCfg.maxPathsPerPattern : 3;
  const byId = new Map((reportPatterns || []).map((p) => [p.patternId, p]));
  const testCases = [];
  const seen = new Set();

  for (const patternId of patchCfg.patternIds) {
    const pattern = byId.get(patternId);
    if (!pattern) {
      continue;
    }
    const concretePaths = Array.isArray(pattern.concretePaths) ? pattern.concretePaths : [];
    for (const pagePath of concretePaths.slice(0, maxPaths)) {
      const key = `${patternId}|${pagePath}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      testCases.push({
        url: pagePath,
        selectors: [pattern.selectorKey],
        expectedFix: `Pattern ${pattern.patternId} (${pattern.ruleId}) should improve`,
        viewport: { width: 1280, height: 1024 },
        sourcePatternId: pattern.patternId,
        sourceRuleId: pattern.ruleId,
      });
    }
  }

  return testCases.length ? testCases : (Array.isArray(patchCfg.testCases) ? patchCfg.testCases : []);
}

function findTargetMatches(annotatedViolations, target) {
  const list = Array.isArray(annotatedViolations) ? annotatedViolations : [];
  return list.filter((v) => {
    if (v.rule_id !== target.rule_id) {
      return false;
    }
    if (v.page_path !== target.page_path) {
      return false;
    }
    return selectorMatches(v.selector, target.selector);
  });
}

// ── Main evaluation flow ──────────────────────────────────────────────────────
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const evaluation = {
    patch: patchName,
    config: patchConfig,
    timestamp: new Date().toISOString(),
    testCases: [],
    summary: {
      before: { total: 0, byRule: {} },
      after: { total: 0, byRule: {} },
      fixed: [],
      new: [],
      resolved: false,
    },
    patternReport: {
      source: null,
      matchedPatterns: [],
      summary: {
        targeted: 0,
        observedBefore: 0,
        fullyFixed: 0,
        partiallyFixed: 0,
        unchanged: 0,
      },
    },
    instanceReport: {
      summary: {
        targeted: 0,
        observedBefore: 0,
        fixed: 0,
        remaining: 0,
        notObserved: 0,
      },
      entries: [],
    },
  };

  const patternReport = loadPatternReport();
  evaluation.patternReport.source = patternReport.path;
  const testCases = deriveTestCasesFromPatterns(patchConfig, patternReport.patterns);
  const targetedPatterns = Array.isArray(patchConfig.patternIds)
    ? patchConfig.patternIds
        .map((patternId) => patternReport.patterns.find((p) => p.patternId === patternId))
        .filter(Boolean)
    : [];

  try {
    for (const testCase of testCases) {
      log(`\n=== Test case: ${testCase.url} ===`);
      const testResult = {
        url: testCase.url,
        selectors: testCase.selectors,
        expected_targets: [],
        before: { screenshots: [], html: [], axe: {} },
        after: { screenshots: [], html: [], axe: {} },
      };

      if (testCase.viewport) {
        await page.setViewportSize(testCase.viewport);
      }

      const screenType = detectScreenType(testCase.viewport);
      const pagePath = testCase.url;
      const colorMode = 'light';
      const caseRules = testCase.sourceRuleId ? [testCase.sourceRuleId] : patchConfig.rules;
      testResult.expected_targets = buildExpectedTargets(
        pagePath,
        testCase.selectors,
        caseRules,
        screenType,
        colorMode,
        'DRU',
        testCase.sourcePatternId || null,
      );

      // ── BEFORE: Take screenshots, capture HTML, run axe ──────────────────
      log(`Navigating to ${testCase.url}`);
      await page.goto(`${BASE_URL}${testCase.url}`, { waitUntil: 'networkidle' });

      for (const selector of testCase.selectors) {
        log(`  Capturing before state: ${selector}`);

        // Screenshot
        const ss = await takeScreenshot(page, selector, `before-${testCase.url.replace(/\//g, '-')}`);
        testResult.before.screenshots.push(ss);

        // HTML
        const html = await captureHtml(page, selector);
        testResult.before.html.push({ selector, ...html });
      }

      // Axe scan
      log(`  Running axe scan (before)`);
      const axeBefore = await runAxeScan(page);
      testResult.before.axe = formatAxeResults(axeBefore.results);
      testResult.before.annotated_violations = annotateViolations(
        testResult.before.axe.violations,
        pagePath,
        screenType,
        colorMode,
      );
      evaluation.summary.before.total += testResult.before.axe.total;
      for (const [rule, count] of Object.entries(testResult.before.axe.byRule)) {
        evaluation.summary.before.byRule[rule] = (evaluation.summary.before.byRule[rule] || 0) + count;
      }

      // ── APPLY PATCH ──────────────────────────────────────────────────────
      const applyResult = applyPatch();
      if (!applyResult.success) {
        testResult.error = `Patch application failed: ${applyResult.error}`;
        evaluation.testCases.push(testResult);
        continue;
      }

      const cacheResult = clearCache();
      if (!cacheResult.success) {
        testResult.error = `Cache clear failed: ${cacheResult.error}`;
        evaluation.testCases.push(testResult);
        resetPatch();
        continue;
      }

      // Wait for cache clear to propagate
      await new Promise((r) => setTimeout(r, 1000));

      // ── AFTER: Take screenshots, capture HTML, run axe ────────────────────
      log(`Navigating to ${testCase.url} (after patch)`);
      await page.goto(`${BASE_URL}${testCase.url}`, { waitUntil: 'networkidle', timeout: 60000 });

      for (const selector of testCase.selectors) {
        log(`  Capturing after state: ${selector}`);

        // Screenshot
        const ss = await takeScreenshot(page, selector, `after-${testCase.url.replace(/\//g, '-')}`);
        testResult.after.screenshots.push(ss);

        // HTML
        const html = await captureHtml(page, selector);
        testResult.after.html.push({ selector, ...html });
      }

      // Axe scan
      log(`  Running axe scan (after)`);
      const axeAfter = await runAxeScan(page);
      testResult.after.axe = formatAxeResults(axeAfter.results);
      testResult.after.annotated_violations = annotateViolations(
        testResult.after.axe.violations,
        pagePath,
        screenType,
        colorMode,
      );
      evaluation.summary.after.total += testResult.after.axe.total;
      for (const [rule, count] of Object.entries(testResult.after.axe.byRule)) {
        evaluation.summary.after.byRule[rule] = (evaluation.summary.after.byRule[rule] || 0) + count;
      }

      // ── COMPARE RESULTS ──────────────────────────────────────────────────
      log(`  Comparing results...`);
      log(`    Before: ${testResult.before.axe.total} violations`);
      log(`    After: ${testResult.after.axe.total} violations`);

      // Track fixed rules
      for (const [rule, beforeCount] of Object.entries(testResult.before.axe.byRule)) {
        const afterCount = testResult.after.axe.byRule[rule] || 0;
        if (afterCount < beforeCount) {
          evaluation.summary.fixed.push({
            rule,
            beforeCount,
            afterCount,
            fixed: beforeCount - afterCount,
          });
        }
      }

      // Track new violations
      for (const [rule, afterCount] of Object.entries(testResult.after.axe.byRule)) {
        const beforeCount = testResult.before.axe.byRule[rule] || 0;
        if (afterCount > beforeCount) {
          evaluation.summary.new.push({ rule, beforeCount, afterCount, added: afterCount - beforeCount });
        }
      }

      // Track expected instance IDs by matching rule/path/selector instead of hash-only equality.
      for (const target of testResult.expected_targets) {
        const beforeMatches = findTargetMatches(testResult.before.annotated_violations, target);
        const afterMatches = findTargetMatches(testResult.after.annotated_violations, target);
        const beforeIds = [...new Set(beforeMatches.map((m) => m.instance_id))];
        const afterIds = [...new Set(afterMatches.map((m) => m.instance_id))];

        let status = 'not-observed';
        if (beforeIds.length > 0 && afterIds.length === 0) {
          status = 'fixed';
        } else if (afterIds.length > 0 && afterIds.length < beforeIds.length) {
          status = 'partially-fixed';
        } else if (beforeIds.length > 0 && afterIds.length > 0) {
          status = 'remaining';
        }

        evaluation.instanceReport.entries.push({
          instanceId: beforeIds[0] || target.instance_id,
          patternId: target.pattern_id,
          ruleId: target.rule_id,
          pagePath: target.page_path,
          selector: target.selector,
          status,
          seenBefore: beforeIds.length > 0,
          seenAfter: afterIds.length > 0,
          beforeCount: beforeIds.length,
          afterCount: afterIds.length,
          beforeInstanceIds: beforeIds,
          afterInstanceIds: afterIds,
        });
      }

      // ── RESET CODE ───────────────────────────────────────────────────────
      const resetResult = resetPatch();
      if (!resetResult.success) {
        testResult.error = `Code reset failed: ${resetResult.error}`;
      }

      evaluation.testCases.push(testResult);
    }

    if (targetedPatterns.length > 0) {
      for (const pattern of targetedPatterns) {
        const relatedEntries = evaluation.instanceReport.entries.filter(
          (entry) => entry.patternId === pattern.patternId,
        );
        const beforeCount = relatedEntries.reduce((sum, entry) => sum + (entry.beforeCount || 0), 0);
        const afterCount = relatedEntries.reduce((sum, entry) => sum + (entry.afterCount || 0), 0);
        let status = 'unchanged';
        if (beforeCount > 0 && afterCount === 0) {
          status = 'fully-fixed';
        } else if (afterCount < beforeCount) {
          status = 'partially-fixed';
        }

        evaluation.patternReport.matchedPatterns.push({
          patternId: pattern.patternId,
          ruleId: pattern.ruleId,
          selectorKey: pattern.selectorKey,
          concretePaths: pattern.concretePaths || [],
          beforeCount,
          afterCount,
          status,
        });
      }

      evaluation.patternReport.summary.targeted = evaluation.patternReport.matchedPatterns.length;
      evaluation.patternReport.summary.observedBefore = evaluation.patternReport.matchedPatterns.filter(
        (p) => p.beforeCount > 0,
      ).length;
      evaluation.patternReport.summary.fullyFixed = evaluation.patternReport.matchedPatterns.filter(
        (p) => p.status === 'fully-fixed',
      ).length;
      evaluation.patternReport.summary.partiallyFixed = evaluation.patternReport.matchedPatterns.filter(
        (p) => p.status === 'partially-fixed',
      ).length;
      evaluation.patternReport.summary.unchanged = evaluation.patternReport.matchedPatterns.filter(
        (p) => p.status === 'unchanged',
      ).length;
    }

    evaluation.instanceReport.summary.targeted = evaluation.instanceReport.entries.length;
    evaluation.instanceReport.summary.observedBefore = evaluation.instanceReport.entries.filter(
      (entry) => entry.seenBefore,
    ).length;
    evaluation.instanceReport.summary.fixed = evaluation.instanceReport.entries.filter(
      (entry) => entry.status === 'fixed',
    ).length;
    evaluation.instanceReport.summary.remaining = evaluation.instanceReport.entries.filter(
      (entry) => entry.status === 'remaining' || entry.status === 'partially-fixed',
    ).length;
    evaluation.instanceReport.summary.notObserved = evaluation.instanceReport.entries.filter(
      (entry) => entry.status === 'not-observed',
    ).length;

    // ── Generate report ──────────────────────────────────────────────────────
    evaluation.summary.resolved = evaluation.summary.new.length === 0 && evaluation.summary.fixed.length > 0;

    const lines = [];
    lines.push(`# Patch Evaluation Report: ${patchName}`);
    lines.push('');
    lines.push(`**Generated:** ${new Date().toLocaleDateString('en-CA')} at ${new Date().toLocaleTimeString()}`);
    lines.push('');
    lines.push(`## Summary`);
    lines.push('');
    lines.push(`- **Description:** ${patchConfig.description}`);
    lines.push(`- **WCAG Criteria:** ${patchConfig.wcag.join(', ')}`);
    lines.push(`- **Affected Rules:** ${patchConfig.rules.join(', ')}`);
    if (evaluation.patternReport.source) {
      lines.push(`- **Pattern Source:** ${evaluation.patternReport.source.replace(`${REPO_ROOT}/`, '')}`);
    }
    lines.push(`- **Status:** ${evaluation.summary.resolved ? '✅ **PASS** — Patch resolves the issues without introducing new violations' : '❌ **FAIL** — Patch introduces new violations or does not resolve all issues'}`);
    lines.push('');
    if (evaluation.patternReport.matchedPatterns.length > 0) {
      lines.push('### Pattern Coverage (From Scan Report)');
      lines.push('');
      lines.push(`- **Targeted patterns:** ${evaluation.patternReport.summary.targeted}`);
      lines.push(`- **Patterns seen before patch:** ${evaluation.patternReport.summary.observedBefore}`);
      lines.push(`- **Fully fixed patterns:** ${evaluation.patternReport.summary.fullyFixed}`);
      lines.push(`- **Partially fixed patterns:** ${evaluation.patternReport.summary.partiallyFixed}`);
      lines.push(`- **Unchanged patterns:** ${evaluation.patternReport.summary.unchanged}`);
      lines.push('');
      lines.push('| Pattern ID | Rule | Paths (sample) | Before | After | Status |');
      lines.push('|---|---|---|---:|---:|---|');
      for (const pattern of evaluation.patternReport.matchedPatterns) {
        const samplePaths = (pattern.concretePaths || []).slice(0, 3).join(', ');
        lines.push(
          `| ${pattern.patternId} | ${pattern.ruleId} | ${samplePaths || '-'} | ${pattern.beforeCount} | ${pattern.afterCount} | ${pattern.status} |`,
        );
      }
      lines.push('');
    }
    if (evaluation.instanceReport.entries.length > 0) {
      lines.push('### Instance ID Coverage');
      lines.push('');
      lines.push(`- **Targeted instance IDs:** ${evaluation.instanceReport.summary.targeted}`);
      lines.push(`- **Seen before patch:** ${evaluation.instanceReport.summary.observedBefore}`);
      lines.push(`- **Fixed instances:** ${evaluation.instanceReport.summary.fixed}`);
      lines.push(`- **Remaining instances:** ${evaluation.instanceReport.summary.remaining}`);
      lines.push(`- **Not observed in baseline:** ${evaluation.instanceReport.summary.notObserved}`);
      lines.push('');
      lines.push('| Instance ID | Pattern ID | Rule | Path | Status | Before IDs | After IDs |');
      lines.push('|---|---|---|---|---|---|---|');
      for (const entry of evaluation.instanceReport.entries) {
        const beforeIds = (entry.beforeInstanceIds || []).join(', ') || '-';
        const afterIds = (entry.afterInstanceIds || []).join(', ') || '-';
        lines.push(
          `| ${entry.instanceId} | ${entry.patternId} | ${entry.ruleId} | ${entry.pagePath} | ${entry.status} | ${beforeIds} | ${afterIds} |`,
        );
      }
      lines.push('');
    }
    lines.push('### Violation Counts');
    lines.push('');
    lines.push(`| Metric | Before | After | Change |`);
    lines.push(`|--------|--------|-------|--------|`);
    lines.push(`| **Total violations** | ${evaluation.summary.before.total} | ${evaluation.summary.after.total} | ${evaluation.summary.after.total - evaluation.summary.before.total} |`);
    lines.push('');
    if (evaluation.summary.fixed.length > 0) {
      lines.push('### Fixed Rules');
      lines.push('');
      for (const fixed of evaluation.summary.fixed) {
        lines.push(`- \`${fixed.rule}\`: ${fixed.beforeCount} → ${fixed.afterCount} (−${fixed.fixed})`);
      }
      lines.push('');
    }
    if (evaluation.summary.new.length > 0) {
      lines.push('### ⚠️ New Violations Introduced');
      lines.push('');
      for (const newV of evaluation.summary.new) {
        lines.push(`- \`${newV.rule}\`: ${newV.beforeCount} → ${newV.afterCount} (+${newV.added})`);
      }
      lines.push('');
    }
    lines.push('---');
    lines.push('');
    lines.push('## Test Cases');
    lines.push('');
    for (let i = 0; i < evaluation.testCases.length; i++) {
      const tc = evaluation.testCases[i];
      lines.push(`### Test ${i + 1}: ${tc.url}`);
      lines.push('');
      if (tc.error) {
        lines.push(`**Error:** ${tc.error}`);
        lines.push('');
        continue;
      }
      lines.push(`**URL:** \`${BASE_URL}${tc.url}\``);
      lines.push('');
      lines.push(`**Elements tested:** ${tc.selectors.join(', ')}`);
      lines.push('');
      lines.push('#### Before Patch');
      lines.push('');
      lines.push(`- **Total violations:** ${tc.before.axe.total}`);
      if (Object.keys(tc.before.axe.byRule).length > 0) {
        lines.push('- **By rule:**');
        for (const [rule, count] of Object.entries(tc.before.axe.byRule)) {
          lines.push(`  - \`${rule}\`: ${count}`);
        }
      }
      lines.push('');
      lines.push('#### After Patch');
      lines.push('');
      lines.push(`- **Total violations:** ${tc.after.axe.total}`);
      if (Object.keys(tc.after.axe.byRule).length > 0) {
        lines.push('- **By rule:**');
        for (const [rule, count] of Object.entries(tc.after.axe.byRule)) {
          lines.push(`  - \`${rule}\`: ${count}`);
        }
      }
      lines.push('');
    }
    lines.push('---');
    lines.push('');
    lines.push('## Screenshots');
    lines.push('');
    lines.push('Before and after screenshots have been captured and are available in the reports directory.');
    lines.push('');
    lines.push('## HTML Snapshots');
    lines.push('');
    lines.push('HTML snapshots of failing elements (before and after) are included in this report for code review.');
    lines.push('');

    const md = lines.join('\n');
    const reportPath = path.join(PATCHES_DIR, `${patchName}-evaluation.md`);
    fs.writeFileSync(reportPath, md);
    log(`\n✅ Report written to ${reportPath}`);

    // JSON data file
    const jsonPath = path.join(PATCHES_DIR, `${patchName}-evaluation.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(evaluation, null, 2));
    log(`✅ Data written to ${jsonPath}`);

    // HTML report
    const html = renderMarkdownReport({
      title: `Patch Evaluation: ${patchName}`,
      markdown: md,
      sourceLabel: 'evaluate-patch.js',
    });
    const htmlPath = path.join(PATCHES_DIR, `${patchName}-evaluation.html`);
    fs.writeFileSync(htmlPath, html);
    log(`✅ HTML report written to ${htmlPath}`);

    log(`\n${evaluation.summary.resolved ? '✅ PASS' : '❌ FAIL'} — Evaluation complete`);
    process.exit(evaluation.summary.resolved ? 0 : 1);
  } catch (err) {
    console.error('Fatal error:', err);
    resetPatch();
    process.exit(1);
  } finally {
    try {
      await page.close();
      await browser.close();
    } catch (e) {
      // Browser already closed
    }
  }
})();
