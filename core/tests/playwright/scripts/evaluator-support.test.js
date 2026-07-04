/**
 * @file
 * Tests evaluator support helpers.
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');

const { loadCanonicalPatchNames } = require('./lib/canonical-patch-map');
const {
  buildRequiredRulesRunOnly,
  formatRulesForReport,
  getBaseUrl,
  mergeAxeViolations,
  resolveAxeRuleId,
  resolveAxeRuleIds,
  ruleMatchesRequestedRule,
  selectorHintMatchesViolation,
} = require('./lib/evaluator-support');

test('base URL prefers explicit evaluator environment variables', () => {
  assert.equal(
    getBaseUrl({
      DRUPAL_BASE_URL: 'http://runtime.example',
      DRUPAL_TEST_BASE_URL: 'http://test.example',
    }),
    'http://runtime.example',
  );
  assert.equal(
    getBaseUrl({ DRUPAL_TEST_BASE_URL: 'http://test.example' }),
    'http://test.example',
  );
  assert.equal(getBaseUrl({}), 'http://drupal-core.ddev.site');
});

test('human-facing axe rule names resolve to concrete rule IDs', () => {
  assert.equal(resolveAxeRuleId('label-in-name'), 'label-content-name-mismatch');
  assert.deepEqual(
    resolveAxeRuleIds(['label-in-name', ' label-content-name-mismatch ', 'tabindex']),
    ['label-content-name-mismatch', 'tabindex'],
  );
  assert.equal(ruleMatchesRequestedRule('label-in-name', ['label-content-name-mismatch']), true);
  assert.equal(ruleMatchesRequestedRule('tabindex', ['label-in-name']), false);
  assert.equal(
    formatRulesForReport(['label-in-name', 'tabindex']),
    'label-in-name (axe: label-content-name-mismatch), tabindex',
  );
});

test('required rule scans build axe runOnly options', () => {
  assert.deepEqual(
    buildRequiredRulesRunOnly(['label-in-name', 'tabindex']),
    {
      runOnly: {
        type: 'rule',
        values: ['label-content-name-mismatch', 'tabindex'],
      },
    },
  );
  assert.equal(buildRequiredRulesRunOnly([]), null);
});

test('axe violations are merged by rule without duplicate nodes', () => {
  const duplicateNode = {
    target: [['#edit-title']],
    html: '<input id="edit-title">',
  };
  const merged = mergeAxeViolations([
    [
      {
        id: 'label',
        impact: 'critical',
        nodes: [duplicateNode],
      },
    ],
    [
      {
        id: 'label',
        impact: 'critical',
        nodes: [
          duplicateNode,
          {
            target: [['#edit-body']],
            html: '<textarea id="edit-body"></textarea>',
          },
        ],
      },
      {
        id: 'tabindex',
        nodes: [
          {
            target: [['#submit']],
            html: '<button id="submit" tabindex="1">Save</button>',
          },
        ],
      },
    ],
  ]);

  assert.equal(merged.length, 2);
  assert.equal(merged.find((violation) => violation.id === 'label').nodes.length, 2);
  assert.equal(merged.find((violation) => violation.id === 'tabindex').nodes.length, 1);
});

test('selector text hints match concrete axe snippets conservatively', () => {
  assert.equal(
    selectorHintMatchesViolation(
      { html_snippet: '<a href="/admin/config/content/formats/manage/filter_test">Configure</a>' },
      'a:has-text("Configure")',
    ),
    true,
  );
  assert.equal(
    selectorHintMatchesViolation(
      { html_snippet: '<button type="submit">Configure</button>' },
      'a:has-text("Configure")',
    ),
    false,
  );
  assert.equal(
    selectorHintMatchesViolation(
      { html_snippet: '<a href="/admin/content">Edit</a>' },
      'a:has-text("Configure")',
    ),
    false,
  );
});

test('canonical patch map loads patch names and falls back deliberately', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'drupal-a11y-patches-'));
  try {
    fs.mkdirSync(path.join(tempDir, 'patches'));
    fs.writeFileSync(path.join(tempDir, 'patches', 'b.patch'), '');
    fs.writeFileSync(path.join(tempDir, 'patches', 'a.patch'), '');
    fs.writeFileSync(path.join(tempDir, 'patches', 'notes.txt'), '');

    assert.deepEqual(loadCanonicalPatchNames({ repoRoot: tempDir }).names, ['a', 'b']);
    assert.deepEqual(
      loadCanonicalPatchNames({ fallbackNames: ['fallback'] }),
      {
        names: ['fallback'],
        source: null,
        warning: 'No repo root supplied; using configured fallback patch names.',
      },
    );
  }
  finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
