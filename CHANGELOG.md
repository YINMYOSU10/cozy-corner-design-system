# Changelog

All notable changes to `@cozy-corner-design-system/components` are listed here. The format
follows [Keep a Changelog](https://keepachangelog.com), and the version numbers follow
`VERSIONING.md`: while the version is 0.x, a minor release may include breaking changes
and says so here.

## [Unreleased]

## [0.1.1] - 2026-10-21

A documentation release: no component or token changed.

### Added
- `CHANGELOG.md` and `VERSIONING.md` are now included in the published package.

### Changed
- The README shows the install in two steps: the package, then the React 19 peer dependency (`npm install react@^19 react-dom@^19`).

### Fixed
- Nothing.

### Deprecated
- Nothing.

### Removed
- Nothing.

## [0.1.0] - 2026-10-21

The first release.

### Added
- 28 React components, exported from one entry point (`@cozy-corner-design-system/components`):
  Avatar, Badge, Breadcrumb, Button (and the Destructive, Info and Neutral variants), Card,
  Chip, DetailRow, Divider, Fields, Footer, Header, Icon, Link, Loading, Logo,
  MediaContainer, ProgressBar, ProgressLoadingMobile, ProgressLoadingWebsite, Sidebar,
  StatusBar, Table, Tag, Toggle and TopBar, with their subcomponents and types.
- `tokens.css` (the design tokens as CSS custom properties) and `styles.css` (every
  component's styles), importable as `@cozy-corner-design-system/components/tokens.css`
  and `.../styles.css`.
- ESM and CommonJS builds, and TypeScript type definitions.
- A README with the install command and a usage example, and `VERSIONING.md` describing
  what a version number promises.

### Changed
- Nothing. This is the first release.

### Fixed
- Nothing. This is the first release.

### Deprecated
- Nothing.

### Removed
- Nothing.

### Known issues
- The package has no automated tests yet; `npm test` finds no test files.
- Some Figma property names clash with HTML terms (for example `Type` and `Disable`). They
  were accepted as they are for 0.1.0 (`docs/naming-suggestions.md`) and may be renamed in
  a later minor release, which would be listed here.
- The Figma accessibility guidance for Chip, Table, Card, Footer, Header and TopBar describes
  behaviour the code does not implement yet.
- Dark mode tokens are not part of the token export, so the package ships light-mode values only.

[Unreleased]: https://github.com/YINMYOSU10/cozy-corner-design-system/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/YINMYOSU10/cozy-corner-design-system/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/YINMYOSU10/cozy-corner-design-system/releases/tag/v0.1.0
