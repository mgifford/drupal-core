# DRUPAL_AGENTS.md

## Repository purpose

This repository is a Drupal core workspace with accessibility-focused workflows,
patch evaluation artifacts, documentation, and reporting.

Primary source code typically lives in:

- `core/`
- `modules/`
- `themes/`
- `profiles/`
- `sites/`
- `composer/`

Supporting workflows and artifacts often live in:

- `patches/`
- `reports/`
- `tools/`
- root-level process docs (`ACCESSIBILITY.md`, `A11Y-PROCESS.md`, etc.)

## Instruction precedence

Follow instructions in this order:

1. `ACCESSIBILITY.md`
2. `AGENTS.md`
3. `STYLES.md`
4. `.agents/DRUPAL_AGENTS.md` (this file)

When instructions conflict, follow the highest-precedence source and choose
the safer, more accessible option.

## Default scope and retrieval hygiene

Do not inspect the entire repository unless explicitly required.

Use filename-first, targeted retrieval:

1. Identify likely files/directories from the task.
2. Search narrowly by symbol, selector, route, template, or string.
3. Read only matching files and immediate dependencies.
4. Expand scope only when evidence requires it.

Avoid broad recursive scans over the full tree.

## Directory guidance

Use these paths by default:

- `core/`: Drupal core runtime, APIs, tests, and themes.
- `modules/contrib/`: Contributed modules present in this workspace.
- `themes/`: Additional theme code outside core themes.
- `patches/`: Patch files and patch evaluation documents.
- `reports/`: Generated reports and analysis outputs.
- `tools/`: Utility scripts and helper tooling.

## Large or generated paths

Do not recursively read or summarize these unless the task explicitly asks:

- `node_modules/`
- `.git/`
- `core/test-results/`
- `reports/archive/`
- `reports/axe-results/`

Treat common generated outputs as derived artifacts unless asked to edit them:

- `reports/index.html`
- `reports/*-latest.html`
- `reports/*-latest.json`
- `reports/*-latest.md`

Prefer editing the source script/config that generates these outputs.

## Working method

Before reading files:

1. Restate the requested scope.
2. Pick the most likely path(s).
3. Use narrow searches first.
4. Read only directly relevant files.

Before changing files:

1. List expected files to change.
2. Explain relevance of each file.
3. Make minimal, request-scoped edits.
4. Avoid unrelated refactors.
5. Run the smallest meaningful verification.

## Drupal code rules

For Drupal code changes:

1. Identify subsystem first (module/theme/service/plugin/template/test).
2. Search by exact identifiers before opening broad sets of files.
3. Follow Drupal coding standards and existing local patterns.
4. Preserve backward compatibility unless task requires breaking changes.
5. Keep accessibility and progressive enhancement constraints intact.

## Contrib and patch workflow

For contributed code under `modules/contrib/`, prefer patch-based workflows when
maintaining local changes:

1. Create/update a patch under `patches/`.
2. Update Composer patch registration if required.
3. Do not bury long-term local edits directly in contrib files unless
   explicitly requested.

For `core/`, direct edits are valid when the task targets Drupal core itself.

## Accessibility and quality guardrails

Always apply:

- WCAG 2.2 AA baseline from `ACCESSIBILITY.md`
- Semantic HTML before ARIA
- Keyboard operability and visible focus
- No known Critical/Serious regressions

Run the narrowest relevant checks for changed behavior. If full validation is
not run, state what was not verified.

## Resetting the local environment (DDEV)

Run from the repository root. Verified against upstream `main` with DDEV
1.25 and PHP 8.5. Use the lightest step that fixes the problem.

1. **Containers and dependencies.** Make sure DDEV is running and that
   `vendor/` matches `composer.lock` (do this after every branch switch):

   ```bash
   ddev start
   ddev composer install --no-interaction
   ddev composer validate --no-check-publish
   ```

   Do not run `composer update` or `composer require` here. The fork uses
   upstream's `composer.lock` on purpose, so lock-file drift would make
   branches impossible to compare.

2. **Clear caches.** Drush is not a dependency of Drupal core, so
   `ddev drush` will fail with "drush is not available". Use core's own CLI:

   ```bash
   ddev exec php core/scripts/dr cache:rebuild
   ```

   If you have installed Drush yourself, `ddev drush cache:rebuild` is
   equivalent. Do not add Drush to `composer.json` in this repository.

3. **Log in without knowing the password.**

   ```bash
   ddev exec php core/scripts/dr user:login --name admin
   ```

   The link uses the DDEV hostname. If a browser cannot load CSS/JS from
   `https://drupal-core.ddev.site` (some embedded browsers block it), swap
   the host for the `127.0.0.1` port shown by `ddev describe`.

4. **Full reinstall (destroys the site database).** Take a snapshot first:

   ```bash
   ddev snapshot --name before-reinstall
   ddev exec php core/scripts/dr install standard --password=admin
   ddev exec php core/scripts/dr cache:rebuild
   ```

   Restore with `ddev snapshot restore before-reinstall`.

5. **Browser (FunctionalJavascript) tests** need a headless Chrome:

   ```bash
   ddev add-on get ddev/ddev-selenium-standalone-chrome && ddev restart
   cp -n core/phpunit.xml.dist core/phpunit.xml
   ddev exec 'cd /var/www/html && BROWSERTEST_OUTPUT_DIRECTORY=/tmp \
     vendor/bin/phpunit -c core <path-to-test>'
   ```

Known problems with the helper commands in `.ddev/commands/host/`:

- `ddev reset-core` calls `drush` throughout, so it fails until it is
  switched to `core/scripts/dr` (or Drush is available).
- `ddev reset-site` calls `scripts/reset-site.sh`, which is not in this
  repository.

Treat both as unreliable until fixed. Use the steps above instead.

## Quick commands (low-noise)

Use `rtk`-prefixed commands for token-efficient output.

Targeted search in common source roots:

```bash
rtk rg "search term" core modules themes tools
```

Find symbol usage in Drupal source paths:

```bash
rtk git grep -n "SymbolOrHookName" -- core modules themes
```

Find files by name pattern in core:

```bash
rtk find core -path '*specific-name*'
```

Inspect current working-tree changes concisely:

```bash
rtk git status --short --branch
rtk git diff --name-only
```

Validate Composer config after dependency changes:

```bash
rtk composer validate --no-check-publish
```
