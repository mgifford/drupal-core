/**
 * Keyboard-only navigation review crawl for Drupal Core.
 *
 * This test intentionally captures findings instead of hard-failing so teams can
 * triage patterns in a dedicated review report.
 */
import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { allPages } from '../lib/pages';
import { AUTH_STATE_FILE } from '../lib/auth-setup';

interface FocusStep {
  step: number;
  descriptor: string;
  role: string;
  visibleFocusEvidence: boolean;
}

interface PageKeyboardReview {
  name: string;
  path: string;
  url: string;
  requiresAuth: boolean;
  status: number;
  focusSteps: FocusStep[];
  uniqueFocusTargets: number;
  issues: string[];
  warnings: string[];
}

interface KeyboardReviewResults {
  generatedAt: string;
  baseUrl: string;
  totalPages: number;
  totalFailures: number;
  totalWarnings: number;
  pages: PageKeyboardReview[];
}

const DEFAULT_BASE_URL = process.env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';
const MAX_STEPS = Number(process.env.KEYBOARD_REVIEW_TABS ?? 12);
const MAX_PAGES = Number(process.env.KEYBOARD_REVIEW_MAX_PAGES ?? 20);
const OUT_DIR = path.resolve(__dirname, '../../../../reports');

type ActiveElSnapshot = {
  descriptor: string;
  role: string;
  visibleFocusEvidence: boolean;
};

async function snapshotActiveElement(page: any): Promise<ActiveElSnapshot> {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;

    if (!el || el === document.body || el === document.documentElement) {
      return {
        descriptor: el ? el.tagName.toLowerCase() : 'none',
        role: '',
        visibleFocusEvidence: false,
      };
    }

    const role = el.getAttribute('role') || '';
    const id = el.id ? `#${el.id}` : '';
    const className = (el.className || '').toString().trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.');
    const classPart = className ? `.${className}` : '';
    const label =
      el.getAttribute('aria-label') ||
      el.getAttribute('title') ||
      (el.textContent || '').trim().slice(0, 60);

    const style = window.getComputedStyle(el);
    const hasOutline = style.outlineStyle !== 'none' && style.outlineWidth !== '0px';
    const hasBoxShadow = style.boxShadow && style.boxShadow !== 'none';
    const hasUnderline = style.textDecorationLine.includes('underline');

    return {
      descriptor: `${el.tagName.toLowerCase()}${id}${classPart}${label ? ` [${label}]` : ''}`,
      role,
      visibleFocusEvidence: Boolean(hasOutline || hasBoxShadow || hasUnderline),
    };
  });
}

function writeResults(results: KeyboardReviewResults): void {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const date = new Date().toISOString().slice(0, 10);
  const datedFile = path.join(OUT_DIR, `keyboard-review-${date}.json`);
  const latestFile = path.join(OUT_DIR, 'keyboard-review-latest.json');

  const json = JSON.stringify(results, null, 2);
  fs.writeFileSync(datedFile, json);
  fs.writeFileSync(latestFile, json);

  console.log(`\n⌨️ Keyboard review results written to:`);
  console.log(`   ${datedFile}`);
  console.log(`   ${latestFile} (latest)`);
}

test.describe('Keyboard-only navigation review crawl', () => {
  test.setTimeout(10 * 60 * 1000);

  test.use({
    baseURL: DEFAULT_BASE_URL,
    ignoreHTTPSErrors: true,
  });

  test('capture keyboard navigation findings across Drupal routes', async ({ browser, baseURL }) => {
    const pagesToScan = allPages.slice(0, Math.max(1, MAX_PAGES));
    const results: KeyboardReviewResults = {
      generatedAt: new Date().toISOString(),
      baseUrl: baseURL ?? DEFAULT_BASE_URL,
      totalPages: pagesToScan.length,
      totalFailures: 0,
      totalWarnings: 0,
      pages: [],
    };

    for (const entry of pagesToScan) {
      const context = await browser.newContext({
        baseURL: results.baseUrl,
        ignoreHTTPSErrors: true,
        storageState: entry.requiresAuth ? AUTH_STATE_FILE : undefined,
      });
      const page = await context.newPage();
      const url = new URL(entry.path, results.baseUrl).toString();
      let status = 0;

      const focusSteps: FocusStep[] = [];
      const seenDescriptors = new Set<string>();
      const issues: string[] = [];
      const warnings: string[] = [];

      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
        status = response?.status() ?? 0;

        await page.waitForSelector('body', { timeout: 10000 });
        await page.keyboard.press('Home').catch(() => undefined);

        for (let i = 1; i <= MAX_STEPS; i++) {
          await page.keyboard.press('Tab');
          await page.waitForTimeout(60);

          const snap = await snapshotActiveElement(page);
          focusSteps.push({
            step: i,
            descriptor: snap.descriptor,
            role: snap.role,
            visibleFocusEvidence: snap.visibleFocusEvidence,
          });

          seenDescriptors.add(snap.descriptor);
        }
      }
      finally {
        await context.close();
      }

      if (status >= 400 || status === 0) {
        issues.push(`Page returned unexpected status: ${status}`);
      }

      if (focusSteps.length === 0 || focusSteps[0].descriptor === 'body' || focusSteps[0].descriptor === 'html') {
        issues.push('First Tab press did not land on a meaningful focusable element.');
      }

      if (seenDescriptors.size < 2) {
        issues.push('Tab navigation appears stuck or cycles immediately with fewer than 2 unique focus targets.');
      }

      const anyVisibleFocus = focusSteps.some((s) => s.visibleFocusEvidence);
      if (!anyVisibleFocus) {
        warnings.push('No visible focus indicator evidence detected in sampled tab sequence.');
      }

      if (entry.path === '/' && !focusSteps[0]?.descriptor.toLowerCase().includes('skip')) {
        warnings.push('First focus target on homepage did not appear to be a skip link.');
      }

      const pageResult: PageKeyboardReview = {
        name: entry.name,
        path: entry.path,
        url,
        requiresAuth: entry.requiresAuth,
        status,
        focusSteps,
        uniqueFocusTargets: seenDescriptors.size,
        issues,
        warnings,
      };

      results.totalFailures += issues.length;
      results.totalWarnings += warnings.length;
      results.pages.push(pageResult);
    }

    writeResults(results);
  });
});
