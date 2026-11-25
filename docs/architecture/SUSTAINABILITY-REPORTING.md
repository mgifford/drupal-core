# Environmental impact reporting: design plan

Status: proposed on 2026-11-25 for the owner's review. Nothing in this
plan is implemented, and it makes no owner decision. It expands Phase 9 of
the [migration plan](MIGRATION-PLAN.md) for the environmental part only;
the questions it leaves open are listed at the end.

The plan covers three sources of evidence. They stay separate everywhere:
in manifests, in comparisons and on published pages. They are never added,
averaged, weighted or turned into one score.

| Source | Measurement `kind` | Unit | Runs where | What it is not |
| --- | --- | --- | --- | --- |
| CO2.js on transferred bytes | `emissions-modelled` | g CO2e | Wherever the evidence runner runs | Not a measurement of anything; a model applied to bytes |
| Lighthouse | `browser-timing`, `resource-proxy`; report as artifact kind `lighthouse` | ms, bytes | Local Chromium | Not energy, not emissions |
| Firefox Energy Scanner | `energy-measured` | J | A physical machine (decision D5) | Not server or data-centre energy |

## Where things stand on 2026-11-25

- Each scenario attempt in an evidence manifest has two resource proxies,
  `browser.transfer_bytes` and `browser.request_count`
  (`tests/playwright/lib/evidence/manifest.mjs`). The schema already has the
  kinds `energy-measured`, `energy-estimated` and `emissions-modelled`
  (`schemas/quality-evidence.schema.json`). Nothing writes them.
- `@tgwf/co2` 0.19.0 is a root dependency in `package.json`. No current
  code imports it.
- Nothing runs Lighthouse. `a11y-lighthouse.spec.ts` and the
  `playwright-lighthouse` entry in `core/package.json` were deleted with
  the rest of the old core-path suite by `47c539d692` (2026-07-21). The
  last commit that has them is `d8a45b3fe0`. PR #96 later took
  `core/package.json` from upstream, which does not list it either. The old spec ran
  only the accessibility category (`onlyCategories: ['accessibility']`),
  so restoring it would give no performance data.
- The only sustainability report is dated 2026-07-05. Its script,
  `analyze-sustainability.js`, was deleted by the same commit. The Pages
  workflow copies `reports/*` to the site root, so the report is still
  published: <https://mgifford.github.io/drupal-core/sustainability-report-latest.html>
  answered HTTP 200 on 2026-11-25. `reports/index.html` does not link to it.
- The "How alignment is measured" section of `WSG-ALIGNMENT.md` describes
  that July pipeline in the present tense.
- Issue #77, "Do carbon testing locally", names CodeCarbon and the Firefox
  Energy Scanner.

## Rules that apply to all three sources

1. **Separate sections, no totals across sources.** Every report shows each
   source under its own heading, with its own method. This follows
   `AGENTS.md` and section 10.4 of the
   [Observatory brief](OBSERVATORY-BRIEF.md).
2. **Every value says how it was made.** Kind, tool and version, method,
   and the run and scenario it came from.
3. **Missing is "Not measured", never zero.** A run without a value gets a
   note that gives the reason, and the source's status uses the existing
   vocabulary (`NOT_RUN`, `SKIPPED`, `INFRASTRUCTURE_ERROR`, and so on).
4. **Compare only like with like.** Same kind, same tool and model version,
   same machine scope. Runs with server tracing on are diagnostic and are
   not used for Lighthouse or energy (see
   [observability README](../observability/README.md)).
5. **No conformance claims.** The Web Sustainability Guidelines organize the
   evidence; nothing here claims conformance to them.
6. **Optional by default.** A basic local Observatory run must still work
   without Lighthouse or the Energy Scanner installed.

## 1. Modelled emissions with CO2.js

**What it does.** After the manifest is built, a new step reads each
`browser.transfer_bytes` measurement and adds one `emissions-modelled`
measurement for the same scenario attempt.

**Proposed record:**

- `name`: `browser.co2e_modelled`; `unit`: `g`; `kind`:
  `emissions-modelled`.
- `tool`: `@tgwf/co2` with the version read from the installed package,
  not typed into the code.
- `scenario_id`, `attempt_id` and `instrumented` copied from the input
  measurement.
- Model: Sustainable Web Design, version 4, passed explicitly. In 0.19.0 the
  default is already version 4 (checked in the installed source), but a
  later release could change the default.
- Grid intensity: CO2.js's `perByteTrace()` takes a separate intensity for
  the device, network and data-centre segments, and returns the values it
  used. Record all three, in g CO2e per kWh, with their source and year.
  The default proposal is CO2.js's global average; see open question 1.
- Green hosting: not assumed (`green` false). A local DDEV site has no
  hosting provider to check.

**Where the model and grid intensity go.** The schema's `measurement` has
only a free-text `method`. Two options:

- (a) Put the model, version and grid intensities in `method` as text. No
  schema change, but comparisons cannot read them.
- (b) Schema 0.2.0 adds two optional fields to `measurement`: `parameters`
  (an object) and `inputs` (the ids of the measurements a value was derived
  from). **Recommended**, because comparisons need to refuse mixing grid
  intensities or model versions. While the schema is 0.x this needs no
  migration (see [evidence-schema.md](../observability/evidence-schema.md)).

Example under option (b), abridged (ids, timestamps and the scenario
fields are left out). Values in angle brackets are placeholders, not
results:

```json
{
  "name": "browser.co2e_modelled",
  "value": "<grams>",
  "unit": "g",
  "kind": "emissions-modelled",
  "tool": { "name": "@tgwf/co2", "version": "0.19.0" },
  "method": "CO2.js perByteTrace on browser.transfer_bytes, Sustainable Web Design v4, not green hosted.",
  "parameters": {
    "model": "swd",
    "model_version": 4,
    "grid_intensity_g_per_kwh": { "device": "<value>", "network": "<value>", "data_center": "<value>" },
    "grid_intensity_source": "<CO2.js bundled global average, data year>",
    "green_hosting_factor": 0
  },
  "inputs": ["<measurement_id of browser.transfer_bytes>"]
}
```

**Dependency.** Declare `@tgwf/co2` with an exact version in
`tests/playwright/package.json`, where the evidence tools run. Whether to
remove the root entry is open question 3.

**Limits that every report must state:**

- For a fixed model and grid intensity, the per-byte result is bytes times
  a constant. Its trend is the byte trend. It adds a unit people
  recognize, not new evidence, so bytes stay the primary figure.
- Only same-origin bytes are counted. The recorder counts requests to other
  origins but does not size them (`recorder.mjs`). Each report gives that
  count.
- A request whose size could not be read (the page closed first) is added
  as 0 bytes today (`manifest.mjs`), so a total can be low. The emissions
  step should say how many requests had no size. Changing how bytes are
  summed is a separate change.
- Each test uses a fresh browser context against a local DDEV site: a cold
  cache, no real network, and DDEV's compression and HTTP settings, not a
  production host's.
- New values are not comparable with the July 2026 report. That report
  used the Resource Timing API on 95 theme and page pairs, including the
  Claro and Olivero themes that upstream has since removed. The first new
  run starts a new series; it is not appended to
  `reports/sustainability/history.json`.

## 2. Lighthouse

**Where the dependency lives.** In `tests/playwright/package.json` as an
exact-pinned dev dependency: the only Playwright package (see
[PLAYWRIGHT.md](../testing/PLAYWRIGHT.md)). Not in the root manifest, and
never again in `core/package.json`, which belongs to upstream. Whether to
call the `lighthouse` package directly with Playwright's Chromium, or to use
the `playwright-lighthouse` wrapper, is open question 4. The old spec's
wrapper connected through Chrome's remote debugging port.

**How it runs.**

- In Chromium, one page at a time, with one worker, and with server tracing
  off.
- Never at the same time as other tests or an energy measurement.
- With an unmodified Lighthouse preset (desktop or mobile), recorded with the
  result.

**What it records.**

- The full Lighthouse result as an artifact of kind `lighthouse`, which the
  schema already has. It is `visibility: private`, because it holds
  screenshots and URLs of the test site, and it stays on the local machine
  under decision D6.
- Lab metrics as measurements: Largest Contentful Paint, First Contentful
  Paint, Total Blocking Time, Speed Index and main-thread time as
  `browser-timing`; Cumulative Layout Shift as `browser-timing` with a
  unitless unit; total byte weight as `resource-proxy`.
- In `method` (or `parameters` under option (b)): Lighthouse and Chromium
  versions, the preset, the throttling method (simulated unless set
  otherwise), and Lighthouse's host CPU benchmark (`benchmarkIndex`), so
  that runs on different hardware are not compared as equal.

**A performance score is not an environmental measure.** The Lighthouse
performance score is a weighted lab rating of page-load speed under
simulated throttling on one machine. It is not energy and not emissions,
and it goes in the performance section of a report, not the environmental
one. Category scores are not stored as measurements; how to keep them is
open question 5. Main-thread time is the Lighthouse figure closest to the
work a page costs a device, and it is still CPU time, not energy.
Lighthouse's byte weight is measured by Chromium and should roughly match
`browser.transfer_bytes`. Differences are reported, not reconciled.

## 3. Measured energy with the Firefox Energy Scanner

**Why it is a separate project.** The
[Firefox Energy Scanner](https://github.com/mgifford/firefox-energy-scanner)
(AGPL-3.0) reads Firefox's power counters. Its documentation, read on
2026-11-25, says that GitHub-hosted runners and other virtual machines
produced no power samples. It also says the scope depends on the machine:

- Apple Silicon: the energy of Firefox's own processes.
- Linux, Windows and Intel Macs: the whole CPU package, through RAPL.

Measurement therefore needs real hardware, which fits decision D5 (local
scans only).

**Boundary.** The Observatory reads the Scanner's output files. It does not
import its code and does not need it installed (the rule in
[interoperability.md](../observability/interoperability.md)).

**What the Scanner writes today.** A `measure` result is JSON with
`schemaVersion: 1`. It has:

- the machine's capability tier and energy-check verdict;
- the environment: Firefox, Playwright and CO2.js versions, and the energy
  adapter;
- the configuration: runs, warm-ups, cache mode and idle baseline;
- per-step timing, network totals, its own CO2.js estimate, and energy.

The project publishes JSON Schemas for its experiment evidence records
(`energy-finding/1`) and its energy timeline. On 2026-11-25 its `schema/`
folder had no schema for `measure` results.

**Proposed exchange:**

1. The owner runs the Scanner locally against the same disposable
   installation as the Observatory run, after the Playwright tests and
   Lighthouse have finished. The Scanner's `--public-only` guard refuses
   local development hosts, so it is off for these runs.
2. A new command, for example
   `evidence.mjs import-energy <manifest> <scanner result>`, reads the
   result. It refuses `schemaVersion` values it does not know. It matches
   pages to the manifest by base URL, pinned commit and sanitized path.
3. For each page with energy it adds one `energy-measured` measurement:
   - `name` `client.energy_incremental`, unit `J`, `instrumented` false;
   - `tool` `firefox-energy-scanner` with its version;
   - `method` or `parameters`: the adapter, the scope (Firefox processes or
     whole CPU package), the idle-baseline subtraction, runs, warm-ups and
     spread.
   The raw energy and the expected idle energy stay in the artifact.
4. It adds the result file as a private artifact, because it lists URLs and
   the machine model. The schema has no matching artifact kind, so this is
   `other` until a schema change adds one.
5. When the machine could not measure energy (a virtual machine, or the
   `noop` adapter), it adds no energy value. It adds a note,
   "Not measured", with the Scanner's reason.
6. The Scanner's own CO2.js figure and Lighthouse output are not imported
   as measurements: the Observatory makes its own, from its own bytes, so
   one run never has two disagreeing emissions values for the same thing.

Energy values from different scopes or machines are never compared as
equal. A change of machine starts a new series.

**Not in this plan.** Carbon derived from measured energy (energy times a
declared grid intensity) is the fourth category in section 10.4 of the
brief; see open question 8. Server-side energy, such as the CodeCarbon idea
in issue #77, measures a different thing: the machine running Drupal, not
the browser. On macOS the DDEV containers run inside a Linux virtual
machine, so per-container energy is not visible there. See open
question 9.

## Publication (decision D6)

- **Raw, local only, never committed:** Lighthouse reports, Scanner result
  files and profiles, Playwright traces. The manifest marks them private.
- **Public:** sanitized manifests, with each measurement's method and
  parameters, and a generated summary page per run on GitHub Pages.
- **The summary page** has three sections in a fixed order, each with its
  own heading:
  1. resource use and modelled emissions;
  2. lab performance (Lighthouse);
  3. measured client energy.
  Each section gives the method, tool versions, which scenarios were
  covered, the status, whether the previous run is comparable, and
  "Not measured" where a value is missing. There is no combined figure and
  no overall grade. The page uses data tables with captions and header
  cells, gives every number its unit, and does not use colour alone for
  meaning. It is checked with axe-core before publication.
- **Where it goes:** with the per-run reports planned in Phase 8
  (`reports/runs/<run-id>/`). Until that path is decided, nothing is
  published automatically (open question 10).
- **The July 2026 report:** add a "Sustainability (historical)" card to the
  report families in `reports/index.html`, linking
  `sustainability-report-latest.html`, `SUSTAINABILITY-latest.md` and
  `sustainability/history.json`. Its label says: one run, 2026-07-05, made
  by a script that has since been removed; not comparable with new runs.
  `reports/index.html` is written by hand (no workflow generates it), so
  the card is a direct edit, in its own small PR.

## Suggested order, one PR each

| Step | Change | Check |
| --- | --- | --- |
| 1 | Link the July report from `reports/index.html` as historical | Link resolves on Pages; axe on the index |
| 2 | Schema 0.2.0: `parameters` and `inputs` on measurements, an artifact kind for Scanner results (if approved) | `npm run test:unit`; fixtures validate |
| 3 | CO2.js step in the evidence tools | Unit tests on a fixture manifest; one real local run through `evidence.mjs run` |
| 4 | Lighthouse runner in `tests/playwright/` | One real local run; manifest validates; tracing off |
| 5 | Energy import | One real Scanner result from a physical machine; one from a machine that cannot measure, giving "Not measured" |
| 6 | Summary page generator | Rendered from real manifests; axe-core on the page |
| 7 | `WSG-ALIGNMENT.md` methodology matches what runs | Owner review of the text |

## Open questions for the owner

1. **Grid intensity:** CO2.js's global average, or a named region (for
   example Canada, or where the readers are)? Which data year?
2. **Schema:** option (b), `parameters` and `inputs` on measurements in
   schema 0.2.0, or method text only?
3. **Root dependency:** once `tests/playwright/` declares `@tgwf/co2`,
   remove it from the root `package.json`? This is the same kind of
   question as the root `axe-core` entries.
4. **Lighthouse package and setup:** `lighthouse` directly or
   `playwright-lighthouse`? Desktop, mobile or both? How many runs per
   page? All crawl pages or a subset?
5. **Lighthouse scores:** show them only on the summary page, or give them
   a place in the schema?
6. **Lighthouse accessibility category:** include it? It overlaps axe-core.
   If included, it belongs with the accessibility evidence.
7. **Energy Scanner:** ask that project to publish a schema for `measure`
   results? Which machine is the reference (for example an Apple Silicon
   Mac, for the per-process scope), and who runs it?
8. **Carbon from measured energy:** report it as its own
   `emissions-modelled` value with its own method, or leave it out?
9. **Server-side energy (issue #77, CodeCarbon):** in scope later, or not?
10. **Publishing before Phase 8:** wait for `reports/runs/`, or publish
    summaries somewhere sooner?
11. **Tracking:** use issue #77 for this plan, or open a new issue?
12. **`WSG-ALIGNMENT.md`:** mark its methodology section as not running
    now, or wait until step 7?

## Sources

- This repository: `AGENTS.md`; `MIGRATION-PLAN.md` (Phase 9, D5, D6);
  `OBSERVATORY-BRIEF.md` (sections 9 and 10);
  `schemas/quality-evidence.schema.json`;
  `tests/playwright/lib/evidence/manifest.mjs` and `recorder.mjs`;
  `docs/observability/interoperability.md` and `README.md`;
  `WSG-ALIGNMENT.md`; `reports/SUSTAINABILITY-latest.md`;
  `.github/workflows/pages.yml`; commits `d8a45b3fe0` and `47c539d692`;
  issue #77.
- CO2.js 0.19.0 as installed (`node_modules/@tgwf/co2/dist/esm/co2.js` and
  `helpers/index.js`): default model, `perByteTrace()` and its
  grid-intensity options. Documentation:
  <https://developers.thegreenwebfoundation.org/co2js/>.
- Firefox Energy Scanner, `main`, read on 2026-11-25: `docs/local-energy.md`,
  `docs/energy-measurement.md`, `docs/lighthouse.md`,
  `docs/evidence-records.md`, `schema/energy-finding.schema.json`,
  `schema/energy-timeline.schema.json`, and one `measure` result from
  `site/results/`.
