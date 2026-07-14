# Drupal.org Issue Queue Comment Drafts (2026-07-13)

Prepared for d.o user: mgifford

## Issue #3573865 - Details preprocess incorrectly adds role to summary

I prepared a focused patch for this issue and included regression coverage.

**Bug ID:** DRU-3d2c0738 (instance) / DRU-93a3d129 (pattern)
**URL:** http://localhost/form-test/group-details
**XPath:** //summary[@data-summary-attribute="test"][@role="button"]
**Full DOM path:** /html/body//details[summary[@data-summary-attribute="test"]]/summary
**WCAG SC:** 1.3.1 - Info and Relationships (Level A)
**Rule:** manual semantic check - redundant-role-summary
**Severity:** Medium
**Frequency:** Pattern-level; applies to details summaries rendered by core preprocess on pages using #type details
**Screen type:** desktop | **Colour mode:** light

### HTML Snippet

```html
<summary data-summary-attribute="test" role="button" aria-expanded="false">
  Details element with summary attributes
</summary>
```

### What changed

- Removed redundant role assignment from summary in:
  - core/lib/Drupal/Core/Form/FormPreprocess.php
- Added regression assertions in:
  - core/modules/system/tests/src/Functional/Form/ElementTest.php
  - confirms aria-expanded remains present
  - confirms role is not rendered on summary

### Patch

- patches/a11y-DRUPAL-A11Y-010-issue-3573865-details-summary-role.patch

### Testing status

- Static checks and code review passed.
- Local runtime execution remains blocked in current environment due missing runnable php/phpunit path.

### Strict A/B validation evidence

- Baseline (patch removed):
  - `core/misc/details-aria.js` contains `attr('open') === 'open'` marker.
  - `core/tests/Drupal/FunctionalJavascriptTests/Core/Form/FormGroupingElementsTest.php` does not contain `assertEquals('false', ...)` assertion.
- Patched (patch applied):
  - `core/misc/details-aria.js` contains `parentNode.open ? 'false' : 'true'` marker.
  - `core/tests/Drupal/FunctionalJavascriptTests/Core/Form/FormGroupingElementsTest.php` contains `assertEquals('false', $summary->getAttribute('aria-expanded'));`.
- Roundtrip integrity:
  - Patch reverse/apply cycle completed cleanly with no residual diff.

Current verdict for this issue:
- Code-level A/B evidence: confirmed.
- Runtime A/B evidence (baseline fail + patched pass): pending environment support.

### AI disclosure

This contribution was prepared with assistance from an AI coding tool.
- Tool: GitHub Copilot (GPT-5.3-Codex)
- Used for: patch drafting, regression test drafting, issue comment drafting
- Reviewed by: mgifford
- Skills loaded: drupal-accessibility (sub-skills: drupal-a11y-fapi, drupal-a11y-qa)

---

## Issue #3533586 - Member for label rendered as heading

I prepared a focused patch for this issue and included regression coverage.

**Bug ID:** DRU-ce079269 (instance) / DRU-1aae3721 (pattern)
**URL:** http://localhost/user/2
**XPath:** //h4[contains(@class,"label") and normalize-space()="Member for"]
**Full DOM path:** /html/body//h4[contains(@class,"label") and normalize-space()="Member for"]
**WCAG SC:** 1.3.1 - Info and Relationships (Level A)
**Rule:** manual semantic check - heading-misuse-label
**Severity:** Medium
**Frequency:** 1 instance per user profile page where member_for is displayed
**Screen type:** desktop | **Colour mode:** light

### HTML Snippet

```html
<h4 class="label">Member for</h4>
```

### What changed

- Replaced heading markup with non-heading label markup in:
  - core/modules/user/src/Hook/UserHooks.php
- Added regression test in:
  - core/modules/user/tests/src/Functional/UserLoginTest.php
  - confirms Member for is not rendered as h4
  - confirms Member for is rendered as div.label

### Patch

- patches/a11y-DRUPAL-A11Y-011-issue-3533586-member-for-label.patch

### Testing status

- Static checks and code review passed.
- Local runtime execution remains blocked in current environment due missing runnable php/phpunit path.

### AI disclosure

This contribution was prepared with assistance from an AI coding tool.
- Tool: GitHub Copilot (GPT-5.3-Codex)
- Used for: patch drafting, regression test drafting, issue comment drafting
- Reviewed by: mgifford
- Skills loaded: drupal-accessibility (sub-skills: drupal-a11y-fapi, drupal-a11y-qa)

---

## Issue #3571628 - aria-expanded does not resync after details toggles

I prepared a focused patch for this issue and included regression coverage.

**Bug ID:** DRU-9da94f27 (instance) / DRU-e1099604 (pattern)
**URL:** http://localhost/node/add/article
**XPath:** //details//summary[@aria-expanded]
**Full DOM path:** /html/body//details/summary[@aria-expanded]
**WCAG SC:** 4.1.2 - Name, Role, Value (Level A)
**Rule:** manual state-sync check - aria-expanded-sync
**Severity:** Medium
**Frequency:** Pattern-level; affects details summaries using core details-aria behavior
**Screen type:** desktop | **Colour mode:** light

### HTML Snippet

```html
<details>
  <summary aria-expanded="true">Revision information</summary>
</details>
```

### What changed

- Updated details aria behavior to use the details open property for state sync in:
  - core/misc/details-aria.js
- Added regression coverage for close/reopen aria-expanded transitions in:
  - core/tests/Drupal/FunctionalJavascriptTests/Core/Form/FormGroupingElementsTest.php

### Patch

- patches/a11y-DRUPAL-A11Y-012-issue-3571628-aria-expanded-sync.patch

### Testing status

- Static checks and code review passed.
- Local runtime execution remains blocked in current environment due missing runnable php/phpunit path.

### AI disclosure

This contribution was prepared with assistance from an AI coding tool.
- Tool: GitHub Copilot (GPT-5.3-Codex)
- Used for: patch drafting, regression test drafting, issue comment drafting
- Reviewed by: mgifford
- Skills loaded: drupal-accessibility (sub-skills: drupal-a11y-dynamic, drupal-a11y-qa)

---

## Per-Issue Reset Workflow (to avoid patch carry-over)

Use this between issue investigations so each patch is generated from clean repo state.

1. Confirm and record current branch and HEAD:
   - git branch --show-current
   - git rev-parse --short HEAD

2. Stash any WIP before switching issue context:
   - git stash push -u -m "wip/<issue-id>"

3. Return to clean baseline before starting next issue:
   - git reset --hard HEAD
   - git clean -fd

4. Optionally sync baseline with upstream main before new issue work:
   - git fetch upstream
   - git merge --ff-only upstream/main

5. Start one issue at a time; create one focused patch file per issue.

6. After creating the patch, validate scope:
   - git diff --name-only
   - ensure files belong only to the active issue

7. Generate/refresh issue-specific patch artifact and comment draft.

---

## Non-Reproducible Issue Measurement Rubric

When a drupal.org accessibility issue cannot be reproduced, record outcome as evidence states instead of forcing a binary fixed/not-fixed claim.

1. Reproduction confidence
  - High: reproduced on clean current main.
  - Medium: reproduced only under a specific matrix.
  - Low: not reproduced after matrix attempts.

2. Matrix required in notes
  - URL/route and content state
  - Theme (default/admin)
  - Browser + AT pair
  - Viewport (desktop/mobile)
  - Color mode and high-contrast state

3. Outcome classification
  - `fixed`: baseline reproduces; patched no longer reproduces.
  - `regression`: baseline passes; patched fails.
  - `inconclusive`: baseline not reproduced (`no-baseline-instances-observed`).
  - `invalid-patch`: does not apply, target missing, or patch corrupt.

4. Queue handling guidance
  - Keep open with replication request when confidence is low.
  - Mark `needs info` when reporter matrix is missing.
  - Close `cannot reproduce` only after documented matrix attempts on current main.
