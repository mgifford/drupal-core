# Test Multifield Description

Demonstrates `#description_display` for multi-value fields in Drupal core issue [#2318757](https://www.drupal.org/project/drupal/issues/2318757).

## What it does

Moves field help text/descriptions from **below** the field table to **above** it, making help text more visible and closer to the field label.

## Setup

1. Enable the module:
   ```bash
   ddev drush en test_multifield_desc -y
   ```

2. Clear cache:
   ```bash
   ddev drush cr
   ```

## Test URL

Go to: **http://drupal-core.ddev.site/node/1/edit**

You should see:
- "Test Multi-Value Field" with its description **above** the input area
- Click "+ Add another item" to add multiple values

## Without the module

Disable the module to see the default behavior (description below):
```bash
ddev drush pmu test_multifield_desc -y
```

## How it works

The module implements `hook_field_widget_complete_form_alter()` to set:
```php
$element['#description_display'] = 'before';
```

Valid values for `#description_display`:
- `'before'` — Description above the field
- `'after'` — Description below the field (default)
- `'invisible'` — Description hidden visually but available to screen readers

## Files

- `test_multifield_desc.info.yml` — Module declaration
- `test_multifield_desc.module` — Hook implementation
