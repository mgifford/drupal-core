# Patch Evaluation Batch Summary

**Generated:** 2026-05-07 at 8:16:33 a.m.
**Variant:** `desktop-landscape-dark-ltr`

## Results

| Metric | Count |
|--------|-------|
| **Total patches** | 10 |
| **Passed** ✅ | 0 |
| **Inconclusive** 🟨 | 3 |
| **Failed** ❌ | 7 |
| **Error** ⚠️ | 0 |

**Pass rate:** 0.0%

### Condition Coverage Captured

- **Screen types:** desktop
- **Orientations:** landscape
- **Color modes requested:** dark
- **Detected color schemes:** dark
- **Directionality:** ltr
- **Themes:** unknown
- **Forced colors:** none
- **Contrast preferences:** no-preference
- **Viewports:** 1440x1024

---

## Patch Details

### PRIORITY 1

| Patch | Status | Reason | Instance Progress |
|-------|--------|--------|-------------------|
| `a11y-DRUPAL-A11Y-001-file-widget-display-labels` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` | 0 fixed / 0 remaining / 1 not-observed |
| `a11y-DRUPAL-A11Y-002-submit-button-contrast` | ❌ FAIL | `evaluation-or-patch-application-error` | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-005-language-switcher-contrast` | ❌ FAIL | `evaluation-or-patch-application-error` | 0 fixed / 0 remaining / 0 not-observed |

### PRIORITY 2

| Patch | Status | Reason | Instance Progress |
|-------|--------|--------|-------------------|
| `a11y-DRUPAL-A11Y-006-theme-switcher-landmark` | ❌ FAIL | `evaluation-or-patch-application-error` | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-007-messages-landmark-role` | ❌ FAIL | `evaluation-or-patch-application-error` | 0 fixed / 0 remaining / 0 not-observed |

### PRIORITY 3

| Patch | Status | Reason | Instance Progress |
|-------|--------|--------|-------------------|
| `a11y-DRUPAL-A11Y-003-select-all-checkbox-label` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` | 0 fixed / 0 remaining / 2 not-observed |
| `a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` | 0 fixed / 0 remaining / 1 not-observed |
| `a11y-DRUPAL-A11Y-008-empty-table-headers` | ❌ FAIL | `evaluation-or-patch-application-error` | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-009-module-summary-names` | ❌ FAIL | `evaluation-or-patch-application-error` | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-LABEL-IN-NAME-004-filter-format-aria-label` | ❌ FAIL | `evaluation-or-patch-application-error` | 0 fixed / 0 remaining / 0 not-observed |

---

## Recommendations

⚠️ **7 patches failed and 3 were inconclusive:**

- `a11y-DRUPAL-A11Y-001-file-widget-display-labels`: inconclusive (test did not observe baseline target)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 1 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-001-file-widget-display-labels"
- `a11y-DRUPAL-A11Y-002-submit-button-contrast`: failed
  - reason: `evaluation-or-patch-application-error`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-002-submit-button-contrast"
- `a11y-DRUPAL-A11Y-003-select-all-checkbox-label`: inconclusive (test did not observe baseline target)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 2 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-003-select-all-checkbox-label"
- `a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form`: inconclusive (test did not observe baseline target)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 1 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form"
- `a11y-DRUPAL-A11Y-005-language-switcher-contrast`: failed
  - reason: `evaluation-or-patch-application-error`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-005-language-switcher-contrast"
- `a11y-DRUPAL-A11Y-006-theme-switcher-landmark`: failed
  - reason: `evaluation-or-patch-application-error`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-006-theme-switcher-landmark"
- `a11y-DRUPAL-A11Y-007-messages-landmark-role`: failed
  - reason: `evaluation-or-patch-application-error`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-007-messages-landmark-role"
- `a11y-DRUPAL-A11Y-008-empty-table-headers`: failed
  - reason: `evaluation-or-patch-application-error`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-008-empty-table-headers"
- `a11y-DRUPAL-A11Y-009-module-summary-names`: failed
  - reason: `evaluation-or-patch-application-error`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-DRUPAL-A11Y-009-module-summary-names"
- `a11y-LABEL-IN-NAME-004-filter-format-aria-label`: failed
  - reason: `evaluation-or-patch-application-error`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
  - Command failed: node "/Users/mike.gifford/drupal-core/core/tests/playwright/scripts/evaluate-patch.js" "a11y-LABEL-IN-NAME-004-filter-format-aria-label"

Review detailed evaluation reports in the `patches/` directory.
