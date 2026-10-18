# QA report: Button / Primary

- **Run:** 2026-10-18, one-time full first-test pass on staging, approved by the human in chat. Why: the 28 earlier Staging Testing rows were deleted by accident and could not be restored, so the registry had no test evidence. `Development` read `Completed` before this run. That is not a normal QA wake.
- **Tested build:** the `Staging Storybook` cell, https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (branch `staging`, head `e485ccb`). `src/components/Button/` on `origin/staging` is identical to the local `component/button` checkout. I tested the deployed URL, not a local build.
- **Staging check:** `<base>/index.json` returned 200 and parsed. It lists 14 Button entries: the docs page, Playground, and 12 sheet stories. This is the real Storybook, not a Vercel login page.
- **Figma:** [Button / Primary, 66:459](https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=66-459), file `MWuaFZQ58G4WvtbCyeaE1X`
- **Tester:** QA agent. I did not build this component. I changed nothing in `src/`.

## Verdict

| | Cases |
|---|---|
| Expected matrix, from Figma `get_metadata` on 66:459 | 300 |
| Passed | 300 |
| Failed | 0 |
| Staging Testing rows written, linked to Button / Primary | 300 (all `Passed`) |

No findings go back to the Engineer. These are test results, not a release decision. A human has the final say.

## How each case was checked

1. **The matrix came from Figma, not the story file.** `get_metadata` on 66:459 returned 300 variants: 5 State × 5 Icon-style × 2 Shape × 3 Size × 2 Type. I also ran a read-only `use_figma` script (no writes) over all 300 to read each variant's bindings. Every (Type, State) group binds the same fill, stroke, text and icon variables.
   - **Default fill:** `color/bg/primary/idle`, `hovered`, `pressed`, `focused`, and `color/bg/disabled`. No stroke.
   - **Outline fill:** none for Default and Disable, `color/bg/primary/light` for Hover and Focus, `color/bg/primary/lightHovered` for Press.
   - **Outline stroke:** 1px inside, `color/border/brand/default`. Press uses `color/border/brand/bold` and Disable uses `color/border/secondary`.
   - **Text and icons:** `color/text|icon/inverse` (Default type) or `/brand` (Outline type). Every Disable variant uses `/disabled`.
   - **Radius:** `borderRadius/sm` (Rounded) or `borderRadius/circle` (Pill). Icon slots use `borderRadius/xs`.
   - **Spacing:** padding `spacing/sm` × `spacing/md`, gap `spacing/sm`.
   - **Height:** `size/button/sm|md|lg` for 32, 48 and 56. Icon only also binds its width to the same token.
   - **Type:** Body small (Karla 400 14/22) at 32, Label large (Inter 500 16/26) at 48 and 56.
   - **Icons:** 16px at 32 and 24px at 48 and 56. Icon only at 56 uses 32px.
   - **Focus:** two drop shadows, spread 2 `color/bg/base` and spread 4 `color/border/focus`.
2. **The stories were reconciled with Figma.** There are 12 sheet stories × 25 `[data-matrix]` cells = 300, matching the 300 variants one to one. No case is missing. Playground has no Figma row. It is a controls story, not dead code.
3. **Fonts were confirmed before any width was measured.** I measured `Label Hamburgefonstiv` on a canvas against a bogus family:
   - **Inter 500 16px:** 177.84 vs 152.12, so Inter was loaded.
   - **Karla 400 14px:** the first read gave 133.10 vs 133.10, so Karla was *not yet loaded* on the 56 sheet, which never uses it. After `document.fonts.load('400 14px Karla')` it read 148.57 vs 133.10. The measuring script loads both fonts and awaits `document.fonts.ready` in every story frame before it reads anything.
4. **All 300 cases were measured on staging.** One script opened each sheet story as a same-origin iframe from the staging host. For every cell it compared computed styles against the computed value of the CSS token named by the Figma binding:
   - background, border width and colour, radius, `box-shadow` (the ring on Focus, `none` elsewhere)
   - height (exact), width (±1.5px)
   - padding-top, and padding-left plus border (= `--spacing-md`)
   - label colour, family, weight, size, line height; container gap
   - icon count, slot (leading/trailing), icon box size, slot radius, path stroke colour; Icon only centring (±0.5px)
   - the `disabled` attribute; `aria-label` on Icon only

   **Result: 0 mismatches in 300.** I checked that the comparisons were not vacuous. All 27 tokens used resolve on `:root` (for example `--color-border-brand-bold` = `#c1633d`, `--borderradius-circle` = 1000px, `--size-button-lg` = 56px), and the measured widths differ by Icon-style and Size as Figma says.
5. **States were driven, not only rendered.** I used the unpinned cells of the Outline·Pill·56 sheet on staging.
   - **Hover:** a real pointer on Default·Icon only gave `:hover` true and background `rgb(246,221,209)` = `--color-bg-primary-light`. Pass.
   - **Focus:** I clicked blank page, then pressed Tab once. Focus landed on Default·Both icons with `:focus-visible` true and ring `rgb(251,243,231) 0 0 0 2px, rgb(193,99,61) 0 0 0 4px` (`--color-bg-base`, `--color-border-focus`). Pass.
   - **Tab order:** Tab ×20 more visited 20 distinct enabled buttons and wrapped. 0 of the disabled buttons took focus. Pass.
   - **Activation:** Enter and Space on the focused button each fired `click` once. Pass.
   - **Disable:** a real click on Disable·Icon only fired 0 handlers. Under hover it stayed `transparent` with border `--color-border-secondary` and cursor `not-allowed`. Pass.
   - **Press:** checked only through the pinned `state="Press"` rows. The browser tools cannot hold a pointer down, so the real `:active` look was **not driven**.
   - **Loading:** Figma has no Loading state and the component has none, so there was nothing to test.
6. **Tokens:** `Button.css` contains no raw hex, rgb or font values. The only `px` text is in a comment.

**Width tolerance:** labelled buttons render 0.34px narrower than Figma at Size 32 and 0.55px narrower at 48 and 56, by the same amount on every case. That is Figma and Chrome measuring text differently, not a component defect.

## Findings

None. No case failed.

## Notes for a human (not engineering findings)

- **Registry gap: the `State` field has no option for Press.** Its options include `hovered`, `focus`, `disabled` and `idle`, but nothing for pressed. The 60 Press rows have `State` empty, and their `Context` says why. I did not add an option because I don't own the schema. If a human adds `pressed`, those 60 rows can be tagged.
- **Registry Flag 5 still shows.** After this run, `Staging Passed Tests` reads `0` while all 300 rows are `Passed`. `Total Staging Tests` and `Staging Passed Count` both read 300, and `Synchronization %` reads 100%. These are Computed columns, so I am reporting this, not changing it.
- **Hovered and focused look the same.** `color/bg/primary/focused` and `color/bg/primary/hovered` resolve to the same value (`#a45230`) in the shipped mode. Figma binds different variables and the code uses the matching tokens, so this is not a defect. It is a design choice to confirm.
- **Design gaps carried from the previous report, unchanged:**
  - the icon frame sizes (16/24/32) and the plus stroke width are unbound in Figma
  - the focus-ring spreads (2 and 4) are unbound
  - Outline has no fill token, so the code uses `transparent`

## Screenshots (`reports/Button/`, all from the staging URL)

| File | What |
|---|---|
| staging-{Default,Hover,Press,Focus,Disable}-Default-Rounded-56.png | One state row each, all 5 icon styles, Default type |
| staging-{Default,Hover,Press,Focus,Disable}-Outline-Pill-56.png | One state row each, all 5 icon styles, Outline type |
| staging-real-hover-IconOnly-Outline-Pill-56.png | Real pointer hover on Default·Icon only |
| staging-real-tab-focus-Outline-Pill-56.png | Real Tab focus ring on Default·Both icons |

No failure screenshots, because nothing failed. Screenshots from the 2026-10-17 run in `reports/*.png` are kept and were not re-used as evidence.

## Matrix and registry rows (all 300)

Figma W×H comes from `get_metadata`. Rendered W×H is `getBoundingClientRect` on staging. Each row's Expected Results cell names the tokens.

| Type | Shape | Size | State | Icon-style | Figma node | Figma W×H | Rendered W×H | Icons | Result | Staging Testing record |
|---|---|---|---|---|---|---|---|---|---|---|
| Default | Rounded | 32 | Default | Both icons | 66:458 | 106×32 | 105.66×32 | 2×16 | Passed | recmIjn88EEtuRh0Q |
| Default | Rounded | 32 | Default | none | 67:522 | 58×32 | 57.66×32 | – | Passed | recGTrF2cYmqqxkgd |
| Default | Rounded | 32 | Default | leading icon | 67:563 | 82×32 | 81.66×32 | 1×16 | Passed | recQEDIsl2Ku5FCa4 |
| Default | Rounded | 32 | Default | trailing icon | 67:634 | 82×32 | 81.66×32 | 1×16 | Passed | recejBYcIjzHXYKZK |
| Default | Rounded | 32 | Default | Icon only | 67:666 | 32×32 | 32×32 | 1×16 | Passed | recLRSBXjnaHwrmN2 |
| Default | Rounded | 32 | Hover | Both icons | 66:480 | 106×32 | 105.66×32 | 2×16 | Passed | recq7nLFkvwlg7x9w |
| Default | Rounded | 32 | Hover | none | 67:531 | 58×32 | 57.66×32 | – | Passed | rec8EThamOpm99tUp |
| Default | Rounded | 32 | Hover | leading icon | 67:568 | 82×32 | 81.66×32 | 1×16 | Passed | recOCNMjB6kA1wI4f |
| Default | Rounded | 32 | Hover | trailing icon | 67:629 | 82×32 | 81.66×32 | 1×16 | Passed | rec0NaDYpKTdpdAQh |
| Default | Rounded | 32 | Hover | Icon only | 67:661 | 32×32 | 32×32 | 1×16 | Passed | recUhi3ma0wsliGsI |
| Default | Rounded | 32 | Press | Both icons | 67:679 | 106×32 | 105.66×32 | 2×16 | Passed | recZkByqyjH5mdL0b |
| Default | Rounded | 32 | Press | none | 67:684 | 58×32 | 57.66×32 | – | Passed | recyvxsRRMkvvASY3 |
| Default | Rounded | 32 | Press | leading icon | 67:699 | 82×32 | 81.66×32 | 1×16 | Passed | recPc3Kz3wxeiu10k |
| Default | Rounded | 32 | Press | trailing icon | 67:689 | 82×32 | 81.66×32 | 1×16 | Passed | recWgVzVS1bbUXTjS |
| Default | Rounded | 32 | Press | Icon only | 67:694 | 32×32 | 32×32 | 1×16 | Passed | recyqCbTENQxr4qN6 |
| Default | Rounded | 32 | Focus | Both icons | 66:490 | 106×32 | 105.66×32 | 2×16 | Passed | recOuIZ3kvycPgXjt |
| Default | Rounded | 32 | Focus | none | 67:540 | 58×32 | 57.66×32 | – | Passed | recIju8D5NX0z3I9C |
| Default | Rounded | 32 | Focus | leading icon | 67:573 | 82×32 | 81.66×32 | 1×16 | Passed | recv9TzrKJ8DHgkMg |
| Default | Rounded | 32 | Focus | trailing icon | 67:624 | 82×32 | 81.66×32 | 1×16 | Passed | rechxKhLvwtBfoGdv |
| Default | Rounded | 32 | Focus | Icon only | 67:656 | 32×32 | 32×32 | 1×16 | Passed | recUjz6Nd947Zal4A |
| Default | Rounded | 32 | Disable | Both icons | 66:502 | 106×32 | 105.66×32 | 2×16 | Passed | recm4O288pN4XzEAK |
| Default | Rounded | 32 | Disable | none | 67:549 | 58×32 | 57.66×32 | – | Passed | recHwvQmY0NYhB5Hr |
| Default | Rounded | 32 | Disable | leading icon | 67:578 | 82×32 | 81.66×32 | 1×16 | Passed | recYhEsqDaX6dzC95 |
| Default | Rounded | 32 | Disable | trailing icon | 67:619 | 82×32 | 81.66×32 | 1×16 | Passed | recWMZjhpH0hih0rd |
| Default | Rounded | 32 | Disable | Icon only | 67:651 | 32×32 | 32×32 | 1×16 | Passed | recbfKWuGMwD4El3l |
| Default | Rounded | 48 | Default | Both icons | 101:907 | 130×48 | 129.45×48 | 2×24 | Passed | recWwTfz5XkPPVDJE |
| Default | Rounded | 48 | Default | none | 101:897 | 66×48 | 65.45×48 | – | Passed | recYsdnUFetrYs4F7 |
| Default | Rounded | 48 | Default | leading icon | 101:867 | 98×48 | 97.45×48 | 1×24 | Passed | recjibCfNH8UZgkM6 |
| Default | Rounded | 48 | Default | trailing icon | 101:887 | 98×48 | 97.45×48 | 1×24 | Passed | recwOwdZsFKUwB1oA |
| Default | Rounded | 48 | Default | Icon only | 101:877 | 48×48 | 48×48 | 1×24 | Passed | rec3uBNLGGpPmNaac |
| Default | Rounded | 48 | Hover | Both icons | 101:857 | 130×48 | 129.45×48 | 2×24 | Passed | recvOg1pVPgAcOdEH |
| Default | Rounded | 48 | Hover | none | 101:837 | 66×48 | 65.45×48 | – | Passed | recH3rK3akLugnCVU |
| Default | Rounded | 48 | Hover | leading icon | 101:777 | 98×48 | 97.45×48 | 1×24 | Passed | rec9n5aE1SRe0Ik6j |
| Default | Rounded | 48 | Hover | trailing icon | 101:817 | 98×48 | 97.45×48 | 1×24 | Passed | recq4mV0fPlNmeIsE |
| Default | Rounded | 48 | Hover | Icon only | 101:797 | 48×48 | 48×48 | 1×24 | Passed | rec0l0ARbtvctDxE3 |
| Default | Rounded | 48 | Press | Both icons | 101:847 | 130×48 | 129.45×48 | 2×24 | Passed | recfQUqI6bq2cd3ta |
| Default | Rounded | 48 | Press | none | 101:827 | 66×48 | 65.45×48 | – | Passed | recTkkXkAVcKDNEnH |
| Default | Rounded | 48 | Press | leading icon | 101:767 | 98×48 | 97.45×48 | 1×24 | Passed | recNXCqEVDhBD5g8R |
| Default | Rounded | 48 | Press | trailing icon | 101:807 | 98×48 | 97.45×48 | 1×24 | Passed | recKAOayEjCj66DSI |
| Default | Rounded | 48 | Press | Icon only | 101:787 | 48×48 | 48×48 | 1×24 | Passed | rec8oS5VZrbqx1W6D |
| Default | Rounded | 48 | Focus | Both icons | 101:757 | 130×48 | 129.45×48 | 2×24 | Passed | recGlUQ6koZVEmo9l |
| Default | Rounded | 48 | Focus | none | 101:747 | 66×48 | 65.45×48 | – | Passed | recwf26GE3Aw112F7 |
| Default | Rounded | 48 | Focus | leading icon | 101:717 | 98×48 | 97.45×48 | 1×24 | Passed | recT3SMvVzc226hk2 |
| Default | Rounded | 48 | Focus | trailing icon | 101:737 | 98×48 | 97.45×48 | 1×24 | Passed | recESK3tVO2JMmVlB |
| Default | Rounded | 48 | Focus | Icon only | 101:727 | 48×48 | 48×48 | 1×24 | Passed | recNhqftIWroOszWD |
| Default | Rounded | 48 | Disable | Both icons | 101:707 | 130×48 | 129.45×48 | 2×24 | Passed | recoHpssPO2t7xzMX |
| Default | Rounded | 48 | Disable | none | 101:697 | 66×48 | 65.45×48 | – | Passed | recImPKuWTzXkdRAi |
| Default | Rounded | 48 | Disable | leading icon | 101:667 | 98×48 | 97.45×48 | 1×24 | Passed | rec4WeJQcYKbGBLyh |
| Default | Rounded | 48 | Disable | trailing icon | 101:687 | 98×48 | 97.45×48 | 1×24 | Passed | rec7W7sdWWlEF87zj |
| Default | Rounded | 48 | Disable | Icon only | 101:677 | 48×48 | 48×48 | 1×24 | Passed | recjiK3QejGDjVNYS |
| Default | Rounded | 56 | Default | Both icons | 101:1039 | 130×56 | 129.45×56 | 2×24 | Passed | rec5Rw0joS5jeEF55 |
| Default | Rounded | 56 | Default | none | 101:1049 | 66×56 | 65.45×56 | – | Passed | reckFdogG1lX4na0Q |
| Default | Rounded | 56 | Default | leading icon | 101:1079 | 98×56 | 97.45×56 | 1×24 | Passed | recUCapJAOg8uzhXe |
| Default | Rounded | 56 | Default | trailing icon | 101:1059 | 98×56 | 97.45×56 | 1×24 | Passed | recjnl6kouWpG6UCL |
| Default | Rounded | 56 | Default | Icon only | 101:1069 | 56×56 | 56×56 | 1×32 | Passed | recXbcm9j6wmSL1LN |
| Default | Rounded | 56 | Hover | Both icons | 101:1089 | 130×56 | 129.45×56 | 2×24 | Passed | recep0HcuuOh1pA1d |
| Default | Rounded | 56 | Hover | none | 101:1109 | 66×56 | 65.45×56 | – | Passed | recO1ryaLdijnH5WK |
| Default | Rounded | 56 | Hover | leading icon | 101:1169 | 98×56 | 97.45×56 | 1×24 | Passed | recUsZxuCNKoXDlzY |
| Default | Rounded | 56 | Hover | trailing icon | 101:1129 | 98×56 | 97.45×56 | 1×24 | Passed | recn19zSj5v3NQHu2 |
| Default | Rounded | 56 | Hover | Icon only | 101:1149 | 56×56 | 56×56 | 1×32 | Passed | recFX2Bc6RR8kRQLR |
| Default | Rounded | 56 | Press | Both icons | 101:1099 | 130×56 | 129.45×56 | 2×24 | Passed | rec2CBZW6towZAZov |
| Default | Rounded | 56 | Press | none | 101:1119 | 66×56 | 65.45×56 | – | Passed | recANWxOv3kyWB3uH |
| Default | Rounded | 56 | Press | leading icon | 101:1179 | 98×56 | 97.45×56 | 1×24 | Passed | rec74ywfj0sx0jLD3 |
| Default | Rounded | 56 | Press | trailing icon | 101:1139 | 98×56 | 97.45×56 | 1×24 | Passed | recF1BH38Sj8R91Kb |
| Default | Rounded | 56 | Press | Icon only | 101:1159 | 56×56 | 56×56 | 1×32 | Passed | recVq7HmWeTMwVg0K |
| Default | Rounded | 56 | Focus | Both icons | 101:1189 | 130×56 | 129.45×56 | 2×24 | Passed | rec8ZQZHZnSphIBfK |
| Default | Rounded | 56 | Focus | none | 101:1199 | 66×56 | 65.45×56 | – | Passed | recELSJn6721ewrX7 |
| Default | Rounded | 56 | Focus | leading icon | 101:1229 | 98×56 | 97.45×56 | 1×24 | Passed | reclPkU6E6IKS1Z6D |
| Default | Rounded | 56 | Focus | trailing icon | 101:1209 | 98×56 | 97.45×56 | 1×24 | Passed | recIfeMPRxI7QMCoM |
| Default | Rounded | 56 | Focus | Icon only | 101:1219 | 56×56 | 56×56 | 1×32 | Passed | recNyN8k21Hztddrp |
| Default | Rounded | 56 | Disable | Both icons | 101:1239 | 130×56 | 129.45×56 | 2×24 | Passed | recedyAdhyefjP1ep |
| Default | Rounded | 56 | Disable | none | 101:1249 | 66×56 | 65.45×56 | – | Passed | rect8uFrwGnoTi9Jd |
| Default | Rounded | 56 | Disable | leading icon | 101:1279 | 98×56 | 97.45×56 | 1×24 | Passed | recTy9Gi8I9I7rQGA |
| Default | Rounded | 56 | Disable | trailing icon | 101:1259 | 98×56 | 97.45×56 | 1×24 | Passed | recPtLwqTmdaVIllx |
| Default | Rounded | 56 | Disable | Icon only | 101:1269 | 56×56 | 56×56 | 1×32 | Passed | recTtSWJiVjKUaTty |
| Default | Pill | 32 | Default | Both icons | 79:833 | 106×32 | 105.66×32 | 2×16 | Passed | rec0FZO8Fnt9yiNOE |
| Default | Pill | 32 | Default | none | 79:838 | 58×32 | 57.66×32 | – | Passed | recxIXATzIMFIVIax |
| Default | Pill | 32 | Default | leading icon | 79:853 | 82×32 | 81.66×32 | 1×16 | Passed | rec04kVhksWyy5wfl |
| Default | Pill | 32 | Default | trailing icon | 79:843 | 82×32 | 81.66×32 | 1×16 | Passed | recXPElOq2TRuHqM8 |
| Default | Pill | 32 | Default | Icon only | 79:848 | 32×32 | 32×32 | 1×16 | Passed | recJD9Ae6FBcH0Chs |
| Default | Pill | 32 | Hover | Both icons | 79:858 | 106×32 | 105.66×32 | 2×16 | Passed | recMN81WAvFUd8CDJ |
| Default | Pill | 32 | Hover | none | 79:868 | 58×32 | 57.66×32 | – | Passed | recECZWWxOu3uSSKf |
| Default | Pill | 32 | Hover | leading icon | 79:898 | 82×32 | 81.66×32 | 1×16 | Passed | recl0774zNACeK48K |
| Default | Pill | 32 | Hover | trailing icon | 79:878 | 82×32 | 81.66×32 | 1×16 | Passed | recjhXWm5ZlBF0yPe |
| Default | Pill | 32 | Hover | Icon only | 79:888 | 32×32 | 32×32 | 1×16 | Passed | recYXAWXtWc6Vjiri |
| Default | Pill | 32 | Press | Both icons | 79:863 | 106×32 | 105.66×32 | 2×16 | Passed | reckfWuNHdnAOi4Qj |
| Default | Pill | 32 | Press | none | 79:873 | 58×32 | 57.66×32 | – | Passed | recieNCcezDucJaTR |
| Default | Pill | 32 | Press | leading icon | 79:903 | 82×32 | 81.66×32 | 1×16 | Passed | recHnLDfjiB3pHzrc |
| Default | Pill | 32 | Press | trailing icon | 79:883 | 82×32 | 81.66×32 | 1×16 | Passed | rec9s6N806JTKMeMh |
| Default | Pill | 32 | Press | Icon only | 79:893 | 32×32 | 32×32 | 1×16 | Passed | recBRFi7OIaLNM0bB |
| Default | Pill | 32 | Focus | Both icons | 79:908 | 106×32 | 105.66×32 | 2×16 | Passed | rec4xVFUaVg3H8bjt |
| Default | Pill | 32 | Focus | none | 79:913 | 58×32 | 57.66×32 | – | Passed | recCQSp9u7VVLRqjN |
| Default | Pill | 32 | Focus | leading icon | 79:928 | 82×32 | 81.66×32 | 1×16 | Passed | recmfg6Zaa2oQqYdz |
| Default | Pill | 32 | Focus | trailing icon | 79:918 | 82×32 | 81.66×32 | 1×16 | Passed | recORyMVm8toPPPcc |
| Default | Pill | 32 | Focus | Icon only | 79:923 | 32×32 | 32×32 | 1×16 | Passed | recu3yF3O4Lv1BFUk |
| Default | Pill | 32 | Disable | Both icons | 79:933 | 106×32 | 105.66×32 | 2×16 | Passed | rec27qufksymnumHQ |
| Default | Pill | 32 | Disable | none | 79:938 | 58×32 | 57.66×32 | – | Passed | recdvGHaNEOG9xZds |
| Default | Pill | 32 | Disable | leading icon | 79:953 | 82×32 | 81.66×32 | 1×16 | Passed | recyZSzYLgJGQJtLD |
| Default | Pill | 32 | Disable | trailing icon | 79:943 | 82×32 | 81.66×32 | 1×16 | Passed | recd21xsDBW42T8Yg |
| Default | Pill | 32 | Disable | Icon only | 79:948 | 32×32 | 32×32 | 1×16 | Passed | rechjMC4LWc1gd4sf |
| Default | Pill | 48 | Default | Both icons | 101:902 | 130×48 | 129.45×48 | 2×24 | Passed | recOQ13dNVv7GLUPc |
| Default | Pill | 48 | Default | none | 101:892 | 66×48 | 65.45×48 | – | Passed | rec2l33MNz9McGyIq |
| Default | Pill | 48 | Default | leading icon | 101:862 | 98×48 | 97.45×48 | 1×24 | Passed | recI9PaGGTHoYj1uh |
| Default | Pill | 48 | Default | trailing icon | 101:882 | 98×48 | 97.45×48 | 1×24 | Passed | recvMTmw8v79VXlqW |
| Default | Pill | 48 | Default | Icon only | 101:872 | 48×48 | 48×48 | 1×24 | Passed | recAiBRRWosnEEEZK |
| Default | Pill | 48 | Hover | Both icons | 101:852 | 130×48 | 129.45×48 | 2×24 | Passed | reciiz1hGxXniMxqU |
| Default | Pill | 48 | Hover | none | 101:832 | 66×48 | 65.45×48 | – | Passed | recDYPXZg13CM184x |
| Default | Pill | 48 | Hover | leading icon | 101:772 | 98×48 | 97.45×48 | 1×24 | Passed | recRwnrPZERkqviBm |
| Default | Pill | 48 | Hover | trailing icon | 101:812 | 98×48 | 97.45×48 | 1×24 | Passed | rec4NSyFIQDyrhqDP |
| Default | Pill | 48 | Hover | Icon only | 101:792 | 48×48 | 48×48 | 1×24 | Passed | reco8djym2quDiEDo |
| Default | Pill | 48 | Press | Both icons | 101:842 | 130×48 | 129.45×48 | 2×24 | Passed | recLX3dB5T1amAlF9 |
| Default | Pill | 48 | Press | none | 101:822 | 66×48 | 65.45×48 | – | Passed | recZ1kpqh2s7NHOhZ |
| Default | Pill | 48 | Press | leading icon | 101:762 | 98×48 | 97.45×48 | 1×24 | Passed | recV3UdAU7HbFMg5z |
| Default | Pill | 48 | Press | trailing icon | 101:802 | 98×48 | 97.45×48 | 1×24 | Passed | rec2sMmRdKbgzoQna |
| Default | Pill | 48 | Press | Icon only | 101:782 | 48×48 | 48×48 | 1×24 | Passed | recm2lkE5hJno6HpN |
| Default | Pill | 48 | Focus | Both icons | 101:752 | 130×48 | 129.45×48 | 2×24 | Passed | rec4ImhLcmVJhy96K |
| Default | Pill | 48 | Focus | none | 101:742 | 66×48 | 65.45×48 | – | Passed | recL2uiRQMjaktRQi |
| Default | Pill | 48 | Focus | leading icon | 101:712 | 98×48 | 97.45×48 | 1×24 | Passed | rectdn0WZr9CTI5Mo |
| Default | Pill | 48 | Focus | trailing icon | 101:732 | 98×48 | 97.45×48 | 1×24 | Passed | recZMkcgT7fqAOu6C |
| Default | Pill | 48 | Focus | Icon only | 101:722 | 48×48 | 48×48 | 1×24 | Passed | recEpf2fxLmvnBC1D |
| Default | Pill | 48 | Disable | Both icons | 101:702 | 130×48 | 129.45×48 | 2×24 | Passed | recA0rIJ8u3FrliEL |
| Default | Pill | 48 | Disable | none | 101:692 | 66×48 | 65.45×48 | – | Passed | rec3XeCZ7Zi6FuBnj |
| Default | Pill | 48 | Disable | leading icon | 101:662 | 98×48 | 97.45×48 | 1×24 | Passed | rec93DRsoJr5xv27T |
| Default | Pill | 48 | Disable | trailing icon | 101:682 | 98×48 | 97.45×48 | 1×24 | Passed | recrcLX0BImBRtoYp |
| Default | Pill | 48 | Disable | Icon only | 101:672 | 48×48 | 48×48 | 1×24 | Passed | reccsaRtHQ4AKVQSd |
| Default | Pill | 56 | Default | Both icons | 101:1044 | 130×56 | 129.45×56 | 2×24 | Passed | recTP12664urNPpw0 |
| Default | Pill | 56 | Default | none | 101:1054 | 66×56 | 65.45×56 | – | Passed | rec2D9lmVsffL8AOz |
| Default | Pill | 56 | Default | leading icon | 101:1084 | 98×56 | 97.45×56 | 1×24 | Passed | recogq0zrNxMJFFXP |
| Default | Pill | 56 | Default | trailing icon | 101:1064 | 98×56 | 97.45×56 | 1×24 | Passed | rec9prcmpSipNFqXY |
| Default | Pill | 56 | Default | Icon only | 101:1074 | 56×56 | 56×56 | 1×32 | Passed | recuQBNNH0A1MlFVR |
| Default | Pill | 56 | Hover | Both icons | 101:1094 | 130×56 | 129.45×56 | 2×24 | Passed | recWsPMf8F9ZCB1Tm |
| Default | Pill | 56 | Hover | none | 101:1114 | 66×56 | 65.45×56 | – | Passed | recSSyg2cvlbLUqAu |
| Default | Pill | 56 | Hover | leading icon | 101:1174 | 98×56 | 97.45×56 | 1×24 | Passed | rectGm4cXcDDafe7R |
| Default | Pill | 56 | Hover | trailing icon | 101:1134 | 98×56 | 97.45×56 | 1×24 | Passed | recjRcIay7A06YI4P |
| Default | Pill | 56 | Hover | Icon only | 101:1154 | 56×56 | 56×56 | 1×32 | Passed | recblIOfAeAejd9s8 |
| Default | Pill | 56 | Press | Both icons | 101:1104 | 130×56 | 129.45×56 | 2×24 | Passed | recDDiplATXBMbzlG |
| Default | Pill | 56 | Press | none | 101:1124 | 66×56 | 65.45×56 | – | Passed | rec8E6tUZOu5Ayr9Q |
| Default | Pill | 56 | Press | leading icon | 101:1184 | 98×56 | 97.45×56 | 1×24 | Passed | recfzlDLKIAqC8U8e |
| Default | Pill | 56 | Press | trailing icon | 101:1144 | 98×56 | 97.45×56 | 1×24 | Passed | recolPCICV0EupKwW |
| Default | Pill | 56 | Press | Icon only | 101:1164 | 56×56 | 56×56 | 1×32 | Passed | recNoaiesn3pDWZf0 |
| Default | Pill | 56 | Focus | Both icons | 101:1194 | 130×56 | 129.45×56 | 2×24 | Passed | recgdoTHyuFGjhZlH |
| Default | Pill | 56 | Focus | none | 101:1204 | 66×56 | 65.45×56 | – | Passed | recm4hyulVodYl3Dd |
| Default | Pill | 56 | Focus | leading icon | 101:1234 | 98×56 | 97.45×56 | 1×24 | Passed | recrYagHlsetKegUX |
| Default | Pill | 56 | Focus | trailing icon | 101:1214 | 98×56 | 97.45×56 | 1×24 | Passed | recLfsguHBnkGiZbu |
| Default | Pill | 56 | Focus | Icon only | 101:1224 | 56×56 | 56×56 | 1×32 | Passed | rec1r9Yp9CWRIuTQ4 |
| Default | Pill | 56 | Disable | Both icons | 101:1244 | 130×56 | 129.45×56 | 2×24 | Passed | recaoKB0Kc7fHvV6u |
| Default | Pill | 56 | Disable | none | 101:1254 | 66×56 | 65.45×56 | – | Passed | reckoRriLcSU0CLnR |
| Default | Pill | 56 | Disable | leading icon | 101:1284 | 98×56 | 97.45×56 | 1×24 | Passed | recvbtbPOUQlWVncT |
| Default | Pill | 56 | Disable | trailing icon | 101:1264 | 98×56 | 97.45×56 | 1×24 | Passed | recfqhmOShk1DXMT7 |
| Default | Pill | 56 | Disable | Icon only | 101:1274 | 56×56 | 56×56 | 1×32 | Passed | recuXcoKyklTHEnwM |
| Outline | Rounded | 32 | Default | Both icons | 132:7068 | 106×32 | 105.66×32 | 2×16 | Passed | recB3gFxI6BOBy6cN |
| Outline | Rounded | 32 | Default | none | 132:7078 | 58×32 | 57.66×32 | – | Passed | recds7iGG80ANyEwy |
| Outline | Rounded | 32 | Default | leading icon | 132:7098 | 82×32 | 81.66×32 | 1×16 | Passed | recpPffnOuwPH6tok |
| Outline | Rounded | 32 | Default | trailing icon | 132:7086 | 82×32 | 81.66×32 | 1×16 | Passed | rectFSj9ljrYZZFow |
| Outline | Rounded | 32 | Default | Icon only | 132:7094 | 32×32 | 32×32 | 1×16 | Passed | recyV8Tnt8wmpSQqG |
| Outline | Rounded | 32 | Hover | Both icons | 132:7106 | 106×32 | 105.66×32 | 2×16 | Passed | reclE2DrRu5B5SkRq |
| Outline | Rounded | 32 | Hover | none | 132:7126 | 58×32 | 57.66×32 | – | Passed | recDWnOT3ICzQYXKQ |
| Outline | Rounded | 32 | Hover | leading icon | 132:7166 | 82×32 | 81.66×32 | 1×16 | Passed | recgVdV9F8j00e1Xj |
| Outline | Rounded | 32 | Hover | trailing icon | 132:7142 | 82×32 | 81.66×32 | 1×16 | Passed | reclQ7EW3Lwt2vuth |
| Outline | Rounded | 32 | Hover | Icon only | 132:7158 | 32×32 | 32×32 | 1×16 | Passed | recMB3ugpq1xqhdaU |
| Outline | Rounded | 32 | Press | Both icons | 132:7116 | 106×32 | 105.66×32 | 2×16 | Passed | rectN9sC1QxvoSYqD |
| Outline | Rounded | 32 | Press | none | 132:7134 | 58×32 | 57.66×32 | – | Passed | recOkqlabBQyDsYSS |
| Outline | Rounded | 32 | Press | leading icon | 132:7174 | 82×32 | 81.66×32 | 1×16 | Passed | recjPIsBHwgqqae4W |
| Outline | Rounded | 32 | Press | trailing icon | 132:7150 | 82×32 | 81.66×32 | 1×16 | Passed | recapwW1Va0DTE8Ir |
| Outline | Rounded | 32 | Press | Icon only | 132:7162 | 32×32 | 32×32 | 1×16 | Passed | recpzmxkWjKp3Gp7g |
| Outline | Rounded | 32 | Focus | Both icons | 132:7182 | 106×32 | 105.66×32 | 2×16 | Passed | recnAoPmmO4TQGBzc |
| Outline | Rounded | 32 | Focus | none | 132:7192 | 58×32 | 57.66×32 | – | Passed | rec3D8EXj9Hlw1m8R |
| Outline | Rounded | 32 | Focus | leading icon | 132:7212 | 82×32 | 81.66×32 | 1×16 | Passed | rect9AgMpOmgPwSMG |
| Outline | Rounded | 32 | Focus | trailing icon | 132:7200 | 82×32 | 81.66×32 | 1×16 | Passed | recmhY0MLcNR3ry0O |
| Outline | Rounded | 32 | Focus | Icon only | 132:7208 | 32×32 | 32×32 | 1×16 | Passed | recdwWrSPt4HE4ypj |
| Outline | Rounded | 32 | Disable | Both icons | 132:7220 | 106×32 | 105.66×32 | 2×16 | Passed | recegdbKKyYQzyDyh |
| Outline | Rounded | 32 | Disable | none | 132:7230 | 58×32 | 57.66×32 | – | Passed | recE0OB5UUOF5bMEW |
| Outline | Rounded | 32 | Disable | leading icon | 132:7250 | 82×32 | 81.66×32 | 1×16 | Passed | recozwEKIw97iI2p5 |
| Outline | Rounded | 32 | Disable | trailing icon | 132:7238 | 82×32 | 81.66×32 | 1×16 | Passed | recqGRm71GJXM6ogS |
| Outline | Rounded | 32 | Disable | Icon only | 132:7246 | 32×32 | 32×32 | 1×16 | Passed | recF4ZlxthJ4imTpg |
| Outline | Rounded | 48 | Default | Both icons | 132:7258 | 130×48 | 129.45×48 | 2×24 | Passed | recnwUsdgi3t3So63 |
| Outline | Rounded | 48 | Default | none | 132:7278 | 66×48 | 65.45×48 | – | Passed | recqhDYPvsOilkhvK |
| Outline | Rounded | 48 | Default | leading icon | 132:7320 | 98×48 | 97.45×48 | 1×24 | Passed | recyq1pX7cuSaWFsc |
| Outline | Rounded | 48 | Default | trailing icon | 132:7294 | 98×48 | 97.45×48 | 1×24 | Passed | rec8nrhMy39o19W4L |
| Outline | Rounded | 48 | Default | Icon only | 132:7312 | 48×48 | 48×48 | 1×24 | Passed | rec6PUPxezmaTUSDA |
| Outline | Rounded | 48 | Hover | Both icons | 132:7338 | 130×48 | 129.45×48 | 2×24 | Passed | recHctYmnuKKQvE3n |
| Outline | Rounded | 48 | Hover | none | 132:7378 | 66×48 | 65.45×48 | – | Passed | recuP3KuIvnHehRJ6 |
| Outline | Rounded | 48 | Hover | leading icon | 132:7462 | 98×48 | 97.45×48 | 1×24 | Passed | recNaBD3ILi78YBXN |
| Outline | Rounded | 48 | Hover | trailing icon | 132:7410 | 98×48 | 97.45×48 | 1×24 | Passed | recAgIcjJPRx9iaMR |
| Outline | Rounded | 48 | Hover | Icon only | 132:7446 | 48×48 | 48×48 | 1×24 | Passed | recOdu5TRsZrKb77t |
| Outline | Rounded | 48 | Press | Both icons | 132:7358 | 130×48 | 129.45×48 | 2×24 | Passed | rec4QMxc53gUbi0sA |
| Outline | Rounded | 48 | Press | none | 132:7394 | 66×48 | 65.45×48 | – | Passed | recXRPIxNKCfiLeE2 |
| Outline | Rounded | 48 | Press | leading icon | 132:7480 | 98×48 | 97.45×48 | 1×24 | Passed | recVyRyn7nDLgt4oH |
| Outline | Rounded | 48 | Press | trailing icon | 132:7428 | 98×48 | 97.45×48 | 1×24 | Passed | rec1D0jg28A0ILUBk |
| Outline | Rounded | 48 | Press | Icon only | 132:7454 | 48×48 | 48×48 | 1×24 | Passed | recFBl4j2UlQ0vttJ |
| Outline | Rounded | 48 | Focus | Both icons | 132:7498 | 130×48 | 129.45×48 | 2×24 | Passed | recdWcySlJZGp3RPE |
| Outline | Rounded | 48 | Focus | none | 132:7518 | 66×48 | 65.45×48 | – | Passed | recrX7jevWUgHCM2t |
| Outline | Rounded | 48 | Focus | leading icon | 132:7560 | 98×48 | 97.45×48 | 1×24 | Passed | recn9shpQQ7hQ6eKI |
| Outline | Rounded | 48 | Focus | trailing icon | 132:7534 | 98×48 | 97.45×48 | 1×24 | Passed | rec1fghZrn4n4Y8q2 |
| Outline | Rounded | 48 | Focus | Icon only | 132:7552 | 48×48 | 48×48 | 1×24 | Passed | recvHghxhxddD9sWp |
| Outline | Rounded | 48 | Disable | Both icons | 132:7578 | 130×48 | 129.45×48 | 2×24 | Passed | rec3BsgG30e3b2CxB |
| Outline | Rounded | 48 | Disable | none | 132:7598 | 66×48 | 65.45×48 | – | Passed | recWexuBCQfRzSvWK |
| Outline | Rounded | 48 | Disable | leading icon | 132:7640 | 98×48 | 97.45×48 | 1×24 | Passed | recvZh4JWC01ie3T8 |
| Outline | Rounded | 48 | Disable | trailing icon | 132:7614 | 98×48 | 97.45×48 | 1×24 | Passed | recyJwejrjNoxNfyr |
| Outline | Rounded | 48 | Disable | Icon only | 132:7632 | 48×48 | 48×48 | 1×24 | Passed | rec142tjFLhN0yV8S |
| Outline | Rounded | 56 | Default | Both icons | 132:7263 | 130×56 | 129.45×56 | 2×24 | Passed | recqhDKH2q8RHdYAv |
| Outline | Rounded | 56 | Default | none | 132:7282 | 66×56 | 65.45×56 | – | Passed | recvN3Q6oO9j2skf2 |
| Outline | Rounded | 56 | Default | leading icon | 132:7324 | 98×56 | 97.45×56 | 1×24 | Passed | receNEEvArKoVyLrI |
| Outline | Rounded | 56 | Default | trailing icon | 132:7298 | 98×56 | 97.45×56 | 1×24 | Passed | reca9g0NoDL06LsMF |
| Outline | Rounded | 56 | Default | Icon only | 132:7314 | 56×56 | 56×56 | 1×32 | Passed | recxkkCagYnRbvVIv |
| Outline | Rounded | 56 | Hover | Both icons | 132:7343 | 130×56 | 129.45×56 | 2×24 | Passed | recYAgJp8YiOE88u5 |
| Outline | Rounded | 56 | Hover | none | 132:7382 | 66×56 | 65.45×56 | – | Passed | recSvTMpRDTLJYji1 |
| Outline | Rounded | 56 | Hover | leading icon | 132:7466 | 98×56 | 97.45×56 | 1×24 | Passed | rec0WFvlbI4ctE1Ib |
| Outline | Rounded | 56 | Hover | trailing icon | 132:7414 | 98×56 | 97.45×56 | 1×24 | Passed | recAACXWhrgAfvVZl |
| Outline | Rounded | 56 | Hover | Icon only | 132:7448 | 56×56 | 56×56 | 1×32 | Passed | recKf4n5sYVOcvFor |
| Outline | Rounded | 56 | Press | Both icons | 132:7363 | 130×56 | 129.45×56 | 2×24 | Passed | recmz7kD5gnHlGzmx |
| Outline | Rounded | 56 | Press | none | 132:7398 | 66×56 | 65.45×56 | – | Passed | rec5fDZhpwXhMGbY6 |
| Outline | Rounded | 56 | Press | leading icon | 132:7484 | 98×56 | 97.45×56 | 1×24 | Passed | recC5IfTq5DE0vcRL |
| Outline | Rounded | 56 | Press | trailing icon | 132:7432 | 98×56 | 97.45×56 | 1×24 | Passed | recjc64qFrPQJmU1s |
| Outline | Rounded | 56 | Press | Icon only | 132:7456 | 56×56 | 56×56 | 1×32 | Passed | recG8pvKbx4riWH3P |
| Outline | Rounded | 56 | Focus | Both icons | 132:7503 | 130×56 | 129.45×56 | 2×24 | Passed | rec8OGI9vSM13qjAH |
| Outline | Rounded | 56 | Focus | none | 132:7522 | 66×56 | 65.45×56 | – | Passed | recU1StxFzlTnrXHJ |
| Outline | Rounded | 56 | Focus | leading icon | 132:7564 | 98×56 | 97.45×56 | 1×24 | Passed | recy78ChhBjr5JIan |
| Outline | Rounded | 56 | Focus | trailing icon | 132:7538 | 98×56 | 97.45×56 | 1×24 | Passed | recgOkbbjSB1Xrc4y |
| Outline | Rounded | 56 | Focus | Icon only | 132:7554 | 56×56 | 56×56 | 1×32 | Passed | recQQnKKNWqtSpBFY |
| Outline | Rounded | 56 | Disable | Both icons | 132:7583 | 130×56 | 129.45×56 | 2×24 | Passed | recAFzzSf4YadePbr |
| Outline | Rounded | 56 | Disable | none | 132:7602 | 66×56 | 65.45×56 | – | Passed | recrKcLUaSgd3iEQq |
| Outline | Rounded | 56 | Disable | leading icon | 132:7644 | 98×56 | 97.45×56 | 1×24 | Passed | recInlSbjcIe0FbDa |
| Outline | Rounded | 56 | Disable | trailing icon | 132:7618 | 98×56 | 97.45×56 | 1×24 | Passed | rec11uB8EuZQxVQhN |
| Outline | Rounded | 56 | Disable | Icon only | 132:7634 | 56×56 | 56×56 | 1×32 | Passed | rec9Z2pX2jvoA5b5U |
| Outline | Pill | 32 | Default | Both icons | 132:7073 | 106×32 | 105.66×32 | 2×16 | Passed | recZD2WRTsMruIjZn |
| Outline | Pill | 32 | Default | none | 132:7082 | 58×32 | 57.66×32 | – | Passed | recXWR6ruv0AIIgiz |
| Outline | Pill | 32 | Default | leading icon | 132:7102 | 82×32 | 81.66×32 | 1×16 | Passed | recyZILIcxbrYohCK |
| Outline | Pill | 32 | Default | trailing icon | 132:7090 | 82×32 | 81.66×32 | 1×16 | Passed | recSTYT2Nm1ygKci6 |
| Outline | Pill | 32 | Default | Icon only | 132:7096 | 32×32 | 32×32 | 1×16 | Passed | rec5k0ZYreRe5scbB |
| Outline | Pill | 32 | Hover | Both icons | 132:7111 | 106×32 | 105.66×32 | 2×16 | Passed | reck1olbuOLDuxxNk |
| Outline | Pill | 32 | Hover | none | 132:7130 | 58×32 | 57.66×32 | – | Passed | recmxBZnELLhJ71gL |
| Outline | Pill | 32 | Hover | leading icon | 132:7170 | 82×32 | 81.66×32 | 1×16 | Passed | recwjvZPxWKhHvtan |
| Outline | Pill | 32 | Hover | trailing icon | 132:7146 | 82×32 | 81.66×32 | 1×16 | Passed | recRLJ6eaQ6NaYInj |
| Outline | Pill | 32 | Hover | Icon only | 132:7160 | 32×32 | 32×32 | 1×16 | Passed | recdrzR76mNeEhhTr |
| Outline | Pill | 32 | Press | Both icons | 132:7121 | 106×32 | 105.66×32 | 2×16 | Passed | reciOkKm0k6iiQ1oS |
| Outline | Pill | 32 | Press | none | 132:7138 | 58×32 | 57.66×32 | – | Passed | recsKJgcQhWVrx0N4 |
| Outline | Pill | 32 | Press | leading icon | 132:7178 | 82×32 | 81.66×32 | 1×16 | Passed | recne4RxKOOcpQQM2 |
| Outline | Pill | 32 | Press | trailing icon | 132:7154 | 82×32 | 81.66×32 | 1×16 | Passed | reczFRgf4PGHv5vWH |
| Outline | Pill | 32 | Press | Icon only | 132:7164 | 32×32 | 32×32 | 1×16 | Passed | recJNLFaliRm4ZpQi |
| Outline | Pill | 32 | Focus | Both icons | 132:7187 | 106×32 | 105.66×32 | 2×16 | Passed | recMGN5uFQHrkE8ug |
| Outline | Pill | 32 | Focus | none | 132:7196 | 58×32 | 57.66×32 | – | Passed | recp3PEsjZ7B4FFXv |
| Outline | Pill | 32 | Focus | leading icon | 132:7216 | 82×32 | 81.66×32 | 1×16 | Passed | rec0dHJHUI90sX2S7 |
| Outline | Pill | 32 | Focus | trailing icon | 132:7204 | 82×32 | 81.66×32 | 1×16 | Passed | recKhdlMnR1fa3x92 |
| Outline | Pill | 32 | Focus | Icon only | 132:7210 | 32×32 | 32×32 | 1×16 | Passed | recZcgatFkb5ZudUY |
| Outline | Pill | 32 | Disable | Both icons | 132:7225 | 106×32 | 105.66×32 | 2×16 | Passed | recQcfFgHXSPWigIk |
| Outline | Pill | 32 | Disable | none | 132:7234 | 58×32 | 57.66×32 | – | Passed | reclVJMl988VoxlEf |
| Outline | Pill | 32 | Disable | leading icon | 132:7254 | 82×32 | 81.66×32 | 1×16 | Passed | recEgJ59pj8orJPgX |
| Outline | Pill | 32 | Disable | trailing icon | 132:7242 | 82×32 | 81.66×32 | 1×16 | Passed | recBzW64UGmHabt0k |
| Outline | Pill | 32 | Disable | Icon only | 132:7248 | 32×32 | 32×32 | 1×16 | Passed | recFsoyfLGtOITLIb |
| Outline | Pill | 48 | Default | Both icons | 132:7268 | 130×48 | 129.45×48 | 2×24 | Passed | rec7yoJfOSvrUqQaA |
| Outline | Pill | 48 | Default | none | 132:7286 | 66×48 | 65.45×48 | – | Passed | recbP5Lt6qZJXt1lb |
| Outline | Pill | 48 | Default | leading icon | 132:7329 | 98×48 | 97.45×48 | 1×24 | Passed | recPqbt50Zj5wflkc |
| Outline | Pill | 48 | Default | trailing icon | 132:7303 | 98×48 | 97.45×48 | 1×24 | Passed | recnXuzojfOZDGSrF |
| Outline | Pill | 48 | Default | Icon only | 132:7316 | 48×48 | 48×48 | 1×24 | Passed | recN4seb1K5G5n0ms |
| Outline | Pill | 48 | Hover | Both icons | 132:7348 | 130×48 | 129.45×48 | 2×24 | Passed | recdLrlT5G3SCFLVc |
| Outline | Pill | 48 | Hover | none | 132:7386 | 66×48 | 65.45×48 | – | Passed | recBj0FzcW1nwg2Rd |
| Outline | Pill | 48 | Hover | leading icon | 132:7471 | 98×48 | 97.45×48 | 1×24 | Passed | rec9cyrwY2QK0mw3n |
| Outline | Pill | 48 | Hover | trailing icon | 132:7419 | 98×48 | 97.45×48 | 1×24 | Passed | recOI9HFNMfFoXmhu |
| Outline | Pill | 48 | Hover | Icon only | 132:7450 | 48×48 | 48×48 | 1×24 | Passed | recjQDrrbnlYXG7RY |
| Outline | Pill | 48 | Press | Both icons | 132:7368 | 130×48 | 129.45×48 | 2×24 | Passed | recQQ43CWs3m2GkBG |
| Outline | Pill | 48 | Press | none | 132:7402 | 66×48 | 65.45×48 | – | Passed | recT6TzzvOXwB51AL |
| Outline | Pill | 48 | Press | leading icon | 132:7489 | 98×48 | 97.45×48 | 1×24 | Passed | recGIa5BEZ4qb0NFH |
| Outline | Pill | 48 | Press | trailing icon | 132:7437 | 98×48 | 97.45×48 | 1×24 | Passed | recbaJkRadKuzAGrg |
| Outline | Pill | 48 | Press | Icon only | 132:7458 | 48×48 | 48×48 | 1×24 | Passed | recSa56LxggahXCcw |
| Outline | Pill | 48 | Focus | Both icons | 132:7508 | 130×48 | 129.45×48 | 2×24 | Passed | reckwfOYTYvpKeLVW |
| Outline | Pill | 48 | Focus | none | 132:7526 | 66×48 | 65.45×48 | – | Passed | recOE02Z8nt568i5V |
| Outline | Pill | 48 | Focus | leading icon | 132:7569 | 98×48 | 97.45×48 | 1×24 | Passed | rec1AacjL4A4GSJN8 |
| Outline | Pill | 48 | Focus | trailing icon | 132:7543 | 98×48 | 97.45×48 | 1×24 | Passed | reciUMsOnQN7u8oRx |
| Outline | Pill | 48 | Focus | Icon only | 132:7556 | 48×48 | 48×48 | 1×24 | Passed | recJuvZexnsrucbce |
| Outline | Pill | 48 | Disable | Both icons | 132:7588 | 130×48 | 129.45×48 | 2×24 | Passed | recMgOo93eOIHAZKw |
| Outline | Pill | 48 | Disable | none | 132:7606 | 66×48 | 65.45×48 | – | Passed | recGlRThm6t1IW6Co |
| Outline | Pill | 48 | Disable | leading icon | 132:7649 | 98×48 | 97.45×48 | 1×24 | Passed | recmYwa2P7g1csUMv |
| Outline | Pill | 48 | Disable | trailing icon | 132:7623 | 98×48 | 97.45×48 | 1×24 | Passed | rec17hJBiMxtqndwQ |
| Outline | Pill | 48 | Disable | Icon only | 132:7636 | 48×48 | 48×48 | 1×24 | Passed | recQV2J2HNN0h6iG6 |
| Outline | Pill | 56 | Default | Both icons | 132:7273 | 130×56 | 129.45×56 | 2×24 | Passed | recxVt0jhN0rnJpxm |
| Outline | Pill | 56 | Default | none | 132:7290 | 66×56 | 65.45×56 | – | Passed | recVuHLxfd0Y6NlWR |
| Outline | Pill | 56 | Default | leading icon | 132:7333 | 98×56 | 97.45×56 | 1×24 | Passed | rec6EFxt2HGGVmpRI |
| Outline | Pill | 56 | Default | trailing icon | 132:7307 | 98×56 | 97.45×56 | 1×24 | Passed | rec1L7hw4LmuXkRdC |
| Outline | Pill | 56 | Default | Icon only | 132:7318 | 56×56 | 56×56 | 1×32 | Passed | recLe341mD7OAbpTk |
| Outline | Pill | 56 | Hover | Both icons | 132:7353 | 130×56 | 129.45×56 | 2×24 | Passed | reczLaKZX0IZ5pSlz |
| Outline | Pill | 56 | Hover | none | 132:7390 | 66×56 | 65.45×56 | – | Passed | recK7lVNGoIlnYOOv |
| Outline | Pill | 56 | Hover | leading icon | 132:7475 | 98×56 | 97.45×56 | 1×24 | Passed | recr57TFU4Xbo8U7O |
| Outline | Pill | 56 | Hover | trailing icon | 132:7423 | 98×56 | 97.45×56 | 1×24 | Passed | recjsihIOVUi4kME5 |
| Outline | Pill | 56 | Hover | Icon only | 132:7452 | 56×56 | 56×56 | 1×32 | Passed | recsj8IYHvlcgItfI |
| Outline | Pill | 56 | Press | Both icons | 132:7373 | 130×56 | 129.45×56 | 2×24 | Passed | recC8wcMRTaIvvonk |
| Outline | Pill | 56 | Press | none | 132:7406 | 66×56 | 65.45×56 | – | Passed | recQsXZGEaA2vZ5Y3 |
| Outline | Pill | 56 | Press | leading icon | 132:7493 | 98×56 | 97.45×56 | 1×24 | Passed | recp1Rjfev7Kx9lAU |
| Outline | Pill | 56 | Press | trailing icon | 132:7441 | 98×56 | 97.45×56 | 1×24 | Passed | rec05xk54CjKlVNVX |
| Outline | Pill | 56 | Press | Icon only | 132:7460 | 56×56 | 56×56 | 1×32 | Passed | recLbx3sxcoqeFswy |
| Outline | Pill | 56 | Focus | Both icons | 132:7513 | 130×56 | 129.45×56 | 2×24 | Passed | rec42qm9P4hrtoSzx |
| Outline | Pill | 56 | Focus | none | 132:7530 | 66×56 | 65.45×56 | – | Passed | rec4lYKwiGDuKPdtI |
| Outline | Pill | 56 | Focus | leading icon | 132:7573 | 98×56 | 97.45×56 | 1×24 | Passed | rec04BX3mBqS859o9 |
| Outline | Pill | 56 | Focus | trailing icon | 132:7547 | 98×56 | 97.45×56 | 1×24 | Passed | recr5NcfLNANLgTcX |
| Outline | Pill | 56 | Focus | Icon only | 132:7558 | 56×56 | 56×56 | 1×32 | Passed | recz580Ssswu0I37k |
| Outline | Pill | 56 | Disable | Both icons | 132:7593 | 130×56 | 129.45×56 | 2×24 | Passed | recQUxtHY6SzLwmLO |
| Outline | Pill | 56 | Disable | none | 132:7610 | 66×56 | 65.45×56 | – | Passed | rec9yZDj4cX8aP2z1 |
| Outline | Pill | 56 | Disable | leading icon | 132:7653 | 98×56 | 97.45×56 | 1×24 | Passed | rechmr4a8wWpD3o6q |
| Outline | Pill | 56 | Disable | trailing icon | 132:7627 | 98×56 | 97.45×56 | 1×24 | Passed | recSTlD6No3Q2AGvB |
| Outline | Pill | 56 | Disable | Icon only | 132:7638 | 56×56 | 56×56 | 1×32 | Passed | reci2YUf1FAaRrjo4 |
