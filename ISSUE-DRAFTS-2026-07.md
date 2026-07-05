# Drupal core issue drafts — 2026-07

Five scoped, reviewable issue drafts ready to file at
[drupal.org/node/add/project-issue/drupal](https://www.drupal.org/node/add/project-issue/drupal).
Each is deliberately small ("sonnet-sized"): one measurable outcome, no
speculative scope. Review, adjust versions/components against the current
queue, and file.

> Disclosure to include in each issue: *AI-assisted drafting (Claude Code);
> reviewed and filed by a human. No external code copied.*

---

## Draft 1 — Default Admin theme: test and document real RTL, dark-mode, and accent rendering states

- **Category:** Task
- **Component:** Default admin theme
- **Priority:** Normal
- **Tags:** `Accessibility`, `RTL`, `Usability`

### Problem/Motivation

The new Default Admin theme (Gin-based) computes a family of derived color
variables from its accent presets, supports dark mode, and — like all core
themes — must work in RTL languages. None of these states can be validated
by mutating the DOM client-side after page load:

- Real RTL loads different server-side CSS (direction-aware stylesheets,
  logical-property fallbacks) and sets `dir` on the server. Flipping
  `document.dir` in DevTools or a test runner exercises a synthetic state
  that no user ever sees. (Our external a11y crawl made exactly this mistake
  and produced unusable RTL findings before switching to a real Hebrew
  language install.)
- Accent presets derive a palette beyond the base accent variable; testing a
  preset by overriding one CSS custom property misses most of what changes,
  including color-contrast outcomes.

There is currently no documented, repeatable way to test the Default Admin
theme across these real states, and no automated coverage of them.

### Proposed resolution

1. Document the supported state matrix for the Default Admin theme:
   {LTR, RTL (Hebrew/Arabic)} × {light, dark} × accent presets — including
   how each state is entered through real configuration (language install
   with URL prefix, `enable_dark_mode`, `preset_accent_color`).
2. Add Nightwatch (or FunctionalJavascript) coverage for at least one RTL
   language on representative admin pages (content list, node form, settings
   form), asserting direction-sensitive layout and focus indicators.
3. Add color-contrast assertions for each accent preset in both light and
   dark mode — accent changes are color-only, so a color-rules-only scan per
   preset keeps this cheap.

### Remaining tasks

- Agree on the representative admin page set.
- Decide Nightwatch vs. FunctionalJavascript placement.

---

## Draft 2 — Serve AVIF from image styles by default where the toolkit supports it

- **Category:** Feature request
- **Component:** image system
- **Priority:** Normal
- **Tags:** `Sustainability`, `Performance`

### Problem/Motivation

Image bytes dominate page weight on media-rich sites. Core's image style
pipeline can convert to WebP, but the most efficient widely-supported format
today is AVIF (~20–50% smaller than JPEG at comparable quality; supported in
all evergreen browsers). Every site that sticks with default image styles
ships larger images than necessary — multiplied across the Drupal ecosystem,
a platform-default improvement here is one of the highest-leverage
sustainability changes available (see the draft
[W3C Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/)
on efficient media formats).

### Proposed resolution

1. Audit current state: confirm GD/ImageMagick toolkit AVIF capabilities per
   supported PHP version, and what the image style "Convert" effect offers
   today.
2. Where the toolkit supports AVIF, make core's default image styles use it
   (with WebP → JPEG/PNG fallback chain), so new installs get it without
   configuration.
3. Record the measured byte savings on the Umami demo as evidence in the
   issue.

### Remaining tasks

- Fallback behavior for toolkits without AVIF encode support.
- Update Standard/Umami profile image style configs + upgrade path
  considerations for existing sites (likely: new defaults for new installs
  only).

---

## Draft 3 — Make core themes demonstrate best-practice font loading

- **Category:** Task
- **Component:** Olivero theme
- **Priority:** Normal
- **Tags:** `Sustainability`, `Performance`, `frontend`

### Problem/Motivation

Core themes are the pattern library the ecosystem copies. Font loading has
well-established best practices — WOFF2-only, subsetting, `font-display`,
preloading of critical faces, system-font fallback stacks with metric
overrides (`size-adjust`/`ascent-override`) to prevent layout shift — but
core themes don't currently document or fully demonstrate them, so contrib
themes routinely ship render-blocking, unsubsetted fonts.

### Proposed resolution

1. Audit font delivery in Olivero and the Default Admin theme: formats,
   subsetting, `font-display` values, preload usage, fallback stacks.
2. Fix gaps found (this may be a no-op in places — the audit is the
   deliverable either way).
3. Add a "font loading" section to core theming documentation capturing the
   pattern, so starterkit-derived themes inherit it.

### Remaining tasks

- Decide whether metric-override fallbacks are in scope for this pass.

---

## Draft 4 — Measure and ratchet down JavaScript shipped to anonymous users

- **Category:** Task
- **Component:** asset library system
- **Priority:** Normal
- **Tags:** `Sustainability`, `Performance`

### Problem/Motivation

Anonymous page views are the overwhelming majority of Drupal page views
ecosystem-wide, so every default script on an anonymous page is multiplied
billions of times. Core has steadily reduced anonymous-page JS (jQuery
removal from front-facing paths, behaviors cleanup), but there is no
measured baseline and no guard against regression: a library added to a
common template can silently put tens of KB back on every anonymous view.

### Proposed resolution

1. Establish the baseline: per-page JS bytes and request counts for a
   standard-profile anonymous crawl in Olivero (an external measurement
   pipeline exists and can be referenced/adapted:
   [sustainability trend reports](https://mgifford.github.io/drupal-core/)).
2. Publish the numbers in the issue and identify the largest contributors
   (attach per-library breakdown).
3. Propose a budget (e.g. "anonymous Olivero pages ship ≤ N KB JS") and a
   CI check or release-notes checklist item that flags budget breaks.

### Remaining tasks

- Agree where the check runs (core GitLab CI job vs. periodic external
  report).

---

## Draft 5 — Adopt a page-weight and DOM-size budget for the Default Admin theme

- **Category:** Task
- **Component:** Default admin theme
- **Priority:** Normal
- **Tags:** `Sustainability`, `Performance`, `Usability`

### Problem/Motivation

Content editors spend hours per day in the admin UI, often on modest
hardware. Admin pages are the heaviest in core (external crawl data shows
admin routes consistently at the top of per-page transfer size and DOM node
counts). Unlike the front end, the admin theme has no weight or DOM budget,
so complexity only accumulates.

### Proposed resolution

1. Publish the baseline from the existing per-page measurements: transfer
   bytes, request count, and DOM nodes for the ~20 crawled admin routes in
   the Default Admin theme (data:
   [reports/sustainability/history.json](https://github.com/mgifford/drupal-core/blob/main/reports/sustainability/history.json)).
2. Agree budgets for the top admin routes (e.g. content list, node edit
   form) — DOM node ceilings matter as much as bytes for assistive-tech
   responsiveness, which makes this an accessibility issue too.
3. Track per-release; flag regressions ≥10% in the issue or CI.

### Remaining tasks

- Pick the budget numbers from the baseline rather than aspiration.
- Coordinate with the Gin upstream on shared wins.
