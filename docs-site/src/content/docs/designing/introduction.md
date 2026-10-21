---
title: Introduction
description: How designers work with the Cozy Corner design system.
---

The system is built from Figma and shipped as React components styled entirely by design tokens.

- Colours, spacing, radii, fonts and shadows are **tokens** exported from Figma with the "Design Tokens" plugin and committed in `tokens/`. See [Tokens](/core/tokens/).
- Component **prop names and values match the Figma property names exactly**. If Figma says `size`, the prop is `size`.
- Each [component page](/core/components/) has a Design tab with the Figma node, the variant matrix and the design gaps recorded against it.
- Where a Figma name clashes with HTML (for example `Type` or `Disable`), the code keeps the Figma name and the suggestion is written in `docs/naming-suggestions.md`. Those names were accepted for 0.1.0.
- A token that exists in one Figma mode but not another is a design gap and is reported, not filled in. The export currently has no dark mode.
