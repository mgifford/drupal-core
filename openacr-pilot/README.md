# Independent Drupal 11 OpenACR Traceability Pilot Proposal

> **Status:** Phase 0 package for community review. The current workflow sponsor
> authorized and completed fixture-only collector work in the independent Zivtech
> repository. No live collection, evaluation, Accessibility Conformance Report
> (ACR), or publication workflow is authorized.
>
> **No endorsement:** This is an independent proposal. Drupal core, the Drupal
> Association, GSA/OpenACR, and Mike Gifford have not endorsed or approved it.

This package holds the community-review copy of the charter for a small Drupal 11
issue-traceability pilot. Zivtech submitted it to Mike Gifford's accessibility
test-harness repository for review. The fixture-only collector and its canonical
implementation records remain in
[`zivtech/drupal-openacr-pilot`](https://github.com/zivtech/drupal-openacr-pilot).
Neither repository nor this pull request is an official Drupal project artifact.
The pilot tests whether a frozen set of public Drupal.org issues can support
remediation traceability without becoming evidence of conformance.

The short version:

- Drupal.org issues are remediation records and an evidence index. They do not
  determine Web Content Accessibility Guidelines (WCAG) outcomes or OpenACR terms.
- The proposed selection is limited to 25 public Drupal core issues. Comments are
  excluded.
- Fixture-only collector implementation is complete in the independent Zivtech
  repository. Live requests and snapshot promotion remain blocked.
- Mike Gifford is the proposed pilot release-scope owner. His acceptance of that
  role is still required.
- The current issuer state is `no issuer`. The Drupal Association is the proposed
  future issuer, acting on behalf of the Drupal core project, but it has not
  accepted that role or named an authorized representative. No ACR publication
  handoff is allowed.
- Any release evaluation must be commissioned separately and must define its own
  exact version, scope, baseline, sample, methods, and conformance target.

## Phase 0 documents

- [Pilot charter](docs/pilot-charter.md)
- [Engagement record template](docs/engagement-record-template.md)
- [Threat and provenance review](docs/threat-provenance-review.md)
- [Raw-response retention record template](docs/raw-response-retention-record-template.md)
- [Independent critic review](docs/critic-review.md)
- [License and attribution policy](LICENSE.md)

## Phase 1 implementation records

- [Independent implementation repository](https://github.com/zivtech/drupal-openacr-pilot)
- [Reviewed data implementation plan](https://github.com/zivtech/drupal-openacr-pilot/blob/main/docs/plans/2026-08-18-drupal-issue-snapshot-phase1-data-plan.md)
- [Final fixture-only review](https://github.com/zivtech/drupal-openacr-pilot/blob/main/docs/reviews/2026-08-18-phase1-fixture-only-final-review.md)
- [Merged implementation pull request](https://github.com/zivtech/drupal-openacr-pilot/pull/1)

## What happens next?

Mike Gifford must decide whether to accept the proposed release-scope-owner role,
Drupal 11 release identity, bounded query, attribution and retention controls, and
community review location. His acceptance would allow the work to be described as
an upstream or community pilot. It would not authorize live collection,
evaluation, an ACR draft, issue filing, or publication.

Before any live request, a human must complete the operational roles, retention
record, configuration and deletion review, and separate live-action authorization
defined in the charter. An official Drupal core ACR would additionally require a
separately commissioned evaluation, Drupal Association issuer acceptance with a
named representative, and Drupal Core Leadership Team technical-scope approval.

Related guidance:

- [Drupal core ACR process guidance](https://mgifford.github.io/drupal-core/docs/acr-process.html)
- [Drupal.org REST and other APIs](https://www.drupal.org/drupalorg/docs/apis/rest-and-other-apis)
- [GSA OpenACR](https://github.com/GSA/openacr)
- [Independent Zivtech implementation](https://github.com/zivtech/drupal-openacr-pilot)

## AI use

OpenAI Codex materially assisted with research and drafting. Humans remain
responsible for the scope, source licensing, release ownership, evaluation, and
any public claim.
