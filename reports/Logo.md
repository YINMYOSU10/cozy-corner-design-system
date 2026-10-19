# QA report: Logo

- **Run:** 2026-10-19, first test. The registry woke QA because `Development` read `Ready for Testing` on Components row `rec8xEQlmAtxkCaOt`.
- **Tested build:** the URL in `Staging Storybook`, https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app/?path=/docs/components-logo--docs (branch `staging`, head `1fc4315`, which merged PR #12 `component/logo-colours` on top of PR #11 `component/logo`). I tested the deployed URL, not a local build.
- **Staging check:** the root returned 200 and `<base>/index.json` parsed. It lists Components/Logo Docs plus 8 stories, one per Figma variant. Every story iframe rendered a `.cc-logo` element.
- **Figma:** [Logo, 4:484](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=4-484), file `MWuaFZQ58G4WvtbCyeaE1X`. I read it as it stands after today's colour re-binding.
- **Tester:** QA agent. I did not build this component, and I changed nothing in `src/`.

## Verdict

| | Cases |
|---|---|
| Expected matrix, from Figma 4:484 | 8 |
| Passed | 8 |
| Failed | 0 |
| Staging Testing rows written (Decision 7: one per Platform × Show Glyph) | 4, all `Passed` |

After the rows were written, `Development` reads **To be deployed**.

## Rows written (Staging Testing, linked to rec8xEQlmAtxkCaOt)

| Row | Record | Result | Variants |
|---|---|---|---|
| Logo · Website · Show Glyph=true | rec3rg55BbMn5vXGy | Passed | Glyph+Wordmark, Glyph only |
| Logo · Website · Show Glyph=false | rec9iWZbS5IXJpGOI | Passed | Wordmark only, Neither |
| Logo · Dashboard · Show Glyph=true | reccDKkwEyNelvnD1 | Passed | Glyph+Wordmark, Glyph only |
| Logo · Dashboard · Show Glyph=false | recHg0HvonEayveWQ | Passed | Wordmark only, Neither |

`Size` is `null`, because Logo has no size property. `State` is `idle`, because Logo is not interactive. The Staging Testing table now holds 44 rows, well under the free plan's 1,000-row cap.

## Matrix (from Figma) and per-case result

Figma `get_metadata` gives 2 variant symbols, Platform=Website (4:483, 265×74) and Platform=Dashboard (4:485, 185×45). Each symbol has 2 boolean properties, Show Glyph and Show Wordmark, which makes 8 cases. All 8 have a story, and the build has no stories outside the matrix.

| Platform | Glyph | Wordmark | Story | Staging box (W×H) | Result |
|---|---|---|---|---|---|
| Website | true | true | website-glyph-and-wordmark | 237.57×48 | Pass |
| Website | true | false | website-glyph-only | 48×48 | Pass |
| Website | false | true | website-wordmark-only | 181.57×40 | Pass |
| Website | false | false | website-neither | 0×0 | Pass |
| Dashboard | true | true | dashboard-glyph-and-wordmark | 153.48×32 | Pass |
| Dashboard | true | false | dashboard-glyph-only | 32×32 | Pass |
| Dashboard | false | true | dashboard-wordmark-only | 113.48×24 | Pass |
| Dashboard | false | false | dashboard-neither | 0×0 | Pass |

## How each case was checked

### 1. Fonts loaded
I measured the canvas width of "Cozy Corner" in `700 Fredoka` and in a bogus font family. At 32px it was 181.57 against 176.83, and at 20px it was 113.48 against 110.52. The widths differ, so Fredoka is loaded on staging, and the wordmark widths in this report are real.

### 2. Expected bindings (Figma `get_design_context` + `get_variable_defs` on 4:483 and 4:485)

| Property | Figma binding | Staging computed | Match |
|---|---|---|---|
| Layout | horizontal, centred, gap `spacing/sm` | `gap: 8px` (var(--spacing-sm)) | yes |
| Radius | `borderRadius/sm` | `8px` (var(--borderradius-sm)) | yes |
| Background | none on the variant frame (a contents-only render is transparent) | transparent | yes |
| Glyph page fill | `color/accent/gold/default` | rgb(217,164,65) = #d9a441 | yes |
| Glyph spine fill / stroke | `color/bg/inverse` / `color/icon/primary` | #2b211b / #4a3c31 | yes |
| Glyph line strokes | `color/icon/primary` | #4a3c31 | yes |
| Glyph heart fill | `color/bg/negative/lightFocused` | rgb(235,169,161) = #eba9a1 | yes |
| Glyph size | Website 48, Dashboard 32 | 48×48, 32×32 | yes |
| Website wordmark | `typography/logo` (Fredoka, Bold, 32/40, ls 0), `color/text/primary` | Fredoka 700 32px/40px, ls normal (0), #4a3c31 | yes |
| Dashboard wordmark | `fontFamily/fredoka`, `fontWeight/bold`, `fontSize/20`, `lineHeight/24`, `color/text/primary` | Fredoka 700 20px/24px, ls normal (0), #4a3c31 | yes |

On Dashboard, the build reads `--typography-logo-*` under `[data-mode="dashboard"]`. That mode resolves to Fredoka bold 20/24 with 0 letter-spacing (`build/tokens/css/tokens-dashboard.css` lines 77–81), which is the same value Figma binds. This passes, but see the design note D2.

The glyph's opacity (page 0.9, lines 0.6) and stroke widths are part of the vector artwork. The token set has no opacity or stroke-width tokens. The Figma flattened render and the staging render match visually.

### 3. Accessibility
- **Glyph only (both platforms):** the root has `role="img"` and `aria-label="Cozy Corner"`. The SVG has `aria-hidden="true"` and `focusable="false"`, so the glyph has an accessible name. Pass.
- **Glyph and wordmark:** the root has no role, and the visible text "Cozy Corner" names the logo. The SVG is hidden from assistive technology, so the name is not read twice. Pass.
- **Wordmark only:** the text names the logo. Pass.
- **Neither:** the build renders nothing, with no role and no label, so it adds nothing to the accessibility tree. Pass.
- **Not interactive:** there is no hover, press, focus or disabled state in Figma, and the build has no tabindex or handlers. There was nothing to drive.

### 4. Tokens in source
`Logo.css` uses only semantic `var(--…)` tokens: spacing, radius, typography/logo, color/text/primary, color/accent/gold/default, color/bg/inverse, color/icon/primary and color/bg/negative/lightfocused. It has no raw hex, px or font values. The numbers in `LogoGlyph.tsx` are SVG path geometry and viewBox units, not design values.

## Design gaps (not engineering defects)
- **D1. Unbound frame and glyph sizes.** Figma fixes the component frames at 265×74 (Website) and 185×45 (Dashboard), and the glyph frames at 48 and 32. None of these sizes is bound to a token. The build hugs its content, so it is 237.57×48 and 153.48×32 when both parts show, and 0×0 for "Neither", where Figma keeps an empty fixed frame. Per the test skill, I report this as a design gap and do not fail it. The designer should set the variant frames to hug, or add size tokens.
- **D2. Dashboard wordmark binds primitives.** Dashboard (4:496) binds `fontSize/20`, `lineHeight/24` and `fontFamily/fredoka` directly, with the text style `cozy corner/typography/dashboard/Logo`. Website binds the semantic `typography/logo/*`. The values agree with `typography/logo` in dashboard mode, so the result is the same. Binding Dashboard to the semantic `typography/logo` collection would keep the two platforms consistent.
- **D3. Extra variables on the node.** `get_variable_defs` on 4:483 also lists `color/bg/surfacePrimary` and `color/border/focus`, and on 4:485 it lists `color/bg/surfacePrimary`. The contents-only render shows no fill or stroke that uses them. They may be leftover bindings on hidden layers, so the designer should check them.

## Screenshots (`reports/Logo/`)
Staging captures are headless Chrome renders of each story iframe at 400×140:
- `Logo-staging-website-glyph-and-wordmark.png`, `Logo-staging-website-glyph-only.png`, `Logo-staging-website-wordmark-only.png`, `Logo-staging-website-neither.png`
- `Logo-staging-dashboard-glyph-and-wordmark.png`, `Logo-staging-dashboard-glyph-only.png`, `Logo-staging-dashboard-wordmark-only.png`, `Logo-staging-dashboard-neither.png`

The Figma renders are:
- `Logo-figma-Website.png` and `Logo-figma-Dashboard.png`, which show the component-set background `color/bg/base` behind them
- `Logo-figma-Website-contents-only.png`, an isolated render with no background

There are no failures, so the rows have no `Attachment`.

## Limits
- I could read the glyph's paint bindings only through `get_variable_defs` and the flattened render, because `get_design_context` flattens the glyph to an SVG asset. The bound colours all appear in the variable list for both variants, and each one matches the build.
- `get_variable_defs` answers in the file's current mode. The colour tokens have one mode here, and the computed values match `build/tokens/css/tokens.css`.
