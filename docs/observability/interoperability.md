# Observability pilot: interoperability

How the pilot's evidence connects to other projects and standards. The
rule throughout: exchange documented, versioned files, and never depend on
another project's internal code or on it being installed. For setup and
use, see [README.md](README.md).

## Standards used

| Standard | Where | Notes |
| --- | --- | --- |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/) | `observatory_trace` reads incoming `traceparent` and `tracestate` | A caller that sends these joins its trace to Drupal's span. The Playwright pilot does not send them. |
| [W3C Trace Context Level 2 draft](https://www.w3.org/TR/trace-context-2/#traceresponse-header), `traceresponse` | Set by `observatory_trace`; read by `tests/playwright/lib/evidence/trace-context.mjs` | A draft header, not yet a recommendation. |
| [OTLP](https://opentelemetry.io/docs/specs/otlp/) over HTTP, JSON encoding | Module to Collector | Any OTLP receiver works; the endpoint is a setting. |
| OTLP/JSON, one export request per line | Collector file exporter; read by `tests/playwright/lib/evidence/otlp.mjs` | The private trace store format. |
| [OpenTelemetry semantic conventions](https://opentelemetry.io/docs/specs/semconv/) | Span and resource attributes | See the attribute list below. |
| [JSON Schema 2020-12](https://json-schema.org/draft/2020-12) | `schemas/*.schema.json` | Validated with Ajv. |

Attributes on spans and resources:

- From the semantic conventions: `http.request.method`, `url.scheme`,
  `http.response.status_code`, `http.route`, `db.system.name`,
  `db.namespace`, `db.operation.name`, `db.query.text`,
  `code.function.name`, `error.type`, `service.name`, `service.version`,
  `deployment.environment.name`, `process.runtime.name`,
  `process.runtime.version` and `vcs.ref.head.revision`. Exception events
  use `exception.type`, `exception.message` and `exception.stacktrace`.
- Drupal-specific, under a `drupal.` prefix: `drupal.route.name`,
  `drupal.page_cache` and `drupal.dynamic_page_cache`.

Because the module speaks plain OTLP, its traces can go to any
OpenTelemetry backend by changing the Collector's exporters. The optional
Jaeger viewer in `observability/compose.yaml` is one example. The evidence
tools only read the Collector's file.

## Drupal Core Lab

[Drupal Core Lab](https://github.com/mgifford/drupal-core-lab) reproduces
single Drupal issues and tests fixes before and after. This repository
finds and tracks problems across revisions. The two exchange one file type.

**Investigation request** (`schemas/investigation-request.schema.json`,
version 0.1.0). It hands one finding to Core Lab or any project that does
reproduction work:

```bash
node tests/playwright/scripts/evidence.mjs export-investigation <manifest> <finding id> --core-lab-issue <drupal.org issue number>
```

It records:

- where the finding came from: run id, finding id, Drupal commit, scenario;
- the finding: tool, rule, result, impact, sanitized URL, element
  selector, WCAG candidates, occurrence fingerprint and verification
  status;
- how to reproduce it: the route, the browser steps up to the one that
  loaded the page, the rerun command, the install profile, recipes and
  browser;
- the related trace ids and the path of the evidence manifest;
- optionally, the drupal.org issue and an existing Core Lab experiment.

Nothing in this repository reads Core Lab's files or needs Core Lab to be
installed. This change does not modify Core Lab. Whether and how Core Lab
reads investigation requests is that project's decision.

In the other direction, this repository already treats Core Lab's
`recipes/` and `reports/issues/` folders as read-only inputs (see the
[migration plan](../architecture/MIGRATION-PLAN.md)).

| This repository | Drupal Core Lab |
| --- | --- |
| Scheduled scans, history, regression detection | Before and after comparison of one issue or merge request |
| Trace correlation and the evidence index | Reproducible environments for one issue |
| Deciding which findings need investigation | Detailed interaction testing and experimental instrumentation |

## drupal/opentelemetry

The contributed [OpenTelemetry module](https://www.drupal.org/project/opentelemetry)
is the natural long-term replacement for `observatory_trace`, but version
1.0.0-beta7 cannot be installed on Drupal 12 (see
[architecture.md](architecture.md)).

It requires OpenTelemetry's `traceresponse` propagator package
(`open-telemetry/opentelemetry-propagation-traceresponse`), so it is
expected to return the same header, and the Playwright side would then
work without change. This has not been tested. Before switching, check:

- that it sets `traceresponse` on page cache hits as well;
- which attributes it records, against the privacy rules in
  [README.md](README.md#security-and-privacy), in particular that it never
  records URL paths with one-time login tokens or statement arguments;
- that `tests/playwright/lib/evidence/otlp.mjs` still finds the route name
  and cache results, or update the summary to its attribute names.

## Rosetta

Rosetta is a proposal for one trace shared across Drupal and the tools
around it, published on lakedrops.com on 2026-10-28. As of 2026-11-24 it
has no published code, so there is nothing to integrate.

The pilot follows the same direction with existing standards: W3C Trace
Context for ids and OTLP for transport. If Rosetta publishes conventions,
compare them with the attribute list above and the `traceresponse` flow
before adopting anything.

## Tool API and diagnostic operations

Issue #95 lists five conceptual read-only operations. None is built as a
Tool API tool: `drupal/tool` 1.0.0-beta12 supports only `^10.5 || ^11`, and
its trace attach points are placeholders. Most of the data already exists
as files and command-line commands that need no AI service or MCP:

| Operation | Available today |
| --- | --- |
| `quality.environment` | Manifest `target` and `environment`: commit, dirty flag, Drupal and PHP versions, lock file hash, install profile and recipes as declared, browser, viewport, runner |
| `quality.inspect_route` | Manifest `requests[].trace.summary`, and the private raw spans by trace id |
| `quality.inspect_component` | Not available. Source mapping stops at a candidate route. |
| `quality.compare_runs` | `evidence.mjs compare` |
| `quality.get_regressions` | The `compare` output: `new`, `recurring`, `changed`, `resolved`, `unverified` and `not-comparable` findings |

Not covered by the files: enabled modules and themes, and configuration
beyond the declared profile and recipes.

If Tool API gains Drupal 12 support, these could become tools that read the
same files. MCP access would stay optional.

## Other Observatory inputs

- **Drupal CMS.** The manifest names the product in `target.product`. The
  pilot has only run against Drupal core.
- **Energy and sustainability tools,** such as the
  [Firefox Energy Scanner](https://github.com/mgifford/firefox-energy-scanner).
  The schema separates `energy-measured`, `energy-estimated` and
  `emissions-modelled` measurements from server timings and transfer
  sizes. The pilot records only `server-execution` and `resource-proxy`
  values.
- **Other accessibility engines,** such as
  [Open Scans](https://github.com/mgifford/open-scans). Findings keep the
  engine's own rule id and tags. The pilot records only axe-core.

## Versioning

The evidence manifest schema is at 0.2.0 and the investigation request
schema at 0.1.0 (see
[evidence-schema.md, "Versioning"](evidence-schema.md#versioning)). Their
`$id` includes the version. While the major version is 0, a new version
may change fields without a migration;
consumers should check `schema_version` and refuse versions they do not
know.
