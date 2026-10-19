import type { AnchorHTMLAttributes } from 'react';

// Figma component set "Breadcrumb/item/link" (431:26). Prop names match its properties.
export type BreadcrumbItemLinkState = 'Default' | 'Hover' | 'Focused';

export interface BreadcrumbItemLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  /** Figma text property "Label". */
  label?: string;
  /**
   * Figma "State". `Default` lets hover and focus happen naturally.
   * `Hover` and `Focused` pin that look (for docs and QA).
   */
  state?: BreadcrumbItemLinkState;
}

export function BreadcrumbItemLink({
  label = 'Dashboard',
  state = 'Default',
  className,
  ...rest
}: BreadcrumbItemLinkProps) {
  const classes = ['cc-breadcrumb-link', className].filter(Boolean).join(' ');
  return (
    <a className={classes} data-state={state} {...rest}>
      <span className="cc-breadcrumb-link__label">{label}</span>
      <span className="cc-breadcrumb-link__underline" aria-hidden="true" />
    </a>
  );
}
