# Top Bar QA report (first test)

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (PR #51, 38e4d46). Stories components-top-bar--default / without-search / without-avatar / breadcrumb-only (+ docs).
Figma: MWuaFZQ58G4WvtbCyeaE1X node 576:22718, read live via use_figma (bindings, props) and get_metadata. Fonts: Inter loaded (canvas 82.52 vs bogus 69.31).
Verdict: 2 Passed, 2 Failed. Development should read To be fixed.

| Case | Row | Verdict |
|---|---|---|
| Show search x Show avatar (4 stories) | recHnQNMDKlIrOiiw | Passed |
| Composition and tokens | recOMLHFzGoZnUiqg | Passed |
| Bar height | rec3YQ7WIsdLk7mDv | Failed |
| Bottom border weight | recT6N5KHLZFsJmpg | Failed |

## Findings
Top Bar / height
Expected  56 fixed in all combos (576:22718, FIXED/FIXED, height unbound in Figma)
Saw       39 (Default), 39 (WithoutAvatar), 32 (WithoutSearch), 30 (BreadcrumbOnly); bar hugs children and changes height when toggles flip
Where     TopBar.css .cc-top-bar (no height)
Fix       the Engineer already carries unbound dimensions as SVG sizers (search width 300); do the same for height 56. Design gap: Figma leaves it unbound. Judged a defect because the value is explicit in Figma and the toggles visibly resize the bar.

Top Bar / bottom border
Expected  1px inside stroke in color/border/secondary (strokeBottomWeight 1, NOT bound to borderWidth/05 as the build comment says)
Saw       box-shadow inset 0 -0.5px (--borderwidth-05)
Where     TopBar.css .cc-top-bar
Fix       use --borderwidth-1 (exists, 1px). Low severity.

## Checked and fine
- Padding 0 20 (spacing/xl, left/right bound); actions gap 12 (spacing/md); fill rgb(255,253,249) = color/bg/surfacePrimary; border colour rgb(205,187,159) = color/border/secondary.
- Breadcrumb Levels=2: 193.85x30. Figma 274 is because the instance overrides Level 1 label to "Blind date with a book" and current to "Matches"; story uses default labels. Not a defect.
- Search wrapper 300 wide (matches), placeholder "Search orders, readers or books", leading icon on, label/helper hidden. Inner box 39 tall vs 36 Figma = Fields' known sizing gap, not failed here.
- Avatar 32x32 Initials "SU", bg rgb(246,221,209) (color/bg/primary/light).
- Toggles: without-search / without-avatar / breadcrumb-only remove only the matching child.
- Real Tab: reaches Dashboard link then search input (:focus-visible true). No states of its own.
- Tokens: no raw hex/px in TopBar.css apart from the intentional 300 sizer (unbound design gap).

## Notes
- Staging Storybook cell holds the site root, not a story URL; consider pointing it at ?path=/docs/components-top-bar--docs (Engineer's column, not written).
- Screenshots: reports/TopBar/ (default, without-search, without-avatar, breadcrumb-only, figma-576-22718). Attachment column not written (local files cannot be uploaded through the connector).
- src/components/ untouched.

---

# Re-test 2026-10-20 (PR #53, 11b9682)

Staging measured live (getBoundingClientRect / getComputedStyle), Inter loaded (canvas 117.07 vs bogus 99.25). Figma 576:22718 re-read via use_figma: 1203x56 FIXED/FIXED, strokeBottomWeight 1 INSIDE, color/border/secondary, padding L/R 20.
Verdict: 4 Passed, 0 Failed. Development should read To be deployed.

| Row | Result |
|---|---|
| Bar height (rec3YQ7WIsdLk7mDv) | Passed: 56 in Default, WithoutSearch, WithoutAvatar, BreadcrumbOnly (was 39/32/39/30) |
| Bottom border weight (recT6N5KHLZFsJmpg) | Passed: inset 0 -1px rgb(205,187,159) in all 4 (was -0.5px) |
| Show search x Show avatar (regression) | Passed: 4 stories exist and render; toggles remove only their child |
| Composition and tokens (regression) | Passed |

Regression details
- Centring: breadcrumb 193.85x30 at y13 (13/13); search wrapper 300 at y8.5 (39 tall, 8.5/8.5); avatar 32x32 at y12 (12/12); BreadcrumbOnly actions 0x0.
- Layout: breadcrumb at x20; actions right-aligned (Default actions 344 = 300 + 12 gap + 32, x660, ends at 1004 = 1024-20). Padding 0 20, fill rgb(255,253,249), avatar 32x32.
- Tab order: breadcrumb link, then search input, both :focus-visible.
- Screenshots: reports/TopBar/retest-*.jpg (default, without-search, without-avatar, breadcrumb-only).
- src/components/ untouched; nothing committed.

---

# Re-test 2026-10-20 (PR #53, 11b9682)

Staging measured live (getBoundingClientRect / getComputedStyle), Inter loaded (canvas 117.07 vs bogus 99.25). Figma 576:22718 re-read via use_figma: 1203x56 FIXED/FIXED, strokeBottomWeight 1 INSIDE, color/border/secondary, padding L/R 20.
Verdict: 4 Passed, 0 Failed. Development should read To be deployed.

| Row | Result |
|---|---|
| Bar height (rec3YQ7WIsdLk7mDv) | Passed: 56 in Default, WithoutSearch, WithoutAvatar, BreadcrumbOnly (was 39/32/39/30) |
| Bottom border weight (recT6N5KHLZFsJmpg) | Passed: inset 0 -1px rgb(205,187,159) in all 4 (was -0.5px) |
| Show search x Show avatar (regression) | Passed: 4 stories render; toggles remove only their child |
| Composition and tokens (regression) | Passed |

Regression details
- Centring: breadcrumb 193.85x30 at y13 (13/13); search wrapper 300 at y8.5 (39 tall, 8.5/8.5); avatar 32x32 at y12 (12/12); BreadcrumbOnly actions 0x0.
- Layout: breadcrumb at x20; actions right-aligned (Default actions 344 = 300 + 12 gap + 32, ends at 1004 = 1024-20). Padding 0 20, fill rgb(255,253,249), avatar 32x32.
- Tab order: breadcrumb link, then search input, both :focus-visible.
- Screenshots: reports/TopBar/retest-*.jpg (default, without-search, without-avatar, breadcrumb-only).
- src/components/ untouched; nothing committed.
