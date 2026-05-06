# Patch Evaluation Report: a11y-DRUPAL-A11Y-002-submit-button-contrast

**Generated:** 2026-05-06 at 2:04:00 p.m.

## Summary

- **Description:** Fix primary button color contrast on admin yellow accent
- **WCAG Criteria:** 1.4.3 (AA)
- **Affected Rules:** color-contrast
- **Status:** ❌ **FAIL** — Patch introduces new violations or does not resolve all issues

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 0 | 0 | 0 |

---

## Test Cases

### Test 1: /admin/structure/types/add

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-002-submit-button-contrast.patch"
error: patch failed: core/themes/default_admin/css/components/button.pcss.css:50
error: core/themes/default_admin/css/components/button.pcss.css: patch does not apply


### Test 2: /admin/structure/taxonomy

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-002-submit-button-contrast.patch"
error: patch failed: core/themes/default_admin/css/components/button.pcss.css:50
error: core/themes/default_admin/css/components/button.pcss.css: patch does not apply


---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
