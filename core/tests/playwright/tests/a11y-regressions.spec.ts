/**
 * Regression tests for resolved accessibility violations.
 *
 * Each test here asserts that a previously-fixed violation does NOT
 * re-emerge. Add a new test for every fix merged into core:
 *
 *   node scripts/add-regression.js --rule duplicate-id-aria \
 *     --selector "#edit-title-0-value" --page "/node/add/article" \
 *     --issue 3318398 --name "Article form title field has unique id"
 *
 * Or add tests manually following the pattern below.
 *
 * These tests run on every PR — they are the enforcement mechanism
 * after a rule is re-enabled. Keep them fast and surgical.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AUTH_STATE_FILE } from '../lib/auth-setup';

// ---------------------------------------------------------------------------
// Helper: assert no violations for a specific axe rule on a given selector.
// ---------------------------------------------------------------------------
async function assertNoViolation(
  page: any,
  {
    path,
    rule,
    selector,
    requiresAuth = false,
  }: { path: string; rule: string; selector?: string; requiresAuth?: boolean },
) {
  await page.goto(path, { waitUntil: 'networkidle' });

  let builder = new AxeBuilder({ page })
    .withRules([rule]);

  if (selector) {
    builder = builder.include(selector);
  }

  const results = await builder.analyze();

  expect(
    results.violations,
    `Rule '${rule}' should not fire on '${path}'${selector ? ` at '${selector}'` : ''}`,
  ).toHaveLength(0);
}

// ---------------------------------------------------------------------------
// Anonymous page regressions
// ---------------------------------------------------------------------------
test.describe('Regression — anonymous pages (Olivero)', () => {
  // Add tests here as violations are fixed.
  // Example (commented out until the fix is merged):
  //
  // test('[#3318398] Search page has no duplicate-id-aria violations', async ({ page }) => {
  //   await assertNoViolation(page, {
  //     path: '/search/node',
  //     rule: 'duplicate-id-aria',
  //   });
  // });
  //
  // test('[#3318396] Homepage landmark regions are correct', async ({ page }) => {
  //   await assertNoViolation(page, {
  //     path: '/',
  //     rule: 'region',
  //   });
  // });

  test.skip('No regressions defined yet — add tests as violations are fixed', async () => {});
});

// ---------------------------------------------------------------------------
// Admin page regressions
// ---------------------------------------------------------------------------
test.describe('Regression — admin pages (Claro)', () => {
  test.use({ storageState: AUTH_STATE_FILE });

  // Add tests here as violations are fixed.
  // Example:
  //
  // test('[#3318394] Block layout page passes color-contrast', async ({ page }) => {
  //   await assertNoViolation(page, {
  //     path: '/admin/structure/block',
  //     rule: 'color-contrast',
  //     requiresAuth: true,
  //   });
  // });

  test.skip('No regressions defined yet — add tests as violations are fixed', async () => {});
});
