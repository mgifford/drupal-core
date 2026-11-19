import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  EXIT,
  exitCodeFor,
  minimumFromConstraint,
  parseVersion,
  versionAtLeast,
} from '../../scripts/lib/doctor.mjs';

const CLI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../scripts/drupal-test.mjs');

test('parseVersion reads the first x.y[.z] in a string', () => {
  assert.deepEqual(parseVersion('v22.21.1'), [22, 21, 1]);
  assert.deepEqual(parseVersion('Composer version 2.0.7 2020-11-13'), [2, 0, 7]);
  assert.deepEqual(parseVersion('8.5'), [8, 5, 0]);
  assert.deepEqual(parseVersion('18'), [18, 0, 0]);
  assert.equal(parseVersion('no version here'), null);
});

test('versionAtLeast compares major, minor and patch', () => {
  assert.equal(versionAtLeast('v24.0.0', '24.0'), true);
  assert.equal(versionAtLeast('v22.21.1', '24.0'), false);
  assert.equal(versionAtLeast('v22.21.1', '18'), true);
  assert.equal(versionAtLeast('v16.20.0', '18'), false);
  assert.equal(versionAtLeast('8.5.8', '8.5.0'), true);
  assert.equal(versionAtLeast('2.0.7', '2.1'), false);
  assert.equal(versionAtLeast('2.10.0', '2.9.9'), true);
  assert.equal(versionAtLeast('garbage', '1.0'), false);
});

test('minimumFromConstraint handles the forms core uses', () => {
  assert.equal(minimumFromConstraint('>= 24.0'), '24.0');
  assert.equal(minimumFromConstraint('>=8.5.0'), '8.5.0');
  assert.equal(minimumFromConstraint('^2.1'), '2.1');
  assert.equal(minimumFromConstraint('>=18'), '18');
  assert.equal(minimumFromConstraint(undefined), null);
});

test('exitCodeFor prefers configuration, then dependency, then infrastructure', () => {
  const okCheck = { status: 'ok' };
  const warnCheck = { status: 'warn' };
  const infra = { status: 'fail', category: EXIT.INFRASTRUCTURE };
  const dep = { status: 'fail', category: EXIT.DEPENDENCY };
  const config = { status: 'fail', category: EXIT.CONFIG };
  assert.equal(exitCodeFor([okCheck, warnCheck]), EXIT.OK);
  assert.equal(exitCodeFor([okCheck, infra]), EXIT.INFRASTRUCTURE);
  assert.equal(exitCodeFor([infra, dep]), EXIT.DEPENDENCY);
  assert.equal(exitCodeFor([infra, dep, config]), EXIT.CONFIG);
});

test('CLI: --help exits 0, unknown command and no command exit 2', () => {
  const help = spawnSync(process.execPath, [CLI, '--help'], { encoding: 'utf8' });
  assert.equal(help.status, 0);
  assert.match(help.stdout, /doctor/);
  assert.equal(spawnSync(process.execPath, [CLI, 'bogus'], { encoding: 'utf8' }).status, EXIT.CONFIG);
  assert.equal(spawnSync(process.execPath, [CLI], { encoding: 'utf8' }).status, EXIT.CONFIG);
  const badOption = spawnSync(process.execPath, [CLI, 'doctor', '--nope'], { encoding: 'utf8' });
  assert.equal(badOption.status, EXIT.CONFIG);
});

test('CLI: doctor rejects a DRUPAL_BASE_URL that is not http or https', () => {
  const r = spawnSync(process.execPath, [CLI, 'doctor', '--json'], {
    encoding: 'utf8',
    timeout: 60000,
    env: { ...process.env, DRUPAL_BASE_URL: '-K/etc/passwd' },
  });
  const site = JSON.parse(r.stdout).checks.find((c) => c.name === 'site');
  assert.equal(site.status, 'fail');
  assert.equal(site.category, EXIT.CONFIG);
  assert.equal(r.status, EXIT.CONFIG);
});

test('CLI: doctor --json reports every check and a matching exit code', () => {
  const r = spawnSync(process.execPath, [CLI, 'doctor', '--json'], { encoding: 'utf8', timeout: 60000 });
  const report = JSON.parse(r.stdout);
  assert.equal(r.status, report.exit_code);
  assert.ok(report.checks.length >= 10);
  for (const check of report.checks) {
    assert.ok(['ok', 'warn', 'fail'].includes(check.status), `${check.name}: ${check.status}`);
    if (check.status === 'fail') {
      assert.ok([EXIT.CONFIG, EXIT.DEPENDENCY, EXIT.INFRASTRUCTURE].includes(check.category));
    }
  }
});
