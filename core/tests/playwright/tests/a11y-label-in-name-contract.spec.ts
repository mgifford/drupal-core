/**
 * Label-in-Name validation contracts for promoted keyboard-review candidates.
 *
 * WCAG 2.5.3: the accessible name should contain the visible label text
 * users rely on for speech input.
 */
import { test, expect, type Locator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { AUTH_STATE_FILE } from '../lib/auth-setup';

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

type ContractResult = {
  id: string;
  route: string;
  title: string;
  selector: string;
  expectedLabel: string;
  observedAriaLabel: string;
  status: 'pass' | 'fail';
  wcag: '2.5.3';
  error?: string;
};

const REPORTS_DIR = path.resolve(__dirname, '../../../../reports');
const DATE_STAMP = new Date().toISOString().slice(0, 10);
const LABEL_IN_NAME_OUTPUT = path.join(REPORTS_DIR, `label-in-name-contract-${DATE_STAMP}.json`);
const LABEL_IN_NAME_LATEST = path.join(REPORTS_DIR, 'label-in-name-contract-latest.json');
const contractResults: ContractResult[] = [];

async function recordLabelInNameCheck(check: Omit<ContractResult, 'observedAriaLabel' | 'status' | 'wcag' | 'error'>, locator: Locator): Promise<void> {
  const observedAriaLabel = (await locator.getAttribute('aria-label')) || '';
  try {
    await expect(locator).toHaveAccessibleName(new RegExp(escapeRegExp(check.expectedLabel), 'i'));
    contractResults.push({
      ...check,
      observedAriaLabel,
      status: 'pass',
      wcag: '2.5.3',
    });
  }
  catch (error) {
    contractResults.push({
      ...check,
      observedAriaLabel,
      status: 'fail',
      wcag: '2.5.3',
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

test.describe('Label-in-name contracts (WCAG 2.5.3)', () => {
  test.use({ storageState: AUTH_STATE_FILE, viewport: { width: 375, height: 812 } });

  test.afterAll(async () => {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
    const payload = {
      generatedAt: new Date().toISOString(),
      summary: {
        total: contractResults.length,
        passed: contractResults.filter((r) => r.status === 'pass').length,
        failed: contractResults.filter((r) => r.status === 'fail').length,
      },
      results: contractResults,
    };
    fs.writeFileSync(LABEL_IN_NAME_OUTPUT, JSON.stringify(payload, null, 2));
    fs.writeFileSync(LABEL_IN_NAME_LATEST, JSON.stringify(payload, null, 2));
  });

  test('month/day selects on /admin/form_style use labels in accessible names', async ({ page }) => {
    await page.goto('/admin/form_style', { waitUntil: 'domcontentloaded' });

    const month = page.locator('#edit-test-datelist-month');
    const day = page.locator('#edit-test-datelist-day');

    await expect(month).toBeVisible();
    await expect(day).toBeVisible();

    const monthLabel = page.locator('label[for="edit-test-datelist-month"]');
    const dayLabel = page.locator('label[for="edit-test-datelist-day"]');

    const monthText = ((await monthLabel.textContent()) || 'Month').trim();
    const dayText = ((await dayLabel.textContent()) || 'Day').trim();

    await recordLabelInNameCheck({
      id: 'LABEL-IN-NAME-001',
      route: '/admin/form_style',
      title: 'Month select label appears in accessible name',
      selector: '#edit-test-datelist-month',
      expectedLabel: monthText,
    }, month);

    await recordLabelInNameCheck({
      id: 'LABEL-IN-NAME-002',
      route: '/admin/form_style',
      title: 'Day select label appears in accessible name',
      selector: '#edit-test-datelist-day',
      expectedLabel: dayText,
    }, day);
  });

  test('details summary on /admin/structure/types/add includes visible phrase in accessible name', async ({ page }) => {
    await page.goto('/admin/structure/types/add', { waitUntil: 'domcontentloaded' });

    const summary = page.locator('summary').filter({ hasText: 'Submission form settings' }).first();
    await expect(summary).toBeVisible();

    await recordLabelInNameCheck({
      id: 'LABEL-IN-NAME-003',
      route: '/admin/structure/types/add',
      title: 'Details summary visible text appears in accessible name',
      selector: 'summary:has-text("Submission form settings")',
      expectedLabel: 'Submission form settings',
    }, summary);
  });

  test('Configure action on text formats should include visible label in name', async ({ page }) => {
    await page.goto('/admin/config/content/formats', { waitUntil: 'domcontentloaded' });

    const row = page.locator('table tbody tr').filter({ hasText: 'Basic HTML' }).first();
    const configure = row.locator('a:has-text("Configure")').first();

    await expect(configure).toBeVisible();

    // This is the promoted candidate check: if this fails, speech users may
    // not be able to activate the control by saying the visible label.
    await recordLabelInNameCheck({
      id: 'LABEL-IN-NAME-004',
      route: '/admin/config/content/formats',
      title: 'Configure action visible text appears in accessible name',
      selector: 'table tbody tr:has-text("Basic HTML") a:has-text("Configure")',
      expectedLabel: 'Configure',
    }, configure);
  });
});
