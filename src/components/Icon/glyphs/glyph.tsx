// Shared drawing routine for every glyph on the Figma "Icons" page (frame
// 34:423). Each glyph file holds only vector geometry copied from the Figma
// export: path data in the glyph's own viewBox and stroke weights. Those are
// drawing units, not visual design values.
//
// Paint is never set per glyph. Every stroke and fill is `currentColor`, so
// the colour comes from the parent: inside <Icon> that is --cc-icon-color,
// which defaults to color/icon/secondary. In Figma the glyph masters are bound
// to "Color Tokens/Content/Dark/Primary", a variable from another library
// that is not in our token set (reported as a design gap), and Icon's own
// variants override it with color/icon/secondary.
//
// Strokes keep their on-screen weight at every size (non-scaling), as the
// Icon component does in Figma for its 12/16/24/32 frames.
import type { JSX } from 'react';

export type GlyphPath = {
  /** SVG path data, in the glyph's viewBox. */
  d: string;
  /** Stroke weight from the Figma export. Omitted when the path is not stroked. */
  stroke?: number;
  /** Filled with the icon colour. */
  fill?: boolean;
  /** Stroke ends and joins are not rounded (Figma default caps). */
  butt?: boolean;
  /** Stroke miter limit from the Figma export. */
  miter?: number;
};

export type Glyph = (() => JSX.Element) & {
  /** The component name exactly as it appears in Figma. */
  figmaName: string;
  /** The Figma node id of the glyph component. */
  figmaId: string;
};

export function glyph(figmaName: string, figmaId: string, paths: GlyphPath[], viewBox = '0 0 24 24'): Glyph {
  const Drawing = () => (
    <svg
      className="cc-icon__glyph"
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-glyph={figmaName}
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill={p.fill ? 'currentColor' : undefined}
          stroke={p.stroke ? 'currentColor' : undefined}
          strokeWidth={p.stroke}
          strokeLinecap={p.stroke && !p.butt ? 'round' : undefined}
          strokeLinejoin={p.stroke && !p.butt ? 'round' : undefined}
          strokeMiterlimit={p.miter}
          vectorEffect={p.stroke ? 'non-scaling-stroke' : undefined}
        />
      ))}
    </svg>
  );
  Drawing.displayName = `Glyph(${figmaName})`;
  return Object.assign(Drawing, { figmaName, figmaId });
}
