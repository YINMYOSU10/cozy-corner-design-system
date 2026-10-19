# QA report: Button / Neutral

- **Run:** 2026-10-19, first test. The registry woke QA because `Development` read `Ready for Testing` on Components row `recJoYI82MvRX6qbc`.
- **Tested build:** the URL in `Staging Storybook`, https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app/?path=/docs/components-button-neutral--docs (branch `staging`, head `ede1112`, which merged PR #9 `component/button-neutral`). I tested the deployed URL, not a local build.
- **Staging check:** the root returned 200 and `<base>/index.json` parsed. It lists 14 entries under "Components/Button Neutral": Docs, Playground and 12 sheet stories. The Docs page rendered the real Storybook UI (sidebar, Button Neutral docs, controls table). Each sheet iframe rendered 25 `[data-matrix]` cells and 25 `.cc-button--neutral` buttons.
- **Figma:** [Button / Neutral, 444:6334](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=444-6334), file `MWuaFZQ58G4WvtbCyeaE1X`. Read as it stands after today's published binding fixes. This matches the `Figma` cell on the row.
- **Tester:** QA agent. I did not build this component. I changed nothing in `src/`.

## Verdict

| | Cases |
|---|---|
| Expected matrix, from Figma 444:6334 | 300 |
| Passed | 300 |
| Failed | 0 |
| Staging Testing rows written (Decision 7: one per State × Type) | 10, all `Passed` |

After the rows were written, `Development` reads **To be deployed**. Total Staging Tests is 10 and Synchronization is 100%.

## Rows written (Staging Testing, linked to recJoYI82MvRX6qbc)

| Row | Record | Result | Variants |
|---|---|---|---|
| Button / Neutral · Default · Default | recfBDn5z5RFr3DCw | Passed | 30/30 |
| Button / Neutral · Outline · Default | recYQW7xoRPjT1hBe | Passed | 30/30 |
| Button / Neutral · Default · Hover | recmQqIIGh6Jnjxj0 | Passed | 30/30 |
| Button / Neutral · Outline · Hover | recHUluIKxPDzpuBc | Passed | 30/30 |
| Button / Neutral · Default · Press | recfxDWsgge0AQn1T | Passed | 30/30 |
| Button / Neutral · Outline · Press | recz001rQcg8vcZox | Passed | 30/30 |
| Button / Neutral · Default · Focus | recGxA8upWO6ou7en | Passed | 30/30 |
| Button / Neutral · Outline · Focus | recHmlq64lsmGzrFk | Passed | 30/30 |
| Button / Neutral · Default · Disable | recuBhDzF46LHKjTW | Passed | 30/30 |
| Button / Neutral · Outline · Disable | recWoRrVnHJ6L0kQo | Passed | 30/30 |

Each row's `Variants` cell lists all 30 of its variants with their Figma node ids. The Staging Testing table now holds 40 rows, well under the free plan's 1,000-row cap.

## How each case was checked

### 1. The matrix came from Figma, not the story file

A read-only `use_figma` script (no writes) went through all 300 children of 444:6334: 5 State × 5 Icon-style × 2 Shape × 3 Size × 2 Type. It read binding **names**, not resolved values, so the result does not depend on which mode the file is open in. Every State × Type group is internally consistent, with no stray variants:

| State · Type | Fill | Stroke (1px inside) | Label / icon | Effects |
|---|---|---|---|---|
| Default · Default | `color/bg/neutral/light` | none | `color/text/bold` / `color/icon/bold` | none |
| Hover · Default | `color/bg/neutral/lightHovered` | none | bold / bold | none |
| Press · Default | `color/bg/neutral/lightFocused` | none | bold / bold | none |
| Focus · Default | `color/bg/neutral/lightFocused` | none | bold / bold | ring |
| Disable · Default | `color/bg/disabled` | none | `color/text/disabled` / `color/icon/disabled` (all 30) | none |
| Default · Outline | none | `color/border/neutral/default` | bold / bold | none |
| Hover · Outline | `color/bg/neutral/light` | `color/border/neutral/default` | bold / bold | none |
| Press · Outline | `color/bg/neutral/lightHovered` | `color/border/neutral/bold` (all 30, at every size) | bold / bold | none |
| Focus · Outline | `color/bg/neutral/light` | `color/border/neutral/default` | bold / bold | ring |
| Disable · Outline | none | `color/border/secondary` | disabled / disabled | none |

- **Focus ring:** drop shadows spread 2 `color/bg/base` and spread 4 `color/border/focus`.
- **Radius:** `borderRadius/sm` on all 150 Rounded, `borderRadius/circle` on all 150 Pill. Icon slots use a radius binding (`borderRadius/xs` in code).
- **Spacing:** padding `spacing/sm` × `spacing/md`, gap `spacing/sm`, on all 300.
- **Type:** Karla Regular 14/22 (Body small) at 32, Inter Medium 16/26 (Label large) at 48 and 56.
- **Icons:** 16px at 32, 24px at 48 and 56, Icon only at 56 is 32px.
- **Size:** labelled variants are a fixed 130 × 32/48/56, with no width token. Icon only is 32/48/56 square.

Today's published fixes are present: Outline · Press binds `border/neutral/bold` at all three sizes, and every Default · Disable label and icon uses the disabled tokens.

### 2. The stories were reconciled with Figma

There are 12 sheet stories × 25 cells = 300 cases, one per Figma variant, keyed by a `data-matrix` attribute that spells out the Figma variant name. No case is missing. Playground has no Figma row; it is a controls story, not dead code.

### 3. Fonts were confirmed before measuring

After `document.fonts.ready` and explicit loads, I measured `Label Hamburgefonstiv` on a canvas against a made-up font name:

- Inter 500 16px: 177.84 vs 152.12
- Karla 400 14px: 148.57 vs 133.10

Both fonts were loaded.

### 4. All 300 cases were measured on staging

One script opened each of the 12 sheet stories as a same-origin iframe on the staging host. For each cell it compared computed styles against the computed value of the CSS token Figma binds. It checked:

- background; border width and colour (0 for Default type, 1px for Outline)
- radius (8px `--borderradius-sm` / 1000px `--borderradius-circle`)
- height (`--size-button-sm/md/lg`), and Icon only width = height (±0.5px)
- padding-top `--spacing-sm`, and padding-left + border = `--spacing-md`
- box-shadow: the ring on Focus, `none` everywhere else
- label family, weight, size, line height and colour
- icon slot count (Both 2, leading/trailing/Icon only 1, none 0), icon box size, path stroke colour
- `aria-label` on Icon only, and the `disabled` attribute on Disable only

**Judging by the token bound, not by eye.** In this mode `--color-bg-neutral-lighthovered` and `--color-bg-neutral-lightfocused` both resolve to #cdbb9f, so Default · Hover, Press and Focus look the same apart from the ring. That is a known design note, not a defect. A colour match alone could not tell the states apart, so for every cell the script also resolved which CSS rule sets `--cc-button-bg`, `--cc-button-border`, `--cc-button-text` and `--cc-button-icon` (by matching stylesheet selectors and specificity). It then checked that the declared value names the same token Figma binds, for example `var(--color-bg-neutral-lighthovered)` on Hover and `var(--color-bg-neutral-lightfocused)` on Press and Focus.

**Result: 0 mismatches in 300.** The comparisons were real, not empty. The tokens resolved on `:root`: `--color-bg-neutral-light` rgb(243,232,214), `--color-border-neutral-default` rgb(168,150,125), `--color-border-neutral-bold` rgb(148,128,103), `--color-border-secondary` rgb(205,187,159), `--color-text-bold` rgb(43,33,27), `--color-text-disabled` rgb(168,150,125). Leading and trailing icons sit on the correct side of the label (icon-label, label-icon), with a gap of 8px (`--spacing-sm`).

### 5. States were driven, not only rendered

| Check | Result |
|---|---|
| Hover, Default type: real pointer on Default·leading icon·Rounded·56 | `:hover` true, fill `--color-bg-neutral-lighthovered`, cursor pointer. Pass. |
| Hover, Outline type: real pointer on Default·none·Pill·56 | fill `--color-bg-neutral-light`, border 1px `--color-border-neutral-default`, no ring. Pass. |
| Focus, Default type: clicked blank page, pressed Tab once | landed on Default·Both icons·Rounded·56, `:focus-visible` true, fill `--color-bg-neutral-lightfocused`, ring `rgb(251,243,231) 0 0 0 2px, rgb(193,99,61) 0 0 0 4px` (`--color-bg-base`, `--color-border-focus`). Pass. |
| Focus, Outline type: the same on Outline·Pill·56 | `:focus-visible` true, fill `--color-bg-neutral-light`, border `--color-border-neutral-default`, same ring. Pass. |
| Activation: Enter, then Space, on the focused button | `click` fired once each (2 total). Pass. |
| Disable: real click on Disable·Icon only·Rounded·56 | 0 handlers fired on the button or its cell; it was hovered, not focused; cursor `not-allowed`; fill stayed `--color-bg-disabled`. No disabled button is focusable. Pass. |
| Press | Checked through the pinned `state="Press"` cells only. The browser tools cannot hold a pointer down, so a real `:active` was **not driven**. The code's `:active` rule sets the same tokens as the pinned rule. |
| Loading | Figma has no Loading state, and neither does the component. |

### 6. Tokens

`ButtonNeutral.css` on `staging` contains no raw hex, rgb, px or font values. Every value is a semantic token (`--color-bg-neutral-*`, `--color-border-neutral-*`, `--color-text-bold`, `--color-icon-bold`), and all of them exist in `build/tokens/css/tokens.css`. The component imports `Button` and only changes its colour custom properties. It does not copy Button's styles.

## Findings

None. No case failed.

## Design notes (not logged against the Engineer)

- **G1. Fixed 130px width.** Every labelled Figma variant is a fixed 130px wide, and the width is not bound to any token. Staging hugs its content, the same way Button / Primary and Button / Destructive do. Measured staging widths:

  | Size | none | leading or trailing icon | Both icons |
  |---|---|---|---|
  | 32 | 57.66 | 81.66 | 105.66 |
  | 48 and 56 | 65.45 | 97.45 | 129.45 |

  Icon only matches exactly. An unbound value is a design gap, so I did not fail these cases. The designer should switch these variants to hug, or add a width token.
- **G2. Empty trailing icon.** All 20 Size 56 "leading icon" variants have a visible but empty `Trailing Icon` instance with no children. It is 16px in 2 Rounded variants and 24px in the others. It draws nothing, and staging leaves it out. This should be cleaned up in Figma.
- **G3. Shared neutral colours.** `bg/neutral/lightHovered` and `bg/neutral/lightFocused` resolve to the same colour (#cdbb9f) in this mode. So Default-type Hover, Press and Focus differ only by the focus ring, and a user gets no visual feedback between hover and press. This was a known design note when QA was woken. Code binds the correct token for each state.

## Screenshots (`reports/ButtonNeutral/`)

These are browser-pane captures saved as JPEG.

- `staging-sheet-Default-Rounded-56-real-hover-leading.jpg`: all 5 states of the Default type, with a real pointer hovering Default·leading icon
- `staging-sheet-Default-Rounded-56-real-tab-focus.jpg`: the same sheet, with real Tab focus on Default·Both icons
- `staging-sheet-Outline-Pill-56-real-hover-tab-focus.jpg`: all 5 states of the Outline type, with real Tab focus on Default·Both icons and a pointer on Default·none
- `figma-component-set-444-6334.png`: the Figma render of the whole component set

There are no failures, so there are no Figma failure renders. The `Attachment` cells are empty, because the connector cannot upload local files.

## Limits

- Press was not driven with a real held pointer (see 5).
- Only the default token mode was tested.

These are test results, not a release decision. A human has the final say.
