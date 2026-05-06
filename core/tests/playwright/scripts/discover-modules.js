/**
 * @file
 * Discover and analyze all Drupal Core modules.
 * 
 * Generates metadata for all modules including:
 * - Experimental status
 * - Dependencies
 * - Category (core, optional, test-only)
 * - Pages affected by the module
 * 
 * Output: .drupal-a11y-module-config.json
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DRUPAL_ROOT = path.join(__dirname, '../../..');
const MODULES_DIR = path.join(DRUPAL_ROOT, 'core/modules');
const CONFIG_FILE = path.join(DRUPAL_ROOT, '.drupal-a11y-module-config.json');

/**
 * Parse module.info.yml to extract metadata
 */
function parseModuleInfo(modulePath) {
  const infoFile = path.join(modulePath, `${path.basename(modulePath)}.info.yml`);
  
  if (!fs.existsSync(infoFile)) {
    return null;
  }
  
  try {
    return yaml.load(fs.readFileSync(infoFile, 'utf8'));
  } catch (e) {
    console.warn(`Failed to parse ${infoFile}: ${e.message}`);
    return null;
  }
}

/**
 * Categorize module based on metadata and location
 */
function categorizeModule(moduleName, info) {
  // Test-only modules
  if (moduleName.includes('_test') || moduleName.includes('test_')) {
    return 'test_only';
  }
  
  // Experimental modules
  if (info && info.experimental) {
    return 'experimental';
  }
  
  // Required core modules (cannot be disabled)
  const requiredModules = [
    'system', 'user', 'node', 'field', 'text', 'options', 'filter',
    'dblog', 'path_alias', 'block_content'
  ];
  
  if (requiredModules.includes(moduleName)) {
    return 'core';
  }
  
  // Optional modules (can be enabled/disabled)
  return 'optional';
}

/**
 * Determine pages affected by a module
 */
function getPagesForModule(moduleName) {
  const pages = {
    // Views
    'views': ['/search'],
    'views_ui': ['/admin/structure/views', '/admin/structure/views/add', '/search'],
    
    // Layout
    'layout_builder': ['/admin/structure/display', '/block/add'],
    'block': ['/admin/structure/block', '/admin/structure/block/manage'],
    'block_content': ['/admin/content/block'],
    
    // Media
    'media': ['/admin/content/media', '/admin/structure/media/manage'],
    'media_library': ['/admin/content/media'],
    
    // Taxonomy
    'taxonomy': ['/admin/structure/taxonomy', '/admin/structure/taxonomy/manage'],
    
    // Comments
    'comment': ['/admin/content/comment', '/admin/structure/comment'],
    
    // Contact
    'contact': ['/contact', '/admin/structure/contact'],
    
    // User
    'user': ['/user', '/admin/people', '/user/register', '/user/login'],
    
    // Content
    'node': ['/node', '/admin/content', '/node/add'],
    'content_moderation': ['/admin/content', '/admin/config/workflow'],
    
    // Fields
    'field_ui': ['/admin/structure/types', '/admin/structure/fields'],
    
    // Forms
    'form_test': ['/form-test'],
    'contact': ['/contact'],
    
    // System
    'system': ['/admin', '/admin/config'],
    
    // Contextual
    'contextual': ['*'], // Affects all admin pages
    
    // Search
    'search': ['/search', '/admin/config/search'],
    'search_ui': ['/search'],
    
    // Update
    'update': ['/admin/reports/updates', '/admin/config/system/updates'],
    
    // Help
    'help': ['/admin/help'],
    
    // Toolbar
    'toolbar': ['/admin'],
  };
  
  return pages[moduleName] || [];
}

/**
 * Main discovery function
 */
async function discoverModules() {
  console.log('🔍 Discovering Drupal Core modules...\n');
  
  const modules = {};
  const modulesList = fs.readdirSync(MODULES_DIR);
  
  for (const moduleName of modulesList) {
    const modulePath = path.join(MODULES_DIR, moduleName);
    const stat = fs.statSync(modulePath);
    
    // Skip if not a directory
    if (!stat.isDirectory()) continue;
    
    // Skip hidden directories
    if (moduleName.startsWith('.')) continue;
    
    const info = parseModuleInfo(modulePath);
    
    if (!info) {
      console.warn(`⚠️  No metadata found for: ${moduleName}`);
      continue;
    }
    
    const category = categorizeModule(moduleName, info);
    const pages = getPagesForModule(moduleName);
    
    // Determine default enabled status based on category
    const enabledByDefault = !['test_only', 'optional'].includes(category);
    
    modules[moduleName] = {
      name: info.name || moduleName,
      description: info.description || '',
      category: category,
      enabled_by_default: enabledByDefault,
      experimental: info.experimental || false,
      experimental_since: info.experimental_since || null,
      dependencies: info.dependencies || [],
      package: info.package || 'Core',
      pages_to_test: pages,
      test_enabled: category !== 'test_only',
      test_disabled: category !== 'core' && category !== 'test_only',
      priority: categor category === 'experimental' ? 'critical' : 
               category === 'core' ? 'low' :
               'medium'
    };
    
    console.log(`✓ ${info.name} [${category}]`);
  }
  
  // Generate config file
  const config = {
    version: '1.0',
    generated: new Date().toISOString(),
    environment: {
      drupal_root: DRUPAL_ROOT,
      drupal_version: '12.0-dev',
      themes: ['olivero', 'claro', 'default_admin'],
      languages: ['en', 'he'],
      viewports: {
        desktop: { width: 1280, height: 1024 },
        mobile: { width: 375, height: 812 },
        tablet: { width: 768, height: 1024 }
      }
    },
    statistics: {
      total_modules: Object.keys(modules).length,
      experimental: Object.values(modules).filter(m => m.experimental).length,
      optional: Object.values(modules).filter(m => m.category === 'optional').length,
      core: Object.values(modules).filter(m => m.category === 'core').length,
      test_only: Object.values(modules).filter(m => m.category === 'test_only').length
    },
    modules: modules
  };
  
  // Write config file
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  
  console.log(`\n✅ Module discovery complete!\n`);
  console.log(`📊 Summary:`);
  console.log(`   Total modules: ${config.statistics.total_modules}`);
  console.log(`   Experimental: ${config.statistics.experimental}`);
  console.log(`   Optional: ${config.statistics.optional}`);
  console.log(`   Core: ${config.statistics.core}`);
  console.log(`   Test-only: ${config.statistics.test_only}`);
  console.log(`\n💾 Config saved to: ${CONFIG_FILE}\n`);
  
  return config;
}

// Run discovery
if (require.main === module) {
  discoverModules().catch(err => {
    console.error('❌ Module discovery failed:', err);
    process.exit(1);
  });
}

module.exports = { discoverModules, parseModuleInfo, categorizeModule };
