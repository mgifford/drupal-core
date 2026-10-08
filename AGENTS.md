# AGENTS.md

## What this repository is

This is a **testing environment for Drupal core**, not a site to build. It
tracks upstream Drupal core (`git.drupalcode.org/project/drupal`, branch
`main`) with a thin fork-only layer (`.agents/`, `.ddev/commands/`, `.github/`,
`core/recipes/` additions). No upstream file is modified on this repository's
`main`.

The job here is to **evaluate a change against upstream**: reproduce a problem
on pristine upstream, apply an issue fork's branch or a patch, and compare the
two under the same conditions. Findings feed drupal.org issue comments.

Instruction precedence is in `.agents/DRUPAL_AGENTS.md`. Accessibility
evidence rules are in `.agents/skills/` (start with `drupal-a11y-patch-eval`
if available, else `.agents/skills/ai_best_practices/skills/patch-evaluation`).

## Two environments, side by side

Never switch one checkout back and forth between "before" and "after".
Run two DDEV projects from two checkouts of the same repository:

| | Directory | DDEV project | Code | Purpose |
|---|---|---|---|---|
| **Baseline** | `../drupal-core-baseline` | `drupal-core-baseline` | detached at `upstream/main`, never edited | "before" |
| **Patched** | this directory | `drupal-core` | issue branch or patch applied | "after" |

Both use the same PHP, MariaDB, theme and installed modules, so the only
difference between them is the code under test.

### One-time setup of the baseline

```bash
git fetch upstream main
git worktree add --detach ../drupal-core-baseline upstream/main
mkdir -p ../drupal-core-baseline/.ddev
cp .ddev/config.yaml .ddev/*selenium* ../drupal-core-baseline/.ddev/
```

Then set `name: drupal-core-baseline` on the first line of
`../drupal-core-baseline/.ddev/config.yaml` and bring it up:

```bash
cd ../drupal-core-baseline
ddev start
ddev composer install --no-interaction
mkdir -p .agents/scripts && cp ../drupal-core/.agents/scripts/site-install.php .agents/scripts/
rm -rf sites/default/files sites/default/settings.php && ddev restart
SITE_NAME="Baseline (upstream main)" ddev exec php .agents/scripts/site-install.php
ddev exec php core/scripts/dr cache:rebuild
cp -n core/phpunit.xml.dist core/phpunit.xml
```

(`.ddev/`, `vendor/`, `sites/default/settings.php` and `sites/default/files/`
are untracked and local to each checkout.)

### Putting a change under test in the patched checkout

```bash
# An issue fork branch:
git remote add issue-NNNNNNN https://git.drupalcode.org/issue/drupal-NNNNNNN.git
git fetch issue-NNNNNNN BRANCH
git checkout -B test-NNNNNNN issue-NNNNNNN/BRANCH
git rebase upstream/main            # so only the issue's own changes differ

# Or a patch file:
git checkout -B test-NNNNNNN upstream/main && git apply path/to.patch

ddev composer install --no-interaction
ddev exec php core/scripts/dr cache:rebuild
```

If the branch's `composer.lock` differs from upstream, run
`composer install` in that checkout only. Never commit lock-file changes
here.

### Giving both sites the same state

Enable the same modules in both before comparing (example for Inline Form
Errors). Run in each directory:

```bash
ddev exec php -r '$a=require "autoload.php"; $r=Symfony\Component\HttpFoundation\Request::create("/"); $k=Drupal\Core\DrupalKernel::createFromRequest($r,$a,"prod"); $k->boot(); $k->preHandle($r); \Drupal::service("module_installer")->install(["inline_form_errors"]);'
```

Log in with `admin` / `admin`, or `ddev exec php core/scripts/dr user:login
--name admin`.

### Running the same test against both

Automated JavaScript tests run per checkout, so the before/after result is:

```bash
# baseline: copy the test file in without the fix, expect a failure
# patched:  run it with the fix, expect a pass
ddev exec 'cd /var/www/html && BROWSERTEST_OUTPUT_DIRECTORY=/tmp \
  vendor/bin/phpunit -c core <path-to-test>'
```

For a manual (keyboard, screen reader) comparison, open both sites in two
browser windows at the same size and follow the same steps in each. URLs and
ports: run `ddev describe` in each directory. Ports change after a restart.
Use the `127.0.0.1:<port>` HTTP port if a browser cannot load CSS/JS from
`*.ddev.site`.

## Rules for agents working here

1. **Do not edit the baseline.** It must stay identical to `upstream/main`.
   If its `git status` shows tracked changes, stop and say so.
2. **Record which checkout and commit every result came from** (`git rev-parse
   --short HEAD` in each) so a result can be reproduced.
3. **Snapshot before anything destructive** on a site database:
   `ddev snapshot --name <label>`.
4. **Do not post to drupal.org or push to any remote** without the user's
   explicit approval. Draft issue comments for the user to review.
5. **Do not add Drush or other dependencies** to `composer.json`. Use
   `core/scripts/dr` for cache rebuilds and login links.
6. Use AI-assisted disclosure on commits and comments (see the repository's
   contribution notes).
7. Say what was **not** verified. Automated results are not a substitute for a
   keyboard and screen-reader pass on accessibility changes.

## Teardown

```bash
cd ../drupal-core-baseline && ddev delete --omit-snapshot
cd ../drupal-core && git worktree remove ../drupal-core-baseline --force
```

`ddev delete` removes that project's database. The patched project is not
affected.
