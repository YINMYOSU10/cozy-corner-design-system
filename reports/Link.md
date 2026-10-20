# Link QA report

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (real Storybook, 16 matrix stories plus Playground, IconOptions, Interactive; staging head fee6b88 has src/components/Link). Figma 33:382, file MWuaFZQ58G4WvtbCyeaE1X.

Fonts: Inter loaded (canvas 27.69px vs bogus family 26.44px). Widths: L 27.7 / S 25.0 (Figma 28 / 25), With icon 67.7 / 61.0 (Figma 68 / 61): sub-pixel renderer drift only.

## Matrix (8 rows, each covers S and L) - all Passed
| Row | Record | Verdict |
|---|---|---|
| Link · Link · Default | recAIkwHw032ZWhdp | Passed |
| Link · Link · Hover | recoeEzIwBR0LuWQT | Passed |
| Link · Link · Visited | recIn1P0c1mx0bB25 | Passed |
| Link · Link · Disable | recDpMNHTQlCSzBN0 | Passed |
| Link · With icon · Default | recVbOJ5MbeXaev7W | Passed |
| Link · With icon · Hover | rec6RGSpVgdWtIJcm | Passed |
| Link · With icon · Visited | recxI8n3hNRy8HiGv | Passed |
| Link · With icon · Disable | recDm9uJ9rjY29M1v | Passed |

Bindings read from Figma (per-node): text Default brand, Hover primary, Visited secondary, Disable disabled; icon strokes the matching color/icon/*; heights L 22, S 18; itemSpacing 8; icon frames 12 (L) / 10 (S) on both ends. Measured: text rgb(131,64,38)/(74,60,49)/(122,106,88)/(168,150,125) = --color-text-brand/primary/secondary/disabled; icons (164,82,48) brand, then same as text = --color-icon-*. Gap 8px, underline, Inter 500 14/12px, line-height 22/18.

## Behaviour driven for real
- Tab: :focus-visible true, outline 2px solid rgb(193,99,61) = --color-border-focus, offset 2px.
- Enter fires click. Real pointer hover turns text and icons to rgb(74,60,49).
- Disable: href removed, aria-disabled=true, role=link, cursor not-allowed, click defaultPrevented, Tab skips it.
- Visited: pinned story matches; real :visited rule exists in CSS but browsers hide :visited colours from computed style, so it was read from source, not measured.

## Tokens
No raw hex or px in Link.css / Link.tsx (grep clean).

## Gaps (not failures)
- Figma has no Focus state; code uses the shared focus ring.
- Underline thickness/offset unbound in Figma.
- 10px icon has no size token and Icon has no 10 size (Link casts).
- Staging Testing `State` multi-select has no "visited" option, so Visited rows leave State empty (registry schema gap).

## Notes
- Screenshots (reports/Link/): 8 L-size state shots plus WithIcon-Focus-Hover-real.jpg. S size verified by measurement only; no separate S screenshots. No failures, so no failure screenshots.
- Airtable: Expected Results written to fldJj85SsSRNr0YiO, Context to fldegdzVzHKojIDGC (assumed from schema order; Suggestion field flda3SAcwhp0yQjys left empty).

Development after: To be deployed.
