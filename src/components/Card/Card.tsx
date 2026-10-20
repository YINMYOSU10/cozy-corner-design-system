import type { HTMLAttributes } from 'react';
import { CardContainer, type CardContainerState, type CardContainerType } from './CardContainer';
import { CardText, type CardTextContent, type CardTrend } from './CardText';

// Card (Figma component set 381:1660). Figma properties:
//   Platform  VARIANT  Dashboard | Mobile | Website   (default Dashboard)
//   Type      VARIANT  Default | Clue                 (default Default)
// Variants in Figma, and what each composes:
//   Platform=Dashboard, Type=Default (381:1648) -> container "Dashboard Card" + text ReportText
//   Platform=Mobile,    Type=Default (381:1661) -> container "Left-aligned Book Card" + text BookDescription/Mobile
//   Platform=Website,   Type=Default (381:1691) -> container "Center-aligned Book Card" + text BookDescription/Website
//   Platform=Dashboard, Type=Clue    (492:476)  -> container "Clue Card" + text Clue
// Type=Clue exists only with Platform=Dashboard in Figma, so `type="Clue"`
// always renders the Clue card whatever `platform` says.
//
// Nested properties surfaced as props: `state` (container State: Default | Hover,
// also triggered by real pointer hover), `trend` (text Trend: Up | None | Down,
// Dashboard Default only), and the text/boolean properties of Card/item/text.
export type CardPlatform = 'Dashboard' | 'Mobile' | 'Website';
export type CardType = 'Default' | 'Clue';

export interface CardProps
  extends CardTextContent,
    Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** Figma property `Platform`. */
  platform?: CardPlatform;
  /** Figma property `Type`. `Clue` is defined for Platform=Dashboard only. */
  type?: CardType;
  /** Nested container `State`. Hover also happens on real pointer hover. */
  state?: CardContainerState;
  /** Nested text `Trend` (Dashboard Default only): Up = positive, Down = negative, None = secondary. */
  trend?: CardTrend;
}

const CONTAINER: Record<CardPlatform, CardContainerType> = {
  Dashboard: 'Dashboard Card',
  Mobile: 'Left-aligned Book Card',
  Website: 'Center-aligned Book Card',
};

export function Card({
  platform = 'Dashboard',
  type = 'Default',
  state = 'Default',
  trend = 'Up',
  label,
  value,
  trendText,
  title,
  author,
  description,
  clue,
  caption,
  tags,
  showLabel,
  showValue,
  showTrend,
  showTitle,
  showAuthor,
  showDescription,
  showCaption,
  showTag3,
  className,
  ...props
}: CardProps) {
  const raw: CardTextContent = {
    label, value, trendText, title, author, description, clue, caption, tags,
    showLabel, showValue, showTrend, showTitle, showAuthor, showDescription, showCaption, showTag3,
  };
  // Drop undefined so CardText's own Figma defaults apply.
  const content = Object.fromEntries(
    Object.entries(raw).filter(([, v]) => v !== undefined),
  ) as CardTextContent;

  const isClue = type === 'Clue';

  return (
    <CardContainer
      {...props}
      type={isClue ? 'Clue Card' : CONTAINER[platform]}
      state={state}
      className={['cc-card', className].filter(Boolean).join(' ')}
      data-platform={isClue ? 'dashboard' : platform.toLowerCase()}
      data-card-type={type.toLowerCase()}
    >
      {isClue ? (
        <CardText {...content} type="Clue" platform="Mobile" />
      ) : platform === 'Dashboard' ? (
        <CardText {...content} type="ReportText" platform="Mobile" trend={trend} />
      ) : (
        <CardText {...content} type="BookDescription" platform={platform} />
      )}
    </CardContainer>
  );
}
