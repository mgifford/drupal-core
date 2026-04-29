# Drupal Core Keyboard Navigation Review

> **Generated:** 2026-04-29T13:45:21.245Z
> **Method:** Playwright keyboard-only tab sampling with real key presses
> **Base URL:** https://drupal-core.ddev.site

## Summary

| Metric | Value |
| :--- | :--- |
| Pages reviewed | 20 |
| Pages with failures | 2 |
| Pages with warnings | 0 |
| Total failure findings | 2 |
| Total warning findings | 0 |

## Priority Findings

### User register (/user/register)

- URL: https://drupal-core.ddev.site/user/register
- HTTP status: 403
- Unique focus targets sampled: 5
- Failures:
  - Page returned unexpected status: 403
- Focus sequence sample:
  - Step 1: a.visually-hidden.focusable [Skip to main content] (visible-focus evidence)
  - Step 2: a.language-link [English] (visible-focus evidence)
  - Step 3: a.language-link [Hebrew] (visible-focus evidence)
  - Step 4: select#edit-preferred-theme.form-select.form-element [Use default
                Olivero
                Claro
  ] (visible-focus evidence)
  - Step 5: body (no visible-focus evidence)
  - Step 6: a.visually-hidden.focusable [Skip to main content] (visible-focus evidence)
  - Step 7: a.language-link [English] (visible-focus evidence)
  - Step 8: a.language-link [Hebrew] (visible-focus evidence)

### 404 page (/this-page-does-not-exist)

- URL: https://drupal-core.ddev.site/this-page-does-not-exist
- HTTP status: 404
- Unique focus targets sampled: 5
- Failures:
  - Page returned unexpected status: 404
- Focus sequence sample:
  - Step 1: a.visually-hidden.focusable [Skip to main content] (visible-focus evidence)
  - Step 2: a.language-link [English] (visible-focus evidence)
  - Step 3: a.language-link [Hebrew] (visible-focus evidence)
  - Step 4: select#edit-preferred-theme.form-select.form-element [Use default
                Olivero
                Claro
  ] (visible-focus evidence)
  - Step 5: body (no visible-focus evidence)
  - Step 6: a.visually-hidden.focusable [Skip to main content] (visible-focus evidence)
  - Step 7: a.language-link [English] (visible-focus evidence)
  - Step 8: a.language-link [Hebrew] (visible-focus evidence)

## Review Notes

- This report is intended for manual triage and regression tracking.
- Findings should be confirmed with targeted component-level keyboard tests for critical workflows.
- Recommended follow-up: add hard-gate keyboard specs for recurring failures.
