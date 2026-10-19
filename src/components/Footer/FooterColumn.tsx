import { Children, useId, type HTMLAttributes, type ReactNode } from 'react';
import './Footer.css';

// Footer/item/column (Figma component 500:96). Figma properties:
//   Heading  TEXT  default "EXPLORE"  -> heading
//   Items    SLOT  (Link instances)   -> children
export interface FooterColumnProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Figma text property "Heading". */
  heading?: string;
  /** Figma slot "Items": `Link` instances, or plain text strings (address, hours). Each becomes a list item. */
  children?: ReactNode;
}

export function FooterColumn({ heading = 'EXPLORE', children, className, ...rest }: FooterColumnProps) {
  const headingId = useId();
  const items = Children.toArray(children);
  return (
    <nav
      {...rest}
      aria-labelledby={headingId}
      className={['cc-footer-column', className].filter(Boolean).join(' ')}
    >
      <p id={headingId} className="cc-footer-column__heading">
        {heading}
      </p>
      {items.length > 0 && (
        <ul className="cc-footer-column__items">
          {items.map((item, i) => (
            <li key={i} className="cc-footer-column__item">
              {typeof item === 'string' ? (
                <span className="cc-footer-column__text">{item}</span>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
