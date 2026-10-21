---
title: "Versioning"
description: "How the package is versioned."
---

The package is published as `@cozy-corner-design-system/components` and follows
[semantic versioning](https://semver.org): `MAJOR.MINOR.PATCH`.

## While the version is 0.x

The API is still settling, so:

- **Patch** (`0.1.0` to `0.1.1`): bug fixes only. No prop, component or token is added, removed or renamed.
- **Minor** (`0.1.x` to `0.2.0`): new components, props or tokens, and **breaking changes are allowed**, including renames. Each breaking change is listed under "changed" or "removed" in the changelog.

Pin an exact version (or a `~` range) in your app if you cannot absorb a breaking change in a minor release.

## From 1.0

- **Patch**: bug fixes only.
- **Minor**: additions only. Nothing that worked stops working.
- **Major**: any breaking change.

## What counts as breaking

Removing or renaming a component, a prop, a prop value, an exported type, or a token that a component's CSS depends on; or changing what a prop value does.

## Names that may still change before 1.0

Some Figma property names clash with HTML terms (for example `Type` and `Disable`). They are listed in `docs/naming-suggestions.md` and were accepted as they are for 0.1.0.


*Source: [VERSIONING.md](https://github.com/YINMYOSU10/cozy-corner-design-system/blob/4fab5eb8099283d987dd4441eec2fe21df1c3420/VERSIONING.md) at `4fab5eb`.*
