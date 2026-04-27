# Drupal Core Accessibility Bug Report

> **Generated:** 2026-04-27T19:37:04.260Z
> **Tool:** axe-core via @axe-core/playwright | **Browser:** Chromium
> **Standard:** [ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md](https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)

## Summary

| Metric | Value |
| :--- | :--- |
| Pages crawled | 452 |
| Total violation instances | 1296 |
| Unique patterns | 112 |
| Template-level patterns (≥3 pages) 🔁 | 11 |
| Critical | 2 |
| Serious | 50 |
| Moderate | 26 |
| Minor | 34 |

## Cross-Theme Analysis

Issues found across multiple Drupal themes. Universal issues affect ALL tested themes
and are highest priority for core fixes since a single template change benefits everyone.

**Themes tested:** admin-dark, admin, claro-dark, claro, olivero-dark, olivero
**Conditions tested:** admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile, olivero-dark::dark::desktop, olivero-dark::dark::mobile, olivero::light::desktop, olivero::light::mobile

### 🌐 Universal Issues (appear in ALL themes)

| Pattern ID | Rule | Impact | Themes | Conditions | Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DRU-6BA9E02D` | `region` | **moderate** | admin-dark, admin, claro-dark, claro, olivero-dark, olivero | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile, olivero-dark::dark::desktop, olivero-dark::dark::mobile, olivero::light::desktop, olivero::light::mobile | region: Ensure all page content is contained by landmarks |

### 🔗 Multi-Theme Issues (appear in 2+ themes)

| Pattern ID | Rule | Impact | Themes | Conditions | Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DRU-6CA3D5EB` | `label` | **critical** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | label: Ensure every form element has a label |
| `DRU-91A2ED54` | `label` | **critical** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | label: Ensure every form element has a label |
| `DRU-987EB788` | `label-title-only` | **serious** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-44C01FEA` | `color-contrast` | **serious** | claro-dark, claro | claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-0FE6F716` | `label-title-only` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-ABDD422A` | `label-title-only` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-E628CE46` | `color-contrast` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-E162FE14` | `color-contrast` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-B2F1D7CF` | `color-contrast` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-0587792E` | `color-contrast` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-FE1EFDAE` | `color-contrast` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-CC36FB25` | `tabindex` | **serious** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-83608BCC` | `tabindex` | **serious** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-038DEA2A` | `tabindex` | **serious** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-8F0039FE` | `tabindex` | **serious** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-B405CBDA` | `tabindex` | **serious** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-BC780FC5` | `tabindex` | **serious** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-A891EE9E` | `label-title-only` | **serious** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | label-title-only: Ensure that every form element has a visible label and is not solely labeled usi |
| `DRU-25E03AAB` | `label-title-only` | **serious** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | label-title-only: Ensure that every form element has a visible label and is not solely labeled usi |
| `DRU-E7766A2A` | `label-title-only` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-F2674CD0` | `label-title-only` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-697B741E` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-0C411B6A` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-E9627991` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-B20BCC83` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-3A7586F8` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-ADE99258` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-5FAA8485` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-4534282A` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-A012DB4A` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-9385D9F3` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-8C1FB0A9` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-D3CA978F` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-89CB7A8B` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-709AA34F` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | target-size: Ensure touch targets have sufficient size and space |
| `DRU-E828092B` | `color-contrast` | **serious** | claro-dark, claro | claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-827BB73C` | `color-contrast` | **serious** | claro-dark, claro | claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-FAE67242` | `color-contrast` | **serious** | claro-dark, claro | claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) |
| `DRU-2F451A16` | `color-contrast` | **serious** | admin-dark, admin | admin-dark::dark::mobile, admin::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-16707B29` | `color-contrast` | **serious** | admin-dark, admin | admin-dark::dark::mobile, admin::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-E3CD7CA2` | `color-contrast` | **serious** | admin-dark, admin | admin-dark::dark::mobile, admin::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-B191C7D6` | `color-contrast` | **serious** | admin-dark, admin | admin-dark::dark::mobile, admin::light::mobile | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-9DDFCBA6` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin::light::desktop | target-size: Ensure touch targets have sufficient size and space |
| `DRU-283274E5` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin::light::desktop | target-size: Ensure touch targets have sufficient size and space |
| `DRU-7BEA621F` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin::light::desktop | target-size: Ensure touch targets have sufficient size and space |
| `DRU-ABCDDE7C` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin::light::desktop | target-size: Ensure touch targets have sufficient size and space |
| `DRU-43442A3C` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin::light::desktop | target-size: Ensure touch targets have sufficient size and space |
| `DRU-4E740625` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin::light::desktop | target-size: Ensure touch targets have sufficient size and space |
| `DRU-F18CDC60` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin::light::desktop | target-size: Ensure touch targets have sufficient size and space |
| `DRU-A01A5E0A` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin::light::desktop | target-size: Ensure touch targets have sufficient size and space |
| `DRU-9E104230` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin::light::desktop | target-size: Ensure touch targets have sufficient size and space |
| `DRU-78DEFAE7` | `target-size` | **serious** | admin-dark, admin | admin-dark::dark::desktop, admin::light::desktop | target-size: Ensure touch targets have sufficient size and space |
| `DRU-A46B8394` | `region` | **moderate** | admin-dark, admin, olivero-dark, olivero | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, olivero-dark::dark::desktop, olivero-dark::dark::mobile, olivero::light::desktop, olivero::light::mobile | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-1F88078D` | `region` | **moderate** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | region: Ensure all page content is contained by landmarks |
| `DRU-D84D92BC` | `landmark-contentinfo-is-top-level` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-6101E498` | `region` | **moderate** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-20662ED4` | `heading-order` | **moderate** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | heading-order: Ensure the order of headings is semantically correct |
| `DRU-48A2246C` | `heading-order` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | heading-order: Ensure the order of headings is semantically correct |
| `DRU-BA421305` | `region` | **moderate** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | region: Ensure all page content is contained by landmarks |
| `DRU-594FE0AD` | `heading-order` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | heading-order: Ensure the order of headings is semantically correct |
| `DRU-F86FD897` | `heading-order` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | heading-order: Ensure the order of headings is semantically correct |
| `DRU-0F9F72D3` | `heading-order` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | heading-order: Ensure the order of headings is semantically correct |
| `DRU-D77F6C98` | `landmark-contentinfo-is-top-level` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-566DAAD3` | `landmark-contentinfo-is-top-level` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-1D229F58` | `landmark-contentinfo-is-top-level` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-2E022F2F` | `landmark-contentinfo-is-top-level` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-4EC6FE2A` | `landmark-contentinfo-is-top-level` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-1E6BFD21` | `landmark-no-duplicate-contentinfo` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | Status messages block uses role="contentinfo", duplicating the page <footer> |
| `DRU-338C31F8` | `landmark-unique` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | landmark-unique: Ensure landmarks are unique |
| `DRU-F24EBE73` | `heading-order` | **moderate** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | Admin Configuration page has heading-order violations (h3 appears before h2) |
| `DRU-DB4E5533` | `heading-order` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | heading-order: Ensure the order of headings is semantically correct |
| `DRU-230EF4AA` | `heading-order` | **moderate** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | heading-order: Ensure the order of headings is semantically correct |
| `DRU-A7F4E394` | `heading-order` | **moderate** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | heading-order: Ensure the order of headings is semantically correct |
| `DRU-324EA0B4` | `heading-order` | **moderate** | claro-dark, claro | claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | heading-order: Ensure the order of headings is semantically correct |
| `DRU-314602B5` | `heading-order` | **moderate** | claro-dark, claro | claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | Admin Configuration page has heading-order violations (h3 appears before h2) |
| `DRU-50F1F471` | `heading-order` | **moderate** | claro-dark, claro | claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | heading-order: Ensure the order of headings is semantically correct |
| `DRU-ADD15A4D` | `page-has-heading-one` | **moderate** | olivero-dark, olivero | olivero-dark::dark::desktop, olivero-dark::dark::mobile, olivero::light::desktop, olivero::light::mobile | Homepage has no <h1> heading — screen reader users cannot identify page topic |
| `DRU-23F4C000` | `empty-heading` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-heading: Ensure headings have discernible text |
| `DRU-3A79F1C0` | `empty-heading` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-heading: Ensure headings have discernible text |
| `DRU-CEACF4BC` | `empty-heading` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-heading: Ensure headings have discernible text |
| `DRU-D620CA23` | `empty-heading` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-heading: Ensure headings have discernible text |
| `DRU-EDB3860D` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-64DC1B5C` | `empty-heading` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-heading: Ensure headings have discernible text |
| `DRU-85A6C08E` | `empty-heading` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-heading: Ensure headings have discernible text |
| `DRU-37576A02` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-4418E839` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-002D1F3E` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-0E002DB2` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-4F25E28D` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-0C1D464A` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-40AC4263` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-2439CA80` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-E5751357` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-EE245D13` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-252A50D2` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-9EC31A47` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-3E277CF3` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-8DB2DC9B` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-327E6146` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-2F931E38` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-E63E1EE7` | `empty-heading` | **minor** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | empty-heading: Ensure headings have discernible text |
| `DRU-869918A8` | `empty-heading` | **minor** | admin-dark, admin | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile | empty-heading: Ensure headings have discernible text |
| `DRU-8420EC72` | `empty-heading` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-heading: Ensure headings have discernible text |
| `DRU-DF0FFA94` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-40710F77` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-EC2967BA` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-97ED56DC` | `empty-table-header` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-412610AC` | `empty-heading` | **minor** | admin-dark, admin, claro-dark, claro | admin-dark::dark::desktop, admin-dark::dark::mobile, admin::light::desktop, admin::light::mobile, claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-heading: Ensure headings have discernible text |
| `DRU-D23FC357` | `empty-heading` | **minor** | claro-dark, claro | claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-heading: Ensure headings have discernible text |
| `DRU-4267C801` | `empty-table-header` | **minor** | claro-dark, claro | claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-table-header: Ensure table headers have discernible text |
| `DRU-471C2411` | `empty-heading` | **minor** | claro-dark, claro | claro-dark::dark::desktop, claro-dark::dark::mobile, claro::light::desktop, claro::light::mobile | empty-heading: Ensure headings have discernible text |

### 🎨 Theme-Specific Issue Counts

| Theme | Unique Issues |
| :--- | :--- |
| `admin-dark` | 0 |
| `admin` | 0 |
| `claro-dark` | 0 |
| `claro` | 0 |
| `olivero-dark` | 0 |
| `olivero` | 0 |

## Issues (sorted by priority: impact × frequency)

🔁 = Template-level issue (≥3 pages) — fix once, improves many pages.

---

### 1. label: Ensure every form element has a label 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-001` |
| **Pattern ID** | `DRU-6CA3D5EB` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-94BD37A1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/imagefile_file` — File (mobile) `[INS-B2D7B1D7]`

**Selector:**
```css
#edit-imagefile-file-limited-N-display
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
1. Look for rule "label" on selector: #edit-imagefile-file-limited-N-display
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 2. label: Ensure every form element has a label 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-002` |
| **Pattern ID** | `DRU-91A2ED54` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-7B9BD2A8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/imagefile_file` — File (mobile) `[INS-F76BAB53]`

**Selector:**
```css
#edit-imagefile-file-limited-dis-N-display
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
1. Look for rule "label" on selector: #edit-imagefile-file-limited-dis-N-display
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 3. "Select all rows" checkbox is labeled only by its title attribute 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-003` |
| **Pattern ID** | `DRU-987EB788` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 6 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/people` — People `[INS-631CA206]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-5F43B594]`
- `/admin/content` — Content list `[INS-D6A47BCB]`

<details><summary>Show 3 more affected page(s)</summary>

- `/admin/content` — Content list (mobile) `[INS-D9AD9720]`
- `/table` — Table `[INS-AFFA444F]`
- `/table` — Table (mobile) `[INS-41328F01]`

</details>

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

### 4. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-004` |
| **Pattern ID** | `DRU-44C01FEA` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-FF0DA1EB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list (mobile) `[INS-2484DC91]`
- `/admin/people` — People `[INS-C1A3581E]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/people` — People (mobile) `[INS-4A227943]`

</details>

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

### 5. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-005` |
| **Pattern ID** | `DRU-0FE6F716` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `page.html.twig` — Page header region |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list `[INS-311ACB28]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list (mobile) `[INS-70DF180C]`

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
| **Pattern ID** | `DRU-ABDD422A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list `[INS-F4DA69C2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list (mobile) `[INS-098B09CD]`

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
| **Pattern ID** | `DRU-E628CE46` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-71EFBE79]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-CEE7A7E5]`

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
| **Pattern ID** | `DRU-E162FE14` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-599E4E6F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-D6C3D79C]`

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
| **Pattern ID** | `DRU-B2F1D7CF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-4FF78378]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-15BCDDA4]`

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
| **Pattern ID** | `DRU-0587792E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-DE80BAA9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-F76983F2]`

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
| **Pattern ID** | `DRU-FE1EFDAE` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-2F192593]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-A658A5E7]`

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

### 12. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-012` |
| **Pattern ID** | `DRU-CC36FB25` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-8D919E9F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-CAB80BF0]`

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

### 13. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-013` |
| **Pattern ID** | `DRU-83608BCC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-A357FA62]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-1A8E3C8A]`

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

### 14. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-014` |
| **Pattern ID** | `DRU-038DEA2A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-4881B6B1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-156540A8]`

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

### 15. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-015` |
| **Pattern ID** | `DRU-8F0039FE` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-00588EC7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-3F6254E0]`

**Selector:**
```css
#edit-submit--N
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
1. Look for rule "tabindex" on selector: #edit-submit--N
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 16. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-016` |
| **Pattern ID** | `DRU-B405CBDA` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-2C9CAF62]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-C767C3EA]`

**Selector:**
```css
#edit-danger--N
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
1. Look for rule "tabindex" on selector: #edit-danger--N
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 17. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-017` |
| **Pattern ID** | `DRU-BC780FC5` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-4C49F093]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-E7E947B6]`

**Selector:**
```css
#edit-cancel--N
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
1. Look for rule "tabindex" on selector: #edit-cancel--N
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 18. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-018` |
| **Pattern ID** | `DRU-A891EE9E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-9D772808]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-2C5FBD36]`

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

### 19. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-019` |
| **Pattern ID** | `DRU-25E03AAB` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-CB68FC02]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-50910191]`

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

### 20. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-020` |
| **Pattern ID** | `DRU-E7766A2A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table `[INS-DA8EC130]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/table` — Table (mobile) `[INS-15986FAB]`

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

### 21. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-021` |
| **Pattern ID** | `DRU-F2674CD0` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table `[INS-24B11422]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/table` — Table (mobile) `[INS-96198CAB]`

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

### 22. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-022` |
| **Pattern ID** | `DRU-697B741E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-1E6C57C0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-836FD897]`

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

### 23. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-023` |
| **Pattern ID** | `DRU-0C411B6A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-77F43484]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-F23B5BB2]`

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

### 24. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-024` |
| **Pattern ID** | `DRU-E9627991` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-12A6655F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-E3691E26]`

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

### 25. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-025` |
| **Pattern ID** | `DRU-B20BCC83` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-463A943E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-E3E3F502]`

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

### 26. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-026` |
| **Pattern ID** | `DRU-3A7586F8` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-1EE2D602]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-47D713EE]`

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

### 27. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-027` |
| **Pattern ID** | `DRU-ADE99258` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-BAA09E91]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-6914A3F2]`

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

### 28. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-028` |
| **Pattern ID** | `DRU-5FAA8485` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-19D9E650]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-F1BA6329]`

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

### 29. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-029` |
| **Pattern ID** | `DRU-4534282A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-2F30409D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-7153533A]`

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

### 30. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-030` |
| **Pattern ID** | `DRU-A012DB4A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-11612407]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-6F0C9429]`

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

### 31. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-031` |
| **Pattern ID** | `DRU-9385D9F3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-8C98F215]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-7E72035D]`

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

### 32. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-032` |
| **Pattern ID** | `DRU-8C1FB0A9` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-67F50851]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-C064D2AC]`

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

### 33. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-033` |
| **Pattern ID** | `DRU-D3CA978F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-37ED96AD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-D10E50E9]`

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

### 34. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-034` |
| **Pattern ID** | `DRU-89CB7A8B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-530D0F3C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-C4CDCD8A]`

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

### 35. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-035` |
| **Pattern ID** | `DRU-709AA34F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-1DD3D540]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-8547CE7B]`

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

### 36. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-036` |
| **Pattern ID** | `DRU-E828092B` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `(theme-specific template)` — Theme template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-BE832DAC]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/block` — Block layout (mobile) `[INS-32A7C8C3]`

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
<a href="/admin/structure/block/manage/claro_help/enable?destination=/admin/structure/block&amp;token=CJYolVs-YivFzc0EqMzBOBJFervnxuP3wfb101AaL2Y">Enable</a>
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

### 37. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-037` |
| **Pattern ID** | `DRU-827BB73C` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-CC4E5B84]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/block` — Block layout (mobile) `[INS-4F001513]`

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
<a href="/admin/structure/block/manage/claro_vertical_tabs_test/enable?destination=/admin/structure/block&amp;token=3iS8qHa_Y8jNIvtXdLRCoZP8xkf4aPtPfwfTquO3_wo">Enable</a>
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

### 38. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-038` |
| **Pattern ID** | `DRU-FAE67242` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-57557F7B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-1E91D181]`

**Selector:**
```css
.region-hidden-message > td[colspan="9"]
```

**XPath:**
```
//*[contains(@class,"region-hidden-message > td[colspan="9"]")]
```

**HTML snippet:**
```html
<td colspan="9">No field is hidden.</td>
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
1. Navigate to this route on your local Drupal install: /admin/structure/types/manage/test_type/display/default
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: .region-hidden-message > td[colspan="9"]
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 39. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-039` |
| **Pattern ID** | `DRU-2F451A16` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark mobile, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/types/add` — Add content type (mobile) `[INS-E4C3D7C6]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
summary[aria-controls="edit-submission"] > .gin-details__summary-summary
```

**XPath:**
```
//summary[@aria-controls="edit-submission"]
```

**HTML snippet:**
```html
<span class="gin-details__summary-summary">Title</span>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/structure/types/add
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: summary[aria-controls="edit-submission"] > .gin-details__summary-summary
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 40. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-040` |
| **Pattern ID** | `DRU-16707B29` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark mobile, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/types/add` — Add content type (mobile) `[INS-C6066AD3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
summary[aria-controls="edit-workflow"] > .gin-details__summary-summary
```

**XPath:**
```
//summary[@aria-controls="edit-workflow"]
```

**HTML snippet:**
```html
<span class="gin-details__summary-summary">Published, Create new revision</span>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/structure/types/add
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: summary[aria-controls="edit-workflow"] > .gin-details__summary-summary
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 41. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-041` |
| **Pattern ID** | `DRU-E3CD7CA2` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark mobile, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/types/add` — Add content type (mobile) `[INS-B74E58E8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
summary[aria-controls="edit-language"] > .gin-details__summary-summary
```

**XPath:**
```
//summary[@aria-controls="edit-language"]
```

**HTML snippet:**
```html
<span class="gin-details__summary-summary">Site's default language (English)</span>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/structure/types/add
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: summary[aria-controls="edit-language"] > .gin-details__summary-summary
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 42. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-042` |
| **Pattern ID** | `DRU-B191C7D6` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark mobile, light mobile) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/types/add` — Add content type (mobile) `[INS-1763A2E3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

**Selector:**
```css
summary[aria-controls="edit-display"] > .gin-details__summary-summary
```

**XPath:**
```
//summary[@aria-controls="edit-display"]
```

**HTML snippet:**
```html
<span class="gin-details__summary-summary">Display author and date information</span>
```

**Suggested fix:**
```
Check foreground/background color combinations. Ensure ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (18pt or 14pt bold). Update the relevant CSS file.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /admin/structure/types/add
1. Open browser DevTools and run: axe.run()
1. Look for rule "color-contrast" on selector: summary[aria-controls="edit-display"] > .gin-details__summary-summary
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 43. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-043` |
| **Pattern ID** | `DRU-9DDFCBA6` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, light desktop) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-0B05280A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 44. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-044` |
| **Pattern ID** | `DRU-283274E5` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, light desktop) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-39EDEAD3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 45. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-045` |
| **Pattern ID** | `DRU-7BEA621F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, light desktop) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-56862D54]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 46. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-046` |
| **Pattern ID** | `DRU-ABCDDE7C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, light desktop) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-CD33C4CE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 47. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-047` |
| **Pattern ID** | `DRU-43442A3C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, light desktop) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-890AAC59]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 48. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-048` |
| **Pattern ID** | `DRU-4E740625` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, light desktop) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-7A5AFBEF]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 49. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-049` |
| **Pattern ID** | `DRU-F18CDC60` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, light desktop) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-A5C53B8A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 50. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-050` |
| **Pattern ID** | `DRU-A01A5E0A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, light desktop) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-28730DEB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 51. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-051` |
| **Pattern ID** | `DRU-9E104230` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, light desktop) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabs` — Tabs `[INS-7E5CF8DC]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 52. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-052` |
| **Pattern ID** | `DRU-78DEFAE7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, light desktop) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabs` — Tabs `[INS-92A5E39D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 53. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-053` |
| **Pattern ID** | `DRU-6BA9E02D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile), `olivero` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 106 of 452 pages (23%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin` — Admin dashboard `[INS-D8DE6AC1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin` — Admin dashboard (mobile) `[INS-F0C4F2C1]`
- `/admin/form_style` — Form style demo `[INS-83E2F270]`

<details><summary>Show 103 more affected page(s)</summary>

- `/admin/form_style` — Form style demo (mobile) `[INS-A3BAFC54]`
- `/admin/content` — Content list `[INS-565D5E04]`
- `/admin/content` — Content list (mobile) `[INS-E66D392C]`
- `/node/add/article` — Create article `[INS-34D3B6E6]`
- `/node/add/article` — Create article (mobile) `[INS-3AE334AB]`
- `/node/add/page` — Create basic page `[INS-D89718F7]`
- `/node/add/page` — Create basic page (mobile) `[INS-C8AC947D]`
- `/admin/structure` — Structure `[INS-089837C7]`
- `/admin/structure` — Structure (mobile) `[INS-AD065F7B]`
- `/admin/structure/types` — Content types `[INS-1F0E5C7A]`
- `/admin/structure/types` — Content types (mobile) `[INS-0420759A]`
- `/admin/structure/types/add` — Add content type `[INS-FBDFDDE1]`
- `/admin/structure/types/add` — Add content type (mobile) `[INS-F6222FEA]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-51A7195E]`
- `/admin/structure/taxonomy` — Taxonomy (mobile) `[INS-866D8A1F]`
- `/admin/structure/taxonomy/add` — Add vocabulary `[INS-26112C87]`
- `/admin/structure/taxonomy/add` — Add vocabulary (mobile) `[INS-37EFF8DC]`
- `/admin/structure/block` — Block layout `[INS-001C27FA]`
- `/admin/structure/block` — Block layout (mobile) `[INS-38000B83]`
- `/admin/appearance` — Appearance `[INS-C74D84C8]`
- `/admin/appearance` — Appearance (mobile) `[INS-FF2DB6B1]`
- `/admin/modules` — Modules `[INS-EB461FD0]`
- `/admin/modules` — Modules (mobile) `[INS-DEB0E01D]`
- `/admin/people` — People `[INS-203E1CD2]`
- `/admin/people` — People (mobile) `[INS-FA09BF07]`
- `/user/1/edit` — User edit (uid 1) `[INS-29F69647]`
- `/user/1/edit` — User edit (uid 1) (mobile) `[INS-10C86D7E]`
- `/admin/config` — Configuration `[INS-E427825B]`
- `/admin/config` — Configuration (mobile) `[INS-6F951C47]`
- `/admin/config/content/formats` — Text formats `[INS-22C5B103]`
- `/admin/config/content/formats` — Text formats (mobile) `[INS-88F5EE60]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-2AE13BCB]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) (mobile) `[INS-3AE351E7]`
- `/admin/config/system/site-information` — Site information `[INS-C15EEB54]`
- `/admin/config/system/site-information` — Site information (mobile) `[INS-BCB4F132]`
- `/admin/reports` — Reports `[INS-760F267C]`
- `/admin/reports` — Reports (mobile) `[INS-2E5FC9E0]`
- `/autocomplete` — Autocomplete `[INS-814B6CFE]`
- `/autocomplete` — Autocomplete (mobile) `[INS-5882C95B]`
- `/buttons` — Buttons `[INS-FA2A20D1]`
- `/buttons` — Buttons (mobile) `[INS-E20671AE]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-924D863B]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-B73E1074]`
- `/dialog` — Dialogs `[INS-D059761D]`
- `/dialog` — Dialogs (mobile) `[INS-077300B7]`
- `/dropbutton` — Dropbuttons `[INS-6671D464]`
- `/dropbutton` — Dropbuttons (mobile) `[INS-EE92CDEF]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-26CD137D]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-494B15C6]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-206E1DCE]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-CCBE2A0F]`
- `/fieldset` — Fieldset `[INS-18ECCC55]`
- `/fieldset` — Fieldset (mobile) `[INS-B8AF800F]`
- `/contact/imagefile_file` — File `[INS-115ABFF8]`
- `/contact/imagefile_file` — File (mobile) `[INS-BAEE3A35]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-B5A36498]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-C4CE338B]`
- `/contact/imagefile_image` — Image `[INS-F8D1D7E6]`
- `/contact/imagefile_image` — Image (mobile) `[INS-F5AEF57A]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name `[INS-38B49EEF]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name (mobile) `[INS-0769D6CD]`
- `/message` — Messages `[INS-62B880CE]`
- `/message` — Messages (mobile) `[INS-71DFB250]`
- `/cd-navigation/config` — Nav config `[INS-CE3E0BFE]`
- `/cd-navigation/config` — Nav config (mobile) `[INS-613A665F]`
- `/contact/presuf_number` — Number prefix suffix `[INS-C0A71F89]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-DF4DA25A]`
- `/tabs/format/plain_text` — Page title `[INS-CF919880]`
- `/tabs/format/plain_text` — Page title (mobile) `[INS-17F11137]`
- `/password` — Password `[INS-F7B8F881]`
- `/password` — Password (mobile) `[INS-76E12963]`
- `/progress` — Progress `[INS-3B1ECF24]`
- `/progress` — Progress (mobile) `[INS-762B0C83]`
- `/contact/select` — Select `[INS-548386BA]`
- `/contact/select` — Select (mobile) `[INS-922195A3]`
- `/node/add/cd` — Sidebar `[INS-7CFE618D]`
- `/node/add/cd` — Sidebar (mobile) `[INS-E6B1F764]`
- `/table` — Table `[INS-30B71F0D]`
- `/table` — Table (mobile) `[INS-57B6553C]`
- `/tabledrag` — Tabledrag `[INS-E4AA2E02]`
- `/tabledrag` — Tabledrag (mobile) `[INS-DF13AB5A]`
- `/tabs` — Tabs `[INS-0D3ED81E]`
- `/tabs` — Tabs (mobile) `[INS-F83D856B]`
- `/contact/textform` — Text `[INS-868C8A7E]`
- `/contact/textform` — Text (mobile) `[INS-3D2920D2]`
- `/contact/presuf_text` — Text prefix suffix `[INS-81C44978]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-270738CF]`
- `/contact/textarea` — Textarea `[INS-9118E488]`
- `/contact/textarea` — Textarea (mobile) `[INS-2E5F28D5]`
- `/` — Homepage `[INS-BB8DE047]`
- `/` — Homepage (mobile) `[INS-DC077153]`
- `/action-link` — Action link demo `[INS-343FB881]`
- `/action-link` — Action link demo (mobile) `[INS-6788C962]`
- `/user/login` — User login `[INS-0EF67DB9]`
- `/user/login` — User login (mobile) `[INS-74810756]`
- `/user/register` — User register `[INS-63D59683]`
- `/user/register` — User register (mobile) `[INS-20AC4120]`
- `/user/password` — User password reset `[INS-F21125DF]`
- `/user/password` — User password reset (mobile) `[INS-636E78C8]`
- `/search/node` — Search results `[INS-44C022F1]`
- `/search/node` — Search results (mobile) `[INS-B724274A]`
- `/this-page-does-not-exist` — 404 page `[INS-0C9A0403]`
- `/this-page-does-not-exist` — 404 page (mobile) `[INS-9BDAC1ED]`

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
1. Navigate to this route on your local Drupal install: /admin
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: .themeswitcher-form__form-item
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 54. Local task tab headings (#primary-tabs-title) are outside any landmark region 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-054` |
| **Pattern ID** | `DRU-A46B8394` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `olivero` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 52 of 452 pages (12%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin` — Admin dashboard `[INS-ED5789D1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin` — Admin dashboard (mobile) `[INS-CA3F486A]`
- `/admin/content` — Content list `[INS-6261BD8B]`

<details><summary>Show 49 more affected page(s)</summary>

- `/admin/content` — Content list (mobile) `[INS-AD498A59]`
- `/admin/structure/types` — Content types `[INS-7BFD0B73]`
- `/admin/structure/types` — Content types (mobile) `[INS-6F860D5F]`
- `/admin/appearance` — Appearance `[INS-66F0411F]`
- `/admin/appearance` — Appearance (mobile) `[INS-95DE8A2C]`
- `/admin/modules` — Modules `[INS-5D29050A]`
- `/admin/modules` — Modules (mobile) `[INS-3E19E7EC]`
- `/admin/people` — People `[INS-53475AE4]`
- `/admin/people` — People (mobile) `[INS-AEBAFC08]`
- `/buttons` — Buttons `[INS-B755019F]`
- `/buttons` — Buttons (mobile) `[INS-9E2B5CF0]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-59226044]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-6F730C20]`
- `/dropbutton` — Dropbuttons `[INS-BCA850CD]`
- `/dropbutton` — Dropbuttons (mobile) `[INS-E0049478]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-704C3FBE]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-FEB48EDD]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-09A4B9FB]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-32D20F60]`
- `/contact/imagefile_file` — File `[INS-F85213DF]`
- `/contact/imagefile_file` — File (mobile) `[INS-FB25E7CB]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-5663A0FA]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-F1044BC7]`
- `/contact/imagefile_image` — Image `[INS-7CDF9E9F]`
- `/contact/imagefile_image` — Image (mobile) `[INS-C1F48F13]`
- `/message` — Messages `[INS-52BF86F6]`
- `/message` — Messages (mobile) `[INS-1F64C2B0]`
- `/contact/presuf_number` — Number prefix suffix `[INS-2035201D]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-4C77D31E]`
- `/tabs/format/plain_text` — Page title `[INS-8B47FF01]`
- `/tabs/format/plain_text` — Page title (mobile) `[INS-54DEB294]`
- `/progress` — Progress `[INS-CD789B90]`
- `/progress` — Progress (mobile) `[INS-4A732CB0]`
- `/contact/select` — Select `[INS-99938DDE]`
- `/contact/select` — Select (mobile) `[INS-7A2B9144]`
- `/tabledrag` — Tabledrag `[INS-2DDBCF6D]`
- `/tabledrag` — Tabledrag (mobile) `[INS-F88F3595]`
- `/tabs` — Tabs `[INS-3643D117]`
- `/tabs` — Tabs (mobile) `[INS-CED52503]`
- `/contact/textform` — Text `[INS-FFA0B56A]`
- `/contact/textform` — Text (mobile) `[INS-4C03CFAA]`
- `/contact/presuf_text` — Text prefix suffix `[INS-E0F07AC5]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-268F906D]`
- `/contact/textarea` — Textarea `[INS-1836B535]`
- `/contact/textarea` — Textarea (mobile) `[INS-10BB8E04]`
- `/user/login` — User login `[INS-BC3B17C9]`
- `/user/login` — User login (mobile) `[INS-4AA1B1B9]`
- `/user/password` — User password reset `[INS-94EA0EA1]`
- `/user/password` — User password reset (mobile) `[INS-806AF88F]`

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
1. Navigate to this route on your local Drupal install: /admin
1. Open browser DevTools and run: axe.run()
1. Look for rule "region" on selector: #primary-tabs-title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 55. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-055` |
| **Pattern ID** | `DRU-1F88078D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 10 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-164962E7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list (mobile) `[INS-4D0090DA]`
- `/admin/structure/types` — Content types `[INS-F517503C]`

<details><summary>Show 7 more affected page(s)</summary>

- `/admin/structure/types` — Content types (mobile) `[INS-CFCBB8DB]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-08C28518]`
- `/admin/structure/taxonomy` — Taxonomy (mobile) `[INS-A833DA67]`
- `/admin/people` — People `[INS-FCCC084E]`
- `/admin/people` — People (mobile) `[INS-A8DE8EF1]`
- `/admin/config/content/formats` — Text formats `[INS-050A0C81]`
- `/admin/config/content/formats` — Text formats (mobile) `[INS-7AC7F7D6]`

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

### 56. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-056` |
| **Pattern ID** | `DRU-D84D92BC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 8 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/admin/appearance` — Appearance `[INS-B247AB90]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/appearance` — Appearance (mobile) `[INS-E34D0EA9]`
- `/admin/modules` — Modules `[INS-87AAED0E]`

<details><summary>Show 5 more affected page(s)</summary>

- `/admin/modules` — Modules (mobile) `[INS-2591C21F]`
- `/admin/people` — People `[INS-73E2EA66]`
- `/admin/people` — People (mobile) `[INS-216CF774]`
- `/admin/config` — Configuration `[INS-EBE0F49A]`
- `/admin/config` — Configuration (mobile) `[INS-FF71DDFC]`

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

### 57. Local task tab headings (#primary-tabs-title) are outside any landmark region 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-057` |
| **Pattern ID** | `DRU-6101E498` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 6 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-F6796033]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/block` — Block layout (mobile) `[INS-8E336E32]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-D1878989]`

<details><summary>Show 3 more affected page(s)</summary>

- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-F8C6C7E7]`
- `/tabs` — Tabs `[INS-ED973753]`
- `/tabs` — Tabs (mobile) `[INS-5FED7CB6]`

</details>

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
| **Pattern ID** | `DRU-20662ED4` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-F67227FA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/form_style` — Form style demo (mobile) `[INS-A876FF70]`

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

### 59. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-059` |
| **Pattern ID** | `DRU-48A2246C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-FD2C0F28]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list (mobile) `[INS-622EF2AF]`

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

### 60. region: Ensure all page content is contained by landmarks 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-060` |
| **Pattern ID** | `DRU-BA421305` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `toolbar (admin theme)` — Admin toolbar |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/user/1/edit` — User edit (uid 1) `[INS-59016654]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/user/1/edit` — User edit (uid 1) (mobile) `[INS-C1FF9EB1]`

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

### 61. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-061` |
| **Pattern ID** | `DRU-594FE0AD` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/autocomplete` — Autocomplete `[INS-6C963C7F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/autocomplete` — Autocomplete (mobile) `[INS-B0239B5D]`

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

### 62. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-062` |
| **Pattern ID** | `DRU-F86FD897` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-E6A19988]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-568F7E0B]`

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

### 63. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-063` |
| **Pattern ID** | `DRU-0F9F72D3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-AB298E5F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-166D9CDA]`

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

### 64. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-064` |
| **Pattern ID** | `DRU-D77F6C98` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-32AE2346]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-6340BB49]`

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

### 65. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-065` |
| **Pattern ID** | `DRU-566DAAD3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-8EA427CF]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-44531B14]`

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

### 66. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-066` |
| **Pattern ID** | `DRU-1D229F58` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-54574906]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-20150FA9]`

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

### 67. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-067` |
| **Pattern ID** | `DRU-2E022F2F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-C77800EB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-E1083638]`

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

### 68. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-068` |
| **Pattern ID** | `DRU-4EC6FE2A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-B015FF40]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-91297A72]`

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

### 69. Status messages block uses role="contentinfo", duplicating the page &lt;footer&gt; 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-069` |
| **Pattern ID** | `DRU-1E6BFD21` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`landmark-no-duplicate-contentinfo`](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/misc/status-messages.html.twig, core/modules/system/templates/status-messages.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/message` — Messages `[INS-217D3820]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-1358DBF4]`

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

### 70. landmark-unique: Ensure landmarks are unique 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-070` |
| **Pattern ID** | `DRU-338C31F8` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`landmark-unique`](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-72820C3E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-C1AF88AE]`

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

### 71. Admin Configuration page has heading-order violations (h3 appears before h2) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-071` |
| **Pattern ID** | `DRU-F24EBE73` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/cd-navigation/config` — Nav config `[INS-8E91B483]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/cd-navigation/config` — Nav config (mobile) `[INS-A5BF27C7]`

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

### 72. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-072` |
| **Pattern ID** | `DRU-DB4E5533` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-62CA3978]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-2B45D5B7]`

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

### 73. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-073` |
| **Pattern ID** | `DRU-230EF4AA` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/textform` — Text `[INS-F48714B5]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/textform` — Text (mobile) `[INS-5C51E39F]`

**Selector:**
```css
div[data-drupal-selector="edit-timestamp-N-value"] > h4
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
1. Look for rule "heading-order" on selector: div[data-drupal-selector="edit-timestamp-N-value"] > h4
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 74. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-074` |
| **Pattern ID** | `DRU-A7F4E394` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-49F53FC9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-B2A30286]`

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

### 75. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-075` |
| **Pattern ID** | `DRU-324EA0B4` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-F8772D3C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/form_style` — Form style demo (mobile) `[INS-B696306F]`

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

### 76. Admin Configuration page has heading-order violations (h3 appears before h2) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-076` |
| **Pattern ID** | `DRU-314602B5` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/cd-navigation/config` — Nav config `[INS-79516607]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/cd-navigation/config` — Nav config (mobile) `[INS-5A88424C]`

**Selector:**
```css
.layout-column.layout-column--half:nth-child(1) > .panel:nth-child(1) > .panel__title
```

**XPath:**
```
//*[contains(@class,"layout-column.layout-column--half:nth-child(1) > .panel:nth-child(1) > .panel__title")]
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
1. Look for rule "heading-order" on selector: .layout-column.layout-column--half:nth-child(1) > .panel:nth-child(1) > .panel__title
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 77. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-077` |
| **Pattern ID** | `DRU-50F1F471` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/textform` — Text `[INS-1940F8CC]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/textform` — Text (mobile) `[INS-9676EF18]`

**Selector:**
```css
#edit-timestamp-wrapper > .form-datetime-wrapper.form-item > h4
```

**XPath:**
```
//*[@id="edit-timestamp-wrapper > .form-datetime-wrapper.form-item > h4"]
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
1. Look for rule "heading-order" on selector: #edit-timestamp-wrapper > .form-datetime-wrapper.form-item > h4
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 78. Homepage has no &lt;h1&gt; heading — screen reader users cannot identify page topic 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-078` |
| **Pattern ID** | `DRU-ADD15A4D` *(stable hash — use to track regressions)* |
| **Conditions** | `olivero` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`page-has-heading-one`](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright) |
| **Impact** | **moderate** |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage `[INS-C56E21D1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/` — Homepage (mobile) `[INS-13EEEC14]`

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

### 79. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-079` |
| **Pattern ID** | `DRU-23F4C000` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-EBD6D1DE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/dialog` — Dialogs (mobile) `[INS-FF513257]`
- `/tabs` — Tabs `[INS-7B033AB7]`

<details><summary>Show 1 more affected page(s)</summary>

- `/tabs` — Tabs (mobile) `[INS-77B617FF]`

</details>

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

### 80. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-080` |
| **Pattern ID** | `DRU-3A79F1C0` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-FD01376B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/dialog` — Dialogs (mobile) `[INS-5E2BEBF0]`
- `/tabs` — Tabs `[INS-5577EA5A]`

<details><summary>Show 1 more affected page(s)</summary>

- `/tabs` — Tabs (mobile) `[INS-C7957CDF]`

</details>

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

### 81. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-081` |
| **Pattern ID** | `DRU-CEACF4BC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-DE731FB7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/dialog` — Dialogs (mobile) `[INS-CC6C10C4]`
- `/tabs` — Tabs `[INS-3C95FFB2]`

<details><summary>Show 1 more affected page(s)</summary>

- `/tabs` — Tabs (mobile) `[INS-A8CCBEE6]`

</details>

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

### 82. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-082` |
| **Pattern ID** | `DRU-D620CA23` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-7E1BB7BA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/dialog` — Dialogs (mobile) `[INS-2B805866]`
- `/tabs` — Tabs `[INS-BD7097D8]`

<details><summary>Show 1 more affected page(s)</summary>

- `/tabs` — Tabs (mobile) `[INS-1DD9AA40]`

</details>

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

### 83. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-083` |
| **Pattern ID** | `DRU-EDB3860D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/autocomplete` — Autocomplete `[INS-1C9FFF43]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/autocomplete` — Autocomplete (mobile) `[INS-23848B56]`

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

### 84. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-084` |
| **Pattern ID** | `DRU-64DC1B5C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-C4C1AE18]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/dialog` — Dialogs (mobile) `[INS-8B44A1E8]`

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

### 85. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-085` |
| **Pattern ID** | `DRU-85A6C08E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-F632ECFD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/dialog` — Dialogs (mobile) `[INS-B71E15EB]`

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

### 86. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-086` |
| **Pattern ID** | `DRU-37576A02` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-721FFF91]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-D0076929]`

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

### 87. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-087` |
| **Pattern ID** | `DRU-4418E839` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-E6BDA351]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-9D803FB2]`

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

### 88. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-088` |
| **Pattern ID** | `DRU-002D1F3E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-2FD4B698]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-D76EB858]`

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

### 89. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-089` |
| **Pattern ID** | `DRU-0E002DB2` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-3C7BA57A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-7872DF86]`

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

### 90. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-090` |
| **Pattern ID** | `DRU-4F25E28D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-AF571ABF]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-1617D470]`

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

### 91. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-091` |
| **Pattern ID** | `DRU-0C1D464A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-2E3E0791]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-238DF668]`

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

### 92. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-092` |
| **Pattern ID** | `DRU-40AC4263` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-03CA59E4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-53F8D1A9]`

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

### 93. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-093` |
| **Pattern ID** | `DRU-2439CA80` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-7B45D9CE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-2CFB581E]`

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

### 94. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-094` |
| **Pattern ID** | `DRU-E5751357` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-0CF998D8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-755D74AA]`

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

### 95. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-095` |
| **Pattern ID** | `DRU-EE245D13` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-DB5550DA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-207C4875]`

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

### 96. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-096` |
| **Pattern ID** | `DRU-252A50D2` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-2A171D89]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-1B6C288A]`

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

### 97. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-097` |
| **Pattern ID** | `DRU-9EC31A47` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-06AE9FC8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-706CE780]`

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

### 98. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-098` |
| **Pattern ID** | `DRU-3E277CF3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-3615154C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-57BF05B0]`

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

### 99. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-099` |
| **Pattern ID** | `DRU-8DB2DC9B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-813BA53C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-476DADF5]`

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

### 100. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-100` |
| **Pattern ID** | `DRU-327E6146` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-4D3CAB8C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-4274A02B]`

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

### 101. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-101` |
| **Pattern ID** | `DRU-2F931E38` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-66AD5BE9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-4E9A279F]`

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

### 102. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-102` |
| **Pattern ID** | `DRU-E63E1EE7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs/format/plain_text` — Page title `[INS-93C0777E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs/format/plain_text` — Page title (mobile) `[INS-8004C104]`

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

### 103. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-103` |
| **Pattern ID** | `DRU-869918A8` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs `[INS-B35FCB9C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-B4B1CBE2]`

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

### 104. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-104` |
| **Pattern ID** | `DRU-8420EC72` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs `[INS-E71175CB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-F4F655E7]`

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

### 105. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-105` |
| **Pattern ID** | `DRU-DF0FFA94` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-69EC7EF3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-4DF72B52]`

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

### 106. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-106` |
| **Pattern ID** | `DRU-40710F77` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-F6B7667A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-E8E2410F]`

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

### 107. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-107` |
| **Pattern ID** | `DRU-EC2967BA` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-28589058]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-1A2C59B9]`

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

### 108. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-108` |
| **Pattern ID** | `DRU-97ED56DC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-C1FF2EA8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-24D788EB]`

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

---

### 109. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-109` |
| **Pattern ID** | `DRU-412610AC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (dark desktop, dark mobile, light desktop, light mobile), `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/` — Homepage `[INS-423F682C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/` — Homepage (mobile) `[INS-E27B1D6C]`

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

### 110. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-110` |
| **Pattern ID** | `DRU-D23FC357` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs/format/plain_text` — Page title `[INS-BFB35709]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs/format/plain_text` — Page title (mobile) `[INS-A3011FB8]`

**Selector:**
```css
#block-claro-content > h3
```

**XPath:**
```
//*[@id="block-claro-content > h3"]
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
1. Look for rule "empty-heading" on selector: #block-claro-content > h3
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 111. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-111` |
| **Pattern ID** | `DRU-4267C801` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/table` — Table `[INS-75B73110]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/table` — Table (mobile) `[INS-B21395D6]`

**Selector:**
```css
#edit-table-empty > thead > tr > .select-all
```

**XPath:**
```
//*[@id="edit-table-empty > thead > tr > .select-all"]
```

**HTML snippet:**
```html
<th class="select-all"></th>
```

**Suggested fix:**
```
See axe documentation.
```

**Steps to reproduce:**
1. Navigate to this route on your local Drupal install: /table
1. Open browser DevTools and run: axe.run()
1. Look for rule "empty-table-header" on selector: #edit-table-empty > thead > tr > .select-all
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js

---

### 112. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-112` |
| **Pattern ID** | `DRU-471C2411` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (dark desktop, dark mobile, light desktop, light mobile) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs `[INS-A4B2A699]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-33DF35E6]`

**Selector:**
```css
#block-claro-content > h3:nth-child(1)
```

**XPath:**
```
//*[@id="block-claro-content > h3:nth-child(1)"]
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
1. Look for rule "empty-heading" on selector: #block-claro-content > h3:nth-child(1)
1. Or run: cd core && yarn test:a11y:playwright && node tests/playwright/scripts/analyze-patterns.js
