import type { HTMLAttributes } from 'react';
import './Divider.css';

// Divider (Figma 17:3671). One property: IsDashed (False / True).
// Both variants bind stroke colour to color/border/secondary and stroke
// weight to borderWidth/1. The dash/gap lengths of the dashed variant are not
// bound to any variable in Figma, so the browser's native dashed style is used.
export interface DividerProps extends Omit<HTMLAttributes<HTMLHRElement>, 'children'> {
  /** Figma property `IsDashed`. False = solid line, True = dashed line. */
  isDashed?: boolean;
}

export function Divider({ isDashed = false, className, ...props }: DividerProps) {
  return (
    <hr
      {...props}
      className={['cc-divider', isDashed && 'cc-divider--dashed', className]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
