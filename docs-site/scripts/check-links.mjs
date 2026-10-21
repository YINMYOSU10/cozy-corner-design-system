// Zero broken internal links: every internal href/src in dist/ must resolve to a file.
import fs from 'node:fs'; import path from 'node:path';
const dist = path.resolve('dist'); let pages = 0, broken = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk(dist);
for (const f of files.filter((x) => x.endsWith('.html'))) {
  pages++;
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"#?]*)(?:[#?][^"]*)?"/g)) {
    const u = m[1]; if (!u || /^(https?:|mailto:|data:|\/\/)/.test(u)) continue;
    const t = u.startsWith('/') ? path.join(dist, u) : path.resolve(path.dirname(f), u);
    if (!(fs.existsSync(t) && fs.statSync(t).isFile()) && !fs.existsSync(path.join(t, 'index.html'))) broken.push(`${path.relative(dist, f)} -> ${u}`);
  }
}
console.log(`pages ${pages}, broken internal links ${broken.length}`); broken.slice(0, 20).forEach((b) => console.log(b));
process.exit(broken.length ? 1 : 0);
