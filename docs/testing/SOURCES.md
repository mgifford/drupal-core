# Upstream sources: fetch, pin and compare

This is Phase 2 from [MIGRATION-PLAN.md](../architecture/MIGRATION-PLAN.md).
Upstream Drupal is treated as a test subject that the engine fetches. It is
not this repository's own history.

**The core rule:** follow the latest code between runs, and never change the
code during a run.

## Where things live

Everything below is under `workspaces/`, which is gitignored:

| Path | What it is |
| --- | --- |
| `workspaces/sources/<id>/` | A bare, blobless Git store, one per source. It holds every commit and tree, and downloads file contents only when they are needed. |
| `workspaces/checkouts/<id>/<commit>/` | A disposable checkout, detached at one commit. |
| `workspaces/checkouts/<id>/<commit>.json` | The provenance record for that checkout. |
| `workspaces/state/sources/<id>.json` | The last fetch attempt and the last successful fetch, kept separately. |

Measured on 2026-11-19:

- The Drupal core store was 99 MB after the first clone, and 143 MB after
  two checkouts had pulled in their files.
- Each checkout was about 126 MB.

## Configuration

Sources are defined in [`config/sources.yml`](../../config/sources.yml):

| Source | Type | Branch |
| --- | --- | --- |
| `drupal-core` | git, `https://git.drupalcode.org/project/drupal.git` | `main` |
| `drupal-cms-development` | git, `https://git.drupalcode.org/project/drupal_cms.git` | `2.x` (its default branch, not `main`) |
| `drupal-cms-project` | composer-project, `drupal/cms` | Not supported yet: commands report it until Phase 7 adds its handler. |

Validation rules:
- URLs must be `https://` or `file:///`.
- Branch names are checked.
- Store directories must stay inside `workspaces/`.
- Unknown keys are rejected, so a typo cannot silently change behaviour.

`npm run doctor` checks the config and the default source's last fetch.

## Commands

All commands are `node scripts/drupal-test.mjs sources ...`. Every command
accepts `--json` and `--help`, and `<source>` defaults to `drupal-core`.

| Command | What it does |
| --- | --- |
| `sources list` | Shows the configured sources. Fails with exit 2 if the config is invalid. |
| `sources fetch [<source>]` | Clones the source the first time, then fetches its branch. Only the store's branch ref moves; checkouts are never touched. |
| `sources checkout [<source>] [--ref <branch\|commit>] [--offline]` | Fetches, resolves the branch tip (or the given commit) to a full SHA, creates or reuses a detached checkout, and writes its provenance record. |
| `sources status [<source>] [--remote]` | Shows the last success, the last failed attempt and the checkouts, including any with local changes. `--remote` asks the remote for its newest commit without downloading anything. |
| `sources updates [<source>] [--since <commit>]` | Compares `--since` with the last fetched tip (see below). |

What `sources updates` reports:

- **Base and tip:** the base is `--since`, or the newest checkout if you
  don't give one. The tip is the last fetched commit of the branch.
- **Commits:** the number of commits in the range and their subjects.
- **Changed areas:** how many files changed in each area, such as
  `core/modules/node`.
- **Manifests:** which dependency manifests changed.
- **Runtime requirements:** which of PHP, Composer runtime API, Node and Yarn
  changed.

A changed file does not prove what caused a regression. These are leads, not
blame.

## Rules the code enforces

- **Pinning:** a checkout is detached at a full commit SHA. Later fetches
  never move it.
- **Reproducing:** `--ref <full sha>` rebuilds an earlier commit. If a clean
  checkout of it already exists, it is reused without fetching.
- **Dirty checkouts:** a checkout with local changes, or one at the wrong
  commit, is never modified. The command stops with exit 2. The same goes
  for a folder that is not a checkout at all; `status` shows it as BROKEN.
  - "Clean" means `git status` reports nothing. Gitignored content, such as
    `vendor/` or `node_modules/` added by a later build step, is not checked.
- **Recreating:** a checkout folder deleted by hand can be checked out
  again. Its stale Git registration is pruned first.
- **Fetch failures:** a failed fetch is recorded separately, and the last
  successful fetch is kept. Pinning the branch tip then stops with exit 4
  rather than calling stale code "latest".
  - `--offline` pins the last fetched tip on purpose.
  - Its record says `is_latest_known: false` and shows that no fetch was
    attempted.
- **Runtime requirements:** they are read from the pinned revision
  (`core/composer.json`, `core/package.json`), never hardcoded.
- **Ref limits:** only the configured branch or a commit SHA is accepted as
  `--ref`. A commit that is not in the local store must be given as a full
  40-character SHA, so it can be fetched.

## Provenance record

Each checkout's `<commit>.json` uses the fields from spec section 8.4. It
describes the most recent time that commit was pinned. Re-pinning it, for
example with `--offline` or by SHA, rewrites the record and keeps only
`created_at` from the first time. A run that needs a permanent record
should copy it; Phase 8 run manifests will do this.

An example record:

```json
{
  "schema_version": 1,
  "source": "drupal-core",
  "repository": "https://git.drupalcode.org/project/drupal.git",
  "requested_ref": "main",
  "resolved_commit": "92e5c3a30476e248e82679cb63fa44c51bc667d0",
  "resolved_at": "2026-11-19T15:43:50.744Z",
  "dirty": false,
  "is_latest_known": true,
  "fetch": { "attempted": true, "ok": true, "at": "...", "offline": false, "error": null },
  "checkout": "workspaces/checkouts/drupal-core/92e5c3a30476e248e82679cb63fa44c51bc667d0",
  "created_at": "2026-11-19T15:43:50.744Z",
  "requirements": { "php": ">=8.5.0", "composer_runtime_api": "^2.1", "node": ">= 24.0", "yarn": ">= 4.1.1", "package_manager": "yarn@4.18.0" }
}
```

## Exit codes

- **0:** success
- **2:** invalid configuration or usage. This includes an unknown source, a
  bad `--ref`, a dirty checkout, and a store that points at a different URL
  than the config.
- **3:** Git is missing
- **4:** the network or remote is unavailable, or a needed file can't be
  read offline

## Not covered yet

- **Removing checkouts:** there is no command for it yet, because removal
  is destructive and Phase 3 adds explicit targeting and confirmation. Until
  then, remove one by hand:
  `git --git-dir=workspaces/sources/drupal-core worktree remove workspaces/checkouts/drupal-core/<commit>`,
  then delete its `.json` record.
- **Other refs:** tags, stable releases and other branches.
- **Building sites:** checkouts are not yet turned into Drupal sites; that
  is Phase 3.
- **Run history:** "previous tested commit" currently means the newest
  checkout. Phase 8 replaces it with real run history.
- **Weekly sync:** `.github/workflows/weekly-sync.yml` still exists. Owner
  decision D4 is whether to retire it now that the engine fetches upstream
  itself.
