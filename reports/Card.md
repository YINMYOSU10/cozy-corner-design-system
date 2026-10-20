# QA report: Card

- Run: 2026-10-20, first test. Components row recudOifnChtGRzXV, Development = Ready for Testing.
- Tested: the staging Storybook URL (index.json lists components-card Docs plus 10 stories). Not a local build.
- Figma: Card component set 381:1660 (file MWuaFZQ58G4WvtbCyeaE1X); subparts Card/item/container 366:1973, Card/item/text 366:1953. Bindings read live with read-only use_figma.
- I did not build this component and changed nothing in src/.

## Verdict
Matrix 10 cases, grouped per Decision 7 into 4 rows · Passed 2 rows (8 cases) · Failed 2 rows (2 cases). Development should move to To be fixed.

| Row | Record | Cases | Result |
|---|---|---|---|
| Card · Default · idle | recr9T4O2NattzH1Z | Dashboard Up / None / Down, Mobile, Website | Passed |
| Card · Default · hovered | recL1QY2lUron835D | Dashboard, Mobile, Website | Passed |
| Card · Clue · idle | recxiGjQ0VEM6aANU | Dashboard Clue | Failed |
| Card · Clue · hovered | recF0IlbMeWjlYlWk | Dashboard Clue Hover | Failed |

## Matrix (from Figma) vs stories
Figma: 4 Card variants (Dashboard/Default 381:1648 275x146, Mobile/Default 381:1661 390x177, Website/Default 381:1691 567x180, Dashboard/Clue 492:476 374x172) x container State Default/Hover, plus text Trend Up/None/Down on ReportText. All 10 cases have a story; no extra stories. Card is non-interactive (no focus, disabled or loading state in Figma), so hover is the only state to drive.

## Fonts
Measured on canvas against a bogus family: Inter 600 302.1 vs 275.6, Fraunces 600 381.0 vs 344.5, Karla 400 283.5 vs 261.3. All three loaded.

## Measurements
| Case | Figma | Staging | Result |
|---|---|---|---|
| Dashboard Default (Trend Up) | fill color/bg/surfacePrimary, radius borderRadius/md, pad spacing/lg x spacing/xl, gap spacing/sm, elevation/level1; Label Inter 400 16/22 text/primary, Value Inter 600 28/34 text/bold, Trend Inter 500 16/22 text/positive; group gap spacing/sm, text gap spacing/md | 196.76x130, bg #fffdf9, radius 16, pad 16 20, gap 8, shadow level1 pair; Label 16/22 #4a3c31, Value 600 28/34 #2b211b, Trend 500 16/22 #2f5a3e; gaps 8 / 12 | Pass (size: design gap) |
| Dashboard Trend None | Trend color/text/secondary | #7a6a58 (rgb 122,106,88) | Pass |
| Dashboard Trend Down | Trend color/text/negative | #7e271d (rgb 126,39,29) | Pass |
| Mobile Default | 390 wide; text gap spacing/lg, group spacing/base; Title Fraunces 600 20/26 text/bold, Author Karla 14/22 text/secondary, Description Karla 16/26 text/primary | 390x152; gaps 16 / 4; Title 600 20/26 Fraunces #2b211b, Author 14/22 Karla #7a6a58, Description 16/26 Karla #4a3c31; left aligned | Pass (height: design gap) |
| Website Default | 567 wide, centred; text gap spacing/xxl; Title Fraunces 600 24/32; Author and Description Karla 16/26 | 567x170, centred; gap 24 / 4; Title 600 24/32; Author and Description 16/26 | Pass (height and wrap: design gap) |
| Dashboard / Mobile / Website Hover | elevation/level2 (0 4 12 0 @.10, 0 2 4 0 @.06) | exactly that pair on all three pinned stories; a real pointer hover on Website Default (data-state still Default) computed the same | Pass |
| Clue Default | 374x172; stroke color/border/secondary, borderWidth/1 (bound on the Card instance), inside, strokesIncludedInLayout = true, so content inset = spacing/xl + 1 = 21; text 332x130; no shadow | 374x170; inset 0 0 0 1px #cdbb9f box-shadow, padding 20, text 334x130 | **Fail** |
| Clue Hover | as above + elevation/level2 | level2 pair correct (pinned and real pointer hover); box 374x170, inset 20 | **Fail** |

Clue inner parts matched: Twine 334x2 #cdbb9f; Moods gap 8 with three Tag Small (bg #f3f4f6, pad 0 8, radius 1000); Clue Fraunces 600 20/26 #2b211b (2 lines, same break as Figma); Caption Inter 12/16 #7a6a58.

## Findings
```
Card / Clue · idle
Expected  1px color/border/secondary stroke takes layout space (Figma strokesIncludedInLayout): card 374x172, content inset 21, text column 332
Saw       stroke drawn as box-shadow inset 0 0 0 var(--borderwidth-1): card 374x170, inset 20, text column 334
Where     Card.css, .cc-card-container[data-type='clue']
Fix       border: var(--borderwidth-1) solid var(--color-border-secondary); remove the inset ring from box-shadow
```
```
Card / Clue · hovered
Expected  same stroke-in-layout geometry (374x172) + elevation/level2
Saw       level2 correct, geometry 374x170 as above
Where     Card.css, .cc-card-container[data-type='clue']:hover / [data-state='Hover']
Fix       same border fix; hover box-shadow keeps only the two level2 shadows
```

## The Engineer's reported gaps, judged against Figma
- **Raw #FFFFFF variant-frame fill: not confirmed.** All four variant frames are bound to color/bg/surfacePrimary (#fffdf9), not raw white. The Figma render shows no square fill behind the rounded container, so not drawing it is fine; the claim in the story header is wrong and should be corrected there.
- **Fixed sizes: confirmed as design gaps.** Dashboard container HUG x FIXED 146 with text FIXED 235; Mobile 390x177 FIXED with slot 358 FIXED inside a 350 content box (overflows its own padding); Website 567x180 with group 335 and description 386 FIXED; Clue 374 wide. No size tokens exist in build/tokens/css, so code cannot reproduce them without raw px. Effects on staging: Dashboard 196.76x130 vs 275x146; Mobile 152 vs 177 tall; Website 170 vs 180 tall and the description breaks after "each" instead of after "two people".
- **Clue 1px stroke unbound: not confirmed.** The stroke weight is bound to borderWidth/1 on the Card instance (unbound only on the bare container main component). The code's token choice is right; the failure is how it is drawn (see Findings).
- **Twine 2px unbound: confirmed** design gap; built with borderWidth/2, which is a reasonable stand-in.
- Further gaps found: Left-aligned Book Card Hover is 398 wide vs 390 Default; Tag label and Caption letter-spacing 0.32px is raw and unbound (explains Tag widths 86.39 / 90.74 / 47.09 vs 90 / 94 / 49, and Caption 126.73 vs 134; same as the Tag report).

## Tokens in source
Card.css uses var(--...) semantic tokens only; no raw hex, px or font values. The story decorator carries the 390/567/374 max-widths (story file, not component).

## Screenshots (reports/Card/)
Card-figma-381-1660.png (Figma render, all four variants), Card-dashboard-trend-down.png, Card-dashboard-trend-none.png, Card-dashboard-default-hover.png, Card-mobile-default.jpg, Card-mobile-default-hover.png, Card-website-default.png, Card-website-default-hover.png, Card-website-real-pointer-hover.png, Card-dashboard-clue.png, Card-dashboard-clue-hover.png. Airtable Attachment not written: the connector cannot upload local files; paths are in each row's Context.

---

# Re-test 2026-10-20 (Development = Fixed; PR #45 Clue border, PR #46 Clue resting shadow)

Tested the staging URL (iframe.html per story), own browser tab. Fonts re-confirmed loaded in the story document (canvas vs bogus family: Inter 355.7 vs 318.9, Fraunces 350.8 vs 318.9, Karla 334.8 vs 301.1).
Figma re-read live (read-only use_figma): Clue 492:476 is 374x172; container 492:477 374x172, padding 20 (token-bound), strokeWeight 1 with strokesIncludedInLayout = true, solid stroke bound, NO effects; CardSlot 332x130.

## Verdict
Re-test Passed 2 of 2 rows. No regressions in the 8 Default cases. Development should move to To be deployed.

| Row | Record | Result |
|---|---|---|
| Card · Clue · idle | recxiGjQ0VEM6aANU | Passed |
| Card · Clue · hovered | recF0IlbMeWjlYlWk | Passed |

## Clue measurements (staging)
| Case | Expected | Measured | Result |
|---|---|---|---|
| Clue idle | 374x172, 1px border/secondary, content inset 21, text 332x130, no shadow | 374x172; border 1px solid rgb(205,187,159) (#cdbb9f); padding 20; slot at x 21 / y 21, 332x130; box-shadow none; radius 16 | Pass |
| Clue hover (pinned story) | same geometry + level2 only | 374x172, same border and inset, box-shadow exactly 0 4 12 @.10 + 0 2 4 @.06, nothing else | Pass |
| Clue real pointer hover on idle story | level2 on :hover | :hover true, same level2 pair, still 374x172 | Pass |
Inner parts unchanged and still matching: Twine 332x2, Moods row, Tag widths 86.4 / 90.7 / 47.1 (known unbound letter-spacing gap), Clue text 332x52, 2 lines.

## Regression spot-check, 8 Default cases (computed style)
| Story | Size | Border | Shadow | Result |
|---|---|---|---|---|
| dashboard-default / trend-down / trend-none | 196.76x130, pad 16 20 | none | level1 pair (.08 0 1 3, .06 0 1 2) | Pass (size is the known design gap) |
| dashboard-default-hover | 196.76x130 | none | level2 pair | Pass |
| mobile-default / hover | 390x152 | none | level1 / level2 | Pass |
| website-default / hover | 567x170 | none | level1 / level2 | Pass |
Radius 16 and bg #fffdf9 unchanged on all. No Default case picked up a border or a Clue-only style.

## Screenshots added (reports/Card/)
Card-retest-dashboard-clue.jpg (idle), Card-retest-dashboard-clue-real-hover.jpg (real pointer hover). Airtable Attachment not written (connector cannot upload local files).
