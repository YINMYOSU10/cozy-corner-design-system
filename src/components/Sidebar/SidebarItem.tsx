import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { CaretDownGlyph, CaretRightGlyph, SquaresFourGlyph } from '../Icon/glyphs';
import './Sidebar.css';

// Sidebar/item/nav-item (Figma component set 453:135). Figma properties:
//   Label       TEXT           default "Overview"                      -> label
//   Icon        INSTANCE_SWAP  default Icon/SquaresFour (34:5147)      -> icon
//   Count       TEXT           default "12"                            -> count
//   Show count  BOOLEAN        default false                           -> showCount
//   State       VARIANT        Default | Hover | Active | Focused      -> state
//   Expand      VARIANT        None | Collapsed | Expanded             -> expand
//
// 12 variants (4 States x 3 Expands). Expand=None is a plain link (no chevron);
// Collapsed / Expanded are buttons that show Icon/CaretRight / Icon/CaretDown.
// `state` pins a look for docs; real :hover and :focus-visible work on their own.
// `state="Active"` marks the current page (aria-current="page").
export type SidebarItemState = 'Default' | 'Hover' | 'Active' | 'Focused';
export type SidebarItemExpand = 'None' | 'Collapsed' | 'Expanded';

type Shared = {
  /** Figma text property "Label". */
  label?: string;
  /** Figma instance swap "Icon": a glyph from the Icon set. */
  icon?: ReactNode;
  /** Figma text property "Count". */
  count?: string;
  /** Figma boolean property "Show count". */
  showCount?: boolean;
  /** Figma variant "State". */
  state?: SidebarItemState;
  /** Figma variant "Expand". None = link; Collapsed / Expanded = disclosure button. */
  expand?: SidebarItemExpand;
};

export type SidebarItemProps = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, keyof Shared | 'children'>;

export function SidebarItem({
  label = 'Overview',
  icon,
  count = '12',
  showCount = false,
  state = 'Default',
  expand = 'None',
  className,
  ...rest
}: SidebarItemProps) {
  const active = state === 'Active';
  const classes = ['cc-sidebar-item', className].filter(Boolean).join(' ');
  const content = (
    <>
      {/* Figma min height 40 (unbound, design gap): carried as SVG geometry. */}
      <svg className="cc-sidebar-item__height-sizer" width="0" height="24" aria-hidden="true" focusable="false" />
      {/* Figma 20x20 icon box; no 20 icon size exists, so it is carried as SVG geometry. */}
      <span className="cc-sidebar-item__icon">
        <svg className="cc-sidebar-item__icon-sizer" width="20" height="20" aria-hidden="true" focusable="false" />
        <span className="cc-sidebar-item__icon-slot">{icon ?? <SquaresFourGlyph />}</span>
      </span>
      <span className="cc-sidebar-item__label">{label}</span>
      {showCount && <span className="cc-sidebar-item__count">{count}</span>}
      {expand !== 'None' && (
        <Icon
          className="cc-sidebar-item__chevron"
          size="16"
          swapIcon={expand === 'Expanded' ? <CaretDownGlyph /> : <CaretRightGlyph />}
        />
      )}
    </>
  );

  if (expand === 'None') {
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={classes}
        data-mode="dashboard"
      data-state={state}
        data-expand={expand}
        aria-current={active ? 'page' : rest['aria-current']}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classes}
      data-mode="dashboard"
      data-state={state}
      data-expand={expand}
      aria-expanded={expand === 'Expanded'}
      aria-current={active ? 'page' : rest['aria-current']}
    >
      {content}
    </button>
  );
}
