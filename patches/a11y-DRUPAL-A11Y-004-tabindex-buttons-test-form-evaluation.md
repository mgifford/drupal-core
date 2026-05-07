# Patch Evaluation Report: a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form

**Generated:** 2026-05-06 at 10:33:23 p.m.

## Summary

- **Description:** Remove explicit tabindex from buttons on test form
- **WCAG Criteria:** 2.1.1 (A)
- **Affected Rules:** tabindex
- **Pattern Source:** reports/pattern-report-2026-05-06.json
- **Status:** 🟨 **INCONCLUSIVE** — No baseline instances were observed on targeted URLs/selectors
- **Outcome Reason:** `no-baseline-instances-observed`
- **Requested color mode:** light
- **ID consistency issues:** patterns=0, instances=0

### Pattern Coverage (From Scan Report)

- **Targeted patterns:** 1
- **Patterns seen before patch:** 0
- **Fully fixed patterns:** 0
- **Partially fixed patterns:** 0
- **Unchanged patterns:** 1

| Pattern ID | Rule | Paths (sample) | Before | After | Status |
|---|---|---|---:|---:|---|
| DRU-CC36FB25 | tabindex | /buttons | 0 | 0 | unchanged |

### Instance ID Coverage

- **Targeted instance IDs:** 1
- **Seen before patch:** 0
- **Fixed instances:** 0
- **Remaining instances:** 0
- **Not observed in baseline:** 1

| Instance ID | Pattern ID | Rule | Path | Status | Before IDs | After IDs |
|---|---|---|---|---|---|---|
| DRU-dceab886 | DRU-CC36FB25 | tabindex | /buttons | not-observed | - | - |

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 0 | 0 | 0 |

---

## Test Cases

### Test 1: /buttons

**URL:** `http://drupal-core.ddev.site/buttons`

**Elements tested:** #edit-submit

**Conditions:**
- Requested: {"screenType":"desktop","orientation":"landscape","colorMode":"light","viewport":{"width":1280,"height":1024}}
- Before: {"screenType":"desktop","orientation":"landscape","viewport":{"width":1280,"height":1024},"colorMode":"light","direction":"ltr","language":"en","colorSchemeDetected":"light","prefersContrast":"no-preference","forcedColors":"none","theme":"unknown","bodyClasses":["path-buttons"]}
- After: {"screenType":"desktop","orientation":"landscape","viewport":{"width":1280,"height":1024},"colorMode":"light","direction":"ltr","language":"en","colorSchemeDetected":"light","prefersContrast":"no-preference","forcedColors":"none","theme":"unknown","bodyClasses":["path-buttons"]}

#### Before Patch

- **Total violations:** 0

#### After Patch

- **Total violations:** 0

---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
