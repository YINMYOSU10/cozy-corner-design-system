# QA report: Icon

- **Run:** 2026-10-19, first test. The registry woke QA because `Development` read `Ready for Testing` on Components row `recyHFNCY8zA71tkA`.
- **Tested build:** the URL in `Staging Storybook`, https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app/?path=/docs/components-icon--docs (branch `staging`, head `59949d2`, which includes the 914-glyph PR #18). I tested the deployed URL, not a local build.
- **Staging check:** the page title was "Components / Icon - Docs ⋅ Storybook", the Storybook explorer and preview iframe were present, and `<base>/index.json` parsed. It lists Docs plus 19 stories: the 16 `components-icon--size-{12,16,24,32}-{standard,outlined}-{rounded,circle}` stories, `all-variants`, `swap-icon` and `all-glyphs`.
- **Figma:** file `MWuaFZQ58G4WvtbCyeaE1X`. Component set [Icon, 48:1251](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=48-1251). Glyph library: [Icons page frame, 34:423](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=34-423).
- **Tester:** QA agent. I did not build this component, and I changed nothing in `src/`.

## Verdict

| | Cases |
|---|---|
| Expected matrix, from Figma 48:1251 (Size × Type × Shape) | 16 |
| Glyph library, from Figma 34:423 | 914 glyphs: set completeness checked, 11 spot-checked |
| Passed | 16 of 16 variants; glyph library passed |
| Failed | 0 |
| Staging Testing rows written (Decision 7: one per Type × Shape, plus one for the glyph library) | 5, all `Passed` |

After the rows were written, `Development` reads **To be deployed**.

## Rows written (Staging Testing, linked to recyHFNCY8zA71tkA)

| Row | Record | Result | Covers |
|---|---|---|---|
| Icon · Standard · Rounded | reccbu3oiH4RYMr2q | Passed | Size 12 / 16 / 24 / 32 (53:380, 53:381, 54:443, 54:447) |
| Icon · Standard · Circle | recOnCPRDys8VOM7K | Passed | Size 12 / 16 / 24 / 32 (53:385, 54:469, 54:473, 54:477) |
| Icon · Outlined · Rounded | recDLmSlR1MdPykyf | Passed | Size 12 / 16 / 24 / 32 (54:481, 54:497, 55:501, 55:509) |
| Icon · Outlined · Circle | recP6kSsoDoBWAbmG | Passed | Size 12 / 16 / 24 / 32 (54:488, 54:493, 55:505, 55:513) |
| Icon · Glyph library | recqIjRFNuraMkbIa | Passed | 914 glyphs, 11 spot-checked |

`Size` maps 12=xs, 16=sm, 24=md, 32=lg, following Button's ordinal mapping. The glyph library row uses md, because every glyph master is 24. `State` is `idle`, because Icon is not interactive. The Staging Testing table held 46 rows and now holds 51, well under the free plan's 1,000-row cap.

## Matrix (from Figma) and per-case result

Figma `get_metadata` on 48:1251 gives 16 variant symbols, each square at its Size value. Every one has a story, and every story beyond the 16 (`all-variants`, `swap-icon`, `all-glyphs`) is documented in the story file. No case is missing and no story is undocumented.

All values below were read from the browser with `getComputedStyle` and `getBoundingClientRect` in each story iframe.

| Size | Type | Shape | Figma | Box | Background | Ring (inset box-shadow) | Radius | Glyph box | Glyph stroke | a11y | Result |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 12 | Standard | Rounded | 53:380 | 12×12 | transparent | transparent | 4px | 12×12 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 12 | Standard | Circle | 53:385 | 12×12 | #fbf3e7 | transparent | 1000px | 12×12 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 12 | Outlined | Rounded | 54:481 | 12×12 | transparent | 1px #a8967d | 4px | 12×12 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 12 | Outlined | Circle | 54:488 | 12×12 | transparent | 1px #a8967d | 1000px | 12×12 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 16 | Standard | Rounded | 53:381 | 16×16 | transparent | transparent | 4px | 16×16 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 16 | Standard | Circle | 54:469 | 16×16 | #fbf3e7 | transparent | 1000px | 16×16 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 16 | Outlined | Rounded | 54:497 | 16×16 | transparent | 1px #a8967d | 4px | 16×16 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 16 | Outlined | Circle | 54:493 | 16×16 | transparent | 1px #a8967d | 1000px | 16×16 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 24 | Standard | Rounded | 54:443 | 24×24 | transparent | transparent | 4px | 24×24 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 24 | Standard | Circle | 54:473 | 24×24 | #fbf3e7 | transparent | 1000px | 24×24 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 24 | Outlined | Rounded | 55:501 | 24×24 | transparent | 1px #a8967d | 4px | 24×24 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 24 | Outlined | Circle | 55:505 | 24×24 | transparent | 1px #a8967d | 1000px | 24×24 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 32 | Standard | Rounded | 54:447 | 32×32 | transparent | transparent | 4px | 32×32 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 32 | Standard | Circle | 54:477 | 32×32 | #fbf3e7 | transparent | 1000px | 32×32 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 32 | Outlined | Rounded | 55:509 | 32×32 | transparent | 1px #a8967d | 4px | 32×32 | #7a6a58, 1.18182 | aria-hidden | Pass |
| 32 | Outlined | Circle | 55:513 | 32×32 | transparent | 1px #a8967d | 1000px | 32×32 | #7a6a58, 1.18182 | aria-hidden | Pass |

## How each case was checked

### 1. Fonts
Icon contains no text, so no measurement in this report depends on a font. The labels in the "All glyphs" story are story scaffolding, not part of the component, and I report no text widths.

### 2. Expected bindings (Figma `get_design_context` on 48:1251 and 55:513, and `get_variable_defs` on 55:513 and 55:509)

| Property | Figma binding | Staging computed | Match |
|---|---|---|---|
| Glyph paint (all 16) | `color/icon/secondary` #7a6a58 | stroke rgb(122,106,88) from `--cc-icon-color: var(--color-icon-secondary)` | yes |
| Standard · Circle fill | `color/bg/base` #fbf3e7 | rgb(251,243,231) from `var(--color-bg-base)` | yes |
| Standard · Rounded fill | none | transparent | yes |
| Outlined ring | `color/border/neutral/default` #a8967d, 1px stroke | inset 1px rgb(168,150,125) from `var(--borderwidth-1)` and `var(--color-border-neutral-default)` | yes. An inset ring is a faithful translation of the Figma stroke, and the box stays at the Size value. |
| Outlined fill | none visible | transparent | yes. See design note 5. |
| Rounded radius | `borderRadius/xs` 4 | 4px from `var(--borderradius-xs)` | yes |
| Circle radius | `borderRadius/circle` 1000 | 1000px from `var(--borderradius-circle)` | yes |
| Frame size | 12 / 16 / 24 / 32 (unbound) | 12 / 16 / 24 / 32 | yes. This is a design gap, see below. |
| Default glyph | Icon/Plus (34:5278), sized to the frame | Icon/Plus, glyph box equal to the frame | yes |
| Glyph stroke weight | 1.18182 at every size (the per-variant Figma SVG exports at 12, 16, 24 and 32 all carry `stroke-width="1.18182"` with geometry scaled to the frame) | 1.18182 with `vector-effect: non-scaling-stroke`. Plus arms measure 6.5px at Size 12, matching Figma's 2.75 → 9.25 | yes |

### 3. Accessibility (Icon is not interactive)
- **No label** (all 16 variant stories): `aria-hidden="true"`, no `role`.
- **With a label** (`swap-icon` story, 32 Outlined Circle, `label="User"`): `role="img"`, `aria-label="User"`, no `aria-hidden`. Both inner SVGs are `aria-hidden="true"` and `focusable="false"`. The element is not tabbable (`tabIndex` -1). The swapped glyph is Icon/User.
- **All glyphs** story: all 914 icons carry `role="img"` with `aria-label` set to the Figma name.
- Hover, focus, press, disabled and loading do not apply. Figma 48:1251 has no state property, so no state was driven.

### 4. Tokens in source
`src/components/Icon/Icon.css` on `staging` uses only `var(--color-icon-secondary)`, `var(--color-bg-base)`, `var(--color-border-neutral-default)`, `var(--borderwidth-1)`, `var(--borderradius-xs)` and `var(--borderradius-circle)`. It has no raw hex, px or font values; `transparent`, `0` and `100%` are not visual tokens. The frame size is carried as the Size prop on a sizer SVG, because Figma has no size token for it (a design gap). Glyph files hold only path geometry and stroke weights from the Figma export, painted with `currentColor`.

### 5. Glyph library (Figma 34:423, "All glyphs" story)
- **Completeness.** Figma `get_metadata(34:423)` lists 914 symbols, every one 24×24. The staging story renders 914 list items with 914 unique `data-figma-id` values. The sorted id list hashes to SHA-1 `c08b400aaafc0dd4` in the browser and from the Figma metadata (via the staging source), so the sets are identical. The Figma names match the source names for every id.
- **Visible shape.** Every one of the 914 items has at least one painted path (fill or stroke not `none`) with a non-zero bounding box, and every glyph SVG is 24px wide. None is blank.
- **Spot-check.** For each of 11 glyphs I downloaded the Figma vector export (`get_design_context`) and compared it with the staging DOM. Path data, path count, stroke-vs-fill and stroke weight were identical in all 11. Staging paints with `currentColor` = `--color-icon-secondary`.

| Glyph | Figma | Paths | Stroke weight | Result |
|---|---|---|---|---|
| Icon/User | 34:881 | 2 | 1.5 | Pass |
| Icon/Plus | 34:5278 | 2 | 1.18182 | Pass |
| Icon/Table (duplicate name) | 34:1199 | 4 | 1.5 | Pass |
| Icon/Table (duplicate name) | 34:5141 | 4 | 1.5 | Pass. A different drawing from 34:1199, and kept apart. |
| Icon/GridFour (duplicate name) | 34:2918 | 3 | 1.5 | Pass |
| Icon/GridFour (duplicate name) | 34:5133 | 3 | 2 | Pass. A heavier stroke than 34:2918, and kept apart. |
| Icon/Key | 34:2702 | 3 (2 stroked, 1 filled) | 1.5 | Pass. The 0.5-opacity layer is a known gap. |
| Icon/X | 195:268 | 1 filled | none | Pass. The raw #000000 fill is a known gap. |
| Icon/House | 34:435 | 1 | 1.5 | Pass |
| Icon/Activity | 34:5130 | 1 | 1.5 | Pass |
| Icon/arrow_drop_down | 257:4307 | 1 filled | none | Pass. The raw #1C1B1F fill and the unbound mask are a known gap. |

## Design gaps (already reported; not engineering defects)
1. Frame sizes 12 / 16 / 24 / 32 are unbound in Figma (no size token).
2. Glyph stroke weight (1.18182 on Icon/Plus, 1.5 and 2 elsewhere) and the Outlined stroke weight 1 are unbound. The code uses `borderwidth-1` for the ring, as Button does.
3. Every glyph master in Figma paints with `Color Tokens/Content/Dark/Primary`, a variable from an external library that is not in our token set. The code uses `currentColor`, which is `color/icon/secondary` inside Icon, matching the Icon variants' override.
4. Raw paints: Icon/X (195:268) #000000; Icon/arrow_drop_down (257:4307) and resize_window (277:1814) #1C1B1F, each with an unbound #D9D9D9 mask. Unbound 0.5 opacity on one layer of Icon/Key (34:2702) and Icon/Bandaids (34:4552), which staging draws at full opacity.
5. Duplicate glyph names: Icon/Table, Icon/List, Icon/Layout and Icon/GridFour. Code suffixes them with the node id and does not rename them silently.

## Design note (new, not a failure)
- `get_variable_defs` on Outlined · Circle (55:513) lists `color/bg/base`, but `get_design_context` for the same node shows no visible fill. Outlined · Rounded (55:509) does not list it. This looks like a hidden or zero-opacity fill bound to `color/bg/base` on the Outlined Circle variants. Staging draws them transparent, which matches the visible design. The designer may want to remove the hidden fill so that the binding list matches what is drawn.

## Screenshots (`reports/Icon/`)
- `Icon-staging-{12,16,24,32}-{standard,outlined}-{rounded,circle}.png`: one per variant, on staging (3× scale)
- `Icon-staging-all-variants.png`: all 16 on staging, laid out like the Figma set
- `Icon-figma-48-1251.png`: the Figma render of the component set
- `Icon-staging-swapIcon-User.png`: the labelled swap, Icon/User in a 32 Outlined Circle
- `Icon-staging-all-glyphs-full.png`: the "All glyphs (914)" story on staging
- `Icon-figma-glyph-spotcheck.png`: the Figma vector exports of the 11 spot-checked glyphs
