import type { HTMLAttributes, ReactNode } from 'react';
import { Badge } from '../Badge';
import { Tag } from '../Tag';
import { Toggle } from '../Toggle/Toggle';
import { ButtonInfo } from '../ButtonInfo/ButtonInfo';
import { DotsThreeGlyph } from '../Icon';

// Table/item/cell (Figma 437:59). Figma properties:
//   Type         VARIANT  Text | Number | Badge | Tags | Toggle | Action | Custom | More (default Text)
//   Emphasis     VARIANT  Default | Muted | Strong (default Default; Muted/Strong exist for Type=Text only)
//   Text         TEXT     default "Order placed"   -> text
//   Strong text  TEXT     default "BD-1042"        -> strongText
//   Number       TEXT     default "4"              -> number
//   Show tag 2   BOOLEAN  default true             -> showTag2
//   Show tag 3   BOOLEAN  default false            -> showTag3
//   Content      SLOT     "Slot for Custom cells." -> children
// Figma defines no hover or selected state for the cell. The Badge, Tag, Toggle and
// Button / Info inside it keep their own states because they are the real components.
export type TableCellType = 'Text' | 'Number' | 'Badge' | 'Tags' | 'Toggle' | 'Action' | 'Custom' | 'More';
export type TableCellEmphasis = 'Default' | 'Muted' | 'Strong';

export type TableCellProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Figma "Type". */
  type?: TableCellType;
  /** Figma "Emphasis". Muted and Strong apply to Type=Text. */
  emphasis?: TableCellEmphasis;
  /** Figma "Text". */
  text?: string;
  /** Figma "Strong text". */
  strongText?: string;
  /** Figma "Number". */
  number?: string;
  /** Figma "Show tag 2". */
  showTag2?: boolean;
  /** Figma "Show tag 3". */
  showTag3?: boolean;
  /** Figma "Content" slot (Type=Custom). For Badge, Tags, Toggle, Action and More it replaces the default content. */
  children?: ReactNode;
};

export function TableCell({
  type = 'Text',
  emphasis = 'Default',
  text = 'Order placed',
  strongText = 'BD-1042',
  number = '4',
  showTag2 = true,
  showTag3 = false,
  children,
  className,
  ...rest
}: TableCellProps) {
  let content: ReactNode;
  switch (type) {
    case 'Number':
      content = <p className="cc-table-cell__number">{number}</p>;
      break;
    case 'Badge':
      content = children ?? <Badge type="Positive" label="Delivered" />;
      break;
    case 'Tags':
      content =
        children ?? (
          <>
            <Tag label="cozy" />
            {showTag2 && <Tag label="mystery" />}
            {showTag3 && <Tag label="quiet" />}
          </>
        );
      break;
    case 'Toggle':
      content = children ?? <Toggle defaultChecked aria-label="Toggle" />;
      break;
    case 'Action':
      content = children ?? <ButtonInfo labelText="Mark resolved" size="32" />;
      break;
    case 'Custom':
      content = <div className="cc-table-cell__content">{children}</div>;
      break;
    case 'More':
      content =
        children ?? (
          <button type="button" className="cc-table-cell__more" aria-label="More">
            <span className="cc-table-cell__more-icon" aria-hidden="true">
              <DotsThreeGlyph />
            </span>
          </button>
        );
      break;
    default:
      content =
        emphasis === 'Strong' ? (
          <p className="cc-table-cell__text cc-table-cell__text--strong">{strongText}</p>
        ) : (
          <p className="cc-table-cell__text" data-emphasis={emphasis}>
            {text}
          </p>
        );
  }
  return (
    <div
      {...rest}
      className={['cc-table-cell', className].filter(Boolean).join(' ')}
      data-type={type}
      data-emphasis={emphasis}
    >
      {/* Sizer: the cell height (56) has no token in Figma (design gap), carried as SVG
          geometry like Tag/Icon. 55 + the 1px top border = 56. */}
      <svg className="cc-table-cell__sizer" width="0" height="55" aria-hidden="true" focusable="false" />
      {content}
    </div>
  );
}
