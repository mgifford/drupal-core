#!/usr/bin/env node
/**
 * Scaffold a new regression test from an axe violation.
 *
 * Reads a violation from reports/axe-results.json by rule + page,
 * then appends a ready-to-use test block to a11y-regressions.spec.ts.
 *
 * Usage:
 *   node scripts/add-regression.js \
 *     --rule duplicate-id-aria \
 *     --page "/search/node" \
 *     --issue 3318398 \
 *     --name "Search page has no duplicate-id-aria violations"
 *
 * Options:
 *   --rule      Required. The axe rule ID (e.g. duplicate-id-aria)
 *   --page      Required. The page path (e.g. /search/node)
 *   --issue     Required. The drupal.org issue number
 *   --name      Optional. Test name (auto-generated if omitted)
 *   --selector  Optional. CSS selector to scope the check to
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REGRESSION_FILE = path.join(__dirname, '../tests/a11y-regressions.spec.ts');
const RESULTS_FILE = path.join(__dirname, '../reports/axe-results.json');

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : null;
  };
  return {
    rule: get('--rule'),
    page: get('--page'),
    issue: get('--issue'),
    name: get('--name'),
    selector: get('--selector'),
  };
}

function requiresAuth(pagePath) {
  return pagePath.startsWith('/admin') || pagePath.startsWith('/user/');
}

function main() {
  const { rule, page: pagePath, issue, name, selector } = parseArgs();

  if (!rule || !pagePath || !issue) {
    console.error('Usage: node add-regression.js --rule RULE --page PATH --issue NUMBER [--name TEXT] [--selector CSS]');
    process.exit(1);
  }

  const auth = requiresAuth(pagePath);
  const testName = name ?? `[#${issue}] ${pagePath} has no ${rule} violations`;
  const selectorArg = selector ? `\n      selector: '${selector}',` : '';

  const testBlock = `
  test('${testName}', async ({ page }) => {
    await assertNoViolation(page, {
      path: '${pagePath}',
      rule: '${rule}',${selectorArg}
      requiresAuth: ${auth},
    });
  });
`;

  const currentContent = fs.readFileSync(REGRESSION_FILE, 'utf8');

  // Find the right describe block to insert into.
  const describeLabel = auth
    ? "test.describe('Regression — admin pages (Claro)', () => {"
    : "test.describe('Regression — anonymous pages (Olivero)', () => {";

  const insertBefore = auth
    ? "  test.skip('No regressions defined yet — add tests as violations are fixed', async () => {});\n});"
    : "  test.skip('No regressions defined yet — add tests as violations are fixed', async () => {});\n});";

  let updated = currentContent;

  // Remove the skip placeholder if this is the first real test.
  if (updated.includes(insertBefore)) {
    updated = updated.replace(insertBefore, testBlock + '});');
  } else {
    // Append before the closing brace of the correct describe block.
    const describeStart = updated.lastIndexOf(describeLabel);
    if (describeStart < 0) {
      console.error(`Could not find describe block: "${describeLabel}"`);
      process.exit(1);
    }
    // Find the last }); after the describe block.
    const closingIdx = updated.indexOf('});', describeStart);
    updated = updated.slice(0, closingIdx) + testBlock + updated.slice(closingIdx);
  }

  fs.writeFileSync(REGRESSION_FILE, updated);
  console.log(`✅ Regression test added to a11y-regressions.spec.ts`);
  console.log(`   Rule: ${rule}`);
  console.log(`   Page: ${pagePath}`);
  console.log(`   Issue: https://drupal.org/i/${issue}`);

  // Verify the violation exists in current results, if available.
  if (fs.existsSync(RESULTS_FILE)) {
    const results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
    const pageResult = results.find((r) => r.path === pagePath);
    if (!pageResult) {
      console.warn(`⚠️  No crawl results found for path '${pagePath}'. Run yarn test:a11y:playwright first.`);
    } else {
      const violation = pageResult.violations.find((v) => v.id === rule);
      if (!violation) {
        console.log(`ℹ️  Rule '${rule}' is not currently firing on '${pagePath}' — this test will pass immediately (regression guard active).`);
      } else {
        console.log(`ℹ️  Rule '${rule}' currently has ${violation.nodes.length} violation(s) on '${pagePath}'. Fix them before this test will pass.`);
      }
    }
  }
}

main();
