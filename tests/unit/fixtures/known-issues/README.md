# drupal.org API fixtures for `tools/known-issues.mjs`

Recorded from the drupal.org api-d7 REST API on 2026-11-24 with a generic
User-Agent, then trimmed. The unit tests use these files instead of the
network.

What was changed after recording:

- Issue records keep only the fields the matcher reads, plus a few for
  context. Authors, assignees, followers, comments and files were removed.
- Issue summaries (`body.value`) were replaced with short test text written
  for these tests, marked "Fixture text". Titles, statuses, components and
  tags are as recorded.
- Taxonomy term records keep `tid`, `name`, `url` and `vocabulary` only.
- List pages were regrouped into the pages the tests need. Their links use
  the query the tool sends (`sort=nid&direction=ASC&limit=50`).

| File | Request |
| --- | --- |
| `node-list-status-1-page-0.json`, `-page-1.json` | `node.json?type=project_issue&field_project=3060&taxonomy_vocabulary_9=1101&field_issue_status=1&...` |
| `node-list-status-13-page-0.json` | Same, status 13 (Needs work) |
| `node-list-empty.json` | A page with no issues, used for the other statuses |
| `node-3088500.json` | `node/3088500.json` |
| `taxonomy-term-*.json` | `taxonomy_term.json?name=<tag>` |
