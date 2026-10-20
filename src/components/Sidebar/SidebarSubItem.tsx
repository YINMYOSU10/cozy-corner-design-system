import type { AnchorHTMLAttributes } from 'react';

// Sidebar/item/sub-item (Figma component set 453:148). Figma properties:
//   Label       TEXT     default "Fiction"                  -> label
//   Count       TEXT     default "6"                        -> count
//   Show count  BOOLEAN  default false                      -> showCount
//   State       VARIANT  Default | Hover | Active           -> state
//
// A child link under an expanded SidebarItem: a 2px tree line, then a pill.
export type SidebarSubItemState = 'Default' | 'Hover' | 'Active';

type Shared = {
  /** Figma text property "Label". */
  label?: string;
  /** Figma text property "Count". */
  count?: string;
  /** Figma boolean property "Show count". */
  showCount?: boolean;
  /** Figma variant "State". */
  state?: SidebarSubItemState;
};

export type SidebarSubItemProps = Shared & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Shared | 'children'>;

export function SidebarSubItem({
  label = 'Fiction',
  count = '6',
  showCount = false,
  state = 'Default',
  className,
  ...rest
}: SidebarSubItemProps) {
  return (
    <a
      {...rest}
      className={['cc-sidebar-sub-item', className].filter(Boolean).join(' ')}
      data-mode="dashboard"
      data-state={state}
      aria-current={state === 'Active' ? 'page' : rest['aria-current']}
    >
      <span className="cc-sidebar-sub-item__tree-line" aria-hidden="true" />
      <span className="cc-sidebar-sub-item__pill">
        <span className="cc-sidebar-sub-item__label">{label}</span>
        {showCount && <span className="cc-sidebar-sub-item__count">{count}</span>}
      </span>
    </a>
  );
}
