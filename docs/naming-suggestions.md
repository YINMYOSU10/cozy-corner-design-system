# Naming suggestions

Figma names that clash with a tool or dependency. Code keeps the Figma name
and moves the clashing one aside; the suggestion is for the design team.

## Button / Primary (66:459)

| Figma property | Clashes with | What code does now | Suggestion |
|---|---|---|---|
| `Type` (Default / Outline) | The HTML `<button type>` attribute (button / submit / reset) | The `type` prop is Figma's Type; the HTML attribute is `htmlType` | Rename the Figma property to `Variant` or `Appearance`, so `type` can mean the HTML button type, as developers expect |
| `State` value `Disable` | The usual word in code and ARIA is `disabled` | The prop value stays `Disable` and maps to the HTML `disabled` attribute | Rename the value to `Disabled` |
| `Icon-style` value `none` | The other values are capitalised (`Both icons`, `Icon only`) | Kept as `none` | Use `None`, and capitalise `leading icon` / `trailing icon` to match |

## Fields (275:141)

| Figma property | Clashes with | What code does now | Suggestion |
|---|---|---|---|
| `Type` (Form Input / Text Input / …) | The HTML `<input type>` attribute | The `type` prop is Figma's Type; the HTML attribute is `htmlType` (as on Button) | Rename the Figma property to `Variant` |
| `Size` (sm / Lg) | The HTML `<input size>` attribute (a number of characters) | `size` is Figma's Size; the HTML attribute is not exposed | Keep, but pick one casing: `sm` / `lg` (or `Sm` / `Lg`) |
| `Size` value `Lg` | Its partner value `sm` is lower case | Kept as `Lg` | Use `lg` to match `sm` |
| `State` value `Disable` | The usual word in code and ARIA is `disabled` | Kept as `Disable`; maps to the HTML `disabled` attribute | Rename to `Disabled` (same suggestion as Button) |
| `State` value `Active` | In CSS `:active` means pressed; this state is the focused, typing look | Kept as `Active`; matches `:focus-within` | Rename to `Focused` |
| Box layer named `Button / primary` | The real `Button / Primary` component | Built as the `FieldBox` subcomponent | Rename the layer to `Input box` |
