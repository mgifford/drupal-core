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

References:
- https://mgifford.github.io/ACCESSIBILITY.md/examples/SHIFT_LEFT_ACCESSIBILITY_AUTOMATION.html
- https://mgifford.github.io/ACCESSIBILITY.md/examples/CI_CD_ACCESSIBILITY_BEST_PRACTICES.html

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
