// Reads the CSS that `npm run build:tokens` generates, so the stories always
// show exactly what ships. Re-export from Figma, rebuild, and Storybook updates.
import rootCss from '../build/css/tokens.css?raw';
import dashboardCss from '../build/css/tokens-dashboard.css?raw';

const parse = (src) =>
  [...src.matchAll(/--([a-z0-9-]+):\s*([^;]+);(?:[ \t]*\/\*\*\s*(.*?)\s*\*\/)?/g)]
    .map(([, name, value, note]) => ({ name, value: value.trim(), note: note || '' }));

export const tokens = parse(rootCss);
export const dashboardTokens = parse(dashboardCss);

// Aliases only live in the Figma source (the CSS has them resolved), so read
// the export for "which core token does this point at". Read-only.
const sources = import.meta.glob('../tokens/*.tokens.json', { eager: true, import: 'default' });
const aliases = new Map();
for (const file of Object.values(sources)) {
  for (const [name, t] of Object.entries(file)) {
    if (typeof t?.$value === 'string' && /^\{.+\}$/.test(t.$value)) aliases.set(name, t.$value);
  }
}
export const aliasOf = (name) => aliases.get(name);

export const isColor = (v) => /^(#|rgba?\()/.test(v);

export const withPrefix = (prefix, list = tokens) =>
  list.filter((t) => t.name.startsWith(prefix));

// Groups tokens by the name segment right after `prefix`.
export const groupAfter = (prefix, list = withPrefix(prefix)) => {
  const groups = new Map();
  for (const t of list) {
    const key = t.name.slice(prefix.length).split('-')[0];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(t);
  }
  return groups;
};

// Every token belongs to one docs page. Anything Figma adds that doesn't
// match shows up as "uncategorised" on the Overview page.
export const SEMANTIC_COLOR = ['bg', 'text', 'border', 'icon', 'accent', 'twotone', 'logo'];
export const CATEGORIES = [
  ['Core palettes', (n) => n.startsWith('color-') && !SEMANTIC_COLOR.includes(n.split('-')[1])],
  ...SEMANTIC_COLOR.map((g) => [`Color · ${g}`, (n) => n.startsWith(`color-${g}-`)]),
  ['Text styles', (n) => n.startsWith('cozy-corner-typography-') || n.startsWith('typography-')],
  ['Font primitives', (n) => /^(fontfamily|fontsize|fontweight|lineheight)-/.test(n)],
  ['Spacing', (n) => n.startsWith('spacing-')],
  ['Border', (n) => /^border(radius|width)-/.test(n)],
  ['Elevation', (n) => n.startsWith('cozy-corner-elevation-') || n.startsWith('elevation-')],
];
export const semanticGroups = () =>
  SEMANTIC_COLOR.map((g) => [g, withPrefix(`color-${g}-`)]).filter(([, l]) => l.length);
export const categoryOf =(name) => CATEGORIES.find(([, test]) => test(name))?.[0];

// Figma names weights; CSS needs numbers.
export const WEIGHTS = { thin: 100, extralight: 200, light: 300, regular: 400, medium: 500,
                         semibold: 600, bold: 700, extrabold: 800, black: 900 };
export const weight = (v) => WEIGHTS[String(v).toLowerCase()] ?? v;

// Trims Figma's float noise: 0.07999999821186066 -> 0.08, -0.1599999964px -> -0.16px.
export const tidy = (v) => v.replace(/-?\d+\.\d{4,}/g, (n) => String(+(+n).toFixed(3)));

export const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export const label = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const page = (title, intro, body) => `
  <div class="docs">
    <header class="docs-head">
      <h1>${esc(title)}</h1>
      ${intro ? `<p>${intro}</p>` : ''}
    </header>
    ${body}
  </div>`;

export const section = (title, body, count) => `
  <section class="docs-section">
    <h2>${esc(title)}${count != null ? ` <span class="count">${count}</span>` : ''}</h2>
    ${body}
  </section>`;

export const tokenMeta = (t) => `
  <code class="var">--${esc(t.name)}</code>
  <span class="val">${esc(tidy(t.value))}</span>
  ${t.note ? `<span class="note">${esc(t.note)}</span>` : ''}`;
