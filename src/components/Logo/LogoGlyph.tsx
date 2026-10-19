import type { LogoPlatform } from './Logo';

// The "cute-book-icon 2" glyph, one geometry per Platform, copied from the
// Figma vectors (Website 4:447, Dashboard 4:486). Numbers here are vector
// geometry in the artwork's own viewBox units, not visual design values.
//
// Paint is NOT set here. Every path carries a data-paint role and Logo.css
// paints each role with the semantic token Figma binds (same on both
// platforms):
//   page  4:448 / 4:487  fill   color/accent/gold/default
//   spine 4:449 / 4:488  fill   color/bg/inverse, stroke color/icon/primary
//   line  4:450–455 / 4:489–494  stroke color/icon/primary
//   heart 4:456 / 4:495  fill   color/bg/negative/lightFocused

type Geometry = {
  /** Artwork frame size, taken from the Figma vector frame (unbound in Figma). */
  frame: number;
  spineWidth: number;
  lineWidth: number;
  page: string;
  spine: string;
  lines: string[];
  heart: string;
};

const GEOMETRY: Record<LogoPlatform, Geometry> = {
  Website: {
    frame: 48,
    spineWidth: 0.505263,
    lineWidth: 0.421053,
    page: 'M24.0001 10.2857C18.8572 6.85716 10.2858 6.17145 5.14292 8.57145V36C10.2858 33.6 18.8572 34.2857 24.0001 37.7143C29.1429 34.2857 37.7143 33.6 42.8572 36V8.57145C37.7143 6.17145 29.1429 6.85716 24.0001 10.2857Z',
    spine: 'M24 10.2857V37.7143',
    lines: [
      'M7.54285 12C12 10.2857 17.8286 10.9714 21.2571 13.7143',
      'M7.54285 18.8571C12 17.1428 17.8286 17.8286 21.2571 20.5714',
      'M7.54285 25.7143C12 24 17.8286 24.6857 21.2571 27.4286',
      'M26.7429 13.7143C30.1715 10.9714 36.0001 10.2857 40.4572 12',
      'M26.7429 20.5714C30.1715 17.8286 36.0001 17.1428 40.4572 18.8571',
      'M26.7429 27.4286C30.1715 24.6857 36.0001 24 40.4572 25.7143',
    ],
    heart: 'M24 6.17142C22.9714 4.11428 19.8857 4.11428 19.8857 6.85713C19.8857 8.91428 24 10.9714 24 10.9714C24 10.9714 28.1143 8.91428 28.1143 6.85713C28.1143 4.11428 25.0286 4.11428 24 6.17142Z',
  },
  Dashboard: {
    frame: 32,
    spineWidth: 0.505263,
    lineWidth: 0.421053,
    page: 'M16 6.85716C12.5715 4.57144 6.85718 4.1143 3.42861 5.7143V24C6.85718 22.4 12.5715 22.8572 16 25.1429C19.4286 22.8572 25.1429 22.4 28.5715 24V5.7143C25.1429 4.1143 19.4286 4.57144 16 6.85716Z',
    spine: 'M16 6.85715V25.1429',
    lines: [
      'M5.02857 7.99999C7.99999 6.85714 11.8857 7.31428 14.1714 9.14285',
      'M5.02857 12.5714C7.99999 11.4286 11.8857 11.8857 14.1714 13.7143',
      'M5.02857 17.1428C7.99999 16 11.8857 16.4571 14.1714 18.2857',
      'M17.8286 9.14285C20.1143 7.31428 24.0001 6.85714 26.9715 7.99999',
      'M17.8286 13.7143C20.1143 11.8857 24.0001 11.4286 26.9715 12.5714',
      'M17.8286 18.2857C20.1143 16.4571 24.0001 16 26.9715 17.1428',
    ],
    heart: 'M16 4.11428C15.3143 2.74285 13.2571 2.74285 13.2571 4.57142C13.2571 5.94285 16 7.31428 16 7.31428C16 7.31428 18.7429 5.94285 18.7429 4.57142C18.7429 2.74285 16.6857 2.74285 16 4.11428Z',
  },
};

export type LogoGlyphProps = { platform: LogoPlatform };

export function LogoGlyph({ platform }: LogoGlyphProps) {
  const g = GEOMETRY[platform];
  return (
    <svg
      className="cc-logo__glyph"
      viewBox={`0 0 ${g.frame} ${g.frame}`}
      width={g.frame}
      height={g.frame}
      aria-hidden="true"
      focusable="false"
    >
      <path d={g.page} opacity={0.9} data-paint="page" />
      <path d={g.spine} strokeWidth={g.spineWidth} strokeLinecap="round" data-paint="spine" />
      {g.lines.map((d) => (
        <path key={d} d={d} opacity={0.6} strokeWidth={g.lineWidth} strokeLinecap="round" data-paint="line" />
      ))}
      <path d={g.heart} data-paint="heart" />
    </svg>
  );
}
