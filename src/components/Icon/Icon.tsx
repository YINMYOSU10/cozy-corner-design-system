import type { HTMLAttributes, ReactNode } from 'react';
import { PlusGlyph } from './glyphs';

// Icon (Figma component set 48:1251). Figma properties:
//   Size      VARIANT        12 | 16 | 24 | 32 (default 12)      -> size
//   Type      VARIANT        Standard | Outlined (default Standard) -> type
//   Shape     VARIANT        Rounded | Circle (default Rounded)   -> shape
//   swapIcon  INSTANCE_SWAP  default Icon/Plus (34:5278)          -> swapIcon
//
// The frame holds one glyph and keeps its size and shape consistent. Icon is
// not interactive: it has no hover, press, focus, disabled or loading state.
export type IconSize = '12' | '16' | '24' | '32';
export type IconType = 'Standard' | 'Outlined';
export type IconShape = 'Rounded' | 'Circle';

export type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Figma "Size": the square frame, in px. */
  size?: IconSize;
  /** Figma "Type": Standard has no border; Outlined draws a color/border/neutral/default ring. */
  type?: IconType;
  /** Figma "Shape": Rounded uses borderRadius/xs; Circle uses borderRadius/circle (and, on Standard, a color/bg/base fill). */
  shape?: IconShape;
  /**
   * Figma "swapIcon": the glyph inside the frame. Defaults to Icon/Plus.
   * The glyph is stretched to fill the frame and painted with `currentColor`,
   * so an SVG that strokes or fills with `currentColor` takes the icon colour.
   */
  swapIcon?: ReactNode;
  /**
   * Accessible name. Without it the icon is decorative (`aria-hidden`);
   * with it the icon is announced as an image.
   */
  label?: string;
};

export function Icon({
  size = '12',
  type = 'Standard',
  shape = 'Rounded',
  swapIcon,
  label,
  className,
  ...rest
}: IconProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <span
      {...rest}
      {...a11y}
      className={className ? `cc-icon ${className}` : 'cc-icon'}
      data-size={size}
      data-type={type}
      data-shape={shape}
    >
      {/* Sizer: the frame size is the Figma Size value, which has no size
          token (design gap), so it is carried as SVG geometry, not CSS. */}
      <svg className="cc-icon__sizer" width={size} height={size} aria-hidden="true" focusable="false" />
      <span className="cc-icon__slot">{swapIcon ?? <PlusGlyph />}</span>
    </span>
  );
}
