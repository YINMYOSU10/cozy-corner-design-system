import type { HTMLAttributes, ReactNode } from 'react';
import { StatusBatteryGlyph, StatusCellularGlyph, StatusWifiGlyph } from '../Icon';

// Status Bar (Figma component set 525:49). Figma properties:
//   Mode     VARIANT        Light | Dark (default Light)               -> mode
//   Time     TEXT           default "9:41"                              -> time
//   Signal   INSTANCE_SWAP  default Icon/StatusCellular (527:7)         -> signal
//   Wifi     INSTANCE_SWAP  default Icon/StatusWifi (527:12)            -> wifi
//   Battery  INSTANCE_SWAP  default Icon/StatusBattery (527:17)         -> battery
//
// Presentational only: no hover, press, focus, disabled or loading state.
// It is decorative device chrome, so it is hidden from assistive tech.
export type StatusBarMode = 'Light' | 'Dark';

export type StatusBarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Figma "Mode": Light (color/bg/base) or Dark (color/bg/inverse). */
  mode?: StatusBarMode;
  /** Figma "Time": the clock text. */
  time?: string;
  /** Figma "Signal": glyph swapped into the signal slot. */
  signal?: ReactNode;
  /** Figma "Wifi": glyph swapped into the wifi slot. */
  wifi?: ReactNode;
  /** Figma "Battery": glyph swapped into the battery slot. */
  battery?: ReactNode;
};

export function StatusBar({
  mode = 'Light',
  time = '9:41',
  signal,
  wifi,
  battery,
  className,
  ...rest
}: StatusBarProps) {
  return (
    <div
      {...rest}
      aria-hidden="true"
      className={className ? `cc-status-bar ${className}` : 'cc-status-bar'}
      data-mode={mode}
    >
      <span className="cc-status-bar__time">
        {/* Sizer: the 44px bar height has no size token (design gap), so it is
            carried as SVG geometry, as Icon does for its frame. */}
        <svg className="cc-status-bar__sizer" width="0" height="44" aria-hidden="true" focusable="false" />
        {time}
      </span>
      <span className="cc-status-bar__indicators">
        <span className="cc-status-bar__indicator">
          <svg className="cc-status-bar__sizer" width="22" height="22" aria-hidden="true" focusable="false" />
          <span className="cc-status-bar__slot">{signal ?? <StatusCellularGlyph />}</span>
        </span>
        <span className="cc-status-bar__indicator">
          <svg className="cc-status-bar__sizer" width="22" height="22" aria-hidden="true" focusable="false" />
          <span className="cc-status-bar__slot">{wifi ?? <StatusWifiGlyph />}</span>
        </span>
        <span className="cc-status-bar__indicator">
          <svg className="cc-status-bar__sizer" width="22" height="22" aria-hidden="true" focusable="false" />
          <span className="cc-status-bar__slot">{battery ?? <StatusBatteryGlyph />}</span>
        </span>
      </span>
    </div>
  );
}
