# QA report: Status Bar

- Run: 2026-10-19, first test. Components row `reczgiUB78zbMCet4`, Development read `Ready for Testing`.
- Tested build: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (staging, branch head d32ca48). Real Storybook: `index.json` lists Docs, light, dark, custom-time, swapped-indicators. I tested the deployed URL, not a local build. I changed nothing in `src/`.
- Figma: file MWuaFZQ58G4WvtbCyeaE1X, set 525:49. Bindings read directly with read-only `use_figma`, not from screenshots.

## Matrix (from Figma)
Mode=Light 525:3 and Mode=Dark 525:26, each 430x44. Props time, signal, wifi, battery covered by the two prop stories. Every Figma case has a story; no extra stories.

## Figma bindings
- Light: fill color/bg/base; padding L/R spacing/xl (20), T/B 0; space-between, centred; Time text color/text/bold, style Label large (Inter Medium 16, line height 26); Indicators frame 66x22, gap 0; Signal, Wifi, Battery 22x22; glyph fills/strokes color/text/bold.
- Dark: fill color/bg/inverse; Time and glyphs color/text/inverse.

## Measurements (staging)
| Case | Story | Bar | Bg | Padding | Time | Indicators | Glyph paint | Result |
|---|---|---|---|---|---|---|---|---|
| Light | components-statusbar--light | 430x44 | rgb(251,243,231) = bg/base | 20/20 = spacing/xl | Inter 500 16px, lh 26, rgb(43,33,27) = text/bold | 22x22 at x 344/366/388, gap 0 | rgb(43,33,27) fill and stroke | Pass |
| Dark | components-statusbar--dark | 430x44 | rgb(43,33,27) = bg/inverse | 20/20 | same type, rgb(255,253,249) = text/inverse | same | rgb(255,253,249) | Pass |
| Props | custom-time, swapped-indicators | 430x44 | bg/base | 20/20 | "12:30", same style and colour | 22x22; swapped battery fills slot at x 388 | text/bold | Pass |

Fonts: Inter confirmed loaded (canvas width 31.66 in Inter vs 28.45 in a bogus family; `document.fonts` lists Inter as loaded). Time text width 31.66 vs Figma 33: sub-pixel renderer drift, not a defect. Source CSS uses only `var(--...)` tokens (no raw hex/px apart from the documented sizer geometry comment).

## Design gaps (not defects)
- Bar height 44 and indicator size 22 are unbound in Figma (carried as sizer-SVG geometry); width 430 carried as 100%.
- Glyph vectors are bound to color/text/* rather than color/icon/*.
- The bar is `aria-hidden` as decorative chrome. Not interactive, so no state or focus testing applies.

## Verdict
3 rows written, all Passed. Screenshots in `reports/StatusBar/`.

| Row | Record | Result |
|---|---|---|
| Status Bar · Light | recHeE4uNBi7XnxPx | Passed |
| Status Bar · Dark | rec3ybPIyTlcl6gIL | Passed |
| Status Bar · Props | reczX7H64yWXiiafX | Passed |
