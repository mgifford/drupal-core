# Navigation Home Logo Has No Visible Keyboard-Focus Indicator

> **Draft only. Do not post from AS-OACR-001 without separate approval.**

## Problem and impact

The Navigation sidebar's Home logo receives keyboard focus, but its focused rendering is identical
to its unfocused rendering. This fails WCAG 2.2 Success Criterion 2.4.7, Focus Visible.

- Project: Drupal core
- Component: Navigation module
- Category: Bug report
- Suggested priority: Major
- Affected selector: `.admin-toolbar__logo`

## Steps to reproduce

1. Install Drupal 11.4.4 with the Standard profile and enable Navigation.
2. Log in as an administrator and open `/admin/content` at a desktop viewport.
3. Start at the document and press Tab twice.
4. Confirm that the Home logo has focus but no visible focus indicator.

## Expected result

A visible focus indicator identifies the Home logo.

## Actual result

The focused link has no outline, border, or box shadow. Element screenshots before and after focus
are byte-identical.

## Suggested resolution

Apply the Navigation toolbar's standard focus-visible treatment to `.admin-toolbar__logo` and add a
functional JavaScript test that reaches it with Tab.

## Related issue

[Drupal core #3443571](https://www.drupal.org/project/drupal/issues/3443571#comment-16457564)
recorded the same missing focus indicator in comment #29. That issue fixed the mobile focus trap and
is now closed; Drupal 11.4.4 still reproduces the logo defect tested here.

## Test environment

- Drupal 11.4.4, Standard profile, core modules only
- Navigation and Claro
- Chrome 151 on macOS
- Real Tab input and byte-level element screenshot comparison
