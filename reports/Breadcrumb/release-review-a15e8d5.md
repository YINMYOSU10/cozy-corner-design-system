# Release review — breadcrumb

| Row | Value |
|---|---|
| Reviewed commit | `a15e8d54ea3c39b95f27efaede5da73a686c0e9d` (2026-10-21T11:39:42+06:30), branch `main`, level with `origin/main` |
| Registry | Airtable Components row "Breadcrumb": `Development` = Released, `Design` = Done, Last Modified 2026-10-21T04:50:13.000Z |
| Figma | Component node `431-68` in file `MWuaFZQ58G4WvtbCyeaE1X` (cozy-corner.Global.Components.v1.0.0.In-Progress), link on the board's `Figma` column |
| Intent file | `src/components/Breadcrumb/Breadcrumb.intent.json`, last changed at commit `a2807a2 2026-10-21`; read at `a15e8d5` |
| Production Storybook | https://cozy-corner-design-system.vercel.app/?path=/docs/components-breadcrumb--docs |
| Verdict | Cleared |

This review is fresh: every result below was measured against the files at commit `a15e8d5`; nothing was carried over from earlier reviews. Build at this commit: `npm run build:package` passes, `npm run lint` passes.

## The 7 gates for Breadcrumb

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | `src/components/Breadcrumb/Breadcrumb.intent.json` exists and parses as JSON. |
| 2 | Development status | PASS | Airtable Components row "Breadcrumb": `Development` = Released at review (Design = Done). Gate accepts Completed or Released. |
| 3 | Tokens clean | PASS | Scanned Breadcrumb.css, Breadcrumb.tsx, BreadcrumbItemCurrent.tsx, BreadcrumbItemLink.tsx, BreadcrumbItemSeparator.tsx, index.ts with comments stripped: no raw hex, px, rgb() or literal font-family. `tokens/` has no diff against HEAD (empty diff); `build/` is generated and gitignored. |
| 4 | Public surface decided | PASS | `src/index.ts` has `export * from './components/Breadcrumb'`. The folder's `index.ts` exposes 9 names (Breadcrumb, BreadcrumbProps, BreadcrumbItem, BreadcrumbLevels, BreadcrumbItemLink, BreadcrumbItemLinkProps, BreadcrumbItemLinkState, BreadcrumbItemCurrent, ...). |
| 5 | Names final | PASS | No section in `docs/naming-suggestions.md` names "Breadcrumb", so no open suggestion touches its names. Prop names read from the component's types are listed under gate 6. |
| 6 | States complete | PASS | 1 stories file(s), 9 exported stories (Playground, Levels2, Levels3, Levels4, ItemLinkDefault, ItemLinkHover, ItemLinkFocused, ItemCurrent, ItemSeparator). Exported unions: BreadcrumbItemLinkState [Default\|Hover\|Focused]. Every union value appears in the stories file. |
| 7 | Version meaning known | PASS | `VERSIONING.md` exists at the repo root, written by a human: defines patch/minor for 0.x and patch/minor/major from 1.0. Settled. |

## The 6 checks for Breadcrumb

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS | All 8 fields present in `Breadcrumb.intent.json`. Counts: use_when 4, dont_use_when 5, best_practice 3, variant_intent 3, placement 1, pairs_with 4, required_tokens 9, a11y 5. |
| 2 | Alternatives named | WARNING | 3 of 5 `dont_use_when` entries have an empty `use_instead`: "on a top-level page, such as the dashboard home."; "Do not make the current page a link."; "Do not show more than 4 levels. Shorten the middle levels in...". Warning only. |
| 3 | a11y specific | PASS | 5 fact(s), each with a `source` `path:line` that exists and is within the file, none generic. Sources: src/components/Breadcrumb/Breadcrumb.tsx:43, src/components/Breadcrumb/BreadcrumbItemCurrent.tsx:9, src/components/Breadcrumb/BreadcrumbItemSeparator.tsx:4, src/components/Breadcrumb/BreadcrumbItemLink.tsx:25, src/components/Breadcrumb/Breadcrumb.css:54. |
| 4 | Tokens resolve | PASS | All 9 `required_tokens` entries are defined in the built `dist/tokens.css`. |
| 5 | All variants covered | PASS (note) | 3 `variant_intent` keys. Unions checked: BreadcrumbItemLinkState; 0 fully covered. Sub-part unions with values lacking an entry (sub-parts, not the component's variant props): BreadcrumbItemLinkState (Default, Hover, Focused). |
| 6 | No overlap | PASS | None of the 4 `use_when` lines matches a line in any other component's intent file. |

## Result

**Cleared**. All 7 gates pass; every check passes, is a warning, or is WAIVED.
