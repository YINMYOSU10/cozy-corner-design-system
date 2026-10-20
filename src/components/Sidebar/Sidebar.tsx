import type { HTMLAttributes, ReactNode } from 'react';
import { Logo } from '../Logo/Logo';
import { SidebarUser } from './SidebarUser';
import './Sidebar.css';

// Sidebar (Figma component 453:4975). Figma properties:
//   Navigation  SLOT     (nav-item, sub-item group, section-label)  -> children
//   Show user   BOOLEAN  default true                               -> showUser
//
// Header frame (453:4976) holds Logo Platform=Dashboard; the Navigation slot
// (453:4989) fills the middle; the User instance (453:5099) sits at the bottom.
// Compose children from SidebarItem, SidebarSubItem (wrap them in a
// `<div className="cc-sidebar__sub-items">` group) and SidebarSectionLabel.
export interface SidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Figma slot "Navigation". */
  children?: ReactNode;
  /** Figma boolean "Show user" (Sidebar/item/user at the bottom). */
  showUser?: boolean;
  /** Figma "Name" of Sidebar/item/user. */
  userName?: string;
  /** Figma "Role" of Sidebar/item/user. */
  userRole?: string;
  /** Accessible name of the navigation landmark. */
  navigationLabel?: string;
}

export function Sidebar({
  children,
  showUser = true,
  userName,
  userRole,
  navigationLabel = 'Main',
  className,
  ...rest
}: SidebarProps) {
  return (
    <aside {...rest} data-mode="dashboard" className={['cc-sidebar', className].filter(Boolean).join(' ')}>
      {/* Sizer: Figma fixes the Sidebar at 237 wide = 204 content + 2x spacing/lg padding
          + 1px stroke (unbound, design gap), carried as SVG geometry. */}
      <svg className="cc-sidebar__sizer" width="204" height="0" aria-hidden="true" focusable="false" />
      <div className="cc-sidebar__header">
        <Logo platform="Dashboard" />
      </div>
      <nav className="cc-sidebar__navigation" aria-label={navigationLabel}>
        {children}
      </nav>
      {showUser && <SidebarUser name={userName} role={userRole} />}
    </aside>
  );
}
