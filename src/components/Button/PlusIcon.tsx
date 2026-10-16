// Icon/Plus from the Figma Icon component (node 48:1251), 16px, 24px and
// 32px exports. Geometry is unchanged from the export; the stroke follows
// `currentColor` so the button's icon token sets the colour.
type PlusIconProps = { size: 16 | 24 | 32 };

const ENDS = { 16: [3.66667, 12.3333], 24: [5.5, 18.5], 32: [7.33333, 24.6667] } as const;

export function PlusIcon({ size }: PlusIconProps) {
  const [a, b] = ENDS[size];
  const mid = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true" focusable="false">
      <path d={`M${b} ${mid}H${a}`} stroke="currentColor" strokeWidth="1.18182" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M${mid} ${b}V${a}`} stroke="currentColor" strokeWidth="1.18182" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
