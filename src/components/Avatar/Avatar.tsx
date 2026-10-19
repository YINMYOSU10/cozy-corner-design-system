import type { HTMLAttributes } from 'react';
import { UserGlyph } from '../Icon';
import './Avatar.css';

// Avatar (Figma component set 576:24). Figma properties:
//   Size      VARIANT  32 | 40 | 48 (default 32)          -> size
//   Type      VARIANT  Initials | Icon (default Initials)  -> type
//   Initials  TEXT     default "SU"                        -> initials
//
// A small circle that stands for a person. The Icon type draws Icon/User
// (Figma 34:881) directly, imported from the Icon component's glyph set.
// Avatar is not interactive: it has no hover, press, focus, disabled or
// loading state.
export type AvatarSize = '32' | '40' | '48';
export type AvatarType = 'Initials' | 'Icon';

export type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Figma "Size": the circle's width and height, in px. */
  size?: AvatarSize;
  /** Figma "Type": Initials shows text; Icon shows the Icon/User glyph. */
  type?: AvatarType;
  /** Figma "Initials": the text shown when type is Initials. */
  initials?: string;
  /**
   * Accessible name, e.g. the person's full name. Without it the avatar is
   * decorative (`aria-hidden`); with it the avatar is announced as an image.
   */
  label?: string;
};

// Figma's icon box per Size (instances 576:6, 576:13, 576:20). Unbound in
// Figma and there is no 16/20/24 icon-size token (design gap), so the box is
// carried as SVG geometry from the Size value, as Icon carries its frame.
const ICON_BOX: Record<AvatarSize, string> = { '32': '16', '40': '20', '48': '24' };

export function Avatar({
  size = '32',
  type = 'Initials',
  initials = 'SU',
  label,
  className,
  ...rest
}: AvatarProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  const box = ICON_BOX[size];
  return (
    <span
      {...rest}
      {...a11y}
      className={className ? `cc-avatar ${className}` : 'cc-avatar'}
      data-size={size}
      data-type={type}
    >
      {/* Sizer: the circle's size is the Figma Size value, which has no
          token bound in Figma (design gap), so it is carried as SVG geometry. */}
      <svg className="cc-avatar__sizer" width={size} height={size} aria-hidden="true" focusable="false" />
      <span className="cc-avatar__content">
        {type === 'Icon' ? (
          <span className="cc-avatar__icon">
            <svg className="cc-avatar__icon-sizer" width={box} height={box} aria-hidden="true" focusable="false" />
            <span className="cc-avatar__icon-slot">
              <UserGlyph />
            </span>
          </span>
        ) : (
          <span className="cc-avatar__initials">{initials}</span>
        )}
      </span>
    </span>
  );
}
