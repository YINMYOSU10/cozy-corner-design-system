# QA report: Badge

- **Run:** 2026-10-20, first test. Components row `recotwNOqXxoghTc2`, Development was `Ready for Testing`.
- **Tested build:** https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (deployed, not local). `/index.json` parsed as a real Storybook index; Badge has Docs + 6 stories (`components-badge--warning|positive|negative|info|update|neutral`).
- **Figma:** file `MWuaFZQ58G4WvtbCyeaE1X`, node 385:14. Bindings read directly with read-only `use_figma` (per-node fills, padding, radius, text style), confirmed with `get_variable_defs`.
- **Tester:** QA agent, did not build this. Nothing changed in `src/`.

## Verdict
Matrix 6 cases, Passed 6, Failed 0. Rows written 6.

## Fonts
Inter 500 reported loaded in the story iframe; canvas width of "Badge" at 14px Inter 42.69 vs 35.77 in a bogus family, so the font is really loaded and widths are trustworthy.

## Expected (all 6 Types, from Figma)
Horizontal auto-layout, 67x30; padding spacing/base (4) x spacing/md (12); radius borderRadius/circle (1000); no stroke; text "Badge", style typography/label = Inter Medium 14/22, letter spacing 0.

| Type | Figma node | Row | Record | Bg token | Text token | Measured (story) | Result |
|---|---|---|---|---|---|---|---|
| Warning | 385:6 | Badge · Warning | recRZGVFOIVTuOXYp | color/bg/warning/light #f6e7bf | color/text/warning #684b19 | 66.7x30, rgb(246,231,191), rgb(104,75,25) | Pass |
| Positive | 385:8 | Badge · Positive | recQtS4f1i5Ughvt0 | color/bg/positive/light #e4eee6 | color/text/positive #2f5a3e | 66.7x30, rgb(228,238,230), rgb(47,90,62) | Pass |
| Negative | 385:10 | Badge · Negative | recVW7dSnzGiGGBEf | color/bg/negative/light #f8e1de | color/text/negative #7e271d | 66.7x30, rgb(248,225,222), rgb(126,39,29) | Pass |
| Info | 385:12 | Badge · Info | reccIygXvEooGi2pA | color/bg/info/light #dbeafe | color/text/info #193cb8 | 66.7x30, rgb(219,234,254), rgb(25,60,184) | Pass |
| Update | 386:9 | Badge · Update | reccndAc5m9bO9B39 | color/bg/update/light #f1e3ee | color/text/update #57284e | 66.7x30, rgb(241,227,238), rgb(87,40,78) | Pass |
| Neutral | 437:18 | Badge · Neutral | recZwBMEkzMwojbns | color/bg/gray/light #f3f4f6 | color/text/gray/default #4a5565 | 66.7x30, rgb(243,244,246), rgb(74,85,101) | Pass |

All six: padding 4px 12px, radius 1000px, font Inter 500 14px/22px, no border, label "Badge" renders, `data-type` matches. Width 66.7 vs 67 is sub-pixel renderer drift (identical on every case, not a finding). Size = null, State = idle (not interactive, no variants beyond Type).

Source (`origin/staging` Badge.css) uses only tokens: --spacing-base, --spacing-md, --borderradius-circle, --typography-label-*, --color-bg-*-light, --color-text-*. No raw hex/px/font values.

## Design gaps (not engineering defects)
1. `get_variable_defs` on 385:14 also lists spacing/3xl (32) and spacing/5xl (40); no visible layer binds them (stray or hidden bindings in the frame).
2. Neutral uses "gray" naming (color/bg/gray/light, color/text/gray/default) while the others use color/{bg,text}/<type>. The build follows Figma.

## Screenshots
`reports/Badge/Badge-staging-<type>.png` (6) and `reports/Badge/Badge-figma-385-14.png`. No failures, so no failure screenshots.
