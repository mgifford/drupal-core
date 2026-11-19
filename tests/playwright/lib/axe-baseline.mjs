/**
 * Compare axe-core violations with a committed baseline.
 *
 * Each failing node is keyed by rule ID plus its CSS target, so a known rule
 * failing on a new element still counts as new. Baseline files list keys that
 * are accepted for now; every entry needs a reason in the file.
 */

/**
 * @param {Array<{id: string, nodes: Array<{target: unknown}>}>} violations
 * @returns {string[]} sorted, unique keys such as 'label ["#edit-name"]'
 */
export function violationKeys(violations) {
  const keys = new Set();
  for (const violation of violations) {
    for (const node of violation.nodes) {
      keys.add(`${violation.id} ${JSON.stringify(node.target)}`);
    }
  }
  return [...keys].sort();
}

/**
 * @param {Array<{id: string, nodes: Array<{target: unknown}>}>} violations
 * @param {string[]} baseline accepted keys
 * @returns {{current: string[], added: string[], resolved: string[]}}
 *   added: found now but not in the baseline (a regression);
 *   resolved: in the baseline but no longer found (update the baseline).
 */
export function compareWithBaseline(violations, baseline) {
  const current = violationKeys(violations);
  const now = new Set(current);
  const accepted = new Set(baseline);
  return {
    current,
    added: current.filter((key) => !accepted.has(key)),
    resolved: baseline.filter((key) => !now.has(key)),
  };
}
