# Progress Bar — QA report (first test)

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (index.json confirmed real Storybook, 8 stories + docs)
Figma: MWuaFZQ58G4WvtbCyeaE1X node 416:46 (segment set 416:5), bindings read via use_figma.
Fonts: Karla loaded (canvas width 119.76 vs 108.11 bogus family) before widths were measured.

## Matrix (7 rows, 8 stories) — all Passed
| Case | Figma | Result |
|---|---|---|
| Step 1..5 | 416:6/14/22/30/38, 390x34, gap spacing/sm, label bodySmall + twoTone/gold/foreground, track gap spacing/base, segments 74.8x4 radius circle, segments 1..N bg/primary/idle else bg/primary/light | Passed (measured 390x34, gap 8, label 14px/22px Karla rgb(143,104,34), track gap 4, segments 74.8x4, 1000px radius, fills #c1633d / #f6ddd1) |
| Label hidden | boolean prop, no Figma variant | Passed (label absent, root 390x4, role=progressbar + aria-label kept) |
| Segment Filled=True/False | 416:3 / 416:4, 40x4 | Passed (40x4, circle radius, aria-hidden) |

CSS uses only var(--spacing-*), var(--color-*), var(--typography-bodysmall-*), var(--borderradius-circle); no raw values.
Accessibility: role=progressbar, aria-valuemin=1, aria-valuemax=5, aria-valuenow=N, aria-valuetext, aria-label "Step N of 5"; segments aria-hidden.
Not interactive; no disabled/focus/hover states to drive.

## Design gaps (not engineering defects)
1. Segment height 4 is unbound in Figma; code takes required `segmentHeight` prop (`--cc-progress-bar-segment-height`).
2. Figma label text in Step=2..5 reads "Step 1 of 5" (copy slip). Code/stories read "Step N of 5".
3. Segment widths measure 74.797/74.805 (flex 1) vs Figma 74.8: sub-pixel, not a finding.

## Verdict
7 rows, 7 Passed, 0 Failed. Screenshots: reports/ProgressBar/ProgressBar-<story>.png
