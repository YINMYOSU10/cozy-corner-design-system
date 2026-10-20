import type { HTMLAttributes, ReactNode } from 'react';
import { Logo } from '../Logo/Logo';

// Footer (Figma component set 500:261). Figma properties:
//   Platform         VARIANT  Website | Mobile (default Website) -> platform
//   Tagline          TEXT     default "A cozy little shelf feature — pick a mood, unwrap a match."
//   Copyright        TEXT     default "© 2026 Cozy Corner Bookshop"
//   Show copyright   BOOLEAN  default false                      -> showCopyright
//   Columns          SLOT     (Footer/item/column instances)     -> children
export type FooterPlatform = 'Website' | 'Mobile';

export interface FooterProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Figma variant "Platform". Website lays the columns in a row, Mobile stacks them. */
  platform?: FooterPlatform;
  /** Figma text property "Tagline". */
  tagline?: string;
  /** Figma text property "Copyright". Drawn only when `showCopyright` is true. */
  copyright?: string;
  /** Figma boolean "Show copyright". */
  showCopyright?: boolean;
  /** Figma slot "Columns": `FooterColumn` instances. */
  children?: ReactNode;
}

export function Footer({
  platform = 'Website',
  tagline = 'A cozy little shelf feature — pick a mood, unwrap a match.',
  copyright = '© 2026 Cozy Corner Bookshop',
  showCopyright = false,
  children,
  className,
  ...rest
}: FooterProps) {
  return (
    <footer
      {...rest}
      className={['cc-footer', className].filter(Boolean).join(' ')}
      data-platform={platform}
    >
      <div className="cc-footer__content">
        <div className="cc-footer__brand">
          {/* Figma instances 500:110 / 500:188 use Logo Platform=Dashboard on both footers. */}
          <Logo platform="Dashboard" />
          <p className="cc-footer__tagline">{tagline}</p>
        </div>
        <div className="cc-footer__columns">{children}</div>
      </div>
      {showCopyright && (
        <div className="cc-footer__bottom">
          <small className="cc-footer__copyright">{copyright}</small>
        </div>
      )}
    </footer>
  );
}
