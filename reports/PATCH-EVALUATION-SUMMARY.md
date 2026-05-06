# Patch Evaluation Batch Summary

**Generated:** 2026-05-06 at 5:27:34 p.m.

## Results

| Metric | Count |
|--------|-------|
| **Total patches** | 10 |
| **Passed** ✅ | 0 |
| **Failed** ❌ | 10 |
| **Error** ⚠️ | 0 |

**Pass rate:** 0.0%

---

## Patch Details

### PRIORITY 1

| Patch | Status | Reason | Instance Progress |
|-------|--------|--------|-------------------|
| `a11y-DRUPAL-A11Y-001-file-widget-display-labels` | ❌ FAIL | `no-baseline-instances-observed` | 0 fixed / 0 remaining / 1 not-observed |
| `a11y-DRUPAL-A11Y-002-submit-button-contrast` | ❌ FAIL | `patch-apply-error` | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-005-language-switcher-contrast` | ❌ FAIL | `patch-apply-error` | 0 fixed / 0 remaining / 0 not-observed |

### PRIORITY 2

| Patch | Status | Reason | Instance Progress |
|-------|--------|--------|-------------------|
| `a11y-DRUPAL-A11Y-006-theme-switcher-landmark` | ❌ FAIL | `patch-apply-error` | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-007-messages-landmark-role` | ❌ FAIL | `patch-apply-error` | 0 fixed / 0 remaining / 0 not-observed |

### PRIORITY 3

| Patch | Status | Reason | Instance Progress |
|-------|--------|--------|-------------------|
| `a11y-DRUPAL-A11Y-003-select-all-checkbox-label` | ❌ FAIL | `no-baseline-instances-observed` | 0 fixed / 0 remaining / 2 not-observed |
| `a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form` | ❌ FAIL | `no-baseline-instances-observed` | 0 fixed / 0 remaining / 1 not-observed |
| `a11y-DRUPAL-A11Y-008-empty-table-headers` | ❌ FAIL | `no-baseline-instances-observed` | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-009-module-summary-names` | ❌ FAIL | `patch-apply-error` | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-LABEL-IN-NAME-004-filter-format-aria-label` | ❌ FAIL | `patch-apply-error` | 0 fixed / 0 remaining / 0 not-observed |

---

## Recommendations

⚠️ **10 patches need attention:**

- `a11y-DRUPAL-A11Y-001-file-widget-display-labels`: no baseline instances observed on targeted URLs
  - Instance coverage: 0 fixed, 0 remaining, 1 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-001-file-widget-display-labels"
- `a11y-DRUPAL-A11Y-002-submit-button-contrast`: patch failed to apply
  - Instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-002-submit-button-contrast"
- `a11y-DRUPAL-A11Y-003-select-all-checkbox-label`: no baseline instances observed on targeted URLs
  - Instance coverage: 0 fixed, 0 remaining, 2 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-003-select-all-checkbox-label"
- `a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form`: no baseline instances observed on targeted URLs
  - Instance coverage: 0 fixed, 0 remaining, 1 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form"
- `a11y-DRUPAL-A11Y-005-language-switcher-contrast`: patch failed to apply
  - Instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-005-language-switcher-contrast"
- `a11y-DRUPAL-A11Y-006-theme-switcher-landmark`: patch failed to apply
  - Instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-006-theme-switcher-landmark"
- `a11y-DRUPAL-A11Y-007-messages-landmark-role`: patch failed to apply
  - Instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-007-messages-landmark-role"
- `a11y-DRUPAL-A11Y-008-empty-table-headers`: no baseline instances observed on targeted URLs
  - Instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-008-empty-table-headers"
- `a11y-DRUPAL-A11Y-009-module-summary-names`: patch failed to apply
  - Instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-009-module-summary-names"
- `a11y-LABEL-IN-NAME-004-filter-format-aria-label`: patch failed to apply
  - Instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-LABEL-IN-NAME-004-filter-format-aria-label"

Review detailed evaluation reports in the `patches/` directory.
