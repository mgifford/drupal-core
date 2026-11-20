> **Status: future work, recorded 2026-11-20.** This is the owner's brief,
> saved word for word below the line. It has not yet been reconciled with the
> current plan. The "Observatory brief" section of
> [MIGRATION-PLAN.md](MIGRATION-PLAN.md) maps its stages onto the existing
> phases and lists the decisions it raises. Do not start work from this file
> alone.

---

# Implementation Prompt: Drupal Quality Observatory

## Mission

You are a senior open-source software engineer, accessibility specialist, test architect, and technical documentation author.

You are working in:

https://github.com/mgifford/drupal-core

Your objective is to evolve this repository into a **continuous quality testing and reporting system for Drupal Core and Drupal CMS**.

The system should regularly acquire current upstream software, install reproducible test environments, execute meaningful user journeys, collect accessibility, performance, and sustainability evidence, compare results against previous runs, and publish accessible historical reports through GitHub Pages.

The system should ultimately answer:

1. What changed in Drupal Core or Drupal CMS this week?
2. Which accessibility problems are newly observed?
3. Which existing problems remain reproducible?
4. Which problems appear to have been resolved?
5. Which fixes have been verified through repeatable testing?
6. What has changed in performance and resource consumption?
7. Which components, themes, modules, or user journeys are responsible for the changes?
8. How much of the product was actually evaluated?
9. What evidence supports each finding?
10. Which findings require further human investigation?

**The central goal is not to generate more scan reports. It is to produce trustworthy, comparable evidence about software quality over time.**

Build toward a public, accessible, open-source implementation that other software projects could eventually adopt.

Work incrementally. Do not replace the existing repository or launch a large refactor without first inspecting its current state.

---

# 1. Read and understand the existing repository

Begin by inspecting the actual checked-out code and documentation.

Prioritize:

- `README.md`
- `AGENTS.md`
- `docs/architecture/CURRENT-STATE.md`
- `docs/architecture/CAPABILITY-INVENTORY.md`
- `docs/architecture/MIGRATION-PLAN.md`
- `docs/testing/PLAYWRIGHT.md`
- `NIGHTLY-PIPELINE.md`
- `A11Y-PROCESS.md`
- `WSG-ALIGNMENT.md`
- `WSG-STAR-AUTOMATION.md`
- `TOOLING-ROADMAP.md`
- `reports/README.md`
- `tools/a11y-fingerprints.js`
- `reports/pattern-tracker-map.json`
- `.github/workflows/`
- `tests/playwright/`
- Existing report generators, schemas, scripts, and historical artifacts.

Inspect the current GitHub Pages site:

https://mgifford.github.io/drupal-core/

Review its navigation, report structure, accessibility, available data, and limitations.

## Important existing context

An audit dated November 19, 2026 documented several problems:

- The repository includes a Drupal Core fork and additional testing infrastructure.
- The previous extensive Playwright suite under `core/tests/playwright/` was removed.
- Some historical report generators still reference that removed directory.
- A newer Playwright testing foundation exists under `tests/playwright/`.
- Some tests are discovered and have passing unit tests, but were not yet verified against a running DDEV installation.
- The repository has existing reports for accessibility patterns, keyboard navigation, contrast, themes, plain language, and sustainability.
- Published report data is substantially older than the current repository.
- The repository already has a migration plan for source acquisition, reproducible environments, Drupal CMS, longitudinal regression testing, performance, and sustainability.

These are historical audit findings, not assumptions about the current checkout.

**Revalidate every finding against the current branch before acting.**

Do not implement changes already completed in newer commits or pull requests.

## First deliverable

Create or update an implementation assessment describing:

1. Current capabilities.
2. Verified working capabilities.
3. Existing but unverified capabilities.
4. Broken or obsolete capabilities.
5. Relevant work completed since the previous audit.
6. Code and data that should be retained.
7. Missing functionality needed for the observatory.
8. Dependencies between implementation phases.
9. Risks associated with repository size, upstream changes, test reliability, and CI resources.

Use the existing capability inventory and migration plan where practical.

Avoid creating parallel planning documents that repeat the same material.

---

# 2. Architectural principles

Follow these principles throughout implementation.

## 2.1 Drupal is the test subject

Treat upstream Drupal Core and Drupal CMS as software under test.

The testing infrastructure should not depend on modifying upstream Drupal files.

Acquire upstream source code into isolated workspaces and pin exact revisions.

Do not assume the fork's `main` branch is the authoritative current Drupal Core source.

Use the canonical Drupal source repository:

https://git.drupalcode.org/project/drupal

For Drupal CMS, investigate the canonical development repository and its supported project templates and installation process:

https://www.drupal.org/project/drupal_cms

https://github.com/drupal/cms

Distinguish the Drupal CMS development repository from a complete installable product configuration.

Record which source is being tested.

## 2.2 Preserve previous work

Do not delete or replace existing reports, fixtures, documentation, patches, or historical evidence.

Do not rewrite repository history.

Maintain the existing published URLs, including:

- `/pattern-report-latest.html`
- `/DEFAULT-ADMIN-COLOR-REPORT-latest.html`
- `/KEYBOARD-REVIEW-latest.html`
- `/sustainability-report-latest.html`

Other existing public report URLs should also remain functional.

If a future architecture requires moving a report, preserve the old URL through a compatible static redirect or an equivalent backward-compatible output.

## 2.3 One responsibility per system

Avoid duplicating specialized capabilities already provided by related projects.

Relevant projects:

**Open Scans**

https://github.com/mgifford/open-scans

Provides multi-engine accessibility analysis, ACT mappings, comparison, and reporting.

**Firefox Energy Scanner**

https://github.com/mgifford/firefox-energy-scanner

Provides resource measurements, browser-energy measurements where supported, and modelled emissions.

**OpenACR Release Evidence**

https://github.com/mgifford/openacr-release-evidence

Provides issue-queue collection, release applicability evidence, WCAG criterion associations, and draft ACR exports.

**Drupal Core Lab**

https://github.com/mgifford/drupal-core-lab

Provides focused issue reproduction, patch evaluation, and before/after comparisons.

The Drupal Quality Observatory should own:

- Assessment-target configuration.
- Upstream source acquisition.
- Reproducible environments.
- User-journey definitions.
- Test orchestration.
- Scan run metadata.
- Historical comparisons.
- Cross-domain reporting.
- Coverage information.
- Public publication.

Integrate other systems through adapters, documented output formats, and stable identifiers.

Do not make the observatory depend on every external service being available.

A complete local accessibility scan should be possible without accessing optional external services.

## 2.4 Prefer existing standards

Use established standards, schemas, and methodologies where applicable.

Important references:

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WCAG-EM 2.0: https://www.w3.org/TR/WCAG-EM/
- WCAG-EM Report Tool: https://www.w3.org/WAI/eval/report-tool/
- W3C ACT Rules: https://www.w3.org/WAI/standards-guidelines/act/
- ATAG 2.0: https://www.w3.org/TR/ATAG20/
- Web Sustainability Guidelines: https://www.w3.org/TR/web-sustainability-guidelines/
- W3C ARRM: https://www.w3.org/WAI/planning/arrm/
- OpenACR: https://github.com/GSA/openacr

Use WCAG 2.2 AA as the initial accessibility assessment target, with documented handling of AAA criteria and other requirements.

Do not invent a new accessibility standard, sustainability certification, or conformance vocabulary.

---

# 3. Define the assessment targets

Build a configuration-driven system supporting multiple Drupal products.

Initially support:

1. Drupal Core upstream `main`.
2. A pinned current stable Drupal CMS release.

Design for subsequent support of:

3. A pinned stable Drupal Core release.
4. Drupal CMS development source.
5. Additional supported release lines.
6. Selected contributed modules and recipes.
7. Potentially LocalGov Drupal in the future.

Do not assume that current release identifiers or branches remain unchanged.

Discover supported versions from authoritative sources.

## 3.1 Each target needs a manifest

An assessment target should include:

- Stable target identifier.
- Product name.
- Product release or development channel.
- Repository URL.
- Exact Git commit or immutable release tag.
- Drupal Core version.
- PHP version and runtime requirements.
- Composer lockfile digest.
- Installed and enabled modules.
- Installed and enabled themes.
- Install profile.
- Recipes.
- Configuration.
- Default content fixtures.
- Test accounts and permissions.
- Browser configurations.
- Applicable test scenarios.
- Assessment scope.
- Declared exclusions.

Record the actual installed state rather than relying only on intended configuration.

For Drupal CMS, the installed dependency inventory is especially important.

Do not infer that Drupal CMS contains a fix simply because it appears in a newer Drupal Core branch.

## 3.2 Use reproducible environments

Use DDEV where practical.

Each assessment should start from a known installation state.

Implement isolated environments or a safe sequential reset model so global configuration changes do not contaminate other tests.

For example, switching admin themes or changing accent colors must not affect another concurrent test.

Capture the installed configuration and source references in the run manifest.

Support local execution before depending on GitHub Actions.

## 3.3 Track installation failures

An installation that fails is not a successful accessibility scan with zero findings.

Provide explicit states for:

- Source acquisition failure.
- Dependency resolution failure.
- Installation failure.
- Test environment unavailable.
- Authentication failure.
- Scenario setup failure.
- Scanner failure.
- Result processing failure.
- Publication failure.

Show those failures in the report and exclude affected observations from valid regression comparisons.

---

# 4. Create a stable scenario catalogue

The observatory must evaluate meaningful Drupal functionality, not merely collect page URLs.

Establish a scenario catalogue with stable identifiers and expected behaviour.

## 4.1 Initial scenarios

Include representative scenarios covering:

### Public content

- Homepage.
- Basic page.
- Article.
- Navigation.
- Search.
- Forms.
- Error pages.
- Authenticated versus anonymous content.

### Administrative navigation

- Administrative dashboard.
- Primary navigation.
- Local tasks.
- Breadcrumbs.
- Toolbar and sidebars.
- Overflow menus.
- Responsive navigation.

### Content authoring

- Create a basic page.
- Create an article.
- Edit content.
- Save content.
- Receive a validation error.
- Correct validation errors.
- Preview content where available.
- Delete content.
- Manage revisions.

### CKEditor

- Enter formatted text.
- Navigate toolbar buttons.
- Change formatting.
- Insert and edit links.
- Navigate dialogs.
- Operate with keyboard only.
- Check accessible names and focus behaviour.

### Media and files

- Open media library.
- Select media.
- Upload media.
- Edit alternative text.
- Remove media.
- Handle invalid file uploads.

### Site building

- Edit content types.
- Configure fields.
- Configure Views.
- Change block placement.
- Manage menus.
- Configure themes.
- Use administrative forms.

### Drupal CMS-specific functionality

Discover the features installed in the selected CMS recipe or starter configuration.

Create separate scenarios for relevant CMS functionality.

Do not assume an optional recipe is installed.

## 4.2 Scenario metadata

Each scenario should declare:

- Scenario ID.
- Product applicability.
- Required modules or recipes.
- User role.
- Setup requirements.
- Starting state.
- Actions.
- Expected behaviour.
- Expected completion state.
- Cleanup.
- Relevant components.
- Relevant accessibility criteria.
- Performance measurement points.
- Resource measurement points.
- Testing methods supported.

Create reusable setup and teardown helpers.

Avoid hardcoded assumptions about database IDs or user-generated content.

## 4.3 Playwright

Use Playwright as the primary journey runner.

Prefer:

- Accessible-name locators.
- Role-based locators.
- Explicit assertions.
- Stable fixture data.
- Deterministic setup.
- Recorded evidence.

Avoid brittle selectors based on incidental DOM structure whenever possible.

Use Playwright MCP for exploratory investigation and generating draft scenarios.

Review and convert useful MCP interactions into conventional Playwright tests.

Do not make automated weekly regression tests depend on interactive MCP sessions.

Never treat generated MCP scripts as verified tests until they have been executed and reviewed.

## 4.4 Accessibility testing environments

Build a manageable configuration matrix.

Relevant dimensions include:

- Desktop.
- Mobile.
- Light mode.
- Dark mode.
- Forced-colors mode.
- Reduced motion.
- Text zoom.
- Browser zoom.
- LTR.
- RTL.
- Relevant language settings.
- Different admin themes.
- Keyboard-only interaction.

Not every combination should be tested on every page.

Define:

1. A small mandatory weekly baseline.
2. Additional combinations for relevant components.
3. Targeted regression scenarios.
4. Rotating supplemental coverage.

A rotating sample must not silently replace the fixed baseline.

Record the coverage changes explicitly.

---

# 5. Design the common evidence architecture

Create an internal evidence model that can support accessibility, performance, and sustainability without erasing important distinctions.

Avoid developing three independent, incompatible report formats.

Use versioned schemas and reusable run metadata.

## 5.1 Run manifest

Each scan run should receive a unique immutable identifier.

A run manifest should record:

- Schema version.
- Run ID.
- Start and completion timestamps.
- Product and assessment target.
- Exact source commit.
- Installation identifier.
- Dependency lockfile digest.
- Applied configuration.
- Fixture version.
- Browser version.
- Operating system.
- Playwright version.
- Scanner versions.
- Test suite revision.
- Run mode.
- Runner environment.
- Scheduled versus manual execution.
- Scenario inventory.
- Planned tests.
- Executed tests.
- Successful tests.
- Failed tests.
- Skipped tests.
- Inconclusive tests.
- Infrastructure errors.
- Measurement capabilities.
- Evidence artifact references.
- Run status.

Use UTC timestamps internally.

The report can present dates in an accessible localised format.

Do not invent missing values.

Use explicit `null`, `unknown`, or `not-measured` states.

## 5.2 Suggested run data structure

Adapt this to the existing architecture rather than implementing it blindly.

```json
{
  "schema_version": "0.1.0",
  "artifact_type": "quality-run",
  "run_id": "example-run-001",
  "assessment_target": {
    "product": "drupal-core",
    "channel": "main",
    "source_repository": "https://git.drupalcode.org/project/drupal",
    "source_commit": "REPLACE_WITH_REAL_COMMIT"
  },
  "installation": {
    "profile": "standard",
    "composer_lock_sha256": null,
    "configuration_digest": null,
    "fixture_digest": null
  },
  "environment": {
    "browser": "chromium",
    "browser_version": null,
    "runner": "github-actions",
    "measurement_tier": "structural"
  },
  "coverage": {
    "planned": 0,
    "executed": 0,
    "passed": 0,
    "failed": 0,
    "skipped": 0,
    "inconclusive": 0
  },
  "status": "NOT_RUN",
  "evidence": []
}
```

This is a synthetic schema example, not an actual scan record.

Reject unresolved placeholders in real production records.

## 5.3 Immutable evidence

Every published finding should trace to a specific run.

Do not overwrite historical raw evidence with each subsequent scan.

Generate current reports from the latest eligible run while preserving the underlying history.

Consider content-addressed artifacts and checksums.

Large evidence files may live outside the main Git history, but they need durable references.

Do not rely solely on short-lived GitHub Actions artifacts for historical evidence.

## 5.4 Separate evidence types

Support distinct records for:

- Accessibility rule results.
- Accessibility journey assertions.
- Manual accessibility observations.
- Accessibility-tree snapshots.
- Screen-reader transcripts.
- Screenshots.
- DOM excerpts.
- Performance measurements.
- Resource measurements.
- Energy measurements.
- Modelled environmental estimates.
- Drupal.org issue references.
- Release applicability evidence.
- Human reviewer decisions.

Preserve their source-specific meaning.

Do not flatten everything into a generic score.

---

# 6. Implement stable finding identities

Reuse the existing fingerprint infrastructure:

`tools/a11y-fingerprints.js`

Inspect the versioned fingerprint profiles in:

https://github.com/mgifford/ACCESSIBILITY.md

Preserve the existing legacy and versioned identifiers.

Do not introduce competing fingerprint algorithms without a documented migration.

## 6.1 Three levels of identity

Distinguish:

**Problem pattern**

A recurring accessibility defect or behaviour that can occur across multiple pages or contexts.

**Occurrence**

The problem observed in a particular location, element, scenario, or test context.

**External issue**

A Drupal.org issue or another tracker entry associated with the problem.

These are not interchangeable.

One pattern can have many occurrences.

One issue can reference multiple patterns.

Multiple scanner engines may identify the same underlying defect.

A human may link patterns to an external issue.

Do not guess issue links from text similarity and present them as confirmed.

## 6.2 Cross-engine findings

Different engines may report related failures under different rule identifiers.

Normalize common evidence fields while retaining:

- Original engine.
- Original rule.
- Engine version.
- ACT rule reference where available.
- Candidate WCAG mapping.
- Original result.
- Original diagnostic message.
- Element location.
- Evidence.
- Review status.

Do not assume two results are duplicates simply because they reference the same WCAG criterion.

Maintain explicit relationships:

- Same observed failure.
- Related failure.
- Possible overlap.
- Independent failure.
- Unreviewed association.

Use existing Open Scans normalization logic when practical.

---

# 7. Build a trustworthy regression comparison engine

This is a critical requirement.

Implement historical comparison only after the run manifests and stable finding identities are reliable.

A weekly scan needs to distinguish genuinely new defects from changes in scanner configuration or coverage.

## 7.1 Finding lifecycle

Support these states:

### New observation

A pattern or occurrence is observed for the first time in a comparable target and test context.

### Continuing

The same problem was observed in the previous comparable run and the current run.

### No longer observed

A previously detected finding is absent from a successful comparable retest, but resolution has not yet been confirmed.

### Verified resolved

A reproducible test confirms the previous barrier is no longer present in the specific tested software version.

### Reappeared

A previously resolved finding is observed again.

### Changed impact

A previously known pattern affects additional or fewer routes, scenarios, or contexts.

### Not comparable

The evidence cannot support a direct comparison.

Possible causes include:

- Missing tests.
- Changed test fixtures.
- Different installation configuration.
- Scanner upgrades.
- Changed rules.
- Changed scope.
- Authentication failure.
- Missing components.
- Missing pages.
- Infrastructure failure.

### Needs review

The outcome is ambiguous or requires human judgment.

## 7.2 Resolution requirements

Never mark a finding as fixed merely because:

- It disappeared from a scan.
- Its Drupal.org issue was closed.
- The page was removed.
- The module was disabled.
- The rule was excluded.
- A browser failed to load.
- The test was skipped.
- The scanner failed.
- A relevant patch was merged.

A verified resolution requires evidence that the relevant behaviour was retested under comparable conditions and now satisfies the applicable test assertions.

For unstable or ambiguous results, use repeat testing or human review.

Retain the entire lifecycle history.

## 7.3 Distinguish different counts

Reports should distinguish:

- Distinct problem patterns.
- Individual occurrences.
- Affected routes.
- Affected scenarios.
- Affected components.
- Candidate WCAG criteria.
- Verified resolutions.
- Inconclusive findings.
- Newly filed Drupal.org issues.
- Drupal.org issues no longer active.

Never present these as interchangeable totals.

A single shared template defect affecting 300 pages is one pattern with potentially hundreds of occurrences.

## 7.4 Comparison eligibility

Before comparing runs, verify:

- Same relevant assessment target.
- Comparable installed components.
- Compatible scenario definitions.
- Compatible test conditions.
- Compatible scanner rule sets.
- Comparable fixtures.
- Compatible measurement environments.

A new software version is expected to differ, but the test conditions must remain interpretable.

When dimensions change, classify the comparison as partial or not comparable, and explain why.

## 7.5 Historical baseline selection

Compare each run against the most recent successful and comparable baseline, not necessarily the previous calendar week.

If the previous scheduled run failed, do not use it to infer that findings were resolved.

Record the selected baseline run ID and the reason for its selection.

---

# 8. Build WCAG-EM 2.0-aligned accessibility reporting

Use WCAG-EM 2.0 as the main reporting methodology.

Reference:

https://www.w3.org/TR/WCAG-EM/

WCAG-EM 2.0 contains five major evaluation steps.

Use them to structure the evidence.

**Do not present automated scanning as a completed WCAG-EM evaluation.**

## 8.1 Step 1: Define evaluation scope

Record:

- Product being evaluated.
- Exact software version.
- Installed configuration.
- Included functionality.
- Excluded functionality.
- WCAG target and level.
- Accessibility support baseline.
- Technologies relied upon.
- Supported browsers.
- Assistive technology configurations.
- Test environment.
- Known limitations.

Explicitly distinguish Drupal Core's bundled functionality from functionality enabled in the assessment installation.

For Drupal CMS, document installed recipes and dependencies.

## 8.2 Step 2: Explore the product

Build an inventory of:

- Pages and views.
- Functional components.
- User journeys.
- Common templates.
- Administrative interfaces.
- Content types.
- Forms.
- Dynamic functionality.
- Authoring tools.
- Supported interaction methods.

Associate scenarios with these items.

Record which inventories were automatically generated and which were manually reviewed.

## 8.3 Step 3: Select a representative sample

Maintain a sample manifest.

Distinguish:

- Mandatory representative scenarios.
- Shared components.
- Complete user processes.
- Additional risk-based scenarios.
- Randomly selected supplementary samples.
- Targeted regression scenarios.

Use deterministic seeds for any random sampling intended to be reproducible.

Keep a stable core comparison sample between weeks.

Show sampling limitations in the public report.

## 8.4 Step 4: Evaluate the sample

Collect multiple types of evidence:

- axe-core.
- Other supported rule engines.
- Playwright assertions.
- Keyboard navigation.
- Focus management.
- Accessible-name checks.
- Dynamic content behaviour.
- Error handling.
- Color and contrast measurements.
- Zoom and reflow checks.
- Forced-colors behaviour.
- Relevant accessibility-tree observations.
- Guidepup transcripts where appropriate.
- Human testing evidence where provided.

Keep automated and manual methods distinct.

Guidepup transcripts may reveal unexpected behaviour, but a transcript alone does not establish that every relevant accessibility requirement is satisfied.

Do not silently turn an automated rule result into a full WCAG criterion pass or failure.

## 8.5 Step 5: Report evaluation findings

Generate a structured accessibility report containing:

1. Scope.
2. Assessment target.
3. Testing methodology.
4. Sample inventory.
5. Coverage.
6. Evaluation environment.
7. Findings.
8. WCAG criterion associations.
9. Evidence references.
10. Incomplete evaluations.
11. Known limitations.
12. Reviewer decisions.
13. Machine-readable exports.

Use appropriate language:

- Observed failure.
- Passed automated check.
- Potential issue.
- Requires manual evaluation.
- Not tested.
- Inconclusive.
- Verified resolution.
- Not applicable with documented justification.

Use conformance terminology only when supported by a human-reviewed evaluation.

## 8.6 WCAG criterion pages

Create an index of WCAG 2.2 success criteria.

Each applicable criterion should have a dedicated view showing:

- Criterion number and title.
- Level.
- Source documentation.
- Relevant ACT rules.
- Available automated tests.
- Manual tests required.
- Related scenarios.
- Observed findings.
- Historical changes.
- Coverage gaps.
- Current review status.
- Links to supporting evidence.

For example, a 1.4.3 Contrast (Minimum) page should show relevant observed contrast failures and their tested conditions.

It should not claim that the entire criterion passes when no automated failures are found.

## 8.7 ATAG

Drupal is also an authoring environment.

Keep ATAG 2.0 Part A and Part B evidence distinct from WCAG results.

Design the data model so authoring-related accessibility evidence can be linked to the appropriate ATAG considerations later.

Reuse the ATAG work in OpenACR Release Evidence.

Do not implement a second complete ATAG evaluation system during the initial pilot.

## 8.8 WCAG-EM Report Tool interoperability

Investigate the current JSON format used by the official WCAG-EM Report Tool.

Determine whether the observatory can produce:

- A structured import draft.
- A partially completed evaluation.
- A human-editable JSON export.
- A standalone accessible HTML report.

Validate the actual import format with the current tool.

Do not invent a supposed compatible JSON format.

If a reliable export is not immediately practical, document the mapping and defer implementation.

## 8.9 Accessibility reporting disclaimer

Clearly identify automated monitoring reports with language similar to:

"Automated accessibility monitoring aligned with WCAG-EM 2.0 reporting principles. This report documents the functionality tested, observed findings, and remaining evaluation gaps. It is not a complete WCAG conformance evaluation."

Do not issue automated accessibility certifications or unsupported conformance claims.

---

# 9. Add robust performance reporting

Use the same representative journeys and assessment targets.

Performance testing should identify regressions attributable to components and interactions, not just changes in an overall Lighthouse score.

## 9.1 Initial metrics

Collect, where supported:

- Largest Contentful Paint.
- Cumulative Layout Shift.
- Total Blocking Time.
- First Contentful Paint.
- Time to First Byte.
- Navigation timing.
- JavaScript execution time.
- Main-thread work.
- Long tasks.
- Resource transfer size.
- Request count.
- DOM size.
- Render-blocking resources.

Use Lighthouse for a consistent laboratory baseline.

Use browser tracing for deeper investigation.

Do not report Interaction to Next Paint as if it were a reliably measured field metric from an ordinary synthetic Lighthouse page load.

If useful interaction timings are collected, label the method and metric accurately.

## 9.2 Drupal-specific metrics

Explore feasible instrumentation for:

- PHP execution.
- Peak PHP memory.
- Database queries.
- Cache hits and misses.
- Render caching.
- Server response times.
- Drupal bootstrap and render costs.

Do not make backend instrumentation mandatory for initial frontend reporting.

Keep server metrics separate from browser metrics.

## 9.3 Repeated measurements

Performance results vary.

Use:

- A documented number of repetitions.
- Controlled test environments.
- Consistent cache states.
- Stable fixtures.
- Consistent browser configurations.
- Comparable hardware or runner classes.

Record sample sizes.

Prefer medians and distribution information over isolated single-run results.

Use configurable, empirically justified regression thresholds.

Do not automatically label small differences as regressions.

## 9.4 Component-level investigation

Associate significant performance observations with:

- Drupal component.
- Page or journey.
- Resource URL.
- CSS or JavaScript asset.
- Package.
- Module.
- Theme.
- Related source paths where reliably established.

Identify shared assets that affect multiple pages.

Allow maintainers to navigate from a regression to its relevant resource evidence.

Do not automatically claim which Git commit caused a regression without sufficient supporting evidence.

---

# 10. Add sustainability and resource-use reporting

Build on the existing repository's sustainability reports.

Use the Web Sustainability Guidelines as a framework for organizing relevant evidence.

https://www.w3.org/TR/web-sustainability-guidelines/

The guidelines are a draft. Do not present alignment with selected measurable indicators as proof of compliance with the entire set of guidelines.

## 10.1 Resource indicators

Collect:

- Transferred bytes.
- Resource counts.
- JavaScript payload size.
- CSS payload size.
- Image payload size.
- Font payload size.
- DOM node count.
- DOM depth.
- Render-blocking resources.
- Expensive client-side execution.
- Unnecessary or duplicate resources.
- Third-party requests.
- Relevant caching behaviour.

Record these at page, journey, resource, and component level where possible.

## 10.2 Modelled environmental estimates

Support CO2.js through an adapter or reused implementation.

Record:

- Model name.
- Model version.
- Transfer measurements used.
- Assumptions.
- Calculation method.
- System boundaries.
- Output units.

Present estimates as modelled values.

Do not claim they are direct emissions measurements.

## 10.3 Observed client energy

Investigate integration with:

https://github.com/mgifford/firefox-energy-scanner

The scanner documents two relevant execution tiers:

- Structural measurements on ordinary hosts.
- Additional energy measurements on supported physical hardware.

GitHub-hosted virtual machines do not provide the required usable hardware energy measurements.

Therefore:

- Hosted scans should collect structural metrics.
- Optional local scans can collect measured client energy.
- Missing energy data must display "Not measured".
- Unresolved energy differences must be distinguished from zero consumption.

Do not block ordinary weekly scans because an energy-capable machine is unavailable.

## 10.4 Measurement boundaries

Keep these separate:

1. Resource measurements.
2. Modelled CO2e.
3. Observed client energy.
4. Carbon derived from observed energy, when explicitly calculated.

Never add modelled and measured categories together into an invented total.

Do not claim browser energy measurements represent complete Drupal server or data-centre energy consumption.

## 10.5 Sustainability trends

Provide trends for:

- Median transferred bytes per representative journey.
- Resource counts.
- JavaScript work.
- DOM complexity.
- Modelled CO2e.
- Observed client energy where available.
- Resource budgets exceeded.
- Components associated with large changes.

Show whether results are comparable.

A change in runner hardware or measurement capability may invalidate a direct energy comparison.

## 10.6 Shared investigation

Performance and sustainability findings frequently involve the same resources.

Allow a resource or component to appear in both report categories without duplicating its identity or source evidence.

For example, a large JavaScript bundle might have:

- A performance observation.
- A resource-use observation.
- A modelled environmental impact.

These should link to the same underlying resource record.

---

# 11. Build the public reporting interface

Replace the current report landing page with an accessible dashboard while retaining all existing published report URLs.

The site must work on GitHub Pages.

Use static HTML and progressively enhanced JavaScript where necessary.

Avoid introducing a server-side runtime merely to display historical results.

## 11.1 Overall navigation

Create the following principal views:

### Overview

A cross-product summary with clearly separated Drupal Core and Drupal CMS results.

### Weekly changes

New findings, continuing findings, candidate resolutions, verified resolutions, reappearing findings, and inconclusive outcomes.

### Accessibility

WCAG-EM-aligned evidence.

### Performance

Metrics, regressions, historical trends, and component investigations.

### Sustainability

Resources, environmental estimates, and measured energy evidence.

### Components

Problems organized by shared UI or code component.

### Coverage

What was tested, what was skipped, and what remains untested.

### Methods and data

Source references, test methods, tools, versions, limitations, and machine-readable downloads.

## 11.2 Homepage

The homepage should answer:

- When was the last successful scan?
- What exact Drupal versions were tested?
- Did the latest scheduled scan succeed?
- What changed since the comparable baseline?
- What should maintainers investigate first?
- Is test coverage improving or declining?

Show separate summary information for:

**Drupal Core**

- Development branch tested.
- Exact commit.
- Latest completed scan.
- Previous comparable scan.
- New findings.
- Verified resolutions.
- Coverage.
- Performance changes.
- Sustainability changes.

**Drupal CMS**

Show the same categories, plus:

- Drupal CMS release.
- Resolved Drupal Core version.
- Installed profile and recipes.
- Dependency lockfile identifier.

Do not imply the two products have the same test scope.

## 11.3 Weekly report

Generate a human-readable report every week.

Suggested sections:

1. Assessment status.
2. Tested products and commits.
3. Summary of changes.
4. New accessibility findings.
5. Continuing accessibility findings.
6. Candidate and verified resolutions.
7. Reappearing regressions.
8. Performance changes.
9. Sustainability changes.
10. Coverage changes.
11. External issue activity.
12. Unresolved or inconclusive results.
13. Prioritized investigations.
14. Test methods and evidence links.

Prioritize actionable changes instead of publishing hundreds of nearly identical findings.

## 11.4 Trends

Show historical trends for each product.

Do not combine incompatible results into one trend line.

Support:

- Weekly selection.
- Release selection.
- Component selection.
- Criterion selection.
- Scenario selection.
- Browser or viewport selection.
- Metric selection.

Charts must have readable labels, units, sample sizes, and textual equivalents.

Provide accessible underlying tables and CSV or JSON downloads.

Do not use colour alone to convey status.

## 11.5 Finding detail pages

Every important finding should have a stable URL.

Include:

- Finding title.
- Stable fingerprint.
- Problem classification.
- Current lifecycle state.
- First observed date.
- Most recent observation.
- Affected products and releases.
- Affected components.
- Affected routes.
- Affected journeys.
- Applicable contexts.
- Relevant WCAG criteria where appropriate.
- Scanner or test method.
- Impact and prioritization evidence.
- Reproduction instructions.
- Screenshots where useful.
- DOM excerpts.
- Accessibility-tree excerpts where relevant.
- Computed styles where relevant.
- Relevant performance or resource evidence.
- Related Drupal.org issues.
- Related Drupal Core Lab reproductions.
- Historical timeline.
- Verification status.
- Source provenance.

Include a clear distinction between an automated observation and a human-reviewed finding.

## 11.6 Component pages

Build a component inventory and quality view.

Examples:

- Navigation.
- Toolbar.
- Buttons.
- Forms.
- Dialogs.
- CKEditor.
- Media library.
- Views.
- Tables.
- Status messages.
- Error messages.
- Content editing sidebar.

For each component, display:

- Where it appears.
- Which product or configuration includes it.
- Relevant tests.
- Accessibility findings.
- Performance observations.
- Sustainability observations.
- Historical changes.
- Open related issues.
- Verified resolutions.

Do not assert common component ownership solely from similar CSS selectors.

Use explicit component mappings, route inventories, source evidence, or reviewed associations.

## 11.7 Accessibility requirements for the report itself

The reporting interface must target WCAG 2.2 AA.

Test:

- Semantic headings and landmarks.
- Meaningful navigation.
- Keyboard operation.
- Visible focus.
- Screen-reader reading order.
- Accessible tables.
- Form labels.
- Status information.
- Contrast.
- Dark mode.
- Forced colors.
- 200% and 400% zoom.
- Narrow viewports.
- Reduced motion.
- No-JavaScript operation for essential content.

Use progressive enhancement.

Do not rely on inaccessible visual dashboards that hide the evidence behind charts.

Do not use a heavy frontend framework without demonstrating a concrete need.

---

# 12. Integrate OpenACR Release Evidence

Treat OpenACR Release Evidence as a complementary evidence source.

https://github.com/mgifford/openacr-release-evidence

Its responsibilities include:

- Drupal.org issue collection.
- Issue histories.
- Merge requests.
- Release applicability.
- Component inventory.
- WCAG candidate associations.
- Draft OpenACR export.
- ATAG evidence.

The observatory should contribute a different kind of information: direct automated reproduction and behavioural observations on installed Drupal environments.

## 12.1 Data integration

Investigate how to associate:

- Observatory assessment targets.
- Exact releases.
- Composer lockfiles.
- Components.
- WCAG criteria.
- Reproduced findings.
- Drupal.org issues.
- OpenACR release evidence.

Use stable identifiers and documented source links.

Prefer a small read-only adapter for published evidence JSON.

Do not copy the entire OpenACR issue collection into every observatory report.

## 12.2 Preserve evidence distinctions

Keep these concepts separate:

- Reported issue.
- Suspected release applicability.
- Observed failure.
- Fix commit included.
- Behaviourally verified resolution.
- Human conformance determination.

Never change an ACR criterion to "Supports" because an automated scan found no violations.

Never mark an issue as behaviourally resolved simply because its fix commit exists.

## 12.3 Avoid circular dependencies

The observatory must continue working when OpenACR Release Evidence is unavailable.

OpenACR Release Evidence must not require the observatory to generate every release report.

Publish compatible evidence and link between systems.

---

# 13. Integrate Open Scans where useful

https://github.com/mgifford/open-scans

Open Scans supports multiple accessibility engines and ACT-related comparison.

Investigate reusable components for:

- Engine execution.
- Rule normalization.
- ACT mapping.
- Cross-engine comparisons.
- Deduplication.
- Result provenance.

For the weekly observatory, use a declared, versioned engine set.

Do not use randomly selected scanners for baseline comparisons.

When scanner versions or rule sets change, record the change and consider whether the next scan should establish a new baseline.

The observatory primarily evaluates local, authenticated Drupal installations.

Do not assume the existing public URL-submission service can scan local DDEV routes.

Prefer running compatible scanner components directly in the controlled environment.

The integration should remain optional and narrowly scoped.

---

# 14. Integrate Drupal Core Lab for investigation

https://github.com/mgifford/drupal-core-lab

The observatory should identify problems that warrant focused investigation.

Drupal Core Lab is the appropriate place to compare unmodified and patched Drupal behaviour.

Implement a way to export a reproducible investigation package containing:

- Tested source reference.
- Scenario ID.
- Relevant component.
- Reproduction steps.
- Environment configuration.
- Expected behaviour.
- Observed behaviour.
- Supporting evidence.
- Related issue references.

Avoid duplicating Core Lab's patch comparison interface.

A maintainer should be able to move from a recurring observatory finding to a focused Core Lab investigation.

Do not automatically create Drupal.org issues or merge requests without explicit authorization.

---

# 15. Weekly orchestration

Create a reliable weekly workflow.

GitHub Actions can coordinate source acquisition, environment setup, browser tests, report generation, and publication.

A local command should be able to run the same pipeline.

## 15.1 Desired workflow

The weekly process should:

1. Check out the current observatory code.
2. Validate dependencies and schemas.
3. Acquire the selected Drupal Core source.
4. Resolve or acquire the Drupal CMS target.
5. Pin source and dependency revisions.
6. Prepare isolated test installations.
7. Record installed configurations.
8. Execute the mandatory scenario suite.
9. Run accessibility checks.
10. Collect performance measurements.
11. Collect structural sustainability measurements.
12. Import optional external evidence.
13. Normalize findings.
14. Validate results.
15. Select the previous comparable baseline.
16. Compute historical differences.
17. Generate reports.
18. Validate report accessibility and integrity.
19. Publish successful factual outputs.
20. Report infrastructure or coverage failures.

Do not publish a failed scan as a successful assessment.

## 15.2 Distinguish scan completion and publication

Create separate states for:

- Scan execution.
- Evidence validation.
- Report generation.
- Publication.
- Human review.

For ordinary deterministic scan results, prefer publication after automated validation.

For editorial interpretations, manual conformance decisions, and sensitive changes, use a review process.

Do not force all new weekly factual evidence to remain unpublished until a human merges a pull request, unless this has been deliberately selected as project policy.

## 15.3 Schedule

Target one complete scheduled scan per week.

Support manual dispatch for:

- Specific products.
- Specific scenarios.
- Specific releases.
- Rechecking known regressions.
- Validating infrastructure changes.

Use concurrency controls.

Avoid overlapping tests that mutate shared Drupal configuration.

Provide appropriate timeouts.

Do not silently swallow errors with `|| true` or unconditional `continue-on-error`.

Optional failures may be non-blocking only when the final report explicitly records them.

## 15.4 Cost and resource use

Design for reasonable GitHub Actions usage.

Avoid executing every browser, theme, viewport, contrast mode, language, and recipe combination on every weekly run.

Use a representative mandatory baseline and targeted supplemental runs.

Cache dependencies when safe.

Reuse immutable source references.

Avoid unnecessarily rebuilding identical environments.

Record the time and resources consumed by the testing pipeline where practical.

The observatory should not become an unnecessarily expensive or energy-intensive service.

## 15.5 Optional physical energy runner

Support manually initiated or separately scheduled energy measurements on compatible hardware.

Do not expose private local infrastructure or credentials through a public GitHub issue queue.

Keep this integration optional.

---

# 16. Storage and publication

The repository already contains substantial historical report files.

Do not continue indefinitely adding large raw scanner outputs to the primary source branch.

Investigate an appropriate storage division.

## Suggested structure

Adapt to existing conventions.

```text
config/
  sources/
  targets/
  scenarios/
  measurements/
  budgets/

tests/
  playwright/
    journeys/
    accessibility/
    performance/
    fixtures/

schemas/
  run/
  findings/
  measurements/
  comparison/

src/
  collectors/
  adapters/
  normalization/
  comparison/
  reporting/

reports/
  runs/
    <run-id>/
      manifest.json
      findings.json
      measurements.json
      coverage.json
  weekly/
  history/

site/
  templates/
  assets/

docs/
  architecture/
  reporting/
  methods/
```

This is a proposed logical organization.

Do not move existing directories without documenting compatibility and migration implications.

## Storage principles

- Historical runs should be immutable.
- Stable findings need stable identifiers.
- Current reports should be regenerable.
- Summary JSON should remain compact.
- Larger raw artifacts should have durable references.
- Published evidence should have integrity checks.
- The system should support schema migration.
- The public site should not expose credentials or private user data.

Consider GitHub Pages for static HTML and indexes, Git-based summaries for useful small datasets, and a durable artifact store for large evidence.

Avoid introducing a database service prematurely.

SQLite can be useful as a local indexing mechanism if it materially simplifies analysis, but the published site must remain usable without a live database server.

---

# 17. CLI design

Provide a discoverable command interface.

Reuse existing commands and architecture where practical.

The desired capabilities include:

```text
doctor
sources fetch
sources status
targets list
env prepare
env reset
scenarios list
scan
compare
report build
report validate
publish
```

Illustrative usage:

```bash
npm run doctor

npm run scan -- --target core-main

npm run scan -- --target cms-stable

npm run compare -- --current RUN_ID --baseline BASELINE_ID

npm run report -- --latest
```

These are desired interfaces, not commands assumed to exist today.

Design and document the actual implementation.

Every command should have:

- Help output.
- Input validation.
- Predictable exit codes.
- Clear errors.
- Machine-readable output where relevant.
- Unit tests.
- Usage examples.

Do not add several competing CLI implementations.

---

# 18. Data quality and false-positive handling

A robust reporting system must acknowledge that automated testing engines can be wrong or incomplete.

Relevant testing fixture repository:

https://github.com/mgifford/record-a-goose-sighting

Use existing fixture infrastructure where it helps validate rule engines and normalization.

Do not duplicate the entire fixture project in this repository.

## Required distinctions

Track:

- Confirmed issue.
- Automated suspected issue.
- False positive.
- Needs manual review.
- Incomplete test.
- Unsupported rule.
- Known accepted limitation.
- Regression test passed.
- Regression test failed.

A false-positive determination needs evidence and a documented review record.

Avoid silently suppressing scanner results.

Record exclusions, their justification, and their review dates.

If an engine upgrade changes the number of findings, report the changed testing capability.

Do not treat that change automatically as a change in Drupal quality.

---

# 19. Testing the observatory

The observatory itself needs a strong automated test suite.

## 19.1 Unit tests

Cover:

- Source manifests.
- Target validation.
- Run schema validation.
- Finding fingerprint handling.
- Result normalization.
- Historical comparison.
- Baseline selection.
- Regression classification.
- Measurement unit conversion.
- Metric aggregation.
- Report links.
- Schema version handling.

## 19.2 Regression comparison fixtures

Create synthetic fixtures for at least:

1. A new accessibility finding.
2. An unchanged finding.
3. A finding that is no longer observed.
4. A behaviourally verified resolution.
5. A reintroduced finding.
6. A changed selector with a stable semantic problem.
7. A missing page.
8. A skipped test.
9. A scanner upgrade.
10. A changed theme.
11. A changed installed module.
12. A failed installation.
13. A partial scan.
14. A renamed scenario.
15. A measurement below the noise threshold.
16. A significant performance regression.
17. A sustainability metric with changed model assumptions.
18. An energy measurement unavailable on hosted CI.
19. Two engines reporting related but non-identical problems.
20. A Drupal.org issue marked fixed while the installed Drupal version still reproduces the problem.

Assert the correct classification for each case.

## 19.3 Integration tests

Test:

- Clean Drupal Core installation.
- Target configuration.
- Login.
- One representative user journey.
- Accessibility collection.
- Evidence generation.
- Historical comparison.
- Report publication locally.

Add Drupal CMS integration tests once its installation process is verified.

## 19.4 Report testing

Validate:

- HTML.
- Schema correctness.
- Internal links.
- Historical links.
- Artifact references.
- Table semantics.
- Headings.
- Keyboard navigation.
- No-JavaScript access.
- 400% zoom.
- Forced colors.
- Reduced motion.
- Accessible chart alternatives.

Do not make a report claim successful testing when those tests were skipped.

---

# 20. Reporting terminology

Create and document a controlled terminology.

Use plain language.

Examples:

| Avoid | Prefer |
|---|---|
| WCAG compliant | Evaluated against selected WCAG requirements |
| Accessibility score | Automated accessibility findings and evaluation coverage |
| 100% accessible | No observed failures in the documented test scope, if supported |
| Fixed | Verified resolved, when appropriately tested |
| Fixed issue | Drupal.org issue closed fixed |
| No accessibility problems | No issues observed by the executed checks |
| Carbon footprint | Modelled emissions estimate, with defined boundaries |
| Measured carbon | Modelled or calculated CO2e, as appropriate |
| Zero energy consumption | Not measured, below resolution, or measured zero, as supported |
| Passed WCAG | Passed specific automated assertions, unless a full evaluation was performed |

Do not use a single quality grade combining accessibility, performance, and sustainability.

These areas should remain independently understandable.

---

# 21. Documentation requirements

Write documentation for maintainers and external users.

At minimum, document:

1. Architecture.
2. Local installation.
3. Required dependencies.
4. Supported assessment targets.
5. Adding new Drupal releases.
6. Adding new CMS profiles.
7. Adding scenarios.
8. Running scans.
9. Generating reports.
10. Historical comparison logic.
11. Finding fingerprints.
12. WCAG-EM alignment and limitations.
13. Performance measurement methods.
14. Sustainability measurement boundaries.
15. False-positive review.
16. Data retention.
17. GitHub Actions configuration.
18. GitHub Pages publication.
19. Troubleshooting.
20. Integration with related projects.

Prefer updating existing documentation rather than writing multiple overlapping READMEs.

Keep AGENTS.md current as architectural decisions change.

Provide clear guidance for another AI coding agent.

Avoid hidden assumptions that depend on knowledge from this conversation.

---

# 22. Implementation strategy

Do not attempt the entire observatory in one enormous change.

Preserve the existing migration plan and its one-verified-phase-per-PR discipline.

Organize the work into reviewable stages.

The following is the desired implementation sequence. Reconcile it with the current migration document and explain any necessary ordering adjustments.

## Stage 0: Confirm the foundation

Inspect current code and recent changes.

Verify:

- Working CLI.
- Existing Playwright suite.
- Test discovery.
- Unit tests.
- DDEV availability.
- Source acquisition.
- Pages publication.
- Existing fingerprints.
- Historical reports.

Repair blocking defects before adding complex functionality.

**Acceptance criteria**

The current system's working and non-working parts are documented accurately, and the first executable test path is established.

## Stage 1: Reproducible Drupal Core environment

Implement source acquisition and a pinned, disposable Core installation.

Support a small verified Playwright smoke test.

Record the tested commit and installation manifest.

**Acceptance criteria**

A maintainer can execute the same test against a known upstream Drupal Core revision.

## Stage 2: Stable representative journeys

Implement a small, useful catalogue of Core journeys.

Include accessibility checks and coverage records.

Support clean resets.

**Acceptance criteria**

Representative workflows run repeatedly without depending on incidental database state.

## Stage 3: Immutable evidence and comparisons

Implement:

- Run manifests.
- Finding normalization.
- Existing fingerprint reuse.
- Historical storage.
- Comparison eligibility.
- Finding lifecycle classification.
- Weekly summary generation.

**Acceptance criteria**

Two successful synthetic or real scans produce a correct, explainable comparison.

## Stage 4: Accessible reporting MVP

Build the new GitHub Pages dashboard.

Include:

- Overview.
- Weekly changes.
- Accessibility findings.
- Finding detail pages.
- Coverage.
- Methods.
- Historical links.

Preserve existing URLs.

**Acceptance criteria**

The site can publish current results and historic comparisons without a live backend.

## Stage 5: Drupal CMS

Add a reproducible Drupal CMS target.

Capture the Composer dependency inventory and installed features.

Add a small set of CMS-specific user journeys.

**Acceptance criteria**

Core and CMS can be scanned independently, and their results remain correctly scoped.

## Stage 6: Performance

Add repeatable performance measurements for common journeys.

Include trends, thresholds, and component/resource associations.

**Acceptance criteria**

A reproducible synthetic performance regression is detected and explained.

## Stage 7: Sustainability

Add resource measurements and CO2.js modelled estimates.

Integrate optional Firefox Energy Scanner evidence.

**Acceptance criteria**

Resource and environmental reporting clearly distinguish measurements from estimates, including unavailable energy measurements.

## Stage 8: WCAG-EM-aligned exports

Expand the accessibility reports into the full five-step evaluation evidence structure.

Add criterion pages and reviewer-friendly exports.

Validate WCAG-EM Report Tool interoperability where feasible.

**Acceptance criteria**

A reviewer can understand scope, samples, methods, findings, and evaluation gaps without interpreting raw scanner JSON.

## Stage 9: External integrations

Add narrowly scoped adapters for Open Scans, OpenACR Release Evidence, Firefox Energy Scanner, and Drupal Core Lab.

**Acceptance criteria**

The integrations add evidence without creating circular dependencies or rewriting the specialized projects.

## Stage 10: Production weekly operation

Complete the weekly scheduled execution, validation, archival, and publication workflow.

Test failure recovery.

Document how to operate and extend it.

**Acceptance criteria**

The observatory produces a trustworthy weekly report for both Drupal Core and Drupal CMS from reproducible environments.

### Ordering flexibility

Do not postpone an end-to-end pilot unnecessarily while implementing every future capability.

A small weekly Core scan with useful comparisons is more valuable than a large unfinished system.

However, do not claim the whole implementation is complete until Drupal CMS, historical comparisons, and the promised reporting areas are working.

---

# 23. Definition of done

The overall objective is achieved when the following are true.

## Reproducibility

- Drupal source revisions are pinned.
- Drupal CMS dependencies are recorded.
- Installations can be recreated.
- Configurations are tracked.
- Test execution is repeatable.

## Accessibility

- Representative journeys are tested.
- Findings have stable identities.
- Findings have reproducible evidence.
- Manual evaluation gaps are explicit.
- WCAG-EM-aligned reports can be generated.
- No unsupported conformance claims are made.

## Regression reporting

- New findings are identified.
- Continuing findings remain visible.
- Candidate resolutions are distinguished from verified resolutions.
- Reappearing problems are detected.
- Non-comparable runs do not create false improvement claims.
- Historical evidence is retained.

## Performance

- Relevant lab measurements are collected.
- Repeated measurements are supported.
- Performance regressions can be identified.
- Measurement noise is considered.
- Component/resource investigations are available.

## Sustainability

- Resource-use history is retained.
- Modelled emissions are identified correctly.
- Actual energy is reported only where measured.
- Measurement boundaries and assumptions are documented.
- Shared performance and sustainability evidence is linked.

## Reporting

- GitHub Pages has an accessible dashboard.
- Separate Core and CMS reports exist.
- Weekly summaries are available.
- Historical comparisons are visible.
- Findings have stable URLs.
- Data can be downloaded.
- Existing report URLs remain operational.

## Maintainability

- Tests pass.
- Code follows existing repository conventions.
- Dependencies are justified.
- No duplicated scanning frameworks are introduced.
- Documentation reflects the implementation.
- Another developer can run and extend the system.

---

# 24. Instructions for your first execution

Begin with the repository in its current state.

Do not assume the historical audit remains completely accurate.

Perform the following:

1. Inspect the current branch, recent commits, and relevant pull requests.
2. Read the existing audit, migration plan, and capability inventory.
3. Identify which stages have actually been implemented and verified.
4. Check the current Playwright configuration and available scripts.
5. Run appropriate non-destructive unit tests and diagnostics.
6. Identify the earliest unverified dependency blocking the new observatory.
7. Implement the smallest coherent change that advances that dependency.
8. Add or update tests.
9. Update the existing architecture documentation.
10. Summarize what changed and what remains.
11. Commit the work on an appropriate feature branch and open a pull request when authorized and supported.
12. Stop at the phase boundary. Do not start a new phase automatically.

If the environment lacks DDEV, Docker, browser access, or another necessary dependency:

- Complete meaningful offline work where possible.
- Add tests using synthetic fixtures.
- Report what could not be verified.
- Provide exact local verification commands.
- Do not claim an integration test passed.

## Required final implementation report

After each phase, provide:

**Changes implemented**

Explain the actual source changes.

**Existing capabilities reused**

Identify what was retained rather than duplicated.

**Removed or altered behaviour**

List anything removed or materially changed, and explain why.

**Verification**

State which tests were run, passed, failed, skipped, or could not execute.

**Published output**

Identify generated report pages, data artifacts, and any affected URLs.

**Limitations**

Explain unresolved technical or evidence issues.

**Next recommended phase**

Identify the next dependency and its acceptance criteria.

**Pull request**

Provide the branch, commit, and PR link if created.

Avoid vague status reports such as "mostly complete" or "ready for production" without verification.

---

# 25. Final design principle

The Drupal Quality Observatory must distinguish three questions:

**What did the system observe?**

This is the automated measurement and testing evidence.

**What changed?**

This is the historical comparison between compatible assessment runs.

**What does the evidence justify concluding?**

This requires appropriate interpretation and, for many accessibility questions, human evaluation.

Never confuse these questions.

The final system should make it straightforward for a Drupal maintainer to understand what changed, reproduce the problem, identify affected functionality, connect the evidence to an existing issue, and verify that a proposed correction actually improves the software.

It should also make it possible to demonstrate improvement over months and years without hiding uncertainty, reducing coverage, or relying on misleading aggregate scores.

**Start by inspecting the repository and completing the earliest unverified implementation stage. Preserve prior work, produce working code and tests, and advance through verified, reviewable increments.**
