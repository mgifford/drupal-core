/**
 * Read-only environment checks for the Drupal testing engine.
 *
 * Nothing here writes files or changes state. Commands are run with
 * timeouts and their output is only parsed. The site check runs one
 * `curl -k` GET against DRUPAL_BASE_URL (http or https only). It does not
 * verify the TLS certificate, because DDEV sites use a local certificate
 * authority that curl may not trust. The checks use POSIX tools (`df`,
 * `curl`), so they target macOS and Linux.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { EXIT } from './exit-codes.mjs';
import { loadConfig } from './sources.mjs';

export { EXIT };

/** A failure in an earlier category decides the exit code first. */
const PRIORITY = [EXIT.CONFIG, EXIT.DEPENDENCY, EXIT.INFRASTRUCTURE];

/** @returns {number[] | null} [major, minor, patch] from the first x[.y[.z]] found. */
export function parseVersion(text) {
  const match = /(\d+)(?:\.(\d+))?(?:\.(\d+))?/.exec(String(text ?? ''));
  return match ? [Number(match[1]), Number(match[2] ?? 0), Number(match[3] ?? 0)] : null;
}

/** True when version `found` is the same as or newer than `minimum`. */
export function versionAtLeast(found, minimum) {
  const a = parseVersion(found);
  const b = parseVersion(minimum);
  if (!a || !b) {
    return false;
  }
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) {
      return a[i] > b[i];
    }
  }
  return true;
}

/** Lowest version a simple constraint allows: ">= 24.0", ">=8.5.0", "^2.1". */
export function minimumFromConstraint(constraint) {
  const match = /^\s*(?:>=|\^|~)?\s*v?(\d+(?:\.\d+){0,2})/.exec(String(constraint ?? ''));
  return match ? match[1] : null;
}

/** Exit code for a list of check results. */
export function exitCodeFor(results) {
  const failed = new Set(results.filter((r) => r.status === 'fail').map((r) => r.category));
  return PRIORITY.find((code) => failed.has(code)) ?? EXIT.OK;
}

function run(command, args, timeout = 10000) {
  const result = spawnSync(command, args, { encoding: 'utf8', timeout });
  return {
    ok: !result.error && result.status === 0,
    out: `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim(),
  };
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  catch {
    return null;
  }
}

function defaultBrowsersPath(env) {
  if (env.PLAYWRIGHT_BROWSERS_PATH) {
    return env.PLAYWRIGHT_BROWSERS_PATH;
  }
  if (process.platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright');
  }
  if (process.platform === 'win32') {
    return path.join(env.LOCALAPPDATA ?? os.homedir(), 'ms-playwright');
  }
  return path.join(os.homedir(), '.cache', 'ms-playwright');
}

const ok = (name, detail) => ({ name, status: 'ok', detail });
const warn = (name, detail) => ({ name, status: 'warn', detail });
const fail = (name, category, detail) => ({ name, status: 'fail', category, detail });

/**
 * Runs every check. `root` is the repository root, `env` the environment.
 * @returns {Array<{name: string, status: 'ok'|'warn'|'fail', category?: number, detail: string}>}
 */
export function collectChecks({ root, env = process.env }) {
  const results = [];
  const pwDir = path.join(root, 'tests', 'playwright');
  const pwPackage = readJson(path.join(pwDir, 'node_modules', '@playwright', 'test', 'package.json'));
  const pwCore = readJson(path.join(pwDir, 'node_modules', 'playwright-core', 'package.json'));
  const corePackage = readJson(path.join(root, 'core', 'package.json'));
  const coreComposer = readJson(path.join(root, 'core', 'composer.json'));

  // Node.js: Playwright's own requirement decides; core's is advisory.
  const pwNode = minimumFromConstraint(pwCore?.engines?.node) ?? '18';
  results.push(versionAtLeast(process.version, pwNode)
    ? ok('node (Playwright)', `${process.version}, needs >= ${pwNode}`)
    : fail('node (Playwright)', EXIT.DEPENDENCY, `${process.version}, needs >= ${pwNode}`));
  const coreNode = minimumFromConstraint(corePackage?.engines?.node);
  if (coreNode) {
    results.push(versionAtLeast(process.version, coreNode)
      ? ok('node (Drupal core JS tooling)', `${process.version}, core needs >= ${coreNode}`)
      : warn('node (Drupal core JS tooling)', `${process.version}, core needs >= ${coreNode}; only matters for building core's JS`));
  }

  for (const [name, args] of [['npm', ['--version']], ['git', ['--version']]]) {
    const r = run(name, args);
    results.push(r.ok ? ok(name, r.out.split('\n')[0]) : fail(name, EXIT.DEPENDENCY, 'not found'));
  }

  // Playwright package and its browser build.
  if (pwPackage) {
    results.push(ok('playwright package', `@playwright/test ${pwPackage.version} in tests/playwright`));
  }
  else {
    results.push(fail('playwright package', EXIT.DEPENDENCY, 'not installed: run `npm --prefix tests/playwright ci`'));
  }
  const browsers = readJson(path.join(pwDir, 'node_modules', 'playwright-core', 'browsers.json'));
  const shell = browsers?.browsers?.find((b) => b.name === 'chromium-headless-shell');
  if (shell) {
    const browsersPath = defaultBrowsersPath(env);
    const dir = path.join(browsersPath, `chromium_headless_shell-${shell.revision}`);
    results.push(fs.existsSync(dir)
      ? ok('chromium browser', `build ${shell.revision} in ${browsersPath}`)
      : fail('chromium browser', EXIT.DEPENDENCY, `build ${shell.revision} missing: run \`npx playwright install chromium\` in tests/playwright`));
  }

  // Host PHP and Composer are optional when DDEV provides them.
  const phpMin = minimumFromConstraint(coreComposer?.require?.php);
  const php = run('php', ['-r', 'echo PHP_VERSION;']);
  if (!php.ok) {
    results.push(warn('php (host)', 'not found; fine if you only use DDEV'));
  }
  else if (phpMin && !versionAtLeast(php.out, phpMin)) {
    results.push(warn('php (host)', `${php.out}, core needs >= ${phpMin}; use DDEV's PHP`));
  }
  else {
    results.push(ok('php (host)', php.out));
  }
  const composerMin = minimumFromConstraint(coreComposer?.require?.['composer-runtime-api']);
  const composer = run('composer', ['--version', '--no-ansi']);
  const composerVersion = /Composer version (\S+)/.exec(composer.out)?.[1];
  if (!composerVersion) {
    results.push(warn('composer (host)', 'not found; fine if you use `ddev composer`'));
  }
  else if (composerMin && !versionAtLeast(composerVersion, composerMin)) {
    results.push(warn('composer (host)', `${composerVersion}, core needs >= ${composerMin}; use \`ddev composer\``));
  }
  else {
    results.push(ok('composer (host)', composerVersion));
  }

  // Docker and DDEV.
  const docker = run('docker', ['info', '--format', '{{.ServerVersion}}']);
  results.push(docker.ok
    ? ok('docker', `server ${docker.out}`)
    : fail('docker', EXIT.INFRASTRUCTURE, 'not running or not reachable'));
  const ddev = run('ddev', ['--version']);
  results.push(ddev.ok ? ok('ddev', ddev.out.split('\n')[0]) : fail('ddev', EXIT.DEPENDENCY, 'not found'));
  results.push(fs.existsSync(path.join(root, '.ddev', 'config.yaml'))
    ? ok('ddev project config', '.ddev/config.yaml present')
    : fail('ddev project config', EXIT.CONFIG, '.ddev/config.yaml missing: restore it with `git checkout -- .ddev/config.yaml`'));
  if (docker.ok && ddev.ok) {
    const list = run('ddev', ['list', '--json-output'], 20000);
    const raw = list.ok ? readJsonText(list.out)?.raw : null;
    const running = Array.isArray(raw) ? raw.filter((p) => p.status === 'running').map((p) => p.name) : null;
    results.push(running
      ? ok('ddev projects running', running.length ? running.join(', ') : 'none')
      : warn('ddev projects running', 'could not read `ddev list`'));
  }

  // Disk space where workspaces and browsers will live.
  const df = run('df', ['-Pk', root]);
  const freeKb = Number(df.out.split('\n').pop()?.split(/\s+/)[3]);
  if (Number.isFinite(freeKb)) {
    const freeGb = freeKb / 1024 / 1024;
    const detail = `${freeGb.toFixed(1)} GiB free`;
    results.push(freeGb >= 10 ? ok('disk space', detail) : warn('disk space', `${detail}; 10 GiB or more is recommended`));
  }

  // Source registry and the default source's local store.
  try {
    const config = loadConfig(root);
    const ids = Object.keys(config.sources);
    results.push(ok('sources config', `config/sources.yml: ${ids.join(', ')}`));
    const id = config.defaults?.source ?? ids[0];
    const state = readJson(path.join(root, 'workspaces', 'state', 'sources', `${id}.json`));
    if (!state?.last_success) {
      results.push(warn('sources store', `${id} never fetched: run \`node scripts/drupal-test.mjs sources fetch ${id}\``));
    }
    else if (state.last_attempt && !state.last_attempt.ok) {
      results.push(warn('sources store', `${id}: last fetch failed at ${state.last_attempt.at}; last success ${state.last_success.at}`));
    }
    else {
      results.push(ok('sources store', `${id} fetched ${state.last_success.at} at ${state.last_success.commit.slice(0, 12)}`));
    }
  }
  catch (error) {
    results.push(fail('sources config', EXIT.CONFIG, error.message.split('\n').join(' ')));
  }

  // Test-runner configuration and the site under test.
  results.push(fs.existsSync(path.join(pwDir, 'playwright.config.ts'))
    ? ok('test runner config', 'tests/playwright/playwright.config.ts')
    : fail('test runner config', EXIT.CONFIG, 'tests/playwright/playwright.config.ts missing'));
  const baseUrl = env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';
  if (!/^https?:\/\/[^\s]+$/.test(baseUrl)) {
    results.push(fail('site', EXIT.CONFIG, `DRUPAL_BASE_URL must start with http:// or https:// (got "${baseUrl}")`));
  }
  else {
    const site = run('curl', ['-sS', '-k', '-o', '/dev/null', '-w', '%{http_code}', '--max-time', '5', `${baseUrl}/user/login`]);
    results.push(site.ok && site.out === '200'
      ? ok('site', `${baseUrl}/user/login returned 200`)
      : fail('site', EXIT.INFRASTRUCTURE, `${baseUrl} not reachable (${site.out.split('\n')[0] || 'no response'})`));
  }
  results.push(env.DRUPAL_TEST_USER && env.DRUPAL_TEST_PASS
    ? ok('test account', 'DRUPAL_TEST_USER and DRUPAL_TEST_PASS are set')
    : warn('test account', 'DRUPAL_TEST_USER / DRUPAL_TEST_PASS not set; logged-in smoke tests will be skipped'));

  // Playwright MCP configuration for interactive exploration.
  const mcp = readJson(path.join(root, '.mcp.json'));
  const mcpArgs = mcp?.mcpServers?.playwright?.args ?? [];
  const pinned = mcpArgs.some((a) => /^@playwright\/mcp@\d/.test(a));
  results.push(!mcp
    ? warn('playwright mcp', '.mcp.json missing or invalid')
    : pinned
      ? ok('playwright mcp', mcpArgs.find((a) => a.startsWith('@playwright/mcp@')))
      : warn('playwright mcp', 'playwright server is not pinned to a version'));

  return results;
}

function readJsonText(text) {
  try {
    return JSON.parse(text);
  }
  catch {
    return null;
  }
}

/** Human-readable report, one line per check. */
export function formatReport(results) {
  const label = { ok: 'ok  ', warn: 'warn', fail: 'FAIL' };
  return results.map((r) => `[${label[r.status]}] ${r.name}: ${r.detail}`).join('\n');
}
