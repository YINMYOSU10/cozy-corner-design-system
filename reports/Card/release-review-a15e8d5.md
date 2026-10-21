# Release review — Card

| Row | Value |
|---|---|
| Reviewed commit | `a15e8d54ea3c39b95f27efaede5da73a686c0e9d` (2026-10-21T11:39:42+06:30), branch `main`, level with `origin/main` |
| Registry | Airtable Components row "Card": `Development` = Released, `Design` = Done, Last Modified 2026-10-21T04:50:27.000Z |
| Figma | Component node `381-1660` in file `MWuaFZQ58G4WvtbCyeaE1X` (cozy-corner.Global.Components.v1.0.0.In-Progress), link on the board's `Figma` column |
| Intent file | `src/components/Card/Card.intent.json`, last changed at commit `a2807a2 2026-10-21`; read at `a15e8d5` |
| Production Storybook | https://cozy-corner-design-system.vercel.app/?path=/docs/components-card--docs |
| Verdict | Cleared |

This review is fresh: every result below was measured against the files at commit `a15e8d5`; nothing was carried over from earlier reviews. Build at this commit: `npm run build:package` passes, `npm run lint` passes.

## The 7 gates for Card

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | PASS | `src/components/Card/Card.intent.json` exists and parses as JSON. |
| 2 | Development status | PASS | Airtable Components row "Card": `Development` = Released at review (Design = Done). Gate accepts Completed or Released. |
| 3 | Tokens clean | PASS | Scanned Card.css, Card.tsx, CardContainer.tsx, CardText.tsx, index.ts with comments stripped: no raw hex, px, rgb() or literal font-family. `tokens/` has no diff against HEAD (empty diff); `build/` is generated and gitignored. |
| 4 | Public surface decided | PASS | `src/index.ts` has `export * from './components/Card'`. The folder's `index.ts` exposes 13 names (Card, CardProps, CardPlatform, CardType, CardContainer, CardContainerProps, CardContainerType, CardContainerState, ...). |
| 5 | Names final | PASS | No section in `docs/naming-suggestions.md` names "Card", so no open suggestion touches its names. Prop names read from the component's types are listed under gate 6. |
| 6 | States complete | PASS (note) | 1 stories file(s), 10 exported stories (DashboardDefault, DashboardDefaultHover, DashboardTrendDown, DashboardTrendNone, MobileDefault, MobileDefaultHover, WebsiteDefault, WebsiteDefaultHover, DashboardClue, DashboardClueHover). Exported unions: CardPlatform [Dashboard\|Mobile\|Website]; CardType [Default\|Clue]; CardContainerType [Dashboard Card\|Left-aligned Book Card\|Center-aligned Book Card\|Clue Card]; CardContainerState [Default\|Hover]; CardTextType [ReportText\|BookDescription\|Clue]; CardTextPlatform [Mobile\|Website]; CardTrend [Up\|None\|Down]. Union values with no literal mention in stories: CardContainerType='Dashboard Card', CardContainerType='Left-aligned Book Card', CardContainerType='Center-aligned Book Card', CardContainerType='Clue Card'; judged covered through a parent story prop (e.g. derived values), flagged for a human. |
| 7 | Version meaning known | PASS | `VERSIONING.md` exists at the repo root, written by a human: defines patch/minor for 0.x and patch/minor/major from 1.0. Settled. |

## The 6 checks for Card

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | PASS | All 8 fields present in `Card.intent.json`. Counts: use_when 5, dont_use_when 5, best_practice 3, variant_intent 10, placement 3, pairs_with 4, required_tokens 45, a11y 1. |
| 2 | Alternatives named | WARNING | 3 of 5 `dont_use_when` entries have an empty `use_instead`: "inside another card."; "Do not add borders or extra shadows. Only the Clue card has ..."; "Do not mix dashboard and book content in the same card.". Warning only. |
| 3 | a11y specific | PASS | 1 fact(s), each with a `source` `path:line` that exists and is within the file, none generic. Sources: src/components/Card/CardText.tsx:137. |
| 4 | Tokens resolve | PASS | All 45 `required_tokens` entries are defined in the built `dist/tokens.css`. |
| 5 | All variants covered | PASS (note) | 10 `variant_intent` keys. Unions checked: CardPlatform, CardType, CardContainerType, CardContainerState, CardTextType, CardTextPlatform, CardTrend; 5 fully covered. Sub-part unions with values lacking an entry (sub-parts, not the component's variant props): CardContainerType (Dashboard Card, Left-aligned Book Card, Center-aligned Book Card, Clue Card); CardTextType (ReportText, BookDescription). |
| 6 | No overlap | PASS | None of the 5 `use_when` lines matches a line in any other component's intent file. |

## Result

**Cleared**. All 7 gates pass; every check passes, is a warning, or is WAIVED.
