# CLAUDE.md — how we work in this repo

This file holds the culture: how components are built, what is allowed,
and what to avoid. Stack facts and commands live in `tools.md`.

> Before changing tooling, dependencies, tests, package scripts or
> deployment configuration, read `tools.md` and treat it as the source of truth.

## 1. Tokens

- Tokens are the only source of visual values. Every colour, spacing,
  radius, font and shadow in a component references a token.
- Semantic tokens point at core (primitive) tokens. Components use
  semantic tokens only.
  - Wrong: `color: #c1633d;` or `var(--color-terracotta-500)`
  - Right: `var(--color-bg-primary-idle)`
- Never hand-edit anything in `tokens/`. The Figma plugin owns those files.
- Never hand-edit anything in `build/`. It is generated from `tokens/`.
- Modes come from Figma. A token that exists in one mode but not another
  is a design gap: report it, don't fill it in.
- Never invent a token. If the one you need doesn't exist, report the gap and stop.

## 2. Naming

- Token names come from Figma and follow its pattern:
  `<category>-<role>-<variant>-<state>`, e.g. `color-bg-primary-hovered`,
  `color-text-secondary`, `spacing-md`, `borderradius-sm`.
- Components: PascalCase, one folder per component: `src/components/Button/`.
- Prop names match Figma property names exactly. If Figma says `size`,
  the prop is `size`.
- If a Figma name clashes with a tool or dependency, don't rename it
  silently. Write the suggestion in `docs/naming-suggestions.md`.

## 3. Components

- Cover every interaction state the product uses, where applicable:
  default, hover, pressed, focus, disabled, loading, error.
- Every variant and every state has a story.
- A component's props are its documented API. Undocumented behaviour is a bug.
- Build with subcomponents, especially for organisms (atomic design).
  Break a component into its subcomponents, build those, then compose
  the parent from them.
- Import components; never copy their styles.

## 4. Roles

- **Engineer** builds and fixes. Never verifies its own work.
- **QA** tests and reports. Never repairs.
- **A human approves.** No agent approves its own work, ever.
  - One exception, granted by the human on 2026-10-21: the **Release** agent may
    commit, open a PR for and merge its own *release-review report* (a report file,
    never a component) into `staging`, and write the two registry cells that carry its
    verdict. It never publishes without the human approving the version, and it never
    touches `src/`, `tokens/` or `build/`.

## 5. Common failures to avoid

- Inventing a token that doesn't exist. Report the gap instead and stop.
- Raw hex, px or font values inside a component file.
- Copying a component's styles instead of importing the component.
- Adding a dependency when the existing stack already solves the problem.
- Editing generated or plugin-owned files (`build/`, `tokens/`).


## Git
A component branch never merges into main.
Main accepts PRs from staging only.