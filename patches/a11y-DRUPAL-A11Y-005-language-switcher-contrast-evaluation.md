# Patch Evaluation Report: a11y-DRUPAL-A11Y-005-language-switcher-contrast

**Generated:** 2026-05-06 at 5:27:27 p.m.

## Summary

- **Description:** Ensure language switcher links maintain WCAG AA contrast
- **WCAG Criteria:** 1.4.3 (AA)
- **Affected Rules:** color-contrast
- **Pattern Source:** reports/pattern-report-2026-05-06.json
- **Status:** ❌ **FAIL** — Patch introduces new violations or does not resolve all issues

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

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-005-language-switcher-contrast.patch"
error: patch failed: core/themes/default_admin/css/components/button.pcss.css:85
error: core/themes/default_admin/css/components/button.pcss.css: patch does not apply


### Test 2: /admin

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-005-language-switcher-contrast.patch"
error: patch failed: core/themes/default_admin/css/components/button.pcss.css:85
error: core/themes/default_admin/css/components/button.pcss.css: patch does not apply


---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
