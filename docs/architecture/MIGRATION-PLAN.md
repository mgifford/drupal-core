# Migration plan

Audit date: 2026-11-19. This plan takes the repository from its current state
([CURRENT-STATE.md](CURRENT-STATE.md)) toward the testing engine described in
the implementation specification. It is based on the
[capability inventory](CAPABILITY-INVENTORY.md).

## Principles

- **One verified phase per pull request.** Do not start the next phase
  automatically.
- **Repair before restructure.** Fix what exists and is still wanted before
  adding new layout.
- **Preserve history and published URLs.** Nothing under `reports/`,
  `documentation-new/`, `patches/` or the root issue artifacts is deleted.
  Moves only happen where no published URL depends on the old path, or where
  a redirect page is left behind.
- **Treat upstream Drupal as a test subject.** Do not treat it as this
  repository's own history (spec section 8.7). Do not rewrite Git history
  without a separate, documented migration.
- **Leave Core Lab's job to Core Lab.** Before and after evaluation of single
  issues belongs in Drupal Core Lab. This repository does not rebuild it.
- **Report every result honestly.** It is one of PASS, FAIL, SKIPPED,
  INCONCLUSIVE, NOT_RUN or INFRASTRUCTURE_ERROR. A missing tool is never
  a pass.

## Decisions needed from the owner

These block parts of later phases. Each one changes repository history or
visible behaviour, so none is made by an agent.

| ID | Decision | Options | Recommendation |
| --- | --- | --- | --- |
| D1 | What to do about the history PR #66 reintroduced on `main`. | (a) Accept it and stop calling `main` a thin layer. (b) Rebuild `main` again as a thin layer (rewrites `main`). (c) Freeze `main` as a fork, and grow the engine so it no longer depends on `main` following upstream. | (c). Phase 2 makes upstream a fetched source, so `main` no longer needs to track upstream, and no history is rewritten. |
| D2 | Committed generated or vendor content: root `node_modules/`, `modules/contrib/`, `.playwright-mcp/` logs. | (a) Leave them. (b) Stop tracking them with `git rm --cached` and add ignore rules. History keeps the old copies. | (b), in a dedicated PR after Phase 1 proves a clean `npm ci` works. |
| D3 | Fork edits to upstream core files (26 code, test and template files, five issues; README.md excluded). | (a) Keep them on `main`. (b) Export each as a patch under `patches/` and restore upstream versions. | (b). They are test subjects with known defects. Phase 2 checkouts will be pristine anyway. |
| D4 | Weekly sync workflow. | (a) Repaired version (PR only, never pushes `main`). (b) Disable it once Phase 2 source fetching works. | (a) now, then (b) after Phase 2. |
| D5 | Where the weekly scan runs (raised by the [Observatory brief](OBSERVATORY-BRIEF.md)). | (a) Local only, as in Phase 10. (b) GitHub Actions, publishing after automated checks. (c) Both: hosted structural scans, plus optional local runs for energy measurement. | None yet. Decide before Phase 10. |
| D6 | Where raw run evidence is stored (raised by the brief). | (a) `reports/runs/` on `main`, as in Phase 8. (b) Small summaries on `main`, large raw evidence in a durable store outside `main`. | None yet. Decide before Phase 8. |

## Immediate repairs (before or with Phase 1)

1. **`ddev reset-core`** always exits at step 1, so it has never reset
   anything. It is fixed in a separate pull request that is not yet merged.
2. **`weekly-sync.yml`** fails silently. A fix that opens or updates one PR
   and never pushes `main` is in a separate pull request that is not yet
   merged. Its first run is expected to fail on the five known conflicts.
3. **Root npm scripts:** remove or repoint all 12. Record each in the
   inventory. Do not add placeholder scripts.

## Phase 1: restore Playwright and enable Playwright MCP

What to reuse:

- `tests/playwright/` as the single Playwright package: its config, `lib/`,
  the Guidepup specs and the multi-scanner crawl.
- Root `package.json` keeps only workspace-level commands that call into
  `tests/playwright/`.

Planned work:

1. Choose one Playwright version. The root lock already pins 1.59.1, so align
   `tests/playwright/package.json` to it. Check `@guidepup/virtual-screen-reader`
   and `@axe-core/playwright` compatibility before changing other versions.
2. Declare `@guidepup/playwright`. Run `guidepup-drupal-admin.spec.ts`
   through an opt-in Playwright project (`VOICEOVER=1`), because it needs
   macOS and VoiceOver. Done in Phase 1: the file kept its documented path,
   and `@guidepup/playwright` 0.19.x was chosen because 0.20 needs Playwright
   1.62 or later.
3. Fix `playwright.config.ts`: move `timeout` out of `use`, fix the stale
   comment, and keep screenshots and traces on failure.
4. Add a smoke suite: home page, login form, admin navigation, create a
   basic page, reopen it, log out. Use an isolated test user, not uid 1.
5. Add `@axe-core/playwright` scans at meaningful states. Store the full
   results, and compare them against a documented baseline. Never filter
   findings silently.
6. Add a pinned Playwright MCP configuration for the actual client in use,
   isolated by default and limited to local test hosts. Leave the unsafe
   code execution capability off.
7. Add `scripts/drupal-test.mjs doctor`. It must be read-only and check Node,
   npm, Docker, DDEV, Composer, Git, browsers, disk and DDEV projects.
8. Record the tested Drupal revision with every run (`git rev-parse HEAD` of
   the site's code).

Blocked here: steps 4 to 6 and 8 need a running DDEV site and installed
browsers. This audit's sandbox could not reach Docker. The first
verification must run on a machine where `ddev start` works.

Restore from `d8a45b3fe0` only after the smoke suite passes, one item at a
time, each with its own check:

- the axe crawl (`a11y-axe-crawl.spec.ts` and `lib/crawl-finalize.ts`).
  Merge its `lib/pages.ts` with the existing `tests/playwright/lib/pages.ts`;
  do not overwrite it.
- the keyboard contracts
- the label-in-name contract

## Phase 2: follow Drupal core main

What to reuse:

- the fetch logic in `weekly-sync.yml`, as a model for remote handling
- `tools/a11y-fingerprints.js`, for result identity

Planned work:

- `config/sources.yml` and `sources fetch|status|updates`
- a shared object store in `workspaces/sources/`, with disposable worktrees
  per pinned commit
- provenance JSON for each run (spec section 8.4)

The engine reads runtime requirements from the selected revision's
`core/composer.json` and `core/package.json`, not from hardcoded values.

After this phase, decision D4(b) can retire the weekly sync. Under decision
D1(c), `main` stops tracking upstream.

## Phase 3: reproducible environments

What to reuse:

- `scripts/apply-recipe.sh` and `scripts/recipe-cli.php`, which apply
  recipes without Drush
- the snapshot logic in `scripts/reset-site.sh`
- the fork recipes, moved to `fixtures/recipes/`
- the custom modules, moved to `fixtures/modules/`

Planned work:

- profiles under `config/profiles/`
- installations under the gitignored `workspaces/installations/`
- per-profile DDEV config
- snapshots keyed by commit, lock hash and recipe set

Resolve the Drush question: either use the recipe API and `core/scripts/dr`,
as AGENTS.md says, or add Drush only to disposable installations, never to
this repository.

## Phase 4: MCP exploration to Playwright tests

What to reuse:

- the Phase 1 MCP configuration
- `tests/playwright/lib/`

Planned work:

- a documented workflow and scenario template (spec section 10.6)
- a review gate before a generated test joins the regression suite

## Phase 5: user journeys

What to reuse:

- the virtual screen reader specs
- the keyboard contract specs restored in Phase 1

Planned work:

- the journey catalogue under `tests/playwright/journeys/`
- making tests that change themes or global configuration run serially
  in isolated environments (today's crawl switches themes through Drush)

## Phase 6: contrib modules and recipes

What to reuse:

- `.drupal-a11y-module-config.json`
- the module evaluator design in `d8a45b3fe0` (`lib/module-manager.js`,
  `scripts/lib/module-evaluator-config.js`)

Planned work:

- install modules through Composer in disposable installations, replacing
  the committed `modules/contrib/` (decision D2)
- record compatibility failures with the spec's classification

## Phase 7: Drupal CMS

New work with separate handlers for the `drupal/cms` project template and
the `drupal_cms` development repository. Nothing in the current repository
supports it.

## Phase 8: regression across main

What to reuse:

- `tools/a11y-fingerprints.js`, which is verified
- `tools/build-pattern-tracker-map.js`
- the multi-scanner JSON report format

Planned work:

- `reports/runs/<run-id>/` alongside the existing `reports/` files, which
  stay at their published paths
- `compare` that reports differences in configuration

## Phase 9: performance, sustainability, extra accessibility evidence

What to reuse, from `d8a45b3fe0`:

- `analyze-sustainability.js` and `@tgwf/co2`
- the Lighthouse spec, with `playwright-lighthouse` moved out of
  `core/package.json`
- the IBM Equal Access results from the multi-scanner crawl

Keep estimates and measurements clearly labelled.

## Phase 10: local scheduling

Use NIGHTLY-PIPELINE.md as the design input. Its scripts never existed.
Scheduling is opt-in only and documented for launchd and cron. It is never
installed automatically.

## Drupal Core Lab boundary

| Belongs in this repository | Belongs in Drupal Core Lab |
| --- | --- |
| Following upstream main and pinning commits | Before and after evaluation of one issue or merge request |
| Profiles, modules, recipes, CMS installations | Side-by-side visual comparison viewer |
| Journey regression suites and run history | Per-issue REPRODUCE, EVIDENCE and COVERAGE packs |
| Exporting a failing scenario for investigation | Patch application against pristine core for review |

The existing patch-evaluation docs, the root issue artifacts,
`testing/issue-3619387-sidebar-errors/` and AGENTS.md's two-checkout workflow
are kept as history. New issue work goes to Core Lab.

This repository reads two parts of
[Drupal Core Lab](https://github.com/mgifford/drupal-core-lab) as inputs, and
copies neither:

- [`recipes/`](https://github.com/mgifford/drupal-core-lab/tree/main/recipes):
  53 recipes on 2026-11-20, 25 of them `repro_<issue number>`
  reproductions. They are candidates for test profiles (Phase 3) and
  targeted regression scenarios (Phases 5 and 8). Some of the others match
  this repository's own fork-only recipes, such as `replicate_core_testing`.
- [`reports/issues/`](https://github.com/mgifford/drupal-core-lab/tree/main/reports/issues):
  40 tracked drupal.org issues on 2026-11-20. All have an EVIDENCE file,
  39 have a REPRODUCE file and a machine-readable `status.json`
  (drupal.org status, component, version, merge request), 31 have patch
  branches and 23 have a STATUS file. They list the known issues to
  recheck on newer core, so a closed issue is only called resolved after it
  is retested (Phase 8).

## Observatory brief (future work)

[OBSERVATORY-BRIEF.md](OBSERVATORY-BRIEF.md), recorded on 2026-11-20, sets a
longer-term goal: a weekly Drupal Quality Observatory for Drupal core and
Drupal CMS, with comparable evidence over time. It is not yet part of the
phases above. It does not change the phases in progress. This table maps its
stages onto them.

| Brief stage | Phases in this plan |
| --- | --- |
| 0. Confirm the foundation | Phase 0 audit and the immediate repairs |
| 1. Reproducible Drupal core environment | Phases 2 and 3 |
| 2. Stable representative journeys | Phases 4 and 5 |
| 3. Immutable evidence and comparisons | Phase 8 |
| 4. Accessible reporting dashboard | No matching phase |
| 5. Drupal CMS | Phase 7 |
| 6. Performance | Phase 9 |
| 7. Sustainability | Phase 9 |
| 8. WCAG-EM-aligned exports | No matching phase |
| 9. External integrations | Only the Drupal Core Lab boundary |
| 10. Production weekly operation | Phase 10, but see decision D5 |

Proposed ordering change, for the owner to confirm: after Phase 5, do
Phase 8 (comparisons) and the reporting dashboard before Phase 6
(contributed modules) and Phase 7 (Drupal CMS). The brief argues that a
small weekly core scan with real comparisons is worth more than wide
coverage without them.

The brief also raises decisions D5 and D6 above, and it repeats D3: the
testing tools must not depend on changing upstream Drupal files.

## What this plan does not change

- No Git history is rewritten. Decisions D1 and D2 are separate and need the
  owner's approval.
- No published report URL moves without a redirect page.
- `drupal-core-lab` is not modified.
- No scheduled job is installed.
