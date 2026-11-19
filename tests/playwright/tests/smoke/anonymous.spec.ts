/**
 * Smoke: what an anonymous visitor can reach.
 *
 * Needs a running site at DRUPAL_BASE_URL. Accessible names come from the
 * Drupal source at the tested revision (UserLoginForm field titles).
 */
import { test, expect } from '@playwright/test';

test.describe('Smoke: anonymous visitor', () => {
  test('home page responds with a main landmark', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
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
