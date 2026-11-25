/**
 * Reads and changes the theme state of the site under test for the axe
 * crawl, through `ddev exec dr` in the checkout the site is served from.
 *
 * Used by lib/crawl-finalize.ts (Playwright) and scripts/crawl-restore.mjs
 * (by hand), so paths are passed in: no import.meta or __dirname here.
 *
 * The state file holds the site's state from before the crawl changed it,
 * and the id of the run that captured it. A file from another run means
 * that run was interrupted before it could restore: it is restored first.
 */
import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { restoreCommands, switchCommands } from './crawl.mjs';

/**
 * @param {object} options
 * @param {string} options.siteDir    checkout the DDEV site runs from
 * @param {string} options.stateFile  where the captured state is kept
 */
export function crawlSite({ siteDir, stateFile }) {
  /** Runs one `dr` command. Values are checked by crawl.mjs before they get here. */
  const dr = (args) => execFileSync('ddev', ['exec', 'dr', ...args], { cwd: siteDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

  /** `dr config:get` has no plain-string format, so read the JSON form. */
  const configValue = (name, key) => {
    const value = Object.values(JSON.parse(dr(['config:get', name, key, '--format=json'])))[0];
    return value === null || value === undefined ? null : String(value);
  };

  const installedThemes = () => Object.keys(JSON.parse(dr(['ex:list', '--installed', '--type=theme', '--format=json'])));

  const readState = () => {
    try {
      return JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    }
    catch (error) {
      throw new Error(`crawl: cannot read the saved site state in ${stateFile}: ${error.message}. ` +
        'Check the site\'s system.theme and default_admin.settings by hand, then delete that file.');
    }
  };

  /** Puts back the captured state and deletes the file. Returns what it restored, or null if there was nothing. */
  function restore() {
    if (!fs.existsSync(stateFile)) {
      return null;
    }
    const original = readState();
    let commands = [];
    try {
      commands = restoreCommands(original, installedThemes());
      for (const command of commands) {
        dr(command);
      }
    }
    catch (error) {
      let manual = '  (the saved state itself is invalid: check it by hand)';
      try {
        manual = (commands.length ? commands : restoreCommands(original, original.installedThemes ?? []))
          .map((command) => `  ddev exec dr ${command.join(' ')}`).join('\n');
      }
      catch {
        // Keep the note above.
      }
      throw new Error(
        `crawl: could not restore the site state saved in ${stateFile}: ${error.message.split('\n')[0]}\n` +
        `Restore it by hand from ${siteDir}, then delete that file. Commands (themes the crawl installed may also need ex:uninstall):\n${manual}`,
      );
    }
    fs.rmSync(stateFile);
    return original;
  }

  const savedRunId = () => (fs.existsSync(stateFile) ? readState().run_id ?? null : undefined);

  /**
   * Restores state left by another, interrupted run. Keeps the state of
   * this run: a worker restarted after a failed test must not restore.
   */
  function restoreStale(runId) {
    const saved = savedRunId();
    return saved === undefined || saved === runId ? null : restore();
  }

  /**
   * Restores only state this run captured. The global teardown runs after
   * every Playwright invocation, and must not undo a crawl that is still
   * running in another terminal.
   */
  function restoreOwn(runId) {
    return runId && savedRunId() === runId ? restore() : null;
  }

  /** The site's current default and admin themes. */
  function readThemes() {
    const value = (key) => {
      const theme = configValue('system.theme', key);
      if (!theme) {
        throw new Error(`system.theme ${key} is empty`);
      }
      return theme;
    };
    return { default: value('default'), admin: value('admin') };
  }

  return {
    readThemes,
    restoreStale,
    restoreOwn,

    /**
     * Records the state before this run changes it, once per run. Returns
     * what it restored from an interrupted run first, if anything.
     */
    capture(runId) {
      const restored = restoreStale(runId);
      if (fs.existsSync(stateFile)) {
        return restored;
      }
      const current = readThemes();
      const themes = installedThemes();
      const state = {
        run_id: runId,
        defaultTheme: current.default,
        adminTheme: current.admin,
        installedThemes: themes,
        darkMode: themes.includes('default_admin') ? configValue('default_admin.settings', 'enable_dark_mode') : null,
        captured_at: new Date().toISOString(),
      };
      fs.mkdirSync(path.dirname(stateFile), { recursive: true });
      try {
        // 'wx': if two workers capture at once, only the first file counts.
        fs.writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n', { flag: 'wx' });
      }
      catch (error) {
        if (error.code !== 'EEXIST') {
          throw error;
        }
      }
      return restored;
    },

    /** Switches the site to a theme config. Refuses before a capture. */
    apply(themeConfig) {
      if (!fs.existsSync(stateFile)) {
        throw new Error('refusing to switch themes before the site state was captured');
      }
      for (const command of switchCommands(themeConfig, installedThemes())) {
        dr(command);
      }
    },

    restore,
  };
}

/** One line saying what was restored. */
export function describeRestore(original) {
  return `crawl: site restored to themes ${original.defaultTheme}+${original.adminTheme}` +
    (original.darkMode !== null ? `, enable_dark_mode ${original.darkMode}` : '') +
    ` (state captured by ${original.run_id ?? 'an earlier run'}).`;
}
