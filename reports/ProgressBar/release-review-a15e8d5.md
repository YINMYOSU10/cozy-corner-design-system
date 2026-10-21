# Release review — ProgressBar

| Row | Value |
|---|---|
| Reviewed commit | `a15e8d54ea3c39b95f27efaede5da73a686c0e9d` (2026-10-21T11:39:42+06:30), branch `main`, level with `origin/main` |
| Registry | Airtable Components row "Progress Bar": `Development` = Released, `Design` = Done, Last Modified 2026-10-21T04:50:13.000Z |
| Figma | Component node `416-46` in file `MWuaFZQ58G4WvtbCyeaE1X` (cozy-corner.Global.Components.v1.0.0.In-Progress), link on the board's `Figma` column |
| Intent file | `src/components/ProgressBar/ProgressBar.intent.json`, last changed at commit `a2807a2 2026-10-21`; read at `a15e8d5` |
| Production Storybook | https://cozy-corner-design-system.vercel.app/?path=/docs/components-progressbar--docs |
| Verdict | Cleared |

This review is fresh: every result below was measured against the files at commit `a15e8d5`; nothing was carried over from earlier reviews. Build at this commit: `npm run build:package` passes, `npm run lint` passes.

## The 7 gates for Progress Bar

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | `src/components/ProgressBar/ProgressBar.intent.json` exists and parses as JSON. |
| 2 | Development status | PASS | Airtable Components row "Progress Bar": `Development` = Released at review (Design = Done). Gate accepts Completed or Released. |
| 3 | Tokens clean | PASS | Scanned ProgressBar.css, ProgressBar.tsx, ProgressBarSegment.tsx, index.ts with comments stripped: no raw hex, px, rgb() or literal font-family. `tokens/` has no diff against HEAD (empty diff); `build/` is generated and gitignored. |
| 4 | Public surface decided | PASS | `src/index.ts` has `export * from './components/ProgressBar'`. The folder's `index.ts` exposes 5 names (ProgressBar, ProgressBarProps, ProgressBarStep, ProgressBarSegment, ProgressBarSegmentProps). |
| 5 | Names final | PASS | No section in `docs/naming-suggestions.md` names "Progress Bar", so no open suggestion touches its names. Prop names read from the component's types are listed under gate 6. |
| 6 | States complete | PASS | 1 stories file(s), 8 exported stories (Step1, Step2, Step3, Step4, Step5, LabelHidden, SegmentFilled, SegmentUnfilled). Exported unions: none. Every union value appears in the stories file. |
| 7 | Version meaning known | PASS | `VERSIONING.md` exists at the repo root, written by a human: defines patch/minor for 0.x and patch/minor/major from 1.0. Settled. |

## The 6 checks for Progress Bar

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS | All 8 fields present in `ProgressBar.intent.json`. Counts: use_when 4, dont_use_when 5, best_practice 3, variant_intent 5, placement 1, pairs_with 3, required_tokens 11, a11y 3. |
| 2 | Alternatives named | WARNING | 4 of 5 `dont_use_when` entries have an empty `use_instead`: "when the number of steps is unknown or can change."; "for more than about 7 steps. Group the steps instead."; "Do not make the segments clickable. A progress bar is not na..."; "Do not hide the label when the bar is the only progress cue.". Warning only. |
| 3 | a11y specific | PASS | 3 fact(s), each with a `source` `path:line` that exists and is within the file, none generic. Sources: src/components/ProgressBar/ProgressBar.tsx:36, src/components/ProgressBar/ProgressBar.tsx:37, src/components/ProgressBar/ProgressBar.tsx:45. |
| 4 | Tokens resolve | PASS | All 11 `required_tokens` entries are defined in the built `dist/tokens.css`. |
| 5 | All variants covered | PASS | 5 `variant_intent` keys. The component exports no string-union variant types. |
| 6 | No overlap | PASS | None of the 4 `use_when` lines matches a line in any other component's intent file. |

## Result

**Cleared**. All 7 gates pass; every check passes, is a warning, or is WAIVED.
