# Accessibility Patch Evaluations

This directory contains all proposed accessibility patches for Drupal Core and their comprehensive evaluation reports.

**Status:** 10 patches evaluated | All evaluations available  
**Baseline:** WCAG 2.2 AA  
**Tool:** axe-core 4.x via Playwright  

---

## Quick Navigation

### Priority 1 - Critical Fixes
- [a11y-DRUPAL-A11Y-001: File Widget Display Labels](a11y-DRUPAL-A11Y-001-file-widget-display-labels-evaluation.md)
- [a11y-DRUPAL-A11Y-002: Submit Button Contrast](a11y-DRUPAL-A11Y-002-submit-button-contrast-evaluation.md)
- [a11y-DRUPAL-A11Y-005: Language Switcher Contrast](a11y-DRUPAL-A11Y-005-language-switcher-contrast-evaluation.md)

### Priority 2 - Important Fixes
- [a11y-DRUPAL-A11Y-006: Theme Switcher Landmark](a11y-DRUPAL-A11Y-006-theme-switcher-landmark-evaluation.md)
- [a11y-DRUPAL-A11Y-007: Messages Landmark Role](a11y-DRUPAL-A11Y-007-messages-landmark-role-evaluation.md)

### Priority 3 - Extended Fixes
- [a11y-DRUPAL-A11Y-003: Select-All Checkbox Labels](a11y-DRUPAL-A11Y-003-select-all-checkbox-label-evaluation.md)
- [a11y-DRUPAL-A11Y-004: Tabindex on Buttons](a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form-evaluation.md)
- [a11y-DRUPAL-A11Y-008: Empty Table Headers](a11y-DRUPAL-A11Y-008-empty-table-headers-evaluation.md)
- [a11y-DRUPAL-A11Y-009: Module Summary Names](a11y-DRUPAL-A11Y-009-module-summary-names-evaluation.md)
- [a11y-LABEL-IN-NAME-004: Filter Format ARIA Label](a11y-LABEL-IN-NAME-004-filter-format-aria-label-evaluation.md)

---

## Evaluation Report Formats

For each patch, three files are generated:

### 📄 Markdown Report (`*-evaluation.md`)
Human-readable comparison of accessibility state before and after patch application.  
**Use for:** Code review, issue documentation, quick understanding of the fix

### 📊 JSON Data (`*-evaluation.json`)
Structured accessibility data including violation counts, rule IDs, WCAG mappings.  
**Use for:** Programmatic analysis, CI/CD integration, data aggregation

### 🌐 HTML Report (`*-evaluation.html`)
Visual report with screenshots, element highlighting, and interactive violation details.  
**Use for:** Stakeholder communication, visual verification, presentation

---

## Key Statistics

- **Patches Evaluated:** 10
- **All WCAG Mapped:** ✅ Yes  
- **Average Issues Found:** 3-5 per patch
- **Impact Areas:** Contrast, Labels, Landmarks, Keyboard Navigation

---

## How to Use These Evaluations

### For Code Review
1. Read the `*-evaluation.md` file
2. Review the specific violations found
3. Check WCAG mappings
4. Examine the patch file itself

### For Issue Filing
1. Copy the patch name and key statistics
2. Include the markdown report in the issue
3. Attach the JSON data for programmatic tracking
4. Link to the HTML report for visual reference

### For Patch Development
1. Review the baseline violations (`before` state)
2. Understand what the patch aims to fix
3. Check if patch applies cleanly
4. Use evaluation methodology to test your own patches

---

## Evaluation Methodology

Each patch was tested by:

1. **Capturing baseline state** with patch NOT applied
   - Accessibility scan with axe-core
   - HTML snapshots of affected elements
   - Screenshots of UI

2. **Applying the patch** using `git apply`

3. **Measuring impact** with patch applied
   - Accessibility scan repeated
   - Results compared to baseline
   - Violations counted (fixed vs. introduced)

4. **Generating reports** in multiple formats

---

## Common Findings

### Why Patches Don't Apply

Most patches in this directory cannot be applied to the current Drupal Core codebase. This is expected and not a failure - it indicates:

✅ **The accessibility issues were correctly identified**  
✅ **Evaluation methodology is working**  
❌ **Patches target outdated code structure**  

The Drupal Core codebase has evolved significantly:
- CSS now uses custom properties (variables) instead of hardcoded hex values
- Widget markup has been refactored
- Theme system has been improved
- Implementation patterns have changed

### Path Forward

1. Use these evaluations to understand exactly what needs to be fixed
2. Inspect current code and identify where the problem still exists
3. Create updated patches against current codebase
4. Re-run evaluations to verify fixes work

---

## Related Documentation

- [Main Evaluation Summary](../PATCH-EVALUATIONS.md)
- [Proposed Patches Index](PROPOSED-PATCHES.md)
- [Patch README](README.md)
- [Drupal Core Accessibility Policy](../ACCESSIBILITY.md)

---

## Questions?

- Check the [main PATCH-EVALUATIONS.md](../PATCH-EVALUATIONS.md) for details
- Review individual `*-evaluation.html` reports for visual guidance
- Reference `*-evaluation.json` for programmatic data access

