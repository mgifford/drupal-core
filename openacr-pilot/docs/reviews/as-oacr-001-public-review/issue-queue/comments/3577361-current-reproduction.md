# Draft Comment for Drupal Core #3577361

> **Draft only. Do not post from AS-OACR-001 without separate approval.**

I reproduced this issue on a core-only Drupal 11.4.4 Standard installation with Navigation enabled
and Claro as the administration theme.

On `/node/2/edit`, a 320 CSS pixel viewport produced a 345 CSS pixel document. The
`.top-bar__actions` region and “More actions” control extended to x=345.375, causing whole-page
horizontal scrolling. The edit form does not inherently require a two-dimensional layout, so this
is a WCAG 2.2 Success Criterion 1.4.10 reflow failure in the tested configuration.

Environment: Chrome 151 on macOS and Playwright 1.62.1. The result was confirmed with rendered
geometry and full-page screenshots at both horizontal extremes.
