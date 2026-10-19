# QA report: Button / Destructive

- **Run:** 2026-10-18, first test. The registry woke QA because `Development` read `Ready for Testing` on Components row `recikt85EFJXCMLte`.
- **Tested build:** the URL in `Staging Storybook`, https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (branch `staging`, head `fed259d`, which merged PR #7 `c30f5ed`). I tested the deployed URL, not a local build.
- **Staging check:** `<base>/index.json` returned 200 and parsed. It lists 14 entries under "Components/Button Destructive": Docs, Playground and 12 sheet stories. Each sheet iframe rendered 25 `[data-matrix]` cells and 25 `.cc-button--destructive` buttons. This is the real Storybook, not a login page.
- **Figma:** [Button / Destructive, 444:4114](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=444-4114), file `MWuaFZQ58G4WvtbCyeaE1X`
- **Tester:** QA agent. I did not build this component. I changed nothing in `src/`.

## Re-test 2, 2026-10-18 (latest result)

- **Why:** `Development` read `Fixed`. One row read `Fixed (To re-test)`: Default · Disable (`rec4O14lNAyhxlwPA`). The repair: the designer rebound the 19 Default · Disable icons in 444:4114 from `color/icon/inverse` to `color/icon/disabled` and published. There was no code change.
- **Tested build:** the URL in `Staging Storybook`, https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app. `origin/staging` is still at `fed259d`. `index.json` lists the same 14 Button Destructive entries, and each sheet rendered 25 cells.
- **Figma re-read:** I ran a read-only `use_figma` pass over all 300 children. The file was edited twice today, so I checked every binding again and grouped the results by State × Type. Each group is now internally consistent, with no stray variants:
  - **Default · Disable:** fill `color/bg/disabled`, no stroke, label `color/text/disabled` on 24, icon strokes `color/icon/disabled` on 24. **F3 is resolved in Figma.**
  - **Outline · Press:** stroke `color/border/negative/bold`, fill `color/bg/negative/lightHovered` on 30/30. F1 is still resolved.
  - **All other groups:** the same tokens as in the first test. Radius is `borderRadius/sm` or `borderRadius/circle`, padding `spacing/sm` × `spacing/md`, gap `spacing/sm`. The focus ring is `color/bg/base` spread 2 plus `color/border/focus` spread 4. Type is Karla 400 14/22 at 32 and Inter 500 16/26 at 48 and 56. Icon only icons are 16, 24 and 32. Geometry has not changed, and labelled variants are still a fixed 130px (G1).
- **Fonts:** confirmed loaded before measuring. Inter 500 16px measured 177.84 vs 152.12 for a made-up font. Karla 400 14px measured 148.57 vs 133.10.
- **Matrix:** all 300 cases were measured on staging with one script that loaded the 12 sheet stories as same-origin iframes. For each case it checked background, border, radius, height, Icon only width, focus ring or `none`, label colour and type, icon slots, icon size, icon stroke colour, `aria-label` on Icon only, and the `disabled` attribute. Each was compared with the computed value of the CSS token that Figma binds.
  - **Note on my script:** the first pass reported 30 Press · Outline background misses. The cause was my script, which looked up `--color-bg-negative-lightHovered`. The generated token is `--color-bg-negative-lighthovered` (#eba9a1). A second pass with the correct name gave 30/30, rgb(235,169,161). This was a test-script error, not a finding.

### Re-test 2 verdict

| | Cases |
|---|---|
| Expected matrix, from Figma 444:4114 | 300 |
| Passed | 300 |
| Failed | 0 |
| Staging Testing rows | 10, all `Passed`. No new rows. None is left reading `Fixed (To re-test)`. |

| Row | Record | Before | Now | Variants |
|---|---|---|---|---|
| Default · Default | recnwNVXWQvGAox5o | Passed | Passed | 30/30 |
| Outline · Default | recDdAUgHxyGLsO9q | Passed | Passed | 30/30 |
| Default · Hover | recZd3gGHf3ToV4Yv | Passed | Passed | 30/30 |
| Outline · Hover | recm6sqtvVuLetl1K | Passed | Passed | 30/30 |
| Default · Press | rec6v2EzjXEViXH1Q | Passed | Passed | 30/30 |
| Outline · Press | recfEhw6lXSMeyGlR | Passed | Passed | 30/30 |
| Default · Focus | recKt8vFKdSnaB1hC | Passed | Passed | 30/30 |
| Outline · Focus | recrNmeGL3X6eXSC3 | Passed | Passed | 30/30 |
| Default · Disable | rec4O14lNAyhxlwPA | Fixed (To re-test) | **Passed** | 30/30 |
| Outline · Disable | recL15RYs2ZAg5dqy | Passed | Passed | 30/30 |

After the re-test, `Development` reads **To be deployed**, with Synchronization at 100%.

- **F3 resolved:** staging draws every Default · Disable icon with `--color-icon-disabled`, and Figma now binds `color/icon/disabled` to all 24 icon-bearing variants.
- **Evidence:**
  - Staging: `reports/ButtonDestructive/retest2-sheet-default-pill-48.png` and `retest2-sheet-default-rounded-56.png`
  - Figma: `reports/ButtonDestructive/retest2-figma-Disable-Both-Pill-48-Default.png`
- **Still open as design notes (not failures):** G1 (fixed 130px width), G2 (empty trailing icon at 56) and G4 (stray fill on an open vector).
- **Limits:** the code is unchanged since the first test (`fed259d`), so I did not repeat the pointer and keyboard checks (hover, Tab focus, Enter and Space, disabled inertness). Press has still not been driven with a real held pointer. The row's Attachment cell keeps the earlier failure renders for history. The connector cannot upload local files, so the new evidence paths are in `Context`.

---

## Re-test 1, 2026-10-18 (superseded by re-test 2 above)

- **Why:** `Development` read `Fixed`. Two rows read `Fixed (To re-test)`: Default · Disable (`rec4O14lNAyhxlwPA`) and Outline · Press (`recfEhw6lXSMeyGlR`). The repair was a Figma rebind in 444:4114, with no code change.
- **Tested build:** the same staging URL. `staging` is still at `fed259d`, so the code has not changed since the first test.
- **Figma re-read:** a read-only `use_figma` pass over all 300 children. Geometry, radius, padding, gap, type and focus ring did not change. The colour bindings changed in three places:
  - **Outline · Press:** all 30 variants now bind the stroke to `color/border/negative/bold`. F1 is resolved in Figma.
  - **Default · Disable labels:** all 30 now use `color/text/disabled`. F2 is resolved in Figma.
  - **Default · Disable icons (new):** 19 of the 30 variants now bind their icon vectors to `color/icon/inverse`. The first test read `color/icon/disabled` on all 30. Only 5 still use `color/icon/disabled`: Rounded 32 leading, trailing and Both, and Rounded 48 leading and Both. See F3.
- **Fonts:** confirmed loaded before measuring. Inter 500 16px measured 177.84 vs 152.12 for a made-up font, and Karla 400 14px measured 148.57 vs 133.10.
- **Matrix:** all 300 cases were measured again on staging against the current Figma bindings, using the same checks as the first test. Those checks cover background, border, label, icon stroke, type, radius, height, Icon only width, icon slots and size, focus ring or `none`, and the `disabled` attribute.

### Re-test verdict

| | Cases |
|---|---|
| Expected matrix, from Figma 444:4114 | 300 |
| Passed | 281 |
| Failed | 19 (all F3) |
| Staging Testing rows | 10: 9 `Passed`, 1 `Failed`. No new rows. None is left reading `Fixed (To re-test)`. |

| Row | Record | Before | Now | Variants |
|---|---|---|---|---|
| Default · Default | recnwNVXWQvGAox5o | Passed | Passed | 30/30 |
| Outline · Default | recDdAUgHxyGLsO9q | Passed | Passed | 30/30 |
| Default · Hover | recZd3gGHf3ToV4Yv | Passed | Passed | 30/30 |
| Outline · Hover | recm6sqtvVuLetl1K | Passed | Passed | 30/30 |
| Default · Press | rec6v2EzjXEViXH1Q | Passed | Passed | 30/30 |
| Outline · Press | recfEhw6lXSMeyGlR | Fixed (To re-test) | **Passed** | 30/30 |
| Default · Focus | recKt8vFKdSnaB1hC | Passed | Passed | 30/30 |
| Outline · Focus | recrNmeGL3X6eXSC3 | Passed | Passed | 30/30 |
| Default · Disable | rec4O14lNAyhxlwPA | Fixed (To re-test) | **Failed** | 11 pass, 19 fail (F3) |
| Outline · Disable | recL15RYs2ZAg5dqy | Passed | Passed | 30/30 |

`Development` reads **To be fixed** after the re-test.

### F3. Default · Disable icon colour: Failed (19 variants), new in the designer's edit

```
Button / Destructive · Default · Disable · 19 variants
  Rounded 32 Icon only; Rounded 48 trailing, Icon only; Rounded 56 leading, trailing, Both, Icon only;
  Pill 32, 48 and 56: leading, trailing, Both, Icon only
Expected  icon uses --color-icon-inverse  (Figma now binds color/icon/inverse, e.g. 444:3866, 444:4006)
Saw       icon stroke is --color-icon-disabled, rgb(168,150,125) vs rgb(255,253,249)
Where     Button.css line 117, .cc-button:disabled { --cc-button-icon: var(--color-icon-disabled) }
```

The first test read `color/icon/disabled` on all 30 of these icons. The designer's label fix seems to have rebound 19 icons as well. Several things point to a Figma slip:

- 5 Default · Disable icons still use the disabled token.
- All 30 Outline · Disable icons use the disabled token.
- The labels beside these icons now use `color/text/disabled`.
- Near-white icons on `color/bg/disabled` are hard to read (see the Figma render).

- **Suggested fix:** the designer rebinds those 19 icon vectors to `color/icon/disabled`. Then no code change is needed, and the row will pass on re-test. If the designer confirms `color/icon/inverse` is intended, the fix is an override in `ButtonDestructive.css` that sets the icon to `--color-icon-inverse` for Type=Default when disabled. I do not recommend that.
- **Evidence:**
  - Staging: `reports/ButtonDestructive/retest-sheet-Default-Pill-48.png`
  - Figma: `reports/ButtonDestructive/retest-figma-Disable-Both-Pill-48-Default.png` (also attached to the row)

### Resolved on re-test

- **F1 (Outline · Press border):** Figma now binds `color/border/negative/bold` at every size. Staging shows `--color-border-negative-bold` (rgb 201,85,74) and fill `--color-bg-negative-lightHovered` on all 30. Evidence: `retest-sheet-Outline-Rounded-48.png` and `retest-figma-Press-none-Rounded-48-Outline.png`.
- **F2 (Default · Disable label):** Figma now binds `color/text/disabled` on all 30. Staging matches on all 30.

### New design note (not logged against the Engineer)

- **G4.** Default · Default · Rounded · 48 · Both icons (444:2670) has a `color/icon/secondary` fill on one vector of each plus icon. That vector is an open line, so the fill draws nothing, and its stroke is `color/icon/inverse` as expected. This is a Figma clean-up item, not a failure.

G1 (fixed 130px width) and G2 (empty trailing icon) from the first test still stand.

### Re-test limits

- I checked hover, focus, Tab order, Enter and Space, and disabled inertness in the first test. The code has not changed since (`fed259d`), so this re-test compared computed styles across all 300 cases and did not repeat those pointer and keyboard checks.
- Press still has not been driven with a real held pointer.

### Re-test screenshots (`reports/ButtonDestructive/`)

- `retest-sheet-Default-Pill-48.png` (F3)
- `retest-sheet-Default-Rounded-32.png` (Disable row: icons match here)
- `retest-sheet-Outline-Rounded-48.png` and `retest-sheet-Outline-Pill-56.png` (Press now passes)
- `retest-figma-Disable-Both-Pill-48-Default.png`
- `retest-figma-Press-none-Rounded-48-Outline.png`

---

## First test, 2026-10-18 (superseded by the re-test above)

## Verdict

| | Cases |
|---|---|
| Expected matrix, from Figma 444:4114 | 300 |
| Passed | 269 |
| Failed | 31 |
| Staging Testing rows written (Decision 7: one per State × Type) | 10: 8 `Passed`, 2 `Failed` |

`Development` now reads **To be fixed**.

Both failures come from Figma binding different tokens to variants that should match. Code cannot match both versions, so **the designer should decide first**, then the Engineer acts. Details are under Findings.

## Rows written (Staging Testing, linked to recikt85EFJXCMLte)

| Row | Record | Result | Variants |
|---|---|---|---|
| Button / Destructive · Default · Default | recnwNVXWQvGAox5o | Passed | 30/30 |
| Button / Destructive · Outline · Default | recDdAUgHxyGLsO9q | Passed | 30/30 |
| Button / Destructive · Default · Hover | recZd3gGHf3ToV4Yv | Passed | 30/30 |
| Button / Destructive · Outline · Hover | recm6sqtvVuLetl1K | Passed | 30/30 |
| Button / Destructive · Default · Press | rec6v2EzjXEViXH1Q | Passed | 30/30 |
| Button / Destructive · Outline · Press | recfEhw6lXSMeyGlR | **Failed** | 10 pass, 20 fail |
| Button / Destructive · Default · Focus | recKt8vFKdSnaB1hC | Passed | 30/30 |
| Button / Destructive · Outline · Focus | recrNmeGL3X6eXSC3 | Passed | 30/30 |
| Button / Destructive · Default · Disable | rec4O14lNAyhxlwPA | **Failed** | 19 pass, 11 fail |
| Button / Destructive · Outline · Disable | recL15RYs2ZAg5dqy | Passed | 30/30 |

Each row's `Variants` cell lists all 30 variants with their Figma node ids and marks the failing ones.

## How each case was checked

1. **The matrix came from Figma, not the story file.** A read-only `use_figma` script (no writes) went through all 300 children of 444:4114: 5 State × 5 Icon-style × 2 Shape × 3 Size × 2 Type. For each variant it read the visible fills, strokes, effects, label fill, icon vector fills and strokes, radius, padding and gap bindings, and the size.
   - **Default type fill:** `color/bg/negative/idle`, `hovered`, `focused` (Press), `focused` (Focus), and `color/bg/disabled`. No stroke.
   - **Outline type fill:** hidden for Default and Disable, so transparent. `color/bg/negative/light` for Hover and Focus, `color/bg/negative/lightHovered` for Press.
   - **Outline stroke:** 1px inside, `color/border/negative/default`. Disable uses `color/border/secondary`. Press is inconsistent (see F1).
   - **Text and icons:** `color/text/inverse` and `color/icon/inverse` (Default type), `color/text/negative` and `color/icon/negative` (Outline type), and `/disabled` for Disable. The Default · Disable label is inconsistent (see F2).
   - **Radius:** `borderRadius/sm` on all 150 Rounded variants, `borderRadius/circle` on all 150 Pill variants. Icon slots use `borderRadius/xs`.
   - **Spacing:** padding `spacing/sm` × `spacing/md`, gap `spacing/sm`.
   - **Type:** Body small (Karla 400 14/22) at 32, Label large (Inter 500 16/26) at 48 and 56.
   - **Icons:** 16px at 32, 24px at 48 and 56. Icon only at 56 uses 32px.
   - **Focus:** drop shadows spread 2 `color/bg/base` and spread 4 `color/border/focus`.
   - **Size:** labelled variants are a fixed 130 × 32/48/56, with width and height not bound to a token. Icon only is 32/48/56 square.
2. **The stories were reconciled with Figma.** There are 12 sheet stories × 25 cells = 300 cases, one for each Figma variant. No case is missing. Playground has no Figma row; it is a controls story, not dead code.
3. **Fonts were confirmed before measuring.** In every sheet frame I loaded both fonts and waited for `document.fonts.ready`. Then I measured `Label Hamburgefonstiv` on a canvas against a made-up font name:
   - Inter 500 16px: 177.84 vs 152.12
   - Karla 400 14px: 148.57 vs 133.10

   Both fonts were loaded.
4. **All 300 cases were measured on staging.** One script opened each sheet story as a same-origin iframe on the staging host. For every cell it compared computed styles against the computed value of the CSS token that Figma binds:
   - background, border width and colour, radius, `box-shadow` (the ring on Focus, `none` everywhere else)
   - height, padding-top, and padding-left plus border (= `--spacing-md`)
   - label colour, family, weight, size and line height; container gap
   - icon slots (leading, trailing or icon), icon box size, slot radius, path stroke colour; Icon only width, centring (±0.5px) and `aria-label`
   - the `disabled` attribute

   **Result: 31 mismatches in 300. All 31 are F1 and F2.** The comparisons were real, not empty: the tokens resolve on `:root` (for example `--color-bg-negative-idle` = `#b03a2e`, `--color-border-negative-bold` = `#c9554a`, `--borderradius-circle` = 1000px, `--size-button-lg` = 56px).
5. **States were driven, not only rendered.**
   - **Hover, Default type:** a real pointer on Default·none·Rounded·56 gave `:hover` true and fill `--color-bg-negative-hovered`. Pass.
   - **Hover, Outline type:** a real pointer on Default·Icon only·Pill·56 gave fill `--color-bg-negative-light` and border `--color-border-negative-default`. Pass.
   - **Focus, Default type:** I clicked blank page, then pressed Tab once. Focus landed on Default·Both icons·Rounded·56 with `:focus-visible` true, fill `--color-bg-negative-focused`, and ring `rgb(251,243,231) 0 0 0 2px, rgb(193,99,61) 0 0 0 4px` (`--color-bg-base`, `--color-border-focus`). Pass.
   - **Focus, Outline type:** the same check on the Outline·Pill·56 sheet gave fill `--color-bg-negative-light`, border `--color-border-negative-default`, and the same ring. Pass.
   - **Activation:** Enter and Space on the focused button each fired `click` once. Pass.
   - **Disable:** a real click on Disable·Icon only fired 0 handlers. No disabled button is focusable. Under hover the Outline disabled button stayed transparent with border `--color-border-secondary` and cursor `not-allowed`. Pass.
   - **Press:** checked only through the pinned `state="Press"` cells. The browser tools cannot hold a pointer down, so the real `:active` look was **not driven**.
   - **Loading:** Figma has no Loading state and the component has none.
6. **Tokens:** `ButtonDestructive.css` contains no raw hex, rgb, px or font values. Every value is a semantic `--color-*-negative-*` token, and all of them exist in `build/tokens/css/tokens.css`. The component imports `Button` and does not copy its styles.

## Findings

### F1. Outline · Press border at Size 48 and 56: Failed (20 variants)

```
Button / Destructive · Outline · Press · Size 48 and 56 (Rounded + Pill, all 5 icon styles)
Expected  border uses --color-border-negative-default  (Figma binds color/border/negative/default, e.g. 444:3170)
Saw       border is --color-border-negative-bold, rgb(201,85,74) vs rgb(220,125,114)
Where     ButtonDestructive.css, Outline Press rule: --cc-button-border: var(--color-border-negative-bold)
```

Figma disagrees with itself here. Size 32 Outline Press binds `color/border/negative/bold`, but Size 48 and 56 bind `color/border/negative/default`. Button / Primary uses `border/brand/bold` at every size, so the Size 32 version is probably the intended one.

- **Suggested fix:** ask the designer which token Press should use.
  - If 48 and 56 are changed to `bold` in Figma, no code change is needed and these 20 will pass on re-test.
  - If Figma is right as drawn, add a `[data-size='48'], [data-size='56']` Outline Press override that uses `--color-border-negative-default`.
- **Evidence:**
  - Staging: `reports/ButtonDestructive/staging-sheet-Outline-Rounded-48.png`
  - Figma: `reports/ButtonDestructive/figma-Press-none-Rounded-48-Outline.png` (also attached to the row)

### F2. Default · Disable label colour: Failed (11 variants)

```
Button / Destructive · Default · Disable · 11 variants
  Rounded 48 trailing; Rounded 56 leading/trailing/Both; Pill 48 none/leading/trailing/Both; Pill 56 leading/trailing/Both
Expected  label uses --color-text-inverse  (Figma binds color/text/inverse, e.g. 444:3926)
Saw       label is --color-text-disabled, rgb(168,150,125) vs rgb(255,253,249)
Where     the label colour prop of the disabled state, inherited from Button.css :disabled (--cc-button-text)
```

The other 19 Default · Disable labels in Figma use `color/text/disabled`, and all 30 icons use `color/icon/disabled`. Near-white text on `color/bg/disabled` is also hard to read (see the Figma render). This looks like a Figma slip.

- **Suggested fix:** the designer rebinds those 11 labels to `color/text/disabled`. No code change is then needed, and these 11 will pass on re-test.
- **Evidence:**
  - Staging: `reports/ButtonDestructive/staging-sheet-Default-Pill-48.png`
  - Figma: `reports/ButtonDestructive/figma-Disable-none-Pill-48-Default.png` (also attached to the row)

## Design gaps (not logged against the Engineer)

- **G1. Fixed 130px width.** Every labelled Figma variant is a fixed 130px wide, and the width is not bound to any token. Staging hugs its content, the same way Button / Primary does in Figma and code. Measured staging widths:

  | Size | none | leading or trailing icon | Both icons |
  |---|---|---|---|
  | 32 | 57.66 | 81.66 | 105.66 |
  | 48 and 56 | 65.45 | 97.45 | 129.45 |

  Icon only matches exactly. An unbound value is a design gap, so I did not fail these cases. The designer should switch these variants to hug, or add a width token.
- **G2. Empty trailing icon.** All 20 Size 56 "leading icon" variants have a visible but empty `Trailing Icon` instance with no children. It draws nothing. Staging leaves it out. This should be cleaned up in Figma.
- **G3. Mode check.** I read the Figma bindings by variable name with `use_figma`, not as resolved values from `get_variable_defs`. So the token-name comparisons above do not depend on which mode the file is open in.

## Screenshots (`reports/ButtonDestructive/`)

- **One per state, for each type:** `staging-<State>-Default-Rounded-56.png` and `staging-<State>-Outline-Pill-56.png`, for Default, Hover, Press, Focus and Disable.
- **Full staging sheets:**
  - `staging-sheet-Default-Rounded-56.png`
  - `staging-sheet-Outline-Pill-56.png`
  - `staging-sheet-Default-Pill-48.png` (F2)
  - `staging-sheet-Outline-Rounded-48.png` (F1)
- **Figma renders:**
  - `figma-component-set-444-4114.png`
  - `figma-Press-none-Rounded-48-Outline.png`
  - `figma-Disable-none-Pill-48-Default.png`

These are test results, not a release decision. A human has the final say.
