# QA report: Media Container

- **Run:** 2026-10-20, first test. The registry woke QA because `Development` read `Ready for Testing` on Components row `rec5jev9uDntbjDyU`.
- **Tested build:** the URL in `Staging Storybook`, https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app/?path=/story/components-media-container--playground (branch `staging`, head `c9087fb`, which includes Media Container PR #42). I tested the deployed URL, not a local build. Deployed stylesheet: `assets/MediaContainer-6MhP3v7u.css`.
- **Staging check:** `<base>/index.json` lists Docs, Playground, 12 `matrix-*` stories and Interactive for `components-media-container`.
- **Figma:** file `MWuaFZQ58G4WvtbCyeaE1X`, component set [Media Container, 304:2006](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=304-2006). Bindings were read live over the Figma MCP (`get_metadata` plus a read-only `use_figma` dump of every variant's strokes, fills, gradient stops, radii and bound variables).
- **Tester:** QA agent. I did not build this component, and I changed nothing in `src/`.

## Verdict

| | Cases |
|---|---|
| Expected matrix, from Figma 304:2006 (Ratio/Type x Device x State) | 12 |
| Passed | 11 |
| Failed | 1 |
| Staging Testing rows written (Decision 7: one per State x Type) | 6: 5 `Passed`, 1 `Failed` |

After the rows were written, `Development` reads **To be fixed**.

## Rows written (Staging Testing, linked to rec5jev9uDntbjDyU)

| Row | Record | Result | Covers |
|---|---|---|---|
| Media Container · Landscape · Default | recWFQbyHnvwD2wHl | Passed | 304:2005, 304:2222 |
| Media Container · Square · Default | rec7lOHR5UPiVuBXA | Passed | 318:2380, 318:2400 |
| Media Container · Landscape · Hover | recMHjekUNebtO5uF | Passed | 304:2226, 313:2284 |
| Media Container · Square · Hover | recE4KhPJjsknN3bL | Passed | 318:2396, 318:2408 |
| Media Container · Landscape · Focus | rec8rfO9zGFsLW1BR | **Failed** | 313:2276 (failed), 313:2280 |
| Media Container · Square · Focus | recMrEMBUAlwC4Shc | Passed | 318:2388, 318:2404 |

`Size` is `null` (Device is Website/Mobile, not a size). `State` maps Default=idle, Hover=hovered, Focus=focus. The Staging Testing table held 106 rows and now holds 112, well under the 1,000-row cap.

## Matrix reconciliation
Figma has 12 variant symbols; the story file has 12 `Matrix*` stories, one per variant, plus Playground and Interactive (demos, not extra cases). No missing case, no undocumented story. Figma exposes only the four variant properties (Ratio, Device, Type, State); no boolean or instance-swap property.

## Expected bindings (Figma, live)
All 12: vertical auto-layout, centred, padding 0, gap 0, clips content, radius `borderRadius/borderRadius-sm` (8), no fill, image fill "Slide Image" scale mode FILL.

| Variant | Size | Stroke weight | Align | Stroke colour | Overlay |
|---|---|---|---|---|---|
| 5:3 Website Default 304:2005 | 380x225 | borderWidth/05 | inside | color/border/neutral/light | hidden |
| 5:3 Website Hover 304:2226 | 380x225 | borderWidth/05 | inside | color/border/neutral/light | visible |
| 5:3 Website Focus 313:2276 | 380x225 | **borderWidth/1** | outside | color/border/neutral/light | hidden |
| 5:3 Mobile Default 304:2222 | 315x185 | borderWidth/05 | inside | color/border/primary | hidden |
| 5:3 Mobile Hover 313:2284 | 315x185 | borderWidth/05 | inside | color/border/neutral/light | visible |
| 5:3 Mobile Focus 313:2280 | 315x185 | borderWidth/05 | outside | color/border/primary | hidden |
| 1:1 Website Default 318:2380 | 280x280 | borderWidth/05 | inside | color/border/primary | hidden |
| 1:1 Website Hover 318:2396 | 280x280 | borderWidth/05 | inside | color/border/neutral/light | visible |
| 1:1 Website Focus 318:2388 | 280x280 | borderWidth/05 | outside | color/border/primary | hidden |
| 1:1 Mobile Default 318:2400 | 264x264 | borderWidth/05 | inside | color/border/primary | hidden |
| 1:1 Mobile Hover 318:2408 | 264x264 | borderWidth/05 | inside | color/border/neutral/light | visible |
| 1:1 Mobile Focus 318:2404 | 264x264 | borderWidth/05 | outside | color/border/primary | hidden |

Overlay (Hover): linear gradient, gradientTransform `[[0,1,0],[-1,0,1]]` = top to bottom; stop 0 rgba(43,33,27,0) unbound, stop 1 `color/bg/overlay`; radius `borderRadius/sm`.

## Per-case result (measured on staging with getComputedStyle / getBoundingClientRect)

| Case | Box | Radius / overflow | Stroke (::after) | Offset | Overlay | Result |
|---|---|---|---|---|---|---|
| 5:3 Website Default | 380x225 | 8px / hidden | 0.5px rgb(205,187,159) | 0 | 0 | Pass |
| 5:3 Website Hover | 380x225 | 8px / hidden | 0.5px rgb(205,187,159) | 0 | 1 | Pass |
| 5:3 Website Focus | 380x225 | 8px / hidden | **0.5px** rgb(205,187,159) | **-0.5px** | 0 | **Fail** |
| 5:3 Mobile Default | 315x185 | 8px / hidden | 0.5px rgb(148,128,103) | 0 | 0 | Pass |
| 5:3 Mobile Hover | 315x185 | 8px / hidden | 0.5px rgb(205,187,159) | 0 | 1 | Pass |
| 5:3 Mobile Focus | 315x185 | 8px / hidden | 0.5px rgb(148,128,103) | -0.5px | 0 | Pass |
| 1:1 Website Default | 280x280 | 8px / hidden | 0.5px rgb(148,128,103) | 0 | 0 | Pass |
| 1:1 Website Hover | 280x280 | 8px / hidden | 0.5px rgb(205,187,159) | 0 | 1 | Pass |
| 1:1 Website Focus | 280x280 | 8px / hidden | 0.5px rgb(148,128,103) | -0.5px | 0 | Pass |
| 1:1 Mobile Default | 264x264 | 8px / hidden | 0.5px rgb(148,128,103) | 0 | 0 | Pass |
| 1:1 Mobile Hover | 264x264 | 8px / hidden | 0.5px rgb(205,187,159) | 0 | 1 | Pass |
| 1:1 Mobile Focus | 264x264 | 8px / hidden | 0.5px rgb(148,128,103) | -0.5px | 0 | Pass |

rgb(205,187,159) = `--color-border-neutral-light` (#cdbb9f); rgb(148,128,103) = `--color-border-primary` (#948067). Overlay background on every case: `linear-gradient(rgba(0,0,0,0), rgba(43,33,27,0.3))` = transparent to `--color-bg-overlay`, radius 8px, rendered after the media layer. Padding 0, no shadow, opacity 1 on every root.

## Finding

```
Media Container / Landscape · Website · Focus (Figma 313:2276)
Expected  stroke weight borderWidth/1 (1px), outside -> ring 382x227 in Figma
Saw       stroke 0.5px (--borderwidth-05), offset -0.5px, both in the pinned Focus story
          and on real Tab focus (:focus-visible) of the Default container in Interactive
Where     MediaContainer.css: .cc-media-container::after border width and
          --cc-media-container-stroke-inset, Focus rules
Fix       for [data-ratio='5:3'][data-device='Website'] in Focus (data-state='Focus'
          and Default:focus-visible) use var(--borderwidth-1) for the border width
          and the outside offset
```
Evidence: `reports/MediaContainer/MediaContainer-staging-53-website-focus.png` (staging) and `reports/MediaContainer/MediaContainer-figma-313-2276-53-website-focus.png` (Figma render, 382x227 = 1px outside). The Figma render is attached to row rec8rfO9zGFsLW1BR.

The Engineer's design-gap note ("Focus is only the same 0.5 stroke moved outside") is true for 3 of the 4 Focus variants, but not for 5:3 Website, which Figma binds to borderWidth/1.

## How each state was driven
- **Hover:** a real pointer hover over the Default 5:3 Website container in `--interactive` matched `:hover`; overlay opacity went 0 -> 1 and the stroke changed to `--color-border-neutral-light`. The pinned Hover stories agree.
- **Focus:** real Tab key presses in `--interactive`. First Tab focused the 5:3 Website container (`:focus-visible` true, offset -0.5px, 0.5px), second Tab moved to the 1:1 Mobile one (offset -0.5px, 0.5px, `--color-border-primary`). Both containers have tabIndex 0; outline is none and the ring is the ::after stroke.
- **Disabled / loading:** not in Figma; not applicable.

## Fonts
The component renders no text (textContent length 0), so no width depends on a font. For the record, Inter is loaded on staging: "Media Container" at 400 14px measures 109.07px in Inter and 94.47px in a bogus family.

## Tokens
The deployed `MediaContainer-6MhP3v7u.css` contains no raw hex or non-zero px; every colour, radius and stroke is a semantic token. Frame sizes come from the `FRAME` map in `MediaContainer.tsx` as SVG sizer geometry, because Figma leaves them unbound.

Note, not a finding: Figma currently resolves `color/border/primary` to #c3c7cd in the mode the file is open in, while `tokens.css` holds #948067 (comment: "Changed from neutral-200 to neutral-500 at user request"). The binding is the same; the value is a token-source matter, not the component's.

## Engineer's reported design gaps, judged against Figma
1. **Frame sizes unbound** - confirmed. No width/height variable on any variant. Gap.
2. **Overlay gradient stop 0 unbound** - confirmed (stop 0 has no variable; stop 1 is `color/bg/overlay`). Gap.
3. **Overlay below the image in Figma layer order** - confirmed: children order is Overlay, Supporting Icons, Slide Image, so Overlay is the bottom layer. Figma's own render only shows the gradient because the image fill is empty. Building it above the image matches the Hover intent. Gap; designer should move the layer.
4. **Default stroke colour differs by variant** - confirmed: 5:3 Website Default (and Focus) use `color/border/neutral/light`; all other Default/Focus use `color/border/primary`. The build follows Figma. Gap for the designer to confirm.
5. **Focus is a weak indicator, `color/border/focus` unused** - confirmed that no Focus variant binds `color/border/focus`. Partly wrong: 5:3 Website Focus uses borderWidth/1, not 0.5 (see the finding). The weak indicator is a design gap and an accessibility risk (WCAG 2.4.7 / 1.4.11).
6. **Hidden "Supporting Icons" instance not built** - confirmed hidden in all 12 variants, and no component property exposes it. Reasonable to leave out. Gap.

## Other notes
- `type` is a separate prop that can contradict `ratio` (for example `ratio="1:1" type="Landscape"`), a combination Figma does not have. It only sets `data-type`, so nothing renders differently. Worth documenting or deriving it only from `ratio`.

## Screenshots (`reports/MediaContainer/`)
- `MediaContainer-staging-{53,11}-{website,mobile}-{default,hover,focus}.png`: one per case, headless Chrome on the staging story iframes, 2x scale
- `MediaContainer-figma-313-2276-53-website-focus.png`: Figma render of the failing variant
- `MediaContainer-figma-304-2006.png`: Figma render of the whole component set

---

## Re-test (2026-10-20): Development read `Fixed`

- **Woken by:** `Fixed`; row rec8rfO9zGFsLW1BR ("Media Container · Landscape · Focus") read `Fixed (To re-test)`.
- **Build tested:** staging URL in `Staging Storybook` (PR #43, Engineer commit 0ab8073). Measured live in the browser: all 12 matrix stories loaded from `/iframe.html?id=components-media-container--matrix-*`, plus real Tab presses in `--interactive`.
- **Figma re-read live** (read-only `use_figma` over component set 304:2006). All four Focus variants now bind stroke weight `borderWidth/1` (1px), align OUTSIDE, colour `color/border/neutral/light`. Rendered sizes: 313:2276 = 382x227, 313:2280 = 317x187, 318:2388 = 282x282, 318:2404 = 266x266. This confirms the Engineer's reading. The 8 Default/Hover bindings are unchanged from the first test (0.5px, inside; Default colour `color/border/primary` except 5:3 Website, which is `neutral/light`; Hover `neutral/light` with overlay visible).
- **Fonts:** the component renders no text, so no width depends on a font.

### Focus results (staging)
| Case | Box | ::after stroke | Offset | Outer ring | Result |
|---|---|---|---|---|---|
| 5:3 Website Focus | 380x225 | 1px rgb(205,187,159) = `--color-border-neutral-light` | -1px | 382x227 | Pass |
| 5:3 Mobile Focus | 315x185 | 1px rgb(205,187,159) | -1px | 317x187 | Pass |
| 1:1 Website Focus | 280x280 | 1px rgb(205,187,159) | -1px | 282x282 | Pass |
| 1:1 Mobile Focus | 264x264 | 1px rgb(205,187,159) | -1px | 266x266 | Pass |

Real Tab in `--interactive`: first Tab focuses 5:3 Website (`:focus-visible` true, 1px, -1px); second Tab focuses 1:1 Mobile (`:focus-visible` true, 1px, -1px, 264x264). Overlay opacity is 0 on all Focus cases.

### Default and Hover spot-check (staging, unchanged)
All eight: box 380x225 / 315x185 / 280x280 / 264x264 as in Figma, radius 8px, stroke 0.5px, offset 0. Stroke colours: 5:3 Website Default rgb(205,187,159); 5:3 Mobile, 1:1 Website and 1:1 Mobile Default rgb(148,128,103) (`--color-border-primary`); all Hover rgb(205,187,159) with overlay opacity 1; Default overlay 0. No regressions.

Note: overflow clipping moved from the root to the inner `.cc-media-container__frame` (hidden, radius 8px) so the outside ring is not clipped. The visual result matches Figma; not a finding.

### Rows updated (one Airtable call, 2 rows, no new rows)
- rec8rfO9zGFsLW1BR Landscape · Focus: `Fixed (To re-test)` -> **Passed**.
- recMrEMBUAlwC4Shc Square · Focus: stays **Passed**. It was passed against the old 0.5px / `color/border/primary` design; Figma has since changed to 1px / `neutral/light`, and staging now matches that, so the verdict holds. Its Expected Results text was rewritten to the new design.
- The other 4 rows were not touched (their bindings are unchanged and re-measured as passing).

### Verdict
Re-test: 12 of 12 cases Passed, 0 Failed. Staging Testing rows: 6 Passed, 0 Failed.

Design gap, unchanged and not against the Engineer: Focus is a 1px neutral-light ring with no `color/border/focus` binding, a weak focus indicator (WCAG 2.4.7 / 1.4.11 risk). Designer to decide.

Screenshots: `reports/MediaContainer/MediaContainer-retest-{53,11}-{website,mobile}-focus.png` (staging, 2x).
