# Patch Evaluation Infrastructure

This directory contains accessibility patches and the tools to validate them systematically.

## Quick Start

### Evaluate a Single Patch

```bash
# From the drupal-core root:
yarn a11y:evaluate-patch a11y-DRUPAL-A11Y-002-submit-button-contrast
```

### Evaluate All Patches

```bash
# Run all patches (may take 30+ minutes)
yarn a11y:evaluate-all-patches

# Or filter by priority
PATCH_FILTER=priority-1 yarn a11y:evaluate-all-patches
PATCH_FILTER=priority-2 yarn a11y:evaluate-all-patches
PATCH_FILTER=priority-3 yarn a11y:evaluate-all-patches
```

## What the Evaluator Does

For each patch, the evaluation script:

1. **Before state** — Takes screenshots and captures HTML of failing elements
2. **Baseline scan** — Runs axe-core to document initial violations
3. **Apply patch** — Uses `git apply` to apply the patch file
4. **Clear cache** — Runs `drush cache-rebuild` to ensure fresh state
5. **After state** — Takes new screenshots and captures HTML from the same elements
6. **After scan** — Runs axe-core again to check if violations are resolved
7. **Report generation** — Creates markdown/HTML/JSON evaluation report
8. **Code reset** — Reverts changes with `git checkout -- .` for clean state

## Output Files

For each patch evaluation, three files are generated:

### Markdown Report
- **File:** `patches/{PATCH_NAME}-evaluation.md`
- **Content:** Human-readable before/after comparison with WCAG mapping
- **Purpose:** Code review, documentation

### JSON Data
- **File:** `patches/{PATCH_NAME}-evaluation.json`
- **Content:** Structured data (violations, counts, status)
- **Purpose:** Tooling integration, automated analysis

### HTML Report
- **File:** `patches/{PATCH_NAME}-evaluation.html`
- **Content:** Rendered HTML with styling
- **Purpose:** Web viewing, GitHub Pages hosting

### Batch Summary
- **File:** `reports/PATCH-EVALUATION-SUMMARY.md` (after batch run)
- **File:** `reports/PATCH-EVALUATION-SUMMARY.json` (after batch run)
- **Content:** Aggregated results across all patches
- **Purpose:** High-level overview, deployment readiness

## Configuration

Patch test cases are defined in:

```
core/tests/playwright/scripts/lib/patch-evaluator-config.js
```

Each patch specifies:
- **description** — What the patch fixes
- **wcag** — Array of WCAG criteria (e.g., `['1.4.3', '1.3.1']`)
- **rules** — Axe-core rules affected (e.g., `['color-contrast', 'form-field-multiple-labels']`)
- **testCases** — Array of URLs and selectors to validate:
  - `url` — Path to page with violations (e.g., `/admin/content`)
  - `selectors` — CSS selectors of failing elements (e.g., `[data-drupal-selector="button"]`)
  - `expectedFix` — Description of what should be fixed
  - `viewport` — Browser size for testing (width, height)

Example:

```javascript
'a11y-DRUPAL-A11Y-002-submit-button-contrast': {
  description: 'Fix color contrast on submit buttons (Gin admin theme yellow accent)',
  wcag: ['1.4.3'],
  rules: ['color-contrast'],
  testCases: [
    {
      url: '/admin/content',
      selectors: [
        'input[type="submit"].button--primary',
        'button.button--primary'
      ],
      expectedFix: 'Darken button color from #956707 to meet WCAG AA 4.5:1 contrast',
      viewport: { width: 1280, height: 1024 }
    }
  ]
}
```

## Patch Organization

### Priority 1 (Critical — 88+ violations each)
- **a11y-DRUPAL-A11Y-001-file-widget-display-labels.patch**
  - Missing aria-label on file upload widget
  - WCAG 1.3.1 (Form field labels)
  
- **a11y-DRUPAL-A11Y-002-submit-button-contrast.patch**
  - Insufficient color contrast on Gin submit buttons
  - WCAG 1.4.3 (Contrast minimum)
  
- **a11y-DRUPAL-A11Y-005-language-switcher-contrast.patch**
  - Language switcher links don't meet contrast minimum
  - WCAG 1.4.3 (Contrast minimum)

### Priority 2 (High — 306+ violations combined)
- **a11y-DRUPAL-A11Y-006-theme-switcher-landmark.patch**
  - Theme switcher needs semantic navigation landmark
  - WCAG 1.3.6 (Identify purpose — AAA)
  
- **a11y-DRUPAL-A11Y-007-messages-landmark-role.patch**
  - Messages region needs status role and aria-live
  - WCAG 1.3.6 (Identify purpose — AAA)

### Priority 3 (Moderate — 206+ violations combined)
- **a11y-DRUPAL-A11Y-003-select-all-checkbox-label.patch**
  - Select-all checkboxes missing aria-label
  - WCAG 1.3.1 (Form field labels)
  
- **a11y-DRUPAL-A11Y-004-tabindex-buttons-test-form.patch**
  - Test form buttons have manual tabindex
  - WCAG 2.1.1 (Keyboard accessibility)
  
- **a11y-DRUPAL-A11Y-008-empty-table-headers.patch**
  - Table header cells missing scope attribute
  - WCAG 1.3.1 (Table semantics)
  
- **a11y-DRUPAL-A11Y-009-module-summary-names.patch**
  - Module list item summaries need aria-label
  - WCAG 4.1.2 (Accessible name)
  
- **a11y-LABEL-IN-NAME-004-filter-format-aria-label.patch**
  - Filter format button needs accessible name
  - WCAG 2.5.3 (Label in name)

## Deployment Workflow

After all patches pass evaluation:

1. **Review evaluation reports** — Check each `{PATCH_NAME}-evaluation.md`
2. **Verify no regressions** — Ensure `PATCH-EVALUATION-SUMMARY.md` shows all PASS
3. **Register patches in composer.json** — Add to `extra.patches` section
4. **Test with `composer install`** — Verify patches apply cleanly
5. **Run full test suite** — PHPUnit, Nightwatch, etc.
6. **Commit to main branch** — Add patches to git
7. **Update documentation** — Reference PROPOSED-PATCHES.md and evaluation reports

## Troubleshooting

### Patch won't apply

```bash
# Check if patch is already applied
git status

# Clean up and reset
git checkout -- .

# Try applying again with more verbosity
git apply --check patches/{PATCH_NAME}.patch
```

### Evaluator crashes

Check that:
- DDEV is running (`ddev status`)
- `http://drupal-core.ddev.site` is accessible
- All required npm packages are installed (`npm install`)
- Drupal database is populated

### Cache clear fails

If `drush cache-rebuild` times out:

```bash
# Clear cache manually
ddev drush cache-rebuild
```

### Axe scan shows unexpected violations

Possible causes:
- Page didn't fully load (increase `waitUntil: 'networkidle'` timeout)
- Drupal cache not cleared (manual drush call)
- Patch has side effects (review patch diff carefully)

## Files

### Scripts

- **`evaluate-patch.js`** — Main orchestrator for single patch evaluation
- **`evaluate-all-patches.js`** — Batch runner for all patches
- **`lib/patch-evaluator-config.js`** — Patch-to-test mappings
- **`lib/render-markdown-report.js`** — HTML rendering utility

### Patch Files

- **`{PATCH_NAME}.patch`** — The actual patch file (git format)
- **`{PATCH_NAME}-evaluation.md`** — Human-readable evaluation report
- **`{PATCH_NAME}-evaluation.html`** — Web-viewable report
- **`{PATCH_NAME}-evaluation.json`** — Structured evaluation data

### Metadata

- **`PROPOSED-PATCHES.md`** — Deployment guide (general info about all 11 patches)
- **`PATCH-EVALUATION-README.md`** — This file

## References

- **Axe-core rules:** https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
- **WCAG 2.2:** https://www.w3.org/WAI/WCAG22/quickref/
- **Drupal accessibility:** See `/ACCESSIBILITY.md` in repository root

## Performance Notes

- Single patch evaluation: **3–5 minutes** (depends on page load time)
- All 11 patches in batch: **30–45 minutes**
- Batch run can be interrupted and resumed (individual patches are independent)

## Next Steps

1. Run a single patch to verify infrastructure works
2. Review the evaluation report markdown
3. Compare before/after screenshots
4. Run full batch when confident in the process
5. Review PATCH-EVALUATION-SUMMARY.md for deployment readiness
