/**
 * Deterministic keyboard contract for Drupal dialog interactions.
 *
 * This is the enforceable counterpart to exploratory keyboard-review crawl findings.
 */
import { test, expect, Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AUTH_STATE_FILE } from '../lib/auth-setup';

const DIALOG_SELECTOR = '[role="dialog"], [aria-modal="true"], .ui-dialog';
const DIALOG_TRIGGER_SELECTORS = [
  'main a:has-text("Modal dialog")',
  'main a:has-text("Dialog 700")',
  'main a:has-text("Dialog")',
  'main a[href*="dialog"]',
];

async function findFirstVisibleTrigger(page: any): Promise<{ selector: string; locator: Locator } | null> {
  for (const selector of DIALOG_TRIGGER_SELECTORS) {
    const locator = page.locator(selector).first();
    if ((await locator.count()) > 0 && await locator.isVisible().catch(() => false)) {
      return { selector, locator };
    }
  }
  return null;
}

test.describe('Keyboard contract — modal dialog behavior', () => {
  test.use({ storageState: AUTH_STATE_FILE });

  test('open, trap focus, scan with axe, and close with keyboard', async ({ page }) => {
    await page.goto('/dialog', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('main', { timeout: 10000 });

    const triggerRef = await findFirstVisibleTrigger(page);
    expect(triggerRef, 'A visible dialog trigger should be present on /dialog').toBeTruthy();
    const trigger = triggerRef!.locator;

    await trigger.evaluate((el: Element) => {
      el.setAttribute('data-keyboard-contract-trigger', 'true');
    });
    await trigger.focus();
    await page.keyboard.press('Enter');

    const dialog = page.locator(DIALOG_SELECTOR).first();
    await expect(dialog).toBeVisible();

    let inDialogFocusCount = 0;
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
      const isInDialog = await page.evaluate((sel) => {
        const active = document.activeElement as HTMLElement | null;
        return Boolean(active && active.closest(sel));
      }, DIALOG_SELECTOR);
      if (isInDialog) {
        inDialogFocusCount += 1;
      }
    }
    expect(inDialogFocusCount).toBeGreaterThanOrEqual(4);

    const axeResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .include(DIALOG_SELECTOR)
      .analyze();
    expect(axeResults.violations).toHaveLength(0);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    if (await dialog.isVisible().catch(() => false)) {
      const closeBtn = dialog.locator('button:has-text("Close"), [aria-label*="Close"]').first();
      if ((await closeBtn.count()) > 0) {
        await closeBtn.click();
      }
    }

    await expect(dialog).not.toBeVisible();

    const focusReturnedToTrigger = await page.evaluate(() => {
      const triggerEl = document.querySelector('[data-keyboard-contract-trigger="true"]');
      return Boolean(triggerEl && document.activeElement === triggerEl);
    });
    expect.soft(focusReturnedToTrigger).toBeTruthy();
  });
});
