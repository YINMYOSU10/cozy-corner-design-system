# Re-test 2026-10-20 (Development was Fixed; PR #36 fix) - PASS
Staging build tested live. Inter 500 confirmed loaded. Real pointer hover (browser `hover`, `:hover` matched true each time).
| Case | Result |
|---|---|
| Disabled, Selected=True, real hover | bg stays color/bg/disabled rgb(230,217,195), text rgb(168,150,125), cursor not-allowed - PASS |
| Disabled, Selected=False, real hover | bg stays rgb(230,217,195) - PASS |
| Disabled, real click (both) | aria-pressed unchanged (true / false), bg unchanged - PASS |
| Disabled, focus() (both) | document.activeElement is not the chip, not focusable - PASS |
| Enabled Selected=True default / hover / focus | idle rgb(193,99,61) = bg/primary/idle; real hover rgb(164,82,48) = bg/primary/hovered; Tab focus-visible, bg = bg/primary/focused (rgb(164,82,48)), ring 2px bg/base + 4px border/focus - PASS |
| Enabled Selected=False default / hover / focus | default rgb(246,221,209) = bg/primary/light; real hover rgb(225,154,121) = lightHovered; focus bg = lightFocused (same hex, known Figma gap) + same ring - PASS |
Evidence: RETEST-PASS-disabled-selected-real-hover.jpg. Finding 1 below is resolved. Row rec6gNkDMJv0bd9FN -> Passed; no regressions, other 4 rows stay Passed. Development -> To be deployed.

# QA report: Chip (Figma 391:37) - first test
Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (real Storybook, index.json v5, 8 variant stories + docs, toggleable, disabled-does-nothing, chip-group)
Fonts: Inter 500 confirmed loaded (canvas Inter 30.88px vs bogus 27.23px). Label 30.88x22, chip 62.88x40 vs Figma 31x22 / 63x40.

## Matrix (Figma bindings read via use_figma)
| State | Selected=True | Selected=False |
|---|---|---|
| Default | bg/primary/idle, text/inverse - PASS | bg/primary/light, text/primary - PASS |
| Hover | bg/primary/hovered - PASS | bg/primary/lightHovered (#e19a79) - PASS |
| Focused | bg/primary/focused + 2px bg/base + 4px border/focus - PASS | lightFocused + same ring - PASS |
| Disabled | static PASS, but FAIL under real hover (finding 1) | static PASS, FAIL under real hover |
All: padding 0/16, radius borderRadius/circle, label Inter 14/22/500, no raw values in CSS (only var(--token)).

## Findings
1. FAIL - Chip · Disabled (both Selected) under real pointer hover
   Expected  bg stays color/bg/disabled (#e6d9c3), no hover change
   Saw       hovered disabled chip computes bg rgb(164,82,48) (Selected=True) / rgb(225,154,121) (Selected=False), i.e. bg/primary/hovered / lightHovered; text stays disabled so it looks broken
   Where     Chip.css: `.cc-chip[data-selected="..."]:hover` (specificity 0,3,0) beats `.cc-chip:disabled` (0,2,0)
   Fix       scope hover/focus-visible rules with :not(:disabled), or raise the :disabled rule above them (e.g. `.cc-chip[data-selected]:disabled`)
   Evidence  FAIL-disabled-*-real-hover.*
2. PASS - Behaviour: Tab focuses chip, :focus-visible true, ring 2px bg/base + 4px border/focus; click, Space and Enter each toggle aria-pressed (true->false via Space, false->true via Enter, true->false via click, all trusted events); disabled chip skipped by Tab, ignores click (no click/focus event, aria-pressed unchanged), cursor not-allowed.

## Design gaps (not engineering defects)
- Height 40 unbound in Figma; carried as zero-width SVG sizer.
- Component-set frame has Figma default purple outline (#9647ff), not part of chip.
- lightHovered and lightFocused resolve to same hex (#e19a79): Hover and Focused identical on Selected=False apart from ring.
- Outer ring is calc(borderwidth-2 * 2) = 4px; matches Figma value, composed from a token (note only).

## Verdict
5 rows: Default, Hover, Focused, Behaviour Passed; Disabled Failed. Development -> To be fixed.
