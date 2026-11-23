# Capability inventory (Phase 0)

Audit date: 2026-11-19. Audited commit: `3f097f790a`.
Evidence and commands are in [CURRENT-STATE.md](CURRENT-STATE.md).
Updated for Phases 1 and 2 on 2026-11-19. PR #78 (reset-core and weekly-sync fixes) and
PR #81 (Phase 1) are merged, and the sources row covers Phase 2. See
[PLAYWRIGHT.md](../testing/PLAYWRIGHT.md) and [SOURCES.md](../testing/SOURCES.md).

Updated on 2026-11-23: the smoke suite, the axe scan and Playwright MCP were run against a DDEV site
(the "Verification" section of PLAYWRIGHT.md).

## Status values

| Status | Meaning in this inventory |
| --- | --- |
| VERIFIED | Executed in this audit and behaved as documented. |
| IMPLEMENTED_UNVERIFIED | Code exists and passes syntax checks, but was not executed (usually because it needs DDEV, a Drupal site or browsers). |
| PARTIAL | Works only in part, or has a known defect that limits it. |
| BROKEN | Fails, or cannot work as checked in. |
| DOCUMENTATION_ONLY | Described in docs, but no code exists at this commit. |
| HISTORICAL | Evidence or code kept for the record. Not part of the current tool chain. |
| SUPERSEDED | Its job is better done elsewhere, usually Drupal Core Lab. |

Known failures are recorded in the "Tests or evidence" column.
"Next action" names the phase in [MIGRATION-PLAN.md](MIGRATION-PLAN.md).
No owner is recorded beyond the repository owner (mgifford) unless noted.

## 1. Source tracking and publication

| Capability and purpose | Entry points | Depends on | Status | Tests or evidence | Next action |
| --- | --- | --- | --- | --- | --- |
| Upstream source registry, fetch and pinned checkouts | `config/sources.yml`, `node scripts/drupal-test.mjs sources list\|fetch\|checkout\|status\|updates` | Git, git.drupalcode.org | VERIFIED | Against git.drupalcode.org: fetched Drupal core, pinned `92e5c3a304`, and reproduced `bb01ac050c` with the same tree hash as local history. A blocked network gave exit 4 with no pin. 40 unit and integration tests pass. The CMS project type is not handled yet. | Phase 3 builds sites from checkouts. Phase 8 adds run history. |
| Weekly upstream sync of fork `main` | `.github/workflows/weekly-sync.yml` | GitHub Actions, git.drupalcode.org | IMPLEMENTED_UNVERIFIED | Failed silently from 2026-10-05 until PR #78. The repaired workflow opens one PR and never pushes `main`. It passed stub tests but has not run on GitHub. | Watch the first run. Replace with a source fetch in Phase 2. |
| Thin fork layer over upstream | AGENTS.md, commit `7e501b72cf` | Discipline on `main` | BROKEN | PR #66 reintroduced old history and 27 modified upstream files (26 plus README.md). | Owner decision D1 (MIGRATION-PLAN). |
| Publish reports and docs to GitHub Pages | `.github/workflows/pages.yml` | `reports/`, `documentation-new/` | IMPLEMENTED_UNVERIFIED | Workflow and `reports/index.html` exist. Run history not checked. | Keep URLs. Move new runs to `reports/runs/` in Phase 8. |
| Pages health check | `.github/workflows/pages-check.yml`, `.github/scripts/check-pages.sh` | `curl` to the live site | PARTIAL | Runs the live-site check on every PR, which says nothing about the PR. | Restrict the live check to `main` (Phase 1 cleanup). |
| Dependency update PRs | `.github/dependabot.yml` | Dependabot | PARTIAL | Security updates still edit `core/package.json` and `core/yarn.lock`, causing sync conflicts. | Exclude `core/` from security updates or stop committing to it (Phase 2). |

## 2. Environments

| Capability and purpose | Entry points | Depends on | Status | Tests or evidence | Next action |
| --- | --- | --- | --- | --- | --- |
| DDEV project definition | SETUP.md (`ddev config --project-type=drupal12 ...`) | DDEV, Docker | DOCUMENTATION_ONLY | `.ddev/config.yaml` is gitignored and absent here. | Phase 3: generate config per profile under `workspaces/installations/`. |
| Reset core and reinstall with recipes | `ddev reset-core [patch]` (`.ddev/commands/host/reset-core`) | DDEV, Drush, Composer | IMPLEMENTED_UNVERIFIED | Exited at step 1 until PR #78. Fixed and tested with a stub `ddev`, but not yet run against real DDEV. Calls Drush, which is not installed. | Run once on a DDEV machine. Replace with `env reset` in Phase 3. |
| Reset site from snapshot or recipe | `ddev reset-site`, `scripts/reset-site.sh` | DDEV snapshots, Drush, `core/recipes/replicate_core_testing` | IMPLEMENTED_UNVERIFIED | `bash -n` passes. Uses Drush. The comment names a stale recipe path. | Reuse its snapshot logic in Phase 3. |
| List and apply core recipes without Drush | `scripts/apply-recipe.sh`, `scripts/recipe-cli.php` | DDEV, Core Recipe API | IMPLEMENTED_UNVERIFIED | `php -l` passes. | Reuse as the recipe applier in Phases 3 and 6. |
| Test recipes added by the fork | `core/recipes/{article_content_type,page_content_type,core_recommended_front_end_theme,replicate_core_testing}` | Drupal core | IMPLEMENTED_UNVERIFIED | Not applied in this audit. They sit inside `core/`, so they conflict with the upstream tree. | Move to `fixtures/recipes/` in Phase 3. |
| Baseline versus patched checkouts | AGENTS.md "Two environments, side by side" | Git worktrees, two DDEV projects | SUPERSEDED | Same purpose as Drupal Core Lab. | Point to Core Lab. Keep the text as history (Phase 0 follow-up). |

## 3. Browser testing (Playwright)

| Capability and purpose | Entry points | Depends on | Status | Tests or evidence | Next action |
| --- | --- | --- | --- | --- | --- |
| Root npm test scripts (12) | `package.json` scripts | `core/tests/playwright/` | SUPERSEDED | Removed in Phase 1, because all 12 targets were missing: `test:accessibility-workflows`, `test:a11y-headed`, `test:a11y-debug`, `a11y:evaluate-patch`, `a11y:evaluate-all-patches`, `a11y:coverage`, `a11y:sustainability`, `a11y:known-issues`, `a11y:discover-modules`, `a11y:test-module`, `a11y:analyze-modules`, `a11y:triage-modules`. | Replaced by `doctor`, `test:unit`, `test:list`, `test:smoke` and `test:playwright`. The old code is in `d8a45b3fe0`. |
| Removed core-path suite (48 files): axe crawl, keyboard review and contracts, color-contrast matrix, label-in-name, Lighthouse, regressions, module and patch evaluators, pattern and sustainability analysis, RTL and plain-language reports | `core/tests/playwright/` in commit `d8a45b3fe0` | Playwright, axe-core, DDEV | HISTORICAL | Deleted by `47c539d692`. Most of it has no equivalent in `tests/playwright/`. | Phase 1: restore the crawl and contract tests to `tests/playwright/` one at a time, with tests. Do not restore patch evaluators (see section 6). |
| Guidepup virtual screen reader specs | `tests/playwright/tests/a11y-*-sr.spec.ts`, `lib/virtual-sr.ts` | `@guidepup/virtual-screen-reader`, DDEV site, Devel for the menu tests | IMPLEMENTED_UNVERIFIED | Dependencies installed and specs discovered by `npm run test:list`. Not run: no site and no browser. | Run against a site. |
| Multi-scanner crawl (axe plus IBM Equal Access) | `tests/playwright/tests/a11y-virtual-sr-crawl.spec.ts`, `lib/multi-scanner.ts`, `npm run test:multi-scanner:*` | `@axe-core/playwright`, `accessibility-checker`, Drush | IMPLEMENTED_UNVERIFIED | Switches themes globally through Drush, which is not installed. | Phase 1: run. Phase 5: isolate theme changes. |
| Login spec | `tests/playwright/tests/drupal-login.spec.ts` | DDEV site, `admin`/`admin` default | IMPLEMENTED_UNVERIFIED | Not run. | Phase 1 smoke base. |
| Real VoiceOver admin tests (9 tests) | `tests/playwright/guidepup-drupal-admin.spec.ts`, `npm run test:voiceover` | `@guidepup/playwright` 0.19.1, macOS VoiceOver | IMPLEMENTED_UNVERIFIED | Opt-in `voiceover` project (`VOICEOVER=1`). The file stays at its documented path, and all 9 tests are discovered. | Run on macOS with VoiceOver set up. |
| Shared login state | `tests/playwright/lib/auth-setup.ts` (global setup) | Env `DRUPAL_ADMIN_USER`/`PASS` | IMPLEMENTED_UNVERIFIED | Writes `tests/playwright/reports/auth-state.json`, which is gitignored. | Kept for the older specs. The smoke suite uses a dedicated `DRUPAL_TEST_USER` instead. |
| Issue 2848307 MCP check | `tests/playwright/scripts/issue-2848307-mcp-check.js` | DDEV site | HISTORICAL | Issue-specific. | Core Lab territory. Keep as history. |
| Playwright MCP | `.mcp.json` | `@playwright/mcp` 0.0.86 | VERIFIED | Pinned, isolated, `devtools` caps, one allowed origin, output in gitignored `tests/playwright/reports/mcp`. On 2026-11-23 it opened `/user/login` on the DDEV site and wrote an accessibility snapshot, and a navigation to another origin was blocked. `browser_run_code_unsafe` cannot be disabled by config. | Add a client deny rule for the unsafe tool. |
| Smoke suite (6 scenarios in 5 tests) | `tests/playwright/tests/smoke/`, `npm run test:smoke` | DDEV site with Basic page, `DRUPAL_TEST_USER`/`PASS` | VERIFIED | 5 of 5 tests passed on 2026-11-23 against fork commit `bba11f1ede`. The home page test expects the 403 that upstream's `/admin/welcome` front page gives anonymous visitors. Logged-in tests skip, not pass, without credentials. | Restore the axe crawl and contract tests from `d8a45b3fe0` (Phase 1). |
| axe scan with baseline | `tests/playwright/tests/accessibility/login-axe.spec.ts`, `baselines/axe/user-login.json`, `lib/axe-baseline.mjs` | `@axe-core/playwright` | VERIFIED | The baseline helper passes 4 unit tests. On 2026-11-23 the scan of `/user/login` passed: 0 violations, 26 passed rules, 0 incomplete (axe-core 4.12.1). | Extend to more pages and states as journeys are added (Phase 5). |
| Run record (tested commit) | `tests/playwright/lib/run-info.ts` (global setup) | Git | VERIFIED | Wrote `reports/run-info.json` with the commit and dirty flag in a run without a site. | Extend into the run manifest in Phase 8. |
| Environment doctor | `scripts/drupal-test.mjs doctor`, `npm run doctor` | Node | VERIFIED | 16 checks, read-only. Exit codes 0, 2, 3 and 4. Unit tests pass, and it reported this machine accurately. | Add `sources` and `env` commands in Phases 2 and 3. |
| Root `node_modules/` committed | `node_modules/` (1,991 files, 30 MB) | | BROKEN (hygiene) | Not in `.gitignore`. Includes a macOS-only `fsevents`. | Owner decision D2. |

## 4. Accessibility analysis tools

| Capability and purpose | Entry points | Depends on | Status | Tests or evidence | Next action |
| --- | --- | --- | --- | --- | --- |
| Stable finding fingerprints (pattern and occurrence IDs) | `tools/a11y-fingerprints.js` | Node | VERIFIED | `node --test tools/a11y-fingerprints.test.js`: 18 of 18 pass. | Reuse for run comparison in Phase 8. |
| Pattern-to-issue tracker map | `tools/build-pattern-tracker-map.js` | `reports/bugs-latest.json` | IMPLEMENTED_UNVERIFIED | Input exists (dated July 2026). | Phase 8. |
| Core a11y triage report | `tools/core-a11y-triage-report.js` | `patches/`, `reports/` | IMPLEMENTED_UNVERIFIED | Not run. | Review in Phase 8. |
| Patch apply validation and re-roll | `tools/validate-patches.js`, `tools/reroll-patches.js` | `git worktree`, `patches/` | PARTIAL | `reroll-patches.js` hardcodes a 2026-07-15 input. `git worktree` is not writable in this sandbox. | SUPERSEDED by Core Lab for issue work. Keep for checking `patches/` still apply. |
| Purple AI and a11y meta skills | `tools/purple-ai`, `tools/a11y-meta-skills` (submodules) | GitHub | IMPLEMENTED_UNVERIFIED | Submodules not initialized. | Decide whether they are needed (Phase 9). |
| Module accessibility evaluation | MODULE-EVALUATION-README.md, MODULE-TESTING-QUICKSTART.md, EXPERIMENTAL-MODULE-A11Y-TESTING.md, `.drupal-a11y-module-config.json` | Removed scripts in `d8a45b3fe0` | DOCUMENTATION_ONLY | 6 of 8 documented npm scripts are not defined. The rest target missing files. | Phase 6: rebuild on the module registry and reuse the config file. |
| Nightly regression and OpenACR pipeline | NIGHTLY-PIPELINE.md | `scripts/nightly.sh` and two other scripts | DOCUMENTATION_ONLY | Those scripts never existed in Git history. | Phases 8 and 10. Mark the doc as a design. |
| Sustainability (CO2.js, WSG) | WSG-ALIGNMENT.md, WSG-STAR-AUTOMATION.md, root dep `@tgwf/co2`, `reports/sustainability-*` | Removed `analyze-sustainability.js` | HISTORICAL | Last report dated July 2026. | Phase 9: restore from `d8a45b3fe0` with a stated method. |
| Lighthouse | `playwright-lighthouse` in `core/package.json`, removed `a11y-lighthouse.spec.ts` | Chromium | HISTORICAL | The dependency was added to core's manifest, which is the wrong place. | Phase 9. |
| Plain language and RTL analysis | `reports/plain-language-report.*`, `reports/rtl-*`, STYLES.md | Removed scripts | HISTORICAL | | Phase 9 if still wanted. |

## 5. Drupal code under test

| Capability and purpose | Entry points | Depends on | Status | Tests or evidence | Next action |
| --- | --- | --- | --- | --- | --- |
| Committed contrib modules | `modules/contrib/contact` 1.0.0, `form_style` 2.0.0, `theming_tools` 1.0.0 | Drupal 11 or 12 | IMPLEMENTED_UNVERIFIED | Committed, not managed by Composer. `.gitignore` says not to commit them. | Phase 6: module registry through Composer. |
| Custom test modules | `modules/custom/a11y_test_routes`, `test_multifield_desc` | Drupal | IMPLEMENTED_UNVERIFIED | `php -l` passes. | Move to `fixtures/modules/` in Phase 3. |
| Fork edits to core PHP and templates (issues 953034, 2848307, 2574721, 933004, 2279111) | `core/lib/...`, `core/modules/...`, templates | Drupal core | PARTIAL | The 2026-11-19 review found cache and correctness defects. One new unit test is never discovered. | Move to `patches/` or issue forks. Not engine code. |
| Re-appliable a11y patches (78 files) | `patches/` | `git apply` | HISTORICAL | `validate-patches.js` exists, but was not run here. | Keep as evidence. Lab is the place to test them. |

## 6. Issue evidence, documentation and agent material

| Capability and purpose | Entry points | Depends on | Status | Tests or evidence | Next action |
| --- | --- | --- | --- | --- | --- |
| Issue artifacts at repository root | `3370946-*`, `3083103-*`, `3243173-*`, `3587680-*`, `3593539-*`, `3614293-*`, `3617875-*`, `ISSUE-*.md` | | HISTORICAL | Before and after logs, screenshots and patches. | Phase 1 cleanup: move to `reports/legacy/issues/` with redirects only if URLs are published. Do not delete. |
| Sidebar errors issue pack | `testing/issue-3619387-sidebar-errors/` | DDEV, Guidepup | SUPERSEDED | Core Lab does this job. | Keep as history. |
| Patch evaluation process | PATCH-EVALUATION-GUIDE.md, PATCH-EVALUATIONS.md, PATCH-*.md | Removed evaluator scripts | SUPERSEDED | Overlaps Core Lab. | Mark as historical. Link to Core Lab. |
| Published reports | `reports/` (newest 2026-07-19) | Pages workflow | HISTORICAL | Public at mgifford.github.io/drupal-core. | Keep paths. Add `reports/runs/` beside them in Phase 8. |
| Accessibility documentation drafts | `documentation-new/` (published at `/docs/`) | Pages workflow | HISTORICAL | | Keep. Note that the new `docs/` folder is not published. |
| OpenACR pilot | `openacr-pilot/` | | HISTORICAL | | Phase 9 integration candidate. |
| Agent skills | `.agents/skills/` (13), `.claude/skills/` (10 duplicated names), `.claude/agents/` | Agent clients | PARTIAL | Two copies of the same skills can drift apart. | Phase 1 cleanup: one source, one link. |
| Agent instructions | AGENTS.md, CLAUDE.md, `.agents/DRUPAL_AGENTS.md` | | PARTIAL | AGENTS.md claims no upstream file is modified, which is false. CLAUDE.md's patch policy names `docroot/`, which does not exist. | Section 18 rewrite, after Phase 1. |

## Gaps (not implemented anywhere)

These are needed by the specification and have no code at this commit:

- CLI commands beyond `doctor` and `sources`
- a source registry with pinned-commit checkouts and provenance records
- environment profiles
- fixtures beyond the recipes listed above
- run manifests and run comparison
- Drupal CMS support
- local scheduling
