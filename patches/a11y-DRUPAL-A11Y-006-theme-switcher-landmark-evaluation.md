# Patch Evaluation Report: a11y-DRUPAL-A11Y-006-theme-switcher-landmark

**Generated:** 2026-05-06 at 5:27:28 p.m.

## Summary

- **Description:** Wrap theme switcher form in nav landmark
- **WCAG Criteria:** 1.3.6 (AAA)
- **Affected Rules:** region
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
| DRU-6BA9E02D | region | /, /action-link, /admin | 0 | 0 | unchanged |

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 11 | 0 | -11 |

---

## Test Cases

### Test 1: /

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-006-theme-switcher-landmark.patch"
error: corrupt patch at /Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-006-theme-switcher-landmark.patch:15


### Test 2: /action-link

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-006-theme-switcher-landmark.patch"
error: corrupt patch at /Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-006-theme-switcher-landmark.patch:15


---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
