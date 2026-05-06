# Patch Evaluation Report: a11y-DRUPAL-A11Y-003-select-all-checkbox-label

**Generated:** 2026-05-06 at 5:27:20 p.m.

## Summary

- **Description:** Add aria-label to select-all checkboxes in tables
- **WCAG Criteria:** 1.3.1 (A)
- **Affected Rules:** label, label-title-only
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
| DRU-987EB788 | label-title-only | /admin/content, /admin/people, /table | 0 | 0 | unchanged |

### Instance ID Coverage

- **Targeted instance IDs:** 2
- **Seen before patch:** 0
- **Fixed instances:** 0
- **Remaining instances:** 0
- **Not observed in baseline:** 2

| Instance ID | Pattern ID | Rule | Path | Status | Before IDs | After IDs |
|---|---|---|---|---|---|---|
| DRU-7d849f19 | DRU-987EB788 | label-title-only | /admin/content | not-observed | - | - |
| DRU-404575ae | DRU-987EB788 | label-title-only | /admin/people | not-observed | - | - |

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 0 | 0 | 0 |

---

## Test Cases

### Test 1: /admin/content

**URL:** `http://drupal-core.ddev.site/admin/content`

**Elements tested:** input[title="Select all rows in this table"]

#### Before Patch

- **Total violations:** 0

#### After Patch

- **Total violations:** 0

### Test 2: /admin/people

**URL:** `http://drupal-core.ddev.site/admin/people`

**Elements tested:** input[title="Select all rows in this table"]

#### Before Patch

- **Total violations:** 0

#### After Patch

- **Total violations:** 0

---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
