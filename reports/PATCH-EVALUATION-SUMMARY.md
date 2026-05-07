# Patch Evaluation Batch Summary

**Generated:** 2026-05-07 at 2:31:59 p.m.
**Variant:** `default`

## Results

| Metric | Count |
|--------|-------|
| **Total patches** | 10 |
| **Passed** ✅ | 0 |
| **Inconclusive** 🟨 | 10 |
| **Failed** ❌ | 0 |
| **Error** ⚠️ | 0 |

**Pass rate:** 0.0%

### Condition Coverage Captured

- **Screen types:** desktop
- **Orientations:** landscape
- **Color modes requested:** light
- **Detected color schemes:** light
- **Directionality:** ltr
- **Themes:** unknown
- **Forced colors:** none
- **Contrast preferences:** no-preference
- **Viewports:** 1280x1024

- **Actionable patches (baseline observed):** 0
- **Root-cause categories:** 4

### Root Cause Breakdown

- `patch-file-corrupt`: 4
- `baseline-not-reproduced`: 3
- `patch-does-not-apply`: 2
- `patch-target-file-missing`: 1

---

## Patch Details

### PRIORITY 1

| Patch | Status | Reason | Instance Progress |
|-------|--------|--------|-------------------|
| `a11y-DRUPAL-A11Y-001-file-widget-display-labels` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` (baseline-not-reproduced) | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-002-submit-button-contrast` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` (patch-does-not-apply) | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-005-language-switcher-contrast` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` (patch-does-not-apply) | 0 fixed / 0 remaining / 0 not-observed |

### PRIORITY 2

| Patch | Status | Reason | Instance Progress |
|-------|--------|--------|-------------------|
| `a11y-DRUPAL-A11Y-006-theme-switcher-landmark` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` (patch-file-corrupt) | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-007-messages-landmark-role` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` (patch-file-corrupt) | 0 fixed / 0 remaining / 0 not-observed |

### PRIORITY 3

| Patch | Status | Reason | Instance Progress |
|-------|--------|--------|-------------------|
| `a11y-DRUPAL-A11Y-003-select-all-checkbox-label` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` (baseline-not-reproduced) | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` (baseline-not-reproduced) | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-008-empty-table-headers` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` (patch-target-file-missing) | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-DRUPAL-A11Y-009-module-summary-names` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` (patch-file-corrupt) | 0 fixed / 0 remaining / 0 not-observed |
| `a11y-LABEL-IN-NAME-004-filter-format-aria-label` | 🟨 INCONCLUSIVE | `no-baseline-instances-observed` (patch-file-corrupt) | 0 fixed / 0 remaining / 0 not-observed |

---

## Recommendations

⚠️ **No actionable patch recommendations** because baseline target violations were not observed under current test conditions.

### Patch Hygiene (Fix Before Validation)

- `a11y-DRUPAL-A11Y-002-submit-button-contrast` (patch-does-not-apply)
- `a11y-DRUPAL-A11Y-005-language-switcher-contrast` (patch-does-not-apply)
- `a11y-DRUPAL-A11Y-006-theme-switcher-landmark` (patch-file-corrupt)
- `a11y-DRUPAL-A11Y-007-messages-landmark-role` (patch-file-corrupt)
- `a11y-DRUPAL-A11Y-008-empty-table-headers` (patch-target-file-missing)
- `a11y-DRUPAL-A11Y-009-module-summary-names` (patch-file-corrupt)
- `a11y-LABEL-IN-NAME-004-filter-format-aria-label` (patch-file-corrupt)

### Test-State Triage (Baseline Not Reproduced)

- `a11y-DRUPAL-A11Y-001-file-widget-display-labels` on /contact/imagefile_file
- `a11y-DRUPAL-A11Y-003-select-all-checkbox-label` on /admin/content
- `a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form` on /buttons

⚠️ **0 patches failed and 10 were inconclusive:**

- `a11y-DRUPAL-A11Y-001-file-widget-display-labels`: inconclusive (test did not observe baseline target)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
- `a11y-DRUPAL-A11Y-002-submit-button-contrast`: inconclusive (patch preflight issue: patch-does-not-apply)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
- `a11y-DRUPAL-A11Y-003-select-all-checkbox-label`: inconclusive (test did not observe baseline target)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
- `a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form`: inconclusive (test did not observe baseline target)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
- `a11y-DRUPAL-A11Y-005-language-switcher-contrast`: inconclusive (patch preflight issue: patch-does-not-apply)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
- `a11y-DRUPAL-A11Y-006-theme-switcher-landmark`: inconclusive (patch preflight issue: patch-file-corrupt)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
- `a11y-DRUPAL-A11Y-007-messages-landmark-role`: inconclusive (patch preflight issue: patch-file-corrupt)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
- `a11y-DRUPAL-A11Y-008-empty-table-headers`: inconclusive (patch preflight issue: patch-target-file-missing)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
- `a11y-DRUPAL-A11Y-009-module-summary-names`: inconclusive (patch preflight issue: patch-file-corrupt)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed
- `a11y-LABEL-IN-NAME-004-filter-format-aria-label`: inconclusive (patch preflight issue: patch-file-corrupt)
  - reason: `no-baseline-instances-observed`
  - instance coverage: 0 fixed, 0 remaining, 0 not observed

### Excluded From Patch Recommendation (No Baseline Evidence)

- `a11y-DRUPAL-A11Y-001-file-widget-display-labels` (baseline observed: 0)
- `a11y-DRUPAL-A11Y-003-select-all-checkbox-label` (baseline observed: 0)
- `a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form` (baseline observed: 0)

Review detailed evaluation reports in the `patches/` directory.
