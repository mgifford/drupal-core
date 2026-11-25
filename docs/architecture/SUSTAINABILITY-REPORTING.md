# Environmental impact reporting: design plan

Status: proposed on 2026-11-25. The owner answered its open questions the
same day; the answers are listed under "Owner decisions" at the end and are
applied in the sections below. Steps 2 (evidence schema 0.2.0) and 3
(the CO2.js step) of the suggested order are implemented; the other steps
are not. It
expands Phase 9 of the [migration plan](MIGRATION-PLAN.md) for the
environmental part only.

The plan covers four sources of evidence, plus carbon worked out from the
two energy sources. They stay separate everywhere: in manifests, in
comparisons and on published pages. They are never added, averaged,
weighted or turned into one score.

| Source | Measurement `kind` | Unit | Runs where | What it is not |
| --- | --- | --- | --- | --- |
| CO2.js on transferred bytes | `emissions-modelled` | g CO2e | Wherever the evidence runner runs | Not a measurement of anything; a model applied to bytes |
| Lighthouse | `browser-timing`, `resource-proxy`; report as artifact kind `lighthouse` | ms, bytes | Local Chromium | Not energy, not emissions |
| Firefox Energy Scanner | `energy-measured` | J | The reference Apple Silicon Mac (decision D5) | Not server or data-centre energy |
| Host energy while serving Drupal | `energy-measured` (`energy-estimated` for an estimate) | J | The reference Apple Silicon Mac | Not Drupal's energy alone; the whole machine |
| Carbon from measured energy | `emissions-modelled` | g CO2e | Worked out from the two energy rows | Not a measurement; energy times a declared grid intensity |

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

## Rules that apply to every source

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
   without Lighthouse, the Energy Scanner or any host energy tool
   installed.

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
  Owner decision 1: CO2.js's global average, using the data year bundled
  with the pinned CO2.js version.
- Green hosting: not assumed (`green` false). A local DDEV site has no
  hosting provider to check.

**Where the model and grid intensity go.** The schema's `measurement` has
only a free-text `method`. Two options:

- (a) Put the model, version and grid intensities in `method` as text. No
  schema change, but comparisons cannot read them.
- (b) Schema 0.2.0 adds two optional fields to `measurement`: `parameters`
  (an object) and `inputs` (the ids of the measurements a value was derived
  from). **Chosen by the owner (decision 2)**, because comparisons need to
  refuse mixing grid intensities or model versions. While the schema is 0.x this needs no
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
`tests/playwright/package.json`, where the evidence tools run. The root
entry stays (owner decision 3).

**As implemented (step 3).** `tests/playwright/lib/evidence/emissions.mjs`
runs after every `evidence.mjs run` and `build`. Reading the CO2.js 0.19.0
source changed two details of the record above:

- Decision 1 is applied as CO2.js's bundled annual average for WORLD,
  472.94 g CO2e per kWh. The installed package does not state its data
  year; `data/output/average-intensities.json` at the co2.js tag `v0.19.0`
  gives 2024. The value is passed explicitly, so results differ from CO2.js's
  own SWD v4 default, which is the model's fixed 494 g CO2e per kWh (Ember
  2022 data, as the model's documentation cites it).
- CO2.js applies a grid intensity passed to SWD v4 to operational energy
  only. Embodied energy always uses the model's 494 g CO2e per kWh. So
  `parameters` records both: `grid_intensity_g_per_kwh` (operational, per
  segment, as `perByteTrace()` returned it) and
  `embodied_grid_intensity_g_per_kwh`, with `grid_intensity_year`.
- The data year and the embodied intensity are kept in a table of checked
  CO2.js versions in that file. A version not in the table records `null`
  for both, and a unit test fails until the new version is checked.
- `method` gives the number of same-origin requests, how many had no size,
  and how many requests to other origins were left out, as the limits
  below require.

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
never again in `core/package.json`, which belongs to upstream. It calls
the `lighthouse` package directly with Playwright's Chromium, not the
`playwright-lighthouse` wrapper the July spec used (owner decision 4), so
no fixed remote debugging port is needed.

**How it runs** (owner decisions 4 and 6):

- In Chromium, one page at a time, with one worker, and with server tracing
  off.
- Never at the same time as other tests or an energy measurement.
- With Lighthouse's unmodified desktop preset first. A mobile run can be
  added later as its own series.
- Three runs per page. The median run is reported, with the lowest and
  highest values.
- On a small, representative set of crawl pages to start. The set grows
  once a real run has been timed.
- The performance category only. The accessibility category is left out:
  Lighthouse's accessibility audits run axe-core, which the crawl already
  runs.

**What it records.**

- The full Lighthouse result as an artifact of kind `lighthouse`, which the
  schema already has. It is `visibility: private`, because it holds
  screenshots and URLs of the test site, and it stays on the local machine
  under decision D6.
- Lab metrics as measurements: Largest Contentful Paint, First Contentful
  Paint, Total Blocking Time, Speed Index and main-thread time as
  `browser-timing`; Cumulative Layout Shift as `browser-timing` with a
  unitless unit; total byte weight as `resource-proxy`.
- In `parameters` (decision 2): Lighthouse and Chromium
  versions, the preset, the throttling method (simulated unless set
  otherwise), and Lighthouse's host CPU benchmark (`benchmarkIndex`), so
  that runs on different hardware are not compared as equal.

**A performance score is not an environmental measure.** The Lighthouse
performance score is a weighted lab rating of page-load speed under
simulated throttling on one machine. It is not energy and not emissions,
and it goes in the performance section of a report, not the environmental
one. Category scores are not stored as measurements: they appear on the
summary page only, labelled as lab scores (owner decision 5). Main-thread
time is the Lighthouse figure closest to the
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
folder had no schema for `measure` results. The owner decided that the
Scanner project will publish one (decision 7). That work belongs in the
Scanner's repository, not here.

**Proposed exchange:**

1. The owner runs the Scanner by hand for now (decision 7), on the
   reference machine: an Apple Silicon Mac, where the Scanner measures
   Firefox's own processes. The run uses the same disposable installation
   as the Observatory run, after the Playwright tests and Lighthouse have
   finished. The Scanner's `--public-only` guard refuses
   local development hosts, so it is off for these runs.
2. A new command, for example
   `evidence.mjs import-energy <manifest> <scanner result>`, reads the
   result. It refuses `schemaVersion` values it does not know, and checks
   the file against the Scanner's `measure` schema once that exists. It matches
   pages to the manifest by base URL, pinned commit and sanitized path.
3. For each page with energy it adds one `energy-measured` measurement:
   - `name` `client.energy_incremental`, unit `J`, `instrumented` false;
   - `tool` `firefox-energy-scanner` with its version;
   - `parameters` (decision 2): the adapter, the scope (Firefox processes or
     whole CPU package), the idle-baseline subtraction, runs, warm-ups and
     spread.
   The raw energy and the expected idle energy stay in the artifact.
4. It adds the result file as a private artifact, because it lists URLs and
   the machine model. Schema 0.1.0 has no matching artifact kind, so
   schema 0.2.0 adds `energy-scanner-results` (step 2 of the order below).
5. When the machine could not measure energy (a virtual machine, or the
   `noop` adapter), it adds no energy value. It adds a note,
   "Not measured", with the Scanner's reason.
6. The Scanner's own CO2.js figure and Lighthouse output are not imported
   as measurements: the Observatory makes its own, from its own bytes, so
   one run never has two disagreeing emissions values for the same thing.

Energy values from different scopes or machines are never compared as
equal. A change of machine starts a new series.

## Carbon from measured energy

Owner decision 8: every `energy-measured` value, from the browser
(section 3) or the host (section 4), gets its own `emissions-modelled`
value. This is the fourth category in section 10.4 of the brief.

- `name`: the energy measurement's name with `.co2e` added, for example
  `client.energy_incremental.co2e`; `unit`: `g`.
- `inputs`: the id of the energy measurement it came from.
- `parameters`: the grid intensity in g CO2e per kWh, its source and its
  year. Under decision 1 that is CO2.js's global average.
- `method`: the energy in kWh times the grid intensity.

It is shown in the same section as the energy it came from, labelled as
modelled. It is never added to, or compared with, the CO2.js estimate from
bytes. The Sustainable Web Design model already includes a share for the
visitor's device (the Scanner's own output splits its estimate into
device, network and data-centre parts), so adding the two would count
device energy twice.

## 4. Host energy while serving Drupal

Owner decision 9 puts this in scope. Issue #77 asks for carbon testing
locally and names CodeCarbon. This section covers the energy of the
machine that serves Drupal, which is a different thing from the browser
energy in section 3.

**What can be measured on the reference Mac.** DDEV's containers run inside
a Linux virtual machine on macOS, so no hardware counter sees Drupal's
containers alone. Two routes exist:

- **Machine-wide measurement (recommended).** macOS `powermetrics` reads
  processor power for the whole machine, not per process, and needs
  `sudo`. Check at implementation time which parts its combined figure
  covers (CPU, GPU and so on).
  - The owner runs a fixed, server-only load: a list of requests sent by a
    small HTTP client, with no browser and with server tracing off. Most of
    the extra work is then Drupal's.
  - An idle baseline taken just before the load is subtracted, as the
    Scanner does for the browser.
  - The value is `energy-measured`, name `host.energy_incremental`, unit
    `J`. Its `parameters` give the scope (`machine`), the load (requests,
    concurrency, repetitions) and the baseline.
  - It covers everything on the machine: the virtual machine, Docker, the
    load generator and any other running process. It is not Drupal's
    energy alone, and reports say so.
- **CodeCarbon,** a Python library. Its
  [methodology page](https://docs.codecarbon.io/latest/explanation/methodology/),
  read on 2026-11-25, says three things that matter here:
  - On Apple Silicon its default path estimates CPU power from CPU load and
    a rated wattage. Its `powermetrics` path is effectively not used.
  - It estimates RAM power from a fixed watts-per-module rule.
  - On virtual machines it falls back to the CPU-load estimate.

  Its output does not record which method it used. Its values would
  therefore be `energy-estimated`, never `energy-measured`, with the method
  taken from its startup log. It is possible as a labelled estimate, but
  not as the main source.

**Rules for host energy:**

- Host energy and browser energy are never added: on one machine their
  scopes overlap. Host measurements run with no browser open; browser
  measurements run with no load generator.
- Host energy gets its own section on the summary page.
- `powermetrics` needs `sudo`, so the owner runs it by hand. Nothing in the
  Observatory adds a sudoers rule or stores a password.
- A machine running Drupal without a virtual machine, such as bare-metal
  Linux reading RAPL counters, would measure a different scope and start a
  new series.

The tool choice, the load and the measurement script are questions 13 to 15
at the end.

## Publication (decision D6)

- **Raw, local only, never committed:** Lighthouse reports, Scanner result
  files and profiles, `powermetrics` output, Playwright traces. The
  manifest marks them private.
- **Public:** sanitized manifests, with each measurement's method and
  parameters, and a generated summary page per run on GitHub Pages.
- **The summary page** has four sections in a fixed order, each with its
  own heading:
  1. resource use and modelled emissions;
  2. lab performance (Lighthouse), with category scores labelled as lab
     scores;
  3. measured browser energy, with the carbon worked out from it;
  4. host energy while serving Drupal, with the carbon worked out from it.
  Each section gives the method, tool versions, which scenarios were
  covered, the status, whether the previous run is comparable, and
  "Not measured" where a value is missing. There is no combined figure and
  no overall grade. The page uses data tables with captions and header
  cells, gives every number its unit, and does not use colour alone for
  meaning. It is checked with axe-core before publication.
- **Where it goes:** with the per-run reports planned in Phase 8
  (`reports/runs/<run-id>/`). Summaries wait for that path (owner
  decision 10), so nothing is published before then.
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
| 2 | Schema 0.2.0: `parameters` and `inputs` on measurements, and an artifact kind for Scanner results | `npm run test:unit`; fixtures validate |
| 3 | CO2.js step in the evidence tools | Unit tests on a fixture manifest; one real local run through `evidence.mjs run` |
| 4 | Lighthouse runner in `tests/playwright/` | One real local run; manifest validates; tracing off |
| 5 | Energy import, with carbon from measured energy | One real Scanner result from the reference Mac; one from a machine that cannot measure, giving "Not measured" |
| 6 | Host energy measurement, with carbon from it | One real run on the reference Mac with an idle baseline; a second run to show the spread |
| 7 | Summary page generator, once the Phase 8 path exists | Rendered from real manifests; axe-core on the page |
| 8 | Rewrite the `WSG-ALIGNMENT.md` methodology to match what runs | Owner review of the text |

The Scanner's schema for `measure` results (decision 7) is work in the
Scanner's repository. Step 5 can start without it, but checks against it
once it exists.

## Owner decisions

Answered by the owner on 2026-11-25.

| # | Question | Decision |
| --- | --- | --- |
| 1 | Grid intensity for CO2.js | CO2.js's global average, using the data year bundled with the pinned version |
| 2 | Where to record the model and grid intensity | Schema 0.2.0 adds optional `parameters` and `inputs` to measurements |
| 3 | The root `@tgwf/co2` entry | Keep it |
| 4 | Lighthouse setup | The `lighthouse` package directly; desktop first; three runs per page, median reported; a small representative page set to start |
| 5 | Lighthouse category scores | On the summary page only, labelled as lab scores |
| 6 | Lighthouse accessibility category | Left out |
| 7 | Energy Scanner | The Scanner project publishes a schema for `measure` results; the reference machine is an Apple Silicon Mac; the owner runs it by hand for now |
| 8 | Carbon from measured energy | Reported as its own `emissions-modelled` value |
| 9 | Server-side energy (issue #77) | In scope now (section 4) |
| 10 | Publishing before Phase 8 | Wait for `reports/runs/` |
| 11 | Tracking | Issue #77 |
| 12 | `WSG-ALIGNMENT.md` | Mark its methodology section as not running now |

## Questions still open

Raised by decision 9:

13. **Host energy tool:** machine-wide `powermetrics` (recommended), the
    CodeCarbon estimate, or both, each labelled with its own kind?
14. **Host load:** which requests, and how many? A starting proposal: the
    anonymous crawl pages, one request at a time, repeated enough times to
    rise clearly above the idle baseline.
15. **Host measurement script:** an Observatory script that runs the load
    while the owner runs `sudo powermetrics` beside it, or `powermetrics`
    output saved by the owner and imported afterwards?

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
- CodeCarbon documentation, read on 2026-11-25:
  <https://docs.codecarbon.io/latest/explanation/methodology/> and
  <https://docs.codecarbon.io/latest/explanation/power-estimation/>.
