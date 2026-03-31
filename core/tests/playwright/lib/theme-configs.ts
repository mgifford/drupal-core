/**
 * Theme configurations for the multi-theme accessibility crawl.
 *
 * Each entry describes one Drupal theme combination to test.
 * The crawl switches the live site's theme settings via drush before each
 * group of tests so that axe results accurately reflect that theme's markup.
 *
 * Machine names must match `ddev drush config:get system.theme`.
 */

export interface ThemeConfig {
  /** Short machine-name identifier used in result records and report keys. */
  id: string;
  /** Human-readable label shown in test output and reports. */
  label: string;
  /** Public/anonymous pages theme machine name. */
  defaultTheme: string;
  /** Admin pages theme machine name. */
  adminTheme: string;
  /** Whether to crawl anonymous (public) pages for this config. */
  testAnonymous: boolean;
  /** Whether to crawl admin pages for this config. */
  testAdmin: boolean;
}

export const THEME_CONFIGS: ThemeConfig[] = [
  {
    id: 'olivero',
    label: 'Olivero',
    defaultTheme: 'olivero',
    adminTheme: 'claro', // use claro for admin when testing Olivero public pages
    testAnonymous: true,
    testAdmin: false,
  },
  {
    id: 'claro',
    label: 'Claro',
    defaultTheme: 'claro',
    adminTheme: 'claro',
    testAnonymous: true,
    testAdmin: true,
  },
  {
    id: 'admin',
    label: 'Admin (experimental/Gin)',
    defaultTheme: 'admin',
    adminTheme: 'admin',
    testAnonymous: true,
    testAdmin: true,
  },
];
