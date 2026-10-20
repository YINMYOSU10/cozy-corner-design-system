import type { HTMLAttributes } from 'react';
import { CheckGlyph } from '../Icon';
import '../Icon/Icon.css';
import './ProgressLoadingWebsite.css';

// Progress Loading / Website (Figma component set 173:4829). Property: Step (1-5).
// A ring that is drawn in halves across the steps (Figma uses Smart Animate between
// them) and turns into a positive-green ring with an Icon/Check on Step 5.
export type ProgressLoadingWebsiteStep = 1 | 2 | 3 | 4 | 5;

export interface ProgressLoadingWebsiteProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Figma property `Step` (1-5). */
  step?: ProgressLoadingWebsiteStep;
  /** Accessible name; defaults to "Step n of 5". */
  label?: string;
}

// Geometry, in the 350 x 350 drawing space of the Figma frame (drawing units, not CSS).
// Arc nodes are 328 wide at (11,11), arc 270deg -> 90deg, innerRadius 0.95.
const OUTER = 164;
const INNER = 155.8;
const C = 175;
const RIGHT_HALF = `M${C} ${C - OUTER}A${OUTER} ${OUTER} 0 0 1 ${C} ${C + OUTER}V${C + INNER}A${INNER} ${INNER} 0 0 0 ${C} ${C - INNER}Z`;

type Half = { side: 'right' | 'left'; rotate?: number };

// Per variant: visible ring halves (BottomCircle + TopCircle, which coincide unless
// they differ), and whether Rectangle 1 (left 175 x 350, color/bg/base) is present.
const STEPS: Record<ProgressLoadingWebsiteStep, { halves: Half[]; cover: boolean }> = {
  1: { halves: [{ side: 'right' }], cover: true },
  2: { halves: [{ side: 'left', rotate: 179.9 }], cover: true },
  3: { halves: [{ side: 'left', rotate: 180 }], cover: false },
  4: { halves: [{ side: 'right' }, { side: 'left', rotate: 180 }], cover: false },
  5: { halves: [{ side: 'right' }, { side: 'left', rotate: 180 }], cover: false },
};

export function ProgressLoadingWebsite({
  step = 1,
  label,
  className,
  ...props
}: ProgressLoadingWebsiteProps) {
  const { halves, cover } = STEPS[step];
  const name = label ?? `Step ${step} of 5`;
  return (
    <div
      {...props}
      role="progressbar"
      aria-label={name}
      aria-valuemin={1}
      aria-valuemax={5}
      aria-valuenow={step}
      aria-valuetext={name}
      data-step={step}
      className={['cc-progress-loading-website', className].filter(Boolean).join(' ')}
    >
      <svg className="cc-progress-loading-website__art" viewBox="0 0 350 350" width="350" height="350" aria-hidden="true" focusable="false">
        {halves.map((h, i) => (
          <path
            key={i}
            className="cc-progress-loading-website__ring"
            d={RIGHT_HALF}
            transform={h.side === 'left' ? `rotate(${h.rotate ?? 180} ${C} ${C})` : undefined}
          />
        ))}
        {cover && <rect className="cc-progress-loading-website__cover" x="0" y="0" width="175" height="350" />}
        {step === 5 && (
          <svg className="cc-progress-loading-website__check" x="65" y="65" width="221" height="221">
            <CheckGlyph />
          </svg>
        )}
      </svg>
    </div>
  );
}
