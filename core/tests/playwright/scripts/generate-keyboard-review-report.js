'use strict';

const fs = require('fs');
const path = require('path');
const { renderMarkdownReport } = require('./lib/render-markdown-report');

const REPORTS_DIR = path.resolve(__dirname, '../../../../reports');
const INPUT_FILE = path.join(REPORTS_DIR, 'keyboard-review-latest.json');
const PATTERN_BUGS_FILE = path.join(REPORTS_DIR, 'bugs-latest.json');

const now = new Date();
const DATE_STAMP = now.toISOString().slice(0, 10);
const MD_OUTPUT = path.join(REPORTS_DIR, `KEYBOARD-REVIEW-${DATE_STAMP}.md`);
const MD_LATEST = path.join(REPORTS_DIR, 'KEYBOARD-REVIEW-latest.md');
const HTML_OUTPUT = path.join(REPORTS_DIR, `KEYBOARD-REVIEW-${DATE_STAMP}.html`);
const HTML_LATEST = path.join(REPORTS_DIR, 'KEYBOARD-REVIEW-latest.html');
const INTENTIONAL_404_PATH = '/this-page-does-not-exist';

function summarize(results) {
  const pages = Array.isArray(results.pages) ? results.pages : [];
  const failingPages = pages.filter((p) => (p.issues || []).length > 0);
  const warningPages = pages.filter((p) => (p.warnings || []).length > 0);
  const status200 = pages.filter((p) => p.status === 200).length;
  const status403 = pages.filter((p) => p.status === 403).length;
  const status404 = pages.filter((p) => p.status === 404).length;
  const admin403 = pages.filter((p) => p.path.startsWith('/admin') && p.status === 403).length;

  return {
    totalPages: pages.length,
    failingPages: failingPages.length,
    warningPages: warningPages.length,
    totalFailures: results.totalFailures || 0,
    totalWarnings: results.totalWarnings || 0,
    status200,
    status403,
    status404,
    admin403,
  };
}

function flattenFindings(results) {
  const pages = Array.isArray(results.pages) ? results.pages : [];
  const findings = [];

  for (const page of pages) {
    for (const issue of page.issues || []) {
      findings.push({
        type: 'issue',
        page,
        message: issue,
      });
    }

    for (const warning of page.warnings || []) {
      findings.push({
        type: 'warning',
        page,
        message: warning,
      });
    }
  }

  return findings;
}

function collectVoiceControlRisks(results) {
  const pages = Array.isArray(results.pages) ? results.pages : [];
  const risks = [];
  for (const page of pages) {
    for (const risk of page.voiceControlRisks || []) {
      risks.push({ page, risk });
    }
  }
  return risks;
}

function collectDynamicChecks(results) {
  const pages = Array.isArray(results.pages) ? results.pages : [];
  const checks = [];
  for (const page of pages) {
    for (const check of page.dynamicChecks || []) {
      checks.push({ page, check });
    }
  }
  return checks;
}

function collectPromotedFindings(results) {
  return Array.isArray(results.promotedFindings) ? results.promotedFindings : [];
}

function wcagForFinding(message) {
  const text = String(message || '').toLowerCase();

  if (text.includes('visible focus')) {
    return { sc: '2.4.7', name: 'Focus Visible', level: 'AA' };
  }
  if (text.includes('first tab') || text.includes('tab navigation appears stuck')) {
    return { sc: '2.4.3', name: 'Focus Order', level: 'A' };
  }
  if (text.includes('skip link')) {
    return { sc: '2.4.1', name: 'Bypass Blocks', level: 'A' };
  }

  return { sc: '2.1.1', name: 'Keyboard', level: 'A' };
}

function severityForFinding(finding) {
  const message = String(finding.message || '').toLowerCase();
  const page = finding.page || {};

  if (message.includes('status: 403')) {
    return 'High';
  }
  if (message.includes('status: 404') && page.path === '/this-page-does-not-exist') {
    return 'Low';
  }
  if (message.includes('stuck') || message.includes('meaningful focusable')) {
    return 'High';
  }
  if (message.includes('visible focus')) {
    return 'Medium';
  }

  return finding.type === 'issue' ? 'Medium' : 'Low';
}

function expectedForFinding(finding) {
  const message = String(finding.message || '').toLowerCase();

  if (message.includes('status: 403')) {
    return 'Authenticated test user can access the route under test.';
  }
  if (message.includes('status: 404')) {
    return 'Route resolves successfully when included in the keyboard review inventory.';
  }
  if (message.includes('stuck')) {
    return 'Tab order advances through distinct interactive elements without trapping unexpectedly.';
  }
  if (message.includes('visible focus')) {
    return 'Focused element has a visible focus indicator.';
  }
  if (message.includes('first tab')) {
    return 'First Tab lands on a meaningful interactive element.';
  }

  return 'Keyboard interaction works as expected for this route.';
}

function suggestedFixForFinding(finding) {
  const message = String(finding.message || '').toLowerCase();

  if (message.includes('status: 403')) {
    return 'Review route permissions for the admin test account, or remove this route from keyboard review inventory if restricted by design.';
  }
  if (message.includes('status: 404')) {
    return 'Use only real routes for keyboard review, or treat intentional 404 checks as informational instead of failures.';
  }
  if (message.includes('stuck')) {
    return 'Audit tabbable elements and tabindex usage. Remove positive tabindex values and confirm focus can progress naturally.';
  }
  if (message.includes('visible focus')) {
    return 'Add or restore visible focus styling with sufficient contrast.';
  }
  if (message.includes('first tab')) {
    return 'Ensure skip links or primary interactive controls are keyboard-reachable as the first meaningful focus target.';
  }

  return 'Investigate keyboard interaction behavior on the route and add targeted Playwright checks.';
}

function getPatternRouteMap() {
  if (!fs.existsSync(PATTERN_BUGS_FILE)) {
    return new Map();
  }

  const data = JSON.parse(fs.readFileSync(PATTERN_BUGS_FILE, 'utf8'));
  const map = new Map();

  for (const issue of data.issues || []) {
    for (const route of issue.affected_routes || []) {
      if (!map.has(route)) {
        map.set(route, []);
      }
      map.get(route).push(`${issue.id}:${issue.rule_id}`);
    }
  }

  return map;
}

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ ${INPUT_FILE} not found. Run keyboard review test first.`);
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  const summary = summarize(results);
  const findings = flattenFindings(results);
  const voiceControlRisks = collectVoiceControlRisks(results);
  const dynamicChecks = collectDynamicChecks(results);
  const promotedFindings = collectPromotedFindings(results);
  const patternRouteMap = getPatternRouteMap();
  const baseUrl = results.baseUrl || 'unknown';

  const lines = [];
  lines.push('# Drupal Core Keyboard Navigation Review');
  lines.push('');
  lines.push(`> **Generated:** ${results.generatedAt || new Date().toISOString()}`);
  lines.push('> **Method:** Playwright keyboard-only tab sampling with real key presses');
  lines.push(`> **Base URL:** ${results.baseUrl || 'unknown'}`);
  if (results.auth) {
    lines.push(`> **Admin Auth:** ${results.auth.username}/${results.auth.password} (${results.auth.source})`);
  }
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('| :--- | :--- |');
  lines.push(`| Pages reviewed | ${summary.totalPages} |`);
  lines.push(`| Total keyboard findings | ${findings.length} |`);
  lines.push(`| Pages with failures | ${summary.failingPages} |`);
  lines.push(`| Pages with warnings | ${summary.warningPages} |`);
  lines.push(`| Total failure findings | ${summary.totalFailures} |`);
  lines.push(`| Total warning findings | ${summary.totalWarnings} |`);
  lines.push(`| HTTP 200 pages | ${summary.status200} |`);
  lines.push(`| HTTP 403 pages | ${summary.status403} |`);
  lines.push(`| HTTP 404 pages | ${summary.status404} |`);
  lines.push(`| Admin routes with 403 | ${summary.admin403} |`);
  lines.push(`| Promoted findings (candidates) | ${promotedFindings.length} |`);
  lines.push('');

  lines.push('## Evaluated Pages');
  lines.push('');
  const pages = Array.isArray(results.pages) ? results.pages : [];
  const viewportLabels = [...new Set(pages.map((p) => p.viewport?.label).filter(Boolean))];
  if (viewportLabels.length > 0) {
    lines.push(viewportLabels.map((v) => `[${v}]`).join(' '));
  }
  const uniquePaths = [...new Set(pages.map((p) => p.path))];
  if (uniquePaths.length > 0) {
    lines.push(`- ${new URL(uniquePaths[0], baseUrl).toString()}`);
    for (let i = 1; i < uniquePaths.length; i++) {
      lines.push(`- ${uniquePaths[i]}`);
    }
  }
  lines.push('');

  lines.push('## Reproducible Issue Details');
  lines.push('');

  if (findings.length === 0) {
    lines.push('- No keyboard review findings were captured for the sampled routes.');
    lines.push('');
  }
  else {
    findings.forEach((finding, index) => {
      const issueId = `KEYBOARD-A11Y-${String(index + 1).padStart(3, '0')}`;
      const page = finding.page;
      const wcag = wcagForFinding(finding.message);
      const severity = severityForFinding(finding);
      const relatedPatternIds = patternRouteMap.get(page.path) || [];

      lines.push(`### ${issueId}: ${page.name} (${page.path})`);
      lines.push('');
      lines.push(`**Severity:** ${severity}`);
      lines.push(`**Finding Type:** ${finding.type}`);
      lines.push(`**WCAG SC:** ${wcag.sc} - ${wcag.name} (Level ${wcag.level})`);
      lines.push(`**URL:** ${page.url}`);
      lines.push(`**Final URL:** ${page.finalUrl || page.url}`);
      lines.push(`**Route:** ${page.path}`);
      lines.push(`**HTTP Status:** ${page.status}`);
      if (page.viewport) {
        lines.push(`**Viewport:** ${page.viewport.label} (${page.viewport.width}x${page.viewport.height})`);
      }
      lines.push(`**Unique focus targets sampled:** ${page.uniqueFocusTargets}`);
      lines.push('');

      lines.push('#### Steps to Reproduce');
      lines.push(`1. Go to ${page.url}`);
      lines.push('2. Use keyboard-only navigation and press Tab repeatedly.');
      lines.push(`3. Observe the sampled focus sequence for ${Math.max(1, (page.focusSteps || []).length)} Tab steps.`);
      lines.push(`4. Confirm finding: ${finding.message}`);
      lines.push('');

      lines.push('#### Expected Behaviour');
      lines.push(expectedForFinding(finding));
      lines.push('');

      lines.push('#### Actual Behaviour');
      lines.push(finding.message);
      lines.push('');

      lines.push('#### Impact');
      lines.push('keyboard-only users, switch users, screen-reader users');
      lines.push('');

      lines.push('#### Suggested Fix');
      lines.push(suggestedFixForFinding(finding));
      lines.push('');

      lines.push('#### Focus Sequence Sample');
      for (const step of (page.focusSteps || []).slice(0, 8)) {
        const visible = step.visibleFocusEvidence ? 'visible-focus evidence' : 'no visible-focus evidence';
        const mismatch = step.labelInNameMismatch ? 'label-in-name mismatch' : 'label-in-name ok';
        lines.push(`- Step ${step.step}: ${step.descriptor} (${visible}; ${mismatch})`);
        if (step.selector || step.xpath) {
          lines.push(`  - selector: ${step.selector || 'N/A'}`);
          lines.push(`  - xpath: ${step.xpath || 'N/A'}`);
        }
        if (step.visibleLabel || step.accessibleName) {
          lines.push(`  - visible label: ${step.visibleLabel || 'N/A'}`);
          lines.push(`  - accessible name: ${step.accessibleName || 'N/A'}`);
        }
      }
      lines.push('');

      lines.push('#### Additional References');
      lines.push('- Keyboard best practices: https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html');
      lines.push('- Focus order: https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html');
      if (relatedPatternIds.length > 0) {
        lines.push(`- Related PATTERN-REPORT issue IDs: ${relatedPatternIds.join(', ')}`);
      }
      lines.push('');

      lines.push('#### Testing Environment');
      lines.push('- Browser: Chromium (via Playwright)');
      lines.push('- OS: macOS');
      lines.push(`- Base URL: ${baseUrl}`);
      if (results.auth) {
        lines.push(`- Auth context: ${results.auth.username}/${results.auth.password} (${results.auth.source})`);
      }
      lines.push('');

      lines.push('#### Tracking IDs');
      lines.push(`- Issue ID: ${issueId}`);
      lines.push(`- Route: ${page.path}`);
      lines.push('');
    });
  }

  lines.push('## Broken Links Found During Crawl');
  lines.push('');
  const broken404 = pages.filter((p) => p.status === 404 && p.path !== INTENTIONAL_404_PATH);
  if (broken404.length === 0) {
    lines.push('- No unexpected 404 routes were detected during this crawl.');
  }
  else {
    for (const page of broken404) {
      const vp = page.viewport?.label ? ` [${page.viewport.label}]` : '';
      lines.push(`- ${page.path}${vp} (${page.url})`);
    }
  }
  lines.push(`- Intentional 404 test route retained: ${INTENTIONAL_404_PATH}`);
  lines.push('');

  lines.push('## Voice Control / Label-in-Name Risks');
  lines.push('');
  if (voiceControlRisks.length === 0) {
    lines.push('- No label-in-name mismatches were detected in sampled focus steps.');
  }
  else {
    lines.push(`- Total potential label-in-name mismatches: ${voiceControlRisks.length}`);
    for (const item of voiceControlRisks.slice(0, 20)) {
      lines.push(`- ${item.page.path} [${item.page.viewport?.label || 'unknown'}] step ${item.risk.step}`);
      lines.push(`  - selector: ${item.risk.selector || 'N/A'}`);
      lines.push(`  - xpath: ${item.risk.xpath || 'N/A'}`);
      lines.push(`  - visible label: ${item.risk.visibleLabel || 'N/A'}`);
      lines.push(`  - accessible name: ${item.risk.accessibleName || 'N/A'}`);
    }
  }
  lines.push('');

  lines.push('## Dynamic Interaction Checks');
  lines.push('');
  if (dynamicChecks.length === 0) {
    lines.push('- No dynamic interaction checks were executed in this run.');
  }
  else {
    const checkedRouteSet = new Set(dynamicChecks.map((x) => x.page.path));
    lines.push(`- Routes with dynamic checks: ${Array.from(checkedRouteSet).join(', ')}`);
    lines.push(`- Dynamic checks executed: ${dynamicChecks.length}`);
    for (const item of dynamicChecks) {
      lines.push(`- ${item.page.path} [${item.page.viewport?.label || 'unknown'}] (${item.check.type})`);
      lines.push(`  - attempted: ${item.check.attempted}`);
      lines.push(`  - opened: ${item.check.opened}`);
      lines.push(`  - tab stayed in dialog: ${item.check.tabStayedInDialog}`);
      if (typeof item.check.interactionSucceeded === 'boolean') {
        lines.push(`  - interaction succeeded: ${item.check.interactionSucceeded}`);
      }
      if (typeof item.check.routeChanged === 'boolean') {
        lines.push(`  - route changed: ${item.check.routeChanged}`);
      }
      if (typeof item.check.secondaryActionsVisible === 'boolean') {
        lines.push(`  - secondary actions visible: ${item.check.secondaryActionsVisible}`);
      }
      lines.push(`  - sample data supported: ${item.check.sampleDataSupported}`);
      lines.push(`  - sample data entered: ${item.check.sampleDataEntered}`);
      lines.push(`  - escaped/closed: ${item.check.escapedClosed}`);
      lines.push(`  - focus returned to trigger: ${item.check.focusReturnedToTrigger}`);
      lines.push(`  - scoped axe violations: ${item.check.axeViolations}`);
      if (Array.isArray(item.check.axeViolationIds) && item.check.axeViolationIds.length > 0) {
        lines.push(`  - axe rule IDs: ${item.check.axeViolationIds.join(', ')}`);
      }
      for (const detail of item.check.details || []) {
        lines.push(`  - detail: ${detail}`);
      }
    }
  }
  lines.push('');

  lines.push('## Promoted Findings for PATTERN-REPORT');
  lines.push('');
  if (promotedFindings.length === 0) {
    lines.push('- No findings were marked as promotion candidates in this run.');
  }
  else {
    lines.push(`- Promotion candidates: ${promotedFindings.length}`);
    for (const item of promotedFindings) {
      lines.push(`- ${item.id}: ${item.route} [${item.viewport}]`);
      lines.push(`  - severity: ${item.severity}`);
      lines.push(`  - type: ${item.findingType}`);
      lines.push(`  - message: ${item.message}`);
      lines.push(`  - WCAG: ${item.wcag}`);
      lines.push(`  - recommended contract: ${item.recommendedTest}`);
      lines.push(`  - rationale: ${item.rationale}`);
    }
  }
  lines.push('');

  lines.push('## Overlap with PATTERN-REPORT');
  lines.push('');
  if (findings.length === 0) {
    lines.push('- No keyboard findings were captured, so there is no overlap to report.');
  }
  else {
    const overlapCount = findings.filter((f) => (patternRouteMap.get(f.page.path) || []).length > 0).length;
    lines.push(`- Keyboard findings with route overlap in PATTERN-REPORT: ${overlapCount} of ${findings.length}`);
    lines.push('- Overlap is route-based and does not imply the same root cause or WCAG failure type.');
  }
  lines.push('');

  lines.push('## Review Notes');
  lines.push('');
  lines.push('- This report now follows a bug-report style structure for reproducibility and triage.');
  lines.push('- Findings should be confirmed with targeted component-level keyboard tests for critical workflows.');
  lines.push('- Recommended follow-up: add hard-gate keyboard specs for recurring failures.');
  lines.push('');

  const markdown = lines.join('\n');
  const html = renderMarkdownReport({
    title: 'Drupal Core Keyboard Navigation Review',
    description: 'Keyboard accessibility findings by page, generated from Playwright keyboard-only navigation sampling.',
    markdown,
    sourceLabel: path.basename(MD_LATEST),
  });

  fs.writeFileSync(MD_OUTPUT, markdown);
  fs.writeFileSync(MD_LATEST, markdown);
  fs.writeFileSync(HTML_OUTPUT, html);
  fs.writeFileSync(HTML_LATEST, html);

  console.log(`✅ Keyboard review markdown written to ${MD_OUTPUT}`);
  console.log(`✅ Keyboard review markdown written to ${MD_LATEST} (latest)`);
  console.log(`✅ Keyboard review HTML written to ${HTML_OUTPUT}`);
  console.log(`✅ Keyboard review HTML written to ${HTML_LATEST} (latest)`);
}

main();
