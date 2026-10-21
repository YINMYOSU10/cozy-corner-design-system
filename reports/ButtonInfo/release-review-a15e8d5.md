# Release review — ButtonInfo

| Row | Value |
|---|---|
| Reviewed commit | `a15e8d54ea3c39b95f27efaede5da73a686c0e9d` (2026-10-21T11:39:42+06:30), branch `main`, level with `origin/main` |
| Registry | Airtable Components row "Button / Info": `Development` = Released, `Design` = Done, Last Modified 2026-10-21T04:50:13.000Z |
| Figma | Component node `445-5037` in file `MWuaFZQ58G4WvtbCyeaE1X` (cozy-corner.Global.Components.v1.0.0.In-Progress), link on the board's `Figma` column |
| Intent file | `src/components/ButtonInfo/ButtonInfo.intent.json`, last changed at commit `a2807a2 2026-10-21`; read at `a15e8d5` |
| Production Storybook | https://cozy-corner-design-system.vercel.app/?path=/docs/components-button-info--docs |
| Verdict | Cleared |

This review is fresh: every result below was measured against the files at commit `a15e8d5`; nothing was carried over from earlier reviews. Build at this commit: `npm run build:package` passes, `npm run lint` passes.

## The 7 gates for Button / Info

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | `src/components/ButtonInfo/ButtonInfo.intent.json` exists and parses as JSON. |
| 2 | Development status | PASS | Airtable Components row "Button / Info": `Development` = Released at review (Design = Done). Gate accepts Completed or Released. |
| 3 | Tokens clean | PASS | Scanned ButtonInfo.css, ButtonInfo.tsx, index.ts with comments stripped: no raw hex, px, rgb() or literal font-family. `tokens/` has no diff against HEAD (empty diff); `build/` is generated and gitignored. |
| 4 | Public surface decided | PASS | `src/index.ts` has `export * from './components/ButtonInfo'`. The folder's `index.ts` exposes 2 names (ButtonInfo, ButtonInfoProps). |
| 5 | Names final | PASS | No section in `docs/naming-suggestions.md` names "Button / Info", so no open suggestion touches its names. Prop names read from the component's types are listed under gate 6. |
| 6 | States complete | PASS | 1 stories file(s), 13 exported stories (Playground, DefaultRounded32, DefaultRounded48, DefaultRounded56, DefaultPill32, DefaultPill48, DefaultPill56, OutlineRounded32, OutlineRounded48, OutlineRounded56, ...). Exported unions: none. Every union value appears in the stories file. |
| 7 | Version meaning known | PASS | `VERSIONING.md` exists at the repo root, written by a human: defines patch/minor for 0.x and patch/minor/major from 1.0. Settled. |

## The 6 checks for Button / Info

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS (gap noted) | All 8 fields present in `ButtonInfo.intent.json`. Counts: use_when 4, dont_use_when 3, best_practice 2, variant_intent 17, placement 0, pairs_with 1, required_tokens 9, a11y 3. Empty (recorded gap, not a hidden pass): placement. |
| 2 | Alternatives named | WARNING | 3 of 3 `dont_use_when` entries have an empty `use_instead`: "for everyday actions. If everything has a color, nothing sta..."; "Do not put more than one semantic color in the same group of..."; "Do not choose a color because it looks nice.". Warning only. |
| 3 | a11y specific | PASS | 3 fact(s), each with a `source` `path:line` that exists and is within the file, none generic. Sources: src/components/ButtonInfo/ButtonInfo.tsx:11, src/components/Button/Button.tsx:64, src/components/Button/Button.tsx:68. |
| 4 | Tokens resolve | PASS | All 9 `required_tokens` entries are defined in the built `dist/tokens.css`. |
| 5 | All variants covered | PASS | 17 `variant_intent` keys. The component exports no string-union variant types. |
| 6 | No overlap | WAIVED | `use_when` overlap with ButtonDestructive (3 identical line(s)). WAIVED for 0.1.0 in `docs/release-waivers.md` under "0.1.0" (Yin Myo Su, 2026-10-21). Not a PASS. |

## Result

**Cleared**. All 7 gates pass; every check passes, is a warning, or is WAIVED.
