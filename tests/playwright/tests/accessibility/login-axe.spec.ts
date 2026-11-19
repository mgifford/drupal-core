/**
 * axe-core scan of the login form, compared with a committed baseline.
 *
 * The full axe results are attached to every run. The test fails only on
 * violations that are not in tests/playwright/baselines/axe/user-login.json;
 * baseline entries that no longer occur are reported so they can be removed.
 * An empty baseline means zero violations are accepted.
 *
 * A clean scan is not proof of WCAG conformance: axe finds only some
 * barriers, and keyboard and screen reader checks are still needed.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';
import { compareWithBaseline } from '../../lib/axe-baseline.mjs';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const BASELINE_FILE = path.join(__dirname, '../../baselines/axe/user-login.json');

test('login form: no axe violations beyond the baseline', async ({ page }, testInfo) => {
  await page.goto('/user/login');
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  await testInfo.attach('axe-results.json', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });

  const baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
  const { added, resolved } = compareWithBaseline(results.violations, baseline.accepted);

  if (resolved.length) {
    testInfo.annotations.push({
      type: 'baseline-resolved',
      description: `No longer found, remove from ${path.basename(BASELINE_FILE)}: ${resolved.join('; ')}`,
    });
  }
  expect(added, 'axe violations not in the baseline').toEqual([]);
});
