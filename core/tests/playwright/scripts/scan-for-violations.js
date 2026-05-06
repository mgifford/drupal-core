/**
 * Scan Drupal pages to find real accessibility violations
 */
'use strict';

const { chromium } = require('playwright');
const { injectAxe, getViolations } = require('axe-playwright');

const BASE_URL = 'http://drupal-core.ddev.site';

const PAGES_TO_SCAN = [
  { path: '/', name: 'homepage' },
  { path: '/admin', name: 'admin' },
  { path: '/admin/content', name: 'admin-content' },
  { path: '/admin/structure', name: 'admin-structure' },
  { path: '/admin/config', name: 'admin-config' },
  { path: '/admin/appearance', name: 'admin-appearance' },
  { path: '/user', name: 'user' },
  { path: '/user/login', name: 'user-login' },
  { path: '/user/register', name: 'user-register' },
  { path: '/admin/content/media', name: 'admin-media' },
  { path: '/admin/content/files', name: 'admin-files' },
  { path: '/node/add', name: 'node-add' },
  { path: '/contact', name: 'contact-form' },
];

async function scanPages() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];

  for (const pageInfo of PAGES_TO_SCAN) {
    try {
      console.log(`\nScanning ${pageInfo.path}...`);
      await page.goto(`${BASE_URL}${pageInfo.path}`, { waitUntil: 'networkidle' }).catch(() => {});

      await injectAxe(page);
      const violations = await getViolations(page);

      if (violations.length > 0) {
        console.log(`✅ Found ${violations.length} violations on ${pageInfo.path}`);
        
        // Group by rule
        const byRule = {};
        violations.forEach(v => {
          if (!byRule[v.id]) {
            byRule[v.id] = { rule: v.id, impact: v.impact, count: 0, pages: [] };
          }
          byRule[v.id].count++;
        });

        results.push({
          path: pageInfo.path,
          name: pageInfo.name,
          violationCount: violations.length,
          rules: Object.values(byRule),
        });

        // Print rule details
        Object.entries(byRule).forEach(([rule, info]) => {
          console.log(`  - ${rule} (${info.impact}): ${info.count} instances`);
        });
      } else {
        console.log(`❌ No violations on ${pageInfo.path}`);
      }
    } catch (error) {
      console.error(`Error scanning ${pageInfo.path}:`, error.message);
    }
  }

  await browser.close();

  // Print summary
  console.log('\n\n=== SUMMARY ===');
  results.forEach(r => {
    console.log(`\n${r.path} (${r.violationCount} violations):`);
    r.rules.forEach(rule => {
      console.log(`  - ${rule.rule}: ${rule.count}`);
    });
  });

  return results;
}

scanPages().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
