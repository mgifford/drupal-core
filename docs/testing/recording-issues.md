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

## The published reports site

The reports at https://mgifford.github.io/drupal-core/ are an archived
snapshot of scans from March to July 2026, against Drupal core as it was
then. Their URLs stay in place. Problems found since then belong in the
issue tracker, not in those pages.
