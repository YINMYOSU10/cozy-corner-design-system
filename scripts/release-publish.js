// Usage: npm run release:publish -- <version> [--dry-run]
// After a real publish the version bump is committed on release/v<version>, never on the
// branch you ran this from.
//
// package.json carries "private": true so a stray `npm publish` is refused.
// This script is the only thing that lifts that guard, and only for the one
// publish command. The guard is put back:
//   1. inline, straight after the publish command returns,
//   2. on process 'exit' (runs for process.exit() and normal exits, which
//      `finally` does NOT cover),
//   3. on SIGINT / SIGTERM.
// The restore is synchronous and idempotent, so running it more than once is safe.
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const PKG = 'package.json';
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const version = args.find((a) => !a.startsWith('--'));

const fail = (msg) => { console.error(`\nrelease:publish refused: ${msg}`); process.exit(1); };

if (!version || !/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(version)) {
  fail('give a version, e.g. npm run release:publish -- 0.1.0 [--dry-run]');
}

const originalText = readFileSync(PKG, 'utf8');
const original = JSON.parse(originalText);
const name = original.name;
if (original.private !== true) {
  fail('package.json is not "private": true. A previous run may have been interrupted: fix that first.');
}

// ---- the guard restore ------------------------------------------------------
let guardLifted = false;
let publishedVersion = null; // set only after a real publish succeeds
function restoreGuard() {
  if (!guardLifted) return;
  try {
    const restored = JSON.parse(originalText);
    restored.private = true;
    // Keep the new version only if it really went out.
    if (publishedVersion) restored.version = publishedVersion;
    writeFileSync(PKG, JSON.stringify(restored, null, 2) + '\n');
    guardLifted = false;
  } catch (e) {
    console.error('!! COULD NOT RESTORE "private": true in package.json. Restore it by hand:', e);
  }
}
process.on('exit', restoreGuard);
process.on('SIGINT', () => { restoreGuard(); process.exit(130); });
process.on('SIGTERM', () => { restoreGuard(); process.exit(143); });

// ---- helpers ----------------------------------------------------------------
function run(cmd, cmdArgs, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, cmdArgs, { stdio: opts.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit', cwd: opts.cwd });
    let out = '';
    child.stdout?.on('data', (d) => (out += d));
    child.stderr?.on('data', (d) => (out += d));
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0 || opts.allowFail) resolve({ code, out });
      else reject(new Error(`${cmd} ${cmdArgs.join(' ')} exited with ${code}${opts.capture ? `\n${out}` : ''}`));
    });
  });
}
const step = (t) => console.log(`\n== ${t}`);

async function main() {
  step('Gate: working tree is clean (tracked files)');
  const status = (await run('git', ['status', '--porcelain', '--untracked-files=no'], { capture: true })).out.trim();
  if (status) fail(`uncommitted changes:\n${status}`);

  step('Gate: version not already on the registry');
  const view = await run('npm', ['view', `${name}@${version}`, 'version'], { capture: true, allowFail: true });
  if (view.code === 0 && view.out.trim()) fail(`${name}@${version} is already published.`);
  if (view.code !== 0 && !/E404|404 Not Found/.test(view.out)) {
    fail(`could not confirm the registry state (failing closed):\n${view.out}`);
  }
  const tagExists = (await run('git', ['rev-parse', '-q', '--verify', `refs/tags/v${version}`], { capture: true, allowFail: true })).code === 0;
  if (tagExists) fail(`git tag v${version} already exists.`);

  step('Gates: type check, tests, full package build');
  await run('npm', ['run', 'lint']);
  await run('npm', ['test']);
  await run('npm', ['run', 'build:package']);

  step(`Publish ${name}@${version}${dryRun ? ' (dry run)' : ''}`);
  const next = JSON.parse(originalText);
  next.version = version;
  delete next.private;
  guardLifted = true;
  writeFileSync(PKG, JSON.stringify(next, null, 2) + '\n');
  try {
    // prepublishOnly runs build:package + tests once more here.
    await run('npm', ['publish', '--access', 'public', ...(dryRun ? ['--dry-run'] : [])]);
    if (!dryRun) publishedVersion = version;
  } finally {
    restoreGuard(); // inline restore; exit/SIGINT handlers are the backstop
  }

  if (!dryRun) {
    // main only takes PRs from staging, so the version bump never lands on main
    // directly: it goes on its own branch, which is tagged and left for a PR.
    step(`Tag v${version} on branch release/v${version}`);
    const start = (await run('git', ['branch', '--show-current'], { capture: true })).out.trim();
    await run('git', ['switch', '-c', `release/v${version}`]);
    try {
      await run('git', ['add', PKG]);
      // --allow-empty: on a first release package.json already holds this version.
      await run('git', ['commit', '--allow-empty', '-m', `Release ${version}`]);
      await run('git', ['tag', '-a', `v${version}`, '-m', `v${version}`]);
    } finally {
      await run('git', ['switch', start], { allowFail: true });
    }
    console.log(`Created branch release/v${version} and tag v${version} locally; ${start} is untouched.`);
    console.log(`Next, by a person or the release agent: git push origin release/v${version} v${version}`);
    console.log(`then open a PR from release/v${version} into staging (a human merges it).`);
  }

  step('Verify: install into an empty folder and render a component');
  const dir = mkdtempSync(join(tmpdir(), 'cc-verify-'));
  try {
    let spec;
    if (dryRun) {
      // Nothing is on the registry, so verify the tarball npm would upload.
      const pack = await run('npm', ['pack', '--pack-destination', dir, '--json'], { capture: true });
      const packed = readdirSync(dir).find((f) => f.endsWith('.tgz'));
      if (!packed) throw new Error(`npm pack produced no tarball:\n${pack.out}`);
      spec = join(dir, packed);
    } else {
      spec = `${name}@${version}`;
    }
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'cc-verify', private: true, type: 'module' }));
    const react = original.devDependencies.react;
    const reactDom = original.devDependencies['react-dom'];
    // A fresh publish can take a moment to appear; retry the real install.
    for (let attempt = 1; ; attempt++) {
      const r = await run('npm', ['install', '--no-audit', '--no-fund', spec, `react@${react}`, `react-dom@${reactDom}`], { cwd: dir, capture: true, allowFail: true });
      if (r.code === 0) break;
      if (dryRun || attempt >= 6) throw new Error(`install failed:\n${r.out}`);
      await new Promise((res) => setTimeout(res, 10000));
    }
    writeFileSync(join(dir, 'check.mjs'), `
      import { createElement } from 'react';
      import { renderToString } from 'react-dom/server';
      import { Button } from '${name}';
      import { createRequire } from 'node:module';
      const html = renderToString(createElement(Button));
      if (!html.includes('cc-button')) { console.error('render check failed:', html); process.exit(1); }
      const req = createRequire(import.meta.url);
      for (const f of ['styles.css', 'tokens.css']) req.resolve('${name}/' + f);
      console.log('rendered Button from the installed package:', html.slice(0, 120));
    `);
    await run('node', ['check.mjs'], { cwd: dir });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }

  console.log(`\nDone${dryRun ? ' (dry run: nothing was published or tagged)' : `: ${name}@${version} is published and verified`}.`);
}

main().catch((e) => {
  console.error(`\nrelease:publish failed: ${e.message}`);
  process.exit(1); // the 'exit' handler restores the guard
});
