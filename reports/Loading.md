# Loading QA report (2026-10-20)

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (PR #55, d15b3a4)
Figma: MWuaFZQ58G4WvtbCyeaE1X, set 212:690, Step=1..7 (212:689, 688, 687, 685, 686, 684, 683), each 48x48.

## Matrix (from Figma, read live via use_figma)
All 7 Figma variants have a story (components-loading--step-1..7) plus Auto-play (code-added). No missing, no dead stories.

Figma content per step (dots 8x8 at x=8/20/32; fills color/bg/inverse = #2B211B dark, color/bg/surfaceSecondary = #F3E8D6):

| Step | Figma dark dot | Figma lift | Staging dark dot | Staging lift | Result |
|---|---|---|---|---|---|
| 1 | dot 1, y=20 | none | dot 1, y=10 | -10px | FAIL |
| 2 | dot 1, y=10 | yes | dot 1, y=10 | -10px | pass |
| 3 | dot 1, y=20 | none | dot 1, y=10 | -10px | FAIL |
| 4 | dot 2, y=10 | yes | dot 2, y=10 | -10px | pass |
| 5 | dot 2, y=20 | none | dot 2, y=10 | -10px | FAIL |
| 6 | dot 3, y=10 | yes | dot 3, y=10 | -10px | pass |
| 7 | dot 3, y=20 | none | dot 3, y=10 | -10px | FAIL |

Pattern in Figma: rest, lift, rest, lift, rest, lift, rest. The engineer note "raised dot = dot 1 for steps 1-3, dot 2 for 4-5, dot 3 for 6-7, copied as-is" is a misreading: Figma lifts only on steps 2, 4, 6. Steps 1, 3, 5, 7 are the dark dot at rest on the baseline. This is an engineer defect (Figma is unambiguous).

## Measured (all steps, from computed style in browser)
- Container 48x48, dots 8x8 at x=8/20/32, rest y=20, circle radius, in every step: matches Figma.
- Colours: dark rgb(43,33,27) = color/bg/inverse; light rgb(243,232,214) = color/bg/surfaceSecondary: matches Figma bindings.
- CSS uses only tokens: --spacing-6xl (48), --spacing-sm (8), --spacing-base (gap 4), --borderradius-circle, --color-bg-inverse, --color-bg-surfacesecondary. No raw hex/px except the lift prop value.
- a11y: role=status, aria-label=Loading, data-step. No fonts involved (no text), so no font-load check needed.

## Auto-play
- Animation is wired (3 keyframe sets, period 7 x stepDuration = 1050ms at 150ms), and reduced-motion rule sets animation none.
- The pane's animation clock was frozen (document.timeline.currentTime stayed 0, even a control element.animate did not advance), so real-time cycling could not be watched. Instead I paused the animations and seeked to the middle of each step. Result: dot 1 up for steps 1-3, dot 2 up for 4-5, dot 3 up for 6-7. The cycle works but reproduces the same misreading: no rest frames, so it does not match the Figma 1..7 sequence (FAIL, Interaction).
- Reduced motion: not emulated; verified by reading the stylesheet rule only.

## Engineer's questions
- Dot 8, gap 4, canvas 48 unbound in Figma, equal to spacing tokens: acceptable, not a defect.
- 10px lift has no token: real design gap (Figma uses y=10 vs y=20, unbound). Report to design.
- No motion tokens: real design gap; stepDuration prop is a reasonable workaround.
- Required lift / stepDuration props: API question. Consumers must pass both or the lift does nothing and autoPlay does not run. Suggest defaults (10px, 150ms) or tokens once design supplies them.
- Set frame purple stroke and radius 5: canvas styling of the component set (stroke is a plain unbound purple, no variable). Decorative, ignored correctly.

## Verdict
4 Staging Testing rows: 2 Passed (Step 2/4/6; geometry, tokens, a11y), 2 Failed (Step 1/3/5/7 resting dot; Auto-play). Development -> To be fixed.

Screenshots: reports/Loading/step-1.png ... step-7.png (staging, headless Chrome). Not attached to Airtable rows (no upload route in this toolset).

---

# Re-test 2026-10-20 (Fixed, PR #58, commit 18c3146)

Staging: https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app. Figma 212:690 re-read live (read-only, use_figma).

## Steps 1-7, measured on staging (bounding boxes inside role=status, 48x48)
| Step | Dark dot | Dark dot y | Other dots y | Classes | Figma | Result |
|---|---|---|---|---|---|---|
| 1 | dot 1 | 20 | 20 | --active | rest | PASS |
| 2 | dot 1 | 10 | 20 | --active --raised | lift | PASS |
| 3 | dot 1 | 20 | 20 | --active | rest | PASS |
| 4 | dot 2 | 10 | 20 | --active --raised | lift | PASS |
| 5 | dot 2 | 20 | 20 | --active | rest | PASS |
| 6 | dot 3 | 10 | 20 | --active --raised | lift | PASS |
| 7 | dot 3 | 20 | 20 | --active | rest | PASS |

Dots 8x8 at x=8/20/32; dark rgb(43,33,27) = color/bg/inverse; light rgb(243,232,214) = color/bg/surfaceSecondary; role=status, aria-label=Loading. All as Figma. Regression: no previously passing case broke.

## Auto-play
Deployed keyframes: dot-1 rest 0-14.2%, lift 14.3-28.5%, rest 28.6-42.8%, then light; dot-2 light to 42.8%, lift 42.9-57.1%, rest 57.2-71.4%, then light; dot-3 light to 71.4%, lift 71.5-85.7%, rest to 100%. Paused all 3 animations and seeked to the middle of each 1/7 of the 1050ms period: dark dot y = 20,10,20,10,20,10,20 on steps 1-7, dot order 1,1,1,2,2,3,3. Matches Figma. Pane clock is frozen, so real-time playback was not watched; verified by seeking.
Reduced motion: stylesheet rule `.cc-loading[data-autoplay="true"] .cc-loading__dot { animation: none }` inside @media (prefers-reduced-motion: reduce); not emulated.

## Verdict
Both rows (Steps 1,3,5,7; Auto-play) -> Passed. 4/4 Loading rows Passed. No new screenshots (measurements only; step-1..7.png from the first run unchanged). Design gaps from the first run (10px lift and motion tokens unbound) remain open.
