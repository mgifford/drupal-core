# Browser tests: Playwright and Playwright MCP

This is the Phase 1 setup from
[MIGRATION-PLAN.md](../architecture/MIGRATION-PLAN.md). It covers how to run
the browser tests, what they need, and how to use Playwright MCP for
exploration.

## One Playwright installation

`tests/playwright/` is the only Playwright package. It holds the config,
helpers, specs and its own `package-lock.json` (`@playwright/test` 1.61.1).

The root `package.json` only has scripts that call into it. The root still
lists older Playwright and axe dependencies and tracks a committed
`node_modules/`. No working script uses them. Removing them is owner decision
D2 in the migration plan.

The 12 old root scripts pointed to `core/tests/playwright/`, which was deleted
in July 2026 and survives only in commit `d8a45b3fe0`. Phase 1 removed them
instead of leaving commands that cannot work.

## Set up

```bash
npm --prefix tests/playwright ci
```

```bash
cd tests/playwright && npx playwright install chromium
```

Check the machine (read-only):

```bash
npm run doctor
```

`doctor` exits with:
- 0 when everything it needs is ready
- 2 for invalid configuration or usage
- 3 for a missing or incompatible dependency
- 4 when infrastructure (Docker, DDEV or the site) is unavailable

Add `--json` for machine-readable output.

**Site check:** the check runs `curl -k`, which does not verify the
certificate, because DDEV uses a local certificate authority. It only reads
the HTTP status. `DRUPAL_BASE_URL` must start with `http://` or `https://`.
`doctor` uses `df` and `curl`, so it targets macOS and Linux.

## Environment variables

| Variable | Used by | Default |
| --- | --- | --- |
| `DRUPAL_BASE_URL` | all specs, `doctor` | `https://drupal-core.ddev.site` |
| `DRUPAL_TEST_USER`, `DRUPAL_TEST_PASS` | logged-in smoke tests | none. Without them those tests are reported as skipped. |
| `DRUPAL_ADMIN_USER`, `DRUPAL_ADMIN_PASS` | the existing global login and the older specs | `admin` / `admin` |
| `SKIP_ADMIN_LOGIN=1` | skips that global admin login. `test:smoke` and `test:a11y` set it, so they never depend on the admin password. | off |
| `DRUPAL_SOURCE_DIR` | run record, evidence manifest; the folder the axe crawl runs `ddev exec dr` in | repository root |
| `CRAWL_THEME` | axe crawl profile: a theme config id from `lib/theme-configs.ts` | none: the site's installed themes, unchanged |
| `VOICEOVER=1` | enables the real VoiceOver project | off |

Use a dedicated test account for `DRUPAL_TEST_USER`, not user 1. It needs
the administrator role, or at least these permissions:

- access navigation
- access content overview
- create, edit own and delete own Basic page content

Never commit credentials or the files under `tests/playwright/reports/`.

## Commands

From the repository root:

| Command | What it does | Needs a site |
| --- | --- | --- |
| `npm run doctor` | read-only environment check | no |
| `npm run test:unit` | unit tests for `doctor`, the axe baseline helper and `tools/` | no |
| `npm run test:list` | lists every Playwright test without running it | no |
| `npm run test:smoke` | smoke suite (`tests/playwright/tests/smoke/`) | yes |
| `npm run test:playwright` | every spec under `tests/playwright/tests/` | yes |

`tests/playwright/package.json` also has these commands:

- `test:a11y`: the axe scans
- `test:crawl`, `crawl:baseline`, `crawl:restore`: the multi-page axe crawl
  (below)
- `test:voiceover`: real VoiceOver. It needs macOS with VoiceOver, run
  `npx @guidepup/setup` once, and it runs headed.
- the older Guidepup and multi-scanner commands

## Smoke suite

The suite covers six scenarios in five tests (scenarios 4 and 5 are one
test). Accessible names come from the Drupal source at the tested revision:

1. An anonymous visitor to the home page gets "Access denied" (HTTP 403),
   with a `main` landmark. This is upstream's design: since commit
   `308cba9319` (drupal.org #3590882), the Standard profile's front page is
   `/admin/welcome`, which needs the "access administration pages"
   permission. A 200 here means upstream changed the front page.
2. The login form has a labelled Username field, a Password field and a
   "Log in" button.
3. The administrative navigation ("Administrative sidebar") is available
   after login.
4. A Basic page can be created. Its title is checked on the saved page and
   in the status message.
5. The saved page reopens in its edit form with the stored title. It is then
   deleted, and the test checks that the page returns 404.
6. Logging out through `/user/logout/confirm` returns the visitor to the
   login form.

Scenarios 3 to 6 need the Basic page content type. It comes from the
`page_content_type` recipe, which is included in
`core/recipes/replicate_core_testing` (`ddev reset-site` applies it).

## Accessibility checks

`tests/accessibility/login-axe.spec.ts` runs axe-core with the tags `wcag2a`,
`wcag2aa`, `wcag21a`, `wcag21aa` and `wcag22aa`. The full axe results are
attached to every run.

The test compares the results with
`tests/playwright/baselines/axe/user-login.json`:

- **New violations** fail the test. A violation is keyed by rule ID and
  element.
- **Baseline entries that no longer occur** are reported so the baseline can
  shrink.
- **Starting point:** the baseline is empty, so zero violations are accepted.
- **Adding to the baseline:** an entry needs a reason and a Drupal.org issue.
  Never filter findings silently.

An axe pass is not WCAG conformance. Keyboard and screen reader testing are
still needed.

## Multi-page axe crawl

`tests/crawl/a11y-axe-crawl.spec.ts` scans every page in `lib/pages.ts` with
axe-core: 5 anonymous pages and 19 that need a login. It was restored from
commit `d8a45b3fe0`. Run it through the evidence runner, which gives the run
one id and builds the evidence manifest afterwards:

```bash
cd tests/playwright && export DRUPAL_TEST_USER=smoketest DRUPAL_TEST_PASS="$(openssl rand -base64 18)" && (cd ../.. && ddev exec dr user:password "$DRUPAL_TEST_USER" "$DRUPAL_TEST_PASS") && npm run test:crawl
```

Run any other way, for example with `npm run test:playwright`, its tests are
reported as skipped. Run it from a worktree with `DRUPAL_SOURCE_DIR` set to
the checkout the site runs from.

**What it checks on each page:**
- The HTTP status. A page that should return 200 but gives 4xx or 5xx is not
  scanned and fails, so an error page is never recorded as a clean page. Two
  pages are expected to give 403 to anonymous visitors, by upstream design:
  the front page and `/user/register`. That expectation lives in
  `lib/crawl.mjs`, not `lib/pages.ts`, because the multi-scanner spec skips
  403 pages. The not-found page gives 404.
- axe-core with the old crawl's tag set: `wcag2a`, `wcag2aa`, `wcag21a`,
  `wcag21aa`, `wcag22a`, `wcag22aa` and `best-practice`. Findings keep their
  tags, so best practices stay distinguishable from WCAG failures.
- New violations. A violation is keyed by rule and element
  (`lib/axe-baseline.mjs`). The test fails on keys that are not in
  `baselines/axe/crawl-<profile>.json`. Baseline keys that no longer occur
  are reported as resolved. Incomplete results ("needs review") are recorded
  but do not fail the test.

**What it keeps** (in `tests/playwright/reports/evidence/<run id>/`, which is
gitignored):
- `artifacts/axe-*.json`: the unmodified axe results, one file per page.
  Private: they include HTML snippets and form tokens.
- `scenarios/*.json` and `manifest.json`: one scenario per page, with the
  stable id `crawl-<profile>-<page id>`, such as `crawl-installed-user-login`.
  Every violation and needs-review result is a finding, including those in
  the baseline. `node scripts/evidence.mjs compare <earlier manifest> <later
  manifest>` classes them as new, recurring, resolved or unverified.
- `crawl-coverage.json`: every planned page with its status: `scanned`,
  `skipped` (with the reason, for example no test credentials), `not-scanned`
  (with the error) or `not-run` (filtered out, or the run stopped).

**The baseline** is different from the login form's. It is recorded from one
complete run with `npm run crawl:baseline -- reports/evidence/<run id>`,
which refuses a run in which any page was not scanned. Its keys were found by
axe and have not been reviewed by a person: a listed key is not an accepted
barrier. It only lets the crawl fail on what is new. The file records the
run, Drupal commit, axe-core version, themes, color scheme and tags. If the
themes, color scheme or tags of a run differ, nothing counts as accepted and
the test says why. A different axe-core version only adds a warning. Review
the diff before committing a new baseline, and remove keys reported as
resolved. Findings become GitHub issues only after a person confirms them
([recording-issues.md](recording-issues.md)).

**Profiles.** One profile per run:
- `installed` (default): the site's themes as they are. The crawl reads them
  with `ddev exec dr` and changes nothing.
- `CRAWL_THEME=<id>`, with an id from `lib/theme-configs.ts` (today `admin`
  and `admin-dark`). The crawl saves the theme settings to
  `reports/crawl-site-state.json` with the run id, then switches themes with
  Drush. The global teardown (`lib/crawl-finalize.ts`) restores them and
  deletes the file, also when tests fail or the run is stopped with Ctrl-C.
  It only restores state its own run saved, so another Playwright run cannot
  undo a crawl that is still running. A run can still end
  before its teardown: when it is killed, or interrupted while its output is
  piped to another command. Then the next crawl restores the saved state
  before it starts, or run `npm run crawl:restore`. Only `installed` has a
  baseline so far.

**Not restored from the old crawl yet:** the other four viewports, Default
Admin accent presets, RTL scans, page resource metrics and accessibility-tree
snapshots. The old file's extra pages stay out of `lib/pages.ts` on purpose:
the contrib and theming_tools pages were removed in `5f833efe4c` to keep the
crawl to core, and `/search/node` in `0f71edfc68` after upstream removed the
search module.

## Run records and failure evidence

Each run writes `tests/playwright/reports/run-info.json`. It records:

- the tested repository and branch
- the exact commit
- whether the checkout had uncommitted changes (`dirty`)
- the base URL, and the Playwright and Node versions

Screenshots and traces are kept for failed tests in
`tests/playwright/reports/test-results/`.

## Playwright MCP (exploration)

`.mcp.json` defines a `playwright` server pinned to `@playwright/mcp@0.0.86`:

- `--isolated`: an in-memory browser profile, so nothing is saved to disk.
- `--caps=devtools`: tracing and recording, on top of the core tools. The
  core tools cover navigation, accessibility snapshots, clicking, typing,
  keys, forms, screenshots, console and network requests.
- `--allowed-origins=https://drupal-core.ddev.site`. This only stops
  accidental browsing elsewhere. Upstream documents it as not being a
  security boundary.
- `--output-dir=tests/playwright/reports/mcp`, which is gitignored. Do not
  commit MCP logs. The old `.playwright-mcp/` logs are kept only as history.

Your MCP client asks before it starts the server. Use MCP to explore an
unfamiliar screen, then write a normal spec under `tests/playwright/tests/`
with role and label locators. Never use MCP's `ref` values as selectors.
Regression runs never need MCP.

**Safety:**
- In 0.0.86, `browser_run_code_unsafe` is part of the core tools and cannot
  be turned off by a flag or the config file. It runs arbitrary code in the
  server process, so treat it as remote code execution.
- In Claude Code, block it with a deny rule in your own settings, for example
  `"permissions": { "deny": ["mcp__playwright__browser_run_code_unsafe"] }`.
- Never give the MCP browser production or personal credentials.

## Verification

First verified against a running site on 2026-11-23:

- **Code under test:** fork commit `bba11f1ede` (core merged from upstream
  `92e5c3a304`), plus the home page test change above, which was not yet
  committed at run time.
- **Environment:** DDEV 1.25.5 with PHP 8.5 and MariaDB 11.8, the site
  installed with `ddev reset-site --recipe`, and a dedicated test account
  (uid 2, administrator role).
- **Tools:** Playwright 1.61.1, Chromium build 1228, axe-core 4.12.1.

Results:

- `npm run test:smoke`: 5 of 5 passed.
- `test:a11y` (axe scan of `/user/login`): passed, with 0 violations, 26
  passed rules and 0 incomplete.
- Playwright MCP: opened `/user/login` and wrote its accessibility snapshot
  to `tests/playwright/reports/mcp`. A navigation to another origin was
  blocked (`ERR_BLOCKED_BY_CLIENT`).
- `npm run test:list` lists 252 tests in 8 files, `npm run test:unit`
  passes 29 of 29, and `npm run doctor` reports no failures.

The multi-page axe crawl was verified on 2026-11-24:

- **Code under test:** site checkout `a12cb08647` (the observability pilot
  branch, merged into `main` by PR #99), DDEV with PHP 8.5 and MariaDB 11.8,
  Default Admin as both themes, server tracing on.
- **Tools:** Playwright 1.61.1, axe-core 4.12.1.
- **First run:** 23 of 24 pages scanned. `/user/register` gave 403: upstream
  makes registration administrators-only by default (drupal.org #3453676),
  so the crawl now expects 403 there.
- **Second run:** 24 of 24 pages scanned, 4 violations, all axe best-practice
  rules: `label-title-only` on the select-all checkboxes of `/admin/content`
  and `/admin/people`, `empty-table-header` on `/admin/content`, and
  `heading-order` on `/admin/config`. Also 374 needs-review results, 363 of
  them `color-contrast`. `baselines/axe/crawl-installed.json` was recorded
  from this run.
- **Third run:** 24 passed, 0 new, exit 0. `evidence.mjs compare` with the
  second run: comparable, all 378 findings recurring.
- **Site state:** with `enable_dark_mode` set to `light` beforehand, a
  `CRAWL_THEME=admin-dark` run of three pages, two of which failed because
  that profile has no baseline, restored it to `light`, and so did a run
  stopped with Ctrl-C. An earlier Ctrl-C, with the output piped
  to `grep`, ended before the teardown and left the state file; the next
  crawl restored it before scanning. The site was then set back to its
  original `auto`.

Not yet verified:

- the other specs under `tests/playwright/tests/`: the login spec, the
  Guidepup virtual screen reader specs and the multi-scanner crawl
  (`npm run test:playwright` was not run)
- the real VoiceOver project
- keyboard, screen reader, zoom and reflow checks of the login form, which
  axe cannot cover
