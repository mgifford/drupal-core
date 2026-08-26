# Draft Comment for Drupal Core #2280035

> **Draft only. Do not post from AS-OACR-001 without separate approval.**

The Status report side-scroll noted earlier in this issue remains reproducible on a core-only Drupal
11.4.4 Standard installation using Claro.

At `/admin/reports/status`, a 320 CSS pixel viewport produced a 357 CSS pixel document. Status value
and description content extended to x=356.86, requiring whole-page horizontal scrolling and
squeezing prose into narrow side-by-side columns. The status prose does not inherently require a
two-dimensional layout, so this is a WCAG 2.2 Success Criterion 1.4.10 failure in the tested
configuration.

Environment: Chrome 151 on macOS and Playwright 1.62.1. The result was confirmed with rendered
geometry and full-page screenshots at both horizontal extremes.
