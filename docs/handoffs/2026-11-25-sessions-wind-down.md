ModelCheck | model=anthropic/claude-opus-5-5 | tier=B | fit=coordinating parallel sessions, checking their PRs and closing out | escalate_if=a session leaves unmerged or conflicting work that needs a design call

## Task Context

- Task: close out the coordinating session that ran from 2026-11-23 to 2026-11-25. It reviewed the repository, verified Phase 1 against the live site, built the OpenTelemetry pilot, then handed the remaining work to parallel sessions and followed each one to a merged PR. This note checks those results and records what is left.
- Project: mgifford/drupal-core (Drupal Quality Observatory, on a Drupal 12.0-dev core fork).
- Mission or ticket: issue #95 (OpenTelemetry and Rosetta), issue #91 (future work), PRs #93 to #105.
- Date: 2026-11-25
- Owner: Mike Gifford

## What Changed

- Summary of changes: every PR from this work is merged into `main`. Merge dates are UTC.
  - #93 (2026-11-23): the smoke test expects the 403 that the Drupal 12 Standard front page (`/admin/welcome`) gives anonymous visitors. Phase 1 verified on a live site.
  - #96 (2026-11-23): weekly upstream sync, replacing #94. Core's `package.json` and `yarn.lock` were taken from upstream.
  - #97 (2026-11-23): Phase 2 upstream sources, pinned checkouts and provenance.
  - #98 (2026-11-24): the DDEV project config is committed, so `ddev start` works on a fresh clone.
  - #99 (2026-11-24): the observability pilot (issue #95 Phase 2). Evidence schema, the `observatory_trace` test module, the Collector compose files, the evidence CLI, docs, a tracing-off run, overhead numbers and a CI workflow.
  - #100 (2026-11-24): owner decision D5, scheduled scans run locally only.
  - #101 (2026-11-24): owner decision D6, summaries on GitHub and raw evidence local.
  - #102 (2026-11-24): a read-only drupal.org known-issues matcher and recheck.
  - #103 (2026-11-25): a manual Observatory run against upstream Drupal core (Phase 3, minimal).
  - #104 (2026-11-25): the multi-page axe crawl is restored, with a baseline, evidence and coverage.
  - #105 (2026-11-25): axe-core and `@axe-core/playwright` raised to 4.14.1.
- Files or systems touched: this note only. The work itself is in the PRs above.

## Evidence

- Tests and checks run:
  - GitHub API, 2026-11-25: PRs #93, #96 and #97 to #105 are all merged, and the repository has no open PRs.
  - CI on the merged head commits, read from the check-runs API: #93 and #96 passed `check-pages`; #102, #103, #104 and #105 passed `unit` and `check-pages`. #98 and #99 passed before merge.
  - `git merge-base --is-ancestor`: all 26 local branches are contained in `origin/main` (`d3be46d973`). No local branch holds unmerged work.
  - `ddev list`: every DDEV project is stopped.
- Command outputs or logs: the session transcripts. The per-PR handoff notes are kept with the owner's other session notes, outside the repository.
- Artifacts (screenshots, diffs, reports): the merged PRs above. Evidence runs stay under `tests/playwright/reports/evidence/` (gitignored), as decision D6 requires.

## Learnings

- What worked well:
  - One session per task, each in its own worktree and ending in one focused PR. Five PRs landed in two days without one session overwriting another.
  - Checking each session's report against GitHub and `git` before relaying it. Session status labels can lag: three sessions were listed as "failed" while their transcripts showed them still working.
  - Resolving the #103 and #104 overlap by merging `main` into the branch, not rebasing a pushed branch.
- What failed or caused friction:
  - The pilot session started three high-effort sessions just before the 5-hour usage limit. All four stopped mid-task and resumed only after the reset.
  - One new session reused an older session's worktree on a different branch, which made the worktree name misleading.
  - Over Remote Control the owner cannot see the app's next-step box, so questions must also go in the message text.
- What to repeat next time: verify claims against the primary source (GitHub API, `git`) before telling the owner work is done.
- What to avoid next time: starting several high-effort sessions late in a usage window; leaving test DDEV projects inside worktrees.

## Risks And Open Questions

- Residual risks:
  - Tracing may still be switched on in the root site. The pilot set the `observatory_trace.otlp_endpoint` state on 2026-11-24 for its last evidence run. Not rechecked: the site is stopped and Docker is not reachable from this session. The Collector container may also still exist.
  - The root checkout is on `feat/observability-pilot` (`a12cb08647`), which is merged and whose remote branch was deleted. Local `main` is 45 commits behind `origin/main`, so a site started from this checkout runs code from before #100.
  - Low findings from the pilot are still open: no status-report warning when tracing is on; the endpoint accepts any http(s) host; exceptions from recovered subrequests land on the root span; only the default database connection is traced; exception messages in local spans can contain URLs.
  - GitHub reported 49 open Dependabot alerts on `main` when this note was pushed (2 critical, 26 high, 17 moderate, 4 low). Not triaged here. #96 deliberately reverted 14 transitive bumps in core's `yarn.lock` to upstream's versions, so some alerts are expected to stay until upstream updates them.
  - The known-issues matcher's confidence is not calibrated.
  - Under axe-core 4.14.1, 23 contrast nodes on `/admin/content` need review by a person, and `label-content-name-mismatch` (WCAG 2.5.3) now runs and may fire on other pages.
- Unknowns: tracing overhead under concurrent load (measured on one machine, two routes, one request at a time); the matcher's precision and recall beyond the two finding groups that exist now.
- Decisions pending (owner):
  - Decisions D1 to D4 in `docs/architecture/MIGRATION-PLAN.md` (each has a recommendation, none is decided) and the reordering of #91.
  - Whether to delete the 26 merged local branches and the three worktrees under `.claude/worktrees/` (`peaceful-ramanujan-2420cb`, `practical-wilson-26f7d6`, `serene-stonebraker-dfb563`, each at a merged commit).
  - Whether to remove the stopped DDEV projects `obs-drupal-core-1dec2b8cc196` and `obs-drupal-core-ac08e9b4becd`. The removal commands are in `docs/testing/RUN.md`.
  - Claude Code settings: ask rules for destructive `ddev exec dr` commands, a deny rule for the Playwright MCP unsafe-code tool, and whether CLAUDE.md should require the quality gate on every commit.
  - Whether to ask the drupal/opentelemetry maintainers for Drupal 12 support, so the test-only module can be retired.
  - Whether to file issues for the parts of the crawl not restored (viewports, accent presets, RTL, page metrics, accessibility-tree snapshots).
  - Whether to remove the root `package.json` `axe-core` and `axe-playwright` entries.
  - Whether `reports/pattern-tracker-map.json` stays the issue map under D6.
  - After a VoiceOver check, whether to open an `upstream-reported` issue linking drupal.org #3583518 (the duplicated sticky table header).

## AI Assistance And Provenance

- AI-assisted: yes
- Tool used: Claude Code (Opus 5.5)
- External code copied: no
- External sources consulted: the GitHub REST API for PR, check-run and issue states
- Copyright concern: none known

## Next Step

- Immediate next action:
  1. Move the root checkout to current `main`: `git switch main && git pull --ff-only`.
  2. On the next `ddev start`, run `ddev exec dr state:get observatory_trace.otlp_endpoint` and delete the value unless tracing is wanted. Check for the `observatory-otel-collector` container.
  3. Then the 20-candidate precision spot-check from #38 once the crawl yields more findings, and a review by a person of the 23 contrast nodes.
- Branch state at wind-down:
  - Root checkout: `feat/observability-pilot`, clean, merged.
  - Unpushed branches with new work: none.
  - Pushed without a PR: none, apart from this note's own branch until its PR opens.
  - Open PRs: none before this note's PR.
- Suggested model tier and tool: B, Claude Code.
- Owner: Mike Gifford
- Target time: next session
