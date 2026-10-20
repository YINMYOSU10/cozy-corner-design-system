import type { HTMLAttributes } from 'react';
import './Table.css';

// Table/item/header-cell (Figma 437:27). Figma properties:
//   Align  VARIANT  Left | Right (default Left)  -> align
//   Label  TEXT     default "COLUMN"             -> label
// Not interactive: no hover, press, focus, disabled or loading state in Figma.
export type TableHeaderCellAlign = 'Left' | 'Right';

export type TableHeaderCellProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Figma "Align". */
  align?: TableHeaderCellAlign;
  /** Figma "Label". */
  label?: string;
};

export function TableHeaderCell({ align = 'Left', label = 'COLUMN', className, ...rest }: TableHeaderCellProps) {
  return (
    <div
      {...rest}
      className={['cc-table-header-cell', className].filter(Boolean).join(' ')}
      data-align={align}
    >
      <p className="cc-table-header-cell__label">{label}</p>
    </div>
  );
}
