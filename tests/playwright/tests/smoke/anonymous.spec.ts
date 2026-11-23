/**
 * Smoke: what an anonymous visitor can reach.
 *
 * Needs a running site at DRUPAL_BASE_URL. Accessible names come from the
 * Drupal source at the tested revision (UserLoginForm field titles).
 */
import { test, expect } from '@playwright/test';

test.describe('Smoke: anonymous visitor', () => {
  test('home page is access denied, with a main landmark', async ({ page }) => {
    // Since upstream commit 308cba9319 (drupal.org #3590882), the Standard
    // profile's front page is /admin/welcome, which needs the "access
    // administration pages" permission. An anonymous visitor to / therefore
    // gets 403 by design. A 200 here means upstream changed the front page:
    // record that change, then update this test.
    const response = await page.goto('/');
    expect(response?.status()).toBe(403);
    await expect(page.getByRole('heading', { level: 1, name: 'Access denied' })).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('login form has labelled fields and a submit button', async ({ page }) => {
    const response = await page.goto('/user/login');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
  });
});
