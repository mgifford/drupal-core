# Drupal Core Accessibility Testing Process

This document describes the end-to-end workflow for finding, triaging, fixing, and preventing regressions of accessibility issues in Drupal core.

Reference: [Drupal Accessibility Coding Standards](https://www.drupal.org/docs/getting-started/accessibility/accessibility-coding-standards)

---

## Overview

Drupal core uses a **two-layer automated testing strategy** for accessibility:

| Layer | Tool | Purpose | When it runs |
| :--- | :--- | :--- | :--- |
| Nightwatch + axe | axe-core via Nightwatch | Fast checks on ~10 key pages | Every MR (GitLab CI) |
| Playwright crawl + axe | axe-core via Playwright | Full-site crawl, pattern analysis | Daily schedule + MR on .twig changes |
| Playwright + Lighthouse | Lighthouse | Accessibility scores per page | Daily schedule |
| Regression suite | Playwright + axe | Guards re-enabled rules | Every MR |

Automated testing catches a **subset** of issues. Manual keyboard and screen reader testing remains required for complex widgets and dynamic interactions.

---

## 1. Local Environment Setup

### Prerequisites

- [DDEV](https://ddev.readthedocs.io/) installed and running
- Node.js ≥ 22 (managed via corepack/yarn in `core/`)
- Drupal core checked out and DDEV site installed

### First-time setup

```bash
# Start DDEV
ddev start

# Install Playwright's Chromium browser (once)
cd core
npx playwright install chromium --with-deps
```

### Environment variables (optional overrides)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `DRUPAL_BASE_URL` | `https://drupal-core.ddev.site` | Base URL of your running Drupal site |
| `DRUPAL_ADMIN_USER` | `admin` | Admin username for Claro/admin page tests |
| `DRUPAL_ADMIN_PASS` | `admin` | Admin password |

---

## 2. Running the Axe Crawl

The crawler runs axe-core against every page in the inventory (`lib/pages.ts`) and outputs structured JSON.

```bash
cd core
yarn test:a11y:playwright
```

This runs:
1. `tests/a11y-axe-crawl.spec.ts` — axe crawl of all anonymous (Olivero) and admin (Claro) pages
2. `tests/a11y-regressions.spec.ts` — hard-fail regression guards

Output: `core/tests/playwright/reports/axe-results.json`

> **Note:** The crawler intentionally does **not** hard-fail on new violations — it records everything. Hard failures are reserved for the regression suite. This keeps CI low-noise.

---

## 3. Analyzing Patterns (Finding Template Issues)

After the crawl, run the pattern analyzer:

```bash
cd core
yarn a11y:analyze
```

This reads `axe-results.json` and groups violations by CSS selector across pages. Violations appearing on **3 or more pages** for the same selector/rule are flagged as likely **template-level issues** — meaning a single Twig template change can fix many pages at once.

Output:
- `reports/axe-results.json` — raw per-page violations
- `reports/pattern-report.json` — structured patterns (machine-readable)
- `reports/PATTERN-REPORT.md` — human-readable prioritized report

### Reading the pattern report

```bash
open core/tests/playwright/reports/PATTERN-REPORT.md
```

Key indicators:
- 🔁 = pattern appears on ≥3 pages → fix the Twig template, not each page
- Sorted by axe impact: **Critical** → **Serious** → **Moderate** → **Minor**
- Each pattern includes the inferred Twig template (e.g. `field.html.twig`, `views-view-*.html.twig`)
- WCAG 2.2 A violations are fixed before AA; within each level, axe impact drives order

### Template inference heuristics

The analyzer maps CSS class names to Twig templates using Drupal's naming conventions:

| CSS class pattern | Likely template |
| :--- | :--- |
| `field--type-*` | `field.html.twig` |
| `field--name-*` | `field.html.twig` |
| `node--type-*` | `node--{type}.html.twig` |
| `views-row`, `views-field` | `views-view-*.html.twig` |
| `region--*` | `region.html.twig` |
| `form-item`, `form-type-*` | `form-element.html.twig` |
| `menu` | `menu.html.twig` |
| `breadcrumb` | `breadcrumb.html.twig` |

When the heuristic says `unknown`, use `drush twig:debug` or Twig debug mode to identify the template from the rendered HTML comment.

---

## 4. Running Lighthouse Audits

```bash
cd core
yarn test:a11y:lighthouse
```

Output: `reports/lighthouse-results.json`

Lighthouse provides an accessibility **score** (0–100) and surfaces issues axe misses — rendered colour contrast, tap target sizes, and missing document structure. Use it to track score trends over time and to cross-check axe findings.

---

## 5. Fixing a Violation

### Step 1 — Identify the template

1. Find the pattern in `PATTERN-REPORT.md`.
2. Note the CSS selector and the inferred template.
3. Confirm with Twig debug: in `settings.local.php`, set `$config['system.logging']['error_level'] = 'verbose';` and `$settings['twig_debug'] = TRUE;`. Reload the page — Twig debug comments show the template file path.

### Step 2 — File a drupal.org issue (if not already filed)

- Tag: `Accessibility`
- Component: affected module or theme
- Priority: match the axe impact (Critical → Critical, Serious → Major, Moderate → Normal, Minor → Minor)
- Link to the relevant entry in the pattern report

### Step 3 — Make the fix

Follow the [Drupal Accessibility Coding Standards](https://www.drupal.org/docs/getting-started/accessibility/accessibility-coding-standards):

- Prefer semantic HTML over ARIA
- Use `visually-hidden` class to hide content from sighted users only
- Use `Drupal.announce()` for dynamic content changes
- Use `aria-expanded`, `aria-describedby`, `aria-current` where semantic HTML is insufficient
- Group related form elements with `<fieldset>` and `<legend>`
- Honour `prefers-reduced-motion` for animations

### Step 4 — Verify locally

Re-run the crawl and confirm the violation is gone for that page:

```bash
cd core
yarn test:a11y:playwright
yarn a11y:analyze
```

### Step 5 — Add a regression test

```bash
cd core
yarn a11y:add-regression \
  --rule duplicate-id-aria \
  --page /search/node \
  --issue 3318398 \
  --name "Search page has no duplicate-id-aria violations"
```

This appends a permanent guard to `tests/a11y-regressions.spec.ts`. The test hard-fails if the violation ever re-appears.

### Step 6 — Re-enable the axe rule in Nightwatch (if applicable)

If your fix resolves **all** violations for a disabled rule (see `ACCESSIBILITY.md` section 9):

1. Remove the `{ enabled: false }` override from the relevant Nightwatch test file (`a11yTestDefault.js` or `a11yTestAdmin.js`).
2. Run the Nightwatch suite locally to confirm it passes.
3. Update the tracking issue table in `ACCESSIBILITY.md` section 9.

### Step 7 — Commit and push

```bash
git add <changed-template-file> core/tests/playwright/tests/a11y-regressions.spec.ts
git commit -m "fix(a11y): [#ISSUE] description of fix

Fixes: <rule-id> violation on <template-name>
Pages affected: N (template-level fix)
axe impact: serious/critical/moderate
WCAG: <criterion>

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# Push to your GitHub mirror
git push github my-a11y-work

# Push a patch branch to drupal.org issue fork
git push drupal-ISSUE HEAD:11.x
```

---

## 6. Adding Pages to the Inventory

When core adds a new route or you find a page type not covered, add it to `lib/pages.ts`:

```typescript
// In anonymousPages or adminPages array:
{
  name: 'My new page',
  path: '/my/path',
  requiresAuth: false,
  // Only add disabledRules with a tracking issue:
  disabledRules: [
    { rule: 'region', issue: 'https://drupal.org/i/3318396' },
  ],
},
```

Keep `disabledRules` entries minimal — they should match rules already tracked in `ACCESSIBILITY.md` section 9.

---

## 7. CI Integration

### GitLab CI jobs

| Job | Stage | Trigger |
| :--- | :--- | :--- |
| `🦉 Nightwatch` | ⚡️ Tests | Every MR |
| `🎭 Playwright A11y` | 🗜️ Additional tests | Daily schedule; MR touching `.twig` files or `tests/playwright/` |

### Artifacts

The `🎭 Playwright A11y` job saves:
- `axe-results.json` — full per-page violation data (90-day retention)
- `pattern-report.json` — grouped patterns (90-day retention)
- `PATTERN-REPORT.md` — human-readable report (available directly in GitLab CI artifacts)

### Viewing CI results

In GitLab, on any completed `🎭 Playwright A11y` pipeline:
1. Open the job → **Browse** artifacts
2. Download or preview `PATTERN-REPORT.md`

---

## 8. Phased Rule Re-enablement

The disabled axe rules are tracked in `ACCESSIBILITY.md` section 9. The current priority order (by axe impact + WCAG level):

1. `duplicate-id-aria` — Critical, WCAG 2.2 A → [#3318398](https://drupal.org/i/3318398)
2. `duplicate-id-active` — Serious, WCAG 2.2 A → [#3318394](https://drupal.org/i/3318394)
3. `color-contrast` — Serious, WCAG 2.2 AA → [#3318394](https://drupal.org/i/3318394)
4. `heading-order` — Moderate, WCAG 2.2 A → [#3318398](https://drupal.org/i/3318398)
5. `region` — Moderate, WCAG 2.2 A → [#3318396](https://drupal.org/i/3318396)

Work one rule at a time. File all child issues before starting. See `ACCESSIBILITY.md` section 9 for the full process.

---

## 9. Quick Reference

```bash
# Run full axe crawl + regressions
cd core && yarn test:a11y:playwright

# Run Lighthouse audit
cd core && yarn test:a11y:lighthouse

# Analyze patterns from last crawl
cd core && yarn a11y:analyze

# Add regression test after fixing a violation
cd core && yarn a11y:add-regression --rule RULE --page /path --issue NNNNNN

# Install Playwright browser (first time only)
cd core && npx playwright install chromium --with-deps
```

---

## Related Files

| File | Purpose |
| :--- | :--- |
| `ACCESSIBILITY.md` | Standards, severity taxonomy, governance |
| `core/tests/playwright/lib/pages.ts` | Page inventory for crawls |
| `core/tests/playwright/tests/a11y-axe-crawl.spec.ts` | Axe crawl test |
| `core/tests/playwright/tests/a11y-regressions.spec.ts` | Regression guards |
| `core/tests/playwright/scripts/analyze-patterns.js` | Pattern analyzer |
| `core/tests/playwright/scripts/add-regression.js` | Regression scaffolding |
| `core/tests/Drupal/Nightwatch/Tests/a11yTestDefault.js` | Nightwatch axe (Olivero) |
| `core/tests/Drupal/Nightwatch/Tests/a11yTestAdmin.js` | Nightwatch axe (Claro) |
| `.gitlab-ci.yml` | CI pipeline configuration |
