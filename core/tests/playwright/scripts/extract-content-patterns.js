/**
 * Content pattern extractor for Drupal Core.
 *
 * Visits all public and admin pages, extracts:
 *   - Page titles and heading hierarchies
 *   - Button labels
 *   - Link text
 *   - Form field labels and help text
 *   - Navigation labels
 *   - Status/error message patterns
 *   - Table headers
 *   - Breadcrumb text
 *   - Action link labels (local tasks, local actions)
 *
 * Output: reports/content-patterns.json
 *
 * Usage:
 *   node core/tests/playwright/scripts/extract-content-patterns.js
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';
const USERNAME = process.env.DRUPAL_ADMIN_USER ?? 'admin';
const PASSWORD = process.env.DRUPAL_ADMIN_PASS ?? 'admin';

const AUTH_STATE_FILE = path.join(__dirname, '../reports/auth-state.json');

const ANONYMOUS_PAGES = [
  { name: 'Homepage', path: '/' },
  { name: 'User login', path: '/user/login' },
  { name: 'User register', path: '/user/register' },
  { name: 'User password reset', path: '/user/password' },
  { name: 'Search results', path: '/search/node' },
  { name: '404 page', path: '/this-page-does-not-exist' },
];

const ADMIN_PAGES = [
  { name: 'Admin dashboard', path: '/admin' },
  { name: 'Content list', path: '/admin/content' },
  { name: 'Create article', path: '/node/add/article' },
  { name: 'Create basic page', path: '/node/add/page' },
  { name: 'Structure', path: '/admin/structure' },
  { name: 'Content types', path: '/admin/structure/types' },
  { name: 'Add content type', path: '/admin/structure/types/add' },
  { name: 'Taxonomy', path: '/admin/structure/taxonomy' },
  { name: 'Add vocabulary', path: '/admin/structure/taxonomy/add' },
  { name: 'Block layout', path: '/admin/structure/block' },
  { name: 'Appearance', path: '/admin/appearance' },
  { name: 'Modules', path: '/admin/modules' },
  { name: 'People', path: '/admin/people' },
  { name: 'User edit (uid 1)', path: '/user/1/edit' },
  { name: 'Configuration', path: '/admin/config' },
  { name: 'Text formats', path: '/admin/config/content/formats' },
  { name: 'Text format (restricted)', path: '/admin/config/content/formats/manage/restricted_html' },
  { name: 'Site information', path: '/admin/config/system/site-information' },
  { name: 'Reports', path: '/admin/reports' },
  { name: 'Status report', path: '/admin/reports/status' },
  { name: 'Available updates', path: '/admin/reports/updates' },
  { name: 'Recent log messages', path: '/admin/reports/dblog' },
  { name: 'Add user', path: '/admin/people/create' },
  { name: 'Permissions', path: '/admin/people/permissions' },
  { name: 'Menu list', path: '/admin/structure/menu' },
  { name: 'Views list', path: '/admin/structure/views' },
  { name: 'Image styles', path: '/admin/config/media/image-styles' },
  { name: 'Account settings', path: '/admin/config/people/accounts' },
  { name: 'Performance settings', path: '/admin/config/development/performance' },
  { name: 'Cron settings', path: '/admin/config/system/cron' },
  { name: 'Logging settings', path: '/admin/config/development/logging' },
  { name: 'Maintenance mode', path: '/admin/config/development/maintenance' },
  { name: 'Regional settings', path: '/admin/config/regional/settings' },
  { name: 'Date and time formats', path: '/admin/config/regional/date-time' },
  { name: 'Content language settings', path: '/admin/config/regional/content-language' },
];

/**
 * Extract all meaningful text content from a page.
 */
async function extractPageContent(page, pageName, pagePath) {
  const data = {
    name: pageName,
    path: pagePath,
    url: await page.url(),
    title: '',
    headings: [],
    buttons: [],
    links: [],
    formLabels: [],
    helpText: [],
    tableHeaders: [],
    breadcrumbs: [],
    localTasks: [],
    localActions: [],
    navItems: [],
    statusMessages: [],
    placeholders: [],
    descriptions: [],
  };

  // Page <title>
  data.title = await page.title();

  // Heading hierarchy
  data.headings = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      if (text) results.push({ level: el.tagName.toLowerCase(), text });
    });
    return results;
  });

  // Button labels (buttons and submit inputs)
  data.buttons = await page.evaluate(() => {
    const results = new Set();
    document.querySelectorAll('button, input[type="submit"], input[type="button"], input[type="reset"]').forEach(el => {
      const text = (el.textContent || el.value || '').trim().replace(/\s+/g, ' ');
      if (text && text.length < 100) results.add(text);
    });
    // Also capture .button and .button--primary anchors
    document.querySelectorAll('a.button, a.button--primary, a.dropbutton__item a').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      if (text && text.length < 80) results.add(text);
    });
    return [...results];
  });

  // Links (non-nav, non-button, meaningful)
  data.links = await page.evaluate(() => {
    const results = new Set();
    const skip = new Set(['Skip to main content', '']);
    document.querySelectorAll('main a, .block-system-main-block a').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      if (text && text.length > 1 && text.length < 80 && !skip.has(text)) {
        results.add(text);
      }
    });
    return [...results].slice(0, 60);
  });

  // Form labels
  data.formLabels = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('label').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ').replace(/\*$/, '').trim();
      if (text && text.length < 120) results.push(text);
    });
    return [...new Set(results)];
  });

  // Help text / field descriptions
  data.helpText = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('.form-item__description, .description, .help-block, [data-drupal-selector$="-description"]').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      if (text && text.length > 5 && text.length < 300) results.push(text);
    });
    return [...new Set(results)];
  });

  // Table headers
  data.tableHeaders = await page.evaluate(() => {
    const results = new Set();
    document.querySelectorAll('th').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      if (text && text.length < 80) results.add(text);
    });
    return [...results];
  });

  // Breadcrumbs
  data.breadcrumbs = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('.breadcrumb a, nav[aria-label*="readcrumb"] a, [class*="breadcrumb"] a').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      if (text) results.push(text);
    });
    return [...new Set(results)];
  });

  // Local tasks (tabs)
  data.localTasks = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('.tabs__link, .tab a, ul.tabs li a, nav.tabs a').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      if (text) results.push(text);
    });
    return [...new Set(results)];
  });

  // Local actions ("Add content", "+ Add block", etc.)
  data.localActions = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('.local-actions a, .block-local-actions-block a').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      if (text) results.push(text);
    });
    return [...new Set(results)];
  });

  // Navigation menu items
  data.navItems = await page.evaluate(() => {
    const results = new Set();
    document.querySelectorAll('nav a, .toolbar a, .menu a').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      if (text && text.length < 60) results.add(text);
    });
    return [...results].slice(0, 40);
  });

  // Status messages
  data.statusMessages = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('.messages, .messages--status, .messages--warning, .messages--error, [data-drupal-messages]').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      if (text && text.length < 400) results.push(text);
    });
    return results;
  });

  // Input placeholders
  data.placeholders = await page.evaluate(() => {
    const results = new Set();
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      const text = el.getAttribute('placeholder').trim();
      if (text) results.add(text);
    });
    return [...results];
  });

  // Summary/description text blocks
  data.descriptions = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('.admin-panel__body, .system-admin-index p, .description, .views-field-description').forEach(el => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      if (text && text.length > 10 && text.length < 300) results.push(text);
    });
    return [...new Set(results)].slice(0, 20);
  });

  return data;
}

async function main() {
  const browser = await chromium.launch();

  // ── Anonymous pages ────────────────────────────────────────────────────────
  console.log('\n📄 Crawling anonymous pages...');
  const anonContext = await browser.newContext({ ignoreHTTPSErrors: true });
  const anonResults = [];

  for (const entry of ANONYMOUS_PAGES) {
    const page = await anonContext.newPage();
    try {
      await page.goto(`${BASE_URL}${entry.path}`, { waitUntil: 'networkidle', timeout: 15000 });
      const data = await extractPageContent(page, entry.name, entry.path);
      anonResults.push(data);
      console.log(`  ✓ ${entry.name}`);
    } catch (e) {
      console.log(`  ✗ ${entry.name}: ${e.message}`);
      anonResults.push({ name: entry.name, path: entry.path, error: e.message });
    }
    await page.close();
  }
  await anonContext.close();

  // ── Admin pages ────────────────────────────────────────────────────────────
  console.log('\n🔐 Crawling admin pages (logging in)...');

  // Login
  const adminContext = await browser.newContext({ ignoreHTTPSErrors: true });
  const loginPage = await adminContext.newPage();
  await loginPage.goto(`${BASE_URL}/user/login`, { waitUntil: 'networkidle' });
  await loginPage.fill('#edit-name', USERNAME);
  await loginPage.fill('#edit-pass', PASSWORD);
  await loginPage.click('[data-drupal-selector="edit-submit"]');
  await loginPage.waitForURL(`${BASE_URL}/user/**`);
  await loginPage.close();

  const adminResults = [];
  for (const entry of ADMIN_PAGES) {
    const page = await adminContext.newPage();
    try {
      await page.goto(`${BASE_URL}${entry.path}`, { waitUntil: 'networkidle', timeout: 15000 });
      // Skip if redirected (page doesn't exist on this install)
      const finalUrl = page.url();
      if (!finalUrl.includes(entry.path.split('?')[0])) {
        console.log(`  ↩ ${entry.name} (redirected to ${finalUrl})`);
        adminResults.push({ name: entry.name, path: entry.path, skipped: true, redirectedTo: finalUrl });
      } else {
        const data = await extractPageContent(page, entry.name, entry.path);
        adminResults.push(data);
        console.log(`  ✓ ${entry.name}`);
      }
    } catch (e) {
      console.log(`  ✗ ${entry.name}: ${e.message}`);
      adminResults.push({ name: entry.name, path: entry.path, error: e.message });
    }
    await page.close();
  }
  await adminContext.close();
  await browser.close();

  // ── Write output ───────────────────────────────────────────────────────────
  const outDir = path.resolve(__dirname, '../../../../reports');
  fs.mkdirSync(outDir, { recursive: true });

  const output = {
    crawledAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    anonymousPages: anonResults,
    adminPages: adminResults,
  };

  const outFile = path.join(outDir, 'content-patterns.json');
  fs.writeFileSync(outFile, JSON.stringify(output, null, 2));
  console.log(`\n✅ Content patterns written to: ${outFile}`);
}

main().catch(err => { console.error(err); process.exit(1); });
