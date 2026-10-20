# Detail Row QA report (first test)

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (real Storybook; index.json lists Components/DetailRow with 4 stories).
Figma: MWuaFZQ58G4WvtbCyeaE1X, node 554:25 (read-only use_figma, bindings read per node).
Fonts: Karla loaded (canvas width 168.56 vs bogus family 158.60).

## Matrix (grouped per Platform, Decision 7)
| Row | Cases covered | Verdict | Record |
|---|---|---|---|
| Detail Row · Mobile | divider on, off | Passed | rec4FMZVWjke19A7D |
| Detail Row · Website | divider on, off | Passed | recBwrePs515yt7n6 |

## Measured (staging) vs Figma
- Root bg rgb(251,243,231) = color/bg/base. Label rgb(122,106,88) = color/text/secondary. Value rgb(74,60,49) = color/text/primary.
- Row padding-block: Mobile 12 (spacing/md), Website 16 (spacing/lg). space-between, centred.
- Karla 400 16px / 26px (typography/mobile and website Body).
- Divider: 1px solid rgb(205,187,159) = color/border/secondary.
- Sizes: Mobile 390x51 (50 without divider); Website 560x59 (58 without). Value x 284.2 / 454.2 vs 284 / 454 (sub-pixel).
- CSS (branch component/detail-row) contains no raw hex or px values; semantic tokens only.

## Design gaps (not defects)
- Figma root width (390 / 560) is fixed and unbound; code fills its container (inline-size 100%).
- Figma dividers are bare 1px frames; code reuses the Divider component (same token, same thickness).

## Notes
- Browser pane was repeatedly navigated by other agents; measurements were re-run in single calls after URL checks.
- Screenshots taken with headless Chrome against the staging URLs: reports/DetailRow/*.png. Not attached to rows (all Passed, no failure evidence required).

## Verdict
2 of 2 Passed. Development expected: To be deployed.
