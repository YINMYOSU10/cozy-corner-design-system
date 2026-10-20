# Footer QA report (RE-TEST, 2026-10-20)

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (live build after PR #38). Fonts loaded (canvas Karla 149.6 vs bogus family 143.0). Figma 500:261 re-read read-only incl. all SLOT children.

| Row | Before | Now | Record |
|---|---|---|---|
| Footer · Website | Failed | Passed | recQIN7nUMXlwxZRm |
| Footer · Mobile | Failed | Passed | recG1rUgC1ONtxRPE |
| Footer · Column | Passed | Passed (unchanged, no regression) | recs4QJeFJbfkeedm |
| Footer · Links and logo | Passed | Passed (unchanged) | recUEEuQMwdaXMtE6 |

Measured (1440 / 390):
- VISIT US now holds `<ul>` with two plain `<li>` (no links): "14 Mercer Lane" 92.6x22, "Tue-Sun, 10am-7pm" 128.2x22 (Figma 93 / 129), Karla 14/22, color-text-secondary (#7a6a58), list gap 12px (spacing-md), list-style none.
- Website columns 230x136 / 230x102 / 334x102 (Figma 136/102/102); footer 1440x216; with copyright 1440x262. No horizontal scroll.
- Mobile 390x576 (390x618 with copyright); columns 136/102/102; section gap 32. Figma 589: remaining 13px is the known Logo-box design gap (Figma fixed 185x45 box, built Logo hugs 32px) - gap, not a defect.
- EXPLORE (Home, Blind Date, Browse; Inter 14/22 color-text-brand links) and SHOP (About, Visit) unchanged and match Figma 500:124 / 500:145.

Screenshots: reports/Footer/retest-website.jpg, retest-website-with-copyright.jpg, retest-mobile.jpg, retest-mobile-with-copyright.jpg

Verdict: all 4 rows Passed. Development expected -> To be deployed.

---

# Footer QA report (first test)

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (verified real Storybook, index.json lists components-footer--* and components-footer-column--default)
Figma: MWuaFZQ58G4WvtbCyeaE1X, node 500:261 (Website 500:105, Mobile 500:183, Column 500:96). Bindings read with read-only use_figma.
Fonts: loaded (canvas width in Karla 187.4 / Inter 201.3 vs bogus family 176.8).

## Matrix (4 rows, grouped per Decision 7)
| Row | Verdict | Record |
|---|---|---|
| Footer · Website (copyright on/off, 1440) | Failed | recQIN7nUMXlwxZRm |
| Footer · Mobile (copyright on/off, 390) | Failed | recG1rUgC1ONtxRPE |
| Footer · Column | Passed | recs4QJeFJbfkeedm |
| Footer · Links and logo | Passed | recUEEuQMwdaXMtE6 |

## Findings
```
Footer / Website and Mobile · VISIT US column
Expected  Items slot holds two text items "14 Mercer Lane" and "Tue–Sun, 10am–7pm"
          (Karla 14/22, color/text/secondary, typography/bodySmall, gap spacing/md); column 102 tall (Figma 500:163, 500:241)
Saw       heading only, no <ul>; column 22 tall. Mobile footer 390x496 vs Figma 390x589
Fix       add the two text items to the VISIT US column (color-text-secondary, typography-bodysmall-*)
```
Mobile height gap 93px = 80 (missing items) + 13 (Logo box, see gap 1).

## Passes (measured at 1440 / 390)
- Footer bg --color-bg-base; Website padding spacing-5xl / spacing-jumbo, 1440x216; brand 470 gap spacing-xl; columns gap spacing-xxl; columns 230/230/334 x 136/102.
- Mobile padding spacing-3xl / spacing-xl / spacing-xl, content gap spacing-3xl, no horizontal scroll.
- Tagline Karla 16/26 color-text-secondary; copyright (small, Karla 14/22, color-text-secondary, padding 0 jumbo xxl, gap lg) renders only in the with-copyright stories (Website 1440x262).
- Column: gap spacing-xxl, items gap spacing-md, heading Inter 500 14/22 color-text-brand.
- Semantics: <footer>, three <nav aria-labelledby=heading>, <ul>/<li>; Tab reaches Home with :focus-visible 2px outline; Logo/Link are built components.
- No raw hex/px/font in the footer CSS; every value is var(--token).

## Gaps (not defects)
1. Figma Logo Platform=Dashboard is a fixed 185x45 box around 154x32 content; the built Logo hugs 153.5x32 (same in Logo's own story). Contributes 13px to the Mobile height.
2. Website brand 470, columns 842, column widths unbound in Figma (carried as flex ratios).
3. Tagline 320 width carried as max-width 20em; Mobile Figma tagline fills 350. Tagline nodes bind primitive font variables, not typography/body (same values).
4. Logo uses Platform=Dashboard on both platforms (code follows Figma). Hidden Figma Bottom frame reads 25 tall (stale hidden state); rendered 46 incl. padding.
5. Link hover/visited/disabled not re-run here; covered by Link's own rows.

## Screenshots
reports/Footer/website.jpg, website-with-copyright.jpg, mobile.jpg, column.jpg, website-link-focus.jpg (attachments not uploaded to Airtable; paths in Context).

## Verdict
2 Failed, 2 Passed. Development expected -> To be fixed.
