# QA report: Table

- Run: 2026-10-20, first test. Components row recb1nICYH9ye6Y5Q, Development = Ready for Testing.
- Tested: the staging Storybook URL (PR #47, e95b9e5), 16 stories plus Docs. Not a local build. Source read from origin/staging, unchanged by me.
- Figma: file MWuaFZQ58G4WvtbCyeaE1X. Table 438:14, title-bar 437:20, header-cell set 437:27, cell set 437:59. Read with get_metadata plus read-only use_figma (bindings resolved to variable names).
- I did not build this component and changed nothing in src/.

## Verdict
Matrix 9 grouped rows (Decision 7) · Passed 7 · Failed 2. Development should move to To be fixed.

## Matrix from Figma vs stories
| Figma | Variants | Story |
|---|---|---|
| Table 438:14 | Show title true/false | default, no-title, with-helper, mixed-cells |
| Title bar 437:20 (a single component) | Show helper false/true | default, with-helper |
| Header cell 437:27 | Left, Right | header-cell-left, header-cell-right |
| Cell 437:59 | Text x Default/Muted/Strong, Number, Badge, Tags, Toggle, Action, Custom, More (10) | cell-text-default/muted/strong, number, badge, tags, toggle, action, custom, more |

Every Figma variant has a story. No story lacks a Figma counterpart (mixed-cells is a composite).

## Rows
| Row | Result |
|---|---|
| Table / Frame (showTitle) | Passed |
| Table / Title bar | Passed |
| Table / Header cell (align) | Passed |
| Table / Cell Text (Default, Muted, Strong) | Passed |
| Table / Cell Number | Passed |
| Table / Cell Composed (Badge, Tags, Toggle, Action) | Passed |
| Table / Cell Custom and More | Passed |
| Table / Cell More / focus | Failed |
| Table / Header cell letter-spacing token | Failed |

## Fonts
Canvas Inter 600 16px measured 118.97 vs bogus family 107.67, so Inter is loaded. Header label 55.78 vs Figma 56, Badge 87.41 vs 88: renderer drift, not findings.

## Measurements (viewport 1194 so the Table is 1162 wide)
Table 1162x282 (no title 1162x218), title bar 1160x64, columns 386.66/386.67/386.66 x 216, header 48, cells 56, 1px border rgb(209,213,220) = color/border/gray/light, radius 16 = borderRadius/md, fill rgb(255,253,249) = color/bg/surfacePrimary. Cell padding 16, text 168x22 16/22. Title 18/600/24, helper 14/400/20 right aligned. Number flush right. More 32x32, icon 20x20, border gray/light, radius 8. Toggle 36x18 role=switch. Button / Info 113.54x32 fill rgb(21,93,252).

## Behaviour driven
Real Tab reached the Toggle (ring shown) and Space flipped aria-checked true to false. Real Tab reached the More button: focus-visible true but ring is the browser default (see failure 1).

## Findings
1. Table / Cell More / focus
   Expected  Repo convention ring: 2px color/border/focus (Tag, Toggle, Button)
   Saw       outline auto 1px rgb(229,151,0), box-shadow none (browser default)
   Where     Table.css .cc-table-cell__more, no :focus-visible rule
   Fix       box-shadow: 0 0 0 var(--borderwidth-2) var(--color-border-focus); outline: none
   Screenshot reports/Table/FAIL-Cell-more-tab-focus-default-outline.jpg. Figma defines no focus state, so the convention governs; this is an engineer omission.
2. Table / Header cell letter-spacing
   Expected  no raw value in a component file (CLAUDE.md section 5)
   Saw       letter-spacing: 0.32px in .cc-table-header-cell__label
   Where     Table.css
   Judgement Figma leaves letterSpacing unbound, so the gap is design's, but Tag handled the same gap by omitting it and reporting. Writing the literal is the engineer's defect, small (under 1px per label). Fix: remove it and report the gap.

## Design gaps (not failures)
- No hover, pressed, focus, selected, disabled or loading state is designed on Table, title bar, header cell or cell.
- Unbound sizes: cell height 56, Custom slot 168x57, Action button 130 wide (code hugs 113.54), More icon 20 and button 32, letterSpacing 0.32. The 55px sizer svg follows the Tag/Icon precedent.
- Header label disagreement: the Table 438:14 instances override the label to Medium 16/22 (bound variables, no letter-spacing). The engineer reported Medium 12/22; the live value is 16/22. The header-cell set says SemiBold 12/16. Code follows the set; passed, but design must confirm which is right.
- No semantic table structure or ARIA roles: only role=switch exists. Div-based; accessibility improvement for design and engineering to agree.
- Naming mismatch between layers ("Column: Column", "Table/item/cell"): not a defect.
- Not tested: Custom slot content is consumer-supplied (story uses unstyled text in the default body font).

## Screenshots (reports/Table/)
Table-default, Table-no-title, Table-with-helper, Table-mixed-cells, HeaderCell-left, HeaderCell-right, Cell-text-default, Cell-text-muted, Cell-text-strong, Cell-number, Cell-badge, Cell-tags, Cell-toggle, Cell-action, Cell-custom, Cell-more (all .jpg), FAIL-Cell-more-tab-focus-default-outline.jpg, Figma-Table-438-14.png.
Attachment column left empty: screenshots exist only as local files, no public URL.

---
## Re-test 2026-10-20 (PR #50, commit d7c3d9b)
Verdict: both Fixed rows Passed, no regression. 9 of 9 rows now Passed.

| Row | Result | Measured on staging |
|---|---|---|
| Table / Cell More / focus | Passed | Real Tab reached More, :focus-visible true, box-shadow rgb(193,99,61) 0 0 0 2px (--color-border-focus, --borderwidth-2), outline-style none. Table.css:159 rule matches Tag/Toggle. |
| Table / Header cell letter-spacing token | Passed | Computed letter-spacing normal; no letter-spacing literal left in Table.css (origin/staging). |

Regression spot-check (fonts confirmed loaded: Inter 89.57 vs bogus 84.01): Table 1162x282, header cell 386.66x48, cell 386.66x56, border rgb(209,213,220), radius 16, fill rgb(255,253,249), cell padding 16, More 32x32 radius 8, switch 36x18 role=switch. Header label 12px/600/16px rgb(74,85,101), width 40.8, look unchanged. Toggle: real Shift+Tab focus, Space flipped aria-checked true to false.
Screenshot: reports/Table/PASS-Cell-more-tab-focus-ring.jpg
Remaining design gaps unchanged (letterSpacing unbound in Figma, no designed hover/focus states).
