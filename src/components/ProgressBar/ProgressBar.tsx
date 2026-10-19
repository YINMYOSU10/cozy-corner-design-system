import type { CSSProperties, HTMLAttributes } from 'react';
import { ProgressBarSegment } from './ProgressBarSegment';
import './ProgressBar.css';

// Progress Bar (Figma 416:46). Properties: Step (1-5), Label (text), Show label (boolean).
// Always five segments; segments 1..step are filled.
export type ProgressBarStep = 1 | 2 | 3 | 4 | 5;

const TOTAL = 5;

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Figma property `Step` (1-5). */
  step?: ProgressBarStep;
  /** Figma property `Label`. */
  label?: string;
  /** Figma property `Show label`. */
  showLabel?: boolean;
  /**
   * Segment height as a CSS length. The Figma segment height (4) is not bound to
   * any variable, so it is carried from the consumer instead of being guessed.
   */
  segmentHeight: string;
}

export function ProgressBar({
  step = 1,
  label = 'Step 1 of 5',
  showLabel = true,
  segmentHeight,
  className,
  style,
  ...props
}: ProgressBarProps) {
  return (
    <div
      {...props}
      role="progressbar"
      aria-label={label}
      aria-valuemin={1}
      aria-valuemax={TOTAL}
      aria-valuenow={step}
      aria-valuetext={label}
      className={['cc-progress-bar', className].filter(Boolean).join(' ')}
      style={{ '--cc-progress-bar-segment-height': segmentHeight, ...style } as CSSProperties}
    >
      {showLabel && <span className="cc-progress-bar__label">{label}</span>}
      <div className="cc-progress-bar__track">
        {Array.from({ length: TOTAL }, (_, i) => (
          <ProgressBarSegment key={i} filled={i < step} />
        ))}
      </div>
    </div>
  );
}
