import { useState, type ButtonHTMLAttributes, type MouseEvent } from 'react';

// Toggle (Figma 299:317). Turns a setting on or off.
// Figma properties: State (Default · Focus · Disabled) × Checked? (True · False).
//   State     -> `state`   (same values as Figma)
//   Checked?  -> `checked` (Figma True/False -> boolean; the "?" cannot be part
//                           of a prop name, see the Engineer card)
// Behaviour: a native <button role="switch">, so Space and Enter toggle it,
// it takes keyboard focus, and `disabled` really disables it.
export type ToggleState = 'Default' | 'Focus' | 'Disabled';

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'type'> {
  /** Figma `State`. `Focus` forces the focus look (for docs); real keyboard
   *  focus shows it on its own. `Disabled` disables the control. */
  state?: ToggleState;
  /** Figma `Checked?`. Pass it to control the toggle. */
  checked?: boolean;
  /** Starting value when uncontrolled. */
  defaultChecked?: boolean;
  /** Called with the new value whenever the user flips the toggle. */
  onCheckedChange?: (checked: boolean) => void;
}

export function Toggle({
  state = 'Default',
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  className,
  onClick,
  ...rest
}: ToggleProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internal;
  const isDisabled = disabled || state === 'Disabled';

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || isDisabled) return;
    const next = !isChecked;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      {...rest}
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={isDisabled}
      onClick={handleClick}
      className={['cc-toggle', className].filter(Boolean).join(' ')}
      data-state={isDisabled ? 'Disabled' : state}
      data-checked={isChecked ? 'True' : 'False'}
    >
      <span className="cc-toggle__track" aria-hidden="true">
        <span className="cc-toggle__thumb" />
      </span>
    </button>
  );
}
