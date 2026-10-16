import { tokens, withPrefix, groupAfter, SEMANTIC_COLOR, page, section, tokenMeta, label, esc } from './tokens.js';

export default { title: 'Color' };

const darkish = (name) => /inverse|ondark/.test(name);

const card = (t, preview) => `<div class="card">${preview}${tokenMeta(t)}</div>`;
const grid = (list, preview) => `<div class="grid">${list.map((t) => card(t, preview(t))).join('')}</div>`;

// Groups `color-<group>-<sub>-...` by <sub> so related states sit together.
const subgroups = (group, preview) =>
  [...groupAfter(`color-${group}-`)]
    .map(([sub, list]) => `<h3>${esc(label(sub))}</h3>${grid(list, preview)}`)
    .join('');

export const CorePalettes = {
  name: 'Core palettes',
  render: () => {
    const core = tokens.filter((t) => t.name.startsWith('color-') && !SEMANTIC_COLOR.includes(t.name.split('-')[1]));
    const ramps = [...groupAfter('color-', core)].map(([hue, list]) => section(label(hue), `
      <div class="ramp">${list.map((t) => `
        <div class="chip">
          <div class="sw" style="background:var(--${t.name})"></div>
          <span class="step">${esc(t.name.split('-').slice(2).join('-'))}</span>
          ${tokenMeta(t)}
        </div>`).join('')}
      </div>`, list.length));
    return page('Core palettes', 'Raw colour ramps. Use the semantic tokens in product code; these are what they point to.', ramps.join(''));
  },
};

export const Background = {
  render: () => page('Background', 'Surfaces, fills and interactive states.',
    subgroups('bg', (t) => `<div class="preview ${t.name.includes('overlay') ? 'checker' : ''}"><div class="preview" style="width:100%;margin:0;background:var(--${t.name});border:1px solid rgba(0,0,0,.06)"></div></div>`)),
};

export const Text = {
  render: () => page('Text', 'Foreground colours for copy. Inverse tokens are shown on the inverse background.',
    subgroups('text', (t) => `<div class="preview" style="background:${darkish(t.name) ? 'var(--color-bg-inverse)' : 'var(--color-bg-surfaceprimary)'};border:1px solid rgba(0,0,0,.06)">
      <span style="color:var(--${t.name});font:var(--cozy-corner-typography-h2)">Cozy text</span></div>`)),
};

export const Icon = {
  render: () => page('Icon', 'Foreground colours for icons.',
    subgroups('icon', (t) => `<div class="preview" style="background:${darkish(t.name) ? 'var(--color-bg-inverse)' : 'var(--color-bg-surfaceprimary)'};border:1px solid rgba(0,0,0,.06)">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--${t.name})" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg></div>`)),
};

export const Border = {
  render: () => page('Border', 'Stroke colours for dividers, inputs and focus rings.',
    subgroups('border', (t) => `<div class="preview" style="background:${darkish(t.name) ? 'var(--color-bg-inverse)' : 'var(--color-bg-surfaceprimary)'}">
      <div style="width:80%;height:44px;border-radius:var(--borderradius-sm);border:var(--borderwidth-2) solid var(--${t.name})"></div></div>`)),
};

export const Accent = {
  render: () => page('Accent', 'Decorative hues for tags, avatars and illustration.',
    subgroups('accent', (t) => `<div class="preview" style="background:var(--${t.name});border:1px solid rgba(0,0,0,.06)"></div>`)),
};

export const TwoTone = {
  name: 'Two-tone',
  render: () => {
    const pairs = groupAfter('color-twotone-');
    return page('Two-tone', 'Background + foreground pairs, designed to be used together.',
      `<div class="grid">${[...pairs].map(([hue, list]) => {
        const bg = list.find((t) => t.name.endsWith('-bg'));
        const fg = list.find((t) => t.name.endsWith('-foreground'));
        return `<div class="card">
          <div class="preview" style="background:var(--${bg?.name});color:var(--${fg?.name});font:var(--cozy-corner-typography-label-large)">${esc(label(hue))}</div>
          ${list.map(tokenMeta).join('<br>')}
        </div>`;
      }).join('')}</div>`);
  },
};

export const Logo = {
  render: () => page('Logo', 'Brand wordmark colours.',
    `${grid(withPrefix('color-logo-'), (t) => `<div class="preview" style="background:var(--${t.name})"></div>`)}
     <h3>Wordmark</h3>
     <div class="card" style="max-width:420px"><div class="preview" style="height:96px;font:var(--cozy-corner-typography-logo);letter-spacing:var(--typography-logo-letterspacing)">
       <span style="color:var(--color-logo-orange)">cozy</span>&nbsp;<span style="color:var(--color-logo-brown)">corner</span></div></div>`),
};
