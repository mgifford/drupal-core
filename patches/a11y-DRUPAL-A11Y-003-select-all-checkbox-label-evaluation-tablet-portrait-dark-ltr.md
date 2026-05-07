# Patch Evaluation Report: a11y-DRUPAL-A11Y-003-select-all-checkbox-label-tablet-portrait-dark-ltr

**Generated:** 2026-05-07 at 8:34:33 a.m.

## Summary

- **Description:** Add aria-label to select-all checkboxes in tables
- **WCAG Criteria:** 1.3.1 (A)
- **Affected Rules:** label, label-title-only
- **Pattern Source:** reports/pattern-report-2026-05-06.json
- **Status:** 🟨 **INCONCLUSIVE** — No baseline instances were observed on targeted URLs/selectors
- **Outcome Reason:** `no-baseline-instances-observed`
- **Requested color mode:** dark
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
- Flow: Apply patch with: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-003-select-all-checkbox-label.patch"
- Flow: Clear Drupal cache with: ddev drush cache-rebuild
- Flow: Revisit same URL + conditions and capture post-patch evidence.
- Flow: Revert patch with: git apply -R "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-003-select-all-checkbox-label.patch"
- Variant ID: `tablet-portrait-dark-ltr`
- Expected proof: Problem must be observed before patch and not observed after patch under the same recorded conditions.

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
| DRU-1197101c | DRU-987EB788 | label-title-only | /admin/content | not-observed | - | - |
| DRU-f76e3ce2 | DRU-987EB788 | label-title-only | /admin/people | not-observed | - | - |

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 0 | 0 | 0 |

---

## Test Cases

### Test 1: /admin/content

**URL:** `http://drupal-core.ddev.site/admin/content`

**Elements tested:** input[title="Select all rows in this table"]

**Conditions:**
- Requested: {"screenType":"tablet","orientation":"portrait","colorMode":"dark","direction":"ltr","viewport":{"width":768,"height":1024}}
- Before: {"screenType":"tablet","orientation":"portrait","viewport":{"width":768,"height":1024},"colorMode":"dark","direction":"ltr","language":"en","colorSchemeDetected":"dark","prefersContrast":"no-preference","forcedColors":"none","theme":"unknown","bodyClasses":["path-admin"]}
- After: {"screenType":"tablet","orientation":"portrait","viewport":{"width":768,"height":1024},"colorMode":"dark","direction":"ltr","language":"en","colorSchemeDetected":"dark","prefersContrast":"no-preference","forcedColors":"none","theme":"unknown","bodyClasses":["path-admin"]}

#### Before Patch

- **Total violations:** 0

#### After Patch

- **Total violations:** 0

### Test 2: /admin/people

**URL:** `http://drupal-core.ddev.site/admin/people`

**Elements tested:** input[title="Select all rows in this table"]

**Conditions:**
- Requested: {"screenType":"tablet","orientation":"portrait","colorMode":"dark","direction":"ltr","viewport":{"width":768,"height":1024}}
- Before: {"screenType":"tablet","orientation":"portrait","viewport":{"width":768,"height":1024},"colorMode":"dark","direction":"ltr","language":"en","colorSchemeDetected":"dark","prefersContrast":"no-preference","forcedColors":"none","theme":"unknown","bodyClasses":["path-admin"]}
- After: {"screenType":"tablet","orientation":"portrait","viewport":{"width":768,"height":1024},"colorMode":"dark","direction":"ltr","language":"en","colorSchemeDetected":"dark","prefersContrast":"no-preference","forcedColors":"none","theme":"unknown","bodyClasses":["path-admin"]}

#### Before Patch

- **Total violations:** 0

#### After Patch

- **Total violations:** 0

---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
