/**
 * @file
 * Patch Evaluation Configuration
 * 
 * Defines test cases for each accessibility patch, including:
 * - URL(s) to test
 * - CSS selectors to target
 * - Expected WCAG criteria and axe rules
 * - Viewport configurations
 */

'use strict';

module.exports = {
  'a11y-DRUPAL-A11Y-001-file-widget-display-labels': {
    description: 'Add aria-label to file widget display checkboxes',
    wcag: ['1.3.1 (A)'],
    rules: ['label'],
    testCases: [
      {
        url: '/contact/imagefile_file',
        selectors: ['[name*="display"]'],
        expectedFix: 'Checkboxes should have accessible names (aria-label)',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-DRUPAL-A11Y-002-submit-button-contrast': {
    description: 'Fix primary button color contrast on admin yellow accent',
    wcag: ['1.4.3 (AA)'],
    rules: ['color-contrast'],
    testCases: [
      {
        url: '/action-link',
        selectors: ['button', '.button'],
        expectedFix: 'color-contrast should pass after patch',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-DRUPAL-A11Y-003-select-all-checkbox-label': {
    description: 'Add aria-label to select-all checkboxes in tables',
    wcag: ['1.3.1 (A)'],
    rules: ['label', 'label-title-only'],
    testCases: [
      {
        url: '/admin/content',
        selectors: ['thead input[type="checkbox"]'],
        expectedFix: 'Select-all checkbox should have accessible name',
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
        expectedFix: 'Buttons should not have tabindex > 0',
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
        url: '/action-link',
        selectors: ['a', '[role="link"]'],
        expectedFix: 'Language switcher links should meet WCAG AA contrast',
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
        url: '/',
        selectors: ['main', 'nav', 'section'],
        expectedFix: 'Page content should be contained by landmarks',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-DRUPAL-A11Y-007-messages-landmark-role': {
    description: 'Wrap status messages in proper landmark with role',
    wcag: ['1.3.6 (AAA)'],
    rules: ['landmark-contentinfo-is-top-level'],
    testCases: [
      {
        url: '/admin/appearance',
        selectors: ['.messages', '[role="contentinfo"]'],
        expectedFix: 'Messages should not use contentinfo landmark',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-DRUPAL-A11Y-008-empty-table-headers': {
    description: 'Ensure all table headers have discernible text',
    wcag: ['1.3.1 (A)'],
    rules: ['empty-table-header'],
    testCases: [
      {
        url: '/admin/content',
        selectors: ['table th', 'thead th'],
        expectedFix: 'Table headers should have visible or accessible text',
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
        expectedFix: 'Module summary elements should have discernible text',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },

  'a11y-LABEL-IN-NAME-004-filter-format-aria-label': {
    description: 'Fix label-in-name violation for filter format configure link',
    wcag: ['2.5.3 (A)'],
    rules: ['label-in-name'],
    testCases: [
      {
        url: '/admin/config/content/formats',
        selectors: ['table a:has-text("Configure")'],
        expectedFix: 'aria-label must contain visible text "Configure"',
        viewport: { width: 1280, height: 1024 },
      },
    ],
  },
};
