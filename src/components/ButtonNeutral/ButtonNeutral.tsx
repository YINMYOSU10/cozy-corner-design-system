import { Button, type ButtonProps } from '../Button/Button';
import './ButtonNeutral.css';

// Button / Neutral (Figma 444:6334). The Figma properties (State, Icon-style,
// Shape, Size, Type, Label) are identical to Button / Primary (66:459), so this
// composes Button and only swaps the colour tokens to the neutral set. Layout,
// sizes, type, focus ring and the disabled state come from Button itself.
export type ButtonNeutralProps = ButtonProps;

export function ButtonNeutral({ className, ...props }: ButtonNeutralProps) {
  return (
    <Button
      {...props}
      className={['cc-button--neutral', className].filter(Boolean).join(' ')}
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
