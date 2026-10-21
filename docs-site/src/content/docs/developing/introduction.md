---
title: Introduction
description: Install the package and use a component.
---

Install the package with its two peer dependencies:

```bash
npm install @cozy-corner-design-system/components react react-dom
```

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

- Fonts are not bundled. The system uses Fraunces, Karla, Inter and Fredoka, plus Material Symbols for icons. Load them in your app.
- See [React](/developing/react/) for the peer dependencies and [Components](/core/components/) for every component's props.
