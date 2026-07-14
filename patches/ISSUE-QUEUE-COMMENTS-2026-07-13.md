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

### Existing patch and thread context

- Existing community work is already present on the issue fork and MR:
  - https://git.drupalcode.org/project/drupal/-/merge_requests/14777
- Current MR state from API at review time:
  - Open, target branch `11.x`, detailed merge status `conflict`, merge status `cannot_be_merged`.
  - Diff currently includes:
    - core/lib/Drupal/Core/Form/FormPreprocess.php
    - core/modules/views/tests/src/Functional/Plugin/StyleTableTest.php
    - core/.phpstan-baseline.php
- Recent thread discussion includes open questions about native `<details>/<summary>` AT behavior (especially Safari/VoiceOver), and whether to keep/adjust custom summary behavior while preserving semantics.

### Loose ends to call out in queue comment

- Reconcile semantic fix scope with current MR conflict status and rebase needs.
- Confirm which parts of MR !14777 are still desired (core fix vs broader test/baseline churn).
- Confirm expected behavior in Safari/VoiceOver discussion scenarios to avoid regressions.

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

### Existing patch and thread context

- This issue already has active community patch/MR history and should be treated as additive review context, not greenfield:
  - Prior MR !12602 was closed when replacement MR !16141 was opened.
  - Thread participants reported local verification of `<h4 class="label">Member for</h4>` changing to `<div class="field__label">Member for</div>` and flagged this as the desired accessibility direction.
- Per your note, this issue is currently in `Reviewed & tested by the community` state, which aligns with the need for comments to focus on final-risk validation rather than restating baseline.

### Loose ends to call out in queue comment

- Visual regression risk remains the main thread concern (theme/CSS assumptions around heading vs non-heading label).
- Relationship to #2638250 should be acknowledged so reviewers know this does not replace the broader architectural follow-up.
- Queue comment should explicitly state that this patch set is intended to align with current MR direction rather than supersede community work.

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

## Issue #3049125 - Language switcher block is an unlabelled navigation landmark region

I prepared a focused patch for this issue and included regression coverage.

**Bug ID:** DRU-48550bb9 (instance) / DRU-9ee9dcbd (pattern)
**URL:** http://localhost/
**XPath:** //div[@id="block-test-language-block" and @role="navigation"]
**Full DOM path:** /html/body//div[@id="block-test-language-block" and @role="navigation"]
**WCAG SC:** 4.1.2 - Name, Role, Value (Level A)
**Rule:** manual landmark-name check - landmark-name
**Severity:** Medium
**Frequency:** Pattern-level; language provider blocks rendered as navigation landmarks
**Screen type:** desktop | **Colour mode:** light

### HTML Snippet

```html
<div id="block-test-language-block" role="navigation" class="language-switcher-language-interface">
  ...
</div>
```

### What changed

- Added aria-label fallback when language block role is set to navigation in:
  - core/modules/language/src/Hook/LanguageThemeHooks.php
- Added functional regression assertion in:
  - core/modules/language/tests/src/Functional/LanguageSwitchingTest.php
  - confirms language switcher landmark includes an accessible name via aria-label

### Patch

- patches/a11y-DRUPAL-A11Y-013-issue-3049125-language-switcher-nav-label.patch

### Testing status

- Static checks and code review passed.
- Local runtime execution remains blocked in current environment due missing runnable php/phpunit path.

### Strict A/B validation evidence

- Baseline (patch removed):
  - aria-label fallback lines absent from `LanguageThemeHooks::preprocessBlock()`.
  - navigation landmark name assertion absent from `LanguageSwitchingTest::doTestHomePageLinks()`.
- Patched (patch applied):
  - aria-label fallback present in `LanguageThemeHooks::preprocessBlock()`.
  - navigation landmark name assertion present in `LanguageSwitchingTest::doTestHomePageLinks()`.
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

## Issue #2443815 - #description_display does not work for details descriptions

I prepared a focused patch for this issue and included regression coverage.

**Bug ID:** DRU-9a7895e1 (instance) / DRU-7df48324 (pattern)
**URL:** http://localhost/form-test/group-details
**XPath:** //details[@id="edit-description-before"]//div[@id="edit-description-before--description"]
**Full DOM path:** /html/body//details[@id="edit-description-before"]/div[@id="edit-description-before--description"]
**WCAG SC:** 1.3.1 - Info and Relationships (Level A)
**Rule:** manual description-placement check - details-description-display
**Severity:** Medium
**Frequency:** Pattern-level; affects details elements with #description and #description_display across core and core themes
**Screen type:** desktop | **Colour mode:** light

### HTML Snippet

```html
<details id="edit-description-before">
  <div id="edit-description-before--description">Description before the child.</div>
</details>
```

### What changed

- Propagated details-specific description display configuration in:
  - core/lib/Drupal/Core/Form/FormPreprocess.php
- Updated details templates to respect before/after/invisible ordering in:
  - core/modules/system/templates/details.html.twig
  - core/themes/stable9/templates/form/details.html.twig
  - core/themes/starterkit_theme/templates/form/details.html.twig
  - core/profiles/demo_umami/themes/umami/templates/classy/form/details.html.twig
  - core/themes/olivero/templates/form/details.html.twig
  - core/themes/claro/templates/details.html.twig
  - core/themes/default_admin/templates/form/details.html.twig
- Added fixture and functional coverage in:
  - core/modules/system/tests/modules/form_test/src/Form/FormTestGroupDetailsForm.php
  - core/modules/system/tests/src/Functional/Form/ElementTest.php

### Patch

- patches/a11y-DRUPAL-A11Y-014-issue-2443815-details-description-display.patch

### Existing patch and thread context

- This issue has substantial historical patch context and should explicitly acknowledge prior community work:
  - 48 attached files and 50 comments in issue history.
  - Multiple historical patch/test-only iterations, including failed CI cycles and rerolls.
  - Thread records explicit baseline-vs-patched test reasoning and an earlier RTBC phase before the issue went stale.
- This current patch should be presented as a modernized, current-core refresh of that prior work, not a replacement without attribution.

### Loose ends to call out in queue comment

- Clarify which historical concerns are now resolved by current implementation (description placement propagation + cross-theme template behavior).
- Ask reviewers to focus on stale historical patch noise vs current patch applicability to main.
- Note that runtime A/B remains pending in this environment, while code-level A/B and patch roundtrip are confirmed.

### Testing status

- Static checks and code review passed.
- Local runtime execution remains blocked in current environment due missing runnable php/phpunit path.

### Strict A/B validation evidence

- Baseline (patch removed):
  - `FormPreprocess::preprocessDetails()` does not include details-specific fallback assignment for `description_display`.
  - `ElementTest::testDetailsDescriptionAttributes()` does not include assertion for `edit-description-before` ordering.
- Patched (patch applied):
  - `FormPreprocess::preprocessDetails()` includes `$variables['description_display'] = $element['#description_display'] ?? 'after';`.
  - `ElementTest::testDetailsDescriptionAttributes()` includes `edit-description-before` ordering assertion.
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

## Ready-To-Post HTML: Existing Issue Follow-Up Comments (With Comparison)

Use the following HTML blocks directly in drupal.org comments.

### Issue #3573865 - HTML follow-up with latest MR comparison

```html
<p>Follow-up validation for issue #3573865 (details summary role semantics).</p>

<p><strong>Scope confirmation:</strong> this issue is pattern-level for <code>#type details</code> where summary attributes are preprocessed, not a single-page-only case.</p>

<p><strong>Latest diff comparison (MR !14777 vs local patch):</strong></p>
<ul>
  <li><strong>Common:</strong> removes role assignment from <code>core/lib/Drupal/Core/Form/FormPreprocess.php</code>.</li>
  <li><strong>Local-only:</strong> adds regression coverage in <code>core/modules/system/tests/src/Functional/Form/ElementTest.php</code>.</li>
  <li><strong>MR-only:</strong> removes summary role assertion in <code>core/modules/views/tests/src/Functional/Plugin/StyleTableTest.php</code> and includes unrelated <code>core/.phpstan-baseline.php</code> churn.</li>
</ul>

<p><strong>Action requested:</strong> align final patch scope on main by deciding whether to include the <code>StyleTableTest.php</code> expectation change together with the functional regression test coverage.</p>
```

### Issue #3533586 - HTML follow-up with scope clarification and MR comparison

```html
<p>Follow-up validation for issue #3533586 ("Member for" heading semantics).</p>

<p><strong>Scope clarification:</strong> the reproduction text "Create any details element with content and a set #title..." belongs to issue #3573865, not #3533586. This issue is about <code>Member for</code> being rendered as heading markup on user profile output.</p>

<p><strong>Frequency clarification:</strong> approximately one instance per rendered user profile page where the <code>member_for</code> component is displayed.</p>

<p><strong>Latest diff comparison (MR !16141 vs local patch):</strong></p>
<ul>
  <li><strong>Common:</strong> markup change in <code>core/modules/user/src/Hook/UserHooks.php</code> (heading replaced with non-heading label container).</li>
  <li><strong>Local-only:</strong> added regression test in <code>core/modules/user/tests/src/Functional/UserLoginTest.php</code>.</li>
  <li><strong>MR-only:</strong> none in current diff snapshot.</li>
</ul>

<p><strong>Action requested:</strong> keep/merge regression coverage so the semantic fix remains protected against future heading regressions.</p>
```

### Issue #3571628 - HTML follow-up with latest MR comparison

```html
<p>Follow-up validation for issue #3571628 (aria-expanded state resynchronization on details toggles).</p>

<p><strong>Latest diff comparison (MR !14647 vs local patch):</strong></p>
<ul>
  <li><strong>Common:</strong> JavaScript behavior update in <code>core/misc/details-aria.js</code>.</li>
  <li><strong>Local-only:</strong> added functional JS regression coverage in <code>core/tests/Drupal/FunctionalJavascriptTests/Core/Form/FormGroupingElementsTest.php</code>.</li>
  <li><strong>MR-only:</strong> none in current diff snapshot.</li>
</ul>

<p><strong>Action requested:</strong> carry regression assertions with the JS behavior fix so close/reopen state transitions stay verified.</p>
```

### Issue #3049125 - HTML follow-up with current comparison status

```html
<p>Follow-up validation for issue #3049125 (language switcher landmark naming).</p>

<p><strong>Current comparison status:</strong> no active public MR was returned for this issue in current GitLab search, so comparison is against local patch scope only.</p>

<ul>
  <li><strong>Local patch scope:</strong> landmark label fallback in <code>core/modules/language/src/Hook/LanguageThemeHooks.php</code> plus functional coverage in <code>core/modules/language/tests/src/Functional/LanguageSwitchingTest.php</code>.</li>
</ul>

<p><strong>Action requested:</strong> when a new/rebased thread patch appears, compare file scope before RTBC so landmark naming and tests remain aligned.</p>
```

### Issue #2443815 - HTML follow-up with current comparison status

```html
<p>Follow-up validation for issue #2443815 (details description_display behavior).</p>

<p><strong>Current comparison status:</strong> no active public MR was returned for this issue in current GitLab search, so comparison is against local patch scope only.</p>

<ul>
  <li><strong>Local patch scope:</strong> preprocess propagation + cross-theme details template handling + fixture and functional coverage.</li>
</ul>

<p><strong>Action requested:</strong> when a fresh thread patch is posted, compare template/preprocess coverage and test breadth against this scope before final review.</p>
```

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

---

## Ready-To-Post: Existing Queue Issues (Additional)

Use these when posting follow-up comments to existing issues so we keep continuity with prior community work.

### Issue #3587661 - Missing labels in "Limited files with a single pre-existing value (required) field."

I validated this issue again against current local evidence and wanted to add context that should help move it forward.

- This issue is already in the queue and should be treated as ongoing community work, not a net-new report.
- The affected route from our scan evidence remains `/contact/imagefile_file`, with recurring selectors in the limited-file widget variants.
- The latest thread direction includes work being made on `main`, which aligns with current branch policy.

What I can add from current evidence:
- This appears adjacent to broader file-widget rendering/accessibility patterns that have shown up repeatedly in scan output.
- I recommend evaluating any incoming patch against the existing file-widget test coverage and ensuring label semantics are explicit, not only inferred from surrounding context.

Open reviewer checks I suggest calling out:
1. Confirm the exact control lacking an effective accessible label in the limited-file scenario.
2. Confirm the fix remains valid across admin/default themes and disabled-state variants.
3. Confirm test coverage includes a failing baseline assertion for the specific selector/route variant.

### Issue #3044440 - Improve tab navigation by providing 'details' elements with a default value for #title

I reviewed this issue as part of current accessibility triage and wanted to add a concise status-oriented note.

- This issue is still open in the queue and has prior discussion history.
- It intersects with details/summary semantics and therefore should be considered together with other active details-related fixes.

Suggested next-step framing for the thread:
1. Reconfirm whether the intended behavior is a default `#title` fallback at render-element level or at preprocess/theme level.
2. Ensure any proposed fallback does not mask real authoring mistakes where a meaningful title is required.
3. Add/refresh functional coverage on existing `form_test` routes that already exercise details elements.

I am intentionally not proposing a broad new implementation here without a fresh failing test and a current-main patch path, to avoid repeating stale patch cycles.

---

## Ready-To-Post: New Bug Candidates From Scan Evidence

These are structured draft comments you can adapt into new issue filings, based on the current pattern report and bug export artifacts.

### New Candidate A - DRU-58ED44E2 (color-contrast, label[for="edit-preferred-theme"])

I found a reproducible contrast issue in scan evidence that appears suitable for a new core accessibility issue.

**Pattern ID:** DRU-58ED44E2  
**Rule:** `color-contrast`  
**WCAG:** 1.4.3 (AA)  
**Impact:** serious  
**Selector:** `label[for="edit-preferred-theme"]`  
**Sample paths:** `/admin/config/system/site-information`, `/admin/modules`, `/admin/people`  

Sample snippet:

```html
<label for="edit-preferred-theme" class="form-item__label">Preferred theme</label>
```

Request for issue triage:
1. Confirm contrast ratio across supported admin color-mode/theme variants.
2. Fix token/variable source rather than one-off CSS overrides where possible.
3. Add regression coverage for affected theme conditions.

### New Candidate B - DRU-6CBB7080 (color-contrast, admin toolbar burger label)

I found a serious color-contrast issue on the admin toolbar burger-label text in scan evidence.

**Pattern ID:** DRU-6CBB7080  
**Rule:** `color-contrast`  
**WCAG:** 1.4.3 (AA)  
**Impact:** serious  
**Selector:** `.toolbar-button--icon--burger > .toolbar-button__label[data-toolbar-text=""]`  
**Sample snippet:**

```html
<span class="toolbar-button__label" data-toolbar-text="">Expand sidebar</span>
```

Request for issue triage:
1. Verify in admin dark/accent variants where this pattern appears.
2. Ensure fixes preserve toolbar icon/text semantics and focus visibility.
3. Add regression checks for responsive toolbar states.

### New Candidate C - DRU-D377125E (link-in-text-block in limited file widget)

I found a reproducible link distinguishability issue in the limited-file widget view.

**Pattern ID:** DRU-D377125E  
**Rule:** `link-in-text-block`  
**WCAG:** 1.4.1 (A)  
**Impact:** serious  
**Selector:** `#edit-imagefile-file-limited-dis-N > .form-managed-file__main > .file.file--mime-text-plain.file--text > .menu-item__link[type="text/plain"]`  
**Path:** `/contact/imagefile_file`  

Sample snippet:

```html
<a href="/sites/default/files/README.txt" type="text/plain" class="menu-item__link">README.txt</a>
```

Request for issue triage:
1. Ensure link styling is distinguishable from surrounding text without relying on color only.
2. Validate in the same file-widget variants where disabled/meta states are present.
3. Add focused CSS regression coverage.

### New Candidate D - DRU-05EC5EAB (color-contrast, hidden region message)

I found a serious color-contrast issue on hidden-region placeholder table text.

**Pattern ID:** DRU-05EC5EAB  
**Rule:** `color-contrast`  
**WCAG:** 1.4.3 (AA)  
**Impact:** serious  
**Selector:** `.region-hidden-message > td[colspan="9"]`  
**Path:** `/admin/structure/types/manage/test_type/display/default`  

Sample snippet:

```html
<td colspan="9">No field is hidden.</td>
```

Request for issue triage:
1. Verify contrast in both default and admin themes.
2. Fix via design token(s) where possible.
3. Confirm no regressions in table readability.

### New Candidate E - DRU-5867174A (target-size, tabledrag handle)

I found a serious touch-target size issue in tabledrag handles.

**Pattern ID:** DRU-5867174A  
**Rule:** `target-size`  
**WCAG:** 2.5.8 (AA)  
**Impact:** serious  
**Selector:** `tr[data-drupal-selector="edit-terms-tid10"] > .tabledrag-cell > .tabledrag-cell-content.js-tabledrag-cell-content > .tabledrag-cell-content__item > .tabledrag-handle[href="#"][title="Move in any direction"]`  
**Path:** `/tabledrag`  

Sample snippet:

```html
<a href="#" title="Move in any direction" class="tabledrag-handle"><div class="handle"></div></a>
```

Request for issue triage:
1. Confirm minimum target dimensions and spacing across pointer modalities.
2. Validate keyboard + pointer parity for drag affordances.
3. Add regression checks for mobile viewport behavior.

---

## Scan Wave 2 Priority Queue (2026-07-14)

This section captures additional high-value targets from the latest ranking pass, excluding pattern IDs already drafted above.

### Likely New Issues To File Next

1. DRU-D62C6EC9
  - rule: color-contrast
  - impact: serious
  - wcag: 1.4.3 AA
  - selector: #edit-submit
  - prevalence: 34 concrete paths

2. DRU-5CF2AC9D
  - rule: color-contrast
  - impact: serious
  - wcag: 1.4.3 AA
  - selector: .toolbar-button--icon--theming-tools-dashboard > .toolbar-button__label[data-toolbar-text=""]
  - prevalence: 29 concrete paths

3. DRU-850DCDEB
  - rule: color-contrast
  - impact: serious
  - wcag: 1.4.3 AA
  - selector: label
  - prevalence: 11 concrete paths

4. DRU-1296E451
  - rule: color-contrast
  - impact: serious
  - wcag: 1.4.3 AA
  - selector: .button--action
  - prevalence: 5 concrete paths

5. DRU-09E68687
  - rule: color-contrast
  - impact: serious
  - wcag: 1.4.3 AA
  - selector: .toolbar-button--icon--system-admin-structure > .toolbar-button__label[data-toolbar-text=""]
  - prevalence: 4 concrete paths

6. DRU-C173AC22
  - rule: color-contrast
  - impact: serious
  - wcag: 1.4.3 AA
  - selector: .toolbar-button--icon--navigation-create > .toolbar-button__label[data-toolbar-text=""]
  - prevalence: 3 concrete paths

7. DRU-EE5E2CD9
  - rule: color-contrast
  - impact: serious
  - wcag: 1.4.3 AA
  - selector: .toolbar-button--icon--system-admin-config > .toolbar-button__label[data-toolbar-text=""]
  - prevalence: 3 concrete paths

8. DRU-33BE632E
  - rule: target-size
  - impact: serious
  - wcag: 2.5.8 AA
  - selector: #edit-terms-tid10-term
  - prevalence: 1 concrete path (high interaction risk)

### Likely Existing Issues (Post Follow-Up Comments, Not New Filing)

1. DRU-D8FCA413
  - rule: region
  - impact: moderate
  - section in reconciliation: likely already filed
  - observed commonality in scan evidence:
    - selector: `#primary-tabs-title`
    - sample markup: `<h2 id="primary-tabs-title" class="visually-hidden">Primary tabs</h2>`
    - prevalence: 24 routes (admin + form test routes)
    - pattern signal: local task/tab heading appears outside expected landmark containment on affected pages
  - candidate Drupal issue IDs from reconciliation (manual confirm):
    - #3049125 - https://www.drupal.org/i/3049125
    - #3568283 - https://www.drupal.org/i/3568283
    - #3344778 - https://www.drupal.org/i/3344778
  - best target recommendation:
    - No clean one-to-one open issue match in this candidate set.
    - Preferred: file as net-new issue scoped to `#primary-tabs-title` landmark containment, then cross-link #3049125 and #3568283 for related context.
    - If posting to an existing issue first, use #3049125 as the nearest landmark-structure thread, but call out scope mismatch clearly.

2. DRU-6488726D
  - rule: region
  - impact: moderate
  - section in reconciliation: likely already filed
  - observed commonality in scan evidence:
    - selector: `.top-bar__actions`
    - sample markup: `<div class="top-bar__actions">`
    - prevalence: 5 routes (admin content/config/taxonomy/type listing pages)
    - pattern signal: top-bar action container is outside expected landmark containment on affected pages
  - candidate Drupal issue IDs from reconciliation (manual confirm):
    - #3568283 - https://www.drupal.org/i/3568283
    - #3105316 - https://www.drupal.org/i/3105316
    - #3344778 - https://www.drupal.org/i/3344778
  - best target recommendation:
    - #3105316 is the closest thematic match but appears closed, so it is better as historical reference than active target.
    - Preferred: file as net-new issue scoped to `.top-bar__actions` landmark containment and cross-link #3105316 + #3568283.

### Posting Guidance

- For the first posting batch today, prioritize 3 high-prevalence serious issues from the list above.
- Use the existing issue comments section first when an issue already exists; only file net-new issues for items in the likely-new list.
- Keep each issue narrowly scoped to one pattern ID and one primary selector key.

### Fully Drafted HTML Filings (Top 3)

Use these as paste-ready HTML bodies for new drupal.org issue filing comments.

#### DRU-D62C6EC9 - color-contrast on #edit-submit

Suggested issue title:
- Admin submit button text contrast fails WCAG 2.2 AA on multiple admin routes

Manual search reference:
- https://www.drupal.org/project/issues/search?text=color-contrast%20edit-submit&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility

```html
<p>I found a reproducible color-contrast issue in Drupal core admin UI affecting submit buttons.</p>

<p><strong>Pattern ID:</strong> DRU-D62C6EC9<br>
<strong>Rule:</strong> color-contrast<br>
<strong>WCAG:</strong> 1.4.3 (AA)<br>
<strong>Impact:</strong> serious<br>
<strong>Selector:</strong> #edit-submit<br>
<strong>Prevalence:</strong> 34 affected routes in current crawl</p>

<p><strong>Representative routes:</strong></p>
<ul>
  <li>/admin/appearance</li>
  <li>/admin/config/content/formats</li>
  <li>/admin/config/system/site-information</li>
  <li>/admin/content</li>
  <li>/admin/modules</li>
  <li>/admin/people</li>
  <li>/admin/structure/block</li>
  <li>/admin/structure/taxonomy</li>
</ul>

<p><strong>Sample failing markup:</strong></p>
<pre><code>&lt;input data-drupal-selector="edit-submit" type="submit" id="edit-submit" name="op" value="Save configuration" class="button button--primary js-form-submit form-submit"&gt;</code></pre>

<p><strong>Request for triage/review:</strong></p>
<ol>
  <li>Confirm the measured text/background contrast ratio for the primary submit style token in admin theme variants.</li>
  <li>Fix through shared design token/variable updates rather than per-route overrides.</li>
  <li>Add regression coverage to prevent reintroduction across admin forms using <code>#edit-submit</code>.</li>
</ol>
```

#### DRU-5CF2AC9D - color-contrast on admin toolbar Theming Tools label

Suggested issue title:
- Admin toolbar "Theming Tools" label contrast fails WCAG 2.2 AA across routes

Manual search reference:
- https://www.drupal.org/project/issues/search?text=color-contrast%20toolbar%20(admin%20theme)%20toolbar-button--icon--theming-tools-dashboard&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility

```html
<p>I found a reproducible color-contrast issue affecting the admin toolbar label text for Theming Tools.</p>

<p><strong>Pattern ID:</strong> DRU-5CF2AC9D<br>
<strong>Rule:</strong> color-contrast<br>
<strong>WCAG:</strong> 1.4.3 (AA)<br>
<strong>Impact:</strong> serious<br>
<strong>Selector:</strong> .toolbar-button--icon--theming-tools-dashboard &gt; .toolbar-button__label[data-toolbar-text=""]<br>
<strong>Prevalence:</strong> 29 affected routes in current crawl</p>

<p><strong>Representative routes:</strong></p>
<ul>
  <li>/admin/appearance</li>
  <li>/admin/config/system/site-information</li>
  <li>/admin/content</li>
  <li>/admin/structure/types/manage/test_type/display/default</li>
  <li>/autocomplete</li>
  <li>/buttons</li>
  <li>/cd-navigation/config</li>
  <li>/contact/checkbox_radio</li>
</ul>

<p><strong>Sample failing markup:</strong></p>
<pre><code>&lt;span class="toolbar-button__label" data-toolbar-text=""&gt;Theming Tools&lt;/span&gt;</code></pre>

<p><strong>Request for triage/review:</strong></p>
<ol>
  <li>Confirm contrast measurements for toolbar label text in default, dark, and accent admin variants.</li>
  <li>Apply a shared toolbar text token fix so sibling toolbar icon-label items do not diverge.</li>
  <li>Add regression coverage for toolbar label contrast in responsive/collapsed toolbar states.</li>
</ol>
```

#### DRU-850DCDEB - color-contrast on form label text

Suggested issue title:
- Form label text contrast fails WCAG 2.2 AA on multiple admin/navigation routes

Manual search reference:
- https://www.drupal.org/project/issues/search?text=color-contrast%20label&projects=Drupal+core&assigned=&submitted=&project_issue_followers=&status%5B%5D=Open&issue_tags_op=%3D&issue_tags=Accessibility

```html
<p>I found a reproducible color-contrast issue affecting form label text in core admin/navigation pages.</p>

<p><strong>Pattern ID:</strong> DRU-850DCDEB<br>
<strong>Rule:</strong> color-contrast<br>
<strong>WCAG:</strong> 1.4.3 (AA)<br>
<strong>Impact:</strong> serious<br>
<strong>Selector:</strong> label<br>
<strong>Prevalence:</strong> 11 affected routes in current crawl</p>

<p><strong>Representative routes:</strong></p>
<ul>
  <li>/admin</li>
  <li>/admin/config</li>
  <li>/admin/reports</li>
  <li>/admin/structure</li>
  <li>/admin/structure/types</li>
  <li>/cd-navigation/config</li>
  <li>/dialog</li>
  <li>/tabs/format/plain_text</li>
</ul>

<p><strong>Sample failing markup:</strong></p>
<pre><code>&lt;label for="edit-preferred-theme" class="form-item__label"&gt;Preferred theme&lt;/label&gt;</code></pre>

<p><strong>Request for triage/review:</strong></p>
<ol>
  <li>Confirm label text contrast failures against current background tokens on affected routes.</li>
  <li>Fix via shared label/form token variables to avoid one-off selector overrides.</li>
  <li>Add a regression check for label contrast in both default and admin themes.</li>
</ol>
```

### Fully Drafted HTML Filings (Landmark/Region Candidates)

Use these as paste-ready HTML bodies for new drupal.org issue filing comments when a clean one-to-one existing issue does not match scope.

#### DRU-D8FCA413 - region on local task tabs heading containment

Suggested issue title:
- Primary tabs heading is outside landmark containment on multiple admin and form routes

Related issues to cross-link (context, not exact scope):
- https://www.drupal.org/i/3049125
- https://www.drupal.org/i/3568283
- https://www.drupal.org/i/3344778

```html
<p>I found a reproducible landmark-containment issue affecting local task tabs markup in Drupal core pages.</p>

<p><strong>Pattern ID:</strong> DRU-D8FCA413<br>
<strong>Rule:</strong> region<br>
<strong>WCAG:</strong> 1.3.1 (A), 2.4.1 (A)<br>
<strong>Impact:</strong> moderate<br>
<strong>Selector:</strong> #primary-tabs-title<br>
<strong>Prevalence:</strong> 24 affected routes in current crawl</p>

<p><strong>Observed common markup:</strong></p>
<pre><code>&lt;h2 id="primary-tabs-title" class="visually-hidden"&gt;Primary tabs&lt;/h2&gt;</code></pre>

<p><strong>Representative routes:</strong></p>
<ul>
  <li>/admin</li>
  <li>/admin/appearance</li>
  <li>/admin/content</li>
  <li>/admin/modules</li>
  <li>/admin/people</li>
  <li>/admin/structure/types</li>
  <li>/contact/checkbox_radio</li>
  <li>/contact/imagefile_file</li>
</ul>

<p><strong>Scope clarification:</strong> this is not primarily an aria-live behavior issue. The repeated pattern is landmark containment around local tab/task heading structure.</p>

<p><strong>Request for triage/review:</strong></p>
<ol>
  <li>Confirm whether the local task heading output is consistently inside an expected landmark region across affected routes.</li>
  <li>Identify the canonical template/render path for this heading and apply a single structural fix at that level.</li>
  <li>Add regression coverage that asserts landmark containment for local tabs in representative admin and form routes.</li>
</ol>

<p><strong>Related context:</strong> This issue is adjacent to landmark and region discussions in existing queue threads, but appears to be a distinct structural case and may be best tracked separately with cross-links.</p>
```

#### DRU-6488726D - region on top bar actions containment

Suggested issue title:
- Top bar actions container appears outside landmark containment on admin listing pages

Related issues to cross-link (context, not exact scope):
- https://www.drupal.org/i/3105316
- https://www.drupal.org/i/3568283
- https://www.drupal.org/i/3344778

```html
<p>I found a reproducible landmark-containment issue affecting top bar actions containers on admin listing pages.</p>

<p><strong>Pattern ID:</strong> DRU-6488726D<br>
<strong>Rule:</strong> region<br>
<strong>WCAG:</strong> 1.3.1 (A), 2.4.1 (A)<br>
<strong>Impact:</strong> moderate<br>
<strong>Selector:</strong> .top-bar__actions<br>
<strong>Prevalence:</strong> 5 affected routes in current crawl</p>

<p><strong>Observed common markup:</strong></p>
<pre><code>&lt;div class="top-bar__actions"&gt;</code></pre>

<p><strong>Affected routes:</strong></p>
<ul>
  <li>/admin/config/content/formats</li>
  <li>/admin/content</li>
  <li>/admin/people</li>
  <li>/admin/structure/taxonomy</li>
  <li>/admin/structure/types</li>
</ul>

<p><strong>Request for triage/review:</strong></p>
<ol>
  <li>Confirm that the top bar actions wrapper is within an expected landmark region on each affected route.</li>
  <li>Apply a structural fix in the shared template/render layer rather than route-specific overrides.</li>
  <li>Add regression coverage for landmark containment in at least one representative content list route and one structure route.</li>
</ol>

<p><strong>Related context:</strong> #3105316 is thematically related, but this pattern appears in a narrower top-bar-actions structure and is likely best tracked as a separate issue with cross-references.</p>
```
