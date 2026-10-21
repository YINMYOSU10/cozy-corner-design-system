# Release review at 4fab5eb

- **Reviewed commit:** `4fab5eb8099283d987dd4441eec2fe21df1c3420` (main, level with origin/main)
- **Tree:** clean (only untracked `.claude/worktrees/`, `docs-site/.astro/`, `docs-site/dist/`)
- **Date:** 2026-10-21
- **Scope:** all 28 components, every one `Development = Completed` on the board
- **Build:** `npm run build:package` passes; `npm run lint` passes; `npm test` finds no test files (exits 0, proves nothing)
- **Package:** `npm publish --dry-run` lists 110 files, 402.5 kB: `dist/` plus `README.md` and `package.json`. No source, no credentials found. `react` and `react-dom` are peer dependencies. Smoke install of the packed tarball into an empty folder: 964 exports, `Button` renders, `tokens.css` and `styles.css` present.
- **Supersedes:** `reports/release-review-b956e0a.md` (Blocked). Reviewed afresh, results not copied.

## Verdict

**Cleared**

All 7 gates pass. Check 6 is WAIVED for 0.1.0. Checks 1, 3, 4, 5 pass with notes. Check 2 is a warning.

## The 7 gates

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | 28 of 28 folders have `<Name>.intent.json` |
| 2 | Development status | PASS | Airtable: 28 of 28 rows read `Completed` |
| 3 | Tokens clean | PASS | No raw hex, px or literal font value in any component `.css`/`.tsx` outside comments. Remaining `px` hits are comments recording design gaps: `Sidebar/Sidebar.tsx:38`, `StatusBar/StatusBar.tsx:45`, `Table/TableCell.tsx:108`. `tokens/` has no diff against git; `build/` and `dist/` are generated and gitignored. |
| 4 | Public surface decided | PASS | 28 folders, 28 `export *` lines in `src/index.ts`; internal helpers recorded in its header comment |
| 5 | Names final | PASS | The 3 sections of `docs/naming-suggestions.md` (Button / Primary, Fields, Progress Loading / App) are each marked "Accepted for 0.1.0 (decided by Yin Myo Su, 2026-10-21)" |
| 6 | States complete | PASS (notes) | Every folder has a stories file; every string value of each exported state/size/type union appears in its stories, except the `CardContainerType` values (see notes). |
| 7 | Version meaning known | PASS | `VERSIONING.md` written by a human, defines patch/minor for 0.x and from 1.0 |

## The 6 checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS (gaps noted) | All 8 fields exist in 28 of 28. Empty `placement`: Avatar, Badge, Button, ButtonDestructive, ButtonInfo, ButtonNeutral, Divider, Fields, Icon, Link, Loading, MediaContainer, ProgressLoadingMobile, ProgressLoadingWebsite. Empty `a11y`: DetailRow. These are recorded gaps. |
| 2 | Alternatives named | WARNING | Empty `use_instead` in `dont_use_when` for 24 components (field `dont_use_when`): Avatar 2/4, Badge 5/5, Breadcrumb 3/5, Button 4/5, ButtonDestructive 3/3, ButtonInfo 3/3, Card 3/5, Chip 1/5, DetailRow 2/4, Divider 5/5, Footer 3/4, Header 1/4, Icon 2/3, Link 1/3, Loading 3/5, Logo 5/5, ProgressBar 4/5, ProgressLoadingMobile 3/5, ProgressLoadingWebsite 3/5, Sidebar 3/5, StatusBar 4/4, Table 3/5, Tag 2/5, TopBar 2/4 |
| 3 | a11y specific | PASS (gap noted) | Every fact in 27 files has a `source` `path:line` that exists. DetailRow has none. Known reported finding, not a blocker: Figma accessibility claims not implemented in code for Chip, Table, Card, Footer, Header, TopBar. |
| 4 | Tokens resolve | PASS | Every `required_tokens` entry in all 28 files is defined in the built `dist/tokens.css` |
| 5 | All variants covered | PASS (notes) | Every exported component variant union has a `variant_intent` key. Sub-part unions have none: `BreadcrumbItemLinkState`, `HeaderNavItemState`, `TableHeaderCellAlign`, `CardTextType` (BookDescription, ReportText), `CardContainerType`. |
| 6 | No overlap | **WAIVED** | Overlaps found: ButtonDestructive/ButtonInfo (3 identical `use_when` lines); Loading/ProgressLoadingMobile/ProgressLoadingWebsite (shared generic lines, plus a line shared by Mobile and Website). Both pairs waived for 0.1.0 in `docs/release-waivers.md` (Yin Myo Su, 2026-10-21). Not a PASS. |

## Notes for a human (not blockers)

- `Card` exports `CardContainerType` and `CardTextType`. Container type values have no story of their own and no `variant_intent` entry; they are derived from `platform`, which has stories. Judged covered by the platform stories, as in the first review. A human may disagree.
- `src/components/DetailRow/DetailRow.intent.json`, field `a11y`: empty.
- `npm test` has no test files, so `prepublishOnly` tests prove nothing.
- Token type check for npm auth (preflight 4) could not be read in this run; see the release card.

## Per-component verdict

All 28 components: **Cleared** (Check 6 WAIVED on ButtonDestructive, ButtonInfo, Loading, ProgressLoadingMobile, ProgressLoadingWebsite).
