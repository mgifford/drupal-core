/**
 * Page inventory for Drupal Core accessibility crawls.
 *
 * Each entry defines a core page to audit. Add entries here when:
 *   - A new core page is introduced.
 *   - A core module adds a significant template-rendered route.
 *
 * Entries are intentionally minimal — no site-install required.
 * The crawler runs against an existing DDEV site.
 *
 * All axe rules are enabled (full WCAG 2.x + best-practice suite).
 * To gate a specific rule as a hard failure once it is clean, promote
 * it to a11y-regressions.spec.ts instead of suppressing it here.
 *
 * The axe crawl from commit d8a45b3fe0 had a longer list. Its extra entries
 * stay out on purpose: the contrib and theming_tools pages (and
 * /admin/form_style) were removed in 5f833efe4c to keep the crawl to core,
 * and /search/node in 0f71edfc68 after upstream removed the search module.
 */

export interface PageEntry {
  /**
   * Stable id used in scenario ids and axe baselines
   * (tests/crawl/a11y-axe-crawl.spec.ts). Lowercase letters, digits and
   * hyphens. Never reuse or rename an id once results exist for it.
   */
  id: string;
  /** Human-readable name shown in test output and pattern reports. */
  name: string;
  /** Site-relative path, e.g. '/user/login'. */
  path: string;
  /** Whether the page requires admin authentication. */
  requiresAuth: boolean;
  /** Viewport override, e.g. for mobile-specific templates. */
  viewport?: { width: number; height: number };
  /**
   * HTTP status this route intentionally returns (e.g. 404 for the
   * not-found page). Unset routes must return < 400 or the scan fails.
   */
  expectedStatus?: number;
}

export type ScanMode = 'core-baseline' | 'seeded-benchmark';

export const DEFAULT_SCAN_MODE: ScanMode = 'core-baseline';

/** Core pages rendered by the default (front-end) theme — no authentication. */
export const anonymousPages: PageEntry[] = [
  { id: 'front', name: 'Homepage', path: '/', requiresAuth: false },
  { id: 'user-login', name: 'User login', path: '/user/login', requiresAuth: false },
  { id: 'user-register', name: 'User register', path: '/user/register', requiresAuth: false },
  { id: 'user-password', name: 'User password reset', path: '/user/password', requiresAuth: false },
  { id: 'not-found', name: '404 page', path: '/this-page-does-not-exist', requiresAuth: false, expectedStatus: 404 },
];

/** Core pages rendered by the admin theme — requires authentication. */
export const adminPages: PageEntry[] = [
  { id: 'admin', name: 'Admin dashboard', path: '/admin', requiresAuth: true },
  { id: 'admin-content', name: 'Content list', path: '/admin/content', requiresAuth: true },
  { id: 'node-add-article', name: 'Create article', path: '/node/add/article', requiresAuth: true },
  { id: 'node-add-page', name: 'Create basic page', path: '/node/add/page', requiresAuth: true },
  { id: 'structure', name: 'Structure', path: '/admin/structure', requiresAuth: true },
  { id: 'content-types', name: 'Content types', path: '/admin/structure/types', requiresAuth: true },
  { id: 'content-type-add', name: 'Add content type', path: '/admin/structure/types/add', requiresAuth: true },
  { id: 'taxonomy', name: 'Taxonomy', path: '/admin/structure/taxonomy', requiresAuth: true },
  { id: 'vocabulary-add', name: 'Add vocabulary', path: '/admin/structure/taxonomy/add', requiresAuth: true },
  { id: 'block-layout', name: 'Block layout', path: '/admin/structure/block', requiresAuth: true },
  { id: 'appearance', name: 'Appearance', path: '/admin/appearance', requiresAuth: true },
  { id: 'modules', name: 'Modules', path: '/admin/modules', requiresAuth: true },
  { id: 'people', name: 'People', path: '/admin/people', requiresAuth: true },
  { id: 'user-1-edit', name: 'User edit (uid 1)', path: '/user/1/edit', requiresAuth: true },
  { id: 'config', name: 'Configuration', path: '/admin/config', requiresAuth: true },
  { id: 'text-formats', name: 'Text formats', path: '/admin/config/content/formats', requiresAuth: true },
  { id: 'text-format-restricted-html', name: 'Text format (restricted)', path: '/admin/config/content/formats/manage/restricted_html', requiresAuth: true },
  { id: 'site-information', name: 'Site information', path: '/admin/config/system/site-information', requiresAuth: true },
  { id: 'reports', name: 'Reports', path: '/admin/reports', requiresAuth: true },
];

/**
 * Seeded-benchmark pages from generated_content_a11y.
 *
 * These pages intentionally include seeded defects when
 * generated_content_a11y.settings:seed_bugs is true.
 */
export const seededBenchmarkPages: PageEntry[] = [
  { id: 'a11y-articles', name: 'Generated A11y articles', path: '/a11y-articles', requiresAuth: false },
  { id: 'a11y-contact', name: 'Generated A11y contact form', path: '/a11y-contact', requiresAuth: false },
];

/** All pages combined — used by the full crawl. */
export const allPages: PageEntry[] = [...anonymousPages, ...adminPages];
