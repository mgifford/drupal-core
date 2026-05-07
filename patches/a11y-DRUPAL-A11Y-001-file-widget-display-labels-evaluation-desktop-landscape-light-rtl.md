# Patch Evaluation Report: a11y-DRUPAL-A11Y-001-file-widget-display-labels-desktop-landscape-light-rtl

**Generated:** 2026-05-07 at 8:13:24 a.m.

## Summary

- **Description:** Add aria-label to file widget display checkboxes
- **WCAG Criteria:** 1.3.1 (A)
- **Affected Rules:** label
- **Pattern Source:** reports/pattern-report-2026-05-06.json
- **Status:** 🟨 **INCONCLUSIVE** — No baseline instances were observed on targeted URLs/selectors
- **Outcome Reason:** `no-baseline-instances-observed`
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
- Flow: Apply patch with: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-001-file-widget-display-labels.patch"
- Flow: Clear Drupal cache with: ddev drush cache-rebuild
- Flow: Revisit same URL + conditions and capture post-patch evidence.
- Flow: Revert patch with: git apply -R "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-001-file-widget-display-labels.patch"
- Variant ID: `desktop-landscape-light-rtl`
- Expected proof: Problem must be observed before patch and not observed after patch under the same recorded conditions.

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
| DRU-b03a40cf | DRU-6CA3D5EB | label | /contact/imagefile_file | not-observed | - | - |

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 0 | 0 | 0 |

---

## Test Cases

### Test 1: /contact/imagefile_file

**URL:** `http://drupal-core.ddev.site/contact/imagefile_file`

**Elements tested:** #edit-imagefile-file-limited-N-display

**Conditions:**
- Requested: {"screenType":"desktop","orientation":"landscape","colorMode":"light","direction":"rtl","viewport":{"width":1440,"height":1024}}
- Before: {"screenType":"desktop","orientation":"landscape","viewport":{"width":1440,"height":1024},"colorMode":"light","direction":"rtl","language":"en","colorSchemeDetected":"light","prefersContrast":"no-preference","forcedColors":"none","theme":"unknown","bodyClasses":["path-contact"]}
- After: {"screenType":"desktop","orientation":"landscape","viewport":{"width":1440,"height":1024},"colorMode":"light","direction":"rtl","language":"en","colorSchemeDetected":"light","prefersContrast":"no-preference","forcedColors":"none","theme":"unknown","bodyClasses":["path-contact"]}

#### Before Patch

- **Total violations:** 0

#### After Patch

- **Total violations:** 0

---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
