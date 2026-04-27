# Form Style

This module gives an overview of all form elements. It is helpful to test the
usability and accessibility of forms.

Among other usage this module was, and is, instrumental in the development of
Inline Form Errors, Claro and Olivero.

**Note** that anyone with the 'access content' permission can use this module.
And it should therefore not be enabled in production sites.

## Installation

Install and enable this module as any other Drupal module, you can follow the
Drupal [documentation](https://www.drupal.org/docs/extending-drupal).

## Usage

### Form element showcase

Visit `/admin/form_style` to see all common form elements rendered in the
active theme. The page is accessible to any user with the `access content`
permission and renders using the **front-end theme**, not the admin theme — this
is intentional so you can inspect how forms look to site visitors.

Submitting the form intentionally triggers validation errors on every element.
This makes it easy to review error states, inline error messages, and
accessibility behaviour all at once.

A **Form Style** link also appears at the bottom of the Navigation module's
top-level flyout sidebar for quick access from any admin page.

### Settings

Visit `/admin/config/form_style` to configure the module. The only option is:

- **Disable Inline Form Errors** — suppresses inline error rendering on the
  showcase form, useful when comparing themes that handle errors differently.
