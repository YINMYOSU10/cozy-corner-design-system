import { Button, type ButtonProps } from '../Button/Button';

// Button / Destructive (Figma 444:4114). "Same options as the Primary button":
// the Figma properties (State, Icon-style, Shape, Size, Type, Label) are identical
// to Button / Primary (66:459), so this composes Button and only swaps the
// colour tokens to the negative set. Layout, sizes, type and focus ring come
// from Button itself.
export type ButtonDestructiveProps = ButtonProps;

export function ButtonDestructive({ className, ...props }: ButtonDestructiveProps) {
  return (
    <Button
      {...props}
      className={['cc-button--destructive', className].filter(Boolean).join(' ')}
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
