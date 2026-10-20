import type { HTMLAttributes, ReactNode } from 'react';
import { Logo } from '../Logo/Logo';
import './Header.css';

// Header (Figma component set 500:95). Figma properties:
//   Platform    VARIANT  Website | Mobile (default Website)          -> platform
//   Navigation  SLOT     (Header/item/nav-item instances)            -> children
//
// Website (500:21): Logo on the left, the Navigation slot on the right.
// Mobile (500:45): no Logo; the Navigation slot fills the bar (bottom tab bar).
export type HeaderPlatform = 'Website' | 'Mobile';

export interface HeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Figma variant "Platform". */
  platform?: HeaderPlatform;
  /** Figma slot "Navigation": `HeaderNavItem` instances, with the same `platform`. */
  children?: ReactNode;
  /** Accessible name of the navigation landmark. */
  navigationLabel?: string;
}

export function Header({
  platform = 'Website',
  children,
  navigationLabel = 'Main',
  className,
  ...rest
}: HeaderProps) {
  return (
    <header
      {...rest}
      className={['cc-header', className].filter(Boolean).join(' ')}
      data-platform={platform}
    >
      {/* Figma instance 500:22: Logo Platform=Website, glyph and wordmark shown. */}
      {platform === 'Website' && <Logo platform="Website" />}
      <nav className="cc-header__navigation" aria-label={navigationLabel}>
        {children}
      </nav>
    </header>
  );
}
