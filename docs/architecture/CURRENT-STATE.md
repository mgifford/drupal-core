# Current state of the repository (Phase 0 audit)

Audit date: 2026-11-19. Audited commit: `3f097f790a` on `main`.
Method: read-only inspection of the working tree and Git history, plus the
checks listed under "Checks run". No Drupal site was installed or changed.

Related documents:
[CAPABILITY-INVENTORY.md](CAPABILITY-INVENTORY.md) and
[MIGRATION-PLAN.md](MIGRATION-PLAN.md).

## Summary

- The repository is a Drupal core fork with test tooling, reports and
  documentation added on top.
- Its `main` branch is pinned to upstream Drupal core commit `bb01ac050c`
  (2026-09-16). The weekly upstream sync has failed silently since 2026-10-05.
- The documented test entry points mostly point to a Playwright suite under
  `core/tests/playwright/`. That suite was removed from the tree on 2026-07-21
  and survives only in Git history.
- The suite that remains, `tests/playwright/`, is real code but cannot run as
  checked in. Its dependencies and browsers are not installed, and it needs a
  DDEV site that is not configured in this checkout.
- Only one capability was verified to work end to end in this audit: the
  accessibility fingerprint library in `tools/` (18 of 18 unit tests pass).

## Repository and history

| Fact | Evidence |
| --- | --- |
| Commit `7e501b72cf` rebuilt `main` as upstream plus a thin fork layer, with no upstream files modified. | `git show 7e501b72cf` |
| PR #66 (`drupal-2574721`, merged 2026-10-13) was branched from the pre-rebuild `main`. Merging it brought the old fork history back. | `git rev-list --parents -n1 21326f007e`; `git merge-base --is-ancestor 2e1adde229 HEAD` |
| As a result, `main` again tracks `node_modules/` (1,991 files), `modules/contrib/` (653 files), `reports/` (168 files) and `.playwright-mcp/` logs. | `git diff --name-only --diff-filter=A 7e501b72cf HEAD` |
| 27 upstream files are modified on `main`: the fork README.md plus 26 code, test and template files. This contradicts AGENTS.md ("No upstream file is modified"). | `git diff --name-only --diff-filter=MD bb01ac050c HEAD` |
| The pre-rebuild history is also kept on `origin/old-main-20260916`. | `git branch -r` |

## Upstream synchronization

`.github/workflows/weekly-sync.yml` cannot work as written:

- It only fast-forwards when `main` is an ancestor of upstream. That is never
  true while `main` carries fork commits.
- The fallback branch runs `git merge ... || true` and `gh pr create ... || true`,
  without a `GH_TOKEN`. Merge conflicts and PR failures are therefore hidden.
- Since 2026-10-05, each `upstream-merge/*` branch has zero commits ahead of
  `main` (7 branches, 20261005 to 20261116).
- A trial merge of the last good sync (`upstream-merge/20260928`) against
  current `main` conflicts in five files: `core/package.json`, `core/yarn.lock`,
  and three Claro files that upstream deleted.
- Dependabot security updates keep editing `core/package.json` and
  `core/yarn.lock`. That causes some of the conflicts.
- Fixes to the workflow and to `ddev reset-core` exist as a separate change
  that is not yet merged into `main`. The repaired workflow never pushes
  `main`. It opens or updates one PR and fails visibly on conflicts.

## Runtime requirements versus this machine

| Requirement | Drupal core at `bb01ac050c` | This machine | Notes |
| --- | --- | --- | --- |
| PHP | >= 8.5.0 (`core/composer.json`, `Drupal::MINIMUM_PHP`) | 8.5.8 | Matches. SETUP.md also says 8.5. |
| Node.js | >= 24 (`core/package.json` engines) | 22.21.1 | Too old for core's JS tooling. Fine for Playwright. SETUP.md says ">= 22". |
| Yarn | 4.18.0 (`packageManager`) | not checked | Only needed for core's own JS build. |
| Composer | `composer-runtime-api ^2.1` | host 2.0.7, from 2020 | The host Composer is too old and prints PHP 8.5 deprecations. Use `ddev composer`. |
| Drush | not required by core | not in `composer.json` or `composer.lock` | `reset-core`, `reset-site.sh` and `drush-helpers.ts` call Drush. AGENTS.md rule 5 says not to add it. |
| DDEV | SETUP.md: `ddev config --project-type=drupal12 ... --php-version=8.5` | installed. No `.ddev/config.yaml` in this checkout. | `.ddev/` is gitignored apart from `commands/`. |
| Playwright browsers | per package version | not in `~/Library/Caches/ms-playwright` | Need `npx playwright install chromium`. |
| Disk | | 96 GiB free (90% used) | |

These values are for one revision. Phase 2 must read them from the selected
revision instead of hardcoding them.

## What runs today

- **Root `package.json`:** all 12 npm scripts point to `core/tests/playwright/`,
  which no longer exists. The last commit whose tree still holds the full
  suite (48 files) is `d8a45b3fe0`. It was deleted by `47c539d692`, whose message calls it
  a duplicate of `tests/playwright/`. Most of it is not duplicated: the axe
  crawl, keyboard contracts, Lighthouse, patch and module evaluators, and
  sustainability and pattern analysis have no equivalent in
  `tests/playwright/`.
- **`tests/playwright/`:**
  - 5 spec files with 7 static `test()` calls are under `testDir: ./tests`.
  - `guidepup-drupal-admin.spec.ts` (9 tests, real VoiceOver) sits outside
    `testDir`, so it is never discovered. It also imports
    `@guidepup/playwright`, which is not declared.
  - `node_modules` is not installed.
  - The config sets `use.timeout`, which is not a valid Playwright option.
  - The config's header comment refers to a `yarn test:guidepup` script
    that does not exist.
- **`tools/`:** `a11y-fingerprints.js` passes its tests.
  - Other tools read fixed report files. `reroll-patches.js` hardcodes a
    2026-07-15 input.
  - `validate-patches.js` needs `git worktree`, which this sandbox could not
    write to.
- **Git submodules:** `tools/purple-ai` and `tools/a11y-meta-skills` are
  declared but not initialized.
- **DDEV commands:**
  - `reset-core` always exits with status 1 at step 1, so it never reaches
    `git clean` or any `ddev` command. Repeated `--` separators make
    `git ls-files` match nothing. The empty archive folder is then removed,
    and the next `find` on that folder fails under `set -euo pipefail`.
    This was reproduced with the committed script in a temporary repository.
  - Both reset commands depend on Drush.
- **Playwright MCP:** there is no `.mcp.json`. `.playwright-mcp/` holds 10
  console and page logs from 2026-08-04, which shows it was used before.

## Fork changes to Drupal core code

The fork carries unreviewed changes to upstream core files from issues
953034, 2848307, 2574721, 933004 and 2279111. A code review on 2026-11-19
found these defects:

- `render_access` can let Dynamic Page Cache serve the wrong page variant.
- The visibility resolver treats `#pre_render` elements as invisible.
- The new `ThemePreprocess` loop has no effect.
- `stripped_length` strips `<img>` and calls deprecated Twig functions.
- The uninstall-form inline error is never rendered.
- `RenderVisibilityResolverTest` sits under `core/tests/tests/`, so PHPUnit
  never discovers it.

These changes are test subjects, not engine code. They belong in patches or
issue forks, not on the engine's `main`.

## Published reports

`pages.yml` publishes `reports/*` to the site root and `documentation-new/`
to `/docs/` at https://mgifford.github.io/drupal-core/. The newest dated
report is from 2026-07-19. These URLs must be kept (see MIGRATION-PLAN.md).
Whether the latest deployment succeeded was not checked: the `gh` CLI
could not reach GitHub from this sandbox.

## Overlap with Drupal Core Lab

Drupal Core Lab
([README](https://github.com/mgifford/drupal-core-lab), read 2026-11-19) builds
upstream "Before" and patched "After" sites side by side with DDEV. It replays
steps with Playwright and axe-core, compares the two sites, and keeps
per-issue evidence.

This repository has the following that do the same job:

- AGENTS.md's two-checkout "baseline versus patched" workflow
- `PATCH-EVALUATION-GUIDE.md` and the removed `evaluate-patch.js` and
  `evaluate-all-patches.js`
- `tools/validate-patches.js` and `tools/reroll-patches.js`
- the issue artifacts at the repository root (`3370946-*`, `3083103-*`,
  `3243173-*`, `ISSUE-*.md`)
- `testing/issue-3619387-sidebar-errors/`

## Verification of the known problems listed in the specification

| # | Reported problem | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Root npm scripts reference the missing `core/tests/playwright/` | Confirmed: 12 of 12 | `npm run`; existence check of each script target |
| 2 | A Playwright suite exists under `tests/playwright/` | Confirmed: 6 spec files. One is outside `testDir`. | `playwright.config.ts`, file listing |
| 3 | Different Playwright versions in root and nested manifests | Confirmed | Root: `@playwright/test ^1.59.1` (installed 1.59.1, committed), `axe-playwright`, `axe-core`. Nested: `@playwright/test ^1.48.0` (not installed), `@axe-core/playwright`, `accessibility-checker`, `@guidepup/virtual-screen-reader`. `@guidepup/playwright` is used but undeclared. |
| 4 | Docs refer to scripts that no longer exist at those paths | Confirmed in 11 of the 15 top-level docs checked | A11Y-PROCESS, TOOLING-ROADMAP, MODULE-EVALUATION-README, MODULE-TESTING-QUICKSTART, NIGHTLY-PIPELINE, WSG-STAR-AUTOMATION, TESTING-ACCESSIBILITY-WORKFLOWS, PATCH-EVALUATION-GUIDE, EXPERIMENTAL-MODULE-A11Y-TESTING, INFRASTRUCTURE-STATUS, SETUP. NIGHTLY-PIPELINE's `scripts/nightly.sh`, `generate-openacr.js` and `attribute-new-patterns.js` never existed in history. |
| 5 | Runtime docs do not match core requirements | Confirmed | SETUP.md: Node >= 22 versus core's >= 24. SETUP.md's `yarn test:a11y:playwright` and `yarn a11y:analyze` do not exist. |
| 6 | Weekly sync fast-forwards despite fork commits | Confirmed, and it fails silently | See "Upstream synchronization" |
| 7 | Module evaluation docs and commands are not aligned | Confirmed | MODULE-TESTING-QUICKSTART names 8 npm scripts. 2 exist but target missing files. The other 6 are not defined in any `package.json` at this commit. The evaluator code is only in `d8a45b3fe0`. |
| 8 | Patch evaluation overlaps Drupal Core Lab | Confirmed | See "Overlap with Drupal Core Lab" |

## Checks run

| Command | Result |
| --- | --- |
| `git status --short` | clean |
| `node --version` / `npm --version` | v22.21.1 / 10.9.4 |
| `ddev version` | failed: the sandbox blocks the Docker socket |
| `composer --version` | 2.0.7, with PHP 8.5 deprecation output |
| `npm run` (root and `tests/playwright`) | lists 12 root scripts (all broken) and 11 nested scripts |
| `playwright test --list` in `tests/playwright/`, using the committed root install (1.59.1) | 0 tests discovered. Loading the specs fails because `@axe-core/playwright` is not installed. |
| `bash -n` on `scripts/reset-site.sh`, `scripts/apply-recipe.sh` | pass |
| `php -l` on 184 PHP files changed by the fork | all pass |
| `node --check` on 12 fork JS files | all pass |
| `node --test tools/a11y-fingerprints.test.js` | 18 of 18 pass |
| Secret-pattern scan of fork-only files | no keys or tokens found |

## Not verified in this audit

- Anything that needs Docker or DDEV, including both reset commands and every
  Playwright test against a site.
- PHPUnit: there is no `vendor/` directory.
- GitHub-side state: Pages deployments, workflow run history and open PRs.
- Whether the local DDEV version accepts `--project-type=drupal12`.
