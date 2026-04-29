console.log('DEBUG: analyze-patterns.js script starting...');
console.log('DEBUG: About to call main()');
// --- Advanced Deduplication: Merge by Rule + Fuzzy Summary ---
function mergeByRuleAndSummary(patterns, summaryThreshold = 12) {
  const merged = [];
  const used = new Set();
  for (let i = 0; i < patterns.length; i++) {
    if (used.has(i)) continue;
    const base = patterns[i];
    base.mergedSummaries = [base.summary];
    base.mergedSelectors = [base.selectorKey];
    for (let j = i + 1; j < patterns.length; j++) {
      if (used.has(j)) continue;
      const candidate = patterns[j];
      if (base.ruleId === candidate.ruleId) {
        const dist = levenshtein((base.summary||'').toLowerCase(), (candidate.summary||'').toLowerCase());
        if (dist <= summaryThreshold) {
          // Merge candidate into base
          base.pages.push(...candidate.pages);
          base.conditions.push(...candidate.conditions);
          base.mergedSummaries.push(candidate.summary);
          base.mergedSelectors.push(candidate.selectorKey);
          used.add(j);
        }
      }
    }
    // Deduplicate merged pages/conditions/selectors/summaries
    base.pages = base.pages.filter((v,i,a) => a.findIndex(t => t.instanceId === v.instanceId) === i);
    base.conditions = [...new Set(base.conditions)];
    base.mergedSummaries = [...new Set(base.mergedSummaries)];
    base.mergedSelectors = [...new Set(base.mergedSelectors)];
    merged.push(base);
  }
  return merged;
}

'use strict';
const fs = require('fs');
const crypto = require('crypto');
const yaml = require('js-yaml');

'use strict';

// --- PATCH END ---
const path = require('path');

// Root-level /reports directory — one level above the repo's core/ directory.
// Resolves from: core/tests/playwright/scripts/ → ../../../../reports/
const REPORTS_DIR = path.resolve(__dirname, '../../../../reports');
const INPUT_FILE = path.join(REPORTS_DIR, 'axe-results.json');
const REPORT_BASE_URL = process.env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';
const TRUSTED_RESOURCES_FILE = path.resolve(__dirname, '../config/trusted-resources.yaml');
// Optional local submodule containing rule-specific remediation examples.
const PURPLE_AI_RESULTS_DIR = path.resolve(__dirname, '../../../../tools/purple-ai/results');
// Canonical Drupal core Accessibility queue search page.
const DRUPAL_A11Y_QUEUE_URL = 'https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility';

// Date-stamped outputs so each scan is independently reviewable (LOCAL time).
const pad = (n) => n.toString().padStart(2, '0');
const now = new Date();
const DATE_STAMP = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`; // YYYY-MM-DD
const AXE_RULE_DOC_VERSION = '4.11';
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
const FUZZY_SELECTOR_THRESHOLD = 6;

const IMPACT_ORDER = { critical: 0, serious: 1, moderate: 2, minor: 3, null: 4 };

function humanReadableOs(platform) {
  switch (platform) {
    case 'darwin':
      return 'macOS';
    case 'win32':
      return 'Windows';
    case 'linux':
      return 'Linux';
    default:
      return platform || 'unknown';
  }
}

function loadTrustedResources() {
  if (!fs.existsSync(TRUSTED_RESOURCES_FILE)) {
    return { default: [], rules: {} };
  }

  try {
    const parsed = yaml.load(fs.readFileSync(TRUSTED_RESOURCES_FILE, 'utf8'));
    return {
      default: Array.isArray(parsed?.default) ? parsed.default : [],
      rules: (parsed && typeof parsed.rules === 'object' && parsed.rules !== null) ? parsed.rules : {},
    };
  }
  catch (error) {
    console.warn(`⚠️ Could not parse trusted resources YAML: ${error.message}`);
    return { default: [], rules: {} };
  }
}

function trustedResourcesForRule(trustedResources, ruleId) {
  const globalResources = Array.isArray(trustedResources?.default) ? trustedResources.default : [];
  const ruleResources = Array.isArray(trustedResources?.rules?.[ruleId]) ? trustedResources.rules[ruleId] : [];
  const seen = new Set();
  return [...globalResources, ...ruleResources]
    .filter((entry) => entry && entry.title && entry.url)
    .map((entry) => ({ title: String(entry.title), url: String(entry.url) }))
    .filter((entry) => {
      if (seen.has(entry.url)) {
        return false;
      }
      seen.add(entry.url);
      return true;
    });
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;

  const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

function mergeSimilarPatterns(patterns, selectorThreshold = FUZZY_SELECTOR_THRESHOLD) {
  const merged = [];
  const used = new Set();

  for (let i = 0; i < patterns.length; i++) {
    if (used.has(i)) continue;

    const base = patterns[i];
    for (let j = i + 1; j < patterns.length; j++) {
      if (used.has(j)) continue;

      const candidate = patterns[j];
      if (base.ruleId !== candidate.ruleId) continue;

      const distance = levenshtein(base.selectorKey || '', candidate.selectorKey || '');
      if (distance > selectorThreshold) continue;

      base.pages.push(...candidate.pages);
      base.conditions.push(...candidate.conditions);
      base.mergedSelectors = [...new Set([...(base.mergedSelectors || [base.selectorKey]), candidate.selectorKey])];
      used.add(j);
    }

    base.pages = base.pages.filter((v, idx, arr) => arr.findIndex((t) => t.instanceId === v.instanceId) === idx);
    base.conditions = [...new Set(base.conditions)];
    merged.push(base);
  }

  return merged;
}

// ─── Screen / mode helpers ───────────────────────────────────────────────────

/** Infer screen type from viewport width stored in axe-results.json. */
function getScreenType(viewport) {
  return viewport && viewport.width <= 768 ? 'mobile' : 'desktop';
}

/**
 * Format an array of "themeId::colorScheme" condition strings into a human-readable
 * summary grouped by base theme.
 *
 * Example input:  ['admin::dark', 'admin::light', 'claro::dark', 'claro::light', 'olivero::light']
 * Example output: 'admin (light, dark), claro (light, dark), olivero (light)'
 */
/**
 * Format conditions array into a human-readable summary grouped by base theme.
 *
 * Conditions format: "themeId::colorScheme::screenType"
 * Example input:  ['admin::dark::desktop', 'admin::light::desktop', 'claro::light::mobile']
 * Example output: '`admin` (dark desktop, light desktop), `claro` (light mobile)'
 */
function formatConditions(conditions) {
  if (!conditions || conditions.length === 0) return 'unknown';
  const byTheme = {};
  for (const c of conditions) {
    const [theme, scheme, screen] = c.split('::');
    const baseTheme = theme.replace(/-dark$/, '');
    if (!byTheme[baseTheme]) byTheme[baseTheme] = new Set();
    byTheme[baseTheme].add(`${scheme ?? 'light'} ${screen ?? 'desktop'}`);
  }
  return Object.entries(byTheme)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([theme, modes]) => `\`${theme}\` (${[...modes].sort().join(', ')})`)
    .join(', ');
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

function generatePatternId(selectorKey, ruleId) {
  // screenType intentionally excluded: desktop and mobile are the same bug.
  // Theme/colorScheme also excluded: they go in conditions.
  return `DRU-${md5Short([selectorKey, ruleId].join('|'))}`;
}

function generateInstanceId(pagePath, selectorKey, ruleId, screenType) {
  // Stable per page+rule+selector+screen. Theme/colorScheme intentionally excluded:
  // conditions are tracked at the pattern level, not per page occurrence.
  return `INS-${md5Short([pagePath, selectorKey, ruleId, screenType].join('|'))}`;
}

// ─── Axe rule → WCAG SC mapping ──────────────────────────────────────────────

// ─── ARRM/W3C-Inspired Accessibility Category Mapping ─────────────────────────
// Maps axe rule IDs to ARRM/W3C task-based categories for report grouping.
// See: https://www.w3.org/WAI/planning/arrm/tasks/
const RULE_ARRM_CATEGORY = {
  // Images and Graphs
  'image-alt': 'Images and Graphs',
  'svg-img-alt': 'Images and Graphs',
  'object-alt': 'Images and Graphs',
  'area-alt': 'Images and Graphs',
  'role-img-alt': 'Images and Graphs',

  // Semantic Structure
  'region': 'Semantic Structure',
  'landmark-contentinfo-is-top-level': 'Semantic Structure',
  'landmark-no-duplicate-contentinfo': 'Semantic Structure',
  'landmark-unique': 'Semantic Structure',
  'heading-order': 'Semantic Structure',
  'page-has-heading-one': 'Semantic Structure',
  'empty-heading': 'Semantic Structure',
  'listitem': 'Semantic Structure',
  'list': 'Semantic Structure',
  'definition-list': 'Semantic Structure',
  'dlitem': 'Semantic Structure',

  // Input Modalities
  'tabindex': 'Input Modalities',
  'target-size': 'Input Modalities',
  'scrollable-region-focusable': 'Input Modalities',
  'meta-viewport': 'Input Modalities',

  // Form Interactions
  'label': 'Form Interactions',
  'label-title-only': 'Form Interactions',
  'input-button-name': 'Form Interactions',
  'button-name': 'Form Interactions',
  'select-name': 'Form Interactions',
  'form-field-multiple-labels': 'Form Interactions',

  // CSS and Presentation
  'color-contrast': 'CSS and Presentation',
  'meta-refresh': 'CSS and Presentation',
  'bypass': 'CSS and Presentation',

  // Navigation
  'skip-link': 'Navigation',
  'link-in-text-block': 'Navigation',
  'link-name': 'Navigation',
  'breadcrumb': 'Navigation', // not an axe rule, but for future custom rules

  // Data Tables
  'empty-table-header': 'Data Tables',
  'table-duplicate-name': 'Data Tables',
  'table-fake-caption': 'Data Tables',
  'td-headers-attr': 'Data Tables',
  'th-has-data-cells': 'Data Tables',

  // Animation and Movement
  // (axe does not directly test animation, but placeholder for future custom rules)

  // Static Content
  'document-title': 'Static Content',
  'html-has-lang': 'Static Content',
  'html-lang-valid': 'Static Content',
  'valid-lang': 'Static Content',

  // Dynamic Interactions
  'aria-allowed-attr': 'Dynamic Interactions',
  'aria-command-name': 'Dynamic Interactions',
  'aria-hidden-body': 'Dynamic Interactions',
  'aria-hidden-focus': 'Dynamic Interactions',
  'aria-input-field-name': 'Dynamic Interactions',
  'aria-meter-name': 'Dynamic Interactions',
  'aria-progressbar-name': 'Dynamic Interactions',
  'aria-required-attr': 'Dynamic Interactions',
  'aria-required-children': 'Dynamic Interactions',
  'aria-required-parent': 'Dynamic Interactions',
  'aria-roles': 'Dynamic Interactions',
  'aria-toggle-field-name': 'Dynamic Interactions',
  'aria-valid-attr': 'Dynamic Interactions',
  'aria-valid-attr-value': 'Dynamic Interactions',
  'duplicate-id-active': 'Dynamic Interactions',
  'duplicate-id-aria': 'Dynamic Interactions',
  'frame-focusable-content': 'Dynamic Interactions',
  'frame-title': 'Dynamic Interactions',
  'server-side-image-map': 'Dynamic Interactions',
  'landmark-banner-is-top-level': 'Dynamic Interactions',
  'landmark-complementary-is-top-level': 'Dynamic Interactions',
  'landmark-main-is-top-level': 'Dynamic Interactions',
  'landmark-no-duplicate-banner': 'Dynamic Interactions',
  'landmark-no-duplicate-main': 'Dynamic Interactions',
  'landmark-one-main': 'Dynamic Interactions',

  // Add more as needed for future rules
};

// Fallback for unmapped rules
function getCategory(ruleId) {
  return RULE_ARRM_CATEGORY[ruleId] || 'Other Accessibility Issues';
}
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

/**
 * Normalise a CSS selector into a stable pattern key.
 *
 * Axe returns element-specific IDs like `#edit-imagefile-file-limited-0-display`
 * which differ only by cardinality index (0, 1, 2 ...) or Drupal delta suffixes.
 * Without normalisation each numbered element becomes a separate pattern even
 * though they share one template and one fix.
 *
 * Rules applied:
 *  - `[0]` -> `[N]`  (Drupal field cardinality in name attributes)
 *  - `-0-` in the middle of an id -> `-N-`
 *  - Trailing `-0` at end of id -> `-N`
 */

// Enhanced normalization: collapse hashes, UUIDs, and numeric fragments
function normaliseSelectorForKey(raw) {
  return raw
    .replace(/\[\d+\]/g, '[N]') // [0] → [N]
    .replace(/-(\d+)-/g, '-N-')   // -0- → -N-
    .replace(/-(\d+)$/g, '-N')    // -0 at end → -N
    .replace(/[a-f0-9]{8,}/gi, '[HASH]') // long hex strings (UUIDs, hashes)
    .replace(/([a-zA-Z]+)[-_][0-9]+/g, '$1-N') // class/id with trailing numbers
    .replace(/data-uuid="[^"]+"/g, 'data-uuid="[ID]"') // data-uuid attr
    .replace(/id="[^"]+"/g, 'id="[ID]"'); // id attr
}

function selectorKey(node) {
  const raw = (node.target ?? []).join(' >> ');
  return normaliseSelectorForKey(raw);
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

function escapeMarkdownInline(val) {
  if (val === null || val === undefined) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function toProjectSeverity(axeImpact) {
  switch (axeImpact) {
    case 'critical':
      return 'Critical';
    case 'serious':
      return 'High';
    case 'moderate':
      return 'Medium';
    case 'minor':
      return 'Low';
    default:
      return 'Medium';
  }
}

function dequeRuleUrl(ruleId) {
  return `https://dequeuniversity.com/rules/axe/${AXE_RULE_DOC_VERSION}/${ruleId}`;
}

/**
 * Return rule-specific Purple-AI references when available.
 * Falls back to a repo-level link when no rule JSON exists.
 */
function purpleAiReference(ruleId) {
  const ruleFile = `${ruleId}.json`;
  const localRulePath = path.join(PURPLE_AI_RESULTS_DIR, ruleFile);

  if (!fs.existsSync(localRulePath)) {
    return null;
  }

  return {
    repo: 'https://github.com/GovTechSG/purple-ai',
    ruleFile,
    ruleUrl: `https://github.com/GovTechSG/purple-ai/blob/main/results/${ruleFile}`,
  };
}

function drupalIssueSearchUrl(ruleId, summary) {
  const searchText = encodeURIComponent(`${ruleId} ${summary ?? ''}`.trim());
  return `https://www.drupal.org/project/issues/search?text=${searchText}&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility`;
}

function isNewDrupalIssueLink(url) {
  return typeof url === 'string' && /\/issues\/new\/?$/i.test(url);
}

function inferInteractionHint(selectorKey, routes) {
  const selector = String(selectorKey || '').toLowerCase();
  const routeText = Array.isArray(routes) ? routes.join(' ').toLowerCase() : '';
  const haystack = `${selector} ${routeText}`;

  if (/(dialog|modal|off-canvas|offcanvas)/.test(haystack)) {
    return 'This issue may require opening a dialog/off-canvas panel before running axe.';
  }
  if (/(dropdown|dropbutton|accordion|popover|tooltip|menu|tabs)/.test(haystack)) {
    return 'This issue may require expanding or activating interactive UI elements before running axe.';
  }
  if (/(autocomplete|typeahead|tabledrag)/.test(haystack)) {
    return 'This issue may require interaction state (typing/dragging/focus) to expose the failing element.';
  }

  return null;
}

/**
 * Collapse dynamic URL segments so issue instances dedupe by template route.
 * Examples: /node/123 -> /node/[nid], /user/45/edit -> /user/[id]/edit
 */
function generalizePath(routePath) {
  if (!routePath || routePath === '/') return '/';

  return routePath
    // Keep query strings out of the route fingerprint.
    .split('?')[0]
    // Common Drupal numeric entity IDs.
    .replace(/^\/node\/\d+(?=\/|$)/, '/node/[nid]')
    .replace(/^\/user\/\d+(?=\/|$)/, '/user/[id]')
    .replace(/^\/taxonomy\/term\/\d+(?=\/|$)/, '/taxonomy/term/[tid]')
    // Generic UUID-like segments.
    .replace(/[0-9a-f]{8}-[0-9a-f-]{27,}/gi, '[uuid]')
    // Fallback: collapse remaining standalone numeric segments.
    .replace(/\/(\d+)(?=\/|$)/g, '/[id]');
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
  console.log('DEBUG: Entered main()');

  const trustedResources = loadTrustedResources();

  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ ${INPUT_FILE} not found. Run 'yarn test:a11y:playwright' first.`);
    process.exit(1);
  }
  console.log('DEBUG: INPUT_FILE exists:', INPUT_FILE);
  const rawResults = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  console.log('DEBUG: Read rawResults, count:', rawResults.length);
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
    const colorScheme = pageResult.colorScheme ?? 'light';

    for (const violation of pageResult.violations) {
      for (const node of violation.nodes) {
        const selKey = selectorKey(node);

        // Extract parent tag and ARIA role for context (if available)
        let parentTag = '';
        let parentRole = '';
        if (node && node.ancestry && node.ancestry.length > 0) {
          const parent = node.ancestry[node.ancestry.length - 1];
          parentTag = parent.tagName ? parent.tagName.toLowerCase() : '';
          parentRole = parent.role ? parent.role.toLowerCase() : '';
        }
        const parentContext = parentTag || parentRole ? `${parentTag}:${parentRole}` : '';
        // Key on rule + selector + parent context
        const key = `${violation.id}::${selKey}::${parentContext}`;
        const conditionKey = `${themeId}::${colorScheme}::${screenType}`;

        if (!patternMap.has(key)) {
          const drupalFix = getDrupalFix(violation.id, selKey, node.html ?? '');
          const wcag = RULE_WCAG[violation.id] ?? { sc: 'unknown', level: '?', name: 'See axe docs' };
          const xpath = cssToXpath(Array.isArray(node.target) ? node.target[0] : node.target);
          const patternId = generatePatternId(selKey, violation.id);

          patternMap.set(key, {
            patternId,
            ruleId: violation.id,
            // conditions: Set of "themeId::colorScheme::screenType" strings seen for this pattern.
            // Converted to sorted array before output.
            conditions: new Set(),
            impact: violation.impact,
            description: violation.description,
            helpUrl: violation.helpUrl,
            selector: node.target,
            selectorKey: selKey,
            parentContext,
            html: node.html,
            failureSummary: node.failureSummary,
            xpath,
            wcag,
            impactGroups: RULE_IMPACT_GROUPS[violation.id] ?? ['users with disabilities'],
            drupalFix,
            templateHint: inferTemplate(node.target),
            pages: [],
            concretePaths: new Set(),
          });
        }

        patternMap.get(key).conditions.add(conditionKey);
        patternMap.get(key).concretePaths.add(pageResult.path);

        // Deduplicate pages by generalized route pattern + screenType
        const pat = patternMap.get(key);
        const generalizedPath = generalizePath(pageResult.path);
        const pageKey = `${generalizedPath}::${screenType}`;
        if (!pat.pages.some((pg) => pg._pageKey === pageKey)) {
          const instanceId = generateInstanceId(generalizedPath, selKey, violation.id, screenType);
          pat.pages.push({
            instanceId,
            name: pageResult.page,
            path: generalizedPath,
            url: `${REPORT_BASE_URL}${generalizedPath}`,
            screen: screenType,
            viewport: pageResult.viewport ?? { width: 1280, height: 800 },
            _pageKey: pageKey,
          });
        }
      }
    }
  }

  // ── Sort, filter, and finalise ──────────────────────────────────────────
  // Convert conditions Sets to sorted arrays and strip internal _pageKey field.
  for (const p of patternMap.values()) {
    p.conditions = [...p.conditions].sort();
    p.concretePaths = [...p.concretePaths].sort();
    for (const pg of p.pages) {
      delete pg._pageKey;
    }
  }


  let patterns = Array.from(patternMap.values())
    .filter((p) => p.pages.length >= MIN_PAGES)
    .sort((a, b) => priorityScore(a) - priorityScore(b));

  // Secondary fuzzy merge for similar selectors
  patterns = mergeSimilarPatterns(patterns, FUZZY_SELECTOR_THRESHOLD);

  // Advanced deduplication: merge by rule + fuzzy summary
  patterns = mergeByRuleAndSummary(patterns, 12); // threshold can be tuned

  // ── Cross-condition analysis ──────────────────────────────────────────────
  // Since patterns are now keyed without theme/colorScheme, each pattern already
  // has a `conditions` array listing which theme×colorScheme combos triggered it.
  // We derive distinct theme IDs from conditions for the cross-theme summary tables.

  // Collect all unique base theme IDs (strip -dark suffix) and full condition IDs.
  const allConditionIds = [...new Set(patterns.flatMap((p) => p.conditions))];
  const allThemeIds = [...new Set(allConditionIds.map((c) => c.split('::')[0]))];
  const themeCount = allThemeIds.length || 1;

  // Build cross-theme groups: group patterns by how many distinct base themes they appear in.
  const crossThemeUniversal = [];
  const crossThemeMulti = [];
  const crossThemeSpecific = {}; // keyed by base theme id

  for (const p of patterns) {
    const baseThemes = [...new Set(p.conditions.map((c) => c.split('::')[0]))];
    const entry = {
      patternId: p.patternId,
      ruleId: p.ruleId,
      selectorKey: p.selectorKey,
      impact: p.impact,
      summary: p.drupalFix?.summary ??
        `${p.ruleId}: ${p.description.slice(0, 80)}`,
      themes: baseThemes,
      conditions: p.conditions,
      themeCount: baseThemes.length,
    };

    if (baseThemes.length >= themeCount) {
      crossThemeUniversal.push(entry);
    } else if (baseThemes.length >= 2) {
      crossThemeMulti.push(entry);
    } else {
      const themeId = baseThemes[0];
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
      os: humanReadableOs(process.platform),
      tool: 'axe-core via @axe-core/playwright',
      baseUrl: REPORT_BASE_URL,
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
      pattern_id: p.patternId,          // stable hash: rule + selector (no theme/screen)
      priority: i + 1,
      conditions: p.conditions,
      isTemplateLevelIssue: p.pages.length >= 3,
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
      axe_rule_url: dequeRuleUrl(p.ruleId),
      frequency: {
        pages_affected: p.pages.length,
        total_pages_scanned: totalPages,
        percentage: Math.round((p.pages.length / totalPages) * 100),
      },
      severity: toProjectSeverity(p.impact),
      // Each page instance has its own stable instance_id for regression tracking.
      affected_pages: p.pages,
      affected_urls: p.concretePaths.map((routePath) => `${REPORT_BASE_URL}${routePath}`),
      affected_routes: p.concretePaths,
      selector: p.selectorKey,
      xpath: p.xpath,
      html_snippet: p.html,
      failure_summary: p.failureSummary,
      likely_template: p.templateHint.template,
      template_hint: p.templateHint.hint,
      parent_context: p.parentContext || '',
      drupal_file: p.drupalFix?.drupalFile ?? 'See likely_template above',
      expected_behaviour: p.drupalFix?.expected ?? null,
      actual_behaviour: p.drupalFix?.actual ?? null,
      suggested_fix: p.drupalFix?.fix ?? RULE_FALLBACK_FIX[p.ruleId] ?? 'See axe documentation.',
      drupal_issue: p.drupalFix?.drupalIssue ?? null,
      drupal_issue_search_url: drupalIssueSearchUrl(p.ruleId, p.drupalFix?.summary),
      drupal_a11y_queue_url: DRUPAL_A11Y_QUEUE_URL,
      purple_ai_reference: purpleAiReference(p.ruleId),
      trusted_resources: trustedResourcesForRule(trustedResources, p.ruleId),
      impact_groups: p.impactGroups,
      interaction_hint: inferInteractionHint(p.selectorKey, p.concretePaths),
      steps_to_reproduce: [
        `Go to ${REPORT_BASE_URL}${p.concretePaths[0] ?? '/'}`,
        `Use the matching context from Conditions: ${formatConditions(p.conditions)}`,
        'Open browser DevTools and run axe.run() in the Console.',
        `Confirm rule ${p.ruleId} on selector ${p.selectorKey}.`,
      ],
      environment: summary.environment,
    })),
  };

  fs.writeFileSync(BUGS_JSON_OUTPUT, JSON.stringify(bugsJson, null, 2));
  fs.writeFileSync(BUGS_JSON_LATEST, JSON.stringify(bugsJson, null, 2));
  console.log(`✅ Bug report written to ${BUGS_JSON_OUTPUT}`);
  console.log('DEBUG: Wrote bugsJson outputs');

  // ── bugs.csv — spreadsheet-friendly, one row per pattern ─────────────────
  const csvHeaders = [
    'Priority', 'ID', 'Pattern_ID', 'Conditions', 'Impact', 'WCAG_SC', 'WCAG_Level', 'WCAG_Name',
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
      issue.conditions.join(' | '),
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
  console.log('DEBUG: Wrote CSV outputs');

  // ── Legacy pattern-report.json ────────────────────────────────────────────
  fs.writeFileSync(JSON_OUTPUT, JSON.stringify({ summary, patterns }, null, 2));
  console.log('DEBUG: Wrote legacy pattern-report JSON');

  // ── PATTERN-REPORT.md — rich human-readable report (by broad category) ──
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

  // ── Aggregated by Accessibility Category ────────────────────────────────
  lines.push('## Aggregated Accessibility Issues by Category');
  lines.push('');
  // Group issues by category
  const categoryMap = {};
  for (const issue of bugsJson.issues) {
    const cat = getCategory(issue.rule_id);
    if (!categoryMap[cat]) categoryMap[cat] = [];
    categoryMap[cat].push(issue);
  }
  for (const [cat, issues] of Object.entries(categoryMap)) {
    lines.push(`### ${cat}`);
    lines.push('');
    lines.push(`- **Total unique patterns:** ${issues.length}`);
    // List rules in this category
    const rules = [...new Set(issues.map(i => i.rule_id))];
    lines.push(`- **Rules:** ${rules.map(r => '`' + r + '`').join(', ')}`);
    // List all issue summaries with complete affected routes.
    lines.push('');
    for (const issue of issues) {
      lines.push(`  - ${issue.summary}`);
      if (issue.affected_routes && issue.affected_routes.length > 0) {
        lines.push(`    - Affected routes (full list): ${issue.affected_routes.join(', ')}`);
      }
    }
    lines.push('');
  }

  lines.push('## Reproducible Issue Details');
  lines.push('');

  for (const issue of bugsJson.issues) {
    lines.push(`### ${issue.id}: ${issue.summary}`);
    lines.push('');
    lines.push(`**Pattern ID:** ${issue.pattern_id}`);
    lines.push(`**Rule:** axe-core - ${issue.rule_id}`);
    lines.push(`**Axe Rule URL:** ${issue.axe_rule_url || issue.axe_url}`);
    lines.push(`**Severity:** ${issue.severity} (axe impact: ${issue.impact})`);
    lines.push(`**WCAG SC:** ${issue.wcag_sc} - ${issue.wcag_name} (Level ${issue.wcag_level})`);
    lines.push(`**Frequency:** ${issue.frequency.pages_affected} of ${issue.frequency.total_pages_scanned} pages (${issue.frequency.percentage}%)`);
    lines.push(`**Selector:** ${issue.selector}`);
    lines.push(`**XPath:** ${issue.xpath || 'N/A'}`);
    lines.push(`**Parent Context:** ${issue.parent_context || 'N/A'}`);
    if (issue.likely_template && issue.likely_template !== 'unknown') {
      lines.push(`**Likely Template:** ${issue.likely_template}`);
      lines.push(`**Template Hint:** ${issue.template_hint || 'N/A'}`);
      lines.push(`**Drupal File:** ${issue.drupal_file || 'N/A'}`);
    }
    lines.push('');

    lines.push('**Affected URLs (full list):**');
    if (Array.isArray(issue.affected_urls) && issue.affected_urls.length > 0) {
      lines.push(`- ${issue.affected_urls[0]}`);
      if (Array.isArray(issue.affected_routes)) {
        for (let idx = 1; idx < issue.affected_routes.length; idx++) {
          lines.push(`- ${issue.affected_routes[idx]}`);
        }
      }
    }
    else {
      lines.push(`- ${issue.environment.baseUrl}/`);
    }
    lines.push('');

    lines.push('**Conditions:**');
    lines.push(`- ${formatConditions(issue.conditions)}`);
    lines.push('');

    lines.push('#### HTML Snippet');
    lines.push('```html');
    lines.push((issue.html_snippet || '').trim() || '<!-- N/A -->');
    lines.push('```');
    lines.push('');

    lines.push('#### Description');
    lines.push(issue.failure_summary || issue.summary);
    lines.push('');

    lines.push('#### Steps to Reproduce');
    if (issue.interaction_hint) {
      lines.push(`1. ${issue.interaction_hint}`);
      issue.steps_to_reproduce.forEach((step, idx) => {
        lines.push(`${idx + 2}. ${step}`);
      });
    }
    else {
      issue.steps_to_reproduce.forEach((step, idx) => {
        lines.push(`${idx + 1}. ${step}`);
      });
    }
    lines.push('');

    lines.push('#### Expected Behaviour');
    lines.push(issue.expected_behaviour || 'Element and interaction meet the mapped WCAG success criterion.');
    lines.push('');

    lines.push('#### Actual Behaviour');
    lines.push(issue.actual_behaviour || issue.failure_summary || issue.summary);
    lines.push('');

    lines.push('#### Impact');
    lines.push((issue.impact_groups && issue.impact_groups.length > 0)
      ? issue.impact_groups.join(', ')
      : 'Users impacted by this WCAG failure.');
    lines.push('');

    lines.push('#### Suggested Fix');
    lines.push(issue.suggested_fix || 'See axe rule guidance.');
    lines.push('');

    lines.push('#### Additional References');
    lines.push(`- Deque Axe Rule: ${issue.axe_rule_url || issue.axe_url}`);
    if (issue.wcag_url && issue.wcag_sc !== 'unknown') {
      lines.push(`- WCAG Understanding: ${issue.wcag_url}`);
    }
    if (Array.isArray(issue.trusted_resources)) {
      for (const resource of issue.trusted_resources) {
        lines.push(`- ${resource.title}: ${resource.url}`);
      }
    }
    if (issue.drupal_issue && !isNewDrupalIssueLink(issue.drupal_issue)) {
      lines.push(`- Known Drupal issue: ${issue.drupal_issue}`);
    }
    if (issue.drupal_issue && isNewDrupalIssueLink(issue.drupal_issue)) {
      lines.push(`- Create new Drupal issue: ${issue.drupal_issue}`);
    }
    lines.push(`- Search related Drupal accessibility issues: ${issue.drupal_issue_search_url}`);
    lines.push(`- Drupal core accessibility queue: ${issue.drupal_a11y_queue_url}`);
    if (issue.purple_ai_reference?.ruleUrl) {
      lines.push(`- Purple AI mapped fix examples: ${issue.purple_ai_reference.ruleUrl}`);
    }
    else {
      lines.push(`- Purple AI (repo): https://github.com/GovTechSG/purple-ai`);
    }
    lines.push('');

    lines.push('#### Testing Environment');
    lines.push(`- Browser: ${issue.environment.browser}`);
    lines.push(`- OS: ${issue.environment.os}`);
    lines.push(`- Tool: ${issue.environment.tool}`);
    lines.push(`- Base URL: ${issue.environment.baseUrl}`);
    lines.push('');

    lines.push('#### Tracking IDs');
    lines.push(`- Pattern ID: ${issue.pattern_id}`);
    lines.push(`- Instance IDs: ${issue.affected_pages.map((pg) => pg.instanceId).join(', ')}`);
    lines.push('');
  }

  // Add a deduplication summary section
  lines.push('---');
  lines.push('## Deduplication & Pattern Grouping');
  lines.push('');
  lines.push('- Patterns are merged by selector, parent context, and generalized route.');
  lines.push('- Similar selectors are merged using fuzzy logic.');
  lines.push('- Dynamic routes are collapsed (e.g., /node/1 → /node/[nid]).');
  lines.push('');

  // Always write the daily and latest markdown reports, even if content is unchanged.
  fs.writeFileSync(MD_OUTPUT, lines.join('\n'));
  fs.writeFileSync(MD_LATEST, lines.join('\n'));
  console.log(`✅ Markdown report written to ${MD_OUTPUT}`);
  console.log('DEBUG: Wrote markdown outputs');
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
console.log('DEBUG: main() has finished');
