# Release review — Tag

| Row | Value |
|---|---|
| Reviewed commit | `a15e8d54ea3c39b95f27efaede5da73a686c0e9d` (2026-10-21T11:39:42+06:30), branch `main`, level with `origin/main` |
| Registry | Airtable Components row "Tag": `Development` = Released, `Design` = Done, Last Modified 2026-10-21T04:50:26.000Z |
| Figma | Component node `448-13` in file `MWuaFZQ58G4WvtbCyeaE1X` (cozy-corner.Global.Components.v1.0.0.In-Progress), link on the board's `Figma` column |
| Intent file | `src/components/Tag/Tag.intent.json`, last changed at commit `a2807a2 2026-10-21`; read at `a15e8d5` |
| Production Storybook | https://cozy-corner-design-system.vercel.app/?path=/docs/components-tag--docs |
| Verdict | Cleared |

This review is fresh: every result below was measured against the files at commit `a15e8d5`; nothing was carried over from earlier reviews. Build at this commit: `npm run build:package` passes, `npm run lint` passes.

## The 7 gates for Tag

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | `src/components/Tag/Tag.intent.json` exists and parses as JSON. |
| 2 | Development status | PASS | Airtable Components row "Tag": `Development` = Released at review (Design = Done). Gate accepts Completed or Released. |
| 3 | Tokens clean | PASS | Scanned Tag.css, Tag.tsx, index.ts with comments stripped: no raw hex, px, rgb() or literal font-family. `tokens/` has no diff against HEAD (empty diff); `build/` is generated and gitignored. |
| 4 | Public surface decided | PASS | `src/index.ts` has `export * from './components/Tag'`. The folder's `index.ts` exposes 3 names (Tag, TagProps, TagSize). |
| 5 | Names final | PASS | No section in `docs/naming-suggestions.md` names "Tag", so no open suggestion touches its names. Prop names read from the component's types are listed under gate 6. |
| 6 | States complete | PASS | 1 stories file(s), 7 exported stories (SmallDefault, SmallRemove, MediumDefault, MediumRemove, RemoveDisabled, RemoveKeyboard, RemovableList). Exported unions: TagSize [Small\|Medium]. Every union value appears in the stories file. `disabled` is handled in the component source. |
| 7 | Version meaning known | PASS | `VERSIONING.md` exists at the repo root, written by a human: defines patch/minor for 0.x and patch/minor/major from 1.0. Settled. |

## The 6 checks for Tag

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS | All 8 fields present in `Tag.intent.json`. Counts: use_when 4, dont_use_when 5, best_practice 3, variant_intent 4, placement 1, pairs_with 4, required_tokens 17, a11y 3. |
| 2 | Alternatives named | WARNING | 2 of 5 `dont_use_when` entries have an empty `use_instead`: "Do not give tags colors. Tags are always neutral."; "Do not show more than 3 tags in a table cell.". Warning only. |
| 3 | a11y specific | PASS | 3 fact(s), each with a `source` `path:line` that exists and is within the file, none generic. Sources: src/components/Tag/Tag.tsx:47, src/components/Tag/Tag.tsx:51, src/components/Tag/Tag.css:60. |
| 4 | Tokens resolve | PASS | All 17 `required_tokens` entries are defined in the built `dist/tokens.css`. |
| 5 | All variants covered | PASS | 4 `variant_intent` keys. Unions checked: TagSize; 1 fully covered. |
| 6 | No overlap | PASS | None of the 4 `use_when` lines matches a line in any other component's intent file. |

## Result

**Cleared**. All 7 gates pass; every check passes, is a warning, or is WAIVED.
