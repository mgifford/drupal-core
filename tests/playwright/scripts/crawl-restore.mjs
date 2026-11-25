#!/usr/bin/env node
/**
 * Restores the site state an interrupted axe crawl left behind.
 *
 *   npm --prefix tests/playwright run crawl:restore
 *
 * A crawl with CRAWL_THEME set saves the site's theme state in
 * tests/playwright/reports/crawl-site-state.json before switching themes,
 * and its global teardown restores it. A run stopped with Ctrl-C or killed
 * can end before that teardown; this puts the state back and deletes the
 * file. The next crawl also does this before it starts.
 *
 * Set DRUPAL_SOURCE_DIR when the site runs from another checkout.
 * Exit codes: 0 restored or nothing to restore, 1 restore failed.
 */
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crawlSite, describeRestore } from '../lib/crawl-site.mjs';

const PLAYWRIGHT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const site = crawlSite({
  siteDir: path.resolve(process.env.DRUPAL_SOURCE_DIR ?? path.join(PLAYWRIGHT_DIR, '../..')),
  stateFile: path.join(PLAYWRIGHT_DIR, 'reports/crawl-site-state.json'),
});

try {
  const restored = site.restore();
  console.log(restored ? describeRestore(restored) : 'crawl: no saved site state; nothing to restore.');
}
catch (error) {
  console.error(error.message);
  process.exit(1);
}
