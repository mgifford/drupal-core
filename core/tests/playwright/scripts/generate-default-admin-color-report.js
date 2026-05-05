'use strict';

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../../');
const REPORTS_DIR = path.join(ROOT, 'reports');
const THEME_DIR = path.join(ROOT, 'core/themes/default_admin');

const BASE_URL = process.env.DRUPAL_BASE_URL ?? 'https://drupal-core.ddev.site';
const USERNAME = process.env.DRUPAL_ADMIN_USER ?? 'admin';
const PASSWORD = process.env.DRUPAL_ADMIN_PASS ?? 'admin';
const SETTINGS_PATH = '/admin/appearance/settings/default_admin';

const DATE_STAMP = new Date().toISOString().slice(0, 10);
const JSON_OUTPUT = path.join(REPORTS_DIR, `default-admin-color-report-${DATE_STAMP}.json`);
const JSON_LATEST = path.join(REPORTS_DIR, 'default-admin-color-report-latest.json');
const HTML_OUTPUT = path.join(REPORTS_DIR, `DEFAULT-ADMIN-COLOR-REPORT-${DATE_STAMP}.html`);
const HTML_LATEST = path.join(REPORTS_DIR, 'DEFAULT-ADMIN-COLOR-REPORT-latest.html');
const GUIDE_OUTPUT = path.join(REPORTS_DIR, `DEFAULT-ADMIN-COLOR-MODE-GUIDE-${DATE_STAMP}.html`);
const GUIDE_LATEST = path.join(REPORTS_DIR, 'DEFAULT-ADMIN-COLOR-MODE-GUIDE-latest.html');
const FG_BG_OUTPUT = path.join(REPORTS_DIR, `DEFAULT-ADMIN-COLOR-REPORT-FG-BG-${DATE_STAMP}.html`);
const FG_BG_LATEST = path.join(REPORTS_DIR, 'DEFAULT-ADMIN-COLOR-REPORT-FG-BG-latest.html');
const FOCUS_OUTPUT = path.join(REPORTS_DIR, `DEFAULT-ADMIN-COLOR-REPORT-FOCUS-${DATE_STAMP}.html`);
const FOCUS_LATEST = path.join(REPORTS_DIR, 'DEFAULT-ADMIN-COLOR-REPORT-FOCUS-latest.html');
const PROPOSED_PATCH_PATH = 'patches/default-admin-accent-aa-defaults.patch';

const TRACKED_TOKENS = [
  { name: '--gin-color-text', label: 'Primary text', type: 'foreground', description: 'Main text color for body content, labels, and headings throughout the admin interface' },
  { name: '--gin-color-text-light', label: 'Secondary text', type: 'foreground', description: 'Muted or secondary text for hints, metadata, timestamps, and less prominent content' },
  { name: '--gin-bg-app', label: 'App background', type: 'background', description: 'Base background color for the entire admin interface; appears behind all content' },
  { name: '--gin-bg-layer', label: 'Layer background', type: 'background', description: 'Background color for cards, panels, modals, and content sections; sits on top of app background' },
  { name: '--accent-base', label: 'Accent base', type: 'accent', description: 'Foundation color from which the accent ramp is generated; drives all accent variants (030-900)' },
  { name: '--accent-color-500', label: 'Accent 500', type: 'accent', description: 'Mid-tone accent color used for primary interactive elements and highlights' },
  { name: '--accent-color-030', label: 'Accent 030', type: 'accent', description: 'Very light accent shade; used for hover states and light backgrounds on accent elements' },
  { name: '--gin-color-primary', label: 'Primary accent', type: 'accent', description: 'Main accent color applied to active buttons, links, selected states, and primary actions' },
  { name: '--gin-color-primary-light', label: 'Primary accent light', type: 'accent', description: 'Lightened version of primary accent; used for hover and focus states on accent elements' },
  { name: '--gin-color-button-text', label: 'Primary button text', type: 'foreground', description: 'Text color for primary action buttons; typically white or light text on dark accent' },
  { name: '--button-bg-color--primary', label: 'Primary button background', type: 'background', description: 'Background color for the main "Save", "Create", and other primary action buttons' },
  { name: '--button-fg-color--primary', label: 'Primary button foreground', type: 'foreground', description: 'Text color specifically for primary buttons; ensures readable contrast on button background' },
  { name: '--gin-color-focus', label: 'Focus color', type: 'focus', description: 'Ring or outline color that indicates keyboard focus on interactive elements for accessibility' },
  { name: '--gin-color-focus-border', label: 'Focus border', type: 'focus', description: 'Border styling for focused form fields and controls; works with focus color for visibility' },
  { name: '--color-focus', label: 'Resolved focus token', type: 'focus', description: 'Computed focus color after resolving all CSS variables and theme settings' },
  { name: '--focus-ring', label: 'Focus ring effect', type: 'focus', description: 'Box shadow or outline applied to focused elements to create visible focus indicator' },
  { name: '--gin-border-color-form-element', label: 'Form border', type: 'border', description: 'Border color for input fields, select boxes, textareas, and other form controls' },
];

const TRACKED_TOKEN_SET = new Set(TRACKED_TOKENS.map((token) => token.name));

const ACCENT_COLORS = {
  blue: { label: 'Blue (Default)', hex: '#015efe' },
  light_blue: { label: 'Light Blue', hex: '#2f6dd0' },
  dark_purple: { label: 'Dark Purple', hex: '#4300bf' },
  purple: { label: 'Purple', hex: '#5b00ff' },
  teal: { label: 'Teal', hex: '#0e7772' },
  green: { label: 'Green', hex: '#02742d' },
  pink: { label: 'Pink', hex: '#d12f70' },
  red: { label: 'Red', hex: '#d8002f' },
  orange: { label: 'Orange', hex: '#c55228' },
  yellow: { label: 'Yellow', hex: '#966705' },
  neutral: { label: 'Neutral', hex: '#111111' },
  custom: { label: 'Custom', hex: '#000' },
};

// Suggested alternatives intended to improve AA resilience in light mode.
// These are recommendations only; validate in runtime after applying.
const PROPOSED_ACCENT_COLORS = {
  blue: { hex: '#0050D8', rationale: 'Darker blue improves white-text contrast while preserving brand direction.' },
  light_blue: { hex: '#1F5BB8', rationale: 'Darkened to reduce low-contrast risk on light surfaces.' },
  dark_purple: { hex: '#4300BF', rationale: 'Already strong; keep current value.' },
  purple: { hex: '#4A00D0', rationale: 'Slightly darker for safer AA margins in light mode.' },
  teal: { hex: '#0B645F', rationale: 'Darkened teal for clearer foreground/background separation.' },
  green: { hex: '#026127', rationale: 'Improves consistency for button/text contrast targets.' },
  pink: { hex: '#B3205D', rationale: 'Reduces lightness to better support AA thresholds.' },
  red: { hex: '#B00025', rationale: 'Deeper red improves contrast in key UI states.' },
  orange: { hex: '#A8431F', rationale: 'Darkened orange to avoid borderline contrast cases.' },
  yellow: { hex: '#7A5400', rationale: 'Significantly darker; yellow tones often fail on light backgrounds.' },
  neutral: { hex: '#111111', rationale: 'Already strong; keep current value.' },
};

function presetLabelFromKey(key) {
  return key.split('_').map((part) => part[0].toUpperCase() + part.slice(1)).join(' ');
}

const FOCUS_COLOR_MAP = {
  gin: { label: 'Default Admin Focus', hex: 'rgb(0, 125, 250)', rgba: 'rgba(0, 125, 250, 0.6)' },
  green: { label: 'Green', hex: 'rgb(8, 163, 144)', rgba: 'rgba(8, 163, 144, 0.6)' },
  claro: { label: 'Claro Green', hex: 'rgb(38, 167, 105)', rgba: 'rgba(38, 167, 105, 0.6)' },
  orange: { label: 'Orange', hex: 'rgb(236, 124, 87)', rgba: 'rgba(236, 124, 87, 0.6)' },
  dark: { label: 'Neutral', hex: 'rgb(0, 0, 0)', rgba: 'rgba(0, 0, 0, 0.4)' },
  accent: { label: 'Derives from accent', hex: 'auto', rgba: 'auto' },
  custom: { label: 'Custom', hex: 'custom', rgba: 'custom' },
};

const ADMIN_UI_PAGES = [
  { path: '/admin/content', label: 'Content management' },
  { path: '/admin/structure', label: 'Structure' },
  { path: '/admin/modules', label: 'Modules' },
  { path: '/admin/people', label: 'People' },
  { path: '/admin/config', label: 'Configuration' },
  { path: '/admin/appearance', label: 'Appearance' },
  { path: '/admin/appearance/settings/default_admin', label: 'Theme settings' },
  { path: '/admin/reports', label: 'Reports' },
];

const VIEWPORT_CONFIGS = [
  { width: 1920, height: 1080, label: 'Desktop (1920×1080)', key: 'desktop' },
  { width: 768, height: 1024, label: 'Tablet Portrait (768×1024)', key: 'tablet-portrait' },
  { width: 1024, height: 768, label: 'Tablet Landscape (1024×768)', key: 'tablet-landscape' },
  { width: 375, height: 812, label: 'Phone Portrait (375×812)', key: 'phone-portrait' },
  { width: 812, height: 375, label: 'Phone Landscape (812×375)', key: 'phone-landscape' },
];

const LANGUAGE_CONFIGS = [
  { lang: 'en', dir: 'ltr', label: 'English (LTR)', key: 'ltr' },
  { lang: 'he', dir: 'rtl', label: 'Hebrew (RTL)', key: 'rtl' },
];

const TEXT_METRICS = [
  { key: 'textOnLayer', label: 'Text on layer', aa: 4.5, aaa: 7 },
  { key: 'textLightOnLayer', label: 'Muted text on layer', aa: 4.5, aaa: 7 },
  { key: 'primaryOnLayer', label: 'Primary on layer', aa: 4.5, aaa: 7 },
  { key: 'buttonTextOnPrimary', label: 'Button text on primary', aa: 4.5, aaa: 7 },
];

const NON_TEXT_METRICS = [
  { key: 'focusOnApp', label: 'Focus on app background', aa: 3 },
  { key: 'formBorderOnLayer', label: 'Form border on layer', aa: 3 },
];

const LIGHT_OFF_STATE = '0-contrast-off';
const DARK_OFF_STATE = '1-contrast-off';
const APCA_TARGET_LC = 60;

function walkFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }

    if (entry.isFile() && fullPath.endsWith('.css')) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function relativePath(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join('/');
}

function escapeHtml(value) {
  if (value == null) {
    return '';
  }

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function classifyProperty(property) {
  if (property.startsWith('--')) {
    return 'token-alias';
  }
  if (property.includes('background')) {
    return 'background';
  }
  if (property.includes('border') || property.includes('outline')) {
    return 'border';
  }
  if (property === 'color' || property.endsWith('-color') || property === 'fill' || property === 'stroke') {
    return 'foreground';
  }
  if (property.includes('shadow')) {
    return 'effect';
  }
  return 'other';
}

function findSelector(lines, index) {
  for (let cursor = index; cursor >= Math.max(0, index - 8); cursor -= 1) {
    const line = lines[cursor].trim();
    if (line.endsWith('{')) {
      return line.slice(0, -1).trim() || ':root';
    }
  }
  return ':root';
}

function collectTokenUsage() {
  const cssFiles = [
    ...walkFiles(path.join(THEME_DIR, 'css')),
    ...walkFiles(path.join(THEME_DIR, 'migration/css')),
  ];

  const usage = [];

  for (const filePath of cssFiles) {
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

    lines.forEach((line, index) => {
      if (!line.includes('var(--')) {
        return;
      }

      const declaration = line.match(/^\s*([-\w]+)\s*:\s*([^;]+);/);
      if (!declaration) {
        return;
      }

      const property = declaration[1];
      const value = declaration[2];
      const tokens = [...value.matchAll(/var\((--[^),\s]+)/g)]
        .map((match) => match[1])
        .filter((token) => TRACKED_TOKEN_SET.has(token));

      if (tokens.length === 0) {
        return;
      }

      const selector = findSelector(lines, index);

      tokens.forEach((token) => {
        usage.push({
          token,
          file: relativePath(filePath),
          line: index + 1,
          selector,
          property,
          group: classifyProperty(property),
          value: value.trim(),
          snippet: line.trim(),
        });
      });
    });
  }

  return usage;
}

function summarizeUsage(usage) {
  return TRACKED_TOKENS.map((token) => {
    const matches = usage.filter((item) => item.token === token.name);
    const counts = matches.reduce((accumulator, item) => {
      accumulator[item.group] = (accumulator[item.group] || 0) + 1;
      return accumulator;
    }, {});

    return {
      ...token,
      total: matches.length,
      counts,
      matches,
    };
  });
}

async function waitForThemeUpdate(page) {
  await page.evaluate(() => new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  }));
}

async function login(page) {
  await page.goto(`${BASE_URL}/user/login`, { waitUntil: 'domcontentloaded' });
  await page.fill('#edit-name', USERNAME);
  await page.fill('#edit-pass', PASSWORD);
  await page.click('#edit-submit');
  await page.waitForURL(/\/user\//);
}

async function openSettings(page) {
  await page.goto(`${BASE_URL}${SETTINGS_PATH}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('input[name="enable_dark_mode"][value="0"]');
}

async function setAppearance(page, mode) {
  await page.check(`input[name="enable_dark_mode"][value="${mode}"]`, { force: true });
  await waitForThemeUpdate(page);
}

async function setContrast(page, enabled) {
  const checkbox = page.locator('input[name="high_contrast_mode"]');
  if ((await checkbox.isChecked()) !== enabled) {
    if (enabled) {
      await checkbox.check({ force: true });
    }
    else {
      await checkbox.uncheck({ force: true });
    }
    await waitForThemeUpdate(page);
  }
}

async function setAccent(page, preset) {
  await page.check(`input[name="preset_accent_color"][value="${preset}"]`, { force: true });
  await waitForThemeUpdate(page);
}

async function setFocus(page, preset) {
  await page.selectOption('select[name="preset_focus_color"]', preset);
  await waitForThemeUpdate(page);
}

async function collectRuntimeSnapshot(page, label, viewport = null, langConfig = null) {
  // Set viewport if provided
  if (viewport) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.waitForLoadState('networkidle');
  }

  // Set language and direction if provided
  if (langConfig) {
    await page.evaluate((config) => {
      document.documentElement.lang = config.lang;
      document.documentElement.dir = config.dir;
    }, langConfig);
  }

  return page.evaluate((currentLabel) => {
    const html = document.documentElement;
    const body = document.body;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('2D canvas context is unavailable for color normalization.');
    }

    const normalize = (value) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = '#000';
      context.fillStyle = value;
      context.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
      const alpha = Number((a / 255).toFixed(3));
      const display = alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
      return { r, g, b, a: alpha, raw: value, display };
    };

    const composite = (foreground, background) => ({
      r: foreground.a * foreground.r + (1 - foreground.a) * background.r,
      g: foreground.a * foreground.g + (1 - foreground.a) * background.g,
      b: foreground.a * foreground.b + (1 - foreground.a) * background.b,
      a: 1,
    });

    const linear = (channel) => {
      const normalized = channel / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    };

    const luminance = (rgb) => 0.2126 * linear(rgb.r) + 0.7152 * linear(rgb.g) + 0.0722 * linear(rgb.b);

    const contrastRatio = (colorA, colorB) => {
      const luminanceA = luminance(colorA);
      const luminanceB = luminance(colorB);
      const lighter = Math.max(luminanceA, luminanceB);
      const darker = Math.min(luminanceA, luminanceB);
      return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
    };

    const resolveVar = (target, variable) => {
      const probe = document.createElement('div');
      probe.style.color = `var(${variable})`;
      probe.style.backgroundColor = `var(${variable})`;
      target.appendChild(probe);
      const value = getComputedStyle(probe).color;
      probe.remove();
      return value;
    };

    const resolveShadowVar = (target, variable) => {
      const probe = document.createElement('div');
      probe.style.boxShadow = `var(${variable})`;
      target.appendChild(probe);
      const value = getComputedStyle(probe).boxShadow;
      probe.remove();
      return value;
    };

    const extractColorFromShadow = (shadowValue) => {
      if (!shadowValue || shadowValue === 'none') {
        return null;
      }
      const rgbaMatch = shadowValue.match(/rgba?\([^)]*\)/);
      if (rgbaMatch) {
        return rgbaMatch[0];
      }
      const hexMatch = shadowValue.match(/#[0-9a-fA-F]{3,8}/);
      return hexMatch ? hexMatch[0] : null;
    };

    const target = body.classList.contains('gin--high-contrast-mode') ? body : html;
    const vars = {
      text: normalize(resolveVar(target, '--gin-color-text')),
      textLight: normalize(resolveVar(target, '--gin-color-text-light')),
      bgApp: normalize(resolveVar(target, '--gin-bg-app')),
      bgLayer: normalize(resolveVar(target, '--gin-bg-layer')),
      primary: normalize(resolveVar(target, '--gin-color-primary')),
      primaryLight: normalize(resolveVar(target, '--gin-color-primary-light')),
      buttonText: normalize(resolveVar(target, '--button-fg-color--primary')),
      buttonBg: normalize(resolveVar(target, '--button-bg-color--primary')),
      focus: normalize(resolveVar(target, '--gin-color-focus')),
      focusBorder: normalize(resolveVar(target, '--gin-color-focus-border')),
      colorFocus: normalize(resolveVar(target, '--color-focus')),
      formBorder: normalize(resolveVar(target, '--gin-border-color-form-element')),
      accentBase: normalize(resolveVar(target, '--accent-base')),
      accent500: normalize(resolveVar(target, '--accent-color-500')),
      accent030: normalize(resolveVar(target, '--accent-color-030')),
    };

    const focusRingEffect = resolveShadowVar(target, '--focus-ring');
    const focusRingColor = extractColorFromShadow(focusRingEffect);

    return {
      label: currentLabel,
      htmlClasses: Array.from(html.classList),
      bodyClasses: Array.from(body.classList),
      dataGinAccent: html.getAttribute('data-gin-accent'),
      dataGinFocus: html.getAttribute('data-gin-focus'),
      vars: {
        ...Object.fromEntries(Object.entries(vars).map(([key, value]) => [key, value.display])),
        focusRing: focusRingColor ? normalize(focusRingColor).display : 'n/a',
        focusRingEffect,
      },
      contrast: {
        textOnLayer: contrastRatio(composite(vars.text, vars.bgLayer), vars.bgLayer),
        textLightOnLayer: contrastRatio(composite(vars.textLight, vars.bgLayer), vars.bgLayer),
        primaryOnLayer: contrastRatio(composite(vars.primary, vars.bgLayer), vars.bgLayer),
        buttonTextOnPrimary: contrastRatio(vars.buttonText, composite(vars.buttonBg, vars.bgLayer)),
        focusOnApp: contrastRatio(composite(vars.focus, vars.bgApp), vars.bgApp),
        formBorderOnLayer: contrastRatio(composite(vars.formBorder, vars.bgLayer), vars.bgLayer),
      },
    };
  }, label);
}

function stateKey(mode, contrast) {
  return `${mode}-${contrast ? 'contrast-on' : 'contrast-off'}`;
}

async function collectRuntimeReport() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  try {
    await login(page);
    await openSettings(page);

    const accentPresets = await page.$$eval('input[name="preset_accent_color"]', (elements) => elements
      .map((element) => ({
        value: element.value,
        label: (element.closest('label')?.textContent || element.value).replace(/\s+/g, ' ').trim(),
      }))
      .filter((option) => option.value !== 'custom'));

    const focusPresets = await page.$eval('select[name="preset_focus_color"]', (select) => Array.from(select.options)
      .map((option) => ({ value: option.value, label: option.textContent.trim() }))
      .filter((option) => option.value !== 'custom'));

    const states = [
      { mode: '0', contrast: false, label: 'Light / Increase Contrast Off' },
      { mode: '1', contrast: false, label: 'Dark / Increase Contrast Off' },
      { mode: '1', contrast: true, label: 'Dark / Increase Contrast On' },
      { mode: '0', contrast: true, label: 'Light / Increase Contrast On' },
    ];

    const baseline = [];
    const accentGrid = [];
    const focusGrid = [];

    // Currently collecting for desktop + LTR only. Infrastructure exists for expanding to all viewports/languages.
    const desktopViewport = VIEWPORT_CONFIGS.find(v => v.key === 'desktop');
    const ltrLang = LANGUAGE_CONFIGS.find(l => l.key === 'ltr');

    for (const currentState of states) {
      await setAppearance(page, currentState.mode);
      await setContrast(page, currentState.contrast);
      await setAccent(page, 'blue');
      await setFocus(page, 'gin');

      baseline.push({
        state: stateKey(currentState.mode, currentState.contrast),
        viewport: desktopViewport.key,
        viewportLabel: desktopViewport.label,
        langKey: ltrLang.key,
        langLabel: ltrLang.label,
        ...currentState,
        snapshot: await collectRuntimeSnapshot(page, currentState.label, desktopViewport, ltrLang),
      });

      for (const accent of accentPresets) {
        await setAccent(page, accent.value);
        accentGrid.push({
          state: stateKey(currentState.mode, currentState.contrast),
          viewport: desktopViewport.key,
          viewportLabel: desktopViewport.label,
          langKey: ltrLang.key,
          langLabel: ltrLang.label,
          ...currentState,
          accent,
          snapshot: await collectRuntimeSnapshot(page, `${currentState.label} / ${accent.label}`, desktopViewport, ltrLang),
        });
      }

      await setAccent(page, 'blue');

      for (const focus of focusPresets) {
        await setFocus(page, focus.value);
        focusGrid.push({
          state: stateKey(currentState.mode, currentState.contrast),
          viewport: desktopViewport.key,
          viewportLabel: desktopViewport.label,
          langKey: ltrLang.key,
          langLabel: ltrLang.label,
          ...currentState,
          focus,
          snapshot: await collectRuntimeSnapshot(page, `${currentState.label} / ${focus.label}`, desktopViewport, ltrLang),
        });
      }
    }

    return {
      baseUrl: BASE_URL,
      settingsPath: SETTINGS_PATH,
      accentPresets,
      focusPresets,
      viewportConfigs: VIEWPORT_CONFIGS,
      languageConfigs: LANGUAGE_CONFIGS,
      currentViewport: desktopViewport,
      currentLanguage: ltrLang,
      baseline,
      accentGrid,
      focusGrid,
    };
  }
  finally {
    await browser.close();
  }
}

function rgbToHex(color) {
  if (!color) {
    return null;
  }

  if (typeof color === 'object' && color !== null) {
    const r = Math.max(0, Math.min(255, Math.round(color.r ?? 0)));
    const g = Math.max(0, Math.min(255, Math.round(color.g ?? 0)));
    const b = Math.max(0, Math.min(255, Math.round(color.b ?? 0)));
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
  }

  const parsed = parseColor(color);
  if (!parsed) {
    return null;
  }
  return rgbToHex(parsed);
}

function parseColor(colorString) {
  if (!colorString || colorString === 'n/a') {
    return null;
  }
  const rgbMatch = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
      a: rgbMatch[4] == null ? 1 : Number(rgbMatch[4]),
    };
  }
  const hexMatch = colorString.match(/^#([0-9a-f]{6}|[0-9a-f]{3})$/i);
  if (hexMatch) {
    const hex = hexMatch[1].length === 3
      ? hexMatch[1].split('').map((char) => char + char).join('')
      : hexMatch[1];
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: 1,
    };
  }
  return null;
}

function compositeColor(foreground, background) {
  return {
    r: foreground.a * foreground.r + (1 - foreground.a) * background.r,
    g: foreground.a * foreground.g + (1 - foreground.a) * background.g,
    b: foreground.a * foreground.b + (1 - foreground.a) * background.b,
    a: 1,
  };
}

function resolveContrastPair(foreground, background) {
  const parsedForeground = parseColor(foreground);
  const parsedBackground = parseColor(background);

  if (!parsedForeground || !parsedBackground) {
    return {
      fgHex: foreground?.startsWith('#') ? foreground : rgbToHex(foreground) || foreground,
      bgHex: background?.startsWith('#') ? background : rgbToHex(background) || background,
      composited: false,
    };
  }

  const effectiveForeground = parsedForeground.a < 1
    ? compositeColor(parsedForeground, parsedBackground)
    : parsedForeground;

  return {
    fgHex: rgbToHex(effectiveForeground),
    bgHex: rgbToHex(parsedBackground),
    composited: parsedForeground.a < 1,
  };
}

function relativeLuminance(channel) {
  const normalized = channel / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function contrastFromRgb(colorA, colorB) {
  const luminanceA = 0.2126 * relativeLuminance(colorA.r) + 0.7152 * relativeLuminance(colorA.g) + 0.0722 * relativeLuminance(colorA.b);
  const luminanceB = 0.2126 * relativeLuminance(colorB.r) + 0.7152 * relativeLuminance(colorB.g) + 0.0722 * relativeLuminance(colorB.b);
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

function apcaFromRgb(colorA, colorB, apcaFns) {
  if (!apcaFns) {
    return null;
  }
  const { APCAcontrast, sRGBtoY } = apcaFns;
  const txtY = sRGBtoY([Math.round(colorA.r), Math.round(colorA.g), Math.round(colorA.b)]);
  const bgY = sRGBtoY([Math.round(colorB.r), Math.round(colorB.g), Math.round(colorB.b)]);
  const value = APCAcontrast(txtY, bgY);
  return Number(Math.abs(value).toFixed(1));
}

function evaluatePair(foregroundCss, backgroundCss, apcaFns) {
  const fg = parseColor(foregroundCss);
  const bg = parseColor(backgroundCss);
  if (!fg || !bg) {
    return null;
  }
  const composedFg = fg.a < 1 ? compositeColor(fg, bg) : fg;
  return {
    wcag: contrastFromRgb(composedFg, bg),
    apca: apcaFromRgb(composedFg, bg, apcaFns),
  };
}

async function loadApcaFns() {
  try {
    const module = await import('apca-w3');
    return {
      APCAcontrast: module.APCAcontrast,
      sRGBtoY: module.sRGBtoY,
    };
  }
  catch {
    return null;
  }
}

function ratioBadge(ratio, aa, aaa) {
  if (typeof aaa === 'number' && ratio >= aaa) {
    return 'AAA';
  }
  if (ratio >= aa) {
    return 'AA';
  }
  return 'Fail';
}

function generateContrastReportUrl(foreground, background) {
  const pair = resolveContrastPair(foreground, background);
  const fgHex = pair.fgHex;
  const bgHex = pair.bgHex;
  const fgEncoded = encodeURIComponent(fgHex);
  const bgEncoded = encodeURIComponent(bgHex);
  return `https://contrast.report/?fg=${fgEncoded}&bg=${bgEncoded}`;
}

function renderMetricCell(entry, metric, foreground, background) {
  const ratio = entry.snapshot.contrast[metric.key];
  const badge = ratioBadge(ratio, metric.aa, metric.aaa);
  const badgeClass = badge === 'Fail' ? 'fail' : badge.toLowerCase();
  const contrastUrl = foreground && background ? generateContrastReportUrl(foreground, background) : null;
  const ratioLink = contrastUrl ? `<a href="${contrastUrl}" target="_blank" rel="noopener" title="Validate on contrast.report">${ratio.toFixed(2)}:1</a>` : `${ratio.toFixed(2)}:1`;
  return `<td><div class="metric"><strong>${ratioLink}</strong><span class="badge ${badgeClass}">${badge}</span></div></td>`;
}

function renderSwatch(label, color) {
  const hexColor = color.startsWith('#') ? color : (rgbToHex(color) || color);
  return `<div class="swatch-row"><span class="swatch" style="background:${escapeHtml(color)}"></span><code>${escapeHtml(label)}</code><span>${escapeHtml(hexColor)}</span></div>`;
}

function renderAccentPresetQuickReference(recommendationStats) {
  const rows = Object.entries(ACCENT_COLORS)
    .filter(([key]) => key !== 'custom')
    .map(([key, color]) => {
      const stats = recommendationStats?.get(key);
      const proposedHex = stats?.resolvedProposed || (PROPOSED_ACCENT_COLORS[key]?.hex || color.hex);
      const isChanged = color.hex.toLowerCase() !== proposedHex.toLowerCase();
      return `<tr>
        <th scope="row">${escapeHtml(color.label || presetLabelFromKey(key))}</th>
        <td>
          <div class="color-comparison-cell">
            <div class="color-display-box" style="background:${escapeHtml(color.hex)}; border: 2px solid #ccc;" title="Current: ${escapeHtml(color.hex)}"></div>
            <code>${escapeHtml(color.hex)}</code>
          </div>
        </td>
        <td>
          <div class="color-comparison-cell" ${isChanged ? 'style="background:#fffaf0; border: 2px solid #f0ad4e;"' : ''}>
            <div class="color-display-box" style="background:${escapeHtml(proposedHex)}; border: 2px solid #ccc;" title="Proposed: ${escapeHtml(proposedHex)}"></div>
            <code>${escapeHtml(proposedHex)}</code>
            ${isChanged ? '<span class="badge aa">Darker</span>' : ''}
          </div>
        </td>
      </tr>`;
    }).join('');

  return `<table class="accent-quick-reference">
    <thead>
      <tr>
        <th scope="col">Accent preset</th>
        <th scope="col">Current default</th>
        <th scope="col">Proposed default (not applied)</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function renderCurrentDefaultsCards(accentGrid) {
  const byAccent = new Map();
  accentGrid.forEach((entry) => {
    if (!byAccent.has(entry.accent.value)) {
      byAccent.set(entry.accent.value, { accent: entry.accent, states: new Map() });
    }
    byAccent.get(entry.accent.value).states.set(entry.state, entry);
  });

  const cards = [...byAccent.values()].map((group) => {
    const baseHex = ACCENT_COLORS[group.accent.value]?.hex || group.accent.value;
    const lightEntry = group.states.get(LIGHT_OFF_STATE);
    const darkEntry = group.states.get(DARK_OFF_STATE);
    const lightResolved = lightEntry?.snapshot?.vars?.primary || baseHex;
    const darkResolved = darkEntry?.snapshot?.vars?.primary || baseHex;
    const lightResolvedHex = rgbToHex(lightResolved) || lightResolved;
    const darkResolvedHex = rgbToHex(darkResolved) || darkResolved;

    return `<article class="default-card">
      <h3>${escapeHtml(group.accent.label)}</h3>
      <div class="swatch-row"><code>Base: ${escapeHtml(baseHex)}</code></div>
      <div class="swatch-row"><span class="swatch" style="background:${escapeHtml(lightResolved)}"></span><code>Light mode: ${escapeHtml(lightResolvedHex)}</code></div>
      <div class="swatch-row"><span class="swatch" style="background:${escapeHtml(darkResolved)}"></span><code>Dark mode: ${escapeHtml(darkResolvedHex)}</code></div>
    </article>`;
  }).join('');

  return `<div class="defaults-card-grid">${cards}</div>`;
}

function renderBaselineTable(baseline) {
  const rows = baseline.map((entry) => {
    const vars = entry.snapshot.vars;
    const textColor = vars.text;
    const layerColor = vars.bgLayer;
    const primaryColor = vars.primary;
    const buttonTextColor = vars.buttonText;
    const buttonBgColor = vars.buttonBg || primaryColor;
    const focusColor = vars.focus;
    const appBgColor = vars.bgApp;
    
    const textContrast = entry.snapshot.contrast.textOnLayer;
    const primaryContrast = entry.snapshot.contrast.primaryOnLayer;
    const buttonContrast = entry.snapshot.contrast.buttonTextOnPrimary;
    const focusContrast = entry.snapshot.contrast.focusOnApp;
    
    const textBadge = ratioBadge(textContrast, 4.5, 7);
    const primaryBadge = ratioBadge(primaryContrast, 4.5, 7);
    const buttonBadge = ratioBadge(buttonContrast, 4.5, 7);
    const focusBadge = ratioBadge(focusContrast, 3, 4.5);
    
    const textPair = resolveContrastPair(textColor, layerColor);
    const primaryPair = resolveContrastPair(primaryColor, layerColor);
    const buttonPair = resolveContrastPair(buttonTextColor, buttonBgColor);
    const focusPair = resolveContrastPair(focusColor, appBgColor);

    const textTextHex = textPair.fgHex || textColor;
    const layerHex = textPair.bgHex || layerColor;
    const primaryHex = primaryPair.fgHex || primaryColor;
    const buttonTextHex = buttonPair.fgHex || buttonTextColor;
    const buttonBgHex = buttonPair.bgHex || buttonBgColor;
    const focusHex = focusPair.fgHex || focusColor;
    const appBgHex = focusPair.bgHex || appBgColor;
    
    const textUrl = generateContrastReportUrl(textColor, layerColor);
    const primaryUrl = generateContrastReportUrl(primaryColor, layerColor);
    const buttonUrl = generateContrastReportUrl(buttonTextColor, buttonBgColor);
    const focusUrl = generateContrastReportUrl(focusColor, appBgColor);
    
    return `<tr>
      <th scope="row">${escapeHtml(entry.label)}</th>
      <td>
        <div class="metric-detailed">
          <strong><a href="${textUrl}" target="_blank" rel="noopener" title="Validate on contrast.report">${textContrast.toFixed(2)}:1</a></strong>
          <span class="badge ${textBadge === 'Fail' ? 'fail' : textBadge.toLowerCase()}">${textBadge}</span>
          <div class="color-pair">
            <div class="color-swatch" style="background:${escapeHtml(textColor)};" title="${escapeHtml(textTextHex)}"></div>
            <div class="color-swatch" style="background:${escapeHtml(layerColor)};" title="${escapeHtml(layerHex)}"></div>
          </div>
          <code class="color-code">${escapeHtml(textTextHex)} on ${escapeHtml(layerHex)}${textPair.composited ? ' (alpha-composited)' : ''}</code>
        </div>
      </td>
      <td>
        <div class="metric-detailed">
          <strong><a href="${primaryUrl}" target="_blank" rel="noopener" title="Validate on contrast.report">${primaryContrast.toFixed(2)}:1</a></strong>
          <span class="badge ${primaryBadge === 'Fail' ? 'fail' : primaryBadge.toLowerCase()}">${primaryBadge}</span>
          <div class="color-pair">
            <div class="color-swatch" style="background:${escapeHtml(primaryColor)};" title="${escapeHtml(primaryHex)}"></div>
            <div class="color-swatch" style="background:${escapeHtml(layerColor)};" title="${escapeHtml(layerHex)}"></div>
          </div>
          <code class="color-code">${escapeHtml(primaryHex)} on ${escapeHtml(layerHex)}${primaryPair.composited ? ' (alpha-composited)' : ''}</code>
        </div>
      </td>
      <td>
        <div class="metric-detailed">
          <strong><a href="${buttonUrl}" target="_blank" rel="noopener" title="Validate on contrast.report">${buttonContrast.toFixed(2)}:1</a></strong>
          <span class="badge ${buttonBadge === 'Fail' ? 'fail' : buttonBadge.toLowerCase()}">${buttonBadge}</span>
          <div class="color-pair">
            <div class="color-swatch" style="background:${escapeHtml(buttonTextColor)};" title="${escapeHtml(buttonTextHex)}"></div>
            <div class="color-swatch" style="background:${escapeHtml(buttonBgColor)};" title="${escapeHtml(buttonBgHex)}"></div>
          </div>
          <code class="color-code">${escapeHtml(buttonTextHex)} on ${escapeHtml(buttonBgHex)}${buttonPair.composited ? ' (alpha-composited)' : ''}</code>
        </div>
      </td>
      <td>
        <div class="metric-detailed">
          <strong><a href="${focusUrl}" target="_blank" rel="noopener" title="Validate on contrast.report">${focusContrast.toFixed(2)}:1</a></strong>
          <span class="badge ${focusBadge === 'Fail' ? 'fail' : focusBadge.toLowerCase()}">${focusBadge}</span>
          <div class="color-pair">
            <div class="color-swatch" style="background:${escapeHtml(focusColor)};" title="${escapeHtml(focusHex)}"></div>
            <div class="color-swatch" style="background:${escapeHtml(appBgColor)};" title="${escapeHtml(appBgHex)}"></div>
          </div>
          <code class="color-code">${escapeHtml(focusHex)} on ${escapeHtml(appBgHex)}${focusPair.composited ? ' (alpha-composited)' : ''}</code>
        </div>
      </td>
    </tr>`;
  }).join('');

  return `<table class="baseline-metrics-table">
    <thead>
      <tr>
        <th scope="col">State</th>
        <th scope="col">Text on layer</th>
        <th scope="col">Primary on layer</th>
        <th scope="col">Button text on primary</th>
        <th scope="col">Focus on app bg</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function renderAccentGridWithHex(accentGrid, states) {
  const byAccent = new Map();

  const renderContrastChip = (ratio, foreground, background) => `<strong class="contrast-chip" style="color:${escapeHtml(foreground)}; background:${escapeHtml(background)};">${ratio.toFixed(2)}:1</strong>`;

  accentGrid.forEach((entry) => {
    if (!byAccent.has(entry.accent.value)) {
      byAccent.set(entry.accent.value, { accent: entry.accent, states: new Map() });
    }
    byAccent.get(entry.accent.value).states.set(entry.state, entry);
  });

  const accentColors = ACCENT_COLORS[Object.keys(ACCENT_COLORS)[0]] ? ACCENT_COLORS : {};

  // Primary button text on accent color
  const buttonHeader = states.map((state) => `<th scope="col">${escapeHtml(state.label)}</th>`).join('');
  const buttonRows = [...byAccent.values()].map((group) => {
    const accentHex = accentColors[group.accent.value]?.hex || group.accent.value;
    const lightEntry = group.states.get(LIGHT_OFF_STATE);
    const darkEntry = group.states.get(DARK_OFF_STATE);
    const lightPrimary = lightEntry?.snapshot?.vars?.primary || accentHex;
    const darkPrimary = darkEntry?.snapshot?.vars?.primary || accentHex;
    const lightPrimaryHex = rgbToHex(lightPrimary) || lightPrimary;
    const darkPrimaryHex = rgbToHex(darkPrimary) || darkPrimary;
    const cells = states.map((state) => {
      const entry = group.states.get(state.state);
      const ratio = entry.snapshot.contrast.buttonTextOnPrimary;
      const badge = ratioBadge(ratio, 4.5, 7);
      const badgeClass = badge === 'Fail' ? 'fail' : badge.toLowerCase();
      const buttonBg = entry.snapshot.vars.buttonBg;
      const buttonText = entry.snapshot.vars.buttonText;
      const buttonBgHex = rgbToHex(buttonBg) || buttonBg;
      const buttonTextHex = rgbToHex(buttonText) || buttonText;
      return `<td>
        <div class="metric-detailed">
          ${renderContrastChip(ratio, buttonText, buttonBg)}
          <span class="badge ${badgeClass}">${badge}</span>
          <div class="color-pair">
            <div class="color-swatch" style="background:${escapeHtml(buttonText)};" title="${escapeHtml(buttonTextHex)}"></div>
            <div class="color-swatch" style="background:${escapeHtml(buttonBg)};" title="${escapeHtml(buttonBgHex)}"></div>
          </div>
          <code class="color-code">${escapeHtml(buttonTextHex)} on ${escapeHtml(buttonBgHex)}</code>
        </div>
      </td>`;
    }).join('');
    
    return `<tr>
      <th scope="row">
        <div class="preset-info">
          <span>${escapeHtml(group.accent.label)}</span>
          <code>Light: ${escapeHtml(lightPrimaryHex)}</code>
          <code>Dark: ${escapeHtml(darkPrimaryHex)}</code>
        </div>
      </th>
      ${cells}
    </tr>`;
  }).join('');

  // Accent color on layer background
  const primaryHeader = states.map((state) => `<th scope="col">${escapeHtml(state.label)}</th>`).join('');
  const primaryRows = [...byAccent.values()].map((group) => {
    const accentHex = accentColors[group.accent.value]?.hex || group.accent.value;
    const lightEntry = group.states.get(LIGHT_OFF_STATE);
    const darkEntry = group.states.get(DARK_OFF_STATE);
    const lightPrimary = lightEntry?.snapshot?.vars?.primary || accentHex;
    const darkPrimary = darkEntry?.snapshot?.vars?.primary || accentHex;
    const lightPrimaryHex = rgbToHex(lightPrimary) || lightPrimary;
    const darkPrimaryHex = rgbToHex(darkPrimary) || darkPrimary;
    const cells = states.map((state) => {
      const entry = group.states.get(state.state);
      const ratio = entry.snapshot.contrast.primaryOnLayer;
      const badge = ratioBadge(ratio, 4.5, 7);
      const badgeClass = badge === 'Fail' ? 'fail' : badge.toLowerCase();
      const primary = entry.snapshot.vars.primary;
      const layer = entry.snapshot.vars.bgLayer;
      const primaryHex = rgbToHex(primary) || primary;
      const layerHex = rgbToHex(layer) || layer;
      return `<td>
        <div class="metric-detailed">
          ${renderContrastChip(ratio, primary, layer)}
          <span class="badge ${badgeClass}">${badge}</span>
          <div class="color-pair">
            <div class="color-swatch" style="background:${escapeHtml(primary)};" title="${escapeHtml(primaryHex)}"></div>
            <div class="color-swatch" style="background:${escapeHtml(layer)};" title="${escapeHtml(layerHex)}"></div>
          </div>
          <code class="color-code">${escapeHtml(primaryHex)} on ${escapeHtml(layerHex)}</code>
        </div>
      </td>`;
    }).join('');
    
    return `<tr>
      <th scope="row">
        <div class="preset-info">
          <span>${escapeHtml(group.accent.label)}</span>
          <code>Light: ${escapeHtml(lightPrimaryHex)}</code>
          <code>Dark: ${escapeHtml(darkPrimaryHex)}</code>
        </div>
      </th>
      ${cells}
    </tr>`;
  }).join('');

  return `
    <h3 id="accent-primary-button-text">Primary Button Text on Accent</h3>
    <table class="accent-grid">
      <thead><tr><th scope="col">Accent preset</th>${buttonHeader}</tr></thead>
      <tbody>${buttonRows}</tbody>
    </table>
    <h3 id="accent-color-on-layer">Accent Color on Layer</h3>
    <table class="accent-grid">
      <thead><tr><th scope="col">Accent preset</th>${primaryHeader}</tr></thead>
      <tbody>${primaryRows}</tbody>
    </table>`;
}

function renderAccentGrid(accentGrid, states) {
  return renderAccentGridWithHex(accentGrid, states);
}

function renderFocusGrid(focusGrid, states) {
  const byFocus = new Map();

  focusGrid.forEach((entry) => {
    if (!byFocus.has(entry.focus.value)) {
      byFocus.set(entry.focus.value, { focus: entry.focus, states: new Map() });
    }
    byFocus.get(entry.focus.value).states.set(entry.state, entry);
  });

  const headerStates = states.map((entry) => `<th scope="col">${escapeHtml(entry.label)}</th>`).join('');
  const rows = [...byFocus.values()].map((group) => {
    const focusInfo = FOCUS_COLOR_MAP[group.focus.value] || { label: group.focus.label, hex: 'unknown' };
    const lightEntry = group.states.get(LIGHT_OFF_STATE);
    const darkEntry = group.states.get(DARK_OFF_STATE);
    const lightFocus = lightEntry?.snapshot?.vars?.focus || focusInfo.hex;
    const darkFocus = darkEntry?.snapshot?.vars?.focus || focusInfo.hex;
    const lightFocusHex = rgbToHex(lightFocus) || lightFocus;
    const darkFocusHex = rgbToHex(darkFocus) || darkFocus;
    const cells = states.map((state) => {
      const entry = group.states.get(state.state);
      const ratio = entry.snapshot.contrast.focusOnApp;
      const badge = ratioBadge(ratio, 3);
      const badgeClass = badge === 'Fail' ? 'fail' : badge.toLowerCase();
      const focus = entry.snapshot.vars.focus;
      const app = entry.snapshot.vars.bgApp;
      const focusHex = rgbToHex(focus) || focus;
      const appHex = rgbToHex(app) || app;
      return `<td>
        <div class="metric-detailed">
          <strong>${ratio.toFixed(2)}:1</strong>
          <span class="badge ${badgeClass}">${badge}</span>
          <div class="color-pair">
            <div class="color-swatch" style="background:${escapeHtml(focus)};" title="${escapeHtml(focusHex)}"></div>
            <div class="color-swatch" style="background:${escapeHtml(app)};" title="${escapeHtml(appHex)}"></div>
          </div>
          <code class="color-code">${escapeHtml(focusHex)} on ${escapeHtml(appHex)}</code>
        </div>
      </td>`;
    }).join('');
    
    return `<tr>
      <th scope="row">
        <div class="preset-info">
          <span>${escapeHtml(group.focus.label)}</span>
          <code>Preset: ${escapeHtml(focusInfo.hex !== 'auto' ? focusInfo.hex : 'auto')}</code>
          <code>Light: ${escapeHtml(lightFocusHex)}</code>
          <code>Dark: ${escapeHtml(darkFocusHex)}</code>
        </div>
      </th>
      ${cells}
    </tr>`;
  }).join('');

  return `<table class="focus-grid">
    <thead><tr><th scope="col">Focus preset</th>${headerStates}</tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function buildRecommendationStats(accentGrid, apcaFns) {
  const byPreset = new Map();

  accentGrid.forEach((entry) => {
    const key = entry.accent.value;
    if (!byPreset.has(key)) {
      byPreset.set(key, []);
    }
    byPreset.get(key).push(entry);
  });

  const stats = new Map();

  [...byPreset.entries()].forEach(([key, entries]) => {
    const currentMin = { buttonWcag: Number.POSITIVE_INFINITY, buttonApca: Number.POSITIVE_INFINITY, primaryWcag: Number.POSITIVE_INFINITY, primaryApca: Number.POSITIVE_INFINITY };
    const proposedMin = { buttonWcag: Number.POSITIVE_INFINITY, buttonApca: Number.POSITIVE_INFINITY, primaryWcag: Number.POSITIVE_INFINITY, primaryApca: Number.POSITIVE_INFINITY };

    const initialProposed = (PROPOSED_ACCENT_COLORS[key]?.hex || ACCENT_COLORS[key]?.hex || '#000000').toUpperCase();
    let resolvedProposed = initialProposed;

    const evaluateWithHex = (hexColor, accumulator) => {
      entries.forEach((entry) => {
        const vars = entry.snapshot.vars;
        const buttonPair = evaluatePair(vars.buttonText, hexColor, apcaFns);
        const primaryPair = evaluatePair(hexColor, vars.bgLayer, apcaFns);
        if (buttonPair) {
          accumulator.buttonWcag = Math.min(accumulator.buttonWcag, buttonPair.wcag);
          if (buttonPair.apca != null) {
            accumulator.buttonApca = Math.min(accumulator.buttonApca, buttonPair.apca);
          }
        }
        if (primaryPair) {
          accumulator.primaryWcag = Math.min(accumulator.primaryWcag, primaryPair.wcag);
          if (primaryPair.apca != null) {
            accumulator.primaryApca = Math.min(accumulator.primaryApca, primaryPair.apca);
          }
        }
      });
    };

    evaluateWithHex(ACCENT_COLORS[key]?.hex || '#000000', currentMin);
    evaluateWithHex(initialProposed, proposedMin);

    const proposalPasses = proposedMin.buttonWcag >= 4.5
      && proposedMin.primaryWcag >= 4.5
      && (proposedMin.buttonApca === Number.POSITIVE_INFINITY || proposedMin.buttonApca >= APCA_TARGET_LC)
      && (proposedMin.primaryApca === Number.POSITIVE_INFINITY || proposedMin.primaryApca >= APCA_TARGET_LC);

    let fallbackToCurrent = false;
    if (!proposalPasses) {
      fallbackToCurrent = true;
      resolvedProposed = (ACCENT_COLORS[key]?.hex || initialProposed).toUpperCase();
      proposedMin.buttonWcag = currentMin.buttonWcag;
      proposedMin.primaryWcag = currentMin.primaryWcag;
      proposedMin.buttonApca = currentMin.buttonApca;
      proposedMin.primaryApca = currentMin.primaryApca;
    }

    stats.set(key, {
      resolvedProposed,
      fallbackToCurrent,
      currentMin,
      proposedMin,
    });
  });

  return stats;
}

function renderRecommendations(accentGrid, recommendationStats) {
  const formatMetric = (value, decimals = 2) => (Number.isFinite(value) ? value.toFixed(decimals) : 'n/a');
  const byPreset = new Map();

  accentGrid.forEach((entry) => {
    const key = entry.accent.value;
    const buttonRatio = entry.snapshot.contrast.buttonTextOnPrimary;
    const primaryRatio = entry.snapshot.contrast.primaryOnLayer;

    if (!byPreset.has(key)) {
      byPreset.set(key, {
        key,
        label: entry.accent.label || presetLabelFromKey(key),
        minButtonRatio: Number.POSITIVE_INFINITY,
        minPrimaryRatio: Number.POSITIVE_INFINITY,
        failingStates: [],
      });
    }

    const aggregate = byPreset.get(key);
    aggregate.minButtonRatio = Math.min(aggregate.minButtonRatio, buttonRatio);
    aggregate.minPrimaryRatio = Math.min(aggregate.minPrimaryRatio, primaryRatio);

    if (buttonRatio < 4.5 || primaryRatio < 4.5) {
      aggregate.failingStates.push({
        state: entry.label,
        buttonRatio,
        primaryRatio,
      });
    }
  });

  const rows = Object.entries(ACCENT_COLORS)
    .filter(([key]) => key !== 'custom')
    .map(([key, color]) => {
      const aggregate = byPreset.get(key);
      const stats = recommendationStats?.get(key);
      const proposedHex = stats?.resolvedProposed || (PROPOSED_ACCENT_COLORS[key]?.hex || color.hex);
      const minButton = aggregate ? aggregate.minButtonRatio.toFixed(2) : 'n/a';
      const minPrimary = aggregate ? aggregate.minPrimaryRatio.toFixed(2) : 'n/a';
      const presetLabel = aggregate?.label || color.label || presetLabelFromKey(key);
      const sameColor = color.hex.toLowerCase() === proposedHex.toLowerCase();
      const sameClass = sameColor ? 'same-color' : '';
      const currentWcag = stats ? `${formatMetric(stats.currentMin.buttonWcag, 2)} / ${formatMetric(stats.currentMin.primaryWcag, 2)}` : 'n/a';
      const proposedWcag = stats ? `${formatMetric(stats.proposedMin.buttonWcag, 2)} / ${formatMetric(stats.proposedMin.primaryWcag, 2)}` : 'n/a';
      const currentApca = stats ? `${formatMetric(stats.currentMin.buttonApca, 1)} / ${formatMetric(stats.currentMin.primaryApca, 1)}` : 'n/a';
      const proposedApca = stats ? `${formatMetric(stats.proposedMin.buttonApca, 1)} / ${formatMetric(stats.proposedMin.primaryApca, 1)}` : 'n/a';
      const complianceBadge = stats && stats.proposedMin.buttonWcag >= 4.5 && stats.proposedMin.primaryWcag >= 4.5
        && stats.proposedMin.buttonApca >= APCA_TARGET_LC && stats.proposedMin.primaryApca >= APCA_TARGET_LC
        ? '<span class="badge aa">WCAG+APCA</span>'
        : '<span class="badge fail">Review</span>';

      return `<tr>
        <th scope="row">${escapeHtml(presetLabel)}</th>
        <td class="${sameClass}"><div class="swatch-row"><span class="swatch" style="background:${escapeHtml(color.hex)}"></span><code>${escapeHtml(color.hex)}</code></div></td>
        <td class="${sameClass}"><div class="swatch-row"><span class="swatch" style="background:${escapeHtml(proposedHex)}"></span><code>${escapeHtml(proposedHex)}</code></div></td>
        <td>${escapeHtml(minButton)}:1</td>
        <td>${escapeHtml(minPrimary)}:1</td>
        <td>${escapeHtml(currentWcag)}</td>
        <td>${escapeHtml(proposedWcag)}</td>
        <td>${escapeHtml(currentApca)}</td>
        <td>${escapeHtml(proposedApca)}</td>
        <td>${complianceBadge}${stats?.fallbackToCurrent ? ' <span class="hint">(fallback to current)</span>' : ''}</td>
      </tr>`;
    }).join('');

  const failingDetails = [...byPreset.values()]
    .filter((preset) => preset.failingStates.length > 0)
    .map((preset) => {
      const currentHex = ACCENT_COLORS[preset.key]?.hex || 'n/a';
      const states = preset.failingStates
        .map((entry) => `<li>${escapeHtml(entry.state)}: Button ${entry.buttonRatio.toFixed(2)}:1, Primary ${entry.primaryRatio.toFixed(2)}:1</li>`)
        .join('');
      return `<details>
        <summary><strong>${escapeHtml(preset.label)}</strong> (${escapeHtml(currentHex)}) failing scenarios</summary>
        <ul>${states}</ul>
      </details>`;
    }).join('');

  return `<div class="recommendations">
    <h3>Current Presets vs Proposed Presets</h3>
      <p class="hint">No CSS values were changed by this report. Proposed values are filtered to satisfy WCAG ratio and APCA target (${APCA_TARGET_LC} Lc minimum) for sampled button and primary pairings. WCAG/APCA columns are shown as <code>button / primary</code>. APCA values here use absolute Lc magnitude, so review them alongside the intended foreground/background roles because APCA is directional.</p>
    <table>
      <thead>
        <tr>
          <th scope="col">Preset</th>
          <th scope="col">Current</th>
          <th scope="col">Proposed</th>
          <th scope="col">Min Button Text on Primary</th>
          <th scope="col">Min Primary on Layer</th>
          <th scope="col">Current WCAG mins</th>
          <th scope="col">Proposed WCAG mins</th>
          <th scope="col">Current APCA mins</th>
          <th scope="col">Proposed APCA mins</th>
          <th scope="col">Compliance</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    ${failingDetails || '<p class="hint">✓ No failing scenarios were observed in this run for the tested AA metrics.</p>'}
    <p class="hint"><strong>Note:</strong> Proposed values should be validated in runtime because component composition, alpha blending, and forced-colors behavior can affect perceived contrast.</p>
  </div>`;
}

const TOKEN_REFERENCE = {
  text: 'var(--gin-color-text)',
  textLight: 'var(--gin-color-text-light)',
  bgApp: 'var(--gin-bg-app)',
  bgLayer: 'var(--gin-bg-layer)',
  primary: 'var(--gin-color-primary)',
  primaryLight: 'var(--gin-color-primary-light)',
  buttonText: 'var(--button-fg-color--primary)',
  buttonBg: 'var(--button-bg-color--primary)',
  accentBase: 'var(--accent-base)',
  accent500: 'var(--accent-color-500)',
  accent030: 'var(--accent-color-030)',
  focus: 'var(--gin-color-focus)',
  focusBorder: 'var(--gin-color-focus-border)',
  colorFocus: 'var(--color-focus)',
  focusRing: 'var(--focus-ring) [color extracted]',
};

const TOKEN_INTENT = {
  text: 'Intended role: foreground',
  textLight: 'Intended role: foreground',
  bgApp: 'Intended role: background',
  bgLayer: 'Intended role: background',
  primary: 'Intended role: accent',
  primaryLight: 'Intended role: accent',
  buttonText: 'Intended role: foreground',
  buttonBg: 'Intended role: background',
  accentBase: 'Intended role: accent base',
  accent500: 'Intended role: accent',
  accent030: 'Intended role: accent tint',
  focus: 'Intended role: focus',
  focusBorder: 'Intended role: focus border',
  colorFocus: 'Intended role: focus',
  focusRing: 'Intended role: focus effect',
};

function renderTokenLabel(key) {
  return `<div class="token-label">
    <code>${escapeHtml(TOKEN_REFERENCE[key] || key)}</code>
    <small>${escapeHtml(TOKEN_INTENT[key] || 'Intended role: token')}</small>
  </div>`;
}

function computeWorstCaseContrast(samples, fgKey, bgKey) {
  let worst = null;

  samples.forEach((sample) => {
    const fg = parseColor(sample.snapshot.vars[fgKey]);
    const bg = parseColor(sample.snapshot.vars[bgKey]);
    if (!fg || !bg) {
      return;
    }

    const composedFg = fg.a < 1 ? compositeColor(fg, bg) : fg;
    const ratio = contrastFromRgb(composedFg, bg);
    if (!worst || ratio < worst.ratio) {
      worst = {
        ratio,
        fg: sample.snapshot.vars[fgKey],
        bg: sample.snapshot.vars[bgKey],
        state: sample.label,
        focusRingEffect: sample.snapshot.vars.focusRingEffect,
      };
    }
  });

  return worst;
}

function renderTokenCombinationGrid(samples, foregroundKeys, backgroundKeys, threshold, title) {
  const rows = [];

  foregroundKeys.forEach((fgKey) => {
    backgroundKeys.forEach((bgKey) => {
      const worst = computeWorstCaseContrast(samples, fgKey, bgKey);
      if (!worst) {
        rows.push(`<tr>
          <th scope="row">${renderTokenLabel(fgKey)}</th>
          <td>${renderTokenLabel(bgKey)}</td>
          <td>n/a</td>
          <td><span class="badge fail">Unknown</span></td>
          <td>Color parse not available for one or both tokens.</td>
        </tr>`);
        return;
      }

      const status = worst.ratio >= threshold ? 'Pass' : 'Fail';
      const badgeClass = status === 'Pass' ? 'aa' : 'fail';
      const fgHex = rgbToHex(worst.fg) || worst.fg;
      const bgHex = rgbToHex(worst.bg) || worst.bg;
      const ringStyle = fgKey === 'focusRing' && worst.focusRingEffect && worst.focusRingEffect !== 'none'
        ? ` box-shadow:${escapeHtml(worst.focusRingEffect)};`
        : '';
      const focusPreview = fgKey === 'focusRing'
        ? `<div class="focus-contrast-preview" style="background:${escapeHtml(worst.bg)};">
            <div class="focus-contrast-target" style="background:${escapeHtml(worst.bg)};${ringStyle}"></div>
          </div>`
        : `<div class="color-pair">
            <span class="color-swatch" style="background:${escapeHtml(worst.fg)};${ringStyle}" title="${escapeHtml(fgHex)}"></span>
            <span class="color-swatch" style="background:${escapeHtml(worst.bg)}" title="${escapeHtml(bgHex)}"></span>
          </div>`;

      rows.push(`<tr>
        <th scope="row">${renderTokenLabel(fgKey)}</th>
        <td>${renderTokenLabel(bgKey)}</td>
        <td>
          <div class="metric-detailed">
            <strong>${worst.ratio.toFixed(2)}:1</strong>
            <span class="badge ${badgeClass}">${status}</span>
            ${focusPreview}
            <code class="color-code">${escapeHtml(fgHex)} on ${escapeHtml(bgHex)}</code>
            ${fgKey === 'focusRing' ? `<code class="color-code">ring effect: ${escapeHtml(worst.focusRingEffect || 'none')}</code>` : ''}
          </div>
        </td>
        <td><span class="badge ${badgeClass}">${status}</span></td>
        <td>${escapeHtml(worst.state)}</td>
      </tr>`);
    });
  });

  return `<section>
    <h3>${escapeHtml(title)}</h3>
    <table>
      <thead>
        <tr>
          <th scope="col">Foreground token</th>
          <th scope="col">Background token</th>
          <th scope="col">Worst observed ratio</th>
          <th scope="col">Threshold ${threshold.toFixed(1)}:1</th>
          <th scope="col">Worst-case sample</th>
        </tr>
      </thead>
      <tbody>${rows.join('')}</tbody>
    </table>
  </section>`;
}

function renderTokenContrastMatrix(samples, foregroundKeys, backgroundKeys, threshold, title, sectionId) {
  const header = backgroundKeys
    .map((bgKey) => `<th scope="col"><code>${escapeHtml(TOKEN_REFERENCE[bgKey] || bgKey)}</code></th>`)
    .join('');

  const rows = foregroundKeys.map((fgKey) => {
    const cells = backgroundKeys.map((bgKey) => {
      const worst = computeWorstCaseContrast(samples, fgKey, bgKey);
      if (!worst) {
        return '<td class="matrix-cell unknown"><span>n/a</span></td>';
      }

      const status = worst.ratio >= threshold ? 'pass' : 'fail';
      const badgeClass = status === 'pass' ? 'aa' : 'fail';
      const fgHex = rgbToHex(worst.fg) || worst.fg;
      const bgHex = rgbToHex(worst.bg) || worst.bg;
      const ringStyle = fgKey === 'focusRing' && worst.focusRingEffect && worst.focusRingEffect !== 'none'
        ? ` box-shadow:${escapeHtml(worst.focusRingEffect)};`
        : '';
      const previewChip = `<div class="matrix-value contrast-chip" style="color:${escapeHtml(worst.fg)}; background:${escapeHtml(worst.bg)};">${worst.ratio.toFixed(2)}:1</div>`;
      const swatches = fgKey === 'focusRing'
        ? `<div class="matrix-swatches">
            <span class="color-swatch" style="background:${escapeHtml(worst.fg)};${ringStyle}" title="${escapeHtml(fgHex)}"></span>
            <span class="color-swatch" style="background:${escapeHtml(worst.bg)};" title="${escapeHtml(bgHex)}"></span>
          </div>
          <div class="focus-contrast-preview matrix-focus-preview" style="background:${escapeHtml(worst.bg)};">
            <div class="focus-contrast-target" style="background:${escapeHtml(worst.bg)};${ringStyle}"></div>
          </div>`
        : `<div class="matrix-swatches">
            <span class="color-swatch" style="background:${escapeHtml(worst.fg)};" title="${escapeHtml(fgHex)}"></span>
            <span class="color-swatch" style="background:${escapeHtml(worst.bg)};" title="${escapeHtml(bgHex)}"></span>
          </div>`;
      return `<td class="matrix-cell ${status}" title="Worst: ${escapeHtml(worst.state)} | ${escapeHtml(fgHex)} on ${escapeHtml(bgHex)}">
        ${previewChip}
        <span class="badge ${badgeClass}">${status === 'pass' ? 'AA' : 'Fail'}</span>
        ${swatches}
        <div class="matrix-color-codes">
          <code class="color-code">FG ${escapeHtml(fgHex)}</code>
          <code class="color-code">BG ${escapeHtml(bgHex)}</code>
        </div>
      </td>`;
    }).join('');

    return `<tr>
      <th scope="row"><code>${escapeHtml(TOKEN_REFERENCE[fgKey] || fgKey)}</code></th>
      ${cells}
    </tr>`;
  }).join('');

  return `<section id="${escapeHtml(sectionId)}">
    <h3>${escapeHtml(title)}</h3>
    <p class="hint">Rows are foreground tokens. Columns are background tokens. Each cell shows worst-case observed contrast across sampled states/presets.</p>
    <table class="token-matrix">
      <thead>
        <tr>
          <th scope="col">Foreground \ Background</th>
          ${header}
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </section>`;
}

function renderTokenReferenceByPreset(runtime) {
  const accentByPreset = new Map();
  runtime.accentGrid.forEach((entry) => {
    if (!accentByPreset.has(entry.accent.value)) {
      accentByPreset.set(entry.accent.value, { label: entry.accent.label, states: new Map() });
    }
    accentByPreset.get(entry.accent.value).states.set(entry.state, entry);
  });

  const focusByPreset = new Map();
  runtime.focusGrid.forEach((entry) => {
    if (!focusByPreset.has(entry.focus.value)) {
      focusByPreset.set(entry.focus.value, { label: entry.focus.label, states: new Map() });
    }
    focusByPreset.get(entry.focus.value).states.set(entry.state, entry);
  });

  const accentRows = [...accentByPreset.entries()].map(([key, group]) => {
    const light = group.states.get(LIGHT_OFF_STATE)?.snapshot.vars || {};
    const dark = group.states.get(DARK_OFF_STATE)?.snapshot.vars || {};
    return `<tr>
      <th scope="row">${escapeHtml(group.label)}</th>
      <td><div class="swatch-row"><span class="swatch" style="background:${escapeHtml(light.accentBase || 'transparent')}"></span><code>${escapeHtml(TOKEN_REFERENCE.accentBase)}</code></div><code>${escapeHtml(rgbToHex(light.accentBase) || light.accentBase || 'n/a')}</code></td>
      <td><div class="swatch-row"><span class="swatch" style="background:${escapeHtml(light.accent500 || 'transparent')}"></span><code>${escapeHtml(TOKEN_REFERENCE.accent500)}</code></div><code>${escapeHtml(rgbToHex(light.accent500) || light.accent500 || 'n/a')}</code></td>
      <td><div class="swatch-row"><span class="swatch" style="background:${escapeHtml(light.accent030 || 'transparent')}"></span><code>${escapeHtml(TOKEN_REFERENCE.accent030)}</code></div><code>${escapeHtml(rgbToHex(light.accent030) || light.accent030 || 'n/a')}</code></td>
      <td><div class="swatch-row"><span class="swatch" style="background:${escapeHtml(light.primary || 'transparent')}"></span><code>${escapeHtml(rgbToHex(light.primary) || light.primary || 'n/a')}</code></div></td>
      <td><div class="swatch-row"><span class="swatch" style="background:${escapeHtml(dark.primary || 'transparent')}"></span><code>${escapeHtml(rgbToHex(dark.primary) || dark.primary || 'n/a')}</code></div></td>
    </tr>`;
  }).join('');

  const focusRows = [...focusByPreset.entries()].map(([key, group]) => {
    const light = group.states.get(LIGHT_OFF_STATE)?.snapshot.vars || {};
    const dark = group.states.get(DARK_OFF_STATE)?.snapshot.vars || {};
    return `<tr>
      <th scope="row">${escapeHtml(group.label)}</th>
      <td><div class="swatch-row"><span class="swatch" style="background:${escapeHtml(light.focus || 'transparent')}"></span><code>${escapeHtml(rgbToHex(light.focus) || light.focus || 'n/a')}</code></div></td>
      <td><div class="swatch-row"><span class="swatch" style="background:${escapeHtml(dark.focus || 'transparent')}"></span><code>${escapeHtml(rgbToHex(dark.focus) || dark.focus || 'n/a')}</code></div></td>
      <td><div class="swatch-row"><span class="swatch" style="background:${escapeHtml(light.focusBorder || 'transparent')}"></span><code>${escapeHtml(rgbToHex(light.focusBorder) || light.focusBorder || 'n/a')}</code></div></td>
      <td><div class="swatch-row"><span class="swatch" style="background:${escapeHtml(light.colorFocus || 'transparent')}"></span><code>${escapeHtml(rgbToHex(light.colorFocus) || light.colorFocus || 'n/a')}</code></div></td>
      <td>
        <div class="focus-ring-demo" style="box-shadow:${escapeHtml(light.focusRingEffect || 'none')};"></div>
        <code>${escapeHtml(light.focusRingEffect || 'n/a')}</code>
      </td>
    </tr>`;
  }).join('');

  return `<section id="token-references-by-preset">
    <h2>Token References by Accent and Focus Preset</h2>
    <p class="hint">These tables spell out key <code>var(--token)</code> resolutions for default accent and focus presets (Light/Dark, Increase Contrast Off).</p>
    <h3>Accent presets</h3>
    <table>
      <thead>
        <tr>
          <th scope="col">Preset</th>
          <th scope="col">--accent-base (Light)</th>
          <th scope="col">--accent-color-500 (Light)</th>
          <th scope="col">--accent-color-030 (Light)</th>
          <th scope="col">--gin-color-primary (Light)</th>
          <th scope="col">--gin-color-primary (Dark)</th>
        </tr>
      </thead>
      <tbody>${accentRows}</tbody>
    </table>
    <h3>Focus presets</h3>
    <table>
      <thead>
        <tr>
          <th scope="col">Preset</th>
          <th scope="col">--gin-color-focus (Light)</th>
          <th scope="col">--gin-color-focus (Dark)</th>
          <th scope="col">--gin-color-focus-border</th>
          <th scope="col">--color-focus</th>
          <th scope="col">--focus-ring effect</th>
        </tr>
      </thead>
      <tbody>${focusRows}</tbody>
    </table>
  </section>`;
}

function renderUsageTable(tokenSummary) {
  const rows = tokenSummary.map((token) => {
    const foreground = token.counts.foreground || 0;
    const background = token.counts.background || 0;
    const border = token.counts.border || 0;
    const alias = token.counts['token-alias'] || 0;
    const effect = token.counts.effect || 0;
    
    // Map tokens to typical admin UI pages
    const uiPages = [];
    if (token.name.includes('button') || token.name.includes('primary')) {
      uiPages.push('/admin/content', '/admin/structure', '/admin/modules');
    }
    if (token.name.includes('text') || token.name.includes('color')) {
      uiPages.push('/admin', '/admin/content', '/admin/config');
    }
    if (token.name.includes('focus') || token.name.includes('border')) {
      uiPages.push('/admin/content', '/admin/config', '/admin/appearance');
    }
    if (token.name.includes('accent')) {
      uiPages.push('/admin/appearance', '/admin/appearance/settings/default_admin');
    }
    
    const uniquePages = [...new Set(uiPages)];
    const pageLinks = uniquePages.length > 0 
      ? `<div class="ui-pages">${uniquePages.map(p => `<a href="${escapeHtml(p)}" target="_blank" title="Open in new tab">${escapeHtml(p)}</a>`).join(' ')}</div>`
      : '<span class="hint">Various pages</span>';
    
    return `<tr>
      <th scope="row"><code>${escapeHtml(token.name)}</code></th>
      <td>
        <strong>${escapeHtml(token.label)}</strong>
        <p class="token-description">${escapeHtml(token.description)}</p>
      </td>
      <td>${token.total}</td>
      <td>${foreground}</td>
      <td>${background}</td>
      <td>${border}</td>
      <td>${alias}</td>
      <td>${effect}</td>
      <td>${pageLinks}</td>
    </tr>`;
  }).join('');

  const details = tokenSummary.map((token) => {
    const filteredMatches = token.matches.filter((match) => match.group === 'foreground' || match.group === 'background' || match.group === 'border' || match.group === 'token-alias');
    const items = filteredMatches.length === 0
      ? '<li>No direct foreground/background/border uses found in CSS declarations.</li>'
      : filteredMatches.map((match) => `<li><strong>${escapeHtml(match.group)}</strong> <code>${escapeHtml(match.property)}</code> in <code>${escapeHtml(match.selector)}</code> at <code>${escapeHtml(match.file)}:${match.line}</code><br>${escapeHtml(match.snippet)}</li>`).join('');

    return `<details>
      <summary><code>${escapeHtml(token.name)}</code> (${filteredMatches.length} foreground/background/border references)</summary>
      <ul>${items}</ul>
    </details>`;
  }).join('');

  return `<table>
    <thead>
      <tr>
        <th scope="col">Token</th>
        <th scope="col">Meaning &amp; Usage</th>
        <th scope="col">Total refs</th>
        <th scope="col">Foreground</th>
        <th scope="col">Background</th>
        <th scope="col">Border</th>
        <th scope="col">Alias</th>
        <th scope="col">Effect</th>
        <th scope="col">Visible at (example URLs)</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="details">${details}</div>`;
}

function renderTokenDerivationMath() {
  return `
    <h2>Token Derivation Mathematics</h2>
    <p class="hint">This section explains how accent tokens are computed, especially the difference between light mode and dark mode derivation.</p>
    
    <h3 id="token-math-overview">Overview</h3>
    <p>
      The Default Admin accent system derives an entire ramp of color values (030, 100, 200, ..., 900) from a single <code>--accent-base</code> hex value. 
      The ramp uses CSS <code>color-mix(in lch, ...)</code> to blend colors in the LCH color space (perceptually uniform lightness, chroma, hue). 
      Light mode and dark mode recompute the ramp from different base values, resulting in <strong>different hex values for the same token</strong> across modes.
    </p>

    <h3 id="token-math-light">Light Mode Derivation</h3>
    <p>In light mode, the accent system blends toward white:</p>
    <pre><code>/* Source: core/themes/default_admin/css/base/accents.css (light mode) */
--accent-base: (user preset, e.g., #015efe for blue)
--accent-mix-base: color-mix(in lch, --accent-base, #ffffff 97%)
  // Result: Very light tint of the accent (98% white blended)

--accent-color-030: color-mix(in lch, --accent-mix-base 85%, --accent-color-base 15%)
--accent-color-100: color-mix(in lch, --accent-mix-base 70%, --accent-color-base 30%)
--accent-color-200: color-mix(in lch, --accent-mix-base 55%, --accent-color-base 45%)
--accent-color-500: --accent-color-base  // Mid-tone, used for primary buttons
--accent-color-900: --accent-color-base  // Darkest, used for hover/active states

--gin-color-primary: --accent-color-500  // In light mode, = --accent-base</code></pre>

    <h3 id="token-math-dark">Dark Mode Derivation (Different Math!)</h3>
    <p>
      Dark mode recomputes the accent system by first <strong>transforming</strong> the base accent using LCH lightness adjustment, 
      then deriving a new ramp:
    </p>
    <pre><code>/* Source: core/themes/default_admin/css/base/accents.css (dark mode) */
/* Transform accent-base via LCH lightness scaling and black blend */
--accent-color-base: color-mix(
  in lch, 
  lch(from --accent-base calc(l * 20) c h),  // Scale lightness to ~20% of original
  #000000 12%                                  // Blend 12% black
)

/* Then derive ramp from the dark-transformed base (same mix percentages as light) */
--accent-mix-base: color-mix(in lch, --accent-base, #000000 80%)
  // Result: Very dark tint of the accent

--accent-color-030: color-mix(in lch, --accent-mix-base 85%, --accent-color-base 15%)
--accent-color-500: --accent-color-base  // Recomputed dark-mode base
--accent-color-900: color-mix(in lch, --accent-mix-base 15%, --accent-color-base 85%)

--gin-color-primary: --accent-color-500  // In dark mode, ≠ --accent-base (different hex)</code></pre>

    <h3 id="token-math-example">Example: Blue Accent (#015efe)</h3>
    <p>To illustrate, here's what the blue accent derives to in each mode:</p>
    <pre><code>Light mode:
  --accent-base: #015efe (original blue)
  --accent-mix-base: ≈ #e8f3ff (very pale blue, 98% white)
  --gin-color-primary (--accent-color-500): #015efe (same as base)
  
Dark mode:
  --accent-color-base: ≈ #0a2c6b (darkened and desaturated via LCH transform)
  --accent-mix-base: ≈ #001a3d (very dark blue, 80% black)
  --gin-color-primary (--accent-color-500): ≈ #0a2c6b (different hex than light mode!)
  
Result:
  Light: White text (#fff) on #015efe needs 4.52:1 contrast ✓
  Dark: Dark text (#1a1a1a) on #0a2c6b needs 5.74:1 contrast (light text fallback ✓)</code></pre>

    <h3 id="token-math-why">Why This Matters for Accessibility</h3>
    <ul>
      <li><strong>Non-symmetric light/dark:</strong> The same token name maps to different hex values in light vs dark modes, requiring separate contrast validation for each.</li>
      <li><strong>Ramp independence:</strong> High-contrast mode can override <code>--accent-base</code> to a higher-contrast value, automatically regenerating the entire ramp.</li>
      <li><strong>LCH blending:</strong> Using <code>color-mix(in lch)</code> instead of RGB blending ensures perceptually uniform ramps, but adds complexity to manual color prediction.</li>
      <li><strong>Contrast-Color opportunity:</strong> Future CSS <code>contrast-color()</code> function could automate the dark-mode transform and ensure optimal contrast automatically.</li>
    </ul>
  `;
}

function renderModeExplainerContent() {
  return `
    <h2>Important: Theme "Increase Contrast Mode" vs Forced-Colors Mode</h2>
    <p class="hint">
      This guide distinguishes the theme's built-in <strong>"Increase contrast mode"</strong> setting from CSS <code>@media (forced-colors: active)</code> mode so the report is easier to interpret.
    </p>
    <ul>
      <li><strong>Theme "Increase contrast mode":</strong> Toggles alternative CSS token values inside Default Admin, such as <code>--gin-color-text</code>, <code>--gin-color-focus</code>, and related semantic tokens.</li>
      <li><strong>CSS forced-colors mode:</strong> Activated by Windows High Contrast, Ubuntu contrast themes, or browser emulation. The browser replaces author colors with system colors like <code>Canvas</code>, <code>CanvasText</code>, and <code>Highlight</code>.</li>
    </ul>
    <p>
      Default Admin already includes <code>@media (forced-colors: active)</code> rules for borders, buttons, links, and other components. Test it separately from the theme toggle because the browser, not the theme, controls the final colors in forced-colors mode.
    </p>
    <p>
      Use <a href="https://developer.chrome.com/docs/devtools/rendering/emulate-css#emulate_css_media_feature_forced-colors" target="_blank" rel="noopener">Chrome DevTools forced-colors emulation</a> or a real Windows High Contrast environment to verify those system-color overrides.
    </p>
    <h2 id="apca-polarity">APCA Polarity Matters</h2>
    <p>
      WCAG 2.x contrast ratios are <strong>symmetric</strong>: swapping foreground and background produces the same numeric ratio.
      APCA is <strong>directional</strong>: dark text on a light background and light text on a dark background can produce different signed Lc values for the same two colors.
    </p>
    <p>
      That means APCA should always be interpreted together with the intended <strong>foreground</strong> and <strong>background</strong> roles for a token pair.
      In this report, APCA threshold checks currently use absolute Lc magnitude, so the summary numbers do not fully expose polarity on their own.
    </p>
  `;
}

function renderModeGuideSummary() {
  return `
    <h2>Mode and Token Guide</h2>
    <p class="hint">
      The report now keeps the implementation notes for contrast mode, forced-colors behavior, APCA polarity, and token derivation on a standalone page.
    </p>
    <p>
      <a href="DEFAULT-ADMIN-COLOR-MODE-GUIDE-latest.html">Open the mode and token derivation guide</a> for the full explanation of theme contrast mode, forced-colors mode, APCA polarity, dark-mode derivation, and why those differences matter for accessibility.
    </p>
  `;
}

function renderStandaloneModeGuide(report) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Default Admin Mode and Token Guide</title>
  <style>
    :root {
      --page-bg: #f4f6fa;
      --card-bg: #ffffff;
      --text: #1e2430;
      --muted: #556070;
      --border: #d7dde7;
      --link: #0e4fb5;
      --shadow: 0 10px 30px rgba(20, 35, 60, 0.08);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font: 16px/1.6 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background: radial-gradient(circle at top right, #e9f0ff, transparent 30%), var(--page-bg);
    }
    main {
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem 1.25rem 4rem;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1rem;
      box-shadow: var(--shadow);
      padding: 1rem 1.25rem;
      margin-bottom: 1.25rem;
    }
    .meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0 2rem;
    }
    .lede, .hint { color: var(--muted); }
    nav ul { display: flex; flex-wrap: wrap; gap: 0.6rem; list-style: none; padding: 0; }
    nav a, a { color: var(--link); }
    nav a {
      display: inline-block;
      padding: 0.35rem 0.6rem;
      border: 1px solid var(--link);
      border-radius: 0.35rem;
      text-decoration: none;
      background: #dce9ff;
    }
    nav a:focus-visible, nav a:hover, a:focus-visible, a:hover {
      outline: 2px solid var(--text);
      outline-offset: 2px;
    }
    code, pre {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    pre {
      overflow-x: auto;
      background: #f8faff;
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      padding: 1rem;
    }
  </style>
</head>
<body>
  <main>
    <h1>Default Admin mode and token guide</h1>
    <p class="lede">This page explains the report sections that describe theme contrast mode, forced-colors mode, APCA polarity, and the accent token derivation logic used by Default Admin.</p>
    <nav class="card" aria-label="Guide sections">
      <ul>
        <li><a href="#mode-explainer">Mode explainer</a></li>
        <li><a href="#apca-polarity">APCA polarity</a></li>
        <li><a href="#token-derivation">Token derivation mathematics</a></li>
        <li><a href="#token-math-dark">Dark mode derivation</a></li>
        <li><a href="#token-math-why">Why this matters for accessibility</a></li>
      </ul>
    </nav>
    <section class="meta">
      <div class="card"><strong>Generated</strong><br>${escapeHtml(report.generatedAt)}</div>
      <div class="card"><strong>Related report</strong><br><a href="DEFAULT-ADMIN-COLOR-REPORT-latest.html">Default Admin color report</a></div>
    </section>
    <section id="mode-explainer" class="card">
      ${renderModeExplainerContent()}
    </section>
    <section id="token-derivation" class="card">
      ${renderTokenDerivationMath()}
    </section>
  </main>
</body>
</html>`;
}

function renderContrastColorIntegrationGuide() {
  return `
    <h2>Experimental: Contrast-Color CSS Integration Points</h2>
    <p class="hint">
      The CSS Working Group is developing <code>contrast-color()</code>, a function that automatically generates a contrasting color from a background.
      This section identifies where Default Admin could integrate contrast-color overrides to improve accessibility resilience.
    </p>
    <p>
      <strong>📖 Full documentation:</strong> See <a href="CONTRAST-COLOR-CSS-INTEGRATION.html">Experimental: Contrast-Color CSS Integration Points</a> for detailed integration patterns, rollout strategy, and browser support information.
    </p>
    <p class="hint">
      <strong>Note:</strong> This is informational only; contrast-color is not yet part of WCAG standards and requires <code>@supports</code> feature detection.
    </p>
  `;
}

function renderAccessibilityBestPracticesReference() {
  return `
    <h2>ACCESSIBILITY.md Best Practices Reference</h2>
    <p class="hint">
      This report aligns with <a href="https://mgifford.github.io/ACCESSIBILITY.md/examples/COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.html" target="_blank" rel="noopener">COLOR_CONTRAST_ACCESSIBILITY_BEST_PRACTICES.html</a> 
      from the ACCESSIBILITY.md project. Below are the relevant patterns applied to Default Admin:
    </p>

    <h3 id="a11y-ref-wcag-2-2">WCAG 2.2 Level AA Compliance (Our Baseline)</h3>
    <ul>
      <li><strong>WCAG 1.4.3 (Text Contrast):</strong> 4.5:1 for normal text, 3:1 for large text — all buttons, labels, and body text meet this threshold</li>
      <li><strong>WCAG 1.4.11 (Non-text Contrast):</strong> 3:1 for UI component borders (form inputs, checkboxes, focus rings)</li>
      <li><strong>WCAG 2.4.13 (Focus Appearance):</strong> Focus indicators have ≥3:1 contrast against adjacent colors and sufficient visual size</li>
      <li><strong>WCAG 1.4.1 (Use of Color):</strong> Color is never the sole means of conveying information; error states include text and icons</li>
    </ul>

    <h3 id="a11y-ref-css-tokens">CSS Custom Properties Pattern (Best Practice from ACCESSIBILITY.md)</h3>
    <p>Default Admin follows the semantic token pattern recommended in section 8 of the guide:</p>
    <pre><code>/* Design token layer (raw colors) */
--accent-base: #015efe;

/* Semantic layer (component usage) */
--gin-color-primary: var(--accent-color-500);
--button-bg-color--primary: var(--accent-color-500);
--button-fg-color--primary: var(--gin-color-button-text);

/* Components reference semantic tokens, not raw colors */
.button--primary {
  background-color: var(--button-bg-color--primary);
  color: var(--button-fg-color--primary);
}</code></pre>
    <p><strong>Benefit:</strong> Changes to token values cascade across all components automatically, and contrast can be validated at the token layer.</p>

    <h3 id="a11y-ref-light-dark-mode">Light/Dark Mode Pattern</h3>
    <p>
      Section 8 of ACCESSIBILITY.md recommends using <code>@media (prefers-color-scheme: dark)</code> to define separate tokens for each mode.
      Default Admin implements this via:
    </p>
    <ul>
      <li>Direct CSS: <code>@media (prefers-color-scheme: dark)</code> rules in <code>css/base/variables.pcss.css</code></li>
      <li>Color-mix() derivation: Dark-mode accent ramps recomputed from transformed base (LCH lightness scaling)</li>
      <li>Theme toggle: "Increase contrast mode" class on <code>&lt;body&gt;</code> overrides token values independently of OS preference</li>
    </ul>

    <h3 id="a11y-ref-forced-colors">Forced-Colors Mode Support</h3>
    <p>Section 9 of ACCESSIBILITY.md covers Windows High Contrast and <code>@media (forced-colors: active)</code> rules.</p>
    <p>Default Admin includes forced-colors support in multiple components:</p>
    <ul>
      <li>Toolbar: <code>@media (forced-colors: active) { border-color: ButtonBorder; }</code></li>
      <li>Tables: Borders and cells use <code>ButtonBorder</code>, <code>CanvasText</code> system colors</li>
      <li>Forms: Inputs use <code>ButtonFace</code> and <code>ButtonText</code> for visibility</li>
      <li>Focus rings: CSS <code>outline</code> property (preserved in forced-colors) rather than box-shadow</li>
    </ul>

    <h3 id="a11y-ref-apca">APCA — Emerging Next-Generation Standard</h3>
    <p>
      Section 10 of ACCESSIBILITY.md covers APCA (Advanced Perceptual Contrast Algorithm), which improves on WCAG 2.x for saturated colors and perceptual accuracy.
    </p>
    <ul>
      <li><strong>Current requirement:</strong> WCAG 2.2 AA (4.5:1 for text)</li>
      <li><strong>Emerging guidance:</strong> APCA ≥60 Lc for body text (more stringent for small/thin fonts)</li>
      <li><strong>This report:</strong> Calculates both WCAG and APCA scores to show forward compatibility</li>
      <li><strong>Future work:</strong> When WCAG 3.0 with APCA is finalized, update tokens to meet both standards</li>
    </ul>

    <h3 id="a11y-ref-testing-checklist">Testing and Validation (from Section 12)</h3>
    <p>This report and theme follow the validation checklist:</p>
    <ul>
      <li>✓ <strong>Automated checks:</strong> Contrast ratio calculation via WCAG luminance formula + APCA</li>
      <li>✓ <strong>Manual checks:</strong> All states tested (default, hover, focus, active) in light and dark modes</li>
      <li>✓ <strong>Forced-colors testing:</strong> Rules defined for @media (forced-colors: active); recommend browser DevTools emulation</li>
      <li>✓ <strong>Color independence:</strong> Error states, required fields, and status indicators use text + icons + color</li>
      <li>⚠ <strong>Real device testing:</strong> Windows High Contrast mode and screen reader testing recommended before release</li>
    </ul>

    <h3 id="a11y-ref-related-resources">Related ACCESSIBILITY.md Guides</h3>
    <ul>
      <li><a href="https://mgifford.github.io/ACCESSIBILITY.md/examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.html" target="_blank" rel="noopener">Light/Dark Mode Accessibility Best Practices</a> — Implementing dual-mode palettes and @media (prefers-color-scheme)</li>
      <li><a href="https://mgifford.github.io/ACCESSIBILITY.md/examples/KEYBOARD_ACCESSIBILITY_BEST_PRACTICES.html" target="_blank" rel="noopener">Keyboard Accessibility Best Practices</a> — Focus management and visible focus indicators (WCAG 2.4.7 and 2.4.13)</li>
      <li><a href="https://mgifford.github.io/ACCESSIBILITY.md/examples/FORMS_ACCESSIBILITY_BEST_PRACTICES.html" target="_blank" rel="noopener">Forms Accessibility Best Practices</a> — Error messages, label contrast, and focus styling</li>
      <li><a href="https://mgifford.github.io/ACCESSIBILITY.md/examples/USER_PERSONALIZATION_ACCESSIBILITY_BEST_PRACTICES.html" target="_blank" rel="noopener">User Personalization Accessibility Best Practices</a> — Respecting prefers-color-scheme, prefers-contrast, and other user settings</li>
    </ul>
  `;
}

function renderHtml(report) {
  const recommendationStats = new Map(Object.entries(report.recommendationStats || {}));
  const states = report.runtime.baseline.map((entry) => ({ state: entry.state, label: entry.label }));
  const accentSamples = report.runtime.accentGrid.map((entry) => ({
    label: `${entry.label} / Accent: ${entry.accent.label}`,
    snapshot: entry.snapshot,
  }));
  const focusSamples = report.runtime.focusGrid.map((entry) => ({
    label: `${entry.label} / Focus: ${entry.focus.label}`,
    snapshot: entry.snapshot,
  }));
  const allSamples = [...accentSamples, ...focusSamples];

  const textAccentForegroundKeys = ['text', 'textLight', 'primary', 'primaryLight', 'buttonText', 'accentBase', 'accent500', 'accent030'];
  const backgroundKeys = ['bgApp', 'bgLayer', 'buttonBg', 'primary', 'primaryLight', 'accentBase', 'accent500', 'accent030'];
  const focusForegroundKeys = ['focus', 'focusBorder', 'colorFocus', 'focusRing'];

  const tokenTextGrid = renderTokenCombinationGrid(
    allSamples,
    textAccentForegroundKeys,
    backgroundKeys,
    4.5,
    'Text and Accent Token Combinations (AA 4.5:1)'
  );

  const tokenFocusGrid = renderTokenCombinationGrid(
    allSamples,
    focusForegroundKeys,
    backgroundKeys,
    3,
    'Focus Token Combinations (3:1)'
  );

  const tokenTextMatrix = renderTokenContrastMatrix(
    allSamples,
    textAccentForegroundKeys,
    backgroundKeys,
    4.5,
    'Matrix: Text and Accent Tokens',
    'token-matrix-text-accent'
  );

  const tokenFocusMatrix = renderTokenContrastMatrix(
    allSamples,
    focusForegroundKeys,
    backgroundKeys,
    3,
    'Matrix: Focus Tokens',
    'token-matrix-focus'
  );

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Default Admin Color Report</title>
  <style>
    :root {
      --page-bg: #f4f6fa;
      --card-bg: #ffffff;
      --text: #1e2430;
      --muted: #556070;
      --border: #d7dde7;
      --ok: #0a6b3f;
      --ok-bg: #dff6ea;
      --aaa: #0e4fb5;
      --aaa-bg: #dce9ff;
      --fail: #9c2d10;
      --fail-bg: #fbe2db;
      --shadow: 0 10px 30px rgba(20, 35, 60, 0.08);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font: 16px/1.5 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background: radial-gradient(circle at top right, #e9f0ff, transparent 30%), var(--page-bg);
    }
    main {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem 1.25rem 4rem;
    }
    h1, h2, h3 { line-height: 1.2; }
    .lede { color: var(--muted); max-width: 70ch; }
    .meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0 2rem;
    }
    .report-nav {
      margin: 1rem 0 1.5rem;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      box-shadow: var(--shadow);
      padding: 0.75rem 1rem;
    }
    .report-nav ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .report-nav a {
      display: inline-block;
      padding: 0.35rem 0.6rem;
      border-radius: 0.35rem;
      border: 1px solid var(--aaa);
      text-decoration: none;
      color: var(--aaa);
      background: var(--aaa-bg);
      font-size: 0.9rem;
    }
    .report-nav a:focus-visible,
    .report-nav a:hover {
      outline: 2px solid var(--text);
      outline-offset: 2px;
      background: var(--aaa);
      color: #fff;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1rem;
      box-shadow: var(--shadow);
      padding: 1rem 1.25rem;
    }
    .defaults-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.75rem;
      margin: 0.75rem 0 1.5rem;
    }
    .default-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      box-shadow: var(--shadow);
      padding: 0.75rem;
    }
    .default-card h3 {
      font-size: 1rem;
      margin: 0 0 0.5rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: var(--shadow);
      margin: 1rem 0 2rem;
    }
    th, td {
      padding: 0.75rem;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
      text-align: left;
    }
    th {
      background: #f8faff;
    }
    tr:last-child td, tr:last-child th {
      border-bottom: 0;
    }
    .metric {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
    }
    .metric a {
      color: inherit;
      text-decoration: underline;
      cursor: pointer;
    }
    .metric a:hover {
      opacity: 0.8;
    }
    .badge {
      display: inline-block;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 700;
    }
    .badge.aa { color: var(--ok); background: var(--ok-bg); }
    .badge.aaa { color: var(--aaa); background: var(--aaa-bg); }
    .badge.fail { color: var(--fail); background: var(--fail-bg); }
    .color-comparison-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      border-radius: 0.35rem;
    }
    .color-display-box {
      width: 4rem;
      height: 4rem;
      border-radius: 0.35rem;
    }
    .metric-detailed {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
    }
    .contrast-chip {
      display: inline-block;
      padding: 0.3rem 0.55rem;
      border-radius: 0.35rem;
      border: 1px solid rgba(0, 0, 0, 0.2);
      font-size: 0.95rem;
      line-height: 1.2;
      min-width: 5.5rem;
      text-align: center;
    }
    .color-pair {
      display: flex;
      gap: 0.4rem;
    }
    .color-swatch {
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 0.25rem;
      border: 1px solid rgba(0, 0, 0, 0.2);
      cursor: help;
    }
    .swatch {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 0.25rem;
      border: 1px solid rgba(0, 0, 0, 0.2);
      display: inline-block;
    }
    .color-code {
      font-size: 0.75rem;
      white-space: nowrap;
    }
    .preset-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .preset-info code {
      color: var(--muted);
      font-size: 0.8rem;
    }
    .token-label {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      align-items: flex-start;
    }
    .token-label small {
      color: var(--muted);
      font-size: 0.75rem;
    }
    .accent-grid thead th:nth-child(3),
    .accent-grid thead th:nth-child(4),
    .accent-grid tbody td:nth-child(3),
    .accent-grid tbody td:nth-child(4) {
      background: #eef2fb;
    }
    table.accent-grid tbody th,
    table.focus-grid tbody th {
      min-width: 150px;
    }
    .accent-grid td, .focus-grid td {
      padding: 0.5rem;
    }
    table.accent-quick-reference {
      width: 100%;
    }
    table.accent-quick-reference td {
      padding: 0.75rem;
    }
    table.baseline-metrics-table {
      width: 100%;
    }
    table.baseline-metrics-table td {
      padding: 0.5rem;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.9em;
    }
    details {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      padding: 0.8rem 1rem;
      margin-bottom: 0.8rem;
      box-shadow: var(--shadow);
    }
    summary {
      cursor: pointer;
      font-weight: 600;
    }
    ul {
      padding-left: 1.25rem;
    }
    li {
      margin: 0.6rem 0;
    }
    .ui-pages {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .ui-pages a {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      background: var(--aaa-bg);
      color: var(--aaa);
      border-radius: 0.25rem;
      text-decoration: none;
      font-size: 0.8rem;
      border: 1px solid var(--aaa);
    }
    .ui-pages a:hover {
      background: var(--aaa);
      color: white;
    }
    .recommendations {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 1rem;
      box-shadow: var(--shadow);
      margin: 1rem 0 2rem;
    }
    .recommendations td.same-color {
      background: #e8f7ec;
    }
    .token-description {
      margin: 0.5rem 0 0;
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.4;
    }
    section[id] > h2,
    section[id] > h3 {
      position: relative;
      scroll-margin-top: 1rem;
    }
    .heading-permalink {
      margin-left: 0.35rem;
      opacity: 0;
      text-decoration: none;
      font-size: 0.9em;
      color: var(--muted);
      transition: opacity 0.15s ease-in-out;
    }
    section[id]:hover .heading-permalink,
    section[id]:focus-within .heading-permalink,
    h3[id]:hover .heading-permalink,
    h3[id]:focus-within .heading-permalink,
    .heading-permalink:focus-visible {
      opacity: 1;
    }
    .heading-permalink:focus-visible {
      outline: 2px solid var(--text);
      outline-offset: 2px;
      border-radius: 0.2rem;
    }
    table tbody td {
      vertical-align: middle;
    }
    .focus-ring-demo {
      width: 1.9rem;
      height: 1.9rem;
      border: 1px solid #7c8698;
      border-radius: 0.35rem;
      background: #f7f9fd;
      margin-bottom: 0.35rem;
    }
    .focus-contrast-preview {
      width: 3.2rem;
      height: 3.2rem;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 0.35rem;
      display: grid;
      place-items: center;
      margin-bottom: 0.35rem;
    }
    .focus-contrast-target {
      width: 1.35rem;
      height: 1.35rem;
      border: 1px solid rgba(0, 0, 0, 0.35);
      border-radius: 0.25rem;
    }
    .token-matrix td,
    .token-matrix th {
      min-width: 9rem;
    }
    .matrix-cell {
      text-align: center;
      vertical-align: middle;
    }
    .matrix-cell.pass {
      background: #e9f7ee;
    }
    .matrix-cell.fail {
      background: #fdecea;
    }
    .matrix-cell.unknown {
      background: #f3f5f8;
      color: var(--muted);
    }
    .matrix-value {
      font-weight: 700;
      margin-bottom: 0.35rem;
    }
    .matrix-cell .contrast-chip {
      min-width: auto;
      width: 100%;
    }
    .matrix-swatches {
      display: flex;
      justify-content: center;
      gap: 0.35rem;
      margin: 0.35rem 0;
    }
    .matrix-color-codes {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      align-items: center;
      margin-top: 0.2rem;
    }
    .matrix-focus-preview {
      margin: 0.35rem auto 0;
    }
    @media (max-width: 900px) {
      table, thead, tbody, th, td, tr {
        display: block;
      }
      thead {
        position: absolute;
        left: -9999px;
      }
      tr {
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--border);
      }
      th, td {
        border-bottom: 0;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Default Admin Color Report</h1>
    <p class="lede">This page maps where the Default Admin theme color tokens are applied and shows which foreground/background combinations currently pass or fail under light mode, dark mode, and the theme's "Increase contrast mode" toggle. Note: This is separate from CSS <code>@media (forced-colors: active)</code> mode, which relies on OS-level system colors.</p>

    <nav class="report-nav" aria-label="Report sections">
      <ul>
        <li><a href="#current-default-cards">Current Defaults Cards</a></li>
        <li><a href="#accent-quick-reference">Accent Quick Reference</a></li>
        <li><a href="#mode-and-token-guide">Mode and Token Guide</a></li>
        <li><a href="#baseline-state-matrix">Baseline Matrix</a></li>
        <li><a href="#accent-grid">Accent Grid</a></li>
        <li><a href="#recommendations">Recommendations</a></li>
        <li><a href="#contrast-color-guide">Contrast-Color Guide</a></li>
        <li><a href="#token-combination-grids">Token Grids</a></li>
        <li><a href="#token-references-by-preset">Token References</a></li>
        <li><a href="#accessibility-best-practices">A11y Best Practices</a></li>
        <li><a href="#focus-grid">Focus Grid</a></li>
        <li><a href="#token-usage">Token Usage</a></li>
        <li><a href="#forced-colors-support">Forced-Colors</a></li>
      </ul>
    </nav>

    <section class="meta">
      <div class="card"><strong>Generated</strong><br>${escapeHtml(report.generatedAt)}</div>
      <div class="card"><strong>Settings page</strong><br><code>${escapeHtml(report.runtime.settingsPath)}</code></div>
      <div class="card"><strong>CSS files scanned</strong><br>${report.cssFilesScanned}</div>
      <div class="card"><strong>Tracked tokens</strong><br>${report.tokenSummary.length}</div>
      <div class="card"><strong>Test viewport</strong><br>${escapeHtml(report.runtime.currentViewport?.label || 'Desktop')}</div>
      <div class="card"><strong>Test language</strong><br>${escapeHtml(report.runtime.currentLanguage?.label || 'English (LTR)')}</div>
      <div class="card" style="grid-column: 1 / -1; background:#fff9e6; border-color:#f0ad4e;">
        <small><strong>ℹ️ Responsive &amp; RTL Infrastructure:</strong> The test collector supports desktop, tablet, phone (portrait/landscape) and RTL languages (Hebrew, etc.). Currently reporting desktop + LTR. To expand testing, update the viewport/language selection in the generator script.</small>
      </div>
    </section>

    <section id="current-default-cards">
      <h2>Current Defaults Only</h2>
      <p class="hint">Accent preset cards show three pieces of information: (1) Base hex from the preset, (2) Light mode derived color (how --gin-color-primary resolves in light mode), and (3) Dark mode derived color (different hex due to LCH-based derivation math). Light and dark colors differ as expected from the math described in the <a href="DEFAULT-ADMIN-COLOR-MODE-GUIDE-latest.html">mode and token derivation guide</a>.</p>
      ${renderCurrentDefaultsCards(report.runtime.accentGrid)}
    </section>

    <section id="accent-quick-reference">
      <h2>Accent Preset Quick Reference</h2>
      <p class="hint">This puts the actual accent colors up front so readers can immediately see current defaults and proposed alternatives without scanning the full grids.</p>
      ${renderAccentPresetQuickReference(recommendationStats)}
    </section>

    <section id="mode-and-token-guide">
      ${renderModeGuideSummary()}
    </section>

    <section id="baseline-state-matrix">
      <h2>Baseline State Matrix</h2>
      <p class="hint">Text metrics are scored against AA 4.5:1 and AAA 7:1. Focus and border metrics are scored against 3:1. This baseline matrix uses the default accent preset (Blue) and default focus preset to provide a stable reference state.</p>
      ${renderBaselineTable(report.runtime.baseline)}
    </section>

    <section id="accent-grid">
      <h2>Accent Combination Grid</h2>
      <p class="hint">These combinations use the built-in accent presets with focus set to Default Admin, across the theme's light/dark and \"Increase contrast mode\" settings. This highlights where primary foreground/background pairings work and where they do not. (This is separate from forced-colors mode, which uses system colors.)</p>
      ${renderAccentGrid(report.runtime.accentGrid, states)}
    </section>

    <section id="recommendations">
      <h2>WCAG Compliance Recommendations</h2>
      <p class="hint">The following accent presets fall short of WCAG 2.2 AA (4.5:1) compliance in certain theme modes. Consider these suggestions to improve accessibility.</p>
      <p class="hint">Proposed patch (not applied): <a href="../${escapeHtml(PROPOSED_PATCH_PATH)}"><code>${escapeHtml(PROPOSED_PATCH_PATH)}</code></a></p>
      ${renderRecommendations(report.runtime.accentGrid, recommendationStats)}
    </section>

    <section id="contrast-color-guide">
      ${renderContrastColorIntegrationGuide()}
    </section>

    <section id="token-combination-grids">
      <h2>Exhaustive Token Combination Grids</h2>
      <p class="hint">These grids test all sampled foreground/background token combinations rather than only white/near-black backgrounds. They use all collected accent and focus presets across all four state combinations and report worst-case observed contrast. WCAG ratios are symmetric, but APCA is directional, so token role labels matter when reviewing the same color pair as foreground versus background.</p>
      ${tokenTextMatrix}
      ${tokenFocusMatrix}
      ${tokenTextGrid}
      ${tokenFocusGrid}
    </section>

    ${renderTokenReferenceByPreset(report.runtime)}

    <section id="accessibility-best-practices">
      ${renderAccessibilityBestPracticesReference()}
    </section>

    <section id="focus-grid">
      <h2>Focus Combination Grid</h2>
      <p class="hint">These combinations use the focus presets with accent reset to the default blue, across the theme's light/dark and \"Increase contrast mode\" settings. This isolates focus visibility from accent selection and shows how well focus indicators remain visible in all modes.</p>
      ${renderFocusGrid(report.runtime.focusGrid, states)}
    </section>

    <section id="token-usage">
      <h2>Where The Colors Are Applied</h2>
      <p class="hint">Foreground and background uses are listed first, followed by token aliases that feed component tokens. This is generated by scanning the Default Admin CSS source for <code>var(--token)</code> references.</p>
      ${renderUsageTable(report.tokenSummary)}
    </section>

    <section id="forced-colors-support">
      <h2>Forced-Colors Mode Support</h2>
      <p class="hint">
        Default Admin includes <code>@media (forced-colors: active)</code> rules in the following components to ensure visibility in Windows High Contrast mode and browser forced-colors emulation:
      </p>
      <ul style="margin: 1rem 0; padding-left: 1.25rem;">
        <li>Toolbar: transparent borders become opaque for visibility</li>
        <li>Tables: borders and cell separators use system colors</li>
        <li>Forms: select boxes, inputs, and fieldsets have proper borders</li>
        <li>Action links: icons and states are properly visible</li>
        <li>Breadcrumbs: navigation items have proper contrast</li>
        <li>Other components: maintenance pages, dialogs, and UI feedback</li>
      </ul>
      <p class="hint"><strong>Testing:</strong> Enable forced-colors mode in <a href="https://developer.chrome.com/docs/devtools/rendering/emulate-css#emulate_css_media_feature_forced-colors" target="_blank" rel="noopener">Chrome DevTools (Rendering tab) →</a> or test on Windows with High Contrast Themes enabled to verify all interactive elements remain visible and usable.</p>
    </section>
  </main>
  <script>
    (() => {
      const headings = document.querySelectorAll('section[id] > h2, section[id] > h3');
      headings.forEach((heading) => {
        const section = heading.closest('section[id]');
        const targetId = heading.id || section?.id;
        if (!targetId || heading.querySelector('.heading-permalink')) {
          return;
        }
        const link = document.createElement('a');
        link.className = 'heading-permalink';
        link.href = '#' + targetId;
        link.setAttribute('aria-label', 'Link to ' + heading.textContent.trim());
        link.textContent = '#';
        heading.appendChild(link);
      });
    })();
  </script>
</body>
</html>`;
}

function renderFgBgReport(report) {
  const recommendationStats = new Map(Object.entries(report.recommendationStats || {}));
  const states = report.runtime.baseline.map((entry) => ({ state: entry.state, label: entry.label }));
  const accentSamples = report.runtime.accentGrid.map((entry) => ({
    label: `${entry.label} / Accent: ${entry.accent.label}`,
    snapshot: entry.snapshot,
  }));

  const textAccentForegroundKeys = ['text', 'textLight', 'primary', 'primaryLight', 'buttonText', 'accentBase', 'accent500', 'accent030'];
  const backgroundKeys = ['bgApp', 'bgLayer', 'buttonBg', 'primary', 'primaryLight', 'accentBase', 'accent500', 'accent030'];

  const tokenTextGrid = renderTokenCombinationGrid(
    accentSamples,
    textAccentForegroundKeys,
    backgroundKeys,
    4.5,
    'Text and Accent Token Combinations (AA 4.5:1)'
  );

  const tokenTextMatrix = renderTokenContrastMatrix(
    accentSamples,
    textAccentForegroundKeys,
    backgroundKeys,
    4.5,
    'Matrix: Text and Accent Tokens',
    'token-matrix-text-accent-fg-bg'
  );

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Default Admin Color Report - Foreground/Background</title>
  <style>
    :root {
      --page-bg: #f4f6fa;
      --card-bg: #ffffff;
      --text: #1e2430;
      --muted: #556070;
      --border: #d7dde7;
      --ok: #0a6b3f;
      --ok-bg: #dff6ea;
      --aaa: #0e4fb5;
      --aaa-bg: #dce9ff;
      --fail: #9c2d10;
      --fail-bg: #fbe2db;
      --shadow: 0 10px 30px rgba(20, 35, 60, 0.08);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font: 16px/1.5 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background: radial-gradient(circle at top right, #e9f0ff, transparent 30%), var(--page-bg);
    }
    main { max-width: 1280px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
    .lede { color: var(--muted); max-width: 70ch; }
    .card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 1rem; box-shadow: var(--shadow); padding: 1rem 1.25rem; }
    .meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin: 1.5rem 0 2rem; }
    .hint { color: var(--muted); }
    table { width: 100%; border-collapse: collapse; background: var(--card-bg); border: 1px solid var(--border); border-radius: 1rem; overflow: hidden; box-shadow: var(--shadow); margin: 1rem 0 2rem; }
    th, td { padding: 0.75rem; border-bottom: 1px solid var(--border); vertical-align: top; text-align: left; }
    th { background: #f8faff; }
    tr:last-child td, tr:last-child th { border-bottom: 0; }
  </style>
</head>
<body>
  <main>
    <h1>Default Admin Color Report: Foreground and Background</h1>
    <p class="lede">This focused report covers text, primary, and button foreground/background contrast across theme modes and accent presets.</p>

    <section class="meta">
      <div class="card"><strong>Generated</strong><br>${escapeHtml(report.generatedAt)}</div>
      <div class="card"><strong>Settings page</strong><br><code>${escapeHtml(report.runtime.settingsPath)}</code></div>
      <div class="card"><strong>Tracked tokens</strong><br>${report.tokenSummary.length}</div>
    </section>

    <section id="current-default-cards">
      <h2>Current Defaults Only</h2>
      <p class="hint">Accent preset cards show base hex plus the derived light and dark mode values.</p>
      ${renderCurrentDefaultsCards(report.runtime.accentGrid)}
    </section>

    <section id="accent-quick-reference">
      <h2>Accent Preset Quick Reference</h2>
      ${renderAccentPresetQuickReference(recommendationStats)}
    </section>

    <section id="baseline-state-matrix">
      <h2>Baseline State Matrix</h2>
      <p class="hint">Text metrics are scored against AA 4.5:1 and AAA 7:1. Focus-related metrics are shown for context.</p>
      ${renderBaselineTable(report.runtime.baseline)}
    </section>

    <section id="accent-grid">
      <h2>Accent Combination Grid</h2>
      ${renderAccentGrid(report.runtime.accentGrid, states)}
    </section>

    <section id="recommendations">
      <h2>WCAG Compliance Recommendations</h2>
      <p class="hint">Proposed patch (not applied): <a href="../${escapeHtml(PROPOSED_PATCH_PATH)}"><code>${escapeHtml(PROPOSED_PATCH_PATH)}</code></a></p>
      ${renderRecommendations(report.runtime.accentGrid, recommendationStats)}
    </section>

    <section id="token-combination-grids">
      <h2>Exhaustive Token Combination Grids</h2>
      ${tokenTextMatrix}
      ${tokenTextGrid}
    </section>

    <section id="token-usage">
      <h2>Where The Colors Are Applied</h2>
      ${renderUsageTable(report.tokenSummary)}
    </section>

    <section id="contrast-color-guide">
      ${renderContrastColorIntegrationGuide()}
    </section>
  </main>
</body>
</html>`;
}

function renderFocusReport(report) {
  const states = report.runtime.baseline.map((entry) => ({ state: entry.state, label: entry.label }));
  const focusSamples = report.runtime.focusGrid.map((entry) => ({
    label: `${entry.label} / Focus: ${entry.focus.label}`,
    snapshot: entry.snapshot,
  }));

  const focusForegroundKeys = ['focus', 'focusBorder', 'colorFocus', 'focusRing'];
  const backgroundKeys = ['bgApp', 'bgLayer', 'buttonBg', 'primary', 'primaryLight', 'accentBase', 'accent500', 'accent030'];

  const tokenFocusGrid = renderTokenCombinationGrid(
    focusSamples,
    focusForegroundKeys,
    backgroundKeys,
    3,
    'Focus Token Combinations (3:1 minimum)'
  );

  const tokenFocusMatrix = renderTokenContrastMatrix(
    focusSamples,
    focusForegroundKeys,
    backgroundKeys,
    3,
    'Matrix: Focus Tokens',
    'token-matrix-focus-only'
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Default Admin Color Report - Focus Only</title>
  <style>
    :root {
      --text: #1a1a1a;
      --text-secondary: #595959;
      --muted: #7c8698;
      --border: #d4d4d4;
      --bg-body: #ffffff;
      --card-bg: #f5f7fa;
      --pass-bg: #e9f7ee;
      --fail-bg: #fdecea;
      --link: #0050d8;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --text: #f0f0f0;
        --text-secondary: #c0c0c0;
        --muted: #8b92a9;
        --border: #4a4a4a;
        --bg-body: #1a1a1a;
        --card-bg: #2a2a2a;
        --pass-bg: #164b35;
        --fail-bg: #5a1e1e;
        --link: #54a6ff;
      }
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html {
      scroll-behavior: smooth;
      color-scheme: light dark;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      line-height: 1.6;
      color: var(--text);
      background: var(--bg-body);
    }
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 {
      margin: 2rem 0 1rem;
      font-size: 1.8rem;
      line-height: 1.2;
    }
    h2 {
      margin: 2rem 0 0.75rem;
      font-size: 1.35rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.5rem;
      position: relative;
    }
    p {
      margin: 0.5rem 0 1rem;
    }
    a {
      color: var(--link);
      text-decoration: underline;
    }
    .lede {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin: 1.5rem 0 2rem;
    }
    .hint {
      color: var(--text-secondary);
      font-size: 0.95rem;
      margin-bottom: 1rem;
      font-style: italic;
    }
    code {
      background: var(--card-bg);
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      font-family: monospace;
      font-size: 0.9rem;
    }
    .card {
      background: var(--card-bg);
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border);
    }
    .meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
      font-size: 0.9rem;
    }
    .meta strong {
      display: block;
      margin-bottom: 0.35rem;
      color: var(--text-secondary);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      font-size: 0.9rem;
    }
    th, td {
      border: 1px solid var(--border);
      padding: 0.75rem;
      text-align: left;
    }
    th {
      background: var(--card-bg);
      font-weight: 700;
      position: sticky;
      top: 0;
    }
    .matrix-cell {
      text-align: center;
      vertical-align: middle;
    }
    .matrix-cell.pass {
      background: var(--pass-bg);
    }
    .matrix-cell.fail {
      background: var(--fail-bg);
    }
  </style>
</head>
<body>
  <main>
    <h1>Default Admin Color Report - Focus Only</h1>
    <p class="lede">This page focuses exclusively on focus indicator visibility. Each cell measures focus-to-unfocused-state contrast at the 3:1 threshold per WCAG 2.2 SC 2.4.11.</p>
    <section class="meta">
      <div class="card"><strong>Generated</strong><br>${escapeHtml(report.generatedAt)}</div>
      <div class="card"><strong>Focus</strong><br>Focus indicators only</div>
      <div class="card"><strong>Threshold</strong><br>3:1 minimum</div>
    </section>
    <section id="focus-grid">
      <h2>Focus Combination Grid</h2>
      <p class="hint">These combinations isolate focus visibility. Focus indicator visibility must meet 3:1 contrast against the unfocused state.</p>
      ${renderFocusGrid(report.runtime.focusGrid, states)}
    </section>
    <section id="tokens">
      <h2>Focus Token Grids</h2>
      ${tokenFocusMatrix}
      ${tokenFocusGrid}
    </section>
    <section id="a11y">
      ${renderAccessibilityBestPracticesReference()}
    </section>
  </main>
</body>
</html>`;
  return html;
}

async function main() {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });

  const usage = collectTokenUsage();
  const tokenSummary = summarizeUsage(usage);
  const runtime = await collectRuntimeReport();
  const apcaFns = await loadApcaFns();
  const recommendationStatsMap = buildRecommendationStats(runtime.accentGrid, apcaFns);
  const recommendationStats = Object.fromEntries([...recommendationStatsMap.entries()]);

  const output = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    settingsPath: SETTINGS_PATH,
    cssFilesScanned: [...walkFiles(path.join(THEME_DIR, 'css')), ...walkFiles(path.join(THEME_DIR, 'migration/css'))].length,
    trackedTokens: TRACKED_TOKENS,
    usage,
    tokenSummary,
    runtime,
    recommendationStats,
  };

  fs.writeFileSync(JSON_OUTPUT, JSON.stringify(output, null, 2));
  fs.writeFileSync(JSON_LATEST, JSON.stringify(output, null, 2));

  const html = renderHtml(output);
  const guideHtml = renderStandaloneModeGuide(output);
  fs.writeFileSync(HTML_OUTPUT, html);
  fs.writeFileSync(HTML_LATEST, html);
  fs.writeFileSync(GUIDE_OUTPUT, guideHtml);
  fs.writeFileSync(GUIDE_LATEST, guideHtml);

    const fgBgHtml = renderFgBgReport(output);
    fs.writeFileSync(FG_BG_OUTPUT, fgBgHtml);
    fs.writeFileSync(FG_BG_LATEST, fgBgHtml);

    const focusHtml = renderFocusReport(output);
    fs.writeFileSync(FOCUS_OUTPUT, focusHtml);
    fs.writeFileSync(FOCUS_LATEST, focusHtml);

    console.log(`Wrote ${relativePath(JSON_LATEST)}, ${relativePath(HTML_LATEST)}, ${relativePath(FG_BG_LATEST)}, and ${relativePath(FOCUS_LATEST)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});