# Patch Evaluation Report: a11y-DRUPAL-A11Y-001-file-widget-display-labels

**Generated:** 2026-05-06 at 5:27:09 p.m.

## Summary

- **Description:** Add aria-label to file widget display checkboxes
- **WCAG Criteria:** 1.3.1 (A)
- **Affected Rules:** label
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
| DRU-6CA3D5EB | label | /contact/imagefile_file | 0 | 0 | unchanged |

### Instance ID Coverage

- **Targeted instance IDs:** 1
- **Seen before patch:** 0
- **Fixed instances:** 0
- **Remaining instances:** 0
- **Not observed in baseline:** 1

| Instance ID | Pattern ID | Rule | Path | Status | Before IDs | After IDs |
|---|---|---|---|---|---|---|
| DRU-c8042e39 | DRU-6CA3D5EB | label | /contact/imagefile_file | not-observed | - | - |

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 0 | 0 | 0 |

---

## Test Cases

### Test 1: /contact/imagefile_file

**URL:** `http://drupal-core.ddev.site/contact/imagefile_file`

**Elements tested:** #edit-imagefile-file-limited-N-display

#### Before Patch

- **Total violations:** 0

#### After Patch

- **Total violations:** 0

---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
