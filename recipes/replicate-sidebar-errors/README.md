# Recipe: Replicate issue 3619387 (sidebar errors)

This recipe turns a fresh **standard** Drupal install into the environment needed to
reproduce and test the Default Admin sidebar / advanced-group error behavior
(drupal.org issue #3619387).

## What it does
- Installs the `default_admin` theme.
- Sets `default_admin` as the **administration (backend) theme** via
  `system.theme:admin`, so node edit/add forms (where the advanced group lives) render
  with Default Admin.

The Article content type and its advanced group (URL alias, menu settings, authoring
information) come from the `standard` profile, so install standard **first**, then apply
this recipe.

## Apply it
```bash
# 1. Fresh baseline (from a clean DB)
ddev exec drush site:install standard -y

# 2. Layer the test environment
ddev exec drush recipe recipes/replicate-sidebar-errors

# 3. Log in
ddev drush uli
```

## Reproduce the issue
1. `ddev drush uli` and log in.
2. Add an Article (`/node/add/article`).
3. In the advanced/sidebar group, set **URL alias** to an invalid value (e.g. a path
   containing `<` or a leading `#`).
4. Save — the sidebar toggle should show a `has-error` indicator and announce errors.

## Reset between patches
```bash
ddev reset-site            # restore saved DB snapshot (complete reset; code untouched)
ddev reset-site --capture  # rebuild baseline + (re)save the snapshot
```
See `scripts/reset-site.sh` and `testing/README.md`.
