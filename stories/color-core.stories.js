import { tokens, groupAfter, SEMANTIC_COLOR, page, section, tokenMeta, label, esc } from './tokens.js';

export default {
  title: 'Color/Core palette',
  parameters: { docs: { description: { component: 'Raw colour ramps from the Figma core collection. Product code should use the semantic tokens, which point at these.' } } },
};

export const AllFamilies = {
  name: 'All families',
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

