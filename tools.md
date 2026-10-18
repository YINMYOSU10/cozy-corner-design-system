# tools.md — what this project is built with

Stack facts and commands only. Rules about how we work live in `CLAUDE.md`.

## Stack

- Framework: React 19 with Vite
- Language: TypeScript, strict
- Package manager: npm
- Styling: CSS custom properties, generated from tokens
- Tokens: Style Dictionary v5, reading the Figma "Design Tokens" plugin export
- Component workshop: Storybook 10 (react-vite)
- Tests: Vitest
- Accessibility: Storybook a11y addon

## Commands

| Job | Command |
|---|---|
| Install | `npm install` |
| Build tokens | `npm run build:tokens` |
| Run Storybook | `npm run storybook` |
| Build Storybook | `npm run build-storybook` |
| Test | `npm test` |
| Type check | `npm run lint` |

## Paths

- Token source: `tokens/*.tokens.json` + `tokens/manifest.json` (exported from Figma, committed)
- Token config: `build-tokens.js`
- Generated output: `build/tokens/` (never edit by hand, gitignored)
  - CSS: `build/tokens/css/tokens.css`
  - iOS: `build/tokens/ios/`, Android: `build/tokens/android/`
- Components: `src/components/<Name>/`
- Agents: `.claude/agents/`
- Skills: `.claude/skills/`

## Deployment

- Host: Vercel (Hobby, free), project `cozy-corner-design-system`, connected to GitHub
- Preset: Storybook · Build command: `npm run build-storybook` · Output: `storybook-static`
- Production: `main` → https://cozy-corner-design-system.vercel.app
- Staging: the `staging` branch gets a Vercel preview URL. Branch previews may sit behind
  Vercel login — check before writing one to the registry.
- Verify a deploy by fetching `<url>/index.json` and parsing it. A 200 alone is not proof.

## Fonts and icons

- Fonts: Fraunces, Karla, Inter, Fredoka, loaded from Google Fonts.
- Icons: Material Symbols from Google Fonts (fonts.google.com/icons).

## Dependency rules

- Match the package manager in this file. This project uses npm, not yarn or pnpm.
- Use the existing package scripts before inventing commands.
- Do not add a dependency without explaining why in your report.
- Do not add a UI or component library. This repo is the component library.
- If this file disagrees with `package.json`, inspect the repo and say so.