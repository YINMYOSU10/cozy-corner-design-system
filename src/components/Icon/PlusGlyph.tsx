// "Icon/Plus" (Figma 34:5278), the default instance in Icon's swapIcon slot.
// One geometry for every size: the Figma exports at 12/16/24/32 are the same
// drawing scaled (arms run from 22.9% to 77.1% of the frame), so it is drawn
// once in a 24-unit viewBox. Numbers are vector geometry in that viewBox, not
// visual design values.
//
// The stroke stays the same on screen at every size, as in Figma (1.18182 at
// 12, 16, 24 and 32), so it is a non-scaling stroke. Its weight is not bound
// to a variable in Figma (reported as a design gap). Paint is `currentColor`:
// Icon.css sets it from color/icon/secondary, the variable Figma binds.

const STROKE = 1.18182;

export function PlusGlyph() {
  return (
    <svg className="cc-icon__glyph" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M18.5 12H5.5" stroke="currentColor" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 18.5V5.5" stroke="currentColor" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
