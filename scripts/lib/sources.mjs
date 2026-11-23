/**
 * Upstream sources: fetch, pin and describe the code the engine tests.
 *
 * Layout under <root>/workspaces/ (gitignored):
 *   sources/<id>/                 bare, blobless Git store (one per source)
 *   checkouts/<id>/<commit>/      disposable worktree, detached at <commit>
 *   checkouts/<id>/<commit>.json  provenance record for that checkout
 *   state/sources/<id>.json       last fetch attempt and last successful fetch
 *
 * Fetching only moves the store's branch ref. Checkouts are detached at a
 * commit, so a fetch never changes code that is being tested. Existing
 * checkouts are reused only if they are clean and at the right commit; a
 * dirty one is never touched.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { EXIT } from './exit-codes.mjs';

const ID = /^[a-z0-9][a-z0-9-]*$/;
const BRANCH = /^[A-Za-z0-9][A-Za-z0-9._/-]*$/;
const SHA = /^[0-9a-f]{7,40}$/;
const FULL_SHA = /^[0-9a-f]{40}$/;
const URL_OK = /^(https:\/\/[^\s]+|file:\/\/\/[^\s]+)$/;
const PACKAGE = /^[a-z0-9][a-z0-9_.-]*\/[a-z0-9][a-z0-9_.-]*$/;
const VERSION_POLICIES = ['latest-compatible-stable'];

/** Files whose change usually means dependencies or runtimes changed. */
export const MANIFEST = /^(composer\.(json|lock)|core\/composer\.json|package\.json|core\/package\.json|core\/yarn\.lock|core\/\.yarnrc\.yml|\.nvmrc|core\/\.nvmrc|core\/phpcs\.xml\.dist)$/;

/** A failure that maps to one of the shared exit codes. */
export class SourceError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

/** Validates a parsed sources.yml. Returns a list of problems (empty when valid). */
export function validateConfig(config, root) {
  const errors = [];
  const stores = path.join(root, 'workspaces', 'sources') + path.sep;
  const seenDirs = new Map();
  if (!config || typeof config !== 'object') {
    return ['sources.yml is empty or not a mapping'];
  }
  if (config.schema_version !== 1) {
    errors.push('schema_version must be 1');
  }
  const unknownTop = Object.keys(config).filter((k) => !['schema_version', 'defaults', 'sources'].includes(k));
  if (unknownTop.length) {
    errors.push(`unknown top-level keys: ${unknownTop.join(', ')}`);
  }
  const sources = config.sources ?? {};
  if (typeof sources !== 'object' || !Object.keys(sources).length) {
    errors.push('sources must define at least one source');
  }
  for (const [id, s] of Object.entries(sources)) {
    const where = `sources.${id}`;
    if (!ID.test(id)) {
      errors.push(`${where}: id must be lowercase letters, digits and hyphens`);
    }
    if (s?.type === 'git') {
      const unknown = Object.keys(s).filter((k) => !['type', 'url', 'branch', 'directory'].includes(k));
      if (unknown.length) {
        errors.push(`${where}: unknown keys ${unknown.join(', ')}`);
      }
      if (typeof s.url !== 'string' || !URL_OK.test(s.url)) {
        errors.push(`${where}.url must be an https:// or file:/// URL`);
      }
      if (typeof s.branch !== 'string' || !BRANCH.test(s.branch) || s.branch.includes('..') || s.branch.endsWith('.lock') || s.branch.endsWith('/')) {
        errors.push(`${where}.branch is not a valid branch name`);
      }
      const dir = typeof s.directory === 'string' && !path.isAbsolute(s.directory)
        ? path.resolve(root, s.directory)
        : null;
      if (!dir || !dir.startsWith(stores)) {
        errors.push(`${where}.directory must be a relative path inside workspaces/sources/`);
      }
      else if (seenDirs.has(dir)) {
        errors.push(`${where}.directory is already used by ${seenDirs.get(dir)}`);
      }
      else {
        seenDirs.set(dir, id);
      }
    }
    else if (s?.type === 'composer-project') {
      const unknown = Object.keys(s).filter((k) => !['type', 'package', 'version_policy'].includes(k));
      if (unknown.length) {
        errors.push(`${where}: unknown keys ${unknown.join(', ')}`);
      }
      if (typeof s.package !== 'string' || !PACKAGE.test(s.package)) {
        errors.push(`${where}.package must look like vendor/name`);
      }
      if (!VERSION_POLICIES.includes(s.version_policy)) {
        errors.push(`${where}.version_policy must be one of: ${VERSION_POLICIES.join(', ')}`);
      }
    }
    else {
      errors.push(`${where}.type must be git or composer-project`);
    }
  }
  const defaults = config.defaults ?? {};
  const unknownDefaults = Object.keys(defaults).filter((k) => !['source', 'refresh_before_run'].includes(k));
  if (unknownDefaults.length) {
    errors.push(`defaults: unknown keys ${unknownDefaults.join(', ')}`);
  }
  if (defaults.source !== undefined && !Object.hasOwn(sources, defaults.source)) {
    errors.push(`defaults.source "${defaults.source}" is not a defined source`);
  }
  if (defaults.refresh_before_run !== undefined && typeof defaults.refresh_before_run !== 'boolean') {
    errors.push('defaults.refresh_before_run must be true or false');
  }
  return errors;
}

/** Loads and validates the config. Throws SourceError(CONFIG) on problems. */
export function loadConfig(root, file = path.join(root, 'config', 'sources.yml')) {
  let config;
  try {
    config = yaml.load(fs.readFileSync(file, 'utf8'));
  }
  catch (error) {
    throw new SourceError(`cannot read ${path.relative(root, file)}: ${error.message}`, EXIT.CONFIG);
  }
  const errors = validateConfig(config, root);
  if (errors.length) {
    throw new SourceError(`invalid ${path.relative(root, file)}:\n- ${errors.join('\n- ')}`, EXIT.CONFIG);
  }
  return config;
}

/** Groups changed paths into areas such as core/modules/node or core/lib/Drupal/Core. */
export function summarizePaths(files, limit = 15) {
  const counts = new Map();
  for (const file of files) {
    const parts = file.split('/');
    const depth = /^core\/(modules|themes|profiles|recipes)\//.test(file) ? 3
      : file.startsWith('core/lib/Drupal/') ? 4
        : 2;
    const area = parts.length > depth ? parts.slice(0, depth).join('/') : parts.slice(0, -1).join('/') || '(root)';
    counts.set(area, (counts.get(area) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([area, files]) => ({ area, files }));
}

/** Runtime requirements from composer.json and package.json contents. */
export function requirementsFrom(composerJson, packageJson) {
  const composer = composerJson ? JSON.parse(composerJson) : null;
  const pkg = packageJson ? JSON.parse(packageJson) : null;
  return {
    php: composer?.require?.php ?? null,
    composer_runtime_api: composer?.require?.['composer-runtime-api'] ?? null,
    node: pkg?.engines?.node ?? null,
    yarn: pkg?.engines?.yarn ?? null,
    package_manager: pkg?.packageManager ?? null,
  };
}

/** Fields that differ between two requirement records. */
export function requirementChanges(before, after) {
  return Object.keys(after ?? {})
    .filter((key) => (before?.[key] ?? null) !== (after?.[key] ?? null))
    .map((key) => ({ field: key, before: before?.[key] ?? null, after: after?.[key] ?? null }));
}

// ---------------------------------------------------------------------------
// Git and filesystem helpers.

function git(args, { timeout = 120000, cwd, env = {} } = {}) {
  const r = spawnSync('git', args, {
    cwd,
    encoding: 'utf8',
    timeout,
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0', ...env },
  });
  if (r.error?.code === 'ENOENT') {
    throw new SourceError('git is not installed', EXIT.DEPENDENCY);
  }
  return { ok: !r.error && r.status === 0, out: (r.stdout ?? '').trim(), err: `${r.error?.message ?? ''} ${r.stderr ?? ''}`.trim() };
}

/**
 * Runs git inside a checkout directory without letting it walk up into an
 * enclosing repository (such as this project) when the directory is broken.
 */
function inCheckout(dir, args) {
  return git(['-C', dir, ...args], { env: { GIT_CEILING_DIRECTORIES: fs.realpathSync(path.dirname(dir)) } });
}

/** True when dir is the top of a Git checkout. */
function isCheckoutRoot(dir) {
  const top = inCheckout(dir, ['rev-parse', '--show-toplevel']);
  return top.ok && fs.realpathSync(top.out) === fs.realpathSync(dir);
}

// Fail fast on a stalled network instead of hanging.
const NET = ['-c', 'http.lowSpeedLimit=1000', '-c', 'http.lowSpeedTime=60'];

function lastLines(text, n = 3) {
  return text.split('\n').filter(Boolean).slice(-n).join(' | ');
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  catch {
    return null;
  }
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

function gitSource(config, id) {
  const source = Object.hasOwn(config.sources, id ?? '') ? config.sources[id] : null;
  if (!source) {
    throw new SourceError(`unknown source "${id}"; see \`sources list\``, EXIT.CONFIG);
  }
  if (source.type !== 'git') {
    throw new SourceError(`"${id}" is a ${source.type} source; its handler arrives in Phase 7`, EXIT.CONFIG);
  }
  return source;
}

const paths = (root, id, source) => ({
  store: path.resolve(root, source.directory),
  state: path.join(root, 'workspaces', 'state', 'sources', `${id}.json`),
  checkouts: path.join(root, 'workspaces', 'checkouts', id),
});

function storeTip(store, branch) {
  const r = git(['--git-dir', store, 'rev-parse', '--verify', '--quiet', `refs/heads/${branch}^{commit}`]);
  return r.ok ? r.out : null;
}

function show(store, commit, file) {
  const r = git(['--git-dir', store, 'show', `${commit}:${file}`], { timeout: 120000 });
  return r.ok ? r.out : null;
}

/** Requirements at a commit; null when the files cannot be read (for example offline). */
export function requirementsAt(store, commit) {
  const composer = show(store, commit, 'core/composer.json') ?? show(store, commit, 'composer.json');
  const pkg = show(store, commit, 'core/package.json') ?? show(store, commit, 'package.json');
  if (composer === null && pkg === null) {
    return null;
  }
  try {
    return requirementsFrom(composer, pkg);
  }
  catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Commands.

/** Fetches (or first clones) a git source. Records the attempt either way. */
export function fetchSource(root, config, id) {
  const source = gitSource(config, id);
  const p = paths(root, id, source);
  const state = readJson(p.state) ?? { schema_version: 1, source: id, last_success: null };
  const at = new Date().toISOString();
  let result;
  let before = null;

  if (!fs.existsSync(p.store)) {
    fs.mkdirSync(path.dirname(p.store), { recursive: true });
    result = git([...NET, 'clone', '--bare', '--filter=blob:none', '--single-branch', '--branch', source.branch, '--no-tags', source.url, p.store], { timeout: 30 * 60000 });
  }
  else {
    const origin = git(['--git-dir', p.store, 'config', '--get', 'remote.origin.url']);
    if (!origin.out) {
      throw new SourceError(`${source.directory} has no origin and looks like an interrupted clone; delete that directory and fetch again`, EXIT.CONFIG);
    }
    if (origin.out !== source.url) {
      throw new SourceError(`${source.directory} fetches from ${origin.out || 'nowhere'}, but the config says ${source.url}; not fetching`, EXIT.CONFIG);
    }
    before = storeTip(p.store, source.branch);
    result = git([...NET, '--git-dir', p.store, 'fetch', '--no-tags', 'origin', `+refs/heads/${source.branch}:refs/heads/${source.branch}`], { timeout: 15 * 60000 });
  }

  const commit = result.ok ? storeTip(p.store, source.branch) : null;
  state.repository = source.url;
  state.branch = source.branch;
  state.last_attempt = result.ok && commit
    ? { at, ok: true }
    : { at, ok: false, error: lastLines(result.err) || 'branch not found after fetch' };
  if (result.ok && commit) {
    state.last_success = { at, commit };
  }
  writeJson(p.state, state);

  if (!state.last_attempt.ok) {
    throw new SourceError(`fetching ${id} failed: ${state.last_attempt.error}`, EXIT.INFRASTRUCTURE);
  }
  return {
    source: id,
    branch: source.branch,
    commit,
    previous: before,
    advanced: before !== null && before !== commit,
    new_commits: before && before !== commit ? Number(git(['--git-dir', p.store, 'rev-list', '--count', `${before}..${commit}`]).out) : null,
  };
}

/**
 * Pins a commit and makes (or reuses) a detached checkout of it.
 * `ref` is the configured branch (default) or a commit SHA.
 */
export function checkoutSource(root, config, id, { ref, offline = false } = {}) {
  const source = gitSource(config, id);
  const p = paths(root, id, source);
  const wantsTip = !ref || ref === source.branch;
  if (!wantsTip && !SHA.test(ref)) {
    throw new SourceError(`--ref must be "${source.branch}" or a commit SHA; other branches and tags are not supported yet`, EXIT.CONFIG);
  }

  const fetch = { attempted: false, ok: null, at: null, offline, error: null };
  let commit = null;
  if (!wantsTip && fs.existsSync(p.store)) {
    const local = git(['--git-dir', p.store, 'rev-parse', '--verify', '--quiet', `${ref}^{commit}`]);
    commit = local.ok ? local.out : null;
  }
  const refresh = config.defaults?.refresh_before_run !== false;
  if (!offline && (wantsTip ? refresh : !commit)) {
    fetch.attempted = true;
    fetch.at = new Date().toISOString();
    try {
      fetchSource(root, config, id);
      fetch.ok = true;
    }
    catch (error) {
      fetch.ok = false;
      fetch.error = error.message;
      if (wantsTip || !fs.existsSync(p.store)) {
        throw new SourceError(`${error.message}\nNot pinning: the last fetched ${source.branch} may not be the latest. Use --offline to pin it anyway.`, error.code);
      }
    }
  }
  if (!fs.existsSync(p.store)) {
    throw new SourceError(`no local store for ${id}; run \`sources fetch ${id}\` first`, EXIT.INFRASTRUCTURE);
  }

  const resolveLocal = (r) => {
    const local = git(['--git-dir', p.store, 'rev-parse', '--verify', '--quiet', `${r}^{commit}`]);
    return local.ok ? local.out : null;
  };
  if (wantsTip) {
    commit = storeTip(p.store, source.branch);
  }
  else {
    // The fetch above may have brought the commit in.
    commit = commit ?? resolveLocal(ref);
    if (!commit && !offline) {
      if (!FULL_SHA.test(ref)) {
        throw new SourceError(`commit ${ref} is not in the local store; give the full 40-character SHA so it can be fetched`, EXIT.CONFIG);
      }
      const r = git([...NET, '--git-dir', p.store, 'fetch', '--no-tags', 'origin', ref], { timeout: 15 * 60000 });
      fetch.attempted = true;
      fetch.ok = r.ok;
      fetch.at = new Date().toISOString();
      fetch.error = r.ok ? null : lastLines(r.err);
      commit = resolveLocal(ref);
    }
  }
  if (!commit) {
    const why = fetch.error ? `: fetch failed: ${fetch.error}` : '';
    throw new SourceError(`cannot resolve ${ref ?? source.branch} in ${id}${offline ? ' while offline' : ''}${why}`, offline || fetch.error ? EXIT.INFRASTRUCTURE : EXIT.CONFIG);
  }

  const dir = path.join(p.checkouts, commit);
  const record = path.join(p.checkouts, `${commit}.json`);
  let reused = false;
  if (fs.existsSync(dir)) {
    const head = isCheckoutRoot(dir) ? inCheckout(dir, ['rev-parse', 'HEAD']) : null;
    if (!head?.ok || head.out !== commit) {
      throw new SourceError(`${path.relative(root, dir)} exists but is not a checkout at ${commit}; not touching it`, EXIT.CONFIG);
    }
    const status = inCheckout(dir, ['status', '--porcelain']);
    if (!status.ok || status.out) {
      throw new SourceError(`${path.relative(root, dir)} has local changes; not touching it. Commit or remove them first.`, EXIT.CONFIG);
    }
    reused = true;
  }
  else {
    fs.mkdirSync(p.checkouts, { recursive: true });
    // Forget registrations of checkouts whose directories were deleted by hand,
    // so the commit can be checked out again. Existing directories are untouched.
    git(['--git-dir', p.store, 'worktree', 'prune']);
    const add = git([...NET, '--git-dir', p.store, 'worktree', 'add', '--detach', dir, commit], { timeout: 15 * 60000 });
    if (!add.ok) {
      throw new SourceError(`creating the checkout failed${offline ? ' (files may not be available offline)' : ''}: ${lastLines(add.err)}`, EXIT.INFRASTRUCTURE);
    }
  }

  const previous = readJson(record);
  const provenance = {
    schema_version: 1,
    source: id,
    repository: source.url,
    requested_ref: ref ?? source.branch,
    resolved_commit: commit,
    resolved_at: new Date().toISOString(),
    dirty: false,
    // Only true when this command fetched successfully and pinned the tip.
    is_latest_known: wantsTip && fetch.attempted && fetch.ok === true,
    fetch,
    checkout: path.relative(root, dir),
    created_at: previous?.created_at ?? new Date().toISOString(),
    requirements: requirementsAt(p.store, commit),
  };
  writeJson(record, provenance);
  return { ...provenance, reused };
}

function checkoutRecords(root, id) {
  const dir = path.join(root, 'workspaces', 'checkouts', id);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir)
    .filter((f) => /^[0-9a-f]{40}\.json$/.test(f))
    .map((f) => readJson(path.join(dir, f)))
    .filter(Boolean)
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
}

/** Local state of one or all sources; with `remote`, also asks the remote for its tip. */
export function sourceStatus(root, config, id, { remote = false } = {}) {
  const ids = id ? [id] : Object.keys(config.sources);
  return ids.map((sid) => {
    const source = Object.hasOwn(config.sources, sid) ? config.sources[sid] : null;
    if (!source) {
      throw new SourceError(`unknown source "${sid}"`, EXIT.CONFIG);
    }
    if (source.type !== 'git') {
      return { source: sid, type: source.type, supported: false, note: 'handled from Phase 7' };
    }
    const p = paths(root, sid, source);
    const state = readJson(p.state);
    const tip = fs.existsSync(p.store) ? storeTip(p.store, source.branch) : null;
    const status = {
      source: sid,
      type: 'git',
      branch: source.branch,
      store: fs.existsSync(p.store) ? source.directory : null,
      fetched_tip: tip,
      last_success: state?.last_success ?? null,
      last_attempt: state?.last_attempt ?? null,
      checkouts: checkoutRecords(root, sid).map((r) => {
        const dir = path.join(root, r.checkout);
        const present = fs.existsSync(dir);
        const broken = present && !isCheckoutRoot(dir);
        const changes = present && !broken ? inCheckout(dir, ['status', '--porcelain']) : null;
        return {
          commit: r.resolved_commit,
          requested_ref: r.requested_ref,
          created_at: r.created_at,
          present,
          broken,
          dirty: present && !broken ? Boolean(changes?.out) : null,
        };
      }),
    };
    if (remote) {
      const r = git([...NET, 'ls-remote', source.url, `refs/heads/${source.branch}`], { timeout: 60000 });
      const remoteTip = r.ok ? r.out.split(/\s+/)[0] || null : null;
      status.remote = r.ok
        ? { ok: true, tip: remoteTip, newer_than_fetched: Boolean(remoteTip && remoteTip !== tip) }
        : { ok: false, error: lastLines(r.err) };
    }
    return status;
  });
}

/**
 * What changed upstream between `since` (default: the newest checkout) and
 * the last fetched branch tip. Reads only the local store, except that
 * requirement files not present locally are fetched on demand.
 */
export function sourceUpdates(root, config, id, { since } = {}) {
  const source = gitSource(config, id);
  const p = paths(root, id, source);
  if (!fs.existsSync(p.store)) {
    throw new SourceError(`no local store for ${id}; run \`sources fetch ${id}\` first`, EXIT.INFRASTRUCTURE);
  }
  const tip = storeTip(p.store, source.branch);
  if (!tip) {
    throw new SourceError(`the ${id} store has no ${source.branch} branch; run \`sources fetch ${id}\``, EXIT.INFRASTRUCTURE);
  }
  let base = since;
  let baseFrom = 'given';
  if (!base) {
    base = checkoutRecords(root, id)[0]?.resolved_commit;
    baseFrom = 'newest checkout';
  }
  if (!base) {
    throw new SourceError(`no previous checkout of ${id}; pass --since <commit>`, EXIT.CONFIG);
  }
  if (!SHA.test(base)) {
    throw new SourceError('--since must be a commit SHA', EXIT.CONFIG);
  }
  const resolved = git(['--git-dir', p.store, 'rev-parse', '--verify', '--quiet', `${base}^{commit}`]);
  if (!resolved.ok) {
    throw new SourceError(`commit ${base} is not in the local store`, EXIT.CONFIG);
  }
  base = resolved.out;

  const linear = git(['--git-dir', p.store, 'merge-base', '--is-ancestor', base, tip]).ok;
  const log = git(['--git-dir', p.store, 'log', '--format=%H%x1f%s', `${base}..${tip}`]);
  const diff = git(['--git-dir', p.store, '-c', 'core.quotePath=false', 'diff', '--name-only', base, tip]);
  if (!log.ok || !diff.ok) {
    throw new SourceError(`reading history failed: ${lastLines(log.ok ? diff.err : log.err)}`, EXIT.INFRASTRUCTURE);
  }
  const commits = log.out ? log.out.split('\n').map((line) => {
    const [commit, subject] = line.split('\x1f');
    return { commit, subject };
  }) : [];
  const files = diff.out ? diff.out.split('\n') : [];
  const state = readJson(p.state);
  const before = requirementsAt(p.store, base);
  const after = requirementsAt(p.store, tip);
  return {
    source: id,
    branch: source.branch,
    since: base,
    since_from: baseFrom,
    tip,
    tip_fetched_at: state?.last_success?.at ?? null,
    linear,
    commit_count: commits.length,
    commits: commits.slice(0, 500),
    changed_file_count: files.length,
    changed_areas: summarizePaths(files),
    manifest_changes: files.filter((f) => MANIFEST.test(f)),
    requirement_changes: before && after ? requirementChanges(before, after) : null,
  };
}
