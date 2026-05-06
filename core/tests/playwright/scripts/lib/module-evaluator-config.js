/**
 * Module Evaluator Configuration
 *
 * Defines modules to test and their test cases.
 * Each module specifies: pages to test, elements to capture, and expectations.
 */

'use strict';

module.exports = {
  'inline_form_errors': {
    name: 'Inline Form Errors',
    description: 'Form errors displayed inline next to fields instead of at top',
    url: 'https://www.drupal.org/docs/8/core/modules/inline-form-errors/inline-form-errors-module-overview',
    wcag: ['1.3.1', '3.3.1', '3.3.3'],
    wcagCriteria: [
      '1.3.1 Info and Relationships (Level A) — Error associations',
      '3.3.1 Error Identification (Level A) — Identify form errors',
      '3.3.3 Error Suggestion (Level AA) — Suggest corrections',
    ],
    testCases: [
      {
        name: 'User registration form validation',
        url: '/user/register',
        selectors: [
          'form.user-register-form',
          '[role="alert"]',
          '.form-item--error',
        ],
        description: 'Submit form with invalid data to trigger errors',
        action: async (page) => {
          // Fill form with invalid data
          await page.fill('input[name="name"]', 'ab'); // too short
          await page.fill('input[name="mail"]', 'invalid-email'); // invalid email
          await page.fill('input[name="pass[pass1]"]', 'short');
          await page.fill('input[name="pass[pass2]"]', 'short');
          // Submit form
          await page.click('input[type="submit"]');
          await page.waitForLoadState('networkidle');
        },
      },
      {
        name: 'Node edit form validation',
        url: '/node/add/article',
        selectors: [
          'form.node-form',
          '[role="alert"]',
          '.form-item--error',
          'input[name="title[0][value]"]',
          'textarea[name="body[0][value]"]',
        ],
        description: 'Submit form with missing required fields',
        action: async (page) => {
          // Don't fill required fields, just submit
          const button = await page.$('input[type="submit"][value*="Save"]');
          if (button) {
            await button.click();
            await page.waitForLoadState('networkidle');
          }
        },
      },
      {
        name: 'Inline form elements (modal/popover)',
        url: '/admin/structure/types',
        selectors: [
          '.form-item',
          '.form-item--error',
          '[role="alert"]',
          'label',
        ],
        description: 'Admin form with potential inline errors',
        action: async (page) => {
          // This page has forms; if errors appear, they should be accessible
        },
      },
      {
        name: 'Multi-step form (if available)',
        url: '/admin/config/system/site-information',
        selectors: [
          'form',
          '.form-item--error',
          '[role="alert"]',
          'input[type="submit"]',
        ],
        description: 'Configuration form that may trigger validation errors',
        action: async (page) => {
          // Navigate to page and check form accessibility
        },
      },
    ],
  },

  // Template for adding more modules
  // 'module_name': {
  //   name: 'Module Display Name',
  //   description: 'What the module does',
  //   url: 'Documentation URL',
  //   wcag: ['1.3.1', '3.3.1'],
  //   wcagCriteria: ['WCAG criterion descriptions'],
  //   testCases: [
  //     {
  //       name: 'Test case name',
  //       url: '/path/to/page',
  //       selectors: ['css', 'selectors'],
  //       description: 'What we are testing',
  //       action: async (page) => {
  //         // Actions to trigger errors or state changes
  //       }
  //     }
  //   ]
  // }
};
