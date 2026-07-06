/**
 * Crawl finalization — merge shards and restore site settings.
 *
 * Registered as Playwright globalTeardown so it runs EXACTLY ONCE per
 * invocation, after all workers have exited. It must NOT live in a
 * test.afterAll: Playwright runs afterAll hooks per worker, and each scan
 * group gets its own worker (their test.use() options differ), so an
 * afterAll-based merge runs dozens of times — and its shard cleanup deletes
 * every earlier group's results (observed: a 79-minute crawl reduced to the
 * final group's 14 records).
 *
 * Shared drush helpers for the crawl spec also live here so the teardown
 * can restore theme settings without importing the spec.
 */
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
const { writeShardedResults } = require('../scripts/lib/axe-results-store');

/** Root-level reports/ dir (repo root is four levels up from lib/). */
export const OUT_DIR = path.resolve(__dirname, '../../../../reports');
/** Temp dir where each scan group writes its partial result shard. */
export const TEMP_DIR = path.join(OUT_DIR, '.tmp-crawl');
/**
 * Original site settings captured by the first crawl worker. A file (not
 * memory) because workers are separate processes and the teardown runs in
 * yet another one.
 */
export const ORIGINAL_STATE_FILE = path.join(TEMP_DIR, '.original-settings.json');

export interface OriginalSettings {
  defaultTheme: string;
  adminTheme: string;
  accentPreset: string | null;
  darkMode: string | null;
}

export function drush(cmd: string): string {
  return execSync(`ddev drush ${cmd}`).toString();
}

/** Read a single system.theme config value from the live site. */
export function getThemeSetting(key: 'default' | 'admin'): string {
  return drush(`config:get system.theme ${key} --format=string`).trim();
}

/** Best-effort read of a default_admin.settings key (theme may not be installed). */
export function getDefaultAdminSetting(key: string): string | null {
  try {
    return drush(`config:get default_admin.settings ${key} --format=string`).trim();
  }
  catch {
    return null;
  }
}

/**
 * Capture the site's original settings once. Called from the outer
 * beforeAll of every crawl worker; only the first write wins, before any
 * theme switching has happened, so the file always holds true originals.
 */
export function captureOriginalSettingsOnce(): void {
  if (fs.existsSync(ORIGINAL_STATE_FILE)) {
    return;
  }
  const original: OriginalSettings = {
    defaultTheme: getThemeSetting('default'),
    adminTheme: getThemeSetting('admin') || 'claro',
    accentPreset: getDefaultAdminSetting('preset_accent_color'),
    darkMode: getDefaultAdminSetting('enable_dark_mode'),
  };
  fs.mkdirSync(TEMP_DIR, { recursive: true });
  fs.writeFileSync(ORIGINAL_STATE_FILE, JSON.stringify(original, null, 2));
}

/**
 * globalTeardown entry point. Merges whatever shards exist into the final
 * sharded results bundle, then restores the site's original configuration.
 * Safe for non-crawl invocations: does nothing when no shards were written.
 */
export default function crawlFinalize(): void {
  if (!fs.existsSync(TEMP_DIR)) {
    return;
  }

  const shardFiles = fs.readdirSync(TEMP_DIR)
    .filter((f) => f.endsWith('.json') && !f.startsWith('.'));

  if (shardFiles.length > 0) {
    let allResults: unknown[] = [];
    for (const shard of shardFiles.sort()) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(TEMP_DIR, shard), 'utf8'));
        allResults = allResults.concat(data);
      } catch {
        console.warn(`  ⚠️  Could not read shard ${shard}, skipping.`);
      }
    }

    const date = new Date().toISOString().slice(0, 10);
    const output = writeShardedResults({
      records: allResults,
      reportsDir: OUT_DIR,
      dateStamp: date,
    });

    console.log(`\n📊 Axe results merged from ${shardFiles.length} shard(s):`);
    console.log(`   ${output.datedManifestPath}`);
    console.log(`   ${output.latestManifestPath} (latest)`);
    console.log(`   Total records: ${allResults.length}`);
    console.log(`   Run: yarn a11y:analyze then npm run a11y:sustainability.`);
  }

  // Restore the site to its pre-crawl configuration.
  if (fs.existsSync(ORIGINAL_STATE_FILE)) {
    try {
      const original: OriginalSettings = JSON.parse(fs.readFileSync(ORIGINAL_STATE_FILE, 'utf8'));
      drush(`config:set system.theme default ${original.defaultTheme} -y`);
      drush(`config:set system.theme admin ${original.adminTheme} -y`);
      if (original.accentPreset !== null) {
        drush(`config:set default_admin.settings preset_accent_color ${original.accentPreset} -y`);
      }
      if (original.darkMode !== null) {
        drush(`config:set default_admin.settings enable_dark_mode ${original.darkMode} -y`);
      }
      drush(`cache:rebuild`);
      console.log(`   Site restored to ${original.defaultTheme}/${original.adminTheme}.`);
    }
    catch (error) {
      console.warn(`  ⚠️  Could not restore original site settings: ${(error as Error).message}`);
    }
  }

  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
}
