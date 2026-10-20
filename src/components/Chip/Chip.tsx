import type { ButtonHTMLAttributes } from 'react';

// Chip (Figma component set 391:37). Figma properties:
//   Label     TEXT     default "Chip"                                  -> label
//   Selected  VARIANT  True | False (default True)                     -> selected (boolean)
//   State     VARIANT  Default | Hover | Focused | Disabled            -> state
//
// A selectable pill. It is a real toggle button (aria-pressed), so Space and
// Enter work, and it is a Tab stop. `state` Hover and Focused pin that look for
// docs and QA; `Default` lets hover and focus happen naturally. `Disabled`
// (or the native `disabled` prop) disables the button for real.
export type ChipState = 'Default' | 'Hover' | 'Focused' | 'Disabled';

export interface ChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  /** Figma text property "Label". */
  label?: string;
  /** Figma "Selected": True or False. */
  selected?: boolean;
  /** Figma "State". */
  state?: ChipState;
}

export function Chip({
  label = 'Chip',
  selected = true,
  state = 'Default',
  disabled,
  className,
  ...rest
}: ChipProps) {
  const isDisabled = disabled || state === 'Disabled';
  return (
    <button
      {...rest}
      type="button"
      className={className ? `cc-chip ${className}` : 'cc-chip'}
      aria-pressed={selected}
      disabled={isDisabled}
      data-selected={selected ? 'True' : 'False'}
      data-state={state}
    >
      {/* Sizer: Figma height 40 has no token bound (design gap), so it is
          carried as SVG geometry, as Tag does. */}
      <svg className="cc-chip__sizer" width="0" height="40" aria-hidden="true" focusable="false" />
      <span className="cc-chip__label">{label}</span>
    </button>
  );
}
