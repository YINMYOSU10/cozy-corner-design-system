# QA report: Divider

- **Run:** 2026-10-19, first test. The registry woke QA because `Development` read `Ready for Testing` on Components row `recE3x5VULGrk5Y8d`.
- **Tested build:** the URL in `Staging Storybook`, https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app/?path=/docs/components-divider--docs (branch `staging`, head `051a8ee`). I tested the deployed URL, not a local build.
- **Staging check:** the root returned 200 and `<base>/index.json` parsed. It lists Components/Divider Docs plus 2 stories, `components-divider--solid` (IsDashed=False) and `components-divider--dashed` (IsDashed=True). Both story iframes rendered an `<hr class="cc-divider">`.
- **Figma:** [Divider, 17:3671](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=17-3671), file `MWuaFZQ58G4WvtbCyeaE1X`.
- **Tester:** QA agent. I did not build this component, and I changed nothing in `src/`.

## Verdict

| | Cases |
|---|---|
| Expected matrix, from Figma 17:3671 | 2 |
| Passed | 2 |
| Failed | 0 |
| Staging Testing rows written (Decision 7: one per IsDashed value) | 2, both `Passed` |

After the rows were written, `Development` reads **To be deployed**.

## Rows written (Staging Testing, linked to recE3x5VULGrk5Y8d)

| Row | Record | Result | Variants |
|---|---|---|---|
| Divider · IsDashed=False | recY71Vu7ADYxiLuw | Passed | IsDashed=False (17:3670) |
| Divider · IsDashed=True | recRYPvewuAYvEhS0 | Passed | IsDashed=True (17:3672) |

`Size` is `null`, because Divider has no size property. `State` is `idle`, because Divider is not interactive. The Staging Testing table now holds 46 rows, well under the free plan's 1,000-row cap.

## Matrix (from Figma) and per-case result

Figma `get_metadata` gives 2 variant symbols with one property, IsDashed. Each is 580 × 1. Both have a story, and the build has no stories outside the matrix.

| IsDashed | Figma node | Story | Staging box (in a 580px container) | Result |
|---|---|---|---|---|
| False | 17:3670 | components-divider--solid | 580 × 1 | Pass |
| True | 17:3672 | components-divider--dashed | 580 × 1 | Pass |

## How each case was checked

### 1. Fonts
Divider contains no text, so no width in this report depends on a font. For the record, the canvas check (`16px Fredoka` against a bogus family) gave identical widths (82.20 against 82.20) on the Divider story pages, so Fredoka is not loaded on those pages. That doesn't affect any measurement here.

### 2. Expected bindings (Figma `get_design_context` and `get_variable_defs` on 17:3670 and 17:3672)

| Property | Figma binding | Staging computed (both stories) | Match |
|---|---|---|---|
| Stroke colour | `color/border/secondary` | `border-top-color: rgb(205,187,159)` from `var(--color-border-secondary)` | yes |
| Stroke weight | `borderWidth/1` | `border-top-width: 1px` from `var(--borderwidth-1)` | yes |
| Stroke style | solid (False) / dashed (True) | `solid` / `dashed` | yes |
| Other borders | none | bottom, left and right are 0 | yes |
| Fill | none | transparent | yes |
| Height | 1 | 1 | yes |
| Width | 580, in a 580 frame | 100% of its container: 992 in the padded story, 580 in a 580px container | yes |
| Margin and opacity | none | margin 0, opacity 1 | yes |

`color/bg/surfacePrimary` also appears in the set's variable defs. It is the canvas frame background, not part of either variant.

### 3. Tokens in source
`src/components/Divider/Divider.css` on `staging` uses `var(--borderwidth-1)` and `var(--color-border-secondary)` only. It has no raw hex, px or font values; the 0 resets and `100%` are not visual tokens.

### 4. Accessibility
Divider is not interactive, so it has no hover, focus, disabled or loading state to drive.
- The element is a native `<hr>`. Its implicit ARIA role is `separator`.
- It has no `role` attribute overriding that, and no `aria-hidden` on it or on any ancestor.
- It cannot be focused: `tabIndex` is -1, and `.focus()` does not make it the active element. This is correct for a static separator.

The browser pane's accessibility-tree reader leaves out unnamed static nodes, so it could not list the separator directly. The result above rests on the markup.

## Design gap (not an engineering defect)
- **Dashed pattern:** the dash and gap lengths of IsDashed=True are not bound to any variable in Figma. The Figma render shows about 4 on and 4 off. The build uses the browser's native `dashed` style, so the dash rhythm differs slightly from the Figma render. This is a gap in the design, not a fault in the build. To close it, the design team would add dash/gap tokens in Figma.

## Findings
None.

## Screenshots (`reports/Divider/`)
- `Divider-staging-solid.png`: IsDashed=False on staging
- `Divider-staging-dashed.png`: IsDashed=True on staging
- `Divider-figma-17-3671.png`: Figma render of both variants
