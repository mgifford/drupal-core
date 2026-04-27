# Drupal Core Accessibility Bug Report

> **Generated:** 2026-04-27T19:14:12.452Z
> **Tool:** axe-core via @axe-core/playwright | **Browser:** Chromium
> **Standard:** [ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md](https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/ACCESSIBILITY_BUG_REPORTING_BEST_PRACTICES.md)

## Summary

| Metric | Value |
| :--- | :--- |
| Pages crawled | 452 |
| Total violation instances | 1296 |
| Unique patterns | 214 |
| Template-level patterns (≥3 pages) 🔁 | 122 |
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
| `DRU-C00D2E42` | `landmark-contentinfo-is-top-level` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-668DAAF4` | `landmark-contentinfo-is-top-level` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level |
| `DRU-29F2A975` | `region` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | region: Ensure all page content is contained by landmarks |
| `DRU-4A60EF0A` | `region` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | region: Ensure all page content is contained by landmarks |
| `DRU-4D24D5C1` | `region` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-BDE7B1F5` | `region` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | Local task tab headings (#primary-tabs-title) are outside any landmark region |
| `DRU-D87CB13C` | `heading-order` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-E21B9679` | `heading-order` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
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
| `DRU-DF35BDC8` | `heading-order` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-0F0BE7BF` | `heading-order` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-8E7417E8` | `heading-order` | **moderate** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-4276823B` | `heading-order` | **moderate** | mobile | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-5F06D518` | `heading-order` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-80C00FA4` | `heading-order` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-3A6B5B95` | `region` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | region: Ensure all page content is contained by landmarks |
| `DRU-F0F4271B` | `region` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | region: Ensure all page content is contained by landmarks |
| `DRU-6402BE1E` | `heading-order` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | Admin Configuration page has heading-order violations (h3 appears before h2) |
| `DRU-BCC383CA` | `heading-order` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | Admin Configuration page has heading-order violations (h3 appears before h2) |
| `DRU-4109944F` | `heading-order` | **moderate** | desktop | admin-dark, admin | admin-dark::dark, admin::light | heading-order: Ensure the order of headings is semantically correct |
| `DRU-B45E915A` | `heading-order` | **moderate** | mobile | admin-dark, admin | admin-dark::dark, admin::light | heading-order: Ensure the order of headings is semantically correct |
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
| `DRU-80462EDA` | `empty-heading` | **minor** | desktop | admin-dark, admin, claro-dark, claro | admin-dark::dark, admin::light, claro-dark::dark, claro::light | empty-heading: Ensure headings have discernible text |
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
| `DRU-7DE00366` | `empty-heading` | **minor** | desktop | admin-dark, admin | admin-dark::dark, admin::light | empty-heading: Ensure headings have discernible text |
| `DRU-0B968789` | `empty-heading` | **minor** | mobile | admin-dark, admin | admin-dark::dark, admin::light | empty-heading: Ensure headings have discernible text |
| `DRU-EF28D265` | `empty-heading` | **minor** | desktop | admin-dark, admin | admin-dark::dark, admin::light | empty-heading: Ensure headings have discernible text |
| `DRU-8F75C41C` | `empty-heading` | **minor** | mobile | admin-dark, admin | admin-dark::dark, admin::light | empty-heading: Ensure headings have discernible text |
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

### 1. label: Ensure every form element has a label 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-001` |
| **Pattern ID** | `DRU-B09FBDB2` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-03643BCC]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/imagefile_file` — File `[INS-3E283245]`
- `/contact/imagefile_file` — File `[INS-298A03D4]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/imagefile_file` — File `[INS-39472DEC]`

</details>

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

### 2. label: Ensure every form element has a label 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-002` |
| **Pattern ID** | `DRU-B8247974` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-B86D2594]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/imagefile_file` — File `[INS-673721D4]`
- `/contact/imagefile_file` — File `[INS-D31E6A9D]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/imagefile_file` — File `[INS-5ACC6396]`

</details>

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

### 3. label: Ensure every form element has a label 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-003` |
| **Pattern ID** | `DRU-E627190E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-EF8ECF85]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/imagefile_file` — File `[INS-2F88110D]`
- `/contact/imagefile_file` — File `[INS-9E344E0F]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/imagefile_file` — File `[INS-82B44A5D]`

</details>

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

### 4. label: Ensure every form element has a label 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-004` |
| **Pattern ID** | `DRU-C7AF32C3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File `[INS-51C1C64B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/imagefile_file` — File `[INS-14B2EFEB]`
- `/contact/imagefile_file` — File `[INS-8CD74F86]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/imagefile_file` — File `[INS-B155A58A]`

</details>

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

### 5. label: Ensure every form element has a label 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-005` |
| **Pattern ID** | `DRU-3B3C7C6A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File (mobile) `[INS-A8A947AE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/imagefile_file` — File (mobile) `[INS-7770096F]`
- `/contact/imagefile_file` — File (mobile) `[INS-D7579593]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/imagefile_file` — File (mobile) `[INS-0D0B50BD]`

</details>

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

### 6. label: Ensure every form element has a label 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-006` |
| **Pattern ID** | `DRU-B16236F3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File (mobile) `[INS-489CA27F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/imagefile_file` — File (mobile) `[INS-8AF4C850]`
- `/contact/imagefile_file` — File (mobile) `[INS-78C6C1C8]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/imagefile_file` — File (mobile) `[INS-0A8AC742]`

</details>

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

### 7. label: Ensure every form element has a label 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-007` |
| **Pattern ID** | `DRU-7BC2BF89` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File (mobile) `[INS-3B763A14]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/imagefile_file` — File (mobile) `[INS-A87F26B8]`
- `/contact/imagefile_file` — File (mobile) `[INS-02E1EDED]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/imagefile_file` — File (mobile) `[INS-89A21624]`

</details>

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

### 8. label: Ensure every form element has a label 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-008` |
| **Pattern ID** | `DRU-E56086DD` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label`](https://dequeuniversity.com/rules/axe/4.11/label?application=playwright) |
| **Impact** | **critical** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/imagefile_file` — File (mobile) `[INS-6520F053]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/imagefile_file` — File (mobile) `[INS-9CEF654F]`
- `/contact/imagefile_file` — File (mobile) `[INS-8B3B4065]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/imagefile_file` — File (mobile) `[INS-C255886B]`

</details>

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
| **Frequency** | 8 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/people` — People `[INS-0F1C503D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-494E39BC]`
- `/admin/content` — Content list `[INS-48B996FB]`

<details><summary>Show 5 more affected page(s)</summary>

- `/admin/people` — People `[INS-09F7B527]`
- `/table` — Table `[INS-6008F66C]`
- `/admin/content` — Content list `[INS-04965A0E]`
- `/admin/people` — People `[INS-5AE35735]`
- `/table` — Table `[INS-6261D848]`

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
| **Frequency** | 8 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/people` — People (mobile) `[INS-2DE15469]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-FDBC8B83]`
- `/admin/content` — Content list (mobile) `[INS-A77CD85F]`

<details><summary>Show 5 more affected page(s)</summary>

- `/admin/people` — People (mobile) `[INS-CB93DC6E]`
- `/table` — Table (mobile) `[INS-CEAB2046]`
- `/admin/content` — Content list (mobile) `[INS-3E2C4760]`
- `/admin/people` — People (mobile) `[INS-3934D6F8]`
- `/table` — Table (mobile) `[INS-EF7C10A6]`

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

### 11. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-011` |
| **Pattern ID** | `DRU-73CE312F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-0DC85EDD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons `[INS-E8516FC7]`
- `/buttons` — Buttons `[INS-FC0907CC]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons `[INS-107B8AEC]`

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

### 12. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-012` |
| **Pattern ID** | `DRU-D3846EC9` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-0EFE8C4E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons `[INS-2996EA8A]`
- `/buttons` — Buttons `[INS-83611C92]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons `[INS-589EE1AE]`

</details>

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

### 13. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-013` |
| **Pattern ID** | `DRU-D795F668` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-D549155A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons `[INS-C7ED3274]`
- `/buttons` — Buttons `[INS-5B50A2E8]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons `[INS-ADC974DC]`

</details>

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

### 14. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-014` |
| **Pattern ID** | `DRU-377F6525` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-17C25C41]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons `[INS-1E1C3279]`
- `/buttons` — Buttons `[INS-DC6DC8FE]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons `[INS-8C6BBBF4]`

</details>

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

### 15. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-015` |
| **Pattern ID** | `DRU-0EA17B95` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-FA03825F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons `[INS-88F01940]`
- `/buttons` — Buttons `[INS-9F6C1361]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons `[INS-F0E7B524]`

</details>

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

### 16. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-016` |
| **Pattern ID** | `DRU-EB1DAE19` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons `[INS-41B45D15]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons `[INS-BB3B1BD7]`
- `/buttons` — Buttons `[INS-CC2A76A8]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons `[INS-20026934]`

</details>

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

### 17. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-017` |
| **Pattern ID** | `DRU-E2622302` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-E185734D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-3D27257A]`
- `/buttons` — Buttons (mobile) `[INS-0B7D2665]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons (mobile) `[INS-43842432]`

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

### 18. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-018` |
| **Pattern ID** | `DRU-EEA77F4C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-4955B96D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-45AD7E06]`
- `/buttons` — Buttons (mobile) `[INS-6028DAB9]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons (mobile) `[INS-E48A34B5]`

</details>

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

### 19. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-019` |
| **Pattern ID** | `DRU-74030995` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-3C65E451]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-8EF62F82]`
- `/buttons` — Buttons (mobile) `[INS-189D907F]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons (mobile) `[INS-F324F1A9]`

</details>

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

### 20. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-020` |
| **Pattern ID** | `DRU-F64A4E6D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-19CFFB57]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-F471698A]`
- `/buttons` — Buttons (mobile) `[INS-5DDAE018]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons (mobile) `[INS-101D7D3E]`

</details>

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

### 21. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-021` |
| **Pattern ID** | `DRU-0E159C38` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-E4A6D620]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-68CA8CDD]`
- `/buttons` — Buttons (mobile) `[INS-BBCD56E4]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons (mobile) `[INS-A6C9D405]`

</details>

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

### 22. tabindex: Ensure tabindex attribute values are not greater than 0 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-022` |
| **Pattern ID** | `DRU-0752228C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`tabindex`](https://dequeuniversity.com/rules/axe/4.11/tabindex?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/243.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/buttons` — Buttons (mobile) `[INS-2F951AB2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/buttons` — Buttons (mobile) `[INS-893C5B74]`
- `/buttons` — Buttons (mobile) `[INS-99AF0F17]`

<details><summary>Show 1 more affected page(s)</summary>

- `/buttons` — Buttons (mobile) `[INS-A1173B4E]`

</details>

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

### 23. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-023` |
| **Pattern ID** | `DRU-618AB405` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-B9FF4AB1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-879C80EE]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-50E0893B]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-2991A26B]`

</details>

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

### 24. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-024` |
| **Pattern ID** | `DRU-EA241BBD` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-FF03E1DE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-B28A0394]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-F010268B]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-B78C07A4]`

</details>

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

### 25. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-025` |
| **Pattern ID** | `DRU-ACF26A52` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-89623E99]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-3FE141C6]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-A3362E22]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-7372C9F5]`

</details>

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

### 26. label-title-only: Ensure that every form element has a visible label and is not solely labeled usi 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-026` |
| **Pattern ID** | `DRU-21D527F3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-4813BF46]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-92ED78BF]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-206F63BD]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-AE93BBCF]`

</details>

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

### 27. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-027` |
| **Pattern ID** | `DRU-90FD983D` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-BB5C4B90]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-B9C1A086]`
- `/admin/content` — Content list `[INS-0F50A785]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/people` — People `[INS-3730C3DC]`

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

### 28. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-028` |
| **Pattern ID** | `DRU-4319CD90` *(stable hash — use to track regressions)* |
| **Conditions** | `claro` (light), `claro-dark` (dark) |
| **Rule** | [`color-contrast`](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/143.html) (Level AA) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/content` — Content list (mobile) `[INS-32759653]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-EFE6B150]`
- `/admin/content` — Content list (mobile) `[INS-64AD1DCE]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/people` — People (mobile) `[INS-20AE6929]`

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

### 29. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-029` |
| **Pattern ID** | `DRU-21CE323D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `page.html.twig` — Page header region |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list `[INS-E172C4F1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list `[INS-D45A01C6]`

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

### 30. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-030` |
| **Pattern ID** | `DRU-B8FD2B8F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list `[INS-DD7B019D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list `[INS-AD9C4961]`

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

### 31. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-031` |
| **Pattern ID** | `DRU-6045596D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `page.html.twig` — Page header region |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list (mobile) `[INS-DD9E6517]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list (mobile) `[INS-4CCA7137]`

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

### 32. "Select all rows" checkbox is labeled only by its title attribute 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-032` |
| **Pattern ID** | `DRU-720D7F19` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`label-title-only`](https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright) |
| **Impact** | **serious** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/admin/content` — Content list (mobile) `[INS-1A160451]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list (mobile) `[INS-5C45CA85]`

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

### 33. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-033` |
| **Pattern ID** | `DRU-035B968B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/structure/types/add` — Add content type (mobile) `[INS-AB12A624]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/add` — Add content type (mobile) `[INS-E1A050AD]`

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

### 34. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-034` |
| **Pattern ID** | `DRU-6D9C37D7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/structure/types/add` — Add content type (mobile) `[INS-CFDE2BF5]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/add` — Add content type (mobile) `[INS-CA465FB3]`

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

### 35. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-035` |
| **Pattern ID** | `DRU-A5C9354A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/structure/types/add` — Add content type (mobile) `[INS-381D67FE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/add` — Add content type (mobile) `[INS-558F6888]`

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

### 36. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-036` |
| **Pattern ID** | `DRU-89EA1C64` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/structure/types/add` — Add content type (mobile) `[INS-EABFE015]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/add` — Add content type (mobile) `[INS-7B9767CA]`

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

### 37. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-037` |
| **Pattern ID** | `DRU-EF39E687` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/people` — People `[INS-F913A71C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-0A69E6A9]`

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

### 38. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-038` |
| **Pattern ID** | `DRU-ADC70DBF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/people` — People `[INS-8FA4C71B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-ADFE16D4]`

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

### 39. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-039` |
| **Pattern ID** | `DRU-8663917B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/people` — People `[INS-8AFC3A22]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-9B2A7B31]`

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

### 40. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-040` |
| **Pattern ID** | `DRU-5176454A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/people` — People `[INS-63D476E2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-0C9C4FBF]`

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

### 41. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-041` |
| **Pattern ID** | `DRU-01633124` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/people` — People `[INS-9D30FD04]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People `[INS-67F2EB0B]`

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

### 42. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-042` |
| **Pattern ID** | `DRU-42CEDC9B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/people` — People (mobile) `[INS-E098D0F7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-49E6A708]`

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

### 43. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-043` |
| **Pattern ID** | `DRU-F97DB31B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/people` — People (mobile) `[INS-51405279]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-F1F2AECF]`

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

### 44. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-044` |
| **Pattern ID** | `DRU-6842A9ED` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/people` — People (mobile) `[INS-6E399212]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-E28D9AB7]`

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

### 45. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-045` |
| **Pattern ID** | `DRU-82A72B26` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/people` — People (mobile) `[INS-D2BD877C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-E4CE7DBF]`

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

### 46. color-contrast: Ensure the contrast between foreground and background colors meets WCAG 2 AA min 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-046` |
| **Pattern ID** | `DRU-CE5BD028` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
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
- `/admin/people` — People (mobile) `[INS-7B9792DA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/people` — People (mobile) `[INS-B5574101]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table `[INS-D4538426]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/table` — Table `[INS-E1E62436]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table `[INS-16541BE4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/table` — Table `[INS-92374153]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table (mobile) `[INS-6B3FFF95]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/table` — Table (mobile) `[INS-6CA77C1B]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/classy/dataset/table.html.twig, core/themes/admin/templates/dataset/table.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision, voice-control |

**Affected pages:**
- `/table` — Table (mobile) `[INS-513BB728]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/table` — Table (mobile) `[INS-B2A377DB]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-2973B05E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-08020F92]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-2DC88369]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-E88A5FC2]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-C27FA7F8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-84914DD5]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-AEDDD804]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-8BE6D64B]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-C896ED7B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-95B0ED7E]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-D90B3E82]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-C2E07F78]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-97FE84E7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-D46756DC]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-F57483FE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-D0BA94CE]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-3C45E7D8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-3C0B13B5]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-9312DDD3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-A995C851]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-AA3D4164]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-2516E79E]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-0CAF421F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-1A2F88F2]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-61444B48]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-565E4F49]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-8FB26B35]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-7AFD86BE]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-4F682C08]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-32CEFD17]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-4B8C8CC9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-FB5D6DBD]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-55908F89]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-2A2FE071]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-7BA47983]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-B0CC1358]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-03CC7D2A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-391E5815]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-AD9A3813]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-9226F5DE]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-01731131]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-541DCD4E]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag `[INS-D57A1C60]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag `[INS-A178A4FB]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-3F541DE7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-092E9B7B]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-A087389C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-4CF729BB]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-4C080A70]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-C7549750]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-B8298B4B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-E3429212]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-548E9656]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-776FF2A1]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-49347514]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-D772DB2F]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-00826FBB]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-45C8A729]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-413FF806]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-EE390025]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-06BDCF19]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-3BE2D550]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-CAC41D94]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-90227357]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-6B4C4409]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-61E51330]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-24959A76]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-EBFC909A]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-FBFEDA12]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-8AAF3BCF]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabledrag` — Tabledrag (mobile) `[INS-382003C7]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabledrag` — Tabledrag (mobile) `[INS-72C79B51]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabs` — Tabs `[INS-8EDA3893]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-01344F10]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | motor, low-vision |

**Affected pages:**
- `/tabs` — Tabs `[INS-CB87C0AD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-A72F7331]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `(theme-specific template)` — Theme template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-258841C6]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/block` — Block layout `[INS-9B3CE2D1]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-8D9D3BCC]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/block` — Block layout `[INS-09E13E69]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `(theme-specific template)` — Theme template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout (mobile) `[INS-DEB4AB15]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/block` — Block layout (mobile) `[INS-0DFE90F7]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout (mobile) `[INS-B6AC2348]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/block` — Block layout (mobile) `[INS-83619408]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-3FE5EA2C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-209C0E2F]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `region.html.twig` — Region template |
| **Drupal file(s)** | core/themes/claro/css/theme/block-admin.css (or its .pcss.css source) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318394 |
| **Affected users** | low-vision |

**Affected pages:**
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-67F6B813]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-77CD89F6]`

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
| **Frequency** | 226 of 452 pages (50%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin` — Admin dashboard `[INS-6AA9AE19]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/form_style` — Form style demo `[INS-98F5DFB2]`
- `/admin/content` — Content list `[INS-E865D369]`

<details><summary>Show 223 more affected page(s)</summary>

- `/node/add/article` — Create article `[INS-AAA0089F]`
- `/node/add/page` — Create basic page `[INS-34A7C6DE]`
- `/admin/structure` — Structure `[INS-23BC636D]`
- `/admin/structure/types` — Content types `[INS-B7F85D86]`
- `/admin/structure/types/add` — Add content type `[INS-944F746C]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-4B55768B]`
- `/admin/structure/taxonomy/add` — Add vocabulary `[INS-EA9B7E1C]`
- `/admin/structure/block` — Block layout `[INS-0B09E189]`
- `/admin/appearance` — Appearance `[INS-9EB665E5]`
- `/admin/modules` — Modules `[INS-E74D665D]`
- `/admin/people` — People `[INS-91AC7012]`
- `/user/1/edit` — User edit (uid 1) `[INS-EFDCEFEA]`
- `/admin/config` — Configuration `[INS-F29E5B46]`
- `/admin/config/content/formats` — Text formats `[INS-8FD8B58B]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-C2997184]`
- `/admin/config/system/site-information` — Site information `[INS-E28986BC]`
- `/admin/reports` — Reports `[INS-36F932F2]`
- `/autocomplete` — Autocomplete `[INS-DA7E8E52]`
- `/buttons` — Buttons `[INS-BB56FBD2]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-21F36A81]`
- `/dialog` — Dialogs `[INS-CD34C5B0]`
- `/dropbutton` — Dropbuttons `[INS-5F3DE987]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-766BE555]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-F143CBF6]`
- `/fieldset` — Fieldset `[INS-5908C193]`
- `/contact/imagefile_file` — File `[INS-9FBA4DDD]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-DFF51F5D]`
- `/contact/imagefile_image` — Image `[INS-44C2FFA8]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name `[INS-E4606B9E]`
- `/message` — Messages `[INS-97DC8D7F]`
- `/cd-navigation/config` — Nav config `[INS-8FE9BE3A]`
- `/contact/presuf_number` — Number prefix suffix `[INS-09811F98]`
- `/tabs/format/plain_text` — Page title `[INS-9436AF76]`
- `/password` — Password `[INS-7CEF6232]`
- `/progress` — Progress `[INS-B137FBBC]`
- `/contact/select` — Select `[INS-3A99FAB3]`
- `/node/add/cd` — Sidebar `[INS-07A95580]`
- `/table` — Table `[INS-320147FE]`
- `/tabledrag` — Tabledrag `[INS-0C9195B3]`
- `/tabs` — Tabs `[INS-4187B41B]`
- `/contact/textform` — Text `[INS-9FD9DC8E]`
- `/contact/presuf_text` — Text prefix suffix `[INS-DBEF2F15]`
- `/contact/textarea` — Textarea `[INS-FE20DC55]`
- `/` — Homepage `[INS-2690B8AD]`
- `/action-link` — Action link demo `[INS-F55E5E49]`
- `/user/login` — User login `[INS-54455CD8]`
- `/user/register` — User register `[INS-A0B84A20]`
- `/user/password` — User password reset `[INS-0FB5430C]`
- `/search/node` — Search results `[INS-BFF08995]`
- `/this-page-does-not-exist` — 404 page `[INS-4C30AF72]`
- `/admin` — Admin dashboard `[INS-15220D5F]`
- `/admin/form_style` — Form style demo `[INS-77B7CC25]`
- `/admin/content` — Content list `[INS-45E69E84]`
- `/node/add/article` — Create article `[INS-5ECB2672]`
- `/node/add/page` — Create basic page `[INS-66B08BD2]`
- `/admin/structure` — Structure `[INS-34306793]`
- `/admin/structure/types` — Content types `[INS-CA6C1B32]`
- `/admin/structure/types/add` — Add content type `[INS-182D1990]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-D232A2E7]`
- `/admin/structure/taxonomy/add` — Add vocabulary `[INS-5729D97E]`
- `/admin/structure/block` — Block layout `[INS-9B6AB5A4]`
- `/admin/appearance` — Appearance `[INS-A1EE9823]`
- `/admin/modules` — Modules `[INS-E5DF6BDA]`
- `/admin/people` — People `[INS-739C65DC]`
- `/user/1/edit` — User edit (uid 1) `[INS-C981DD56]`
- `/admin/config` — Configuration `[INS-7D9DC8FD]`
- `/admin/config/content/formats` — Text formats `[INS-3C2AFAD6]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-4CCC4C25]`
- `/admin/config/system/site-information` — Site information `[INS-59830D86]`
- `/admin/reports` — Reports `[INS-C12FD22B]`
- `/autocomplete` — Autocomplete `[INS-6AA3C0E6]`
- `/buttons` — Buttons `[INS-30829E62]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-F61F0331]`
- `/dialog` — Dialogs `[INS-3E59F47F]`
- `/dropbutton` — Dropbuttons `[INS-24E84E3D]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-DE72496C]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-E2096AB3]`
- `/fieldset` — Fieldset `[INS-47DAB46E]`
- `/contact/imagefile_file` — File `[INS-1FEB49BF]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-39CB9607]`
- `/contact/imagefile_image` — Image `[INS-880C64F1]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name `[INS-BC1131BB]`
- `/message` — Messages `[INS-7F9896C7]`
- `/cd-navigation/config` — Nav config `[INS-BEC10669]`
- `/contact/presuf_number` — Number prefix suffix `[INS-040EFF06]`
- `/tabs/format/plain_text` — Page title `[INS-28DCBF55]`
- `/password` — Password `[INS-3C1FEAC5]`
- `/progress` — Progress `[INS-200BD18B]`
- `/contact/select` — Select `[INS-7FFFF612]`
- `/node/add/cd` — Sidebar `[INS-40CAF54C]`
- `/table` — Table `[INS-65C5C8CA]`
- `/tabledrag` — Tabledrag `[INS-23512FC0]`
- `/tabs` — Tabs `[INS-BE903ED8]`
- `/contact/textform` — Text `[INS-3F3E90AE]`
- `/contact/presuf_text` — Text prefix suffix `[INS-F8689AE6]`
- `/contact/textarea` — Textarea `[INS-43BCD0CC]`
- `/` — Homepage `[INS-0993888E]`
- `/action-link` — Action link demo `[INS-863F9320]`
- `/user/login` — User login `[INS-20B979F2]`
- `/user/register` — User register `[INS-22D6F45A]`
- `/user/password` — User password reset `[INS-10D1E9A8]`
- `/search/node` — Search results `[INS-B515397B]`
- `/this-page-does-not-exist` — 404 page `[INS-BB701055]`
- `/admin` — Admin dashboard `[INS-263BB20C]`
- `/admin/form_style` — Form style demo `[INS-9E835A8A]`
- `/admin/content` — Content list `[INS-44DE7A21]`
- `/node/add/article` — Create article `[INS-031CAA71]`
- `/node/add/page` — Create basic page `[INS-DA30AA9C]`
- `/admin/structure` — Structure `[INS-B750E0E8]`
- `/admin/structure/types` — Content types `[INS-F0633999]`
- `/admin/structure/types/add` — Add content type `[INS-E7441784]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-75399A4F]`
- `/admin/structure/taxonomy/add` — Add vocabulary `[INS-A60F60D7]`
- `/admin/structure/block` — Block layout `[INS-C156CB0D]`
- `/admin/appearance` — Appearance `[INS-52A2EF8C]`
- `/admin/modules` — Modules `[INS-1D4BE875]`
- `/admin/people` — People `[INS-669C0B9F]`
- `/user/1/edit` — User edit (uid 1) `[INS-AD5394B2]`
- `/admin/config` — Configuration `[INS-BD04D6DC]`
- `/admin/config/content/formats` — Text formats `[INS-E5BDA72C]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-4C7B3F8F]`
- `/admin/config/system/site-information` — Site information `[INS-CD2DEFD4]`
- `/admin/reports` — Reports `[INS-3111478E]`
- `/autocomplete` — Autocomplete `[INS-2E877146]`
- `/buttons` — Buttons `[INS-DB80808F]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-C0FBAAA0]`
- `/dialog` — Dialogs `[INS-F688A45F]`
- `/dropbutton` — Dropbuttons `[INS-BBC85F18]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-D4CC5578]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-BE301E18]`
- `/fieldset` — Fieldset `[INS-08B0667E]`
- `/contact/imagefile_file` — File `[INS-DB2F1694]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-8012E963]`
- `/contact/imagefile_image` — Image `[INS-183DDF2C]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name `[INS-DD27C1A0]`
- `/message` — Messages `[INS-1C2FCDF3]`
- `/cd-navigation/config` — Nav config `[INS-5CED69BC]`
- `/contact/presuf_number` — Number prefix suffix `[INS-8B4C5426]`
- `/tabs/format/plain_text` — Page title `[INS-390D8578]`
- `/password` — Password `[INS-C0F6FEA9]`
- `/progress` — Progress `[INS-90DA8061]`
- `/contact/select` — Select `[INS-8F312197]`
- `/node/add/cd` — Sidebar `[INS-1C828F5E]`
- `/table` — Table `[INS-862DA439]`
- `/tabledrag` — Tabledrag `[INS-B33B922C]`
- `/tabs` — Tabs `[INS-537C36D3]`
- `/contact/textform` — Text `[INS-52A9C3A0]`
- `/contact/presuf_text` — Text prefix suffix `[INS-BAEE4C87]`
- `/contact/textarea` — Textarea `[INS-DCFB1114]`
- `/` — Homepage `[INS-96809EF7]`
- `/action-link` — Action link demo `[INS-A11F76F5]`
- `/user/login` — User login `[INS-4459A613]`
- `/user/register` — User register `[INS-033E8395]`
- `/user/password` — User password reset `[INS-D57EB7F5]`
- `/search/node` — Search results `[INS-C1FA5599]`
- `/this-page-does-not-exist` — 404 page `[INS-C6B8CE7D]`
- `/admin` — Admin dashboard `[INS-2721479E]`
- `/admin/form_style` — Form style demo `[INS-29FFDA1D]`
- `/admin/content` — Content list `[INS-3B1FA4CA]`
- `/node/add/article` — Create article `[INS-CD50D0F8]`
- `/node/add/page` — Create basic page `[INS-2FE36901]`
- `/admin/structure` — Structure `[INS-99CC8916]`
- `/admin/structure/types` — Content types `[INS-14E83A98]`
- `/admin/structure/types/add` — Add content type `[INS-F29EE91A]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-DD2192FE]`
- `/admin/structure/taxonomy/add` — Add vocabulary `[INS-A5C094A7]`
- `/admin/structure/block` — Block layout `[INS-96CC8FA3]`
- `/admin/appearance` — Appearance `[INS-861B9B99]`
- `/admin/modules` — Modules `[INS-7788E2E8]`
- `/admin/people` — People `[INS-DBDC5342]`
- `/user/1/edit` — User edit (uid 1) `[INS-E7B71874]`
- `/admin/config` — Configuration `[INS-E53ACE9A]`
- `/admin/config/content/formats` — Text formats `[INS-6BD9A72F]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) `[INS-C35BC8BA]`
- `/admin/config/system/site-information` — Site information `[INS-7B5FAF00]`
- `/admin/reports` — Reports `[INS-98B1969D]`
- `/autocomplete` — Autocomplete `[INS-5C31E773]`
- `/buttons` — Buttons `[INS-B41D5545]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-4C0DEA78]`
- `/dialog` — Dialogs `[INS-0308123A]`
- `/dropbutton` — Dropbuttons `[INS-942A4D5C]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-14B1120F]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-A6A54EDE]`
- `/fieldset` — Fieldset `[INS-C9D2CDF3]`
- `/contact/imagefile_file` — File `[INS-D0F9FB77]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-740B69AC]`
- `/contact/imagefile_image` — Image `[INS-FAF33108]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name `[INS-43CFF9E7]`
- `/message` — Messages `[INS-99807E53]`
- `/cd-navigation/config` — Nav config `[INS-A001DCF2]`
- `/contact/presuf_number` — Number prefix suffix `[INS-86824CDD]`
- `/tabs/format/plain_text` — Page title `[INS-D475C6A9]`
- `/password` — Password `[INS-CBB6B22E]`
- `/progress` — Progress `[INS-40AF5E29]`
- `/contact/select` — Select `[INS-DC4257D0]`
- `/node/add/cd` — Sidebar `[INS-37EE4841]`
- `/table` — Table `[INS-0ED25ABE]`
- `/tabledrag` — Tabledrag `[INS-DBA40A5A]`
- `/tabs` — Tabs `[INS-88C05153]`
- `/contact/textform` — Text `[INS-BC117E3F]`
- `/contact/presuf_text` — Text prefix suffix `[INS-A30B496F]`
- `/contact/textarea` — Textarea `[INS-DA147A99]`
- `/` — Homepage `[INS-F76E79D3]`
- `/action-link` — Action link demo `[INS-A1D3884E]`
- `/user/login` — User login `[INS-7AF62961]`
- `/user/register` — User register `[INS-E2AAC2AD]`
- `/user/password` — User password reset `[INS-7F4AF4E0]`
- `/search/node` — Search results `[INS-6581D32F]`
- `/this-page-does-not-exist` — 404 page `[INS-80EF11FB]`
- `/` — Homepage `[INS-C746C91A]`
- `/action-link` — Action link demo `[INS-9772F54A]`
- `/user/login` — User login `[INS-06D08661]`
- `/user/register` — User register `[INS-EC38BF83]`
- `/user/password` — User password reset `[INS-D01CAB00]`
- `/search/node` — Search results `[INS-FE97E401]`
- `/this-page-does-not-exist` — 404 page `[INS-A1B9C17D]`
- `/` — Homepage `[INS-F2AE5132]`
- `/action-link` — Action link demo `[INS-AB2F9BD3]`
- `/user/login` — User login `[INS-ADE3CB35]`
- `/user/register` — User register `[INS-06FCD8FC]`
- `/user/password` — User password reset `[INS-9A22C592]`
- `/search/node` — Search results `[INS-975C49FC]`
- `/this-page-does-not-exist` — 404 page `[INS-52F44C2B]`

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
| **Frequency** | 226 of 452 pages (50%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin` — Admin dashboard (mobile) `[INS-0FCC0638]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/form_style` — Form style demo (mobile) `[INS-157E95BC]`
- `/admin/content` — Content list (mobile) `[INS-382B4E55]`

<details><summary>Show 223 more affected page(s)</summary>

- `/node/add/article` — Create article (mobile) `[INS-6E711D9D]`
- `/node/add/page` — Create basic page (mobile) `[INS-8A05B723]`
- `/admin/structure` — Structure (mobile) `[INS-7E3FDCA8]`
- `/admin/structure/types` — Content types (mobile) `[INS-4A66CBD5]`
- `/admin/structure/types/add` — Add content type (mobile) `[INS-627F756A]`
- `/admin/structure/taxonomy` — Taxonomy (mobile) `[INS-270539C5]`
- `/admin/structure/taxonomy/add` — Add vocabulary (mobile) `[INS-C59067AC]`
- `/admin/structure/block` — Block layout (mobile) `[INS-804BF721]`
- `/admin/appearance` — Appearance (mobile) `[INS-40A33B28]`
- `/admin/modules` — Modules (mobile) `[INS-0E0972AC]`
- `/admin/people` — People (mobile) `[INS-CCAF95A5]`
- `/user/1/edit` — User edit (uid 1) (mobile) `[INS-ACAA5BC2]`
- `/admin/config` — Configuration (mobile) `[INS-C0B0B3C4]`
- `/admin/config/content/formats` — Text formats (mobile) `[INS-CC27BABE]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) (mobile) `[INS-4F793C52]`
- `/admin/config/system/site-information` — Site information (mobile) `[INS-8FB416DB]`
- `/admin/reports` — Reports (mobile) `[INS-650FBAC4]`
- `/autocomplete` — Autocomplete (mobile) `[INS-A9017357]`
- `/buttons` — Buttons (mobile) `[INS-4E74817B]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-A8F432A1]`
- `/dialog` — Dialogs (mobile) `[INS-B84BD337]`
- `/dropbutton` — Dropbuttons (mobile) `[INS-BD343211]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-8BD38743]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-7A464FBC]`
- `/fieldset` — Fieldset (mobile) `[INS-B3B2EBBD]`
- `/contact/imagefile_file` — File (mobile) `[INS-2E6370F7]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-BD95A810]`
- `/contact/imagefile_image` — Image (mobile) `[INS-10AF4A9F]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name (mobile) `[INS-CFA6F282]`
- `/message` — Messages (mobile) `[INS-37769359]`
- `/cd-navigation/config` — Nav config (mobile) `[INS-138C898E]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-15C322A9]`
- `/tabs/format/plain_text` — Page title (mobile) `[INS-70992287]`
- `/password` — Password (mobile) `[INS-46ACCE67]`
- `/progress` — Progress (mobile) `[INS-BEEDDF89]`
- `/contact/select` — Select (mobile) `[INS-69FF0252]`
- `/node/add/cd` — Sidebar (mobile) `[INS-77282916]`
- `/table` — Table (mobile) `[INS-541ECDBF]`
- `/tabledrag` — Tabledrag (mobile) `[INS-7F4065F7]`
- `/tabs` — Tabs (mobile) `[INS-F786753F]`
- `/contact/textform` — Text (mobile) `[INS-20711224]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-30E0A76B]`
- `/contact/textarea` — Textarea (mobile) `[INS-FE157352]`
- `/` — Homepage (mobile) `[INS-265BD543]`
- `/action-link` — Action link demo (mobile) `[INS-0D4410C5]`
- `/user/login` — User login (mobile) `[INS-5E50EAFE]`
- `/user/register` — User register (mobile) `[INS-7B8D984F]`
- `/user/password` — User password reset (mobile) `[INS-9F287F35]`
- `/search/node` — Search results (mobile) `[INS-58A0EB4D]`
- `/this-page-does-not-exist` — 404 page (mobile) `[INS-B35E9E8B]`
- `/admin` — Admin dashboard (mobile) `[INS-55127120]`
- `/admin/form_style` — Form style demo (mobile) `[INS-21B07627]`
- `/admin/content` — Content list (mobile) `[INS-74A11F70]`
- `/node/add/article` — Create article (mobile) `[INS-F9FE0B7E]`
- `/node/add/page` — Create basic page (mobile) `[INS-C5827878]`
- `/admin/structure` — Structure (mobile) `[INS-788ABAFD]`
- `/admin/structure/types` — Content types (mobile) `[INS-BFCDD139]`
- `/admin/structure/types/add` — Add content type (mobile) `[INS-D9B54E3D]`
- `/admin/structure/taxonomy` — Taxonomy (mobile) `[INS-98829C32]`
- `/admin/structure/taxonomy/add` — Add vocabulary (mobile) `[INS-9BCF585B]`
- `/admin/structure/block` — Block layout (mobile) `[INS-B8BD3937]`
- `/admin/appearance` — Appearance (mobile) `[INS-705B7023]`
- `/admin/modules` — Modules (mobile) `[INS-00C43BCB]`
- `/admin/people` — People (mobile) `[INS-0E51BCCF]`
- `/user/1/edit` — User edit (uid 1) (mobile) `[INS-F0E1F628]`
- `/admin/config` — Configuration (mobile) `[INS-4E0D99BB]`
- `/admin/config/content/formats` — Text formats (mobile) `[INS-1A32DB22]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) (mobile) `[INS-3FF3A0FF]`
- `/admin/config/system/site-information` — Site information (mobile) `[INS-C72602A6]`
- `/admin/reports` — Reports (mobile) `[INS-21E5A733]`
- `/autocomplete` — Autocomplete (mobile) `[INS-0FD5ACB5]`
- `/buttons` — Buttons (mobile) `[INS-5FCC861B]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-9A3E28CA]`
- `/dialog` — Dialogs (mobile) `[INS-B41D7E3A]`
- `/dropbutton` — Dropbuttons (mobile) `[INS-D4630ABD]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-25ABD167]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-EE568B4C]`
- `/fieldset` — Fieldset (mobile) `[INS-9E7D0416]`
- `/contact/imagefile_file` — File (mobile) `[INS-633D98FC]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-053E68EF]`
- `/contact/imagefile_image` — Image (mobile) `[INS-7C058EB1]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name (mobile) `[INS-4440B934]`
- `/message` — Messages (mobile) `[INS-58C8B5F7]`
- `/cd-navigation/config` — Nav config (mobile) `[INS-823343D8]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-6B1CF343]`
- `/tabs/format/plain_text` — Page title (mobile) `[INS-A99AAE7B]`
- `/password` — Password (mobile) `[INS-88C7309D]`
- `/progress` — Progress (mobile) `[INS-FEE5F8E7]`
- `/contact/select` — Select (mobile) `[INS-10DF520B]`
- `/node/add/cd` — Sidebar (mobile) `[INS-10BF8B2F]`
- `/table` — Table (mobile) `[INS-CC43EAC3]`
- `/tabledrag` — Tabledrag (mobile) `[INS-82BF1EF1]`
- `/tabs` — Tabs (mobile) `[INS-97EC5D3E]`
- `/contact/textform` — Text (mobile) `[INS-4AAE74F4]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-7D4155C1]`
- `/contact/textarea` — Textarea (mobile) `[INS-E6139DED]`
- `/` — Homepage (mobile) `[INS-5F7F3FC7]`
- `/action-link` — Action link demo (mobile) `[INS-8DE0BAE6]`
- `/user/login` — User login (mobile) `[INS-F111B0B9]`
- `/user/register` — User register (mobile) `[INS-3B594134]`
- `/user/password` — User password reset (mobile) `[INS-B30D3F83]`
- `/search/node` — Search results (mobile) `[INS-D25A15EF]`
- `/this-page-does-not-exist` — 404 page (mobile) `[INS-53BBDE28]`
- `/admin` — Admin dashboard (mobile) `[INS-15C5FDC7]`
- `/admin/form_style` — Form style demo (mobile) `[INS-23DBFB11]`
- `/admin/content` — Content list (mobile) `[INS-2DBCAE28]`
- `/node/add/article` — Create article (mobile) `[INS-4209F753]`
- `/node/add/page` — Create basic page (mobile) `[INS-06B3B358]`
- `/admin/structure` — Structure (mobile) `[INS-C291D8F6]`
- `/admin/structure/types` — Content types (mobile) `[INS-C2B540E8]`
- `/admin/structure/types/add` — Add content type (mobile) `[INS-04F9CBB6]`
- `/admin/structure/taxonomy` — Taxonomy (mobile) `[INS-826247B2]`
- `/admin/structure/taxonomy/add` — Add vocabulary (mobile) `[INS-B18C3F82]`
- `/admin/structure/block` — Block layout (mobile) `[INS-89D75A52]`
- `/admin/appearance` — Appearance (mobile) `[INS-C34044D1]`
- `/admin/modules` — Modules (mobile) `[INS-52383CF3]`
- `/admin/people` — People (mobile) `[INS-7CB3E61E]`
- `/user/1/edit` — User edit (uid 1) (mobile) `[INS-BF866F20]`
- `/admin/config` — Configuration (mobile) `[INS-602A8594]`
- `/admin/config/content/formats` — Text formats (mobile) `[INS-DB6D1774]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) (mobile) `[INS-EE5576C5]`
- `/admin/config/system/site-information` — Site information (mobile) `[INS-EEAD44D8]`
- `/admin/reports` — Reports (mobile) `[INS-077ECDE3]`
- `/autocomplete` — Autocomplete (mobile) `[INS-1F01FA68]`
- `/buttons` — Buttons (mobile) `[INS-065CF5B5]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-6721AE84]`
- `/dialog` — Dialogs (mobile) `[INS-4F20E4AF]`
- `/dropbutton` — Dropbuttons (mobile) `[INS-9125A4DF]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-4CFDB768]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-6F7E4689]`
- `/fieldset` — Fieldset (mobile) `[INS-06F502D1]`
- `/contact/imagefile_file` — File (mobile) `[INS-ADD5298D]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-F9A7E0CD]`
- `/contact/imagefile_image` — Image (mobile) `[INS-5A82B35E]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name (mobile) `[INS-40A6F023]`
- `/message` — Messages (mobile) `[INS-316B700C]`
- `/cd-navigation/config` — Nav config (mobile) `[INS-BFF3E797]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-049203BC]`
- `/tabs/format/plain_text` — Page title (mobile) `[INS-1FDAB2AD]`
- `/password` — Password (mobile) `[INS-3EEF36B2]`
- `/progress` — Progress (mobile) `[INS-DB049A91]`
- `/contact/select` — Select (mobile) `[INS-68723041]`
- `/node/add/cd` — Sidebar (mobile) `[INS-77119522]`
- `/table` — Table (mobile) `[INS-AE81CC81]`
- `/tabledrag` — Tabledrag (mobile) `[INS-736CC928]`
- `/tabs` — Tabs (mobile) `[INS-CFDD87E0]`
- `/contact/textform` — Text (mobile) `[INS-C6CE006C]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-9C629583]`
- `/contact/textarea` — Textarea (mobile) `[INS-BC739A32]`
- `/` — Homepage (mobile) `[INS-D6205C6B]`
- `/action-link` — Action link demo (mobile) `[INS-0E4EA2E7]`
- `/user/login` — User login (mobile) `[INS-35C1B07A]`
- `/user/register` — User register (mobile) `[INS-8F0E6F1C]`
- `/user/password` — User password reset (mobile) `[INS-E512CFF5]`
- `/search/node` — Search results (mobile) `[INS-4FD81F07]`
- `/this-page-does-not-exist` — 404 page (mobile) `[INS-EAC9C893]`
- `/admin` — Admin dashboard (mobile) `[INS-845E1D0B]`
- `/admin/form_style` — Form style demo (mobile) `[INS-6F512EAC]`
- `/admin/content` — Content list (mobile) `[INS-EF09D480]`
- `/node/add/article` — Create article (mobile) `[INS-02717309]`
- `/node/add/page` — Create basic page (mobile) `[INS-2D714150]`
- `/admin/structure` — Structure (mobile) `[INS-51EBC64D]`
- `/admin/structure/types` — Content types (mobile) `[INS-3293C9D9]`
- `/admin/structure/types/add` — Add content type (mobile) `[INS-21238384]`
- `/admin/structure/taxonomy` — Taxonomy (mobile) `[INS-259A6838]`
- `/admin/structure/taxonomy/add` — Add vocabulary (mobile) `[INS-B442B673]`
- `/admin/structure/block` — Block layout (mobile) `[INS-766AFD63]`
- `/admin/appearance` — Appearance (mobile) `[INS-D612CBF0]`
- `/admin/modules` — Modules (mobile) `[INS-A08CC9BE]`
- `/admin/people` — People (mobile) `[INS-C25E70F4]`
- `/user/1/edit` — User edit (uid 1) (mobile) `[INS-249026CF]`
- `/admin/config` — Configuration (mobile) `[INS-0B868B89]`
- `/admin/config/content/formats` — Text formats (mobile) `[INS-2E868A10]`
- `/admin/config/content/formats/manage/restricted_html` — Text format (restricted) (mobile) `[INS-A470DBF7]`
- `/admin/config/system/site-information` — Site information (mobile) `[INS-1E231807]`
- `/admin/reports` — Reports (mobile) `[INS-9008A595]`
- `/autocomplete` — Autocomplete (mobile) `[INS-9EBCF623]`
- `/buttons` — Buttons (mobile) `[INS-71546E54]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-59DD783F]`
- `/dialog` — Dialogs (mobile) `[INS-14C8CD9B]`
- `/dropbutton` — Dropbuttons (mobile) `[INS-09483EC1]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-D7B56BB2]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-E99C1096]`
- `/fieldset` — Fieldset (mobile) `[INS-42FDEA25]`
- `/contact/imagefile_file` — File (mobile) `[INS-77C8EB30]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-769B03B5]`
- `/contact/imagefile_image` — Image (mobile) `[INS-A08FC55D]`
- `/admin/structure/display-modes/form/add/contact_message` — Machine name (mobile) `[INS-FAFF32AD]`
- `/message` — Messages (mobile) `[INS-DDA46EE6]`
- `/cd-navigation/config` — Nav config (mobile) `[INS-8C480AEE]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-E3FCD9C7]`
- `/tabs/format/plain_text` — Page title (mobile) `[INS-3FE01182]`
- `/password` — Password (mobile) `[INS-25C421FF]`
- `/progress` — Progress (mobile) `[INS-5FFF5803]`
- `/contact/select` — Select (mobile) `[INS-6B680F8A]`
- `/node/add/cd` — Sidebar (mobile) `[INS-F417E620]`
- `/table` — Table (mobile) `[INS-30C15991]`
- `/tabledrag` — Tabledrag (mobile) `[INS-C2CFAEB3]`
- `/tabs` — Tabs (mobile) `[INS-7095ECE9]`
- `/contact/textform` — Text (mobile) `[INS-0FA07862]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-0A32CB19]`
- `/contact/textarea` — Textarea (mobile) `[INS-581DD2A3]`
- `/` — Homepage (mobile) `[INS-8848D38B]`
- `/action-link` — Action link demo (mobile) `[INS-148ACD63]`
- `/user/login` — User login (mobile) `[INS-4E366960]`
- `/user/register` — User register (mobile) `[INS-AC9746BD]`
- `/user/password` — User password reset (mobile) `[INS-438B1B42]`
- `/search/node` — Search results (mobile) `[INS-6D9D19C4]`
- `/this-page-does-not-exist` — 404 page (mobile) `[INS-DE70C53F]`
- `/` — Homepage (mobile) `[INS-7FE39273]`
- `/action-link` — Action link demo (mobile) `[INS-68D9091A]`
- `/user/login` — User login (mobile) `[INS-6B3D03F8]`
- `/user/register` — User register (mobile) `[INS-815F7D2E]`
- `/user/password` — User password reset (mobile) `[INS-F04E383C]`
- `/search/node` — Search results (mobile) `[INS-339A4470]`
- `/this-page-does-not-exist` — 404 page (mobile) `[INS-CD445829]`
- `/` — Homepage (mobile) `[INS-9F86F948]`
- `/action-link` — Action link demo (mobile) `[INS-B3038DF5]`
- `/user/login` — User login (mobile) `[INS-64F2518C]`
- `/user/register` — User register (mobile) `[INS-8FA83F9C]`
- `/user/password` — User password reset (mobile) `[INS-21CD856C]`
- `/search/node` — Search results (mobile) `[INS-97D38F11]`
- `/this-page-does-not-exist` — 404 page (mobile) `[INS-A817E904]`

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
| **Frequency** | 56 of 452 pages (12%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin` — Admin dashboard `[INS-3BBAB2C6]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list `[INS-950ACD94]`
- `/admin/structure/types` — Content types `[INS-8FCBF200]`

<details><summary>Show 53 more affected page(s)</summary>

- `/admin/appearance` — Appearance `[INS-77276CAD]`
- `/admin/modules` — Modules `[INS-FBE57040]`
- `/admin/people` — People `[INS-D9BC44BA]`
- `/buttons` — Buttons `[INS-DDEE158F]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-6EA4562C]`
- `/dropbutton` — Dropbuttons `[INS-0E4ACD1C]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-02C32F01]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-2F3A5029]`
- `/contact/imagefile_file` — File `[INS-8798BECF]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-5EBB5F6B]`
- `/contact/imagefile_image` — Image `[INS-0FA38334]`
- `/message` — Messages `[INS-28360880]`
- `/contact/presuf_number` — Number prefix suffix `[INS-AFA6684F]`
- `/tabs/format/plain_text` — Page title `[INS-09029F94]`
- `/progress` — Progress `[INS-C777A276]`
- `/contact/select` — Select `[INS-624C0920]`
- `/tabledrag` — Tabledrag `[INS-0A5852F5]`
- `/tabs` — Tabs `[INS-C74FB6B2]`
- `/contact/textform` — Text `[INS-3008E05E]`
- `/contact/presuf_text` — Text prefix suffix `[INS-ABB922A9]`
- `/contact/textarea` — Textarea `[INS-AD0BA86B]`
- `/user/login` — User login `[INS-F0EE034F]`
- `/user/password` — User password reset `[INS-CE361338]`
- `/admin` — Admin dashboard `[INS-20178939]`
- `/admin/content` — Content list `[INS-3EE46EC8]`
- `/admin/structure/types` — Content types `[INS-F226BA19]`
- `/admin/appearance` — Appearance `[INS-FAE9EB42]`
- `/admin/modules` — Modules `[INS-232B93E6]`
- `/admin/people` — People `[INS-E401F5AA]`
- `/buttons` — Buttons `[INS-8FD84579]`
- `/contact/checkbox_radio` — Checkboxes and Radios `[INS-A594DF73]`
- `/dropbutton` — Dropbuttons `[INS-E3967837]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-D7A5EF34]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-6FF949F2]`
- `/contact/imagefile_file` — File `[INS-F46E007D]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-6EF82941]`
- `/contact/imagefile_image` — Image `[INS-5DE3E3BF]`
- `/message` — Messages `[INS-7068802B]`
- `/contact/presuf_number` — Number prefix suffix `[INS-8CDE10AF]`
- `/tabs/format/plain_text` — Page title `[INS-D08A8ACA]`
- `/progress` — Progress `[INS-E00631BD]`
- `/contact/select` — Select `[INS-768A05DA]`
- `/tabledrag` — Tabledrag `[INS-E603039A]`
- `/tabs` — Tabs `[INS-DEC3B9D1]`
- `/contact/textform` — Text `[INS-D550814C]`
- `/contact/presuf_text` — Text prefix suffix `[INS-FFFA6490]`
- `/contact/textarea` — Textarea `[INS-30BF9497]`
- `/user/login` — User login `[INS-9AE21BB9]`
- `/user/password` — User password reset `[INS-E78D425D]`
- `/user/login` — User login `[INS-E9048992]`
- `/user/password` — User password reset `[INS-D7081325]`
- `/user/login` — User login `[INS-45F53F1D]`
- `/user/password` — User password reset `[INS-DA3B2713]`

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
| **Frequency** | 56 of 452 pages (12%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin` — Admin dashboard (mobile) `[INS-96D9CA22]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list (mobile) `[INS-0EDC4521]`
- `/admin/structure/types` — Content types (mobile) `[INS-E40F0DC8]`

<details><summary>Show 53 more affected page(s)</summary>

- `/admin/appearance` — Appearance (mobile) `[INS-FBBEFEB3]`
- `/admin/modules` — Modules (mobile) `[INS-48D19F62]`
- `/admin/people` — People (mobile) `[INS-BF533E0C]`
- `/buttons` — Buttons (mobile) `[INS-9309EEFA]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-1ED10A5F]`
- `/dropbutton` — Dropbuttons (mobile) `[INS-B6129E84]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-48766208]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-BA1666BF]`
- `/contact/imagefile_file` — File (mobile) `[INS-078C60AA]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-DE23D587]`
- `/contact/imagefile_image` — Image (mobile) `[INS-4B385B7F]`
- `/message` — Messages (mobile) `[INS-E86F2510]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-A9F3E007]`
- `/tabs/format/plain_text` — Page title (mobile) `[INS-6C8057E1]`
- `/progress` — Progress (mobile) `[INS-62F5F8AA]`
- `/contact/select` — Select (mobile) `[INS-837A6CD6]`
- `/tabledrag` — Tabledrag (mobile) `[INS-809E0154]`
- `/tabs` — Tabs (mobile) `[INS-23378991]`
- `/contact/textform` — Text (mobile) `[INS-F3488CA4]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-707C9C0B]`
- `/contact/textarea` — Textarea (mobile) `[INS-E348CA9C]`
- `/user/login` — User login (mobile) `[INS-7AAA0CB3]`
- `/user/password` — User password reset (mobile) `[INS-0B23E3A2]`
- `/admin` — Admin dashboard (mobile) `[INS-E80C1A76]`
- `/admin/content` — Content list (mobile) `[INS-74E63DBC]`
- `/admin/structure/types` — Content types (mobile) `[INS-53984034]`
- `/admin/appearance` — Appearance (mobile) `[INS-3A41BCBD]`
- `/admin/modules` — Modules (mobile) `[INS-35EAD5F9]`
- `/admin/people` — People (mobile) `[INS-C7406A0B]`
- `/buttons` — Buttons (mobile) `[INS-C4C441BC]`
- `/contact/checkbox_radio` — Checkboxes and Radios (mobile) `[INS-60AE065C]`
- `/dropbutton` — Dropbuttons (mobile) `[INS-AC53EBE5]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-0A7E406D]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-AEB24480]`
- `/contact/imagefile_file` — File (mobile) `[INS-400A2451]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-32CDCD0A]`
- `/contact/imagefile_image` — Image (mobile) `[INS-082807AC]`
- `/message` — Messages (mobile) `[INS-05E6ECE0]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-DE542852]`
- `/tabs/format/plain_text` — Page title (mobile) `[INS-7FD1B0F8]`
- `/progress` — Progress (mobile) `[INS-25F5A76D]`
- `/contact/select` — Select (mobile) `[INS-EE4B7001]`
- `/tabledrag` — Tabledrag (mobile) `[INS-1953F52C]`
- `/tabs` — Tabs (mobile) `[INS-D1E16FCC]`
- `/contact/textform` — Text (mobile) `[INS-A87AC754]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-C7B94E96]`
- `/contact/textarea` — Textarea (mobile) `[INS-2AFE02BB]`
- `/user/login` — User login (mobile) `[INS-1377025E]`
- `/user/password` — User password reset (mobile) `[INS-E4384635]`
- `/user/login` — User login (mobile) `[INS-760179AB]`
- `/user/password` — User password reset (mobile) `[INS-14F010AD]`
- `/user/login` — User login (mobile) `[INS-A6EB069D]`
- `/user/password` — User password reset (mobile) `[INS-4A213DA5]`

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

### 99. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-099` |
| **Pattern ID** | `DRU-C00D2E42` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 14 of 452 pages (3%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/admin/appearance` — Appearance `[INS-EE50684E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/modules` — Modules `[INS-9A564EA2]`
- `/admin/people` — People `[INS-A51D77A6]`

<details><summary>Show 11 more affected page(s)</summary>

- `/admin/config` — Configuration `[INS-AB85EA54]`
- `/admin/appearance` — Appearance `[INS-7E9D4914]`
- `/admin/modules` — Modules `[INS-57EEBAD2]`
- `/admin/people` — People `[INS-E97B8791]`
- `/admin/config` — Configuration `[INS-11269DCF]`
- `/admin/appearance` — Appearance `[INS-5D0A166F]`
- `/admin/modules` — Modules `[INS-7CE10240]`
- `/admin/config` — Configuration `[INS-701402B0]`
- `/admin/appearance` — Appearance `[INS-3D92C72F]`
- `/admin/modules` — Modules `[INS-CCAB0E5B]`
- `/admin/config` — Configuration `[INS-2169981E]`

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

### 100. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-100` |
| **Pattern ID** | `DRU-668DAAF4` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-contentinfo-is-top-level`](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 14 of 452 pages (3%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/admin/appearance` — Appearance (mobile) `[INS-A40531A2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/modules` — Modules (mobile) `[INS-2C8C94B8]`
- `/admin/people` — People (mobile) `[INS-572BE13F]`

<details><summary>Show 11 more affected page(s)</summary>

- `/admin/config` — Configuration (mobile) `[INS-F7C8B918]`
- `/admin/appearance` — Appearance (mobile) `[INS-A939F5CB]`
- `/admin/modules` — Modules (mobile) `[INS-FEF9F3B8]`
- `/admin/people` — People (mobile) `[INS-BB90BB0C]`
- `/admin/config` — Configuration (mobile) `[INS-474E7492]`
- `/admin/appearance` — Appearance (mobile) `[INS-51F20347]`
- `/admin/modules` — Modules (mobile) `[INS-6CF00BA1]`
- `/admin/config` — Configuration (mobile) `[INS-F1FD2CA0]`
- `/admin/appearance` — Appearance (mobile) `[INS-D46CD234]`
- `/admin/modules` — Modules (mobile) `[INS-80C74FA7]`
- `/admin/config` — Configuration (mobile) `[INS-11811A4C]`

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

### 101. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-101` |
| **Pattern ID** | `DRU-29F2A975` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 10 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-AFF20461]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types` — Content types `[INS-E9EB9CC0]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-C831E07C]`

<details><summary>Show 7 more affected page(s)</summary>

- `/admin/people` — People `[INS-6A3C828A]`
- `/admin/config/content/formats` — Text formats `[INS-FDBA2F2B]`
- `/admin/content` — Content list `[INS-67DCACA3]`
- `/admin/structure/types` — Content types `[INS-78501F57]`
- `/admin/structure/taxonomy` — Taxonomy `[INS-AE384450]`
- `/admin/people` — People `[INS-3C3947E4]`
- `/admin/config/content/formats` — Text formats `[INS-6CFD4399]`

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

### 102. region: Ensure all page content is contained by landmarks 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-102` |
| **Pattern ID** | `DRU-4A60EF0A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 10 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list (mobile) `[INS-A082AA1B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types` — Content types (mobile) `[INS-C9CDF1E0]`
- `/admin/structure/taxonomy` — Taxonomy (mobile) `[INS-D656B5E8]`

<details><summary>Show 7 more affected page(s)</summary>

- `/admin/people` — People (mobile) `[INS-2224C063]`
- `/admin/config/content/formats` — Text formats (mobile) `[INS-0A312545]`
- `/admin/content` — Content list (mobile) `[INS-32C7C1FB]`
- `/admin/structure/types` — Content types (mobile) `[INS-F21332F7]`
- `/admin/structure/taxonomy` — Taxonomy (mobile) `[INS-FFAC61F9]`
- `/admin/people` — People (mobile) `[INS-DDB27F0E]`
- `/admin/config/content/formats` — Text formats (mobile) `[INS-12FB8B8C]`

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
| **Frequency** | 6 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout `[INS-9C832732]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-26CF8423]`
- `/tabs` — Tabs `[INS-31FE6AFA]`

<details><summary>Show 3 more affected page(s)</summary>

- `/admin/structure/block` — Block layout `[INS-55FFED48]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI `[INS-9A546115]`
- `/tabs` — Tabs `[INS-388C0660]`

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
| **Frequency** | 6 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/menu-local-tasks.html.twig, core/themes/olivero/templates/navigation/menu-local-tasks.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318396 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/structure/block` — Block layout (mobile) `[INS-EE9CFE68]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-2B4055F1]`
- `/tabs` — Tabs (mobile) `[INS-B419606B]`

<details><summary>Show 3 more affected page(s)</summary>

- `/admin/structure/block` — Block layout (mobile) `[INS-BC82440D]`
- `/admin/structure/types/manage/test_type/display/default` — Field UI (mobile) `[INS-2406ED47]`
- `/tabs` — Tabs (mobile) `[INS-248E178F]`

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

### 105. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-105` |
| **Pattern ID** | `DRU-D87CB13C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list `[INS-1AAD7200]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list `[INS-AE39AB17]`
- `/admin/content` — Content list `[INS-A87BB679]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/content` — Content list `[INS-890AB9B4]`

</details>

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

### 106. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-106` |
| **Pattern ID** | `DRU-E21B9679` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/content` — Content list (mobile) `[INS-A5E9F7D3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/content` — Content list (mobile) `[INS-F82B268A]`
- `/admin/content` — Content list (mobile) `[INS-A96DBFD5]`

<details><summary>Show 1 more affected page(s)</summary>

- `/admin/content` — Content list (mobile) `[INS-A8E41300]`

</details>

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

### 107. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-107` |
| **Pattern ID** | `DRU-B9B0B039` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/autocomplete` — Autocomplete `[INS-13B33F63]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/autocomplete` — Autocomplete `[INS-628E5D83]`
- `/autocomplete` — Autocomplete `[INS-267D2712]`

<details><summary>Show 1 more affected page(s)</summary>

- `/autocomplete` — Autocomplete `[INS-DBBD4423]`

</details>

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

### 108. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-108` |
| **Pattern ID** | `DRU-FA8C25AB` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/autocomplete` — Autocomplete (mobile) `[INS-F06380B1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/autocomplete` — Autocomplete (mobile) `[INS-8341AD8E]`
- `/autocomplete` — Autocomplete (mobile) `[INS-8C2132CC]`

<details><summary>Show 1 more affected page(s)</summary>

- `/autocomplete` — Autocomplete (mobile) `[INS-A24D7457]`

</details>

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

### 109. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-109` |
| **Pattern ID** | `DRU-F5FD6EDF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-DA563563]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality `[INS-D191C276]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-DE7B05EB]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality `[INS-1762288A]`

</details>

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

### 110. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-110` |
| **Pattern ID** | `DRU-8559566B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-EB1A02B4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-82AFA8AA]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-8E09928E]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-D4151496]`

</details>

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

### 111. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-111` |
| **Pattern ID** | `DRU-CCABA040` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-8C6A85F1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-DF3F21E0]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-153C3B2B]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-230D6ABD]`

</details>

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

### 112. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-112` |
| **Pattern ID** | `DRU-C6CEE87C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-D9BC46B4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-D4603199]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-01DACC3F]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-5B38E5AD]`

</details>

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

### 113. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-113` |
| **Pattern ID** | `DRU-860BF298` *(stable hash — use to track regressions)* |
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
- `/message` — Messages `[INS-09B53B4A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages `[INS-36A23AD5]`
- `/message` — Messages `[INS-CA677D48]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages `[INS-21B39D10]`

</details>

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

### 114. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-114` |
| **Pattern ID** | `DRU-97B8237F` *(stable hash — use to track regressions)* |
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
- `/message` — Messages `[INS-4149419B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages `[INS-51378BD7]`
- `/message` — Messages `[INS-4636B82A]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages `[INS-F8720064]`

</details>

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

### 115. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-115` |
| **Pattern ID** | `DRU-5AA049DF` *(stable hash — use to track regressions)* |
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
- `/message` — Messages `[INS-23FF663B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages `[INS-587F19BA]`
- `/message` — Messages `[INS-3B4F4299]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages `[INS-96494DBF]`

</details>

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

### 116. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-116` |
| **Pattern ID** | `DRU-DC7ECF8A` *(stable hash — use to track regressions)* |
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
- `/message` — Messages `[INS-C76FEAA5]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages `[INS-3F29C136]`
- `/message` — Messages `[INS-3C1A2C18]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages `[INS-24B57FB4]`

</details>

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

### 117. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-117` |
| **Pattern ID** | `DRU-49FF0418` *(stable hash — use to track regressions)* |
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
- `/message` — Messages `[INS-5F28C348]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages `[INS-A1B01DD9]`
- `/message` — Messages `[INS-3DC8651F]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages `[INS-F7A095F6]`

</details>

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

### 118. Status messages block uses role="contentinfo", duplicating the page &lt;footer&gt; 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-118` |
| **Pattern ID** | `DRU-AC4DC5D3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-no-duplicate-contentinfo`](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/misc/status-messages.html.twig, core/modules/system/templates/status-messages.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/message` — Messages `[INS-F0C95C64]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages `[INS-D03A7AA1]`
- `/message` — Messages `[INS-C288699B]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages `[INS-4B1C4F63]`

</details>

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

### 119. landmark-unique: Ensure landmarks are unique 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-119` |
| **Pattern ID** | `DRU-BEF75404` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-unique`](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages `[INS-E54DC981]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages `[INS-2DAA1453]`
- `/message` — Messages `[INS-CEDD41D8]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages `[INS-A0A39FF0]`

</details>

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

### 120. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-120` |
| **Pattern ID** | `DRU-E0134841` *(stable hash — use to track regressions)* |
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
- `/message` — Messages (mobile) `[INS-E8EC088A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-E35D14CD]`
- `/message` — Messages (mobile) `[INS-6B677703]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages (mobile) `[INS-AF4F4DE8]`

</details>

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

### 121. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-121` |
| **Pattern ID** | `DRU-FE76AAF8` *(stable hash — use to track regressions)* |
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
- `/message` — Messages (mobile) `[INS-26E375CE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-20B388AB]`
- `/message` — Messages (mobile) `[INS-4DBABAD6]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages (mobile) `[INS-37C81913]`

</details>

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

### 122. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-122` |
| **Pattern ID** | `DRU-DEF47113` *(stable hash — use to track regressions)* |
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
- `/message` — Messages (mobile) `[INS-9BBE3C8B]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-78C5EAA4]`
- `/message` — Messages (mobile) `[INS-77F546BB]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages (mobile) `[INS-9DB78FA5]`

</details>

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

### 123. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-123` |
| **Pattern ID** | `DRU-9EBC8AE4` *(stable hash — use to track regressions)* |
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
- `/message` — Messages (mobile) `[INS-47B49278]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-4FB37CB4]`
- `/message` — Messages (mobile) `[INS-C2BFA350]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages (mobile) `[INS-6C5B8CDE]`

</details>

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

### 124. landmark-contentinfo-is-top-level: Ensure the contentinfo landmark is at top level 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-124` |
| **Pattern ID** | `DRU-6E58C144` *(stable hash — use to track regressions)* |
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
- `/message` — Messages (mobile) `[INS-08CC2874]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-C54BE01E]`
- `/message` — Messages (mobile) `[INS-5F767323]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages (mobile) `[INS-F7CAF0AE]`

</details>

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

### 125. Status messages block uses role="contentinfo", duplicating the page &lt;footer&gt; 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-125` |
| **Pattern ID** | `DRU-4220BD7B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-no-duplicate-contentinfo`](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/claro/templates/misc/status-messages.html.twig, core/modules/system/templates/status-messages.html.twig |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/message` — Messages (mobile) `[INS-A1689D63]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-0EBC1CB3]`
- `/message` — Messages (mobile) `[INS-6B0F7DA0]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages (mobile) `[INS-F8CAED40]`

</details>

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

### 126. landmark-unique: Ensure landmarks are unique 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-126` |
| **Pattern ID** | `DRU-42B07BDF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`landmark-unique`](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/message` — Messages (mobile) `[INS-761DC233]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/message` — Messages (mobile) `[INS-C74B7614]`
- `/message` — Messages (mobile) `[INS-911191CF]`

<details><summary>Show 1 more affected page(s)</summary>

- `/message` — Messages (mobile) `[INS-4502B404]`

</details>

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

### 127. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-127` |
| **Pattern ID** | `DRU-DF35BDC8` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-5EF87193]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix `[INS-E62AC382]`
- `/contact/presuf_number` — Number prefix suffix `[INS-E8A02D36]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_number` — Number prefix suffix `[INS-354A9041]`

</details>

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

### 128. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-128` |
| **Pattern ID** | `DRU-0F0BE7BF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-B125CA74]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-2CB33184]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-B2F93454]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-C6E568D1]`

</details>

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

### 129. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-129` |
| **Pattern ID** | `DRU-8E7417E8` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-EA777DD6]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix `[INS-55D9E368]`
- `/contact/presuf_text` — Text prefix suffix `[INS-5F2A6BB1]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_text` — Text prefix suffix `[INS-D156A539]`

</details>

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

### 130. heading-order: Ensure the order of headings is semantically correct 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-130` |
| **Pattern ID** | `DRU-4276823B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-7D7714E4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-50F9C9DC]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-93F51DAF]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-B7B57214]`

</details>

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

### 131. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-131` |
| **Pattern ID** | `DRU-5F06D518` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-2196BDBD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/form_style` — Form style demo `[INS-458116F9]`

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

### 132. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-132` |
| **Pattern ID** | `DRU-80C00FA4` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo (mobile) `[INS-E9E6B9AC]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/form_style` — Form style demo (mobile) `[INS-FE4276E2]`

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

### 133. region: Ensure all page content is contained by landmarks 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-133` |
| **Pattern ID** | `DRU-3A6B5B95` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `toolbar (admin theme)` — Admin toolbar |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/user/1/edit` — User edit (uid 1) `[INS-03B89351]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/user/1/edit` — User edit (uid 1) `[INS-3F350BFE]`

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

### 134. region: Ensure all page content is contained by landmarks 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-134` |
| **Pattern ID** | `DRU-F0F4271B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`region`](https://dequeuniversity.com/rules/axe/4.11/region?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/136.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `toolbar (admin theme)` — Admin toolbar |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/user/1/edit` — User edit (uid 1) (mobile) `[INS-419215BA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/user/1/edit` — User edit (uid 1) (mobile) `[INS-A84D010D]`

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

### 135. Admin Configuration page has heading-order violations (h3 appears before h2) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-135` |
| **Pattern ID** | `DRU-6402BE1E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/cd-navigation/config` — Nav config `[INS-F777592A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/cd-navigation/config` — Nav config `[INS-E827F334]`

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

### 136. Admin Configuration page has heading-order violations (h3 appears before h2) 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-136` |
| **Pattern ID** | `DRU-BCC383CA` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/cd-navigation/config` — Nav config (mobile) `[INS-2DE9D29F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/cd-navigation/config` — Nav config (mobile) `[INS-060F4F3E]`

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

### 137. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-137` |
| **Pattern ID** | `DRU-4109944F` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | desktop |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/textform` — Text `[INS-DB600AC5]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/textform` — Text `[INS-00483828]`

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

### 138. heading-order: Ensure the order of headings is semantically correct 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-138` |
| **Pattern ID** | `DRU-B45E915A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`heading-order`](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright) |
| **Impact** | **moderate** |
| **Screen** | mobile |
| **WCAG SC** | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/131.html) (Level A) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/textform` — Text (mobile) `[INS-C8A1724E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/textform` — Text (mobile) `[INS-A05EF3E3]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo `[INS-F573456C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/form_style` — Form style demo `[INS-8242CEF7]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/admin/form_style` — Form style demo (mobile) `[INS-6BA64A0A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/admin/form_style` — Form style demo (mobile) `[INS-9F64765C]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/cd-navigation/config` — Nav config `[INS-478D1A68]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/cd-navigation/config` — Nav config `[INS-B669D04C]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/modules/system/templates/system-admin-index.html.twig, core/themes/claro/templates (panel/section templates) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/3318398 |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/cd-navigation/config` — Nav config (mobile) `[INS-5220BFFD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/cd-navigation/config` — Nav config (mobile) `[INS-FC18BF68]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/textform` — Text `[INS-DB07266A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/textform` — Text `[INS-BD32A536]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `form-element.html.twig` — Form element template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/contact/textform` — Text (mobile) `[INS-8470F167]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/textform` — Text (mobile) `[INS-8642D4E7]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage `[INS-871A06ED]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/` — Homepage `[INS-8E7325F5]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | core/themes/olivero/templates/layout/page--front.html.twig, Site configuration (site name / front page node) |
| **Drupal issue** | https://www.drupal.org/project/drupal/issues/new |
| **Affected users** | blind, low-vision |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-141D1455]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/` — Homepage (mobile) `[INS-26335624]`

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

### 147. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-147` |
| **Pattern ID** | `DRU-B0DFDE0B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 8 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-BFBE5388]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-E76DDC7E]`
- `/dialog` — Dialogs `[INS-CEA1052B]`

<details><summary>Show 5 more affected page(s)</summary>

- `/tabs` — Tabs `[INS-39916635]`
- `/dialog` — Dialogs `[INS-49AC11EB]`
- `/tabs` — Tabs `[INS-14A2CF8A]`
- `/dialog` — Dialogs `[INS-B151A785]`
- `/tabs` — Tabs `[INS-89354EC7]`

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

### 148. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-148` |
| **Pattern ID** | `DRU-F3CC681C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 8 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-4E65D158]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-DCEF9243]`
- `/dialog` — Dialogs `[INS-0BEBCE22]`

<details><summary>Show 5 more affected page(s)</summary>

- `/tabs` — Tabs `[INS-A34F603E]`
- `/dialog` — Dialogs `[INS-88785623]`
- `/tabs` — Tabs `[INS-1C52E78C]`
- `/dialog` — Dialogs `[INS-5E6592E5]`
- `/tabs` — Tabs `[INS-31D34442]`

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

### 149. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-149` |
| **Pattern ID** | `DRU-8F1B594E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 8 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-C876C5B4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-B975D3E3]`
- `/dialog` — Dialogs `[INS-681E217B]`

<details><summary>Show 5 more affected page(s)</summary>

- `/tabs` — Tabs `[INS-E443A15B]`
- `/dialog` — Dialogs `[INS-21B0D288]`
- `/tabs` — Tabs `[INS-CE0BC204]`
- `/dialog` — Dialogs `[INS-2E5919C8]`
- `/tabs` — Tabs `[INS-D0BF55EC]`

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

### 150. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-150` |
| **Pattern ID** | `DRU-61489B02` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 8 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-7B715E14]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-6D8A3975]`
- `/dialog` — Dialogs `[INS-9C283077]`

<details><summary>Show 5 more affected page(s)</summary>

- `/tabs` — Tabs `[INS-6CF8B238]`
- `/dialog` — Dialogs `[INS-ED656FE0]`
- `/tabs` — Tabs `[INS-BE9B1D37]`
- `/dialog` — Dialogs `[INS-82469F1A]`
- `/tabs` — Tabs `[INS-AFB08E11]`

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

### 151. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-151` |
| **Pattern ID** | `DRU-E2177E9D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 8 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-07E16441]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-93B82529]`
- `/dialog` — Dialogs (mobile) `[INS-E170E1D3]`

<details><summary>Show 5 more affected page(s)</summary>

- `/tabs` — Tabs (mobile) `[INS-AD564346]`
- `/dialog` — Dialogs (mobile) `[INS-C42D543E]`
- `/tabs` — Tabs (mobile) `[INS-87CFC00B]`
- `/dialog` — Dialogs (mobile) `[INS-DC4D2CE1]`
- `/tabs` — Tabs (mobile) `[INS-DB4CC9E6]`

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

### 152. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-152` |
| **Pattern ID** | `DRU-F3C5401B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 8 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-A02DCBDA]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-F2082367]`
- `/dialog` — Dialogs (mobile) `[INS-812F74A4]`

<details><summary>Show 5 more affected page(s)</summary>

- `/tabs` — Tabs (mobile) `[INS-AD576AC0]`
- `/dialog` — Dialogs (mobile) `[INS-AB439322]`
- `/tabs` — Tabs (mobile) `[INS-9E3D318D]`
- `/dialog` — Dialogs (mobile) `[INS-7103DB35]`
- `/tabs` — Tabs (mobile) `[INS-8C62D6A4]`

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

### 153. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-153` |
| **Pattern ID** | `DRU-A5DF38E7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 8 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-AA6C3AB8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-9F183480]`
- `/dialog` — Dialogs (mobile) `[INS-39294B03]`

<details><summary>Show 5 more affected page(s)</summary>

- `/tabs` — Tabs (mobile) `[INS-FC57CAAF]`
- `/dialog` — Dialogs (mobile) `[INS-570853A6]`
- `/tabs` — Tabs (mobile) `[INS-AC2D821C]`
- `/dialog` — Dialogs (mobile) `[INS-596FA0C0]`
- `/tabs` — Tabs (mobile) `[INS-21784141]`

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

### 154. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-154` |
| **Pattern ID** | `DRU-A06CCFAC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 8 of 452 pages (2%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-8705FF7D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-A9D3E838]`
- `/dialog` — Dialogs (mobile) `[INS-D950F875]`

<details><summary>Show 5 more affected page(s)</summary>

- `/tabs` — Tabs (mobile) `[INS-4E556F40]`
- `/dialog` — Dialogs (mobile) `[INS-3C1FD5B6]`
- `/tabs` — Tabs (mobile) `[INS-15A32F83]`
- `/dialog` — Dialogs (mobile) `[INS-EF90943E]`
- `/tabs` — Tabs (mobile) `[INS-CF2565C9]`

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

### 155. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-155` |
| **Pattern ID** | `DRU-91E9D7B3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/autocomplete` — Autocomplete `[INS-3E51B9DF]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/autocomplete` — Autocomplete `[INS-CD3354D0]`
- `/autocomplete` — Autocomplete `[INS-B6415EAC]`

<details><summary>Show 1 more affected page(s)</summary>

- `/autocomplete` — Autocomplete `[INS-D6B40690]`

</details>

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

### 156. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-156` |
| **Pattern ID** | `DRU-B723ABA5` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/autocomplete` — Autocomplete (mobile) `[INS-32B0F086]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/autocomplete` — Autocomplete (mobile) `[INS-D23B7461]`
- `/autocomplete` — Autocomplete (mobile) `[INS-3C90B41F]`

<details><summary>Show 1 more affected page(s)</summary>

- `/autocomplete` — Autocomplete (mobile) `[INS-E89D7564]`

</details>

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

### 157. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-157` |
| **Pattern ID** | `DRU-B919231C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-9234BE13]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/dialog` — Dialogs `[INS-EB9DE609]`
- `/dialog` — Dialogs `[INS-BC2AACAB]`

<details><summary>Show 1 more affected page(s)</summary>

- `/dialog` — Dialogs `[INS-4B4D3BA5]`

</details>

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

### 158. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-158` |
| **Pattern ID** | `DRU-1BC9286C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs `[INS-5E9DE570]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/dialog` — Dialogs `[INS-D0A12B1C]`
- `/dialog` — Dialogs `[INS-4868C7CD]`

<details><summary>Show 1 more affected page(s)</summary>

- `/dialog` — Dialogs `[INS-1503D96F]`

</details>

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

### 159. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-159` |
| **Pattern ID** | `DRU-DEB9EAFC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-6C173484]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/dialog` — Dialogs (mobile) `[INS-ADE73D07]`
- `/dialog` — Dialogs (mobile) `[INS-CA83C8D4]`

<details><summary>Show 1 more affected page(s)</summary>

- `/dialog` — Dialogs (mobile) `[INS-AB9D9330]`

</details>

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

### 160. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-160` |
| **Pattern ID** | `DRU-1DD2C1D7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/dialog` — Dialogs (mobile) `[INS-06560C1F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/dialog` — Dialogs (mobile) `[INS-CD08E0AE]`
- `/dialog` — Dialogs (mobile) `[INS-B7AA58F7]`

<details><summary>Show 1 more affected page(s)</summary>

- `/dialog` — Dialogs (mobile) `[INS-EFCCEA71]`

</details>

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

### 161. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-161` |
| **Pattern ID** | `DRU-C4407003` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-F41F5B1A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality `[INS-8FC49FEA]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-5EAA17AF]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality `[INS-6C296CB3]`

</details>

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

### 162. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-162` |
| **Pattern ID** | `DRU-41877E07` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-E9BD7EBE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality `[INS-E7DF5D05]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-F2FF95BE]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality `[INS-07C96ACD]`

</details>

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

### 163. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-163` |
| **Pattern ID** | `DRU-0B43126A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-4664EDC8]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality `[INS-834EB467]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-10738FCC]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality `[INS-B7D5F7F6]`

</details>

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

### 164. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-164` |
| **Pattern ID** | `DRU-CB4F3AEA` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-9DDF9306]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality `[INS-BD1AE82A]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-6E540781]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality `[INS-BD75C0FC]`

</details>

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

### 165. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-165` |
| **Pattern ID** | `DRU-B5EA9FA7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-398A9A11]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality `[INS-0C3D6A01]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-A7E41560]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality `[INS-176218EE]`

</details>

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

### 166. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-166` |
| **Pattern ID** | `DRU-0E527276` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-2429BC5A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality `[INS-093D8853]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-968D9EB5]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality `[INS-3B69D2E6]`

</details>

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

### 167. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-167` |
| **Pattern ID** | `DRU-E9E19F4B` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-A3930051]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality `[INS-59E0ECFD]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-82A7B449]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality `[INS-FB464AAF]`

</details>

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

### 168. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-168` |
| **Pattern ID** | `DRU-543937BC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality `[INS-A00A7F66]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality `[INS-488D678C]`
- `/contact/field_cardinality_test` — Field Cardinality `[INS-10F3C5EC]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality `[INS-FD0B0161]`

</details>

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

### 169. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-169` |
| **Pattern ID** | `DRU-8E260E93` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-38BCC0BE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-154A40C5]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-75576BBB]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-38137959]`

</details>

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

### 170. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-170` |
| **Pattern ID** | `DRU-683AABB1` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-0CD47EE9]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-CDAD7CE1]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-AF926175]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-841758A2]`

</details>

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

### 171. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-171` |
| **Pattern ID** | `DRU-C598E800` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-E79DD83C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-BC52715F]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-A61A0A7A]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-DD70E098]`

</details>

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

### 172. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-172` |
| **Pattern ID** | `DRU-2B7C41C0` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-0EE19873]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-E4BE230E]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-930AEAA3]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-117603C1]`

</details>

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

### 173. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-173` |
| **Pattern ID** | `DRU-B4B049F7` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-E2BB77D2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-AF629231]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-FF62C210]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-1B03467F]`

</details>

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

### 174. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-174` |
| **Pattern ID** | `DRU-2A526024` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-4776FF29]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-628D796D]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-195C7B5E]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-FFF6BD11]`

</details>

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

### 175. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-175` |
| **Pattern ID** | `DRU-A0E7A120` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-74196515]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-FD557626]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-FF596575]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-480CFFB4]`

</details>

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

### 176. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-176` |
| **Pattern ID** | `DRU-74E56272` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-0474DEA1]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-2B6A63D8]`
- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-AB5BE597]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/field_cardinality_test` — Field Cardinality (mobile) `[INS-3FED6B4F]`

</details>

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

### 177. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-177` |
| **Pattern ID** | `DRU-1EC10798` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-D59CF933]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-DA182E56]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-98A15A9A]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-8902C0FA]`

</details>

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

### 178. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-178` |
| **Pattern ID** | `DRU-B07AC371` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-C1718213]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-66A77660]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-D2D3EEDD]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-1D921610]`

</details>

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

### 179. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-179` |
| **Pattern ID** | `DRU-14DE3E53` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-5FAE82F6]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-EDCC29E4]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-72B4419E]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-DB5AB9B7]`

</details>

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

### 180. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-180` |
| **Pattern ID** | `DRU-876EF858` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-2D107ADD]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-63F15E1C]`
- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-3FB583D7]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_formatted` — Formatted text prefix suffix `[INS-0B65870D]`

</details>

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

### 181. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-181` |
| **Pattern ID** | `DRU-453BBA14` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-B8726DB4]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-88B3D287]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-DEE984DC]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-763D3CCA]`

</details>

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

### 182. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-182` |
| **Pattern ID** | `DRU-3CB2125D` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-B80A9381]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-0A539B19]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-EEC47C33]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-E7FB2779]`

</details>

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

### 183. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-183` |
| **Pattern ID** | `DRU-41086634` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-1A030F33]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-DB891A37]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-DF8CF7C3]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-86D045F2]`

</details>

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

### 184. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-184` |
| **Pattern ID** | `DRU-F76B1638` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-859ABFFE]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-C1AB9076]`
- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-763DA97E]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_formatted` — Formatted text prefix suffix (mobile) `[INS-550841A2]`

</details>

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

### 185. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-185` |
| **Pattern ID** | `DRU-2162B464` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-66358C48]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix `[INS-8B413079]`
- `/contact/presuf_number` — Number prefix suffix `[INS-267A05E7]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_number` — Number prefix suffix `[INS-5A42536A]`

</details>

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

### 186. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-186` |
| **Pattern ID** | `DRU-92E64EFC` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-24FA014A]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix `[INS-0B4167B9]`
- `/contact/presuf_number` — Number prefix suffix `[INS-EAA40A8E]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_number` — Number prefix suffix `[INS-646FD7E4]`

</details>

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

### 187. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-187` |
| **Pattern ID** | `DRU-3BE0F134` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-9ABC854E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix `[INS-92E3078C]`
- `/contact/presuf_number` — Number prefix suffix `[INS-0C971BD5]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_number` — Number prefix suffix `[INS-F562D801]`

</details>

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

### 188. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-188` |
| **Pattern ID** | `DRU-FAF990A8` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix `[INS-8C36393E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix `[INS-BB46B875]`
- `/contact/presuf_number` — Number prefix suffix `[INS-4B421933]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_number` — Number prefix suffix `[INS-65721785]`

</details>

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

### 189. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-189` |
| **Pattern ID** | `DRU-B73F2BFF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-C3B24E7C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-7F405CE6]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-C46E2BDA]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-374C7203]`

</details>

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

### 190. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-190` |
| **Pattern ID** | `DRU-B11FCD1E` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-7D0F8187]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-2F2043A1]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-DA1FDE82]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-967D6308]`

</details>

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

### 191. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-191` |
| **Pattern ID** | `DRU-4DAAD6CF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-09C26B60]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-FAF3201D]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-2F4BE183]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-8F3242BD]`

</details>

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

### 192. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-192` |
| **Pattern ID** | `DRU-BF3DA286` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-DFD99B2E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-E338D73D]`
- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-4FAC8194]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_number` — Number prefix suffix (mobile) `[INS-2051EC28]`

</details>

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

### 193. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-193` |
| **Pattern ID** | `DRU-80462EDA` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs `[INS-B7C5F3D3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-7D9C57F0]`
- `/tabs` — Tabs `[INS-FCE55E9D]`

<details><summary>Show 1 more affected page(s)</summary>

- `/tabs` — Tabs `[INS-A667AF09]`

</details>

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

### 194. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-194` |
| **Pattern ID** | `DRU-C4F7DB50` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs (mobile) `[INS-68677930]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-FB6BA34F]`
- `/tabs` — Tabs (mobile) `[INS-5CFB1C2D]`

<details><summary>Show 1 more affected page(s)</summary>

- `/tabs` — Tabs (mobile) `[INS-EFE83B8E]`

</details>

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

### 195. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-195` |
| **Pattern ID** | `DRU-B1DF265A` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-9EFA440C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix `[INS-FD3DB6E5]`
- `/contact/presuf_text` — Text prefix suffix `[INS-0D0B1457]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_text` — Text prefix suffix `[INS-C4FA249C]`

</details>

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

### 196. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-196` |
| **Pattern ID** | `DRU-5CF38AB2` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-201BCC97]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix `[INS-A4D22665]`
- `/contact/presuf_text` — Text prefix suffix `[INS-9158DCA7]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_text` — Text prefix suffix `[INS-F33A23BC]`

</details>

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

### 197. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-197` |
| **Pattern ID** | `DRU-7C13E8BF` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-C4C7575C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix `[INS-0CDDBD30]`
- `/contact/presuf_text` — Text prefix suffix `[INS-FD0EB163]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_text` — Text prefix suffix `[INS-315DECC5]`

</details>

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

### 198. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-198` |
| **Pattern ID** | `DRU-08D74B05` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix `[INS-A77AC4ED]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix `[INS-2D0DFF3D]`
- `/contact/presuf_text` — Text prefix suffix `[INS-25E6C4F5]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_text` — Text prefix suffix `[INS-00E5873C]`

</details>

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

### 199. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-199` |
| **Pattern ID** | `DRU-1D9DEBF3` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-B8A6359D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-3840F5D9]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-21323CEF]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-33C7F177]`

</details>

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

### 200. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-200` |
| **Pattern ID** | `DRU-0FF43692` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-142E9BB5]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-98324475]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-C19A8F05]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-3F242A35]`

</details>

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

### 201. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-201` |
| **Pattern ID** | `DRU-54CA0360` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-EE72584E]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-81F7D9A7]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-26010676]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-606A9792]`

</details>

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

### 202. empty-table-header: Ensure table headers have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-202` |
| **Pattern ID** | `DRU-086F07CD` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-table-header`](https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-3EA6F615]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-E2D1AFBF]`
- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-DE6BE10B]`

<details><summary>Show 1 more affected page(s)</summary>

- `/contact/presuf_text` — Text prefix suffix (mobile) `[INS-56C7129B]`

</details>

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

### 203. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-203` |
| **Pattern ID** | `DRU-DC320928` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/` — Homepage `[INS-583EE0BF]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/` — Homepage `[INS-EAE224AE]`
- `/` — Homepage `[INS-76276BD5]`

<details><summary>Show 1 more affected page(s)</summary>

- `/` — Homepage `[INS-7B59149D]`

</details>

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

### 204. empty-heading: Ensure headings have discernible text 🔁

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-204` |
| **Pattern ID** | `DRU-0CA45C5C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark), `claro` (light), `claro-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 4 of 452 pages (1%) |
| **Template-level** | ✅ YES — fix once fixes all affected pages |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/` — Homepage (mobile) `[INS-4D23405D]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/` — Homepage (mobile) `[INS-8DAD919C]`
- `/` — Homepage (mobile) `[INS-A812B9C6]`

<details><summary>Show 1 more affected page(s)</summary>

- `/` — Homepage (mobile) `[INS-66E4F329]`

</details>

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

### 205. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-205` |
| **Pattern ID** | `DRU-7DE00366` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs/format/plain_text` — Page title `[INS-56DE8236]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs/format/plain_text` — Page title `[INS-1EB03B61]`

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

### 206. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-206` |
| **Pattern ID** | `DRU-0B968789` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs/format/plain_text` — Page title (mobile) `[INS-4F946B61]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs/format/plain_text` — Page title (mobile) `[INS-8600AADD]`

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

### 207. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-207` |
| **Pattern ID** | `DRU-EF28D265` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | desktop |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs `[INS-09981541]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-E1D01CE3]`

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

### 208. empty-heading: Ensure headings have discernible text 

| Field | Value |
| :--- | :--- |
| **ID** | `DRUPAL-A11Y-208` |
| **Pattern ID** | `DRU-8F75C41C` *(stable hash — use to track regressions)* |
| **Conditions** | `admin` (light), `admin-dark` (dark) |
| **Rule** | [`empty-heading`](https://dequeuniversity.com/rules/axe/4.11/empty-heading?application=playwright) |
| **Impact** | **minor** |
| **Screen** | mobile |
| **WCAG SC** | [unknown See axe docs](https://www.w3.org/WAI/WCAG22/Understanding/unknown.html) (Level ?) |
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs (mobile) `[INS-66373722]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-90C971C8]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs/format/plain_text` — Page title `[INS-1BFB45C3]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs/format/plain_text` — Page title `[INS-171F979B]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs/format/plain_text` — Page title (mobile) `[INS-549CB49C]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs/format/plain_text` — Page title (mobile) `[INS-3D50F4BE]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/table` — Table `[INS-8201EA3F]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/table` — Table `[INS-483DA265]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `unknown` — Could not infer template from selector |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/table` — Table (mobile) `[INS-C921E023]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/table` — Table (mobile) `[INS-C17DCEC5]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs `[INS-C37AC0CF]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs `[INS-BB7DCF1B]`

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
| **Frequency** | 2 of 452 pages (0%) |
| **Template-level** | No |
| **Likely template** | `block.html.twig` — Block template |
| **Drupal file(s)** | See likely_template above |
| **Affected users** | users with disabilities |

**Affected pages:**
- `/tabs` — Tabs (mobile) `[INS-A0267AB2]` <sup><abbr title="INS IDs are stable per-instance identifiers (path + rule + selector + screen + theme). Use them to track whether the exact same finding returns in future scans.">[i]</abbr></sup>
- `/tabs` — Tabs (mobile) `[INS-34B27BF7]`

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
