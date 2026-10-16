# QA report: Button / Primary

- **Component:** `src/components/Button/` (Button.tsx, Button.css, PlusIcon.tsx, Button.stories.tsx), branch `component/button` at `57a6d65`
- **Figma:** [Button / Primary, 66:459](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=66-459), file `MWuaFZQ58G4WvtbCyeaE1X`
- **Storybook:** http://localhost:6006, 12 sheet stories plus Playground
- **Run date:** 2026-10-17 (re-test). Previous run: 2026-10-16 at `74cca7f`
- **Tester:** QA agent (did not build this component)

## Re-test

What changed since the previous run: one code fix (F1, commit `57a6d65`) and three Figma fixes (G1, G2, G3). The expected matrix was rebuilt from Figma for this run. I did not reuse the previous run's results or the story file.

| Finding | Cases | Previous | Re-test | Evidence |
|---|---|---|---|---|
| F1: Icon only at Size 56 rendered a 24px icon | 20 | FAIL (engineering) | **Fixed (Re-test)** | All 20 render a 32×32 `.cc-button__icon`, centred, `--borderradius-xs`. The SVG paths `M24.6667 16H7.33333` / `M16 24.6667V7.33333` at stroke 1.18182 match the Figma vectors in 101:1069 exactly (x 7.333→24.667, stroke 1.1818). Size 48 Icon only is still 24px and Size 32 is still 16px. |
| G1: Size 56 leading icon had a stray Trailing Icon slot in Figma | 20 | DESIGN GAP | **Fixed (Re-test)** | `get_metadata`: all 20 are now 98×56. The per-variant dump shows exactly one visible slot ("Leading Icon"). 101:1284 / 132:7653 no longer show a second plus. Rendered 97.45×56. |
| G2: Outline Press border differed by size in Figma | 20 | DESIGN GAP | **Fixed (Re-test)** | All 30 Outline·Press variants now bind `color/border/brand/bold`. The code uses `--color-border-brand-bold` (Button.css line 97), rendered `rgb(193,99,61)`. No code change was needed. |
| G3: Default·Disable text/icon bound to */inverse in 20 variants | 20 | DESIGN GAP | **Fixed (Re-test)** | All 30 Default·Disable variants now bind `color/text/disabled` and `color/icon/disabled`. Rendered label and icon stroke are `--color-text-disabled` / `--color-icon-disabled` (`#a8967d`). |

Every row that carried a previous finding (72 rows, since 4 F1 rows also carried a G finding) now passes. The 228 rows that passed before still pass. **No regressions.**

## Summary

| | Cases |
|---|---|
| Variants in Figma (expected matrix) | 300 |
| Pass | 300 |
| Fail, engineering | 0 |
| Design gap (Figma disagreeing with itself) | 0 |

## How each case was checked

1. **Expected matrix taken from Figma, not from the story file.** I used `get_metadata` on 66:459 to get all 300 variant names and their widths and heights. I ran two read-only Plugin API scripts (`use_figma`, no writes; the tool confirmed nothing was committed) over every variant. They checked:
   - fill, stroke, stroke weight and align
   - radius, padding, gap
   - effects and their colour bindings
   - visible text: fill binding, font and text style
   - visible icon slots: name, size, radius binding, and the stroke binding of every vector
   - sizing mode and the size/button height and width bindings

   Each variant was checked against the per-(Type, State) pattern. The pattern check found **0 deviations in 300 variants**. Every variant in a (Type, State) group binds the same fill, stroke, text and icon tokens. The groups are:
   - Fill per (Type, State): idle, hovered, pressed, focused, disabled for Default; none, light, lightHovered, light, none for Outline
   - Outline stroke: brand/default, with brand/bold on Press and border/secondary on Disable
   - Text and icon colour: inverse, brand, and disabled on every Disable
   - Radius: `borderRadius/sm` for Rounded, `borderRadius/circle` for Pill
   - Spacing: padding `spacing/sm`/`spacing/md` and gap `spacing/sm` on all 300
   - Text style: Body small (Karla 400 14/22) at 32 and Label large (Inter 500 16/26) at 48 and 56
   - Icon slots: 16 at 32 and 24 at 48/56, except Icon only at 56, which is 32. Every slot uses `borderRadius/xs`
   - Focus: two drop shadows, spread 2 `color/bg/base` and spread 4 `color/border/focus`
   - Sizing: labelled variants hug their width, with height bound to `size/button/sm|md|lg`. Icon only is fixed square, with width and height bound to the same token
2. **Fonts confirmed before any width was measured.** I measured `Label Hamburgefonstiv` on a canvas against a bogus family:
   - Karla 400 14px: 148.57px, against 133.10px for the fallback
   - Inter 500 16px: 177.84px, against 152.12px for the fallback

   `document.fonts` showed Karla and Inter loaded. A first reading taken before the story rendered gave identical widths for both, because the fonts had not loaded yet. I waited for the render and re-measured before trusting any width.
3. **All 300 cases measured in the browser.** One script loaded each of the 12 sheet stories (same-origin iframes off-screen, `document.fonts.ready` awaited) and read every `[data-matrix]` cell. For each cell it checked:
   - Rendered width (±1.5px) and height (exact)
   - Computed background, border width and colour, radius, `box-shadow`, and padding plus stroke
   - Label family, weight, size, line height and colour; container gap
   - Icon count, icon box size, icon radius, icon stroke colour, and Icon only centring (±0.5px)
   - The `disabled` attribute and `aria-label` for Icon only

   Each value was compared with the computed value of the CSS token named by the Figma binding (`color/bg/primary/lightHovered` → `--color-bg-primary-lighthovered`, and so on). **300 of 300 had no mismatches.** I spot-checked the comparisons to make sure they were not vacuous: tokens resolved to real values (e.g. `--color-border-brand-bold` = `#c1633d`), all 20 Size 56 Icon only cells reported a 32px icon, Size 48 Icon only reported 24px, and the widths were as listed below.
4. **Visual check.** I took new screenshots of every state row on the Default·Rounded·56 and Outline·Pill·56 sheets. They show the 32px Icon only plus, the single-icon Size 56 leading variant, and the disabled colours. I also pulled fresh Figma renders for each previously failing group and compared them by eye. They now agree with the rendered component.
5. **States were driven on the unpinned State=Default cells of the Outline·Pill·56 sheet (Icon only, Size 56).** I did not use the Playground story. Its URL args applied `type` but not `size` or `iconStyle`, so I drove the live sheet buttons instead.
   - **Hover:** a real pointer hover gave `:hover` true and background `rgb(246,221,209)` = `--color-bg-primary-light`, which matches the pinned Hover row. Pass.
   - **Focus:** I clicked blank page, then pressed Tab ×5. That landed on the Icon only button. `:focus-visible` was true, and the ring was `0 0 0 2px --color-bg-base, 0 0 0 4px --color-border-focus`. After a fresh mouse click from blank page, `:focus-visible` was false and there was no ring. Pass.
   - **Activation:** Enter, Space and a mouse click each fired `click` once, plus the extra mouse click in the focus check, for 4 in total. Pass.
   - **Disable:** a real click on the disabled Icon only fired 0 handlers. Hover left the background transparent and the border at `--color-border-secondary`, and the cursor was `not-allowed`. Tab ×21 from blank page went through the 20 enabled buttons and wrapped back to the first. None of the 5 disabled buttons took focus. Pass.
   - **Press:** checked only through the pinned `state="Press"` rows. The browser tools cannot hold a pointer down, so the real `:active` look was **not driven**. The `:active:not(:disabled)` rules are present (Button.css lines 73 and 94), but I make no claim about how they render.
   - **Loading:** Figma has no Loading state and the component has none, so there was nothing to test.
6. **Story coverage reconciled with Figma.** 12 sheets × 25 cells = 300, a one-to-one match with the 300 Figma variants, so no case is missing. The Playground story has no row in Figma. It is a documented controls story, not dead code.
7. **Tokens.** I scanned Button.css, Button.tsx and PlusIcon.tsx and found no raw hex, rgb or font values in the styles. The raw values I found are listed under "Token notes" below.

**Width tolerance:** labelled buttons render 0.34px (Size 32) or 0.55px (48/56) narrower than Figma, on every case alike. That is Figma and Chrome measuring text differently, not a component defect. I accepted widths within ±1.5px.

## Findings

No open findings. Each previous finding with its re-test status:

### F1: Icon only at Size 56 renders a 24px icon; Figma uses 32px (engineering, 20 cases): Fixed (Re-test)

```
Button · Icon only · Size 56 · every State × Shape × Type
Expected  Icon slot 32×32 (Figma "Icon" frame 32, radius borderRadius/xs)
Saw       .cc-button__icon 32×32, svg 32×32, centred; path geometry identical to Figma 101:1069
Where     Button.tsx line 54 (prop `size` + `iconStyle`), PlusIcon.tsx `size: 16 | 24 | 32`
```
- Evidence: `Button-figma-56-iconOnly-default.png` (Figma) vs the last column of `Button-state-*-Default-Rounded-56.png` and `Button-state-*-Outline-Pill-56.png` (rendered)

### G1: Size 56 "leading icon" carried a stray trailing slot in Figma (design gap, 20 cases): Fixed (Re-test)

Figma now gives 98×56 with only "Leading Icon" visible, in all 20. The render is 97.45×56. Evidence: `Button-figma-56-leading-rounded-default.png` and `Button-figma-56-leading-pill-disable.png` (one icon) vs the "leading icon" column of the state screenshots.

### G2: Outline Press border differed by size in Figma (design inconsistency, 20 cases): Fixed (Re-test)

All 30 Outline·Press variants bind `color/border/brand/bold`. The code uses `--color-border-brand-bold`. Evidence: `Button-figma-48-outline-press.png` vs `Button-state-Press-Outline-Pill-56.png`.

### G3: Default·Disable text and icon colours were inconsistent in Figma (design inconsistency, 20 cases): Fixed (Re-test)

All 30 Default·Disable variants bind `color/text/disabled` + `color/icon/disabled`, matching the code. Evidence: `Button-figma-56-trailing-rounded-disable.png` vs `Button-state-Disable-Default-Rounded-56.png`.

## Token notes (not findings)

- `transparent` (Button.css lines 84 and 124) is the Outline background. Figma has no fill there and no token exists for "no fill", so this is a faithful translation.
- Icon sizes 16, 24 and 32 are hard-coded in Button.tsx line 54. The PlusIcon stroke width 1.18182 is hard-coded in PlusIcon.tsx. The Figma icon frames and the vector stroke are unbound fixed values, so this is a **design gap**: there is no `size/icon/*` variable to bind. It is not an engineering defect.
- Focus ring spread uses `calc(var(--borderwidth-2) * 2)`. Figma's effect spreads (2 and 4) are unbound, so this is another small design gap. The rendered values match.
- Outline padding is `calc(--spacing-md - --borderwidth-1)`. That keeps the Figma inside stroke from changing the box, and widths match Figma for both types. Figma's 1px stroke weight is unbound, and the code uses `--borderwidth-1`.

## Screenshots (all in `reports/`)

| File | What | This run |
|---|---|---|
| Button-state-{Default,Hover,Press,Focus,Disable}-Default-Rounded-56.png | One state row each, all 5 icon styles | **Replaced** (were stale: 24px Icon only) |
| Button-state-{Default,Hover,Press,Focus,Disable}-Outline-Pill-56.png | One state row each, all 5 icon styles | **Replaced** (were stale: 24px Icon only) |
| Button-figma-56-iconOnly-default.png | Figma 101:1069, reference for F1 | **Replaced** (fresh render) |
| Button-figma-56-leading-rounded-default.png, Button-figma-56-leading-pill-disable.png | Figma 101:1079, 101:1284, reference for G1 | **Replaced** (Figma changed) |
| Button-figma-48-outline-press.png | Figma 132:7358, reference for G2 | **Replaced** (Figma changed) |
| Button-figma-56-trailing-rounded-disable.png | Figma 101:1259, reference for G3 | **Replaced** (Figma changed) |
| Button-real-hover-Outline-32.png, Button-real-tab-focus-Outline-32.png | Real hover and Tab focus, Playground, Size 32 | Kept from the previous run. The Size 32 Outline code is unchanged, and this run re-drove hover and focus on Size 56 Icon only (numbers above) |

## Verdict

All 300 cases pass. All four previous findings are Fixed (Re-test): F1 in code, and G1, G2, G3 in Figma. Nothing goes back to the engineer.
Not covered: the real `:active` (Press) look, because the browser tools cannot hold the pointer down. The pinned Press rows pass.
These are findings, not a final status. A human has the final say.

## The matrix (all 300 Figma variants)

Every row was measured in the browser against the per-variant Figma dump. "+ screenshot" means the row was also checked visually. Figma W×H comes from `get_metadata`; rendered W×H is the `getBoundingClientRect` size. "Previous run" gives the finding that row carried on 2026-10-16.

| State | Icon-style | Shape | Size | Type | Figma W×H | Rendered W×H | Icon px | Checked by | Result | Previous run |
|---|---|---|---|---|---|---|---|---|---|---|
| Default | Both icons | Rounded | 32 | Default | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Default | none | Rounded | 32 | Default | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Default | leading icon | Rounded | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Default | trailing icon | Rounded | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Default | Icon only | Rounded | 32 | Default | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Hover | Both icons | Rounded | 32 | Default | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Hover | none | Rounded | 32 | Default | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Hover | leading icon | Rounded | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Hover | trailing icon | Rounded | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Hover | Icon only | Rounded | 32 | Default | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Press | Both icons | Rounded | 32 | Default | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Press | none | Rounded | 32 | Default | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Press | leading icon | Rounded | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Press | trailing icon | Rounded | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Press | Icon only | Rounded | 32 | Default | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Focus | Both icons | Rounded | 32 | Default | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Focus | none | Rounded | 32 | Default | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Focus | leading icon | Rounded | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Focus | trailing icon | Rounded | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Focus | Icon only | Rounded | 32 | Default | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Disable | Both icons | Rounded | 32 | Default | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Disable | none | Rounded | 32 | Default | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Disable | leading icon | Rounded | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Disable | trailing icon | Rounded | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Disable | Icon only | Rounded | 32 | Default | 32×32 | 32×32 | 1×16 | measured | PASS | G3 → Fixed (Re-test) |
| Default | Both icons | Rounded | 48 | Default | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Default | none | Rounded | 48 | Default | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Default | leading icon | Rounded | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Default | trailing icon | Rounded | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Default | Icon only | Rounded | 48 | Default | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Hover | Both icons | Rounded | 48 | Default | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Hover | none | Rounded | 48 | Default | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Hover | leading icon | Rounded | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Hover | trailing icon | Rounded | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Hover | Icon only | Rounded | 48 | Default | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Press | Both icons | Rounded | 48 | Default | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Press | none | Rounded | 48 | Default | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Press | leading icon | Rounded | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Press | trailing icon | Rounded | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Press | Icon only | Rounded | 48 | Default | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Focus | Both icons | Rounded | 48 | Default | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Focus | none | Rounded | 48 | Default | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Focus | leading icon | Rounded | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Focus | trailing icon | Rounded | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Focus | Icon only | Rounded | 48 | Default | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Disable | Both icons | Rounded | 48 | Default | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Disable | none | Rounded | 48 | Default | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Disable | leading icon | Rounded | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Disable | trailing icon | Rounded | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | G3 → Fixed (Re-test) |
| Disable | Icon only | Rounded | 48 | Default | 48×48 | 48×48 | 1×24 | measured | PASS | G3 → Fixed (Re-test) |
| Default | Both icons | Rounded | 56 | Default | 130×56 | 129.45×56 | 2×24 | measured + screenshot | PASS | PASS |
| Default | none | Rounded | 56 | Default | 66×56 | 65.45×56 | – | measured + screenshot | PASS | PASS |
| Default | leading icon | Rounded | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G1 → Fixed (Re-test) |
| Default | trailing icon | Rounded | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | PASS |
| Default | Icon only | Rounded | 56 | Default | 56×56 | 56×56 | 1×32 | measured + screenshot | PASS | F1 → Fixed (Re-test) |
| Hover | Both icons | Rounded | 56 | Default | 130×56 | 129.45×56 | 2×24 | measured + screenshot | PASS | PASS |
| Hover | none | Rounded | 56 | Default | 66×56 | 65.45×56 | – | measured + screenshot | PASS | PASS |
| Hover | leading icon | Rounded | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G1 → Fixed (Re-test) |
| Hover | trailing icon | Rounded | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | PASS |
| Hover | Icon only | Rounded | 56 | Default | 56×56 | 56×56 | 1×32 | measured + screenshot | PASS | F1 → Fixed (Re-test) |
| Press | Both icons | Rounded | 56 | Default | 130×56 | 129.45×56 | 2×24 | measured + screenshot | PASS | PASS |
| Press | none | Rounded | 56 | Default | 66×56 | 65.45×56 | – | measured + screenshot | PASS | PASS |
| Press | leading icon | Rounded | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G1 → Fixed (Re-test) |
| Press | trailing icon | Rounded | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | PASS |
| Press | Icon only | Rounded | 56 | Default | 56×56 | 56×56 | 1×32 | measured + screenshot | PASS | F1 → Fixed (Re-test) |
| Focus | Both icons | Rounded | 56 | Default | 130×56 | 129.45×56 | 2×24 | measured + screenshot | PASS | PASS |
| Focus | none | Rounded | 56 | Default | 66×56 | 65.45×56 | – | measured + screenshot | PASS | PASS |
| Focus | leading icon | Rounded | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G1 → Fixed (Re-test) |
| Focus | trailing icon | Rounded | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | PASS |
| Focus | Icon only | Rounded | 56 | Default | 56×56 | 56×56 | 1×32 | measured + screenshot | PASS | F1 → Fixed (Re-test) |
| Disable | Both icons | Rounded | 56 | Default | 130×56 | 129.45×56 | 2×24 | measured + screenshot | PASS | G3 → Fixed (Re-test) |
| Disable | none | Rounded | 56 | Default | 66×56 | 65.45×56 | – | measured + screenshot | PASS | PASS |
| Disable | leading icon | Rounded | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G1, G3 → Fixed (Re-test) |
| Disable | trailing icon | Rounded | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G3 → Fixed (Re-test) |
| Disable | Icon only | Rounded | 56 | Default | 56×56 | 56×56 | 1×32 | measured + screenshot | PASS | F1, G3 → Fixed (Re-test) |
| Default | Both icons | Pill | 32 | Default | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Default | none | Pill | 32 | Default | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Default | leading icon | Pill | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Default | trailing icon | Pill | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Default | Icon only | Pill | 32 | Default | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Hover | Both icons | Pill | 32 | Default | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Hover | none | Pill | 32 | Default | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Hover | leading icon | Pill | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Hover | trailing icon | Pill | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Hover | Icon only | Pill | 32 | Default | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Press | Both icons | Pill | 32 | Default | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Press | none | Pill | 32 | Default | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Press | leading icon | Pill | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Press | trailing icon | Pill | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Press | Icon only | Pill | 32 | Default | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Focus | Both icons | Pill | 32 | Default | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Focus | none | Pill | 32 | Default | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Focus | leading icon | Pill | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Focus | trailing icon | Pill | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Focus | Icon only | Pill | 32 | Default | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Disable | Both icons | Pill | 32 | Default | 106×32 | 105.66×32 | 2×16 | measured | PASS | G3 → Fixed (Re-test) |
| Disable | none | Pill | 32 | Default | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Disable | leading icon | Pill | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | G3 → Fixed (Re-test) |
| Disable | trailing icon | Pill | 32 | Default | 82×32 | 81.66×32 | 1×16 | measured | PASS | G3 → Fixed (Re-test) |
| Disable | Icon only | Pill | 32 | Default | 32×32 | 32×32 | 1×16 | measured | PASS | G3 → Fixed (Re-test) |
| Default | Both icons | Pill | 48 | Default | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Default | none | Pill | 48 | Default | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Default | leading icon | Pill | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Default | trailing icon | Pill | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Default | Icon only | Pill | 48 | Default | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Hover | Both icons | Pill | 48 | Default | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Hover | none | Pill | 48 | Default | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Hover | leading icon | Pill | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Hover | trailing icon | Pill | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Hover | Icon only | Pill | 48 | Default | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Press | Both icons | Pill | 48 | Default | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Press | none | Pill | 48 | Default | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Press | leading icon | Pill | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Press | trailing icon | Pill | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Press | Icon only | Pill | 48 | Default | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Focus | Both icons | Pill | 48 | Default | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Focus | none | Pill | 48 | Default | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Focus | leading icon | Pill | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Focus | trailing icon | Pill | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Focus | Icon only | Pill | 48 | Default | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Disable | Both icons | Pill | 48 | Default | 130×48 | 129.45×48 | 2×24 | measured | PASS | G3 → Fixed (Re-test) |
| Disable | none | Pill | 48 | Default | 66×48 | 65.45×48 | – | measured | PASS | G3 → Fixed (Re-test) |
| Disable | leading icon | Pill | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | G3 → Fixed (Re-test) |
| Disable | trailing icon | Pill | 48 | Default | 98×48 | 97.45×48 | 1×24 | measured | PASS | G3 → Fixed (Re-test) |
| Disable | Icon only | Pill | 48 | Default | 48×48 | 48×48 | 1×24 | measured | PASS | G3 → Fixed (Re-test) |
| Default | Both icons | Pill | 56 | Default | 130×56 | 129.45×56 | 2×24 | measured | PASS | PASS |
| Default | none | Pill | 56 | Default | 66×56 | 65.45×56 | – | measured | PASS | PASS |
| Default | leading icon | Pill | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured | PASS | G1 → Fixed (Re-test) |
| Default | trailing icon | Pill | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured | PASS | PASS |
| Default | Icon only | Pill | 56 | Default | 56×56 | 56×56 | 1×32 | measured | PASS | F1 → Fixed (Re-test) |
| Hover | Both icons | Pill | 56 | Default | 130×56 | 129.45×56 | 2×24 | measured | PASS | PASS |
| Hover | none | Pill | 56 | Default | 66×56 | 65.45×56 | – | measured | PASS | PASS |
| Hover | leading icon | Pill | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured | PASS | G1 → Fixed (Re-test) |
| Hover | trailing icon | Pill | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured | PASS | PASS |
| Hover | Icon only | Pill | 56 | Default | 56×56 | 56×56 | 1×32 | measured | PASS | F1 → Fixed (Re-test) |
| Press | Both icons | Pill | 56 | Default | 130×56 | 129.45×56 | 2×24 | measured | PASS | PASS |
| Press | none | Pill | 56 | Default | 66×56 | 65.45×56 | – | measured | PASS | PASS |
| Press | leading icon | Pill | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured | PASS | G1 → Fixed (Re-test) |
| Press | trailing icon | Pill | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured | PASS | PASS |
| Press | Icon only | Pill | 56 | Default | 56×56 | 56×56 | 1×32 | measured | PASS | F1 → Fixed (Re-test) |
| Focus | Both icons | Pill | 56 | Default | 130×56 | 129.45×56 | 2×24 | measured | PASS | PASS |
| Focus | none | Pill | 56 | Default | 66×56 | 65.45×56 | – | measured | PASS | PASS |
| Focus | leading icon | Pill | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured | PASS | G1 → Fixed (Re-test) |
| Focus | trailing icon | Pill | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured | PASS | PASS |
| Focus | Icon only | Pill | 56 | Default | 56×56 | 56×56 | 1×32 | measured | PASS | F1 → Fixed (Re-test) |
| Disable | Both icons | Pill | 56 | Default | 130×56 | 129.45×56 | 2×24 | measured | PASS | G3 → Fixed (Re-test) |
| Disable | none | Pill | 56 | Default | 66×56 | 65.45×56 | – | measured | PASS | PASS |
| Disable | leading icon | Pill | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured | PASS | G1, G3 → Fixed (Re-test) |
| Disable | trailing icon | Pill | 56 | Default | 98×56 | 97.45×56 | 1×24 | measured | PASS | G3 → Fixed (Re-test) |
| Disable | Icon only | Pill | 56 | Default | 56×56 | 56×56 | 1×32 | measured | PASS | F1, G3 → Fixed (Re-test) |
| Default | Both icons | Rounded | 32 | Outline | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Default | none | Rounded | 32 | Outline | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Default | leading icon | Rounded | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Default | trailing icon | Rounded | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Default | Icon only | Rounded | 32 | Outline | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Hover | Both icons | Rounded | 32 | Outline | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Hover | none | Rounded | 32 | Outline | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Hover | leading icon | Rounded | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Hover | trailing icon | Rounded | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Hover | Icon only | Rounded | 32 | Outline | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Press | Both icons | Rounded | 32 | Outline | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Press | none | Rounded | 32 | Outline | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Press | leading icon | Rounded | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Press | trailing icon | Rounded | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Press | Icon only | Rounded | 32 | Outline | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Focus | Both icons | Rounded | 32 | Outline | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Focus | none | Rounded | 32 | Outline | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Focus | leading icon | Rounded | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Focus | trailing icon | Rounded | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Focus | Icon only | Rounded | 32 | Outline | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Disable | Both icons | Rounded | 32 | Outline | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Disable | none | Rounded | 32 | Outline | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Disable | leading icon | Rounded | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Disable | trailing icon | Rounded | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Disable | Icon only | Rounded | 32 | Outline | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Default | Both icons | Rounded | 48 | Outline | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Default | none | Rounded | 48 | Outline | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Default | leading icon | Rounded | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Default | trailing icon | Rounded | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Default | Icon only | Rounded | 48 | Outline | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Hover | Both icons | Rounded | 48 | Outline | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Hover | none | Rounded | 48 | Outline | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Hover | leading icon | Rounded | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Hover | trailing icon | Rounded | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Hover | Icon only | Rounded | 48 | Outline | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Press | Both icons | Rounded | 48 | Outline | 130×48 | 129.45×48 | 2×24 | measured | PASS | G2 → Fixed (Re-test) |
| Press | none | Rounded | 48 | Outline | 66×48 | 65.45×48 | – | measured | PASS | G2 → Fixed (Re-test) |
| Press | leading icon | Rounded | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | G2 → Fixed (Re-test) |
| Press | trailing icon | Rounded | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | G2 → Fixed (Re-test) |
| Press | Icon only | Rounded | 48 | Outline | 48×48 | 48×48 | 1×24 | measured | PASS | G2 → Fixed (Re-test) |
| Focus | Both icons | Rounded | 48 | Outline | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Focus | none | Rounded | 48 | Outline | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Focus | leading icon | Rounded | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Focus | trailing icon | Rounded | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Focus | Icon only | Rounded | 48 | Outline | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Disable | Both icons | Rounded | 48 | Outline | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Disable | none | Rounded | 48 | Outline | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Disable | leading icon | Rounded | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Disable | trailing icon | Rounded | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Disable | Icon only | Rounded | 48 | Outline | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Default | Both icons | Rounded | 56 | Outline | 130×56 | 129.45×56 | 2×24 | measured | PASS | PASS |
| Default | none | Rounded | 56 | Outline | 66×56 | 65.45×56 | – | measured | PASS | PASS |
| Default | leading icon | Rounded | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured | PASS | G1 → Fixed (Re-test) |
| Default | trailing icon | Rounded | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured | PASS | PASS |
| Default | Icon only | Rounded | 56 | Outline | 56×56 | 56×56 | 1×32 | measured | PASS | F1 → Fixed (Re-test) |
| Hover | Both icons | Rounded | 56 | Outline | 130×56 | 129.45×56 | 2×24 | measured | PASS | PASS |
| Hover | none | Rounded | 56 | Outline | 66×56 | 65.45×56 | – | measured | PASS | PASS |
| Hover | leading icon | Rounded | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured | PASS | G1 → Fixed (Re-test) |
| Hover | trailing icon | Rounded | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured | PASS | PASS |
| Hover | Icon only | Rounded | 56 | Outline | 56×56 | 56×56 | 1×32 | measured | PASS | F1 → Fixed (Re-test) |
| Press | Both icons | Rounded | 56 | Outline | 130×56 | 129.45×56 | 2×24 | measured | PASS | G2 → Fixed (Re-test) |
| Press | none | Rounded | 56 | Outline | 66×56 | 65.45×56 | – | measured | PASS | G2 → Fixed (Re-test) |
| Press | leading icon | Rounded | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured | PASS | G1, G2 → Fixed (Re-test) |
| Press | trailing icon | Rounded | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured | PASS | G2 → Fixed (Re-test) |
| Press | Icon only | Rounded | 56 | Outline | 56×56 | 56×56 | 1×32 | measured | PASS | F1, G2 → Fixed (Re-test) |
| Focus | Both icons | Rounded | 56 | Outline | 130×56 | 129.45×56 | 2×24 | measured | PASS | PASS |
| Focus | none | Rounded | 56 | Outline | 66×56 | 65.45×56 | – | measured | PASS | PASS |
| Focus | leading icon | Rounded | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured | PASS | G1 → Fixed (Re-test) |
| Focus | trailing icon | Rounded | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured | PASS | PASS |
| Focus | Icon only | Rounded | 56 | Outline | 56×56 | 56×56 | 1×32 | measured | PASS | F1 → Fixed (Re-test) |
| Disable | Both icons | Rounded | 56 | Outline | 130×56 | 129.45×56 | 2×24 | measured | PASS | PASS |
| Disable | none | Rounded | 56 | Outline | 66×56 | 65.45×56 | – | measured | PASS | PASS |
| Disable | leading icon | Rounded | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured | PASS | G1 → Fixed (Re-test) |
| Disable | trailing icon | Rounded | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured | PASS | PASS |
| Disable | Icon only | Rounded | 56 | Outline | 56×56 | 56×56 | 1×32 | measured | PASS | F1 → Fixed (Re-test) |
| Default | Both icons | Pill | 32 | Outline | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Default | none | Pill | 32 | Outline | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Default | leading icon | Pill | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Default | trailing icon | Pill | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Default | Icon only | Pill | 32 | Outline | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Hover | Both icons | Pill | 32 | Outline | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Hover | none | Pill | 32 | Outline | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Hover | leading icon | Pill | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Hover | trailing icon | Pill | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Hover | Icon only | Pill | 32 | Outline | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Press | Both icons | Pill | 32 | Outline | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Press | none | Pill | 32 | Outline | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Press | leading icon | Pill | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Press | trailing icon | Pill | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Press | Icon only | Pill | 32 | Outline | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Focus | Both icons | Pill | 32 | Outline | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Focus | none | Pill | 32 | Outline | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Focus | leading icon | Pill | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Focus | trailing icon | Pill | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Focus | Icon only | Pill | 32 | Outline | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Disable | Both icons | Pill | 32 | Outline | 106×32 | 105.66×32 | 2×16 | measured | PASS | PASS |
| Disable | none | Pill | 32 | Outline | 58×32 | 57.66×32 | – | measured | PASS | PASS |
| Disable | leading icon | Pill | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Disable | trailing icon | Pill | 32 | Outline | 82×32 | 81.66×32 | 1×16 | measured | PASS | PASS |
| Disable | Icon only | Pill | 32 | Outline | 32×32 | 32×32 | 1×16 | measured | PASS | PASS |
| Default | Both icons | Pill | 48 | Outline | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Default | none | Pill | 48 | Outline | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Default | leading icon | Pill | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Default | trailing icon | Pill | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Default | Icon only | Pill | 48 | Outline | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Hover | Both icons | Pill | 48 | Outline | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Hover | none | Pill | 48 | Outline | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Hover | leading icon | Pill | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Hover | trailing icon | Pill | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Hover | Icon only | Pill | 48 | Outline | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Press | Both icons | Pill | 48 | Outline | 130×48 | 129.45×48 | 2×24 | measured | PASS | G2 → Fixed (Re-test) |
| Press | none | Pill | 48 | Outline | 66×48 | 65.45×48 | – | measured | PASS | G2 → Fixed (Re-test) |
| Press | leading icon | Pill | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | G2 → Fixed (Re-test) |
| Press | trailing icon | Pill | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | G2 → Fixed (Re-test) |
| Press | Icon only | Pill | 48 | Outline | 48×48 | 48×48 | 1×24 | measured | PASS | G2 → Fixed (Re-test) |
| Focus | Both icons | Pill | 48 | Outline | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Focus | none | Pill | 48 | Outline | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Focus | leading icon | Pill | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Focus | trailing icon | Pill | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Focus | Icon only | Pill | 48 | Outline | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Disable | Both icons | Pill | 48 | Outline | 130×48 | 129.45×48 | 2×24 | measured | PASS | PASS |
| Disable | none | Pill | 48 | Outline | 66×48 | 65.45×48 | – | measured | PASS | PASS |
| Disable | leading icon | Pill | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Disable | trailing icon | Pill | 48 | Outline | 98×48 | 97.45×48 | 1×24 | measured | PASS | PASS |
| Disable | Icon only | Pill | 48 | Outline | 48×48 | 48×48 | 1×24 | measured | PASS | PASS |
| Default | Both icons | Pill | 56 | Outline | 130×56 | 129.45×56 | 2×24 | measured + screenshot | PASS | PASS |
| Default | none | Pill | 56 | Outline | 66×56 | 65.45×56 | – | measured + screenshot | PASS | PASS |
| Default | leading icon | Pill | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G1 → Fixed (Re-test) |
| Default | trailing icon | Pill | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | PASS |
| Default | Icon only | Pill | 56 | Outline | 56×56 | 56×56 | 1×32 | measured + screenshot | PASS | F1 → Fixed (Re-test) |
| Hover | Both icons | Pill | 56 | Outline | 130×56 | 129.45×56 | 2×24 | measured + screenshot | PASS | PASS |
| Hover | none | Pill | 56 | Outline | 66×56 | 65.45×56 | – | measured + screenshot | PASS | PASS |
| Hover | leading icon | Pill | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G1 → Fixed (Re-test) |
| Hover | trailing icon | Pill | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | PASS |
| Hover | Icon only | Pill | 56 | Outline | 56×56 | 56×56 | 1×32 | measured + screenshot | PASS | F1 → Fixed (Re-test) |
| Press | Both icons | Pill | 56 | Outline | 130×56 | 129.45×56 | 2×24 | measured + screenshot | PASS | G2 → Fixed (Re-test) |
| Press | none | Pill | 56 | Outline | 66×56 | 65.45×56 | – | measured + screenshot | PASS | G2 → Fixed (Re-test) |
| Press | leading icon | Pill | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G1, G2 → Fixed (Re-test) |
| Press | trailing icon | Pill | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G2 → Fixed (Re-test) |
| Press | Icon only | Pill | 56 | Outline | 56×56 | 56×56 | 1×32 | measured + screenshot | PASS | F1, G2 → Fixed (Re-test) |
| Focus | Both icons | Pill | 56 | Outline | 130×56 | 129.45×56 | 2×24 | measured + screenshot | PASS | PASS |
| Focus | none | Pill | 56 | Outline | 66×56 | 65.45×56 | – | measured + screenshot | PASS | PASS |
| Focus | leading icon | Pill | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G1 → Fixed (Re-test) |
| Focus | trailing icon | Pill | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | PASS |
| Focus | Icon only | Pill | 56 | Outline | 56×56 | 56×56 | 1×32 | measured + screenshot | PASS | F1 → Fixed (Re-test) |
| Disable | Both icons | Pill | 56 | Outline | 130×56 | 129.45×56 | 2×24 | measured + screenshot | PASS | PASS |
| Disable | none | Pill | 56 | Outline | 66×56 | 65.45×56 | – | measured + screenshot | PASS | PASS |
| Disable | leading icon | Pill | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | G1 → Fixed (Re-test) |
| Disable | trailing icon | Pill | 56 | Outline | 98×56 | 97.45×56 | 1×24 | measured + screenshot | PASS | PASS |
| Disable | Icon only | Pill | 56 | Outline | 56×56 | 56×56 | 1×32 | measured + screenshot | PASS | F1 → Fixed (Re-test) |
