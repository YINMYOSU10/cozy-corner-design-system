---
title: Contributing
description: Guidelines for contributors.
---

Thank you for helping. These are the rules the project follows.

## Tokens

- Tokens are the only source of visual values. Every colour, spacing, radius, font and shadow in a component references a token.
- Never hand-edit anything in `tokens/` or `build/`. The first is exported from Figma and the second is generated from it.
- Never invent a token. If the one you need does not exist, report the gap.

## Components

- Component names are PascalCase, one folder each in `src/components/`.
- Prop names match the Figma property names exactly.
- Every variant and every state has a story.
- Import components; never copy their styles.

## Pull requests

Pull requests into `main` come from `staging` only.

## Commands

| Job | Command |
|---|---|
| Install | `npm install` |
| Build tokens | `npm run build:tokens` |
| Run Storybook | `npm run storybook` |
| Test | `npm test` |
| Type check | `npm run lint` |
