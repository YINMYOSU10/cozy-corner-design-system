# Release review — Button

| Row | Value |
|---|---|
| Reviewed commit | `a15e8d54ea3c39b95f27efaede5da73a686c0e9d` (2026-10-21T11:39:42+06:30), branch `main`, level with `origin/main` |
| Registry | Airtable Components row "Button / Primary": `Development` = Released, `Design` = Done, Last Modified 2026-10-21T04:50:27.000Z |
| Figma | Component node `66-459` in file `MWuaFZQ58G4WvtbCyeaE1X` (cozy-corner.Global.Components.v1.0.0.In-Progress), link on the board's `Figma` column |
| Intent file | `src/components/Button/Button.intent.json`, last changed at commit `a2807a2 2026-10-21`; read at `a15e8d5` |
| Production Storybook | https://cozy-corner-design-system.vercel.app/?path=/docs/components-button--docs |
| Verdict | Cleared |

This review is fresh: every result below was measured against the files at commit `a15e8d5`; nothing was carried over from earlier reviews. Build at this commit: `npm run build:package` passes, `npm run lint` passes.

## The 7 gates for Button / Primary

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | `src/components/Button/Button.intent.json` exists and parses as JSON. |
| 2 | Development status | PASS | Airtable Components row "Button / Primary": `Development` = Released at review (Design = Done). Gate accepts Completed or Released. |
| 3 | Tokens clean | PASS | Scanned Button.css, Button.tsx, PlusIcon.tsx, index.ts with comments stripped: no raw hex, px, rgb() or literal font-family. `tokens/` has no diff against HEAD (empty diff); `build/` is generated and gitignored. |
| 4 | Public surface decided | PASS | `src/index.ts` has `export * from './components/Button'`. The folder's `index.ts` exposes 7 names (Button, ButtonProps, ButtonState, ButtonIconStyle, ButtonShape, ButtonSize, ButtonType). Files not re-exported (internal): PlusIcon; the header of `src/index.ts` records internal helpers. |
| 5 | Names final | PASS | `docs/naming-suggestions.md` section "Button / Primary (66:459)" is marked Accepted for 0.1.0 (Yin Myo Su, 2026-10-21). Settled; not re-litigated. |
| 6 | States complete | PASS | 1 stories file(s), 13 exported stories (Playground, DefaultRounded32, DefaultRounded48, DefaultRounded56, DefaultPill32, DefaultPill48, DefaultPill56, OutlineRounded32, OutlineRounded48, OutlineRounded56, ...). Exported unions: ButtonState [Default\|Hover\|Press\|Focus\|Disable]; ButtonIconStyle [Both icons\|none\|leading icon\|trailing icon\|Icon only]; ButtonShape [Rounded\|Pill]; ButtonSize [32\|48\|56]; ButtonType [Default\|Outline]. Every union value appears in the stories file. `disabled` is handled in the component source. |
| 7 | Version meaning known | PASS | `VERSIONING.md` exists at the repo root, written by a human: defines patch/minor for 0.x and patch/minor/major from 1.0. Settled. |

## The 6 checks for Button / Primary

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS (gap noted) | All 8 fields present in `Button.intent.json`. Counts: use_when 4, dont_use_when 5, best_practice 3, variant_intent 17, placement 0, pairs_with 5, required_tokens 33, a11y 4. Empty (recorded gap, not a hidden pass): placement. |
| 2 | Alternatives named | WARNING | 4 of 5 `dont_use_when` entries have an empty `use_instead`: "as decoration or as a label."; "Do not place two Default buttons side by side."; "Do not mix Rounded and Pill shapes on one screen."; "Do not write a long sentence as the label.". Warning only. |
| 3 | a11y specific | PASS | 4 fact(s), each with a `source` `path:line` that exists and is within the file, none generic. Sources: src/components/Button/Button.tsx:64, src/components/Button/Button.tsx:67, src/components/Button/Button.tsx:68, src/components/Button/Button.css:105. |
| 4 | Tokens resolve | PASS | All 33 `required_tokens` entries are defined in the built `dist/tokens.css`. |
| 5 | All variants covered | PASS | 17 `variant_intent` keys. Unions checked: ButtonState, ButtonIconStyle, ButtonShape, ButtonSize, ButtonType; 5 fully covered. |
| 6 | No overlap | PASS | None of the 4 `use_when` lines matches a line in any other component's intent file. |

## Result

**Cleared**. All 7 gates pass; every check passes, is a warning, or is WAIVED.
