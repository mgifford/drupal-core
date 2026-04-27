# Drupal Core Accessibility Bug Report

> **Generated:** 2026-04-27T18:00:15.010Z
> **Tool:** axe-core via @axe-core/playwright | **Browser:** Chromium
> **Standard:** [ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md](https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)

## Summary

| Metric | Value |
| :--- | :--- |
| Pages crawled | 71 |
| Total violation instances | 168 |
| Unique patterns | 45 |
| Template-level patterns (≥3 pages) 🔁 | 17 |
| Critical | 0 |
| Serious | 21 |
| Moderate | 22 |
| Minor | 2 |

## Cross-Theme Analysis

Issues found across multiple Drupal themes. Universal issues affect ALL tested themes
and are highest priority for core fixes since a single template change benefits everyone.

**Themes tested:** admin, claro, olivero

### 🌐 Universal Issues (appear in ALL themes)

| Pattern ID | Rule | Impact | Screen | Themes | Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DRU-BEADC0A1` | `region` | **moderate** | desktop | claro, admin, olivero | region: Ensure all page content is contained by landmarks |
| `DRU-6825C79C` | `region` | **moderate** | mobile | claro, admin, olivero | region: Ensure all page content is contained by landmarks |

### 🔗 Multi-Theme Issues (appear in 2+ themes)

| Pattern ID | Rule | Impact | Screen | Themes | Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DRU-7A2CD202` | `label-title-only` | **serious** | desktop | claro, admin | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-FE39ED4A` | `page-has-heading-one` | **moderate** | desktop | admin, olivero | Homepage has no <h1> heading — screen reader users cannot identify page topic |
| `DRU-2DD6D8F2` | `page-has-heading-one` | **moderate** | mobile | admin, olivero | Homepage has no <h1> heading — screen reader users cannot identify page topic |

### 🎨 Theme-Specific Issue Counts

| Theme | Unique Issues |
| :--- | :--- |
| `admin` | 21 |
| `claro` | 10 |
| `olivero` | 2 |

## Issues (sorted by priority: impact × frequency)

🔁 = Template-level issue (≥3 pages) — fix once, improves many pages.

---

### 1. document-title: Ensure each HTML document contains a non-empty &lt;title&gt; element 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-001` |
| **Pattern ID** | `DRU-C235B83D` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`document-title`](https://dequeuniversity.com/rules/axe/4.11/document-title?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/242.html) (Level A) |
| **Frequency** | 4 of 71 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-EC568562]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/node/add/article` — Create article `[INS-E8E7903B]`
- `/node/add/page` — Create basic page `[INS-124C15FB]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-2E04BCB2]`

</details>

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
<html>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/form_style
1. Open browser DevTools and run: axe.run()
1. Look for rule "document-title" on selector: html
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 2. html-has-lang: Ensure every HTML document has a lang attribute 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-002` |
| **Pattern ID** | `DRU-3889F3F3` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`html-has-lang`](https://dequeuniversity.com/rules/axe/4.11/html-has-lang?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [3.1.1 Language of Page](https://www.w3.org/WAI/WCAG22/Understanding/311.html) (Level A) |
| **Frequency** | 4 of 71 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-4852BC01]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/node/add/article` — Create article `[INS-B8596C33]`
- `/node/add/page` — Create basic page `[INS-49C645C5]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-BEDA3A9C]`

</details>

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
<html>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/form_style
1. Open browser DevTools and run: axe.run()
1. Look for rule "html-has-lang" on selector: html
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 3. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-003` |
| **Pattern ID** | `DRU-90FD983D` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 71 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-30CCB04A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-9E3C567D]`

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
1. Navigate to this route on your local Drupal install: /admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: #edit-submit
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 4. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-004` |
| **Pattern ID** | `DRU-7A2CD202` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 71 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list `[INS-333A0C48]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-A6512BE5]`

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
1. Navigate to this route on your local Drupal install: /admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "label-title-only" on selector: input[title="Select all rows in this table"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 5. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-005` |
| **Pattern ID** | `DRU-7A2CD202` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 71 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list `[INS-4E756E59]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-8302F38F]`

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
<input type="checkbox" class="form-checkbox" title="Select all rows in this table">
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
1. Look for rule "label-title-only" on selector: input[title="Select all rows in this table"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 6. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-006` |
| **Pattern ID** | `DRU-74CA7842` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 71 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-E49123E1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-0EF5C7A4]`

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
<input data-drupal-selector="edit-submit" type="submit" id="edit-submit--2" name="op" value="Apply to selected items" class="button js-form-submit form-submit">
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: #edit-submit--2
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 7. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-007` |
| **Pattern ID** | `DRU-7DE8109C` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `(theme-specific template)` — Theme template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-E471277A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-blocks-claro-help"] > td:nth-child(5) > .dropbutton-wrapper.dropbutton-multiple[data-drupal-ajax-container=""] > .dropbutton-widget > .dropbutton.dropbutton--extrasmall.dropbutton--multiple > .enable.dropbutton__item.dropbutton-action > a
```

**XPath:**
```
//tr[@data-drupal-selector="edit-blocks-claro-help"]
```

**HTML snippet:**
```html
<a href="/admin/structure/block/manage/claro_help/enable?destination=/admin/structure/block&amp;token=ImxVB9mE8szPh7cm904GCJsAsl4XxfRBzIRzi49o7gg">Enable</a>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: tr[data-drupal-selector="edit-blocks-claro-help"] > td:nth-child(5) > .dropbutton-wrapper.dropbutton-multiple[data-drupal-ajax-container=""] > .dropbutton-widget > .dropbutton.dropbutton--extrasmall.dropbutton--multiple > .enable.dropbutton__item.dropbutton-action > a
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 8. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-008` |
| **Pattern ID** | `DRU-A86FEC99` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-1AE9FA8A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.block-disabled.draggable[data-once="claroTabledrag"]:nth-child(23) > td:nth-child(5) > .dropbutton-wrapper.dropbutton-multiple[data-drupal-ajax-container=""] > .dropbutton-widget > .dropbutton.dropbutton--extrasmall.dropbutton--multiple > .enable.dropbutton__item.dropbutton-action > a
```

**XPath:**
```
//*[contains(@class,"block-disabled.draggable[data-once="claroTabledrag"]:nth-child(23) > td:nth-child(5) > .dropbutton-wrapper.dropbutton-multiple[data-drupal-ajax-container=""] > .dropbutton-widget > .dropbutton.dropbutton--extrasmall.dropbutton--multiple > .enable.dropbutton__item.dropbutton-action > a")]
```

**HTML snippet:**
```html
<a href="/admin/structure/block/manage/claro_vertical_tabs_test/enable?destination=/admin/structure/block&amp;token=5lFi1W2jOuJKWNol6l8DiR1NCsfdaKhNaVWq2S8FmPM">Enable</a>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .block-disabled.draggable[data-once="claroTabledrag"]:nth-child(23) > td:nth-child(5) > .dropbutton-wrapper.dropbutton-multiple[data-drupal-ajax-container=""] > .dropbutton-widget > .dropbutton.dropbutton--extrasmall.dropbutton--multiple > .enable.dropbutton__item.dropbutton-action > a
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 9. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-009` |
| **Pattern ID** | `DRU-B03C849D` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `(theme-specific template)` — Theme template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout (mobile) `[INS-66719F9C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
tr[data-drupal-selector="edit-blocks-claro-help"] > td:nth-child(5) > .dropbutton-wrapper.dropbutton-multiple[data-drupal-ajax-container=""] > .dropbutton-widget > .dropbutton.dropbutton--extrasmall.dropbutton--multiple > .enable.dropbutton__item.dropbutton-action > a
```

**XPath:**
```
//tr[@data-drupal-selector="edit-blocks-claro-help"]
```

**HTML snippet:**
```html
<a href="/admin/structure/block/manage/claro_help/enable?destination=/admin/structure/block&amp;token=ImxVB9mE8szPh7cm904GCJsAsl4XxfRBzIRzi49o7gg">Enable</a>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: tr[data-drupal-selector="edit-blocks-claro-help"] > td:nth-child(5) > .dropbutton-wrapper.dropbutton-multiple[data-drupal-ajax-container=""] > .dropbutton-widget > .dropbutton.dropbutton--extrasmall.dropbutton--multiple > .enable.dropbutton__item.dropbutton-action > a
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 10. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-010` |
| **Pattern ID** | `DRU-431AA300` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout (mobile) `[INS-BF1B340F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.block-disabled.draggable[data-once="claroTabledrag"]:nth-child(23) > td:nth-child(5) > .dropbutton-wrapper.dropbutton-multiple[data-drupal-ajax-container=""] > .dropbutton-widget > .dropbutton.dropbutton--extrasmall.dropbutton--multiple > .enable.dropbutton__item.dropbutton-action > a
```

**XPath:**
```
//*[contains(@class,"block-disabled.draggable[data-once="claroTabledrag"]:nth-child(23) > td:nth-child(5) > .dropbutton-wrapper.dropbutton-multiple[data-drupal-ajax-container=""] > .dropbutton-widget > .dropbutton.dropbutton--extrasmall.dropbutton--multiple > .enable.dropbutton__item.dropbutton-action > a")]
```

**HTML snippet:**
```html
<a href="/admin/structure/block/manage/claro_vertical_tabs_test/enable?destination=/admin/structure/block&amp;token=5lFi1W2jOuJKWNol6l8DiR1NCsfdaKhNaVWq2S8FmPM">Enable</a>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .block-disabled.draggable[data-once="claroTabledrag"]:nth-child(23) > td:nth-child(5) > .dropbutton-wrapper.dropbutton-multiple[data-drupal-ajax-container=""] > .dropbutton-widget > .dropbutton.dropbutton--extrasmall.dropbutton--multiple > .enable.dropbutton__item.dropbutton-action > a
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 11. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-011` |
| **Pattern ID** | `DRU-3DB41465` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/` — Homepage `[INS-C63849E0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
a[rel="tag"]
```

**XPath:**
```
//a[@rel="tag"]
```

**HTML snippet:**
```html
<a href="/node/1" rel="tag" title="testing now" hreflang="en">Read more<span class="visually-hidden"> about testing now</span></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: a[rel="tag"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 12. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-012` |
| **Pattern ID** | `DRU-408CC90A` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-0D4B42E2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
a[rel="tag"]
```

**XPath:**
```
//a[@rel="tag"]
```

**HTML snippet:**
```html
<a href="/node/1" rel="tag" title="testing now" hreflang="en">Read more<span class="visually-hidden"> about testing now</span></a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: a[rel="tag"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 13. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-013` |
| **Pattern ID** | `DRU-C1935DC5` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/user/login` — User login (mobile) `[INS-CD72ACAA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
input[value="Log in"]
```

**XPath:**
```
//input[@value="Log in"]
```

**HTML snippet:**
```html
<input data-drupal-selector="edit-submit" type="submit" id="edit-submit" name="op" value="Log in" class="button js-form-submit form-submit">
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /user/login
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: input[value="Log in"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 14. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-014` |
| **Pattern ID** | `DRU-3B7B8C5B` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-36B26A93]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
a[href="?page=0"]
```

**XPath:**
```
//a[@href="?page=0"]
```

**HTML snippet:**
```html
<a href="?page=0" title="Current page" aria-current="page">
            <span class="visually-hidden">
              Page
            </span>1</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: a[href="?page=0"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 15. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-015` |
| **Pattern ID** | `DRU-765CC364` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-DC683448]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
a[title="Go to page 2"]
```

**XPath:**
```
//a[@title="Go to page 2"]
```

**HTML snippet:**
```html
<a href="?page=1" title="Go to page 2">
            <span class="visually-hidden">
              Page
            </span>2</a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: a[title="Go to page 2"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 16. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-016` |
| **Pattern ID** | `DRU-11E18AF0` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-C117FC78]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
a[title="Go to next page"]
```

**XPath:**
```
//a[@title="Go to next page"]
```

**HTML snippet:**
```html
<a href="?page=1" title="Go to next page" rel="next">
            <span class="visually-hidden">Next page</span>
            <span aria-hidden="true">Next ›</span>
          </a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: a[title="Go to next page"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 17. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-017` |
| **Pattern ID** | `DRU-C2A88283` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-649CFA51]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
a[title="Go to last page"]
```

**XPath:**
```
//a[@title="Go to last page"]
```

**HTML snippet:**
```html
<a href="?page=1" title="Go to last page">
            <span class="visually-hidden">Last page</span>
            <span aria-hidden="true">Last »</span>
          </a>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: a[title="Go to last page"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 18. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-018` |
| **Pattern ID** | `DRU-B8F05163` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/appearance` — Appearance `[INS-C3282CAD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.admin-missing
```

**XPath:**
```
//*[contains(@class,"admin-missing")]
```

**HTML snippet:**
```html
<span class="admin-missing">missing</span>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/appearance
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .admin-missing
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 19. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-019` |
| **Pattern ID** | `DRU-4791601D` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/admin/config/system/site-information` — Site information `[INS-56C43905]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
summary[aria-controls="edit-site-information"]
```

**XPath:**
```
//summary[@aria-controls="edit-site-information"]
```

**HTML snippet:**
```html
<summary role="button" aria-controls="edit-site-information" aria-expanded="true">Site details<span class="summary"></span></summary>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/config/system/site-information
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: summary[aria-controls="edit-site-information"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 20. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-020` |
| **Pattern ID** | `DRU-A7F049C2` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/admin/config/system/site-information` — Site information `[INS-BD996098]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
summary[aria-controls="edit-front-page"]
```

**XPath:**
```
//summary[@aria-controls="edit-front-page"]
```

**HTML snippet:**
```html
<summary role="button" aria-controls="edit-front-page" aria-expanded="true">Front page<span class="summary"></span></summary>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/config/system/site-information
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: summary[aria-controls="edit-front-page"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 21. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-021` |
| **Pattern ID** | `DRU-AC904086` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/admin/config/system/site-information` — Site information `[INS-D2F9E6D9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
summary[aria-controls="edit-error-page"]
```

**XPath:**
```
//summary[@aria-controls="edit-error-page"]
```

**HTML snippet:**
```html
<summary role="button" aria-controls="edit-error-page" aria-expanded="true">Error pages<span class="summary"></span></summary>
```

**Suggested fix:**
```
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/config/system/site-information
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: summary[aria-controls="edit-error-page"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 22. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-022` |
| **Pattern ID** | `DRU-BEADC0A1` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 27 of 71 pages (38%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage `[INS-F8827C54]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/action-link` — Action link demo `[INS-67D44CCE]`
- `/user/login` — User login `[INS-1DA96D9D]`

<details><summary>Show 24 more affected page(s)</summary>

- `/user/register` — User register `[INS-6C398E97]`
- `/user/password` — User password reset `[INS-6C5B7C93]`
- `/search/node` — Search results `[INS-A695C315]`
- `/this-page-does-not-exist` — 404 page `[INS-0B3EE67E]`
- `/admin` — Admin dashboard `[INS-FF128C56]`
- `/admin/form_style` — Form style demo `[INS-9AC3040C]`
- `/admin/content` — Content list `[INS-96363970]`
- `/node/add/article` — Create article `[INS-98495517]`
- `/node/add/page` — Create basic page `[INS-C2F7FA35]`
- `/admin/structure` — Structure `[INS-1981CB52]`
- `/admin/structure/types` — Content types `[INS-4ECE022D]`
- `/admin/structure/types/add` — Add content type `[INS-1DC30C0C]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-60C8DDAF]`
- `/admin/structure/taxonomy/add` — Add vocabulary `[INS-DE8799B2]`
- `/admin/structure/block` — Block layout `[INS-4535042B]`
- `/admin/appearance` — Appearance `[INS-087DE69B]`
- `/admin/modules` — Modules `[INS-CA114DF0]`
- `/admin/people` — People `[INS-79B55CBF]`
- `/user/1/edit` — User edit (uid 1) `[INS-891F79A4]`
- `/admin/config` — Configuration `[INS-40A07FBA]`
- `/admin/config/content/formats` — Text formats `[INS-7CEE7C80]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-5551952A]`
- `/admin/config/system/site-information` — Site information `[INS-6FA84AFC]`
- `/admin/reports` — Reports `[INS-CEE1A2AA]`

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

### 23. Homepage has no &lt;h1&gt; heading — screen reader users cannot identify page topic 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-023` |
| **Pattern ID** | `DRU-FE39ED4A` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`page-has-heading-one`](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 27 of 71 pages (38%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage `[INS-B1E51EE3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/action-link` — Action link demo `[INS-439A4705]`
- `/user/login` — User login `[INS-14F3BC8E]`

<details><summary>Show 24 more affected page(s)</summary>

- `/user/register` — User register `[INS-1C8C274C]`
- `/user/password` — User password reset `[INS-E3BCD87B]`
- `/search/node` — Search results `[INS-D57620CE]`
- `/this-page-does-not-exist` — 404 page `[INS-A2F9943B]`
- `/admin` — Admin dashboard `[INS-8D0B551F]`
- `/admin/form_style` — Form style demo `[INS-A6C33528]`
- `/admin/content` — Content list `[INS-A3AB7C2F]`
- `/node/add/article` — Create article `[INS-6CEFB341]`
- `/node/add/page` — Create basic page `[INS-51CDA53A]`
- `/admin/structure` — Structure `[INS-A45D63AF]`
- `/admin/structure/types` — Content types `[INS-1B242E49]`
- `/admin/structure/types/add` — Add content type `[INS-F72130DD]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-84E1E015]`
- `/admin/structure/taxonomy/add` — Add vocabulary `[INS-2021033E]`
- `/admin/structure/block` — Block layout `[INS-3767E6E5]`
- `/admin/appearance` — Appearance `[INS-99B9A5D7]`
- `/admin/modules` — Modules `[INS-9572160C]`
- `/admin/people` — People `[INS-5498FDF7]`
- `/user/1/edit` — User edit (uid 1) `[INS-44170817]`
- `/admin/config` — Configuration `[INS-78A19F48]`
- `/admin/config/content/formats` — Text formats `[INS-4CBF3459]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-F6A4E3CF]`
- `/admin/config/system/site-information` — Site information `[INS-55B2EA69]`
- `/admin/reports` — Reports `[INS-BCB919FF]`

</details>

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
<html lang="en" dir="ltr" class=" js">
```

**Expected behaviour:** Every page contains exactly one &lt;h1&gt; that identifies the page

**Actual behaviour:** Olivero front page renders no &lt;h1&gt;; the site name in the header is not an &lt;h1&gt;

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
1. Navigate to this route on your local Drupal install: /
1. Open browser DevTools and run: axe.run()
1. Look for rule "page-has-heading-one" on selector: html
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 24. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-024` |
| **Pattern ID** | `DRU-BEADC0A1` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 23 of 71 pages (32%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage `[INS-023C0C14]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/action-link` — Action link demo `[INS-317C3E04]`
- `/user/login` — User login `[INS-51939F77]`

<details><summary>Show 20 more affected page(s)</summary>

- `/user/register` — User register `[INS-C480966D]`
- `/user/password` — User password reset `[INS-86B29A81]`
- `/search/node` — Search results `[INS-7FE60C8F]`
- `/this-page-does-not-exist` — 404 page `[INS-ADE63447]`
- `/admin` — Admin dashboard `[INS-2BC359AA]`
- `/admin/content` — Content list `[INS-7ECAFC89]`
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
- `/admin/config/system/site-information` — Site information `[INS-6320C953]`
- `/admin/reports` — Reports `[INS-9A54A2EB]`

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
<div class="themeswitcher-form__form-item js-form-item form-item form-type-select js-form-type-select form-item-preferred-theme js-form-item-preferred-theme">
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

### 25. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-025` |
| **Pattern ID** | `DRU-BEADC0A1` *(stable hash — use to track regressions)* |
| **Theme** | `olivero` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 7 of 71 pages (10%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage `[INS-B7EC21C6]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/action-link` — Action link demo `[INS-1548AA5E]`
- `/user/login` — User login `[INS-BC0E758C]`

<details><summary>Show 4 more affected page(s)</summary>

- `/user/register` — User register `[INS-C5F240D9]`
- `/user/password` — User password reset `[INS-3F2AC72F]`
- `/search/node` — Search results `[INS-0F6CD979]`
- `/this-page-does-not-exist` — 404 page `[INS-D00DC29B]`

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
<div class="themeswitcher-form__form-item js-form-item form-item form-type-select js-form-type-select form-item-preferred-theme js-form-item-preferred-theme">
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

### 26. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-026` |
| **Pattern ID** | `DRU-6825C79C` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 71 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-FFDDC742]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/user/login` — User login (mobile) `[INS-027F8B62]`
- `/admin` — Admin dashboard (mobile) `[INS-BA767068]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/structure/block` — Block layout (mobile) `[INS-55CE76E2]`

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

### 27. Homepage has no &lt;h1&gt; heading — screen reader users cannot identify page topic 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-027` |
| **Pattern ID** | `DRU-2DD6D8F2` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`page-has-heading-one`](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 71 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-935205AF]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/user/login` — User login (mobile) `[INS-12DE4D98]`
- `/admin` — Admin dashboard (mobile) `[INS-2E8EF0BE]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/structure/block` — Block layout (mobile) `[INS-7266FF83]`

</details>

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
<html lang="en" dir="ltr" class=" js">
```

**Expected behaviour:** Every page contains exactly one &lt;h1&gt; that identifies the page

**Actual behaviour:** Olivero front page renders no &lt;h1&gt;; the site name in the header is not an &lt;h1&gt;

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
1. Navigate to this route on your local Drupal install: /
1. Open browser DevTools and run: axe.run()
1. Look for rule "page-has-heading-one" on selector: html
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 28. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-028` |
| **Pattern ID** | `DRU-6825C79C` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 71 pages (6%) |
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
<div class="themeswitcher-form__form-item js-form-item form-item form-type-select js-form-type-select form-item-preferred-theme js-form-item-preferred-theme">
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

### 29. landmark-one-main: Ensure the document has a main landmark 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-029` |
| **Pattern ID** | `DRU-C2F5C18F` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`landmark-one-main`](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 71 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-254D9440]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/node/add/article` — Create article `[INS-7E81F188]`
- `/node/add/page` — Create basic page `[INS-631D2EDC]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-3BC2C656]`

</details>

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
<html>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/form_style
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-one-main" on selector: html
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 30. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-030` |
| **Pattern ID** | `DRU-6D993968` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 71 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-78DCEE99]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/node/add/article` — Create article `[INS-4707A980]`
- `/node/add/page` — Create basic page `[INS-4511B678]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-C18723C2]`

</details>

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
<em class="placeholder">Drupal\Core\Extension\Exception\UnknownExtensionException</em>
```

**Suggested fix:**
```
Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/form_style
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: em:nth-child(3)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 31. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-031` |
| **Pattern ID** | `DRU-C0E2CD50` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 71 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-90E2FF90]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/node/add/article` — Create article `[INS-3B77EF17]`
- `/node/add/page` — Create basic page `[INS-0A1EB9A5]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-229AA40E]`

</details>

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
<em class="placeholder">Drupal\Core\Extension\ExtensionList-&gt;getPathname()</em>
```

**Suggested fix:**
```
Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/form_style
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: em:nth-child(4)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 32. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-032` |
| **Pattern ID** | `DRU-F3CDEB14` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 71 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-6F778062]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/node/add/article` — Create article `[INS-C1B2A742]`
- `/node/add/page` — Create basic page `[INS-EDA9CB70]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-93F91D1C]`

</details>

**Selector:**
```css
em:nth-child(5)
```

**XPath:**
```
//em:nth-child(5)
```

**HTML snippet:**
```html
<em class="placeholder">533</em>
```

**Suggested fix:**
```
Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/form_style
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: em:nth-child(5)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 33. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-033` |
| **Pattern ID** | `DRU-48456B2D` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 71 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-87A97076]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/node/add/article` — Create article `[INS-9BC30748]`
- `/node/add/page` — Create basic page `[INS-4E5170C4]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-5B806DBF]`

</details>

**Selector:**
```css
em:nth-child(6)
```

**XPath:**
```
//em:nth-child(6)
```

**HTML snippet:**
```html
<em class="placeholder">core/lib/Drupal/Core/Extension/ExtensionList.php</em>
```

**Suggested fix:**
```
Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/form_style
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: em:nth-child(6)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 34. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-034` |
| **Pattern ID** | `DRU-713ADB88` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 71 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-E30C1FE5]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/node/add/article` — Create article `[INS-0FDB6CCC]`
- `/node/add/page` — Create basic page `[INS-76EE2281]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-1A6431B5]`

</details>

**Selector:**
```css
pre
```

**XPath:**
```
//pre
```

**HTML snippet:**
```html
<pre class="backtrace">
```

**Suggested fix:**
```
Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/form_style
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: pre
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 35. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-035` |
| **Pattern ID** | `DRU-C00D2E42` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 3 of 71 pages (4%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/admin/appearance` — Appearance `[INS-3B986C77]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/modules` — Modules `[INS-00D8B74E]`
- `/admin/config` — Configuration `[INS-C2D0B460]`

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

### 36. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-036` |
| **Pattern ID** | `DRU-5EECAF91` *(stable hash — use to track regressions)* |
| **Theme** | `admin` |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 3 of 71 pages (4%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/admin/appearance` — Appearance `[INS-9759D408]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/modules` — Modules `[INS-3FC6D146]`
- `/admin/config` — Configuration `[INS-28B699FB]`

**Selector:**
```css
div[role="contentinfo"]
```

**XPath:**
```
//div[@role="contentinfo"]
```

**HTML snippet:**
```html
<div role="contentinfo" aria-label="Error message">
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/appearance
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-contentinfo-is-top-level" on selector: div[role="contentinfo"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 37. Local task tab headings (#primary-tabs-title) are outside any landmark region 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-037` |
| **Pattern ID** | `DRU-12C757FE` *(stable hash — use to track regressions)* |
| **Theme** | `olivero` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 71 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/user/login` — User login `[INS-EE604664]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/user/password` — User password reset `[INS-DF16DD53]`

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

### 38. region: Ensure all page content is contained by landmarks 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-038` |
| **Pattern ID** | `DRU-6825C79C` *(stable hash — use to track regressions)* |
| **Theme** | `olivero` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 71 pages (3%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-8CE0429C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/user/login` — User login (mobile) `[INS-94D67B9A]`

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
<div class="themeswitcher-form__form-item js-form-item form-item form-type-select js-form-type-select form-item-preferred-theme js-form-item-preferred-theme">
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

### 39. Homepage has no &lt;h1&gt; heading — screen reader users cannot identify page topic 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-039` |
| **Pattern ID** | `DRU-FE39ED4A` *(stable hash — use to track regressions)* |
| **Theme** | `olivero` |
| **Rule** | [`page-has-heading-one`](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage `[INS-F78161F0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

**Expected behaviour:** Every page contains exactly one &lt;h1&gt; that identifies the page

**Actual behaviour:** Olivero front page renders no &lt;h1&gt;; the site name in the header is not an &lt;h1&gt;

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
1. Navigate to this route on your local Drupal install: /
1. Open browser DevTools and run: axe.run()
1. Look for rule "page-has-heading-one" on selector: html
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 40. Homepage has no &lt;h1&gt; heading — screen reader users cannot identify page topic 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-040` |
| **Pattern ID** | `DRU-2DD6D8F2` *(stable hash — use to track regressions)* |
| **Theme** | `olivero` |
| **Rule** | [`page-has-heading-one`](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-47B4408E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

**Expected behaviour:** Every page contains exactly one &lt;h1&gt; that identifies the page

**Actual behaviour:** Olivero front page renders no &lt;h1&gt;; the site name in the header is not an &lt;h1&gt;

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
1. Navigate to this route on your local Drupal install: /
1. Open browser DevTools and run: axe.run()
1. Look for rule "page-has-heading-one" on selector: html
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 41. Local task tab headings (#primary-tabs-title) are outside any landmark region 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-041` |
| **Pattern ID** | `DRU-E877649B` *(stable hash — use to track regressions)* |
| **Theme** | `olivero` |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/user/login` — User login (mobile) `[INS-B2C79C3A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 42. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-042` |
| **Pattern ID** | `DRU-3ADA94F4` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-A072EE82]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
.form-datetime-wrapper.form-item:nth-child(4) > h4
```

**XPath:**
```
//*[contains(@class,"form-datetime-wrapper.form-item:nth-child(4) > h4")]
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
1. Look for rule "heading-order" on selector: .form-datetime-wrapper.form-item:nth-child(4) > h4
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 43. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-043` |
| **Pattern ID** | `DRU-D87CB13C` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-434B52A1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 44. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-044` |
| **Pattern ID** | `DRU-DC320928` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/` — Homepage `[INS-C94EE4FD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 45. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-045` |
| **Pattern ID** | `DRU-0CA45C5C` *(stable hash — use to track regressions)* |
| **Theme** | `claro` |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 71 pages (1%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-FC2D7546]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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
