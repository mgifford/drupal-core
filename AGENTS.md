# AGENTS.md

Instructions for AI coding assistants contributing to this repository.

## Primary references (read first)

1. Local policy: `ACCESSIBILITY.md`
2. Local style guide: `STYLES.md` — design tokens, UI copy patterns, button vocabulary, heading conventions
3. Sustainability policy reference: https://mgifford.github.io/ACCESSIBILITY.md/SUSTAINABILITY.html
4. Browser support policy reference: https://mgifford.github.io/ACCESSIBILITY.md/BROWSER_SUPPORT.html
5. Agent guidance reference: https://mgifford.github.io/ACCESSIBILITY.md/AGENTS.html

## Core requirements

### Accessibility

- Treat WCAG 2.2 AA as baseline.
- Prefer semantic HTML before ARIA.
- Preserve keyboard operability and visible focus.
- Keep content understandable and inclusive.
- Do not introduce known critical accessibility regressions.

### Progressive enhancement

- Build HTML-first, then layer CSS, then JavaScript.
- Never require JavaScript for core navigation or form completion unless a non-JS fallback exists.
- Ensure failure of optional enhancements does not break baseline functionality.

Reference: https://mgifford.github.io/ACCESSIBILITY.md/examples/PROGRESSIVE_ENHANCEMENT_BEST_PRACTICES.html

### Automation expectations

Use shift-left behavior whenever possible:

- Prefer fast local checks before broad CI runs.
- Keep checks deterministic and task-scoped.
- In CI, prioritize actionable output over noisy logs.

### Definition of Done for Accessibility Patches

For accessibility patch MRs, done means:

- Include automated regression coverage for the accessibility behavior being fixed.
- Prefer the narrowest appropriate test layer for the change (Functional, FunctionalJavascript, Kernel, Unit, or Playwright).
- Do not mark accessibility patch MRs ready without at least one test assertion tied to the reported issue behavior.
- In the issue/MR summary, list the test file(s) and what behavior each assertion protects.
- If automated coverage is temporarily infeasible, document the blocker explicitly and include manual evidence plus a follow-up test issue.

References:
- https://mgifford.github.io/ACCESSIBILITY.md/examples/SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.html
- https://mgifford.github.io/ACCESSIBILITY.md/examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.html

## Drupal core patch pre-submit gate

Every Drupal core patch (issue-fork branch / merge request) must pass these
locally before pushing. This is the same gate GitLab CI runs; catching it
locally avoids red pipelines.

- **`core/scripts/dev/commit-code-check.sh`** (run from the core checkout). It
  checks changed files for PHPCS (Drupal + DrupalPractice), PHPStan, CSpell
  spell-check, ESLint (JS), and PostCSS/CSS compile correctness. Must exit `0`.
  It does **not** run PHPUnit — run that separately.
- **PHPUnit**: `./vendor/bin/phpunit -c core <path-to-tests>` for the changed
  module. Green before push.
- If a check fails, fix the root cause (do not suppress PHPCS/PHPStan). Add
  genuinely new terms to `core/misc/cspell/dictionary.txt` only with a follow-up.

Reference: the issue-fork `AGENTS.md` §3 — "Run
`./core/scripts/dev/commit-code-check.sh` before submitting; fix what it
reports. It does not run PHPUnit."

## Working style for agents

- Make minimal, request-scoped changes.
- Reuse existing patterns before introducing new structure.
- Avoid unnecessary complexity and avoid duplicate documentation.
- When uncertain, choose the more accessible and maintainable option.

## Sustainability and AI usage

- Prefer deterministic solutions when they meet the need.
- Keep prompts and context narrow to reduce compute and noise.
- Avoid repeated or redundant tool calls.
- When proposing PR text, include concise AI-usage disclosure if AI was used materially.
- Commit messages for changes materially produced or revised with AI assistance must include an AI-usage disclosure. Use a `Co-Authored-by: <AI tool>` trailer or a short footer such as `AI-assisted: <tool>`. This applies to work done in this repository and to upstream contributions prepared here.

Reference: https://mgifford.github.io/ACCESSIBILITY.md/SUSTAINABILITY.html

## Source and citation hygiene

- Prefer canonical project sources and standards references.
- Respect source usage restrictions and robots/copyright expectations.
- Link to authoritative guidance instead of copying large blocks of external content.

## Issue severity taxonomy

- **Critical**: likely blocks users from completing core tasks.
- **High**: significant barrier or likely WCAG AA failure.
- **Medium**: important but partial barrier.
- **Low**: minor fix or documentation polish.

Never recommend changes that knowingly introduce Critical or High accessibility issues.

## Quick decision framework

If unclear what to do:

1. Check `ACCESSIBILITY.md` requirements.
2. Use the referenced best-practice guides.
3. Prefer simpler, more robust, HTML-first solutions.
4. Escalate assumptions clearly when requirements conflict.
