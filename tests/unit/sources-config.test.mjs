import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  MANIFEST,
  loadConfig,
  requirementChanges,
  requirementsFrom,
  summarizePaths,
  validateConfig,
} from '../../scripts/lib/sources.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const valid = () => ({
  schema_version: 1,
  defaults: { source: 'core', refresh_before_run: true },
  sources: {
    core: { type: 'git', url: 'https://git.drupalcode.org/project/drupal.git', branch: 'main', directory: 'workspaces/sources/core' },
    cms: { type: 'composer-project', package: 'drupal/cms', version_policy: 'latest-compatible-stable' },
  },
});

test('the committed config/sources.yml is valid', () => {
  const config = loadConfig(ROOT);
  assert.equal(config.defaults.source, 'drupal-core');
  assert.equal(config.sources['drupal-cms-development'].branch, '2.x');
});

test('a valid config has no errors', () => {
  assert.deepEqual(validateConfig(valid(), '/repo'), []);
});

test('rejects insecure or odd URLs', () => {
  for (const url of ['http://example.com/x.git', 'git@example.com:x.git', 'ssh://example.com/x', 'file://relative', '']) {
    const c = valid();
    c.sources.core.url = url;
    assert.ok(validateConfig(c, '/repo').some((e) => e.includes('.url')), url);
  }
  const c = valid();
  c.sources.core.url = 'file:///tmp/mirror.git';
  assert.deepEqual(validateConfig(c, '/repo'), []);
});

test('rejects store directories outside workspaces/sources/ or shared by two sources', () => {
  for (const directory of ['/tmp/store', '../store', 'workspaces/../core', 'workspaces', 'core/sources', 'workspaces/checkouts/x', 'workspaces/state', 'workspaces/sources']) {
    const c = valid();
    c.sources.core.directory = directory;
    assert.ok(validateConfig(c, '/repo').some((e) => e.includes('.directory')), directory);
  }
  const c = valid();
  c.sources.copy = { ...c.sources.core };
  assert.ok(validateConfig(c, '/repo').some((e) => e.includes('already used by core')));
});

test('non-string values and prototype keys are errors, not crashes', () => {
  const c = valid();
  c.sources.core.branch = 3;
  c.sources.core.url = ['https://example.com'];
  c.defaults.source = 'toString';
  const errors = validateConfig(c, '/repo').join('\n');
  assert.ok(errors.includes('.branch'));
  assert.ok(errors.includes('.url'));
  assert.ok(errors.includes('defaults.source "toString"'));
});

test('absolute and parent-relative store paths are rejected', () => {
  for (const directory of ['/tmp/store', '../store']) {
    const c = valid();
    c.sources.core.directory = directory;
    assert.ok(validateConfig(c, '/repo').some((e) => e.includes('.directory')), directory);
  }
});

test('rejects bad branch names, unknown keys, types and defaults', () => {
  for (const branch of ['', '-x', 'a..b', 'x.lock', 'x/', 'has space']) {
    const c = valid();
    c.sources.core.branch = branch;
    assert.ok(validateConfig(c, '/repo').some((e) => e.includes('.branch')), branch);
  }
  const c = valid();
  c.sources.core.brnach = 'main';
  c.sources.other = { type: 'svn' };
  c.defaults.source = 'missing';
  c.defaults.pin_during_run = true;
  c.schema_version = 2;
  const errors = validateConfig(c, '/repo').join('\n');
  for (const expected of ['unknown keys brnach', 'other.type', 'defaults.source "missing"', 'defaults: unknown keys pin_during_run', 'schema_version']) {
    assert.ok(errors.includes(expected), expected);
  }
});

test('requirementsFrom reads composer and package manifests', () => {
  const r = requirementsFrom(
    JSON.stringify({ require: { php: '>=8.5.0', 'composer-runtime-api': '^2.1' } }),
    JSON.stringify({ engines: { node: '>= 24.0', yarn: '>= 4.1.1' }, packageManager: 'yarn@4.18.0' }),
  );
  assert.deepEqual(r, { php: '>=8.5.0', composer_runtime_api: '^2.1', node: '>= 24.0', yarn: '>= 4.1.1', package_manager: 'yarn@4.18.0' });
  assert.equal(requirementsFrom(null, null).php, null);
});

test('requirementChanges lists only differing fields', () => {
  const before = { php: '>=8.5.0', node: '>= 24.0' };
  const after = { php: '>=8.5.0', node: '>= 26.0' };
  assert.deepEqual(requirementChanges(before, after), [{ field: 'node', before: '>= 24.0', after: '>= 26.0' }]);
});

test('summarizePaths groups by module, library component or top folder', () => {
  const areas = summarizePaths([
    'core/modules/node/src/A.php',
    'core/modules/node/src/B.php',
    'core/lib/Drupal/Core/Form/X.php',
    'core/package.json',
    'composer.lock',
  ]);
  assert.deepEqual(areas[0], { area: 'core/modules/node', files: 2 });
  const names = areas.map((a) => a.area);
  assert.ok(names.includes('core/lib/Drupal/Core'));
  assert.ok(names.includes('core'));
  assert.ok(names.includes('(root)'));
});

test('MANIFEST matches dependency and runtime files only', () => {
  for (const f of ['composer.json', 'composer.lock', 'core/composer.json', 'core/package.json', 'core/yarn.lock', '.nvmrc']) {
    assert.ok(MANIFEST.test(f), f);
  }
  for (const f of ['core/modules/node/composer.json', 'core/lib/x.php', 'README.md']) {
    assert.ok(!MANIFEST.test(f), f);
  }
});
