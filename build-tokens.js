import StyleDictionary from 'style-dictionary';

// File names match the Figma export (see tokens/manifest.json).
const T = 'tokens/';
const CORE = T + 'cozy.corner.core.value.tokens.json';
const LIGHT = T + 'cozy.corner.semantic.light.tokens.json';
const TYPE = (mode) => T + `cozy.corner.semantic.typography.${mode}.tokens.json`;
const STYLES = [T + 'typography.styles.tokens.json', T + 'effects.styles.tokens.json'];

// Figma writes font weight as a style NAME. CSS needs a number.
const WEIGHTS = { Thin:100, ExtraLight:200, Light:300, Regular:400, Medium:500,
                  SemiBold:600, Bold:700, ExtraBold:800, Black:900 };

// Figma exports some semantic tokens with the same name as the core token
// they alias (e.g. color-logo-orange: "{color-logo-orange}"). Merged, that
// overwrites the real value with a self-reference, so drop those on parse.
StyleDictionary.registerParser({
  name: 'json/drop-self-refs',
  pattern: /\.json$/,
  parser: ({ contents }) => {
    const json = JSON.parse(contents);
    for (const [key, t] of Object.entries(json)) {
      if (t?.$value === `{${key}}`) delete json[key];
    }
    return json;
  },
});

// Runs BEFORE any transform, so the shorthand sees the fixed values.
StyleDictionary.registerPreprocessor({
  name: 'typography/fix',
  preprocessor: (dict) => {
    const walk = (node) => {
      for (const key of Object.keys(node)) {
        const t = node[key];
        if (!t || typeof t !== 'object') continue;
        if (t.$type === 'typography' && t.$value) {
          const v = t.$value;
          t.$value = {
            ...v,
            fontWeight: WEIGHTS[v.fontWeight] ?? v.fontWeight,
            lineHeight: typeof v.lineHeight === 'number'
              ? { value: v.lineHeight, unit: 'px' }
              : v.lineHeight,
          };
        } else {
          walk(t);
        }
      }
      return node;
    };
    return walk(dict);
  },
});

const css = (name, sources, selector, filter) =>
  new StyleDictionary({
    source: sources,
    parsers: ['json/drop-self-refs'],
    preprocessors: ['typography/fix'],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'build/css/',
        files: [{ destination: name, format: 'css/variables',
                  options: { selector, showFileHeader: false }, filter }],
      },
    },
  });

const native = (sources) =>
  new StyleDictionary({
    source: sources,
    parsers: ['json/drop-self-refs'],
    preprocessors: ['typography/fix'],
    platforms: {
      ios: { transformGroup: 'ios-swift', buildPath: 'build/ios/',
             files: [{ destination: 'Tokens.swift', format: 'ios-swift/class.swift',
                       options: { className: 'Tokens' } }] },
      android: { transformGroup: 'android', buildPath: 'build/android/',
                 files: [{ destination: 'colors.xml', format: 'android/resources',
                           resourceType: 'color', filter: { $type: 'color' } }] },
    },
  });

// :root — core, light colours, website type, styles
await css('tokens.css',
  [CORE, LIGHT, TYPE('website'), ...STYLES],
  ':root').buildAllPlatforms();

// dashboard — only the type sizes that change
await css('tokens-dashboard.css',
  [CORE, LIGHT, TYPE('dashboard')],
  '[data-mode="dashboard"]',
  (t) => t.filePath.includes('typography.dashboard')).buildAllPlatforms();

// iOS + Android — mobile mode
await native([CORE, LIGHT, TYPE('mobile'), ...STYLES]).buildAllPlatforms();
