# Release review — DetailRow

| Row | Value |
|---|---|
| Reviewed commit | `a15e8d54ea3c39b95f27efaede5da73a686c0e9d` (2026-10-21T11:39:42+06:30), branch `main`, level with `origin/main` |
| Registry | Airtable Components row "Detail Row": `Development` = Released, `Design` = Done, Last Modified 2026-10-21T04:50:27.000Z |
| Figma | Component node `554-25` in file `MWuaFZQ58G4WvtbCyeaE1X` (cozy-corner.Global.Components.v1.0.0.In-Progress), link on the board's `Figma` column |
| Intent file | `src/components/DetailRow/DetailRow.intent.json`, last changed at commit `a2807a2 2026-10-21`; read at `a15e8d5` |
| Production Storybook | https://cozy-corner-design-system.vercel.app/?path=/docs/components-detailrow--docs |
| Verdict | Cleared |

This review is fresh: every result below was measured against the files at commit `a15e8d5`; nothing was carried over from earlier reviews. Build at this commit: `npm run build:package` passes, `npm run lint` passes.

## The 7 gates for Detail Row

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | `src/components/DetailRow/DetailRow.intent.json` exists and parses as JSON. |
| 2 | Development status | PASS | Airtable Components row "Detail Row": `Development` = Released at review (Design = Done). Gate accepts Completed or Released. |
| 3 | Tokens clean | PASS | Scanned DetailRow.css, DetailRow.tsx, index.ts with comments stripped: no raw hex, px, rgb() or literal font-family. `tokens/` has no diff against HEAD (empty diff); `build/` is generated and gitignored. |
| 4 | Public surface decided | PASS | `src/index.ts` has `export * from './components/DetailRow'`. The folder's `index.ts` exposes 2 names (DetailRow, DetailRowProps). |
| 5 | Names final | PASS | No section in `docs/naming-suggestions.md` names "Detail Row", so no open suggestion touches its names. Prop names read from the component's types are listed under gate 6. |
| 6 | States complete | PASS | 1 stories file(s), 4 exported stories (MobileWithDivider, MobileNoDivider, WebsiteWithDivider, WebsiteNoDivider). Exported unions: none. Every union value appears in the stories file. |
| 7 | Version meaning known | PASS | `VERSIONING.md` exists at the repo root, written by a human: defines patch/minor for 0.x and patch/minor/major from 1.0. Settled. |

## The 6 checks for Detail Row

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS (gap noted) | All 8 fields present in `DetailRow.intent.json`. Counts: use_when 3, dont_use_when 4, best_practice 3, variant_intent 2, placement 1, pairs_with 3, required_tokens 10, a11y 0. Empty (recorded gap, not a hidden pass): a11y. |
| 2 | Alternatives named | WARNING | 2 of 4 `dont_use_when` entries have an empty `use_instead`: "for long paragraphs. Keep values to one short line."; "Do not mix Mobile and Website rows in one list.". Warning only. |
| 3 | a11y specific | PASS (gap noted) | `a11y` is empty in `DetailRow.intent.json`; no facts to test, no generic claim made. Recorded gap. |
| 4 | Tokens resolve | PASS | All 10 `required_tokens` entries are defined in the built `dist/tokens.css`. |
| 5 | All variants covered | PASS | 2 `variant_intent` keys. The component exports no string-union variant types. |
| 6 | No overlap | PASS | None of the 3 `use_when` lines matches a line in any other component's intent file. |

## Result

**Cleared**. All 7 gates pass; every check passes, is a warning, or is WAIVED.
