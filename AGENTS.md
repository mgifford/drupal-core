# Drupal Quality Observatory: Agent Instructions

These instructions govern work on the **Drupal Quality Observatory** in this repository. The Observatory is an independent testing and reporting project. It is not the canonical Drupal source repository, and its purpose is not to maintain a second patch-evaluation lab.

## Scope and instruction boundaries

- **Repository-root `AGENTS.md` (this file):** Observatory infrastructure, source acquisition, test environments, scanning, evidence, reports, documentation, and publication.
- **`core/AGENTS.md`:** Drupal-specific operator, code, testing, and writing rules for work on Drupal Core source. Keep it separate. Do not replace it with Observatory instructions.
- **`.agents/DRUPAL_AGENTS.md`:** Additional Drupal development guidance. Some older workflows concern patch evaluation; do not treat them as the Observatory's current mission.
- **`ACCESSIBILITY.md`, `STYLES.md`, and `SECURITY.md`:** Applicable quality, style, accessibility, and security expectations.

When editing Drupal source under `core/`, follow `core/AGENTS.md` and Drupal coding standards as well as the Observatory's evidence and safety requirements. For Drupal.org prose, follow the applicable Drupal-specific disclosure and editorial rules even when the draft is stored outside `core/`. If instructions conflict, identify the conflict and use the more specific applicable rule without silently discarding safety requirements.

## Mission and assessment scope

Build reliable, reproducible evidence about the accessibility, performance, sustainability, and user experience of Drupal over time.

Start with Drupal Core and closely related modules, themes, recipes, installation profiles, and configurations. Extend to Drupal CMS and other Drupal distributions or ecosystem projects through explicitly declared assessment targets, not by treating all Drupal installations as equivalent.

The Observatory should answer what was tested, which changes were observed, what evidence supports those observations, what remains uncertain, and whether results are comparable with previous runs.

This is an incremental migration. Existing published reports are a historical archive, not current weekly measurements. Do not describe planned scanning, Drupal CMS coverage, or automated issue attribution as working until verified.

Read these before substantial implementation work:

- `README.md`: public purpose and boundaries.
- `docs/architecture/CURRENT-STATE.md`: dated audit, not a permanent description of the current branch.
- `docs/architecture/CAPABILITY-INVENTORY.md`: capability and verification status.
- `docs/architecture/MIGRATION-PLAN.md`: incremental plan and unresolved owner decisions.
- `docs/architecture/OBSERVATORY-BRIEF.md`: future goals, not authorization to implement every phase.
- `docs/testing/PLAYWRIGHT.md`: current browser-testing entry points.

Inspect the current code, Git history, and recent pull requests before relying on any dated assessment. Do not recreate functionality already delivered.

## Responsibilities and related projects

**The Observatory owns:**

- Selection and configuration of assessment targets.
- Acquisition and pinning of upstream source and dependencies.
- Reproducible installations, modules, themes, recipes, content, and test accounts.
- Representative user journeys and test orchestration.
- Run metadata, coverage, longitudinal comparisons, and public reporting.
- Integration of independent evidence sources while preserving their provenance.

**Other projects own specialized work:**

- **[Drupal Core Lab](https://github.com/mgifford/drupal-core-lab):** Reproduction of individual Drupal issues, patch or merge-request evaluation, and before/after comparisons. Do not rebuild its two-site viewer or patch workflow here.
- **[Open Scans](https://github.com/mgifford/open-scans):** Multi-engine accessibility execution, ACT mapping, finding correlation, and scanner comparison.
- **[Firefox Energy Scanner](https://github.com/mgifford/firefox-energy-scanner):** Browser activity, resource and component investigations, and energy measurement where supported.
- **[OpenACR Release Evidence](https://github.com/mgifford/openacr-release-evidence):** Release-specific issue applicability and draft accessibility conformance evidence.

Exchange evidence through documented formats and stable identifiers. Optional integrations must not be required for basic local Observatory operation.

## Before changing files

1. State the requested outcome, affected paths, and relevant assessment target or development phase.
2. Inspect only the necessary files first. Avoid broad recursive searches of `core/`, `node_modules/`, `vendor/`, and generated reports.
3. Confirm whether the capability is verified, implemented but unverified, historical, broken, or planned.
4. Identify the precise source revision, dependencies, environment, and scenario needed for meaningful verification.
5. List relevant tests and expected artifacts. Do not invent commands or assume a documented script still exists.
6. Make the smallest coherent change. Complete and verify one migration phase per pull request unless explicitly directed otherwise.

Do not resolve owner decisions in the migration plan, rewrite repository history, delete historical evidence, or redesign the architecture without explicit approval.

## Upstream source and environment integrity

- The canonical Drupal Core source is `https://git.drupalcode.org/project/drupal`. Do not assume this fork's `main` branch equals current upstream `main` or is free of local modifications.
- Use isolated checkouts or installations for software under test. Pin an exact commit or immutable release identifier; record the source and time acquired.
- Keep Observatory infrastructure separate from changes to Drupal source. Do not modify upstream code merely to make a scan pass.
- Record the installed Drupal and PHP versions; dependency lockfile digest; enabled modules and themes; recipes and configurations; test content and permissions; browser and viewport; and testing tool versions.
- For Drupal CMS, record the actual installed dependency set and Drupal Core revision. A fix on Drupal Core `main` does not imply that the tested Drupal CMS release includes it.
- Isolate mutable site state between scenarios. Theme, language, colour, user-preference, database, and content changes must not contaminate other runs.
- Snapshot a site database before destructive operations. Never reset or delete a site or its data without appropriate authorization.
- Never commit credentials, private data, browser profiles, large raw artifacts, or generated dependencies simply because they appear in a working directory.

## Composer and Drush 15

Drush was deliberately added to **this fork** as a development dependency. The current root `composer.json` specifies `drush/drush: 15.x-dev` under `require-dev`. Do not remove it while reorganizing the Observatory, and do not assume it is part of an unmodified upstream Drupal checkout.

- Install the locked PHP dependencies inside DDEV with `ddev composer install --no-interaction`. Check the selected checkout and its lockfile before installing.
- **Use Drupal's `dr` command for Drush functionality.** Supported invocation forms in this repository include `ddev exec dr <command>` and `ddev exec php core/scripts/dr <command>`. Drush 15 in this checkout does not provide the usual `drush` binary; do not recommend `ddev drush`, `vendor/bin/drush`, or unrelated older Drush syntax without checking the installed version.
- Useful non-destructive examples are `ddev exec dr cache:rebuild`, `ddev exec dr user:login --name admin` (local development only), and `ddev exec dr config:get system.theme`.
- Existing setup uses `ddev exec dr ex:install` to enable extensions and the repository's `.agents/scripts/site-install.php` for DDEV database installation. Do not substitute `dr site:install` or assume the standard Drush command set is available; follow `SETUP.md` and inspect `ddev exec dr list` for the installed commands.
- Preserve the relationship between `composer.json` and `composer.lock`. Do not run `composer update`, `composer require`, or dependency upgrades merely to fix a local setup problem. Propose dependency changes separately and document their necessity.
- Changing the site database, including `sql:drop`, resets, or reinstalls, requires authorization and an appropriate snapshot. Installing or enabling modules can alter site state and must be tracked in the assessment manifest.
- Recheck dependency and command requirements against the exact Drupal revision under test. The Observatory's future isolated upstream checkouts may differ from this fork.

## Testing and evidence rules

Use meaningful journeys, not just a list of URLs. Prefer stable scenario identifiers for visitor, authoring, editing, validation, administration, media, and relevant module or recipe workflows.

For each run, preserve enough evidence to reproduce and interpret it:

- Target, exact revision, installed configuration, and scenario identifier.
- Browser, viewport, colour scheme, forced-colours or reduced-motion settings where relevant.
- Tool name and version, timestamps, test steps, source observations, and any screenshots, traces, or transcripts.
- The pages, journeys, configurations, and accessibility requirements evaluated, plus explicit gaps and exclusions.
- Execution status and failure reason for missing or incomplete evidence.

Use explicit statuses such as `PASS`, `FAIL`, `SKIPPED`, `INCONCLUSIVE`, `NOT_RUN`, and `INFRASTRUCTURE_ERROR` as appropriate. A tool failure, missing dependency, failed installation, or skipped scenario is never a pass. Do not compare runs as equivalent unless their relevant conditions and coverage are compatible.

A newly observed finding is not automatically a newly introduced defect. A finding no longer observed is not automatically fixed. Record coverage changes, rule or engine updates, and other possible causes. Do not assign a commit, component, or contributor as the cause without adequate evidence.

## Accessibility, performance, and sustainability

- Use WCAG 2.2 and applicable authoring-tool requirements. WCAG-EM can inform evaluation methodology and reports, but automated scanning alone does not establish WCAG conformance.
- Use automated tools such as axe-core alongside keyboard checks, human review, and assistive technology evidence when available. Accessibility-tree snapshots and Guidepup transcripts are useful evidence, not substitutes for human screen-reader testing.
- Distinguish confirmed failures, best practices, usability concerns, unreviewed hypotheses, and disputed or inconclusive findings. Link to the relevant success criterion or ACT rule only when justified.
- Record performance metrics with the browser, hardware or runner, throttling, page state, sampling, and tool versions needed for interpretation.
- Distinguish directly measured energy from resource-transfer estimates and modelled emissions. Do not claim that a Lighthouse score or estimated CO2e represents measured energy.
- Apply the Web Sustainability Guidelines as documented guidance. Do not invent sustainability conformance claims or aggregate accessibility, performance, and energy into one score.
- Keep scanner observations immutable and any AI-generated explanations visibly separate from measured evidence.

For discovered Drupal problems, follow `docs/testing/recording-issues.md`: record an observation, reproduce it, then link the appropriate upstream issue. Do not open one issue per raw scanner finding. Refer focused patch validation to Drupal Core Lab.

## Development commands

Use the current `package.json` and `docs/testing/PLAYWRIGHT.md` as the command reference. From the repository root:

```bash
npm run doctor        # Read-only environment diagnosis
npm run test:unit     # Unit tests without a running Drupal site
npm run test:list     # Discover available Playwright tests
npm run test:smoke    # Requires a configured and running Drupal site
npm run test:playwright # Requires a configured and running Drupal site
```

The Playwright package lives under `tests/playwright/`. Install its dependencies and browser binaries as documented, not by following commands referencing the removed `core/tests/playwright/` suite. Determine Node.js, PHP, Composer, and browser requirements from the selected Drupal revision and the active test tooling; do not assume historical version numbers remain valid.

For the currently configured fork, use the `dr` command as documented in the Composer and Drush 15 section above. Use `SETUP.md` for DDEV installation and site initialization; do not use old two-checkout patch-evaluation instructions.

Use Playwright MCP for exploration where appropriate, then turn repeatable observations into checked-in Playwright tests. Do not use ephemeral MCP element references as persistent locators. Run the smallest relevant checks and state exactly which checks could not run.

## Reports and publication

- Preserve reports and historical material, including existing GitHub Pages URLs. Do not edit generated reports by hand when their source generator can be changed.
- Label archived scans as historical. Do not imply current coverage or measurements from old report dates.
- Publish clear provenance, methods, coverage, uncertainty, and any manual verification. Prefer accessible HTML plus reusable machine-readable evidence where applicable.
- Keep raw and summarized evidence separate. Do not commit large files or publish credentials and sensitive content.
- Do not configure recurring scans, storage migration, or expensive providers without resolving relevant owner decisions in `docs/architecture/MIGRATION-PLAN.md`.
- Do not push, publish, or post to Drupal.org or other external systems without explicit authorization. Prepare drafts or pull requests for review where appropriate.

## AI transparency and close-out

Generative AI may assist with code, tests, documentation, and interpretation, but AI output is not independent verification. Disclose material AI involvement accurately in the relevant change or contribution record. Never fabricate tests, reviews, tool execution, citations, or model usage. Follow the Drupal-specific LLM disclosure rules in `core/AGENTS.md` for their applicable artifacts.

Before declaring work complete, report:

1. What files and behaviour changed, and why.
2. Exact commands and tests run, including failures and skips.
3. Evidence produced, versions or commits tested, and remaining uncertainties.
4. Documentation or reports updated, including any compatibility implications.
5. Work deliberately omitted or deferred, with a reason.

Do not call a planned feature complete merely because its design document or configuration exists.
