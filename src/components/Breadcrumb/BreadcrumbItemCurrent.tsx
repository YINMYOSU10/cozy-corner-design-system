// Figma component "Breadcrumb/item/current" (431:27).
export interface BreadcrumbItemCurrentProps {
  /** Figma text property "Label". */
  label?: string;
}

export function BreadcrumbItemCurrent({ label = 'Inventory' }: BreadcrumbItemCurrentProps) {
  return (
    <span className="cc-breadcrumb-current" aria-current="page">
      {label}
    </span>
  );
}
