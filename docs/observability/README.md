# Server tracing for Observatory runs

Status, 2026-11-24: a working pilot for
[issue #95](https://github.com/mgifford/drupal-core/issues/95), Phase 2. It is
optional and for local test sites only. Scans run the same way with or
without it.

This guide covers:

- [What tracing adds](#what-tracing-adds), for Drupal contributors
- [Local setup](#local-setup)
- [Configuration](#configuration)
- [Trace correlation](#trace-correlation)
- [Regression classification](#regression-classification)
- [Security and privacy](#security-and-privacy)
- [Overhead](#overhead)
- [Known limitations](#known-limitations)

Related documents:

- [architecture.md](architecture.md): the Phase 1 feasibility review and why
  the pilot uses its own small module.
- [interoperability.md](interoperability.md): Drupal Core Lab, Rosetta, Tool
  API and the standards used.
- [evidence-schema.md](evidence-schema.md): the evidence manifest format.

## What tracing adds

### Why it helps

A browser test sees what Drupal sent back: the page, its status code, and
what a scanner such as axe-core found in it. It does not see what Drupal did
to build that page.

With tracing on, Drupal gives every response a trace id in a
`traceresponse` header. The test records that id next to the browser step
that caused the request and next to any finding on the resulting page.
Drupal records, under the same id, what happened on the server. So a finding
on `/admin/content` can be read together with a record like this one, from a
pilot run on 2026-11-23:

| Field | Value |
| --- | --- |
| Drupal route | `system.admin_content` |
| Route pattern | `/admin/content` |
| Server time | 61.9 ms |
| Database statements | 53 |
| Page cache | `UNCACHEABLE (request policy)` |
| Dynamic page cache | `UNCACHEABLE (poor cacheability)` |

That narrows the search: which route answered, whether caches were used,
how much database work ran, and which exceptions were thrown.

### What it captures

For each main HTTP request that Drupal answers, the `observatory_trace`
module records one server span with:

- the HTTP method and the route pattern, such as `/node/{node}`, never the
  actual URL path;
- the Drupal route name, such as `entity.node.canonical`;
- the response status code;
- the `X-Drupal-Cache` and `X-Drupal-Dynamic-Cache` values;
- start and end times. The start is when PHP received the request, so
  Drupal's bootstrap is included.

Under that span it records:

- one child span per database statement on the default connection: the
  operation (`SELECT`, `INSERT` and so on), the statement text with its
  placeholders, the connection key and target, the calling function, and
  the time taken. Statement arguments are never recorded;
- one event per exception that reached Drupal's exception handling, with
  its class, message and stack trace. A message can contain a URL (see
  [Security and privacy](#security-and-privacy)). This includes the
  exceptions behind 403 and 404 pages, and `EnforcedResponseException`,
  which is how Drupal's
  Form API redirects after a successful form submission. An exception event
  is not always an error.

Each trace also names the service (`drupal`), the Drupal version, the PHP
version and `deployment.environment.name: test`.

### What it cannot tell you

- **Which code produced a given piece of HTML.** Tracing does not know which
  Form API element, render array, theme hook, Twig template or JavaScript
  behaviour made a DOM node. The evidence manifest offers the route as a
  *candidate* source, never a verified one.
- **Cause.** A finding and a trace that appear together are related in time,
  not proven cause and effect. Treat differences between runs as leads.
- **Files the web server serves directly.** CSS, JavaScript, images and
  fonts that already exist on disk never reach Drupal, so they have no
  trace. Aggregated CSS or JavaScript files that Drupal builds on demand do
  (route `system.js_asset` or `system.css_asset`).
- **Work outside a main request.** Cron, queues, Drush commands and work
  done after the response is sent are not traced. Subrequests, such as the
  one Drupal makes to render a 404 page, share the main request's span.
- **Database statements that ran before the tracing middleware started,**
  or on a connection other than the default one.
- **Browser-side time.** JavaScript execution, layout and paint are not
  server work. Playwright records request durations separately.
- **Energy use.** Server timings and transfer sizes are not an energy
  measurement.

### How to investigate a finding

1. Open the run's report, `tests/playwright/reports/evidence/<run id>/report/index.html`.
   Each scenario lists its browser steps and the requests each step made.
   Each finding shows its rule, the page and element, the trace ids of the
   page load and any candidate route.
2. Open the run's `manifest.json` and search for one of those trace ids.
   Each request with that id has a `trace.summary`: route name, status,
   server time, statement counts by operation, cache results and exception
   types.
3. For statement text, calling functions and exception messages, search
   for the trace id in the run's private file `private/otlp-traces.jsonl`, or
   open it in the optional Jaeger viewer (see [Local setup](#local-setup)).
   These details stay private (see [Security and privacy](#security-and-privacy)).
4. Compare with an earlier run:
   `node tests/playwright/scripts/evidence.mjs compare <baseline manifest> <current manifest>`.
   Check `comparable` and `differences` first: if the runs differ in
   browser, axe-core version or tracing mode, findings are classified
   `not-comparable`.
5. To hand a finding to Drupal Core Lab, take its `finding_id` from
   `manifest.json` and export it:
   `node tests/playwright/scripts/evidence.mjs export-investigation <manifest> <finding id>`.
   See [interoperability.md](interoperability.md).
6. Before reporting a problem upstream, follow
   [recording-issues.md](../testing/recording-issues.md). Every finding
   starts as `automated-unreviewed`, and a route candidate is not proof of
   which code is responsible.

## Local setup

You need a running DDEV site, Docker, the Playwright package and browsers
installed as described in [PLAYWRIGHT.md](../testing/PLAYWRIGHT.md), and a
dedicated test account (not user 1).

Start the site and the trace Collector. The Collector joins DDEV's network
and writes spans to a gitignored folder; create that folder first so Docker
does not create it with the wrong owner:

```bash
ddev start
```

```bash
mkdir -p tests/playwright/reports/evidence/otel
```

```bash
docker compose -f observability/compose.yaml up -d
```

Install the module and point it at the Collector:

```bash
ddev exec dr ex:install observatory_trace
```

```bash
ddev exec dr state:set observatory_trace.otlp_endpoint http://observatory-otel-collector:4318
```

Check that Drupal now returns a trace id:

```bash
curl -sk -o /dev/null -D - https://drupal-core.ddev.site/user/login | grep -i traceresponse
```

Run the pilot scenarios with the evidence runner. Set the test account in
the same shell; never commit or paste the password:

```bash
export DRUPAL_TEST_USER=smoketest DRUPAL_TEST_PASS="$(openssl rand -base64 18)" && ddev exec dr user:password "$DRUPAL_TEST_USER" "$DRUPAL_TEST_PASS" && node tests/playwright/scripts/evidence.mjs run
```

Each run writes one folder, `tests/playwright/reports/evidence/<run id>/`:

| Path | Contents | Visibility |
| --- | --- | --- |
| `manifest.json` | The evidence manifest | Public once reviewed |
| `report/index.html` | Static HTML report of the manifest | Public once reviewed |
| `scenarios/*.json` | One raw record per scenario attempt | Private working file |
| `artifacts/axe-*.json` | Unmodified axe-core results | Private |
| `artifacts/*.png` | Screenshots | Private |
| `private/otlp-traces.jsonl` | This run's raw server spans | Private |
| `run-info.json` | Commit and checkout state of the tested code | Private working file |

To browse traces in Jaeger, start the Collector with the viewer profile
instead, then open http://127.0.0.1:16686:

```bash
COLLECTOR_CONFIG=collector-jaeger.yaml docker compose -f observability/compose.yaml --profile viewer up -d
```

To turn tracing off, delete the state value. The module then does nothing:

```bash
ddev exec dr state:delete observatory_trace.otlp_endpoint
```

To stop the Collector, and to remove the module:

```bash
docker compose -f observability/compose.yaml down
```

```bash
ddev exec dr ex:uninstall observatory_trace
```

### The evidence CLI

`node tests/playwright/scripts/evidence.mjs` with no arguments prints its
usage. Commands:

| Command | What it does |
| --- | --- |
| `run [options] [-- <Playwright args>]` | Runs `tests/observability` in Chromium, waits up to 10 seconds for this run's spans to reach the trace store, then builds the manifest and report. |
| `build <run dir>` | Builds the manifest and report again from a run folder. |
| `validate <file>...` | Checks manifests and investigation requests against their schemas. |
| `report <manifest> [--compare <baseline>]` | Writes `report/index.html` next to the manifest. |
| `compare <baseline> <current>` | Prints the finding classification as JSON. |
| `export-investigation <manifest> <finding id>` | Writes an investigation request for one finding. |

Options for `run` and `build`: `--trace-store <file>`, `--trigger
manual|ci|scheduled`, `--mode diagnostic|benchmark`, `--retention-days <n>`,
`--baseline <manifest>`. `run` also takes `--install-profile` and
`--recipes`, recorded as declared and not checked.

Exit codes: 0 on success (for `run`, only when the run passed); 1 when a
test failed, no scenario passed (for example, every test was skipped for
missing credentials) or a file is invalid; 2 for a usage error.

### Verified runs

| Date | Run id | Tracing | Result |
| --- | --- | --- | --- |
| 2026-11-23 | `run-20261123T172501Z-e4faaff8` | on | PASS; every expected request correlated and exported (37 of 37) |
| 2026-11-23 | `run-20261123T180548Z-bdd13047` | on | PASS; 7 of 7 and 2 of 2 correlated and exported |
| 2026-11-24 | `run-20261124T130035Z-76493305` | off | PASS; all 116 requests `instrumentation-disabled`; smoke suite 5 of 5 passed afterwards |

The tracing-off run used Drupal 12.0-dev at commit `43361ae9f9`, PHP 8.5.12,
Chromium 149, Playwright 1.61.1 and axe-core 4.12.1, with the module
installed and no endpoint set. The same two axe findings were recorded as
with tracing on, each with no related trace and source mapping `unknown`.

## Configuration

The module turns tracing on only when it finds an endpoint, in this order:

1. the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable of the PHP process;
2. the state value `observatory_trace.otlp_endpoint`.

The value must start with `http://` or `https://`. The module appends
`/v1/traces` and sends OTLP/HTTP with JSON encoding.
`OTEL_SDK_DISABLED=true` turns tracing off whatever the endpoint.

| Setting | Default | Notes |
| --- | --- | --- |
| Export timeout | 1 second | No retries. A missing Collector costs at most one timeout per request, after the response is sent. |
| Sampling | Every request | Parent-based, always on. A caller that sends `traceparent` with the sampled flag off is not sampled. |
| Export time | After the response | Spans are exported from the module's `destruct()`, which Drupal calls after sending the response. |
| `observatory_trace.source_commit` | Not set | A 40-character commit hash in this state value is added to every trace as `vcs.ref.head.revision`. The evidence runner does not set it; manifests record the commit from `run-info.json` instead. |

The module needs the OpenTelemetry SDK packages `open-telemetry/sdk` and
`open-telemetry/exporter-otlp`. This checkout already has them as
development dependencies in the root `composer.json`. Without them the
module does nothing.

The Collector (`observability/collector.yaml`, image
`otel/opentelemetry-collector-contrib:0.165.0`) receives OTLP/HTTP on port
4318 inside DDEV's Docker network and appends spans, as OTLP/JSON lines, to
`tests/playwright/reports/evidence/otel/otel-traces.jsonl`. Nothing is
published on a host port except the optional Jaeger viewer
(`jaegertracing/jaeger:2.23.0`), on 127.0.0.1 only.

Playwright reads `DRUPAL_BASE_URL` (default `https://drupal-core.ddev.site`)
and the test account from `DRUPAL_TEST_USER` and `DRUPAL_TEST_PASS`.

## Trace correlation

The server creates the trace ids; the test runner only reads them.

1. The module's HTTP middleware (priority 260: inside the reverse proxy
   middleware, outside the page cache) opens a server span for every main
   request, including page cache hits. If the request carries W3C
   `traceparent` and `tracestate` headers, the span joins that trace.
2. When the response is ready, the module adds a `traceresponse` header,
   defined in the
   [W3C Trace Context Level 2 draft](https://www.w3.org/TR/trace-context-2/#traceresponse-header):
   `traceresponse: 00-<32 hex trace id>-<16 hex span id>-<2 hex flags>`.
3. In the browser test, `EvidenceRecorder`
   (`tests/playwright/lib/evidence/recorder.mjs`) listens to one Playwright
   page. It adds no headers to any request. For each request to the site's
   own origin it records the browser step that caused it, the sanitized URL,
   the status, the timing, the cache headers and the trace id from
   `traceresponse`. Requests to other origins are only counted.
4. Before recording, each scenario sends one anonymous `GET /user/login`.
   If the response has a `traceresponse` header the run is recorded as
   tracing `enabled`, otherwise `disabled`.
5. After the tests, the runner reads the Collector's file and keeps only
   the spans whose trace ids this run received.

Each request gets one trace status:

| Status | Meaning |
| --- | --- |
| `correlated` | The response carried a valid trace id. |
| `not-expected` | No header, and the resource type (CSS, script, image, font) is usually served without Drupal. |
| `missing` | A document, XHR or fetch request got no valid header, or no response. |
| `malformed` | The header was present but not valid Trace Context. |
| `instrumentation-disabled` | Tracing was off for the run, so no id was expected. |

Each attempt then gets a correlation summary: `correlated` when every
expected request returned an id and every returned id was found in the
trace store; `partially-correlated`, `unavailable`, `correlation-failed` or
`instrumentation-disabled` otherwise. The summary counts `expected`,
`matched` and `exported` requests.

A finding is linked to the trace ids of the document requests made by the
browser step that loaded the scanned page. If the last of those has a trace
summary with a Drupal route name, the finding gets that route as a
`candidate` source.

A trace id is never generated by the test runner. If the header is missing
or invalid, the request simply has no trace id, and the schema rejects a
trace id on any request whose status is not `correlated`.

## Regression classification

`evidence.mjs compare`, and the report's comparison section, match findings
between two manifests by their occurrence fingerprint (from
`tools/a11y-fingerprints.js`: tool, rule, selector and route). The
fingerprint status is `provisional` because selectors are used as axe
reported them, without normalization.

| Classification | Meaning |
| --- | --- |
| `new` | Seen now, not in the baseline or any older comparable run given. |
| `recurring` | Seen now and in the baseline, with the same impact. |
| `changed` | Seen now and in the baseline, with a different impact. |
| `reintroduced` | Seen now, not in the baseline, but in an older comparable run. |
| `resolved` | In the baseline, not seen now, and its scenario ran to completion now. This means "not observed", not "fixed". |
| `unverified` | In the baseline, not seen now, and its scenario did not run to completion now. |
| `not-comparable` | The two runs differ in a condition that changes results. |

Conditions that must match: run mode, server tracing mode, browser name and
version, viewport, colour scheme, reduced motion, axe-core version, install
profile, recipes, and whether either run is synthetic. A different Drupal
commit is reported but does not block comparison: comparing commits is the
point.

Notes:

- Tracing on and tracing off are different conditions, so a run with
  tracing is never compared with a run without it.
- The `compare` command takes two manifests. `reintroduced` needs older
  runs, which only the library function `compareRuns()` accepts today.
- A classification is a lead for a person to check, not a verdict on a
  commit or contributor.

## Security and privacy

Raw traces are private test evidence. Manifests and reports are designed to
be publishable after review.

**The module never records as span attributes:** the URL path (one-time
login links carry tokens in it; the route pattern is recorded instead),
query strings, request or response headers, cookies, request or response
bodies, or database statement arguments.

**Raw spans do contain,** and so must stay private: statement text with
placeholders, calling function names, and exception messages and stack
traces (which include file paths and line numbers). Exception messages can
contain URLs. For a 404, Symfony's message holds the request URL without
its query string, followed by the full `Referer` URL when the browser sent
one. The stack trace repeats the message. Manifests keep only the
exception class names.

**Manifests contain only sanitized values:**

- URLs keep their path and parameter names. Every query value becomes
  `REDACTED`. One-time login and account-cancellation paths, and any path
  segment of 32 or more token characters, are replaced. Fragments are
  dropped. The site's origin is recorded once, without credentials.
- The Git remote is recorded without credentials: a URL remote loses its
  user name, password and query string, and an scp-style remote loses any
  password before the `@`.
- HTML snippets from axe-core have `value`, `content` and token attributes
  replaced, their link and form URLs sanitized as above, and are cut to 400
  characters.
- Trace summaries hold names, routes, status codes, cache results, counts,
  durations and exception class names. No statement text, exception
  messages or code locations.

**Private artifacts** are listed in the manifest with
`visibility: private`: the raw spans, the unmodified axe-core results (their
snippets can contain form tokens) and screenshots (they show the site as
the test user saw it). The report never links them.

**Credentials** for the test account come from environment variables and
are never written to evidence. Use a dedicated test account, not user 1.

**Network exposure:** the Collector accepts unauthenticated OTLP, but only
on DDEV's Docker network; it has no host port. The Jaeger viewer listens on
127.0.0.1 only.

**Never enable the module on a production site.** Anyone who can change
state values could point the endpoint at any HTTP host and receive
statement text and exception details.

**Retention:** the Collector's file grows with every run and is never
rotated. Delete `tests/playwright/reports/evidence/otel/otel-traces.jsonl`
when you no longer need it; each run keeps its own copy of its spans.
`--retention-days` records a retention period on private artifacts, but
nothing deletes them automatically yet. The whole `reports/` folder under
`tests/playwright/` is gitignored.

## Overhead

Measured on 2026-11-24 with `observability/measure-overhead.sh`.

**Method.** The script runs inside the DDEV web container and uses `curl`
against `http://localhost`, so the DDEV router, TLS and the browser are not
part of the timing. It records time to first byte (TTFB). It alternates
blocks with tracing off and on (off, on, off, on), so slow drift on the
machine affects both modes alike. Each block sends three warm-up requests,
then 10 timed requests per route:

- **Uncached:** `GET /admin/content` as the logged-in test account. Drupal
  bypassed both the page cache (`UNCACHEABLE (request policy)`) and the
  dynamic page cache (`UNCACHEABLE (poor cacheability)`). In a traced
  browser run, this route ran about 53 database statements.
- **Page cache hit:** `GET /user/login` anonymously.

Every sample also records whether a `traceresponse` header came back; all
samples were in the intended mode, and all returned 200.

**Results,** run 2 (10 blocks per mode, 100 samples per mode and route):

| Route | Tracing | Median TTFB | Interquartile range | 10th to 90th percentile |
| --- | --- | --- | --- | --- |
| `/admin/content` (uncached) | off | 26.7 ms | 25.6 to 29.0 ms | 25.0 to 32.6 ms |
| `/admin/content` (uncached) | on | 27.7 ms | 26.0 to 29.3 ms | 25.1 to 33.7 ms |
| `/user/login` (page cache hit) | off | 4.48 ms | 4.35 to 4.76 ms | 4.18 to 5.18 ms |
| `/user/login` (page cache hit) | on | 5.12 ms | 4.91 to 5.38 ms | 4.73 to 6.14 ms |

Difference in median TTFB, tracing on minus off, with a bootstrap 95%
interval (5,000 resamples):

| Route | Run 1 (40 samples per mode) | Run 2 (100 samples per mode) |
| --- | --- | --- |
| `/admin/content` (uncached) | +2.6 ms (+10%), interval +1.1 to +4.0 ms | +1.0 ms (+4%), interval +0.1 to +1.6 ms |
| `/user/login` (page cache hit) | +0.8 ms (+19%), interval +0.7 to +1.0 ms | +0.6 ms (+14%), interval +0.5 to +0.7 ms |

**Reading the numbers.** On this machine, tracing added roughly 1 to 3 ms
to an uncached administration page of about 27 ms, and about 0.6 to 0.8 ms
to a page cache hit of about 4.5 ms. For the page cache hit, every block
with tracing on was slower than the block with tracing off before it, in
both runs. The uncached result varied between the two runs, so treat it as
a range, not a single number.

**Caveats:**

- One machine: Apple M1 Max, Docker Desktop with 10 CPUs and about 8 GB
  for containers, DDEV 1.25.5 with Mutagen, PHP 8.5.12 with PHP-FPM,
  MariaDB 11.8, Drupal 12.0-dev at commit `43361ae9f9`, on the same site as
  the pilot runs.
- Requests were sequential. TTFB does not include the export, which runs
  after the response is sent but still keeps a PHP-FPM worker busy. Under
  concurrent load that could lower throughput; it was not measured.
- The Collector ran on the same Docker network. A slow or missing
  Collector adds up to one second of worker time per request after the
  response.
- Each database statement becomes a span, so pages with more statements
  should cost more. Only two routes were measured.
- Instrumented runs are diagnostic. Do not use them for performance
  measurements such as Lighthouse; keep tracing off for those. Manifests of
  traced runs say so in `run.notes`, and comparisons refuse to mix tracing
  modes.

To repeat the measurement (the module must be installed, the Collector
running and the test account present):

```bash
ddev exec bash observability/measure-overhead.sh smoketest 10 10
```

The script restores the tracing state value when it ends and writes a CSV
file to `tests/playwright/reports/evidence/overhead/`.

**Storage.** One traced pilot run (two scenarios, 116 requests, 9 traced)
produced a 136 KB manifest, 178 KB of private raw spans, a 321 KB private
axe-core result file and a 65 KB private screenshot. The same run with
tracing off produced a 109 KB manifest.

## Known limitations

- **Stopgap module.** `observatory_trace` exists because
  `drupal/opentelemetry` cannot be installed on Drupal 12 (see
  [architecture.md](architecture.md)). Retire it when a maintained module
  supports Drupal 12.
- **Route-level attribution only.** No Form API, render array, theme hook,
  Twig or JavaScript attribution (issue #95, Phase 4).
- **Subrequests share the main span.** Exceptions from subrequests that
  Drupal recovers from, such as the one behind a 404 page, are recorded on
  the main request's span.
- **Default database connection only.** Statements on other connections,
  and statements before the middleware runs, are not recorded.
- **Draft header.** `traceresponse` comes from the W3C Trace Context Level 2
  draft, not a final recommendation.
- **Site-wide switch.** The state value applies to every request to the
  site, so two runs against one site at the same time share one tracing
  mode.
- **Extra probe request.** Each scenario's tracing probe is an anonymous
  `GET /user/login`, which can warm the page cache before the scenario
  starts.
- **Skipped scenarios leave no record.** Without `DRUPAL_TEST_USER` and
  `DRUPAL_TEST_PASS`, both pilot scenarios are skipped, including the
  anonymous one, and the manifest has no scenarios (status `NOT_RUN`). The
  runner then exits 1.
- **No production guard.** The module does not warn on the status report
  page when tracing is on, and it accepts any HTTP or HTTPS endpoint.
- **No automatic retention.** Trace files and run folders are kept until
  someone deletes them.
- **Local only.** The pilot has not run in CI; the CI workflow only runs
  the unit tests and validates an example manifest.
