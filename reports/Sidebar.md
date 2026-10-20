# QA report: Sidebar

- **Run:** 2026-10-20, first test. Woken by `Development` = `Ready for Testing` on Components row `recxO7QUMSl70ji9p`.
- **Tested build:** https://cozy-corner-design-system-git-staging-cozy-corner2.vercel.app (PR #48, commit 97c76bc). Deployed URL only, no local build.
- **Figma:** file `MWuaFZQ58G4WvtbCyeaE1X`, Sidebar 453:4975; parts nav-item set 453:135, sub-item set 453:148, section-label 453:149, user 453:151; Logo 4:484 and Avatar 576:24 are separate components.
- **Fonts:** Inter and Fredoka loaded (canvas width in declared family differs from a bogus family: Inter 168.4 vs 145.8, Fredoka 200.5 vs 193.4).
- **Viewport note:** the Default story fills `100vh`. At 768px high the Navigation slot scrolls (scrollbar steals 15px, items 189 wide). All geometry below was measured at an 800x900 viewport, where the Sidebar is 237x900 and items are 204 wide.

## Verdict

| | Count |
|---|---|
| Figma cases (nav-item 12, sub-item 3, count on both, section-label 1, user 1, Sidebar 1) | 19 |
| Staging Testing rows written (grouped State x Type, Decision 7) | 13 |
| Passed rows | 8 |
| Failed rows | 5 (one root cause: letter-spacing) |

`Development` after the write: see the QA card (read back once).

## Figma vs stories reconciliation

- nav-item: 12 variants (State Default/Hover/Active/Focused x Expand None/Collapsed/Expanded). 12 stories exist (`default-none` ... `focused-expanded`), plus `with-count` and `interactive`. None missing.
- sub-item: 3 variants (Default, Hover, Active) + Show count. Stories: default, hover, active, default-with-count, active-with-count. None missing. Figma has no Focused sub-item; the story/CSS adds one (see Additions).
- section-label: 1 component, stories `default` (MAIN) and `shop`. None missing.
- user: 1 component, story `default`. None missing.
- Sidebar: Figma has one frame. Stories `default`, `without-user` (the `showUser` prop), `interactive`. No dead stories.

## Findings

### F1 Letter-spacing 0.32px missing on four Body small text styles (FAIL, engineering defect)
```
Sidebar / nav-item count, sub-item count, section-label, user role
Expected  letter-spacing 0.32px (Figma styles "Body small semibold" 456:410, 456:422, 456:457, 456:459, 453:150
          and "Body small" 453:156)
Saw       computed letter-spacing "normal" on all of them
Where     Sidebar.css  .cc-sidebar-item__count, .cc-sidebar-sub-item__count,
          .cc-sidebar-section-label, .cc-sidebar-user__role
Fix       letter-spacing: var(--typography-bodysmallsemibold-letterspacing)  (first three)
          letter-spacing: var(--typography-bodysmall-letterspacing)          (role)
```
The Engineer reported "no token for letter-spacing". That is wrong: `build/tokens/css/tokens-dashboard.css` defines `--typography-bodysmallsemibold-letterspacing` and `--typography-bodysmall-letterspacing` (both 0.32px), `.storybook/preview.js` imports that file, and `Button.css` already uses `var(--typography-bodysmall-letterspacing)`. The composite `--cozy-corner-typography-*` shorthand cannot carry letter-spacing, so it needs the companion token. This is not a design gap.

### Design gaps (not logged against the Engineer, rows pass)
- Sidebar 237x900, nav-item min-height 40, icon box 20, chevron 16: `get_variable_defs` on 453:4975 and 453:135 returns no size variables for these. Genuine gap; staging carries them as SVG sizers. Measured: Sidebar 237x900, nav-item 204x40, icon 20x20, chevron 16x16, sub-item 204x36, section-label 204x32, user 204x56 (all equal Figma).
- Avatar initials "SU" fixed: Figma's User instance exposes only Name and Role, the Avatar inside defaults to "SU". Staging matches Figma. Gap.

### Additions beyond Figma (flagged, not failed)
- Sub-item `:focus-visible` inset 2px `color/border/focus` ring on the pill. Figma has no Focused sub-item. Real Tab confirmed the ring on Matches and Wrapped books. A sensible accessibility addition; design should add a Focused sub-item variant to Figma.
- Group button has `aria-expanded` but no `aria-controls` (nice to have, not in Figma).

### Observation, not this component (Logo)
Logo renders 153.5x32 in the Header; Figma instance 453:4977 is 185x45 (Logo set 4:484, Platform=Dashboard 185x45). Header is therefore 204x40 instead of 204x53 and the Navigation slot starts at y=76 instead of 89. Relative offsets inside Navigation are exact (0, 44, 108, 328, 364, 408, 452, 496, 532, 576). Belongs to the Logo component. I did not fail a Sidebar row for it.

## Per-case measurements (staging, getComputedStyle)

| Case | Figma | Staging | Result |
|---|---|---|---|
| Sidebar frame | 237x900, bg surfacePrimary, 1px right stroke border/secondary, pad 20/16/16, gap 16 | 237x900, rgb(255,253,249), 1px rgb(205,187,159), pad 20 16 16, gap 16 | Pass |
| Header frame | pl 8, pb 8, clips | pad 0 0 8 8, overflow clip | Pass (height follows Logo) |
| Navigation slot | gap 4, fills height | gap 4, 204x736 at 900 high | Pass |
| User position | y 828 | y 828, 204x56, avatar 40x40, pad 8/12, gap 12 | Pass |
| nav-item Default x3 | 205x40, text/primary 16/22 Medium, icon/bold, chevron icon/secondary, radius 8 | A or BUTTON 40 high, rgb(74,60,49) 500 16px/22px Inter, icon rgb(43,33,27), chevron rgb(122,106,88), 20x20, 16x16, radius 8 | Pass |
| nav-item Hover x3 | bg neutral/light | rgb(243,232,214); real pointer hover on Inventory and the group gave the same | Pass |
| nav-item Active x3 | bg primary/light, text/brand, icon/brand | rgb(246,221,209), rgb(131,64,38), icon rgb(164,82,48), chevron rgb(164,82,48) | Pass |
| nav-item Focused x3 | bg surfacePrimary, 2px bg/base + 2px border/focus | rgb(255,253,249), box-shadow rgb(251,243,231) 0 0 0 2px, rgb(193,99,61) 0 0 0 4px; real Tab matches | Pass |
| nav-item count Default | primary/light pill, pad 4/8, circle, brand text, 600 12/16, ls 0.32 | pill 28.6x24, rgb(246,221,209), rgb(131,64,38), 600 12px/16px, ls normal | Fail (F1) |
| nav-item count Active | pill surfacePrimary | rgb(255,253,249) (read after real click on Orders) | colour pass, ls Fail (F1) |
| sub-item Default | 36 high, pl 20, 2px tree line border/secondary, pill pl 20 pr 12, 14/20 Regular text/primary | 204x36, tree 2x36 rgb(205,187,159), pill pad 8 12 8 20, 14px/20px, rgb(74,60,49) | Pass |
| sub-item Hover | pill neutral/light | rgb(243,232,214), real hover on Clue cards | Pass |
| sub-item Active | tree text/brand, pill primary/light, text brand | rgb(131,64,38), rgb(246,221,209), rgb(131,64,38) | Pass |
| sub-item count | Body small semibold, secondary (Default) / brand (Active), ls 0.32 | 600 12px/16px, rgb(122,106,88) / rgb(131,64,38), ls normal | colour pass, ls Fail (F1) |
| section-label | 32 high, pad 12/0/4/12, secondary, 600 12/16, ls 0.32 | 204x32, pad 12 0 4 12, rgb(122,106,88), 600 12px/16px, ls normal | Fail (F1) |
| user | name 600 14/20 text/bold, role 12/16 Regular secondary ls 0.32, avatar primary/light circle SU 600 14 brand | name rgb(43,33,27), role rgb(122,106,88), ls normal, avatar rgb(246,221,209) radius 1000, SU rgb(131,64,38) | name/avatar pass, role ls Fail (F1) |
| Nav offsets inside Navigation | 0,44,108,328,364,408,452,496,532,576 | identical | Pass |

## Behaviour (driven for real in the Sidebar Interactive story)

| Check | Saw | Result |
|---|---|---|
| Click group button | `aria-expanded` true to false, `data-expand` Expanded to Collapsed, 6 sub-items removed; click again restores them | Pass |
| Enter and Space on focused group | Enter collapsed, Space expanded (native button) | Pass |
| Click Orders | Orders `data-state=Active` and `aria-current=page`, Overview back to Default, exactly 1 `aria-current` in the sidebar | Pass |
| Click sub-item Wrapped books | sub-item Active with `aria-current=page`, Orders back to Default, still exactly 1 `aria-current` | Pass |
| Real hover | nav-item and sub-item backgrounds change to neutral/light; cursor pointer on the group button | Pass |
| Real Tab | focus visits Overview, group button, Matches, Wrapped books; `:focus-visible` true; nav items show the 2px+2px ring, sub-items the inset ring | Pass |
| showUser=false | no `.cc-sidebar-user`; Navigation grows to 676 high at 768 | Pass |

## Token check
`Sidebar.css` (origin/staging) uses semantic tokens only (`--color-*`, `--spacing-*`, `--borderradius-*`, `--borderwidth-*`, `--cozy-corner-typography-*`). No raw hex, px or font values; the only non-token numbers are the `calc(-1 * ...)` sizer margins and `calc(2 * var(--borderwidth-2))`. No core tokens referenced.

## Screenshots (`reports/Sidebar/`)
Captured with headless Chrome against the staging URL (400px wide, pinned state, no pointer): `Sidebar-Default.png`, `Sidebar-WithoutUser.png`, `Sidebar-Interactive.png`, `NavItem-{default,hover,active,focused}-{none,collapsed,expanded}.png`, `NavItem-with-count.png`, `NavItem-interactive.png`, `SectionLabel-{default,shop}.png`, `SubItem-{default,hover,active,default-with-count,active-with-count}.png`, `User-default.png`, and the Figma render `Sidebar-figma-453-4975.png`. Failure screenshots could not be uploaded to the Airtable `Attachment` column (the MCP cannot upload local files); the files above are the evidence.

---

## Re-test 2026-10-20 (full, after PR #57 `data-mode="dashboard"` and PR #52 letter-spacing)

- **Build:** staging URL as before (commit 4e1cdc4). Fonts re-confirmed (Inter 130.1 vs bogus 111.7, Fredoka 123.6 vs 111.7). Measured at 800x900.
- **Scope:** all 13 rows re-tested, plus every one of the 25 Sidebar stories loaded and measured. No story shows an error.
- **Result:** 13 Passed, 0 Failed.

### F1 closed
| Element | Figma | Staging now |
|---|---|---|
| nav-item count (456:410, 456:422) | ls 0.32px | 0.32px, 600 12/16, pill 29.2x24 |
| sub-item count (456:457, 456:459) | 0.32px | 0.32px |
| section label (453:150) | 0.32px | 0.32px (both labels) |
| user role (453:156) | 0.32px | 0.32px |

`get_variable_defs` on 453:4975 confirms dashboard-mode values: Body small and Body small semibold carry letterSpacing 0.32; Body large medium, Body, Body semibold, Logo carry 0.

### Dashboard mode: change vs the first test
- `data-mode="dashboard"` is now on the roots of Sidebar, Logo, every SidebarItem, SidebarSubItem, SidebarSectionLabel and SidebarUser (18 roots in Default).
- Only computed change found: letter-spacing (intended), which widens the nav-item count pill from 28.6 to 29.2 px. Not a regression.
- Unchanged: Sidebar 237x900, bg rgb(255,253,249), 1px rgb(205,187,159) edge, pad 20/16/16, gap 16; nav-item 204x40 pad 8/12 radius 8 gap 12, Inter 500 16/22, text rgb(74,60,49), icon rgb(43,33,27), chevron rgb(122,106,88); sub-item 204x36, pill pad 8/12/8/20 radius 8, 14/20 Regular; section-label 204x32 pad 12/0/4/12; user 204x56 at y=828, avatar 40x40 rgb(246,221,209); name 600 14/20 rgb(43,33,27); all colours, fonts, padding, radius, gaps, shadows identical to the first test. Navigation offsets 0, 44, 108, 328, 364, 408, 452, 496, 532, 576.
- Logo still 153.5x32 (Figma 185x45); Header 204x40. Logo observation from the first test stands (Logo component, not a Sidebar row).

### States and behaviour (re-driven)
- Hover (real pointer): nav-item rgb(243,232,214), sub-item pill rgb(243,232,214), cursor pointer. Pass.
- Real Tab: Overview, group button, Matches; `:focus-visible` true; nav-item ring rgb(251,243,231) 2px + rgb(193,99,61) 4px; sub-item inset 2px rgb(193,99,61) (beyond Figma, unchanged). Pass.
- Group click: aria-expanded true to false, data-expand Collapsed, 6 sub-items removed, and back. Active switching: Orders then Wrapped books each leave exactly one `aria-current`. Pass.
- Stories: Hover/Active/Focused x None/Collapsed/Expanded all show the expected backgrounds (hover rgb(243,232,214), active rgb(246,221,209), focused rgb(255,253,249) with ring).
- **active-collapsed (checked alone):** BUTTON, data-state Active, data-expand Collapsed, aria-expanded false, aria-current page; bg rgb(246,221,209), text rgb(131,64,38), icon and chevron rgb(164,82,48), 208x40 in the story wrapper; chevron glyph is the right-pointing one (expanded uses the down-pointing one). Pass.
- Isolated stories are 208 wide only because the story wrapper differs from the Sidebar slot (204). Unchanged from the first test.

### Screenshots (`reports/Sidebar/`)
`retest-Sidebar-Default.png`, `retest-Sidebar-Interactive.png`, `retest-NavItem-active-collapsed.png`, `retest-NavItem-with-count.png`, `retest-SubItem-active-with-count.png`, `retest-SectionLabel-shop.png`, `retest-User-default.png`.
