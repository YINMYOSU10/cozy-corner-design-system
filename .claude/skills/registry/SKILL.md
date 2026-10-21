---
name: registry
description: The contract for the Cozy Corner DS Airtable base — every table, every column, the one owner allowed to write each column, and how the Development status is derived. Read before any agent reads or writes the registry.
---

# The registry

The Airtable base is the crew's shared record. Agents wake on its statuses and leave
evidence in its cells. This file says who may write what. If a column is not yours here,
you do not write it — not to fix a typo, not to unblock yourself.

## Finding the base

IDs are never written in this file or in any agent file. Read them from
`.claude/registry.local.json` (gitignored):

```json
{ "baseId": "app…", "tables": { "Components": "tbl…", … } }
```

- If the file is missing, copy `.claude/registry.local.json.example`, ask a human for
  the real IDs, and stop. Do not search for the base by name and guess.
- Field IDs are not stored. Resolve them by column name with `list_tables_for_base`
  on `baseId`, then use the IDs in reads and writes. Names below are exact.

## Who can own a column

| Owner | Who it is |
|---|---|
| **Engineer** | `.claude/agents/engineer.md` — builds, repairs, records staging |
| **QA** | `.claude/agents/qa.md` — tests staging, writes every test row |
| **DevOps** | `.claude/agents/devops.md` — takes staging to main, records production |
| **PM** | `.claude/agents/pm.md` — reads the whole registry, writes Asana tickets. Owns no column |
| **Doc Generator** | `.claude/agents/doc-generator.md` — writes intent files and builds the docs site |
| **Release** | `.claude/agents/release.md` — reviews, publishes, and records the release verdict |
| **Human** | A person. No agent writes these, ever |
| **Computed** | Airtable derives it. Nobody writes it, human or agent |

The crew is six agents: the four above plus Doc Generator and Release (Decision 8). A
column with no agent owner stays Human.

Each column has exactly one owner. A linked-record field and its mirror in the other
table are one link; they share an owner, and writing either side writes both.

## Tables and columns

### Components — one row per component

| Column | Type | Owner | Notes |
|---|---|---|---|
| Components | text (primary) | Human | The component's name. Rows are created by a person. |
| Category | single select: ATOMS, MOLECULES, ORGANISMS, TEMPLATES, UI | Human | Atomic level is a design decision. |
| Figma | url | Human | The node to build from. Feeds precedence 8. |
| Design | single select: To-do, In progress, In testing, Done, To be fixed | Human | Design sign-off. Feeds precedence 8. No agent nudges it. |
| Staging Storybook | url | Engineer | Written only after the staging build is opened and seen to render. Feeds precedence 7. |
| Commit | url | Engineer | |
| GitHub Commits | link → GitHub Commits | Engineer | Mirror of GitHub Commits › Link to Components. |
| Composes | link → Components | Engineer | The components this one imports. Build up, never sideways. |
| Composed Into | link → Components | Computed | Reverse of Composes. Written only by writing Composes. |
| [Staging] Test Records | link → Staging Testing | QA | Mirror of Staging Testing › Composed In. |
| Production Storybook | url | DevOps | Written only after opening it. Feeds precedence 5. |
| Astro Link | url | Doc Generator | Written only for a docs page fetched and seen to render (Decision 8). Feeds precedence 4. |
| Release Review | url | Release | This component's own review report (`reports/<ComponentName>/release-review-<sha>.md`), written together with Release Verdict or not at all (Decision 8). Feeds precedence 4. |
| Release Verdict | single select: Cleared, Blocked | Release | Written together with Release Review or not at all (Decision 8). Feeds precedence 4. |
| Development | formula → single select | Computed | **No agent may write this.** See below. |
| Staging Testing Results Summary | rollup of Staging Testing › Testing Results | Computed | Feeds precedence 1, 2, 3, 6. |
| Total Staging Tests | count of [Staging] Test Records | Computed | |
| Staging Passed Count | count of [Staging] Test Records | Computed | See Flag 6. |
| Staging Passed Tests | rollup of Testing Results → number | Computed | See Flag 5. |
| Synchronization % | formula | Computed | `Staging Passed Count / Total Staging Tests × 100`, rounded to 2 places; `0%` when there are no tests. |
| Last Modified | last modified time | Computed | A Release Review is stale once this is later than the commit it links to. |

### Staging Testing — one row per tested variant, size and state

QA owns every column. A row written by anyone else is the builder scoring the exam.

**One permitted transition for the Engineer (Decision 1).** On a row that reads `Failed`,
after the repair is deployed to staging and seen to render, the Engineer may change
`Testing Results` to `Fixed (To re-test)`. That is the whole permission: that one column,
that one value, from that one value. It is a claim, not a verdict — only QA writes `Passed`
or `Failed`, and only QA creates or edits anything else in this table.

| Column | Type | Owner |
|---|---|---|
| Component/Sub Component | text (primary) | QA |
| Testing Results | single select: Passed, Failed, Fixed (To re-test) | QA |
| Composed In | link → Components | QA |
| Variants | long text | QA |
| Size | multi select: xs, sm, md, lg, xl, comfort, compact, null | QA |
| State | multi select: idle, hovered, focus, selected, isCurrent, filled, disabled, loading, error, draft, pending, upcoming, completed, rejected, cancelled | QA |
| Context | text | QA |
| Attachment | attachments | QA |
| Expected Results | long text | QA |
| Suggestion for Improvement | long text | QA |

The formula looks for the exact text `Failed` and `re-test` (case-sensitive) in
`Testing Results`. Use the option names exactly as listed.

### GitHub Commits — one row per commit that carries component work

| Column | Type | Owner |
|---|---|---|
| Commit Hash | text (primary) | Engineer |
| Message | text | Engineer |
| Author | text | Engineer |
| Date Committed | date-time, UTC | Engineer |
| Link to Components | link → Components (single) | Engineer |
| Files Changed | long text | Engineer |
| Commit URL | url | Engineer |
| Commit Type | single select: Feature, Bugfix, Documentation, Chore, Refactor, Other | Engineer |

### DS Feedback — feedback from teams using the system

| Column | Type | Owner | Notes |
|---|---|---|---|
| Feedback | long text (primary) | Human | Written by the person submitting. |
| Components | text | Human | |
| Submitted By | text | Human | |
| Step to Reproduce | long text | Human | |
| Suggestion | text | Human | |
| Urgency | text | Human | |
| Attachment | url | Human | |
| Status | single select: Not Started, In Progress, Completed | Human | PM reads it; a person moves it (Decision 5). |

### One-Off Components — components built in a product, outside the system

| Column | Type | Owner |
|---|---|---|
| Components | text (primary) | Human |
| Project | text | Human |
| Usage quantity | number | Human |
| Git Repo | text | Human |
| Figma | url | Human |

## Decisions

Settled by the human on 2026-10-18, where the crew board and this contract disagreed.

1. **`Fixed (To re-test)` is written by the Engineer**, as the board shows, and only as the
   one transition above. QA still owns the column and every verdict in it.
2. **No production testing.** The board has QA re-test after `Completed`; the base has no
   table for it. Out of scope until a Production Testing table exists.
3. **No Reviewer.** *Superseded by Decision 8.*
4. **No Astro docs site.** *Superseded by Decision 8.*
5. **PM writes Asana, not Airtable.** It reads every table on a schedule and owns no column.
6. **`To-do` follows the formula**: Figma set and Design = Done. The board's "Figma link
   exists" is shorthand for it.
7. **Group Staging Testing rows.** The Airtable free plan caps the base at 1,000 rows.
   QA writes one row per *State × Type* (or the closest equivalent for components
   without those properties), not one per variant. Each row lists every variant it
   covers in `Variants`, and its `Testing Results` is `Failed` if any covered variant
   fails. Per-variant detail stays in `reports/<Component>.md`.
8. **Doc Generator and Release join the crew (2026-10-21).** `Astro Link` is owned by
   Doc Generator. `Release Review` and `Release Verdict` are owned by Release, and are
   written together or not at all. Neither agent writes `Development`. This supersedes
   Decisions 3 and 4. A release, not the crew's loop, is what moves a component to
   `Released` (precedence 4). The Release agent may commit, PR and merge its own
   *release-review report* into `staging`; `CLAUDE.md` section 4 records that one exception.

## The loop — who each status wakes

| Development | Wakes | To do |
|---|---|---|
| To-do | Engineer | Build it, deploy to staging, write `Staging Storybook` |
| Ready for Testing | QA | Test the staging URL, write one row per case |
| To be fixed | Engineer | Repair the `Failed` rows, mark them `Fixed (To re-test)` |
| Fixing | QA | Re-test the `Fixed (To re-test)` rows |
| Fixed | QA | Re-test the `Fixed (To re-test)` rows |
| To be deployed | DevOps | Staging → main, verify production, write `Production Storybook` |
| Completed | nobody | The loop ends |

PM wakes on a schedule, not a status, and reads all of it. Agents never message each
other: the status is the message.

## Development

`Development` is a formula. **No agent may write it**, and no human should either. To change
it, change the evidence underneath it. Agents wake on it; they never set it.

The formula, in precedence order — the first line that matches wins:

| # | When | Development reads |
|---|---|---|
| 1 | Test summary contains `Failed` **and** `re-test` | Fixing |
| 2 | Test summary contains `Failed` | To be fixed |
| 3 | Test summary contains `re-test` | Fixed |
| 4 | Astro Link set **and** Release Review set **and** Release Verdict = Cleared | Released |
| 5 | Production Storybook set | Completed |
| 6 | Test summary is not empty | To be deployed |
| 7 | Staging Storybook set | Ready for Testing |
| 8 | Figma set **and** Design = Done | To-do |
| 9 | otherwise | empty (see Flag 1) |

"Test summary" is `Staging Testing Results Summary`.

What this means:

- A failure outranks everything below it. A released component that fails a re-test reads
  To be fixed (or Fixing), not Released.
- Released needs all three cells of precedence 4. Any one alone is not a release.
- `To-do` is not proof that Design is Done. Check the `Design` column itself.

## Flags: description and formula disagree

Checked against the live schema and the live records on 2026-10-18. These are reported,
not fixed. A human decides which side is right.

1. **Development — the empty branch.** The description says step 9 is "otherwise blank".
   The formula returns `""`, but its result is a single select whose default choice is
   named `To-do`, so an unsigned-off row can look identical to precedence 8.
2. **Development — precedence 6.** The description says "Any staging test rows exist →
   To be deployed". The formula checks that the summary is not empty, and the summary is a
   rollup of `Testing Results`. Rows that exist but have no result yet don't count: that
   component still reads Ready for Testing.
3. **Release Verdict.** The description says it is "Deliberately not wired into
   Development". The formula reads it at precedence 4 (`Release Verdict = "Cleared"`).
4. **Release Review.** The description says "It does not feed Development". The formula
   reads it at precedence 4.
5. **Staging Passed Tests.** The description says it "Counts only test rows marked Passed"
   and "Feeds Synchronization %". `Synchronization %` doesn't reference it — it uses
   `Staging Passed Count`. And on the live Button / Primary row it reads `0` while all 28
   linked rows are Passed.
6. **Staging Passed Count** (no description). It is a count over the same link as
   `Total Staging Tests`. The connector shows no Passed-only condition on it, and on the live
   row both read 28. If it has no condition, `Synchronization %` is 100% whenever any test
   exists. Confirm in the Airtable field settings.

## Other drift found while reading

- The crew board writes `Fixed (Re-test)`. The real option is `Fixed (To re-test)`. The
  formula matches lowercase `re-test`, so use the real option name exactly.
- 44 of 72 Staging Testing rows are fully empty and linked to nothing.

## Never

- Never write a column you don't own here. Read-only means read-only.
- Never write `Development` or any Computed column.
- Never write a Human column, even to "fill the obvious value".
- Never write a link URL you have not opened and seen render.
- Never hardcode a base, table or field ID in a skill, an agent file or a commit.
- Never write a token value into the registry. Tokens live in code.
