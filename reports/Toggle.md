# QA report: Toggle

- **Run:** 2026-10-19, first test. The registry woke QA because `Development` read `Ready for Testing` on Components row `rechel8UW5LCp4wl5`.
- **Tested build:** the URL in `Staging Storybook`, https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app/?path=/docs/components-toggle--docs (branch `staging`, head `a703bdd`, "Merge pull request #23 from component/toggle-fixes"). I tested the deployed URL, not a local build.
- **Staging check:** page title "Components / Toggle - Docs ⋅ Storybook", preview iframe present, no login wall. `<base>/index.json` lists Docs plus 8 stories: `components-toggle--{default,focus,disabled}-{unchecked,checked}`, `--all-variants`, `--interactive`.
- **Figma:** file `MWuaFZQ58G4WvtbCyeaE1X`, component set [Toggle, 299:317](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=299-317).
- **Tester:** QA agent. I did not build this component, and I changed nothing in `src/`.

## Verdict

| | Cases |
|---|---|
| Expected matrix, from Figma 299:317 (State × Checked?) | 6 |
| Passed | 6 |
| Failed | 0 |
| Staging Testing rows written (Decision 7: one per State) | 3, all `Passed` |

After the rows were written, `Development` reads **To be deployed** (Synchronization 100%, Total Staging Tests 3).

## Rows written (Staging Testing, linked to rechel8UW5LCp4wl5)

| Row | Record | Result | Covers |
|---|---|---|---|
| Toggle · Default | recOboEagVe2Mv7NW | Passed | Off 299:316, On 299:318 |
| Toggle · Focus | rech160RTpWKNCe13 | Passed | Off 299:336, On 300:352 |
| Toggle · Disabled | reci2ptYkRVmXIyE7 | Passed | Off 300:355, On 300:358 |

`Size` is `null` (Toggle has one size). `State`: Default = `idle`, `selected`; Focus = `focus`; Disabled = `disabled`. The Staging Testing table held 53 rows and now holds 56, well under the free plan's 1,000-row cap. No `Attachment` was added: there are no failures, and the screenshots are in `reports/Toggle/`.

## Matrix (from Figma) and reconciliation

`get_metadata` on 299:317 gives 6 variant symbols, each 36×18. Every one has a story, and there are no extra variant stories (`All variants` and `Interactive` are composites). No case is missing and no story is undocumented.

Expected bindings, from `get_design_context` and `get_variable_defs` on 299:317:
- **Variant and track:** `size/toggle/width` 36 × `size/toggle/height` 18. Track radius `borderRadius/lg`.
- **Thumb:** `size/toggle/thumb` 16, fill `color/bg/surfacePrimary`, circle. Its 1 offset is positional in Figma, so `size/toggle/inset` stands in for it.
- **Track fill:** Off `color/bg/positive/light`, On `color/bg/positive/idle`, Disabled (both) `color/bg/gray/lightHovered`.
- **Shadow:** elevation level 1 (`cozy corner/elevation/level 1`) on the variant for Default and Focus, On and Off. No shadow on Disabled. No track shadow anywhere.
- **Focus:** a `borderWidth/2` stroke outside the track in `color/border/focus`. The track asset bleeds 2px on every side (inset −11.11% / −5.56%).

## Per-case measurements (staging, getComputedStyle / getBoundingClientRect)

| State | Checked? | Figma | Box | Track bg | Thumb (x,y from track) | Variant shadow | Track ring | role / aria-checked / disabled | Result |
|---|---|---|---|---|---|---|---|---|---|
| Default | False | 299:316 | 36×18 | #e4eee6 = positive/light | 16×16 at +1,+1 | level 1 (0 1 3 0 rgba(43,33,27,.08), 0 1 2 0 rgba(43,33,27,.06)) | none | switch / false / no | Pass |
| Default | True | 299:318 | 36×18 | #3f7e55 = positive/idle | 16×16 at +19,+1 (right inset 1) | level 1 | none | switch / true / no | Pass |
| Focus | False | 299:336 | 36×18 | positive/light | +1,+1 | level 1 | 0 0 0 2px #c1633d = border/focus | switch / false / no | Pass |
| Focus | True | 300:352 | 36×18 | positive/idle | +19,+1 | level 1 | 2px border/focus | switch / true / no | Pass |
| Disabled | False | 300:355 | 36×18 | #d1d5dc = gray/lightHovered | +1,+1 | none | none | switch / false / yes | Pass |
| Disabled | True | 300:358 | 36×18 | gray/lightHovered | +19,+1 | none | none | switch / true / yes | Pass |

Every story resolved the tokens to the values Figma lists: `--size-toggle-width` 36px, `--size-toggle-height` 18px, `--size-toggle-thumb` 16px, `--size-toggle-inset` 1px, `--borderwidth-2` 2px, `--borderradius-lg` 32px, `--color-border-focus` #c1633d. Thumb fill is rgb(255,253,249) = `color/bg/surfacePrimary`.

**Fonts:** Toggle renders no text, so no width in this report depends on a font. The canvas check (declared family vs a bogus family) gave identical widths, because the bare story iframe body is the browser default (Times). That has no effect on any Toggle measurement.

## Behaviour (driven for real, Interactive story and the Disabled stories)

| Check | How | Saw | Result |
|---|---|---|---|
| Role | DOM | native `<button role="switch">` carrying `aria-checked` | Pass |
| Real Tab focus | Tab key | focus lands on the toggle, `:focus-visible` true, 2px `color/border/focus` ring outside the track, level 1 shadow kept | Pass |
| Space | key press | aria-checked false → true once, label "Notifications: On" | Pass |
| Enter | key press | true → false once | Pass |
| Click | real pointer click | false → true once (the MutationObserver logged exactly one change per input) | Pass |
| Pointer-only focus | fresh load, click with no keyboard | focused, `:focus-visible` false, no ring | Pass |
| Disabled Off: click | real click | 0 click events reached the button, aria-checked unchanged | Pass |
| Disabled On: click | real click | 0 click events, aria-checked stays true | Pass |
| Disabled: Tab | Tab key | focus stays on body; the control cannot be focused (native `disabled`), cursor `not-allowed` | Pass |

**Focus ring contrast** (`color/border/focus` #c1633d): 4.10:1 against the white story page and 4.04:1 against `color/bg/surfacePrimary` #fffdf9. Both clear the WCAG 1.4.11 3:1 minimum, so the ring is clearly visible. Where the ring touches the track it measures 3.45:1 against `positive/light` (Off) and only 1.18:1 against `positive/idle` (On). The ring's outer edge still sits on the page background, so this is an observation for design, not a defect.

## Token check

The staging `Toggle.css` (`origin/staging`, a703bdd) references semantic tokens only. It has no raw hex, and its only px-free literals are `0 0 0 0 transparent` placeholders for "no shadow". It references no core tokens.

## Findings

None. All 6 cases pass.

Observation for design (not logged as a failure): on Focus · On, the orange ring sits right against the green track at 1.18:1. If design wants the ring to read against the track as well as the page, a 1–2px gap (offset) between the track and the ring would do it. This is a design call. The build matches Figma as published.

## Screenshots (`reports/Toggle/`)

- `Toggle-figma-299-317.png`: Figma render of the component set
- `Toggle-Default-Off.png`, `Toggle-Default-On.png`
- `Toggle-Focus-Off.png`, `Toggle-Focus-On.png`
- `Toggle-Disabled-Off.png`, `Toggle-Disabled-On.png`
- `Toggle-all-variants.png`: staging All variants story
- `Toggle-real-tab-focus-Off.png`: ring from a real Tab
- `Toggle-real-keyboard-then-click-On.png`: after Space, Enter and a click
