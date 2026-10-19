import type { HTMLAttributes, ReactNode } from 'react';
import { Divider } from '../Divider/Divider';
import './DetailRow.css';

// Detail Row (Figma 554:25). Properties: Platform (Mobile | Website),
// Label (text), Value (text), Show divider (boolean).
export interface DetailRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Figma property `Platform`. Mobile = spacing/md vertical padding, Website = spacing/lg. */
  platform?: 'Mobile' | 'Website';
  /** Figma property `Label`. */
  label?: ReactNode;
  /** Figma property `Value`. */
  value?: ReactNode;
  /** Figma property `Show divider`. */
  showDivider?: boolean;
}

export function DetailRow({
  platform = 'Mobile',
  label = 'Address',
  value = '14 Mercer Lane',
  showDivider = true,
  className,
  ...props
}: DetailRowProps) {
  return (
    <div
      {...props}
      className={['cc-detail-row', `cc-detail-row--${platform.toLowerCase()}`, className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="cc-detail-row__row">
        <span className="cc-detail-row__label">{label}</span>
        <span className="cc-detail-row__value">{value}</span>
      </div>
      {showDivider && <Divider />}
    </div>
  );
}
