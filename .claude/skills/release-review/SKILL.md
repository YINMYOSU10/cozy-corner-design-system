---
name: release-review
description: Review whether the design system is ready to release — 7 gates and 6 checks over the intent files and the build — and write a report at the reviewed commit with a verdict, Cleared or Blocked. Reports only; never edits, fixes or publishes.
---

# Release review

## When to use this
Use this before a release of the package, when a human wants to know whether it is
ready. It reads, measures and reports. It never edits an intent file, never fixes what
it finds, and never publishes. A different role repairs; a human decides.

Do not review a release you built in this same session.

## Steps

### 1 · Pin the commit
Record the commit being reviewed (`git rev-parse HEAD`) and make sure the tree is
clean. Run `npm run build:package` so the built output exists (`tools.md` has the
commands). The report belongs to this commit; if the commit moves, the report is stale.

### 2 · The 7 gates
A gate is pass or fail. Any failed gate makes the verdict Blocked.

1. **Intent written** — every component has a `<Name>.intent.json`.
2. **Development status** — every component's `Development` status in the registry is
   `Completed`. Read it with the `registry` skill's rules; never write it.
3. **Tokens clean** — no raw hex, px or font value in any component or CSS file, and
   `tokens/` and `build/` carry no hand edits (compare with git).
4. **Public surface decided** — every component folder is either exported from
   `src/index.ts` or recorded as internal, with a reason. None is undecided.
5. **Names final** — every suggestion in `docs/naming-suggestions.md` that touches a name
   in `src/index.ts` is closed: either applied, or marked **Accepted** with a date and who
   decided. An unmarked suggestion is open. Prop names match Figma property names.
6. **States complete** — every component covers the states the product uses (default,
   hover, pressed, focus, disabled, loading, error, where applicable) and every variant
   and state has a story.
7. **Version meaning known** — what a version number promises consumers is written down
   by a human in `VERSIONING.md` (or the release PR). If it is not written, the gate
   fails. Do not infer it.

### 3 · The 6 checks
Checks look at the intent files. They run across every component.

1. **Fields present** — all eight fields exist in every intent file. An empty
   `use_when` / `dont_use_when` on a component that has no Figma usage region is a
   recorded gap, not a hidden pass.
2. **Alternatives named** — every `dont_use_when` entry names an alternative. A miss is a
   **warning**, never a blocker.
3. **a11y specific** — each fact says what is implemented and links a source line. A
   generic line ("is accessible", "supports screen readers") fails.
4. **Tokens resolve** — every `required_tokens` entry exists in the built
   `dist/tokens.css`. A token that does not resolve fails.
5. **All variants covered** — every variant value in the component's prop types has a
   `variant_intent` entry.
6. **No overlap** — no two components claim the same job in `use_when`. Name the pair.

### Waivers
A human may waive a **check** (never a gate) in `docs/release-waivers.md`, naming the check
number, the components, the reason, who decided, the date, and the version it covers. A
waived check is reported as **WAIVED** with a pointer to that entry, never as PASS, and it
does not block. A waiver covers only the version it names. You never write a waiver.

### 4 · Verdict
- **Cleared** — every gate passes and every check passes or is WAIVED, warnings aside.
- **Blocked** — any gate fails or any non-warning, non-waived check fails. List each reason.

### 5 · Write the reports
Write **one report per component**, at the reviewed commit, at
`reports/<ComponentName>/release-review-<short-commit>.md`. `<ComponentName>` is the
component's folder name in `src/components` (PascalCase: `Card`, `ButtonNeutral`), the same
folder that holds its QA reports. Never lower-case it or add hyphens: on a case-insensitive
filesystem (macOS) `card/` and `Card/` are the same folder, so a lower-case path writes into
the existing folder while the board link points at a path that returns 404 on GitHub. Each file starts with the title
`# Release review — <ComponentName>` and a two-column table with these rows:

| Row | Holds |
|---|---|
| Reviewed commit | the full commit SHA, its date, and the branch it was read from |
| Registry | the component's row: `Development` at review, `Design`, and the Last Modified time |
| Figma | the component set node and the documentation page it was read from |
| Intent file | `src/components/<Name>/<Name>.intent.json` and the commit it was read at |
| Production Storybook | the board's `Production Storybook` link |
| Verdict | `Cleared` or `Blocked` on its own line |

Below the table, say in a sentence that the review is fresh and nothing was carried over
from earlier reviews, then list **this component's** result for each of the 7 gates and
the 6 checks: PASS, FAIL, WARNING or WAIVED, with the evidence and the file and field it
names. A waived check points at its entry in `docs/release-waivers.md`. Do not propose
rewrites of intent text.

Also write one summary, `reports/release-review-<short-commit>.md`, for the whole release:
the commit, the build and package results, the gates and checks that apply to the whole
package, a table with one line per component (verdict plus a link to its own file), and the
overall verdict. The overall verdict is Cleared only when every component is Cleared.

Each component's `Release Review` cell holds the link to **its own** report at the commit
the report was committed in, not the summary.

The registry's `Release Review` and `Release Verdict` columns are written only by the
owner the registry names (`.claude/skills/registry/SKILL.md`). If this skill is not
that owner, put the report path and verdict in your reply and write nothing to the board.

## Never
- Never edit an intent file, a component, a token or a package file.
- Never fix a finding, even a one-character one.
- Never publish, tag or open a release PR.
- Never clear a gate on a guess. No evidence, no pass.

## References
- Intent files: `src/components/<Name>/<Name>.intent.json` (see `component-intent`)
- Public surface: `src/index.ts`
- Registry contract: `.claude/skills/registry/SKILL.md`
- Commands: `tools.md`

## Self-check
- [ ] The report names the reviewed commit and the tree was clean
- [ ] All 7 gates and all 6 checks are listed, each with evidence
- [ ] `dont_use_when` misses are warnings, not blockers
- [ ] The verdict is exactly Cleared or Blocked, with every reason listed
- [ ] You changed no file except the report
