# Drupal Core Accessibility Bug Report

> **Generated:** 2026-04-28T20:08:57.880Z
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
    - Generalized routes: /contact/imagefile_file
  - "Select all rows" checkbox is labeled only by its title attribute
    - Generalized routes: /admin/people, /admin/content, /table, /contact/checkbox_radio

### CSS and Presentation

- **Total unique patterns:** 1
- **Rules:** `color-contrast`

  - color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min
    - Generalized routes: /admin/content, /admin/people, /admin/structure/block, /admin/structure/types/manage/test_type/display/default, /admin/structure/types/add

### Input Modalities

- **Total unique patterns:** 2
- **Rules:** `tabindex`, `target-size`

  - tabindex: Ensure tabindex attribute values are not greater than 0
    - Generalized routes: /buttons
  - target-size: Ensure touch targets have sufficient size and space
    - Generalized routes: /tabledrag, /tabs

### Semantic Structure

- **Total unique patterns:** 7
- **Rules:** `region`, `landmark-contentinfo-is-top-level`, `landmark-no-duplicate-contentinfo`, `heading-order`, `landmark-unique`, `page-has-heading-one`, `empty-heading`

  - region: Ensure all page content is contained by landmarks
    - Generalized routes: /admin, /admin/form_style, /admin/content, /node/add/article, /node/add/page, /admin/structure, /admin/structure/types, /admin/structure/types/add, /admin/structure/taxonomy, /admin/structure/taxonomy/add, /admin/structure/block, /admin/appearance, /admin/modules, /admin/people, /user/[id]/edit, /admin/config, /admin/config/content/formats, /admin/config/content/formats/manage/restricted_html, /admin/config/system/site-information, /admin/reports, /autocomplete, /buttons, /contact/checkbox_radio, /dialog, /dropbutton, /contact/field_cardinality_test, /admin/structure/types/manage/test_type/display/default, /fieldset, /contact/imagefile_file, /contact/presuf_formatted, /contact/imagefile_image, /admin/structure/display-modes/form/add/contact_message, /message, /cd-navigation/config, /contact/presuf_number, /tabs/format/plain_text, /password, /progress, /contact/select, /node/add/cd, /table, /tabledrag, /tabs, /contact/textform, /contact/presuf_text, /contact/textarea, /, /action-link, /user/login, /user/register, /user/password, /search/node, /this-page-does-not-exist
  - landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level
    - Generalized routes: /admin/appearance, /admin/modules, /message, /admin/people, /admin/config
  - Status messages block uses role="contentinfo", duplicating the page <footer>
    - Generalized routes: /admin/appearance, /admin/modules, /message
  - ...and 4 more in this category.

### Data Tables

- **Total unique patterns:** 1
- **Rules:** `empty-table-header`

  - empty-table-header: Ensure table headers have discernible text
    - Generalized routes: /autocomplete, /contact/field_cardinality_test, /contact/presuf_formatted, /contact/presuf_number, /contact/presuf_text, /table

---
## Deduplication & Pattern Grouping

- Patterns are merged by selector, parent context, and generalized route.
- Similar selectors are merged using fuzzy logic.
- Dynamic routes are collapsed (e.g., /node/1 → /node/[nid]).
