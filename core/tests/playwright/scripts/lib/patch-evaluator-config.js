/**
 * Patch Evaluator Configuration
 *
 * Maps patch files to the test cases that validate them.
 * Each patch entry includes:
 *   - urls: array of pages where the violation occurs
 *   - selectors: CSS selectors of the failing elements
 *   - rules: axe rules that should be fixed
 *   - wcag: WCAG criteria affected
 *   - description: what the patch fixes
 */

module.exports = {
  // Priority 1 patches
  'a11y-DRUPAL-A11Y-002-submit-button-contrast': {
    description: 'Fix primary button color contrast on admin yellow accent',
    wcag: ['1.4.3 (AA)'],
    rules: ['color-contrast'],
    testCases: [
      {
        url: '/admin/structure/types/add',
        selectors: ['#edit-save-continue', '#edit-submit'],
        expectedFix: 'color-contrast should pass after patch',
        viewport: { width: 1280, height: 1024 },
      },
      {
        url: '/admin/structure/taxonomy',
        selectors: ['.button--action', '#edit-submit'],
        expectedFix: 'color-contrast should pass after patch',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-DRUPAL-A11Y-001-file-widget-display-labels': {
    description: 'Add aria-label to file widget display checkboxes',
    wcag: ['1.3.1 (A)'],
    rules: ['label'],
    testCases: [
      {
        url: '/node/add/page',
        selectors: ['[name*="display"]'],
        expectedFix: 'Checkboxes should have accessible names',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-DRUPAL-A11Y-005-language-switcher-contrast': {
    description: 'Ensure language switcher links maintain WCAG AA contrast',
    wcag: ['1.4.3 (AA)'],
    rules: ['color-contrast'],
    testCases: [
      {
        url: '/admin/content',
        selectors: ['[class*="lang"]'],
        expectedFix: 'Language links should meet contrast ratio',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-DRUPAL-A11Y-006-theme-switcher-landmark': {
    description: 'Wrap theme switcher form in nav landmark',
    wcag: ['1.3.6 (AAA)'],
    rules: ['region'],
    testCases: [
      {
        url: '/admin/appearance',
        selectors: ['[id*="theme"]'],
        expectedFix: 'Theme form should be wrapped in landmark',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-DRUPAL-A11Y-007-messages-landmark-role': {
    description: 'Change messages role from contentinfo to status/alert',
    wcag: ['1.3.6 (AAA)'],
    rules: ['region', 'landmark-contentinfo-is-top-level'],
    testCases: [
      {
        url: '/admin/content',
        selectors: ['[role="contentinfo"]', '.messages'],
        expectedFix: 'Messages should have proper role and aria-live',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  // Priority 2 patches
  'a11y-DRUPAL-A11Y-003-select-all-checkbox-label': {
    description: 'Add aria-label to select-all checkboxes in tables',
    wcag: ['1.3.1 (A)'],
    rules: ['label', 'label-title-only'],
    testCases: [
      {
        url: '/admin/content',
        selectors: ['thead input[type="checkbox"]'],
        expectedFix: 'Select-all checkbox should have aria-label',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form': {
    description: 'Remove explicit tabindex from buttons on test form',
    wcag: ['2.1.1 (A)'],
    rules: ['tabindex'],
    testCases: [
      {
        url: '/buttons',
        selectors: ['button[tabindex]'],
        expectedFix: 'Buttons should not have explicit tabindex',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  // Priority 3 patches
  'a11y-DRUPAL-A11Y-008-empty-table-headers': {
    description: 'Add scope and labels to empty multifield table headers',
    wcag: ['1.3.1 (A)'],
    rules: ['empty-table-header'],
    testCases: [
      {
        url: '/node/add/page',
        selectors: ['table thead th'],
        expectedFix: 'Table headers should have scope attribute',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-DRUPAL-A11Y-009-module-summary-names': {
    description: 'Add aria-label to module details on /admin/modules',
    wcag: ['4.1.2 (A)'],
    rules: ['summary-name'],
    testCases: [
      {
        url: '/admin/modules',
        selectors: ['summary', 'details summary'],
        expectedFix: 'Module summaries should have accessible names',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-LABEL-IN-NAME-004-filter-format-aria-label': {
    description: 'Update aria-label from "Edit" to "Configure" for text formats',
    wcag: ['2.5.3 (A)'],
    rules: ['label-title-only'],
    testCases: [
      {
        url: '/admin/config/content/formats',
        selectors: ['[aria-label*="Edit"]'],
        expectedFix: 'aria-label should match visible text "Configure"',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },
};
