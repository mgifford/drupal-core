#!/usr/bin/env node
/**
 * Finds drupal.org issues that may describe Observatory findings, and
 * rechecks findings already mapped to a drupal.org issue. Read-only: it
 * never posts to drupal.org or GitHub and never opens issues. Output is a
 * local report with draft text for the owner. See docs/testing/recording-issues.md.
 *
 *   known-issues.mjs match   [--evidence <manifest>] [--evidence-dir <dir>] [--tag <name>]
 *                            [--offline] [--out <dir>] [--delay-ms <n>] [--max-pages <n>]
 *   known-issues.mjs recheck [--map <file>] [--evidence-dir <dir>] [--offline]
 *                            [--out <dir>] [--stale-days <n>] [--delay-ms <n>]
 *
 * Defaults:
 *   --evidence      the newest run in --evidence-dir
 *   --evidence-dir  tests/playwright/reports/evidence
 *   --out           tests/playwright/reports/known-issues (gitignored)
 *   --tag           Accessibility
 *   --map           reports/pattern-tracker-map.json
 *   --delay-ms      2000 between requests (minimum 1000)
 *   --stale-days    180
 *
 * --offline uses the queue cached by the last online match and sends no
 * requests. Behind an HTTP proxy, set NODE_USE_ENV_PROXY=1 (Node 22.21+).
 *
 * Exit codes: 0 success, 2 usage error or unusable input, 4 drupal.org
 * could not be reached.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXIT } from '../scripts/lib/exit-codes.mjs';
import {
  createClient, resolveTagIds, fetchTaggedIssues, fetchIssue, DrupalOrgError,
  DEFAULT_DELAY_MS, DRUPAL_CORE_NID, OPEN_STATUSES,
} from './lib/known-issues/drupal-org.mjs';
import { loadManifest, listManifests, groupFindings, matchGroups, wcagTagName, InputError } from './lib/known-issues/match.mjs';
import { mappedEntries, recheckEntry, issueFacts } from './lib/known-issues/recheck.mjs';
import { renderMatchReport, renderRecheckReport } from './lib/known-issues/report.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULTS = {
  'evidence-dir': path.join(ROOT, 'tests/playwright/reports/evidence'),
  out: path.join(ROOT, 'tests/playwright/reports/known-issues'),
  map: path.join(ROOT, 'reports/pattern-tracker-map.json'),
  tag: 'Accessibility',
  'delay-ms': String(DEFAULT_DELAY_MS),
  'max-pages': '40',
  'stale-days': '180',
};
const FLAGS = new Set(['offline']);
const OPTIONS = {
  match: new Set(['evidence', 'evidence-dir', 'tag', 'offline', 'out', 'delay-ms', 'max-pages']),
  recheck: new Set(['map', 'evidence-dir', 'offline', 'out', 'stale-days', 'delay-ms']),
};

class UsageError extends Error {}

function parse(args) {
  const [command, ...rest] = args;
  if (!OPTIONS[command]) throw new UsageError(command ? `unknown command "${command}"` : 'no command given');
  const options = { ...DEFAULTS };
  for (let i = 0; i < rest.length; i++) {
    const name = rest[i].startsWith('--') ? rest[i].slice(2) : null;
    if (!name || !OPTIONS[command].has(name)) throw new UsageError(`unknown option "${rest[i]}" for ${command}`);
    if (FLAGS.has(name)) {
      options[name] = true;
      continue;
    }
    const value = rest[++i];
    if (value === undefined || value.startsWith('--')) throw new UsageError(`--${name} needs a value`);
    options[name] = value;
  }
  for (const name of ['delay-ms', 'max-pages', 'stale-days']) {
    if (!/^\d+$/.test(options[name])) throw new UsageError(`--${name} must be a whole number`);
    options[name] = Number(options[name]);
  }
  return { command, options };
}

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
function writeFile(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text.endsWith('\n') ? text : `${text}\n`);
}
const relative = (file) => path.relative(process.cwd(), file) || file;
const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function match(options) {
  const manifestPath = options.evidence
    ? path.resolve(options.evidence)
    : listManifests(path.resolve(options['evidence-dir'])).at(-1);
  if (!manifestPath) throw new InputError(`no run folders with a manifest.json in ${options['evidence-dir']}`);
  const manifest = loadManifest(manifestPath);
  if (manifest.run.synthetic) throw new InputError(`${manifestPath} is a synthetic run, which is never evidence about Drupal`);

  const { groups, rejected } = groupFindings(manifest);
  const outDir = path.resolve(options.out);
  const cacheFile = path.join(outDir, `drupal-org-queue-${slug(options.tag)}.json`);
  const client = createClient({ delayMs: options['delay-ms'] });
  const wcagTags = [...new Set(groups.flatMap((g) => g.wcag).map(wcagTagName))];
  let queue;

  if (options.offline) {
    if (!fs.existsSync(cacheFile)) throw new InputError(`--offline, but there is no cached queue at ${relative(cacheFile)}; run once online first`);
    queue = readJson(cacheFile);
  }
  else {
    console.log(`Reading open Drupal core issues tagged "${options.tag}" from drupal.org (read-only)...`);
    const previous = fs.existsSync(cacheFile) ? readJson(cacheFile) : null;
    const known = previous?.tag_ids ?? {};
    const missing = [options.tag, ...wcagTags].filter((name) => !(name in known));
    const tagIds = { ...known, ...(await resolveTagIds(client, missing)) };
    if (!tagIds[options.tag]) throw new InputError(`drupal.org has no tag named "${options.tag}"`);
    const { issues, truncated } = await fetchTaggedIssues(client, {
      tagId: tagIds[options.tag],
      maxPages: options['max-pages'],
      log: (line) => console.log(line),
    });
    queue = {
      fetched_at: new Date().toISOString(),
      source: 'https://www.drupal.org/api-d7/node.json',
      project_nid: DRUPAL_CORE_NID,
      tag: options.tag,
      statuses: OPEN_STATUSES,
      truncated,
      tag_ids: tagIds,
      issues,
    };
    writeFile(cacheFile, JSON.stringify(queue, null, 2));
  }

  const unresolved = wcagTags.filter((name) => !(name in (queue.tag_ids ?? {})));
  const results = matchGroups(groups, queue.issues, queue.tag_ids ?? {});
  const generatedAt = new Date().toISOString();
  const base = path.join(outDir, `match-${manifest.run.run_id}`);
  writeFile(`${base}.md`, renderMatchReport({
    manifest, results, rejected, queue, requests: client.requests, offline: Boolean(options.offline), manifestPath: relative(manifestPath), generatedAt,
  }));
  writeFile(`${base}.json`, JSON.stringify({
    generated_at: generatedAt,
    tool: 'tools/known-issues.mjs match',
    notice: 'Candidates are unconfirmed. Draft text is an aid for the owner. Nothing was posted.',
    evidence: { run_id: manifest.run.run_id, status: manifest.run.status, commit: manifest.target?.source?.commit ?? null, dirty: manifest.target?.source?.dirty ?? null },
    queue: { tag: queue.tag, fetched_at: queue.fetched_at, issues: queue.issues.length, truncated: queue.truncated },
    requests: client.requests,
    unresolved_wcag_tags: unresolved,
    groups: results.map(({ group, candidates }) => ({
      key: group.key, pattern_id: group.pattern_id, rule_id: group.rule_id, urls: group.urls, wcag: group.wcag, finding_ids: group.finding_ids, candidates,
    })),
  }, null, 2));

  const withCandidates = results.filter((r) => r.candidates.length).length;
  console.log(`Run ${manifest.run.run_id}: ${(manifest.findings ?? []).length} findings in ${groups.length} groups${rejected ? ` (${rejected} rejected findings left out)` : ''}.`);
  console.log(`Queue: ${queue.issues.length} open issues tagged "${queue.tag}", fetched ${queue.fetched_at}${queue.truncated ? ' (TRUNCATED)' : ''}.`);
  console.log(`Groups with candidates: ${withCandidates}; without: ${results.length - withCandidates}. Requests sent: ${client.requests}.`);
  if (unresolved.length) console.log(`Not checked offline (tag ids not cached): ${unresolved.join(', ')}.`);
  console.log(`Report: ${relative(`${base}.md`)}\nData:   ${relative(`${base}.json`)}`);
}

async function recheck(options) {
  const mapPath = path.resolve(options.map);
  if (!fs.existsSync(mapPath)) throw new InputError(`no issue map at ${mapPath}`);
  let map;
  try {
    map = readJson(mapPath);
  }
  catch (error) {
    throw new InputError(`${mapPath}: cannot read JSON (${error.message})`);
  }
  const evidenceDir = path.resolve(options['evidence-dir']);
  const manifests = listManifests(evidenceDir).map(loadManifest);
  const entries = mappedEntries(map);
  const client = createClient({ delayMs: options['delay-ms'] });
  const issues = new Map();
  const issueErrors = new Map();
  if (!options.offline) {
    console.log(`Reading ${new Set(entries.map((e) => e.nid)).size} mapped issues from drupal.org (read-only)...`);
    for (const nid of new Set(entries.map((e) => e.nid))) {
      try {
        issues.set(nid, await fetchIssue(client, nid));
      }
      catch (error) {
        // A missing or access-denied issue is a fact to report; other failures stop the run.
        if (!(error instanceof DrupalOrgError) || ![403, 404].includes(error.status)) throw error;
        issueErrors.set(nid, `HTTP ${error.status}`);
      }
    }
  }
  const now = Date.now();
  const rows = entries.map((entry) => ({
    result: recheckEntry(entry, manifests),
    facts: issueFacts(issues.get(entry.nid), { now, staleDays: options['stale-days'] }),
    error: issueErrors.get(entry.nid) ?? null,
  }));
  const generatedAt = new Date(now).toISOString();
  const base = path.join(path.resolve(options.out), `recheck-${generatedAt.replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z')}`);
  writeFile(`${base}.md`, renderRecheckReport({
    rows, mapPath: relative(mapPath), evidenceDir: relative(evidenceDir), manifests: manifests.length,
    requests: client.requests, offline: Boolean(options.offline), staleDays: options['stale-days'], generatedAt,
  }));
  writeFile(`${base}.json`, JSON.stringify({
    generated_at: generatedAt,
    tool: 'tools/known-issues.mjs recheck',
    notice: '"not-observed" means the latest comparable run did not report the pattern. It is not evidence of a fix.',
    map: relative(mapPath),
    manifests: manifests.length,
    requests: client.requests,
    entries: rows.map(({ result, facts, error }) => ({ ...result, drupal_org: facts, drupal_org_error: error })),
  }, null, 2));

  const counts = {};
  for (const { result } of rows) counts[result.status] = (counts[result.status] ?? 0) + 1;
  console.log(`Mapped entries: ${entries.length}; ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(', ') || 'none'}. Manifests: ${manifests.length}. Requests sent: ${client.requests}.`);
  console.log(`Report: ${relative(`${base}.md`)}\nData:   ${relative(`${base}.json`)}`);
}

async function main() {
  let parsed;
  try {
    parsed = parse(process.argv.slice(2));
  }
  catch (error) {
    if (!(error instanceof UsageError)) throw error;
    console.error(`known-issues: ${error.message}\nUsage: node tools/known-issues.mjs <match|recheck> [options]; see the header of tools/known-issues.mjs.`);
    return EXIT.CONFIG;
  }
  try {
    await (parsed.command === 'match' ? match(parsed.options) : recheck(parsed.options));
    return EXIT.OK;
  }
  catch (error) {
    if (error instanceof InputError) {
      console.error(`known-issues: ${error.message}`);
      return EXIT.CONFIG;
    }
    if (error instanceof DrupalOrgError) {
      console.error(`known-issues: drupal.org request failed: ${error.message}`);
      return EXIT.INFRASTRUCTURE;
    }
    throw error;
  }
}

process.exitCode = await main();
