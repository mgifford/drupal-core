import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

/**
 * Drupal Core — Playwright Accessibility Test Suite
 *
 * Runs axe-core and Lighthouse audits against a running Drupal site (DDEV).
 * Set DRUPAL_BASE_URL to override the default.
 *
 * Local usage:
 *   ddev start
 *   cd core && yarn test:a11y:playwright
 *
 * Admin credentials default to admin/admin (DDEV). Override via env vars:
 *   DRUPAL_ADMIN_USER=myuser DRUPAL_ADMIN_PASS=mypass yarn test:a11y:playwright
 */
const baseURL = process.env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';

export default defineConfig({
  testDir: './tests',
  outputDir: './reports/test-results',
  fullyParallel: false, // Sequential to avoid overwhelming the Drupal site.
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  // Logs in as admin once and saves session cookies for all admin page tests.
  globalSetup: path.resolve(__dirname, './lib/auth-setup.ts'),
  reporter: [
    ['list'],
    ['json', { outputFile: './reports/playwright-results.json' }],
    ['html', { outputFolder: './reports/html', open: 'never' }],
  ],
  use: {
    baseURL,
    // Capture screenshots and traces on failure for debugging.
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
