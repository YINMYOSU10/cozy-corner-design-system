---
title: Embedding
description: Embedding Storybook stories and Figma frames.
---

This site embeds each story from the deployed Storybook with its iframe URL:

```text
https://cozy-corner-design-system.vercel.app/iframe.html?id=<story-id>&viewMode=story
```

Story ids come from Storybook's `index.json`. Figma frames are embedded with Figma's embed URL for the component's node; team-only files may show blank.
