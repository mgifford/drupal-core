#!/usr/bin/env node
/**
 * Patch Evaluation Matrix Runner
 *
 * Executes evaluate-all-patches.js across a deterministic matrix of conditions:
 * - device: desktop/tablet/mobile
 * - orientation: portrait/landscape
 * - color mode: light/dark
 * - direction: ltr/rtl
 *
 * Output:
 *   reports/PATCH-EVALUATION-SUMMARY-<variant>.json
 *   reports/PATCH-EVALUATION-SUMMARY-<variant>.md
 *   reports/PATCH-EVALUATION-MATRIX-SUMMARY.json
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '../../../..');
const REPORTS_DIR = path.join(REPO_ROOT, 'reports');
const SCRIPT_PATH = path.join(__dirname, 'evaluate-all-patches.js');

const VIEWPORTS = {
  desktop: {
    landscape: { width: 1440, height: 1024 },
    portrait: { width: 1024, height: 1440 },
  },
  tablet: {
    landscape: { width: 1024, height: 768 },
    portrait: { width: 768, height: 1024 },
  },
  mobile: {
    landscape: { width: 812, height: 375 },
    portrait: { width: 375, height: 812 },
  },
};

const colorModes = ['light', 'dark'];
const directions = ['ltr', 'rtl'];

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function buildVariant(device, orientation, colorMode, direction) {
  const viewport = VIEWPORTS[device][orientation];
  const variantId = `${device}-${orientation}-${colorMode}-${direction}`;
  return {
    variantId,
    device,
    orientation,
    colorMode,
    direction,
    viewport,
  };
}

function readSummaryJson(variantId) {
  const filePath = path.join(REPORTS_DIR, `PATCH-EVALUATION-SUMMARY-${variantId}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

(function main() {
  const variants = [];
  for (const device of ['desktop', 'tablet', 'mobile']) {
    for (const orientation of ['landscape', 'portrait']) {
      for (const colorMode of colorModes) {
        for (const direction of directions) {
          variants.push(buildVariant(device, orientation, colorMode, direction));
        }
      }
    }
  }

  const matrixSummary = {
    timestamp: new Date().toISOString(),
    totalVariants: variants.length,
    completedVariants: 0,
    failedVariants: 0,
    variants: [],
  };

  for (const variant of variants) {
    log(`\n${'='.repeat(100)}`);
    log(`Running variant: ${variant.variantId}`);
    log(`Viewport: ${variant.viewport.width}x${variant.viewport.height}`);
    log(`${'='.repeat(100)}`);

    const env = {
      ...process.env,
      A11Y_VARIANT_ID: variant.variantId,
      A11Y_DEVICE: variant.device,
      A11Y_ORIENTATION: variant.orientation,
      A11Y_COLOR_MODE: variant.colorMode,
      A11Y_DIRECTION: variant.direction,
      A11Y_VIEWPORT: `${variant.viewport.width}x${variant.viewport.height}`,
      A11Y_THEME_DEFAULT: process.env.A11Y_THEME_DEFAULT || 'olivero',
      A11Y_THEME_ADMIN: process.env.A11Y_THEME_ADMIN || 'claro',
    };

    let exitCode = 0;
    try {
      execSync(`node "${SCRIPT_PATH}"`, {
        cwd: REPO_ROOT,
        stdio: 'inherit',
        env,
      });
    } catch (err) {
      exitCode = Number.isInteger(err.status) ? err.status : 1;
    }

    const summary = readSummaryJson(variant.variantId);
    const result = {
      ...variant,
      exitCode,
      summaryPath: `reports/PATCH-EVALUATION-SUMMARY-${variant.variantId}.json`,
      passed: summary?.passed ?? null,
      inconclusive: summary?.inconclusive ?? null,
      failed: summary?.failed ?? null,
      error: summary?.error ?? null,
    };

    matrixSummary.variants.push(result);
    matrixSummary.completedVariants++;
    if (exitCode !== 0) {
      matrixSummary.failedVariants++;
    }
  }

  const matrixPath = path.join(REPORTS_DIR, 'PATCH-EVALUATION-MATRIX-SUMMARY.json');
  fs.writeFileSync(matrixPath, JSON.stringify(matrixSummary, null, 2));
  log(`\n✅ Matrix summary written to ${matrixPath}`);

  process.exit(matrixSummary.failedVariants > 0 ? 1 : 0);
})();
