# QA report: Avatar

- **Run:** 2026-10-19, first test. The registry woke QA because `Development` read `Ready for Testing` on Components row `rec7DWllJSYiqtYtX`.
- **Tested build:** the URL in `Staging Storybook`, https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app/?path=/docs/components-avatar--docs (branch `staging`, head `b643aa0`, which includes Avatar PR #19 and the font-weight token fix PR #20). I tested the deployed URL, not a local build.
- **Staging check:** the page title was "Components / Avatar - Docs ⋅ Storybook" and the preview iframe was present. `<base>/index.json` lists Docs plus 6 stories: `components-avatar--size-{32,40,48}-{initials,icon}`.
- **Figma:** file `MWuaFZQ58G4WvtbCyeaE1X`. Component set [Avatar, 576:24](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=576-24). Glyph master [Icon/User, 34:881](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=34-881).
- **Tester:** QA agent. I did not build this component, and I changed nothing in `src/`.

## Verdict

| | Cases |
|---|---|
| Expected matrix, from Figma 576:24 (Size × Type) | 6 |
| Passed | 6 |
| Failed | 0 |
| Staging Testing rows written (Decision 7: one per Type) | 2, both `Passed` |

After the rows were written, `Development` reads **To be deployed**.

## Rows written (Staging Testing, linked to rec7DWllJSYiqtYtX)

| Row | Record | Result | Covers |
|---|---|---|---|
| Avatar · Initials | reccgl0NB7RIHr9XI | Passed | Size 32 / 40 / 48 (576:3, 576:10, 576:17) |
| Avatar · Icon | recJjy7TpIbGw8t4a | Passed | Size 32 / 40 / 48 (576:5, 576:12, 576:19) |

`Size` maps 32=sm, 40=md, 48=lg. `State` is `idle`, because Avatar is not interactive. The Staging Testing table held 51 rows and now holds 53, well under the free plan's 1,000-row cap.

## Matrix (from Figma) and per-case result

Figma `get_metadata` on 576:24 gives 6 variant symbols, each square at its Size value. Each one has a story, and there are no extra stories, so no case is missing and no story is undocumented.

Expected bindings, from `get_design_context`:
- **Container (all 6):** fill `color/bg/primary/light`, radius `borderRadius/circle`, no padding or gap, content centred.
- **Initials:** fill `color/text/brand`, `fontFamily/inter` + `fontWeight/semibold` (600). Size 32 uses `fontSize/12` + `lineHeight/16` with 0.32px tracking. Sizes 40 and 48 use `fontSize/14` + `lineHeight/20`.
- **Icon:** Icon/User in a 16, 20 or 24 box, stroked with `color/text/brand` at 1.5.

Every value below was read from the browser with `getComputedStyle` and `getBoundingClientRect` in each story iframe.

| Size | Type | Figma | Box | Background | Radius | Content colour | Content | Content box (Figma) | Centre offset | Result |
|---|---|---|---|---|---|---|---|---|---|---|
| 32 | Initials | 576:3 | 32×32 | #f6ddd1 | 1000px | #834026 | 600 12px/16px Inter, "SU" | 16.64×16 (17×16) | 0, 0 | Pass |
| 40 | Initials | 576:10 | 40×40 | #f6ddd1 | 1000px | #834026 | 600 14px/20px Inter, "SU" | 19.41×20 (20×20) | 0, 0 | Pass |
| 48 | Initials | 576:17 | 48×48 | #f6ddd1 | 1000px | #834026 | 600 14px/20px Inter, "SU" | 19.41×20 (20×20) | 0, 0 | Pass |
| 32 | Icon | 576:5 | 32×32 | #f6ddd1 | 1000px | #834026 | Icon/User, stroke 1.5 | 16×16 (16×16) | 0, 0 | Pass |
| 40 | Icon | 576:12 | 40×40 | #f6ddd1 | 1000px | #834026 | Icon/User, stroke 1.5 | 20×20 (20×20) | 0, 0 | Pass |
| 48 | Icon | 576:19 | 48×48 | #f6ddd1 | 1000px | #834026 | Icon/User, stroke 1.5 | 24×24 (24×24) | 0, 0 | Pass |

None of the six cases has a border, shadow or padding, and every one has opacity 1. Every computed colour equals its token's value on staging: `--color-bg-primary-light` is #f6ddd1, `--color-text-brand` is #834026 and `--borderradius-circle` is 1000px.

## How each case was checked

### 1. Fonts, before any width
All Inter faces read `unloaded` at first, so I loaded them explicitly with `document.fonts.load('600 14px Inter')` and checked again:
- **Inter is present.** "SU" at 600 12px measures 16.64px in Inter and 15.34px in a bogus family. The widths differ, so Inter is loaded and the fallback is not in use.
- **The weight axis is live.** At 12px, Inter 600 and 400 give almost the same advance for "SU" (16.64 vs 16.63px), so I checked ink coverage instead. At 100px, 600 draws 34% more ink than 400 (and 700 draws 50% more). The font is the Google Fonts variable Inter (`wght@400..700`), and the computed font is `600 … Inter`.
- **The token fix is live.** `--fontweight-semibold` resolves to `600` on staging. PR #20 is in effect.

### 2. Initials widths
- **Size 32:** 16.64 vs Figma 17. Figma's 17 includes the raw 0.32px tracking: 16.64 + 2 × 0.32 = 17.28, which Figma rounds to 17. This is the known, unapplied tracking gap.
- **Sizes 40 and 48:** 19.41 vs Figma 20. A difference under 1px is renderer rasterisation, not a defect.

### 3. Icon glyph
- The glyph's SVG has `viewBox="0 0 24 24"` and two paths. Both match the Figma exports of 576:6, 576:13 and 576:20 (scaled from the 24 master) and the Icon/User master 34:881. The head is the 12×12 circle at (6,3). The shoulders arc starts at (2.905, 15), with width 18.19 and height 5.25.
- The stroke is #834026 at 1.5px with `vector-effect: non-scaling-stroke`, and the fill is none. That keeps the stroke at 1.5 at every size, as the Figma exports do (stroke-width 1.5 in the 16, 20 and 24 exports alike).

### 4. States
Avatar is not interactive. Figma has no hover, focus, pressed, disabled or loading variant, and the element has `tabIndex -1` with no handlers. So idle is the only state.

### 5. Accessibility
- **Without `label` (the default in all 6 stories):** the root has `aria-hidden="true"`, so nothing is announced. That includes the initials "SU", which is decorative by the documented API.
- **With `label="Su Yin"`:** the accessibility tree shows a single `img "Su Yin"` for both Initials (Size 40) and Icon (Size 48). "SU" is not read separately, because children of `role=img` are presentational, and the glyph SVG is `aria-hidden`.

### 6. Tokens
The deployed `assets/Avatar-BaZFWino.css` has no raw hex, px or font value. Every visual property references a semantic token. Sizes are carried as SVG width and height from the `size` prop, because Figma leaves them unbound.

## Design gaps (reported, not defects)
1. Container sizes 32, 40 and 48 are unbound in Figma.
2. Icon boxes 16, 20 and 24 are unbound in Figma.
3. The Size 32 initials have a raw 0.32px letter-spacing with no token, and it is not applied. That accounts for the 0.36px width delta at Size 32.
4. The Icon/User stroke is bound to a text token (`color/text/brand`), not an icon token.
5. The icon stroke weight of 1.5 is unbound.

## Suggestions (no fix required)
- The header comment in `Avatar.stories.tsx` still says `fontWeight/semibold` resolves to "semibold" and is dropped. Since PR #20 it resolves to 600 and is applied, so that line is stale.
- Consider stating in the story docs that an Initials avatar without `label` is silent to screen readers, so that consumers pass `label` when the avatar is the only identifier.

## Screenshots (`reports/Avatar/`)
- `Avatar-staging-{32,40,48}-{initials,icon}.png`: one per variant, on staging (3× scale)
- `Avatar-staging-40-initials-labelled.png`: Size 40 Initials with `label="Su Yin"`
- `Avatar-figma-576-24.png`: the Figma render of the component set
