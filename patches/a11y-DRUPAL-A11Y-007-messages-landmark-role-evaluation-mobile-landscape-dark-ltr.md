# Patch Evaluation Report: a11y-DRUPAL-A11Y-007-messages-landmark-role-mobile-landscape-dark-ltr

**Generated:** 2026-05-07 at 8:41:39 a.m.

## Summary

- **Description:** Wrap status messages in proper landmark with role
- **WCAG Criteria:** 1.3.6 (AAA)
- **Affected Rules:** landmark-contentinfo-is-top-level, landmark-no-duplicate-contentinfo
- **Pattern Source:** reports/pattern-report-2026-05-06.json
- **Status:** ❌ **FAIL** — Patch application or evaluation encountered an error
- **Outcome Reason:** `evaluation-or-patch-application-error`
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
- Flow: Apply patch with: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-007-messages-landmark-role.patch"
- Flow: Clear Drupal cache with: ddev drush cache-rebuild
- Flow: Revisit same URL + conditions and capture post-patch evidence.
- Flow: Revert patch with: git apply -R "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-007-messages-landmark-role.patch"
- Variant ID: `mobile-landscape-dark-ltr`
- Expected proof: Problem must be observed before patch and not observed after patch under the same recorded conditions.

### Pattern Coverage (From Scan Report)

- **Targeted patterns:** 2
- **Patterns seen before patch:** 0
- **Fully fixed patterns:** 0
- **Partially fixed patterns:** 0
- **Unchanged patterns:** 2

| Pattern ID | Rule | Paths (sample) | Before | After | Status |
|---|---|---|---:|---:|---|
| DRU-2E022F2F | landmark-contentinfo-is-top-level | /admin/appearance, /admin/modules, /message | 0 | 0 | unchanged |
| DRU-1260AB7D | landmark-no-duplicate-contentinfo | /admin/appearance, /admin/modules | 0 | 0 | unchanged |

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 0 | 0 | 0 |

---

## Test Cases

### Test 1: /admin/appearance

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-007-messages-landmark-role.patch"
error: corrupt patch at /Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-007-messages-landmark-role.patch:22


### Test 2: /admin/modules

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-007-messages-landmark-role.patch"
error: corrupt patch at /Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-007-messages-landmark-role.patch:22


### Test 3: /admin/appearance

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-007-messages-landmark-role.patch"
error: corrupt patch at /Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-007-messages-landmark-role.patch:22


### Test 4: /admin/modules

**Error:** Patch application failed: Command failed: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-007-messages-landmark-role.patch"
error: corrupt patch at /Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-007-messages-landmark-role.patch:22


---

## Screenshots

Before and after screenshots have been captured and are available in the reports directory.

## HTML Snapshots

HTML snapshots of failing elements (before and after) are included in this report for code review.
