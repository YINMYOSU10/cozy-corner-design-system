import type { CSSProperties, HTMLAttributes } from 'react';
import './Loading.css';

// Loading Animation (Figma 212:690). One property: Step (1-7).
// Three dots; the raised dot is: steps 1-3 = first, 4-5 = second, 6-7 = third.
export type LoadingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Which dot (0-2) is raised in each Step, read from the Figma variants. */
const RAISED_DOT: Record<LoadingStep, 0 | 1 | 2> = { 1: 0, 2: 0, 3: 0, 4: 1, 5: 1, 6: 2, 7: 2 };

export interface LoadingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Figma property `Step` (1-7). Ignored visually while `autoPlay` runs. */
  step?: LoadingStep;
  /** Cycle through steps 1-7 with CSS. Disabled under `prefers-reduced-motion`. */
  autoPlay?: boolean;
  /**
   * Duration of one step as a CSS time (e.g. "150ms"). No motion token exists, so
   * it is carried from the consumer instead of being guessed. Needed for `autoPlay`.
   */
  stepDuration?: string;
  /**
   * How far the raised dot lifts, as a CSS length. Figma uses 10, which is not
   * bound to any variable (design gap), so it is carried from the consumer.
   */
  lift: string;
  /** Accessible label for the indicator. */
  label?: string;
}

export function Loading({
  step = 1,
  autoPlay = false,
  stepDuration,
  lift,
  label = 'Loading',
  className,
  style,
  ...props
}: LoadingProps) {
  const raised = RAISED_DOT[step];
  const animated = autoPlay && stepDuration !== undefined;
  return (
    <div
      {...props}
      role="status"
      aria-label={label}
      data-step={step}
      data-autoplay={animated ? 'true' : undefined}
      className={['cc-loading', className].filter(Boolean).join(' ')}
      style={
        {
          '--cc-loading-lift': lift,
          ...(stepDuration ? { '--cc-loading-step-duration': stepDuration } : {}),
          ...style,
        } as CSSProperties
      }
    >
      {([0, 1, 2] as const).map((i) => (
        <span
          key={i}
          className={['cc-loading__dot', `cc-loading__dot--${i + 1}`, !animated && raised === i ? 'cc-loading__dot--raised' : '']
            .filter(Boolean)
            .join(' ')}
        />
      ))}
    </div>
  );
}
