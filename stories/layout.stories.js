import { withPrefix, page, section, tokenMeta, esc, tidy, asReact } from './tokens.js';

const px = (t) => parseFloat(t.value);
const rows = (list, visual) =>
  `<div class="rows">${list.map((t) => `<div class="row"><div class="meta">${tokenMeta(t)}</div><div>${visual(t)}</div></div>`).join('')}</div>`;

export default {
  title: 'Foundations',
  parameters: { docs: { description: { component: 'Spacing, border and elevation tokens.' } } },
};

export const Spacing = {
  render: () => {
    const list = withPrefix('spacing-').sort((a, b) => px(a) - px(b));
    return page('Spacing', 'Padding, margins and gaps.',
      section('Scale', rows(list, (t) => `<div class="bar" style="width:var(--${t.name})"></div>`), list.length));
  },
};

export const Border = {
  render: () => {
    const radius = withPrefix('borderradius-').sort((a, b) => px(a) - px(b));
    const width = withPrefix('borderwidth-').sort((a, b) => px(a) - px(b));
    const box = (style) => `<div class="card" style="width:96px;height:96px;padding:0;${style}"></div>`;
    return page('Border', 'Corner radius and stroke width.',
      section('Radius', `<div class="grid">${radius.map((t) => `<div class="card">
        <div class="preview">${box(`border-radius:var(--${t.name});background:var(--color-bg-accent-terracotta);border:var(--borderwidth-1) solid var(--color-border-brand-default)`)}</div>
        ${tokenMeta(t)}</div>`).join('')}</div>`, radius.length) +
      section('Width', `<div class="grid">${width.map((t) => `<div class="card">
        <div class="preview">${box(`border-radius:var(--borderradius-sm);border:var(--${t.name}) solid var(--color-border-primary)`)}</div>
        ${tokenMeta(t)}</div>`).join('')}</div>`, width.length));
  },
};

export const Elevation = {
  render: () => {
    const levels = withPrefix('cozy-corner-elevation-');
    const raw = withPrefix('elevation-');
    return page('Elevation', 'Shadows for raised surfaces. Each level layers a key shadow and an ambient shadow. Use <code class="var">box-shadow: var(--cozy-corner-elevation-level-2)</code>.',
      section('Levels', `<div class="grid" style="gap:var(--spacing-5xl);padding:var(--spacing-xxl) 0">${levels.map((t) => `<div>
        <div class="card" style="height:120px;border:none;box-shadow:var(--${t.name});justify-content:center;align-items:center;font:var(--cozy-corner-typography-h2)">${esc(t.name.split('-').pop())}</div>
        <div style="margin-top:var(--spacing-lg);display:flex;flex-direction:column;gap:2px">${tokenMeta(t)}</div></div>`).join('')}</div>`, levels.length) +
      section('Shadow layers', `<table class="tokens"><thead><tr><th>Token</th><th>Value</th></tr></thead><tbody>
        ${raw.map((t) => `<tr><td><code class="var">--${esc(t.name)}</code></td><td><span class="val">${esc(tidy(t.value))}</span></td></tr>`).join('')}
      </tbody></table>`, raw.length));
  },
};

asReact({ Spacing, Border, Elevation });
