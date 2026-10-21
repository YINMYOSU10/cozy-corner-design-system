# Release review — ButtonNeutral

| Row | Value |
|---|---|
| Reviewed commit | `a15e8d54ea3c39b95f27efaede5da73a686c0e9d` (2026-10-21T11:39:42+06:30), branch `main`, level with `origin/main` |
| Registry | Airtable Components row "Button / Neutral": `Development` = Released, `Design` = Done, Last Modified 2026-10-21T04:50:13.000Z |
| Figma | Component node `444-6334` in file `MWuaFZQ58G4WvtbCyeaE1X` (cozy-corner.Global.Components.v1.0.0.In-Progress), link on the board's `Figma` column |
| Intent file | `src/components/ButtonNeutral/ButtonNeutral.intent.json`, last changed at commit `1d9ace4 2026-10-21`; read at `a15e8d5` |
| Production Storybook | https://cozy-corner-design-system.vercel.app/?path=/docs/components-button-neutral--docs |
| Verdict | Cleared |

This review is fresh: every result below was measured against the files at commit `a15e8d5`; nothing was carried over from earlier reviews. Build at this commit: `npm run build:package` passes, `npm run lint` passes.

## The 7 gates for Button / Neutral

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | `src/components/ButtonNeutral/ButtonNeutral.intent.json` exists and parses as JSON. |
| 2 | Development status | PASS | Airtable Components row "Button / Neutral": `Development` = Released at review (Design = Done). Gate accepts Completed or Released. |
| 3 | Tokens clean | PASS | Scanned ButtonNeutral.css, ButtonNeutral.tsx, index.ts with comments stripped: no raw hex, px, rgb() or literal font-family. `tokens/` has no diff against HEAD (empty diff); `build/` is generated and gitignored. |
| 4 | Public surface decided | PASS | `src/index.ts` has `export * from './components/ButtonNeutral'`. The folder's `index.ts` exposes 2 names (ButtonNeutral, ButtonNeutralProps). |
| 5 | Names final | PASS | No section in `docs/naming-suggestions.md` names "Button / Neutral", so no open suggestion touches its names. Prop names read from the component's types are listed under gate 6. |
| 6 | States complete | PASS | 1 stories file(s), 13 exported stories (Playground, DefaultRounded32, DefaultRounded48, DefaultRounded56, DefaultPill32, DefaultPill48, DefaultPill56, OutlineRounded32, OutlineRounded48, OutlineRounded56, ...). Exported unions: none. Every union value appears in the stories file. |
| 7 | Version meaning known | PASS | `VERSIONING.md` exists at the repo root, written by a human: defines patch/minor for 0.x and patch/minor/major from 1.0. Settled. |

## The 6 checks for Button / Neutral

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS (gap noted) | All 8 fields present in `ButtonNeutral.intent.json`. Counts: use_when 2, dont_use_when 3, best_practice 3, variant_intent 17, placement 0, pairs_with 4, required_tokens 7, a11y 3. Empty (recorded gap, not a hidden pass): placement. |
| 2 | Alternatives named | PASS | All 3 `dont_use_when` entries name an alternative. |
| 3 | a11y specific | PASS | 3 fact(s), each with a `source` `path:line` that exists and is within the file, none generic. Sources: src/components/ButtonNeutral/ButtonNeutral.tsx:11, src/components/Button/Button.tsx:64, src/components/Button/Button.tsx:68. |
| 4 | Tokens resolve | PASS | All 7 `required_tokens` entries are defined in the built `dist/tokens.css`. |
| 5 | All variants covered | PASS | 17 `variant_intent` keys. The component exports no string-union variant types. |
| 6 | No overlap | PASS | None of the 2 `use_when` lines matches a line in any other component's intent file. |

## Result

**Cleared**. All 7 gates pass; every check passes, is a warning, or is WAIVED.
