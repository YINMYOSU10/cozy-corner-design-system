---
title: Contributing
description: How we work in the repo.
---

From `CLAUDE.md`:

- Tokens are the only source of visual values. Never hand-edit `tokens/` or `build/`. Never invent a token: report the gap.
- Components are PascalCase, one folder each in `src/components/`. Prop names match Figma property names.
- Every variant and every state has a story. A component's props are its documented API.
- Import components; never copy their styles.
- A component branch never merges into `main`; `main` accepts pull requests from `staging` only.
- A human approves; no agent approves its own work.

Commands: `npm install`, `npm run build:tokens`, `npm run storybook`, `npm test`, `npm run lint`.
