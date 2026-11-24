/**
 * Playwright config for the Drupal browser tests in this repository.
 *
 * Run from tests/playwright:
 *   npm test                 # every spec under ./tests (needs a running site)
 *   npm run test:smoke       # smoke suite only
 *   npm run test:list        # list tests without running them (no site needed)
 *   npm run test:voiceover   # real VoiceOver specs, macOS only, opt-in
 *
 * Or from the repository root: npm run test:smoke, npm run test:list.
 *
 * See docs/testing/PLAYWRIGHT.md for environment variables and credentials.
 */
import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

const baseURL = process.env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';

const projects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
];

// Real VoiceOver tests take over the screen reader and need macOS with
// VoiceOver set up, so they only run when explicitly requested.
if (process.env.VOICEOVER === '1') {
  projects.push({
    name: 'voiceover',
    testDir: '.',
    testMatch: 'guidepup-drupal-admin.spec.ts',
    use: { ...devices['Desktop Chrome'], headless: false },
  } as (typeof projects)[number]);
}

export default defineConfig({
  testDir: './tests',
  outputDir: './reports/test-results',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 120000,
  globalSetup: [
    // Record which Drupal commit and site this run tested.
    path.resolve(__dirname, './lib/run-info.ts'),
    // Log in as admin once and save session cookies for admin page tests.
    path.resolve(__dirname, './lib/auth-setup.ts'),
  ],
  // Restores site state the axe crawl changed and writes its coverage
  // summary, also when tests failed. Does nothing for other runs.
  globalTeardown: path.resolve(__dirname, './lib/crawl-finalize.ts'),
  reporter: [
    ['list'],
    ['json', { outputFile: './reports/playwright-results.json' }],
  ],
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
  },
  projects,
});
