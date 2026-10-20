# QA report: Progress Loading / Mobile
Date 2026-10-20. Staging https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (PR #56 f871bad + PR #60 4c11e92). Figma file MWuaFZQ58G4WvtbCyeaE1X, set 215:983 (frame named "Progress Loading / App"; registry name "Mobile").

## Matrix (from Figma, 5 variants, all 160x160; all 5 have a story, no extras)
| Step | Node | Figma render | Staging (DOM + render) | Result |
|---|---|---|---|---|
| 1 | 215:979 | cover only, ring hidden | cover 81.43 wide, left-half ring (3.4..79.71) fully behind it, nothing else visible | pass |
| 2 | 215:980 | cover + right half ring | cover + right half ring | pass |
| 3 | 215:982 | right half ring | right half ring | pass |
| 4 | 215:981 | full ring | full ring | pass |
| 5 | 215:978 | green full ring + check | green full ring + check | pass |

## Checks
- Mirrored half-ring bug (found in Website sibling) is fixed: base path is the left half, rotate 179.9 (step 2) / 180 (step 3) gives the right half, matching Figma's arcs (270 to 90, inner 0.95).
- Tokens (computed): ring rgb(193,99,61) color-bg-primary-idle steps 1-4; rgb(63,126,85) color-bg-positive-idle step 5; cover rgb(251,243,231) color-bg-base; check rgb(53,104,74) color-icon-positive. Match Figma bindings read live.
- Check measured 66.30 x 44.20 (Figma vector 66.3 x 44.2), at x 29.71, box 101.03; effective stroke 6.31 (Figma 6.314). Check imported from Icon.
- A11y: role=progressbar, aria-valuemin 1, max 5, valuenow 1-5, label "Step n of 5".
- CSS (read from origin/staging): no raw hex or px, only var(--color-*) tokens.
- Fonts: component renders no text; not applicable.

## Design gaps / notes (not logged against the Engineer)
- 160 frame, ring geometry, arc radius and Check size 101.03 are unbound in Figma; SVG geometry numbers carried in TSX. Design gap.
- Step 1/2 cover rect overflows the frame (162.86 tall) and is clipped; copied from Figma. Cover height 163 vs 162.86 is a rounding, invisible. Design quirk.
- Figma Step 1/3 and 2 contain two arc nodes (BottomCircle/TopCircle) at the same rotation; staging draws one, visually identical. Not a defect.
- Smart Animate between steps is prototype-only; numeric `step` prop vs Figma `Step`: API difference, noted.
- Frame name "Progress Loading / App" vs registry "Mobile": see docs/naming-suggestions.md.

## Screenshots
reports/ProgressLoadingMobile/step-1..5-staging.jpg, figma-all-steps.png

## Verdict
Passed 3 rows (Steps 1-3, Step 4, Step 5), Failed 0. Development expected: To be deployed.
