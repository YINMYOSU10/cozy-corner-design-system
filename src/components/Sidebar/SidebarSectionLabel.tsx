import type { HTMLAttributes } from 'react';
import './Sidebar.css';

// Sidebar/item/section-label (Figma component 453:149). Figma properties:
//   Label  TEXT  default "MAIN"  -> label
// A heading that groups Sidebar items, such as Main or Insights. No variants.
export type SidebarSectionLabelProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Figma text property "Label". */
  label?: string;
};

export function SidebarSectionLabel({ label = 'MAIN', className, ...rest }: SidebarSectionLabelProps) {
  return (
    <div {...rest} className={['cc-sidebar-section-label', className].filter(Boolean).join(' ')}>
      {label}
    </div>
  );
}
