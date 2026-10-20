import type { HTMLAttributes } from 'react';
import { CheckGlyph } from '../Icon';
import '../Icon/Icon.css';
import './ProgressLoadingMobile.css';

// Progress Loading / App (Figma component set 215:983; registry name "Progress Loading / Mobile").
// Property: Step (1-5). A ring drawn in halves across the steps (Figma uses Smart Animate
// between them) that turns into a positive-green ring with an Icon/Check on Step 5.
export type ProgressLoadingMobileStep = 1 | 2 | 3 | 4 | 5;

export interface ProgressLoadingMobileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Figma property `Step` (1-5). */
  step?: ProgressLoadingMobileStep;
  /** Accessible name; defaults to "Step n of 5". */
  label?: string;
}

// Geometry in the 160 x 160 drawing space of the Figma frame (drawing units, not CSS).
// Arc nodes: startingAngle 270deg -> endingAngle 90deg, innerRadius 0.95.
const SIZE = 160;
const C = 80;
const INNER_RATIO = 0.95;

// The base arc, drawn at rotation 0, is the LEFT half (verified against Figma's render:
// Step 1 rotation 0 sits behind the cover and shows no ring; rotation 180 shows the right half).
function baseHalf(cx: number, cy: number, outer: number) {
  const inner = outer * INNER_RATIO;
  return `M${cx} ${cy - outer}A${outer} ${outer} 0 0 0 ${cx} ${cy + outer}V${cy + inner}A${inner} ${inner} 0 0 1 ${cx} ${cy - inner}Z`;
}

type Half = { cx: number; cy: number; r: number; rotate?: number };

// Step 1 ring is 152.62 wide at (3.4, 3.4); every other ring is 149.94 wide centred at 80.
// Cover = Rectangle 1 (color/bg/base): 81.43 x 162.86 on Step 1, 80 x 160 on Step 2.
const R = 74.97;
const STEPS: Record<ProgressLoadingMobileStep, { halves: Half[]; cover: number | null }> = {
  1: { halves: [{ cx: 79.71, cy: 79.71, r: 76.31 }], cover: 81.43 },
  2: { halves: [{ cx: C, cy: C, r: R, rotate: 179.9 }], cover: 80 },
  3: { halves: [{ cx: C, cy: C, r: R, rotate: 180 }], cover: null },
  4: { halves: [{ cx: C, cy: C, r: R }, { cx: C, cy: C, r: R, rotate: 180 }], cover: null },
  5: { halves: [{ cx: C, cy: C, r: R }, { cx: C, cy: C, r: R, rotate: 180 }], cover: null },
};

export function ProgressLoadingMobile({
  step = 1,
  label,
  className,
  ...props
}: ProgressLoadingMobileProps) {
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
      className={['cc-progress-loading-mobile', className].filter(Boolean).join(' ')}
    >
      <svg className="cc-progress-loading-mobile__art" viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} aria-hidden="true" focusable="false">
        {halves.map((h, i) => (
          <path
            key={i}
            className="cc-progress-loading-mobile__ring"
            d={baseHalf(h.cx, h.cy, h.r)}
            transform={h.rotate ? `rotate(${h.rotate} ${h.cx} ${h.cy})` : undefined}
          />
        ))}
        {cover !== null && <rect className="cc-progress-loading-mobile__cover" x="0" y="0" width={cover} height={SIZE + 3} />}
        {step === 5 && (
          <svg className="cc-progress-loading-mobile__check" x="29.71" y="29.71" width="101.03" height="101.03">
            <CheckGlyph />
          </svg>
        )}
      </svg>
    </div>
  );
}
