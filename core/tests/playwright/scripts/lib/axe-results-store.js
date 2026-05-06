'use strict';

const fs = require('fs');
const path = require('path');

const SHARD_SIZE = 250;

function sortRecords(records) {
  return [...records].sort((left, right) => {
    const leftKey = [left.path, left.theme, left.colorScheme, left.viewport?.width ?? 0, left.viewport?.height ?? 0, left.language ?? '', left.accentPreset ?? ''].join('|');
    const rightKey = [right.path, right.theme, right.colorScheme, right.viewport?.width ?? 0, right.viewport?.height ?? 0, right.language ?? '', right.accentPreset ?? ''].join('|');
    return leftKey.localeCompare(rightKey);
  });
}

function relativePosix(fromFile, toFile) {
  return path.relative(path.dirname(fromFile), toFile).split(path.sep).join('/');
}

function ensureCleanDirectory(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function chunkRecords(records, size = SHARD_SIZE) {
  const chunks = [];
  for (let index = 0; index < records.length; index += size) {
    chunks.push(records.slice(index, index + size));
  }
  return chunks;
}

function buildRuleIndex(records) {
  const byRule = new Map();

  records.forEach((record) => {
    for (const violation of record.violations || []) {
      const key = violation.id;
      if (!byRule.has(key)) {
        byRule.set(key, {
          ruleId: key,
          impact: violation.impact,
          description: violation.description,
          helpUrl: violation.helpUrl,
          recordCount: 0,
          nodeCount: 0,
          themes: new Set(),
          languages: new Set(),
          directions: new Set(),
          accents: new Set(),
          paths: new Set(),
        });
      }
      const summary = byRule.get(key);
      summary.recordCount += 1;
      summary.nodeCount += Array.isArray(violation.nodes) ? violation.nodes.length : 0;
      summary.themes.add(record.theme);
      summary.languages.add(record.language || 'unknown');
      summary.directions.add(record.direction || 'unknown');
      summary.accents.add(record.accentPreset || 'default');
      summary.paths.add(record.path);
    }
  });

  return [...byRule.values()]
    .map((item) => ({
      ruleId: item.ruleId,
      impact: item.impact,
      description: item.description,
      helpUrl: item.helpUrl,
      recordCount: item.recordCount,
      nodeCount: item.nodeCount,
      themes: [...item.themes].sort(),
      languages: [...item.languages].sort(),
      directions: [...item.directions].sort(),
      accents: [...item.accents].sort(),
      paths: [...item.paths].sort(),
    }))
    .sort((left, right) => right.recordCount - left.recordCount || left.ruleId.localeCompare(right.ruleId));
}

function buildPathIndex(records) {
  const byPath = new Map();

  records.forEach((record) => {
    if (!byPath.has(record.path)) {
      byPath.set(record.path, {
        path: record.path,
        pages: new Set(),
        themes: new Set(),
        languages: new Set(),
        directions: new Set(),
        accents: new Set(),
        viewports: new Set(),
        ruleIds: new Set(),
        recordCount: 0,
        violationCount: 0,
      });
    }
    const summary = byPath.get(record.path);
    summary.recordCount += 1;
    summary.violationCount += Array.isArray(record.violations) ? record.violations.length : 0;
    summary.pages.add(record.page);
    summary.themes.add(record.theme);
    summary.languages.add(record.language || 'unknown');
    summary.directions.add(record.direction || 'unknown');
    summary.accents.add(record.accentPreset || 'default');
    summary.viewports.add(`${record.viewport?.width ?? 0}x${record.viewport?.height ?? 0}`);
    for (const violation of record.violations || []) {
      summary.ruleIds.add(violation.id);
    }
  });

  return [...byPath.values()]
    .map((item) => ({
      path: item.path,
      recordCount: item.recordCount,
      violationCount: item.violationCount,
      themes: [...item.themes].sort(),
      languages: [...item.languages].sort(),
      directions: [...item.directions].sort(),
      accents: [...item.accents].sort(),
      viewports: [...item.viewports].sort(),
      ruleIds: [...item.ruleIds].sort(),
    }))
    .sort((left, right) => right.violationCount - left.violationCount || left.path.localeCompare(right.path));
}

function buildContextIndex(records) {
  const byContext = new Map();

  records.forEach((record) => {
    const key = [
      record.theme,
      record.colorScheme,
      `${record.viewport?.width ?? 0}x${record.viewport?.height ?? 0}`,
      record.language || 'unknown',
      record.direction || 'unknown',
      record.accentPreset || 'default',
    ].join('|');

    if (!byContext.has(key)) {
      byContext.set(key, {
        theme: record.theme,
        colorScheme: record.colorScheme,
        viewport: `${record.viewport?.width ?? 0}x${record.viewport?.height ?? 0}`,
        language: record.language || 'unknown',
        direction: record.direction || 'unknown',
        accentPreset: record.accentPreset || 'default',
        recordCount: 0,
        violationCount: 0,
        incompleteCount: 0,
        paths: new Set(),
        ruleIds: new Set(),
      });
    }

    const summary = byContext.get(key);
    summary.recordCount += 1;
    summary.violationCount += Array.isArray(record.violations) ? record.violations.length : 0;
    summary.incompleteCount += Array.isArray(record.incomplete) ? record.incomplete.length : 0;
    summary.paths.add(record.path);
    for (const violation of record.violations || []) {
      summary.ruleIds.add(violation.id);
    }
  });

  return [...byContext.values()]
    .map((item) => ({
      theme: item.theme,
      colorScheme: item.colorScheme,
      viewport: item.viewport,
      language: item.language,
      direction: item.direction,
      accentPreset: item.accentPreset,
      recordCount: item.recordCount,
      violationCount: item.violationCount,
      incompleteCount: item.incompleteCount,
      pathCount: item.paths.size,
      ruleIds: [...item.ruleIds].sort(),
    }))
    .sort((left, right) => right.violationCount - left.violationCount || left.theme.localeCompare(right.theme));
}

function writeShardedResults({ records, reportsDir, dateStamp }) {
  const sorted = sortRecords(records);
  const datedDir = path.join(reportsDir, 'axe-results', dateStamp);
  const latestDir = path.join(reportsDir, 'axe-results', 'latest');

  const writeBundle = (targetDir, manifestFile) => {
    ensureCleanDirectory(targetDir);
    const shardsDir = path.join(targetDir, 'shards');
    fs.mkdirSync(shardsDir, { recursive: true });

    const chunks = chunkRecords(sorted);
    const shardFiles = chunks.map((chunk, index) => {
      const filePath = path.join(shardsDir, `chunk-${String(index + 1).padStart(3, '0')}.json`);
      writeJson(filePath, chunk);
      return {
        file: relativePosix(manifestFile, filePath),
        recordCount: chunk.length,
        firstPath: chunk[0]?.path || null,
        lastPath: chunk[chunk.length - 1]?.path || null,
      };
    });

    const ruleIndexPath = path.join(targetDir, 'by-rule.json');
    const pathIndexPath = path.join(targetDir, 'by-path.json');
    const contextIndexPath = path.join(targetDir, 'by-context.json');
    writeJson(ruleIndexPath, buildRuleIndex(sorted));
    writeJson(pathIndexPath, buildPathIndex(sorted));
    writeJson(contextIndexPath, buildContextIndex(sorted));

    const manifest = {
      format: 'axe-results-sharded-v1',
      generatedAt: new Date().toISOString(),
      totalRecords: sorted.length,
      chunkSize: SHARD_SIZE,
      storagePath: path.relative(reportsDir, targetDir).split(path.sep).join('/'),
      shards: shardFiles,
      indexes: {
        byRule: relativePosix(manifestFile, ruleIndexPath),
        byPath: relativePosix(manifestFile, pathIndexPath),
        byContext: relativePosix(manifestFile, contextIndexPath),
      },
    };

    writeJson(manifestFile, manifest);
    return manifest;
  };

  const datedManifestPath = path.join(reportsDir, `axe-results-${dateStamp}.json`);
  const latestManifestPath = path.join(reportsDir, 'axe-results.json');

  const datedManifest = writeBundle(datedDir, datedManifestPath);
  const latestManifest = writeBundle(latestDir, latestManifestPath);

  return {
    datedManifestPath,
    latestManifestPath,
    datedManifest,
    latestManifest,
  };
}

function loadAxeResults(resultsFile) {
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
  }
  catch (error) {
    throw new Error(`Failed to read axe results from ${resultsFile}: ${error.message}`);
  }

  if (Array.isArray(raw)) {
    return raw;
  }
  if (!raw || raw.format !== 'axe-results-sharded-v1' || !Array.isArray(raw.shards)) {
    throw new Error(`Unsupported axe results format in ${resultsFile}`);
  }

  const baseDir = path.dirname(resultsFile);
  return raw.shards.flatMap((shard) => {
    const shardPath = path.resolve(baseDir, shard.file);
    if (!shardPath.startsWith(`${baseDir}${path.sep}`)) {
      throw new Error(`Shard path escapes bundle directory: ${shard.file}`);
    }

    try {
      return JSON.parse(fs.readFileSync(shardPath, 'utf8'));
    }
    catch (error) {
      throw new Error(`Failed to read shard ${shard.file}: ${error.message}`);
    }
  });
}

module.exports = {
  loadAxeResults,
  writeShardedResults,
};