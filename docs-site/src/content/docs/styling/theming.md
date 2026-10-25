---
title: Theming
description: How tokens, modes and the stylesheets fit together.
---

- Every visual value in a component is a CSS custom property generated from Figma tokens. Semantic tokens point at core tokens; components use semantic tokens only.
- Load `tokens.css` before `styles.css` (see [Developing](/developing/introduction/)).
- The token export has these Figma modes: `value` (core), `light` (semantic) and the typography modes `website`, `mobile` and `dashboard`. There is **no dark mode** in the export, so there is nothing to switch to; a dark mode is a design gap.
- All values are on the [Tokens](/core/tokens/) page.
