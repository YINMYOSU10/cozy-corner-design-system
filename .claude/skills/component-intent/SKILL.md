---
name: component-intent
description: Write {Component}.intent.json beside a component — when to use it, when not to, what each variant is for, where it goes, what it pairs with, which tokens it needs, and its accessibility facts. Transposed from Figma and the code, never invented.
---

# Write a component's intent file

## When to use this
Use this when a component is built and its usage rules need to exist as data, so the
docs site and the release review can read them. One run covers one component, or every
component when asked. Do not use it to design or change a component, and never to
decide a product rule yourself.

The output is `src/components/<Name>/<Name>.intent.json`.

## The file

```json
{
  "use_when": ["…"],
  "dont_use_when": [{ "when": "…", "use_instead": "…" }],
  "variant_intent": { "<prop>=<value>": "what this variant is for" },
  "placement": ["…"],
  "pairs_with": ["<ComponentName>"],
  "required_tokens": ["--token-name"],
  "a11y": [{ "fact": "…", "source": "src/components/<Name>/<Name>.tsx:42" }]
}
```

- `use_when`, `dont_use_when`: from Figma only (source 1).
- `dont_use_when` entries each name the alternative in `use_instead`, a component or a
  plain-words action. If the Figma text names none, leave `use_instead` empty. Do not
  make one up.
- `variant_intent`: one entry per variant value the component's props allow.
- `placement`: where it goes in a layout.
- `pairs_with`: component names that exist in `src/components/`.
- `required_tokens`: semantic token names the component uses, as written in its CSS.
- `a11y`: facts the code actually implements (role, aria attribute, keyboard behaviour,
  focus ring), each linked to the line that implements it.

## Sources, in this order

### 1 · The component's documentation page in Figma
Read it over the Figma MCP connection. Its usage region already carries when to use,
when not to, and best practice. Transpose it faithfully: keep its meaning and its
wording where it is clear. Do not paraphrase it into something vaguer, and do not
tidy it into something firmer.

If the component has no usage region in Figma: leave `use_when` and `dont_use_when`
empty, and list the component as a gap in your report.

### 2 · The component's code
For `required_tokens`, read `<Name>.css` and collect every `var(--…)`. For
`variant_intent`, read the prop types in `<Name>.tsx`. Describe a variant by what the
design says it is for. If Figma says nothing about a variant's purpose, say what the
code does with it ("renders the outline style") and nothing more.

For `a11y`, only write what the code does. Read the markup and the handlers.

### 3 · The stories
For `placement` and `pairs_with`, read how the stories compose the component and what
it is shown next to. A pairing needs a story or a Figma line behind it.

## Never invent a product rule
A plausible sentence in these fields is worse than an empty field, because nothing
downstream can tell it is wrong. If no source states it, leave the field empty (an
empty array or object) and say so in the report. This includes: a "best practice"
nobody wrote, an alternative nobody named, an accessibility claim the code does not
implement.

## Report
List, per component: the fields filled, the fields left empty and why, and every
component with no usage region in Figma as a gap. A gap is a finding for the design
team, not something to fill in here.

## References
- Components: `src/components/<Name>/`
- Tokens (generated, read-only): `build/tokens/css/tokens.css`
- Rules: `CLAUDE.md`, `tools.md`

## Self-check
- [ ] `use_when` and `dont_use_when` came from the Figma usage region, in its own words
- [ ] Every `dont_use_when` has a `use_instead`, or an empty one because Figma named none
- [ ] Every `required_tokens` entry appears in the component's CSS and in `tokens.css`
- [ ] Every `variant_intent` key is a real prop value
- [ ] Every `pairs_with` name is a real component with a story or Figma line behind it
- [ ] Every `a11y` fact links to the line that implements it
- [ ] Components with no usage region are listed as gaps, with empty use fields
- [ ] You changed nothing except `*.intent.json` files
