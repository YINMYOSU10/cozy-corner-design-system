import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { HouseGlyph } from '../Icon/glyphs';

// Header/item/nav-item (Figma component set 500:20). Figma properties:
//   Label     TEXT           default "Home"                             -> label
//   Icon      INSTANCE_SWAP  default Icon/House (34:435)                -> icon
//   Platform  VARIANT        Website | Mobile (default Website)         -> platform
//   State     VARIANT        Default | Hover | Active (default Default) -> state
//
// The set has 5 variants: Website x Default/Hover/Active, Mobile x Default/Active.
// Mobile has no Hover variant, so the Mobile item does not change on hover.
// Website draws only the label; Mobile draws the icon above the label.
//
// `state="Active"` marks the current page (aria-current="page"). Hover is real
// pointer behaviour on Website; `state="Hover"` pins that look (for docs).
export type HeaderNavItemPlatform = 'Website' | 'Mobile';
export type HeaderNavItemState = 'Default' | 'Hover' | 'Active';

export interface HeaderNavItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  /** Figma text property "Label". */
  label?: string;
  /** Figma instance swap "Icon": a glyph from the Icon set. Drawn on Mobile only. */
  icon?: ReactNode;
  /** Figma variant "Platform". */
  platform?: HeaderNavItemPlatform;
  /** Figma variant "State". Mobile has no Hover; it renders as Default. */
  state?: HeaderNavItemState;
}

export function HeaderNavItem({
  label = 'Home',
  icon,
  platform = 'Website',
  state = 'Default',
  className,
  ...rest
}: HeaderNavItemProps) {
  const resolvedState = platform === 'Mobile' && state === 'Hover' ? 'Default' : state;
  const active = resolvedState === 'Active';
  return (
    <a
      {...rest}
      className={['cc-header-nav-item', className].filter(Boolean).join(' ')}
      data-platform={platform}
      data-state={resolvedState}
      aria-current={active ? 'page' : rest['aria-current']}
    >
      {platform === 'Mobile' && (
        <span className="cc-header-nav-item__icon">
          <Icon size="24" swapIcon={icon ?? <HouseGlyph />} />
        </span>
      )}
      <span className="cc-header-nav-item__label">{label}</span>
    </a>
  );
}
