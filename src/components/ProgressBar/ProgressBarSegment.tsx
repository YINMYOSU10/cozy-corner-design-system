import type { HTMLAttributes } from 'react';

// Progress Bar/item/segment (Figma 416:5). One property: Filled (True / False).
// Radius binds to borderRadius/circle. Fill binds to color/bg/primary/idle
// (True) or color/bg/primary/light (False). The 4px height is NOT bound to a
// variable in Figma (design gap), so it arrives from the parent as a CSS length.
export interface ProgressBarSegmentProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Figma property `Filled`. */
  filled?: boolean;
}

export function ProgressBarSegment({ filled = false, className, ...props }: ProgressBarSegmentProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={['cc-progress-bar-segment', filled && 'cc-progress-bar-segment--filled', className]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
