#!/usr/bin/env node
/**
 * @file
 * Test accessibility impact of a single Drupal Core module.
 *
 * Workflow:
 * 1. Load module config from .drupal-a11y-module-config.json
 * 2. Run baseline accessibility scan (18 Tier 1 workflows)
 * 3. Enable target module
 * 4. Run accessibility scan with module enabled
 * 5. Disable module (restore baseline)
 * 6. Compare violations: added (regressions), fixed (improvements)
 * 7. Generate report with instance_id/pattern_id tracking
 *
 * Usage:
 *   node test-module-accessibility.js <module-name>
 *   node test-module-accessibility.js layout_builder
 *   node test-module-accessibility.js layout_builder --headed
 *
 * Output:
 *   reports/module-impact/<module-name>/baseline-violations.json
 *   reports/module-impact/<module-name>/module-violations.json
 *   reports/module-impact/<module-name>/impact-analysis.md
 *   reports/module-impact/<module-name>/impact-analysis.json
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { chromium } = require('playwright');
const { injectAxe, getViolations } = require('axe-playwright');
const ModuleManager = require('../lib/module-manager');

// ── Config ────────────────────────────────────────────────────────────────────
const moduleName = process.argv[2];
const headedMode = process.argv.includes('--headed');

if (!moduleName) {
  console.error('Usage: node test-module-accessibility.js <module-name> [--headed]');
  console.error('Example: node test-module-accessibility.js layout_builder');
  process.exit(1);
}

const DRUPAL_ROOT = path.join(__dirname, '../../..');
const CONFIG_FILE = path.join(DRUPAL_ROOT, '.drupal-a11y-module-config.json');
const REPORTS_DIR = path.join(DRUPAL_ROOT, 'reports/module-impact', moduleName);
const BASE_URL = 'http://drupal-core.ddev.site';

// Load module config
let moduleConfig;
try {
  const configData = fs.readFileSync(CONFIG_FILE, 'utf-8');
  const fullConfig = JSON.parse(configData);
  moduleConfig = fullConfig.modules[moduleName];
  if (!moduleConfig) {
    console.error(`Module not found in config: ${moduleName}`);
    process.exit(1);
  }
} catch (e) {
  console.error(`Failed to load module config: ${e.message}`);
  console.error('Run: npm run a11y:discover-modules');
  process.exit(1);
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function generateInstanceId(pagePath, selector, ruleId, screenType) {
  const input = `${pagePath}|${selector}|${ruleId}|${screenType}`;
  return crypto.createHash('sha256').update(input).digest('hex');
}

function generatePatternId(selector, ruleId, screenType) {
  const input = `${selector}|${ruleId}|${screenType}`;
  return crypto.createHash('sha256').update(input).digest('hex');
}

function normalizeSelector(target) {
  if (Array.isArray(target)) {
    return target.join(' > ');
  }
  return String(target || '');
}

/**
 * Run accessibility scan on test pages
 */
async function scanAccessibility(page, testPages, screenType) {
  const violations = [];

  for (const testPage of testPages) {
    try {
      await page.goto(`${BASE_URL}${testPage.url}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500); // Let page settle

      // Inject axe-core
      await injectAxe(page);

      // Get violations
      const pageViolations = await getViolations(page);

      if (pageViolations && pageViolations.length > 0) {
        for (const violation of pageViolations) {
          for (const node of violation.nodes) {
            const selector = normalizeSelector(node.target);
            const instanceId = generateInstanceId(testPage.url, selector, violation.id, screenType);
            const patternId = generatePatternId(selector, violation.id, screenType);

            violations.push({
              instance_id: instanceId,
              pattern_id: patternId,
              page_url: testPage.url,
              page_title: testPage.title,
              selector: selector,
              rule_id: violation.id,
              wcag_criterion: violation.tags.find(t => /^\d\.\d\.\d$/.test(t)) || 'unknown',
              severity: violation.impact || 'medium',
              issue_description: violation.description,
              screen_type: screenType,
              timestamp: new Date().toISOString()
            });
          }
        }
      }
    } catch (e) {
      console.warn(`  ⚠ Failed to scan ${testPage.url}: ${e.message}`);
    }
  }

  return violations;
}

/**
 * Get test pages for module
 */
function getTestPages() {
  return [
    { url: '/user/login', title: 'Login' },
    { url: '/user/register', title: 'Registration' },
    { url: '/', title: 'Homepage' },
    { url: '/admin', title: 'Admin Dashboard' },
    { url: '/admin/structure', title: 'Structure' },
    { url: '/admin/content', title: 'Content' }
  ];
}

/**
 * Compare baseline vs module violations
 */
function analyzeImpact(baselineViolations, moduleViolations) {
  const baselineInstanceIds = new Set(baselineViolations.map(v => v.instance_id));
  const moduleInstanceIds = new Set(moduleViolations.map(v => v.instance_id));

  const baselinePatternIds = new Set(baselineViolations.map(v => v.pattern_id));
  const modulePatternIds = new Set(moduleViolations.map(v => v.pattern_id));

  // Violations fixed (in baseline but not in module)
  const fixedViolations = baselineViolations.filter(v => !moduleInstanceIds.has(v.instance_id));
  const fixedPatterns = Array.from(baselinePatternIds).filter(id => !modulePatternIds.has(id)).length;

  // Violations added (in module but not in baseline)
  const newViolations = moduleViolations.filter(v => !baselineInstanceIds.has(v.instance_id));
  const newPatterns = Array.from(modulePatternIds).filter(id => !baselinePatternIds.has(id)).length;

  // Impact score
  const impactScore = fixedViolations.length - newViolations.length;

  // Determine status
  let status = 'NO_IMPACT';
  if (newViolations.length > 0 && fixedViolations.length > 0) {
    status = 'MIXED';
  } else if (newViolations.length > 0) {
    status = 'FAIL';
  } else if (fixedViolations.length > 0) {
    status = 'PASS';
  }

  // Severity level
  let severity = 'low';
  if (newViolations.length > 20) severity = 'critical';
  else if (newViolations.length > 10) severity = 'high';
  else if (newViolations.length > 5) severity = 'medium';

  return {
    status,
    severity,
    impact_score: impactScore,
    metrics: {
      baseline_violations: baselineViolations.length,
      module_violations: moduleViolations.length,
      violations_fixed: fixedViolations.length,
      violations_added: newViolations.length,
      patterns_fixed: fixedPatterns,
      patterns_added: newPatterns
    },
    fixed_violations: fixedViolations,
    new_violations: newViolations
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  let browser;

  try {
    log(`\n🧪 Testing module accessibility: ${moduleName}`);
    log(`Category: ${moduleConfig.category}, Status: ${moduleConfig.status}`);

    // Create reports directory
    if (!fs.existsSync(REPORTS_DIR)) {
      fs.mkdirSync(REPORTS_DIR, { recursive: true });
    }

    // Launch browser
    browser = await chromium.launch({ headless: !headedMode });
    const context = await browser.createBrowserContext();
    const page = await context.newPage();

    // Set viewport for desktop testing
    await page.setViewportSize({ width: 1280, height: 1024 });

    const testPages = getTestPages();
    const timestamp = new Date().toISOString();

    // Step 1: Baseline scan
    log(`\n📊 Step 1/4: Running baseline scan (no modules)`);
    const baselineViolations = await scanAccessibility(page, testPages, 'desktop');
    fs.writeFileSync(
      path.join(REPORTS_DIR, 'baseline-violations.json'),
      JSON.stringify(baselineViolations, null, 2)
    );
    log(`  Found ${baselineViolations.length} baseline violations`);

    // Step 2: Enable module
    log(`\n📦 Step 2/4: Enabling module ${moduleName}`);
    const manager = new ModuleManager(BASE_URL);
    const enabled = manager.enableModule(moduleName);
    if (!enabled) {
      throw new Error(`Failed to enable module: ${moduleName}`);
    }
    manager.clearAllCaches();
    await page.waitForTimeout(2000);

    // Step 3: Module scan
    log(`\n📊 Step 3/4: Running scan with module enabled`);
    const moduleViolations = await scanAccessibility(page, testPages, 'desktop');
    fs.writeFileSync(
      path.join(REPORTS_DIR, 'module-violations.json'),
      JSON.stringify(moduleViolations, null, 2)
    );
    log(`  Found ${moduleViolations.length} violations with module enabled`);

    // Step 4: Disable module & analyze
    log(`\n♻️  Step 4/4: Disabling module and analyzing impact`);
    manager.disableModule(moduleName);
    manager.clearAllCaches();

    // Analyze impact
    const impact = analyzeImpact(baselineViolations, moduleViolations);

    // Save analysis
    fs.writeFileSync(
      path.join(REPORTS_DIR, 'impact-analysis.json'),
      JSON.stringify(
        {
          module: moduleName,
          config: moduleConfig,
          ...impact,
          timestamp
        },
        null,
        2
      )
    );

    // Print summary
    log(`\n${impact.status === 'PASS' ? '✅' : impact.status === 'FAIL' ? '❌' : '⚠️'} RESULT: ${impact.status}`);
    log(`   Impact Score: ${impact.impact_score > 0 ? '+' : ''}${impact.impact_score}`);
    log(`   Violations Fixed: ${impact.metrics.violations_fixed}`);
    log(`   Violations Added: ${impact.metrics.violations_added}`);
    log(`   Reports: ${REPORTS_DIR}`);

    await context.close();
    await browser.close();
    process.exit(0);

  } catch (error) {
    log(`\n❌ Error: ${error.message}`);
    if (browser) await browser.close();
    process.exit(1);
  }
})();
