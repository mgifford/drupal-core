/**
 * @file
 * Module accessibility testing orchestrator.
 * 
 * Runs accessibility tests (axe-core) with modules enabled and disabled.
 * Generates baseline and enabled-state results for comparison.
 * 
 * Usage:
 *   npm run a11y:test-modules              # Test all configured modules
 *   npm run a11y:test-module -- --module=views_ui  # Test specific module
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { injectAxe, checkA11y, getViolations } = require('axe-playwright');
const ModuleManager = require('../lib/module-manager');

const DRUPAL_ROOT = path.join(__dirname, '../../..');
const CONFIG_FILE = path.join(DRUPAL_ROOT, '.drupal-a11y-module-config.json');
const REPORTS_DIR = path.join(DRUPAL_ROOT, 'reports/module-tests');
const BASE_URL = process.env.DRUPAL_TEST_BASE_URL || 'http://drupal-core.ddev.site';

/**
 * Load module configuration
 */
function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    throw new Error(`Configuration file not found: ${CONFIG_FILE}\nRun: npm run a11y:discover-modules`);
  }
  return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
}

/**
 * Run axe-core accessibility scan on a page
 */
async function scanPageWithAxe(page, url) {
  console.log(`    📄 Scanning: ${url}`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await injectAxe(page);
    
    const violations = await getViolations(page);
    
    console.log(`       Found ${violations.length} violations`);
    
    return {
      url: url,
      violations: violations,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`    ❌ Failed to scan ${url}:`, error.message);
    return {
      url: url,
      violations: [],
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Test a module with enabled and disabled states
 */
async function testModule(moduleName, config, moduleManager) {
  console.log(`\n🧪 Testing module: ${moduleName}`);
  
  const meta = config.modules[moduleName];
  if (!meta) {
    console.error(`❌ Module not found in config: ${moduleName}`);
    return null;
  }
  
  const results = {
    module: moduleName,
    metadata: meta,
    tested_at: new Date().toISOString(),
    disabled_state: null,
    enabled_state: null
  };

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Test with module disabled
    if (meta.test_disabled) {
      console.log(`  📦 State: Disabled`);
      
      // Ensure module is disabled
      if (moduleManager.isModuleEnabled(moduleName)) {
        moduleManager.disableModule(moduleName);
        moduleManager.clearAllCaches();
        await moduleManager.waitForModuleStateStable();
      }
      
      const disabledResults = [];
      const pages = meta.pages_to_test && meta.pages_to_test.length > 0 
        ? meta.pages_to_test 
        : ['/'];
      
      for (const pagePath of pages) {
        const url = BASE_URL + pagePath;
        const scanResult = await scanPageWithAxe(page, url);
        disabledResults.push(scanResult);
      }
      
      results.disabled_state = {
        status: 'tested',
        pages_scanned: pages,
        scans: disabledResults,
        total_violations: disabledResults.reduce((sum, r) => sum + r.violations.length, 0)
      };
    }

    // Test with module enabled
    if (meta.test_enabled && !['core', 'test_only'].includes(meta.category)) {
      console.log(`  📦 State: Enabled`);
      
      // Enable module
      moduleManager.enableModule(moduleName);
      moduleManager.clearAllCaches();
      await moduleManager.waitForModuleStateStable();
      
      const enabledResults = [];
      const pages = meta.pages_to_test && meta.pages_to_test.length > 0 
        ? meta.pages_to_test 
        : ['/'];
      
      for (const pagePath of pages) {
        const url = BASE_URL + pagePath;
        const scanResult = await scanPageWithAxe(page, url);
        enabledResults.push(scanResult);
      }
      
      results.enabled_state = {
        status: 'tested',
        pages_scanned: pages,
        scans: enabledResults,
        total_violations: enabledResults.reduce((sum, r) => sum + r.violations.length, 0)
      };
      
      // Disable module to return to baseline
      moduleManager.disableModule(moduleName);
      moduleManager.clearAllCaches();
      await moduleManager.waitForModuleStateStable();
    }

  } catch (error) {
    console.error(`❌ Test failed for module ${moduleName}:`, error.message);
    results.error = error.message;
  } finally {
    await browser.close();
  }

  return results;
}

/**
 * Main test orchestrator
 */
async function orchestrateModuleTests() {
  console.log(`\n🚀 Drupal Core Module Accessibility Testing\n`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Config: ${CONFIG_FILE}\n`);

  // Load configuration
  let config;
  try {
    config = loadConfig();
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  }

  // Create reports directory
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  // Initialize module manager
  const moduleManager = new ModuleManager(BASE_URL);

  // Reset modules to default state
  moduleManager.resetModulesToDefaults(config);

  // Parse command line arguments
  const args = process.argv.slice(2);
  const singleModuleArg = args.find(arg => arg.startsWith('--module='));
  const modulesToTest = singleModuleArg 
    ? [singleModuleArg.split('=')[1]]
    : Object.keys(config.modules).filter(name => {
        const meta = config.modules[name];
        return meta.test_enabled || meta.test_disabled;
      });

  const testResults = [];
  const totalModules = modulesToTest.length;

  for (let i = 0; i < totalModules; i++) {
    const moduleName = modulesToTest[i];
    console.log(`\n[${i + 1}/${totalModules}] Testing: ${moduleName}`);
    
    const result = await testModule(moduleName, config, moduleManager);
    if (result) {
      testResults.push(result);
      
      // Save per-module report
      const reportFile = path.join(REPORTS_DIR, `${moduleName}-${new Date().toISOString().split('T')[0]}.json`);
      fs.writeFileSync(reportFile, JSON.stringify(result, null, 2));
      console.log(`✓ Report saved: ${reportFile}`);
    }
  }

  // Generate summary
  const summary = {
    generated: new Date().toISOString(),
    base_url: BASE_URL,
    modules_tested: testResults.length,
    test_results: testResults
  };

  // Save summary
  const summaryFile = path.join(REPORTS_DIR, `MODULE-TEST-SUMMARY-${new Date().toISOString().split('T')[0]}.json`);
  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));

  console.log(`\n✅ Module testing complete!\n`);
  console.log(`📊 Summary:`);
  console.log(`   Modules tested: ${testResults.length}`);
  console.log(`   Reports saved: ${REPORTS_DIR}\n`);

  return summary;
}

// Run orchestrator
if (require.main === module) {
  orchestrateModuleTests().catch(err => {
    console.error('❌ Test orchestration failed:', err);
    process.exit(1);
  });
}

module.exports = { orchestrateModuleTests, testModule, scanPageWithAxe };
