/**
 * Integration test for fetch, checkout, updates and failure handling,
 * using throwaway local Git repositories (file:// URLs, no network).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXIT } from '../../scripts/lib/exit-codes.mjs';
import {
  checkoutSource,
  fetchSource,
  sourceStatus,
  sourceUpdates,
} from '../../scripts/lib/sources.mjs';

const CLI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../scripts/drupal-test.mjs');

function sh(cwd, ...args) {
  return execFileSync('git', ['-c', 'user.email=test@example.com', '-c', 'user.name=Test', ...args], { cwd, encoding: 'utf8' }).trim();
}

function commitFiles(repo, files, message) {
  for (const [file, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(repo, file)), { recursive: true });
    fs.writeFileSync(path.join(repo, file), content);
  }
  sh(repo, 'add', '-A');
  sh(repo, 'commit', '-q', '-m', message);
  return sh(repo, 'rev-parse', 'HEAD');
}

function assertSourceError(fn, code, pattern) {
  assert.throws(fn, (error) => {
    assert.equal(error.code, code, error.message);
    if (pattern) {
      assert.match(error.message, pattern);
    }
    return true;
  });
}

test('fetch, pin, update, reproduce and fail safely', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'drupal-test-sources-'));
  try {
    const upstream = path.join(tmp, 'upstream');
    const root = path.join(tmp, 'engine');
    fs.mkdirSync(upstream);
    fs.mkdirSync(root);
    sh(upstream, 'init', '-q', '-b', 'main');
    const first = commitFiles(upstream, {
      'core/composer.json': JSON.stringify({ require: { php: '>=8.5.0' } }),
      'core/package.json': JSON.stringify({ engines: { node: '>= 24.0' } }),
      'core/lib/Drupal/Core/A.php': '<?php\n',
    }, 'Initial commit');

    const config = {
      schema_version: 1,
      defaults: { source: 'core', refresh_before_run: true },
      sources: { core: { type: 'git', url: `file://${upstream}`, branch: 'main', directory: 'workspaces/sources/core' } },
    };

    // First fetch clones.
    const fetched = fetchSource(root, config, 'core');
    assert.equal(fetched.commit, first);
    assert.equal(fetched.previous, null);

    // Pinning the tip creates a detached checkout and a provenance record.
    const pinned = checkoutSource(root, config, 'core');
    assert.equal(pinned.resolved_commit, first);
    assert.equal(pinned.is_latest_known, true);
    assert.equal(pinned.reused, false);
    assert.equal(pinned.requirements.php, '>=8.5.0');
    assert.equal(pinned.requirements.node, '>= 24.0');
    const checkoutDir = path.join(root, pinned.checkout);
    assert.ok(fs.existsSync(path.join(checkoutDir, 'core/lib/Drupal/Core/A.php')));
    const record = JSON.parse(fs.readFileSync(`${checkoutDir}.json`, 'utf8'));
    assert.equal(record.resolved_commit, first);
    assert.equal(record.repository, `file://${upstream}`);

    // Upstream moves on; fetching does not change the existing checkout.
    const second = commitFiles(upstream, {
      'core/package.json': JSON.stringify({ engines: { node: '>= 26.0' } }),
      'core/modules/node/src/B.php': '<?php\n',
    }, 'Raise Node requirement');
    const refetched = fetchSource(root, config, 'core');
    assert.equal(refetched.commit, second);
    assert.equal(refetched.advanced, true);
    assert.equal(refetched.new_commits, 1);
    assert.equal(sh(checkoutDir, 'rev-parse', 'HEAD'), first);

    // Updates since the newest checkout.
    const updates = sourceUpdates(root, config, 'core');
    assert.equal(updates.since, first);
    assert.equal(updates.tip, second);
    assert.equal(updates.commit_count, 1);
    assert.equal(updates.commits[0].subject, 'Raise Node requirement');
    assert.ok(updates.linear);
    assert.deepEqual(updates.manifest_changes, ['core/package.json']);
    assert.deepEqual(updates.requirement_changes, [{ field: 'node', before: '>= 24.0', after: '>= 26.0' }]);
    assert.ok(updates.changed_areas.some((a) => a.area === 'core/modules/node'));

    // A previous commit can be reproduced; the clean checkout is reused without fetching.
    const again = checkoutSource(root, config, 'core', { ref: first });
    assert.equal(again.reused, true);
    assert.equal(again.fetch.attempted, false);
    assert.equal(again.is_latest_known, false);

    // A dirty checkout is never touched.
    fs.writeFileSync(path.join(checkoutDir, 'core/lib/Drupal/Core/A.php'), '<?php // local edit\n');
    assertSourceError(() => checkoutSource(root, config, 'core', { ref: first }), EXIT.CONFIG, /local changes/);
    assert.equal(fs.readFileSync(path.join(checkoutDir, 'core/lib/Drupal/Core/A.php'), 'utf8'), '<?php // local edit\n');
    const status = sourceStatus(root, config, 'core');
    assert.equal(status[0].checkouts.find((c) => c.commit === first).dirty, true);

    // Network failure: the attempt is recorded, the last success is kept,
    // and the tip is not pinned as "latest" unless --offline is explicit.
    fs.renameSync(upstream, `${upstream}-gone`);
    assertSourceError(() => fetchSource(root, config, 'core'), EXIT.INFRASTRUCTURE, /fetching core failed/);
    const state = JSON.parse(fs.readFileSync(path.join(root, 'workspaces/state/sources/core.json'), 'utf8'));
    assert.equal(state.last_attempt.ok, false);
    assert.equal(state.last_success.commit, second);
    assertSourceError(() => checkoutSource(root, config, 'core'), EXIT.INFRASTRUCTURE, /--offline/);
    const offline = checkoutSource(root, config, 'core', { offline: true });
    assert.equal(offline.resolved_commit, second);
    assert.equal(offline.is_latest_known, false);
    assert.equal(offline.fetch.attempted, false);

    // A checkout deleted by hand can be recreated (stale registration pruned).
    const secondDir = path.join(root, offline.checkout);
    fs.rmSync(secondDir, { recursive: true, force: true });
    const recreated = checkoutSource(root, config, 'core', { ref: second, offline: true });
    assert.equal(recreated.reused, false);
    assert.equal(sh(secondDir, 'rev-parse', 'HEAD'), second);

    // A directory that is not a checkout is reported as broken and never touched.
    fs.renameSync(path.join(secondDir, '.git'), path.join(secondDir, 'not-git'));
    assertSourceError(() => checkoutSource(root, config, 'core', { ref: second, offline: true }), EXIT.CONFIG, /not a checkout/);
    const broken = sourceStatus(root, config, 'core')[0].checkouts.find((c) => c.commit === second);
    assert.equal(broken.broken, true);
    assert.equal(broken.dirty, null);
    fs.renameSync(path.join(secondDir, 'not-git'), path.join(secondDir, '.git'));

    // An unknown short SHA cannot be fetched by prefix.
    assertSourceError(() => checkoutSource(root, config, 'core', { ref: 'abcdef1' }), EXIT.CONFIG, /full 40-character SHA/);

    // A store that points elsewhere is not fetched.
    const moved = { ...config, sources: { core: { ...config.sources.core, url: 'https://example.com/other.git' } } };
    assertSourceError(() => fetchSource(root, moved, 'core'), EXIT.CONFIG, /not fetching/);

    // A store without its branch ref is an error, not "no changes".
    sh(root, '--git-dir', path.join(root, 'workspaces/sources/core'), 'update-ref', '-d', 'refs/heads/main');
    assertSourceError(() => sourceUpdates(root, config, 'core', { since: first }), EXIT.INFRASTRUCTURE, /no main branch/);
  }
  finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('CLI: sources help, usage errors and list', () => {
  const run = (...args) => spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });
  assert.equal(run('sources', '--help').status, EXIT.OK);
  assert.equal(run('sources').status, EXIT.CONFIG);
  assert.equal(run('sources', 'nope').status, EXIT.CONFIG);
  assert.equal(run('sources', 'checkout', '--ref').status, EXIT.CONFIG);
  assert.equal(run('sources', 'status', '--bogus').status, EXIT.CONFIG);
  assert.equal(run('sources', 'fetch', 'drupal-cms-project').status, EXIT.CONFIG);
  const list = run('sources', 'list', '--json');
  assert.equal(list.status, EXIT.OK);
  assert.ok(JSON.parse(list.stdout).sources['drupal-core']);
});
