# Recording discovered issues

Problems found while installing or testing Drupal are recorded as
[GitHub issues in this repository](https://github.com/mgifford/drupal-core/issues).
Labels show how far each one has got.

| Stage | Label | Meaning |
| --- | --- | --- |
| Seen | `observation` | Recorded with its environment. Not yet reproduced. |
| Reproduced | `confirmed` | Has repeatable steps on a stated core commit. Can be handed to [Drupal Core Lab](https://github.com/mgifford/drupal-core-lab), the separate repository for before and after evaluation of single issues. |
| Reported | `upstream-reported` | Has a link to a drupal.org issue. |
| Done | closed | Checked again on a newer upstream commit and no longer happens, or found not to be a Drupal problem. |

## When to open an issue

- Open an `observation` for any problem a person notices, even once. Use the
  Observation template, which asks for the core commit, install method and
  versions.
- Do not open one issue per automated scanner finding. Raw results stay as
  run evidence. A finding becomes an issue only once a person has confirmed
  it is a real problem. An automated finding is evidence, not proof of a
  barrier.

## Moving an issue on

- **To `confirmed`:** reproduce it from the recorded steps, ideally on a
  fresh install, and add the commit you reproduced it on.
- **To `upstream-reported`:** find or open the drupal.org issue and link it.
  Write drupal.org text yourself; `core/AGENTS.md` asks that text drafted by
  an LLM not be posted there unedited.
- **To closed:** say which upstream commit you checked and what you saw.

## Finding the drupal.org issue

`tools/known-issues.mjs` cuts down the searching between `confirmed` and
`upstream-reported`. It reads drupal.org and the run evidence, and writes a
local report. It never posts to drupal.org or GitHub, never opens issues,
and never decides that a finding and an issue are the same problem. A
person does that.

```bash
npm run known-issues -- match     # candidates for the newest run's findings
npm run known-issues -- recheck   # findings already linked to drupal.org
```

### match

`match` reads the findings in an evidence manifest
([evidence-schema.md](../observability/evidence-schema.md)), by default the
newest run in `tests/playwright/reports/evidence/` (`--evidence <file>` picks
another). It fetches the open Drupal core issues tagged `Accessibility`
(`--tag` for another tag) from the drupal.org REST API and scores each
finding group against them. It skips synthetic runs and findings a person
marked `human-rejected`.

Output goes to `tests/playwright/reports/known-issues/`, which is not
committed:

- `match-<run id>.md`: for each finding group, up to five candidate issues
  with the evidence for each match and a confidence score, then draft text
  for a GitHub issue that follows the Observation template.
- `match-<run id>.json`: the same candidates as data.
- `drupal-org-queue-accessibility.json`: the fetched issues. `--offline`
  reuses it without sending requests.

The score adds points for: the axe rule id named in the issue, a matching
`wcagNNN` tag or criterion number, the page path or route name, a class or
id of the reported element, the component, and words shared with the rule
message. Confidence is the score divided by 12, capped at 1. It orders the
list. It is not a probability and has not been checked against confirmed
matches. `high` needs two of the rule, page and element signals, or one of
them and a score of 8 or more; `medium` needs one; `low` has none. If no candidate is listed, the report gives a
drupal.org search link to check by hand.

The draft text is an aid for the owner. Reproduce the problem before using
it, and rewrite it in your own words. The tool drafts nothing for
drupal.org: write drupal.org text yourself, as `core/AGENTS.md` asks.

### Recording a confirmed link

When you have confirmed that a drupal.org issue describes a finding, add an
entry to [`reports/pattern-tracker-map.json`](../../reports/pattern-tracker-map.json).
Never add one because a candidate scored high. Use the fingerprint from the
manifest finding (`fingerprint.pattern`) for both `pattern_id` and
`a11y_pattern_display_id`, and add the page and run so `recheck` can find a
comparable run:

```json
{
  "pattern_id": "A11Y-PAT-D4A8A509CAEF",
  "a11y_pattern_display_id": "A11Y-PAT-D4A8A509CAEF",
  "tracker_id": "https://www.drupal.org/project/drupal/issues/<nid>",
  "relationship": "tracks",
  "summary": "<what the finding is>",
  "rule_id": "th-has-data-cells",
  "url": "/admin/content",
  "scenario_id": "admin-content-overview",
  "evidence_run_id": "run-20261124T134220Z-1ca3d340",
  "first_recorded_at": "<ISO date>",
  "last_verified_at": "<ISO date>"
}
```

`url`, `scenario_id` and `evidence_run_id` are read only by `recheck`.

### recheck

`recheck` takes each map entry that links a drupal.org issue and finds the
newest run that scanned the same page or scenario with axe (an attempt
that produced axe results), under the same conditions as the
`evidence_run_id` run (the conditions in
`tests/playwright/lib/evidence/compare.mjs`). A run whose status is not
PASS is named as such. It reports one of:

- **Observed** on that run's commit.
- **Not observed on commit X**. This is not evidence of a fix: a coverage,
  rule or engine change can also hide a finding.
- **Rule still reported**: the fingerprint is gone but the same rule is
  reported on the same page. Fingerprints are provisional, so check by hand.
- **Cannot check**: the entry has no page or scenario, or no run scanned it.

It also reads each linked drupal.org issue and reports its status and the
days since it last changed, flagging open issues unchanged for over 180
days (`--stale-days`). Output is `recheck-<time>.md` and `.json` in the
same folder. Use the result as a prompt to check by hand; close a GitHub
issue only as described in "Moving an issue on".

### Requests to drupal.org

The tool sends only GET requests to `https://www.drupal.org/api-d7/` and
does not follow redirects. It sends them one at a time and at least one
second apart (two by default, `--delay-ms`). Its User-Agent is generic and
carries no personal or project details. It keeps titles, statuses,
components, tags, dates and issue summary text, and drops authors,
assignees, followers and comments, so a match cannot be used to attribute
a problem to a person. Issue summaries stay in the local cache only; the
reports do not quote them. A full `match` sends about 17 requests.
Behind an HTTP proxy, set `NODE_USE_ENV_PROXY=1` (Node 22.21 or later).

Exit codes: 0 success, 2 usage error or unusable input, 4 drupal.org could
not be reached.

## The published reports site

The reports at https://mgifford.github.io/drupal-core/ are an archived
snapshot of scans from March to July 2026, against Drupal core as it was
then. Their URLs stay in place. Problems found since then belong in the
issue tracker, not in those pages.
