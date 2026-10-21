#!/usr/bin/env node
// Builds every generated page of the docs site, whole site every run.
//
//   node scripts/generate.mjs --repo <checkout> --commit <sha> [--fetch] [--version 0.1.0 --published 2026-10-22]
//
// Inputs:
//   * the repo, checked out at the pinned commit (--repo, --commit; HEAD must equal the commit)
//   * data/board.json   (board statuses, no record IDs)
//   * data/figma.json   (live Figma reads)
//   * data/storybook-index.json (the deployed Storybook's index.json; --fetch refreshes it)
// Same inputs, same pages. Nothing here is edited by hand: change the source, re-run.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, '..');
const docs = path.join(site, 'src/content/docs');

// ---------- args ----------
const args = process.argv.slice(2);
const arg = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : d;
};
const repo = path.resolve(arg('repo', ''));
const commit = arg('commit');
if (!arg('repo') || !commit) throw new Error('usage: --repo <checkout> --commit <sha>');
const git = (...a) => execFileSync('git', ['-C', repo, ...a], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const head = git('rev-parse', 'HEAD').trim();
if (head !== commit) throw new Error(`repo HEAD ${head} is not the pinned commit ${commit}`);
const short = commit.slice(0, 7);
const published = arg('version') ? { version: arg('version'), date: arg('published') } : null;

const GH = 'https://github.com/YINMYOSU10/cozy-corner-design-system';
const SB = 'https://cozy-corner-design-system.vercel.app';
const PKG = '@cozy-corner-design-system/components';

const read = (p) => fs.readFileSync(path.join(repo, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(repo, p));
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

// ---------- helpers ----------
const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
const cell = (s) => esc(s).replace(/\|/g, '&#124;').replace(/\n/g, ' ');
const slugify = (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const notice = (what) => `<p class="missing"><strong>Not available.</strong> ${esc(what)}</p>`;
const write = (rel, body) => {
  const f = path.join(docs, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, body.endsWith('\n') ? body : body + '\n');
};
const fm = (title, description, extra = '') =>
  `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n${extra}---\n\n`;
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

// ---------- inputs ----------
const board = readJson(path.join(site, 'data/board.json')).components;
const figma = readJson(path.join(site, 'data/figma.json'));
const sbFile = path.join(site, 'data/storybook-index.json');
if (args.includes('--fetch')) {
  const r = await fetch(`${SB}/index.json`);
  if (!r.ok) throw new Error(`Storybook index.json answered ${r.status}`);
  const j = await r.json();
  if (!j.entries) throw new Error('Storybook index.json has no entries');
  fs.writeFileSync(sbFile, JSON.stringify(j));
}
const sb = readJson(sbFile).entries;

const pkg = JSON.parse(read('package.json'));
const indexTs = read('src/index.ts');
const componentNames = [...indexTs.matchAll(/export \* from '\.\/components\/(\w+)'/g)].map((m) => m[1]);

// The Cleared list (named by the caller), in index order.
const CLEARED = [
  'Avatar','Badge','Breadcrumb','Button','ButtonDestructive','ButtonInfo','ButtonNeutral','Card','Chip','DetailRow',
  'Divider','Fields','Footer','Header','Icon','Link','Loading','Logo','MediaContainer','ProgressBar',
  'ProgressLoadingMobile','ProgressLoadingWebsite','Sidebar','StatusBar','Table','Tag','Toggle','TopBar',
];
const boardByKey = new Map(board.map((b) => [norm(b.name).replace(/primary$/, ''), b]));
const boardFor = (name) => boardByKey.get(norm(name)) ?? null;
const cleared = CLEARED.filter((n) => componentNames.includes(n));
const eligible = cleared.filter((n) => {
  const b = boardFor(n);
  return b && ['Completed', 'Released'].includes(b.development);
});
if (eligible.length !== cleared.length) {
  console.error('not Completed/Released on the board:', cleared.filter((n) => !eligible.includes(n)));
  process.exit(1);
}

// tokens.css
const tokensCssPath = path.join(repo, 'build/tokens/css/tokens.css');
if (!fs.existsSync(tokensCssPath)) throw new Error('build/tokens/css/tokens.css missing: run npm run build:tokens in the repo');
const tokensCss = fs.readFileSync(tokensCssPath, 'utf8');
const tokens = new Map();
for (const m of tokensCss.matchAll(/^\s*(--[\w-]+):\s*([^;]+);(?:\s*\/\*\*\s*(.*?)\s*\*\/)?/gm)) {
  tokens.set(m[1], { value: m[2].trim(), note: m[3] || '' });
}
const resolve = (v, d = 0) => {
  const m = /^var\((--[\w-]+)\)$/.exec(v);
  return m && tokens.has(m[1]) && d < 6 ? resolve(tokens.get(m[1]).value, d + 1) : v;
};
fs.mkdirSync(path.join(site, 'src/styles'), { recursive: true });
fs.writeFileSync(path.join(site, 'src/styles/tokens.css'), tokensCss);

const manifest = JSON.parse(read('tokens/manifest.json'));
const modeNames = Object.values(manifest.collections).flatMap((c) => Object.keys(c.modes));
const countLeaves = (o) =>
  o && typeof o === 'object' ? ('$value' in o ? 1 : Object.values(o).reduce((a, v) => a + countLeaves(v), 0)) : 0;
const semanticFiles = fs
  .readdirSync(path.join(repo, 'tokens'))
  .filter((f) => /^cozy\.corner\.semantic\..*\.tokens\.json$/.test(f));
const semanticCount = semanticFiles.reduce((a, f) => a + countLeaves(JSON.parse(read(`tokens/${f}`))), 0);
const semanticLight = countLeaves(JSON.parse(read('tokens/cozy.corner.semantic.light.tokens.json')));
const hasDarkMode = modeNames.includes('dark');

// ---------- Storybook mapping ----------
const stories = Object.values(sb).filter((e) => e.type === 'story' || e.type === 'docs');
const ownerOf = (title) => {
  // "Components/Button Destructive" or "Components/Sidebar/Sidebar Item"
  const parts = title.split('/');
  if (parts[0] !== 'Components') return null;
  const seg = norm(parts[1]);
  const ok = componentNames.filter((n) => seg.startsWith(norm(n)));
  if (!ok.length) return null;
  if (parts.length > 2) return ok.sort((a, b) => b.length - a.length)[0];
  return componentNames.includes(parts[1].replace(/\s+/g, '')) ? parts[1].replace(/\s+/g, '') : ok.sort((a, b) => b.length - a.length)[0];
};
const isMatrix = (name) =>
  /=|^Matrix|^(Default|Outline) (Rounded|Pill) \d+|\(\d+:\d+\)|^Form Input|^All variants|^Sheet/i.test(name);
const sbDocsUrl = (id) => `${SB}/?path=/docs/${id}`;
const sbStoryUrl = (id) => `${SB}/?path=/story/${id}`;
const sbEmbed = (id, kind = 'story') => `${SB}/iframe.html?id=${id}&viewMode=${kind}`;

// ---------- component reading ----------
function braceBody(src, start) {
  let d = 0;
  for (let i = src.indexOf('{', start); i < src.length; i++) {
    if (src[i] === '{') d++;
    else if (src[i] === '}' && --d === 0) return [src.indexOf('{', start) + 1, i];
  }
  return null;
}

function readComponent(name) {
  const dir = `src/components/${name}`;
  const files = fs.readdirSync(path.join(repo, dir));
  const tsx = files.filter((f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'));
  const css = files.filter((f) => f.endsWith('.css'));
  const main = tsx.includes(`${name}.tsx`) ? read(`${dir}/${name}.tsx`) : '';
  const subs = tsx.map((f) => f.replace(/\.tsx$/, '')).filter((f) => f !== name);
  const types = [];
  const props = [];
  const interfaces = [];
  for (const f of tsx) {
    const src = read(`${dir}/${f}`);
    for (const m of src.matchAll(/export type (\w+)\s*=\s*([^;]+);/g)) {
      if (/^['"]/.test(m[2].trim()) || m[2].includes("'")) types.push({ name: m[1], def: m[2].replace(/\s+/g, ' ').trim(), file: f });
    }
    for (const m of src.matchAll(/export (?:interface|type) (\w+Props)\b(?=[^;{]*?(?:\{|=\s*\w+Props;))/g)) {
      const alias = /^export type \w+Props\s*=\s*(\w+Props);/.exec(src.slice(m.index, m.index + 200));
      if (alias) { interfaces.push({ name: m[1], extends: '', alias: alias[1] }); continue; }
      const bounds = braceBody(src, m.index);
      if (!bounds) continue;
      const body = src.slice(bounds[0], bounds[1]);
      const comp = m[1].replace(/Props$/, '');
      // defaults from the destructuring in `export function Comp({ ... }`
      const defaults = {};
      const fm_ = new RegExp(`export function ${comp}\\s*\\(\\s*\\{`).exec(src);
      if (fm_) {
        const b = braceBody(src, fm_.index);
        if (b) for (const d of src.slice(b[0], b[1]).matchAll(/^\s*(\w+)\s*=\s*([^,\n]+),?\s*$/gm)) defaults[d[1]] = d[2].trim();
      }
      const lines = body.split('\n');
      let doc = [];
      let inBlock = false;
      let buf = '';
      for (let line of lines) {
        const t = line.trim();
        if (inBlock) {
          doc.push(t.replace(/\*\/$/, '').replace(/^\*\s?/, ''));
          if (t.endsWith('*/')) inBlock = false;
          continue;
        }
        if (t.startsWith('/**')) {
          doc = [t.replace(/^\/\*\*\s?/, '').replace(/\*\/$/, '')];
          inBlock = !t.endsWith('*/');
          continue;
        }
        if (t.startsWith('//')) { doc.push(t.replace(/^\/\/\s?/, '')); continue; }
        buf += (buf ? ' ' : '') + t;
        if (!buf || !/;$/.test(buf)) continue;
        const pm = /^(\w+)(\?)?:\s*(.+);$/.exec(buf);
        if (pm) {
          props.push({
            component: comp,
            name: pm[1],
            optional: !!pm[2],
            type: pm[3],
            def: defaults[pm[1]] ?? '',
            doc: doc.join(' ').replace(/\s+/g, ' ').trim(),
          });
        }
        buf = '';
        doc = [];
      }
      const ext = /(?:interface \w+Props\s+extends|type \w+Props\s*=)\s*([^{]+)\{/.exec(src.slice(m.index, bounds[0] + 1));
      interfaces.push({ name: m[1], extends: ext ? ext[1].replace(/\s+/g, ' ').trim() : '' });
    }
  }
  const cssVars = new Set();
  const cssLines = {};
  const local = new Set();
  for (const f of css) {
    const t = read(`${dir}/${f}`);
    for (const m of t.matchAll(/^\s*(--[\w-]+)\s*:/gm)) local.add(m[1]);
    for (const m of t.matchAll(/var\((--[\w-]+)/g)) cssVars.add(m[1]);
  }
  for (const v of local) cssVars.delete(v);
  const intentPath = `${dir}/${name}.intent.json`;
  const intent = exists(intentPath) ? JSON.parse(read(intentPath)) : null;
  return { name, dir, main, subs, types, props, interfaces, cssVars: [...cssVars].sort(), intent, hasCss: css.length > 0 };
}

// ---------- git ----------
function commitsFor(p) {
  const out = git('log', '--format=%H%x1f%h%x1f%ad%x1f%s', '--date=short', commit, '--', p).trim();
  return out ? out.split('\n').map((l) => { const [H, h, d, s] = l.split('\x1f'); return { H, h, d, s }; }) : [];
}
// No release tag exists until the publish: every commit is "unreleased". Phase 2 re-runs with --version.
const tags = git('tag', '--merged', commit).trim().split('\n').filter(Boolean);
const shippedIn = (c) => {
  // After the publish, the release tag (v<version>) sits on the release commit, a descendant of the pinned commit.
  if (published) {
    const t = `v${published.version}`;
    try { git('rev-parse', '--verify', `refs/tags/${t}`); git('merge-base', '--is-ancestor', c.H, t); return t; } catch {}
  }
  if (!tags.length) return null;
  for (const t of tags.slice().reverse()) {
    try { git('merge-base', '--is-ancestor', c.H, t); return t; } catch {}
  }
  return null;
};
const nextVersion = published?.version ?? pkg.version;
const shipLabel = (c) => shippedIn(c) ?? `unreleased (next: ${nextVersion})`;
const commitLine = (c) => `- [\`${c.h}\`](${GH}/commit/${c.H}) ${c.d} · ${esc(c.s)} · *${esc(shipLabel(c))}*`;

// ---------- component page ----------
const naming = read('docs/naming-suggestions.md');
const namingSections = naming.split(/^## /m).slice(1).map((s) => ({ head: s.split('\n')[0], body: s.split('\n').slice(1).join('\n').trim() }));
const gapAlias = { ProgressLoadingMobile: 'Progress Loading / App' };

function componentPage(name) {
  const c = readComponent(name);
  const b = boardFor(name);
  const I = c.intent;
  const owned = stories.filter((e) => ownerOf(e.title) === name);
  const docsEntry = owned.find((e) => e.type === 'docs' && ownerOf(e.title) === name && e.title.split('/').length === 2);
  const storyEntries = owned.filter((e) => e.type === 'story' && e.title.split('/').length === 2);
  const matrix = storyEntries.filter((e) => isMatrix(e.name));
  const free = storyEntries.filter((e) => !isMatrix(e.name));
  const display = b.name.trim();
  const status = b.development;
  const figmaUrl = figma.nodes?.[name]?.url ?? b.figma;
  const srcUrl = `${GH}/tree/${commit}/${c.dir}`;
  const line = (s) => (s.includes(':') ? s : null);

  const list = (arr, what) => (arr && arr.length ? arr.map((x) => `- ${esc(x)}`).join('\n') : notice(what));
  const intentNote = (f) => `${name}.intent.json has no ${f} (no source states it; nothing was invented).`;

  // Usage
  const dont = I?.dont_use_when?.length
    ? I.dont_use_when.map((d) => `- ${esc(d.when)}${d.use_instead ? ` Use instead: ${linkComponent(d.use_instead)}.` : ' *(Figma names no alternative.)*'}`).join('\n')
    : notice(intentNote('dont_use_when'));
  const variants = I && Object.keys(I.variant_intent ?? {}).length
    ? `| Variant | What it is for |\n|---|---|\n${Object.entries(I.variant_intent).map(([k, v]) => `| \`${cell(k)}\` | ${cell(v)} |`).join('\n')}`
    : notice(intentNote('variant_intent'));
  const a11y = I?.a11y?.length
    ? I.a11y.map((a) => { const [f, l] = a.source.split(':'); return `- ${esc(a.fact)} ([${esc(a.source)}](${GH}/blob/${commit}/${f}#L${l}))`; }).join('\n')
    : notice(intentNote('a11y'));
  const pairs = I?.pairs_with?.length ? I.pairs_with.map((p) => `- ${linkComponent(p)}`).join('\n') : notice(intentNote('pairs_with'));
  const promises = [
    `- The props, prop values and exports on the Code tab are this component's documented API.`,
    `- ${nextVersion.startsWith('0.') ? 'While the package is 0.x, a minor release may change them and says so in the changelog; a patch release will not (see [Versioning](/get-started/versioning/)).' : 'Breaking changes only in a major release (see [Versioning](/get-started/versioning/)).'}`,
    `- It uses ${c.cssVars.length} token${c.cssVars.length === 1 ? '' : 's'} (Code tab); removing or renaming one of them is a breaking change.`,
  ].join('\n');

  // Examples
  const readme = read('README.md');
  const readmeEx = /```tsx\n([\s\S]*?)```/.exec(readme)?.[1].trim();
  const storyBlock = (e) =>
    `<section class="example-panel">\n<h4 class="example-title">${esc(e.name)}</h4>\n<iframe loading="lazy" title="${esc(c.name)} ${esc(e.name)}" src="${sbEmbed(e.id)}"></iframe>\n<p class="example-caption">Rendered live from Storybook · <a href="${sbStoryUrl(e.id)}" target="_blank" rel="noopener">open it there</a> to change the props or the theme.</p>\n</section>`;
  const examples = [
    '### Usage example',
    readmeEx
      ? `The README's example (it uses Button; every component imports the same way):\n\n\`\`\`tsx\n${readmeEx}\n\`\`\`\n\nFor this component: \`import { ${c.name} } from '${PKG}';\``
      : notice('The README has no usage example.'),
    '### Stories',
    free.length ? free.map(storyBlock).join('\n\n') : notice('Every story of this component is a variant-matrix row (see the Design tab); there is no other story to embed.'),
  ].join('\n\n');

  // Code
  const exported = c.interfaces.map((i) => i.name);
  const propsTable = c.props.length
    ? `| Prop | Type | Default | Description |\n|---|---|---|---|\n${c.props.map((p) => `| \`${cell(p.name)}${p.optional ? '?' : ''}\`${c.interfaces.length > 1 ? ` <small>(${cell(p.component)})</small>` : ''} | \`${cell(p.type)}\` | ${p.def ? `\`${cell(p.def)}\`` : ''} | ${cell(p.doc)} |`).join('\n')}`
    : c.interfaces.some((i) => i.alias)
      ? `<p>${c.interfaces.filter((i) => i.alias).map((i) => `<code>${esc(i.name)}</code> is the same type as ${linkComponent(i.alias.replace(/Props$/, ''))}'s <code>${esc(i.alias)}</code>`).join('; ')}. See that page for the props.</p>`
      : notice(`No props interface could be read from ${c.dir}.`);
  const exts = c.interfaces.filter((i) => i.extends).map((i) => `- \`${esc(i.name)}\` also accepts: \`${esc(i.extends)}\``).join('\n');
  const typesList = c.types.length
    ? `| Type | Values |\n|---|---|\n${c.types.map((t) => `| \`${cell(t.name)}\` | \`${cell(t.def)}\` |`).join('\n')}`
    : notice('This component exports no union types.');
  const tokenRows = c.cssVars.map((v) => {
    const t = tokens.get(v);
    return t
      ? `| \`${v}\` | ${cell(resolve(t.value))} | ${hasDarkMode ? '' : 'no dark mode in the Figma export'} |`
      : `| \`${v}\` | not in tokens.css | |`;
  });
  const tokenTable = c.cssVars.length
    ? `| Token | Light | Dark |\n|---|---|---|\n${tokenRows.join('\n')}`
    : notice(`${c.dir} has no CSS using tokens.`);
  const intentTokens = new Set(I?.required_tokens ?? []);
  const tokenDrift = I ? [...intentTokens].filter((t) => !c.cssVars.includes(t)).concat(c.cssVars.filter((t) => !intentTokens.has(t))).filter((t) => !t.startsWith('--cc-')) : [];
  const code = [
    '### Import',
    `\`\`\`ts\nimport { ${c.name} } from '${PKG}';\n\`\`\`\n\nSubcomponents in this folder: ${c.subs.length ? c.subs.map((s) => `\`${s}\``).join(', ') : 'none'}. Source: [${c.dir}](${srcUrl}).`,
    '### Props',
    propsTable + (exts ? `\n\n${exts}` : ''),
    '### Types',
    typesList,
    '### Tokens',
    tokenTable + (tokenDrift.length ? `\n\n<p class="missing"><strong>Check.</strong> The CSS and ${esc(name)}.intent.json disagree on: ${tokenDrift.map((t) => `<code>${esc(t)}</code>`).join(', ')}.</p>` : ''),
    '### Storybook props',
    docsEntry ? `<iframe class="docs-frame" loading="lazy" title="${esc(c.name)} props (Storybook)" src="${sbEmbed(docsEntry.id, 'docs')}"></iframe>\n\n[Open the Storybook docs page](${sbDocsUrl(docsEntry.id)})` : notice('Storybook has no docs page for this component.'),
  ].join('\n\n');

  // Design
  const gapSec = namingSections.find((s) => norm(s.head.split('(')[0]) === norm(gapAlias[name] ?? display));
  const unbound = figma.unbound?.[name];
  const design = [
    '### Figma',
    figmaUrl ? `<iframe class="figma-frame" loading="lazy" allowfullscreen title="${esc(display)} in Figma" src="https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaUrl)}"></iframe>\n\n[Open the Figma node](${figmaUrl}). Figma files can be team-only; if the frame is blank, use the link.` : notice('The board has no Figma link for this component.'),
    '### Variant matrix',
    matrix.length ? `${matrix.length} matrix stories:\n\n${matrix.map((e) => `- [${esc(e.name)}](${sbStoryUrl(e.id)})`).join('\n')}` : notice('No variant-matrix story exists for this component.'),
    '### Themes',
    `- Light: the values on the Code tab.\n- Dark: ${hasDarkMode ? 'see the Code tab.' : 'not available. The Figma export has these modes only: ' + modeNames.map((m) => '`' + m + '`').join(', ') + '. A dark column cannot be filled in without inventing values.'}`,
    '### Unbound values',
    unbound?.length ? unbound.map((u) => `- ${esc(u)}`).join('\n') : notice(figma.liveReadNote ?? 'No live Figma read of unbound values is recorded in data/figma.json for this component.'),
    '### Design gaps',
    gapSec ? `Recorded in [docs/naming-suggestions.md](${GH}/blob/${commit}/docs/naming-suggestions.md), section "${esc(gapSec.head)}":\n\n${gapSec.body.split('\n').filter((l) => l.startsWith('|') || l.startsWith('**Status')).map((l) => (l.startsWith('|') ? l.replace(/[{}<>]/g, (ch) => `&#${ch.charCodeAt(0)};`) : esc(l.replace(/\*\*/g, '')))).join('\n')}` : notice('docs/naming-suggestions.md records no design gap against this component.'),
  ].join('\n\n');

  // Changelog
  const cl = commitsFor(c.dir);
  const changelog = ['### Commits, newest first', cl.length ? cl.map(commitLine).join('\n') : notice('git has no commits for this folder.')].join('\n\n');

  const sbLink = docsEntry ? sbDocsUrl(docsEntry.id) : null;
  const body = `${fm(display, `${display}: usage, examples, code, design and changelog.`)}import { Tabs, TabItem } from '@astrojs/starlight/components';

<div class="header-strip">
<span class="pill">Status: ${esc(status)}</span>
<span class="pill">Version: ${esc(shipLabel(cl[cl.length - 1] ?? { H: commit }))}</span>
${sbLink ? `<a href="${sbLink}">Storybook</a>` : '<span class="missing">Storybook: no page</span>'}
${figmaUrl ? `<a href="${figmaUrl}">Figma</a>` : ''}
<a href="${srcUrl}">Source</a>
</div>

<Tabs>
<TabItem label="Usage">

### When to use

${list(I?.use_when, intentNote('use_when') + ' Figma has no usage region for this component.')}

${I?.placement?.length ? `### Where it goes

${list(I.placement)}

` : ''}### When not to use

${dont}

### Best practice

${list(I?.best_practice, intentNote('best_practice'))}

### Variants

${variants}

### Accessibility

${a11y}

### Composition

${pairs}

### What this version promises

${promises}

</TabItem>
<TabItem label="Examples">

${examples}

</TabItem>
<TabItem label="Code">

${code}

</TabItem>
<TabItem label="Design">

${design}

</TabItem>
<TabItem label="Changelog">

${changelog}

</TabItem>
</Tabs>
`;
  write(`core/components/${slugify(name)}.mdx`, body);
  return { name, display, status, matrix: matrix.length, stories: storyEntries.length, props: c.props.length, tokens: c.cssVars.length, commits: cl.length, hasIntent: !!I, intentEmpty: I ? ['use_when', 'dont_use_when', 'best_practice', 'placement', 'pairs_with', 'a11y'].filter((k) => !I[k]?.length) : ['no intent file'], tokenDrift: tokenDrift.length, sbDocs: !!docsEntry, hasFigma: !!figmaUrl };
}

function linkComponent(label) {
  const k = norm(label);
  const hit = cleared.find((n) => norm(n) === k);
  return hit ? `[${esc(hit)}](/core/components/${slugify(hit)}/)` : esc(label);
}

// ---------- pages ----------
const rows = eligible.map(componentPage);

// All components
write(
  'core/components/index.mdx',
  `${fm('All components', 'Every component on the public surface, with status and links.')}${eligible.length} components, built from commit \`${short}\`.

| Component | Status | Stories | Props | Tokens |
|---|---|---|---|---|
${rows.map((r) => `| [${esc(r.display)}](/core/components/${slugify(r.name)}/) | ${esc(r.status)} | ${r.stories + r.matrix === 0 ? '' : `${r.stories + r.matrix}`} | ${r.props} | ${r.tokens} |`).join('\n')}
`,
);

// Tokens
const groups = new Map();
for (const [k, v] of tokens) {
  const g = /^--color-(bg|text|icon|border|accent)-/.test(k) ? 'Semantic colour' : /^--color-/.test(k) ? 'Core colour' : /^--(spacing|size|borderradius|borderwidth)/.test(k) ? 'Spacing, size, radius, border' : /^--(typography|cozy-corner-typography)/.test(k) ? 'Typography (semantic)' : /^--(fontfamily|fontsize|fontweight|lineheight|letterspacing)/.test(k) ? 'Typography (core)' : 'Other';
  if (!groups.has(g)) groups.set(g, []);
  groups.get(g).push([k, v]);
}
const swatch = (k, v) => (/^--color-/.test(k) ? `<span class="swatch" style="background:var(${k})"></span>` : '');
const order = ['Semantic colour', 'Core colour', 'Spacing, size, radius, border', 'Typography (semantic)', 'Typography (core)', 'Other'];
write(
  'core/tokens.mdx',
  `${fm('Tokens', 'Every token in tokens.css, with its light value.')}Generated from \`build/tokens/css/tokens.css\` at commit \`${short}\`. Components use semantic tokens only. Modes in the Figma export: ${modeNames.map((m) => '`' + m + '`').join(', ')}.

${hasDarkMode ? '' : '<p class="missing"><strong>Design gap.</strong> There is no dark mode in the token export, so no token has a dark value. The Dark column is not shown rather than filled in.</p>'}

${order.filter((g) => groups.has(g)).map((g) => `## ${g}\n\n| | Token | Light value | Note |\n|---|---|---|---|\n${groups.get(g).map(([k, v]) => `| ${swatch(k, v)} | \`${k}\` | ${cell(v.value)} | ${cell(v.note)} |`).join('\n')}`).join('\n\n')}
`,
);

// Changelog (whole repo)
const all = commitsFor('.');
write(
  'get-started/changelog.mdx',
  `${fm('Changelog', 'Every commit to the repo up to the pinned commit.')}Built from \`git log\` at \`${short}\`. ${published ? `Latest published version: **${esc(published.version)}**.` : `No version has been published yet; the package.json version is **${esc(pkg.version)}**, so every commit below is *unreleased*.`}

${all.map(commitLine).join('\n')}
`,
);

// News: merged pull requests with their commit dates
const prs = all.filter((c) => /^Merge pull request #\d+/.test(c.s)).slice(0, 12);
write(
  'get-started/news.mdx',
  `${fm('News', 'Recently merged pull requests.')}Each entry is a merged pull request, dated by its merge commit. Nothing here is written by hand.

${prs.length ? prs.map((c) => `- ${c.d} · [${esc(c.s)}](${GH}/commit/${c.H})`).join('\n') : notice('No merged pull request found.')}
`,
);

// Roadmap: only what a repo file states, no dates, owners or priorities
const waivers = read('docs/release-waivers.md');
const before10 = waivers.split('\n').filter((l) => /before 1\.0/i.test(l)).map((l) => l.split('|').filter(Boolean).map((s) => s.trim()));
write(
  'get-started/roadmap.mdx',
  `${fm('Roadmap', 'What the repo itself says is still open. No dates, owners or priorities are stated.')}This page lists open items that a file in the repo states. It gives no dates, owners or priorities because no source does.

## Before 1.0

- Figma names that clash with HTML terms were accepted for ${esc(pkg.version)} and "revisit before 1.0" ([docs/naming-suggestions.md](${GH}/blob/${commit}/docs/naming-suggestions.md)).
${before10.map((r) => `- Waived check ${esc(r[0])} for ${esc(r[1])}: ${esc(r[2])} ([docs/release-waivers.md](${GH}/blob/${commit}/docs/release-waivers.md))`).join('\n')}

## Design gaps

- ${hasDarkMode ? 'Dark mode exists in the token export.' : 'The token export has no dark mode (modes: ' + modeNames.map((m) => '`' + m + '`').join(', ') + ').'}
- Components with no Figma usage region or empty intent fields are listed on their own pages under the "Not available" notices.
`,
);

// Versioning (from VERSIONING.md, verbatim)
write(
  'get-started/versioning.md',
  `${fm('Versioning', 'How the package is versioned.')}${read('VERSIONING.md').replace(/^# .*\n+/, '')}\n\n*Source: [VERSIONING.md](${GH}/blob/${commit}/VERSIONING.md) at \`${short}\`.*\n`,
);

// Home
const readmeFirst = read('README.md').split('\n\n')[1].trim();
// Install, in two steps: the package, then its peer dependencies (the major version comes from package.json).
const reactPeer = (pkg.peerDependencies?.react ?? '').match(/\d+/)?.[0] ?? '';
const installCmd = `npm install ${PKG}`;
const peerCmd = `npm install react@^${reactPeer} react-dom@^${reactPeer}`;
write(
  'index.mdx',
  `---
title: Cozy Corner Design System
description: ${JSON.stringify(readmeFirst.slice(0, 160))}
template: splash
hero:
  tagline: ${JSON.stringify(readmeFirst)}
  actions:
    - text: Start designing
      link: /designing/introduction/
      icon: right-arrow
    - text: Start coding
      link: /developing/introduction/
      variant: secondary
    - text: Open Storybook
      link: ${SB}
      variant: minimal
---

import { LinkCard, CardGrid } from '@astrojs/starlight/components';

<div class="latest">

## ${published ? esc(published.version) : `${esc(pkg.version)} <small>(not published yet)</small>`}

${published ? `Published ${esc(published.date)}` : 'Publish date: not published yet'} · ${componentNames.length} components on the public surface · ${semanticCount} semantic tokens · ${modeNames.length} Figma modes.

\`\`\`bash
${installCmd}
\`\`\`

React ${reactPeer} is a peer dependency. If your app does not already have them:

\`\`\`bash
${peerCmd}
\`\`\`

</div>

<CardGrid>
  <LinkCard title="Designing" href="/designing/introduction/" />
  <LinkCard title="Developing" href="/developing/introduction/" />
  <LinkCard title="Components" href="/core/components/" />
  <LinkCard title="Tokens" href="/core/tokens/" />
</CardGrid>

<p class="provenance">Built from commit <code>${short}</code>.</p>
`,
);

// Sidebar (written out in order; a missing page fails the build)
const sidebar = `// GENERATED by scripts/generate.mjs. The order is fixed by the astro-page skill.
export default [
  { label: 'Get Started', items: ['get-started/changelog', 'get-started/roadmap', 'get-started/news', 'get-started/versioning', 'get-started/upgrading'] },
  { label: 'Designing', items: ['designing/introduction'] },
  { label: 'Developing', items: ['developing/introduction', 'developing/react', 'developing/react-router'] },
  { label: 'Skills', items: ['skills/knowledge-skill'] },
  { label: 'Core', items: [{ label: 'Components', items: ['core/components', ${eligible.map((n) => `'core/components/${slugify(n)}'`).join(', ')}] }, 'core/tokens'] },
  { label: 'Styling', items: ['styling/theming'] },
  { label: 'Help', items: ['help/faq', 'help/report-a-bug', 'help/request-a-feature', 'help/contributing', 'help/embedding'] },
];
`;
fs.writeFileSync(path.join(site, 'sidebar.generated.mjs'), sidebar);

// Build record
fs.writeFileSync(
  path.join(site, 'data/build-info.json'),
  JSON.stringify({ commit, version: pkg.version, published, components: eligible, pages: rows }, null, 2) + '\n',
);
console.log(`generated ${rows.length} component pages at ${short}`);
console.log(JSON.stringify(rows.map((r) => ({ n: r.name, st: r.stories, mx: r.matrix, pr: r.props, tk: r.tokens, cm: r.commits, empty: r.intentEmpty.join('/'), drift: r.tokenDrift, sb: r.sbDocs })), null, 0));
