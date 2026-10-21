# Cozy Corner Design System

A component can tell you how to call it, but not when you should, or when to reach for a different one. Every Cozy Corner component comes with that answer next to it: when to use it, when not to (and what to use instead), where it goes, and what each variant is for.

The system is built from Figma and shipped as React components styled entirely by design tokens.

- **Docs:** https://cozy-corner-docs.vercel.app
- **Storybook:** https://cozy-corner-design-system.vercel.app

## Install

```bash
npm install @cozy-corner-design-system/components react react-dom
```

`react` and `react-dom` (19) are peer dependencies: you bring your own copy.

## Use

Load the two stylesheets once, at the root of your app. Tokens first, then the components:

```ts
import '@cozy-corner-design-system/components/tokens.css';
import '@cozy-corner-design-system/components/styles.css';
```

Then import components by name:

```tsx
import { Button } from '@cozy-corner-design-system/components';

export function Example() {
  return <Button labelText="Save" size="48" />;
}
```

Prop names and values match the Figma property names exactly. Each component's props are documented in its Storybook page and docs page.

### Fonts

The system uses Fraunces, Karla, Inter and Fredoka from Google Fonts, and Material Symbols for icons. They are not bundled: load them in your app.

## What is in the package

Everything is exported from the package root: Avatar, Badge, Breadcrumb, Button (plus the Destructive, Info and Neutral variants), Card, Chip, DetailRow, Divider, Fields, Footer, Header, Icon, Link, Loading, Logo, MediaContainer, ProgressBar, ProgressLoadingMobile, ProgressLoadingWebsite, Sidebar, StatusBar, Table, Tag, Toggle and TopBar, with their subcomponents and types.

## Develop

| Job | Command |
|---|---|
| Install | `npm install` |
| Build tokens | `npm run build:tokens` |
| Run Storybook | `npm run storybook` |
| Test | `npm test` |
| Type check | `npm run lint` |
| Build the package | `npm run build:package` |

Colours, spacing, radii, fonts and shadows are tokens exported from Figma (`tokens/`) and turned into CSS by Style Dictionary. Components use semantic tokens only. Never edit `tokens/` or `build/` by hand. See `CLAUDE.md` for how we work and `tools.md` for the stack.

## Release

Releases go through `npm run release:publish -- <version>` (add `--dry-run` to rehearse). It runs every check, refuses a version that already exists, publishes, tags, and installs the published copy to confirm it renders. Never run a plain `npm publish`: the package is marked `"private": true` as a guard, and only that script lifts it.
