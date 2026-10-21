# Release review — top-bar

| Row | Value |
|---|---|
| Reviewed commit | `a15e8d54ea3c39b95f27efaede5da73a686c0e9d` (2026-10-21T11:39:42+06:30), branch `main`, level with `origin/main` |
| Registry | Airtable Components row "Top Bar": `Development` = Released, `Design` = Done, Last Modified 2026-10-21T04:50:26.000Z |
| Figma | Component node `576-22718` in file `MWuaFZQ58G4WvtbCyeaE1X` (cozy-corner.Global.Components.v1.0.0.In-Progress), link on the board's `Figma` column |
| Intent file | `src/components/TopBar/TopBar.intent.json`, last changed at commit `a2807a2 2026-10-21`; read at `a15e8d5` |
| Production Storybook | https://cozy-corner-design-system.vercel.app/?path=/docs/components-top-bar--docs |
| Verdict | Cleared |

This review is fresh: every result below was measured against the files at commit `a15e8d5`; nothing was carried over from earlier reviews. Build at this commit: `npm run build:package` passes, `npm run lint` passes.

## The 7 gates for Top Bar

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | `src/components/TopBar/TopBar.intent.json` exists and parses as JSON. |
| 2 | Development status | PASS | Airtable Components row "Top Bar": `Development` = Released at review (Design = Done). Gate accepts Completed or Released. |
| 3 | Tokens clean | PASS | Scanned TopBar.css, TopBar.tsx, index.ts with comments stripped: no raw hex, px, rgb() or literal font-family. `tokens/` has no diff against HEAD (empty diff); `build/` is generated and gitignored. |
| 4 | Public surface decided | PASS | `src/index.ts` has `export * from './components/TopBar'`. The folder's `index.ts` exposes 2 names (TopBar, TopBarProps). |
| 5 | Names final | PASS | No section in `docs/naming-suggestions.md` names "Top Bar", so no open suggestion touches its names. Prop names read from the component's types are listed under gate 6. |
| 6 | States complete | PASS | 1 stories file(s), 4 exported stories (Default, WithoutSearch, WithoutAvatar, BreadcrumbOnly). Exported unions: none. Every union value appears in the stories file. |
| 7 | Version meaning known | PASS | `VERSIONING.md` exists at the repo root, written by a human: defines patch/minor for 0.x and patch/minor/major from 1.0. Settled. |

## The 6 checks for Top Bar

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS | All 8 fields present in `TopBar.intent.json`. Counts: use_when 3, dont_use_when 4, best_practice 3, variant_intent 4, placement 1, pairs_with 4, required_tokens 5, a11y 2. |
| 2 | Alternatives named | WARNING | 2 of 4 `dont_use_when` entries have an empty `use_instead`: "as a second navigation menu."; "Do not show more than 4 breadcrumb levels.". Warning only. |
| 3 | a11y specific | PASS | 2 fact(s), each with a `source` `path:line` that exists and is within the file, none generic. Sources: src/components/TopBar/TopBar.tsx:41, src/components/Breadcrumb/Breadcrumb.tsx:43. |
| 4 | Tokens resolve | PASS | All 5 `required_tokens` entries are defined in the built `dist/tokens.css`. |
| 5 | All variants covered | PASS | 4 `variant_intent` keys. The component exports no string-union variant types. |
| 6 | No overlap | PASS | None of the 3 `use_when` lines matches a line in any other component's intent file. |

## Result

**Cleared**. All 7 gates pass; every check passes, is a warning, or is WAIVED.
