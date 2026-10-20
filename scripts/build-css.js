// Builds dist/styles.css (src/styles.css with its @imports inlined, in order)
// and dist/tokens.css (a copy of the generated token file). Run after tsup,
// which cleans dist.
import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const entry = resolve('src/styles.css');
const out = [];
for (const line of readFileSync(entry, 'utf8').split('\n')) {
  const m = line.match(/^@import '(.+)';$/);
  if (!m) { out.push(line); continue; }
  out.push(readFileSync(resolve(dirname(entry), m[1]), 'utf8').trimEnd());
}
mkdirSync('dist', { recursive: true });
writeFileSync('dist/styles.css', out.join('\n') + '\n');
copyFileSync('build/tokens/css/tokens.css', 'dist/tokens.css');
console.log('dist/styles.css and dist/tokens.css written');
