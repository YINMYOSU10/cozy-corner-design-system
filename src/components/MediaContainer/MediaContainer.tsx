import type { HTMLAttributes, ReactNode } from 'react';

// Prop names and values match the Figma component set "Media Container" (304:2006).
export type MediaContainerRatio = '5:3' | '1:1';
export type MediaContainerDevice = 'Website' | 'Mobile';
export type MediaContainerType = 'Landscape' | 'Square';
export type MediaContainerState = 'Default' | 'Hover' | 'Focus';

export interface MediaContainerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Figma "Ratio". `5:3` is the landscape frame, `1:1` the square one. */
  ratio?: MediaContainerRatio;
  /** Figma "Device". Website and Mobile use different frame sizes. */
  device?: MediaContainerDevice;
  /**
   * Figma "Type". Figma pairs it with Ratio (5:3 = Landscape, 1:1 = Square),
   * so it defaults from `ratio`. Ratio sets the geometry; Type is descriptive.
   */
  type?: MediaContainerType;
  /**
   * Figma "State". `Default` lets hover and keyboard focus happen for real.
   * `Hover` and `Focus` pin that look (for docs and QA).
   */
  state?: MediaContainerState;
  /** Image source for the "Slide Image" layer (Figma image fill, scale mode FILL = cover). */
  src?: string;
  /** Alternative text for the image. Empty string marks it decorative. */
  alt?: string;
  /** Custom media (e.g. a `<video>`) in place of `src`. Fills the frame and is cropped to cover. */
  media?: ReactNode;
}

// Figma frame size per Ratio x Device (variants 304:2005, 304:2222, 318:2380,
// 318:2400). Width and height are unbound in Figma and there is no size token
// for them (design gap), so they are carried as SVG sizer geometry, as Avatar
// and StatusBar carry their frames.
const FRAME: Record<MediaContainerRatio, Record<MediaContainerDevice, [number, number]>> = {
  '5:3': { Website: [380, 225], Mobile: [315, 185] },
  '1:1': { Website: [280, 280], Mobile: [264, 264] },
};

export function MediaContainer({
  ratio = '5:3',
  device = 'Website',
  type,
  state = 'Default',
  src,
  alt = '',
  media,
  className,
  tabIndex = 0,
  ...rest
}: MediaContainerProps) {
  const resolvedType: MediaContainerType = type ?? (ratio === '1:1' ? 'Square' : 'Landscape');
  const [w, h] = FRAME[ratio][device];

  return (
    <div
      {...rest}
      // Figma defines a Focus state, so the container takes keyboard focus.
      tabIndex={tabIndex}
      className={className ? `cc-media-container ${className}` : 'cc-media-container'}
      data-ratio={ratio}
      data-device={device}
      data-type={resolvedType}
      data-state={state}
    >
      <span className="cc-media-container__frame">
        <svg className="cc-media-container__sizer" width={w} height={h} aria-hidden="true" focusable="false" />
        <span className="cc-media-container__media">
          {media ?? (src ? <img src={src} alt={alt} /> : null)}
        </span>
        {/* Figma "Overlay" frame: visible only in State=Hover. */}
        <span className="cc-media-container__overlay" aria-hidden="true" />
      </span>
    </div>
  );
}
