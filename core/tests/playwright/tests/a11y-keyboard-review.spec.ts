/**
 * Keyboard-only navigation review crawl for Drupal Core.
 *
 * This test intentionally captures findings instead of hard-failing so teams can
 * triage patterns in a dedicated review report.
 */
import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import AxeBuilder from '@axe-core/playwright';
import { allPages } from '../lib/pages';
import { AUTH_STATE_FILE } from '../lib/auth-setup';

interface FocusStep {
  step: number;
  descriptor: string;
  role: string;
  visibleFocusEvidence: boolean;
  selector: string;
  xpath: string;
  accessibleName: string;
  visibleLabel: string;
  labelInNameMismatch: boolean;
}

interface VoiceControlRisk {
  step: number;
  descriptor: string;
  selector: string;
  xpath: string;
  visibleLabel: string;
  accessibleName: string;
}

interface PageKeyboardReview {
  name: string;
  path: string;
  url: string;
  finalUrl: string;
  viewport: {
    label: 'desktop' | 'tablet' | 'mobile';
    width: number;
    height: number;
  };
  requiresAuth: boolean;
  status: number;
  focusSteps: FocusStep[];
  uniqueFocusTargets: number;
  issues: string[];
  warnings: string[];
  voiceControlRisks: VoiceControlRisk[];
  dynamicChecks: DynamicCheckResult[];
}

interface DynamicCheckResult {
  type: 'modal-dialog' | 'tabs-nav' | 'dropbutton' | 'buttons';
  attempted: boolean;
  opened: boolean;
  tabStayedInDialog: boolean;
  sampleDataSupported: boolean;
  sampleDataEntered: boolean;
  escapedClosed: boolean;
  focusReturnedToTrigger: boolean;
  interactionSucceeded?: boolean;
  routeChanged?: boolean;
  secondaryActionsVisible?: boolean;
  axeViolations: number;
  axeViolationIds: string[];
  details: string[];
}

interface PromotedFinding {
  id: string;
  route: string;
  viewport: 'desktop' | 'tablet' | 'mobile';
  source: 'keyboard-review';
  findingType: 'issue' | 'warning' | 'dynamic-check';
  title: string;
  message: string;
  severity: 'High' | 'Medium' | 'Low';
  wcag: string;
  recommendedTest: string;
  rationale: string;
  status: 'candidate';
}

interface KeyboardReviewResults {
  generatedAt: string;
  baseUrl: string;
  auth: {
    username: string;
    password: string;
    source: string;
  };
  totalPages: number;
  totalFailures: number;
  totalWarnings: number;
  pages: PageKeyboardReview[];
  promotedFindings: PromotedFinding[];
}

const DEFAULT_BASE_URL = process.env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';
const MAX_STEPS = Number(process.env.KEYBOARD_REVIEW_TABS ?? 12);
const MAX_PAGES = Number(process.env.KEYBOARD_REVIEW_MAX_PAGES ?? allPages.length);
const OUT_DIR = path.resolve(__dirname, '../../../../reports');
const INTENTIONAL_404_PATH = '/this-page-does-not-exist';
const KEYBOARD_VIEWPORTS = [
  { label: 'desktop', width: 1280, height: 800 },
  { label: 'tablet', width: 1024, height: 1366 },
  { label: 'mobile', width: 375, height: 812 },
] as const;

const ROUTE_EXPECTATIONS: Record<string, { allowStatuses: number[]; allowFinalPaths: string[] }> = {
  '/user/register': {
    allowStatuses: [200, 403],
    allowFinalPaths: ['/user/register', '/user/1/edit'],
  },
};

type ActiveElSnapshot = {
  descriptor: string;
  role: string;
  visibleFocusEvidence: boolean;
  selector: string;
  xpath: string;
  accessibleName: string;
  visibleLabel: string;
  labelInNameMismatch: boolean;
};

async function snapshotActiveElement(page: any): Promise<ActiveElSnapshot> {
  return page.evaluate(() => {
    const norm = (text: string): string => text.replace(/\s+/g, ' ').trim().toLowerCase();

    const cssPath = (el: HTMLElement): string => {
      if (el.id) {
        return `#${el.id}`;
      }
      const parts: string[] = [];
      let current: HTMLElement | null = el;
      while (current && current.nodeType === Node.ELEMENT_NODE && parts.length < 4) {
        const tag = current.tagName.toLowerCase();
        const parent = current.parentElement;
        if (!parent) {
          parts.unshift(tag);
          break;
        }
        const siblings = Array.from(parent.children).filter((c) => c.tagName === current!.tagName);
        const idx = siblings.indexOf(current) + 1;
        parts.unshift(`${tag}:nth-of-type(${idx})`);
        current = parent;
      }
      return parts.join(' > ');
    };

    const xpathFor = (el: HTMLElement): string => {
      if (el.id) {
        return `//*[@id="${el.id}"]`;
      }
      const parts: string[] = [];
      let current: HTMLElement | null = el;
      while (current && current.nodeType === Node.ELEMENT_NODE) {
        const parent = current.parentElement;
        const tag = current.tagName.toLowerCase();
        if (!parent) {
          parts.unshift(`/${tag}`);
          break;
        }
        const siblings = Array.from(parent.children).filter((c) => c.tagName === current!.tagName);
        const idx = siblings.indexOf(current) + 1;
        parts.unshift(`/${tag}[${idx}]`);
        current = parent;
      }
      return parts.join('');
    };

    const labelFromLabelledBy = (el: HTMLElement): string => {
      const ids = (el.getAttribute('aria-labelledby') || '').trim().split(/\s+/).filter(Boolean);
      if (ids.length === 0) return '';
      return ids
        .map((id) => document.getElementById(id)?.textContent || '')
        .join(' ')
        .trim();
    };

    const explicitLabel = (el: HTMLElement): string => {
      const ariaLabel = el.getAttribute('aria-label') || '';
      if (ariaLabel.trim()) return ariaLabel.trim();

      const labelledByText = labelFromLabelledBy(el);
      if (labelledByText) return labelledByText;

      if (el instanceof HTMLInputElement) {
        if (el.labels && el.labels.length > 0) {
          return Array.from(el.labels).map((l) => l.textContent || '').join(' ').trim();
        }
        if (el.type === 'submit' || el.type === 'button' || el.type === 'reset') {
          return (el.value || '').trim();
        }
      }

      if (el instanceof HTMLButtonElement) {
        return (el.textContent || '').trim();
      }

      if (el instanceof HTMLAnchorElement) {
        return (el.textContent || '').trim();
      }

      return (el.getAttribute('title') || '').trim() || (el.textContent || '').trim();
    };

    const visibleLabel = (el: HTMLElement): string => {
      if (el instanceof HTMLInputElement && (el.type === 'submit' || el.type === 'button' || el.type === 'reset')) {
        return (el.value || '').trim();
      }
      return (el.innerText || el.textContent || '').trim();
    };

    const el = document.activeElement as HTMLElement | null;

    if (!el || el === document.body || el === document.documentElement) {
      return {
        descriptor: el ? el.tagName.toLowerCase() : 'none',
        role: '',
        visibleFocusEvidence: false,
        selector: '',
        xpath: '',
        accessibleName: '',
        visibleLabel: '',
        labelInNameMismatch: false,
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
    const accName = explicitLabel(el);
    const visLabel = visibleLabel(el);
    const mismatch = Boolean(visLabel && accName && !norm(accName).includes(norm(visLabel)));

    return {
      descriptor: `${el.tagName.toLowerCase()}${id}${classPart}${label ? ` [${label}]` : ''}`,
      role,
      visibleFocusEvidence: Boolean(hasOutline || hasBoxShadow || hasUnderline),
      selector: cssPath(el),
      xpath: xpathFor(el),
      accessibleName: accName,
      visibleLabel: visLabel,
      labelInNameMismatch: mismatch,
    };
  });
}

function buildAxeBuilder(page: any): AxeBuilder {
  return new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']);
}

async function runDialogDynamicCheck(page: any): Promise<DynamicCheckResult> {
  const result: DynamicCheckResult = {
    type: 'modal-dialog',
    attempted: true,
    opened: false,
    tabStayedInDialog: false,
    sampleDataSupported: false,
    sampleDataEntered: false,
    escapedClosed: false,
    focusReturnedToTrigger: false,
    axeViolations: 0,
    axeViolationIds: [],
    details: [],
  };

  const triggerSelectors = [
    'main a:has-text("Modal dialog")',
    'main a:has-text("Dialog 700")',
    'main a:has-text("Dialog")',
    'main a[href*="dialog"]',
    'button:has-text("Open")',
    'button:has-text("Dialog")',
    'a:has-text("Open")',
    '[data-drupal-selector*="dialog"] button',
  ];

  let trigger: any = null;
  for (const selector of triggerSelectors) {
    const candidate = page.locator(selector).first();
    if ((await candidate.count()) && (await candidate.isVisible().catch(() => false))) {
      trigger = candidate;
      break;
    }
  }

  if (!trigger) {
    result.details.push('No dialog trigger found on route.');
    return result;
  }

  await trigger.focus();
  const triggerSnapshot = await snapshotActiveElement(page);
  await page.keyboard.press('Enter');

  const dialogSelector = '[role="dialog"], [aria-modal="true"], .ui-dialog';
  const dialog = page.locator(dialogSelector).first();

  const isVisible = await dialog.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false);
  if (!isVisible) {
    result.details.push('Dialog did not open after keyboard activation.');
    return result;
  }
  result.opened = true;

  let inDialogFocusCount = 0;
  const tabIterations = 6;
  for (let i = 0; i < tabIterations; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(50);
    const isInDialog = await page.evaluate((sel) => {
      const active = document.activeElement as HTMLElement | null;
      if (!active) return false;
      return Boolean(active.closest(sel));
    }, dialogSelector);
    if (isInDialog) {
      inDialogFocusCount += 1;
    }
  }
  result.tabStayedInDialog = inDialogFocusCount >= 4;
  if (!result.tabStayedInDialog) {
    result.details.push('Tab sequence escaped dialog unexpectedly; possible missing focus trap.');
  }

  const textInput = dialog.locator('input[type="text"], input:not([type]), textarea').first();
  if (await textInput.count()) {
    result.sampleDataSupported = true;
    await textInput.fill('A11y keyboard sample text');
    result.sampleDataEntered = true;
    result.details.push('Filled sample text in first dialog text control.');
  }

  const selectInput = dialog.locator('select').first();
  if (await selectInput.count()) {
    const options = await selectInput.locator('option').count();
    if (options > 1) {
      result.sampleDataSupported = true;
      await selectInput.selectOption({ index: 1 });
      result.sampleDataEntered = true;
      result.details.push('Selected sample option in first dialog select control.');
    }
  }

  if (!result.sampleDataSupported) {
    result.details.push('No fillable text/select controls in dialog; sample data entry not applicable.');
  }

  const axeResults = await buildAxeBuilder(page).include(dialogSelector).analyze();
  result.axeViolations = axeResults.violations.length;
  result.axeViolationIds = axeResults.violations.map((v) => v.id).slice(0, 10);
  if (result.axeViolations > 0) {
    result.details.push(`Scoped modal axe violations: ${result.axeViolations}`);
  }

  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  const stillVisible = await dialog.isVisible().catch(() => false);
  if (!stillVisible) {
    result.escapedClosed = true;
  }
  else {
    const closeButton = dialog.locator('button:has-text("Close"), [aria-label*="Close"]').first();
    if (await closeButton.count()) {
      await closeButton.click();
      await page.waitForTimeout(150);
    }
    result.escapedClosed = !(await dialog.isVisible().catch(() => false));
  }

  const afterClose = await snapshotActiveElement(page);
  result.focusReturnedToTrigger = Boolean(
    afterClose.selector && triggerSnapshot.selector && afterClose.selector === triggerSnapshot.selector,
  );
  if (!result.focusReturnedToTrigger) {
    result.details.push('Focus did not clearly return to the original trigger after close.');
  }

  return result;
}

async function runTabsDynamicCheck(page: any): Promise<DynamicCheckResult> {
  const result: DynamicCheckResult = {
    type: 'tabs-nav',
    attempted: true,
    opened: false,
    tabStayedInDialog: true,
    sampleDataSupported: false,
    sampleDataEntered: false,
    escapedClosed: true,
    focusReturnedToTrigger: true,
    interactionSucceeded: false,
    routeChanged: false,
    axeViolations: 0,
    axeViolationIds: [],
    details: [],
  };

  const tabCandidates = page.locator('nav.tabs a[href^="/tabs/"]:visible, .tabs a[href^="/tabs/"]:visible');
  const candidateCount = await tabCandidates.count();
  let tabLink: any = null;
  for (let i = 0; i < candidateCount; i++) {
    const candidate = tabCandidates.nth(i);
    const href = (await candidate.getAttribute('href')) || '';
    if (href && href !== '/tabs') {
      tabLink = candidate;
      break;
    }
  }
  if (!tabLink) {
    result.details.push('No suitable tabs navigation link found.');
    return result;
  }

  const targetHref = (await tabLink.getAttribute('href')) || '';

  await tabLink.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(150);
  if (new URL(page.url()).pathname === '/tabs') {
    await tabLink.press('Enter');
    await page.waitForTimeout(150);
  }

  const currentUrl = page.url();
  const currentPath = new URL(currentUrl).pathname;
  const changed = /\/tabs\/(?!$)/.test(currentPath) || (targetHref && currentPath === targetHref);
  result.routeChanged = changed;
  result.opened = changed;
  result.interactionSucceeded = changed;

  if (!changed) {
    result.details.push(`Tab navigation did not change to an expected tab route. Final URL: ${currentUrl}`);
  }

  const axeResults = await buildAxeBuilder(page).include('nav.tabs, .tabs').analyze();
  result.axeViolations = axeResults.violations.length;
  result.axeViolationIds = axeResults.violations.map((v) => v.id).slice(0, 10);
  if (result.axeViolations > 0) {
    result.details.push(`Scoped tabs axe violations: ${result.axeViolations}`);
  }

  return result;
}

async function runDropbuttonDynamicCheck(page: any): Promise<DynamicCheckResult> {
  const result: DynamicCheckResult = {
    type: 'dropbutton',
    attempted: true,
    opened: false,
    tabStayedInDialog: true,
    sampleDataSupported: false,
    sampleDataEntered: false,
    escapedClosed: true,
    focusReturnedToTrigger: true,
    interactionSucceeded: false,
    secondaryActionsVisible: false,
    axeViolations: 0,
    axeViolationIds: [],
    details: [],
  };

  const toggle = page.locator('main button.dropbutton__toggle').first();
  if (!await toggle.count()) {
    result.details.push('No dropbutton toggle found.');
    return result;
  }

  await toggle.focus();
  const beforeVisible = await page.evaluate(() => {
    const active = document.activeElement as HTMLElement | null;
    const widget = active?.closest('.dropbutton-widget');
    if (!widget) return 0;
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
    if (!widget) return 0;
    return Array.from(widget.querySelectorAll('li.secondary-action')).filter((el) => {
      const style = window.getComputedStyle(el);
      return style.visibility !== 'hidden' && style.display !== 'none';
    }).length;
  });

  const expanded = afterVisible > beforeVisible;
  result.secondaryActionsVisible = expanded;
  result.opened = expanded;

  await page.keyboard.press('Escape');
  await page.waitForTimeout(120);

  const afterEscapeVisible = await page.evaluate(() => {
    const active = document.activeElement as HTMLElement | null;
    const widget = active?.closest('.dropbutton-widget');
    if (!widget) return 0;
    return Array.from(widget.querySelectorAll('li.secondary-action')).filter((el) => {
      const style = window.getComputedStyle(el);
      return style.visibility !== 'hidden' && style.display !== 'none';
    }).length;
  });

  result.escapedClosed = afterEscapeVisible <= afterVisible;
  result.interactionSucceeded = Boolean(result.opened && result.escapedClosed);

  if (!result.opened) {
    result.details.push('Dropbutton toggle did not reveal secondary actions via keyboard.');
  }

  const axeResults = await buildAxeBuilder(page).include('main .dropbutton-widget').analyze();
  result.axeViolations = axeResults.violations.length;
  result.axeViolationIds = axeResults.violations.map((v) => v.id).slice(0, 10);
  if (result.axeViolations > 0) {
    result.details.push(`Scoped dropbutton axe violations: ${result.axeViolations}`);
  }

  return result;
}

async function runButtonsDynamicCheck(page: any): Promise<DynamicCheckResult> {
  const result: DynamicCheckResult = {
    type: 'buttons',
    attempted: true,
    opened: true,
    tabStayedInDialog: true,
    sampleDataSupported: false,
    sampleDataEntered: false,
    escapedClosed: true,
    focusReturnedToTrigger: true,
    interactionSucceeded: false,
    axeViolations: 0,
    axeViolationIds: [],
    details: [],
  };

  const button = page.locator('main input[type="submit"], main button, main a.button').first();
  if (!await button.count()) {
    result.details.push('No button control found on /buttons route.');
    return result;
  }

  await button.focus();
  const beforeUrl = page.url();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(100);
  const afterEnterUrl = page.url();
  await page.keyboard.press('Space');
  await page.waitForTimeout(100);
  const afterSpaceUrl = page.url();

  result.interactionSucceeded = Boolean(beforeUrl && afterEnterUrl && afterSpaceUrl);
  result.routeChanged = beforeUrl !== afterEnterUrl || beforeUrl !== afterSpaceUrl;

  const axeResults = await buildAxeBuilder(page).include('main').analyze();
  result.axeViolations = axeResults.violations.length;
  result.axeViolationIds = axeResults.violations.map((v) => v.id).slice(0, 10);
  if (result.axeViolations > 0) {
    result.details.push(`Scoped buttons axe violations: ${result.axeViolations}`);
  }

  return result;
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

function classifySeverity(message: string): 'High' | 'Medium' | 'Low' {
  const text = message.toLowerCase();
  if (
    text.includes('status: 403')
    || text.includes('did not open')
    || text.includes('focus trap')
    || text.includes('did not close')
  ) {
    return 'High';
  }
  if (text.includes('stuck') || text.includes('first tab')) {
    return 'Medium';
  }
  return 'Low';
}

function recommendedTestFor(message: string): string {
  const text = message.toLowerCase();
  if (text.includes('status: 403')) {
    return 'route-access-contract';
  }
  if (text.includes('modal dialog') || text.includes('focus trap') || text.includes('did not close')) {
    return 'modal-keyboard-contract';
  }
  if (text.includes('label-in-name')) {
    return 'label-in-name-contract';
  }
  return 'keyboard-flow-contract';
}

function wcagFor(message: string): string {
  const text = message.toLowerCase();
  if (text.includes('label-in-name')) {
    return '2.5.3';
  }
  if (text.includes('focus')) {
    return '2.4.3/2.4.7';
  }
  return '2.1.1';
}

function shouldPromote(message: string): boolean {
  const text = message.toLowerCase();
  return (
    text.includes('status: 403')
    || text.includes('modal dialog')
    || text.includes('focus trap')
    || text.includes('did not close')
    || text.includes('tab navigation appears stuck')
    || text.includes('first tab press')
  );
}

test.describe('Keyboard-only navigation review crawl', () => {
  test.setTimeout(10 * 60 * 1000);

  test.use({
    baseURL: DEFAULT_BASE_URL,
    ignoreHTTPSErrors: true,
  });

  test('capture keyboard navigation findings across Drupal routes', async ({ browser, baseURL }) => {
    const authUser = process.env.DRUPAL_ADMIN_USER ?? 'admin';
    const authPass = process.env.DRUPAL_ADMIN_PASS ?? 'admin';

    const pagesToScan = allPages.slice(0, Math.max(1, MAX_PAGES));
    const results: KeyboardReviewResults = {
      generatedAt: new Date().toISOString(),
      baseUrl: baseURL ?? DEFAULT_BASE_URL,
      auth: {
        username: authUser,
        password: authPass,
        source: process.env.DRUPAL_ADMIN_USER || process.env.DRUPAL_ADMIN_PASS ? 'environment override' : 'local default',
      },
      totalPages: pagesToScan.length * KEYBOARD_VIEWPORTS.length,
      totalFailures: 0,
      totalWarnings: 0,
      pages: [],
      promotedFindings: [],
    };
    let promotedCounter = 1;

    for (const entry of pagesToScan) {
      for (const viewport of KEYBOARD_VIEWPORTS) {
        const context = await browser.newContext({
          baseURL: results.baseUrl,
          ignoreHTTPSErrors: true,
          storageState: entry.requiresAuth ? AUTH_STATE_FILE : undefined,
          viewport: {
            width: viewport.width,
            height: viewport.height,
          },
        });
        const page = await context.newPage();
        const url = new URL(entry.path, results.baseUrl).toString();
        let finalUrl = url;
        let status = 0;

        const focusSteps: FocusStep[] = [];
        const seenDescriptors = new Set<string>();
        const issues: string[] = [];
        const warnings: string[] = [];
        const voiceControlRisks: VoiceControlRisk[] = [];
        const dynamicChecks: DynamicCheckResult[] = [];

        try {
          const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
          status = response?.status() ?? 0;
          finalUrl = page.url();

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
              selector: snap.selector,
              xpath: snap.xpath,
              accessibleName: snap.accessibleName,
              visibleLabel: snap.visibleLabel,
              labelInNameMismatch: snap.labelInNameMismatch,
            });

            seenDescriptors.add(snap.descriptor);
            if (snap.labelInNameMismatch) {
              voiceControlRisks.push({
                step: i,
                descriptor: snap.descriptor,
                selector: snap.selector,
                xpath: snap.xpath,
                visibleLabel: snap.visibleLabel,
                accessibleName: snap.accessibleName,
              });
            }
          }

          if (entry.path === '/dialog' && status === 200) {
            const dialogCheck = await runDialogDynamicCheck(page);
            dynamicChecks.push(dialogCheck);

            if (!dialogCheck.opened) {
              issues.push('Modal dialog did not open via keyboard interaction on /dialog.');
            }
            if (dialogCheck.opened && !dialogCheck.tabStayedInDialog) {
              issues.push('Modal dialog focus trap appears incomplete during keyboard tabbing.');
            }
            if (dialogCheck.opened && !dialogCheck.escapedClosed) {
              issues.push('Modal dialog did not close via Escape/keyboard-close sequence.');
            }
            if (dialogCheck.opened && !dialogCheck.focusReturnedToTrigger) {
              warnings.push('Modal dialog closed but focus did not clearly restore to its trigger.');
            }
            if (dialogCheck.opened && dialogCheck.sampleDataSupported && !dialogCheck.sampleDataEntered) {
              warnings.push('No sample data entry point detected inside the modal dialog.');
            }
            if (dialogCheck.axeViolations > 0) {
              warnings.push(`Modal dialog scoped axe scan found ${dialogCheck.axeViolations} violation(s).`);
            }
          }

          if (entry.path === '/tabs' && status === 200) {
            const tabsCheck = await runTabsDynamicCheck(page);
            dynamicChecks.push(tabsCheck);
            if (!tabsCheck.interactionSucceeded) {
              warnings.push('Tabs navigation did not activate expected route via keyboard.');
            }
          }

          if (entry.path === '/dropbutton' && status === 200) {
            const dropbuttonCheck = await runDropbuttonDynamicCheck(page);
            dynamicChecks.push(dropbuttonCheck);
            if (!dropbuttonCheck.interactionSucceeded) {
              warnings.push('Dropbutton keyboard interaction did not reveal/close secondary actions as expected.');
            }
          }

          if (entry.path === '/buttons' && status === 200) {
            const buttonsCheck = await runButtonsDynamicCheck(page);
            dynamicChecks.push(buttonsCheck);
          }
        }
        finally {
          await context.close();
        }

        const finalPath = new URL(finalUrl).pathname;
        const expectation = ROUTE_EXPECTATIONS[entry.path];
        const matchesExpectedOutcome = Boolean(
          expectation
          && expectation.allowStatuses.includes(status)
          && expectation.allowFinalPaths.includes(finalPath),
        );

        if (status === 404) {
          if (entry.path !== INTENTIONAL_404_PATH) {
            issues.push(`Broken route detected during crawl (404): ${entry.path}`);
          }
        }
        else if ((status >= 400 || status === 0) && !matchesExpectedOutcome) {
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
          finalUrl,
          viewport: {
            label: viewport.label,
            width: viewport.width,
            height: viewport.height,
          },
          requiresAuth: entry.requiresAuth,
          status,
          focusSteps,
          uniqueFocusTargets: seenDescriptors.size,
          issues,
          warnings,
          voiceControlRisks,
          dynamicChecks,
        };

        results.totalFailures += issues.length;
        results.totalWarnings += warnings.length;
        results.pages.push(pageResult);

        for (const issue of issues) {
          if (!shouldPromote(issue)) {
            continue;
          }
          results.promotedFindings.push({
            id: `PROMOTE-${String(promotedCounter++).padStart(3, '0')}`,
            route: entry.path,
            viewport: viewport.label,
            source: 'keyboard-review',
            findingType: 'issue',
            title: `${entry.name} keyboard issue`,
            message: issue,
            severity: classifySeverity(issue),
            wcag: wcagFor(issue),
            recommendedTest: recommendedTestFor(issue),
            rationale: 'Reproducible route-level behavior with clear pass/fail expectations suitable for contract testing.',
            status: 'candidate',
          });
        }

        for (const warning of warnings) {
          if (!shouldPromote(warning)) {
            continue;
          }
          results.promotedFindings.push({
            id: `PROMOTE-${String(promotedCounter++).padStart(3, '0')}`,
            route: entry.path,
            viewport: viewport.label,
            source: 'keyboard-review',
            findingType: 'warning',
            title: `${entry.name} keyboard warning`,
            message: warning,
            severity: classifySeverity(warning),
            wcag: wcagFor(warning),
            recommendedTest: recommendedTestFor(warning),
            rationale: 'Warning impacts core keyboard interaction and should be validated with a deterministic pattern contract.',
            status: 'candidate',
          });
        }

        if (voiceControlRisks.length > 0) {
          results.promotedFindings.push({
            id: `PROMOTE-${String(promotedCounter++).padStart(3, '0')}`,
            route: entry.path,
            viewport: viewport.label,
            source: 'keyboard-review',
            findingType: 'dynamic-check',
            title: `${entry.name} voice-control naming risk`,
            message: `${voiceControlRisks.length} potential label-in-name mismatches in sampled focus steps.`,
            severity: 'Medium',
            wcag: '2.5.3',
            recommendedTest: 'label-in-name-contract',
            rationale: 'Potential speech-command mismatch can block voice-control workflows and deserves contract coverage.',
            status: 'candidate',
          });
        }
      }
    }

    writeResults(results);
  });
});
