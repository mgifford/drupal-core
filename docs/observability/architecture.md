# Observability pilot: feasibility and design

Issue: [#95](https://github.com/mgifford/drupal-core/issues/95), Phase 1
(feasibility) and Phase 2 (minimal tracing experiment). Dates are when the
facts were checked. For setup and use, see [README.md](README.md).

## Question

Can the Observatory link what a browser test observes to what Drupal did on
the server, without making tracing a requirement for normal scans? And what
is the least instrumentation that does it?

## Options reviewed

| Option | Checked | Finding | Usable now? |
| --- | --- | --- | --- |
| `drupal/opentelemetry` 1.0.0-beta7 (contributed module) | 2026-11-23 and 2026-11-24, packages.drupal.org metadata and a Composer dry run | Requires `drupal/core ^9 \|\| ^10 \|\| ^11`, so Composer rejects it on Drupal 12. It also requires `google/protobuf ^4.33.6`, while this checkout's `composer.lock` has `google/protobuf` v5.36.2 (a development dependency of core). | No |
| Drupal core's own OpenTelemetry use | 2026-11-24, this checkout | Limited to PHPUnit performance tests: `core/tests/Drupal/Tests/PerformanceTestTrait.php` sends a test's browser timings and database events to a collector when `OTEL_COLLECTOR` is set. Nothing in `core/lib` or `core/modules` traces live requests. The root `composer.json` has `open-telemetry/sdk` and `open-telemetry/exporter-otlp` in `require-dev` (locked at 1.16.1 and 1.5.0). | Not for live requests; the SDK is available |
| Rosetta | 2026-11-23 | A proposal, published on lakedrops.com on 2026-10-28 ("One trace, inside and outside Drupal"). No code is published. | No |
| Tool API (`drupal/tool`) 1.0.0-beta12 | 2026-11-24, packages.drupal.org metadata | Requires `drupal/core ^10.5 \|\| ^11`, so it cannot be installed on Drupal 12. Its trace attach points are placeholders. | No |
| A small module owned by this fork | 2026-11-23 | Uses the SDK packages already in `require-dev`. No new dependency. | Yes, chosen |

The OpenTelemetry PHP extension and its automatic instrumentation packages
were not evaluated: they would add a PHP extension to the DDEV image or new
Composer dependencies, and the pilot needed neither.

**Decision (owner, 2026-11-23):** build `modules/custom/observatory_trace`,
a test-only module, and retire it when a maintained module supports Drupal
12. It is three classes, about 350 lines of PHP.

## Minimum instrumentation

Each item answers a question a contributor asks about a finding:

| Instrumentation | Question it answers |
| --- | --- |
| One server span per main request, with route pattern, route name and status | Which Drupal route built this page, and did it succeed? |
| Page cache and dynamic page cache results on that span | Was the page built fresh, or served from a cache? |
| One span per database statement, with placeholders only | How much database work ran, and of which kind? |
| An event per exception | Did Drupal throw on the way, even if the page looked fine? |
| A `traceresponse` header on every traced response | Which trace belongs to which browser request? |

Not included, because standard OpenTelemetry instrumentation does not
provide it and it needs Drupal-specific work: Form API elements, render
arrays, theme hooks, Twig templates and JavaScript behaviours. That is
issue #95's Phase 4.

## How the module works

`RequestTracer` holds the per-request state. Two Drupal services feed it:

- `TraceMiddleware`, an HTTP middleware at priority 260. That puts it
  inside the reverse proxy middleware (300) and outside CORS (250), the
  page cache (200) and kernel pre-handle (100), so page cache hits are
  traced too. It starts the span for main requests only and turns on the
  default database connection's statement events.
- `TraceSubscriber`, which receives statement end and failure events and
  kernel exceptions (priority 1000, before Drupal's own exception
  subscribers turn them into responses).

The span's start time is `REQUEST_TIME_FLOAT`, when PHP received the
request. When the response is ready, the middleware records the route and
cache headers, sets `traceresponse` and ends the span.

Two Drupal behaviours shaped the design. Both broke the first version:

1. **Page cache hits skip HTTP kernel `terminate()`.** In
   `DrupalKernel::terminate()`, the HTTP kernel's `terminate()` runs only if
   the request went through kernel pre-handle, which a page cache hit never
   reaches. Services tagged `needs_destruction` are still destructed. So the
   module exports spans from `destruct()`, not from a terminate listener.
   Under PHP-FPM this happens after the response has been flushed.
2. **Drupal renders inside PHP Fibers.** `Renderer` runs render callbacks
   and placeholders in `\Fiber`s. Reading the current OpenTelemetry context
   inside a Fiber logged warnings. The module never reads the current
   context: it extracts the parent from the request headers against
   `Context::getRoot()` and passes the root span's context explicitly to
   every child span.

The exporter is created per request: OTLP/HTTP with JSON encoding, a
1-second timeout, no retries, and a batch processor that does not flush on
its own. Sampling is parent-based and otherwise always on.

## Correlation model

One evidence run contains scenarios; each scenario has attempts (retries);
each attempt has browser actions; each action causes requests; each
request may return a trace id. Findings point at the attempt, at the
action during which the scan ran, and at the action that loaded the
scanned page. One browser action can cause many server traces, and one
trace belongs to exactly one request.

Trace ids come only from the server's `traceresponse` header. The test
runner never invents one and never sends one. The schema enforces this: a
request whose trace status is not `correlated` cannot carry a trace id.

See [evidence-schema.md](evidence-schema.md) and
[README.md, "Trace correlation"](README.md#trace-correlation).

## Phase 1 checklist

| Item from issue #95 | Status | Evidence |
| --- | --- | --- |
| Review available Drupal OpenTelemetry integrations | Done | Options table above |
| Identify Rosetta and Tool API implementations and maturity | Done | Options table above; [interoperability.md](interoperability.md) |
| Review the existing scanning architecture | Done | The pilot extends `tests/playwright`, its `run-info.json` record and its axe-core use, and reuses `tools/a11y-fingerprints.js` |
| Identify a suitable accessibility or performance regression | Not done | The pilot uses a stable scenario: the content overview, with two axe-core "needs review" results, and a deliberate 404. No regression between revisions has been traced yet. |
| Determine the minimum instrumentation | Done | "Minimum instrumentation" above |
| Document limitations, overhead, privacy and dependencies | Done | [README.md](README.md): "Known limitations", "Overhead", "Security and privacy", "Configuration" |

Deliverables: this document, and the versioned evidence schema
`schemas/quality-evidence.schema.json` (0.1.0).

## Phase 2 checklist

| Item from issue #95 | Status | Evidence |
| --- | --- | --- |
| Enable OpenTelemetry in an isolated Drupal test environment | Done, on the local DDEV site | `observatory_trace`; off unless an endpoint is set |
| Configure a local OpenTelemetry-compatible collector | Done | `observability/compose.yaml`, Collector 0.165.0 |
| Execute an existing Playwright scenario | Partly | Two new pilot scenarios in `tests/playwright/tests/observability`; the existing smoke suite runs unchanged |
| Capture Drupal request traces | Done | Runs on 2026-11-23, every expected request exported |
| Correlate browser interactions with server-side execution | Done | Same runs: 37 of 37, then 7 of 7 and 2 of 2 correlated |
| Preserve Drupal revision and environment metadata | Done | Manifest `target` and `environment` |
| Export a machine-readable evidence manifest | Done | `manifest.json`, validated against the schema in CI |
| Verify that tracing can be disabled without affecting existing scans | Done | Run `run-20261124T130035Z-76493305` with tracing off passed, then the smoke suite passed 5 of 5 |

Phase 3 work that the pilot also started: overhead and storage were
measured once on one machine ([README.md, "Overhead"](README.md#overhead)),
and runs can be compared and classified. Retention and redaction policies,
GitHub Pages reporting and scheduled runs are not done.

## Acceptance criteria

| Criterion from issue #95 | Status |
| --- | --- |
| A Playwright test can be correlated with a Drupal server-side trace | Met locally |
| The evidence identifies the exact Drupal revision and test environment | Met: commit, dirty flag, Drupal and PHP versions, lock file hash, browser and viewport |
| Browser findings and execution evidence share an identifier | Met: trace ids on requests and findings |
| An example regression report shows diagnostic value | Not met: no real regression has been traced yet |
| Evidence is exportable in a documented, versioned format | Met: schema 0.1.0, [evidence-schema.md](evidence-schema.md) |
| Existing scans keep working with tracing off | Met: tracing-off run and smoke suite on 2026-11-24 |
| Instrumentation overhead is measured and documented | Met for one machine and two routes |
| Sensitive trace data is excluded from public reports | Met by design and unit tests; no report has been published yet |
| No AI service or MCP is required | Met |
| Extensible to Drupal CMS without duplicating infrastructure | Not tested: the manifest has a `target.product` field, and nothing in the pilot is specific to core except the scenarios |
