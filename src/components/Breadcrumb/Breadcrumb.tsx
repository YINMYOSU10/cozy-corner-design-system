import { Fragment } from 'react';
import { BreadcrumbItemCurrent } from './BreadcrumbItemCurrent';
import { BreadcrumbItemLink } from './BreadcrumbItemLink';
import { BreadcrumbItemSeparator } from './BreadcrumbItemSeparator';
import './Breadcrumb.css';

// Prop names and values match the Figma component set "Breadcrumb" (431:68).
export type BreadcrumbLevels = 2 | 3 | 4;

export interface BreadcrumbItem {
  label: string;
  /** Real destination. Ignored for the last item, which is the current page. */
  href?: string;
}

export interface BreadcrumbProps {
  /** Figma variant "Levels": how many items are shown. The last one is the current page. */
  levels?: BreadcrumbLevels;
  /** Trail from root to current page. The first `levels` entries are shown. */
  items?: BreadcrumbItem[];
  /** Accessible name of the landmark. */
  'aria-label'?: string;
  className?: string;
}

// Figma default content for each Levels variant.
const DEFAULT_ITEMS: BreadcrumbItem[] = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Inventory', href: '#inventory' },
  { label: 'Books', href: '#books' },
  { label: 'Fiction' },
];

export function Breadcrumb({
  levels = 2,
  items,
  'aria-label': ariaLabel = 'Breadcrumb',
  className,
}: BreadcrumbProps) {
  const trail = items ?? defaultTrail(levels);
  const shown = trail.slice(0, levels);
  const classes = ['cc-breadcrumb', className].filter(Boolean).join(' ');
  return (
    <nav aria-label={ariaLabel} className={classes} data-levels={levels}>
      <ol className="cc-breadcrumb__list">
        {shown.map((item, i) => {
          const last = i === shown.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li className="cc-breadcrumb__item">
                {last ? (
                  <BreadcrumbItemCurrent label={item.label} />
                ) : (
                  <BreadcrumbItemLink label={item.label} href={item.href ?? '#'} />
                )}
              </li>
              {!last && (
                <li className="cc-breadcrumb__item" aria-hidden="true" role="presentation">
                  <BreadcrumbItemSeparator />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

// Figma Levels=2 is Dashboard / Inventory; 3 and 4 extend the trail and
// the last shown item is always the current page.
function defaultTrail(levels: BreadcrumbLevels): BreadcrumbItem[] {
  if (levels === 2) return [DEFAULT_ITEMS[0], { label: 'Inventory' }];
  if (levels === 3) return [DEFAULT_ITEMS[0], DEFAULT_ITEMS[1], { label: 'Books' }];
  return DEFAULT_ITEMS.slice(0, 3).concat({ label: 'Fiction' });
}
