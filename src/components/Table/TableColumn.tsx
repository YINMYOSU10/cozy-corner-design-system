import type { HTMLAttributes, ReactNode } from 'react';

// "Column: Column" (Figma 438:19): a header cell stacked over body cells, one flexible
// column of the Table's Columns slot. It is a plain frame in Figma, with no properties.
export type TableColumnProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** The column's Table/item/header-cell. */
  header?: ReactNode;
  /** The column's Table/item/cell instances. */
  children?: ReactNode;
};

export function TableColumn({ header, children, className, ...rest }: TableColumnProps) {
  return (
    <div {...rest} className={['cc-table-column', className].filter(Boolean).join(' ')}>
      {header}
      {children}
    </div>
  );
}
