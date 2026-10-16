import { tokens, withPrefix, page, section, tokenMeta, label, esc, weight, tidy } from './tokens.js';

export default {
  title: 'Typography',
  parameters: { docs: { description: { component: 'Text styles from Figma, how they change per platform, and the raw font values they are built from.' } } },
};

const SAMPLE = 'The cosy corner keeps the kettle warm';
const SHORTHAND = 'cozy-corner-typography-';
const MODES = ['website', 'mobile', 'dashboard'];

// Base styles are the shorthands without a platform prefix (they follow website).
const baseStyles = () =>
  withPrefix(SHORTHAND).filter((t) => !MODES.some((m) => t.name.startsWith(`${SHORTHAND}${m}-`)));

// `body-small-semibold` → `--typography-bodysmallsemibold-*`
const partsOf = (style, list = tokens) => {
  const prefix = `typography-${style.replace(/-/g, '')}-`;
  return Object.fromEntries(list.filter((t) => t.name.startsWith(prefix))
    .map((t) => [t.name.slice(prefix.length), t.value]));
};

export const TextStyles = {
  name: 'Text styles',
  render: () => page('Text styles', 'Composite styles from Figma. Use the <code class="var">font</code> shorthand: <code class="var">font: var(--cozy-corner-typography-h1)</code>. Website mode is the default.',
    `<div class="rows">${baseStyles().map((t) => {
      const style = t.name.slice(SHORTHAND.length);
      const ls = partsOf(style)['letterspacing'];
      return `<div class="row">
        <div class="meta"><span class="step" style="font:var(--cozy-corner-typography-label-large)">${esc(label(style))}</span>${tokenMeta(t)}
          ${ls ? `<span class="val">letter-spacing ${esc(tidy(ls))}</span>` : ''}</div>
        <div class="specimen" style="font:var(--${t.name});${ls ? `letter-spacing:${ls}` : ''}">${style === 'logo' ? 'cozy corner' : SAMPLE}</div>
      </div>`;
    }).join('')}</div>`),
};

export const PlatformModes = {
  name: 'Platform modes',
  render: () => {
    const styles = [...new Set(MODES.flatMap((m) =>
      withPrefix(`${SHORTHAND}${m}-`).map((t) => t.name.slice(`${SHORTHAND}${m}-`.length))))];
    const rows = styles.map((s) => `<tr>
      <td><span style="font:var(--cozy-corner-typography-label)">${esc(label(s))}</span></td>
      ${MODES.map((m) => {
        const t = tokens.find((x) => x.name === `${SHORTHAND}${m}-${s}`);
        return `<td>${t ? `<div class="specimen" style="font:var(--${t.name})">Aa Cozy</div><span class="val">${esc(t.value)}</span>` : '<span class="val">—</span>'}</td>`;
      }).join('')}</tr>`).join('');
    return page('Platform modes', 'The same style across Website, Mobile (iOS/Android) and Dashboard. "—" means the mode doesn\'t define that style.',
      `<table class="tokens"><thead><tr><th>Style</th>${MODES.map((m) => `<th>${label(m)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`);
  },
};

export const ModeSwitch = {
  name: 'Mode switch (CSS)',
  args: { mode: 'website' },
  argTypes: { mode: { control: 'inline-radio', options: ['website', 'dashboard'] } },
  render: ({ mode }) => {
    const styles = [...new Set(withPrefix('typography-').map((t) => t.name.split('-')[1]))];
    const el = document.createElement('div');
    if (mode === 'dashboard') el.setAttribute('data-mode', 'dashboard');
    el.innerHTML = page('Mode switch', `The per-property <code class="var">--typography-*</code> variables change when an ancestor has <code class="var">data-mode="dashboard"</code>. Flip the <b>mode</b> control below.`,
      `<div class="rows">${styles.map((s) => {
        const p = partsOf(s);
        const w = weight(p.fontweight);
        return `<div class="row">
          <div class="meta"><span style="font:var(--cozy-corner-typography-label-large)">${esc(label(s))}</span>
            <code class="var">--typography-${esc(s)}-*</code></div>
          <div class="specimen" style="font-family:var(--typography-${s}-fontfamily);font-size:var(--typography-${s}-fontsize);line-height:var(--typography-${s}-lineheight);letter-spacing:var(--typography-${s}-letterspacing, 0);font-weight:${esc(w)}">${SAMPLE}</div>
        </div>`;
      }).join('')}</div>`);
    return el;
  },
};

export const Primitives = {
  render: () => {
    const fams = withPrefix('fontfamily-').map((t) => `<div class="row">
      <div class="meta">${tokenMeta(t)}</div>
      <div class="specimen" style="font-family:var(--${t.name});font-size:32px;line-height:40px">${esc(t.value)} — Aa Bb Cc 0123</div></div>`).join('');
    const sizes = withPrefix('fontsize-').sort((a, b) => parseFloat(a.value) - parseFloat(b.value)).map((t) => `<div class="row">
      <div class="meta">${tokenMeta(t)}</div>
      <div class="specimen" style="font-family:var(--fontfamily-karla);font-size:var(--${t.name});line-height:1.25">Cozy corner</div></div>`).join('');
    const lhs = withPrefix('lineheight-').sort((a, b) => parseFloat(a.value) - parseFloat(b.value)).map((t) => `<div class="row">
      <div class="meta">${tokenMeta(t)}</div>
      <div><div class="bar" style="height:var(--${t.name});width:var(--${t.name});opacity:.35"></div></div></div>`).join('');
    const weights = withPrefix('fontweight-').sort((a, b) => weight(a.value) - weight(b.value)).map((t) => `<div class="row">
      <div class="meta">${tokenMeta(t)}<span class="val">CSS weight ${weight(t.value)}</span></div>
      <div class="specimen" style="font-family:var(--fontfamily-inter);font-size:24px;font-weight:${weight(t.value)}">${esc(label(t.value))} 0123</div></div>`).join('');
    return page('Type primitives', 'The raw values the text styles are built from.',
      section('Font families', `<div class="rows">${fams}</div>`, withPrefix('fontfamily-').length) +
      section('Font sizes', `<div class="rows">${sizes}</div>`, withPrefix('fontsize-').length) +
      section('Line heights', `<div class="rows">${lhs}</div>`, withPrefix('lineheight-').length) +
      section('Font weights', `<div class="rows">${weights}</div>`, withPrefix('fontweight-').length));
  },
};
