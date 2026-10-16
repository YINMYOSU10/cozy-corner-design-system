import { tokens, dashboardTokens, CATEGORIES, categoryOf, page, section, tidy, esc, isColor, asReact } from './tokens.js';

export default {
  title: 'Overview',
  parameters: { docs: { description: { component: 'Every Cozy Corner design token, generated from the Figma export.' } } },
};

export const Introduction = {
  render: () => {
    const counts = CATEGORIES.map(([name]) => [name, tokens.filter((t) => categoryOf(t.name) === name).length]);
    const orphans = tokens.filter((t) => !categoryOf(t.name));
    return page('Cozy Corner tokens',
      'Generated from the Figma export in <code class="var">tokens/</code> via <code class="var">npm run build:tokens</code>. These pages read <code class="var">build/tokens/css/*.css</code> directly, so they always match what ships.',
      section('Coverage', `<div class="stats">
        <div class="stat"><b>${tokens.length}</b>tokens in tokens.css</div>
        <div class="stat"><b>${dashboardTokens.length}</b>dashboard-mode overrides</div>
        ${counts.map(([n, c]) => `<div class="stat"><b>${c}</b>${esc(n)}</div>`).join('')}
      </div>`) +
      section('Uncategorised', orphans.length
        ? `<div class="warn">${orphans.length} token(s) don't match a docs page yet. They still appear under <b>All tokens</b>.<br>${orphans.map((t) => `<code class="var">--${esc(t.name)}</code>`).join(' ')}</div>`
        : `<div class="ok">Every token is shown on a docs page.</div>`));
  },
};

export const AllTokens = {
  name: 'All tokens',
  render: () => {
    const all = [
      ...tokens.map((t) => ({ ...t, scope: ':root' })),
      ...dashboardTokens.map((t) => ({ ...t, scope: '[data-mode="dashboard"]' })),
    ];
    const el = document.createElement('div');
    el.innerHTML = page('All tokens', 'Every CSS variable, searchable by name or value.', `
      <input class="search" type="search" placeholder="Search ${all.length} tokens… (e.g. terracotta, 16px, dashboard)" aria-label="Search tokens">
      <table class="tokens"><thead><tr><th></th><th>Token</th><th>Value</th><th>Scope</th><th>Page</th></tr></thead><tbody>
      ${all.map((t) => `<tr data-q="${esc(`${t.name} ${t.value} ${t.scope} ${categoryOf(t.name) || ''}`.toLowerCase())}">
        <td>${isColor(t.value) ? `<div class="mini" style="background:${esc(t.value)}"></div>` : ''}</td>
        <td><code class="var">--${esc(t.name)}</code>${t.note ? `<br><span class="note">${esc(t.note)}</span>` : ''}</td>
        <td><span class="val">${esc(tidy(t.value))}</span></td>
        <td><span class="val">${esc(t.scope)}</span></td>
        <td><span class="note">${esc(categoryOf(t.name) || '—')}</span></td></tr>`).join('')}
      </tbody></table>`);
    const rows = [...el.querySelectorAll('tbody tr')];
    el.querySelector('.search').addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      for (const r of rows) r.hidden = q && !r.dataset.q.includes(q);
    });
    return el;
  },
};

asReact({ Introduction, AllTokens });
