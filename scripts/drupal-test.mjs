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

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const USAGE = `Usage: node scripts/drupal-test.mjs <command> [options]

Commands:
  doctor [--json]   Check this machine and repository for what the tests
                    need. Read-only.

Options:
  -h, --help        Show help for the tool or a command.

Exit codes:
  0  ok
  1  test failure
  2  invalid configuration or usage
  3  missing or incompatible dependency
  4  infrastructure unavailable (Docker, DDEV, the site)
`;

const DOCTOR_USAGE = `Usage: node scripts/drupal-test.mjs doctor [--json]

Checks Node.js, npm, Git, the Playwright package and browser, host PHP and
Composer, Docker, DDEV, disk space, the test runner config, the site at
DRUPAL_BASE_URL (default https://drupal-core.ddev.site), the test account
variables and the Playwright MCP config. Changes nothing.

  --json   Print the results as JSON instead of text.
`;

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

const [command, ...args] = process.argv.slice(2);
if (command === '-h' || command === '--help' || command === 'help') {
  process.stdout.write(USAGE);
  process.exitCode = EXIT.OK;
}
else if (command === 'doctor') {
  process.exitCode = doctor(args);
}
else {
  process.stderr.write(`${command ? `Unknown command: ${command}\n\n` : ''}${USAGE}`);
  process.exitCode = EXIT.CONFIG;
}
