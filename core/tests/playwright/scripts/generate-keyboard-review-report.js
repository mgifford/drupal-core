'use strict';

const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.resolve(__dirname, '../../../../reports');
const INPUT_FILE = path.join(REPORTS_DIR, 'keyboard-review-latest.json');

const now = new Date();
const DATE_STAMP = now.toISOString().slice(0, 10);
const MD_OUTPUT = path.join(REPORTS_DIR, `KEYBOARD-REVIEW-${DATE_STAMP}.md`);
const MD_LATEST = path.join(REPORTS_DIR, 'KEYBOARD-REVIEW-latest.md');

function summarize(results) {
  const pages = Array.isArray(results.pages) ? results.pages : [];
  const failingPages = pages.filter((p) => (p.issues || []).length > 0);
  const warningPages = pages.filter((p) => (p.warnings || []).length > 0);

  return {
    totalPages: pages.length,
    failingPages: failingPages.length,
    warningPages: warningPages.length,
    totalFailures: results.totalFailures || 0,
    totalWarnings: results.totalWarnings || 0,
  };
}

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ ${INPUT_FILE} not found. Run keyboard review test first.`);
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  const summary = summarize(results);

  const lines = [];
  lines.push('# Drupal Core Keyboard Navigation Review');
  lines.push('');
  lines.push(`> **Generated:** ${results.generatedAt || new Date().toISOString()}`);
  lines.push('> **Method:** Playwright keyboard-only tab sampling with real key presses');
  lines.push(`> **Base URL:** ${results.baseUrl || 'unknown'}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('| :--- | :--- |');
  lines.push(`| Pages reviewed | ${summary.totalPages} |`);
  lines.push(`| Pages with failures | ${summary.failingPages} |`);
  lines.push(`| Pages with warnings | ${summary.warningPages} |`);
  lines.push(`| Total failure findings | ${summary.totalFailures} |`);
  lines.push(`| Total warning findings | ${summary.totalWarnings} |`);
  lines.push('');

  lines.push('## Priority Findings');
  lines.push('');

  const pages = Array.isArray(results.pages) ? results.pages : [];
  const withFindings = pages.filter((p) => (p.issues || []).length > 0 || (p.warnings || []).length > 0);

  if (withFindings.length === 0) {
    lines.push('- No keyboard review findings were captured for the sampled routes.');
    lines.push('');
  }
  else {
    for (const page of withFindings) {
      lines.push(`### ${page.name} (${page.path})`);
      lines.push('');
      lines.push(`- URL: ${page.url}`);
      lines.push(`- HTTP status: ${page.status}`);
      lines.push(`- Unique focus targets sampled: ${page.uniqueFocusTargets}`);

      if (Array.isArray(page.issues) && page.issues.length > 0) {
        lines.push('- Failures:');
        for (const issue of page.issues) {
          lines.push(`  - ${issue}`);
        }
      }

      if (Array.isArray(page.warnings) && page.warnings.length > 0) {
        lines.push('- Warnings:');
        for (const warning of page.warnings) {
          lines.push(`  - ${warning}`);
        }
      }

      lines.push('- Focus sequence sample:');
      for (const step of (page.focusSteps || []).slice(0, 8)) {
        const visible = step.visibleFocusEvidence ? 'visible-focus evidence' : 'no visible-focus evidence';
        lines.push(`  - Step ${step.step}: ${step.descriptor} (${visible})`);
      }

      lines.push('');
    }
  }

  lines.push('## Review Notes');
  lines.push('');
  lines.push('- This report is intended for manual triage and regression tracking.');
  lines.push('- Findings should be confirmed with targeted component-level keyboard tests for critical workflows.');
  lines.push('- Recommended follow-up: add hard-gate keyboard specs for recurring failures.');
  lines.push('');

  fs.writeFileSync(MD_OUTPUT, lines.join('\n'));
  fs.writeFileSync(MD_LATEST, lines.join('\n'));

  console.log(`✅ Keyboard review markdown written to ${MD_OUTPUT}`);
  console.log(`✅ Keyboard review markdown written to ${MD_LATEST} (latest)`);
}

main();
