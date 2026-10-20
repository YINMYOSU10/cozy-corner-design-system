import type { HTMLAttributes } from 'react';
import { Avatar } from '../Avatar/Avatar';
import './Sidebar.css';

// Sidebar/item/user (Figma component 453:151). Figma properties:
//   Name  TEXT  default "Su"           -> name
//   Role  TEXT  default "Store Admin"  -> role
// The signed-in staff member: Avatar (Size=40, Type=Initials) with a name and role.
// The Avatar's own "Initials" default (SU) is used, as in Figma.
export type SidebarUserProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Figma text property "Name". */
  name?: string;
  /** Figma text property "Role". */
  role?: string;
};

export function SidebarUser({ name = 'Su', role = 'Store Admin', className, ...rest }: SidebarUserProps) {
  return (
    <div {...rest} data-mode="dashboard" className={['cc-sidebar-user', className].filter(Boolean).join(' ')}>
      <Avatar size="40" type="Initials" />
      <div className="cc-sidebar-user__text">
        <span className="cc-sidebar-user__name">{name}</span>
        <span className="cc-sidebar-user__role">{role}</span>
      </div>
    </div>
  );
}
