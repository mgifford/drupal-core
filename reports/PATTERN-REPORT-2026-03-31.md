# Drupal Core Accessibility Bug Report

> **Generated:** 2026-03-31T20:49:27.390Z
> **Tool:** axe-core via @axe-core/playwright | **Browser:** Chromium
> **Standard:** [ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md](https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)

## Summary

| Metric | Value |
| :--- | :--- |
| Pages crawled | 66 |
| Total violation instances | 51 |
| Unique patterns | 26 |
| Template-level patterns (≥3 pages) 🔁 | 4 |
| Critical | 0 |
| Serious | 10 |
| Moderate | 12 |
| Minor | 4 |

## Cross-Theme Analysis

Issues found across multiple Drupal themes. Universal issues affect ALL tested themes
and are highest priority for core fixes since a single template change benefits everyone.

**Themes tested:** claro, admin, olivero

### 🌐 Universal Issues (appear in ALL themes)

_No universal issues found across all tested themes._

### 🔗 Multi-Theme Issues (appear in 2+ themes)

| Pattern ID | Rule | Impact | Screen | Themes | Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DRU-7A2CD202` | `label-title-only` | **serious** | desktop | claro, admin | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-12C757FE` | `region` | **moderate** | desktop | admin, olivero | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-C00D2E42` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin, claro | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-E877649B` | `region` | **moderate** | mobile | admin, olivero | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-DC320928` | `empty-heading` | **minor** | desktop | claro, admin | empty-heading: Ensure headings have discernible text |
| `DRU-0CA45C5C` | `empty-heading` | **minor** | mobile | claro, admin | empty-heading: Ensure headings have discernible text |

### 🎨 Theme-Specific Issue Counts

| Theme | Unique Issues |
| :--- | :--- |
| `claro` | 1 |
| `admin` | 11 |
| `olivero` | 2 |

## Issues (sorted by priority: impact × frequency)

🔁 = Template-level issue (≥3 pages) — fix once, improves many pages.

---

### 1. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-001` |
| **Pattern ID** | `DRU-90FD983D` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 66 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-30CCB04A]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-9E3C567D]`

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
<input class="button--small button button--primary js-form-submit form-submit" data-drupal-selector="edit-submit" type="submit" id="edit-submit" name="op" value="Apply to selected items">
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: #edit-submit
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 2. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-002` |
| **Pattern ID** | `DRU-7A2CD202` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 66 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-333A0C48]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-A6512BE5]`

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

**Expected behaviour:** Checkbox has a visible or visually-hidden <label>, or aria-label

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
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: input[title="Select all rows in this table"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 3. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-003` |
| **Pattern ID** | `DRU-EF39E687` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 66 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-78B149AB]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-16B1D7C6]`

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
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: summary
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 4. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-004` |
| **Pattern ID** | `DRU-ADC70DBF` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 66 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-311DEB3E]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-F50D69D3]`

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
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: summary > em:nth-child(1)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 5. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-005` |
| **Pattern ID** | `DRU-8663917B` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 66 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-C9600730]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-6F53B36F]`

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
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: em:nth-child(2)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 6. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-006` |
| **Pattern ID** | `DRU-5176454A` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 66 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-5C17405E]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-FEC9DB9C]`

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
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: em:nth-child(3)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 7. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-007` |
| **Pattern ID** | `DRU-01633124` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 66 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-05A5DDCD]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-448C9F3E]`

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
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: em:nth-child(4)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 8. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-008` |
| **Pattern ID** | `DRU-621BE3AF` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `node.html.twig` — Node template |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-98719E8E]`

**Selector:**
```css
.gin--sticky-table-header > thead > tr > .select-all.gin--sticky-bulk-select.views-field-node-bulk-form > .form-checkbox.form-boolean[title="Select all rows in this table"]
```

**XPath:**
```
//*[contains(@class,"gin--sticky-table-header > thead > tr > .select-all.gin--sticky-bulk-select.views-field-node-bulk-form > .form-checkbox.form-boolean[title="Select all rows in this table"]")]
```

**HTML snippet:**
```html
<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox" title="Select all rows in this table">
```

**Expected behaviour:** Checkbox has a visible or visually-hidden <label>, or aria-label

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
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: .gin--sticky-table-header > thead > tr > .select-all.gin--sticky-bulk-select.views-field-node-bulk-form > .form-checkbox.form-boolean[title="Select all rows in this table"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 9. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-009` |
| **Pattern ID** | `DRU-CF83DCA0` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `node.html.twig` — Node template |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-2D2077BA]`

**Selector:**
```css
.views-table > thead > tr > .select-all.gin--sticky-bulk-select.views-field-node-bulk-form > .form-checkbox.form-boolean[title="Select all rows in this table"]
```

**XPath:**
```
//*[contains(@class,"views-table > thead > tr > .select-all.gin--sticky-bulk-select.views-field-node-bulk-form > .form-checkbox.form-boolean[title="Select all rows in this table"]")]
```

**HTML snippet:**
```html
<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox" title="Select all rows in this table">
```

**Expected behaviour:** Checkbox has a visible or visually-hidden <label>, or aria-label

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
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: .views-table > thead > tr > .select-all.gin--sticky-bulk-select.views-field-node-bulk-form > .form-checkbox.form-boolean[title="Select all rows in this table"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 10. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-010` |
| **Pattern ID** | `DRU-7A2CD202` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-8302F38F]`

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

**Expected behaviour:** Checkbox has a visible or visually-hidden <label>, or aria-label

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
1. Navigate to https://drupal-core.ddev.site/admin/people
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: input[title="Select all rows in this table"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 11. Local task tab headings (#primary-tabs-title) are outside any landmark region 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-011` |
| **Pattern ID** | `DRU-12C757FE` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 7 of 66 pages (11%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/user/login`](https://drupal-core.ddev.site/user/login) — User login `[INS-7673A87D]`
- [`/user/password`](https://drupal-core.ddev.site/user/password) — User password reset `[INS-AEC6712F]`
- [`/admin`](https://drupal-core.ddev.site/admin) — Admin dashboard `[INS-F2EB03C6]`
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-7FB7F6F3]`
- [`/admin/appearance`](https://drupal-core.ddev.site/admin/appearance) — Appearance `[INS-46D3196E]`
- [`/admin/modules`](https://drupal-core.ddev.site/admin/modules) — Modules `[INS-3E09EEF4]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-EE770D58]`

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

**Expected behaviour:** The <h2> heading is inside the <nav> it labels, or the <nav> itself is inside a landmark

**Actual behaviour:** <h2 id="primary-tabs-title"> is a sibling of <nav>, and the nav may be outside main/aside/etc.

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
1. Navigate to https://drupal-core.ddev.site/user/login
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #primary-tabs-title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 12. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-012` |
| **Pattern ID** | `DRU-C00D2E42` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 5 of 66 pages (8%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-CD66DD9D]`
- [`/admin/appearance`](https://drupal-core.ddev.site/admin/appearance) — Appearance `[INS-DCB43CC7]`
- [`/admin/modules`](https://drupal-core.ddev.site/admin/modules) — Modules `[INS-C44A7FD6]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-1EE31A79]`
- [`/admin/config`](https://drupal-core.ddev.site/admin/config) — Configuration `[INS-06BA831F]`

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
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-contentinfo-is-top-level" on selector: .messages-list__item
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 13. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-013` |
| **Pattern ID** | `DRU-29F2A975` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 5 of 66 pages (8%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-5C83C5F5]`
- [`/admin/structure/types`](https://drupal-core.ddev.site/admin/structure/types) — Content types `[INS-C896D316]`
- [`/admin/structure/taxonomy`](https://drupal-core.ddev.site/admin/structure/taxonomy) — Taxonomy `[INS-CDE60A4E]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-2D2FC944]`
- [`/admin/config/content/formats`](https://drupal-core.ddev.site/admin/config/content/formats) — Text formats `[INS-C356267E]`

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
              <ul class="local-actions">
          <li class="local-actions__item"><a href="/node/add" class="button button--action button--primary" data-drupal-link-system-path="node/add">Add content</a></li>

        </ul>
      
      </div>
```

**Suggested fix:**
```
Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: .top-bar__actions
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 14. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-014` |
| **Pattern ID** | `DRU-C00D2E42` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 3 of 66 pages (5%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- [`/admin/appearance`](https://drupal-core.ddev.site/admin/appearance) — Appearance `[INS-3B986C77]`
- [`/admin/modules`](https://drupal-core.ddev.site/admin/modules) — Modules `[INS-00D8B74E]`
- [`/admin/config`](https://drupal-core.ddev.site/admin/config) — Configuration `[INS-C2D0B460]`

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
1. Navigate to https://drupal-core.ddev.site/admin/appearance
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-contentinfo-is-top-level" on selector: .messages-list__item
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 15. Local task tab headings (#primary-tabs-title) are outside any landmark region 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-015` |
| **Pattern ID** | `DRU-12C757FE` *(stable hash — use to track regressions)* |
| **Theme** | `olivero` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 66 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/user/login`](https://drupal-core.ddev.site/user/login) — User login `[INS-EE604664]`
- [`/user/password`](https://drupal-core.ddev.site/user/password) — User password reset `[INS-DF16DD53]`

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

**Expected behaviour:** The <h2> heading is inside the <nav> it labels, or the <nav> itself is inside a landmark

**Actual behaviour:** <h2 id="primary-tabs-title"> is a sibling of <nav>, and the nav may be outside main/aside/etc.

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
1. Navigate to https://drupal-core.ddev.site/user/login
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #primary-tabs-title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 16. Local task tab headings (#primary-tabs-title) are outside any landmark region 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-016` |
| **Pattern ID** | `DRU-E877649B` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 66 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/user/login`](https://drupal-core.ddev.site/user/login) — User login (mobile) `[INS-37AE3494]`
- [`/admin`](https://drupal-core.ddev.site/admin) — Admin dashboard (mobile) `[INS-1A1B9A1F]`

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

**Expected behaviour:** The <h2> heading is inside the <nav> it labels, or the <nav> itself is inside a landmark

**Actual behaviour:** <h2 id="primary-tabs-title"> is a sibling of <nav>, and the nav may be outside main/aside/etc.

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
1. Navigate to https://drupal-core.ddev.site/user/login
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #primary-tabs-title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 17. Homepage has no <h1> heading — screen reader users cannot identify page topic 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-017` |
| **Pattern ID** | `DRU-FE39ED4A` *(stable hash — use to track regressions)* |
| **Theme** | `olivero` |
| **Rule** | [`page-has-heading-one`](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/`](https://drupal-core.ddev.site/) — Homepage `[INS-F78161F0]`

**Selector:**
```css
html
```

**XPath:**
```
//html
```

**HTML snippet:**
```html
<html lang="en" dir="ltr" style="--color--primary-hue:202;--color--primary-saturation:79%;--color--primary-lightness:50" class=" js">
```

**Expected behaviour:** Every page contains exactly one <h1> that identifies the page

**Actual behaviour:** Olivero front page renders no <h1>; the site name in the header is not an <h1>

**Suggested fix:**
```
Option A — Make site name an h1 on the front page only:

{# page--front.html.twig #}
{% if is_front %}
  <h1 class="site-name">{{ site_name }}</h1>
{% else %}
  <div class="site-name">{{ site_name }}</div>
{% endif %}

Option B — Ensure the promoted front page node has an h1 title rendered.
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/
1. Open browser DevTools and run: axe.run()
1. Look for rule "page-has-heading-one" on selector: html
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 18. Homepage has no <h1> heading — screen reader users cannot identify page topic 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-018` |
| **Pattern ID** | `DRU-2DD6D8F2` *(stable hash — use to track regressions)* |
| **Theme** | `olivero` |
| **Rule** | [`page-has-heading-one`](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/`](https://drupal-core.ddev.site/) — Homepage (mobile) `[INS-47B4408E]`

**Selector:**
```css
html
```

**XPath:**
```
//html
```

**HTML snippet:**
```html
<html lang="en" dir="ltr" style="--color--primary-hue:202;--color--primary-saturation:79%;--color--primary-lightness:50" class=" js">
```

**Expected behaviour:** Every page contains exactly one <h1> that identifies the page

**Actual behaviour:** Olivero front page renders no <h1>; the site name in the header is not an <h1>

**Suggested fix:**
```
Option A — Make site name an h1 on the front page only:

{# page--front.html.twig #}
{% if is_front %}
  <h1 class="site-name">{{ site_name }}</h1>
{% else %}
  <div class="site-name">{{ site_name }}</div>
{% endif %}

Option B — Ensure the promoted front page node has an h1 title rendered.
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/
1. Open browser DevTools and run: axe.run()
1. Look for rule "page-has-heading-one" on selector: html
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 19. Local task tab headings (#primary-tabs-title) are outside any landmark region 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-019` |
| **Pattern ID** | `DRU-E877649B` *(stable hash — use to track regressions)* |
| **Theme** | `olivero` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/user/login`](https://drupal-core.ddev.site/user/login) — User login (mobile) `[INS-B2C79C3A]`

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

**Expected behaviour:** The <h2> heading is inside the <nav> it labels, or the <nav> itself is inside a landmark

**Actual behaviour:** <h2 id="primary-tabs-title"> is a sibling of <nav>, and the nav may be outside main/aside/etc.

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
1. Navigate to https://drupal-core.ddev.site/user/login
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #primary-tabs-title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 20. Local task tab headings (#primary-tabs-title) are outside any landmark region 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-020` |
| **Pattern ID** | `DRU-4D24D5C1` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout `[INS-766BAFCD]`

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

**Expected behaviour:** The <h2> heading is inside the <nav> it labels, or the <nav> itself is inside a landmark

**Actual behaviour:** <h2 id="primary-tabs-title"> is a sibling of <nav>, and the nav may be outside main/aside/etc.

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
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #secondary-tabs-title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 21. region: Ensure all page content is contained by landmarks 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-021` |
| **Pattern ID** | `DRU-3A6B5B95` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `toolbar (admin theme)` — Admin toolbar |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/user/1/edit`](https://drupal-core.ddev.site/user/1/edit) — User edit (uid 1) `[INS-A980325B]`

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
1. Navigate to https://drupal-core.ddev.site/user/1/edit
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: .toolbar-title__label
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 22. Local task tab headings (#primary-tabs-title) are outside any landmark region 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-022` |
| **Pattern ID** | `DRU-BDE7B1F5` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout (mobile) `[INS-E0153F92]`

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

**Expected behaviour:** The <h2> heading is inside the <nav> it labels, or the <nav> itself is inside a landmark

**Actual behaviour:** <h2 id="primary-tabs-title"> is a sibling of <nav>, and the nav may be outside main/aside/etc.

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
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #secondary-tabs-title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 23. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-023` |
| **Pattern ID** | `DRU-DC320928` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- [`/`](https://drupal-core.ddev.site/) — Homepage `[INS-C94EE4FD]`

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
1. Navigate to https://drupal-core.ddev.site/
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h1
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 24. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-024` |
| **Pattern ID** | `DRU-0CA45C5C` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- [`/`](https://drupal-core.ddev.site/) — Homepage (mobile) `[INS-FC2D7546]`

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
1. Navigate to https://drupal-core.ddev.site/
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h1
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 25. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-025` |
| **Pattern ID** | `DRU-DC320928` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- [`/`](https://drupal-core.ddev.site/) — Homepage `[INS-CFB3289F]`

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
1. Navigate to https://drupal-core.ddev.site/
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h1
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 26. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-026` |
| **Pattern ID** | `DRU-0CA45C5C` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 66 pages (2%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- [`/`](https://drupal-core.ddev.site/) — Homepage (mobile) `[INS-F4899C6A]`

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
1. Navigate to https://drupal-core.ddev.site/
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-heading" on selector: h1
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js
