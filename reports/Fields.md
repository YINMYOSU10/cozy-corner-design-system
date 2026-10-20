# QA report: Fields (Figma 275:141)

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (PR #44, 48aeec0)
Method: expected matrix and token bindings read live from Figma (use_figma read-only, get_metadata, get_screenshot); staging measured via computed style in iframe.html story pages; fonts confirmed loaded (canvas width Inter 224 vs bogus 191, Karla 216 vs 191).

## Matrix (16 Figma variants, 16 stories, 1:1) and verdict
Registry rows: 10 (grouped State x Type; sm and Lg together). Passed 9, Failed 1.

| Row | Variants | Result |
|---|---|---|
| Form Input / Default | sm, Lg | Passed |
| Form Input / Hover | sm, Lg | Passed (pinned story; live pointer hover not driven, see limits) |
| Form Input / Active | sm, Lg | Passed (Tab focus driven) |
| Form Input / Success | sm, Lg | Passed |
| Form Input / Error | sm, Lg | FAILED |
| Form Input / Disable | sm, Lg | Passed (inert verified) |
| Text Input | sm, Lg | Passed |
| Search Input | sm | Passed |
| Search Input with Button | sm | Passed |
| Behaviour and accessibility | cross-variant | Passed |

## Finding (engineer defect)
Form Input / Error (sm and Lg)
Expected  helper text uses --color-text-negative (Figma layer "Error text", bound to color/text/negative, rgb 126,39,29; dark red in the Figma render)
Saw       helper text rgb(47,90,62) = --color-text-positive (green)
Where     Fields.css, `.cc-field[data-state='Error']` sets `--cc-field-helper: var(--color-text-positive)`
Fix       use var(--color-text-negative) (exists in build/tokens/css/tokens.css) and delete the "design gap" comment. The Engineer's claim that Figma binds Error to positive is incorrect; Success text is the one bound to positive.
Evidence  reports/Fields/form-input-sm-error.png, form-input-lg-error.png vs reports/Fields/figma-set.png

## Design gaps (not logged against the engineer)
- Heights unbound: Figma Form Input frame 92, box 48 for both sm and Lg; code root 88/100, box 40/44. Text Input Figma 76/100, code 62/96. Search Input Figma box 36, code 39. Search with Button Figma box 32 / root 80, code 39 / 87. (Button itself 32 in both.)
- Widths unbound: Figma box 390 inside a 398 frame; Text Input 390/676; code fills container.
- Trailing icon hidden and unbound in every Figma variant; code default off, matches.
- Placeholder text binds core fontSize/lineHeight in some nodes but the text style (mobile/Body small, mobile/Body) is applied; code matches the styles.
- Form Input Lg label/helper typography differs by state in Figma (Default: Label large / Label; others: mobile/Body / Label small). Code mirrors this exactly (verified per state). Flag to design: likely inconsistent.
- Figma icon vector paint is an unbound inverse default; code uses color/icon/secondary (color/icon/disabled when disabled), consistent with the render.
- Resize Icon: Figma places it absolutely at the box corner (render shows it inside, bottom-right); code corner placement matches. The Engineer's "outside the box" concern did not reproduce visually.

## Flags (no contradiction with Figma)
Other Types accept Hover/Active/Success/Error/Disable; showHelper applies to every Type. Registry State list has no "success"; Success recorded as `completed`.

## Behaviour checks
- Tab focus: input focused, :focus-visible true, border color/border/primary, outline none (focus shown by border colour only).
- Disabled: input.disabled true, focus() does not take focus, typing inserts nothing, cursor not-allowed.
- Error: aria-invalid=true; aria-describedby resolves to helper; label for= matches control id; hidden-label types carry aria-label.
- Search types: role=search, input type=search. Text Input renders a textarea with vertical resize.
- Search with Button: Button / Primary 68.1x32, bg color/bg/primary/idle, padding 8/12, Karla 14/22; row sums to 398.
- Tokens: no raw hex or px in Fields.css; computed values equal token values.

## Limits
- Live pointer hover was not driven: the shared browser pane was navigated away by another session. Pinned Hover story matches Figma and the `:hover` rule is present in Fields.css.
- Screenshots are in reports/Fields/ (headless Chrome); Airtable Attachment not populated (MCP cannot upload local files).

Verdict: 1 Failed -> Development should read To be fixed.

---

# Re-test 2026-10-20 (Development was Fixed; PR #49, commit 4cd5aafa, merge b8ac51d)

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app. Fonts confirmed loaded (canvas Inter 154.5 vs bogus 134.6; Karla 146.0 vs 134.6).
Figma re-read live (use_figma, read-only): "Error text" layer 277:279 (sm 277:269) and 277:1558 (Lg 277:1548) both bound to color/text/negative, rgb(126,39,29).

## Row re-tested
| Row | Variants | Result |
|---|---|---|
| Form Input / Error | sm, Lg | Passed. Helper "Error text" computed rgb(126,39,29) = --color-text-negative (#7e271d) on both. Fixed to Passed. |

## Regression spot-check (computed style on every Fields story, no change from first run)
- Success sm/Lg helper: rgb(47,90,62) = color/text/positive, still green.
- Default/Hover/Active helper rgb(168,150,125); Disable helper and border rgb(153,161,175); label rgb(74,60,49) in all; control border rgb(43,33,27) in non-disabled states.
- Text Input sm/Lg, Search Input, Search Input with Button (button label rgb(255,253,249), helper rgb(168,150,125)), Trailing Icons (Success green, Error rgb(126,39,29), Disable grey): unchanged.
- Nothing else changed colour. No row regressed.

Screenshots: reports/Fields/retest-form-input-sm-error.jpg, retest-form-input-lg-error.jpg (compare figma-set.png).
Limit: behaviour row (Tab focus, disabled inertness, aria) not re-driven; no markup change in the fix, only a CSS custom property value; computed styles equal the first run.

Verdict: 10 of 10 rows Passed -> Development should read To be deployed.
