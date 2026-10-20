import type { HTMLAttributes, MouseEventHandler } from 'react';
import { Icon, XGlyph } from '../Icon';

// Tag (Figma component set 448:13). Figma properties:
//   size        VARIANT  Small | Medium (default Small)   -> size
//   label       TEXT     default "cozy"                    -> label
//   showRemove  BOOLEAN  default false                     -> showRemove
//
// A neutral label that describes or groups an item. With showRemove it ends
// in a real remove button that draws Icon/X (Figma 195:268, instance
// "Remove"), imported from the Icon component's glyph set.
export type TagSize = 'Small' | 'Medium';

export type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Figma "size". */
  size?: TagSize;
  /** Figma "label": the text shown in the tag. */
  label?: string;
  /** Figma "showRemove": shows the remove button after the label. */
  showRemove?: boolean;
  /** Called when the remove button is activated (click, Enter or Space). */
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  /** Disables the remove button (no Figma state; behaviour only). */
  removeDisabled?: boolean;
};

// Figma's remove icon box per size (instances 448:7 = 12, 448:11 = 16).
// Unbound in Figma; carried as the Icon component's own size prop.
const REMOVE_BOX = { Small: '12', Medium: '16' } as const;

export function Tag({
  size = 'Small',
  label = 'cozy',
  showRemove = false,
  onRemove,
  removeDisabled = false,
  className,
  ...rest
}: TagProps) {
  return (
    <span {...rest} className={className ? `cc-tag ${className}` : 'cc-tag'} data-size={size}>
      {/* Sizer: Small height 24 has no token bound in Figma (design gap), so it
          is carried as SVG geometry. Medium height is bound to spacing/3xl. */}
      {size === 'Small' && <svg className="cc-tag__sizer" width="0" height="24" aria-hidden="true" focusable="false" />}
      <span className="cc-tag__label">{label}</span>
      {showRemove && (
        <button
          type="button"
          className="cc-tag__remove"
          aria-label={`Remove ${label}`}
          disabled={removeDisabled}
          onClick={onRemove}
        >
          <Icon size={REMOVE_BOX[size]} swapIcon={<XGlyph />} />
        </button>
      )}
    </span>
  );
}
