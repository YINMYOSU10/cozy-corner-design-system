# Naming suggestions

Figma names that clash with a tool or dependency. Code keeps the Figma name
and moves the clashing one aside; the suggestion is for the design team.

## Button / Primary (66:459)

| Figma property | Clashes with | What code does now | Suggestion |
|---|---|---|---|
| `Type` (Default / Outline) | The HTML `<button type>` attribute (button / submit / reset) | The `type` prop is Figma's Type; the HTML attribute is `htmlType` | Rename the Figma property to `Variant` or `Appearance`, so `type` can mean the HTML button type, as developers expect |
| `State` value `Disable` | The usual word in code and ARIA is `disabled` | The prop value stays `Disable` and maps to the HTML `disabled` attribute | Rename the value to `Disabled` |
| `Icon-style` value `none` | The other values are capitalised (`Both icons`, `Icon only`) | Kept as `none` | Use `None`, and capitalise `leading icon` / `trailing icon` to match |
