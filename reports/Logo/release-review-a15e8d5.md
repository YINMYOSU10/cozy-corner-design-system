# Release review — logo

| Row | Value |
|---|---|
| Reviewed commit | `a15e8d54ea3c39b95f27efaede5da73a686c0e9d` (2026-10-21T11:39:42+06:30), branch `main`, level with `origin/main` |
| Registry | Airtable Components row "Logo": `Development` = Released, `Design` = Done, Last Modified 2026-10-21T04:50:13.000Z |
| Figma | Component node `4-484` in file `MWuaFZQ58G4WvtbCyeaE1X` (cozy-corner.Global.Components.v1.0.0.In-Progress), link on the board's `Figma` column |
| Intent file | `src/components/Logo/Logo.intent.json`, last changed at commit `a2807a2 2026-10-21`; read at `a15e8d5` |
| Production Storybook | https://cozy-corner-design-system.vercel.app/?path=/docs/components-logo--docs |
| Verdict | Cleared |

This review is fresh: every result below was measured against the files at commit `a15e8d5`; nothing was carried over from earlier reviews. Build at this commit: `npm run build:package` passes, `npm run lint` passes.

## The 7 gates for Logo

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | `src/components/Logo/Logo.intent.json` exists and parses as JSON. |
| 2 | Development status | PASS | Airtable Components row "Logo": `Development` = Released at review (Design = Done). Gate accepts Completed or Released. |
| 3 | Tokens clean | PASS | Scanned Logo.css, Logo.tsx, LogoGlyph.tsx, index.ts with comments stripped: no raw hex, px, rgb() or literal font-family. `tokens/` has no diff against HEAD (empty diff); `build/` is generated and gitignored. |
| 4 | Public surface decided | PASS | `src/index.ts` has `export * from './components/Logo'`. The folder's `index.ts` exposes 3 names (Logo, LogoProps, LogoPlatform). Files not re-exported (internal): LogoGlyph; the header of `src/index.ts` records internal helpers. |
| 5 | Names final | PASS | No section in `docs/naming-suggestions.md` names "Logo", so no open suggestion touches its names. Prop names read from the component's types are listed under gate 6. |
| 6 | States complete | PASS | 1 stories file(s), 8 exported stories (WebsiteGlyphAndWordmark, WebsiteGlyphOnly, WebsiteWordmarkOnly, WebsiteNeither, DashboardGlyphAndWordmark, DashboardGlyphOnly, DashboardWordmarkOnly, DashboardNeither). Exported unions: LogoPlatform [Dashboard\|Website]. Every union value appears in the stories file. |
| 7 | Version meaning known | PASS | `VERSIONING.md` exists at the repo root, written by a human: defines patch/minor for 0.x and patch/minor/major from 1.0. Settled. |

## The 6 checks for Logo

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS | All 8 fields present in `Logo.intent.json`. Counts: use_when 6, dont_use_when 5, best_practice 2, variant_intent 2, placement 1, pairs_with 3, required_tokens 12, a11y 2. |
| 2 | Alternatives named | WARNING | 5 of 5 `dont_use_when` entries have an empty `use_instead`: "as a decoration or a repeating background pattern."; "if it needs to be stretched, rotated or recolored."; "with both the glyph and the wordmark turned off."; "on dark or busy backgrounds."; "Do not place other elements inside the clear space.". Warning only. |
| 3 | a11y specific | PASS | 2 fact(s), each with a `source` `path:line` that exists and is within the file, none generic. Sources: src/components/Logo/Logo.tsx:34, src/components/Logo/LogoGlyph.tsx:71. |
| 4 | Tokens resolve | PASS | All 12 `required_tokens` entries are defined in the built `dist/tokens.css`. |
| 5 | All variants covered | PASS | 2 `variant_intent` keys. Unions checked: LogoPlatform; 1 fully covered. |
| 6 | No overlap | PASS | None of the 6 `use_when` lines matches a line in any other component's intent file. |

## Result

**Cleared**. All 7 gates pass; every check passes, is a warning, or is WAIVED.
