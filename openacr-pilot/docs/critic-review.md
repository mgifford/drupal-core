# Phase 0 Charter Critic Review and Dispositions

> **Review date:** 2026-08-18
>
> **Reviewer:** Independent `a11y-critic` scope/claim-boundary checkpoint
>
> **Initial verdict:** `REVISE`
>
> **First focused re-review:** `ACCEPT-WITH-RESERVATIONS`
>
> **Repository and issuer change review:** `REVISE`
>
> **Final repository and issuer re-review:** `ACCEPT-WITH-RESERVATIONS`

## Review scope

This review covers process, evidence, provenance, privacy, licensing, and human
authority. No collector or user interface exists. The review is not an automated
accessibility test, WCAG conformance review, legal opinion, API certification, or
ACR approval.

## Findings and dispositions

### 1. A short page could be declared complete — major

**Finding:** The top-25 rule permitted any response with no more than 25 records,
even when `next` showed that the selected page should contain more records.

**Disposition:** Revised. When `next` exists, the selected page must contain exactly
25 valid, unique, ordered records. Fewer records are accepted only when pagination
metadata consistently proves that page 0 is also the final page. A short page with
`next` or inconsistent links is `unavailable`.

### 2. Raw-response custody and deletion were not auditable — minor

**Finding:** The 30-day deadline did not name storage, custody, backup/cache
treatment, deletion method, or receipt.

**Disposition:** Revised. Immediate deletion after validation is now the default.
A dedicated retention record must identify custody and deletion controls before
implementation. A human-approved debugging exception may last no more than 30
days.

### 3. Attribution fields were incomplete — minor

**Finding:** Canonical URL, issue ID, and retrieval time alone may not satisfy
reasonable Creative Commons attribution or source-specific exceptions.

**Disposition:** Revised. The projection or manifest must retain title, creator
credit as supplied, canonical URL, issue ID, retrieval time, license URI or
exception, and a canonicalization/modification notice. Missing creator credit stops
collection until a human approves a collective-credit method.

### 4. Wording could imply endorsement or accepted authority — minor

**Finding:** “Decision date,” “human owner,” the release-owner title, and the bare
repository title could imply approval by Mike Gifford, Drupal, or GSA/OpenACR.

**Disposition:** Revised. The package now calls itself an independent proposal,
names the source of proposal inputs, describes Mike Gifford as the proposed pilot
release-scope owner, and explicitly disclaims endorsement.

### 5. Raw cleanup did not cover every exit path — minor reservation on re-review

**Finding:** The first focused re-review found that the cleanup deadline began
after successful validation and did not expressly cover cancellation or crash
recovery.

**Disposition:** Revised and accepted. Cleanup now covers success, parsing or
validation failure, cancellation, and exceptions; a startup recovery sweep handles
crash remnants. Without a recorded exception, deletion must finish before normal
process exit and no later than one hour after temporary-file creation. The
environment-specific retention record requires deletion verification and a
receipt.

### 6. The bundled review did not cover the revised authority model — major

**Finding:** The package moved from an unintended personal standalone repository
to a Zivtech-owned fork and proposed upstream pull request. It also identified the
Drupal Association as the proposed future issuer and added a Drupal Core
Leadership Team technical-scope gate. The bundled review still presented its
earlier disposition as final without reviewing those substantive changes.

**Disposition:** Revised. This review history now identifies the Zivtech submitter,
the `mgifford/drupal-core` target, the proposed Drupal Association issuer, the
Drupal Core Leadership Team gate, and the rule that fork creation, pull-request
review, or merge is not issuer authorization. A focused re-review of the complete
PR candidate is required before submission.

### 7. Phase 1 incorrectly required an evaluator — minor

**Finding:** One sentence required both the collector and evaluator to be assigned
before Phase 1, contradicting the collection-only Phase 1 checklist and the rule
that evaluation is commissioned separately.

**Disposition:** Revised. Phase 1 requires the proposed release-scope owner's
acceptance plus a named collector, repository maintainer, and evidence reviewer.
The evaluator remains unassigned until a separate evaluation engagement is
approved and is not a collection prerequisite.

## Pending human gates

The critic did not treat these as drafting defects:

- Mike Gifford must accept the proposed role, release-line interpretation, query,
  termination rule, and retention policy.
- Collector, repository maintainer, and evidence reviewer roles remain unassigned.
- Any raw-retention exception needs a human approver.
- A release evaluation requires a separate commission and exact evaluation scope.
- Zivtech is the submitter only; its fork and pull request do not establish Drupal
  endorsement, issuer authority, or technical approval.
- Mike Gifford must decide whether to accept the package in the test-harness
  repository or request another community review location.
- The Drupal Association must accept the proposed future issuer role and name an
  authorized representative before an official ACR publication handoff.
- The applicable Drupal Core Leadership Team must approve the technical product
  and release scope before an official Drupal core ACR publication handoff.

## Claim boundary

- The package defines an issue-traceability sample, not a complete queue.
- It defines no Drupal accessibility outcome or ACR term.
- `no issuer` blocks public ACR drafts and publication handoff.
- A future collector would require a separate implementation plan and approval.

The first focused re-review found no remaining defect in the original standalone
package. The later repository and issuer change review returned `REVISE` because
the bundled disposition was stale and the Phase 1 evaluator gate was inconsistent.
The final focused re-review verified both dispositions and found no remaining
document defect or claim-boundary regression. Its `ACCEPT-WITH-RESERVATIONS`
verdict records the pending human and operational gates above. No review verdict
authorizes collection, evaluation, an ACR draft, merge, issuer acceptance, or
publication.
