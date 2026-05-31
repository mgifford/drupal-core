/**
 * @file
 * Shared helpers for accessibility patch evaluator behavior.
 */

'use strict';

const AXE_RULE_ALIASES = {
  // WCAG 2.5.3 commonly appears as "label-in-name" in human-facing packet
  // labels. axe-core exposes the implemented rule with this concrete ID.
  'label-in-name': 'label-content-name-mismatch',
};

function uniqueStrings(values) {
  const out = [];
  const seen = new Set();
  for (const value of values || []) {
    const key = String(value || '').trim();
    if (!key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    out.push(key);
  }
  return out;
}

function getBaseUrl(env = process.env) {
  return env.DRUPAL_BASE_URL
    || env.DRUPAL_TEST_BASE_URL
    || 'http://drupal-core.ddev.site';
}

function resolveAxeRuleId(ruleId) {
  const key = String(ruleId || '').trim();
  return AXE_RULE_ALIASES[key] || key;
}

function resolveAxeRuleIds(ruleIds) {
  return uniqueStrings((ruleIds || []).map(resolveAxeRuleId));
}

function ruleMatchesRequestedRule(patternRuleId, requestedRules) {
  const normalizedPatternRule = resolveAxeRuleId(patternRuleId);
  return resolveAxeRuleIds(requestedRules).includes(normalizedPatternRule);
}

function formatRulesForReport(ruleIds) {
  return uniqueStrings(ruleIds).map((ruleId) => {
    const resolved = resolveAxeRuleId(ruleId);
    return resolved === ruleId ? ruleId : `${ruleId} (axe: ${resolved})`;
  }).join(', ');
}

function buildRequiredRulesRunOnly(requiredRules) {
  const requiredRuleIds = resolveAxeRuleIds(requiredRules);
  if (requiredRuleIds.length === 0) {
    return null;
  }
  return {
    runOnly: {
      type: 'rule',
      values: requiredRuleIds,
    },
  };
}

function mergeAxeViolations(groups) {
  const byRule = new Map();

  for (const violation of groups.flat()) {
    if (!violation || !violation.id) {
      continue;
    }
    if (!byRule.has(violation.id)) {
      byRule.set(violation.id, { ...violation, nodes: [] });
    }
    const merged = byRule.get(violation.id);
    const seenNodes = new Set(merged.nodes.map((node) =>
      `${JSON.stringify(node.target || [])}|${node.html || ''}`,
    ));
    for (const node of violation.nodes || []) {
      const key = `${JSON.stringify(node.target || [])}|${node.html || ''}`;
      if (seenNodes.has(key)) {
        continue;
      }
      seenNodes.add(key);
      merged.nodes.push(node);
    }
  }

  return Array.from(byRule.values()).filter((violation) => violation.nodes.length > 0);
}

function extractHasText(selector) {
  const match = String(selector || '').match(/:has-text\((['"])(.*?)\1\)/);
  return match ? match[2] : null;
}

function extractLastSelectorTag(selector) {
  const withoutPseudos = String(selector || '').replace(/:[a-z-]+\(.*?\)/g, '');
  const parts = withoutPseudos.split(/\s+|>/).map((part) => part.trim()).filter(Boolean);
  const last = parts[parts.length - 1] || '';
  const match = last.match(/^([a-z][a-z0-9-]*)/i);
  return match ? match[1].toLowerCase() : null;
}

function extractHtmlTag(html) {
  const match = String(html || '').match(/^<\s*([a-z][a-z0-9-]*)/i);
  return match ? match[1].toLowerCase() : null;
}

function textFromHtml(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function selectorHintMatchesViolation(violation, selectorKey) {
  const expectedText = extractHasText(selectorKey);
  if (!expectedText) {
    return false;
  }

  const expectedTag = extractLastSelectorTag(selectorKey);
  const actualTag = extractHtmlTag(violation.html_snippet);
  if (expectedTag && actualTag && expectedTag !== actualTag) {
    return false;
  }

  return textFromHtml(violation.html_snippet).includes(expectedText);
}

module.exports = {
  buildRequiredRulesRunOnly,
  formatRulesForReport,
  getBaseUrl,
  mergeAxeViolations,
  resolveAxeRuleId,
  resolveAxeRuleIds,
  ruleMatchesRequestedRule,
  selectorHintMatchesViolation,
};
