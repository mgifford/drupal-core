# Drupal Core Accessibility Bug Report

> **Generated:** 2026-03-31T20:07:44.219Z
> **Tool:** axe-core via @axe-core/playwright | **Browser:** Chromium
> **Standard:** [ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md](https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)

## Summary

| Metric | Value |
| :--- | :--- |
| Pages crawled | 29 |
| Total violation instances | 40 |
| Unique patterns | 22 |
| Template-level patterns (≥3 pages) 🔁 | 4 |
| Critical | 0 |
| Serious | 14 |
| Moderate | 8 |
| Minor | 0 |

## Issues (sorted by priority: impact × frequency)

🔁 = Template-level issue (≥3 pages) — fix once, improves many pages.

---

### 1. Local action links render bare <li> items outside a <ul> 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-001` |
| **Pattern ID** | `DRU-A88A3568` *(stable hash — use to track regressions)* |
| **Rule** | [`listitem`](https://dequeuniversity.com/rules/axe/4.11/listitem?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 5 of 29 pages (17%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/menu-local-action.html.twig, core/themes/claro/templates/block/block--local-actions-block.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-1CD63E0A]`
- [`/admin/structure/types`](https://drupal-core.ddev.site/admin/structure/types) — Content types `[INS-0145A953]`
- [`/admin/structure/taxonomy`](https://drupal-core.ddev.site/admin/structure/taxonomy) — Taxonomy `[INS-F6A6FC30]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-1B811C67]`
- [`/admin/config/content/formats`](https://drupal-core.ddev.site/admin/config/content/formats) — Text formats `[INS-D1AAE084]`

**Selector:**
```css
.action-links-item
```

**XPath:**
```
//*[contains(@class,"action-links-item")]
```

**HTML snippet:**
```html
<li class="action-links-item"><a href="/node/add" class="button button-action" data-drupal-link-system-path="node/add">Add content</a></li>
```

**Expected behaviour:** <ul class="action-links"><li class="action-links-item">…</li></ul>

**Actual behaviour:** <li class="action-links-item">…</li>  (no <ul> parent)

**Suggested fix:**
```
Wrap the action-link items in a <ul>:

<!-- Before (broken) -->
{% for link in action_links %}
  <li class="action-links-item">{{ link }}</li>
{% endfor %}

<!-- After (fixed) -->
<ul class="action-links">
{% for link in action_links %}
  <li class="action-links-item">{{ link }}</li>
{% endfor %}
</ul>
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "listitem" on selector: .action-links-item
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 2. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-002` |
| **Pattern ID** | `DRU-7A2CD202` *(stable hash — use to track regressions)* |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 29 pages (7%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-D6A47BCB]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-631CA206]`

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

### 3. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-003` |
| **Pattern ID** | `DRU-0C5EEDDE` *(stable hash — use to track regressions)* |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout `[INS-2697AEAA]`

**Selector:**
```css
.region-hero-message > td[colspan="5"] > em
```

**XPath:**
```
//*[contains(@class,"region-hero-message > td[colspan="5"] > em")]
```

**HTML snippet:**
```html
<em>No blocks in this region</em>
```

**Expected behaviour:** Foreground color #767676 or darker on white (#ffffff) background → 4.54:1

**Actual behaviour:** color: #999999 on #ffffff → contrast ratio 2.84:1

**Suggested fix:**
```
In Claro's block-admin CSS, darken the placeholder text:

/* Before (broken) */
.block-region .region-message em {
  color: #999999;
}

/* After (fixed) */
.block-region .region-message em {
  color: #767676; /* 4.54:1 on white */
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .region-hero-message > td[colspan="5"] > em
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 4. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-004` |
| **Pattern ID** | `DRU-C8F6B7EE` *(stable hash — use to track regressions)* |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout `[INS-9BE93FAB]`

**Selector:**
```css
.region-social-message > td[colspan="5"] > em
```

**XPath:**
```
//*[contains(@class,"region-social-message > td[colspan="5"] > em")]
```

**HTML snippet:**
```html
<em>No blocks in this region</em>
```

**Expected behaviour:** Foreground color #767676 or darker on white (#ffffff) background → 4.54:1

**Actual behaviour:** color: #999999 on #ffffff → contrast ratio 2.84:1

**Suggested fix:**
```
In Claro's block-admin CSS, darken the placeholder text:

/* Before (broken) */
.block-region .region-message em {
  color: #999999;
}

/* After (fixed) */
.block-region .region-message em {
  color: #767676; /* 4.54:1 on white */
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .region-social-message > td[colspan="5"] > em
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 5. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-005` |
| **Pattern ID** | `DRU-45980683` *(stable hash — use to track regressions)* |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout `[INS-46B51422]`

**Selector:**
```css
.region-sidebar-message > td[colspan="5"] > em
```

**XPath:**
```
//*[contains(@class,"region-sidebar-message > td[colspan="5"] > em")]
```

**HTML snippet:**
```html
<em>No blocks in this region</em>
```

**Expected behaviour:** Foreground color #767676 or darker on white (#ffffff) background → 4.54:1

**Actual behaviour:** color: #999999 on #ffffff → contrast ratio 2.84:1

**Suggested fix:**
```
In Claro's block-admin CSS, darken the placeholder text:

/* Before (broken) */
.block-region .region-message em {
  color: #999999;
}

/* After (fixed) */
.block-region .region-message em {
  color: #767676; /* 4.54:1 on white */
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .region-sidebar-message > td[colspan="5"] > em
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 6. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-006` |
| **Pattern ID** | `DRU-B6FD23D8` *(stable hash — use to track regressions)* |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout `[INS-7421632C]`

**Selector:**
```css
.region-content_below-message > td[colspan="5"] > em
```

**XPath:**
```
//*[contains(@class,"region-content_below-message > td[colspan="5"] > em")]
```

**HTML snippet:**
```html
<em>No blocks in this region</em>
```

**Expected behaviour:** Foreground color #767676 or darker on white (#ffffff) background → 4.54:1

**Actual behaviour:** color: #999999 on #ffffff → contrast ratio 2.84:1

**Suggested fix:**
```
In Claro's block-admin CSS, darken the placeholder text:

/* Before (broken) */
.block-region .region-message em {
  color: #999999;
}

/* After (fixed) */
.block-region .region-message em {
  color: #767676; /* 4.54:1 on white */
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .region-content_below-message > td[colspan="5"] > em
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 7. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-007` |
| **Pattern ID** | `DRU-EDE98251` *(stable hash — use to track regressions)* |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout `[INS-40F7E71F]`

**Selector:**
```css
.region-footer_top-message > td[colspan="5"] > em
```

**XPath:**
```
//*[contains(@class,"region-footer_top-message > td[colspan="5"] > em")]
```

**HTML snippet:**
```html
<em>No blocks in this region</em>
```

**Expected behaviour:** Foreground color #767676 or darker on white (#ffffff) background → 4.54:1

**Actual behaviour:** color: #999999 on #ffffff → contrast ratio 2.84:1

**Suggested fix:**
```
In Claro's block-admin CSS, darken the placeholder text:

/* Before (broken) */
.block-region .region-message em {
  color: #999999;
}

/* After (fixed) */
.block-region .region-message em {
  color: #767676; /* 4.54:1 on white */
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .region-footer_top-message > td[colspan="5"] > em
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 8. Breadcrumb links are only 14px tall — WCAG 2.5.8 requires 24×24px minimum 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-008` |
| **Pattern ID** | `DRU-4DD0A36F` *(stable hash — use to track regressions)* |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/css/components/breadcrumb.css, core/themes/claro/templates/breadcrumb.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | motor, low-vision |

**Affected pages:**
- [`/admin/config/content/formats/manage/restricted_html`](https://drupal-core.ddev.site/admin/config/content/formats/manage/restricted_html) — Text format (restricted) `[INS-09AEDF30]`

**Selector:**
```css
a[href$="admin"]
```

**XPath:**
```
//a[@href$="admin"]
```

**HTML snippet:**
```html
<a href="/admin" class="breadcrumb__link">Administration</a>
```

**Expected behaviour:** Clickable area ≥ 24×24px (WCAG 2.5.8 AA)

**Actual behaviour:** Breadcrumb links: 14px height, insufficient spacing from neighbours

**Suggested fix:**
```
Increase the breadcrumb link target size via CSS:

/* claro/css/components/breadcrumb.css */
.breadcrumb__link {
  /* Add padding so the clickable area meets 24px minimum */
  padding-block: 5px;
  display: inline-block;
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/config/content/formats/manage/restricted_html
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: a[href$="admin"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 9. Breadcrumb links are only 14px tall — WCAG 2.5.8 requires 24×24px minimum 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-009` |
| **Pattern ID** | `DRU-B5BC19D5` *(stable hash — use to track regressions)* |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `breadcrumb.html.twig` — Breadcrumb template |
| **Drupal file(s)** | core/themes/claro/css/components/breadcrumb.css, core/themes/claro/templates/breadcrumb.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | motor, low-vision |

**Affected pages:**
- [`/admin/config/content/formats/manage/restricted_html`](https://drupal-core.ddev.site/admin/config/content/formats/manage/restricted_html) — Text format (restricted) `[INS-FFA737C7]`

**Selector:**
```css
.breadcrumb__link[href$="formats"]
```

**XPath:**
```
//*[contains(@class,"breadcrumb__link[href$="formats"]")]
```

**HTML snippet:**
```html
<a href="/admin/config/content/formats" class="breadcrumb__link">Text formats and editors</a>
```

**Expected behaviour:** Clickable area ≥ 24×24px (WCAG 2.5.8 AA)

**Actual behaviour:** Breadcrumb links: 14px height, insufficient spacing from neighbours

**Suggested fix:**
```
Increase the breadcrumb link target size via CSS:

/* claro/css/components/breadcrumb.css */
.breadcrumb__link {
  /* Add padding so the clickable area meets 24px minimum */
  padding-block: 5px;
  display: inline-block;
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/config/content/formats/manage/restricted_html
1. Open browser DevTools and run: axe.run()
1. Look for rule "target-size" on selector: .breadcrumb__link[href$="formats"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 10. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-010` |
| **Pattern ID** | `DRU-53235649` *(stable hash — use to track regressions)* |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout (mobile) `[INS-C8DA2EEA]`

**Selector:**
```css
.region-hero-message > td[colspan="5"] > em
```

**XPath:**
```
//*[contains(@class,"region-hero-message > td[colspan="5"] > em")]
```

**HTML snippet:**
```html
<em>No blocks in this region</em>
```

**Expected behaviour:** Foreground color #767676 or darker on white (#ffffff) background → 4.54:1

**Actual behaviour:** color: #999999 on #ffffff → contrast ratio 2.84:1

**Suggested fix:**
```
In Claro's block-admin CSS, darken the placeholder text:

/* Before (broken) */
.block-region .region-message em {
  color: #999999;
}

/* After (fixed) */
.block-region .region-message em {
  color: #767676; /* 4.54:1 on white */
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .region-hero-message > td[colspan="5"] > em
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 11. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-011` |
| **Pattern ID** | `DRU-34AFC21D` *(stable hash — use to track regressions)* |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout (mobile) `[INS-5C55015C]`

**Selector:**
```css
.region-social-message > td[colspan="5"] > em
```

**XPath:**
```
//*[contains(@class,"region-social-message > td[colspan="5"] > em")]
```

**HTML snippet:**
```html
<em>No blocks in this region</em>
```

**Expected behaviour:** Foreground color #767676 or darker on white (#ffffff) background → 4.54:1

**Actual behaviour:** color: #999999 on #ffffff → contrast ratio 2.84:1

**Suggested fix:**
```
In Claro's block-admin CSS, darken the placeholder text:

/* Before (broken) */
.block-region .region-message em {
  color: #999999;
}

/* After (fixed) */
.block-region .region-message em {
  color: #767676; /* 4.54:1 on white */
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .region-social-message > td[colspan="5"] > em
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 12. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-012` |
| **Pattern ID** | `DRU-60714829` *(stable hash — use to track regressions)* |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout (mobile) `[INS-8F3C65E8]`

**Selector:**
```css
.region-sidebar-message > td[colspan="5"] > em
```

**XPath:**
```
//*[contains(@class,"region-sidebar-message > td[colspan="5"] > em")]
```

**HTML snippet:**
```html
<em>No blocks in this region</em>
```

**Expected behaviour:** Foreground color #767676 or darker on white (#ffffff) background → 4.54:1

**Actual behaviour:** color: #999999 on #ffffff → contrast ratio 2.84:1

**Suggested fix:**
```
In Claro's block-admin CSS, darken the placeholder text:

/* Before (broken) */
.block-region .region-message em {
  color: #999999;
}

/* After (fixed) */
.block-region .region-message em {
  color: #767676; /* 4.54:1 on white */
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .region-sidebar-message > td[colspan="5"] > em
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 13. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-013` |
| **Pattern ID** | `DRU-80D85F22` *(stable hash — use to track regressions)* |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout (mobile) `[INS-F57DFBAB]`

**Selector:**
```css
.region-content_below-message > td[colspan="5"] > em
```

**XPath:**
```
//*[contains(@class,"region-content_below-message > td[colspan="5"] > em")]
```

**HTML snippet:**
```html
<em>No blocks in this region</em>
```

**Expected behaviour:** Foreground color #767676 or darker on white (#ffffff) background → 4.54:1

**Actual behaviour:** color: #999999 on #ffffff → contrast ratio 2.84:1

**Suggested fix:**
```
In Claro's block-admin CSS, darken the placeholder text:

/* Before (broken) */
.block-region .region-message em {
  color: #999999;
}

/* After (fixed) */
.block-region .region-message em {
  color: #767676; /* 4.54:1 on white */
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .region-content_below-message > td[colspan="5"] > em
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 14. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-014` |
| **Pattern ID** | `DRU-DBD71992` *(stable hash — use to track regressions)* |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout (mobile) `[INS-66E9C03F]`

**Selector:**
```css
.region-footer_top-message > td[colspan="5"] > em
```

**XPath:**
```
//*[contains(@class,"region-footer_top-message > td[colspan="5"] > em")]
```

**HTML snippet:**
```html
<em>No blocks in this region</em>
```

**Expected behaviour:** Foreground color #767676 or darker on white (#ffffff) background → 4.54:1

**Actual behaviour:** color: #999999 on #ffffff → contrast ratio 2.84:1

**Suggested fix:**
```
In Claro's block-admin CSS, darken the placeholder text:

/* Before (broken) */
.block-region .region-message em {
  color: #999999;
}

/* After (fixed) */
.block-region .region-message em {
  color: #767676; /* 4.54:1 on white */
}
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/structure/block
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .region-footer_top-message > td[colspan="5"] > em
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 15. Local task tab headings (#primary-tabs-title) are outside any landmark region 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-015` |
| **Pattern ID** | `DRU-12C757FE` *(stable hash — use to track regressions)* |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 7 of 29 pages (24%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/user/login`](https://drupal-core.ddev.site/user/login) — User login `[INS-BC3B17C9]`
- [`/user/password`](https://drupal-core.ddev.site/user/password) — User password reset `[INS-94EA0EA1]`
- [`/admin`](https://drupal-core.ddev.site/admin) — Admin dashboard `[INS-ED5789D1]`
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-6261BD8B]`
- [`/admin/appearance`](https://drupal-core.ddev.site/admin/appearance) — Appearance `[INS-66F0411F]`
- [`/admin/modules`](https://drupal-core.ddev.site/admin/modules) — Modules `[INS-5D29050A]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-53475AE4]`

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

### 16. Primary admin actions block is rendered outside any ARIA landmark 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-016` |
| **Pattern ID** | `DRU-C31EA5D4` *(stable hash — use to track regressions)* |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 5 of 29 pages (17%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page.html.twig, Core block placement configuration |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/admin/content`](https://drupal-core.ddev.site/admin/content) — Content list `[INS-23FF1F89]`
- [`/admin/structure/types`](https://drupal-core.ddev.site/admin/structure/types) — Content types `[INS-95F014D7]`
- [`/admin/structure/taxonomy`](https://drupal-core.ddev.site/admin/structure/taxonomy) — Taxonomy `[INS-0E93B528]`
- [`/admin/people`](https://drupal-core.ddev.site/admin/people) — People `[INS-B061B58E]`
- [`/admin/config/content/formats`](https://drupal-core.ddev.site/admin/config/content/formats) — Text formats `[INS-B73C4425]`

**Selector:**
```css
#block-olivero-primary-admin-actions > .block__content
```

**XPath:**
```
//*[@id="block-olivero-primary-admin-actions > .block__content"]
```

**HTML snippet:**
```html
<div class="block__content">
      

<li class="action-links-item"><a href="/node/add" class="button button-action" data-drupal-link-system-path="node/add">Add content</a></li>

    </div>
```

**Expected behaviour:** Block content is inside a <main>, <nav>, <aside>, or equivalent landmark

**Actual behaviour:** #block-olivero-primary-admin-actions .block__content is outside all landmarks

**Suggested fix:**
```
Wrap the admin actions block in a <nav> in the page template, or ensure block region
is inside an appropriate landmark:

{# Olivero page.html.twig — ensure admin actions region is inside <main> or wrap it #}
<nav aria-label="{{ 'Page actions'|t }}">
  {{ page.primary_admin_actions }}
</nav>
```

**Steps to reproduce:**
1. Navigate to https://drupal-core.ddev.site/admin/content
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #block-olivero-primary-admin-actions > .block__content
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 17. Status messages block uses role="contentinfo", duplicating the page <footer> 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-017` |
| **Pattern ID** | `DRU-954A78DB` *(stable hash — use to track regressions)* |
| **Rule** | [`landmark-no-duplicate-contentinfo`](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 3 of 29 pages (10%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/misc/status-messages.html.twig, core/modules/system/templates/status-messages.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/admin/appearance`](https://drupal-core.ddev.site/admin/appearance) — Appearance `[INS-06B9A6FE]`
- [`/admin/modules`](https://drupal-core.ddev.site/admin/modules) — Modules `[INS-43FA80E2]`
- [`/admin/config`](https://drupal-core.ddev.site/admin/config) — Configuration `[INS-1A9B720A]`

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
<div class="messages-list__item messages messages--error" data-drupal-selector="messages" role="contentinfo" aria-label="Error message" data-once="messages">
```

**Expected behaviour:** Status messages use role="status" (non-error) or role="alert" (errors)

**Actual behaviour:** <div role="contentinfo" aria-labelledby="…"> — conflicts with the page footer landmark

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
1. Navigate to https://drupal-core.ddev.site/admin/appearance
1. Open browser DevTools and run: axe.run()
1. Look for rule "landmark-no-duplicate-contentinfo" on selector: .messages-list__item
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 18. Local task tab headings (#primary-tabs-title) are outside any landmark region 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-018` |
| **Pattern ID** | `DRU-E877649B` *(stable hash — use to track regressions)* |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 29 pages (7%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/user/login`](https://drupal-core.ddev.site/user/login) — User login (mobile) `[INS-4AA1B1B9]`
- [`/admin`](https://drupal-core.ddev.site/admin) — Admin dashboard (mobile) `[INS-CA3F486A]`

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

### 19. Homepage has no <h1> heading — screen reader users cannot identify page topic 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-019` |
| **Pattern ID** | `DRU-FE39ED4A` *(stable hash — use to track regressions)* |
| **Rule** | [`page-has-heading-one`](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/`](https://drupal-core.ddev.site/) — Homepage `[INS-C56E21D1]`

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

### 20. Homepage has no <h1> heading — screen reader users cannot identify page topic 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-020` |
| **Pattern ID** | `DRU-2DD6D8F2` *(stable hash — use to track regressions)* |
| **Rule** | [`page-has-heading-one`](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/`](https://drupal-core.ddev.site/) — Homepage (mobile) `[INS-13EEEC14]`

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

### 21. Local task tab headings (#primary-tabs-title) are outside any landmark region 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-021` |
| **Pattern ID** | `DRU-4D24D5C1` *(stable hash — use to track regressions)* |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/admin/structure/block`](https://drupal-core.ddev.site/admin/structure/block) — Block layout `[INS-F6796033]`

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

### 22. Admin Configuration page has heading-order violations (h3 appears before h2) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-022` |
| **Pattern ID** | `DRU-994C4E5C` *(stable hash — use to track regressions)* |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 29 pages (3%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- [`/admin/config`](https://drupal-core.ddev.site/admin/config) — Configuration `[INS-16429CD3]`

**Selector:**
```css
.layout-column.layout-column--half:nth-child(2) > .panel:nth-child(1) > .panel__title
```

**XPath:**
```
//*[contains(@class,"layout-column.layout-column--half:nth-child(2) > .panel:nth-child(1) > .panel__title")]
```

**HTML snippet:**
```html
<h3 class="panel__title">People</h3>
```

**Expected behaviour:** Heading levels increment by one: h1 → h2 → h3

**Actual behaviour:** Panel titles use <h3> but their section headings may be absent or at wrong level

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
1. Navigate to https://drupal-core.ddev.site/admin/config
1. Open browser DevTools and run: axe.run()
1. Look for rule "heading-order" on selector: .layout-column.layout-column--half:nth-child(2) > .panel:nth-child(1) > .panel__title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js
