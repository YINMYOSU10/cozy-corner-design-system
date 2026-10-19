import type { HTMLAttributes } from 'react';
import './Badge.css';

// Badge (Figma component set 385:14). Figma properties:
//   Type   VARIANT  Warning | Positive | Negative | Info | Update | Neutral (default Warning) -> type
//   label  TEXT     default "Badge"                                                           -> label
//
// A small status pill, e.g. for a row in a table. Badge is not interactive: it
// has no hover, press, focus, disabled or loading state.
export type BadgeType = 'Warning' | 'Positive' | 'Negative' | 'Info' | 'Update' | 'Neutral';

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Figma "Type": the status colour pair. */
  type?: BadgeType;
  /** Figma "label": the text shown in the pill. */
  label?: string;
};

export function Badge({ type = 'Warning', label = 'Badge', className, ...rest }: BadgeProps) {
  return (
    <span {...rest} className={className ? `cc-badge ${className}` : 'cc-badge'} data-type={type}>
      {label}
    </span>
  );
}
