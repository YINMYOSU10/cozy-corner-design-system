import type { HTMLAttributes } from 'react';
import { Avatar } from '../Avatar';
import type { AvatarProps } from '../Avatar';
import { Breadcrumb } from '../Breadcrumb';
import type { BreadcrumbProps } from '../Breadcrumb';
import { SearchInput } from '../Fields';
import type { FieldsProps } from '../Fields';
import './TopBar.css';

// Top Bar (Figma component 576:22718). Figma properties:
//   Show search#576:7  BOOLEAN (default true)  -> showSearch
//   Show avatar#576:8  BOOLEAN (default true)  -> showAvatar
// Top Bar has no variants and no interaction states of its own: it is a
// static bar. Hover, focus and typing belong to the composed Fields
// SearchInput and Breadcrumb links.
//
// Composes: Breadcrumb (Levels=2), Fields SearchInput (Size=sm, State=Default,
// leading icon on, label and helper hidden), Avatar (Size=32, Type=Initials, "SU").
export interface TopBarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Figma boolean "Show search". */
  showSearch?: boolean;
  /** Figma boolean "Show avatar". */
  showAvatar?: boolean;
  /** Props passed through to the composed Breadcrumb. */
  breadcrumb?: BreadcrumbProps;
  /** Props passed through to the composed Fields SearchInput. */
  search?: Omit<FieldsProps, 'type'>;
  /** Props passed through to the composed Avatar. */
  avatar?: AvatarProps;
}

export function TopBar({
  showSearch = true,
  showAvatar = true,
  breadcrumb,
  search,
  avatar,
  className,
  ...rest
}: TopBarProps) {
  return (
    <header {...rest} className={['cc-top-bar', className].filter(Boolean).join(' ')}>
      <div className="cc-top-bar__start">
        {/* Sizer: Figma's bar height (56, FIXED) is unbound (design gap), so it is carried as SVG geometry. */}
        <svg className="cc-top-bar__height-sizer" width="0" height="56" aria-hidden="true" focusable="false" />
        <Breadcrumb levels={2} {...breadcrumb} />
      </div>
      <div className="cc-top-bar__actions">
        {showSearch && (
          <div className="cc-top-bar__search">
            {/* Sizer: Figma's Search width (300) is unbound (design gap), so it is carried as SVG geometry. */}
            <svg className="cc-top-bar__sizer" width="300" height="0" aria-hidden="true" focusable="false" />
            <SearchInput
              size="sm"
              placeholderText="Search orders, readers or books"
              showLeadingIcon
              {...search}
            />
          </div>
        )}
        {showAvatar && <Avatar size="32" type="Initials" initials="SU" {...avatar} />}
      </div>
    </header>
  );
}
