# Tooling Roadmap — one bounded mission per session

Each entry is scoped to complete inside a single AI session (S ≈ under an
hour, M ≈ one focused session, L = spec first, then split). Every entry is
self-contained: a fresh session can execute it from this description alone.
Run them as individual queries — do not batch two M items into one ask.

## Done (for reference)

- ✅ WSG page checks batch 1: third-party/self-hosting detector,
  render-blocking head scripts, required-elements/meta-tags/structured-data
  presence, well-known files probe (`collectPageMetrics` in
  `core/tests/playwright/tests/a11y-axe-crawl.spec.ts` +
  `scripts/analyze-sustainability.js`). First data on the next crawl.
- ✅ Accessibility-tree snapshots: Playwright `ariaSnapshot()` per canonical
  page → `reports/ax-tree/latest/*.yml`, committed so git diffs surface
  silent name/role changes. (The AX tree is what assistive tech and AI
  agents consume — this baseline matters beyond human AT.)

## Queue

### 1. Focus-indicator & tab-order walker ([#25](https://github.com/mgifford/drupal-core/issues/25)) — **M**, highest value
New spec `tests/a11y-focus-walk.spec.ts`: for each page in `lib/pages.ts`
(desktop, both admin themes), Tab through the full focus order and record:
element, accessible name, computed styles focused vs. unfocused. Flag:
(a) no visible style change on focus (2.4.7 — the gap axe cannot test),
(b) focus indicator contrast < 3:1 against adjacent colors,
(c) focus traps (same element twice without progress),
(d) `document.activeElement === body` after interactions (focus loss),
(e) tab order vs. DOM order divergence.

Output: `reports/focus-walk-latest.json` + section in the pattern report.
Calibrate against zivtech/a11y-meta-skills eval fixtures (below) before
trusting results. Note: `a11y-keyboard-review.spec.ts` already does partial
keyboard review — extend it rather than duplicating; read it first.

### 2. Component-state crawler on theming_tools fixtures ([#26](https://github.com/mgifford/drupal-core/issues/26)) — **M**
New spec `tests/a11y-component-states.spec.ts` driving each theming_tools
demo route into its interesting states, re-running axe + `ariaSnapshot()`
per state: `/dialog` open, `/dropbutton` expanded, `/autocomplete` with
suggestions visible, `/tabs` after arrow-key navigation, `/contact/textform`
submitted with errors, `/tabledrag` mid-drag. Static-DOM scanning misses
these states entirely; this is also the prototype for MR-time component
gates in core CI.

### 3. Calibration harness on a11y-meta-skills fixtures ([#27](https://github.com/mgifford/drupal-core/issues/27)) — **S/M**
`zivtech/a11y-meta-skills` `evals/suites/a11y-critic/fixtures/` contains
labeled bug fixtures (popover-no-focus-management, dropdown-focus-bug,
checkbox-group-no-fieldset, …) with expected findings. Build a small runner
that renders each fixture and measures our checkers' recall/precision
against the labels. Any new checker (items 1, 2, 5) should report its
fixture score before its findings are trusted. This repo is also the
upstream of `tools/a11y-meta-skills` (git submodule).

### 4. Virtual screen reader journeys (Guidepup) ([#28](https://github.com/mgifford/drupal-core/issues/28)) — **L: spec first**
`@guidepup/virtual-screen-reader` runs a DOM-based SR in CI (no VoiceOver
needed). Convert Tier-1 user stories from `USER-STORIES.md` into journeys
that assert the *announced output sequence* (e.g. registration: every field
announces name/role/requirement; errors are announced on submit). Start
with 3 stories (1.1, 1.4, 2.2) as a proof, then scale via the coverage
matrix. Spec the assertion format first — this is the highest-ceiling item
and should be a Spec Kitty mission, not a single query.

### 5. Remaining WSG STAR batch 2 ([#29](https://github.com/mgifford/drupal-core/issues/29)) — **M**
- JS/CSS unused-bytes via Playwright coverage API (`remove-redundancy`,
  informs `code-splitting`) — per-bundle unused %, trended in history.json.
- No-JS smoke pass (`progressive-enhancement`): `javaScriptEnabled: false`
  context over anonymous pages; assert primary content renders.
- Minification heuristic (`minified-code`): fetch same-origin js/css,
  flag whitespace ratio above threshold.

### 6. Warm-cache second-visit metrics ([#30](https://github.com/mgifford/drupal-core/issues/30)) — **S**
In `scanRoute`, optionally reload the page in the same context and record a
second `PageMetrics` (`warmMetrics`). Cold/warm delta per page measures
cache-header effectiveness — evidence for the WSG alignment statement's
caching claims.

### 7. Main-thread CPU time per page ([#31](https://github.com/mgifford/drupal-core/issues/31)) — **M**
CDP `Performance.getMetrics` (TaskDuration, ScriptDuration) per canonical
scan → history.json. Bytes are a proxy; CPU time catches JS-heavy energy
regressions with identical page weight. Feeds the admin-theme budget issue.

### 8. WCAG SC coverage matrix ([#32](https://github.com/mgifford/drupal-core/issues/32)) — **S**
Generator mapping every WCAG 2.2 SC → (axe rule / custom check / contract
test / manual-only), from axe-core's rule metadata + a hand-map of our
custom checks. Output `WCAG-COVERAGE.md`. Tells the community which SCs
have zero automated signal; doubles as ACT/WSG IG implementer feedback.

### 9. AX-tree diff gate ([#33](https://github.com/mgifford/drupal-core/issues/33)) — **S** (after one more scan exists)
Script comparing `reports/ax-tree/latest/` against the previous git
revision; summarize name/role changes per page in the pattern report.
Promote to a CI check once the noise level is known.

## Nightly pipeline & OpenACR (design: NIGHTLY-PIPELINE.md)

The end-state: nightly core + Drupal CMS scans on a local server, new
patterns attributed to the introducing commit/MR (git blame, eventually),
and two OpenACR vendor-attestation reports (YAML + HTML) regenerated
nightly. Full architecture in [NIGHTLY-PIPELINE.md](NIGHTLY-PIPELINE.md);
build order:

### 10. Nightly orchestrator + coreCommit stamping ([#34](https://github.com/mgifford/drupal-core/issues/34)) — **M**
### 11. New-pattern → commit/MR attribution ([#35](https://github.com/mgifford/drupal-core/issues/35)) — **M**
### 12. Drupal CMS parallel scan profile ([#36](https://github.com/mgifford/drupal-core/issues/36)) — **M**
### 13. OpenACR generators, core + CMS ([#37](https://github.com/mgifford/drupal-core/issues/37)) — **L: spec first** (read mgifford/python-acr + GSA schema)
### 14. Known-issues reconciliation v2 ([#38](https://github.com/mgifford/drupal-core/issues/38)) — **M** (v1 shipped: `npm run a11y:known-issues`)

## Local AI layer — llama.cpp on the nightly server ([#39](https://github.com/mgifford/drupal-core/issues/39))

Tier-C local inference, batched nightly, in this order: (15a, S/M) embedding
similarity replaces the keyword matcher in sync-known-issues.js; (15b, M)
GBNF-constrained extraction of 'issue quality cards' from d.o issue bodies
(has SC? repro steps? selector?) to drive targeted nudges; (15c, M)
content-quality flags — useless alt text, ambiguous links, non-descriptive
headings — a class rules can't detect, always 'needs human review';
(15d, S) nightly digest of the scan diff; (15e, S) draft prose assist.
Guardrails in #39: no conformance determinations, no auto-merge, no
auto-posting, calibration accuracy required per task (#27), cache
embeddings, smallest passing model.

## Session-budget guidance

- One numbered item per query. Say "do roadmap item N" — this file has the
  context a fresh session needs.
- S items can be paired with a report regeneration; M items should be the
  only thing in the query; item 4 needs a spec/plan session before any code.
- Exploration (reading upstream repos, W3C docs) burns budget fast — items
  above already contain the conclusions, so skip re-research unless
  something fails.
