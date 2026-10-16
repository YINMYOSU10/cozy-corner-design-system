// Icon/Plus from the Figma Icon component (node 48:1251), 16px and 24px
// exports. Geometry is unchanged from the export; the stroke follows
// `currentColor` so the button's icon token sets the colour.
type PlusIconProps = { size: 16 | 24 };

export function PlusIcon({ size }: PlusIconProps) {
  const [a, b] = size === 16 ? [3.66667, 12.3333] : [5.5, 18.5];
  const mid = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true" focusable="false">
      <path d={`M${b} ${mid}H${a}`} stroke="currentColor" strokeWidth="1.18182" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M${mid} ${b}V${a}`} stroke="currentColor" strokeWidth="1.18182" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
