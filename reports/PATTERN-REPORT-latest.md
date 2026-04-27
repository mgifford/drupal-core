# Drupal Core Accessibility Bug Report

> **Generated:** 2026-04-27T18:49:45.907Z
> **Tool:** axe-core via @axe-core/playwright | **Browser:** Chromium
> **Standard:** [ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md](https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)

## Summary

| Metric | Value |
| :--- | :--- |
| Pages crawled | 57 |
| Total violation instances | 197 |
| Unique patterns | 103 |
| Template-level patterns (≥3 pages) 🔁 | 6 |
| Critical | 4 |
| Serious | 42 |
| Moderate | 25 |
| Minor | 32 |

## Cross-Theme Analysis

Issues found across multiple Drupal themes. Universal issues affect ALL tested themes
and are highest priority for core fixes since a single template change benefits everyone.

**Themes tested:** admin

### 🌐 Universal Issues (appear in ALL themes)

| Pattern ID | Rule | Impact | Screen | Themes | Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DRU-B09FBDB2` | `label` | **critical** | desktop | admin | label: Ensure every form element has a label |
| `DRU-B8247974` | `label` | **critical** | desktop | admin | label: Ensure every form element has a label |
| `DRU-E627190E` | `label` | **critical** | desktop | admin | label: Ensure every form element has a label |
| `DRU-C7AF32C3` | `label` | **critical** | desktop | admin | label: Ensure every form element has a label |
| `DRU-21CE323D` | `label-title-only` | **serious** | desktop | admin | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-B8FD2B8F` | `label-title-only` | **serious** | desktop | admin | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-EF39E687` | `color-contrast` | **serious** | desktop | admin | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-ADC70DBF` | `color-contrast` | **serious** | desktop | admin | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-8663917B` | `color-contrast` | **serious** | desktop | admin | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-5176454A` | `color-contrast` | **serious** | desktop | admin | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-01633124` | `color-contrast` | **serious** | desktop | admin | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-7A2CD202` | `label-title-only` | **serious** | desktop | admin | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-73CE312F` | `tabindex` | **serious** | desktop | admin | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-D3846EC9` | `tabindex` | **serious** | desktop | admin | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-D795F668` | `tabindex` | **serious** | desktop | admin | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-377F6525` | `tabindex` | **serious** | desktop | admin | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-0EA17B95` | `tabindex` | **serious** | desktop | admin | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-EB1DAE19` | `tabindex` | **serious** | desktop | admin | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-618AB405` | `label-title-only` | **serious** | desktop | admin | label-title-only: Ensure that every form element has a visible label and is not solely labeled usi |
| `DRU-EA241BBD` | `label-title-only` | **serious** | desktop | admin | label-title-only: Ensure that every form element has a visible label and is not solely labeled usi |
| `DRU-62800584` | `label-title-only` | **serious** | desktop | admin | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-5BB30588` | `label-title-only` | **serious** | desktop | admin | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-EE53B81A` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-54F64122` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-EEC5BEC9` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-33873F40` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-747E8C6F` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-1E8DE467` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-3DE0E158` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-966D750D` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-0E1ADE15` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-0F5F76EF` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-F6E6CFF7` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-92D7D31F` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-45ABDCEE` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-955B315B` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-A1DFA589` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-1C52C501` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-FEC9AAD6` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-F3EC297E` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-0113DE64` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-E2AC9F3A` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-7857535C` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-34B781B1` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-A42082A0` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-0D84B0B5` | `target-size` | **serious** | desktop | admin | target-size: Ensure touch targets have sufficient size and space |
| `DRU-BEADC0A1` | `region` | **moderate** | desktop | admin | region: Ensure all page content is contained by landmarks |
| `DRU-12C757FE` | `region` | **moderate** | desktop | admin | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-29F2A975` | `region` | **moderate** | desktop | admin | region: Ensure all page content is contained by landmarks |
| `DRU-6825C79C` | `region` | **moderate** | mobile | admin | region: Ensure all page content is contained by landmarks |
| `DRU-C00D2E42` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-4D24D5C1` | `region` | **moderate** | desktop | admin | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-E877649B` | `region` | **moderate** | mobile | admin | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-5F06D518` | `heading-order` | **moderate** | desktop | admin | heading-order: Ensure the order of headings is semantically correct |
| `DRU-D87CB13C` | `heading-order` | **moderate** | desktop | admin | heading-order: Ensure the order of headings is semantically correct |
| `DRU-3A6B5B95` | `region` | **moderate** | desktop | admin | region: Ensure all page content is contained by landmarks |
| `DRU-BDE7B1F5` | `region` | **moderate** | mobile | admin | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-B9B0B039` | `heading-order` | **moderate** | desktop | admin | heading-order: Ensure the order of headings is semantically correct |
| `DRU-F5FD6EDF` | `heading-order` | **moderate** | desktop | admin | heading-order: Ensure the order of headings is semantically correct |
| `DRU-CCABA040` | `heading-order` | **moderate** | desktop | admin | heading-order: Ensure the order of headings is semantically correct |
| `DRU-860BF298` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-97B8237F` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-5AA049DF` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-DC7ECF8A` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-49FF0418` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-AC4DC5D3` | `landmark-no-duplicate-contentinfo` | **moderate** | desktop | admin | Status messages block uses role="contentinfo", duplicating the page <footer> |
| `DRU-BEF75404` | `landmark-unique` | **moderate** | desktop | admin | landmark-unique: Ensure landmarks are unique |
| `DRU-6402BE1E` | `heading-order` | **moderate** | desktop | admin | Admin Configuration page has heading-order violations (h3 appears before h2) |
| `DRU-DF35BDC8` | `heading-order` | **moderate** | desktop | admin | heading-order: Ensure the order of headings is semantically correct |
| `DRU-4109944F` | `heading-order` | **moderate** | desktop | admin | heading-order: Ensure the order of headings is semantically correct |
| `DRU-8E7417E8` | `heading-order` | **moderate** | desktop | admin | heading-order: Ensure the order of headings is semantically correct |
| `DRU-B0DFDE0B` | `empty-heading` | **minor** | desktop | admin | empty-heading: Ensure headings have discernible text |
| `DRU-F3CC681C` | `empty-heading` | **minor** | desktop | admin | empty-heading: Ensure headings have discernible text |
| `DRU-8F1B594E` | `empty-heading` | **minor** | desktop | admin | empty-heading: Ensure headings have discernible text |
| `DRU-61489B02` | `empty-heading` | **minor** | desktop | admin | empty-heading: Ensure headings have discernible text |
| `DRU-DC320928` | `empty-heading` | **minor** | desktop | admin | empty-heading: Ensure headings have discernible text |
| `DRU-0CA45C5C` | `empty-heading` | **minor** | mobile | admin | empty-heading: Ensure headings have discernible text |
| `DRU-91E9D7B3` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-B919231C` | `empty-heading` | **minor** | desktop | admin | empty-heading: Ensure headings have discernible text |
| `DRU-1BC9286C` | `empty-heading` | **minor** | desktop | admin | empty-heading: Ensure headings have discernible text |
| `DRU-C4407003` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-41877E07` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-0B43126A` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-CB4F3AEA` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-B5EA9FA7` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-0E527276` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-E9E19F4B` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-543937BC` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-1EC10798` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-B07AC371` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-14DE3E53` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-876EF858` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-2162B464` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-92E64EFC` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-3BE0F134` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-FAF990A8` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-7DE00366` | `empty-heading` | **minor** | desktop | admin | empty-heading: Ensure headings have discernible text |
| `DRU-EF28D265` | `empty-heading` | **minor** | desktop | admin | empty-heading: Ensure headings have discernible text |
| `DRU-80462EDA` | `empty-heading` | **minor** | desktop | admin | empty-heading: Ensure headings have discernible text |
| `DRU-B1DF265A` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-5CF38AB2` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-7C13E8BF` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |
| `DRU-08D74B05` | `empty-table-header` | **minor** | desktop | admin | empty-table-header: Ensure table headers have discernible text |

### 🔗 Multi-Theme Issues (appear in 2+ themes)

_No multi-theme issues found._

### 🎨 Theme-Specific Issue Counts

| Theme | Unique Issues |
| :--- | :--- |
| `admin` | 0 |

## Issues (sorted by priority: impact × frequency)

🔁 = Template-level issue (≥3 pages) — fix once, improves many pages.

---

### 1. label: Ensure every form element has a label 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-001` |
| **Pattern ID** | `DRU-B09FBDB2` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-14E60C8A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-imagefile-file-limited-0-display
```

**XPath:**
```
//*[@id="edit-imagefile-file-limited-0-display"]
```

**HTML snippet:**
```html
<input class="file-display form-checkbox form-boolean form-boolean--type-checkbox" data-drupal-selector="edit-imagefile-file-limited-0-display" type="checkbox" id="edit-imagefile-file-limited-0-display" name="imagefile_file_limited[0][display]" value="1" checked="checked">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/imagefile_file
1. Open browser DevTools and run: axe.run()
1. Look for rule "label" on selector: #edit-imagefile-file-limited-0-display
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 2. label: Ensure every form element has a label 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-002` |
| **Pattern ID** | `DRU-B8247974` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-BE60C97D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-imagefile-file-limited-1-display
```

**XPath:**
```
//*[@id="edit-imagefile-file-limited-1-display"]
```

**HTML snippet:**
```html
<input class="file-display form-checkbox form-boolean form-boolean--type-checkbox" data-drupal-selector="edit-imagefile-file-limited-1-display" type="checkbox" id="edit-imagefile-file-limited-1-display" name="imagefile_file_limited[1][display]" value="1">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/imagefile_file
1. Open browser DevTools and run: axe.run()
1. Look for rule "label" on selector: #edit-imagefile-file-limited-1-display
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 3. label: Ensure every form element has a label 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-003` |
| **Pattern ID** | `DRU-E627190E` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-50B28CCB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-imagefile-file-limited-dis-0-display
```

**XPath:**
```
//*[@id="edit-imagefile-file-limited-dis-0-display"]
```

**HTML snippet:**
```html
<input class="file-display form-checkbox form-boolean form-boolean--type-checkbox" data-drupal-selector="edit-imagefile-file-limited-dis-0-display" disabled="disabled" type="checkbox" id="edit-imagefile-file-limited-dis-0-display" name="imagefile_file_limited_dis[0][display]" value="1">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/imagefile_file
1. Open browser DevTools and run: axe.run()
1. Look for rule "label" on selector: #edit-imagefile-file-limited-dis-0-display
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 4. label: Ensure every form element has a label 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-004` |
| **Pattern ID** | `DRU-C7AF32C3` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-119D1144]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-imagefile-file-limited-dis-1-display
```

**XPath:**
```
//*[@id="edit-imagefile-file-limited-dis-1-display"]
```

**HTML snippet:**
```html
<input class="file-display form-checkbox form-boolean form-boolean--type-checkbox" data-drupal-selector="edit-imagefile-file-limited-dis-1-display" disabled="disabled" type="checkbox" id="edit-imagefile-file-limited-dis-1-display" name="imagefile_file_limited_dis[1][display]" value="1">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/imagefile_file
1. Open browser DevTools and run: axe.run()
1. Look for rule "label" on selector: #edit-imagefile-file-limited-dis-1-display
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 5. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-005` |
| **Pattern ID** | `DRU-21CE323D` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `page.html.twig` — Page header region |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list `[INS-DD2CFEAB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.gin--sticky-table-header > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]
```

**XPath:**
```
//*[contains(@class,"gin--sticky-table-header > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]")]
```

**HTML snippet:**
```html
<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox" title="Select all rows in this table">
```

**Expected behaviour:** Checkbox has a visible or visually-hidden &lt;label&gt;, or aria-label

**Actual behaviour:** input[title="Select all rows in this table"] — title is the sole label source

**Suggested fix:**
```
Replace the title-only label with aria-label:

<!-- Before (broken) -->
<input type="checkbox" title="{{ 'Select all rows in this table'|t }}">

<!-- After (fixed) -->
<input type="checkbox"
  aria-label="{{ 'Select all rows in this table'|t }}">
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: .gin--sticky-table-header > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 6. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-006` |
| **Pattern ID** | `DRU-B8FD2B8F` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list `[INS-84496B4E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.views-table > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]
```

**XPath:**
```
//*[contains(@class,"views-table > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]")]
```

**HTML snippet:**
```html
<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox" title="Select all rows in this table">
```

**Expected behaviour:** Checkbox has a visible or visually-hidden &lt;label&gt;, or aria-label

**Actual behaviour:** input[title="Select all rows in this table"] — title is the sole label source

**Suggested fix:**
```
Replace the title-only label with aria-label:

<!-- Before (broken) -->
<input type="checkbox" title="{{ 'Select all rows in this table'|t }}">

<!-- After (fixed) -->
<input type="checkbox"
  aria-label="{{ 'Select all rows in this table'|t }}">
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: .views-table > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 7. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-007` |
| **Pattern ID** | `DRU-EF39E687` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-16B1D7C6]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
summary
```

**XPath:**
```
//summary
```

**HTML snippet:**
```html
<summary>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/people
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: summary
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 8. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-008` |
| **Pattern ID** | `DRU-ADC70DBF` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-F50D69D3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
summary > em:nth-child(1)
```

**XPath:**
```
//summary > em:nth-child(1)
```

**HTML snippet:**
```html
<em class="placeholder">Deprecated function</em>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/people
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: summary > em:nth-child(1)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 9. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-009` |
| **Pattern ID** | `DRU-8663917B` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-6F53B36F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
em:nth-child(2)
```

**XPath:**
```
//em:nth-child(2)
```

**HTML snippet:**
```html
<em class="placeholder">Drupal\Core\Entity\ContentEntityBase-&gt;hasTranslation()</em>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/people
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: em:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 10. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-010` |
| **Pattern ID** | `DRU-5176454A` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-FEC9DB9C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
em:nth-child(3)
```

**XPath:**
```
//em:nth-child(3)
```

**HTML snippet:**
```html
<em class="placeholder">984</em>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/people
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: em:nth-child(3)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 11. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-011` |
| **Pattern ID** | `DRU-01633124` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-448C9F3E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
em:nth-child(4)
```

**XPath:**
```
//em:nth-child(4)
```

**HTML snippet:**
```html
<em class="placeholder">core/lib/Drupal/Core/Entity/ContentEntityBase.php</em>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/people
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: em:nth-child(4)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 12. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-012` |
| **Pattern ID** | `DRU-7A2CD202` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/people` — People `[INS-8302F38F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
input[title="Select all rows in this table"]
```

**XPath:**
```
//input[@title="Select all rows in this table"]
```

**HTML snippet:**
```html
<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox" title="Select all rows in this table">
```

**Expected behaviour:** Checkbox has a visible or visually-hidden &lt;label&gt;, or aria-label

**Actual behaviour:** input[title="Select all rows in this table"] — title is the sole label source

**Suggested fix:**
```
Replace the title-only label with aria-label:

<!-- Before (broken) -->
<input type="checkbox" title="{{ 'Select all rows in this table'|t }}">

<!-- After (fixed) -->
<input type="checkbox"
  aria-label="{{ 'Select all rows in this table'|t }}">
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/people
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: input[title="Select all rows in this table"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 13. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-013` |
| **Pattern ID** | `DRU-73CE312F` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-FA33C63D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-submit
```

**XPath:**
```
//*[@id="edit-submit"]
```

**HTML snippet:**
```html
<input class="button button--primary js-form-submit form-submit" tabindex="1" data-drupal-selector="edit-submit" type="submit" id="edit-submit" name="op" value="Primary">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /buttons
1. Open browser DevTools and run: axe.run()
1. Look for rule "tabindex" on selector: #edit-submit
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 14. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-014` |
| **Pattern ID** | `DRU-D3846EC9` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-CB97E6FE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-danger
```

**XPath:**
```
//*[@id="edit-danger"]
```

**HTML snippet:**
```html
<input class="button button--danger js-form-submit form-submit" tabindex="1" data-drupal-selector="edit-danger" type="submit" id="edit-danger" name="op" value="Danger">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /buttons
1. Open browser DevTools and run: axe.run()
1. Look for rule "tabindex" on selector: #edit-danger
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 15. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-015` |
| **Pattern ID** | `DRU-D795F668` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-1E010B2F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-cancel
```

**XPath:**
```
//*[@id="edit-cancel"]
```

**HTML snippet:**
```html
<input class="button js-form-submit form-submit" tabindex="1" data-drupal-selector="edit-cancel" type="submit" id="edit-cancel" name="op" value="Default">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /buttons
1. Open browser DevTools and run: axe.run()
1. Look for rule "tabindex" on selector: #edit-cancel
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 16. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-016` |
| **Pattern ID** | `DRU-377F6525` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-BE07B461]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-submit--2
```

**XPath:**
```
//*[@id="edit-submit--2"]
```

**HTML snippet:**
```html
<input class="button--small button button--primary js-form-submit form-submit" tabindex="1" data-drupal-selector="edit-submit" type="submit" id="edit-submit--2" name="op" value="Primary">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /buttons
1. Open browser DevTools and run: axe.run()
1. Look for rule "tabindex" on selector: #edit-submit--2
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 17. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-017` |
| **Pattern ID** | `DRU-0EA17B95` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-5EF0662D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-danger--2
```

**XPath:**
```
//*[@id="edit-danger--2"]
```

**HTML snippet:**
```html
<input class="button--small button button--danger js-form-submit form-submit" tabindex="1" data-drupal-selector="edit-danger" type="submit" id="edit-danger--2" name="op" value="Danger">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /buttons
1. Open browser DevTools and run: axe.run()
1. Look for rule "tabindex" on selector: #edit-danger--2
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 18. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-018` |
| **Pattern ID** | `DRU-EB1DAE19` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-AB4084D0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-cancel--2
```

**XPath:**
```
//*[@id="edit-cancel--2"]
```

**HTML snippet:**
```html
<input class="button--small button js-form-submit form-submit" tabindex="1" data-drupal-selector="edit-cancel" type="submit" id="edit-cancel--2" name="op" value="Default">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /buttons
1. Open browser DevTools and run: axe.run()
1. Look for rule "tabindex" on selector: #edit-cancel--2
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 19. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-019` |
| **Pattern ID** | `DRU-618AB405` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-7300223F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-checkbox-hidden-label-value
```

**XPath:**
```
//*[@id="edit-checkbox-hidden-label-value"]
```

**HTML snippet:**
```html
<input data-drupal-selector="edit-checkbox-hidden..." aria-describedby="edit-checkbox-hidden..." type="checkbox" id="edit-checkbox-hidden..." name="checkbox_hidden_labe..." value="1" class="form-checkbox form-b..." title="Checkbox with hidden...">
```

**Suggested fix:**
```
Replace title-only labels with aria-label or a visible/visually-hidden <label> element.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/checkbox_radio
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: #edit-checkbox-hidden-label-value
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 20. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-020` |
| **Pattern ID** | `DRU-EA241BBD` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-99BB30ED]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-checkbox-hidden-label-disabled-value
```

**XPath:**
```
//*[@id="edit-checkbox-hidden-label-disabled-value"]
```

**HTML snippet:**
```html
<input data-drupal-selector="edit-checkbox-hidden..." aria-describedby="edit-checkbox-hidden..." disabled="disabled" type="checkbox" id="edit-checkbox-hidden..." name="checkbox_hidden_labe..." value="1" class="form-checkbox form-b..." title="Hidden label, disabl...">
```

**Suggested fix:**
```
Replace title-only labels with aria-label or a visible/visually-hidden <label> element.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/checkbox_radio
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: #edit-checkbox-hidden-label-disabled-value
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 21. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-021` |
| **Pattern ID** | `DRU-62800584` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table `[INS-8DBA7778]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-table > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]
```

**XPath:**
```
//*[@id="edit-table > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]"]
```

**HTML snippet:**
```html
<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox" title="Select all rows in this table">
```

**Expected behaviour:** Checkbox has a visible or visually-hidden &lt;label&gt;, or aria-label

**Actual behaviour:** input[title="Select all rows in this table"] — title is the sole label source

**Suggested fix:**
```
Replace the title-only label with aria-label:

<!-- Before (broken) -->
<input type="checkbox" title="{{ 'Select all rows in this table'|t }}">

<!-- After (fixed) -->
<input type="checkbox"
  aria-label="{{ 'Select all rows in this table'|t }}">
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /table
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: #edit-table > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 22. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-022` |
| **Pattern ID** | `DRU-5BB30588` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table `[INS-78253255]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-table-empty > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]
```

**XPath:**
```
//*[@id="edit-table-empty > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]"]
```

**HTML snippet:**
```html
<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox" title="Select all rows in this table">
```

**Expected behaviour:** Checkbox has a visible or visually-hidden &lt;label&gt;, or aria-label

**Actual behaviour:** input[title="Select all rows in this table"] — title is the sole label source

**Suggested fix:**
```
Replace the title-only label with aria-label:

<!-- Before (broken) -->
<input type="checkbox" title="{{ 'Select all rows in this table'|t }}">

<!-- After (fixed) -->
<input type="checkbox"
  aria-label="{{ 'Select all rows in this table'|t }}">
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /table
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: #edit-table-empty > thead > tr > .select-all.gin--sticky-bulk-select > .form-checkbox.form-boolean[title="Select all rows in this table"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 23. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-023` |
| **Pattern ID** | `DRU-EE53B81A` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-918EAC70]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-terms-tid10"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
```

**XPath:**
```
//tr[@data-drupal-selector="edit-terms-tid10"]
```

**HTML snippet:**
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: tr[data-drupal-selector="edit-terms-tid10"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 24. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-024` |
| **Pattern ID** | `DRU-54F64122` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-EFEE62EB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-terms-tid10-term
```

**XPath:**
```
//*[@id="edit-terms-tid10-term"]
```

**HTML snippet:**
```html
<a href="/taxonomy/term/1" data-drupal-selector="edit-terms-tid10-term" id="edit-terms-tid10-term" hreflang="en" class="menu-item__link">Distineo</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-terms-tid10-term
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 25. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-025` |
| **Pattern ID** | `DRU-EEC5BEC9` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-9FDE3DFB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-terms-tid20"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
```

**XPath:**
```
//tr[@data-drupal-selector="edit-terms-tid20"]
```

**HTML snippet:**
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: tr[data-drupal-selector="edit-terms-tid20"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 26. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-026` |
| **Pattern ID** | `DRU-33873F40` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-19DDC3F2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-terms-tid20-term
```

**XPath:**
```
//*[@id="edit-terms-tid20-term"]
```

**HTML snippet:**
```html
<a href="/taxonomy/term/2" data-drupal-selector="edit-terms-tid20-term" id="edit-terms-tid20-term" hreflang="en" class="menu-item__link">Iaceo</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-terms-tid20-term
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 27. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-027` |
| **Pattern ID** | `DRU-747E8C6F` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-909997A4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-terms-tid30"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
```

**XPath:**
```
//tr[@data-drupal-selector="edit-terms-tid30"]
```

**HTML snippet:**
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: tr[data-drupal-selector="edit-terms-tid30"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 28. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-028` |
| **Pattern ID** | `DRU-1E8DE467` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-975CE61A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-terms-tid30-term
```

**XPath:**
```
//*[@id="edit-terms-tid30-term"]
```

**HTML snippet:**
```html
<a href="/taxonomy/term/3" data-drupal-selector="edit-terms-tid30-term" id="edit-terms-tid30-term" hreflang="en" class="menu-item__link">Sit Turpis</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-terms-tid30-term
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 29. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-029` |
| **Pattern ID** | `DRU-3DE0E158` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-69751826]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-terms-tid40"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
```

**XPath:**
```
//tr[@data-drupal-selector="edit-terms-tid40"]
```

**HTML snippet:**
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: tr[data-drupal-selector="edit-terms-tid40"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 30. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-030` |
| **Pattern ID** | `DRU-966D750D` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-59C73921]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-terms-tid40-term
```

**XPath:**
```
//*[@id="edit-terms-tid40-term"]
```

**HTML snippet:**
```html
<a href="/taxonomy/term/4" data-drupal-selector="edit-terms-tid40-term" id="edit-terms-tid40-term" hreflang="en" class="menu-item__link">Nisl Sed Valetudo</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-terms-tid40-term
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 31. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-031` |
| **Pattern ID** | `DRU-0E1ADE15` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-12D487B9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-terms-tid50"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
```

**XPath:**
```
//tr[@data-drupal-selector="edit-terms-tid50"]
```

**HTML snippet:**
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: tr[data-drupal-selector="edit-terms-tid50"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 32. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-032` |
| **Pattern ID** | `DRU-0F5F76EF` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-E1216827]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-terms-tid50-term
```

**XPath:**
```
//*[@id="edit-terms-tid50-term"]
```

**HTML snippet:**
```html
<a href="/taxonomy/term/5" data-drupal-selector="edit-terms-tid50-term" id="edit-terms-tid50-term" hreflang="en" class="menu-item__link">Quis</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-terms-tid50-term
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 33. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-033` |
| **Pattern ID** | `DRU-F6E6CFF7` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-4F4E16A8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-terms-tid60"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
```

**XPath:**
```
//tr[@data-drupal-selector="edit-terms-tid60"]
```

**HTML snippet:**
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: tr[data-drupal-selector="edit-terms-tid60"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 34. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-034` |
| **Pattern ID** | `DRU-92D7D31F` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-C521B5F5]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-terms-tid60-term
```

**XPath:**
```
//*[@id="edit-terms-tid60-term"]
```

**HTML snippet:**
```html
<a href="/taxonomy/term/6" data-drupal-selector="edit-terms-tid60-term" id="edit-terms-tid60-term" hreflang="en" class="menu-item__link">Cogo</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-terms-tid60-term
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 35. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-035` |
| **Pattern ID** | `DRU-45ABDCEE` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-40950660]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-terms-tid70"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
```

**XPath:**
```
//tr[@data-drupal-selector="edit-terms-tid70"]
```

**HTML snippet:**
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: tr[data-drupal-selector="edit-terms-tid70"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 36. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-036` |
| **Pattern ID** | `DRU-955B315B` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-6511A913]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-terms-tid70-term
```

**XPath:**
```
//*[@id="edit-terms-tid70-term"]
```

**HTML snippet:**
```html
<a href="/taxonomy/term/7" data-drupal-selector="edit-terms-tid70-term" id="edit-terms-tid70-term" hreflang="en" class="menu-item__link">Conventio Exputo</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-terms-tid70-term
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 37. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-037` |
| **Pattern ID** | `DRU-A1DFA589` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-EA0A2E89]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-terms-tid80"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
```

**XPath:**
```
//tr[@data-drupal-selector="edit-terms-tid80"]
```

**HTML snippet:**
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: tr[data-drupal-selector="edit-terms-tid80"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 38. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-038` |
| **Pattern ID** | `DRU-1C52C501` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-DE4DC417]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-terms-tid80-term
```

**XPath:**
```
//*[@id="edit-terms-tid80-term"]
```

**HTML snippet:**
```html
<a href="/taxonomy/term/8" data-drupal-selector="edit-terms-tid80-term" id="edit-terms-tid80-term" hreflang="en" class="menu-item__link">Acsi Valetudo Vero</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-terms-tid80-term
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 39. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-039` |
| **Pattern ID** | `DRU-FEC9AAD6` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-5561BA7E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-terms-tid90"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
```

**XPath:**
```
//tr[@data-drupal-selector="edit-terms-tid90"]
```

**HTML snippet:**
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: tr[data-drupal-selector="edit-terms-tid90"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 40. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-040` |
| **Pattern ID** | `DRU-F3EC297E` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-50579230]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-terms-tid90-term
```

**XPath:**
```
//*[@id="edit-terms-tid90-term"]
```

**HTML snippet:**
```html
<a href="/taxonomy/term/9" data-drupal-selector="edit-terms-tid90-term" id="edit-terms-tid90-term" hreflang="en" class="menu-item__link">Appellatio</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-terms-tid90-term
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 41. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-041` |
| **Pattern ID** | `DRU-0113DE64` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-5724625F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-terms-tid100"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
```

**XPath:**
```
//tr[@data-drupal-selector="edit-terms-tid100"]
```

**HTML snippet:**
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: tr[data-drupal-selector="edit-terms-tid100"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 42. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-042` |
| **Pattern ID** | `DRU-E2AC9F3A` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-175C0510]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-terms-tid100-term
```

**XPath:**
```
//*[@id="edit-terms-tid100-term"]
```

**HTML snippet:**
```html
<a href="/taxonomy/term/10" data-drupal-selector="edit-terms-tid100-term" id="edit-terms-tid100-term" hreflang="en" class="menu-item__link">Refero</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-terms-tid100-term
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 43. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-043` |
| **Pattern ID** | `DRU-7857535C` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-F2FD9B14]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-terms-tid110"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
```

**XPath:**
```
//tr[@data-drupal-selector="edit-terms-tid110"]
```

**HTML snippet:**
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: tr[data-drupal-selector="edit-terms-tid110"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 44. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-044` |
| **Pattern ID** | `DRU-34B781B1` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-F6BB9F6C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#edit-terms-tid110-term
```

**XPath:**
```
//*[@id="edit-terms-tid110-term"]
```

**HTML snippet:**
```html
<a href="/taxonomy/term/11" data-drupal-selector="edit-terms-tid110-term" id="edit-terms-tid110-term" hreflang="en" class="menu-item__link">Consequat Exerci</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabledrag
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-terms-tid110-term
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 45. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-045` |
| **Pattern ID** | `DRU-A42082A0` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabs` — Tabs `[INS-E1FEF2D8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
a[hreflang="en"]
```

**XPath:**
```
//a[@hreflang="en"]
```

**HTML snippet:**
```html
<a href="/tabs" class="language-link is-active" hreflang="en" data-drupal-link-system-path="tabs" aria-current="page">English</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabs
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: a[hreflang="en"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 46. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-046` |
| **Pattern ID** | `DRU-0D84B0B5` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabs` — Tabs `[INS-61C46E9A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
a[hreflang="he"]
```

**XPath:**
```
//a[@hreflang="he"]
```

**HTML snippet:**
```html
<a href="/he/tabs" class="language-link" hreflang="he" data-drupal-link-system-path="tabs">Hebrew</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabs
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: a[hreflang="he"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 47. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-047` |
| **Pattern ID** | `DRU-BEADC0A1` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 53 of 57 pages (93%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage `[INS-023C0C14]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/action-link` — Action link demo `[INS-317C3E04]`
- `/user/login` — User login `[INS-51939F77]`

<details><summary>Show 50 more affected page(s)</summary>

- `/user/register` — User register `[INS-C480966D]`
- `/user/password` — User password reset `[INS-86B29A81]`
- `/search/node` — Search results `[INS-7FE60C8F]`
- `/this-page-does-not-exist` — 404 page `[INS-ADE63447]`
- `/admin` — Admin dashboard `[INS-2BC359AA]`
- `/admin/form_style` — Form style demo `[INS-6AB57AEA]`
- `/admin/content` — Content list `[INS-7ECAFC89]`
- `/node/add/article` — Create article `[INS-6ED652BE]`
- `/node/add/page` — Create basic page `[INS-7C9BAB59]`
- `/admin/structure` — Structure `[INS-65B63B2A]`
- `/admin/structure/types` — Content types `[INS-69A67690]`
- `/admin/structure/types/add` — Add content type `[INS-3D37A534]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-7C35EF21]`
- `/admin/structure/taxonomy/add` — Add vocabulary `[INS-83B31CD4]`
- `/admin/structure/block` — Block layout `[INS-B723E4A5]`
- `/admin/appearance` — Appearance `[INS-749172A9]`
- `/admin/modules` — Modules `[INS-CA5C3957]`
- `/admin/people` — People `[INS-3F530281]`
- `/user/1/edit` — User edit (uid 1) `[INS-3E34BE50]`
- `/admin/config` — Configuration `[INS-FD3B185F]`
- `/admin/config/content/formats` — Text formats `[INS-C8614C7B]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-3AF674C3]`
- `/admin/config/system/site-information` — Site information `[INS-6320C953]`
- `/admin/reports` — Reports `[INS-9A54A2EB]`
- `/autocomplete` — Autocomplete `[INS-5E8287AA]`
- `/buttons` — Buttons `[INS-3CE8FBB6]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-4E6A3FA5]`
- `/dialog` — Dialogs `[INS-AF529309]`
- `/dropbutton` — Dropbuttons `[INS-AB8D09EE]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-C9642097]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-E8198B23]`
- `/fieldset` — Fieldset `[INS-5203A0C5]`
- `/contact/imagefile_file` — File `[INS-18A061F4]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-B7DF5A80]`
- `/contact/imagefile_image` — Image `[INS-648C8E57]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name `[INS-23EA3354]`
- `/message` — Messages `[INS-669C0770]`
- `/cd-navigation/config` — Nav config `[INS-4EFAC109]`
- `/contact/presuf_number` — Number prefix suffix `[INS-EF3929F2]`
- `/tabs/format/plain_text` — Page title `[INS-D87544B8]`
- `/password` — Password `[INS-8FE979C9]`
- `/progress` — Progress `[INS-21045FA4]`
- `/contact/select` — Select `[INS-20A2C7EA]`
- `/node/add/cd` — Sidebar `[INS-DCAAB136]`
- `/table` — Table `[INS-81E67302]`
- `/tabledrag` — Tabledrag `[INS-251B8A53]`
- `/tabs` — Tabs `[INS-118CCCFC]`
- `/contact/textform` — Text `[INS-948D3AEC]`
- `/contact/presuf_text` — Text prefix suffix `[INS-489E4EF2]`
- `/contact/textarea` — Textarea `[INS-183CA727]`

</details>

**Selector:**
```css
.themeswitcher-form__form-item
```

**XPath:**
```
//*[contains(@class,"themeswitcher-form__form-item")]
```

**HTML snippet:**
```html
<div class="themeswitcher-form__form-item js-form-item form-item js-form-type-select form-type--select js-form-item-preferred-theme form-item--preferred-theme">
```

**Suggested fix:**
```
Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: .themeswitcher-form__form-item
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 48. Local task tab headings (#primary-tabs-title) are outside any landmark region 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-048` |
| **Pattern ID** | `DRU-12C757FE` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 26 of 57 pages (46%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/user/login` — User login `[INS-7673A87D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/user/password` — User password reset `[INS-AEC6712F]`
- `/admin` — Admin dashboard `[INS-F2EB03C6]`

<details><summary>Show 23 more affected page(s)</summary>

- `/admin/content` — Content list `[INS-7FB7F6F3]`
- `/admin/structure/types` — Content types `[INS-EEF2CE40]`
- `/admin/appearance` — Appearance `[INS-46D3196E]`
- `/admin/modules` — Modules `[INS-3E09EEF4]`
- `/admin/people` — People `[INS-EE770D58]`
- `/buttons` — Buttons `[INS-F6432838]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-B0A03F4B]`
- `/dropbutton` — Dropbuttons `[INS-DDA431B9]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-48E4AA67]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-A922E31E]`
- `/contact/imagefile_file` — File `[INS-51749CC3]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-3BA6B393]`
- `/contact/imagefile_image` — Image `[INS-EF624A40]`
- `/message` — Messages `[INS-77D00602]`
- `/contact/presuf_number` — Number prefix suffix `[INS-D15BAD4E]`
- `/tabs/format/plain_text` — Page title `[INS-9A89097D]`
- `/progress` — Progress `[INS-6169DF52]`
- `/contact/select` — Select `[INS-0A2DEB10]`
- `/tabledrag` — Tabledrag `[INS-E9F2DC81]`
- `/tabs` — Tabs `[INS-E58F014B]`
- `/contact/textform` — Text `[INS-04C2BAFF]`
- `/contact/presuf_text` — Text prefix suffix `[INS-E880098F]`
- `/contact/textarea` — Textarea `[INS-ABE49239]`

</details>

**Selector:**
```css
#primary-tabs-title
```

**XPath:**
```
//*[@id="primary-tabs-title"]
```

**HTML snippet:**
```html
<h2 id="primary-tabs-title" class="visually-hidden">Primary tabs</h2>
```

**Expected behaviour:** The &lt;h2&gt; heading is inside the &lt;nav&gt; it labels, or the &lt;nav&gt; itself is inside a landmark

**Actual behaviour:** &lt;h2 id="primary-tabs-title"&gt; is a sibling of &lt;nav&gt;, and the nav may be outside main/aside/etc.

**Suggested fix:**
```
Move the heading inside the <nav> it labels:

{# Before #}
<h2 id="primary-tabs-title" class="visually-hidden">{{ 'Primary tabs'|t }}</h2>
<nav class="tabs-wrapper" aria-labelledby="primary-tabs-title">…</nav>

{# After — h2 moves inside nav #}
<nav class="tabs-wrapper" aria-labelledby="primary-tabs-title">
  <h2 id="primary-tabs-title" class="visually-hidden">{{ 'Primary tabs'|t }}</h2>
  …
</nav>
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /user/login
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #primary-tabs-title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 49. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-049` |
| **Pattern ID** | `DRU-29F2A975` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 5 of 57 pages (9%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-5C83C5F5]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types` — Content types `[INS-C896D316]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-CDE60A4E]`

<details><summary>Show 2 more affected page(s)</summary>

- `/admin/people` — People `[INS-2D2FC944]`
- `/admin/config/content/formats` — Text formats `[INS-C356267E]`

</details>

**Selector:**
```css
.top-bar__actions
```

**XPath:**
```
//*[contains(@class,"top-bar__actions")]
```

**HTML snippet:**
```html
<div class="top-bar__actions">
```

**Suggested fix:**
```
Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: .top-bar__actions
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 50. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-050` |
| **Pattern ID** | `DRU-6825C79C` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 57 pages (7%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-9ABEE34E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/user/login` — User login (mobile) `[INS-2105F176]`
- `/admin` — Admin dashboard (mobile) `[INS-984F7D3B]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/structure/block` — Block layout (mobile) `[INS-ED320798]`

</details>

**Selector:**
```css
.themeswitcher-form__form-item
```

**XPath:**
```
//*[contains(@class,"themeswitcher-form__form-item")]
```

**HTML snippet:**
```html
<div class="themeswitcher-form__form-item js-form-item form-item js-form-type-select form-type--select js-form-item-preferred-theme form-item--preferred-theme">
```

**Suggested fix:**
```
Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: .themeswitcher-form__form-item
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 51. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-051` |
| **Pattern ID** | `DRU-C00D2E42` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 57 pages (7%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/admin/appearance` — Appearance `[INS-DCB43CC7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/modules` — Modules `[INS-C44A7FD6]`
- `/admin/people` — People `[INS-1EE31A79]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/config` — Configuration `[INS-06BA831F]`

</details>

**Selector:**
```css
.messages-list__item
```

**XPath:**
```
//*[contains(@class,"messages-list__item")]
```

**HTML snippet:**
```html
<div role="contentinfo" aria-labelledby="message-error-title" class="messages-list__item messages messages--error">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/appearance
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-contentinfo-is-top-level" on selector: .messages-list__item
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 52. Local task tab headings (#primary-tabs-title) are outside any landmark region 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-052` |
| **Pattern ID** | `DRU-4D24D5C1` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 3 of 57 pages (5%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-766BAFCD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-6EFCD229]`
- `/tabs` — Tabs `[INS-B6E097E4]`

**Selector:**
```css
#secondary-tabs-title
```

**XPath:**
```
//*[@id="secondary-tabs-title"]
```

**HTML snippet:**
```html
<h2 id="secondary-tabs-title" class="visually-hidden">Secondary tabs</h2>
```

**Expected behaviour:** The &lt;h2&gt; heading is inside the &lt;nav&gt; it labels, or the &lt;nav&gt; itself is inside a landmark

**Actual behaviour:** &lt;h2 id="primary-tabs-title"&gt; is a sibling of &lt;nav&gt;, and the nav may be outside main/aside/etc.

**Suggested fix:**
```
Move the heading inside the <nav> it labels:

{# Before #}
<h2 id="primary-tabs-title" class="visually-hidden">{{ 'Primary tabs'|t }}</h2>
<nav class="tabs-wrapper" aria-labelledby="primary-tabs-title">…</nav>

{# After — h2 moves inside nav #}
<nav class="tabs-wrapper" aria-labelledby="primary-tabs-title">
  <h2 id="primary-tabs-title" class="visually-hidden">{{ 'Primary tabs'|t }}</h2>
  …
</nav>
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #secondary-tabs-title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 53. Local task tab headings (#primary-tabs-title) are outside any landmark region 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-053` |
| **Pattern ID** | `DRU-E877649B` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 57 pages (4%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/user/login` — User login (mobile) `[INS-37AE3494]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin` — Admin dashboard (mobile) `[INS-1A1B9A1F]`

**Selector:**
```css
#primary-tabs-title
```

**XPath:**
```
//*[@id="primary-tabs-title"]
```

**HTML snippet:**
```html
<h2 id="primary-tabs-title" class="visually-hidden">Primary tabs</h2>
```

**Expected behaviour:** The &lt;h2&gt; heading is inside the &lt;nav&gt; it labels, or the &lt;nav&gt; itself is inside a landmark

**Actual behaviour:** &lt;h2 id="primary-tabs-title"&gt; is a sibling of &lt;nav&gt;, and the nav may be outside main/aside/etc.

**Suggested fix:**
```
Move the heading inside the <nav> it labels:

{# Before #}
<h2 id="primary-tabs-title" class="visually-hidden">{{ 'Primary tabs'|t }}</h2>
<nav class="tabs-wrapper" aria-labelledby="primary-tabs-title">…</nav>

{# After — h2 moves inside nav #}
<nav class="tabs-wrapper" aria-labelledby="primary-tabs-title">
  <h2 id="primary-tabs-title" class="visually-hidden">{{ 'Primary tabs'|t }}</h2>
  …
</nav>
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /user/login
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #primary-tabs-title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 54. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-054` |
| **Pattern ID** | `DRU-5F06D518` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-AD7AD85F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
div[data-drupal-selector="edit-test-datelist"] > h4
```

**XPath:**
```
//div[@data-drupal-selector="edit-test-datelist"]
```

**HTML snippet:**
```html
<h4 class="form-item__label">Datelist</h4>
```

**Suggested fix:**
```
Heading levels must not skip. Audit the page heading hierarchy and adjust template markup.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/form_style
1. Open browser DevTools and run: axe.run()
1. Look for rule "heading-order" on selector: div[data-drupal-selector="edit-test-datelist"] > h4
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 55. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-055` |
| **Pattern ID** | `DRU-D87CB13C` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-89B60615]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#pagination-heading
```

**XPath:**
```
//*[@id="pagination-heading"]
```

**HTML snippet:**
```html
<h4 id="pagination-heading" class="visually-hidden">Pagination</h4>
```

**Suggested fix:**
```
Heading levels must not skip. Audit the page heading hierarchy and adjust template markup.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "heading-order" on selector: #pagination-heading
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 56. region: Ensure all page content is contained by landmarks 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-056` |
| **Pattern ID** | `DRU-3A6B5B95` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `toolbar (admin theme)` — Admin toolbar |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/user/1/edit` — User edit (uid 1) `[INS-A980325B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.toolbar-title__label
```

**XPath:**
```
//*[contains(@class,"toolbar-title__label")]
```

**HTML snippet:**
```html
<span class="toolbar-title__label">
        admin
    </span>
```

**Suggested fix:**
```
Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /user/1/edit
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: .toolbar-title__label
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 57. Local task tab headings (#primary-tabs-title) are outside any landmark region 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-057` |
| **Pattern ID** | `DRU-BDE7B1F5` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout (mobile) `[INS-E0153F92]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#secondary-tabs-title
```

**XPath:**
```
//*[@id="secondary-tabs-title"]
```

**HTML snippet:**
```html
<h2 id="secondary-tabs-title" class="visually-hidden">Secondary tabs</h2>
```

**Expected behaviour:** The &lt;h2&gt; heading is inside the &lt;nav&gt; it labels, or the &lt;nav&gt; itself is inside a landmark

**Actual behaviour:** &lt;h2 id="primary-tabs-title"&gt; is a sibling of &lt;nav&gt;, and the nav may be outside main/aside/etc.

**Suggested fix:**
```
Move the heading inside the <nav> it labels:

{# Before #}
<h2 id="primary-tabs-title" class="visually-hidden">{{ 'Primary tabs'|t }}</h2>
<nav class="tabs-wrapper" aria-labelledby="primary-tabs-title">…</nav>

{# After — h2 moves inside nav #}
<nav class="tabs-wrapper" aria-labelledby="primary-tabs-title">
  <h2 id="primary-tabs-title" class="visually-hidden">{{ 'Primary tabs'|t }}</h2>
  …
</nav>
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #secondary-tabs-title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 58. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-058` |
| **Pattern ID** | `DRU-B9B0B039` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/autocomplete` — Autocomplete `[INS-660145AD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
h4
```

**XPath:**
```
//h4
```

**HTML snippet:**
```html
<h4 class="form-item__label form-item__label--multiple-value-form">Select some other countries</h4>
```

**Suggested fix:**
```
Heading levels must not skip. Audit the page heading hierarchy and adjust template markup.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /autocomplete
1. Open browser DevTools and run: axe.run()
1. Look for rule "heading-order" on selector: h4
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 59. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-059` |
| **Pattern ID** | `DRU-F5FD6EDF` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-AF38AAE0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#multitext-unlimited-values > thead > tr > .field-label[colspan="2"] > h4
```

**XPath:**
```
//*[@id="multitext-unlimited-values > thead > tr > .field-label[colspan="2"] > h4"]
```

**HTML snippet:**
```html
<h4 class="form-item__label form-item__label--multiple-value-form">Multiple, unlimited text</h4>
```

**Suggested fix:**
```
Heading levels must not skip. Audit the page heading hierarchy and adjust template markup.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/field_cardinality_test
1. Open browser DevTools and run: axe.run()
1. Look for rule "heading-order" on selector: #multitext-unlimited-values > thead > tr > .field-label[colspan="2"] > h4
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 60. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-060` |
| **Pattern ID** | `DRU-CCABA040` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-6D6D5C15]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-formatted-m-values > thead > tr > .field-label[colspan="2"] > .form-item__label--multiple-value-form.form-item__label
```

**XPath:**
```
//*[@id="presuf-formatted-m-values > thead > tr > .field-label[colspan="2"] > .form-item__label--multiple-value-form.form-item__label"]
```

**HTML snippet:**
```html
<h4 class="form-item__label form-item__label--multiple-value-form">Formatted multiple</h4>
```

**Suggested fix:**
```
Heading levels must not skip. Audit the page heading hierarchy and adjust template markup.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_formatted
1. Open browser DevTools and run: axe.run()
1. Look for rule "heading-order" on selector: #presuf-formatted-m-values > thead > tr > .field-label[colspan="2"] > .form-item__label--multiple-value-form.form-item__label
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 61. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-061` |
| **Pattern ID** | `DRU-860BF298` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-F2087635]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.messages--status
```

**XPath:**
```
//*[contains(@class,"messages--status")]
```

**HTML snippet:**
```html
<div role="contentinfo" aria-labelledby="message-status-title" class="messages-list__item messages messages--status">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /message
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-contentinfo-is-top-level" on selector: .messages--status
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 62. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-062` |
| **Pattern ID** | `DRU-97B8237F` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-AC231861]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.messages--info
```

**XPath:**
```
//*[contains(@class,"messages--info")]
```

**HTML snippet:**
```html
<div role="contentinfo" aria-labelledby="message-info-title" class="messages-list__item messages messages--info">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /message
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-contentinfo-is-top-level" on selector: .messages--info
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 63. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-063` |
| **Pattern ID** | `DRU-5AA049DF` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-075FF78C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.messages--warning
```

**XPath:**
```
//*[contains(@class,"messages--warning")]
```

**HTML snippet:**
```html
<div role="contentinfo" aria-labelledby="message-warning-title" class="messages-list__item messages messages--warning">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /message
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-contentinfo-is-top-level" on selector: .messages--warning
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 64. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-064` |
| **Pattern ID** | `DRU-DC7ECF8A` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-0671C8F1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.messages--error
```

**XPath:**
```
//*[contains(@class,"messages--error")]
```

**HTML snippet:**
```html
<div role="contentinfo" aria-labelledby="message-error-title" class="messages-list__item messages messages--error">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /message
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-contentinfo-is-top-level" on selector: .messages--error
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 65. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-065` |
| **Pattern ID** | `DRU-49FF0418` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-1B0FD750]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.messages--custom
```

**XPath:**
```
//*[contains(@class,"messages--custom")]
```

**HTML snippet:**
```html
<div role="contentinfo" aria-labelledby="message-custom-title" class="messages-list__item messages messages--custom">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /message
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-contentinfo-is-top-level" on selector: .messages--custom
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 66. Status messages block uses role="contentinfo", duplicating the page &lt;footer&gt; 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-066` |
| **Pattern ID** | `DRU-AC4DC5D3` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`landmark-no-duplicate-contentinfo`](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/misc/status-messages.html.twig, core/modules/system/templates/status-messages.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/message` — Messages `[INS-9D992776]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.messages--status
```

**XPath:**
```
//*[contains(@class,"messages--status")]
```

**HTML snippet:**
```html
<div role="contentinfo" aria-labelledby="message-status-title" class="messages-list__item messages messages--status">
```

**Expected behaviour:** Status messages use role="status" (non-error) or role="alert" (errors)

**Actual behaviour:** &lt;div role="contentinfo" aria-labelledby="…"&gt; — conflicts with the page footer landmark

**Suggested fix:**
```
Change the outer wrapper role based on message type:

{# Before (broken) #}
<div role="contentinfo" aria-labelledby="{{ title_ids[type] }}"…>

{# After (fixed) #}
{%- set msg_role = (type == 'error') ? 'alert' : 'status' -%}
<div role="{{ msg_role }}" aria-labelledby="{{ title_ids[type] }}"…>
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /message
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-no-duplicate-contentinfo" on selector: .messages--status
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 67. landmark-unique: Ensure landmarks are unique 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-067` |
| **Pattern ID** | `DRU-BEF75404` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`landmark-unique`](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-ED81C1A7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.messages--info
```

**XPath:**
```
//*[contains(@class,"messages--info")]
```

**HTML snippet:**
```html
<div role="contentinfo" aria-labelledby="message-info-title" class="messages-list__item messages messages--info">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /message
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-unique" on selector: .messages--info
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 68. Admin Configuration page has heading-order violations (h3 appears before h2) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-068` |
| **Pattern ID** | `DRU-6402BE1E` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/cd-navigation/config` — Nav config `[INS-98B8C273]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.layout-column.layout-column--half:nth-child(1) > .panel.gin-layer-wrapper:nth-child(1) > .panel__title
```

**XPath:**
```
//*[contains(@class,"layout-column.layout-column--half:nth-child(1) > .panel.gin-layer-wrapper:nth-child(1) > .panel__title")]
```

**HTML snippet:**
```html
<h3 class="panel__title">People</h3>
```

**Expected behaviour:** Heading levels increment by one: h1 → h2 → h3

**Actual behaviour:** Panel titles use &lt;h3&gt; but their section headings may be absent or at wrong level

**Suggested fix:**
```
Audit the heading hierarchy on /admin/config and adjust panel titles:

{# system-admin-index.html.twig — ensure section uses h2, panel uses h3 #}
<h2 class="system-admin-section__title">{{ section.title }}</h2>
<div class="panel">
  <h3 class="panel__title">{{ panel.title }}</h3>
</div>
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /cd-navigation/config
1. Open browser DevTools and run: axe.run()
1. Look for rule "heading-order" on selector: .layout-column.layout-column--half:nth-child(1) > .panel.gin-layer-wrapper:nth-child(1) > .panel__title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 69. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-069` |
| **Pattern ID** | `DRU-DF35BDC8` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-CA644E21]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-number-m-values > thead > tr > .field-label[colspan="2"] > h4
```

**XPath:**
```
//*[@id="presuf-number-m-values > thead > tr > .field-label[colspan="2"] > h4"]
```

**HTML snippet:**
```html
<h4 class="form-item__label form-item__label--multiple-value-form">Number multiple</h4>
```

**Suggested fix:**
```
Heading levels must not skip. Audit the page heading hierarchy and adjust template markup.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_number
1. Open browser DevTools and run: axe.run()
1. Look for rule "heading-order" on selector: #presuf-number-m-values > thead > tr > .field-label[colspan="2"] > h4
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 70. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-070` |
| **Pattern ID** | `DRU-4109944F` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/textform` — Text `[INS-F63732FE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
div[data-drupal-selector="edit-timestamp-0-value"] > h4
```

**XPath:**
```
//div[@data-drupal-selector="edit-timestamp-0-value"]
```

**HTML snippet:**
```html
<h4 class="form-item__label">Timestamp</h4>
```

**Suggested fix:**
```
Heading levels must not skip. Audit the page heading hierarchy and adjust template markup.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/textform
1. Open browser DevTools and run: axe.run()
1. Look for rule "heading-order" on selector: div[data-drupal-selector="edit-timestamp-0-value"] > h4
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 71. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-071` |
| **Pattern ID** | `DRU-8E7417E8` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-4BD9AFF2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-text-m-values > thead > tr > .field-label[colspan="2"] > h4
```

**XPath:**
```
//*[@id="presuf-text-m-values > thead > tr > .field-label[colspan="2"] > h4"]
```

**HTML snippet:**
```html
<h4 class="form-item__label form-item__label--multiple-value-form">Text multiple</h4>
```

**Suggested fix:**
```
Heading levels must not skip. Audit the page heading hierarchy and adjust template markup.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_text
1. Open browser DevTools and run: axe.run()
1. Look for rule "heading-order" on selector: #presuf-text-m-values > thead > tr > .field-label[colspan="2"] > h4
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 72. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-072` |
| **Pattern ID** | `DRU-B0DFDE0B` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 57 pages (4%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-D7BACABF]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-D6BE32A1]`

**Selector:**
```css
h3:nth-child(3)
```

**XPath:**
```
//h3:nth-child(3)
```

**HTML snippet:**
```html
<h3></h3>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /dialog
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h3:nth-child(3)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 73. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-073` |
| **Pattern ID** | `DRU-F3CC681C` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 57 pages (4%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-371DBCD2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-F997380A]`

**Selector:**
```css
h3:nth-child(4)
```

**XPath:**
```
//h3:nth-child(4)
```

**HTML snippet:**
```html
<h3></h3>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /dialog
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h3:nth-child(4)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 74. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-074` |
| **Pattern ID** | `DRU-8F1B594E` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 57 pages (4%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-E5F96F75]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-83E8178A]`

**Selector:**
```css
h3:nth-child(5)
```

**XPath:**
```
//h3:nth-child(5)
```

**HTML snippet:**
```html
<h3></h3>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /dialog
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h3:nth-child(5)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 75. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-075` |
| **Pattern ID** | `DRU-61489B02` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 57 pages (4%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-3A577D00]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-7B973A20]`

**Selector:**
```css
h3:nth-child(6)
```

**XPath:**
```
//h3:nth-child(6)
```

**HTML snippet:**
```html
<h3></h3>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /dialog
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h3:nth-child(6)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 76. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-076` |
| **Pattern ID** | `DRU-DC320928` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/` — Homepage `[INS-CFB3289F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
h1
```

**XPath:**
```
//h1
```

**HTML snippet:**
```html
<h1 class="page-title"></h1>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h1
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 77. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-077` |
| **Pattern ID** | `DRU-0CA45C5C` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-F4899C6A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
h1
```

**XPath:**
```
//h1
```

**HTML snippet:**
```html
<h1 class="page-title"></h1>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h1
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 78. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-078` |
| **Pattern ID** | `DRU-91E9D7B3` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/autocomplete` — Autocomplete `[INS-26892199]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
th:nth-child(2)
```

**XPath:**
```
//th:nth-child(2)
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /autocomplete
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 79. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-079` |
| **Pattern ID** | `DRU-B919231C` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-EA5B8A17]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
h3:nth-child(7)
```

**XPath:**
```
//h3:nth-child(7)
```

**HTML snippet:**
```html
<h3></h3>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /dialog
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h3:nth-child(7)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 80. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-080` |
| **Pattern ID** | `DRU-1BC9286C` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-725927F0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
h3:nth-child(8)
```

**XPath:**
```
//h3:nth-child(8)
```

**HTML snippet:**
```html
<h3></h3>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /dialog
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h3:nth-child(8)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 81. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-081` |
| **Pattern ID** | `DRU-C4407003` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-360A0D6A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#multitext-unlimited-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="multitext-unlimited-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/field_cardinality_test
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #multitext-unlimited-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 82. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-082` |
| **Pattern ID** | `DRU-41877E07` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-C10F18FC]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#multitext-unlimited-disabled-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="multitext-unlimited-disabled-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th class="is-disabled"></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/field_cardinality_test
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #multitext-unlimited-disabled-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 83. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-083` |
| **Pattern ID** | `DRU-0B43126A` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-D53FA970]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#multitext-unlimited-required-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="multitext-unlimited-required-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/field_cardinality_test
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #multitext-unlimited-required-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 84. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-084` |
| **Pattern ID** | `DRU-CB4F3AEA` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-43A5C17A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#multitext-unlimited-required-dis-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="multitext-unlimited-required-dis-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th class="is-disabled"></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/field_cardinality_test
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #multitext-unlimited-required-dis-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 85. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-085` |
| **Pattern ID** | `DRU-B5EA9FA7` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-A3B5FE2C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#multitext-limited-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="multitext-limited-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/field_cardinality_test
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #multitext-limited-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 86. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-086` |
| **Pattern ID** | `DRU-0E527276` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-3651232B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#multitext-limited-disabled-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="multitext-limited-disabled-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th class="is-disabled"></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/field_cardinality_test
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #multitext-limited-disabled-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 87. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-087` |
| **Pattern ID** | `DRU-E9E19F4B` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-B8AF602F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#multitext-limited-required-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="multitext-limited-required-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/field_cardinality_test
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #multitext-limited-required-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 88. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-088` |
| **Pattern ID** | `DRU-543937BC` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-C74017F8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#multitext-limited-required-dis-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="multitext-limited-required-dis-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th class="is-disabled"></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/field_cardinality_test
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #multitext-limited-required-dis-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 89. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-089` |
| **Pattern ID** | `DRU-1EC10798` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-C3B12B15]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-formatted-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-formatted-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_formatted
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-formatted-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 90. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-090` |
| **Pattern ID** | `DRU-B07AC371` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-BA455956]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-formatted-pre-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-formatted-pre-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_formatted
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-formatted-pre-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 91. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-091` |
| **Pattern ID** | `DRU-14DE3E53` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-FBC59961]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-formatted-suf-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-formatted-suf-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_formatted
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-formatted-suf-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 92. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-092` |
| **Pattern ID** | `DRU-876EF858` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-51F27631]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-formatted-pre-suf-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-formatted-pre-suf-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_formatted
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-formatted-pre-suf-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 93. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-093` |
| **Pattern ID** | `DRU-2162B464` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-6AA8EB01]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-number-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-number-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_number
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-number-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 94. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-094` |
| **Pattern ID** | `DRU-92E64EFC` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-A2526406]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-number-pre-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-number-pre-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_number
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-number-pre-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 95. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-095` |
| **Pattern ID** | `DRU-3BE0F134` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-D06193A0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-number-suf-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-number-suf-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_number
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-number-suf-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 96. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-096` |
| **Pattern ID** | `DRU-FAF990A8` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-CEF0BFAD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-number-pre-suf-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-number-pre-suf-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_number
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-number-pre-suf-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 97. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-097` |
| **Pattern ID** | `DRU-7DE00366` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs/format/plain_text` — Page title `[INS-D3EE3DA3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#block-default-admin-content > h3
```

**XPath:**
```
//*[@id="block-default-admin-content > h3"]
```

**HTML snippet:**
```html
<h3></h3>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabs/format/plain_text
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: #block-default-admin-content > h3
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 98. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-098` |
| **Pattern ID** | `DRU-EF28D265` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs `[INS-EEA43C0F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#block-default-admin-content > h3:nth-child(1)
```

**XPath:**
```
//*[@id="block-default-admin-content > h3:nth-child(1)"]
```

**HTML snippet:**
```html
<h3></h3>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabs
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: #block-default-admin-content > h3:nth-child(1)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 99. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-099` |
| **Pattern ID** | `DRU-80462EDA` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs `[INS-C110C4C6]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
h3:nth-child(2)
```

**XPath:**
```
//h3:nth-child(2)
```

**HTML snippet:**
```html
<h3></h3>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /tabs
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h3:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 100. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-100` |
| **Pattern ID** | `DRU-B1DF265A` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-B3402323]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-text-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-text-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_text
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-text-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 101. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-101` |
| **Pattern ID** | `DRU-5CF38AB2` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-AF3AB5E5]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-text-pre-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-text-pre-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_text
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-text-pre-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 102. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-102` |
| **Pattern ID** | `DRU-7C13E8BF` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-51251403]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-text-suf-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-text-suf-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_text
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-text-suf-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 103. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-103` |
| **Pattern ID** | `DRU-08D74B05` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 57 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-543CB5A0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
#presuf-text-pre-suf-m-values > thead > tr > th:nth-child(2)
```

**XPath:**
```
//*[@id="presuf-text-pre-suf-m-values > thead > tr > th:nth-child(2)"]
```

**HTML snippet:**
```html
<th></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /contact/presuf_text
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #presuf-text-pre-suf-m-values > thead > tr > th:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js
