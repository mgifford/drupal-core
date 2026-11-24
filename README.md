# Drupal Quality Observatory

**Open-source testing and reporting to help improve the accessibility, performance, sustainability, and overall quality of Drupal.**

The Drupal Quality Observatory aims to provide reproducible evidence about how Drupal changes over time, where problems exist, and whether changes are improving the experience for people using Drupal.

The initial focus is **Drupal Core and the modules, themes, recipes, and configurations most closely associated with it**. The project will expand to Drupal CMS and other parts of the Drupal ecosystem as its testing infrastructure develops.

Rather than relying on isolated scans or scores, the goal is to understand what is changing, why it matters, and what evidence supports each finding.

**[Explore the published reports](https://mgifford.github.io/drupal-core/)**

> **Project status:** The published reports currently represent historical testing, primarily from March to July 2026. Work is underway to establish reproducible, regularly updated testing against current Drupal development versions. The full observatory described here is not yet operational.

## What are we evaluating?

Drupal is more than its core codebase. Real-world experiences depend on how core functionality interacts with modules, themes, recipes, content, configuration, and the tasks people need to complete.

The Observatory is designed to examine these relationships.

### Accessibility

Evaluate Drupal interfaces and user journeys against established accessibility standards, including [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and relevant authoring-tool accessibility requirements.

Testing includes automated checks and, where available, manual evidence, keyboard interaction, accessibility-tree inspection, assistive technology testing, and user-preference configurations.

The goal is to support more complete, [WCAG-EM](https://www.w3.org/TR/WCAG-EM/)-informed reporting, while making testing coverage and limitations explicit.

Automated test results do not establish WCAG conformance.

### Performance

Investigate how Drupal performs across different pages, configurations, and user journeys.

Measurements may include page loading, resource consumption, browser performance, and changes introduced by updates to Drupal or its dependencies.

Results should help identify regressions and opportunities for improvement rather than relying exclusively on aggregate performance scores.

### Sustainability

Evaluate relevant technical indicators against the [Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/).

This includes examining unnecessary resource consumption, inefficient page behaviour, and opportunities to reduce the environmental impact of Drupal websites.

Measured energy consumption, modelled emissions, and resource-transfer estimates must remain clearly distinguished.

### Real-world Drupal configurations

The Observatory begins with Drupal Core, then extends testing to closely associated functionality:

- Core modules and representative functionality.
- Core themes and common administrative interfaces.
- Relevant contributed modules and themes.
- Drupal recipes and installation configurations.
- Different browsers, viewports, languages, and user preferences.
- Representative content creation, administration, and visitor journeys.

These configurations help expose problems that may not appear in a minimal Drupal installation.

Drupal CMS is a priority for expanded coverage, but its results must remain distinguishable from Drupal Core results.

## Explore the reports

The [GitHub Pages reporting site](https://mgifford.github.io/drupal-core/) provides access to previous accessibility and sustainability investigations.

Published material includes:

- Accessibility patterns and recurring issues.
- Colour contrast and theme comparisons.
- Keyboard accessibility reviews.
- Administrative interface testing.
- Right-to-left and other configuration-specific investigations.
- Sustainability and resource-use reporting.

**The existing reports are an archive, not a claim about the current state of Drupal.**

As the testing infrastructure develops, the Observatory aims to publish regular results that make it easier to investigate:

- Newly observed accessibility, performance, and sustainability problems.
- Previously observed problems that remain reproducible.
- Findings no longer observed under comparable conditions.
- Verified improvements and regressions.
- Differences between Drupal versions, modules, themes, and configurations.
- The extent of testing coverage and outstanding evidence gaps.

An issue that disappears from a scan is not necessarily fixed. Changes in test coverage, software versions, or testing conditions can affect the results.

## How does it work?

The intended workflow is to acquire known Drupal revisions, create reproducible test environments, execute representative user journeys, and compare evidence across runs.

The project uses tools such as Playwright, axe-core, and Lighthouse, with additional tools and integrations where they provide useful evidence.

Each assessment should record the relevant software revisions, configurations, testing conditions, tools, and coverage.

The Observatory is being developed incrementally. Existing functionality is being reviewed and restored before the broader recurring testing and reporting system is implemented.

See the [current implementation assessment](docs/architecture/CURRENT-STATE.md) and [development plan](docs/architecture/MIGRATION-PLAN.md).

## Related projects

The Observatory builds on complementary open-source projects rather than duplicating their responsibilities.

- **[Drupal Core Lab](https://github.com/mgifford/drupal-core-lab):** Reproduces individual Drupal issues, evaluates proposed patches, and provides controlled before-and-after comparisons.
- **[Open Scans](https://github.com/mgifford/open-scans):** Runs multiple accessibility testing engines, compares findings, maps ACT rules, and supports historical analysis.
- **[Firefox Energy Scanner](https://github.com/mgifford/firefox-energy-scanner):** Investigates browser activity, components, resource consumption, and energy measurements.
- **[OpenACR Release Evidence](https://github.com/mgifford/openacr-release-evidence):** Investigates accessibility evidence associated with specific software releases and produces draft Accessibility Conformance Reports.

The Observatory focuses on recurring quality assessments, test orchestration, historical comparisons, and public reporting.

[Drupal Core Lab](https://github.com/mgifford/drupal-core-lab) is the appropriate starting point for investigating whether a specific Drupal patch or merge request fixes an issue.

## Get involved

**Contributions are welcome from Drupal developers, accessibility specialists, performance engineers, sustainability researchers, designers, content authors, and people who use Drupal.**

You can help by:

- Identifying important Drupal user journeys and configurations to test.
- Recommending modules, themes, or recipes for inclusion.
- Reviewing accessibility findings and providing manual testing evidence.
- Investigating regressions and linking findings to upstream Drupal issues.
- Improving testing coverage across browsers, devices, and user preferences.
- Contributing performance and sustainability testing approaches.
- Improving reports, documentation, and data visualizations.
- Helping build reproducible testing infrastructure.

[Explore issues and opportunities to contribute](https://github.com/mgifford/drupal-core/issues)

[View the project development plan](docs/architecture/MIGRATION-PLAN.md)

Drupal improvements should ultimately be contributed through the appropriate upstream project and issue queue.

## Getting started locally

**You do not need to install Drupal to explore the published reports.**

Local development is intended for contributors who want to run tests, investigate configurations, develop new scanning capabilities, or improve the Observatory.

This repository currently contains a Drupal Core source tree and associated testing infrastructure. Its architecture is being updated to support independently acquired, reproducible upstream test environments.

Start with the [environment setup guide](SETUP.md) and [Playwright testing documentation](docs/testing/PLAYWRIGHT.md).

The available environment diagnostic is:

```bash
npm run doctor
```

Follow the current setup instructions before running tests that require a Drupal installation. Do not assume the repository checkout represents the latest upstream Drupal Core revision.

## Project status and limitations

The Drupal Quality Observatory is under active development.

Existing reports and testing code provide a foundation, but parts of the infrastructure are historical, being restored, or not yet independently verified.

Current development priorities include:

- Reliable acquisition of current upstream Drupal revisions.
- Reproducible Drupal Core and Drupal CMS environments.
- Representative user journeys and configuration coverage.
- Repeatable accessibility, performance, and sustainability assessments.
- Regular comparisons with previous results.
- Accessible, transparent public reporting.

Testing coverage will always be incomplete. Reports must distinguish observed failures, verified findings, untested conditions, and inconclusive results.

The project does not claim that automated testing alone can establish accessibility conformance or overall software quality.

## AI use

Generative AI is used to assist with the development and ongoing maintenance of this repository, including code, documentation, testing, and analysis.

AI-generated material may contain errors or omissions. Maintainers remain responsible for accepting changes, and AI-generated conclusions are not substitutes for independently verified evidence.

AI-assisted analysis should preserve original observations, source references, testing conditions, and uncertainty. Human review is particularly important when interpreting accessibility, performance, or sustainability findings.

Independent review, corrections, and community contributions are encouraged.

## Documentation

More detailed information is available in the project documentation:

- [Current implementation assessment](docs/architecture/CURRENT-STATE.md)
- [Capability inventory](docs/architecture/CAPABILITY-INVENTORY.md)
- [Migration and development plan](docs/architecture/MIGRATION-PLAN.md)
- [Playwright testing](docs/testing/PLAYWRIGHT.md)
- [Upstream sources: fetch, pin and compare](docs/testing/SOURCES.md)
- [Optional server tracing for test runs (pilot)](docs/observability/README.md)
- [Accessibility testing process](A11Y-PROCESS.md)
- [Web Sustainability Guidelines alignment](WSG-ALIGNMENT.md)
- [Testing infrastructure roadmap](TOOLING-ROADMAP.md)
- [Accessibility policy](ACCESSIBILITY.md)
- [Security policy](SECURITY.md)

## Relationship to Drupal

This repository is an independent testing and reporting project. It is **not the canonical Drupal Core repository or an official Drupal quality certification service**.

Drupal Core is developed by the Drupal community. Source code, issue discussions, merge requests, and official project information are available through:

- [Drupal.org](https://www.drupal.org/)
- [Drupal Core source repository](https://git.drupalcode.org/project/drupal)
- [Drupal Core issue queue](https://www.drupal.org/project/issues/drupal)
- [Drupal CMS](https://www.drupal.org/project/drupal_cms)

The Observatory exists to support the Drupal community with reproducible evidence and to encourage improvements upstream.

## License

Drupal is free and open-source software distributed under the GNU General Public License, version 2 or later.

See the repository's [Drupal Core license](core/LICENSE.txt) for the applicable terms. Other included dependencies and tools may have their own licenses.
