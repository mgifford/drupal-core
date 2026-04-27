# Drupal Core Accessibility Bug Report

> **Generated:** 2026-04-27T19:29:00.452Z
> **Tool:** axe-core via @axe-core/playwright | **Browser:** Chromium
> **Standard:** [ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md](https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)

## Summary

| Metric | Value |
| :--- | :--- |
| Pages crawled | 452 |
| Total violation instances | 1296 |
| Unique patterns | 214 |
| Template-level patterns (≥3 pages) 🔁 | 12 |
| Critical | 8 |
| Serious | 86 |
| Moderate | 52 |
| Minor | 68 |

## Cross-Theme Analysis

Issues found across multiple Drupal themes. Universal issues affect ALL tested themes
and are highest priority for core fixes since a single template change benefits everyone.

**Themes tested:** admin-dark, admin, claro-dark, claro, olivero-dark, olivero
**Conditions tested:** admin-dark::dark, admin::light, claro-dark::dark, claro::light, olivero-dark::dark, olivero::light

### 🌐 Universal Issues (appear in ALL themes)

| Pattern ID | Rule | Impact | Screen | Themes | Conditions | Summary |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `DRU-BEADC0A1` | `region` | **moderate** | desktop | admin-dark, admin, claro-dark, claro, olivero-dark, olivero | admin-dark::dark, admin::light, claro-dark::dark, claro::light, olivero-dark::dark, olivero::light | region: Ensure all page content is contained by landmarks |
| `DRU-6825C79C` | `region` | **moderate** | mobile | admin-dark, admin, claro-dark, claro, olivero-dark, olivero | admin-dark::dark, admin::light, claro-dark::dark, claro::light, olivero-dark::dark, olivero::light | region: Ensure all page content is contained by landmarks |

### 🔗 Multi-Theme Issues (appear in 2+ themes)

| Pattern ID | Rule | Impact | Screen | Themes | Conditions | Summary |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `DRU-B09FBDB2` | `label` | **critical** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label: Ensure every form element has a label |
| `DRU-B8247974` | `label` | **critical** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label: Ensure every form element has a label |
| `DRU-E627190E` | `label` | **critical** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label: Ensure every form element has a label |
| `DRU-C7AF32C3` | `label` | **critical** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label: Ensure every form element has a label |
| `DRU-3B3C7C6A` | `label` | **critical** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label: Ensure every form element has a label |
| `DRU-B16236F3` | `label` | **critical** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label: Ensure every form element has a label |
| `DRU-7BC2BF89` | `label` | **critical** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label: Ensure every form element has a label |
| `DRU-E56086DD` | `label` | **critical** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label: Ensure every form element has a label |
| `DRU-7A2CD202` | `label-title-only` | **serious** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-181E4154` | `label-title-only` | **serious** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-90FD983D` | `color-contrast` | **serious** | desktop | claro-dark, claro | claro-dark::dark, claro::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-4319CD90` | `color-contrast` | **serious** | mobile | claro-dark, claro | claro-dark::dark, claro::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-21CE323D` | `label-title-only` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-B8FD2B8F` | `label-title-only` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-6045596D` | `label-title-only` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-720D7F19` | `label-title-only` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-035B968B` | `color-contrast` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-6D9C37D7` | `color-contrast` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-A5C9354A` | `color-contrast` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-89EA1C64` | `color-contrast` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-EF39E687` | `color-contrast` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-ADC70DBF` | `color-contrast` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-8663917B` | `color-contrast` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-5176454A` | `color-contrast` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-01633124` | `color-contrast` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-42CEDC9B` | `color-contrast` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-F97DB31B` | `color-contrast` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-6842A9ED` | `color-contrast` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-82A72B26` | `color-contrast` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-CE5BD028` | `color-contrast` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-73CE312F` | `tabindex` | **serious** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-D3846EC9` | `tabindex` | **serious** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-D795F668` | `tabindex` | **serious** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-377F6525` | `tabindex` | **serious** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-0EA17B95` | `tabindex` | **serious** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-EB1DAE19` | `tabindex` | **serious** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-E2622302` | `tabindex` | **serious** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-EEA77F4C` | `tabindex` | **serious** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-74030995` | `tabindex` | **serious** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-F64A4E6D` | `tabindex` | **serious** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-0E159C38` | `tabindex` | **serious** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-0752228C` | `tabindex` | **serious** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | tabindex: Ensure tabindex attribute values are not greater than 0 |
| `DRU-618AB405` | `label-title-only` | **serious** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label-title-only: Ensure that every form element has a visible label and is not solely labeled usi |
| `DRU-EA241BBD` | `label-title-only` | **serious** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label-title-only: Ensure that every form element has a visible label and is not solely labeled usi |
| `DRU-ACF26A52` | `label-title-only` | **serious** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label-title-only: Ensure that every form element has a visible label and is not solely labeled usi |
| `DRU-21D527F3` | `label-title-only` | **serious** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | label-title-only: Ensure that every form element has a visible label and is not solely labeled usi |
| `DRU-62800584` | `label-title-only` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-5BB30588` | `label-title-only` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-0A147734` | `label-title-only` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-4F1E0191` | `label-title-only` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | "Select all rows" checkbox is labeled only by its title attribute |
| `DRU-EE53B81A` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-54F64122` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-EEC5BEC9` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-33873F40` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-747E8C6F` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-1E8DE467` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-3DE0E158` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-966D750D` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-0E1ADE15` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-0F5F76EF` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-F6E6CFF7` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-92D7D31F` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-45ABDCEE` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-955B315B` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-A1DFA589` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-1C52C501` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-FEC9AAD6` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-F3EC297E` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-0113DE64` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-E2AC9F3A` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-7857535C` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-34B781B1` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-5237FB7F` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-C080C537` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-0A30A1EA` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-33511B76` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-F2C3A468` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-CDFC9A46` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-E227C67A` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-350A7EED` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-EFE01F39` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-16248D72` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-8149C91F` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-6CF5D15B` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-F0767C86` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-077F3076` | `target-size` | **serious** | mobile | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-A42082A0` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-0D84B0B5` | `target-size` | **serious** | desktop | admin-dark, admin | admin-dark::dark, admin::light | target-size: Ensure touch targets have sufficient size and space |
| `DRU-7DE8109C` | `color-contrast` | **serious** | desktop | claro-dark, claro | claro-dark::dark, claro::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-A86FEC99` | `color-contrast` | **serious** | desktop | claro-dark, claro | claro-dark::dark, claro::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-B03C849D` | `color-contrast` | **serious** | mobile | claro-dark, claro | claro-dark::dark, claro::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-431AA300` | `color-contrast` | **serious** | mobile | claro-dark, claro | claro-dark::dark, claro::light | color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min |
| `DRU-208EF2B0` | `color-contrast` | **serious** | desktop | claro-dark, claro | claro-dark::dark, claro::light | "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) |
| `DRU-D140420B` | `color-contrast` | **serious** | mobile | claro-dark, claro | claro-dark::dark, claro::light | "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) |
| `DRU-12C757FE` | `region` | **moderate** | desktop | admin-dark, admin, olivero-dark, olivero | admin-dark::dark, admin::light, olivero-dark::dark, olivero::light | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-E877649B` | `region` | **moderate** | mobile | admin-dark, admin, olivero-dark, olivero | admin-dark::dark, admin::light, olivero-dark::dark, olivero::light | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-29F2A975` | `region` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | region: Ensure all page content is contained by landmarks |
| `DRU-4A60EF0A` | `region` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | region: Ensure all page content is contained by landmarks |
| `DRU-C00D2E42` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-668DAAF4` | `landmark-contentinfo-is-top-level` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-4D24D5C1` | `region` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-BDE7B1F5` | `region` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-5F06D518` | `heading-order` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-80C00FA4` | `heading-order` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-D87CB13C` | `heading-order` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-E21B9679` | `heading-order` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-3A6B5B95` | `region` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | region: Ensure all page content is contained by landmarks |
| `DRU-F0F4271B` | `region` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | region: Ensure all page content is contained by landmarks |
| `DRU-B9B0B039` | `heading-order` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-FA8C25AB` | `heading-order` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-F5FD6EDF` | `heading-order` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-8559566B` | `heading-order` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-CCABA040` | `heading-order` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-C6CEE87C` | `heading-order` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-860BF298` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-97B8237F` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-5AA049DF` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-DC7ECF8A` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-49FF0418` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-AC4DC5D3` | `landmark-no-duplicate-contentinfo` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | Status messages block uses role="contentinfo", duplicating the page <footer> |
| `DRU-BEF75404` | `landmark-unique` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-unique: Ensure landmarks are unique |
| `DRU-E0134841` | `landmark-contentinfo-is-top-level` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-FE76AAF8` | `landmark-contentinfo-is-top-level` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-DEF47113` | `landmark-contentinfo-is-top-level` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-9EBC8AE4` | `landmark-contentinfo-is-top-level` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-6E58C144` | `landmark-contentinfo-is-top-level` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-4220BD7B` | `landmark-no-duplicate-contentinfo` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | Status messages block uses role="contentinfo", duplicating the page <footer> |
| `DRU-42B07BDF` | `landmark-unique` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-unique: Ensure landmarks are unique |
| `DRU-6402BE1E` | `heading-order` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | Admin Configuration page has heading-order violations (h3 appears before h2) |
| `DRU-BCC383CA` | `heading-order` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | Admin Configuration page has heading-order violations (h3 appears before h2) |
| `DRU-DF35BDC8` | `heading-order` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-0F0BE7BF` | `heading-order` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-4109944F` | `heading-order` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-B45E915A` | `heading-order` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-8E7417E8` | `heading-order` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-4276823B` | `heading-order` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-3ADA94F4` | `heading-order` | **moderate** | desktop | claro-dark, claro | claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-599662B5` | `heading-order` | **moderate** | mobile | claro-dark, claro | claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-F2398E98` | `heading-order` | **moderate** | desktop | claro-dark, claro | claro-dark::dark, claro::light | Admin Configuration page has heading-order violations (h3 appears before h2) |
| `DRU-6231011B` | `heading-order` | **moderate** | mobile | claro-dark, claro | claro-dark::dark, claro::light | Admin Configuration page has heading-order violations (h3 appears before h2) |
| `DRU-0FE1D0EF` | `heading-order` | **moderate** | desktop | claro-dark, claro | claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-E556E8F5` | `heading-order` | **moderate** | mobile | claro-dark, claro | claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-FE39ED4A` | `page-has-heading-one` | **moderate** | desktop | olivero-dark, olivero | olivero-dark::dark, olivero::light | Homepage has no <h1> heading — screen reader users cannot identify page topic |
| `DRU-2DD6D8F2` | `page-has-heading-one` | **moderate** | mobile | olivero-dark, olivero | olivero-dark::dark, olivero::light | Homepage has no <h1> heading — screen reader users cannot identify page topic |
| `DRU-B0DFDE0B` | `empty-heading` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-F3CC681C` | `empty-heading` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-8F1B594E` | `empty-heading` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-61489B02` | `empty-heading` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-E2177E9D` | `empty-heading` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-F3C5401B` | `empty-heading` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-A5DF38E7` | `empty-heading` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-A06CCFAC` | `empty-heading` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-91E9D7B3` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-B723ABA5` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-B919231C` | `empty-heading` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-1BC9286C` | `empty-heading` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-DEB9EAFC` | `empty-heading` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-1DD2C1D7` | `empty-heading` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-C4407003` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-41877E07` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-0B43126A` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-CB4F3AEA` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-B5EA9FA7` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-0E527276` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-E9E19F4B` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-543937BC` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-8E260E93` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-683AABB1` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-C598E800` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-2B7C41C0` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-B4B049F7` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-2A526024` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-A0E7A120` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-74E56272` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-1EC10798` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-B07AC371` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-14DE3E53` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-876EF858` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-453BBA14` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-3CB2125D` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-41086634` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-F76B1638` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-2162B464` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-92E64EFC` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-3BE0F134` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-FAF990A8` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-B73F2BFF` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-B11FCD1E` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-4DAAD6CF` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-BF3DA286` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-7DE00366` | `empty-heading` | **minor** | desktop | admin-dark, admin | admin-dark::dark, admin::light | empty-heading: Ensure headings have discernible text |
| `DRU-0B968789` | `empty-heading` | **minor** | mobile | admin-dark, admin | admin-dark::dark, admin::light | empty-heading: Ensure headings have discernible text |
| `DRU-EF28D265` | `empty-heading` | **minor** | desktop | admin-dark, admin | admin-dark::dark, admin::light | empty-heading: Ensure headings have discernible text |
| `DRU-80462EDA` | `empty-heading` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-8F75C41C` | `empty-heading` | **minor** | mobile | admin-dark, admin | admin-dark::dark, admin::light | empty-heading: Ensure headings have discernible text |
| `DRU-C4F7DB50` | `empty-heading` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-B1DF265A` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-5CF38AB2` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-7C13E8BF` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-08D74B05` | `empty-table-header` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-1D9DEBF3` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-0FF43692` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-54CA0360` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-086F07CD` | `empty-table-header` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-DC320928` | `empty-heading` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-0CA45C5C` | `empty-heading` | **minor** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-9BC6E34F` | `empty-heading` | **minor** | desktop | claro-dark, claro | claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-CDFA093D` | `empty-heading` | **minor** | mobile | claro-dark, claro | claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-B67E1D10` | `empty-table-header` | **minor** | desktop | claro-dark, claro | claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-44F5B5C5` | `empty-table-header` | **minor** | mobile | claro-dark, claro | claro-dark::dark, claro::light | empty-table-header: Ensure table headers have discernible text |
| `DRU-73827B24` | `empty-heading` | **minor** | desktop | claro-dark, claro | claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
| `DRU-BDC14F21` | `empty-heading` | **minor** | mobile | claro-dark, claro | claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |

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
| **Pattern ID** | `DRU-B09FBDB2` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-051FE798]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-170AE1B4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-AAFD7741]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-D11D3E7D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 5. label: Ensure every form element has a label 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-005` |
| **Pattern ID** | `DRU-3B3C7C6A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File (mobile) `[INS-E9F8F716]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 6. label: Ensure every form element has a label 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-006` |
| **Pattern ID** | `DRU-B16236F3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File (mobile) `[INS-75EDF3A2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 7. label: Ensure every form element has a label 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-007` |
| **Pattern ID** | `DRU-7BC2BF89` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File (mobile) `[INS-4850E371]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 8. label: Ensure every form element has a label 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-008` |
| **Pattern ID** | `DRU-E56086DD` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File (mobile) `[INS-AFAF596B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 9. "Select all rows" checkbox is labeled only by its title attribute 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-009` |
| **Pattern ID** | `DRU-7A2CD202` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 3 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/people` — People `[INS-631CA206]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list `[INS-D6A47BCB]`
- `/table` — Table `[INS-AFFA444F]`

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

### 10. "Select all rows" checkbox is labeled only by its title attribute 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-010` |
| **Pattern ID** | `DRU-181E4154` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 3 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/people` — People (mobile) `[INS-5F43B594]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list (mobile) `[INS-D9AD9720]`
- `/table` — Table (mobile) `[INS-41328F01]`

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

### 11. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-011` |
| **Pattern ID** | `DRU-90FD983D` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-FF0DA1EB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-C1A3581E]`

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

### 12. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-012` |
| **Pattern ID** | `DRU-4319CD90` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/content` — Content list (mobile) `[INS-2484DC91]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-4A227943]`

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

### 13. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-013` |
| **Pattern ID** | `DRU-21CE323D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `page.html.twig` — Page header region |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list `[INS-311ACB28]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 14. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-014` |
| **Pattern ID** | `DRU-B8FD2B8F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list `[INS-F4DA69C2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 15. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-015` |
| **Pattern ID** | `DRU-6045596D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `page.html.twig` — Page header region |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list (mobile) `[INS-70DF180C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 16. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-016` |
| **Pattern ID** | `DRU-720D7F19` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list (mobile) `[INS-098B09CD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 17. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-017` |
| **Pattern ID** | `DRU-035B968B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
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

### 18. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-018` |
| **Pattern ID** | `DRU-6D9C37D7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
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

### 19. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-019` |
| **Pattern ID** | `DRU-A5C9354A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
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

### 20. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-020` |
| **Pattern ID** | `DRU-89EA1C64` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
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

### 21. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-021` |
| **Pattern ID** | `DRU-EF39E687` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-71EFBE79]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 22. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-022` |
| **Pattern ID** | `DRU-ADC70DBF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-599E4E6F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 23. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-023` |
| **Pattern ID** | `DRU-8663917B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-4FF78378]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 24. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-024` |
| **Pattern ID** | `DRU-5176454A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-DE80BAA9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 25. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-025` |
| **Pattern ID** | `DRU-01633124` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People `[INS-2F192593]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 26. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-026` |
| **Pattern ID** | `DRU-42CEDC9B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People (mobile) `[INS-CEE7A7E5]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 27. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-027` |
| **Pattern ID** | `DRU-F97DB31B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People (mobile) `[INS-D6C3D79C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 28. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-028` |
| **Pattern ID** | `DRU-6842A9ED` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People (mobile) `[INS-15BCDDA4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 29. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-029` |
| **Pattern ID** | `DRU-82A72B26` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People (mobile) `[INS-F76983F2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 30. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-030` |
| **Pattern ID** | `DRU-CE5BD028` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/people` — People (mobile) `[INS-A658A5E7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 31. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-031` |
| **Pattern ID** | `DRU-73CE312F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-8D919E9F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 32. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-032` |
| **Pattern ID** | `DRU-D3846EC9` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-A357FA62]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 33. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-033` |
| **Pattern ID** | `DRU-D795F668` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-4881B6B1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 34. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-034` |
| **Pattern ID** | `DRU-377F6525` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-6FBE6506]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 35. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-035` |
| **Pattern ID** | `DRU-0EA17B95` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-B4B0B98D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 36. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-036` |
| **Pattern ID** | `DRU-EB1DAE19` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-EFA4326A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 37. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-037` |
| **Pattern ID** | `DRU-E2622302` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-CAB80BF0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 38. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-038` |
| **Pattern ID** | `DRU-EEA77F4C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-1A8E3C8A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 39. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-039` |
| **Pattern ID** | `DRU-74030995` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-156540A8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 40. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-040` |
| **Pattern ID** | `DRU-F64A4E6D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-080B9674]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 41. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-041` |
| **Pattern ID** | `DRU-0E159C38` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-BDE78289]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 42. tabindex: Ensure tabindex attribute values are not greater than 0 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-042` |
| **Pattern ID** | `DRU-0752228C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-652DE2A6]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 43. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-043` |
| **Pattern ID** | `DRU-618AB405` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-9D772808]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 44. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-044` |
| **Pattern ID** | `DRU-EA241BBD` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-CB68FC02]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 45. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-045` |
| **Pattern ID** | `DRU-ACF26A52` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-2C5FBD36]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 46. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-046` |
| **Pattern ID** | `DRU-21D527F3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-50910191]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 47. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-047` |
| **Pattern ID** | `DRU-62800584` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table `[INS-DA8EC130]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 48. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-048` |
| **Pattern ID** | `DRU-5BB30588` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table `[INS-24B11422]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 49. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-049` |
| **Pattern ID** | `DRU-0A147734` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table (mobile) `[INS-15986FAB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 50. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-050` |
| **Pattern ID** | `DRU-4F1E0191` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table (mobile) `[INS-96198CAB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 51. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-051` |
| **Pattern ID** | `DRU-EE53B81A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-1E6C57C0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 52. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-052` |
| **Pattern ID** | `DRU-54F64122` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-77F43484]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 53. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-053` |
| **Pattern ID** | `DRU-EEC5BEC9` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-12A6655F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 54. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-054` |
| **Pattern ID** | `DRU-33873F40` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-463A943E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 55. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-055` |
| **Pattern ID** | `DRU-747E8C6F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-1EE2D602]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 56. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-056` |
| **Pattern ID** | `DRU-1E8DE467` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
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

### 57. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-057` |
| **Pattern ID** | `DRU-3DE0E158` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-BAA09E91]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 58. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-058` |
| **Pattern ID** | `DRU-966D750D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
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

### 59. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-059` |
| **Pattern ID** | `DRU-0E1ADE15` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-19D9E650]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 60. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-060` |
| **Pattern ID** | `DRU-0F5F76EF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-2F30409D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 61. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-061` |
| **Pattern ID** | `DRU-F6E6CFF7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-11612407]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 62. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-062` |
| **Pattern ID** | `DRU-92D7D31F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-8C98F215]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 63. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-063` |
| **Pattern ID** | `DRU-45ABDCEE` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-67F50851]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 64. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-064` |
| **Pattern ID** | `DRU-955B315B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
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

### 65. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-065` |
| **Pattern ID** | `DRU-A1DFA589` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-37ED96AD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 66. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-066` |
| **Pattern ID** | `DRU-1C52C501` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
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

### 67. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-067` |
| **Pattern ID** | `DRU-FEC9AAD6` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
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

### 68. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-068` |
| **Pattern ID** | `DRU-F3EC297E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
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

### 69. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-069` |
| **Pattern ID** | `DRU-0113DE64` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-530D0F3C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 70. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-070` |
| **Pattern ID** | `DRU-E2AC9F3A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-1DD3D540]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 71. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-071` |
| **Pattern ID** | `DRU-7857535C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
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

### 72. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-072` |
| **Pattern ID** | `DRU-34B781B1` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
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

### 73. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-073` |
| **Pattern ID** | `DRU-5237FB7F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-836FD897]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 74. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-074` |
| **Pattern ID** | `DRU-C080C537` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-F23B5BB2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 75. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-075` |
| **Pattern ID** | `DRU-0A30A1EA` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-E3691E26]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 76. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-076` |
| **Pattern ID** | `DRU-33511B76` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-E3E3F502]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 77. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-077` |
| **Pattern ID** | `DRU-F2C3A468` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-47D713EE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 78. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-078` |
| **Pattern ID** | `DRU-CDFC9A46` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-6914A3F2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 79. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-079` |
| **Pattern ID** | `DRU-E227C67A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-F1BA6329]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 80. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-080` |
| **Pattern ID** | `DRU-350A7EED` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-7153533A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 81. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-081` |
| **Pattern ID** | `DRU-EFE01F39` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-6F0C9429]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 82. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-082` |
| **Pattern ID** | `DRU-16248D72` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-7E72035D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 83. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-083` |
| **Pattern ID** | `DRU-8149C91F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-C064D2AC]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 84. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-084` |
| **Pattern ID** | `DRU-6CF5D15B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-D10E50E9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 85. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-085` |
| **Pattern ID** | `DRU-F0767C86` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-C4CDCD8A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 86. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-086` |
| **Pattern ID** | `DRU-077F3076` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/258.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-8547CE7B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 87. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-087` |
| **Pattern ID** | `DRU-A42082A0` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
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

### 88. target-size: Ensure touch targets have sufficient size and space 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-088` |
| **Pattern ID** | `DRU-0D84B0B5` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`target-size`](https://dequeuniversity.com/rules/axe/4.11/target-size?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
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

### 89. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-089` |
| **Pattern ID** | `DRU-7DE8109C` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `(theme-specific template)` — Theme template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-BE832DAC]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 90. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-090` |
| **Pattern ID** | `DRU-A86FEC99` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-CC4E5B84]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 91. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-091` |
| **Pattern ID** | `DRU-B03C849D` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `(theme-specific template)` — Theme template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout (mobile) `[INS-32A7C8C3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 92. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-092` |
| **Pattern ID** | `DRU-431AA300` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout (mobile) `[INS-4F001513]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 93. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-093` |
| **Pattern ID** | `DRU-208EF2B0` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-57557F7B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 94. "No blocks in this region" placeholder text fails contrast (2.84:1, needs 4.5:1) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-094` |
| **Pattern ID** | `DRU-D140420B` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-1E91D181]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 95. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-095` |
| **Pattern ID** | `DRU-BEADC0A1` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark), `olivero` (light), `olivero-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 53 of 452 pages (12%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin` — Admin dashboard `[INS-D8DE6AC1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/form_style` — Form style demo `[INS-83E2F270]`
- `/admin/content` — Content list `[INS-565D5E04]`

<details><summary>Show 50 more affected page(s)</summary>

- `/node/add/article` — Create article `[INS-34D3B6E6]`
- `/node/add/page` — Create basic page `[INS-D89718F7]`
- `/admin/structure` — Structure `[INS-089837C7]`
- `/admin/structure/types` — Content types `[INS-1F0E5C7A]`
- `/admin/structure/types/add` — Add content type `[INS-FBDFDDE1]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-51A7195E]`
- `/admin/structure/taxonomy/add` — Add vocabulary `[INS-26112C87]`
- `/admin/structure/block` — Block layout `[INS-001C27FA]`
- `/admin/appearance` — Appearance `[INS-C74D84C8]`
- `/admin/modules` — Modules `[INS-EB461FD0]`
- `/admin/people` — People `[INS-203E1CD2]`
- `/user/1/edit` — User edit (uid 1) `[INS-29F69647]`
- `/admin/config` — Configuration `[INS-E427825B]`
- `/admin/config/content/formats` — Text formats `[INS-22C5B103]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-2AE13BCB]`
- `/admin/config/system/site-information` — Site information `[INS-C15EEB54]`
- `/admin/reports` — Reports `[INS-760F267C]`
- `/autocomplete` — Autocomplete `[INS-814B6CFE]`
- `/buttons` — Buttons `[INS-FA2A20D1]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-924D863B]`
- `/dialog` — Dialogs `[INS-D059761D]`
- `/dropbutton` — Dropbuttons `[INS-6671D464]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-26CD137D]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-206E1DCE]`
- `/fieldset` — Fieldset `[INS-18ECCC55]`
- `/contact/imagefile_file` — File `[INS-115ABFF8]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-B5A36498]`
- `/contact/imagefile_image` — Image `[INS-F8D1D7E6]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name `[INS-38B49EEF]`
- `/message` — Messages `[INS-62B880CE]`
- `/cd-navigation/config` — Nav config `[INS-CE3E0BFE]`
- `/contact/presuf_number` — Number prefix suffix `[INS-C0A71F89]`
- `/tabs/format/plain_text` — Page title `[INS-CF919880]`
- `/password` — Password `[INS-F7B8F881]`
- `/progress` — Progress `[INS-3B1ECF24]`
- `/contact/select` — Select `[INS-548386BA]`
- `/node/add/cd` — Sidebar `[INS-7CFE618D]`
- `/table` — Table `[INS-30B71F0D]`
- `/tabledrag` — Tabledrag `[INS-E4AA2E02]`
- `/tabs` — Tabs `[INS-0D3ED81E]`
- `/contact/textform` — Text `[INS-868C8A7E]`
- `/contact/presuf_text` — Text prefix suffix `[INS-81C44978]`
- `/contact/textarea` — Textarea `[INS-9118E488]`
- `/` — Homepage `[INS-BB8DE047]`
- `/action-link` — Action link demo `[INS-343FB881]`
- `/user/login` — User login `[INS-0EF67DB9]`
- `/user/register` — User register `[INS-63D59683]`
- `/user/password` — User password reset `[INS-F21125DF]`
- `/search/node` — Search results `[INS-44C022F1]`
- `/this-page-does-not-exist` — 404 page `[INS-0C9A0403]`

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

### 96. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-096` |
| **Pattern ID** | `DRU-6825C79C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark), `olivero` (light), `olivero-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 53 of 452 pages (12%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin` — Admin dashboard (mobile) `[INS-F0C4F2C1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/form_style` — Form style demo (mobile) `[INS-A3BAFC54]`
- `/admin/content` — Content list (mobile) `[INS-E66D392C]`

<details><summary>Show 50 more affected page(s)</summary>

- `/node/add/article` — Create article (mobile) `[INS-3AE334AB]`
- `/node/add/page` — Create basic page (mobile) `[INS-C8AC947D]`
- `/admin/structure` — Structure (mobile) `[INS-AD065F7B]`
- `/admin/structure/types` — Content types (mobile) `[INS-0420759A]`
- `/admin/structure/types/add` — Add content type (mobile) `[INS-F6222FEA]`
- `/admin/structure/taxonomy` — Taxonomy (mobile) `[INS-866D8A1F]`
- `/admin/structure/taxonomy/add` — Add vocabulary (mobile) `[INS-37EFF8DC]`
- `/admin/structure/block` — Block layout (mobile) `[INS-38000B83]`
- `/admin/appearance` — Appearance (mobile) `[INS-FF2DB6B1]`
- `/admin/modules` — Modules (mobile) `[INS-DEB0E01D]`
- `/admin/people` — People (mobile) `[INS-FA09BF07]`
- `/user/1/edit` — User edit (uid 1) (mobile) `[INS-10C86D7E]`
- `/admin/config` — Configuration (mobile) `[INS-6F951C47]`
- `/admin/config/content/formats` — Text formats (mobile) `[INS-88F5EE60]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) (mobile) `[INS-3AE351E7]`
- `/admin/config/system/site-information` — Site information (mobile) `[INS-BCB4F132]`
- `/admin/reports` — Reports (mobile) `[INS-2E5FC9E0]`
- `/autocomplete` — Autocomplete (mobile) `[INS-5882C95B]`
- `/buttons` — Buttons (mobile) `[INS-E20671AE]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-B73E1074]`
- `/dialog` — Dialogs (mobile) `[INS-077300B7]`
- `/dropbutton` — Dropbuttons (mobile) `[INS-EE92CDEF]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-494B15C6]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-CCBE2A0F]`
- `/fieldset` — Fieldset (mobile) `[INS-B8AF800F]`
- `/contact/imagefile_file` — File (mobile) `[INS-BAEE3A35]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-C4CE338B]`
- `/contact/imagefile_image` — Image (mobile) `[INS-F5AEF57A]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name (mobile) `[INS-0769D6CD]`
- `/message` — Messages (mobile) `[INS-71DFB250]`
- `/cd-navigation/config` — Nav config (mobile) `[INS-613A665F]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-DF4DA25A]`
- `/tabs/format/plain_text` — Page title (mobile) `[INS-17F11137]`
- `/password` — Password (mobile) `[INS-76E12963]`
- `/progress` — Progress (mobile) `[INS-762B0C83]`
- `/contact/select` — Select (mobile) `[INS-922195A3]`
- `/node/add/cd` — Sidebar (mobile) `[INS-E6B1F764]`
- `/table` — Table (mobile) `[INS-57B6553C]`
- `/tabledrag` — Tabledrag (mobile) `[INS-DF13AB5A]`
- `/tabs` — Tabs (mobile) `[INS-F83D856B]`
- `/contact/textform` — Text (mobile) `[INS-3D2920D2]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-270738CF]`
- `/contact/textarea` — Textarea (mobile) `[INS-2E5F28D5]`
- `/` — Homepage (mobile) `[INS-DC077153]`
- `/action-link` — Action link demo (mobile) `[INS-6788C962]`
- `/user/login` — User login (mobile) `[INS-74810756]`
- `/user/register` — User register (mobile) `[INS-20AC4120]`
- `/user/password` — User password reset (mobile) `[INS-636E78C8]`
- `/search/node` — Search results (mobile) `[INS-B724274A]`
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

### 97. Local task tab headings (#primary-tabs-title) are outside any landmark region 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-097` |
| **Pattern ID** | `DRU-12C757FE` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `olivero` (light), `olivero-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 26 of 452 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin` — Admin dashboard `[INS-ED5789D1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list `[INS-6261BD8B]`
- `/admin/structure/types` — Content types `[INS-7BFD0B73]`

<details><summary>Show 23 more affected page(s)</summary>

- `/admin/appearance` — Appearance `[INS-66F0411F]`
- `/admin/modules` — Modules `[INS-5D29050A]`
- `/admin/people` — People `[INS-53475AE4]`
- `/buttons` — Buttons `[INS-B755019F]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-59226044]`
- `/dropbutton` — Dropbuttons `[INS-BCA850CD]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-704C3FBE]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-09A4B9FB]`
- `/contact/imagefile_file` — File `[INS-F85213DF]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-5663A0FA]`
- `/contact/imagefile_image` — Image `[INS-7CDF9E9F]`
- `/message` — Messages `[INS-52BF86F6]`
- `/contact/presuf_number` — Number prefix suffix `[INS-2035201D]`
- `/tabs/format/plain_text` — Page title `[INS-8B47FF01]`
- `/progress` — Progress `[INS-CD789B90]`
- `/contact/select` — Select `[INS-99938DDE]`
- `/tabledrag` — Tabledrag `[INS-2DDBCF6D]`
- `/tabs` — Tabs `[INS-3643D117]`
- `/contact/textform` — Text `[INS-FFA0B56A]`
- `/contact/presuf_text` — Text prefix suffix `[INS-E0F07AC5]`
- `/contact/textarea` — Textarea `[INS-1836B535]`
- `/user/login` — User login `[INS-BC3B17C9]`
- `/user/password` — User password reset `[INS-94EA0EA1]`

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

### 98. Local task tab headings (#primary-tabs-title) are outside any landmark region 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-098` |
| **Pattern ID** | `DRU-E877649B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `olivero` (light), `olivero-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 26 of 452 pages (6%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin` — Admin dashboard (mobile) `[INS-CA3F486A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list (mobile) `[INS-AD498A59]`
- `/admin/structure/types` — Content types (mobile) `[INS-6F860D5F]`

<details><summary>Show 23 more affected page(s)</summary>

- `/admin/appearance` — Appearance (mobile) `[INS-95DE8A2C]`
- `/admin/modules` — Modules (mobile) `[INS-3E19E7EC]`
- `/admin/people` — People (mobile) `[INS-AEBAFC08]`
- `/buttons` — Buttons (mobile) `[INS-9E2B5CF0]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-6F730C20]`
- `/dropbutton` — Dropbuttons (mobile) `[INS-E0049478]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-FEB48EDD]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-32D20F60]`
- `/contact/imagefile_file` — File (mobile) `[INS-FB25E7CB]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-F1044BC7]`
- `/contact/imagefile_image` — Image (mobile) `[INS-C1F48F13]`
- `/message` — Messages (mobile) `[INS-1F64C2B0]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-4C77D31E]`
- `/tabs/format/plain_text` — Page title (mobile) `[INS-54DEB294]`
- `/progress` — Progress (mobile) `[INS-4A732CB0]`
- `/contact/select` — Select (mobile) `[INS-7A2B9144]`
- `/tabledrag` — Tabledrag (mobile) `[INS-F88F3595]`
- `/tabs` — Tabs (mobile) `[INS-CED52503]`
- `/contact/textform` — Text (mobile) `[INS-4C03CFAA]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-268F906D]`
- `/contact/textarea` — Textarea (mobile) `[INS-10BB8E04]`
- `/user/login` — User login (mobile) `[INS-4AA1B1B9]`
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

### 99. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-099` |
| **Pattern ID** | `DRU-29F2A975` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 5 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-164962E7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types` — Content types `[INS-F517503C]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-08C28518]`

<details><summary>Show 2 more affected page(s)</summary>

- `/admin/people` — People `[INS-FCCC084E]`
- `/admin/config/content/formats` — Text formats `[INS-050A0C81]`

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

### 100. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-100` |
| **Pattern ID** | `DRU-4A60EF0A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 5 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list (mobile) `[INS-4D0090DA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types` — Content types (mobile) `[INS-CFCBB8DB]`
- `/admin/structure/taxonomy` — Taxonomy (mobile) `[INS-A833DA67]`

<details><summary>Show 2 more affected page(s)</summary>

- `/admin/people` — People (mobile) `[INS-A8DE8EF1]`
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

### 101. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-101` |
| **Pattern ID** | `DRU-C00D2E42` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/admin/appearance` — Appearance `[INS-B247AB90]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/modules` — Modules `[INS-87AAED0E]`
- `/admin/people` — People `[INS-73E2EA66]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/config` — Configuration `[INS-EBE0F49A]`

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

### 102. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-102` |
| **Pattern ID** | `DRU-668DAAF4` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/admin/appearance` — Appearance (mobile) `[INS-E34D0EA9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/modules` — Modules (mobile) `[INS-2591C21F]`
- `/admin/people` — People (mobile) `[INS-216CF774]`

<details><summary>Show 1 more affected page(s)</summary>

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

### 103. Local task tab headings (#primary-tabs-title) are outside any landmark region 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-103` |
| **Pattern ID** | `DRU-4D24D5C1` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 3 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-F6796033]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-D1878989]`
- `/tabs` — Tabs `[INS-ED973753]`

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

### 104. Local task tab headings (#primary-tabs-title) are outside any landmark region 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-104` |
| **Pattern ID** | `DRU-BDE7B1F5` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 3 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout (mobile) `[INS-8E336E32]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-F8C6C7E7]`
- `/tabs` — Tabs (mobile) `[INS-5FED7CB6]`

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

### 105. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-105` |
| **Pattern ID** | `DRU-5F06D518` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-F67227FA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 106. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-106` |
| **Pattern ID** | `DRU-80C00FA4` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo (mobile) `[INS-A876FF70]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 107. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-107` |
| **Pattern ID** | `DRU-D87CB13C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-FD2C0F28]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 108. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-108` |
| **Pattern ID** | `DRU-E21B9679` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list (mobile) `[INS-622EF2AF]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 109. region: Ensure all page content is contained by landmarks 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-109` |
| **Pattern ID** | `DRU-3A6B5B95` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `toolbar (admin theme)` — Admin toolbar |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/user/1/edit` — User edit (uid 1) `[INS-59016654]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 110. region: Ensure all page content is contained by landmarks 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-110` |
| **Pattern ID** | `DRU-F0F4271B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `toolbar (admin theme)` — Admin toolbar |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/user/1/edit` — User edit (uid 1) (mobile) `[INS-C1FF9EB1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 111. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-111` |
| **Pattern ID** | `DRU-B9B0B039` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/autocomplete` — Autocomplete `[INS-6C963C7F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 112. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-112` |
| **Pattern ID** | `DRU-FA8C25AB` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/autocomplete` — Autocomplete (mobile) `[INS-B0239B5D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 113. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-113` |
| **Pattern ID** | `DRU-F5FD6EDF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-E6A19988]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 114. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-114` |
| **Pattern ID** | `DRU-8559566B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-568F7E0B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 115. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-115` |
| **Pattern ID** | `DRU-CCABA040` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-AB298E5F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 116. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-116` |
| **Pattern ID** | `DRU-C6CEE87C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-166D9CDA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 117. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-117` |
| **Pattern ID** | `DRU-860BF298` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-32AE2346]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 118. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-118` |
| **Pattern ID** | `DRU-97B8237F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-8EA427CF]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 119. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-119` |
| **Pattern ID** | `DRU-5AA049DF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-54574906]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 120. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-120` |
| **Pattern ID** | `DRU-DC7ECF8A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-C77800EB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 121. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-121` |
| **Pattern ID** | `DRU-49FF0418` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-B015FF40]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 122. Status messages block uses role="contentinfo", duplicating the page &lt;footer&gt; 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-122` |
| **Pattern ID** | `DRU-AC4DC5D3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-no-duplicate-contentinfo`](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/misc/status-messages.html.twig, core/modules/system/templates/status-messages.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/message` — Messages `[INS-217D3820]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 123. landmark-unique: Ensure landmarks are unique 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-123` |
| **Pattern ID** | `DRU-BEF75404` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-unique`](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-72820C3E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 124. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-124` |
| **Pattern ID** | `DRU-E0134841` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages (mobile) `[INS-6340BB49]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 125. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-125` |
| **Pattern ID** | `DRU-FE76AAF8` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages (mobile) `[INS-44531B14]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 126. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-126` |
| **Pattern ID** | `DRU-DEF47113` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages (mobile) `[INS-20150FA9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 127. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-127` |
| **Pattern ID** | `DRU-9EBC8AE4` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages (mobile) `[INS-E1083638]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 128. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-128` |
| **Pattern ID** | `DRU-6E58C144` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages (mobile) `[INS-91297A72]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 129. Status messages block uses role="contentinfo", duplicating the page &lt;footer&gt; 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-129` |
| **Pattern ID** | `DRU-4220BD7B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-no-duplicate-contentinfo`](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/misc/status-messages.html.twig, core/modules/system/templates/status-messages.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/message` — Messages (mobile) `[INS-1358DBF4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 130. landmark-unique: Ensure landmarks are unique 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-130` |
| **Pattern ID** | `DRU-42B07BDF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-unique`](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages (mobile) `[INS-C1AF88AE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 131. Admin Configuration page has heading-order violations (h3 appears before h2) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-131` |
| **Pattern ID** | `DRU-6402BE1E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/cd-navigation/config` — Nav config `[INS-8E91B483]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 132. Admin Configuration page has heading-order violations (h3 appears before h2) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-132` |
| **Pattern ID** | `DRU-BCC383CA` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/cd-navigation/config` — Nav config (mobile) `[INS-A5BF27C7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 133. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-133` |
| **Pattern ID** | `DRU-DF35BDC8` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-62CA3978]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 134. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-134` |
| **Pattern ID** | `DRU-0F0BE7BF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-2B45D5B7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 135. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-135` |
| **Pattern ID** | `DRU-4109944F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/textform` — Text `[INS-5AC911D4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 136. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-136` |
| **Pattern ID** | `DRU-B45E915A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/textform` — Text (mobile) `[INS-68969490]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 137. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-137` |
| **Pattern ID** | `DRU-8E7417E8` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-49F53FC9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 138. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-138` |
| **Pattern ID** | `DRU-4276823B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-B2A30286]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 139. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-139` |
| **Pattern ID** | `DRU-3ADA94F4` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-F8772D3C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 140. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-140` |
| **Pattern ID** | `DRU-599662B5` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo (mobile) `[INS-B696306F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 141. Admin Configuration page has heading-order violations (h3 appears before h2) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-141` |
| **Pattern ID** | `DRU-F2398E98` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/cd-navigation/config` — Nav config `[INS-79516607]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 142. Admin Configuration page has heading-order violations (h3 appears before h2) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-142` |
| **Pattern ID** | `DRU-6231011B` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/cd-navigation/config` — Nav config (mobile) `[INS-5A88424C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 143. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-143` |
| **Pattern ID** | `DRU-0FE1D0EF` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/textform` — Text `[INS-1940F8CC]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 144. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-144` |
| **Pattern ID** | `DRU-E556E8F5` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/textform` — Text (mobile) `[INS-9676EF18]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 145. Homepage has no &lt;h1&gt; heading — screen reader users cannot identify page topic 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-145` |
| **Pattern ID** | `DRU-FE39ED4A` *(stable hash — use to track regressions)* |
| **Conditions** | `olivero` (light), `olivero-dark` (dark) |
| **Rule** | [`page-has-heading-one`](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage `[INS-C56E21D1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 146. Homepage has no &lt;h1&gt; heading — screen reader users cannot identify page topic 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-146` |
| **Pattern ID** | `DRU-2DD6D8F2` *(stable hash — use to track regressions)* |
| **Conditions** | `olivero` (light), `olivero-dark` (dark) |
| **Rule** | [`page-has-heading-one`](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-13EEEC14]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 147. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-147` |
| **Pattern ID** | `DRU-B0DFDE0B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-EBD6D1DE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-7B033AB7]`

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

### 148. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-148` |
| **Pattern ID** | `DRU-F3CC681C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-FD01376B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-5577EA5A]`

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

### 149. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-149` |
| **Pattern ID** | `DRU-8F1B594E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-DE731FB7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-3C95FFB2]`

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

### 150. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-150` |
| **Pattern ID** | `DRU-61489B02` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-7E1BB7BA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-BD7097D8]`

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

### 151. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-151` |
| **Pattern ID** | `DRU-E2177E9D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-FF513257]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-77B617FF]`

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

### 152. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-152` |
| **Pattern ID** | `DRU-F3C5401B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-5E2BEBF0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-C7957CDF]`

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

### 153. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-153` |
| **Pattern ID** | `DRU-A5DF38E7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-CC6C10C4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-A8CCBEE6]`

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

### 154. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-154` |
| **Pattern ID** | `DRU-A06CCFAC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-2B805866]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-1DD9AA40]`

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

### 155. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-155` |
| **Pattern ID** | `DRU-91E9D7B3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/autocomplete` — Autocomplete `[INS-1C9FFF43]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 156. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-156` |
| **Pattern ID** | `DRU-B723ABA5` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/autocomplete` — Autocomplete (mobile) `[INS-23848B56]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 157. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-157` |
| **Pattern ID** | `DRU-B919231C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-C4C1AE18]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 158. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-158` |
| **Pattern ID** | `DRU-1BC9286C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-F632ECFD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 159. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-159` |
| **Pattern ID** | `DRU-DEB9EAFC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-8B44A1E8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 160. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-160` |
| **Pattern ID** | `DRU-1DD2C1D7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-B71E15EB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 161. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-161` |
| **Pattern ID** | `DRU-C4407003` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-721FFF91]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 162. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-162` |
| **Pattern ID** | `DRU-41877E07` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-E6BDA351]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 163. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-163` |
| **Pattern ID** | `DRU-0B43126A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-2FD4B698]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 164. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-164` |
| **Pattern ID** | `DRU-CB4F3AEA` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-3C7BA57A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 165. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-165` |
| **Pattern ID** | `DRU-B5EA9FA7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-AF571ABF]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 166. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-166` |
| **Pattern ID** | `DRU-0E527276` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-2E3E0791]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 167. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-167` |
| **Pattern ID** | `DRU-E9E19F4B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-03CA59E4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 168. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-168` |
| **Pattern ID** | `DRU-543937BC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-7B45D9CE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 169. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-169` |
| **Pattern ID** | `DRU-8E260E93` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-D0076929]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 170. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-170` |
| **Pattern ID** | `DRU-683AABB1` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-9D803FB2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 171. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-171` |
| **Pattern ID** | `DRU-C598E800` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-D76EB858]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 172. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-172` |
| **Pattern ID** | `DRU-2B7C41C0` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-7872DF86]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 173. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-173` |
| **Pattern ID** | `DRU-B4B049F7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-1617D470]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 174. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-174` |
| **Pattern ID** | `DRU-2A526024` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-238DF668]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 175. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-175` |
| **Pattern ID** | `DRU-A0E7A120` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-53F8D1A9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 176. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-176` |
| **Pattern ID** | `DRU-74E56272` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-2CFB581E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 177. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-177` |
| **Pattern ID** | `DRU-1EC10798` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-0CF998D8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 178. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-178` |
| **Pattern ID** | `DRU-B07AC371` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-DB5550DA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 179. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-179` |
| **Pattern ID** | `DRU-14DE3E53` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-2A171D89]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 180. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-180` |
| **Pattern ID** | `DRU-876EF858` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-06AE9FC8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 181. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-181` |
| **Pattern ID** | `DRU-453BBA14` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-755D74AA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 182. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-182` |
| **Pattern ID** | `DRU-3CB2125D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-207C4875]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 183. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-183` |
| **Pattern ID** | `DRU-41086634` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-1B6C288A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 184. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-184` |
| **Pattern ID** | `DRU-F76B1638` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-706CE780]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 185. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-185` |
| **Pattern ID** | `DRU-2162B464` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-3615154C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 186. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-186` |
| **Pattern ID** | `DRU-92E64EFC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-813BA53C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 187. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-187` |
| **Pattern ID** | `DRU-3BE0F134` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-4D3CAB8C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 188. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-188` |
| **Pattern ID** | `DRU-FAF990A8` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-66AD5BE9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 189. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-189` |
| **Pattern ID** | `DRU-B73F2BFF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-57BF05B0]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 190. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-190` |
| **Pattern ID** | `DRU-B11FCD1E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-476DADF5]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 191. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-191` |
| **Pattern ID** | `DRU-4DAAD6CF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-4274A02B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 192. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-192` |
| **Pattern ID** | `DRU-BF3DA286` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-4E9A279F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 193. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-193` |
| **Pattern ID** | `DRU-7DE00366` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs/format/plain_text` — Page title `[INS-93C0777E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 194. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-194` |
| **Pattern ID** | `DRU-0B968789` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs/format/plain_text` — Page title (mobile) `[INS-8004C104]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 195. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-195` |
| **Pattern ID** | `DRU-EF28D265` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs `[INS-B35FCB9C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 196. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-196` |
| **Pattern ID** | `DRU-80462EDA` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs `[INS-E71175CB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 197. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-197` |
| **Pattern ID** | `DRU-8F75C41C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs (mobile) `[INS-B4B1CBE2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 198. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-198` |
| **Pattern ID** | `DRU-C4F7DB50` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs (mobile) `[INS-F4F655E7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 199. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-199` |
| **Pattern ID** | `DRU-B1DF265A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-69EC7EF3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 200. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-200` |
| **Pattern ID** | `DRU-5CF38AB2` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-F6B7667A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 201. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-201` |
| **Pattern ID** | `DRU-7C13E8BF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-28589058]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 202. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-202` |
| **Pattern ID** | `DRU-08D74B05` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-C1FF2EA8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 203. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-203` |
| **Pattern ID** | `DRU-1D9DEBF3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-4DF72B52]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 204. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-204` |
| **Pattern ID** | `DRU-0FF43692` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-E8E2410F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 205. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-205` |
| **Pattern ID** | `DRU-54CA0360` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-1A2C59B9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 206. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-206` |
| **Pattern ID** | `DRU-086F07CD` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-24D788EB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 207. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-207` |
| **Pattern ID** | `DRU-DC320928` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/` — Homepage `[INS-423F682C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 208. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-208` |
| **Pattern ID** | `DRU-0CA45C5C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-E27B1D6C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 209. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-209` |
| **Pattern ID** | `DRU-9BC6E34F` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs/format/plain_text` — Page title `[INS-BFB35709]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 210. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-210` |
| **Pattern ID** | `DRU-CDFA093D` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs/format/plain_text` — Page title (mobile) `[INS-A3011FB8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 211. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-211` |
| **Pattern ID** | `DRU-B67E1D10` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/table` — Table `[INS-75B73110]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 212. empty-table-header: Ensure table headers have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-212` |
| **Pattern ID** | `DRU-44F5B5C5` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/table` — Table (mobile) `[INS-B21395D6]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

### 213. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-213` |
| **Pattern ID** | `DRU-73827B24` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs `[INS-A4B2A699]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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

---

### 214. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-214` |
| **Pattern ID** | `DRU-BDC14F21` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 1 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs (mobile) `[INS-33DF35E6]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>

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
