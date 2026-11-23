#!/usr/bin/env node
/**
 * Entry point for the Drupal testing engine.
 *
 * Only implemented commands are listed. See docs/architecture/MIGRATION-PLAN.md
 * for the commands planned in later phases.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXIT, collectChecks, exitCodeFor, formatReport } from './lib/doctor.mjs';
import {
  SourceError,
  checkoutSource,
  fetchSource,
  loadConfig,
  sourceStatus,
  sourceUpdates,
} from './lib/sources.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const USAGE = `Usage: node scripts/drupal-test.mjs <command> [options]

Commands:
  doctor [--json]          Check this machine and repository for what the
                           tests need. Read-only.
  sources <subcommand>     Fetch, pin and inspect upstream code
                           (list, fetch, checkout, status, updates).

Options:
  -h, --help               Show help for the tool or a command.

Exit codes:
  0  ok
  1  test failure
  2  invalid configuration or usage
  3  missing or incompatible dependency
  4  infrastructure unavailable (network, Docker, DDEV, the site)
`;

const DOCTOR_USAGE = `Usage: node scripts/drupal-test.mjs doctor [--json]

Checks Node.js, npm, Git, the Playwright package and browser, host PHP and
Composer, Docker, DDEV, disk space, the source registry, the test runner
config, the site at DRUPAL_BASE_URL (default https://drupal-core.ddev.site),
the test account variables and the Playwright MCP config. Changes nothing.

  --json   Print the results as JSON instead of text.
`;

const SOURCES_USAGE = `Usage: node scripts/drupal-test.mjs sources <subcommand> [options]

Sources are defined in config/sources.yml. Git sources are fetched into a
bare, blobless store under workspaces/sources/ and checked out per commit
under workspaces/checkouts/. See docs/testing/SOURCES.md.

Subcommands:
  list [--json]
      Show the configured sources. Fails if the config is invalid.
  fetch [<source>] [--json]
      Clone or fetch the source's branch. Never changes existing checkouts.
  checkout [<source>] [--ref <branch|commit>] [--offline] [--json]
      Pin a commit and create (or reuse) a checkout of it, with a
      provenance record. Without --ref, fetches and pins the branch tip.
      --offline pins from the local store without fetching; the record then
      says the commit is not known to be the latest.
  status [<source>] [--remote] [--json]
      Show fetch history and checkouts. --remote also asks the remote for
      its newest commit, without downloading anything.
  updates [<source>] [--since <commit>] [--json]
      List upstream commits, changed areas, dependency manifests and
      runtime requirement changes between --since (default: the newest
      checkout) and the last fetched tip.

<source> defaults to defaults.source in config/sources.yml.
`;

/** Parses flags and --name value pairs. Throws on anything unknown. */
function parseArgs(args, { flags = [], values = [] }) {
  const options = {};
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (flags.includes(arg)) {
      options[arg.slice(2)] = true;
    }
    else if (values.includes(arg)) {
      if (i + 1 >= args.length || args[i + 1].startsWith('-')) {
        throw new SourceError(`${arg} needs a value`, EXIT.CONFIG);
      }
      options[arg.slice(2)] = args[++i];
    }
    else if (arg.startsWith('-')) {
      throw new SourceError(`unknown option: ${arg}`, EXIT.CONFIG);
    }
    else {
      positional.push(arg);
    }
  }
  if (positional.length > 1) {
    throw new SourceError(`unexpected arguments: ${positional.slice(1).join(' ')}`, EXIT.CONFIG);
  }
  return { options, source: positional[0] };
}

function doctor(args) {
  if (args.includes('-h') || args.includes('--help')) {
    process.stdout.write(DOCTOR_USAGE);
    return EXIT.OK;
  }
  const unknown = args.filter((a) => a !== '--json');
  if (unknown.length) {
    process.stderr.write(`Unknown option: ${unknown.join(' ')}\n\n${DOCTOR_USAGE}`);
    return EXIT.CONFIG;
  }
  const results = collectChecks({ root: ROOT, env: process.env });
  const code = exitCodeFor(results);
  if (args.includes('--json')) {
    process.stdout.write(JSON.stringify({ exit_code: code, checks: results }, null, 2) + '\n');
  }
  else {
    process.stdout.write(formatReport(results) + '\n');
  }
  return code;
}

const short = (sha) => (sha ? sha.slice(0, 12) : 'none');

const TEXT = {
  list(config) {
    return Object.entries(config.sources).map(([id, s]) => (s.type === 'git'
      ? `${id}${id === config.defaults?.source ? ' (default)' : ''}: git ${s.url} branch ${s.branch} -> ${s.directory}`
      : `${id}: ${s.type} ${s.package} (${s.version_policy}); handled from Phase 7`)).join('\n');
  },
  fetch(r) {
    const change = r.previous === null ? 'first fetch'
      : r.advanced ? `${r.new_commits} new commit(s) since ${short(r.previous)}`
        : 'no new commits';
    return `${r.source}: ${r.branch} is at ${r.commit} (${change})`;
  },
  checkout(r) {
    const lines = [
      `${r.reused ? 'Reused' : 'Created'} ${r.checkout}`,
      `  commit:    ${r.resolved_commit} (requested ${r.requested_ref})`,
      `  latest:    ${r.is_latest_known ? 'yes, fetched just now' : r.fetch.offline ? 'not checked (offline)' : 'not claimed'}`,
    ];
    if (r.fetch.attempted && !r.fetch.ok) {
      lines.push(`  fetch:     FAILED ${r.fetch.error}`);
    }
    const q = r.requirements;
    lines.push(q
      ? `  requires:  php ${q.php ?? '?'}, node ${q.node ?? '?'}, yarn ${q.package_manager ?? q.yarn ?? '?'}, composer-runtime-api ${q.composer_runtime_api ?? '?'}`
      : '  requires:  unknown (requirement files not readable)');
    lines.push(`  record:    ${r.checkout}.json`);
    return lines.join('\n');
  },
  status(list) {
    return list.map((s) => {
      if (s.type !== 'git') {
        return `${s.source}: ${s.type}, ${s.note}`;
      }
      const lines = [`${s.source} (${s.branch}): store ${s.store ?? 'not fetched yet'}`];
      if (s.last_success) {
        lines.push(`  last fetch ok:   ${s.last_success.at} at ${short(s.last_success.commit)}`);
      }
      if (s.last_attempt && !s.last_attempt.ok) {
        lines.push(`  last fetch FAILED: ${s.last_attempt.at}: ${s.last_attempt.error}`);
      }
      if (s.remote) {
        lines.push(s.remote.ok
          ? `  remote tip:      ${short(s.remote.tip)}${s.remote.newer_than_fetched ? ' (newer than fetched; run sources fetch)' : ' (same as fetched)'}`
          : `  remote check FAILED: ${s.remote.error}`);
      }
      for (const c of s.checkouts) {
        const flag = !c.present ? ' missing' : c.broken ? ' BROKEN (not a checkout)' : c.dirty ? ' DIRTY' : '';
        lines.push(`  checkout ${short(c.commit)} (${c.requested_ref}, ${c.created_at})${flag}`);
      }
      return lines.join('\n');
    }).join('\n');
  },
  updates(u) {
    const lines = [
      `${u.source}: ${u.commit_count} commit(s) from ${short(u.since)} (${u.since_from}) to ${short(u.tip)} (fetched ${u.tip_fetched_at ?? 'unknown'})`,
    ];
    if (!u.linear) {
      lines.push('  note: the base is not an ancestor of the tip; history was rewritten or diverged');
    }
    for (const c of u.commits.slice(0, 20)) {
      lines.push(`  ${short(c.commit)} ${c.subject}`);
    }
    if (u.commit_count > 20) {
      lines.push(`  ... ${u.commit_count - 20} more (use --json for all)`);
    }
    lines.push(`  ${u.changed_file_count} file(s) changed; busiest areas:`);
    for (const a of u.changed_areas) {
      lines.push(`    ${a.area}: ${a.files}`);
    }
    lines.push(`  dependency manifests changed: ${u.manifest_changes.length ? u.manifest_changes.join(', ') : 'none'}`);
    lines.push(u.requirement_changes === null
      ? '  runtime requirements: unknown (files not readable)'
      : `  runtime requirements changed: ${u.requirement_changes.length ? u.requirement_changes.map((c) => `${c.field} ${c.before} -> ${c.after}`).join('; ') : 'none'}`);
    return lines.join('\n');
  },
};

function sources(args) {
  const [sub, ...rest] = args;
  if (!sub || sub === '-h' || sub === '--help') {
    process.stdout.write(SOURCES_USAGE);
    return sub ? EXIT.OK : EXIT.CONFIG;
  }
  if (rest.includes('-h') || rest.includes('--help')) {
    process.stdout.write(SOURCES_USAGE);
    return EXIT.OK;
  }
  const specs = {
    list: { flags: ['--json'] },
    fetch: { flags: ['--json'] },
    checkout: { flags: ['--json', '--offline'], values: ['--ref'] },
    status: { flags: ['--json', '--remote'] },
    updates: { flags: ['--json'], values: ['--since'] },
  };
  if (!specs[sub]) {
    throw new SourceError(`unknown sources subcommand: ${sub}\n\n${SOURCES_USAGE}`, EXIT.CONFIG);
  }
  const { options, source } = parseArgs(rest, specs[sub]);
  const config = loadConfig(ROOT);
  const id = source ?? config.defaults?.source;
  let result;
  if (sub === 'list') {
    result = config;
  }
  else if (sub === 'fetch') {
    process.stderr.write(`Fetching ${id}; the first fetch can take a few minutes...\n`);
    result = fetchSource(ROOT, config, id);
  }
  else if (sub === 'checkout') {
    result = checkoutSource(ROOT, config, id, { ref: options.ref, offline: Boolean(options.offline) });
  }
  else if (sub === 'status') {
    result = sourceStatus(ROOT, config, source, { remote: Boolean(options.remote) });
  }
  else {
    result = sourceUpdates(ROOT, config, id, { since: options.since });
  }
  process.stdout.write((options.json ? JSON.stringify(result, null, 2) : TEXT[sub](result)) + '\n');
  return EXIT.OK;
}

const [command, ...args] = process.argv.slice(2);
try {
  if (command === '-h' || command === '--help' || command === 'help') {
    process.stdout.write(USAGE);
    process.exitCode = EXIT.OK;
  }
  else if (command === 'doctor') {
    process.exitCode = doctor(args);
  }
  else if (command === 'sources') {
    process.exitCode = sources(args);
  }
  else {
    process.stderr.write(`${command ? `Unknown command: ${command}\n\n` : ''}${USAGE}`);
    process.exitCode = EXIT.CONFIG;
  }
}
catch (error) {
  if (!(error instanceof SourceError)) {
    throw error;
  }
  process.stderr.write(`Error: ${error.message}\n`);
  process.exitCode = error.code;
}
