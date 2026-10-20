import { Tag } from '../Tag';

// Card/item/text (Figma component set 366:1953). Figma properties:
//   Type       VARIANT  ReportText | BookDescription | Clue
//   Platform   VARIANT  Mobile | Website   (Website exists for BookDescription only)
//   Trend      VARIANT  Up | None | Down    (ReportText only)
//   Label, Value, Trend text, Title, Author, Description, Clue, Caption  TEXT
//   Show label, Show value, Show trend, Show title, Show author,
//   Show description, Show caption, Show tag 3                         BOOLEAN
// Clue's "Moods" row is three Tag (Size=Small) instances, imported from Tag.
export type CardTextType = 'ReportText' | 'BookDescription' | 'Clue';
export type CardTextPlatform = 'Mobile' | 'Website';
export type CardTrend = 'Up' | 'None' | 'Down';

export interface CardTextContent {
  /** Figma `Label`. */
  label?: string;
  /** Figma `Value`. */
  value?: string;
  /** Figma `Trend text`. */
  trendText?: string;
  /** Figma `Title`. */
  title?: string;
  /** Figma `Author`. */
  author?: string;
  /** Figma `Description`. */
  description?: string;
  /** Figma `Clue`. */
  clue?: string;
  /** Figma `Caption`. */
  caption?: string;
  /** Labels of the three mood Tags (Figma Tag 1-3 `Label`). */
  tags?: [string, string, string];
  /** Figma `Show label`. */
  showLabel?: boolean;
  /** Figma `Show value`. */
  showValue?: boolean;
  /** Figma `Show trend`. */
  showTrend?: boolean;
  /** Figma `Show title`. */
  showTitle?: boolean;
  /** Figma `Show author`. */
  showAuthor?: boolean;
  /** Figma `Show description`. */
  showDescription?: boolean;
  /** Figma `Show caption`. */
  showCaption?: boolean;
  /** Figma `Show tag 3`. */
  showTag3?: boolean;
}

export interface CardTextProps extends CardTextContent {
  /** Figma property `Type`. */
  type?: CardTextType;
  /** Figma property `Platform`. */
  platform?: CardTextPlatform;
  /** Figma property `Trend`. */
  trend?: CardTrend;
  className?: string;
}

export const CARD_TEXT_DEFAULTS = {
  label: 'Blind dates arranged',
  value: '1204',
  trendText: '+6 today',
  title: "Everything I Didn't Say",
  author: 'Tomas Reyk',
  description: 'A slow-burn told entirely through what two people almost said to each other.',
  clue: 'Nine winters. One bay. No one leaves.',
  caption: 'Clue card for BD-1048',
  tags: ['Page-turner', 'Adventurous', 'Witty'] as [string, string, string],
};

export function CardText({
  type = 'ReportText',
  platform = 'Mobile',
  trend = 'Up',
  label = CARD_TEXT_DEFAULTS.label,
  value = CARD_TEXT_DEFAULTS.value,
  trendText = CARD_TEXT_DEFAULTS.trendText,
  title = CARD_TEXT_DEFAULTS.title,
  author = CARD_TEXT_DEFAULTS.author,
  description = CARD_TEXT_DEFAULTS.description,
  clue = CARD_TEXT_DEFAULTS.clue,
  caption = CARD_TEXT_DEFAULTS.caption,
  tags = CARD_TEXT_DEFAULTS.tags,
  showLabel = true,
  showValue = true,
  showTrend = true,
  showTitle = true,
  showAuthor = true,
  showDescription = true,
  showCaption = true,
  showTag3 = true,
  className,
}: CardTextProps) {
  const cls = ['cc-card-text', className].filter(Boolean).join(' ');

  if (type === 'ReportText') {
    return (
      <div className={cls} data-type="report">
        {(showLabel || showValue) && (
          <div className="cc-card-text__group">
            {showLabel && <span className="cc-card-text__label">{label}</span>}
            {showValue && <span className="cc-card-text__value">{value}</span>}
          </div>
        )}
        {showTrend && (
          <span className="cc-card-text__trend" data-trend={trend.toLowerCase()}>
            {trendText}
          </span>
        )}
      </div>
    );
  }

  if (type === 'Clue') {
    return (
      <div className={cls} data-type="clue">
        {/* Twine: a 2px rectangle filled color/border/secondary (Figma 492:248). */}
        <span className="cc-card-text__twine" aria-hidden="true" />
        <div className="cc-card-text__moods">
          <Tag size="Small" label={tags[0]} />
          <Tag size="Small" label={tags[1]} />
          {showTag3 && <Tag size="Small" label={tags[2]} />}
        </div>
        <p className="cc-card-text__clue">{clue}</p>
        {showCaption && <span className="cc-card-text__caption">{caption}</span>}
      </div>
    );
  }

  return (
    <div className={cls} data-type="book" data-platform={platform.toLowerCase()}>
      {(showTitle || showAuthor) && (
        <div className="cc-card-text__group">
          {showTitle && <h3 className="cc-card-text__title">{title}</h3>}
          {showAuthor && <span className="cc-card-text__author">{author}</span>}
        </div>
      )}
      {showDescription && <p className="cc-card-text__description">{description}</p>}
    </div>
  );
}
