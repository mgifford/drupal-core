#!/usr/bin/env node
/**
 * Accessibility Pattern Analyzer for Drupal Core
 *
 * Reads reports/axe-results.json and groups violations by rule+selector,
 * producing structured bug reports following ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md
 *
 * Outputs:
 *   reports/bugs.json            — structured bug report (full schema per best practices)
 *   reports/bugs.csv             — CSV organized by rule, sorted by priority
 *   reports/PATTERN-REPORT.md    — human-readable prioritized report with fix guidance
 *   reports/pattern-report.json  — legacy pattern-only JSON (kept for compatibility)
 *
 * Usage:
 *   node scripts/analyze-patterns.js
 *   node scripts/analyze-patterns.js --min-pages 2  (only show patterns on ≥2 pages)
 */

'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Root-level /reports directory — one level above the repo's core/ directory.
// Resolves from: core/tests/playwright/scripts/ → ../../../../reports/
const REPORTS_DIR = path.resolve(__dirname, '../../../../reports');
const INPUT_FILE = path.join(REPORTS_DIR, 'axe-results.json');

// Date-stamped outputs so each scan is independently reviewable.
const DATE_STAMP = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const JSON_OUTPUT         = path.join(REPORTS_DIR, `pattern-report-${DATE_STAMP}.json`);
const BUGS_JSON_OUTPUT    = path.join(REPORTS_DIR, `bugs-${DATE_STAMP}.json`);
const BUGS_CSV_OUTPUT     = path.join(REPORTS_DIR, `bugs-${DATE_STAMP}.csv`);
const MD_OUTPUT           = path.join(REPORTS_DIR, `PATTERN-REPORT-${DATE_STAMP}.md`);

// Always-current "latest" copies for quick access.
const BUGS_JSON_LATEST    = path.join(REPORTS_DIR, 'bugs-latest.json');
const BUGS_CSV_LATEST     = path.join(REPORTS_DIR, 'bugs-latest.csv');
const MD_LATEST           = path.join(REPORTS_DIR, 'PATTERN-REPORT-latest.md');

const args = process.argv.slice(2);
const minPagesArg = args.indexOf('--min-pages');
const MIN_PAGES = minPagesArg >= 0 ? parseInt(args[minPagesArg + 1], 10) : 1;

const IMPACT_ORDER = { critical: 0, serious: 1, moderate: 2, minor: 3, null: 4 };

// ─── Screen / mode helpers ───────────────────────────────────────────────────

/** Infer screen type from viewport width stored in axe-results.json. */
function getScreenType(viewport) {
  return viewport && viewport.width <= 768 ? 'mobile' : 'desktop';
}

/**
 * Generate a stable 8-char hex ID for a unique violation pattern.
 * Pattern ID: same rule + selector + screen (across all pages).
 * Instance ID: adds page path — unique per page.
 *
 * Inputs are joined with | so partial collisions are impossible.
 * Example: "DRU-A1B2C3D4" (pattern) or "INS-A1B2C3D4" (instance)
 */
function md5Short(str) {
  return crypto.createHash('md5').update(str).digest('hex').slice(0, 8).toUpperCase();
}

function generatePatternId(selectorKey, ruleId, screenType) {
  // Theme intentionally excluded so the same bug in different themes shares one DRU-XXXXXXXX.
  return `DRU-${md5Short([selectorKey, ruleId, screenType].join('|'))}`;
}

function generateInstanceId(pagePath, selectorKey, ruleId, screenType, themeId) {
  // Theme included so the same page+rule combo in different themes gets distinct instance IDs.
  return `INS-${md5Short([pagePath, selectorKey, ruleId, screenType, themeId].join('|'))}`;
}

// ─── Axe rule → WCAG SC mapping ──────────────────────────────────────────────
// Source: https://dequeuniversity.com/rules/axe/
const RULE_WCAG = {
  'area-alt':                        { sc: '1.1.1', level: 'A',  name: 'Non-text Content' },
  'aria-allowed-attr':               { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'aria-command-name':               { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'aria-hidden-body':                { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'aria-hidden-focus':               { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'aria-input-field-name':           { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'aria-meter-name':                 { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'aria-progressbar-name':           { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'aria-required-attr':              { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'aria-required-children':         { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'aria-required-parent':           { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'aria-roles':                      { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'aria-toggle-field-name':         { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'aria-valid-attr':                 { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'aria-valid-attr-value':          { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'button-name':                     { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'bypass':                          { sc: '2.4.1', level: 'A',  name: 'Bypass Blocks' },
  'color-contrast':                  { sc: '1.4.3', level: 'AA', name: 'Contrast (Minimum)' },
  'definition-list':                 { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'dlitem':                          { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'document-title':                  { sc: '2.4.2', level: 'A',  name: 'Page Titled' },
  // SC 4.1.1 (Parsing) was deprecated in WCAG 2.2; axe maps these rules to it for legacy reasons.
  // Treat violations as WCAG 2.2 A failures via the underlying duplicate-id issue (4.1.2).
  'duplicate-id-active':            { sc: '4.1.1', level: 'A',  name: 'Parsing (deprecated in WCAG 2.2)' },
  'duplicate-id-aria':              { sc: '4.1.1', level: 'A',  name: 'Parsing (deprecated in WCAG 2.2)' },
  'form-field-multiple-labels':     { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'frame-focusable-content':        { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'frame-title':                     { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'heading-order':                   { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'html-has-lang':                   { sc: '3.1.1', level: 'A',  name: 'Language of Page' },
  'html-lang-valid':                 { sc: '3.1.1', level: 'A',  name: 'Language of Page' },
  'image-alt':                       { sc: '1.1.1', level: 'A',  name: 'Non-text Content' },
  'input-button-name':              { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'input-image-alt':                { sc: '1.1.1', level: 'A',  name: 'Non-text Content' },
  'label':                           { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'label-title-only':               { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'landmark-banner-is-top-level':   { sc: '1.3.6', level: 'A',  name: 'Identify Purpose' },
  'landmark-complementary-is-top-level': { sc: '1.3.6', level: 'A', name: 'Identify Purpose' },
  'landmark-contentinfo-is-top-level': { sc: '1.3.6', level: 'A', name: 'Identify Purpose' },
  'landmark-main-is-top-level':     { sc: '1.3.6', level: 'A',  name: 'Identify Purpose' },
  'landmark-no-duplicate-banner':   { sc: '1.3.6', level: 'A',  name: 'Identify Purpose' },
  'landmark-no-duplicate-contentinfo': { sc: '1.3.6', level: 'A', name: 'Identify Purpose' },
  'landmark-no-duplicate-main':     { sc: '1.3.6', level: 'A',  name: 'Identify Purpose' },
  'landmark-one-main':              { sc: '1.3.6', level: 'A',  name: 'Identify Purpose' },
  'landmark-unique':                 { sc: '1.3.6', level: 'A',  name: 'Identify Purpose' },
  'link-in-text-block':             { sc: '1.4.1', level: 'A',  name: 'Use of Color' },
  'link-name':                       { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'list':                            { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'listitem':                        { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'meta-refresh':                    { sc: '2.2.1', level: 'A',  name: 'Timing Adjustable' },
  'meta-viewport':                   { sc: '1.4.4', level: 'AA', name: 'Resize Text' },
  'object-alt':                      { sc: '1.1.1', level: 'A',  name: 'Non-text Content' },
  'page-has-heading-one':           { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'region':                          { sc: '1.3.6', level: 'A',  name: 'Identify Purpose' },
  'role-img-alt':                    { sc: '1.1.1', level: 'A',  name: 'Non-text Content' },
  'scrollable-region-focusable':    { sc: '2.1.1', level: 'A',  name: 'Keyboard' },
  'select-name':                     { sc: '4.1.2', level: 'A',  name: 'Name, Role, Value' },
  'server-side-image-map':          { sc: '2.1.1', level: 'A',  name: 'Keyboard' },
  'skip-link':                       { sc: '2.4.1', level: 'A',  name: 'Bypass Blocks' },
  'svg-img-alt':                     { sc: '1.1.1', level: 'A',  name: 'Non-text Content' },
  'tabindex':                        { sc: '2.4.3', level: 'A',  name: 'Focus Order' },
  'table-duplicate-name':           { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'table-fake-caption':             { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'target-size':                     { sc: '2.5.8', level: 'AA', name: 'Target Size (Minimum)' },
  'td-headers-attr':                { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'th-has-data-cells':              { sc: '1.3.1', level: 'A',  name: 'Info and Relationships' },
  'valid-lang':                      { sc: '3.1.2', level: 'AA', name: 'Language of Parts' },
  'video-caption':                   { sc: '1.2.2', level: 'A',  name: 'Captions (Prerecorded)' },
};

// ─── Disability groups impacted per rule ─────────────────────────────────────
const RULE_IMPACT_GROUPS = {
  'color-contrast':    ['low-vision'],
  'label-title-only':  ['blind', 'low-vision', 'voice-control'],
  'label':             ['blind', 'low-vision', 'voice-control'],
  'listitem':          ['blind', 'low-vision'],
  'region':            ['blind', 'low-vision'],
  'landmark-no-duplicate-contentinfo': ['blind', 'low-vision'],
  'page-has-heading-one': ['blind', 'low-vision'],
  'heading-order':     ['blind', 'low-vision'],
  'target-size':       ['motor', 'low-vision'],
  'duplicate-id-active': ['blind', 'low-vision', 'voice-control'],
  'duplicate-id-aria': ['blind', 'low-vision'],
  'image-alt':         ['blind', 'low-vision'],
  'button-name':       ['blind', 'low-vision', 'voice-control'],
  'link-name':         ['blind', 'low-vision', 'voice-control'],
};

// ─── Drupal-specific fix suggestions ─────────────────────────────────────────
// Keyed by axe rule ID. Each entry may also match on selector fragment.
// Priority order: selector-specific match first, then rule-level fallback.
const DRUPAL_FIX_MAP = [
  // listitem — .action-links-item <li> without a <ul> parent
  {
    rule: 'listitem',
    selectorContains: 'action-links-item',
    drupalFile: 'core/themes/olivero/templates/menu-local-action.html.twig\n    core/themes/claro/templates/block/block--local-actions-block.html.twig',
    summary: 'Local action links render bare <li> items outside a <ul>',
    expected: '<ul class="action-links"><li class="action-links-item">…</li></ul>',
    actual: '<li class="action-links-item">…</li>  (no <ul> parent)',
    fix: `Wrap the action-link items in a <ul>:\n\n` +
      `<!-- Before (broken) -->\n{% for link in action_links %}\n  <li class="action-links-item">{{ link }}</li>\n{% endfor %}\n\n` +
      `<!-- After (fixed) -->\n<ul class="action-links">\n{% for link in action_links %}\n  <li class="action-links-item">{{ link }}</li>\n{% endfor %}\n</ul>`,
    drupalIssue: 'https://www.drupal.org/project/drupal/issues/new',
  },

  // label-title-only — "Select all rows" checkbox uses only title attribute
  {
    rule: 'label-title-only',
    selectorContains: 'Select all rows',
    drupalFile: 'core/themes/claro/templates/classy/dataset/table.html.twig\n    core/themes/admin/templates/dataset/table.html.twig',
    summary: '"Select all rows" checkbox is labeled only by its title attribute',
    expected: 'Checkbox has a visible or visually-hidden <label>, or aria-label',
    actual: 'input[title="Select all rows in this table"] — title is the sole label source',
    fix: `Replace the title-only label with aria-label:\n\n` +
      `<!-- Before (broken) -->\n<input type="checkbox" title="{{ 'Select all rows in this table'|t }}">\n\n` +
      `<!-- After (fixed) -->\n<input type="checkbox"\n  aria-label="{{ 'Select all rows in this table'|t }}">`,
    drupalIssue: 'https://www.drupal.org/project/drupal/issues/new',
  },

  // color-contrast — "No blocks in this region" em text in block layout
  {
    rule: 'color-contrast',
    selectorContains: 'message > td',
    drupalFile: 'core/themes/claro/css/theme/block-admin.css (or its .pcss.css source)',
    summary: '"No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1)',
    expected: 'Foreground color #767676 or darker on white (#ffffff) background → 4.54:1',
    actual: 'color: #999999 on #ffffff → contrast ratio 2.84:1',
    fix: `In Claro's block-admin CSS, darken the placeholder text:\n\n` +
      `/* Before (broken) */\n.block-region .region-message em {\n  color: #999999;\n}\n\n` +
      `/* After (fixed) */\n.block-region .region-message em {\n  color: #767676; /* 4.54:1 on white */\n}`,
    drupalIssue: 'https://www.drupal.org/project/drupal/issues/3318394',
  },

  // landmark-no-duplicate-contentinfo — messages block uses role="contentinfo"
  {
    rule: 'landmark-no-duplicate-contentinfo',
    selectorContains: 'messages',
    drupalFile: 'core/themes/claro/templates/misc/status-messages.html.twig\n    core/modules/system/templates/status-messages.html.twig',
    summary: 'Status messages block uses role="contentinfo", duplicating the page <footer>',
    expected: 'Status messages use role="status" (non-error) or role="alert" (errors)',
    actual: '<div role="contentinfo" aria-labelledby="…"> — conflicts with the page footer landmark',
    fix: `Change the outer wrapper role based on message type:\n\n` +
      `{# Before (broken) #}\n<div role="contentinfo" aria-labelledby="{{ title_ids[type] }}"…>\n\n` +
      `{# After (fixed) #}\n{%- set msg_role = (type == 'error') ? 'alert' : 'status' -%}\n<div role="{{ msg_role }}" aria-labelledby="{{ title_ids[type] }}"…>`,
    drupalIssue: 'https://www.drupal.org/project/drupal/issues/new',
  },

  // region — #primary-tabs-title / #secondary-tabs-title outside landmark
  {
    rule: 'region',
    selectorContains: 'tabs-title',
    drupalFile: 'core/themes/claro/templates/menu-local-tasks.html.twig\n    core/themes/olivero/templates/navigation/menu-local-tasks.html.twig',
    summary: 'Local task tab headings (#primary-tabs-title) are outside any landmark region',
    expected: 'The <h2> heading is inside the <nav> it labels, or the <nav> itself is inside a landmark',
    actual: '<h2 id="primary-tabs-title"> is a sibling of <nav>, and the nav may be outside main/aside/etc.',
    fix: `Move the heading inside the <nav> it labels:\n\n` +
      `{# Before #}\n<h2 id="primary-tabs-title" class="visually-hidden">{{ 'Primary tabs'|t }}</h2>\n<nav class="tabs-wrapper" aria-labelledby="primary-tabs-title">…</nav>\n\n` +
      `{# After — h2 moves inside nav #}\n<nav class="tabs-wrapper" aria-labelledby="primary-tabs-title">\n  <h2 id="primary-tabs-title" class="visually-hidden">{{ 'Primary tabs'|t }}</h2>\n  …\n</nav>`,
    drupalIssue: 'https://www.drupal.org/project/drupal/issues/3318396',
  },

  // region — #block-olivero-primary-admin-actions block outside landmark
  {
    rule: 'region',
    selectorContains: 'primary-admin-actions',
    drupalFile: 'core/themes/olivero/templates/layout/page.html.twig\n    Core block placement configuration',
    summary: 'Primary admin actions block is rendered outside any ARIA landmark',
    expected: 'Block content is inside a <main>, <nav>, <aside>, or equivalent landmark',
    actual: '#block-olivero-primary-admin-actions .block__content is outside all landmarks',
    fix: `Wrap the admin actions block in a <nav> in the page template, or ensure block region\nis inside an appropriate landmark:\n\n` +
      `{# Olivero page.html.twig — ensure admin actions region is inside <main> or wrap it #}\n<nav aria-label="{{ 'Page actions'|t }}">\n  {{ page.primary_admin_actions }}\n</nav>`,
    drupalIssue: 'https://www.drupal.org/project/drupal/issues/3318396',
  },

  // target-size — breadcrumb links too small
  {
    rule: 'target-size',
    selectorContains: 'breadcrumb',
    drupalFile: 'core/themes/claro/css/components/breadcrumb.css\n    core/themes/claro/templates/breadcrumb.html.twig',
    summary: 'Breadcrumb links are only 14px tall — WCAG 2.5.8 requires 24×24px minimum',
    expected: 'Clickable area ≥ 24×24px (WCAG 2.5.8 AA)',
    actual: 'Breadcrumb links: 14px height, insufficient spacing from neighbours',
    fix: `Increase the breadcrumb link target size via CSS:\n\n` +
      `/* claro/css/components/breadcrumb.css */\n.breadcrumb__link {\n  /* Add padding so the clickable area meets 24px minimum */\n  padding-block: 5px;\n  display: inline-block;\n}`,
    drupalIssue: 'https://www.drupal.org/project/drupal/issues/new',
  },

  // page-has-heading-one — Olivero homepage lacks an h1
  {
    rule: 'page-has-heading-one',
    selectorContains: 'html',
    drupalFile: 'core/themes/olivero/templates/layout/page--front.html.twig\n    Site configuration (site name / front page node)',
    summary: 'Homepage has no <h1> heading — screen reader users cannot identify page topic',
    expected: 'Every page contains exactly one <h1> that identifies the page',
    actual: 'Olivero front page renders no <h1>; the site name in the header is not an <h1>',
    fix: `Option A — Make site name an h1 on the front page only:\n\n` +
      `{# page--front.html.twig #}\n{% if is_front %}\n  <h1 class="site-name">{{ site_name }}</h1>\n{% else %}\n  <div class="site-name">{{ site_name }}</div>\n{% endif %}\n\n` +
      `Option B — Ensure the promoted front page node has an h1 title rendered.`,
    drupalIssue: 'https://www.drupal.org/project/drupal/issues/new',
  },

  // heading-order — /admin/config has out-of-order headings
  {
    rule: 'heading-order',
    selectorContains: 'panel__title',
    drupalFile: 'core/modules/system/templates/system-admin-index.html.twig\n    core/themes/claro/templates (panel/section templates)',
    summary: 'Admin Configuration page has heading-order violations (h3 appears before h2)',
    expected: 'Heading levels increment by one: h1 → h2 → h3',
    actual: 'Panel titles use <h3> but their section headings may be absent or at wrong level',
    fix: `Audit the heading hierarchy on /admin/config and adjust panel titles:\n\n` +
      `{# system-admin-index.html.twig — ensure section uses h2, panel uses h3 #}\n<h2 class="system-admin-section__title">{{ section.title }}</h2>\n<div class="panel">\n  <h3 class="panel__title">{{ panel.title }}</h3>\n</div>`,
    drupalIssue: 'https://www.drupal.org/project/drupal/issues/3318398',
  },
];

// Fallback fixes by rule when no selector-specific match is found
const RULE_FALLBACK_FIX = {
  'color-contrast':    'Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.',
  'listitem':          'Ensure every <li> is a direct child of <ul> or <ol>. Check Twig templates that render list items.',
  'label-title-only':  'Replace title-only labels with aria-label or a visible/visually-hidden <label> element.',
  'region':            'Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.',
  'landmark-no-duplicate-contentinfo': 'Only one element may carry role="contentinfo" per page. Change secondary uses to role="status" or role="alert".',
  'page-has-heading-one': 'Add an <h1> to each page. On the front page, the site name or page title should be the h1.',
  'heading-order':     'Heading levels must not skip. Audit the page heading hierarchy and adjust template markup.',
  'target-size':       'Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.',
};

// ─── Twig template inference ──────────────────────────────────────────────────
const TEMPLATE_HINTS = [
  { pattern: /field--type-([a-z-]+)/, template: 'field.html.twig', hint: 'Field type template' },
  { pattern: /field--name-([a-z-]+)/, template: 'field.html.twig', hint: 'Named field template' },
  { pattern: /node--type-([a-z-]+)/, template: 'node--{type}.html.twig', hint: 'Node type template' },
  { pattern: /\bnode\b/, template: 'node.html.twig', hint: 'Node template' },
  { pattern: /block--([a-z-]+)/, template: 'block--{id}.html.twig', hint: 'Block template' },
  { pattern: /\bblock\b/, template: 'block.html.twig', hint: 'Block template' },
  { pattern: /views-row|views-field|view-content/, template: 'views-view-*.html.twig', hint: 'Views template' },
  { pattern: /\bregion--([a-z-]+)/, template: 'region--{name}.html.twig', hint: 'Region template' },
  { pattern: /\bregion\b/, template: 'region.html.twig', hint: 'Region template' },
  { pattern: /form-item|form-type-|form-wrapper/, template: 'form-element.html.twig', hint: 'Form element template' },
  { pattern: /\bmenu\b/, template: 'menu.html.twig', hint: 'Menu template' },
  { pattern: /breadcrumb/, template: 'breadcrumb.html.twig', hint: 'Breadcrumb template' },
  { pattern: /pager/, template: 'pager.html.twig', hint: 'Pager template' },
  { pattern: /header|site-header/, template: 'page.html.twig', hint: 'Page header region' },
  { pattern: /footer|site-footer/, template: 'page.html.twig', hint: 'Page footer region' },
  { pattern: /layout-container|layout-sidebar/, template: 'page.html.twig', hint: 'Page layout template' },
  { pattern: /admin-toolbar|toolbar/, template: 'toolbar (admin theme)', hint: 'Admin toolbar' },
  { pattern: /claro|olivero/, template: '(theme-specific template)', hint: 'Theme template' },
];

function inferTemplate(selector) {
  const flat = Array.isArray(selector) ? selector.join(' ') : selector;
  for (const { pattern, template, hint } of TEMPLATE_HINTS) {
    if (pattern.test(flat)) {
      return { template, hint };
    }
  }
  return { template: 'unknown', hint: 'Could not infer template from selector' };
}

function selectorKey(node) {
  return (node.target ?? []).join(' >> ');
}

function getDrupalFix(ruleId, selectorStr, htmlSnippet) {
  const haystack = `${selectorStr} ${htmlSnippet}`.toLowerCase();
  for (const entry of DRUPAL_FIX_MAP) {
    if (entry.rule !== ruleId) continue;
    if (!entry.selectorContains || haystack.includes(entry.selectorContains.toLowerCase())) {
      return entry;
    }
  }
  return null;
}

function cssToXpath(cssSelector) {
  // Best-effort conversion of simple CSS selectors to XPath for the bug report.
  if (!cssSelector) return '';
  const s = cssSelector.trim();
  if (s.startsWith('#')) return `//*[@id="${s.slice(1)}"]`;
  if (s.startsWith('.')) return `//*[contains(@class,"${s.slice(1)}")]`;
  if (s.includes('[') && s.includes(']')) {
    const attr = s.match(/\[([^\]]+)\]/)?.[1] ?? '';
    const tag = s.split('[')[0] || '*';
    return `//${tag}[@${attr}]`;
  }
  return `//${s}`;
}

function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  const str = String(val).replace(/\r?\n/g, ' ').replace(/"/g, '""');
  return `"${str}"`;
}

// ─── Archive old dated reports ───────────────────────────────────────────────
/**
 * Groups all dated report files not from today by date, then creates one
 * gzip'd tar archive per day: reports/archive/YYYY-MM-DD.tar.gz
 * Originals are deleted after successful archiving.
 */
function archiveOldReports(reportsDir, currentDate) {
  const { execSync } = require('child_process');
  const archiveDir = path.join(reportsDir, 'archive');
  const datedPattern = /-(20\d{2}-\d{2}-\d{2})\.(json|csv|md)$/;

  // Group files by date so each day becomes one .tar.gz
  const filesByDate = new Map();
  for (const file of fs.readdirSync(reportsDir)) {
    const match = file.match(datedPattern);
    if (match && match[1] !== currentDate) {
      const date = match[1];
      if (!filesByDate.has(date)) filesByDate.set(date, []);
      filesByDate.get(date).push(file);
    }
  }

  if (filesByDate.size === 0) return;

  fs.mkdirSync(archiveDir, { recursive: true });

  for (const [date, files] of filesByDate) {
    const tarFile = path.join(archiveDir, `${date}.tar.gz`);

    // Skip if already archived (re-run on same day as old files)
    if (fs.existsSync(tarFile)) {
      for (const file of files) fs.unlinkSync(path.join(reportsDir, file));
      continue;
    }

    const fileList = files.map((f) => `'${f}'`).join(' ');
    execSync(`tar -czf '${tarFile}' -C '${reportsDir}' ${fileList}`);
    for (const file of files) fs.unlinkSync(path.join(reportsDir, file));

    const sizeMb = (fs.statSync(tarFile).size / 1024).toFixed(1);
    console.log(`📦 Archived ${files.length} file(s) for ${date} → reports/archive/${date}.tar.gz (${sizeMb} KB)`);
  }
}

function priorityScore(pattern) {
  // Lower score = higher priority. Impact weight + inverse page count.
  const impactWeight = (IMPACT_ORDER[pattern.impact] ?? 4) * 1000;
  return impactWeight - pattern.pages.length;
}

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ ${INPUT_FILE} not found. Run 'yarn test:a11y:playwright' first.`);
    process.exit(1);
  }

  const rawResults = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  const totalPages = rawResults.length;
  const scanDate = new Date().toISOString();
  const axeVersion = rawResults[0]?.violations?.[0] ? 'axe-core (via @axe-core/playwright)' : 'axe-core';

  // Archive dated files from previous scans before writing new ones.
  archiveOldReports(REPORTS_DIR, DATE_STAMP);

  // ── Build pattern map (rule + selector + screenType + theme → aggregated across pages) ──
  const patternMap = new Map();

  for (const pageResult of rawResults) {
    const screenType = getScreenType(pageResult.viewport);
    // Support both new (multi-theme) and legacy (single-theme) result records.
    const themeId = pageResult.theme ?? 'unknown';

    for (const violation of pageResult.violations) {
      for (const node of violation.nodes) {
        const selKey = selectorKey(node);
        // Include theme in key so each theme's results are tracked separately.
        const key = `${violation.id}::${selKey}::${screenType}::${themeId}`;

        if (!patternMap.has(key)) {
          const drupalFix = getDrupalFix(violation.id, selKey, node.html ?? '');
          const wcag = RULE_WCAG[violation.id] ?? { sc: 'unknown', level: '?', name: 'See axe docs' };
          const xpath = cssToXpath(Array.isArray(node.target) ? node.target[0] : node.target);
          const patternId = generatePatternId(selKey, violation.id, screenType);

          patternMap.set(key, {
            patternId,
            ruleId: violation.id,
            screenType,
            theme: themeId,
            impact: violation.impact,
            description: violation.description,
            helpUrl: violation.helpUrl,
            selector: node.target,
            selectorKey: selKey,
            html: node.html,
            failureSummary: node.failureSummary,
            xpath,
            wcag,
            impactGroups: RULE_IMPACT_GROUPS[violation.id] ?? ['users with disabilities'],
            drupalFix,
            templateHint: inferTemplate(node.target),
            pages: [],
          });
        }

        const instanceId = generateInstanceId(pageResult.path, selKey, violation.id, screenType, themeId);
        patternMap.get(key).pages.push({
          instanceId,
          name: pageResult.page,
          path: pageResult.path,
          url: `https://drupal-core.ddev.site${pageResult.path}`,
          screen: screenType,
          theme: themeId,
          viewport: pageResult.viewport ?? { width: 1280, height: 800 },
        });
      }
    }
  }

  // ── Sort and filter ──────────────────────────────────────────────────────
  const patterns = Array.from(patternMap.values())
    .filter((p) => p.pages.length >= MIN_PAGES)
    .sort((a, b) => priorityScore(a) - priorityScore(b));

  // ── Cross-theme analysis ─────────────────────────────────────────────────
  // Group per-theme patterns by (ruleId::selectorKey::screenType) — without theme —
  // to find issues that appear across multiple theme configurations.
  const crossThemeGroups = new Map(); // key: ruleId::selectorKey::screenType
  for (const p of patterns) {
    const groupKey = `${p.ruleId}::${p.selectorKey}::${p.screenType}`;
    if (!crossThemeGroups.has(groupKey)) {
      crossThemeGroups.set(groupKey, {
        patternId: p.patternId, // same across themes by design
        ruleId: p.ruleId,
        selectorKey: p.selectorKey,
        screenType: p.screenType,
        impact: p.impact,
        description: p.description,
        summary: p.drupalFix?.summary ?? `${p.ruleId}: ${p.description.slice(0, 80)}`,
        themes: new Set(),
      });
    }
    crossThemeGroups.get(groupKey).themes.add(p.theme);
  }

  // Collect distinct theme IDs present in the result set.
  const allThemeIds = [...new Set(patterns.map((p) => p.theme))];
  const themeCount = allThemeIds.length || 1;

  const crossThemeUniversal = [];
  const crossThemeMulti = [];
  const crossThemeSpecific = {}; // keyed by theme id

  for (const group of crossThemeGroups.values()) {
    const themes = [...group.themes];
    const entry = {
      patternId: group.patternId,
      ruleId: group.ruleId,
      selectorKey: group.selectorKey,
      screenType: group.screenType,
      impact: group.impact,
      summary: group.summary,
      themes,
      themeCount: themes.length,
    };

    if (themes.length >= themeCount) {
      crossThemeUniversal.push(entry);
    } else if (themes.length >= 2) {
      crossThemeMulti.push(entry);
    } else {
      const themeId = themes[0];
      if (!crossThemeSpecific[themeId]) crossThemeSpecific[themeId] = [];
      crossThemeSpecific[themeId].push(entry);
    }
  }

  // Sort universal and multi-theme groups by impact.
  const crossThemeSort = (a, b) =>
    (IMPACT_ORDER[a.impact] ?? 4) - (IMPACT_ORDER[b.impact] ?? 4);
  crossThemeUniversal.sort(crossThemeSort);
  crossThemeMulti.sort(crossThemeSort);

  // ── Summary stats ────────────────────────────────────────────────────────
  const summary = {
    generatedAt: scanDate,
    tool: axeVersion,
    totalPagesCrawled: totalPages,
    totalViolationInstances: rawResults.reduce((n, r) => n + r.violations.reduce((m, v) => m + v.nodes.length, 0), 0),
    uniquePatterns: patterns.length,
    templateLevelPatterns: patterns.filter((p) => p.pages.length >= 3).length,
    byImpact: {
      critical: patterns.filter((p) => p.impact === 'critical').length,
      serious:  patterns.filter((p) => p.impact === 'serious').length,
      moderate: patterns.filter((p) => p.impact === 'moderate').length,
      minor:    patterns.filter((p) => p.impact === 'minor').length,
    },
    environment: {
      browser: 'Chromium (via Playwright)',
      os: process.platform,
      tool: 'axe-core via @axe-core/playwright',
      baseUrl: 'https://drupal-core.ddev.site',
    },
  };

  fs.mkdirSync(REPORTS_DIR, { recursive: true });

  // ── bugs.json — full structured report ────────────────────────────────────
  const bugsJson = {
    $schema: 'https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md',
    summary,
    crossThemeAnalysis: {
      // Issues appearing in ALL tested themes — highest priority for core fixes.
      universal: crossThemeUniversal,
      // Issues appearing in 2+ themes but not all — worth coordinated fixes.
      multiTheme: crossThemeMulti,
      // Issues unique to one theme — theme-specific fixes.
      themeSpecific: crossThemeSpecific,
    },
    issues: patterns.map((p, i) => ({
      id: `DRUPAL-A11Y-${String(i + 1).padStart(3, '0')}`,
      pattern_id: p.patternId,          // stable hash: rule + selector + screen (no theme)
      priority: i + 1,
      theme: p.theme,
      isTemplateLevelIssue: p.pages.length >= 3,
      screen: p.screenType,
      mode: 'light',                    // placeholder; extend for dark-mode scans
      summary: p.drupalFix?.summary ??
        `${p.ruleId}: ${p.description.slice(0, 80)}`,
      rule_id: p.ruleId,
      impact: p.impact,
      wcag_sc: p.wcag.sc,
      wcag_level: p.wcag.level,
      wcag_name: p.wcag.name,
      wcag_url: p.wcag.sc === '4.1.1'
        ? 'https://www.w3.org/TR/WCAG22/#parsing' // SC 4.1.1 deprecated in WCAG 2.2; no Understanding doc
        : `https://www.w3.org/WAI/WCAG22/Understanding/${p.wcag.sc.replace(/\./g, '')}.html`,
      axe_url: p.helpUrl,
      frequency: {
        pages_affected: p.pages.length,
        total_pages_scanned: totalPages,
        percentage: Math.round((p.pages.length / totalPages) * 100),
      },
      // Each page instance has its own stable instance_id for regression tracking.
      affected_pages: p.pages,
      selector: p.selectorKey,
      xpath: p.xpath,
      html_snippet: p.html,
      failure_summary: p.failureSummary,
      likely_template: p.templateHint.template,
      template_hint: p.templateHint.hint,
      drupal_file: p.drupalFix?.drupalFile ?? 'See likely_template above',
      expected_behaviour: p.drupalFix?.expected ?? null,
      actual_behaviour: p.drupalFix?.actual ?? null,
      suggested_fix: p.drupalFix?.fix ?? RULE_FALLBACK_FIX[p.ruleId] ?? 'See axe documentation.',
      drupal_issue: p.drupalFix?.drupalIssue ?? null,
      impact_groups: p.impactGroups,
      steps_to_reproduce: [
        `Navigate to ${p.pages[0]?.url ?? p.pages[0]?.path}`,
        'Open browser DevTools and run: axe.run()',
        `Look for rule "${p.ruleId}" on selector: ${p.selectorKey}`,
        'Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js',
      ],
      environment: summary.environment,
    })),
  };

  fs.writeFileSync(BUGS_JSON_OUTPUT, JSON.stringify(bugsJson, null, 2));
  fs.writeFileSync(BUGS_JSON_LATEST, JSON.stringify(bugsJson, null, 2));
  console.log(`✅ Bug report written to ${BUGS_JSON_OUTPUT}`);

  // ── bugs.csv — spreadsheet-friendly, one row per pattern ─────────────────
  const csvHeaders = [
    'Priority', 'ID', 'Pattern_ID', 'Theme', 'Screen', 'Impact', 'WCAG_SC', 'WCAG_Level', 'WCAG_Name',
    'Rule_ID', 'Pages_Affected', 'Pct_Pages', 'Is_Template_Issue',
    'Summary', 'Selector', 'Likely_Template', 'Drupal_File',
    'Expected', 'Actual', 'Suggested_Fix', 'Drupal_Issue', 'Axe_URL',
    'Instance_IDs', 'Affected_Page_Paths',
  ];

  const csvRows = [csvHeaders.map(escapeCsv).join(',')];
  for (const issue of bugsJson.issues) {
    csvRows.push([
      issue.priority,
      issue.id,
      issue.pattern_id,
      issue.theme,
      issue.screen,
      issue.impact,
      issue.wcag_sc,
      issue.wcag_level,
      issue.wcag_name,
      issue.rule_id,
      issue.frequency.pages_affected,
      `${issue.frequency.percentage}%`,
      issue.isTemplateLevelIssue ? 'YES' : 'no',
      issue.summary,
      issue.selector,
      issue.likely_template,
      issue.drupal_file,
      issue.expected_behaviour ?? '',
      issue.actual_behaviour ?? '',
      issue.suggested_fix,
      issue.drupal_issue ?? '',
      issue.axe_url,
      issue.affected_pages.map((pg) => pg.instanceId).join('; '),
      issue.affected_pages.map((pg) => pg.path).join('; '),
    ].map(escapeCsv).join(','));
  }

  fs.writeFileSync(BUGS_CSV_OUTPUT, csvRows.join('\n'));
  fs.writeFileSync(BUGS_CSV_LATEST, csvRows.join('\n'));
  console.log(`✅ CSV report written to ${BUGS_CSV_OUTPUT}`);

  // ── Legacy pattern-report.json ────────────────────────────────────────────
  fs.writeFileSync(JSON_OUTPUT, JSON.stringify({ summary, patterns }, null, 2));

  // ── PATTERN-REPORT.md — rich human-readable report ────────────────────────
  const lines = [];
  lines.push('# Drupal Core Accessibility Bug Report');
  lines.push('');
  lines.push(`> **Generated:** ${scanDate}`);
  lines.push(`> **Tool:** axe-core via @axe-core/playwright | **Browser:** Chromium`);
  lines.push(`> **Standard:** [ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md](https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('| :--- | :--- |');
  lines.push(`| Pages crawled | ${summary.totalPagesCrawled} |`);
  lines.push(`| Total violation instances | ${summary.totalViolationInstances} |`);
  lines.push(`| Unique patterns | ${summary.uniquePatterns} |`);
  lines.push(`| Template-level patterns (≥3 pages) 🔁 | ${summary.templateLevelPatterns} |`);
  lines.push(`| Critical | ${summary.byImpact.critical} |`);
  lines.push(`| Serious | ${summary.byImpact.serious} |`);
  lines.push(`| Moderate | ${summary.byImpact.moderate} |`);
  lines.push(`| Minor | ${summary.byImpact.minor} |`);
  lines.push('');

  // ── Cross-Theme Analysis section ──────────────────────────────────────────
  lines.push('## Cross-Theme Analysis');
  lines.push('');
  lines.push('Issues found across multiple Drupal themes. Universal issues affect ALL tested themes');
  lines.push('and are highest priority for core fixes since a single template change benefits everyone.');
  lines.push('');
  lines.push(`**Themes tested:** ${allThemeIds.join(', ') || 'none'}`);
  lines.push('');

  // Universal issues table.
  lines.push('### 🌐 Universal Issues (appear in ALL themes)');
  lines.push('');
  if (crossThemeUniversal.length === 0) {
    lines.push('_No universal issues found across all tested themes._');
  } else {
    lines.push('| Pattern ID | Rule | Impact | Screen | Themes | Summary |');
    lines.push('| :--- | :--- | :--- | :--- | :--- | :--- |');
    for (const g of crossThemeUniversal) {
      lines.push(`| \`${g.patternId}\` | \`${g.ruleId}\` | **${g.impact}** | ${g.screenType} | ${g.themes.join(', ')} | ${g.summary} |`);
    }
  }
  lines.push('');

  // Multi-theme issues.
  lines.push('### 🔗 Multi-Theme Issues (appear in 2+ themes)');
  lines.push('');
  if (crossThemeMulti.length === 0) {
    lines.push('_No multi-theme issues found._');
  } else {
    lines.push('| Pattern ID | Rule | Impact | Screen | Themes | Summary |');
    lines.push('| :--- | :--- | :--- | :--- | :--- | :--- |');
    for (const g of crossThemeMulti) {
      lines.push(`| \`${g.patternId}\` | \`${g.ruleId}\` | **${g.impact}** | ${g.screenType} | ${g.themes.join(', ')} | ${g.summary} |`);
    }
  }
  lines.push('');

  // Per-theme unique issues.
  lines.push('### 🎨 Theme-Specific Issue Counts');
  lines.push('');
  lines.push('| Theme | Unique Issues |');
  lines.push('| :--- | :--- |');
  for (const themeId of allThemeIds) {
    const count = (crossThemeSpecific[themeId] ?? []).length;
    lines.push(`| \`${themeId}\` | ${count} |`);
  }
  lines.push('');

  lines.push('## Issues (sorted by priority: impact × frequency)');
  lines.push('');
  lines.push('🔁 = Template-level issue (≥3 pages) — fix once, improves many pages.');
  lines.push('');

  for (const issue of bugsJson.issues) {
    const isTemplate = issue.isTemplateLevelIssue;
    lines.push(`---`);
    lines.push('');
    lines.push(`### ${issue.priority}. ${issue.summary} ${isTemplate ? '🔁' : ''}`);
    lines.push('');
    lines.push('| Field | Value |');
    lines.push('| :--- | :--- |');
    lines.push(`| **ID** | \`${issue.id}\` |`);
    lines.push(`| **Pattern ID** | \`${issue.pattern_id}\` *(stable hash — use to track regressions)* |`);
    lines.push(`| **Theme** | \`${issue.theme}\` |`);
    lines.push(`| **Rule** | [\`${issue.rule_id}\`](${issue.axe_url}) |`);
    lines.push(`| **Impact** | **${issue.impact}** |`);
    lines.push(`| **Screen** | ${issue.screen} |`);
    lines.push(`| **WCAG SC** | [${issue.wcag_sc} ${issue.wcag_name}](${issue.wcag_url}) (Level ${issue.wcag_level}) |`);
    lines.push(`| **Frequency** | ${issue.frequency.pages_affected} of ${issue.frequency.total_pages_scanned} pages (${issue.frequency.percentage}%) |`);
    lines.push(`| **Template-level** | ${isTemplate ? '✅ YES — fix once fixes all affected pages' : 'No'} |`);
    lines.push(`| **Likely template** | \`${issue.likely_template}\` — ${issue.template_hint} |`);
    lines.push(`| **Drupal file(s)** | ${issue.drupal_file.replace(/\n\s+/g, ', ')} |`);
    if (issue.drupal_issue) {
      lines.push(`| **Drupal issue** | ${issue.drupal_issue} |`);
    }
    lines.push(`| **Affected users** | ${issue.impact_groups.join(', ')} |`);
    lines.push('');

    lines.push('**Affected pages:**');
    for (const pg of issue.affected_pages) {
      lines.push(`- [\`${pg.path}\`](${pg.url}) — ${pg.name} \`[${pg.instanceId}]\``);
    }
    lines.push('');

    lines.push('**Selector:**');
    lines.push('```css');
    lines.push(issue.selector);
    lines.push('```');
    lines.push('');

    lines.push('**XPath:**');
    lines.push('```');
    lines.push(issue.xpath);
    lines.push('```');
    lines.push('');

    lines.push('**HTML snippet:**');
    lines.push('```html');
    lines.push(issue.html_snippet ?? '');
    lines.push('```');
    lines.push('');

    if (issue.expected_behaviour) {
      lines.push(`**Expected behaviour:** ${issue.expected_behaviour}`);
      lines.push('');
    }
    if (issue.actual_behaviour) {
      lines.push(`**Actual behaviour:** ${issue.actual_behaviour}`);
      lines.push('');
    }

    lines.push('**Suggested fix:**');
    lines.push('```');
    lines.push(issue.suggested_fix);
    lines.push('```');
    lines.push('');

    lines.push('**Steps to reproduce:**');
    for (const step of issue.steps_to_reproduce) {
      lines.push(`1. ${step}`);
    }
    lines.push('');
  }

  fs.writeFileSync(MD_OUTPUT, lines.join('\n'));
  fs.writeFileSync(MD_LATEST, lines.join('\n'));
  console.log(`✅ Markdown report written to ${MD_OUTPUT}`);
  console.log('');
  console.log('📊 Summary:');
  console.log(`   ${summary.totalPagesCrawled} pages crawled`);
  console.log(`   ${summary.uniquePatterns} unique patterns found`);
  console.log(`   ${summary.templateLevelPatterns} template-level patterns (≥3 pages)`);
  console.log(`   Critical: ${summary.byImpact.critical} | Serious: ${summary.byImpact.serious} | Moderate: ${summary.byImpact.moderate} | Minor: ${summary.byImpact.minor}`);
  console.log('');
  console.log('📁 Output files:');
  console.log(`   ${BUGS_JSON_OUTPUT}`);
  console.log(`   ${BUGS_JSON_LATEST} (latest)`);
  console.log(`   ${BUGS_CSV_OUTPUT}`);
  console.log(`   ${BUGS_CSV_LATEST} (latest)`);
  console.log(`   ${MD_OUTPUT}`);
  console.log(`   ${MD_LATEST} (latest)`);
}

main();
