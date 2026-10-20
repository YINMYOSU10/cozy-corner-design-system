import type { HTMLAttributes } from 'react';
import './Table.css';

// Table/item/title-bar (Figma 437:20). Figma properties:
//   Title        TEXT     default "Recent activity"  -> title
//   Show helper  BOOLEAN  default false              -> showHelper
//   Helper text  TEXT     default "Helper text"      -> helperText
// Not interactive: no hover, press, focus, disabled or loading state.
export type TableTitleBarProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** Figma "Title". */
  title?: string;
  /** Figma "Show helper": shows the right-aligned helper text. */
  showHelper?: boolean;
  /** Figma "Helper text". */
  helperText?: string;
};

export function TableTitleBar({
  title = 'Recent activity',
  showHelper = false,
  helperText = 'Helper text',
  className,
  ...rest
}: TableTitleBarProps) {
  return (
    <div {...rest} className={['cc-table-title-bar', className].filter(Boolean).join(' ')}>
      <p className="cc-table-title-bar__title">{title}</p>
      {showHelper && <p className="cc-table-title-bar__helper">{helperText}</p>}
    </div>
  );
}
