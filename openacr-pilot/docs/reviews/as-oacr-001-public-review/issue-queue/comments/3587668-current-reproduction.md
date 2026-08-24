# Draft Comment for Drupal Core #3587668

> **Draft only. Do not post from AS-OACR-001 without separate approval.**

I reproduced this issue on a core-only Drupal 11.4.4 Standard installation using Claro.

The small “Apply to selected items” primary control rendered with 12.64 CSS pixel bold white text on
`#3371ff`. The measured ratio was 4.24:1 at desktop and narrow viewport widths, below the 4.5:1
minimum in WCAG 2.2 Success Criterion 1.4.3.

I confirmed the same component on these pages:

- `/admin/content`
- `/admin/people`
- `/admin/structure/views/view/content/edit/page_1`

Environment: Chrome 151 on macOS, Playwright 1.62.1, and axe-core 4.13.0. Automated tooling
identified the instances; rendered-style and screenshot review confirmed the result.
