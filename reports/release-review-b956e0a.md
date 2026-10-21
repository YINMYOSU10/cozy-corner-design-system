# Release review at b956e0a

- **Reviewed commit:** `b956e0a689096689a4a1a3f246aeac13fa19552f` (main, level with origin/main)
- **Tree:** clean (only untracked `.claude/worktrees/`, `docs-site/.astro/`, `docs-site/dist/`)
- **Date:** 2026-10-21
- **Scope:** all 28 components, every one `Development = Completed` on the board
- **Build:** `npm run build:package` passes; `npm run lint` (tsc) passes; `npm test` finds no test files (exits 0)
- **Package preview:** `npm pack --dry-run` lists 110 files, 402.5 kB, `README.md` included, no source and no credentials; `react` and `react-dom` are peer dependencies

## Verdict

**Blocked**

Reasons: Gate 5 fails, Gate 7 fails, Check 6 fails. Details below.

## The 7 gates

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | 28 of 28 folders have `<Name>.intent.json` |
| 2 | Development status | PASS | Airtable: all 28 rows read `Completed` |
| 3 | Tokens clean | PASS | No raw hex, px or literal font in any component `.css` or `.tsx` outside comments (`font-family` always `var(--...)`). Remaining `px` hits are comments recording design gaps: `Sidebar/Sidebar.tsx:38`, `Card/CardText.tsx:120`, `StatusBar/StatusBar.tsx:45`, `Table/TableCell.tsx:108`. `git status` clean for `tokens/`; `build/` and `dist/` are gitignored. |
| 4 | Public surface decided | PASS | 28 folders, 28 `export *` lines in `src/index.ts`; internal helpers (Button/PlusIcon, Logo/LogoGlyph, Icon internals) are recorded in the header comment of `src/index.ts` |
| 5 | Names final | **FAIL** | `docs/naming-suggestions.md` has open suggestions on names that are exported: Button (`Type`, `Disable`, `Icon-style` `none`), Fields (`Type`, `Size`/`Lg`, `Disable`, `Active`, layer name), Progress Loading / Mobile (Figma set name vs `ProgressLoadingMobile`). None is marked resolved or accepted. |
| 6 | States complete | PASS (with notes) | Every folder has a stories file; every string value of each exported state/size/type union appears in its stories, and the QA reports in `reports/` list no missing stories. Not found by text match, covered by sub-component story files per QA: `Sidebar` (item Hover, expand None, sub-item Hover), `Card` container types (internal). |
| 7 | Version meaning known | **FAIL** | No version is named or written down by a human: no release PR, no `VERSIONING.md`, no Versioning page on `main`. The instruction was "prepare for release" with no version. `package.json` is `0.1.0`, `private: true`. Not inferred. |

## The 6 checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS (gap noted) | All 8 fields exist in 28 of 28 files. `DetailRow.intent.json` has an empty `a11y` array (recorded gap). `placement` is empty on some components (e.g. Badge). |
| 2 | Alternatives named | WARNING | Many `dont_use_when` entries have empty `use_instead`. Count by component: Avatar 2/4, Badge 5/5, Breadcrumb 3/5, Button 4/5, ButtonDestructive 3/3, ButtonInfo 3/3, Card 3/5, Chip 1/5, DetailRow 2/4, Divider 5/5, Footer 3/4, Header 1/4, Icon 2/3, Link 1/3, Loading 3/5, Logo 5/5, ProgressBar 4/5, ProgressLoadingMobile 3/5, ProgressLoadingWebsite 3/5, Sidebar 3/5, StatusBar 4/4, Table 3/5, Tag 2/5, TopBar 2/4. Clean: ButtonNeutral, Fields, MediaContainer, Toggle. Warning only. |
| 3 | a11y specific | PASS (gap noted) | Every fact in 27 files has a `source` of the form `path:line` and the line exists in the file. `DetailRow` has no a11y facts. Known finding (reported, not fixed): Figma accessibility claims that are not implemented in code for Chip, Table, Card, Footer, Header, TopBar. |
| 4 | Tokens resolve | PASS | Every `required_tokens` entry in all 28 files is defined in the built `dist/tokens.css` |
| 5 | All variants covered | PASS (notes) | Every exported variant union has a `variant_intent` key. Sub-part unions are not in `variant_intent`: `BreadcrumbItemLinkState`, `HeaderNavItemState`, `SidebarSubItemState`, Card container types, `TableHeaderCellAlign`. `ButtonDestructive`, `ButtonInfo`, `ButtonNeutral`, `DetailRow`, `Divider`, `TopBar` define variants in props rather than exported unions; their `variant_intent` keys match their props. |
| 6 | No overlap | **FAIL** | (a) `ButtonDestructive` and `ButtonInfo`: `use_when` is the same text, and both also repeat the Button rules (human has confirmed this borrowing is intended, but the check still reads as an overlap; a human has to waive it). (b) `Loading`, `ProgressLoadingMobile`, `ProgressLoadingWebsite` share the same generic lines ("When submitting a form or saving changes", "When fetching data or moving between screens"); Mobile and Website differ only by platform. |

## Findings by file

- `docs/naming-suggestions.md`: Button, Fields and Progress Loading / Mobile sections still open (Gate 5)
- `package.json` / no VERSIONING.md: version promise not written (Gate 7)
- `src/components/ButtonDestructive/ButtonDestructive.intent.json`, `src/components/ButtonInfo/ButtonInfo.intent.json`, field `use_when`: same text as each other (Check 6)
- `src/components/Loading/Loading.intent.json`, `ProgressLoadingMobile`, `ProgressLoadingWebsite`, field `use_when`: shared generic lines (Check 6)
- `src/components/DetailRow/DetailRow.intent.json`, field `a11y`: empty
- `use_instead` empty in many `dont_use_when` entries (Check 2 warning)
- Figma a11y claims not implemented in code: Chip, Table, Card, Footer, Header, TopBar (reported for a human; nothing fixed here)
- `npm test`: no test files exist, so the `prepublishOnly` test step proves nothing

## Per-component verdict

All 28 components: **Blocked** (Gate 5, Gate 7 and Check 6 are release-wide or touch the shared set; Gates 5 and 6 and Check 6 name the specific components above). Nothing is Cleared, so nothing is packaged and no docs site is staged from this review.
