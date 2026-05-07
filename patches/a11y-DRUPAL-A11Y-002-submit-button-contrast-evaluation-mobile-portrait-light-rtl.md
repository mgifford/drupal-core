# Patch Evaluation Report: a11y-DRUPAL-A11Y-002-submit-button-contrast-mobile-portrait-light-rtl

**Generated:** 2026-05-07 at 8:45:35 a.m.

## Summary

- **Description:** Fix primary button color contrast on admin yellow accent
- **WCAG Criteria:** 1.4.3 (AA)
- **Affected Rules:** color-contrast
- **Pattern Source:** reports/pattern-report-2026-05-06.json
- **Status:** ❌ **FAIL** — Patch application or evaluation encountered an error
- **Outcome Reason:** `evaluation-or-patch-application-error`
- **Requested color mode:** light
- **ID consistency issues:** patterns=0, instances=0
- **Baseline observed instances:** 0
- **Fixed instances after patch:** 0
- **Remaining instances after patch:** 0

### Replication Instructions

Use the following deterministic steps to reproduce this exact evaluation run:

- Setup: `ddev drush cset system.theme default olivero -y`
- Setup: `ddev drush cset system.theme admin claro -y`
- Setup: `ddev drush cache-rebuild`
- Flow: Navigate to each test case URL under requested conditions and capture baseline evidence.
- Flow: Apply patch with: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-002-submit-button-contrast.patch"
- Flow: Clear Drupal cache with: ddev drush cache-rebuild
- Flow: Revisit same URL + conditions and capture post-patch evidence.
- Flow: Revert patch with: git apply -R "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-002-submit-button-contrast.patch"
- Variant ID: `mobile-portrait-light-rtl`
- Expected proof: Problem must be observed before patch and not observed after patch under the same recorded conditions.

### Pattern Coverage (From Scan Report)

- **Targeted patterns:** 1
- **Patterns seen before patch:** 0
- **Fully fixed patterns:** 0
- **Partially fixed patterns:** 0
- **Unchanged patterns:** 1

| Pattern ID | Rule | Paths (sample) | Before | After | Status |
|---|---|---|---:|---:|---|
| DRU-F75A07EF | color-contrast | /action-link, /admin, /admin/appearance | 0 | 0 | unchanged |

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 0 | 0 | 0 |

---

## Test Cases

### Test 1: /action-link

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-002-submit-button-contrast.patch"
error: patch failed: core/themes/default_admin/css/components/button.pcss.css:50
error: core/themes/default_admin/css/components/button.pcss.css: patch does not apply


### Test 2: /admin

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-002-submit-button-contrast.patch"
error: patch failed: core/themes/default_admin/css/components/button.pcss.css:50
error: core/themes/default_admin/css/components/button.pcss.css: patch does not apply


---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
