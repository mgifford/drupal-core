/**
 * Page inventory for Drupal Core accessibility crawls.
 *
 * Each entry defines a page to audit. Add entries here when:
 *   - A new core page is introduced.
 *   - A module adds a significant template-rendered route.
 *
 * Entries are intentionally minimal — no site-install required.
 * The crawler runs against an existing DDEV site.
 *
 * All axe rules are enabled (full WCAG 2.x + best-practice suite).
 * To gate a specific rule as a hard failure once it is clean, promote
 * it to a11y-regressions.spec.ts instead of suppressing it here.
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
}

/** Pages rendered by the default (Olivero) theme — no authentication. */
export const anonymousPages: PageEntry[] = [
  { name: 'Homepage', path: '/', requiresAuth: false },
  { name: 'Action link demo', path: '/action-link', requiresAuth: false },
  { name: 'User login', path: '/user/login', requiresAuth: false },
  { name: 'User register', path: '/user/register', requiresAuth: false },
  { name: 'User password reset', path: '/user/password', requiresAuth: false },
  { name: 'Search results', path: '/search/node', requiresAuth: false },
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
  { name: 'Form style demo', path: '/admin/form_style', requiresAuth: true },
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
  },
  // Theming Tools pages
  { name: 'Autocomplete', path: '/autocomplete', requiresAuth: true },
  { name: 'Buttons', path: '/buttons', requiresAuth: true },
  { name: 'Checkboxes and Radios', path: '/contact/checkbox_radio', requiresAuth: true },
  { name: 'Dialogs', path: '/dialog', requiresAuth: true },
  { name: 'Dropbuttons', path: '/dropbutton', requiresAuth: true },
  { name: 'Field Cardinality', path: '/contact/field_cardinality_test', requiresAuth: true },
  { name: 'Field UI', path: '/admin/structure/types/manage/test_type/display/default', requiresAuth: true },
  { name: 'Fieldset', path: '/fieldset', requiresAuth: true },
  { name: 'File', path: '/contact/imagefile_file', requiresAuth: true },
  { name: 'Formatted text prefix suffix', path: '/contact/presuf_formatted', requiresAuth: true },
  { name: 'Image', path: '/contact/imagefile_image', requiresAuth: true },
  { name: 'Machine name', path: '/admin/structure/display-modes/form/add/contact_message', requiresAuth: true },
  { name: 'Messages', path: '/message', requiresAuth: true },
  { name: 'Nav config', path: '/cd-navigation/config', requiresAuth: true },
  { name: 'Number prefix suffix', path: '/contact/presuf_number', requiresAuth: true },
  { name: 'Page title', path: '/tabs/format/plain_text', requiresAuth: true },
  { name: 'Password', path: '/password', requiresAuth: true },
  { name: 'Progress', path: '/progress', requiresAuth: true },
  { name: 'Select', path: '/contact/select', requiresAuth: true },
  { name: 'Sidebar', path: '/node/add/cd', requiresAuth: true },
  { name: 'Table', path: '/table', requiresAuth: true },
  { name: 'Tabledrag', path: '/tabledrag', requiresAuth: true },
  { name: 'Tabs', path: '/tabs', requiresAuth: true },
  { name: 'Text', path: '/contact/textform', requiresAuth: true },
  { name: 'Text prefix suffix', path: '/contact/presuf_text', requiresAuth: true },
  { name: 'Textarea', path: '/contact/textarea', requiresAuth: true },
];

/** All pages combined — used by the full crawl. */
export const allPages: PageEntry[] = [...anonymousPages, ...adminPages];
