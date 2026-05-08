#!/usr/bin/env node
/**
 * Patch Evaluation Script
 *
 * Automates testing of accessibility patches:
 * 1. Takes screenshots and HTML snapshots before patch
 * 2. Runs axe-core scan
 * 3. Applies patch
 * 4. Clears Drupal cache
 * 5. Takes screenshots and HTML snapshots after patch
 * 6. Runs axe-core scan again
 * 7. Compares results and generates report
 * 8. Resets code to original state
 *
 * Usage:
 *   node evaluate-patch.js <patch-name>
 *   node evaluate-patch.js a11y-DRUPAL-A11Y-002-submit-button-contrast
 *
 * Output:
 *   reports/<patch-name>-evaluation.md
 *   reports/<patch-name>-evaluation.html
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const { chromium } = require('playwright');
const { injectAxe, getViolations } = require('axe-playwright');
const config = require('./lib/patch-evaluator-config');
const { renderMarkdownReport } = require('./lib/render-markdown-report');
const { loadCanonicalPatchNames } = require('./lib/canonical-patch-map');

// ── Config ────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const patchName = argv[0];
if (!patchName) {
  console.error('Usage: node evaluate-patch.js <patch-name>');
  console.error('Example: node evaluate-patch.js a11y-DRUPAL-A11Y-002-submit-button-contrast');
  process.exit(1);
}

const patchConfig = config[patchName];
if (!patchConfig) {
  console.error(`Patch not found in config: ${patchName}`);
  console.error('Available patches:', Object.keys(config).join(', '));
  process.exit(1);
}

const PATCHES_DIR = path.resolve(__dirname, '../../../..', 'patches');
const REPORTS_DIR = path.resolve(__dirname, '../../../..', 'reports');
const REPO_ROOT = path.resolve(__dirname, '../../../..');
const enforceCanonicalPatches = process.env.A11Y_ENFORCE_CANONICAL_PATCHES !== '0';
const canonicalPatchMap = loadCanonicalPatchNames({
  repoRoot: REPO_ROOT,
  fallbackNames: Object.keys(config),
});
const canonicalPatchSet = new Set(canonicalPatchMap.names);

if (enforceCanonicalPatches && !canonicalPatchSet.has(patchName)) {
  console.error(`Patch is not canonical and cannot be evaluated by default: ${patchName}`);
  if (canonicalPatchMap.source) {
    console.error(`Canonical map: ${canonicalPatchMap.source}`);
  }
  console.error('Set A11Y_ENFORCE_CANONICAL_PATCHES=0 to override intentionally.');
  process.exit(1);
}

if (canonicalPatchMap.warning) {
  console.warn(`Warning: ${canonicalPatchMap.warning}`);
}

const BASE_URL = 'http://drupal-core.ddev.site';
const PATCH_FILE = path.join(PATCHES_DIR, `${patchName}.patch`);
const variantIdRaw = process.env.A11Y_VARIANT_ID || 'default';
const variantId = String(variantIdRaw).replace(/[^a-zA-Z0-9._-]/g, '-');
const outputSuffix = variantId === 'default' ? '' : `-${variantId}`;
const REPORT_ARTIFACTS_DIR = path.join(REPORTS_DIR, 'artifacts', patchName, variantId);
const SCREENSHOTS_DIR = path.join(REPORT_ARTIFACTS_DIR, 'screenshots');
const configuredColorMode = (process.env.A11Y_COLOR_MODE || 'light').toLowerCase() === 'dark' ? 'dark' : 'light';
const configuredDirection = (process.env.A11Y_DIRECTION || 'ltr').toLowerCase() === 'rtl' ? 'rtl' : 'ltr';
const configuredViewportRaw = process.env.A11Y_VIEWPORT || '';
const configuredDevice = process.env.A11Y_DEVICE || null;
const configuredOrientation = process.env.A11Y_ORIENTATION || null;
const configuredThemeDefault = process.env.A11Y_THEME_DEFAULT || 'olivero';
const configuredThemeAdmin = process.env.A11Y_THEME_ADMIN || 'claro';
const configuredLoginUser = process.env.A11Y_LOGIN_USER || 'admin';
const configuredLoginPass = process.env.A11Y_LOGIN_PASS || 'admin';
const usePatternReportCases = process.env.A11Y_USE_PATTERN_REPORT !== '0';

// ── Utilities ─────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function extractCommandErrorText(err) {
  if (!err) {
    return '';
  }
  const stderr = err.stderr ? String(err.stderr) : '';
  const stdout = err.stdout ? String(err.stdout) : '';
  const message = err.message ? String(err.message) : '';
  return [stderr, stdout, message].filter(Boolean).join('\n').trim();
}

function toSingleLine(text) {
  return String(text || '')
    .replace(/\s*\n\s*/g, ' | ')
    .trim();
}

function classifyPatchPreflightError(errorText) {
  const text = String(errorText || '');
  const corrupt = text.match(/corrupt patch at\s+(.+?):(\d+)/i);
  if (corrupt) {
    return {
      kind: 'corrupt-patch',
      targetFile: corrupt[1],
      line: Number(corrupt[2]),
    };
  }

  const failed = text.match(/patch failed:\s+(.+?):(\d+)/i);
  if (failed) {
    return {
      kind: 'patch-does-not-apply',
      targetFile: failed[1],
      line: Number(failed[2]),
    };
  }

  const missing = text.match(/error:\s+(.+?):\s+No such file or directory/i);
  if (missing) {
    return {
      kind: 'target-file-missing',
      targetFile: missing[1],
      line: null,
    };
  }

  return {
    kind: 'unknown',
    targetFile: null,
    line: null,
  };
}

function analyzePatchStructure(patchFile) {
  try {
    const lines = fs.readFileSync(patchFile, 'utf8').split(/\n/);
    let current = null;

    const closeHunk = () => {
      if (!current) {
        return null;
      }
      if (current.actualOld !== current.expectedOld || current.actualNew !== current.expectedNew) {
        return {
          type: 'hunk-count-mismatch',
          hunkHeaderLine: current.hunkHeaderLine,
          expectedOld: current.expectedOld,
          expectedNew: current.expectedNew,
          actualOld: current.actualOld,
          actualNew: current.actualNew,
          header: current.header,
        };
      }
      return null;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const hunkMatch = line.match(/^@@\s+-(\d+)(?:,(\d+))?\s+\+(\d+)(?:,(\d+))?\s+@@/);

      if (hunkMatch) {
        const mismatch = closeHunk();
        if (mismatch) {
          return mismatch;
        }
        current = {
          hunkHeaderLine: i + 1,
          header: line,
          expectedOld: Number(hunkMatch[2] || 1),
          expectedNew: Number(hunkMatch[4] || 1),
          actualOld: 0,
          actualNew: 0,
        };
        continue;
      }

      if (!current) {
        continue;
      }

      if (line.startsWith('diff --git ')) {
        const mismatch = closeHunk();
        if (mismatch) {
          return mismatch;
        }
        current = null;
        continue;
      }

      if (line.startsWith('+') && !line.startsWith('+++')) {
        current.actualNew += 1;
        continue;
      }
      if (line.startsWith('-') && !line.startsWith('---')) {
        current.actualOld += 1;
        continue;
      }
      if (line.startsWith(' ') || line === '\\ No newline at end of file') {
        current.actualOld += 1;
        current.actualNew += 1;
        continue;
      }

      if (line === '' && i === lines.length - 1) {
        continue;
      }

      return {
        type: 'invalid-hunk-line-prefix',
        line: i + 1,
        content: line,
      };
    }

    const mismatch = closeHunk();
    return mismatch || null;
  } catch (err) {
    return {
      type: 'structure-analysis-failed',
      message: err.message,
    };
  }
}

function parseViewport(input) {
  const match = String(input || '').match(/^(\d+)x(\d+)$/i);
  if (!match) {
    return null;
  }
  return {
    width: Number(match[1]),
    height: Number(match[2]),
  };
}

function getConfiguredViewport() {
  return parseViewport(configuredViewportRaw);
}

function isValidThemeName(name) {
  return /^[a-zA-Z0-9_]+$/.test(String(name || ''));
}

function setupDeterministicThemes() {
  const result = {
    requested: {
      default: configuredThemeDefault,
      admin: configuredThemeAdmin,
    },
    commands: [],
    detected: null,
    success: true,
    error: null,
  };

  if (!isValidThemeName(configuredThemeDefault) || !isValidThemeName(configuredThemeAdmin)) {
    result.success = false;
    result.error = 'Invalid theme machine name configured via environment variables.';
    return result;
  }

  const commands = [
    `ddev drush cset system.theme default ${configuredThemeDefault} -y`,
    `ddev drush cset system.theme admin ${configuredThemeAdmin} -y`,
    'ddev drush cache-rebuild',
    'ddev drush cget system.theme --format=json',
  ];

  try {
    for (const command of commands) {
      result.commands.push(command);
      const output = execSync(command, { cwd: REPO_ROOT, stdio: 'pipe' }).toString();
      if (command.includes('cget system.theme')) {
        try {
          result.detected = JSON.parse(output);
        } catch {
          result.detected = { raw: output.trim() };
        }
      }
    }
  } catch (err) {
    result.success = false;
    result.error = err.message;
  }

  return result;
}

function sha256String(value) {
  return crypto.createHash('sha256').update(String(value || '')).digest('hex');
}

function parseJsonSafe(raw) {
  try {
    return { ok: true, value: JSON.parse(raw) };
  } catch (error) {
    return { ok: false, value: null, error: error.message };
  }
}

function runDrushJsonCommand(command) {
  try {
    const raw = execSync(command, { cwd: REPO_ROOT, stdio: 'pipe' }).toString();
    const parsed = parseJsonSafe(raw);
    return {
      command,
      success: parsed.ok,
      output: parsed.ok ? parsed.value : null,
      raw: parsed.ok ? null : raw.trim(),
      error: parsed.ok ? null : `Invalid JSON output: ${parsed.error}`,
    };
  } catch (err) {
    return {
      command,
      success: false,
      output: null,
      raw: '',
      error: extractCommandErrorText(err) || err.message,
    };
  }
}

function normalizeEnabledModules(pmListJson) {
  if (!pmListJson) {
    return [];
  }

  if (Array.isArray(pmListJson)) {
    return pmListJson
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        }
        return item?.machine_name || item?.name || item?.extension || null;
      })
      .filter(Boolean)
      .map((name) => String(name).trim())
      .filter(Boolean)
      .sort();
  }

  if (typeof pmListJson === 'object') {
    return Object.keys(pmListJson)
      .map((name) => String(name).trim())
      .filter(Boolean)
      .sort();
  }

  return [];
}

function captureDrupalInitialState(themeSetup) {
  const snapshot = {
    capturedAt: new Date().toISOString(),
    success: true,
    commands: [],
    errors: [],
    themes: {
      requested: themeSetup?.requested || null,
      detected: themeSetup?.detected || null,
      systemThemeConfig: null,
    },
    enabledModules: [],
    enabledModuleCount: 0,
    enabledModuleHash: null,
    environment: {
      drushStatus: null,
    },
    fingerprints: {
      coreExtensionHash: null,
      coreExtensionModulesHash: null,
      coreExtensionThemesHash: null,
    },
  };

  const commandSpecs = [
    {
      name: 'enabled-modules',
      command: 'ddev drush pm:list --type=module --status=enabled --format=json',
      assign: (result) => {
        const modules = normalizeEnabledModules(result.output);
        snapshot.enabledModules = modules;
        snapshot.enabledModuleCount = modules.length;
        snapshot.enabledModuleHash = sha256String(modules.join('\n'));
      },
    },
    {
      name: 'system-theme',
      command: 'ddev drush cget system.theme --format=json',
      assign: (result) => {
        snapshot.themes.systemThemeConfig = result.output;
      },
    },
    {
      name: 'core-extension',
      command: 'ddev drush cget core.extension --format=json',
      assign: (result) => {
        const coreExtension = result.output || {};
        const normalized = JSON.stringify(coreExtension);
        snapshot.fingerprints.coreExtensionHash = sha256String(normalized);
        const moduleKeys = Object.keys(coreExtension.module || {}).sort();
        const themeKeys = Object.keys(coreExtension.theme || {}).sort();
        snapshot.fingerprints.coreExtensionModulesHash = sha256String(moduleKeys.join('\n'));
        snapshot.fingerprints.coreExtensionThemesHash = sha256String(themeKeys.join('\n'));
      },
    },
    {
      name: 'drush-status',
      command: 'ddev drush status --format=json',
      assign: (result) => {
        snapshot.environment.drushStatus = result.output;
      },
    },
  ];

  for (const spec of commandSpecs) {
    const result = runDrushJsonCommand(spec.command);
    snapshot.commands.push({
      name: spec.name,
      command: spec.command,
      success: result.success,
    });
    if (result.success) {
      spec.assign(result);
    } else {
      snapshot.success = false;
      snapshot.errors.push({
        name: spec.name,
        command: spec.command,
        error: toSingleLine(result.error || 'unknown error'),
      });
    }
  }

  return snapshot;
}

function extractAbsoluteUrl(text) {
  const match = String(text || '').match(/https?:\/\/[^\s"']+/i);
  return match ? match[0] : null;
}

function redactSensitiveUrl(url) {
  const value = String(url || '');
  if (!value) {
    return value;
  }
  let redacted = value
    .replace(/(\/user\/reset\/\d+\/\d+\/)[^/?#]+(\/login)/i, '$1[REDACTED]$2')
    .replace(/([?&]pass-reset-token=)[^&]+/i, '$1[REDACTED]');
  return redacted;
}

function redactSensitiveObject(input) {
  if (Array.isArray(input)) {
    return input.map(redactSensitiveObject);
  }
  if (!input || typeof input !== 'object') {
    if (typeof input === 'string' && /\/user\/reset\/|pass-reset-token=/i.test(input)) {
      return redactSensitiveUrl(input);
    }
    return input;
  }
  const out = {};
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'string' && (key.toLowerCase().includes('url') || /\/user\/reset\/|pass-reset-token=/i.test(value))) {
      out[key] = redactSensitiveUrl(value);
    } else {
      out[key] = redactSensitiveObject(value);
    }
  }
  return out;
}

function getOneTimeLoginUrl() {
  try {
    const output = execSync(`ddev drush uli --name=${configuredLoginUser} --uri=${BASE_URL}`, {
      cwd: REPO_ROOT,
      stdio: 'pipe',
    }).toString();
    const uli = extractAbsoluteUrl(output);
    return { success: Boolean(uli), url: uli, raw: output.trim(), error: uli ? null : 'No ULI URL found in drush output.' };
  } catch (err) {
    return { success: false, url: null, raw: '', error: err.message };
  }
}

async function detectAuthState(page) {
  return page.evaluate(() => {
    const body = document.body;
    const classList = body ? Array.from(body.classList) : [];
    const loggedInClass = classList.includes('user-logged-in') || classList.includes('toolbar-tray-open');
    const logoutLink = Boolean(document.querySelector('a[href*="/user/logout"]'));
    const loginForm = Boolean(
      document.querySelector('form.user-login-form, #user-login-form, input[name="name"], input[name="pass"]'),
    );
    const uid = Number(globalThis?.drupalSettings?.user?.uid || 0);
    return {
      loggedInClass,
      logoutLink,
      loginForm,
      uid,
      authenticated: loggedInClass || logoutLink || uid > 0,
    };
  });
}

async function setupAuthenticatedSession(page) {
  const login = {
    attempted: true,
    success: false,
    method: null,
    uli: null,
    finalUrl: null,
    authState: null,
    credentialAttempted: false,
    error: null,
  };

  const uli = getOneTimeLoginUrl();
  login.uli = uli.url;
  if (uli.success && uli.url) {
    try {
      await page.goto(uli.url, { waitUntil: 'networkidle', timeout: 60000 });
      login.finalUrl = page.url();
      login.authState = await detectAuthState(page);
      login.success = Boolean(login.authState?.authenticated);
      if (login.success) {
        login.method = 'uli';
        return redactSensitiveObject(login);
      }
      login.error = 'Reached ULI URL but did not detect authenticated session.';
    } catch (err) {
      login.error = err.message;
    }
  } else {
    login.error = uli.error || 'Unable to generate one-time login URL.';
  }

  // Fallback for environments where ULI behaves differently across middleware.
  login.credentialAttempted = true;
  try {
    await page.goto(`${BASE_URL}/user/login`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.fill('input[name="name"]', configuredLoginUser);
    await page.fill('input[name="pass"]', configuredLoginPass);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }).catch(() => null),
      page.click('input#edit-submit, button#edit-submit, input[type="submit"], button[type="submit"]'),
    ]);
    login.finalUrl = page.url();
    login.authState = await detectAuthState(page);
    login.success = Boolean(login.authState?.authenticated);
    if (login.success) {
      login.method = 'credentials';
      login.error = null;
      return redactSensitiveObject(login);
    }
    login.error = `${login.error ? `${login.error} | ` : ''}Credential login did not establish authenticated session.`;
  } catch (err) {
    login.error = `${login.error ? `${login.error} | ` : ''}Credential login failed: ${err.message}`;
  }

  return redactSensitiveObject(login);
}

async function ensureAuthenticatedSession(page) {
  const check = {
    ensured: false,
    neededRelogin: false,
    before: null,
    after: null,
    loginAttempt: null,
  };

  check.before = await detectAuthState(page);
  if (check.before.authenticated) {
    check.ensured = true;
    check.after = check.before;
    return redactSensitiveObject(check);
  }

  check.neededRelogin = true;
  check.loginAttempt = await setupAuthenticatedSession(page);
  await page.goto(`${BASE_URL}/user`, { waitUntil: 'networkidle', timeout: 60000 });
  check.after = await detectAuthState(page);
  check.ensured = Boolean(check.after?.authenticated);
  return redactSensitiveObject(check);
}

function detectScreenType(viewport) {
  if (!viewport || typeof viewport.width !== 'number') {
    return 'desktop';
  }
  return viewport.width < 768 ? 'mobile' : 'desktop';
}

function detectOrientation(viewport) {
  if (!viewport || typeof viewport.width !== 'number' || typeof viewport.height !== 'number') {
    return 'unknown';
  }
  return viewport.width >= viewport.height ? 'landscape' : 'portrait';
}

function normalizeSelector(target) {
  if (Array.isArray(target)) {
    return target.join(' > ');
  }
  return String(target || '');
}

function shortHash(input) {
  return crypto.createHash('sha256').update(input).digest('hex').slice(0, 8);
}

function generateInstanceId(pagePath, selector, ruleId, context, prefix = 'DRU') {
  const ctx = context || {};
  return `${prefix}-${shortHash([
    pagePath,
    selector,
    ruleId,
    ctx.screenType || 'unknown',
    ctx.orientation || 'unknown',
    ctx.colorMode || 'unknown',
    ctx.direction || 'unknown',
    ctx.theme || 'unknown',
  ].join('|'))}`;
}

function generatePatternId(selector, ruleId, context, prefix = 'DRU') {
  const ctx = context || {};
  return `${prefix}-${shortHash([
    selector,
    ruleId,
    ctx.screenType || 'unknown',
    ctx.orientation || 'unknown',
    ctx.colorMode || 'unknown',
    ctx.direction || 'unknown',
    ctx.theme || 'unknown',
  ].join('|'))}`;
}

function annotateViolations(violations, pagePath, context, prefix = 'DRU') {
  if (!Array.isArray(violations)) {
    return [];
  }

  const normalizedContext = {
    screenType: context?.screenType || 'desktop',
    orientation: context?.orientation || 'landscape',
    colorMode: context?.colorMode || 'light',
    direction: context?.direction || 'ltr',
    theme: context?.theme || 'unknown',
    viewport: context?.viewport || null,
    colorSchemeDetected: context?.colorSchemeDetected || context?.colorMode || 'light',
    language: context?.language || null,
  };

  return violations.flatMap((violation) => {
    const ruleId = violation.id;
    const nodes = Array.isArray(violation.nodes) ? violation.nodes : [];
    return nodes.map((node) => {
      const selector = normalizeSelector(node.target);
      return {
        instance_id: generateInstanceId(pagePath, selector, ruleId, normalizedContext, prefix),
        pattern_id: generatePatternId(selector, ruleId, normalizedContext, prefix),
        screen_type: normalizedContext.screenType,
        orientation: normalizedContext.orientation,
        color_mode: normalizedContext.colorMode,
        color_scheme_detected: normalizedContext.colorSchemeDetected,
        direction: normalizedContext.direction,
        theme: normalizedContext.theme,
        viewport: normalizedContext.viewport,
        language: normalizedContext.language,
        page_path: pagePath,
        selector,
        rule_id: ruleId,
        impact: node.impact || violation.impact || 'unknown',
        html_snippet: node.html || '',
      };
    });
  });
}

function buildExpectedTargets(
  pagePath,
  selectors,
  rules,
  context,
  prefix = 'DRU',
  explicitPatternId = null,
) {
  const normalizedContext = {
    screenType: context?.screenType || 'desktop',
    orientation: context?.orientation || 'landscape',
    colorMode: context?.colorMode || 'light',
    direction: context?.direction || 'ltr',
    theme: context?.theme || 'unknown',
    viewport: context?.viewport || null,
    colorSchemeDetected: context?.colorSchemeDetected || context?.colorMode || 'light',
    language: context?.language || null,
  };
  const targets = [];
  for (const selector of selectors || []) {
    for (const ruleId of rules || []) {
      targets.push({
        instance_id: generateInstanceId(pagePath, selector, ruleId, normalizedContext, prefix),
        pattern_id: explicitPatternId || generatePatternId(selector, ruleId, normalizedContext, prefix),
        screen_type: normalizedContext.screenType,
        orientation: normalizedContext.orientation,
        color_mode: normalizedContext.colorMode,
        color_scheme_detected: normalizedContext.colorSchemeDetected,
        direction: normalizedContext.direction,
        theme: normalizedContext.theme,
        viewport: normalizedContext.viewport,
        language: normalizedContext.language,
        page_path: pagePath,
        selector,
        rule_id: ruleId,
      });
    }
  }
  return targets;
}

async function takeScreenshot(page, selector, description) {
  try {
    const element = await page.$(selector);
    if (!element) {
      return { success: false, error: `Element not found: ${selector}` };
    }
    const box = await element.boundingBox();
    if (!box) {
      return { success: false, error: `Element has no bounding box: ${selector}` };
    }
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    const screenshotPath = path.join(SCREENSHOTS_DIR, `${description}-${Date.now()}.png`);
    await page.screenshot({
      path: screenshotPath,
      clip: {
        x: Math.max(0, box.x - 10),
        y: Math.max(0, box.y - 10),
        width: box.width + 20,
        height: box.height + 20,
      },
    });
    return { success: true, path: screenshotPath };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

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

function collectReproductionCandidates(reportPatterns, patchCfg, requestedRules, currentUrl, maxCandidates = 10) {
  const rules = uniqueStrings(requestedRules);
  if (rules.length === 0 || !Array.isArray(reportPatterns) || reportPatterns.length === 0) {
    return [];
  }

  const targetPatternIds = new Set(Array.isArray(patchCfg?.patternIds) ? patchCfg.patternIds : []);
  const candidates = [];
  const seen = new Set();

  const eligible = reportPatterns
    .filter((pattern) => rules.includes(pattern.ruleId))
    .sort((a, b) => {
      const aTarget = targetPatternIds.has(a.patternId) ? 0 : 1;
      const bTarget = targetPatternIds.has(b.patternId) ? 0 : 1;
      if (aTarget !== bTarget) {
        return aTarget - bTarget;
      }
      return String(a.patternId || '').localeCompare(String(b.patternId || ''));
    });

  for (const pattern of eligible) {
    const paths = uniqueStrings(pattern.concretePaths || []);
    const selectors = uniqueStrings([pattern.selectorKey, ...(pattern.mergedSelectors || [])]).slice(0, 3);
    const orderedPaths = [
      ...paths.filter((p) => p !== currentUrl),
      ...paths.filter((p) => p === currentUrl),
    ];

    for (const pathItem of orderedPaths) {
      for (const selector of selectors.length > 0 ? selectors : ['(pattern selector unavailable)']) {
        const key = `${pattern.patternId}|${pattern.ruleId}|${pathItem}|${selector}`;
        if (seen.has(key)) {
          continue;
        }
        seen.add(key);
        candidates.push({
          patternId: pattern.patternId,
          ruleId: pattern.ruleId,
          path: pathItem,
          selector,
          preferred: targetPatternIds.has(pattern.patternId),
        });
        if (candidates.length >= maxCandidates) {
          return candidates;
        }
      }
    }
  }

  return candidates;
}

async function captureHtml(page, selector) {
  try {
    const locator = page.locator(selector).first();
    const count = await locator.count();
    if (count < 1) {
      return { success: false, error: `Element not found: ${selector}` };
    }
    const html = await locator.evaluate((el) => {
      if (!el || !el.parentElement) return '';
      // Capture element + surrounding context.
      const clone = el.parentElement.cloneNode(true);
      return clone.outerHTML;
    });
    return { success: true, html };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function runAxeScan(page) {
  try {
    await injectAxe(page);
    const violations = await getViolations(page);
    return { success: true, results: { violations } };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function collectRuntimeConditions(page, requested) {
  const viewport = page.viewportSize();
  const runtime = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const classList = body ? Array.from(body.classList) : [];
    const themeClass = classList.find((c) => c.startsWith('theme-')) || null;
    const styleLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((l) => l.getAttribute('href') || '');
    const themeFromHref = styleLinks
      .map((href) => {
        const m = href.match(/\/themes\/([^/]+)\//);
        return m ? m[1] : null;
      })
      .find(Boolean);
    return {
      direction: html?.getAttribute('dir') || getComputedStyle(html).direction || 'ltr',
      language: html?.getAttribute('lang') || null,
      colorSchemeDetected: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      prefersContrast: window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches ? 'more' : 'no-preference',
      forcedColors: window.matchMedia && window.matchMedia('(forced-colors: active)').matches ? 'active' : 'none',
      themeClass,
      themeFromHref,
      bodyClasses: classList,
    };
  });

  return {
    screenType: requested.screenType,
    orientation: requested.orientation,
    viewport,
    colorMode: requested.colorMode,
    direction: runtime.direction || 'ltr',
    language: runtime.language,
    colorSchemeDetected: runtime.colorSchemeDetected || requested.colorMode,
    prefersContrast: runtime.prefersContrast || 'no-preference',
    forcedColors: runtime.forcedColors || 'none',
    theme: runtime.themeClass || runtime.themeFromHref || 'unknown',
    bodyClasses: runtime.bodyClasses || [],
  };
}

async function captureNavigationDiagnostics(page, response, requestedUrl) {
  const authState = await detectAuthState(page);
  const selectorCounts = {};
  const title = await page.title();
  return {
    requestedUrl: redactSensitiveUrl(requestedUrl),
    finalUrl: redactSensitiveUrl(page.url()),
    httpStatus: response ? response.status() : null,
    redirected: requestedUrl !== page.url(),
    title,
    authState,
    selectorCounts,
  };
}

async function countSelectorsOnPage(page, selectors) {
  const counts = {};
  for (const selector of selectors || []) {
    try {
      counts[selector] = await page.locator(selector).count();
    } catch {
      counts[selector] = 0;
    }
  }
  return counts;
}

async function applyConditionOverrides(page, requested) {
  await page.emulateMedia({ colorScheme: requested.colorMode === 'dark' ? 'dark' : 'light' });
  if (requested.direction === 'rtl') {
    await page.evaluate(() => {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.style.direction = 'rtl';
      if (document.body) {
        document.body.setAttribute('dir', 'rtl');
        document.body.style.direction = 'rtl';
      }
    });
  } else {
    await page.evaluate(() => {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.style.direction = 'ltr';
      if (document.body) {
        document.body.setAttribute('dir', 'ltr');
        document.body.style.direction = 'ltr';
      }
    });
  }
}

function validateIdConsistency(testCases) {
  const patternMap = new Map();
  const instanceMap = new Map();

  const register = (map, id, signature) => {
    if (!id) {
      return;
    }
    if (!map.has(id)) {
      map.set(id, new Set());
    }
    map.get(id).add(signature);
  };

  for (const testCase of testCases) {
    const containers = [
      ...(testCase?.before?.annotated_violations || []),
      ...(testCase?.after?.annotated_violations || []),
      ...(testCase?.expected_targets || []),
    ];
    for (const item of containers) {
      const patternSignature = [
        item.rule_id,
        item.selector,
        item.screen_type,
        item.orientation,
        item.color_mode,
        item.direction,
        item.theme,
      ].join('|');
      const instanceSignature = [
        item.rule_id,
        item.selector,
        item.page_path,
        item.screen_type,
        item.orientation,
        item.color_mode,
        item.direction,
        item.theme,
      ].join('|');
      register(patternMap, item.pattern_id, patternSignature);
      register(instanceMap, item.instance_id, instanceSignature);
    }
  }

  const inconsistentPatternIds = Array.from(patternMap.entries())
    .filter(([, signatures]) => signatures.size > 1)
    .map(([id, signatures]) => ({ id, signatures: Array.from(signatures) }));
  const inconsistentInstanceIds = Array.from(instanceMap.entries())
    .filter(([, signatures]) => signatures.size > 1)
    .map(([id, signatures]) => ({ id, signatures: Array.from(signatures) }));

  return {
    patternIdsSeen: patternMap.size,
    instanceIdsSeen: instanceMap.size,
    inconsistentPatternIds,
    inconsistentInstanceIds,
  };
}

function applyPatch() {
  try {
    log(`Applying patch: ${PATCH_FILE}`);
    execSync(`git apply "${PATCH_FILE}"`, { cwd: REPO_ROOT, stdio: 'pipe' });
    log('Patch applied successfully');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function canApplyPatch() {
  try {
    execSync(`git apply --check "${PATCH_FILE}"`, { cwd: REPO_ROOT, stdio: 'pipe' });
    return {
      success: true,
      error: null,
      kind: 'applicable',
      targetFile: null,
      line: null,
      details: null,
    };
  } catch (err) {
    const rawError = extractCommandErrorText(err);
    const error = toSingleLine(rawError);
    const classification = classifyPatchPreflightError(rawError);
    const details = classification.kind === 'corrupt-patch'
      ? analyzePatchStructure(PATCH_FILE)
      : null;
    return {
      success: false,
      error,
      rawError,
      kind: classification.kind,
      targetFile: classification.targetFile,
      line: classification.line,
      details,
    };
  }
}

function resetPatch() {
  try {
    log('Reverting applied patch');
    execSync(`git apply -R "${PATCH_FILE}"`, { cwd: REPO_ROOT, stdio: 'pipe' });
    log('Patch reverted successfully');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function clearCache() {
  try {
    log('Clearing Drupal cache');
    execSync('ddev drush cache-rebuild', { cwd: REPO_ROOT, stdio: 'pipe' });
    log('Cache cleared');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function formatAxeResults(results) {
  if (!results || !results.violations) {
    return { total: 0, byRule: {} };
  }
  const byRule = {};
  for (const v of results.violations) {
    byRule[v.id] = (byRule[v.id] || 0) + v.nodes.length;
  }
  return {
    total: results.violations.reduce((sum, v) => sum + v.nodes.length, 0),
    byRule,
    violations: results.violations,
  };
}

function normalizeDynamicSelector(selector) {
  return String(selector || '')
    .replace(/\d+/g, 'N')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractCssId(selector) {
  const match = String(selector || '').trim().match(/^#([A-Za-z0-9_-]+)$/);
  return match ? match[1] : null;
}

function parseIdConstraint(selector) {
  const text = String(selector || '');
  const exact = text.match(/\[id\s*=\s*['"]([^'"]+)['"]\]/i)?.[1] || null;
  const startsWith = text.match(/\[id\^=\s*['"]([^'"]+)['"]\]/i)?.[1] || null;
  const endsWith = text.match(/\[id\$=\s*['"]([^'"]+)['"]\]/i)?.[1] || null;
  const contains = text.match(/\[id\*=\s*['"]([^'"]+)['"]\]/i)?.[1] || null;

  if (!exact && !startsWith && !endsWith && !contains) {
    return null;
  }

  return {
    exact,
    startsWith,
    endsWith,
    contains,
  };
}

function idSatisfiesConstraint(id, constraint) {
  if (!id || !constraint) {
    return false;
  }
  if (constraint.exact && id !== constraint.exact) {
    return false;
  }
  if (constraint.startsWith && !id.startsWith(constraint.startsWith)) {
    return false;
  }
  if (constraint.endsWith && !id.endsWith(constraint.endsWith)) {
    return false;
  }
  if (constraint.contains && !id.includes(constraint.contains)) {
    return false;
  }
  return true;
}

function selectorMatchesSingle(targetSelector, selectorKey) {
  const a = normalizeDynamicSelector(targetSelector);
  const b = normalizeDynamicSelector(selectorKey);
  if (!a || !b) {
    return false;
  }

  if (a === b || a.includes(b) || b.includes(a)) {
    return true;
  }

  const idA = extractCssId(a);
  const idB = extractCssId(b);
  const constraintA = parseIdConstraint(targetSelector);
  const constraintB = parseIdConstraint(selectorKey);

  if (idA && constraintB && idSatisfiesConstraint(idA, constraintB)) {
    return true;
  }
  if (idB && constraintA && idSatisfiesConstraint(idB, constraintA)) {
    return true;
  }

  return false;
}

function selectorMatches(targetSelector, selectorKey) {
  const targets = String(targetSelector || '').split(',').map((part) => part.trim()).filter(Boolean);
  const selectors = String(selectorKey || '').split(',').map((part) => part.trim()).filter(Boolean);
  if (!targets.length || !selectors.length) {
    return false;
  }

  for (const t of targets) {
    for (const s of selectors) {
      if (selectorMatchesSingle(t, s)) {
        return true;
      }
    }
  }
  return false;
}

function findLatestPatternReport() {
  const latestPath = path.join(REPORTS_DIR, 'pattern-report-latest.json');
  if (fs.existsSync(latestPath)) {
    return latestPath;
  }
  const dated = fs
    .readdirSync(REPORTS_DIR)
    .filter((name) => /^pattern-report-\d{4}-\d{2}-\d{2}\.json$/.test(name))
    .sort()
    .reverse();
  return dated.length ? path.join(REPORTS_DIR, dated[0]) : null;
}

function listPatternReportCandidates() {
  const candidates = [];
  try {
    const latestPath = path.join(REPORTS_DIR, 'pattern-report-latest.json');
    if (fs.existsSync(latestPath)) {
      const stat = fs.statSync(latestPath);
      candidates.push({
        path: latestPath,
        mtimeMs: stat.mtimeMs,
      });
    }

    const dated = fs
      .readdirSync(REPORTS_DIR)
      .filter((name) => /^pattern-report-\d{4}-\d{2}-\d{2}\.json$/.test(name));
    for (const name of dated) {
      const candidatePath = path.join(REPORTS_DIR, name);
      const stat = fs.statSync(candidatePath);
      candidates.push({
        path: candidatePath,
        mtimeMs: stat.mtimeMs,
      });
    }
  } catch {
    return [];
  }

  return candidates
    .sort((a, b) => b.mtimeMs - a.mtimeMs)
    .map((item) => ({
      path: item.path,
      mtimeIso: new Date(item.mtimeMs).toISOString(),
    }));
}

function loadPatternReport() {
  const reportPath = findLatestPatternReport();
  const candidates = listPatternReportCandidates();
  if (!reportPath) {
    return {
      path: null,
      markdownPath: null,
      patterns: [],
      diagnostics: {
        selectedExists: false,
        selectedMtimeIso: null,
        selectedAgeHours: null,
        candidates,
      },
    };
  }
  const reportDir = path.dirname(reportPath);
  const reportBase = path.basename(reportPath, '.json');
  const mdCandidates = [
    path.join(reportDir, `${reportBase}.md`),
    path.join(reportDir, `${reportBase.replace(/^pattern-report-/, 'PATTERN-REPORT-')}.md`),
  ];
  const markdownPath = mdCandidates.find((candidate) => fs.existsSync(candidate)) || null;
  let selectedStat = null;
  try {
    selectedStat = fs.statSync(reportPath);
  } catch {
    selectedStat = null;
  }
  const selectedAgeHours = selectedStat
    ? Number(((Date.now() - selectedStat.mtimeMs) / 36e5).toFixed(2))
    : null;
  try {
    const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    return {
      path: reportPath,
      markdownPath,
      patterns: Array.isArray(data.patterns) ? data.patterns : [],
      diagnostics: {
        selectedExists: true,
        selectedMtimeIso: selectedStat ? selectedStat.mtime.toISOString() : null,
        selectedAgeHours,
        candidates,
      },
    };
  } catch (err) {
    log(`Warning: unable to parse pattern report ${reportPath}: ${err.message}`);
    return {
      path: reportPath,
      markdownPath,
      patterns: [],
      diagnostics: {
        selectedExists: true,
        selectedMtimeIso: selectedStat ? selectedStat.mtime.toISOString() : null,
        selectedAgeHours,
        candidates,
        parseError: err.message,
      },
    };
  }
}

function deriveTestCasesFromPatterns(patchCfg, reportPatterns) {
  const diagnostics = {
    usePatternReportCases,
    configuredTestCases: Array.isArray(patchCfg?.testCases) ? patchCfg.testCases.length : 0,
    configuredPatternIds: Array.isArray(patchCfg?.patternIds) ? patchCfg.patternIds : [],
    reportPatternCount: Array.isArray(reportPatterns) ? reportPatterns.length : 0,
    matchedPatternIds: [],
    fallbackReason: null,
  };
  if (!usePatternReportCases) {
    diagnostics.fallbackReason = 'pattern-report-usage-disabled';
    return {
      testCases: Array.isArray(patchCfg.testCases) ? patchCfg.testCases : [],
      diagnostics,
    };
  }
  if (!Array.isArray(patchCfg.patternIds) || patchCfg.patternIds.length === 0) {
    diagnostics.fallbackReason = 'no-configured-pattern-ids';
    return {
      testCases: Array.isArray(patchCfg.testCases) ? patchCfg.testCases : [],
      diagnostics,
    };
  }
  const maxPaths = Number.isInteger(patchCfg.maxPathsPerPattern) ? patchCfg.maxPathsPerPattern : 5;
  const byId = new Map((reportPatterns || []).map((p) => [p.patternId, p]));
  const testCases = [];
  const seen = new Set();
  const preferredPathRank = new Map(
    (Array.isArray(patchCfg.testCases) ? patchCfg.testCases : [])
      .map((tc) => String(tc?.url || '').trim())
      .filter(Boolean)
      .map((url, index) => [url, index]),
  );

  const pathPriority = (pagePath) => {
    if (preferredPathRank.has(pagePath)) {
      return -100 + preferredPathRank.get(pagePath);
    }
    if (pagePath === '/admin' || pagePath.startsWith('/admin/')) {
      return 0;
    }
    if (pagePath === '/' || pagePath === '/user/login' || pagePath === '/user/password') {
      return 1;
    }
    return 2;
  };

  const unique = (values) => {
    const out = [];
    const s = new Set();
    for (const value of values || []) {
      const v = String(value || '').trim();
      if (!v || s.has(v)) {
        continue;
      }
      s.add(v);
      out.push(v);
    }
    return out;
  };

  for (const patternId of patchCfg.patternIds) {
    const pattern = byId.get(patternId);
    if (!pattern) {
      continue;
    }
    diagnostics.matchedPatternIds.push(patternId);
    const concretePaths = unique(Array.isArray(pattern.concretePaths) ? pattern.concretePaths : [])
      .sort((a, b) => pathPriority(a) - pathPriority(b));
    const selectors = unique([pattern.selectorKey, ...(pattern.mergedSelectors || [])]).slice(0, 8);
    for (const pagePath of concretePaths.slice(0, maxPaths)) {
      const key = `${pagePath}|${pattern.ruleId}|${selectors.join('|')}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      testCases.push({
        url: pagePath,
        selectors,
        expectedFix: `Pattern ${pattern.patternId} (${pattern.ruleId}) should improve`,
        viewport: { width: 1280, height: 1024 },
        sourcePatternId: pattern.patternId,
        sourceRuleId: pattern.ruleId,
      });
    }
  }

  if (testCases.length === 0) {
    diagnostics.fallbackReason = diagnostics.matchedPatternIds.length === 0
      ? 'no-pattern-ids-matched-in-report'
      : 'matched-patterns-had-no-concrete-paths';
  }

  return {
    testCases: testCases.length ? testCases : (Array.isArray(patchCfg.testCases) ? patchCfg.testCases : []),
    diagnostics,
  };
}

function findTargetMatches(annotatedViolations, target) {
  const list = Array.isArray(annotatedViolations) ? annotatedViolations : [];
  return list.filter((v) => {
    if (v.rule_id !== target.rule_id) {
      return false;
    }
    if (v.page_path !== target.page_path) {
      return false;
    }
    return selectorMatches(v.selector, target.selector);
  });
}

// ── Main evaluation flow ──────────────────────────────────────────────────────
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const configuredViewport = getConfiguredViewport();
  const themeSetup = setupDeterministicThemes();
  const patchApplicability = canApplyPatch();
  const drupalInitialState = captureDrupalInitialState(themeSetup);

  const evaluation = {
    patch: patchName,
    config: patchConfig,
    timestamp: new Date().toISOString(),
    runContext: {
      baseUrl: BASE_URL,
      variantId,
      testCaseSource: usePatternReportCases ? 'pattern-report' : 'config',
      requestedColorMode: configuredColorMode,
      requestedDirection: configuredDirection,
      patchApplicability,
      requestedViewport: configuredViewport,
      requestedDevice: configuredDevice,
      requestedOrientation: configuredOrientation,
      deterministicThemeSetup: themeSetup,
      drupalInitialState,
      authSetup: null,
      note: 'Evaluator applies deterministic theme setup and explicit runtime condition overrides for each test.',
    },
    testCases: [],
    summary: {
      before: { total: 0, byRule: {} },
      after: { total: 0, byRule: {} },
      fixed: [],
      new: [],
      resolved: false,
      outcome: 'fail',
      outcomeReason: 'not-evaluated',
    },
    patternReport: {
      source: null,
      matchedPatterns: [],
      summary: {
        targeted: 0,
        observedBefore: 0,
        fullyFixed: 0,
        partiallyFixed: 0,
        unchanged: 0,
      },
    },
    instanceReport: {
      summary: {
        targeted: 0,
        observedBefore: 0,
        fixed: 0,
        remaining: 0,
        notObserved: 0,
      },
      entries: [],
    },
    idValidation: {
      patternIdsSeen: 0,
      instanceIdsSeen: 0,
      inconsistentPatternIds: [],
      inconsistentInstanceIds: [],
    },
  };

  const patternReport = loadPatternReport();
  evaluation.patternReport.source = patternReport.path;
  evaluation.patternReport.markdownSource = patternReport.markdownPath;
  evaluation.patternReport.sourceDiagnostics = patternReport.diagnostics || null;
  evaluation.patternReport.targetPatternIds = Array.isArray(patchConfig.patternIds) ? patchConfig.patternIds : [];
  const derivedCases = deriveTestCasesFromPatterns(patchConfig, patternReport.patterns);
  const testCases = derivedCases.testCases;
  evaluation.runContext.caseGeneration = {
    selectedCaseCount: testCases.length,
    usedFallbackConfigCases: Boolean(derivedCases.diagnostics?.fallbackReason),
    diagnostics: derivedCases.diagnostics,
  };
  const targetedPatterns = Array.isArray(patchConfig.patternIds)
    ? patchConfig.patternIds
        .map((patternId) => patternReport.patterns.find((p) => p.patternId === patternId))
        .filter(Boolean)
    : [];

  const themeSetupFailed = !themeSetup.success;
  if (themeSetupFailed) {
    evaluation.summary.outcome = 'fail';
    evaluation.summary.outcomeReason = 'theme-setup-failed';
    log(`❌ Theme setup failed: ${themeSetup.error}`);
  }

  try {
    if (!themeSetupFailed) {
      evaluation.runContext.authSetup = await setupAuthenticatedSession(page);
      evaluation.runContext.authSetup = redactSensitiveObject(evaluation.runContext.authSetup);
      for (const testCase of testCases) {
      log(`\n=== Test case: ${testCase.url} ===`);
      const testResult = {
        url: testCase.url,
        selectors: testCase.selectors,
        expected_targets: [],
        before: { screenshots: [], html: [], axe: {} },
        after: { screenshots: [], html: [], axe: {} },
        auth: {
          beforeCase: null,
        },
      };

      if (testCase.viewport) {
        await page.setViewportSize(testCase.viewport);
      }

      const effectiveViewport = configuredViewport || testCase.viewport || page.viewportSize() || { width: 1280, height: 1024 };
      await page.setViewportSize(effectiveViewport);
      const screenType = configuredDevice || detectScreenType(effectiveViewport);
      const orientation = configuredOrientation || detectOrientation(effectiveViewport);
      const pagePath = testCase.url;
      const requestedConditions = {
        screenType,
        orientation,
        colorMode: configuredColorMode,
        direction: configuredDirection,
        viewport: effectiveViewport,
      };
      const caseRules = testCase.sourceRuleId ? [testCase.sourceRuleId] : patchConfig.rules;
      const fallbackPatternId = Array.isArray(patchConfig.patternIds) && patchConfig.patternIds.length === 1
        ? patchConfig.patternIds[0]
        : null;
      testResult.conditions = {
        requested: requestedConditions,
        before: null,
        after: null,
      };

      testResult.auth.beforeCase = await ensureAuthenticatedSession(page);
      if (!testResult.auth.beforeCase.ensured) {
        testResult.error = 'Authentication not established before test case; baseline is invalid.';
        testResult.skipDiagnostics = {
          authSetup: evaluation.runContext.authSetup,
          authBeforeCase: testResult.auth.beforeCase,
        };
        testResult.skipDiagnostics = redactSensitiveObject(testResult.skipDiagnostics);
        evaluation.testCases.push(testResult);
        continue;
      }

      // ── BEFORE: Take screenshots, capture HTML, run axe ──────────────────
      log(`Navigating to ${testCase.url}`);
      const requestedUrl = `${BASE_URL}${testCase.url}`;
      const beforeResponse = await page.goto(requestedUrl, { waitUntil: 'networkidle' });
      await applyConditionOverrides(page, requestedConditions);
      const beforeConditions = await collectRuntimeConditions(page, requestedConditions);
      const navBefore = await captureNavigationDiagnostics(page, beforeResponse, requestedUrl);
      testResult.conditions.before = beforeConditions;
      testResult.navigation = {
        before: navBefore,
        after: null,
      };

      if (typeof navBefore.httpStatus === 'number' && navBefore.httpStatus >= 400) {
        testResult.skipped = true;
        testResult.skipReason = 'route-unavailable';
        testResult.skipDiagnostics = {
          requestedRules: caseRules,
          requiredConditions: {
            authRequired: pagePath.startsWith('/admin'),
            requested: requestedConditions,
            observedBefore: beforeConditions,
          },
          navigationBefore: navBefore,
          reproductionCandidates: collectReproductionCandidates(
            patternReport.patterns,
            patchConfig,
            caseRules,
            testCase.url,
          ),
          authSetup: evaluation.runContext.authSetup,
          authBeforeCase: testResult.auth.beforeCase,
        };
        testResult.skipDiagnostics = redactSensitiveObject(testResult.skipDiagnostics);
        evaluation.testCases.push(testResult);
        continue;
      }

      testResult.expected_targets = buildExpectedTargets(
        pagePath,
        testCase.selectors,
        caseRules,
        beforeConditions,
        'DRU',
        testCase.sourcePatternId || fallbackPatternId,
      );

      for (const selector of testCase.selectors) {
        log(`  Capturing before state: ${selector}`);

        // Screenshot
        const ss = await takeScreenshot(page, selector, `before-${testCase.url.replace(/\//g, '-')}`);
        testResult.before.screenshots.push(ss);

        // HTML
        const html = await captureHtml(page, selector);
        testResult.before.html.push({ selector, ...html });
      }

      // Axe scan
      log(`  Running axe scan (before)`);
      const axeBefore = await runAxeScan(page);
      testResult.before.axe = formatAxeResults(axeBefore.results);
      testResult.before.selectorCounts = await countSelectorsOnPage(page, testCase.selectors);
      testResult.before.annotated_violations = annotateViolations(
        testResult.before.axe.violations,
        pagePath,
        beforeConditions,
      );
      evaluation.summary.before.total += testResult.before.axe.total;
      for (const [rule, count] of Object.entries(testResult.before.axe.byRule)) {
        evaluation.summary.before.byRule[rule] = (evaluation.summary.before.byRule[rule] || 0) + count;
      }

      const baselineObservedForCase = testResult.expected_targets.some((target) => {
        const matches = findTargetMatches(testResult.before.annotated_violations, target);
        return matches.length > 0;
      });

      if (!baselineObservedForCase) {
        testResult.skipped = true;
        testResult.skipReason = 'baseline-target-not-observed';
        testResult.skipDiagnostics = {
          requestedRules: caseRules,
          requiredConditions: {
            authRequired: pagePath.startsWith('/admin'),
            requested: requestedConditions,
            observedBefore: beforeConditions,
          },
          matchingRuleViolationsBefore: caseRules.reduce((acc, ruleId) => {
            acc[ruleId] = testResult.before.axe.byRule[ruleId] || 0;
            return acc;
          }, {}),
          selectorCountsBefore: testResult.before.selectorCounts,
          navigationBefore: testResult.navigation.before,
          reproductionCandidates: collectReproductionCandidates(
            patternReport.patterns,
            patchConfig,
            caseRules,
            testCase.url,
          ),
          authSetup: evaluation.runContext.authSetup,
          authBeforeCase: testResult.auth.beforeCase,
        };
        testResult.skipDiagnostics = redactSensitiveObject(testResult.skipDiagnostics);
        evaluation.testCases.push(testResult);
        continue;
      }

      if (!patchApplicability.success) {
        testResult.error = `Patch applicability preflight failed: ${patchApplicability.error}`;
        evaluation.testCases.push(testResult);
        continue;
      }

      // ── APPLY PATCH ──────────────────────────────────────────────────────
      const applyResult = applyPatch();
      if (!applyResult.success) {
        testResult.error = `Patch application failed: ${applyResult.error}`;
        evaluation.testCases.push(testResult);
        continue;
      }

      const cacheResult = clearCache();
      if (!cacheResult.success) {
        testResult.error = `Cache clear failed: ${cacheResult.error}`;
        evaluation.testCases.push(testResult);
        const resetAfterCacheFailure = resetPatch();
        if (!resetAfterCacheFailure.success) {
          testResult.error = `${testResult.error}; reset failed: ${resetAfterCacheFailure.error}`;
          break;
        }
        continue;
      }

      // Wait for cache clear to propagate
      await new Promise((r) => setTimeout(r, 1000));

      // ── AFTER: Take screenshots, capture HTML, run axe ────────────────────
      log(`Navigating to ${testCase.url} (after patch)`);
      const afterResponse = await page.goto(requestedUrl, { waitUntil: 'networkidle', timeout: 60000 });
      await applyConditionOverrides(page, requestedConditions);
      const afterConditions = await collectRuntimeConditions(page, requestedConditions);
      const navAfter = await captureNavigationDiagnostics(page, afterResponse, requestedUrl);
      testResult.conditions.after = afterConditions;
      testResult.navigation.after = navAfter;

      for (const selector of testCase.selectors) {
        log(`  Capturing after state: ${selector}`);

        // Screenshot
        const ss = await takeScreenshot(page, selector, `after-${testCase.url.replace(/\//g, '-')}`);
        testResult.after.screenshots.push(ss);

        // HTML
        const html = await captureHtml(page, selector);
        testResult.after.html.push({ selector, ...html });
      }

      // Axe scan
      log(`  Running axe scan (after)`);
      const axeAfter = await runAxeScan(page);
      testResult.after.axe = formatAxeResults(axeAfter.results);
      testResult.after.annotated_violations = annotateViolations(
        testResult.after.axe.violations,
        pagePath,
        afterConditions,
      );
      evaluation.summary.after.total += testResult.after.axe.total;
      for (const [rule, count] of Object.entries(testResult.after.axe.byRule)) {
        evaluation.summary.after.byRule[rule] = (evaluation.summary.after.byRule[rule] || 0) + count;
      }

      // ── COMPARE RESULTS ──────────────────────────────────────────────────
      log(`  Comparing results...`);
      log(`    Before: ${testResult.before.axe.total} violations`);
      log(`    After: ${testResult.after.axe.total} violations`);

      // Track fixed rules
      for (const [rule, beforeCount] of Object.entries(testResult.before.axe.byRule)) {
        const afterCount = testResult.after.axe.byRule[rule] || 0;
        if (afterCount < beforeCount) {
          evaluation.summary.fixed.push({
            rule,
            beforeCount,
            afterCount,
            fixed: beforeCount - afterCount,
          });
        }
      }

      // Track new violations
      for (const [rule, afterCount] of Object.entries(testResult.after.axe.byRule)) {
        const beforeCount = testResult.before.axe.byRule[rule] || 0;
        if (afterCount > beforeCount) {
          evaluation.summary.new.push({ rule, beforeCount, afterCount, added: afterCount - beforeCount });
        }
      }

      // Track expected instance IDs by matching rule/path/selector instead of hash-only equality.
      for (const target of testResult.expected_targets) {
        const beforeMatches = findTargetMatches(testResult.before.annotated_violations, target);
        const afterMatches = findTargetMatches(testResult.after.annotated_violations, target);
        const beforeIds = [...new Set(beforeMatches.map((m) => m.instance_id))];
        const afterIds = [...new Set(afterMatches.map((m) => m.instance_id))];

        let status = 'not-observed';
        if (beforeIds.length > 0 && afterIds.length === 0) {
          status = 'fixed';
        } else if (afterIds.length > 0 && afterIds.length < beforeIds.length) {
          status = 'partially-fixed';
        } else if (beforeIds.length > 0 && afterIds.length > 0) {
          status = 'remaining';
        }

        evaluation.instanceReport.entries.push({
          instanceId: beforeIds[0] || target.instance_id,
          patternId: target.pattern_id,
          ruleId: target.rule_id,
          pagePath: target.page_path,
          selector: target.selector,
          status,
          seenBefore: beforeIds.length > 0,
          seenAfter: afterIds.length > 0,
          beforeCount: beforeIds.length,
          afterCount: afterIds.length,
          beforeInstanceIds: beforeIds,
          afterInstanceIds: afterIds,
          conditions: {
            requested: testResult.conditions.requested,
            before: testResult.conditions.before,
            after: testResult.conditions.after,
          },
        });
      }

      // ── RESET CODE ───────────────────────────────────────────────────────
      const resetResult = resetPatch();
      if (!resetResult.success) {
        testResult.error = `Code reset failed: ${resetResult.error}`;
        evaluation.testCases.push(testResult);
        break;
      }

      evaluation.testCases.push(testResult);
    }
    }

    if (targetedPatterns.length > 0) {
      for (const pattern of targetedPatterns) {
        const relatedEntries = evaluation.instanceReport.entries.filter(
          (entry) => entry.patternId === pattern.patternId,
        );
        const beforeCount = relatedEntries.reduce((sum, entry) => sum + (entry.beforeCount || 0), 0);
        const afterCount = relatedEntries.reduce((sum, entry) => sum + (entry.afterCount || 0), 0);
        let status = 'unchanged';
        if (beforeCount > 0 && afterCount === 0) {
          status = 'fully-fixed';
        } else if (afterCount < beforeCount) {
          status = 'partially-fixed';
        }

        evaluation.patternReport.matchedPatterns.push({
          patternId: pattern.patternId,
          ruleId: pattern.ruleId,
          selectorKey: pattern.selectorKey,
          concretePaths: pattern.concretePaths || [],
          beforeCount,
          afterCount,
          status,
        });
      }

      evaluation.patternReport.summary.targeted = evaluation.patternReport.matchedPatterns.length;
      evaluation.patternReport.summary.observedBefore = evaluation.patternReport.matchedPatterns.filter(
        (p) => p.beforeCount > 0,
      ).length;
      evaluation.patternReport.summary.fullyFixed = evaluation.patternReport.matchedPatterns.filter(
        (p) => p.status === 'fully-fixed',
      ).length;
      evaluation.patternReport.summary.partiallyFixed = evaluation.patternReport.matchedPatterns.filter(
        (p) => p.status === 'partially-fixed',
      ).length;
      evaluation.patternReport.summary.unchanged = evaluation.patternReport.matchedPatterns.filter(
        (p) => p.status === 'unchanged',
      ).length;
    }

    evaluation.instanceReport.summary.targeted = evaluation.instanceReport.entries.length;
    evaluation.instanceReport.summary.observedBefore = evaluation.instanceReport.entries.filter(
      (entry) => entry.seenBefore,
    ).length;
    evaluation.instanceReport.summary.fixed = evaluation.instanceReport.entries.filter(
      (entry) => entry.status === 'fixed',
    ).length;
    evaluation.instanceReport.summary.remaining = evaluation.instanceReport.entries.filter(
      (entry) => entry.status === 'remaining' || entry.status === 'partially-fixed',
    ).length;
    evaluation.instanceReport.summary.notObserved = evaluation.instanceReport.entries.filter(
      (entry) => entry.status === 'not-observed',
    ).length;
    evaluation.idValidation = validateIdConsistency(evaluation.testCases);

    const validationEvidence = {
      targetedInstances: evaluation.instanceReport.summary.targeted,
      baselineObservedInstances: evaluation.instanceReport.summary.observedBefore,
      patternObservedBeforePatchAttempt: evaluation.instanceReport.summary.observedBefore > 0,
      fixedInstances: evaluation.instanceReport.summary.fixed,
      remainingInstances: evaluation.instanceReport.summary.remaining,
      notObservedInstances: evaluation.instanceReport.summary.notObserved,
      hasCaseErrors: themeSetupFailed || evaluation.testCases.some((tc) => Boolean(tc.error) && !tc.skipped),
      introducedNewViolations: evaluation.summary.new.length,
    };
    evaluation.validationEvidence = validationEvidence;
    evaluation.replication = {
      variantId,
      patchFile: PATCH_FILE,
      setupSteps: [
        `ddev drush cset system.theme default ${configuredThemeDefault} -y`,
        `ddev drush cset system.theme admin ${configuredThemeAdmin} -y`,
        'ddev drush cache-rebuild',
      ],
      testFlow: [
        'Navigate to each test case URL under requested conditions and capture baseline evidence.',
        `Apply patch with: git apply "${PATCH_FILE}"`,
        'Clear Drupal cache with: ddev drush cache-rebuild',
        'Revisit same URL + conditions and capture post-patch evidence.',
        `Revert patch with: git apply -R "${PATCH_FILE}"`,
      ],
      expectedProof: 'Problem must be observed before patch and not observed after patch under the same recorded conditions.',
    };

    // ── Generate report ──────────────────────────────────────────────────────
    evaluation.summary.resolved =
      validationEvidence.baselineObservedInstances > 0
      && validationEvidence.fixedInstances > 0
      && validationEvidence.remainingInstances === 0
      && validationEvidence.introducedNewViolations === 0;
    const hasCaseErrors = validationEvidence.hasCaseErrors;
    const routeUnavailableCount = evaluation.testCases
      .filter((tc) => tc?.skipReason === 'route-unavailable')
      .length;

    if (evaluation.summary.outcomeReason === 'theme-setup-failed') {
      evaluation.summary.outcome = 'fail';
    } else if (evaluation.summary.resolved) {
      evaluation.summary.outcome = 'pass';
      evaluation.summary.outcomeReason = 'targeted-issues-fixed-without-regressions';
    } else if (validationEvidence.baselineObservedInstances === 0) {
      evaluation.summary.outcome = 'inconclusive';
      evaluation.summary.outcomeReason = routeUnavailableCount > 0
        ? 'baseline-not-observed-due-to-route-unavailable'
        : 'no-baseline-instances-observed';
    } else if (!evaluation.runContext.patchApplicability?.success) {
      evaluation.summary.outcome = 'fail';
      evaluation.summary.outcomeReason = 'patch-preflight-not-applicable';
    } else if (hasCaseErrors) {
      evaluation.summary.outcome = 'fail';
      evaluation.summary.outcomeReason = 'evaluation-or-patch-application-error';
    } else if (evaluation.summary.new.length > 0) {
      evaluation.summary.outcome = 'fail';
      evaluation.summary.outcomeReason = 'new-violations-introduced';
    } else {
      evaluation.summary.outcome = 'fail';
      evaluation.summary.outcomeReason = 'targeted-instances-not-fixed';
    }

    evaluation.summary.eligibleForPatchRecommendation =
      evaluation.validationEvidence.baselineObservedInstances > 0
      && !evaluation.validationEvidence.hasCaseErrors;

    const lines = [];
    const sourcePatternIds = evaluation.patternReport.targetPatternIds || [];
    const sourceMatchedPatternIds = sourcePatternIds.filter((patternId) =>
      evaluation.patternReport.matchedPatterns.some((p) => p.patternId === patternId),
    );
    const patternMatchType = sourcePatternIds.length === 0
      ? 'runtime-generated-only'
      : sourceMatchedPatternIds.length === sourcePatternIds.length
        ? 'source-pattern-matched'
        : sourceMatchedPatternIds.length > 0
          ? 'partial-source-pattern-match'
          : 'source-pattern-not-found';
    const navStatusValues = evaluation.testCases
      .map((tc) => tc?.navigation?.before?.httpStatus)
      .filter((status) => Number.isInteger(status));
    const skipReasonCounts = evaluation.testCases
      .filter((tc) => tc?.skipped)
      .reduce((acc, tc) => {
        acc[tc.skipReason] = (acc[tc.skipReason] || 0) + 1;
        return acc;
      }, {});
    const navStatusCounts = navStatusValues.reduce((acc, status) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    const navLoadedCount = navStatusValues.filter((status) => status >= 200 && status < 300).length;
    const navUnloadedCount = navStatusValues.filter((status) => status < 200 || status >= 300).length;
    const navStatusSummary = Object.entries(navStatusCounts)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([status, count]) => `${status}x${count}`)
      .join(', ');
    const generatedPatternIds = Array.from(new Set(
      evaluation.testCases.flatMap((tc) => (tc.expected_targets || []).map((t) => t.pattern_id).filter(Boolean)),
    ));
    lines.push(`# Patch Evaluation Report: ${patchName}${outputSuffix}`);
    lines.push('');
    lines.push(`**Generated:** ${new Date().toLocaleDateString('en-CA')} at ${new Date().toLocaleTimeString()}`);
    lines.push('');
    lines.push(`## Summary`);
    lines.push('');
    lines.push(`- **Description:** ${patchConfig.description}`);
    lines.push(`- **WCAG Criteria:** ${patchConfig.wcag.join(', ')}`);
    lines.push(`- **Affected Rules:** ${patchConfig.rules.join(', ')}`);
    if (evaluation.patternReport.source) {
      lines.push(`- **Pattern Source:** ${evaluation.patternReport.source.replace(`${REPO_ROOT}/`, '')}`);
    }
    if (evaluation.patternReport.markdownSource) {
      lines.push(`- **Pattern Source (Markdown):** ${evaluation.patternReport.markdownSource.replace(`${REPO_ROOT}/`, '')}`);
    }
    if (evaluation.patternReport.targetPatternIds.length > 0) {
      lines.push(`- **Target Pattern IDs:** ${evaluation.patternReport.targetPatternIds.join(', ')}`);
    }
    lines.push(`- **Pattern ID Match Type:** ${patternMatchType}`);
    lines.push(`- **Matched Pattern IDs (pattern source):** ${sourceMatchedPatternIds.length > 0 ? sourceMatchedPatternIds.join(', ') : 'none'}`);
    if (generatedPatternIds.length > 0) {
      lines.push(`- **Generated Pattern IDs (current run):** ${generatedPatternIds.join(', ')}`);
    }
    const statusLine =
      evaluation.summary.outcome === 'pass'
        ? '✅ **PASS** — Patch resolves targeted issues without introducing new violations'
        : evaluation.summary.outcomeReason === 'theme-setup-failed'
          ? '❌ **FAIL** — Deterministic theme setup failed before evaluation could run'
          : evaluation.summary.outcomeReason === 'patch-preflight-not-applicable'
            ? '❌ **FAIL** — Patch cannot be applied in current repository state'
        : evaluation.summary.outcome === 'inconclusive'
          ? '🟨 **INCONCLUSIVE** — No baseline instances were observed on targeted URLs/selectors'
          : evaluation.summary.outcomeReason === 'evaluation-or-patch-application-error'
            ? '❌ **FAIL** — Patch application or evaluation encountered an error'
            : evaluation.summary.outcomeReason === 'new-violations-introduced'
              ? '❌ **FAIL** — Patch introduced new accessibility violations'
              : '❌ **FAIL** — Patch did not fix the targeted issues';
    lines.push(`- **Status:** ${statusLine}`);
    lines.push(`- **Outcome Reason:** \`${evaluation.summary.outcomeReason}\``);
    lines.push(`- **Eligible For Patch Recommendation:** ${evaluation.summary.eligibleForPatchRecommendation ? 'yes' : 'no'}`);
    lines.push(`- **Requested color mode:** ${evaluation.runContext.requestedColorMode}`);
    lines.push(`- **Patch preflight applicability:** ${evaluation.runContext.patchApplicability?.success ? 'applicable' : 'not-applicable'}`);
    lines.push(`- **Drupal initial state capture:** ${evaluation.runContext.drupalInitialState?.success ? 'complete' : 'partial'}`);
    lines.push(`- **Enabled modules (captured):** ${evaluation.runContext.drupalInitialState?.enabledModuleCount ?? 0}`);
    lines.push(`- **Enabled modules hash:** ${evaluation.runContext.drupalInitialState?.enabledModuleHash || 'unavailable'}`);
    lines.push(`- **Core extension hash:** ${evaluation.runContext.drupalInitialState?.fingerprints?.coreExtensionHash || 'unavailable'}`);
    if (evaluation.patternReport.sourceDiagnostics) {
      lines.push(`- **Pattern source modified:** ${evaluation.patternReport.sourceDiagnostics.selectedMtimeIso || 'unknown'}`);
      lines.push(`- **Pattern source age (hours):** ${evaluation.patternReport.sourceDiagnostics.selectedAgeHours ?? 'unknown'}`);
    }
    lines.push(`- **Case generation mode:** ${evaluation.runContext.caseGeneration?.usedFallbackConfigCases ? 'fallback-config-testCases' : 'pattern-report-derived'}`);
    lines.push(`- **Case generation count:** ${evaluation.runContext.caseGeneration?.selectedCaseCount || 0}`);
    if (evaluation.runContext.caseGeneration?.diagnostics?.fallbackReason) {
      lines.push(`- **Case generation fallback reason:** ${evaluation.runContext.caseGeneration.diagnostics.fallbackReason}`);
    }
    lines.push(`- **Page load HTTP statuses (baseline):** ${navStatusSummary || 'none'}`);
    lines.push(`- **Pages loaded successfully (2xx):** ${navLoadedCount}/${evaluation.testCases.length}`);
    lines.push(`- **Pages not loaded as 2xx:** ${navUnloadedCount}/${evaluation.testCases.length}`);
    if (Object.keys(skipReasonCounts).length > 0) {
      lines.push(`- **Skip reasons:** ${Object.entries(skipReasonCounts).map(([reason, count]) => `${reason}x${count}`).join(', ')}`);
    }
    if (!evaluation.runContext.patchApplicability?.success) {
      lines.push(`- **Patch preflight type:** ${evaluation.runContext.patchApplicability.kind || 'unknown'}`);
      if (evaluation.runContext.patchApplicability.targetFile) {
        lines.push(`- **Patch preflight target:** ${evaluation.runContext.patchApplicability.targetFile}${evaluation.runContext.patchApplicability.line ? `:${evaluation.runContext.patchApplicability.line}` : ''}`);
      }
      if (evaluation.runContext.patchApplicability.details?.type === 'hunk-count-mismatch') {
        const d = evaluation.runContext.patchApplicability.details;
        lines.push(`- **Patch preflight detail:** hunk header mismatch at line ${d.hunkHeaderLine} (expected old/new ${d.expectedOld}/${d.expectedNew}, actual ${d.actualOld}/${d.actualNew})`);
      }
      if (evaluation.runContext.patchApplicability.details?.type === 'invalid-hunk-line-prefix') {
        const d = evaluation.runContext.patchApplicability.details;
        lines.push(`- **Patch preflight detail:** invalid hunk line prefix at line ${d.line}`);
      }
      lines.push(`- **Patch preflight error:** ${evaluation.runContext.patchApplicability.error}`);
    }
    lines.push(`- **ID consistency issues:** patterns=${evaluation.idValidation.inconsistentPatternIds.length}, instances=${evaluation.idValidation.inconsistentInstanceIds.length}`);
    lines.push(`- **Pattern observed before patch attempt:** ${evaluation.validationEvidence.patternObservedBeforePatchAttempt ? 'yes' : 'no'}`);
    lines.push(`- **Baseline observed instances:** ${evaluation.validationEvidence.baselineObservedInstances}`);
    lines.push(`- **Fixed instances after patch:** ${evaluation.validationEvidence.fixedInstances}`);
    lines.push(`- **Remaining instances after patch:** ${evaluation.validationEvidence.remainingInstances}`);
    lines.push('');
    lines.push('### Replication Instructions');
    lines.push('');
    lines.push('Use the following deterministic steps to reproduce this exact evaluation run:');
    lines.push('');
    for (const step of evaluation.replication.setupSteps) {
      lines.push(`- Setup: \`${step}\``);
    }
    for (const step of evaluation.replication.testFlow) {
      lines.push(`- Flow: ${step}`);
    }
    lines.push(`- Variant ID: \`${evaluation.replication.variantId}\``);
    lines.push(`- Expected proof: ${evaluation.replication.expectedProof}`);
    lines.push('');

    if (evaluation.runContext.drupalInitialState) {
      const state = evaluation.runContext.drupalInitialState;
      const systemTheme = state.themes?.systemThemeConfig || {};
      const defaultTheme = systemTheme.default || state.themes?.requested?.default || 'unknown';
      const adminTheme = systemTheme.admin || state.themes?.requested?.admin || 'unknown';
      const modulePreview = (state.enabledModules || []).slice(0, 40);

      lines.push('### Drupal Initial State Snapshot');
      lines.push('');
      lines.push(`- **Captured at:** ${state.capturedAt || 'unknown'}`);
      lines.push(`- **Capture status:** ${state.success ? 'complete' : 'partial (see errors below)'}`);
      lines.push(`- **Default theme:** ${defaultTheme}`);
      lines.push(`- **Admin theme:** ${adminTheme}`);
      lines.push(`- **Enabled modules count:** ${state.enabledModuleCount || 0}`);
      lines.push(`- **Enabled modules hash (sha256):** ${state.enabledModuleHash || 'unavailable'}`);
      lines.push(`- **Core extension hash (sha256):** ${state.fingerprints?.coreExtensionHash || 'unavailable'}`);
      lines.push(`- **Core extension modules hash (sha256):** ${state.fingerprints?.coreExtensionModulesHash || 'unavailable'}`);
      lines.push(`- **Core extension themes hash (sha256):** ${state.fingerprints?.coreExtensionThemesHash || 'unavailable'}`);
      if (state.environment?.drushStatus) {
        lines.push(`- **Drush status:** ${JSON.stringify(state.environment.drushStatus)}`);
      }
      if (modulePreview.length > 0) {
        lines.push(`- **Enabled modules sample (first ${modulePreview.length}):** ${modulePreview.join(', ')}`);
      }
      if (Array.isArray(state.errors) && state.errors.length > 0) {
        lines.push('- **State capture errors:**');
        for (const errorEntry of state.errors) {
          lines.push(`  - ${errorEntry.name}: ${errorEntry.error}`);
        }
      }
      if (Array.isArray(state.commands) && state.commands.length > 0) {
        lines.push('- **Commands used:**');
        for (const cmd of state.commands) {
          lines.push(`  - ${cmd.success ? '✅' : '⚠️'} \`${cmd.command}\``);
        }
      }
      lines.push('');
    }

    if (evaluation.patternReport.sourceDiagnostics?.candidates?.length) {
      lines.push('### Pattern Source Candidates');
      lines.push('');
      lines.push('| Path | Modified |');
      lines.push('|---|---|');
      for (const candidate of evaluation.patternReport.sourceDiagnostics.candidates.slice(0, 5)) {
        lines.push(`| ${candidate.path.replace(`${REPO_ROOT}/`, '')} | ${candidate.mtimeIso} |`);
      }
      lines.push('');
    }

    if (evaluation.validationEvidence.baselineObservedInstances > 0 && evaluation.validationEvidence.fixedInstances > 0 && evaluation.validationEvidence.remainingInstances === 0) {
      lines.push('### Validation Proof (Before/After)');
      lines.push('');
      lines.push('This run captured the target violation before patch application and confirmed it was absent after patch application under the same recorded conditions.');
      lines.push('');
      lines.push(`- Baseline observed: ${evaluation.validationEvidence.baselineObservedInstances}`);
      lines.push(`- Fixed after patch: ${evaluation.validationEvidence.fixedInstances}`);
      lines.push(`- Remaining after patch: ${evaluation.validationEvidence.remainingInstances}`);
      lines.push(`- New violations introduced: ${evaluation.validationEvidence.introducedNewViolations}`);
      lines.push('');
    }

    if (evaluation.patternReport.matchedPatterns.length > 0) {
      lines.push('### Pattern Coverage (From Scan Report)');
      lines.push('');
      lines.push(`- **Targeted patterns:** ${evaluation.patternReport.summary.targeted}`);
      lines.push(`- **Patterns seen before patch:** ${evaluation.patternReport.summary.observedBefore}`);
      lines.push(`- **Fully fixed patterns:** ${evaluation.patternReport.summary.fullyFixed}`);
      lines.push(`- **Partially fixed patterns:** ${evaluation.patternReport.summary.partiallyFixed}`);
      lines.push(`- **Unchanged patterns:** ${evaluation.patternReport.summary.unchanged}`);
      lines.push('');
      lines.push('| Pattern ID | Rule | Paths (sample) | Before | After | Status |');
      lines.push('|---|---|---|---:|---:|---|');
      for (const pattern of evaluation.patternReport.matchedPatterns) {
        const samplePaths = (pattern.concretePaths || []).slice(0, 3).join(', ');
        lines.push(
          `| ${pattern.patternId} | ${pattern.ruleId} | ${samplePaths || '-'} | ${pattern.beforeCount} | ${pattern.afterCount} | ${pattern.status} |`,
        );
      }
      lines.push('');
    }
    if (evaluation.instanceReport.entries.length > 0) {
      lines.push('### Instance ID Coverage');
      lines.push('');
      lines.push(`- **Targeted instance IDs:** ${evaluation.instanceReport.summary.targeted}`);
      lines.push(`- **Seen before patch:** ${evaluation.instanceReport.summary.observedBefore}`);
      lines.push(`- **Fixed instances:** ${evaluation.instanceReport.summary.fixed}`);
      lines.push(`- **Remaining instances:** ${evaluation.instanceReport.summary.remaining}`);
      lines.push(`- **Not observed in baseline:** ${evaluation.instanceReport.summary.notObserved}`);
      lines.push('');
      lines.push('| Instance ID | Pattern ID | Rule | Path | Status | Before IDs | After IDs |');
      lines.push('|---|---|---|---|---|---|---|');
      for (const entry of evaluation.instanceReport.entries) {
        const beforeIds = (entry.beforeInstanceIds || []).join(', ') || '-';
        const afterIds = (entry.afterInstanceIds || []).join(', ') || '-';
        lines.push(
          `| ${entry.instanceId} | ${entry.patternId} | ${entry.ruleId} | ${entry.pagePath} | ${entry.status} | ${beforeIds} | ${afterIds} |`,
        );
      }
      lines.push('');
    }
    lines.push('### Violation Counts');
    lines.push('');
    lines.push(`| Metric | Before | After | Change |`);
    lines.push(`|--------|--------|-------|--------|`);
    lines.push(`| **Total violations** | ${evaluation.summary.before.total} | ${evaluation.summary.after.total} | ${evaluation.summary.after.total - evaluation.summary.before.total} |`);
    lines.push('');
    if (evaluation.summary.fixed.length > 0) {
      lines.push('### Fixed Rules');
      lines.push('');
      for (const fixed of evaluation.summary.fixed) {
        lines.push(`- \`${fixed.rule}\`: ${fixed.beforeCount} → ${fixed.afterCount} (−${fixed.fixed})`);
      }
      lines.push('');
    }
    if (evaluation.summary.new.length > 0) {
      lines.push('### ⚠️ New Violations Introduced');
      lines.push('');
      for (const newV of evaluation.summary.new) {
        lines.push(`- \`${newV.rule}\`: ${newV.beforeCount} → ${newV.afterCount} (+${newV.added})`);
      }
      lines.push('');
    }
    lines.push('---');
    lines.push('');
    lines.push('## Test Cases');
    lines.push('');
    for (let i = 0; i < evaluation.testCases.length; i++) {
      const tc = evaluation.testCases[i];
      lines.push(`### Test ${i + 1}: ${tc.url}`);
      lines.push('');
      if (tc.skipped) {
        lines.push(`**Skipped:** ${tc.skipReason}`);
        if (tc.skipDiagnostics) {
          lines.push('');
          lines.push('**Skip diagnostics:**');
          lines.push(`- Requested rules: ${JSON.stringify(tc.skipDiagnostics.requestedRules || [])}`);
          lines.push(`- Required conditions: ${JSON.stringify(tc.skipDiagnostics.requiredConditions || {})}`);
          lines.push(`- Matching rule violations before: ${JSON.stringify(tc.skipDiagnostics.matchingRuleViolationsBefore || {})}`);
          lines.push(`- Selector counts before: ${JSON.stringify(tc.skipDiagnostics.selectorCountsBefore || {})}`);
          lines.push(`- Navigation before: ${JSON.stringify(tc.skipDiagnostics.navigationBefore || {})}`);
          lines.push(`- Reproduction candidates: ${JSON.stringify(tc.skipDiagnostics.reproductionCandidates || [])}`);
          lines.push(`- Auth setup: ${JSON.stringify(tc.skipDiagnostics.authSetup || {})}`);
          lines.push(`- Auth before case: ${JSON.stringify(tc.skipDiagnostics.authBeforeCase || tc.auth?.beforeCase || {})}`);
        }
        lines.push('');
        continue;
      }
      if (tc.error) {
        lines.push(`**Error:** ${tc.error}`);
        lines.push('');
        continue;
      }
      lines.push(`**URL:** \`${BASE_URL}${tc.url}\``);
      lines.push('');
      lines.push(`**Elements tested:** ${tc.selectors.join(', ')}`);
      if (tc.conditions) {
        lines.push('');
        lines.push('**Conditions:**');
        lines.push(`- Requested: ${JSON.stringify(tc.conditions.requested)}`);
        lines.push(`- Before: ${JSON.stringify(tc.conditions.before)}`);
        lines.push(`- After: ${JSON.stringify(tc.conditions.after)}`);
      }
      if (tc.auth) {
        lines.push('');
        lines.push('**Authentication:**');
        lines.push(`- Before case: ${JSON.stringify(tc.auth.beforeCase || {})}`);
      }
      lines.push('');
      lines.push('#### Before Patch');
      lines.push('');
      lines.push(`- **Total violations:** ${tc.before.axe.total}`);
      if (Object.keys(tc.before.axe.byRule).length > 0) {
        lines.push('- **By rule:**');
        for (const [rule, count] of Object.entries(tc.before.axe.byRule)) {
          lines.push(`  - \`${rule}\`: ${count}`);
        }
      }
      lines.push('');
      lines.push('#### After Patch');
      lines.push('');
      lines.push(`- **Total violations:** ${tc.after.axe.total}`);
      if (Object.keys(tc.after.axe.byRule).length > 0) {
        lines.push('- **By rule:**');
        for (const [rule, count] of Object.entries(tc.after.axe.byRule)) {
          lines.push(`  - \`${rule}\`: ${count}`);
        }
      }
      lines.push('');
    }
    lines.push('---');
    lines.push('');
    lines.push('## Screenshots');
    lines.push('');
    const screenshotEntries = evaluation.testCases.flatMap((tc) => [
      ...(tc?.before?.screenshots || []),
      ...(tc?.after?.screenshots || []),
    ]);
    const screenshotSuccessCount = screenshotEntries.filter((s) => s && s.success).length;
    if (screenshotSuccessCount > 0) {
      lines.push(`Captured ${screenshotSuccessCount} screenshot(s) for this run. See the reports directory.`);
    } else {
      lines.push('No screenshots were captured for this run.');
    }
    lines.push('');
    lines.push('## HTML Snapshots');
    lines.push('');
    const htmlEntries = evaluation.testCases.flatMap((tc) => [
      ...(tc?.before?.html || []),
      ...(tc?.after?.html || []),
    ]);
    const htmlSuccessCount = htmlEntries.filter((h) => h && h.success).length;
    if (htmlSuccessCount > 0) {
      lines.push(`Captured ${htmlSuccessCount} HTML snapshot(s) for this run.`);
    } else {
      lines.push('No HTML snapshots were captured for this run.');
    }
    lines.push('');

    const md = lines.join('\n');
    const reportPath = path.join(PATCHES_DIR, `${patchName}-evaluation${outputSuffix}.md`);
    fs.writeFileSync(reportPath, md);
    log(`\n✅ Report written to ${reportPath}`);

    // JSON data file
    const jsonPath = path.join(PATCHES_DIR, `${patchName}-evaluation${outputSuffix}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(evaluation, null, 2));
    log(`✅ Data written to ${jsonPath}`);

    // HTML report
    const html = renderMarkdownReport({
      title: `Patch Evaluation: ${patchName}`,
      markdown: md,
      sourceLabel: 'evaluate-patch.js',
    });
    const htmlPath = path.join(PATCHES_DIR, `${patchName}-evaluation${outputSuffix}.html`);
    fs.writeFileSync(htmlPath, html);
    log(`✅ HTML report written to ${htmlPath}`);

    const statusIcon =
      evaluation.summary.outcome === 'pass'
        ? '✅ PASS'
        : evaluation.summary.outcome === 'inconclusive'
          ? '🟨 INCONCLUSIVE'
          : '❌ FAIL';
    log(`\n${statusIcon} — Evaluation complete`);
    const exitCode =
      evaluation.summary.outcome === 'pass'
        ? 0
        : evaluation.summary.outcome === 'inconclusive'
          ? 2
          : 1;
    process.exit(exitCode);
  } catch (err) {
    console.error('Fatal error:', err);
    resetPatch();
    process.exit(1);
  } finally {
    try {
      await page.close();
      await browser.close();
    } catch (e) {
      // Browser already closed
    }
  }
})();
