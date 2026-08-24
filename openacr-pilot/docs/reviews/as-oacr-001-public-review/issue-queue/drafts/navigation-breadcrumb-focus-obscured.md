# Navigation Top Bar Completely Obscures Focused Breadcrumb Links

> **Draft only. Do not post from AS-OACR-001 without separate approval.**

## Problem and impact

On a content-edit page, reverse keyboard traversal can focus the Article and Home breadcrumb links
while the fixed Navigation top bar completely covers them. This fails WCAG 2.2 Success Criterion
2.4.11, Focus Not Obscured (Minimum).

- Project: Drupal core
- Component: Navigation module
- Category: Bug report
- Suggested priority: Normal

## Steps to reproduce

1. Install Drupal 11.4.4 with Standard, enable Navigation, and create an Article.
2. Log in as an author and open the Article edit form at a desktop viewport.
3. Press Tab until the focus sequence cycles to its first control.
4. Press Shift+Tab until focus reaches the Article and Home breadcrumb links.

## Expected result

Each focused breadcrumb remains at least partially visible.

## Actual result

Both links receive the expected focus style at `y=33`, but the fixed `.top-bar__content` covers the
entire 24 CSS pixel-high link. All 25 sampled points within each focused link resolve to the top bar,
not the link.

## Suggested resolution

When a breadcrumb receives focus, scroll it below the fixed top bar or reserve enough page offset
that the top bar cannot cover it. Add forward- and reverse-keyboard regression coverage.

## Related issue

[Drupal core #3491044](https://www.drupal.org/project/drupal/issues/3491044) changed Navigation
top-bar rendering but does not record this focus-obscuration defect.

## Test environment

- Drupal 11.4.4, Standard profile, core modules only
- Navigation and Claro
- Chrome 151 on macOS
- Complete real Tab and Shift+Tab traversal with rendered geometry
