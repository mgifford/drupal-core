# Patch Evaluation Report: a11y-LABEL-IN-NAME-004-filter-format-aria-label-desktop-landscape-light-ltr

**Generated:** 2026-05-07 at 8:13:11 a.m.

## Summary

- **Description:** Fix label-in-name violation for filter format configure link
- **WCAG Criteria:** 2.5.3 (A)
- **Affected Rules:** label-in-name
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
- Flow: Apply patch with: git apply "/Users/mike.gifford/drupal-core/patches/a11y-LABEL-IN-NAME-004-filter-format-aria-label.patch"
- Flow: Clear Drupal cache with: ddev drush cache-rebuild
- Flow: Revisit same URL + conditions and capture post-patch evidence.
- Flow: Revert patch with: git apply -R "/Users/mike.gifford/drupal-core/patches/a11y-LABEL-IN-NAME-004-filter-format-aria-label.patch"
- Variant ID: `desktop-landscape-light-ltr`
- Expected proof: Problem must be observed before patch and not observed after patch under the same recorded conditions.

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 0 | 0 | 0 |

---

## Test Cases

### Test 1: /admin/config/content/formats

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-LABEL-IN-NAME-004-filter-format-aria-label.patch"
error: corrupt patch at /Users/mike.gifford/drupal-core/patches/a11y-LABEL-IN-NAME-004-filter-format-aria-label.patch:23


---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
