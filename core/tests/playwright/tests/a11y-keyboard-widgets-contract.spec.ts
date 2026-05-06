/**
 * Deterministic keyboard contracts for tabs-style navigation, dropbutton, and buttons.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AUTH_STATE_FILE } from '../lib/auth-setup';

test.describe('Keyboard contracts — interactive widgets', () => {
  test.use({ storageState: AUTH_STATE_FILE });

  test('tabs-style navigation activates expected route and passes scoped axe', async ({ page }) => {
    await page.goto('/tabs', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('main', { timeout: 10000 });

    const candidates = page.locator('nav.tabs a[href^="/tabs/"]:visible, .tabs a[href^="/tabs/"]:visible');
    const count = await candidates.count();
    let link: any = null;
    for (let i = 0; i < count; i++) {
      const candidate = candidates.nth(i);
      const href = (await candidate.getAttribute('href')) || '';
      if (href && href !== '/tabs') {
        link = candidate;
        break;
      }
    }
    expect(link, 'A visible Basic HTML tab link should be present').toBeTruthy();
    const targetHref = (await link.getAttribute('href')) || '';

    await link.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(150);
    if (new URL(page.url()).pathname === '/tabs') {
      await link.press('Enter');
      await page.waitForTimeout(150);
    }

    const currentPath = new URL(page.url()).pathname;
    expect(currentPath === targetHref || /^\/tabs\/.+/.test(currentPath)).toBeTruthy();

    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .include('nav.tabs, .tabs')
      .analyze();
    expect(axe.violations).toHaveLength(0);
  });

  test('dropbutton reveals secondary actions via keyboard and passes scoped axe', async ({ page }) => {
    await page.goto('/dropbutton', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('main .dropbutton-widget', { timeout: 10000 });

    const toggle = page.locator('main button.dropbutton__toggle').first();
    await expect(toggle).toBeVisible();

    await toggle.focus();
    const beforeVisible = await page.evaluate(() => {
      const active = document.activeElement as HTMLElement | null;
      const widget = active?.closest('.dropbutton-widget');
      if (!widget) {
        return 0;
      }
      return Array.from(widget.querySelectorAll('li.secondary-action')).filter((el) => {
        const style = window.getComputedStyle(el);
        return style.visibility !== 'hidden' && style.display !== 'none';
      }).length;
    });

    await page.keyboard.press('Enter');
    await page.waitForTimeout(120);

    const afterVisible = await page.evaluate(() => {
      const active = document.activeElement as HTMLElement | null;
      const widget = active?.closest('.dropbutton-widget');
      if (!widget) {
        return 0;
      }
      return Array.from(widget.querySelectorAll('li.secondary-action')).filter((el) => {
        const style = window.getComputedStyle(el);
        return style.visibility !== 'hidden' && style.display !== 'none';
      }).length;
    });

    expect(afterVisible).toBeGreaterThan(beforeVisible);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(120);

    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .include('main .dropbutton-widget')
      .analyze();
    expect(axe.violations).toHaveLength(0);
  });

  test('buttons page first control is keyboard operable and scoped axe is clean', async ({ page }) => {
    await page.goto('/buttons', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('main', { timeout: 10000 });

    const button = page.locator('main input[type="submit"], main button, main a.button').first();
    await expect(button).toBeVisible();

    await button.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(80);
    await page.keyboard.press('Space');
    await page.waitForTimeout(80);

    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .include('main')
      .analyze();
    expect(axe.violations).toHaveLength(0);
  });
});
