# Breadcrumb re-test (after PR #37, staging daf5bf4 or newer)

Verdict: all 7 rows Passed. Development should read To be deployed.

| Case | Row | Verdict |
|---|---|---|
| Link Focused | recvwNaO86vDkPtZy | Fixed (To re-test) -> Passed |
| Link Default | recH4CvRy9q6wkg1u | Passed (30px, text/gray/default rgb(74,85,101)) |
| Link Hover | recuaTe6qmzUSiBzB | Passed (31px, text/gray/bold rgb(30,41,57), 1px underline span) |
| Levels 2 / 3 / 4 | recr4pL7i3ep23Ldz / recViQNikB2DlNf2J / rectt1LFHol4p1Ms8 | Passed (Levels 4 content 349.91px, links 30px) |
| Current and separator | recRtkqaKhOmFLOZ1 | Passed (current 30px, rgb(30,41,57)) |

Focused evidence (fonts loaded: canvas 82.52 vs bogus 69.31):
- Figma 431:23 read via use_figma: strokeAlign OUTSIDE, strokeWeight 2, bound to color/border/focus, height 30.
- Pinned Focused story: box-shadow rgb(193,99,61) 0 0 0 2px (no inset), height 30, outline none.
- Real Tab on Levels 3: Dashboard :focus-visible true, same box-shadow, height 30, nav height 30, overflow visible on nav and ol so the ring is not clipped. Screenshot: reports/Breadcrumb/link-focused-retest-real-tab.png
- Note: the first Tab landed on body (page not yet focused); the second reached the link.

Original first-test report follows.

# Breadcrumb QA report (first test)

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (real Storybook, 9 breadcrumb stories in index.json)
Figma: MWuaFZQ58G4WvtbCyeaE1X node 431:68 (431:26 link, 431:27 current, 430:15 separator). Bindings read via use_figma, not screenshots.
Fonts: Inter confirmed loaded (canvas 'Dashboard' 82.52 vs bogus family 69.31).

| Case | Row | Verdict |
|---|---|---|
| Levels 2 | recr4pL7i3ep23Ldz | Passed (193.85 vs 195) |
| Levels 3 | recViQNikB2DlNf2J | Passed (269.9 x 30 vs 270 x 30) |
| Levels 4 | rectt1LFHol4p1Ms8 | Passed (349.91 vs 352) |
| Link Default | recH4CvRy9q6wkg1u | Passed |
| Link Hover | recuaTe6qmzUSiBzB | Passed (31px, underline 1px, real pointer) |
| Link Focused | recvwNaO86vDkPtZy | Failed |
| Current and separator | recRtkqaKhOmFLOZ1 | Passed |

## Finding
Breadcrumb / Link / Focused
Expected  2px ring in color/border/focus, strokeAlign OUTSIDE (Figma 431:23)
Saw       box-shadow: inset 0 0 0 var(--borderwidth-2) var(--color-border-focus) (inside)
Where     Breadcrumb.css, .cc-breadcrumb-link:focus-visible / [data-state='Focused']
Fix       box-shadow: 0 0 0 var(--borderwidth-2) var(--color-border-focus). Low severity; token, width and real Tab :focus-visible are correct.

## Notes and gaps (not failures)
- Figma Hover link is 31px vs 30 (underline in flow); code follows Figma, hovered link shifts 1px.
- No Visited state defined. Levels=4 has no extra link variant.
- Standalone link stories stretch to container width (display:flex); inside the nav items hug (90.52px).
- Tokens only in Breadcrumb.css (no raw hex/px). Source read from branch commit 7fa721a; src/ not touched.
- Width drift of 0.5 to 2px across rows is text rasterisation.
- Screenshots: reports/Breadcrumb/ (4 files; no per-state shots for Levels 2/4 or current; Attachment column not written because local files cannot be uploaded through the connector).
