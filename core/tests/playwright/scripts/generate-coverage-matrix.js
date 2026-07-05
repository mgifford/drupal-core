'use strict';

/**
 * Generate USER-STORY-COVERAGE-MATRIX.md and reports/coverage-metrics.json
 * from the actual sources of truth:
 *
 *   - USER-STORIES.md         → story IDs, titles, tiers, functional areas
 *   - Playwright spec files   → test('X.Y: …') titles mark a story automated
 *
 * Run: npm run a11y:coverage
 *
 * The outputs are fully generated — never edit them by hand.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '../../../..');
const USER_STORIES_FILE = path.join(REPO_ROOT, 'USER-STORIES.md');
const MATRIX_OUTPUT = path.join(REPO_ROOT, 'USER-STORY-COVERAGE-MATRIX.md');
const METRICS_OUTPUT = path.join(REPO_ROOT, 'reports', 'coverage-metrics.json');

// Spec locations scanned for test('X.Y: …') titles.
const SPEC_GLOBS = [
  path.join(REPO_ROOT, 'core/tests/playwright/accessibility-workflows.spec.js'),
  path.join(REPO_ROOT, 'core/tests/playwright/tests'),
];

function parseUserStories(markdown) {
  const stories = [];
  let currentTier = null;
  let currentArea = null;

  for (const line of markdown.split('\n')) {
    const tierMatch = line.match(/^## TIER (\d+):/);
    if (tierMatch) {
      currentTier = Number(tierMatch[1]);
      continue;
    }
    const areaMatch = line.match(/^### \d+\.\s+(.+?)\s*(?:\(\d+ Stories\))?\s*$/);
    if (areaMatch) {
      currentArea = areaMatch[1].trim();
      continue;
    }
    const storyMatch = line.match(/^#### (\d+\.\d+)\s+(.+)$/);
    if (storyMatch) {
      stories.push({
        id: storyMatch[1],
        title: storyMatch[2].trim(),
        tier: currentTier,
        area: currentArea ?? 'Uncategorized',
      });
    }
  }
  return stories;
}

function listSpecFiles() {
  const files = [];
  for (const entry of SPEC_GLOBS) {
    if (!fs.existsSync(entry)) continue;
    const stat = fs.statSync(entry);
    if (stat.isFile()) {
      files.push(entry);
    }
    else if (stat.isDirectory()) {
      for (const name of fs.readdirSync(entry)) {
        if (/\.spec\.(js|ts)$/.test(name)) {
          files.push(path.join(entry, name));
        }
      }
    }
  }
  return files;
}

/** Map story ID → { file, testTitle } for every test('X.Y: …') found. */
function findAutomatedStories(specFiles) {
  const automated = new Map();
  const testTitleRe = /test\(\s*['"`](\d+\.\d+):\s*([^'"`]+)['"`]/g;

  for (const file of specFiles) {
    const source = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = testTitleRe.exec(source)) !== null) {
      const [, storyId, testTitle] = match;
      if (!automated.has(storyId)) {
        automated.set(storyId, {
          file: path.relative(REPO_ROOT, file),
          testTitle: testTitle.trim(),
        });
      }
    }
  }
  return automated;
}

function pct(numerator, denominator) {
  if (!denominator) return '0.0%';
  return `${((numerator / denominator) * 100).toFixed(1)}%`;
}

function main() {
  if (!fs.existsSync(USER_STORIES_FILE)) {
    console.error(`❌ ${USER_STORIES_FILE} not found.`);
    process.exit(1);
  }

  const stories = parseUserStories(fs.readFileSync(USER_STORIES_FILE, 'utf8'));
  const specFiles = listSpecFiles();
  const automated = findAutomatedStories(specFiles);
  const generatedAt = new Date().toISOString();

  // Warn about test IDs that don't match any documented story — these are
  // either typos in the spec or stories missing from USER-STORIES.md.
  const storyIds = new Set(stories.map((s) => s.id));
  const orphanTests = [...automated.keys()].filter((id) => !storyIds.has(id));

  const tiers = [...new Set(stories.map((s) => s.tier))].filter(Boolean).sort();
  const byTier = {};
  for (const tier of tiers) {
    const tierStories = stories.filter((s) => s.tier === tier);
    const tierAutomated = tierStories.filter((s) => automated.has(s.id));
    byTier[`tier${tier}`] = {
      total: tierStories.length,
      automated: tierAutomated.length,
      coverage: pct(tierAutomated.length, tierStories.length),
    };
  }

  const metrics = {
    generatedAt,
    generator: 'core/tests/playwright/scripts/generate-coverage-matrix.js',
    totalStories: stories.length,
    automatedStories: automated.size - orphanTests.length,
    documentedOnly: stories.length - (automated.size - orphanTests.length),
    automationCoverage: pct(automated.size - orphanTests.length, stories.length),
    byTier,
    orphanTestIds: orphanTests,
    specFilesScanned: specFiles.map((f) => path.relative(REPO_ROOT, f)),
  };

  // ── Markdown matrix ────────────────────────────────────────────────────────
  const lines = [];
  lines.push('# User Story Coverage Matrix');
  lines.push('');
  lines.push('<!-- GENERATED FILE — DO NOT EDIT. -->');
  lines.push('<!-- Regenerate with: npm run a11y:coverage -->');
  lines.push('');
  lines.push(`Generated: ${generatedAt}`);
  lines.push('');
  lines.push('## Coverage Summary');
  lines.push('');
  lines.push(`- Total stories: ${metrics.totalStories}`);
  lines.push(`- Automated in Playwright: ${metrics.automatedStories}`);
  lines.push(`- Documented only (not automated yet): ${metrics.documentedOnly}`);
  lines.push(`- Automation coverage: ${metrics.automationCoverage}`);
  lines.push('');
  lines.push('| Tier | Automated | Total | Coverage |');
  lines.push('|---|---:|---:|---:|');
  for (const tier of tiers) {
    const t = byTier[`tier${tier}`];
    lines.push(`| Tier ${tier} | ${t.automated} | ${t.total} | ${t.coverage} |`);
  }
  lines.push('');

  if (orphanTests.length > 0) {
    lines.push('> ⚠️ Tests referencing unknown story IDs (fix the spec title or add the story): ' +
      orphanTests.map((id) => `\`${id}\``).join(', '));
    lines.push('');
  }

  lines.push('## Story-by-Story Matrix');
  lines.push('');

  const areas = [...new Set(stories.map((s) => s.area))];
  for (const area of areas) {
    lines.push(`### ${area}`);
    lines.push('');
    lines.push('| Story ID | Story Title | Tier | Status | Evidence |');
    lines.push('|---|---|---|---|---|');
    for (const story of stories.filter((s) => s.area === area)) {
      const auto = automated.get(story.id);
      const status = auto ? '✅ Automated' : '📄 Documented';
      const evidence = auto ? `\`${auto.file}\` — ${auto.testTitle}` : '—';
      lines.push(`| ${story.id} | ${story.title} | ${story.tier ?? '?'} | ${status} | ${evidence} |`);
    }
    lines.push('');
  }

  fs.writeFileSync(MATRIX_OUTPUT, lines.join('\n'));
  fs.mkdirSync(path.dirname(METRICS_OUTPUT), { recursive: true });
  fs.writeFileSync(METRICS_OUTPUT, JSON.stringify(metrics, null, 2));

  console.log(`✅ ${path.relative(REPO_ROOT, MATRIX_OUTPUT)} regenerated`);
  console.log(`✅ ${path.relative(REPO_ROOT, METRICS_OUTPUT)} written`);
  console.log(`   Stories: ${metrics.totalStories} | Automated: ${metrics.automatedStories} (${metrics.automationCoverage})`);
  for (const tier of tiers) {
    const t = byTier[`tier${tier}`];
    console.log(`   Tier ${tier}: ${t.automated}/${t.total} (${t.coverage})`);
  }
  if (orphanTests.length > 0) {
    console.warn(`   ⚠️ Orphan test IDs (no matching story): ${orphanTests.join(', ')}`);
  }
}

main();
