/**
 * Read-only client for the drupal.org api-d7 REST API.
 *
 * It sends GET requests to https://www.drupal.org/api-d7/ only, one at a
 * time, spaced by a minimum delay, with a generic User-Agent that carries
 * no personal or project details. It never sends credentials or cookies.
 *
 * Only fields needed for matching are kept from each issue. Authors,
 * assignees, followers and comments are dropped on purpose: a match must
 * never be used to attribute a problem to a person.
 *
 * API documentation: https://www.drupal.org/drupalorg/docs/apis/rest-and-other-apis
 */

export const API_ROOT = 'https://www.drupal.org/api-d7/';
export const USER_AGENT = 'drupal-issue-matcher/0.1 (read-only)';
export const DRUPAL_CORE_NID = 3060;
export const TAG_VOCABULARY_ID = '9';
export const PAGE_LIMIT = 50; // api-d7 returns at most 50 items per page.
export const MIN_DELAY_MS = 1000;
export const DEFAULT_DELAY_MS = 2000;
const TIMEOUT_MS = 60000;
const MAX_TEXT_CHARS = 20000;

export const ISSUE_STATUS = {
  1: 'Active',
  2: 'Fixed',
  3: 'Closed (duplicate)',
  4: 'Postponed',
  5: "Closed (won't fix)",
  6: 'Closed (works as designed)',
  7: 'Closed (fixed)',
  8: 'Needs review',
  13: 'Needs work',
  14: 'Reviewed & tested by the community',
  15: 'Patch (to be ported)',
  16: 'Postponed (maintainer needs more info)',
  17: 'Closed (outdated)',
  18: 'Closed (cannot reproduce)',
};

/** Statuses that mean the issue is still open. "Fixed" is left out. */
export const OPEN_STATUSES = [1, 13, 8, 14, 15, 4, 16];

export class DrupalOrgError extends Error {
  constructor(message, status = null) {
    super(message);
    this.status = status;
  }
}

const defaultSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @param {object} [options]
 * @param {Function} [options.fetchImpl] fetch-compatible function (tests pass a fake).
 * @param {number} [options.delayMs] Minimum gap between requests, at least MIN_DELAY_MS.
 * @param {Function} [options.sleep] Promise-returning sleep (tests pass a no-op).
 * @param {Function} [options.now] Millisecond clock.
 */
export function createClient({ fetchImpl = globalThis.fetch, delayMs = DEFAULT_DELAY_MS, sleep = defaultSleep, now = Date.now } = {}) {
  const requested = Number(delayMs);
  const gap = Math.max(MIN_DELAY_MS, Number.isFinite(requested) ? requested : DEFAULT_DELAY_MS);
  let lastRequestAt = -Infinity;
  let requests = 0;

  async function send(url) {
    const wait = lastRequestAt + gap - now();
    if (wait > 0) await sleep(wait);
    lastRequestAt = now();
    requests++;
    return fetchImpl(url, {
      method: 'GET',
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
      credentials: 'omit',
      // A redirect could lead off api-d7; it is reported as an error, not followed.
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  }

  /** GETs a path below API_ROOT and returns the parsed JSON. Retries once. */
  async function getJson(pathAndQuery) {
    const url = new URL(pathAndQuery, API_ROOT).href;
    if (!url.startsWith(API_ROOT)) {
      throw new DrupalOrgError(`refusing to request ${url}: only ${API_ROOT} is allowed`);
    }
    for (let attempt = 0; ; attempt++) {
      let response;
      try {
        response = await send(url);
      }
      catch (error) {
        if (attempt === 0) {
          await sleep(5000);
          continue;
        }
        throw new DrupalOrgError(`${url}: ${error.cause?.code ?? error.message}`);
      }
      if (response.status === 429 || response.status >= 500) {
        if (attempt === 0) {
          const retryAfter = Number(response.headers?.get?.('retry-after'));
          await sleep(Math.min(60, retryAfter > 0 ? retryAfter : 10) * 1000);
          continue;
        }
        throw new DrupalOrgError(`${url}: HTTP ${response.status}`, response.status);
      }
      if (!response.ok) {
        throw new DrupalOrgError(`${url}: HTTP ${response.status}`, response.status);
      }
      try {
        return await response.json();
      }
      catch (error) {
        throw new DrupalOrgError(`${url}: response is not JSON (${error.message})`);
      }
    }
  }

  return {
    getJson,
    get requests() {
      return requests;
    },
  };
}

const ENTITIES = { lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', amp: '&' };

/** Turns issue-summary HTML into plain text for matching. */
export function plainText(html) {
  return String(html ?? '')
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (whole, name) => {
      if (name[0] === '#') {
        const code = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
        return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : ' ';
      }
      return ENTITIES[name.toLowerCase()] ?? whole;
    })
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_TEXT_CHARS);
}

const toIso = (seconds) => (Number(seconds) > 0 ? new Date(Number(seconds) * 1000).toISOString() : null);

/** Keeps only the fields the matcher needs. No people, no comments. */
export function normalizeIssue(node) {
  const nid = Number(node.nid);
  const status = Number(node.field_issue_status);
  return {
    nid,
    url: `https://www.drupal.org/i/${nid}`,
    title: String(node.title ?? ''),
    status,
    status_label: ISSUE_STATUS[status] ?? `status ${status}`,
    open: OPEN_STATUSES.includes(status),
    component: node.field_issue_component ?? null,
    category: Number(node.field_issue_category) || null,
    priority: Number(node.field_issue_priority) || null,
    version: node.field_issue_version ?? null,
    created: toIso(node.created),
    changed: toIso(node.changed),
    tag_ids: (node.taxonomy_vocabulary_9 ?? []).map((term) => String(term.id)),
    text: plainText(node.body?.value),
  };
}

/** Resolves tag names (vocabulary 9) to term ids; unknown names map to null. */
export async function resolveTagIds(client, names) {
  const ids = {};
  for (const name of names) {
    const data = await client.getJson(`taxonomy_term.json?${new URLSearchParams({ name })}`);
    const term = (data?.list ?? []).find((t) => String(t.vocabulary?.id) === TAG_VOCABULARY_ID
      && String(t.name).toLowerCase() === name.toLowerCase());
    ids[name] = term ? String(term.tid) : null;
  }
  return ids;
}

/**
 * Fetches every issue of a project that carries a tag and has one of the
 * given statuses. Sorted by nid so pages stay stable while issues change.
 *
 * @returns {Promise<{issues: object[], truncated: boolean}>}
 */
export async function fetchTaggedIssues(client, { tagId, project = DRUPAL_CORE_NID, statuses = OPEN_STATUSES, maxPages = 40, log = () => {} }) {
  const issues = new Map();
  let truncated = false;
  for (const status of statuses) {
    for (let page = 0; ; page++) {
      if (page >= maxPages) {
        truncated = true;
        log(`  status ${status}: stopped after ${maxPages} pages`);
        break;
      }
      const query = new URLSearchParams({
        type: 'project_issue',
        field_project: String(project),
        taxonomy_vocabulary_9: String(tagId),
        field_issue_status: String(status),
        limit: String(PAGE_LIMIT),
        page: String(page),
        sort: 'nid',
        direction: 'ASC',
      });
      const data = await client.getJson(`node.json?${query}`);
      const list = data?.list ?? [];
      for (const node of list) {
        const issue = normalizeIssue(node);
        issues.set(issue.nid, issue);
      }
      log(`  status ${status} (${ISSUE_STATUS[status] ?? '?'}), page ${page}: ${list.length}`);
      if (!data?.next || list.length === 0) break;
    }
  }
  return { issues: [...issues.values()].sort((a, b) => a.nid - b.nid), truncated };
}

/** Fetches one issue by nid. */
export async function fetchIssue(client, nid) {
  if (!/^\d+$/.test(String(nid))) throw new DrupalOrgError(`not an issue number: ${nid}`);
  return normalizeIssue(await client.getJson(`node/${nid}.json`));
}

/** Extracts an issue number from a drupal.org issue URL, or null. */
export function issueNid(url) {
  const match = /^https:\/\/www\.drupal\.org\/(?:project\/[a-z0-9_]+\/issues|node|i)\/(\d+)(?:[?#].*)?$/.exec(String(url ?? ''));
  return match ? Number(match[1]) : null;
}
