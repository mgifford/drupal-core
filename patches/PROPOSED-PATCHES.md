# Proposed Accessibility Patches

This document maps identified accessibility issues to proposed patches and status.

## Patchable Issues (Ready for Review)

### LABEL-IN-NAME-004 — Configure link in text format table
- **Issue:** https://www.drupal.org/project/issues/search?issue_tags=Accessibility
- **WCAG:** 2.5.3 Label in Name (Level A)
- **Status:** ✅ **Patch ready**
- **File:** `patches/a11y-LABEL-IN-NAME-004-filter-format-aria-label.patch`
- **Root cause:** `FilterFormatListBuilder::getDefaultOperations()` renames the visible title to "Configure" but the parent `EntityListBuilder` sets `aria-label="Edit @entity_label"` before the override. The aria-label is never updated to match the new visible text.
- **Fix:** Update the aria-label to "Configure @entity_label" after overriding the title, so speech-input users who say the visible text can activate the control.
- **Route:** `/admin/config/content/formats`
- **Selector:** `table tbody tr:has-text("Basic HTML") a:has-text("Configure")`

## Issues Requiring Further Investigation

### DRUPAL-A11Y-001 — Missing labels on image file display checkboxes
- **WCAG:** 1.3.1 Info and Relationships (Level A) — **CRITICAL**
- **Status:** 🔍 Needs investigation
- **Affected:** `#edit-imagefile-file-limited-0-display`, etc. on `/contact/imagefile_file`
- **Issue:** Checkboxes have no explicit `<label>`, no `aria-label`, and no visible label text
- **Note:** This appears in Claro theme only; likely related to file widget rendering

### DRUPAL-A11Y-003 — "Select all rows" checkbox labeled only by title
- **WCAG:** 1.3.1 Info and Relationships (Level A) — **SERIOUS**
- **Status:** ✅ **Patch ready**
- **Files:**
  - `patches/a11y-DRUPAL-A11Y-003-select-all-checkbox-label.patch` → `core/themes/default_admin/templates/dataset/table.html.twig`
  - `patches/a11y-DRUPAL-A11Y-003-views-select-all-checkbox-label.patch` → `core/themes/default_admin/templates/views/views-view-table.html.twig`
- **Affected:** `table > thead > tr > .select-all > input[title="Select all rows in this table"]`
- **Routes:** `/admin/content` (both Gin and Claro)
- **Root cause:** Checkboxes use `title=` attribute for accessibility text but provide no explicit `<label>` or `aria-label`
- **Fix:** Add `aria-label="{{ 'Select all rows in this table'|t }}"` to both checkboxes so they have proper accessible names

### DRUPAL-A11Y-004 — Tabindex > 0 on form submit buttons
- **WCAG:** 2.1.1 Keyboard (Level A) — **SERIOUS**
- **Status:** ⚠️ Source unclear — requires investigation
- **Affected:** `#edit-submit`, `#edit-danger`, `#edit-cancel` on `/buttons` page
- **Selector:** `input[type="submit"][tabindex="1"]`
- **Issue:** Submit buttons have explicit `tabindex="1"` which breaks natural keyboard tab order by making buttons appear first in the tab sequence
- **Theme scope:** Claro theme only
- **Investigation needed:**
  - Verify if this is intentional test fixture behavior or an unintended side effect
  - Determine whether tabindex is set by default_admin theme preprocessing, form API, or JavaScript
  - Check if removing tabindex or using tabindex="0" would be appropriate
- **Severity:** 6 instances on 1 test page; low business impact but important for keyboard accessibility standards

### DRUPAL-A11Y-006 — Missing region landmarks
- **WCAG:** 1.3.6 Identify Purpose (Level AAA) — **MODERATE**
- **Status:** ⚠️ Requires architectural review
- **Affected:** Various pages across all themes
- **Common issue:** `.themeswitcher-form__form-item` not inside a landmark
- **Note:** This is a widespread pattern issue affecting 53+ pages; needs design review

### DRUPAL-A11Y-007 — Contentinfo landmark nesting
- **WCAG:** 1.3.6 Identify Purpose (Level AAA) — **MODERATE**
- **Status:** ⚠️ Requires careful fix
- **Affected:** Status message blocks styled with `role="contentinfo"`
- **Issue:** Messages are nested inside `<main>` or `<article>` when contentinfo should be top-level
- **Note:** May require changing role or moving messages outside main content area

## Next Steps

1. **Review and apply LABEL-IN-NAME-004 patch** — straightforward one-liner fix
2. **Investigate image file widget labels** — likely a template or form element issue
3. **Add aria-label to select-all checkbox** — check `TableSelect.php` or Views template
4. **Review /buttons tabindex test** — determine if intentional or needs fixing
5. **Architectural review for landmark issues** — requires theme/layout discussion

## Testing Recommendations

For each patch:
1. Apply the patch locally
2. Run `yarn a11y:crawl-and-report` to regenerate reports
3. Verify the specific failing element no longer appears in violations
4. Verify no new violations are introduced
5. Run full test suite to ensure no regressions

## References

- Reports: https://mgifford.github.io/drupal-core/
- Theme-specific: https://mgifford.github.io/drupal-core/themes/
- Pattern report: https://mgifford.github.io/drupal-core/pattern-report-latest.html
- RTL analysis: https://mgifford.github.io/drupal-core/RTL-THEME-ANALYSIS-latest.html
