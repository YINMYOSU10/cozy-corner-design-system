# QA report: Progress Loading / Website
Date 2026-10-20. Staging https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (PR #54, f755e29). Figma 173:4829, file MWuaFZQ58G4WvtbCyeaE1X.

## Matrix (from Figma, 5 variants, all 350x350; all 5 have a story, no extras)
| Step | Node | Figma render | Staging | Result |
|---|---|---|---|---|
| 1 | 173:4827 | cover only, ring invisible | right half ring beside cover | FAIL |
| 2 | 173:4825 | right half ring + cover | blank (sliver only) | FAIL |
| 3 | 173:4823 | right half ring | left half ring | FAIL |
| 4 | 173:4821 | full ring | full ring | pass |
| 5 | 173:4819 | green full ring + check | same | pass |

## Finding: half rings are mirrored (steps 1-3)
Figma's ellipse arc nodes (270 to 90, innerRadius 0.95) render as the LEFT half at rotation 0. Verified by Figma render of 173:4829 (reports/ProgressLoadingWebsite/figma-all-steps.png): Step 1 shows no ring, Step 2 (group rot -179.9) and Step 3 (rot 180) show the right half. Step 4 is BottomCircle rot 0 (left) + TopCircle rot 180 (right), so it is symmetric and hides the bug.
Staging `RIGHT_HALF` path in ProgressLoadingWebsite.tsx draws the right half at rotation 0, so every half-ring step is mirrored.
Suggested fix: make the base path the left half (sweep flag 0 from top to bottom); keep rotate(179.9) for Step 2 and rotate(180) for Step 3; Step 4/5 keep both halves.
Engineer's note that Step 2 "looks blank" is not what Figma shows: Figma Step 2 shows the right half ring. That is an engineer defect, not a design gap.

## Passing checks
- Tokens in staging CSS: ring color-bg-primary-idle (#c1633d) steps 1-4; color-bg-positive-idle (#3f7e55) step 5; cover color-bg-base (#fbf3e7); check color-icon-positive (#35684a). Match Figma bindings (bg/primary/idle, bg/positive/idle, bg/base, icon/positive).
- Geometry: ring 328 diameter at (11,11), inner 155.8 (0.95); check box 221 at (65,65), measured 145.03 x 96.68 at x 106.44 / y 127.16, same as Figma vector; effective stroke 13.81 (Figma 13.8125).
- Check is imported from Icon. Role progressbar, aria-valuemin 1, max 5, valuenow 1-5, label "Step n of 5".
- No raw hex in CSS; SVG geometry numbers are carried because Figma leaves them unbound (design gap, not a defect).
- Fonts: component renders no text; font loading not applicable.
- Smart Animate and the numeric vs string `step` and optional `label` prop: prototype/API differences, noted not failed.
- Staging story step-4 first load rendered blank once (slow load), fine on reload; treated as transient.

## Screenshots
reports/ProgressLoadingWebsite/step-1..5-staging.jpg, figma-all-steps.png

## Verdict
Passed 2 rows, Failed 1 row (Steps 1-3). Development expected: To be fixed.

---
# Re-test 2026-10-20 (PR #59, commit e9bd50d)
Woken by Development = Fixed. Row "Step=1, 2, 3 (half-ring placement)" was Fixed (To re-test). Figma render re-read: reports/ProgressLoadingWebsite/figma-all-steps-retest.png.

| Step | Figma | Staging (DOM + screenshot) | Result |
|---|---|---|---|
| 1 | cover only, no ring | base left-half path, no transform; cover rect 0-175 hides it; nothing visible | PASS |
| 2 | right half ring beside cover | rotate(179.9 175 175) + cover; right half ring beside cover | PASS |
| 3 | right half ring | rotate(180 175 175), no cover; right half ring | PASS |
| 4 | full ring | two ring paths (none + rotate 180), full ring, fill rgb(193,99,61) | PASS |
| 5 | green full ring + check | two ring paths, fill rgb(63,126,85), Icon check | PASS |

Regression: role=progressbar, aria-valuenow 1-5 (valuemin 1, valuemax 5, label "Step n of 5"); svg 350x350; ring fills match color-bg-primary-idle (#c1633d) steps 1-4 and color-bg-positive-idle (#3f7e55) step 5; cover color-bg-base (#fbf3e7). No regressions. Component renders no text, so font check not applicable.
Screenshots: step-1..5-retest.jpg, figma-all-steps-retest.png.
Verdict: all 3 rows Passed. Development expected: To be deployed.
