# QA report: Tag

- Run: 2026-10-19, first test. Components row recYIku74SGjMkvZd, Development = Ready for Testing.
- Tested: the staging Storybook URL (index.json lists components-tag Docs plus 7 stories). Not a local build.
- Figma: Tag component set 448:13 (file MWuaFZQ58G4WvtbCyeaE1X). Bindings read with read-only use_figma.
- I did not build this component and changed nothing in src/.

## Verdict
Matrix 3 cases (Decision 7 grouped) · Passed 3 · Failed 0. Development should move to To be deployed.

| Row | Record | Result |
|---|---|---|
| Tag · Small | recPBMps130qTPdNt | Passed |
| Tag · Medium | reca3M3jTgvKr0BjE | Passed |
| Tag · Remove button behaviour | reckgcspf9NMWinxZ | Passed |

## Fonts
Inter 600 canvas width 132.0 vs bogus family 116.6, so Inter is loaded.

## Matrix and measurements
| Case | Figma | Staging |
|---|---|---|
| Small, no remove | 45x24, pad 8, gap 4, radius circle, fill color/bg/gray/light, label 12/16 semibold color/text/gray/default | 43.94x24, pad 0 8, bg rgb(243,244,246), radius 1000, label Inter 12/600/16px rgb(74,85,101) |
| Small, remove | hidden by default in Figma | 59.94x24 = 8+27.94+4+12+8, button 12x12, icon #364153 |
| Medium, no remove | 57x32, pad 12, label 14/20 | 56.59x32, pad 0 12, label 14/600/20px |
| Medium, remove | hidden by default in Figma | 76.59x32 = 12+32.59+4+16+12, button 16x16 |

The width delta (-1.06 Small, -0.41 Medium) is the unapplied 0.32px Small letter-spacing plus text rasterisation; not a finding.

## Remove behaviour (driven for real)
- Real button, type=button, aria-label "Remove <label>".
- Real click, Enter and Space each removed a tag in the removable list.
- Real Tab: :focus-visible true, box-shadow 2px rgb(193,99,61) = color/border-focus + borderWidth/2.
- Disabled: disabled attribute, cursor not-allowed, icon rgb(168,150,125) = color/icon-disabled, real click fired no handler, Tab skipped it.

## Tokens in source
Tag.css uses var(--...) tokens only; no raw hex, px or font values.

## Design gaps (not failures)
- Small height 24 is unbound in Figma; carried as SVG sizer geometry.
- Small label letter-spacing 0.32px is raw and not applied.
- Remove icon box 12/16 is unbound.
- Figma Remove instances are hidden by default; the Small remove instance has no readable layers; Medium remove icon bound to color/icon/gray, code uses --color-icon-gray.
- Remove hover/pressed/focus/disabled are not designed; focus and disabled follow repo convention.

## Screenshots (reports/Tag/)
Tag-small-default.png, Tag-medium-default.png, Tag-small-remove.jpg, Tag-medium-remove-tab-focus.png, Tag-remove-disabled.png
