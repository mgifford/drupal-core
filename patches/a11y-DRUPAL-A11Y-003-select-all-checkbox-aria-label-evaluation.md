# Patch Evaluation Report: a11y-DRUPAL-A11Y-003-select-all-checkbox-aria-label

**Generated:** 2026-05-06 at 4:57:16 p.m.

## Summary

- **Description:** Add aria-label to select-all checkboxes in tables for label-title-only violations
- **WCAG Criteria:** 1.3.1 (A)
- **Affected Rules:** label-title-only
- **Status:** ❌ **FAIL** — Patch introduces new violations or does not resolve all issues

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 0 | 0 | 0 |

---

## Test Cases

### Test 1: /admin/content

**URL:** `http://drupal-core.ddev.site/admin/content`

**Elements tested:** thead input[type="checkbox"][title]

#### Before Patch

- **Total violations:** 0

#### After Patch

- **Total violations:** 0

---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
