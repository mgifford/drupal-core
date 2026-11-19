/**
 * Smoke: a logged-in editor can navigate, create, reopen and delete content,
 * and log out.
 *
 * Needs:
 * - a running site with the Basic page content type (core recipe
 *   page_content_type, included in core/recipes/replicate_core_testing)
 * - a dedicated test account, not user 1, in DRUPAL_TEST_USER and
 *   DRUPAL_TEST_PASS, with the administrator role or at least: access
 *   navigation, access content overview, create, edit own and delete own
 *   Basic page content.
 *
 * Without those variables every test here is reported as skipped, not passed.
 */
import { test, expect, Page } from '@playwright/test';

const USER = process.env.DRUPAL_TEST_USER;
const PASS = process.env.DRUPAL_TEST_PASS;

// The required marker is CSS content ("*"), which can end up in the name.
const TITLE_FIELD = { name: /^Title(\s*\*)?$/ };

async function logIn(page: Page) {
  await page.goto('/user/login');
  await page.getByRole('textbox', { name: 'Username' }).fill(USER!);
  await page.getByLabel('Password', { exact: true }).fill(PASS!);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page, 'login failed: still on the login form').not.toHaveURL(/\/user\/login/);
}

test.describe('Smoke: logged-in editor', () => {
  test.skip(
    !USER || !PASS,
    'Set DRUPAL_TEST_USER and DRUPAL_TEST_PASS to a dedicated test account (see docs/testing/PLAYWRIGHT.md).',
  );

  test('administrative navigation is available', async ({ page }) => {
    await logIn(page);
    await page.goto('/admin/content');
    const sidebar = page.getByRole('navigation', { name: 'Administrative sidebar' });
    await expect(sidebar).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Content', exact: true })).toBeVisible();
  });

  test('can create, reopen and delete a basic page', async ({ page }, testInfo) => {
    const title = `Smoke page ${Date.now()}-${testInfo.workerIndex}`;
    let nid: string | undefined;

    await logIn(page);
    try {
      await page.goto('/node/add/page');
      await page.getByRole('textbox', TITLE_FIELD).fill(title);
      await page.getByRole('button', { name: 'Save', exact: true }).click();

      await expect(page.getByRole('status').filter({ hasText: 'has been created' })).toBeVisible();
      await expect(page.getByRole('heading', { name: title, level: 1 })).toBeVisible();
      nid = page.url().match(/\/node\/(\d+)(?:[?#].*)?$/)?.[1];
      expect(nid, `expected a /node/<id> URL after saving, got ${page.url()}`).toBeTruthy();

      // Reopen the saved page in its edit form and check the stored value.
      await page.goto(`/node/${nid}/edit`);
      await expect(page.getByRole('textbox', TITLE_FIELD)).toHaveValue(title);
    }
    finally {
      // Clean up even if an assertion above failed, without hiding that
      // failure: a cleanup error is recorded as an annotation instead.
      if (nid) {
        try {
          await page.goto(`/node/${nid}/delete`);
          await page.getByRole('button', { name: 'Delete', exact: true }).click();
          await expect(page.getByRole('status').filter({ hasText: 'has been deleted' })).toBeVisible();
        }
        catch (error) {
          testInfo.annotations.push({ type: 'cleanup-failed', description: `node ${nid} may remain: ${error}` });
        }
      }
    }

    const gone = await page.goto(`/node/${nid}`);
    expect(gone?.status()).toBe(404);
  });

  test('can log out', async ({ page }) => {
    await logIn(page);
    await page.goto('/user/logout/confirm');
    await page.getByRole('button', { name: 'Log out' }).click();

    // A logged-out visitor sent to /user gets the login form again.
    await page.goto('/user');
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  });
});
