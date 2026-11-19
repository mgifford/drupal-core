import test from 'node:test';
import assert from 'node:assert/strict';
import { compareWithBaseline, violationKeys } from '../playwright/lib/axe-baseline.mjs';

const violations = [
  { id: 'label', nodes: [{ target: ['#edit-name'] }, { target: ['#edit-pass'] }] },
  { id: 'color-contrast', nodes: [{ target: ['.button'] }] },
];

test('violationKeys gives one sorted key per rule and element', () => {
  assert.deepEqual(violationKeys(violations), [
    'color-contrast [".button"]',
    'label ["#edit-name"]',
    'label ["#edit-pass"]',
  ]);
  assert.deepEqual(violationKeys([]), []);
});

test('an empty baseline accepts nothing', () => {
  const result = compareWithBaseline(violations, []);
  assert.equal(result.added.length, 3);
  assert.deepEqual(result.resolved, []);
});

test('a known rule on a new element is still reported as added', () => {
  const result = compareWithBaseline(violations, ['label ["#edit-name"]', 'color-contrast [".button"]']);
  assert.deepEqual(result.added, ['label ["#edit-pass"]']);
});

test('baseline entries that no longer occur are reported as resolved', () => {
  const result = compareWithBaseline([], ['label ["#edit-name"]']);
  assert.deepEqual(result.added, []);
  assert.deepEqual(result.resolved, ['label ["#edit-name"]']);
});
