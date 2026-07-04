/**
 * @file
 * Loads the patch names that are safe for the evaluator to run.
 */

'use strict';

const fs = require('fs');
const path = require('path');

function loadCanonicalPatchNames({ repoRoot, fallbackNames = [] } = {}) {
  const patchesDir = repoRoot ? path.join(repoRoot, 'patches') : null;

  if (!patchesDir) {
    return {
      names: fallbackNames,
      source: null,
      warning: 'No repo root supplied; using configured fallback patch names.',
    };
  }

  try {
    const names = fs.readdirSync(patchesDir)
      .filter((filename) => filename.endsWith('.patch'))
      .map((filename) => path.basename(filename, '.patch'))
      .sort();

    return {
      names: names.length ? names : fallbackNames,
      source: patchesDir,
      warning: names.length ? null : 'No patch files found; using configured fallback patch names.',
    };
  } catch (err) {
    return {
      names: fallbackNames,
      source: null,
      warning: `Unable to read patches directory: ${err.message}`,
    };
  }
}

module.exports = { loadCanonicalPatchNames };
