# Patch Evaluation Report: a11y-DRUPAL-A11Y-007-messages-landmark-role

**Generated:** 2026-05-06 at 5:27:31 p.m.

## Summary

- **Description:** Wrap status messages in proper landmark with role
- **WCAG Criteria:** 1.3.6 (AAA)
- **Affected Rules:** landmark-contentinfo-is-top-level, landmark-no-duplicate-contentinfo
- **Pattern Source:** reports/pattern-report-2026-05-06.json
- **Status:** ❌ **FAIL** — Patch introduces new violations or does not resolve all issues

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
