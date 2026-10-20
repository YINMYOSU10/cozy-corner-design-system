---
name: astro-page
description: Build the whole Cozy Corner docs site every run — home, guides, one page per component with five tabs, Tokens, Changelog, Roadmap and News — in docs-site/ on the astro branch, generated from the repo, the board and Figma, then verify it live.
---

# Build the docs site

## When to use this
Use this to build or refresh the docs site. It builds the **whole site every run**,
never one page at a time: a page built alone can contradict the pages around it.

The format to match: https://horizon-docs-alpha.vercel.app

## Where it lives
- Astro Starlight in `docs-site/`, on the `astro` branch.
- A Vercel project deploys that branch. `tools.md` records the folder, the project and
  the URL. Read it first; do not hard-code them here.
- `docs-site/vercel.json` already sets the framework, the build command and
  `npm install`. Do not change the Vercel project.

## The sidebar
Written out by hand in `astro.config.mjs`, in this order, so a missing page **fails the
build** instead of vanishing from the navigation:

| Group | Pages |
|---|---|
| Get Started | Changelog, Roadmap, News, Versioning, Upgrading |
| Designing | Introduction |
| Developing | Introduction, React, React Router |
| Skills | Knowledge skill |
| Core | Components (All components, then one page per component), Tokens |
| Styling | Theming |
| Help | FAQ, Report a bug, Request a feature, Contributing, Embedding |

## Home
A splash page.
- The hero line is the first paragraph of the README.
- Buttons: **Start designing**, **Start coding**, **Open Storybook**.
- Then the latest release: its version as the heading, one summary line (published
  date, how many components are on the public surface, how many semantic tokens, how
  many Figma modes — each counted from `src/index.ts`, `tokens/` and
  `tokens/manifest.json`, never typed in), and its install command. Then link cards to
  Designing, Developing, Components and Tokens.
- Calm and spacious: one large title, one short paragraph, three buttons, plenty of
  white space. No walls of text on the home page.

## A component page
A **header strip**: status and the version it shipped in, then links to Storybook, the
Figma node and the source.

Then **five tabs, in this order**:

| Tab | Contents | From |
|---|---|---|
| **Usage** | when to use, where it goes, when not to (with each alternative), best practice, what each variant is for, accessibility facts linked to their source lines, composition, what this version promises | the component's `.intent.json` |
| **Examples** | the README usage example, then every story that is not a variant-matrix row, embedded live from Storybook in light and dark | README, stories |
| **Code** | the import; props with defaults and doc comments; union types; the tokens it needs with light and dark values; Storybook's own props table embedded | the component's types and CSS, `tokens.css` |
| **Design** | the Figma node embedded; the variant matrix with every matrix story linked; both themes; every value Figma never bound; the design gaps recorded against it | live Figma reads, stories |
| **Changelog** | `git log` for the component and its subcomponents, each commit marked with the version it shipped in | git |

### Keep every tab tidy
Every component page uses **the same headings, in the same order**, so a reader always
knows where to look. A section with no source keeps its heading and shows the missing
notice (see "A missing source"); it never disappears and never moves.

| Tab | Headings, in this order |
|---|---|
| Usage | When to use · Where it goes · When not to use · Best practice · Variants · Accessibility · Composition · What this version promises |
| Examples | Usage example · Stories |
| Code | Import · Props · Types · Tokens · Storybook props |
| Design | Figma · Variant matrix · Themes · Unbound values · Design gaps |
| Changelog | Commits, newest first |

Short blocks, not long prose: bullet lists for rules, a table for variants and props,
one line per accessibility fact. Each tab fits one screen's worth of reading before it
needs a scroll, where the source allows.

## Generated, never edited by hand
Home, All components, every component page, Tokens, Changelog, Roadmap, News.

**One script, `docs-site/scripts/generate.mjs`, builds them.** Its inputs are:
- the repo at a **pinned commit** (pass it in; record it on the site);
- two source files **you write each run** under `docs-site/data/`:
  - `board.json` — the board's statuses, **with no record IDs**;
  - `figma.json` — the live Figma reads;
- the **deployed Storybook's `index.json`** (fetch it; `tools.md` gives the URL pattern).

Re-running the script on the same inputs gives the same pages.

## Written from the repo
Every guide (Versioning, Upgrading, Developing, Theming, FAQ, and the rest). **Each run
re-reads them against the code and corrects any sentence that stopped being true.**
Guides state facts from the repo only.

**Roadmap and News state no date, owner or priority that a source does not state.**

## The site wears the system's own tokens
One stylesheet maps Starlight's variables onto semantic tokens from `tokens.css`, with
**no hex of its own**. Fonts are **self-hosted** (Fraunces, Karla, Inter, Fredoka, as
listed in `tools.md`). If self-hosting needs a package, say which one and why in your
report before adding it; do not add a dependency silently.

## A missing source
Keep the section in place with a **notice naming exactly what is missing**. Never invent
content to fill the gap: no made-up usage rule, no made-up date, no made-up value.

## Before pushing
1. Build `docs-site/`. **Zero broken internal links.**
2. Open the home page, **one component page (every tab)**, and **Tokens** — in light and
   in dark.

If either fails, fix the cause, not the check. Do not push a build you have not opened.

## After deploying
Fetch the live site (`tools.md` has the URL; verify a deploy by fetching, not by a 200
alone). **Do it in parallel, not one page at a time:** build the page list from the
built `dist/` (not by crawling), fetch about ten at a time, and check header links the
same way. A component page's five tabs live in one HTML file, so one fetch per page
covers all five tabs. Wait for the deployment to read `success` *first*; a page that
answers 404 right after that gets one short retry for CDN propagation, not a long wait.

1. **Every page returns 200.**
2. **Every component page has all five tabs, and each tab has content.**
3. **Every header link returns 200**, except a Figma link to a team-only file, which may
   answer 403.

**Only then** write each component's link to the board — and only in a column the
registry names you as owner of (`.claude/skills/registry/SKILL.md`; `Astro Link` is
listed there as Human-owned, so check before writing). If you are not the owner, put the
links in your report and write nothing.

**If verification fails, write nothing to the board and report the failure.**

## References
- Stack, URLs and commands: `tools.md`
- Rules: `CLAUDE.md` (never edit `tokens/` or `build/`; never invent a token)
- Intent files: `src/components/<Name>/<Name>.intent.json` (see `component-intent`)
- Board contract: `.claude/skills/registry/SKILL.md`

## Self-check
- [ ] The whole site was built, not one page
- [ ] The sidebar is written out in `astro.config.mjs` in the listed order
- [ ] Every generated page came from `generate.mjs`; none was hand-edited
- [ ] The pinned commit is recorded; `board.json` holds no record IDs
- [ ] Every component page has the header strip and all five tabs, in order, with the same headings on every page
- [ ] No hex of its own in the stylesheet; fonts are self-hosted
- [ ] Missing sources show a notice; nothing was invented
- [ ] Build had zero broken internal links; home, one component page and Tokens were opened in light and dark
- [ ] After deploying: every page 200, five tabs with content, every header link 200 (Figma 403 allowed)
- [ ] Board written only after verification passed, and only in a column you own
