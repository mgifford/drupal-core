/**
 * @file
 * Module enable/disable helper for Playwright tests.
 * 
 * Provides functions to enable/disable Drupal modules and manage cache.
 */

const { execSync } = require('child_process');

class ModuleManager {
  constructor(baseUrl = 'http://drupal-core.ddev.site') {
    this.baseUrl = baseUrl;
    this.useDDEV = baseUrl.includes('ddev.site');
  }

  /**
   * Execute drush command
   */
  drushCommand(command) {
    try {
      if (this.useDDEV) {
        return execSync(`ddev exec drush ${command}`, { encoding: 'utf-8' });
      } else {
        return execSync(`drush ${command}`, { encoding: 'utf-8' });
      }
    } catch (error) {
      throw new Error(`Drush command failed: ${command}\n${error.message}`);
    }
  }

  /**
   * Check if module is enabled
   */
  isModuleEnabled(moduleName) {
    try {
      const output = this.drushCommand(`pm:list --status=enabled`);
      return output.includes(moduleName);
    } catch (error) {
      console.error(`Failed to check module status: ${moduleName}`, error);
      return false;
    }
  }

  /**
   * Enable a module
   */
  enableModule(moduleName) {
    console.log(`  📦 Enabling module: ${moduleName}`);
    try {
      this.drushCommand(`pm:enable ${moduleName} -y`);
      console.log(`  ✓ Module enabled: ${moduleName}`);
      return true;
    } catch (error) {
      console.error(`  ❌ Failed to enable module: ${moduleName}`, error.message);
      return false;
    }
  }

  /**
   * Disable a module
   */
  disableModule(moduleName) {
    console.log(`  📦 Disabling module: ${moduleName}`);
    try {
      this.drushCommand(`pm:uninstall ${moduleName} -y`);
      console.log(`  ✓ Module disabled: ${moduleName}`);
      return true;
    } catch (error) {
      console.error(`  ❌ Failed to disable module: ${moduleName}`, error.message);
      return false;
    }
  }

  /**
   * Clear all caches
   */
  clearAllCaches() {
    console.log(`  🧹 Clearing all caches...`);
    try {
      this.drushCommand(`cache:rebuild`);
      console.log(`  ✓ Caches cleared`);
      return true;
    } catch (error) {
      console.error(`  ❌ Failed to clear caches`, error.message);
      return false;
    }
  }

  /**
   * Get list of enabled modules
   */
  getEnabledModules() {
    try {
      const output = this.drushCommand(`pm:list --status=enabled --format=json`);
      return JSON.parse(output);
    } catch (error) {
      console.error(`Failed to get enabled modules`, error);
      return {};
    }
  }

  /**
   * Get list of disabled modules
   */
  getDisabledModules() {
    try {
      const output = this.drushCommand(`pm:list --status=disabled --format=json`);
      return JSON.parse(output);
    } catch (error) {
      console.error(`Failed to get disabled modules`, error);
      return {};
    }
  }

  /**
   * Get module dependencies
   */
  getModuleDependencies(moduleName) {
    try {
      const output = this.drushCommand(`pm:list --format=json`);
      const modules = JSON.parse(output);
      const module = modules.find(m => m.name === moduleName);
      return module ? module.requires || [] : [];
    } catch (error) {
      console.error(`Failed to get module dependencies`, error);
      return [];
    }
  }

  /**
   * Get modules that depend on given module
   */
  getModuleDependents(moduleName) {
    try {
      const output = this.drushCommand(`pm:list --format=json`);
      const modules = JSON.parse(output);
      return modules
        .filter(m => m.requires && m.requires.includes(moduleName))
        .map(m => m.name);
    } catch (error) {
      console.error(`Failed to get module dependents`, error);
      return [];
    }
  }

  /**
   * Reset modules to default state
   * - Enable core modules
   * - Disable experimental/optional modules
   */
  resetModulesToDefaults(config) {
    console.log(`\n🔄 Resetting modules to default state...\n`);
    
    if (!config || !config.modules) {
      console.warn(`⚠️  No module config provided, skipping reset`);
      return;
    }

    const modules = config.modules;
    
    for (const [moduleName, meta] of Object.entries(modules)) {
      if (meta.category === 'test_only') continue; // Skip test modules
      
      const shouldBeEnabled = meta.enabled_by_default;
      const isCurrentlyEnabled = this.isModuleEnabled(moduleName);
      
      if (shouldBeEnabled && !isCurrentlyEnabled) {
        this.enableModule(moduleName);
      } else if (!shouldBeEnabled && isCurrentlyEnabled) {
        this.disableModule(moduleName);
      }
    }
    
    this.clearAllCaches();
    console.log(`✓ Modules reset to defaults\n`);
  }

  /**
   * Wait for module state to stabilize (caches cleared, etc.)
   */
  waitForModuleStateStable() {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 2000); // Wait 2 seconds for caches to clear
    });
  }
}

module.exports = ModuleManager;
