import type { HTMLAttributes } from 'react';
import { LogoGlyph } from './LogoGlyph';

// Logo (Figma component set 4:484). Figma properties:
//   Platform       VARIANT  Dashboard | Website (default Website)  -> platform
//   Show Glyph     BOOLEAN  default true                            -> showGlyph
//   Show Wordmark  BOOLEAN  default true                            -> showWordmark
export type LogoPlatform = 'Dashboard' | 'Website';

export type LogoProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  platform?: LogoPlatform;
  showGlyph?: boolean;
  showWordmark?: boolean;
};

const WORDMARK = 'Cozy Corner';

export function Logo({
  platform = 'Website',
  showGlyph = true,
  showWordmark = true,
  className,
  ...rest
}: LogoProps) {
  // With the wordmark hidden, the glyph alone still has to name the brand.
  const glyphOnly = showGlyph && !showWordmark;
  return (
    <span
      {...rest}
      className={['cc-logo', className].filter(Boolean).join(' ')}
      data-platform={platform}
      // Dashboard resolves the typography-logo-* tokens in dashboard mode.
      data-mode={platform === 'Dashboard' ? 'dashboard' : undefined}
      role={glyphOnly ? 'img' : undefined}
      aria-label={glyphOnly ? WORDMARK : undefined}
    >
      {showGlyph && <LogoGlyph platform={platform} />}
      {showWordmark && <span className="cc-logo__wordmark">{WORDMARK}</span>}
    </span>
  );
}
