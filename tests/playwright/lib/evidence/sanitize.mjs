/**
 * Sanitizes values before they enter an evidence manifest.
 *
 * Manifests and reports may be published, so sanitizing happens here, when
 * evidence is recorded, not when a page displays it. Raw server traces are
 * never published (docs/observability/README.md, "Security and privacy").
 */

// Drupal paths that carry one-time tokens, with the segments to redact.
const TOKEN_ROUTES = [
  // /user/reset/{uid}/{timestamp}/{hash}[/login]
  { pattern: /^\/user\/reset\/[^/]+\/[^/]+\/[^/]+/, replace: '/user/reset/:uid/:timestamp/:hash' },
  // /user/{uid}/cancel/confirm/{timestamp}/{hash}
  { pattern: /^\/user\/[^/]+\/cancel\/confirm\/[^/]+\/[^/]+/, replace: '/user/:uid/cancel/confirm/:timestamp/:hash' },
];

// A path segment this long and made only of token characters is treated as a
// secret, whatever route it is on.
const TOKEN_SEGMENT = /^[A-Za-z0-9_-]{32,}$/;

/**
 * Returns the path and query of a URL with secrets removed.
 *
 * - Credentials and the origin are dropped (the manifest records the origin).
 * - Every query value becomes REDACTED; parameter names are kept.
 * - Token routes and token-like path segments are replaced.
 * - Fragments are dropped.
 */
export function sanitizeUrl(input) {
  let url;
  try {
    url = new URL(input);
  }
  catch {
    return '[unparseable url]';
  }
  let path = url.pathname;
  for (const { pattern, replace } of TOKEN_ROUTES) {
    if (pattern.test(path)) {
      path = path.replace(pattern, replace);
    }
  }
  path = path
    .split('/')
    .map((segment) => (TOKEN_SEGMENT.test(segment) ? ':token' : segment))
    .join('/');
  const keys = [...url.searchParams.keys()];
  const query = keys.length
    ? '?' + [...new Set(keys)].map((key) => `${encodeURIComponent(key)}=REDACTED`).join('&')
    : '';
  return path + query;
}

/** Returns "scheme://host[:port]" with no credentials, or null. */
export function sanitizeOrigin(input) {
  try {
    return new URL(input).origin;
  }
  catch {
    return null;
  }
}

/**
 * Returns a Git remote with no credentials, or null.
 *
 * - A URL remote (scheme://...) loses its user name, password, query and
 *   fragment: an HTTPS token can sit in any of them.
 * - An scp-style remote loses a password before the @, so user:pw@host:path
 *   becomes host:path; git@host:owner/repo.git is kept.
 * - Anything else, such as a local path, is returned unchanged.
 */
export function sanitizeRepository(input) {
  if (typeof input !== 'string' || input === '') {
    return null;
  }
  if (/^[A-Za-z]:[\\/]/.test(input)) {
    // A Windows path, such as C:\checkouts\drupal.
    return input;
  }
  if (!input.includes('://')) {
    return input.replace(/^[^@/\s]*:[^@/\s]*@/, '');
  }
  let url;
  try {
    url = new URL(input);
  }
  catch {
    return '[unparseable remote]';
  }
  url.username = '';
  url.password = '';
  url.search = '';
  url.hash = '';
  return url.href;
}

/**
 * Sanitizes a path or URL that may be relative ("/node/1?x=y"), returning
 * the same form as sanitizeUrl().
 */
export function sanitizePath(input) {
  try {
    return sanitizeUrl(new URL(String(input), 'https://placeholder.invalid').href);
  }
  catch {
    return '[unparseable url]';
  }
}

// An attribute value: double-quoted, single-quoted or unquoted.
const VALUE = String.raw`("[^"]*"|'[^']*'|[^\s"'=<>\x60]+)`;
// Form tokens, hidden values and meta content must not reach a published snippet.
const SECRET_ATTRIBUTE = new RegExp(String.raw`\b(value|content|data-drupal-token|data-token)\s*=\s*` + VALUE, 'gi');
// Links and form targets can carry tokens in their path or query.
const URL_ATTRIBUTE = new RegExp(String.raw`\b(href|src|action|formaction)\s*=\s*` + VALUE, 'gi');

const unquote = (value) => value.replace(/^["']|["']$/g, '');

/**
 * Sanitizes an HTML snippet reported by a scanner: attribute values that may
 * hold tokens are replaced, URLs are sanitized, and the result is truncated.
 * The caller must still escape it before putting it in HTML.
 */
export function sanitizeHtmlSnippet(html, maxLength = 400) {
  if (typeof html !== 'string') {
    return null;
  }
  const cleaned = html
    .replace(SECRET_ATTRIBUTE, (match, name) => `${name}="REDACTED"`)
    .replace(URL_ATTRIBUTE, (match, name, value) => `${name}="${sanitizePath(unquote(value))}"`);
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) + '…' : cleaned;
}

// The only response headers ever kept. Request headers are never kept.
export const KEPT_RESPONSE_HEADERS = ['traceresponse', 'x-drupal-cache', 'x-drupal-dynamic-cache'];
