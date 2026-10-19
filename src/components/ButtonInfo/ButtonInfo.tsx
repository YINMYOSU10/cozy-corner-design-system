import { Button, type ButtonProps } from '../Button/Button';
import './ButtonInfo.css';

// Button / Info (Figma 445:5037). The Figma properties (Label text, State,
// Icon-style, Shape, Size, Type) are identical to Button / Primary (66:459),
// so this composes Button and only swaps the colour tokens to the info set.
// Layout, sizes, type and focus ring come from Button itself.
export type ButtonInfoProps = ButtonProps;

export function ButtonInfo({ className, ...props }: ButtonInfoProps) {
  return (
    <Button
      {...props}
      className={['cc-button--info', className].filter(Boolean).join(' ')}
    />
  );
}

export type {
  ButtonIconStyle,
  ButtonShape,
  ButtonSize,
  ButtonState,
  ButtonType,
} from '../Button/Button';
