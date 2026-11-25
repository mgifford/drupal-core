// Tests lib/crawl-site.mjs against a fake `ddev` on PATH that keeps the
// site's config and installed themes in a JSON file.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { crawlSite, describeRestore } from '../playwright/lib/crawl-site.mjs';

const FAKE_DDEV = `#!/usr/bin/env node
const fs = require('fs');
const [, , , , cmd, ...rest] = process.argv; // node ddev exec dr <cmd> ...
const line = [cmd, ...rest].join(' ');
fs.appendFileSync(process.env.FAKE_DDEV_LOG, line + '\\n');
if (process.env.FAKE_DDEV_FAIL && line.includes(process.env.FAKE_DDEV_FAIL)) {
  process.stderr.write('simulated failure\\n');
  process.exit(1);
}
const site = JSON.parse(fs.readFileSync(process.env.FAKE_DDEV_STATE, 'utf8'));
const args = rest.filter((a) => !a.startsWith('-'));
if (cmd === 'config:get') process.stdout.write(JSON.stringify({ [args[0] + ':' + args[1]]: (site.config[args[0]] || {})[args[1]] ?? null }));
if (cmd === 'config:set') (site.config[args[0]] = site.config[args[0]] || {})[args[1]] = args[2];
if (cmd === 'ex:list') process.stdout.write(JSON.stringify(Object.fromEntries(site.themes.map((t) => [t, {}]))));
if (cmd === 'ex:install') site.themes.push(...args[0].split(','));
if (cmd === 'ex:uninstall') site.themes = site.themes.filter((t) => !args[0].split(',').includes(t));
fs.writeFileSync(process.env.FAKE_DDEV_STATE, JSON.stringify(site));
`;

const ORIGINAL = {
  themes: ['default_admin'],
  config: { 'system.theme': { default: 'default_admin', admin: 'default_admin' }, 'default_admin.settings': { enable_dark_mode: 'light' } },
};
const DARK = { id: 'admin-dark', defaultTheme: 'default_admin', adminTheme: 'default_admin' };
const OTHER = { id: 'stark-front', defaultTheme: 'stark', adminTheme: 'default_admin' };

function fakeSite(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'crawl-site-'));
  fs.writeFileSync(path.join(dir, 'ddev'), FAKE_DDEV, { mode: 0o755 });
  const siteFile = path.join(dir, 'site.json');
  fs.writeFileSync(siteFile, JSON.stringify(ORIGINAL));
  const saved = { PATH: process.env.PATH, FAKE_DDEV_STATE: process.env.FAKE_DDEV_STATE, FAKE_DDEV_LOG: process.env.FAKE_DDEV_LOG, FAKE_DDEV_FAIL: process.env.FAKE_DDEV_FAIL };
  process.env.PATH = `${dir}${path.delimiter}${process.env.PATH}`;
  process.env.FAKE_DDEV_STATE = siteFile;
  process.env.FAKE_DDEV_LOG = path.join(dir, 'log.txt');
  delete process.env.FAKE_DDEV_FAIL;
  t.after(() => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
  const stateFile = path.join(dir, 'reports/crawl-site-state.json');
  return {
    site: crawlSite({ siteDir: dir, stateFile }),
    stateFile,
    now: () => JSON.parse(fs.readFileSync(siteFile, 'utf8')),
  };
}

test('capture, switch and restore put the site back as it was', (t) => {
  const { site, stateFile, now } = fakeSite(t);
  assert.equal(site.capture('run-a'), null);
  const saved = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  assert.equal(saved.run_id, 'run-a');
  assert.equal(saved.darkMode, 'light');

  site.apply(DARK);
  assert.equal(now().config['default_admin.settings'].enable_dark_mode, 'auto');
  // A worker restarted in the same run keeps the first capture.
  site.capture('run-a');
  assert.equal(JSON.parse(fs.readFileSync(stateFile, 'utf8')).darkMode, 'light');

  const restored = site.restoreOwn('run-a');
  assert.equal(restored.darkMode, 'light');
  assert.deepEqual(now(), ORIGINAL);
  assert.equal(fs.existsSync(stateFile), false);
  assert.match(describeRestore(restored), /default_admin\+default_admin, enable_dark_mode light \(state captured by run-a\)/);
});

test('restore uninstalls a theme the crawl installed', (t) => {
  const { site, now } = fakeSite(t);
  site.capture('run-a');
  site.apply(OTHER);
  assert.deepEqual(now().themes, ['default_admin', 'stark']);
  assert.equal(now().config['system.theme'].default, 'stark');
  site.restoreOwn('run-a');
  assert.deepEqual(now(), ORIGINAL);
});

test('the teardown leaves state captured by another run alone', (t) => {
  const { site, stateFile, now } = fakeSite(t);
  site.capture('run-a');
  site.apply(DARK);
  assert.equal(site.restoreOwn('run-b'), null);
  assert.equal(site.restoreOwn(undefined), null);
  assert.equal(fs.existsSync(stateFile), true);
  assert.equal(now().config['default_admin.settings'].enable_dark_mode, 'auto');
});

test('a later run restores state an interrupted run left behind', (t) => {
  const { site, stateFile, now } = fakeSite(t);
  site.capture('run-a');
  site.apply(DARK);
  assert.equal(site.restoreStale('run-a'), null, 'same run: nothing to do');
  const restored = site.capture('run-b');
  assert.equal(restored.run_id, 'run-a');
  assert.equal(now().config['default_admin.settings'].enable_dark_mode, 'light');
  assert.equal(JSON.parse(fs.readFileSync(stateFile, 'utf8')).run_id, 'run-b');
});

test('switching is refused before a capture', (t) => {
  const { site } = fakeSite(t);
  assert.throws(() => site.apply(DARK), /before the site state was captured/);
});

test('a failed restore keeps the state file and prints the commands', (t) => {
  const { site, stateFile } = fakeSite(t);
  site.capture('run-a');
  site.apply(DARK);
  process.env.FAKE_DDEV_FAIL = 'enable_dark_mode light';
  assert.throws(() => site.restoreOwn('run-a'), (error) => {
    assert.match(error.message, /could not restore/);
    assert.match(error.message, /ddev exec dr config:set -n default_admin.settings enable_dark_mode light/);
    return true;
  });
  assert.equal(fs.existsSync(stateFile), true);
});

test('an unreadable state file is reported, not guessed at', (t) => {
  const { site, stateFile } = fakeSite(t);
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(stateFile, '');
  assert.throws(() => site.restoreStale('run-b'), /cannot read the saved site state/);
  fs.writeFileSync(stateFile, JSON.stringify({ run_id: 'run-a', defaultTheme: '', adminTheme: 'default_admin', installedThemes: [], darkMode: null }));
  assert.throws(() => site.restore(), /could not restore[\s\S]*check it by hand/);
  assert.equal(fs.existsSync(stateFile), true);
});
