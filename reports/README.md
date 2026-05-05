# Reports Directory

This directory stores generated accessibility and quality reports.

## Naming Pattern

Most generated files use one of these patterns:

- `*-latest.*`: the most recent run, overwritten on each new run.
- `*-YYYY-MM-DD.*`: date-stamped snapshot kept for historical comparison.

## Default Admin Color Outputs

The Default Admin color tooling currently writes:

- `DEFAULT-ADMIN-COLOR-REPORT-latest.html`
- `DEFAULT-ADMIN-COLOR-REPORT-YYYY-MM-DD.html`
- `default-admin-color-report-latest.json`
- `default-admin-color-report-YYYY-MM-DD.json`
- `DEFAULT-ADMIN-COLOR-MODE-GUIDE-latest.html`
- `DEFAULT-ADMIN-COLOR-MODE-GUIDE-YYYY-MM-DD.html`

### Why the Mode Guide HTML exists

`DEFAULT-ADMIN-COLOR-MODE-GUIDE-*.html` is a standalone companion document for the main color report.
It explains:

- Theme "Increase Contrast" mode vs CSS forced-colors mode
- Token derivation math in light and dark mode
- APCA polarity notes
- Why these differences affect accessibility interpretation

The main report links to this guide so long explanatory content does not overload the report page.

## Other Report Families

This folder also includes additional report streams, such as:

- Keyboard review outputs (`keyboard-review-*.json`, `KEYBOARD-REVIEW-*.md`)
- Pattern reports (`pattern-report-*.json`, `PATTERN-REPORT-*.md`)
- Bug exports (`bugs-*.json`, `bugs-*.csv`)
- Plain-language outputs (`plain-language-report.*`)
- Axe output (`axe-results.json`)

## Reconciliation Documents

`GIN-ISSUES-RECONCILIATION-*.md` compares values from the historical workbook against recalculated WCAG contrast values using current project math.

## Notes

- `Gin-issues.xlsx` is treated as a local/manual analysis artifact and is ignored via `.gitignore`.
- The `archive/` folder can be used to move older artifacts that should not be considered current.