import type { HTMLAttributes, ReactNode } from 'react';
import { TableTitleBar } from './TableTitleBar';
import { TableColumn } from './TableColumn';
import { TableHeaderCell } from './TableHeaderCell';
import { TableCell } from './TableCell';
import './Table.css';

// Table (Figma 438:14). Figma properties:
//   Show title  BOOLEAN  default true  -> showTitle (the "Title bar" instance)
//   Columns     SLOT                    -> children
// Built from TableTitleBar, TableColumn, TableHeaderCell and TableCell.
// Figma defines no hover or selected state for the Table or its cells.
export type TableProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** Shows the "Title bar" instance above the columns. */
  showTitle?: boolean;
  /** The "Title bar" instance; defaults to a bar titled "Table title". */
  titleBar?: ReactNode;
  /** The "Columns" slot: TableColumn elements. Defaults to Figma's three columns of three cells. */
  children?: ReactNode;
};

export function Table({ showTitle = true, titleBar, children, className, ...rest }: TableProps) {
  return (
    <div {...rest} className={['cc-table', className].filter(Boolean).join(' ')}>
      {showTitle && (titleBar ?? <TableTitleBar title="Table title" />)}
      <div className="cc-table__columns">
        {children ?? (
          <>
            {[0, 1, 2].map((i) => (
              <TableColumn key={i} header={<TableHeaderCell />}>
                <TableCell text="Cell" />
                <TableCell text="Cell" />
                <TableCell text="Cell" />
              </TableColumn>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
