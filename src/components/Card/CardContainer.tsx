import type { HTMLAttributes, ReactNode } from 'react';

// Card/item/container (Figma component set 366:1973). Figma properties:
//   State     VARIANT  Default | Hover
//   Type      VARIANT  Dashboard Card | Left-aligned Book Card |
//                      Center-aligned Book Card | Clue Card
//   CardSlot  SLOT     -> children
// The Default variants carry an ON_HOVER prototype reaction to Hover, so real
// pointer hover switches to the Hover look; `state` forces it for docs/tests.
export type CardContainerType =
  | 'Dashboard Card'
  | 'Left-aligned Book Card'
  | 'Center-aligned Book Card'
  | 'Clue Card';
export type CardContainerState = 'Default' | 'Hover';

export interface CardContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma property `Type`. */
  type?: CardContainerType;
  /** Figma property `State`. Hover also happens for real on pointer hover. */
  state?: CardContainerState;
  /** Figma slot `CardSlot`. */
  children?: ReactNode;
}

const TYPE_KEY: Record<CardContainerType, string> = {
  'Dashboard Card': 'dashboard',
  'Left-aligned Book Card': 'left',
  'Center-aligned Book Card': 'center',
  'Clue Card': 'clue',
};

export function CardContainer({
  type = 'Dashboard Card',
  state = 'Default',
  className,
  children,
  ...props
}: CardContainerProps) {
  return (
    <div
      {...props}
      className={['cc-card-container', className].filter(Boolean).join(' ')}
      data-type={TYPE_KEY[type]}
      data-state={state}
    >
      <div className="cc-card-container__slot">{children}</div>
    </div>
  );
}
