# Drupal Core Accessibility Bug Report

> **Generated:** 2026-04-29T13:13:42.097Z
> **Tool:** axe-core via @axe-core/playwright | **Browser:** Chromium
> **Standard:** [ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md](https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)

## Summary

| Metric | Value |
| :--- | :--- |
| Pages crawled | 452 |
| Total violation instances | 1328 |
| Unique patterns | 13 |
| Template-level patterns (≥3 pages) 🔁 | 11 |
| Critical | 1 |
| Serious | 4 |
| Moderate | 6 |
| Minor | 2 |

## Aggregated Accessibility Issues by Category

### Form Interactions

- **Total unique patterns:** 2
- **Rules:** `label`, `label-title-only`

  - label: Ensure every form element has a label
    - Affected routes (full list): /contact/imagefile_file
  - "Select all rows" checkbox is labeled only by its title attribute
    - Affected routes (full list): /admin/content, /admin/people, /table

### CSS and Presentation

- **Total unique patterns:** 1
- **Rules:** `color-contrast`

  - color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min
    - Affected routes (full list): /admin/content, /admin/people

### Input Modalities

- **Total unique patterns:** 2
- **Rules:** `tabindex`, `target-size`

  - tabindex: Ensure tabindex attribute values are not greater than 0
    - Affected routes (full list): /buttons
  - target-size: Ensure touch targets have sufficient size and space
    - Affected routes (full list): /tabledrag

### Semantic Structure

- **Total unique patterns:** 7
- **Rules:** `region`, `landmark-contentinfo-is-top-level`, `landmark-no-duplicate-contentinfo`, `heading-order`, `landmark-unique`, `page-has-heading-one`, `empty-heading`

  - region: Ensure all page content is contained by landmarks
    - Affected routes (full list): /, /action-link, /admin, /admin/appearance, /admin/config, /admin/config/content/formats, /admin/config/content/formats/manage/restricted_html, /admin/config/system/site-information, /admin/content, /admin/form_style, /admin/modules, /admin/people, /admin/reports, /admin/structure, /admin/structure/block, /admin/structure/display-modes/form/add/contact_message, /admin/structure/taxonomy, /admin/structure/taxonomy/add, /admin/structure/types, /admin/structure/types/add, /admin/structure/types/manage/test_type/display/default, /autocomplete, /buttons, /cd-navigation/config, /contact/checkbox_radio, /contact/field_cardinality_test, /contact/imagefile_file, /contact/imagefile_image, /contact/presuf_formatted, /contact/presuf_number, /contact/presuf_text, /contact/select, /contact/textarea, /contact/textform, /dialog, /dropbutton, /fieldset, /message, /node/add/article, /node/add/cd, /node/add/page, /password, /progress, /search/node, /table, /tabledrag, /tabs, /tabs/format/plain_text, /this-page-does-not-exist, /user/1/edit, /user/login, /user/password, /user/register
  - landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level
    - Affected routes (full list): /admin/appearance, /admin/modules, /message
  - Status messages block uses role="contentinfo", duplicating the page <footer>
    - Affected routes (full list): /admin/appearance, /admin/modules
  - heading-order: Ensure the order of headings is semantically correct
    - Affected routes (full list): /admin/form_style
  - landmark-unique: Ensure landmarks are unique
    - Affected routes (full list): /message
  - Homepage has no <h1> heading — screen reader users cannot identify page topic
    - Affected routes (full list): /
  - empty-heading: Ensure headings have discernible text
    - Affected routes (full list): /dialog, /tabs

### Data Tables

- **Total unique patterns:** 1
- **Rules:** `empty-table-header`

  - empty-table-header: Ensure table headers have discernible text
    - Affected routes (full list): /autocomplete

## Reproducible Issue Details

### DRUPAL-A11Y-001: label: Ensure every form element has a label

**Pattern ID:** DRU-6CA3D5EB
**Rule:** axe-core - label
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/label
**Severity:** Critical (axe impact: critical)
**WCAG SC:** 1.3.1 - Info and Relationships (Level A)
**Frequency:** 4 of 452 pages (1%)
**Selector:** #edit-imagefile-file-limited-N-display
**XPath:** //*[@id="edit-imagefile-file-limited-0-display"]
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/contact/imagefile_file

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<input class="file-display form-checkbox form-boolean form-boolean--type-checkbox" data-drupal-selector="edit-imagefile-file-limited-0-display" type="checkbox" id="edit-imagefile-file-limited-0-display" name="imagefile_file_limited[0][display]" value="1" checked="checked">
```

#### Description
Fix any of the following:
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element has no placeholder attribute
  Element's default semantics were not overridden with role="none" or role="presentation"

#### Steps to Reproduce
1. Go to https://drupal-core.ddev.site/contact/imagefile_file
2. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)
3. Open browser DevTools and run axe.run() in the Console.
4. Confirm rule label on selector #edit-imagefile-file-limited-N-display.

#### Expected Behaviour
Element and interaction meet the mapped WCAG success criterion.

#### Actual Behaviour
Fix any of the following:
  Element does not have an implicit (wrapped) <label>
  Element does not have an explicit <label>
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element has no placeholder attribute
  Element's default semantics were not overridden with role="none" or role="presentation"

#### Impact
blind, low-vision, voice-control

#### Suggested Fix
See axe documentation.

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/label
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/131.html
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- GOV.UK Design System - Labels: https://design-system.service.gov.uk/components/text-input/
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=label&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI mapped fix examples: https://github.com/GovTechSG/purple-ai/blob/main/results/label.json

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-6CA3D5EB
- Instance IDs: INS-94BD37A1, INS-B2D7B1D7, INS-7B9BD2A8, INS-F76BAB53

### DRUPAL-A11Y-002: "Select all rows" checkbox is labeled only by its title attribute

**Pattern ID:** DRU-987EB788
**Rule:** axe-core - label-title-only
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/label-title-only
**Severity:** High (axe impact: serious)
**WCAG SC:** 1.3.1 - Info and Relationships (Level A)
**Frequency:** 18 of 452 pages (4%)
**Selector:** input[title="Select all rows in this table"]
**XPath:** //input[@title="Select all rows in this table"]
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/admin/content
- /admin/people
- /table

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox" title="Select all rows in this table">
```

#### Description
Fix all of the following:
  Only title used to generate label for form element

#### Steps to Reproduce
1. Go to https://drupal-core.ddev.site/admin/content
2. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)
3. Open browser DevTools and run axe.run() in the Console.
4. Confirm rule label-title-only on selector input[title="Select all rows in this table"].

#### Expected Behaviour
Checkbox has a visible or visually-hidden <label>, or aria-label

#### Actual Behaviour
input[title="Select all rows in this table"] — title is the sole label source

#### Impact
blind, low-vision, voice-control

#### Suggested Fix
Replace the title-only label with aria-label:

<!-- Before (broken) -->
<input type="checkbox" title="{{ 'Select all rows in this table'|t }}">

<!-- After (fixed) -->
<input type="checkbox"
  aria-label="{{ 'Select all rows in this table'|t }}">

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/label-title-only
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/131.html
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- GOV.UK Design System - Checkboxes: https://design-system.service.gov.uk/components/checkboxes/
- Create new Drupal issue: https://www.drupal.org/project/drupal/issues/new
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=label-title-only%20%22Select%20all%20rows%22%20checkbox%20is%20labeled%20only%20by%20its%20title%20attribute&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI (repo): https://github.com/GovTechSG/purple-ai

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-987EB788
- Instance IDs: INS-631CA206, INS-5F43B594, INS-D6A47BCB, INS-D9AD9720, INS-AFFA444F, INS-41328F01, INS-311ACB28, INS-70DF180C, INS-F4DA69C2, INS-098B09CD, INS-DA8EC130, INS-15986FAB, INS-9D772808, INS-2C5FBD36, INS-CB68FC02, INS-50910191, INS-24B11422, INS-96198CAB

### DRUPAL-A11Y-003: color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min

**Pattern ID:** DRU-44C01FEA
**Rule:** axe-core - color-contrast
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/color-contrast
**Severity:** High (axe impact: serious)
**WCAG SC:** 1.4.3 - Contrast (Minimum) (Level AA)
**Frequency:** 24 of 452 pages (5%)
**Selector:** #edit-submit
**XPath:** //*[@id="edit-submit"]
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/admin/content
- /admin/people

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<input class="button--small button button--primary js-form-submit form-submit" data-drupal-selector="edit-submit" type="submit" id="edit-submit" name="op" value="Apply to selected items">
```

#### Description
Fix any of the following:
  Element has insufficient color contrast of 4.24 (foreground color: #ffffff, background color: #3371ff, font size: 9.5pt (12.64px), font weight: bold). Expected contrast ratio of 4.5:1

#### Steps to Reproduce
1. Go to https://drupal-core.ddev.site/admin/content
2. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)
3. Open browser DevTools and run axe.run() in the Console.
4. Confirm rule color-contrast on selector #edit-submit.

#### Expected Behaviour
Element and interaction meet the mapped WCAG success criterion.

#### Actual Behaviour
Fix any of the following:
  Element has insufficient color contrast of 4.24 (foreground color: #ffffff, background color: #3371ff, font size: 9.5pt (12.64px), font weight: bold). Expected contrast ratio of 4.5:1

#### Impact
low-vision

#### Suggested Fix
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/color-contrast
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/143.html
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- DWP - Colour and contrast: https://accessibility-manual.dwp.gov.uk/tools-and-resources/colour-and-contrast
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=color-contrast&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI (repo): https://github.com/GovTechSG/purple-ai

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-44C01FEA
- Instance IDs: INS-FF0DA1EB, INS-2484DC91, INS-C1A3581E, INS-4A227943, INS-71EFBE79, INS-CEE7A7E5, INS-599E4E6F, INS-D6C3D79C, INS-4FF78378, INS-15BCDDA4, INS-DE80BAA9, INS-F76983F2, INS-2F192593, INS-A658A5E7, INS-BE832DAC, INS-32A7C8C3, INS-CC4E5B84, INS-4F001513, INS-57557F7B, INS-1E91D181, INS-E4C3D7C6, INS-C6066AD3, INS-B74E58E8, INS-1763A2E3

### DRUPAL-A11Y-004: tabindex: Ensure tabindex attribute values are not greater than 0

**Pattern ID:** DRU-CC36FB25
**Rule:** axe-core - tabindex
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/tabindex
**Severity:** High (axe impact: serious)
**WCAG SC:** 2.4.3 - Focus Order (Level A)
**Frequency:** 12 of 452 pages (3%)
**Selector:** #edit-submit
**XPath:** //*[@id="edit-submit"]
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/buttons

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<input class="button button--primary js-form-submit form-submit" tabindex="1" data-drupal-selector="edit-submit" type="submit" id="edit-submit" name="op" value="Primary">
```

#### Description
Fix any of the following:
  Element has a tabindex greater than 0

#### Steps to Reproduce
1. Go to https://drupal-core.ddev.site/buttons
2. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)
3. Open browser DevTools and run axe.run() in the Console.
4. Confirm rule tabindex on selector #edit-submit.

#### Expected Behaviour
Element and interaction meet the mapped WCAG success criterion.

#### Actual Behaviour
Fix any of the following:
  Element has a tabindex greater than 0

#### Impact
users with disabilities

#### Suggested Fix
See axe documentation.

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/tabindex
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/243.html
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- DWP - Keyboard-only usage: https://accessibility-manual.dwp.gov.uk/tools-and-resources/keyboard-only-usage
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=tabindex&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI (repo): https://github.com/GovTechSG/purple-ai

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-CC36FB25
- Instance IDs: INS-8D919E9F, INS-CAB80BF0, INS-A357FA62, INS-1A8E3C8A, INS-4881B6B1, INS-156540A8, INS-00588EC7, INS-3F6254E0, INS-2C9CAF62, INS-C767C3EA, INS-4C49F093, INS-E7E947B6

### DRUPAL-A11Y-005: target-size: Ensure touch targets have sufficient size and space

**Pattern ID:** DRU-697B741E
**Rule:** axe-core - target-size
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/target-size
**Severity:** High (axe impact: serious)
**WCAG SC:** 2.5.8 - Target Size (Minimum) (Level AA)
**Frequency:** 38 of 452 pages (8%)
**Selector:** tr[data-drupal-selector="edit-terms-tid10"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]
**XPath:** //tr[@data-drupal-selector="edit-terms-tid10"]
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/tabledrag

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

#### Description
Fix any of the following:
  Target has insufficient size (33px by 20px, should be at least 24px by 24px)
  Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 6.4px instead of at least 24px.

#### Steps to Reproduce
1. This issue may require interaction state (typing/dragging/focus) to expose the failing element.
2. Go to https://drupal-core.ddev.site/tabledrag
3. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile)
4. Open browser DevTools and run axe.run() in the Console.
5. Confirm rule target-size on selector tr[data-drupal-selector="edit-terms-tid10"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"].

#### Expected Behaviour
Element and interaction meet the mapped WCAG success criterion.

#### Actual Behaviour
Fix any of the following:
  Target has insufficient size (33px by 20px, should be at least 24px by 24px)
  Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 6.4px instead of at least 24px.

#### Impact
motor, low-vision

#### Suggested Fix
Ensure interactive elements have a minimum 24×24px clickable area via padding or min-height/min-width in CSS.

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/target-size
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/258.html
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- WCAG 2.2 - Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=target-size&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI (repo): https://github.com/GovTechSG/purple-ai

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-697B741E
- Instance IDs: INS-1E6C57C0, INS-836FD897, INS-12A6655F, INS-E3691E26, INS-1EE2D602, INS-47D713EE, INS-BAA09E91, INS-6914A3F2, INS-19D9E650, INS-F1BA6329, INS-11612407, INS-6F0C9429, INS-67F50851, INS-C064D2AC, INS-37ED96AD, INS-D10E50E9, INS-530D0F3C, INS-C4CDCD8A, INS-890AAC59, INS-A5C53B8A, INS-77F43484, INS-F23B5BB2, INS-463A943E, INS-E3E3F502, INS-2F30409D, INS-7153533A, INS-8C98F215, INS-7E72035D, INS-1DD3D540, INS-8547CE7B, INS-0B05280A, INS-39EDEAD3, INS-56862D54, INS-CD33C4CE, INS-7A5AFBEF, INS-28730DEB, INS-7E5CF8DC, INS-92A5E39D

### DRUPAL-A11Y-006: region: Ensure all page content is contained by landmarks

**Pattern ID:** DRU-6BA9E02D
**Rule:** axe-core - region
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/region
**Severity:** Medium (axe impact: moderate)
**WCAG SC:** 1.3.6 - Identify Purpose (Level A)
**Frequency:** 176 of 452 pages (39%)
**Selector:** .themeswitcher-form__form-item
**XPath:** //*[contains(@class,"themeswitcher-form__form-item")]
**Parent Context:** N/A
**Likely Template:** form-element.html.twig
**Template Hint:** Form element template
**Drupal File:** See likely_template above

**Affected URLs (full list):**
- https://drupal-core.ddev.site/
- /action-link
- /admin
- /admin/appearance
- /admin/config
- /admin/config/content/formats
- /admin/config/content/formats/manage/restricted_html
- /admin/config/system/site-information
- /admin/content
- /admin/form_style
- /admin/modules
- /admin/people
- /admin/reports
- /admin/structure
- /admin/structure/block
- /admin/structure/display-modes/form/add/contact_message
- /admin/structure/taxonomy
- /admin/structure/taxonomy/add
- /admin/structure/types
- /admin/structure/types/add
- /admin/structure/types/manage/test_type/display/default
- /autocomplete
- /buttons
- /cd-navigation/config
- /contact/checkbox_radio
- /contact/field_cardinality_test
- /contact/imagefile_file
- /contact/imagefile_image
- /contact/presuf_formatted
- /contact/presuf_number
- /contact/presuf_text
- /contact/select
- /contact/textarea
- /contact/textform
- /dialog
- /dropbutton
- /fieldset
- /message
- /node/add/article
- /node/add/cd
- /node/add/page
- /password
- /progress
- /search/node
- /table
- /tabledrag
- /tabs
- /tabs/format/plain_text
- /this-page-does-not-exist
- /user/1/edit
- /user/login
- /user/password
- /user/register

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile), `olivero` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<div class="themeswitcher-form__form-item js-form-item form-item js-form-type-select form-type--select js-form-item-preferred-theme form-item--preferred-theme">
```

#### Description
Fix any of the following:
  Some page content is not contained by landmarks

#### Steps to Reproduce
1. This issue may require opening a dialog/off-canvas panel before running axe.
2. Go to https://drupal-core.ddev.site/
3. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile), `olivero` (dark desktop, dark mobile, light desktop, light mobile)
4. Open browser DevTools and run axe.run() in the Console.
5. Confirm rule region on selector .themeswitcher-form__form-item.

#### Expected Behaviour
Element and interaction meet the mapped WCAG success criterion.

#### Actual Behaviour
Fix any of the following:
  Some page content is not contained by landmarks

#### Impact
blind, low-vision

#### Suggested Fix
Ensure all visible content is inside a landmark element (<main>, <nav>, <aside>, <header>, <footer>). Check page.html.twig and block placement.

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/region
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/136.html
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- WAI - Page structure and landmarks: https://www.w3.org/WAI/tutorials/page-structure/landmarks/
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=region&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI (repo): https://github.com/GovTechSG/purple-ai

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-6BA9E02D
- Instance IDs: INS-D8DE6AC1, INS-F0C4F2C1, INS-83E2F270, INS-A3BAFC54, INS-565D5E04, INS-E66D392C, INS-34D3B6E6, INS-3AE334AB, INS-D89718F7, INS-C8AC947D, INS-089837C7, INS-AD065F7B, INS-1F0E5C7A, INS-0420759A, INS-FBDFDDE1, INS-F6222FEA, INS-51A7195E, INS-866D8A1F, INS-26112C87, INS-37EFF8DC, INS-001C27FA, INS-38000B83, INS-C74D84C8, INS-FF2DB6B1, INS-EB461FD0, INS-DEB0E01D, INS-203E1CD2, INS-FA09BF07, INS-35D2713C, INS-7DC312DB, INS-E427825B, INS-6F951C47, INS-22C5B103, INS-88F5EE60, INS-2AE13BCB, INS-3AE351E7, INS-C15EEB54, INS-BCB4F132, INS-760F267C, INS-2E5FC9E0, INS-814B6CFE, INS-5882C95B, INS-FA2A20D1, INS-E20671AE, INS-924D863B, INS-B73E1074, INS-D059761D, INS-077300B7, INS-6671D464, INS-EE92CDEF, INS-26CD137D, INS-494B15C6, INS-206E1DCE, INS-CCBE2A0F, INS-18ECCC55, INS-B8AF800F, INS-115ABFF8, INS-BAEE3A35, INS-B5A36498, INS-C4CE338B, INS-F8D1D7E6, INS-F5AEF57A, INS-38B49EEF, INS-0769D6CD, INS-62B880CE, INS-71DFB250, INS-CE3E0BFE, INS-613A665F, INS-C0A71F89, INS-DF4DA25A, INS-CF919880, INS-17F11137, INS-F7B8F881, INS-76E12963, INS-3B1ECF24, INS-762B0C83, INS-548386BA, INS-922195A3, INS-7CFE618D, INS-E6B1F764, INS-30B71F0D, INS-57B6553C, INS-E4AA2E02, INS-DF13AB5A, INS-0D3ED81E, INS-F83D856B, INS-868C8A7E, INS-3D2920D2, INS-81C44978, INS-270738CF, INS-9118E488, INS-2E5F28D5, INS-BB8DE047, INS-DC077153, INS-343FB881, INS-6788C962, INS-0EF67DB9, INS-74810756, INS-63D59683, INS-20AC4120, INS-F21125DF, INS-636E78C8, INS-44C022F1, INS-B724274A, INS-0C9A0403, INS-9BDAC1ED, INS-ED5789D1, INS-CA3F486A, INS-6261BD8B, INS-AD498A59, INS-7BFD0B73, INS-6F860D5F, INS-66F0411F, INS-95DE8A2C, INS-5D29050A, INS-3E19E7EC, INS-53475AE4, INS-AEBAFC08, INS-B755019F, INS-9E2B5CF0, INS-59226044, INS-6F730C20, INS-BCA850CD, INS-E0049478, INS-704C3FBE, INS-FEB48EDD, INS-09A4B9FB, INS-32D20F60, INS-F85213DF, INS-FB25E7CB, INS-5663A0FA, INS-F1044BC7, INS-7CDF9E9F, INS-C1F48F13, INS-52BF86F6, INS-1F64C2B0, INS-2035201D, INS-4C77D31E, INS-8B47FF01, INS-54DEB294, INS-CD789B90, INS-4A732CB0, INS-99938DDE, INS-7A2B9144, INS-2DDBCF6D, INS-F88F3595, INS-3643D117, INS-CED52503, INS-FFA0B56A, INS-4C03CFAA, INS-E0F07AC5, INS-268F906D, INS-1836B535, INS-10BB8E04, INS-BC3B17C9, INS-4AA1B1B9, INS-94EA0EA1, INS-806AF88F, INS-F6796033, INS-8E336E32, INS-D1878989, INS-F8C6C7E7, INS-ED973753, INS-5FED7CB6, INS-164962E7, INS-4D0090DA, INS-F517503C, INS-CFCBB8DB, INS-08C28518, INS-A833DA67, INS-FCCC084E, INS-A8DE8EF1, INS-050A0C81, INS-7AC7F7D6, INS-0B3D8B00, INS-63D4E7CB

### DRUPAL-A11Y-007: landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level

**Pattern ID:** DRU-2E022F2F
**Rule:** axe-core - landmark-contentinfo-is-top-level
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level
**Severity:** Medium (axe impact: moderate)
**WCAG SC:** 1.3.6 - Identify Purpose (Level A)
**Frequency:** 22 of 452 pages (5%)
**Selector:** .messages--error
**XPath:** //*[contains(@class,"messages--error")]
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/admin/appearance
- /admin/modules
- /message

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<div role="contentinfo" aria-labelledby="message-error-title" class="messages-list__item messages messages--error">
```

#### Description
Fix any of the following:
  The contentinfo landmark is contained in another landmark.

#### Steps to Reproduce
1. Go to https://drupal-core.ddev.site/admin/appearance
2. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)
3. Open browser DevTools and run axe.run() in the Console.
4. Confirm rule landmark-contentinfo-is-top-level on selector .messages--error.

#### Expected Behaviour
Element and interaction meet the mapped WCAG success criterion.

#### Actual Behaviour
Fix any of the following:
  The contentinfo landmark is contained in another landmark.

#### Impact
users with disabilities

#### Suggested Fix
See axe documentation.

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/136.html
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- WAI - Page structure and landmarks: https://www.w3.org/WAI/tutorials/page-structure/landmarks/
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=landmark-contentinfo-is-top-level&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI (repo): https://github.com/GovTechSG/purple-ai

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-2E022F2F
- Instance IDs: INS-176AF555, INS-1E1F5949, INS-F35573C5, INS-90DB76B9, INS-C77800EB, INS-E1083638, INS-33B07066, INS-8F094E37, INS-35544EB1, INS-83F42AFC, INS-54574906, INS-20150FA9, INS-32AE2346, INS-6340BB49, INS-8EA427CF, INS-44531B14, INS-B015FF40, INS-91297A72, INS-73E2EA66, INS-216CF774, INS-EBE0F49A, INS-FF71DDFC

### DRUPAL-A11Y-008: Status messages block uses role="contentinfo", duplicating the page <footer>

**Pattern ID:** DRU-1260AB7D
**Rule:** axe-core - landmark-no-duplicate-contentinfo
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo
**Severity:** Medium (axe impact: moderate)
**WCAG SC:** 1.3.6 - Identify Purpose (Level A)
**Frequency:** 6 of 452 pages (1%)
**Selector:** .messages--error
**XPath:** //*[contains(@class,"messages--error")]
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/admin/appearance
- /admin/modules

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<div role="contentinfo" aria-labelledby="message-error-title" class="messages-list__item messages messages--error">
```

#### Description
Fix any of the following:
  Document has more than one contentinfo landmark

#### Steps to Reproduce
1. Go to https://drupal-core.ddev.site/admin/appearance
2. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)
3. Open browser DevTools and run axe.run() in the Console.
4. Confirm rule landmark-no-duplicate-contentinfo on selector .messages--error.

#### Expected Behaviour
Status messages use role="status" (non-error) or role="alert" (errors)

#### Actual Behaviour
<div role="contentinfo" aria-labelledby="…"> — conflicts with the page footer landmark

#### Impact
blind, low-vision

#### Suggested Fix
Change the outer wrapper role based on message type:

{# Before (broken) #}
<div role="contentinfo" aria-labelledby="{{ title_ids[type] }}"…>

{# After (fixed) #}
{%- set msg_role = (type == 'error') ? 'alert' : 'status' -%}
<div role="{{ msg_role }}" aria-labelledby="{{ title_ids[type] }}"…>

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/136.html
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- WAI - Page structure and landmarks: https://www.w3.org/WAI/tutorials/page-structure/landmarks/
- Create new Drupal issue: https://www.drupal.org/project/drupal/issues/new
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=landmark-no-duplicate-contentinfo%20Status%20messages%20block%20uses%20role%3D%22contentinfo%22%2C%20duplicating%20the%20page%20%3Cfooter%3E&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI (repo): https://github.com/GovTechSG/purple-ai

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-1260AB7D
- Instance IDs: INS-0F387792, INS-594DA129, INS-D74E025B, INS-CD2D6DED, INS-217D3820, INS-1358DBF4

### DRUPAL-A11Y-009: heading-order: Ensure the order of headings is semantically correct

**Pattern ID:** DRU-20662ED4
**Rule:** axe-core - heading-order
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/heading-order
**Severity:** Medium (axe impact: moderate)
**WCAG SC:** 1.3.1 - Info and Relationships (Level A)
**Frequency:** 24 of 452 pages (5%)
**Selector:** div[data-drupal-selector="edit-test-datelist"] > h4
**XPath:** //div[@data-drupal-selector="edit-test-datelist"]
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/admin/form_style

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<h4 class="form-item__label">Datelist</h4>
```

#### Description
Fix any of the following:
  Heading order invalid

#### Steps to Reproduce
1. Go to https://drupal-core.ddev.site/admin/form_style
2. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)
3. Open browser DevTools and run axe.run() in the Console.
4. Confirm rule heading-order on selector div[data-drupal-selector="edit-test-datelist"] > h4.

#### Expected Behaviour
Element and interaction meet the mapped WCAG success criterion.

#### Actual Behaviour
Fix any of the following:
  Heading order invalid

#### Impact
blind, low-vision

#### Suggested Fix
Heading levels must not skip. Audit the page heading hierarchy and adjust template markup.

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/heading-order
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/131.html
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- WAI - Headings tutorial: https://www.w3.org/WAI/tutorials/page-structure/headings/
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=heading-order&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI (repo): https://github.com/GovTechSG/purple-ai

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-20662ED4
- Instance IDs: INS-F67227FA, INS-A876FF70, INS-FD2C0F28, INS-622EF2AF, INS-6C963C7F, INS-B0239B5D, INS-E6A19988, INS-568F7E0B, INS-AB298E5F, INS-166D9CDA, INS-8E91B483, INS-A5BF27C7, INS-62CA3978, INS-2B45D5B7, INS-49F53FC9, INS-B2A30286, INS-F48714B5, INS-5C51E39F, INS-F8772D3C, INS-B696306F, INS-79516607, INS-5A88424C, INS-1940F8CC, INS-9676EF18

### DRUPAL-A11Y-010: landmark-unique: Ensure landmarks are unique

**Pattern ID:** DRU-338C31F8
**Rule:** axe-core - landmark-unique
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/landmark-unique
**Severity:** Medium (axe impact: moderate)
**WCAG SC:** 1.3.6 - Identify Purpose (Level A)
**Frequency:** 2 of 452 pages (0%)
**Selector:** .messages--info
**XPath:** //*[contains(@class,"messages--info")]
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/message

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<div role="contentinfo" aria-labelledby="message-info-title" class="messages-list__item messages messages--info">
```

#### Description
Fix any of the following:
  The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Steps to Reproduce
1. Go to https://drupal-core.ddev.site/message
2. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)
3. Open browser DevTools and run axe.run() in the Console.
4. Confirm rule landmark-unique on selector .messages--info.

#### Expected Behaviour
Element and interaction meet the mapped WCAG success criterion.

#### Actual Behaviour
Fix any of the following:
  The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Impact
users with disabilities

#### Suggested Fix
See axe documentation.

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/landmark-unique
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/136.html
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- WAI - Page structure and landmarks: https://www.w3.org/WAI/tutorials/page-structure/landmarks/
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=landmark-unique&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI mapped fix examples: https://github.com/GovTechSG/purple-ai/blob/main/results/landmark-unique.json

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-338C31F8
- Instance IDs: INS-72820C3E, INS-C1AF88AE

### DRUPAL-A11Y-011: Homepage has no <h1> heading — screen reader users cannot identify page topic

**Pattern ID:** DRU-ADD15A4D
**Rule:** axe-core - page-has-heading-one
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one
**Severity:** Medium (axe impact: moderate)
**WCAG SC:** 1.3.1 - Info and Relationships (Level A)
**Frequency:** 2 of 452 pages (0%)
**Selector:** html
**XPath:** //html
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/

**Conditions:**
- `olivero` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<html lang="en" dir="ltr" style="--color--primary-hue:202;--color--primary-saturation:79%;--color--primary-lightness:50" class=" js">
```

#### Description
Fix all of the following:
  Page must have a level-one heading

#### Steps to Reproduce
1. Go to https://drupal-core.ddev.site/
2. Use the matching context from Conditions: `olivero` (dark desktop, dark mobile, light desktop, light mobile)
3. Open browser DevTools and run axe.run() in the Console.
4. Confirm rule page-has-heading-one on selector html.

#### Expected Behaviour
Every page contains exactly one <h1> that identifies the page

#### Actual Behaviour
Olivero front page renders no <h1>; the site name in the header is not an <h1>

#### Impact
blind, low-vision

#### Suggested Fix
Option A — Make site name an h1 on the front page only:

{# page--front.html.twig #}
{% if is_front %}
  <h1 class="site-name">{{ site_name }}</h1>
{% else %}
  <div class="site-name">{{ site_name }}</div>
{% endif %}

Option B — Ensure the promoted front page node has an h1 title rendered.

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one
- WCAG Understanding: https://www.w3.org/WAI/WCAG22/Understanding/131.html
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- WAI - Headings tutorial: https://www.w3.org/WAI/tutorials/page-structure/headings/
- Create new Drupal issue: https://www.drupal.org/project/drupal/issues/new
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=page-has-heading-one%20Homepage%20has%20no%20%3Ch1%3E%20heading%20%E2%80%94%20screen%20reader%20users%20cannot%20identify%20page%20topic&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI (repo): https://github.com/GovTechSG/purple-ai

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-ADD15A4D
- Instance IDs: INS-C56E21D1, INS-13EEEC14

### DRUPAL-A11Y-012: empty-heading: Ensure headings have discernible text

**Pattern ID:** DRU-23F4C000
**Rule:** axe-core - empty-heading
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/empty-heading
**Severity:** Low (axe impact: minor)
**WCAG SC:** unknown - See axe docs (Level ?)
**Frequency:** 32 of 452 pages (7%)
**Selector:** h3:nth-child(3)
**XPath:** //h3:nth-child(3)
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/dialog
- /tabs

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<h3></h3>
```

#### Description
Fix any of the following:
  Element does not have text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute

#### Steps to Reproduce
1. This issue may require opening a dialog/off-canvas panel before running axe.
2. Go to https://drupal-core.ddev.site/dialog
3. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)
4. Open browser DevTools and run axe.run() in the Console.
5. Confirm rule empty-heading on selector h3:nth-child(3).

#### Expected Behaviour
Element and interaction meet the mapped WCAG success criterion.

#### Actual Behaviour
Fix any of the following:
  Element does not have text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute

#### Impact
users with disabilities

#### Suggested Fix
See axe documentation.

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/empty-heading
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- WAI - Headings tutorial: https://www.w3.org/WAI/tutorials/page-structure/headings/
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=empty-heading&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI (repo): https://github.com/GovTechSG/purple-ai

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-23F4C000
- Instance IDs: INS-EBD6D1DE, INS-FF513257, INS-7B033AB7, INS-77B617FF, INS-FD01376B, INS-5E2BEBF0, INS-5577EA5A, INS-C7957CDF, INS-DE731FB7, INS-CC6C10C4, INS-3C95FFB2, INS-A8CCBEE6, INS-7E1BB7BA, INS-2B805866, INS-BD7097D8, INS-1DD9AA40, INS-C4C1AE18, INS-8B44A1E8, INS-F632ECFD, INS-B71E15EB, INS-E71175CB, INS-F4F655E7, INS-93C0777E, INS-8004C104, INS-B35FCB9C, INS-B4B1CBE2, INS-423F682C, INS-E27B1D6C, INS-BFB35709, INS-A3011FB8, INS-A4B2A699, INS-33DF35E6

### DRUPAL-A11Y-013: empty-table-header: Ensure table headers have discernible text

**Pattern ID:** DRU-EDB3860D
**Rule:** axe-core - empty-table-header
**Axe Rule URL:** https://dequeuniversity.com/rules/axe/4.11/empty-table-header
**Severity:** Low (axe impact: minor)
**WCAG SC:** unknown - See axe docs (Level ?)
**Frequency:** 44 of 452 pages (10%)
**Selector:** th:nth-child(2)
**XPath:** //th:nth-child(2)
**Parent Context:** N/A

**Affected URLs (full list):**
- https://drupal-core.ddev.site/autocomplete

**Conditions:**
- `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)

#### HTML Snippet
```html
<th></th>
```

#### Description
Fix any of the following:
  Element does not have text that is visible to screen readers

#### Steps to Reproduce
1. This issue may require interaction state (typing/dragging/focus) to expose the failing element.
2. Go to https://drupal-core.ddev.site/autocomplete
3. Use the matching context from Conditions: `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile)
4. Open browser DevTools and run axe.run() in the Console.
5. Confirm rule empty-table-header on selector th:nth-child(2).

#### Expected Behaviour
Element and interaction meet the mapped WCAG success criterion.

#### Actual Behaviour
Fix any of the following:
  Element does not have text that is visible to screen readers

#### Impact
users with disabilities

#### Suggested Fix
See axe documentation.

#### Additional References
- Deque Axe Rule: https://dequeuniversity.com/rules/axe/4.11/empty-table-header
- ACCESSIBILITY.md Trusted Sources: https://mgifford.github.io/ACCESSIBILITY.md/examples/TRUSTED_SOURCES.yaml
- WAI - Tables tutorial: https://www.w3.org/WAI/tutorials/tables/
- Search related Drupal accessibility issues: https://www.drupal.org/project/issues/search?text=empty-table-header&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Drupal core accessibility queue: https://www.drupal.org/project/issues/search?text=&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility
- Purple AI (repo): https://github.com/GovTechSG/purple-ai

#### Testing Environment
- Browser: Chromium (via Playwright)
- OS: macOS
- Tool: axe-core via @axe-core/playwright
- Base URL: https://drupal-core.ddev.site

#### Tracking IDs
- Pattern ID: DRU-EDB3860D
- Instance IDs: INS-1C9FFF43, INS-23848B56, INS-721FFF91, INS-D0076929, INS-AF571ABF, INS-1617D470, INS-E6BDA351, INS-9D803FB2, INS-2FD4B698, INS-D76EB858, INS-2E3E0791, INS-238DF668, INS-3C7BA57A, INS-7872DF86, INS-03CA59E4, INS-53F8D1A9, INS-7B45D9CE, INS-2CFB581E, INS-0CF998D8, INS-755D74AA, INS-DB5550DA, INS-207C4875, INS-2A171D89, INS-1B6C288A, INS-06AE9FC8, INS-706CE780, INS-3615154C, INS-57BF05B0, INS-813BA53C, INS-476DADF5, INS-4D3CAB8C, INS-4274A02B, INS-69EC7EF3, INS-4DF72B52, INS-66AD5BE9, INS-4E9A279F, INS-C1FF2EA8, INS-24D788EB, INS-F6B7667A, INS-E8E2410F, INS-28589058, INS-1A2C59B9, INS-75B73110, INS-B21395D6

---
## Deduplication & Pattern Grouping

- Patterns are merged by selector, parent context, and generalized route.
- Similar selectors are merged using fuzzy logic.
- Dynamic routes are collapsed (e.g., /node/1 → /node/[nid]).
