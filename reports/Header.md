# Header QA report (first test, 2026-10-20)

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (index.json lists components-header--website, --mobile and components-header-nav-item--website-default/-hover/-active, --mobile-default/-active)
Figma: MWuaFZQ58G4WvtbCyeaE1X, set 500:95 (Website 500:21 1440x98, Mobile 500:45 430x80); sub-component Header/item/nav-item 500:20 (Website Default 500:2 / Hover 500:4 / Active 500:6 at 110x50; Mobile Default 500:8 / Active 500:14 at 56x82). Bindings read live with a read-only use_figma walk of every node.
Fonts: loaded. Canvas width Inter 270.1 vs bogus 235.9; Fredoka 518 vs 493.3; Karla 182.2 vs 167.9 (measured on the Mobile story; on the Website story Karla is not used and is not requested).

## Matrix reconciliation
Figma has 2 Header variants and 5 nav-item variants. Each has exactly one story, and there are no extra stories.

## Rows (5, grouped per Decision 7)
| Row | Covers | Verdict | Record |
|---|---|---|---|
| Header · Website | Platform=Website | Passed | recBBbiAuIl8shlxW |
| Header · Mobile | Platform=Mobile | Passed | recKwAb7EvmQcWpi0 |
| Header/item/nav-item · Default | Website Default, Mobile Default | Passed | recF7URyAU96qAhJe |
| Header/item/nav-item · Hover | Website Hover (pinned and real pointer) | Passed | recmhSadXqGiCtral |
| Header/item/nav-item · Active | Website Active, Mobile Active | Passed | recGb6iiF3XAugek2 |

## Measurements (staging)
- **Website @1440:** `<header>` 1440x74, padding 12/64 (spacing-md / spacing-jumbo), bg --color-bg-base, space-between, centred. Logo is the imported Logo component (237.6x48). `<nav aria-label="Main">` 583.4x50, gap 16 (spacing-lg); Figma 587. Items 109.2 / 99.3 / 103.5 / 110 / 97.5 against Figma 110 / 100 / 104 / 111 / 98. That is a consistent ~0.7px of text-rendering drift, not a defect. No horizontal scroll.
- **Mobile @430:** 430x114, padding 8/8/24 (spacing-sm / spacing-xxl), bg --color-bg-base, inset top 0.5px (borderwidth-05) --color-border-neutral-light, no Logo. Nav 414 wide, space-between. Items 56x82 (Profile 56.5 against 57). Labels 37.3 / 30.9 / 32.8 / 28.8 / 40.5 against Figma 38 / 32 / 33 / 29 / 41.
- **Nav item Website:** padding 12/32, radius 1000px (borderradius-circle), Inter 500 16/26 (typography-labellarge-*).
  - Default: bg --color-bg-surfaceprimary, text --color-text-primary.
  - Hover: bg --color-bg-primary-light.
  - Active: bg --color-bg-primary-idle, text --color-text-inverse, aria-current=page.
- **Nav item Mobile:** padding 8, gap 4 (spacing-base), icon box 40x40 radius 8 (borderradius-sm), svg 24 with 1.5 stroke.
  - Default: stroke and label --color-text-secondary, Karla 400 14/22.
  - Active: box --color-bg-primary-idle, stroke --color-text-inverse, label Inter 500 14/22 --color-text-brand, aria-current=page.
- **Driven states:**
  - A real pointer hover on Home changed only Home to #f6ddd1, and it matches the pinned Hover story.
  - Pressing Tab focused the Home link, with :focus-visible true and a visible ring.
  - Mobile items have no hover style, as in Figma.
- **Tokens:** Header.css has no raw hex, px or font values. Every value is a var(--token) that exists in build/tokens/css/tokens.css.

## Findings
None.

## Engineer-reported gaps: my judgement against Figma
1. **Mobile label on primitive vars: confirmed gap.** The Mobile Default labels (500:13 and its instances) carry the text style `mobile/Body small`, but their properties bind core `fontSize/14`, `lineHeight/22`, `fontFamily/karla` and `fontWeight/regular` directly. The code uses `typography-bodysmall-*`, which resolves to the same Karla 400 14/22. This is not a defect.
2. **External "Color Tokens/Content/Dark/Primary" strokes: confirmed gap.** The cause is in the Icon library components themselves: Icon/Books 34:4333 binds 7 of its 8 vectors to that variable. Each Header instance overrides only one vector to color/text/secondary, so the Figma render of Shelf, Visit and Profile is partly black (see figma-mobile-500-45.png). The nav-item main component 500:8 binds color/text/secondary, which the code applies to every stroke.
3. **Mobile frame 80 against items 82 and code 114: confirmed gap.** Frame 500:45 is a fixed, unbound 80px high and slot 500:46 is a fixed 71px with clipping. The frame's own bound padding (8 + 24) plus the 82px items it holds add up to 114, and the Figma render clips the labels. The code follows the bound tokens. The designer should set the frame and slot to hug.
4. **No Focus state: confirmed gap.** Figma has no Focus variant. The links are keyboard-reachable and show the browser's default focus-visible ring. A designed focus ring is needed from design, so I did not write a row for it.
5. **40x40 icon box with no size token: confirmed gap.** The code builds it as the 24px glyph plus spacing-sm padding, which measures exactly 40x40.
6. **Logo 265x74 against 238x48: confirmed gap, and already accepted.** The Figma Logo main component 4:483 is itself a fixed 265x74 frame with no size token. This is gap D1 in reports/Logo.md. It makes the Website header 74 tall instead of 98 and puts the Logo content about 14px further left than in Figma, where the content is centred inside the box. The designer should set the Logo variant to hug.

## Screenshots (reports/Header/)
header-website.jpg, header-website-hover-home.png, header-website-focus-tab.png, header-mobile.jpg, nav-item-all-5-variants.jpg, figma-website-500-21.png, figma-mobile-500-45.png

## Verdict
All 5 rows Passed. Development is expected to move to To be deployed.
