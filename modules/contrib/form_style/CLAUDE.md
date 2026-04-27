# form_style module

A Drupal developer/themer utility module that renders every common form element
on a single page. Used to develop and test admin themes — particularly useful
for reviewing error states, inline form errors, and accessibility behaviour.

## Purpose

This module exists to support new admin theme development in Drupal core
(targeting Drupal 12). It provides a stable, reproducible surface for visual
regression testing and manual theme QA.

## Key URLs (DDEV: https://drupal-admin.ddev.site)

| Page | Path | Permission |
|------|------|------------|
| Form element showcase | `/admin/form_style` | `access content` |
| Module settings | `/admin/config/form_style` | `administer site configuration` |

The showcase page renders with the **front-end theme** (`_admin_route: FALSE`),
not the admin theme. This is intentional.

## Module structure

```
form_style/
├── config/
│   ├── install/form_style.settings.yml   # Default config (disable_inline_form_errors: false)
│   └── schema/form_style.schema.yml      # Config schema
├── src/Form/
│   ├── FormStyleForm.php                 # Showcase form — all element types + intentional validation errors
│   └── FormStyleSettingsForm.php         # Settings form (ConfigFormBase)
├── form_style.info.yml                   # core_version_requirement: ^11 || ^12
├── form_style.links.menu.yml             # Top-level nav link (weight: 100) + settings link
└── form_style.routing.yml               # Two routes: form + settings
```

## How the showcase form works

`FormStyleForm::buildForm()` renders ~20 element types (textfield, select,
checkbox, radios, date, datelist, datetime, entity_autocomplete, managed_file,
text_format, machine_name, password, vertical_tabs, fieldset, details, etc.).

`FormStyleForm::validateForm()` intentionally sets an error on every element.
Submitting the form is how you review the full error state — this is by design.

The `disable_inline_form_errors` config flag adds `#disable_inline_form_errors`
to the form array, suppressing the Inline Form Errors module for that page only.

## Compatibility

- Drupal 11 and 12
- PHP 8.3+
- Optional runtime dependencies: `file` module (for `managed_file` element),
  `filter` module (for `text_format` element). Both should be enabled for the
  full showcase to render correctly.

## Testing with Playwright

```bash
# Log in, visit the showcase, screenshot it
playwright-cli open https://drupal-admin.ddev.site/user/login
# ... fill credentials ...
playwright-cli open https://drupal-admin.ddev.site/admin/form_style
playwright-cli screenshot

# Submit to trigger all validation errors, then screenshot
playwright-cli click e678   # ref may vary — check snapshot for current Submit ref
playwright-cli screenshot
```

## Common drush commands

```bash
ddev drush en form_style -y   # enable
ddev drush pmu form_style -y  # uninstall
ddev drush cr                 # rebuild cache after editing .yml files
```
