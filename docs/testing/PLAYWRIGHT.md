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
| `DRUPAL_SOURCE_DIR` | run record | repository root |
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
- `test:voiceover`: real VoiceOver. It needs macOS with VoiceOver, run
  `npx @guidepup/setup` once, and it runs headed.
- the older Guidepup and multi-scanner commands

## Smoke suite

The suite covers six scenarios. Accessible names come from the Drupal source
at the tested revision:

1. The home page responds and has a `main` landmark.
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

## Not yet verified

The following have not been verified, because the sandbox used to write this
had no Docker access and could not bind a local port:

- the smoke suite and the axe scan against a running site
- Playwright MCP against a Drupal site

Verified so far:

- `npm run test:list` discovers all specs
- `npm run test:unit` passes
- `npm run doctor` reports this machine correctly

Run the smoke suite on a machine where `ddev start` works before calling
Phase 1 done.
