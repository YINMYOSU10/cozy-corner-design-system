# QA report: Button / Info

- **Run:** 2026-10-19, first test. The registry woke QA because `Development` read `Ready for Testing` on Components row `recEF8ROJMnrRYYJs`.
- **Tested build:** the URL in `Staging Storybook`, https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (branch `staging`, head `af80979`, which merged PR #10; component commits `f613625` and `8d7ca17`). I tested the deployed URL, not a local build.
- **Staging check:** `<base>/index.json` returned 200 and parsed. It lists 14 entries under "Components/Button Info": Docs, Playground and 12 sheet stories. Each sheet iframe rendered 25 `[data-matrix]` cells and 25 `.cc-button--info` buttons. This is the real Storybook, not a login page.
- **Figma:** [Button / Info, 445:5037](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=445-5037), file `MWuaFZQ58G4WvtbCyeaE1X`. I read the node as it stands today, after the designer's published binding fixes.
- **Tester:** QA agent. I did not build this component. I changed nothing in `src/`.

## Verdict

| | Cases |
|---|---|
| Expected matrix, from Figma 445:5037 | 300 |
| Passed | 300 |
| Failed | 0 |
| Staging Testing rows written (Decision 7: one per State × Type) | 10, all `Passed` |

After the rows were written, `Development` reads **To be deployed**. Synchronization is 100%.

## Rows written (Staging Testing, linked to recEF8ROJMnrRYYJs)

| Row | Record | Result | Variants |
|---|---|---|---|
| Button / Info · Default · Default | rec8xylr3UndlYIQf | Passed | 30/30 |
| Button / Info · Outline · Default | recoiMKl5OJcYFMxY | Passed | 30/30 |
| Button / Info · Default · Hover | recr22ptf30226oR5 | Passed | 30/30 |
| Button / Info · Outline · Hover | recyWV7WU4ZcJi9SW | Passed | 30/30 |
| Button / Info · Default · Press | recFA6nqFwZ7H4Zqm | Passed | 30/30 |
| Button / Info · Outline · Press | recIDTTBwyjj3gQ4d | Passed | 30/30 |
| Button / Info · Default · Focus | recmj9asHnFLZCvDY | Passed | 30/30 |
| Button / Info · Outline · Focus | recpPEXwDK1dQyRZA | Passed | 30/30 |
| Button / Info · Default · Disable | recIMM3OJktwP7Bc2 | Passed | 30/30 |
| Button / Info · Outline · Disable | rec1GzpO1zxu8UH1G | Passed | 30/30 |

Each row's `Variants` cell lists all 30 variants it covers, with their Figma node ids. Row names follow Type · State. The Staging Testing table now holds 30 of the 1,000 rows the free plan allows.

## How each case was checked

1. **The matrix came from Figma, not the story file.** A read-only `use_figma` script (no writes) went through all 300 children of 445:5037: 5 State × 5 Icon-style × 2 Shape × 3 Size × 2 Type. For each variant it read the visible fills, strokes, effects, label fill and font, icon vector paints, radius, padding, gap and size. Every State × Type group is internally consistent, with no stray variants:

   | State | Type=Default fill | Type=Outline fill · stroke (1px inside) |
   |---|---|---|
   | Default | `color/bg/info/idle` | none · `color/border/info/default` |
   | Hover | `color/bg/info/hovered` | `color/bg/info/light` · `color/border/info/default` |
   | Press | `color/bg/info/focused` | `color/bg/info/lightHovered` · `color/border/info/bold` (all 3 sizes) |
   | Focus | `color/bg/info/focused` | `color/bg/info/light` · `color/border/info/default` |
   | Disable | `color/bg/disabled` | none · `color/border/secondary` |

   - **Default type:** no stroke. Label `color/text/inverse`, icons `color/icon/inverse`.
   - **Outline type:** label `color/text/info`, icons `color/icon/info`.
   - **Disable, both types:** label `color/text/disabled` and icons `color/icon/disabled` on all 30 + 30. The bindings the designer fixed today hold.
   - **Focus:** drop shadows, spread 2 `color/bg/base` and spread 4 `color/border/focus`. No other state has an effect.
   - **Radius:** `borderRadius/sm` on all 150 Rounded variants and `borderRadius/circle` on all 150 Pill variants.
   - **Spacing:** padding `spacing/sm` × `spacing/md`, gap `spacing/sm`.
   - **Type:** Karla Regular 14/22 at 32, Inter Medium 16/26 at 48 and 56.
   - **Icons:** 16px at 32 and 24px at 48 and 56. Icon only is 16, 24 and 32.
   - **Size:** labelled variants are a fixed 130 × 32/48/56. Icon only is 32/48/56 square.
2. **The stories were reconciled with Figma.** There are 12 sheet stories × 25 cells = 300 cases, one for each Figma variant. No case is missing. Playground has no Figma row; it is a controls story, not dead code.
3. **Fonts were confirmed before measuring.** In the sheet frames I waited for `document.fonts.ready` and loaded both faces. Then I measured `Label Hamburgefonstiv` on a canvas against a made-up font name:
   - Inter 500 16px: 177.84 vs 152.12
   - Karla 400 14px: 148.57 vs 133.10

   Both fonts were loaded.
4. **All 300 cases were measured on staging.** One script opened each sheet story as a same-origin iframe on the staging host. For every cell it compared computed styles against the computed value of the CSS token that Figma binds:
   - background
   - border width and colour (for the Default type, which has no Figma stroke, the border must be 0 wide or match the fill; it measured 0px)
   - radius
   - `box-shadow` (the ring on Focus, `none` everywhere else)
   - height, and padding-left plus border (= `--spacing-md`)
   - label colour, family, weight, size and line height, and container gap
   - icon slots (leading, trailing or icon), icon box size and path stroke colour
   - Icon only width and `aria-label`
   - the `disabled` attribute

   **Result: 0 mismatches in 300.** The comparisons were real, not empty. The tokens resolve on `:root`: `--color-bg-info-idle` = #155dfc, `--color-bg-info-hovered` = #1447e6, `--color-bg-info-focused` = #1447e6, `--color-bg-info-light` = #dbeafe, `--color-bg-info-lighthovered` = #8ec5ff, `--color-border-info-default` = #51a2ff, `--color-border-info-bold` = #2b7fff, `--color-text-info` = #193cb8, `--color-icon-info` = #1447e6, `--borderradius-circle` = 1000px and `--spacing-md` = 12px.
5. **States were driven, not only rendered.**
   - **Hover, Default type:** a real pointer on Default·none·Rounded·56 gave `:hover` true and fill `--color-bg-info-hovered` (rgb 20,71,230). Pass.
   - **Hover, Outline type:** a real pointer on Default·none·Pill·56 gave fill `--color-bg-info-light` (rgb 219,234,254) and border `--color-border-info-default` (rgb 81,162,255). Pass.
   - **Focus, Default type:** I clicked blank page, then pressed Tab once. Focus landed on Default·Both icons·Rounded·56 with `:focus-visible` true. It showed fill `--color-bg-info-focused` and ring `rgb(251,243,231) 0 0 0 2px, rgb(193,99,61) 0 0 0 4px` (`--color-bg-base`, `--color-border-focus`). Pass.
   - **Focus, Outline type:** the same check on the Outline·Pill·56 sheet gave fill `--color-bg-info-light`, border `--color-border-info-default` and the same ring. Pass.
   - **Activation:** Enter and Space on the focused button fired `click` 2 times in total, once each. Pass.
   - **Disable:** a real click on Disable·Icon only fired 0 handlers. None of the 5 disabled buttons can be reached with Tab. Cursor is `not-allowed`, and the fill stayed `--color-bg-disabled`. Pass.
   - **Press:** checked only through the pinned `state="Press"` cells. The browser tools cannot hold a pointer down, so the real `:active` look was **not driven**.
   - **Loading:** Figma has no Loading state and the component has none.
6. **Tokens:** `ButtonInfo.css` (on `staging`) contains no raw hex, rgb, px or font values. Every value is a semantic `--color-*-info-*` token. The component imports `Button` and does not copy its styles. Disable is inherited from `Button.css`, which matches Figma's Disable bindings.

## Findings

None. No case failed.

## Design notes (not logged against the Engineer)

- **G1. Fixed 130px width.** Every labelled Figma variant is a fixed 130px wide, and the width is not bound to any token. Staging hugs its content, as Button / Primary does in Figma and in code. Measured staging widths:

  | Size | none | leading or trailing icon | Both icons |
  |---|---|---|---|
  | 32 | 57.66 | 81.66 | 105.66 |
  | 48 and 56 | 65.45 | 97.45 | 129.45 |

  Icon only matches exactly. An unbound value is a design gap, so I did not fail these cases. This note is also in each row's `Suggestion for Improvement`.
- **G2. Empty trailing icon.** The Size 56 "leading icon" variants (for example 445:3831 and 445:3863) contain a visible `Trailing Icon` frame with no children. It draws nothing, and staging leaves it out. This should be cleaned up in Figma.
- **G3. Vector fill on one variant pair.** In Default · Both icons · Rounded · 48 (445:3593, Default type, and 445:3604, Outline type), one vector of each plus icon has no fill, while the same vector in every other variant has one. These are open strokes, so the render is identical. This is a Figma tidy-up item, not a failure.
- **G4. Mode check.** I read the Figma bindings by variable name with `use_figma`, not as resolved values from `get_variable_defs`. So the token-name comparisons above do not depend on which mode the file is open in.

## Screenshots (`reports/ButtonInfo/`)

- **One per state, for each type:** `staging-<State>-Default-Rounded-56.png` and `staging-<State>-Outline-Pill-56.png`, for Default, Hover, Press, Focus and Disable. These are crops of the full sheets.
- **Full staging sheets:** `staging-sheet-Default-Rounded-56.png` and `staging-sheet-Outline-Pill-56.png`
- **Figma render:** `figma-component-set-445-5037.png`

There are no failure renders because nothing failed.

These are test results, not a release decision. A human has the final say.
