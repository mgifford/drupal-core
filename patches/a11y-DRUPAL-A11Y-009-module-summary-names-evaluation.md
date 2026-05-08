# Patch Evaluation Report: a11y-DRUPAL-A11Y-009-module-summary-names

**Generated:** 2026-05-08 at 6:48:03 PM

## Summary

- **Description:** Add aria-label to module details on /admin/modules
- **WCAG Criteria:** 4.1.2 (A)
- **Affected Rules:** summary-name
- **Pattern Source:** reports/pattern-report-2026-05-06.json
- **Pattern Source (Markdown):** reports/pattern-report-2026-05-06.md
- **Target Pattern IDs:** DRU-4422E904
- **Pattern ID Match Type:** source-pattern-matched
- **Matched Pattern IDs (pattern source):** DRU-4422E904
- **Generated Pattern IDs (current run):** DRU-4422E904
- **Status:** ✅ **PASS** — Patch resolves targeted issues without introducing new violations
- **Outcome Reason:** `targeted-issues-fixed-without-regressions`
- **Eligible For Patch Recommendation:** yes
- **Requested color mode:** light
- **Patch preflight applicability:** applicable
- **Drupal initial state capture:** complete
- **Enabled modules (captured):** 76
- **Enabled modules hash:** f05a1794c778fbf18dde0ba9cbe776c79b5d840a93aeb8dfe11afd7ff94f0ba0
- **Core extension hash:** b8956ee09da2d6c7a1b391e2772785afc3d967f98bc795f85b65ab1c41e88522
- **Pattern source modified:** 2026-05-06T17:52:17.290Z
- **Pattern source age (hours):** 52.93
- **Case generation mode:** fallback-config-testCases
- **Case generation count:** 1
- **Case generation fallback reason:** pattern-report-usage-disabled
- **Page load HTTP statuses (baseline):** 200x1
- **Pages loaded successfully (2xx):** 1/1
- **Pages not loaded as 2xx:** 0/1
- **ID consistency issues:** patterns=1, instances=0
- **Pattern observed before patch attempt:** yes
- **Baseline observed instances:** 1
- **Fixed instances after patch:** 1
- **Remaining instances after patch:** 0

### Replication Instructions

Use the following deterministic steps to reproduce this exact evaluation run:

- Setup: `ddev drush cset system.theme default olivero -y`
- Setup: `ddev drush cset system.theme admin claro -y`
- Setup: `ddev drush cache-rebuild`
- Flow: Navigate to each test case URL under requested conditions and capture baseline evidence.
- Flow: Apply patch with: git apply "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-009-module-summary-names.patch"
- Flow: Clear Drupal cache with: ddev drush cache-rebuild
- Flow: Revisit same URL + conditions and capture post-patch evidence.
- Flow: Revert patch with: git apply -R "/Users/mike.gifford/drupal-core/patches/a11y-DRUPAL-A11Y-009-module-summary-names.patch"
- Variant ID: `default`
- Expected proof: Problem must be observed before patch and not observed after patch under the same recorded conditions.

### Drupal Initial State Snapshot

- **Captured at:** 2026-05-08T22:47:41.091Z
- **Capture status:** complete
- **Default theme:** olivero
- **Admin theme:** claro
- **Enabled modules count:** 76
- **Enabled modules hash (sha256):** f05a1794c778fbf18dde0ba9cbe776c79b5d840a93aeb8dfe11afd7ff94f0ba0
- **Core extension hash (sha256):** b8956ee09da2d6c7a1b391e2772785afc3d967f98bc795f85b65ab1c41e88522
- **Core extension modules hash (sha256):** 571d3af2a25d4119a4b5140d877f4522550fe6e81a6de32f28d49bba674ea1cc
- **Core extension themes hash (sha256):** 7b890ad0e40ccd67b1cc6c9089210853981fc868579eb56567938d5c05bc50dd
- **Drush status:** {"drupal-version":"12.0-dev","uri":"http://drupal-core.ddev.site","db-driver":"mysql","db-hostname":"db","db-port":3306,"db-username":"db","db-password":"db","db-name":"db","db-status":"Connected","bootstrap":"Successful","theme":"olivero","admin-theme":"claro","php-bin":"/usr/bin/php8.5","php-conf":["/etc/php/8.5/cli/php.ini"],"php-os":"Linux","php-version":"8.5.5","drush-script":"/var/www/html/vendor/bin/drush.php","drush-version":"14.9999999.9999999.9999999-dev","drush-temp":"/tmp","drush-conf":[],"drush-alias-files":[],"alias-searchpaths":[],"install-profile":"standard","root":"/var/www/html","drupal-settings-file":"sites/default/settings.php","site":"sites/default","themes":"sites/all/themes","modules":"sites/all/modules","files":"sites/default/files","temp":"/tmp","config-sync":"sites/default/files/sync","config":"sites/default/files/sync","%paths":{"%root":"/var/www/html","%site":"sites/default","%modules":"sites/all/modules","%themes":"sites/all/themes","%config-sync":"sites/default/files/sync","%config":"sites/default/files/sync","%files":"sites/default/files","%temp":"/tmp"}}
- **Enabled modules sample (first 40):** actionlink, announcements_feed, autocomplete, automated_cron, block, block_content, breakpoint, button, card, checkboxradio, ckeditor5, comment, config, contact, contextual, datetime, datetime_range, dblog, details, dialog, dropbutton, dynamic_page_cache, editor, exposed_form, field, field_ui, fieldcardinality, fieldset, file, filter, form_style, help, image, imagefile, lang_hebrew, language, layout_discovery, link, locale, menu_link_content
- **Commands used:**
  - ✅ `ddev drush pm:list --type=module --status=enabled --format=json`
  - ✅ `ddev drush cget system.theme --format=json`
  - ✅ `ddev drush cget core.extension --format=json`
  - ✅ `ddev drush status --format=json`

### Pattern Source Candidates

| Path | Modified |
|---|---|
| reports/pattern-report-2026-05-06.json | 2026-05-06T17:52:17.290Z |

### Validation Proof (Before/After)

This run captured the target violation before patch application and confirmed it was absent after patch application under the same recorded conditions.

- Baseline observed: 1
- Fixed after patch: 1
- Remaining after patch: 0
- New violations introduced: 0

### Pattern Coverage (From Scan Report)

- **Targeted patterns:** 1
- **Patterns seen before patch:** 1
- **Fully fixed patterns:** 1
- **Partially fixed patterns:** 0
- **Unchanged patterns:** 0

| Pattern ID | Rule | Paths (sample) | Before | After | Status |
|---|---|---|---:|---:|---|
| DRU-4422E904 | summary-name | /admin/modules | 1 | 0 | fully-fixed |

### Instance ID Coverage

- **Targeted instance IDs:** 2
- **Seen before patch:** 1
- **Fixed instances:** 1
- **Remaining instances:** 0
- **Not observed in baseline:** 1

| Instance ID | Pattern ID | Rule | Path | Status | Before IDs | After IDs |
|---|---|---|---|---|---|---|
| DRU-67f25cdc | DRU-4422E904 | summary-name | /admin/modules | fixed | DRU-67f25cdc | - |
| DRU-cba6fa5a | DRU-4422E904 | summary-name | /admin/modules | not-observed | - | - |

### Violation Counts

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total violations** | 5 | 4 | -1 |

### Fixed Rules

- `summary-name`: 1 → 0 (−1)

---

## Test Cases

### Test 1: /admin/modules

**URL:** `http://drupal-core.ddev.site/admin/modules`

**Elements tested:** summary, details summary

**Conditions:**
- Requested: {"screenType":"desktop","orientation":"landscape","colorMode":"light","direction":"ltr","viewport":{"width":1280,"height":1024}}
- Before: {"screenType":"desktop","orientation":"landscape","viewport":{"width":1280,"height":1024},"colorMode":"light","direction":"ltr","language":"en","colorSchemeDetected":"light","prefersContrast":"no-preference","forcedColors":"none","theme":"unknown","bodyClasses":["user-logged-in","path-admin"]}
- After: {"screenType":"desktop","orientation":"landscape","viewport":{"width":1280,"height":1024},"colorMode":"light","direction":"ltr","language":"en","colorSchemeDetected":"light","prefersContrast":"no-preference","forcedColors":"none","theme":"unknown","bodyClasses":["user-logged-in","path-admin"]}

**Authentication:**
- Before case: {"ensured":true,"neededRelogin":false,"before":{"loggedInClass":true,"logoutLink":false,"loginForm":true,"uid":1,"authenticated":true},"after":{"loggedInClass":true,"logoutLink":false,"loginForm":true,"uid":1,"authenticated":true},"loginAttempt":null}

#### Before Patch

- **Total violations:** 5
- **By rule:**
  - `landmark-contentinfo-is-top-level`: 2
  - `landmark-no-duplicate-contentinfo`: 1
  - `region`: 1
  - `summary-name`: 1

#### After Patch

- **Total violations:** 4
- **By rule:**
  - `landmark-contentinfo-is-top-level`: 2
  - `landmark-no-duplicate-contentinfo`: 1
  - `region`: 1

---

## Screenshots

Captured 4 screenshot(s) for this run. See the reports directory.

## HTML Snapshots

Captured 4 HTML snapshot(s) for this run.
