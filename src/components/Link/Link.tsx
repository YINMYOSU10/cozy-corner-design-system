import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { ArrowSquareOutGlyph, Icon, type IconSize } from '../Icon';
import './Link.css';

// Prop names and values match the Figma component set "Link" (33:382).
export type LinkSize = 'S' | 'L';
export type LinkState = 'Default' | 'Hover' | 'Visited' | 'Disable';
export type LinkType = 'Link' | 'With icon';

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'children'> {
  /** Figma text property "Label". */
  labelText?: string;
  /** Figma boolean "showStartIcon". Only drawn when `type` is `With icon`. */
  showStartIcon?: boolean;
  /** Figma boolean "showEndIcon". Only drawn when `type` is `With icon`. */
  showEndIcon?: boolean;
  /** Figma "Size": `L` is the Link text style, `S` is Link small. */
  size?: LinkSize;
  /**
   * Figma "State". `Default` lets hover, focus and visited happen naturally.
   * `Hover` and `Visited` pin that look (for docs and QA).
   * `Disable` makes the link inert: no href, `aria-disabled`, not focusable.
   */
  state?: LinkState;
  /** Figma instance swap "swapIcon": replaces the default Icon/ArrowSquareOut in both slots. */
  swapIcon?: ReactNode;
  /** Figma "Type": plain text link, or a link with leading/trailing icons. */
  type?: LinkType;
}

export function Link({
  labelText = 'Link',
  showStartIcon = true,
  showEndIcon = true,
  size = 'L',
  state = 'Default',
  swapIcon,
  type = 'Link',
  href,
  onClick,
  className,
  ...rest
}: LinkProps) {
  const isDisabled = state === 'Disable';
  const withIcon = type === 'With icon';
  const glyph = swapIcon ?? <ArrowSquareOutGlyph />;
  // Figma icon slots: 12 at Size L, 10 at Size S. Icon has no 10 size and the
  // value has no token (gap), so 10 is carried as the frame size, as Icon
  // itself carries its sizes; the cast only widens the type.
  const iconSize = (size === 'S' ? '10' : '12') as IconSize;
  const icon = (slot: string) => (
    <span className="cc-link__icon" data-slot={slot}>
      <Icon size={iconSize} swapIcon={glyph} />
    </span>
  );

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      {...rest}
      // A disabled link has no href (so it is not focusable or followable)
      // and says so to assistive tech.
      href={isDisabled ? undefined : href}
      role={isDisabled ? 'link' : rest.role}
      aria-disabled={isDisabled ? true : undefined}
      onClick={handleClick}
      className={['cc-link', className].filter(Boolean).join(' ')}
      data-size={size}
      data-state={state}
      data-type={type}
    >
      {withIcon && showStartIcon && icon('start')}
      <span className="cc-link__label">{labelText}</span>
      {withIcon && showEndIcon && icon('end')}
    </a>
  );
}
