---
title: React
description: React requirements for the package.
---

- `react` and `react-dom` (`^19.3.1`) are peer dependencies: you bring your own copy.
- The package is ESM with a CommonJS build and type declarations. Its `exports` are `.`, `./styles.css` and `./tokens.css`.
- Everything is exported from the package root. Each component's props are listed on its page, Code tab.
- Components that pin an interaction look (`state="Hover"`, `Focus`, `Press`) do so for docs and QA; `Default` lets real hover, press and focus happen.
