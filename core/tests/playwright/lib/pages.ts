/**
 * Page inventory for Drupal Core accessibility crawls.
 *
 * Each entry defines a page to audit. Add entries here when:
 *   - A new core page is introduced.
 *   - A module adds a significant template-rendered route.
 *   - A disabled axe rule is being re-enabled for a specific page type.
 *
 * Entries are intentionally minimal — no site-install required.
 * The crawler runs against an existing DDEV site.
 */

export interface PageEntry {
  /** Human-readable name shown in test output and pattern reports. */
  name: string;
  /** Site-relative path, e.g. '/user/login'. */
  path: string;
  /** Whether the page requires admin authentication. */
  requiresAuth: boolean;
  /** Viewport override, e.g. for mobile-specific templates. */
  viewport?: { width: number; height: number };
  /** Axe rules to disable for this page, with a tracking issue reference. */
  disabledRules?: Array<{ rule: string; issue: string }>;
}

/** Pages rendered by the default (Olivero) theme — no authentication. */
export const anonymousPages: PageEntry[] = [
  { name: 'Homepage', path: '/', requiresAuth: false },
  { name: 'User login', path: '/user/login', requiresAuth: false },
  { name: 'User register', path: '/user/register', requiresAuth: false },
  { name: 'User password reset', path: '/user/password', requiresAuth: false },
  {
    name: 'Search results',
    path: '/search/node',
    requiresAuth: false,
    disabledRules: [
      { rule: 'heading-order', issue: 'https://drupal.org/i/3318398' },
      { rule: 'duplicate-id-aria', issue: 'https://drupal.org/i/3318398' },
    ],
  },
  { name: '404 page', path: '/this-page-does-not-exist', requiresAuth: false },
  {
    name: 'Homepage (mobile)',
    path: '/',
    requiresAuth: false,
    viewport: { width: 375, height: 812 },
  },
  {
    name: 'User login (mobile)',
    path: '/user/login',
    requiresAuth: false,
    viewport: { width: 375, height: 812 },
  },
];

/** Pages rendered by the admin (Claro) theme — requires authentication. */
export const adminPages: PageEntry[] = [
  { name: 'Admin dashboard', path: '/admin', requiresAuth: true },
  { name: 'Content list', path: '/admin/content', requiresAuth: true },
  { name: 'Create article', path: '/node/add/article', requiresAuth: true },
  { name: 'Create basic page', path: '/node/add/page', requiresAuth: true },
  { name: 'Structure', path: '/admin/structure', requiresAuth: true },
  { name: 'Content types', path: '/admin/structure/types', requiresAuth: true },
  {
    name: 'Add content type',
    path: '/admin/structure/types/add',
    requiresAuth: true,
  },
  { name: 'Taxonomy', path: '/admin/structure/taxonomy', requiresAuth: true },
  {
    name: 'Add vocabulary',
    path: '/admin/structure/taxonomy/add',
    requiresAuth: true,
  },
  { name: 'Block layout', path: '/admin/structure/block', requiresAuth: true },
  { name: 'Appearance', path: '/admin/appearance', requiresAuth: true },
  { name: 'Modules', path: '/admin/modules', requiresAuth: true },
  { name: 'People', path: '/admin/people', requiresAuth: true },
  { name: 'User edit (uid 1)', path: '/user/1/edit', requiresAuth: true },
  { name: 'Configuration', path: '/admin/config', requiresAuth: true },
  {
    name: 'Text formats',
    path: '/admin/config/content/formats',
    requiresAuth: true,
  },
  {
    name: 'Text format (restricted)',
    path: '/admin/config/content/formats/manage/restricted_html',
    requiresAuth: true,
  },
  {
    name: 'Site information',
    path: '/admin/config/system/site-information',
    requiresAuth: true,
  },
  { name: 'Reports', path: '/admin/reports', requiresAuth: true },
  {
    name: 'Admin dashboard (mobile)',
    path: '/admin',
    requiresAuth: true,
    viewport: { width: 375, height: 812 },
  },
  {
    name: 'Block layout (mobile)',
    path: '/admin/structure/block',
    requiresAuth: true,
    viewport: { width: 415, height: 823 },
    disabledRules: [
      { rule: 'color-contrast', issue: 'https://drupal.org/i/3318394' },
      { rule: 'duplicate-id-active', issue: 'https://drupal.org/i/3318394' },
      { rule: 'region', issue: 'https://drupal.org/i/3318396' },
    ],
  },
];

/** All pages combined — used by the full crawl. */
export const allPages: PageEntry[] = [...anonymousPages, ...adminPages];
