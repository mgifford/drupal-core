/**
 * @file
 * Analyze module accessibility impact.
 * 
 * Compares axe-core results from disabled vs enabled states.
 * Identifies regressions, improvements, and net impact.
 * Generates detailed impact reports.
 * 
 * Usage:
 *   npm run a11y:analyze-module-impact
 */

const fs = require('fs');
const path = require('path');

const DRUPAL_ROOT = path.join(__dirname, '../../..');
const REPORTS_DIR = path.join(DRUPAL_ROOT, 'reports/module-tests');
const OUTPUT_FILE = path.join(DRUPAL_ROOT, `reports/MODULE-IMPACT-${new Date().toISOString().split('T')[0]}.md`);

/**
 * Load test results from files
 */
function loadTestResults() {
  if (!fs.existsSync(REPORTS_DIR)) {
    console.error(`Reports directory not found: ${REPORTS_DIR}`);
    return [];
  }

  const files = fs.readdirSync(REPORTS_DIR).filter(f => f.endsWith('.json') && !f.includes('SUMMARY'));
  return files.map(f => {
    try {
      return JSON.parse(fs.readFileSync(path.join(REPORTS_DIR, f), 'utf-8'));
    } catch (e) {
      console.warn(`Failed to parse ${f}: ${e.message}`);
      return null;
    }
  }).filter(r => r !== null);
}

/**
 * Extract violations from scan results
 */
function getViolationsFromScans(scans) {
  if (!scans) return [];
  return scans.reduce((all, scan) => {
    return all.concat(scan.violations || []);
  }, []);
}

/**
 * Group violations by rule ID
 */
function groupByRule(violations) {
  const grouped = {};
  for (const v of violations) {
    if (!grouped[v.id]) {
      grouped[v.id] = {
        id: v.id,
        impact: v.impact,
        wcagTags: v.tags.filter(t => t.startsWith('wcag')),
        instances: []
      };
    }
    grouped[v.id].instances.push(v);
  }
  return grouped;
}

/**
 * Compare violations between disabled and enabled states
 */
function compareStates(disabledViolations, enabledViolations) {
  const disabledRules = groupByRule(disabledViolations);
  const enabledRules = groupByRule(enabledViolations);

  const regressions = []; // New violations with module enabled
  const improvements = []; // Violations fixed with module enabled
  const unchanged = [];    // Violations that persist

  // Find regressions (in enabled but not in disabled)
  for (const [ruleId, enabledRule] of Object.entries(enabledRules)) {
    if (!disabledRules[ruleId]) {
      regressions.push({
        ruleId: ruleId,
        impact: enabledRule.impact,
        wcagTags: enabledRule.wcagTags,
        instances: enabledRule.instances.length,
        rule: enabledRule
      });
    } else if (enabledRule.instances.length > disabledRules[ruleId].instances.length) {
      regressions.push({
        ruleId: ruleId,
        impact: enabledRule.impact,
        wcagTags: enabledRule.wcagTags,
        instances: enabledRule.instances.length - disabledRules[ruleId].instances.length,
        rule: enabledRule
      });
    }
  }

  // Find improvements (in disabled but not in enabled)
  for (const [ruleId, disabledRule] of Object.entries(disabledRules)) {
    if (!enabledRules[ruleId]) {
      improvements.push({
        ruleId: ruleId,
        impact: disabledRule.impact,
        wcagTags: disabledRule.wcagTags,
        instances: disabledRule.instances.length,
        rule: disabledRule
      });
    } else if (disabledRule.instances.length > enabledRules[ruleId].instances.length) {
      improvements.push({
        ruleId: ruleId,
        impact: disabledRule.impact,
        wcagTags: disabledRule.wcagTags,
        instances: disabledRule.instances.length - enabledRules[ruleId].instances.length,
        rule: disabledRule
      });
    }
  }

  // Find unchanged
  for (const [ruleId, disabledRule] of Object.entries(disabledRules)) {
    if (enabledRules[ruleId] && enabledRules[ruleId].instances.length === disabledRule.instances.length) {
      unchanged.push({
        ruleId: ruleId,
        impact: disabledRule.impact,
        instances: disabledRule.instances.length
      });
    }
  }

  return {
    regressions,
    improvements,
    unchanged,
    netChange: improvements.length - regressions.length
  };
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(analyses) {
  let md = `# Module Accessibility Impact Report\n\n`;
  md += `Generated: ${new Date().toISOString()}\n\n`;

  // Summary statistics
  const modulesWithRegressions = analyses.filter(a => a.comparison.regressions.length > 0).length;
  const modulesWithImprovements = analyses.filter(a => a.comparison.improvements.length > 0).length;
  const totalRegressions = analyses.reduce((sum, a) => sum + a.comparison.regressions.length, 0);
  const totalImprovements = analyses.reduce((sum, a) => sum + a.comparison.improvements.length, 0);

  md += `## Summary\n\n`;
  md += `- **Modules tested:** ${analyses.length}\n`;
  md += `- **Modules with regressions:** ${modulesWithRegressions}\n`;
  md += `- **Modules with improvements:** ${modulesWithImprovements}\n`;
  md += `- **Total new violations:** ${totalRegressions}\n`;
  md += `- **Total fixed violations:** ${totalImprovements}\n`;
  md += `- **Net impact:** ${totalImprovements - totalRegressions > 0 ? '✅ +' : '⚠️  '}${totalImprovements - totalRegressions}\n\n`;

  // Module details
  md += `## Module Results\n\n`;

  for (const analysis of analyses) {
    const { module, comparison } = analysis;
    const status = comparison.regressions.length > 0 
      ? '⚠️  REGRESSION' 
      : comparison.improvements.length > 0 
        ? '✅ IMPROVEMENT' 
        : '➖ NEUTRAL';

    md += `### ${module.metadata.name}\n\n`;
    md += `- **Status:** ${status}\n`;
    md += `- **Category:** ${module.metadata.category}\n`;
    md += `- **Violations without module:** ${module.disabled_state?.total_violations || 0}\n`;
    md += `- **Violations with module:** ${module.enabled_state?.total_violations || 0}\n`;
    md += `- **Net change:** ${comparison.improvements.length - comparison.regressions.length > 0 ? '+' : ''}${comparison.improvements.length - comparison.regressions.length}\n\n`;

    // Regressions
    if (comparison.regressions.length > 0) {
      md += `#### ⚠️  New Violations\n\n`;
      for (const reg of comparison.regressions.slice(0, 5)) { // Top 5
        md += `- **${reg.ruleId}** (${reg.impact}, ${reg.instances} instances)\n`;
        md += `  - WCAG: ${reg.wcagTags.join(', ')}\n`;
      }
      if (comparison.regressions.length > 5) {
        md += `- ... and ${comparison.regressions.length - 5} more\n`;
      }
      md += `\n`;
    }

    // Improvements
    if (comparison.improvements.length > 0) {
      md += `#### ✅ Fixed Violations\n\n`;
      for (const imp of comparison.improvements.slice(0, 5)) { // Top 5
        md += `- **${imp.ruleId}** (${imp.impact}, ${imp.instances} instances fixed)\n`;
        md += `  - WCAG: ${imp.wcagTags.join(', ')}\n`;
      }
      if (comparison.improvements.length > 5) {
        md += `- ... and ${comparison.improvements.length - 5} more fixed\n`;
      }
      md += `\n`;
    }

    // Recommendation
    if (comparison.regressions.length > 0) {
      md += `#### Recommendation\n\n`;
      md += `⚠️  **Module introduces accessibility regressions.** Requires fixes before public release.\n\n`;
    } else if (comparison.improvements.length > 0) {
      md += `#### Recommendation\n\n`;
      md += `✅ **Module improves accessibility.** Safe to enable or recommended for users needing these fixes.\n\n`;
    }

    md += `---\n\n`;
  }

  // Detailed findings
  md += `## Detailed Findings\n\n`;
  md += `### Experimental Modules\n\n`;
  const experimental = analyses.filter(a => a.module.metadata.experimental);
  for (const exp of experimental) {
    md += `- **${exp.module.metadata.name}**: ${exp.comparison.netChange > 0 ? '✅' : '⚠️ '} (${exp.comparison.netChange > 0 ? '+' : ''}${exp.comparison.netChange})\n`;
  }

  md += `\n### Optional Modules\n\n`;
  const optional = analyses.filter(a => a.module.metadata.category === 'optional');
  for (const opt of optional) {
    md += `- **${opt.module.metadata.name}**: ${opt.comparison.netChange > 0 ? '✅' : '⚠️ '} (${opt.comparison.netChange > 0 ? '+' : ''}${opt.comparison.netChange})\n`;
  }

  return md;
}

/**
 * Main analysis function
 */
function analyzeModuleImpact() {
  console.log(`\n📊 Analyzing module accessibility impact...\n`);

  // Load results
  const results = loadTestResults();
  if (results.length === 0) {
    console.error(`❌ No test results found. Run: npm run a11y:test-modules`);
    process.exit(1);
  }

  console.log(`Found ${results.length} module test results\n`);

  // Analyze each module
  const analyses = [];
  for (const result of results) {
    const disabledViolations = getViolationsFromScans(result.disabled_state?.scans);
    const enabledViolations = getViolationsFromScans(result.enabled_state?.scans);

    const comparison = compareStates(disabledViolations, enabledViolations);

    analyses.push({
      module: result,
      comparison: comparison
    });

    const status = comparison.regressions.length > 0 ? '⚠️ ' : comparison.improvements.length > 0 ? '✅' : '➖';
    console.log(`${status} ${result.module}`);
  }

  // Generate markdown report
  const report = generateMarkdownReport(analyses);

  // Save report
  fs.writeFileSync(OUTPUT_FILE, report);
  console.log(`\n✅ Report generated: ${OUTPUT_FILE}\n`);

  return analyses;
}

// Run analysis
if (require.main === module) {
  analyzeModuleImpact();
}

module.exports = { analyzeModuleImpact, compareStates, groupByRule };
