/**
 * Global setup: records which Drupal code and which site a run tested.
 *
 * Writes reports/run-info.json so every result can be traced to an exact
 * commit. DRUPAL_SOURCE_DIR is the checkout the site is served from; it
 * defaults to this repository's root. Field names follow the source
 * provenance record in the implementation specification (section 8.4).
 */
import { FullConfig } from '@playwright/test';
import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export const RUN_INFO_FILE = path.join(__dirname, '../reports/run-info.json');

function git(dir: string, args: string[]): string | null {
  try {
    return execFileSync('git', ['-C', dir, ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
}

export default async function globalSetup(config: FullConfig) {
  const sourceDir = path.resolve(
    process.env.DRUPAL_SOURCE_DIR ?? path.join(__dirname, '../../..'),
  );
  const commit = git(sourceDir, ['rev-parse', 'HEAD']);
  const status = git(sourceDir, ['status', '--porcelain']);

  const info = {
    schema_version: 1,
    source: {
      repository: git(sourceDir, ['remote', 'get-url', 'origin']),
      requested_ref: git(sourceDir, ['rev-parse', '--abbrev-ref', 'HEAD']),
      resolved_commit: commit,
      resolved_at: new Date().toISOString(),
      // True when the checkout has changes that the commit alone does not
      // contain, so the commit is not enough to reproduce the result.
      dirty: status === null ? null : status.length > 0,
    },
    base_url: config.projects[0]?.use.baseURL ?? null,
    playwright_version: config.version,
    node_version: process.version,
  };

  fs.mkdirSync(path.dirname(RUN_INFO_FILE), { recursive: true });
  fs.writeFileSync(RUN_INFO_FILE, JSON.stringify(info, null, 2) + '\n');

  if (!commit) {
    console.warn(`run-info: ${sourceDir} is not a Git checkout; the tested revision is unknown.`);
  }
  else {
    console.log(`run-info: testing ${commit}${info.source.dirty ? ' (with uncommitted changes)' : ''}`);
  }
}
