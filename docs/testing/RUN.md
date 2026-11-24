# Manual Observatory run against upstream Drupal core

This is a minimal Phase 3 from
[MIGRATION-PLAN.md](../architecture/MIGRATION-PLAN.md). One command scans the
latest upstream Drupal core instead of this fork's modified checkout.
- **Manual only.** Nothing is scheduled. Owner decision D5 says scans will
  run on the local machine. Phase 10 will document an opt-in launchd or
  cron job that calls this command, and will never install it
  automatically. The command is built to be called that way: no prompts,
  clear exit codes, new credentials every run, one run at a time, and
  recovery after an interrupted run.
- **Separate from the root site.** The DDEV site at the repository root
  serves this fork, which has edits to 26 upstream core files (owner
  decision D3). The run never uses, resets or reinstalls that site.

```bash
node scripts/drupal-test.mjs run --latest
```

## What a run does

| Stage | What happens | On failure |
| --- | --- | --- |
| `pin` | `sources checkout`: fetches and pins the branch tip, or `--ref <commit>`, and writes the provenance record ([SOURCES.md](SOURCES.md)). | INFRASTRUCTURE_ERROR, exit 4 (exit 2 for a dirty checkout) |
| `installation` | Creates, or reuses, `workspaces/installations/<source>/<commit>/`. It is a second Git worktree of the same commit, so the checkout itself stays clean. The stage writes the installation's own `.ddev/config.yaml`, and copies three helper files from this repository into dot folders, which the web server does not serve. | INFRASTRUCTURE_ERROR |
| `ddev-register` | Runs `ddev config --project-name=obs-<source>-<12 characters of the commit>` in the installation, then checks that `ddev describe` names the installation itself (see "Safety" below). | INFRASTRUCTURE_ERROR, exit 3 if `ddev` is missing |
| `ddev-start` | `ddev start <project>`, by name. | INFRASTRUCTURE_ERROR |
| `composer-install` | `ddev composer install --no-interaction` inside DDEV, using upstream's `composer.lock`. | INFRASTRUCTURE_ERROR |
| `site-install` | `ddev exec php .agents/scripts/site-install.php`. This is the repository's own install script, so it installs the Standard profile, not with `dr site:install`. Skipped when the installation's site is already installed. | INFRASTRUCTURE_ERROR |
| `fixtures` | Applies [`fixtures/recipes/observatory_smoke`](../../fixtures/recipes/observatory_smoke/recipe.yml) with upstream's `core/scripts/dr recipe:apply`. | INFRASTRUCTURE_ERROR |
| `test-account` | Creates or updates the account `observatory-test`, with the administrator role and a new random password (see "Test account"). | INFRASTRUCTURE_ERROR |
| `site-check` | Records the PHP version and expects HTTP 200 from `/user/login`. Checks that the installation is at the pinned commit and that no tracked file differs from it (Composer scaffolding could change one). | INFRASTRUCTURE_ERROR; a changed tracked file turns a pass into INCONCLUSIVE |
| `smoke` | `npm run test:smoke` with `DRUPAL_BASE_URL` set to the installation's site and `DRUPAL_SOURCE_DIR` set to the pinned checkout. | the suite's own status |
| `evidence` | `node tests/playwright/scripts/evidence.mjs run --provenance-record <the checkout's record>` ([observability README](../observability/README.md)). The manifest's `target.source.provenance_record` names the copy in the evidence folder. | the manifest's status |
| `ddev-stop` | `ddev stop <project>`. The database volume stays for the next run. | a note only |

After that, the run lists the upstream changes since the previous scanned
commit, as `sources updates --since` does. It measures the disk the run
used and writes the run record.

## Options, statuses and exit codes

| Option | Meaning |
| --- | --- |
| `--latest` | Fetch and pin the branch tip. This is the default. |
| `--ref <commit>` | Pin this commit instead. A commit missing from the local store must be the full 40-character SHA. |
| `--since <commit>` | List upstream changes since this commit. Without it, the run uses the commit of the newest earlier run whose smoke suite exercised a site (PASS, FAIL or INCONCLUSIVE). |
| `--offline` | Pin from the local store without fetching. The record then says the commit is not known to be the latest. |
| `--json` | Print the run record as JSON. |
| `<source>` | A git source from `config/sources.yml`. The default is `drupal-core`. |

The run status is one of these:

- **PASS:** every suite passed.
- **FAIL:** a test failed.
- **INCONCLUSIVE:** tests were skipped or flaky, or the suites disagree. A
  pass also becomes INCONCLUSIVE if the served code differs from the pinned
  commit, or if the smoke run recorded a different commit.
- **SKIPPED** or **NOT_RUN:** nothing was tested.
- **INFRASTRUCTURE_ERROR:** a failed fetch, DDEV step, Composer install,
  site install, test account or site check. Later stages are recorded as
  NOT_RUN. An unexpected error in the command itself is also recorded this
  way, with exit 4. These failures are never reported as a pass.

Exit codes follow the other commands:

| Exit code | Meaning |
| --- | --- |
| 0 | PASS |
| 1 | any other test result |
| 2 | invalid usage or configuration, such as a bad `--ref` or a dirty checkout |
| 3 | a missing dependency, such as `ddev` |
| 4 | an infrastructure error, an interrupted run, or another run in progress |

## Where things live

Everything is under gitignored folders. Owner decision D6 (where raw
evidence is stored) is still open.

| Path | What it is |
| --- | --- |
| `workspaces/installations/<source>/<commit>/` | The installation: the code at the pinned commit, `.ddev/`, `vendor/`, `sites/default/settings*.php`, and `.observatory/` (the test account script, the fixture recipe and `state.json`). One per commit, reused by later runs. |
| `workspaces/runs/<source>/<run-id>/run.json` | The run record: source and commit, installation, every stage with its status, duration and detail, both suite results, the upstream changes, disk use, and tool versions. |
| `workspaces/runs/<source>/<run-id>/*.log` | One log per command stage, and copies of `playwright-results.json` and `run-info.json`. |
| `workspaces/state/run.lock` | Present while a run is in progress. |
| `tests/playwright/reports/evidence/<run-id>/` | The evidence manifest, report and `source-provenance.json`. |

## Safety

**The root site is never touched.** In DDEV 1.25, a command run inside a
nested project that DDEV has not registered acts on the registered project
around it. Here, that would be the `drupal-core` site at the repository root
(`skipNestedProject` in DDEV's `pkg/ddevapp/nested_project.go`, v1.25.5).
So the run:

1. writes the installation's own `.ddev/config.yaml` first;
2. runs `ddev config` there, which acts on the closest config file and
   registers the installation as its own project. As a second line of
   defence, the run stops if any `.ddev/config.yaml` in a folder above the
   installation changed during that command;
3. stops with INFRASTRUCTURE_ERROR, before any other `ddev` command, unless
   `ddev describe -j` run in the installation names the installation's own
   folder and project;
4. starts and stops the project by name, and checks the target again after
   starting, before resetting a database and before stopping.

Unit tests cover both cases: DDEV resolving to the outer project, and
`ddev config` changing an outer config. In each case only `ddev config`
runs.

**One run at a time.** The run takes `workspaces/state/run.lock` before it
does anything else.
- If the process that holds it is still alive, the new run stops with exit
  4 and writes no record.
- A lock whose process no longer exists was left by an interrupted run. The
  new run replaces it and says so in its record.
- The process id decides, not the host name, which macOS changes with the
  network. So `workspaces/` must not be shared between machines.
- The takeover is atomic: the stale lock is renamed aside and checked. If
  another run took the lock first, the new run puts that lock back and
  stops.

The lock protects `tests/playwright/reports/`, which every Playwright
command shares. It does not stop someone from running `npm run test:smoke`
by hand at the same time, so don't.

**Interruptions.** SIGINT or SIGTERM stops the command in progress and its
process group (npm, Playwright, Chromium), records the run as
INFRASTRUCTURE_ERROR with the interrupted stage, frees the lock and exits
4. The DDEV project may still be running then. The next run repairs what
was left:
- It starts the project again and reruns `composer install`.
- If a site install started but never finished, it empties that
  installation's own database (`ddev mysql`, after the target check) and
  installs again.
- Re-applying the fixture recipe and resetting the test account are both
  safe to repeat.

## Test account

The run generates a new random password every time (18 random bytes,
base64url). It passes the password to the account script on standard input
and to Playwright in its environment, and does not print it.
- The account is `observatory-test` with the administrator role. It is
  never user 1.
- **Redaction.** After the suites, the run replaces the password with
  `[REDACTED]` in its own logs and copied reports, and in
  `tests/playwright/reports/playwright-results.json` and `run-info.json`.
  The record notes any file where it found the password. Unit tests check
  this.
- **Traces.** Playwright keeps a trace (a zip file) of a failed test, and
  that trace includes the values it typed. That run's password then stays
  on disk in `tests/playwright/reports/test-results/` (gitignored) until
  the next run rotates it.
- `site-install.php` still creates user 1 as `admin`/`admin`, as it does for
  the root site. The site is reachable only on this machine.

## What is installed

- **The Standard profile.** Upstream's Standard no longer creates content
  types (drupal.org #3587118), and the smoke suite creates a Basic page.
- **The `observatory_smoke` recipe.** It installs `node` and creates a
  Basic page content type with a `createIfNotExists` config action. It has
  no body field, because the smoke suite does not use one.
- **The runtime.** The run reads the PHP and Node.js versions from the
  pinned commit's `core/composer.json` and `core/package.json`, using each
  constraint's lower bound. The database is fixed at MariaDB 11.8 and the
  project type at `drupal12`, as for the root site.
- **No tracing module.** Upstream has no `observatory_trace` module, so
  the evidence run records `server_tracing: disabled`.

## Removing an installation

Removal is not automatic. Run these from the repository root, replacing
`<commit>` with the full SHA and `<project>` with `obs-drupal-core-` plus
its first 12 characters:

```bash
ddev delete --omit-snapshot --yes <project>
```

```bash
git --git-dir=workspaces/sources/drupal-core worktree remove --force workspaces/installations/drupal-core/<commit>
```

The first command removes the project's containers and database volume,
and unregisters it. Name the project explicitly: that cannot reach the root
site. The second command deletes the installation folder and its Git
registration. Run records under `workspaces/runs/` are kept until you
delete them. To remove the pinned checkout as well, see "Not covered yet"
in [SOURCES.md](SOURCES.md).

## Not covered yet

- **No schedule.** That is Phase 10.
- **Fixed scope.** There are no profiles, no other recipe sets and no
  database snapshots per commit, lock digest and recipe set. Those are the
  rest of Phase 3.
- **Docker disk use is not counted.** The record measures the
  installation, the checkout and the source store with `du`; the database
  volume and images are not included.
- **Mutagen sync.** When `workspaces/` is inside the root project's folder
  (as in the main checkout), the root project's Mutagen sync also carries
  the installations. Excluding `workspaces/` there would change the root
  project's DDEV config, so this command does not do it.
- **`--since` uses the fetched tip.** With `--ref`, the upstream changes are
  still listed up to the last fetched branch tip, not up to the pinned
  commit.

## Verification

First verified on 2026-11-24 on a Mac Studio (10 CPUs, 8 GB for Docker),
with DDEV 1.25.5 (Mutagen), Docker 29.5.2, Node.js 22.21.1 and
Playwright 1.61.1. The command ran from a worktree of this repository,
inside the folder of the root `drupal-core` DDEV project. The run pinned
upstream `main` at `1dec2b8cc1968e12eb4e66fc41d1859036ad4d66` (Drupal
12.0-dev, PHP 8.5.12).

**Run 1:** `run --latest --since 92e5c3a304`, a fresh installation. PASS,
exit 0, 80.7 seconds in all.

| Stage | Time | Result |
| --- | --- | --- |
| pin (first clone of the store) | 17.7 s | checkout created |
| installation, ddev-register | 3.9 s | created, target check passed |
| ddev-start | 25.4 s | ok |
| composer-install | 8.6 s | ok. DDEV's Composer cache was already warm. |
| site-install, fixtures, test-account, site-check | 7.6 s | Standard and `observatory_smoke`; uid 2; HTTP 200 |
| smoke | 8.2 s | 5 of 5 passed |
| evidence | 3.4 s | PASS: tracing disabled. axe found no violations on `/admin/content`. It left 2 results needing review: `color-contrast`, where axe could not parse a CSS color and skipped the rule on that page, and `th-has-data-cells` on the Default Admin theme's duplicated sticky header table (drupal.org #3583518). |
| ddev-stop | 3.7 s | ok |

- **Disk:** installation 272 MB, checkout 124 MB, source store 119 MB.
  Docker volumes are not counted.
- **Upstream changes:** 16 commits and 111 files since `92e5c3a304`. The
  dependency manifests `composer.lock`, `core/composer.json`,
  `core/package.json` and `core/yarn.lock` changed; the runtime
  requirements did not.
- **Manifest:** `target.source.provenance_record` is
  `source-provenance.json` and `dirty` is false. `composer_lock_sha256`
  equals the digest of the upstream checkout's `composer.lock`. The checkout
  stayed clean, and no tracked file in the installation changed.

**Run 2:** `run` on the same commit, after `state.json` was edited to say
an install had started and not finished. PASS, exit 0, 44.3 seconds.
- It reused the checkout and the installation, and emptied the database
  with `ddev mysql` before installing again.
- It re-applied the fixture recipe and created the test account with a
  new password.
- It took run 1 as the previous scanned run (0 upstream commits since) and
  removed the lock at the end.

**Run 3:** `run` again, after the quality-gate fixes (process groups, the
outer-config guard, the HEAD check and redaction). PASS, exit 0, 37.0
seconds.
- The site and the fixture were reused, and the password was rotated.
- The run found no password to redact.
- The summary went to stdout and the progress to stderr.

After each run, the root `drupal-core` project was still `running (ok)` and
answered 200 on `/user/login`.

Not verified against a real site: a run refused because another run holds
the lock, and a run stopped by SIGINT or SIGTERM. Unit tests cover both,
with a real SIGTERM sent to a child process.
