import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { PlusIcon } from './PlusIcon';

// Prop names and values match the Figma component set "Button / Primary" (66:459).
export type ButtonState = 'Default' | 'Hover' | 'Press' | 'Focus' | 'Disable';
export type ButtonIconStyle = 'Both icons' | 'none' | 'leading icon' | 'trailing icon' | 'Icon only';
export type ButtonShape = 'Rounded' | 'Pill';
export type ButtonSize = '32' | '48' | '56';
export type ButtonType = 'Default' | 'Outline';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'> {
  /** Figma text property "Label". For `Icon only` it becomes the accessible name. */
  labelText?: string;
  /**
   * Figma "State". `Default` lets hover, press and focus happen naturally.
   * `Hover`, `Press` and `Focus` pin that look (for docs and QA). `Disable` disables the button.
   */
  state?: ButtonState;
  /** Figma "Icon-style". */
  iconStyle?: ButtonIconStyle;
  /** Figma "Shape". */
  shape?: ButtonShape;
  /** Figma "Size": the button height in px. */
  size?: ButtonSize;
  /** Figma "Type": solid fill or outline. */
  type?: ButtonType;
  /** Replaces the default plus in the "Leading Icon" slot (also used for `Icon only`). */
  leadingIcon?: ReactNode;
  /** Replaces the default plus in the "Trailing Icon" slot. */
  trailingIcon?: ReactNode;
  /** The HTML button type. Renamed because Figma's "Type" owns `type`; see docs/naming-suggestions.md. */
  htmlType?: 'button' | 'submit' | 'reset';
}

export function Button({
  labelText = 'Label',
  state = 'Default',
  iconStyle = 'none',
  shape = 'Rounded',
  size = '32',
  type = 'Default',
  leadingIcon,
  trailingIcon,
  htmlType = 'button',
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || state === 'Disable';
  const iconOnly = iconStyle === 'Icon only';
  // Figma: 16px at Size 32, 24px at 48 and 56, except Icon only at 56 which is 32px.
  const iconPx = size === '32' ? 16 : iconOnly && size === '56' ? 32 : 24;
  const icon = (custom: ReactNode, slot: string) => (
    <span className="cc-button__icon" data-slot={slot}>
      {custom ?? <PlusIcon size={iconPx} />}
    </span>
  );

  const showLeading = iconStyle === 'Both icons' || iconStyle === 'leading icon';
  const showTrailing = iconStyle === 'Both icons' || iconStyle === 'trailing icon';

  return (
    <button
      {...rest}
      type={htmlType}
      disabled={isDisabled}
      aria-label={iconOnly ? (rest['aria-label'] ?? labelText) : rest['aria-label']}
      className={['cc-button', className].filter(Boolean).join(' ')}
      data-type={type}
      data-shape={shape}
      data-size={size}
      data-icon-style={iconStyle}
      data-state={isDisabled ? 'Disable' : state}
    >
      {iconOnly ? (
        icon(leadingIcon, 'icon')
      ) : (
        <span className="cc-button__container">
          {showLeading && icon(leadingIcon, 'leading')}
          <span className="cc-button__label">{labelText}</span>
          {showTrailing && icon(trailingIcon, 'trailing')}
        </span>
      )}
    </button>
  );
}
