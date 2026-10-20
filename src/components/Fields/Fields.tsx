import { useId, type InputHTMLAttributes, type MouseEventHandler, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { Button } from '../Button/Button';
import {
  CheckCircleGlyph,
  EnvelopeSimpleGlyph,
  Icon,
  MagnifyingGlassGlyph,
  XCircleGlyph,
  resize_windowGlyph as ResizeWindowGlyph,
} from '../Icon';
import { FieldBox, FieldHelper, FieldLabel } from './FieldParts';

// Fields — Figma component set 275:141. Figma properties, in code:
//   Type                VARIANT  Form Input | Text Input | Search Input | Search Input with Button -> type
//   Size                VARIANT  sm | Lg                                     -> size
//   State               VARIANT  Default | Hover | Active | Success | Error | Disable -> state
//   Form Label          TEXT     "Label"                                     -> formLabel
//   Placeholder Text    TEXT     "Placeholder"                               -> placeholderText
//   Helper Text         TEXT     "Helper Label"                              -> helperText
//   Show Leading Icon   BOOLEAN  true                                        -> showLeadingIcon
//   Show Trailing Icon  BOOLEAN  false                                       -> showTrailingIcon
//   Show Label          BOOLEAN  true (hidden on Text Input and Search Input) -> showLabel
//   Show Helper         BOOLEAN  true (hidden on Text Input and Search Input) -> showHelper
//
// Figma defines Size=Lg and every State only for Type=Form Input. The other
// types exist at sm/Default (Text Input also at Lg); code accepts any
// combination, so a Search Input can still be disabled.
export type FieldsType = 'Form Input' | 'Text Input' | 'Search Input' | 'Search Input with Button';
export type FieldsSize = 'sm' | 'Lg';
export type FieldsState = 'Default' | 'Hover' | 'Active' | 'Success' | 'Error' | 'Disable';

type ControlAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'placeholder' | 'children'
>;

export interface FieldsProps extends ControlAttributes {
  /** Figma "Type". */
  type?: FieldsType;
  /** Figma "Size". */
  size?: FieldsSize;
  /**
   * Figma "State". `Default` lets hover and focus (Figma "Active") happen naturally.
   * `Hover` and `Active` pin that look (for docs and QA). `Success` and `Error`
   * colour the box and helper; `Error` also sets `aria-invalid`. `Disable` disables the control.
   */
  state?: FieldsState;
  /** Figma "Form Label". Also the accessible name when the label is hidden. */
  formLabel?: string;
  /** Figma "Placeholder Text". Defaults to "Placeholder", or "Search" on Search Input. */
  placeholderText?: string;
  /** Figma "Helper Text". */
  helperText?: string;
  /** Figma "Show Leading Icon". */
  showLeadingIcon?: boolean;
  /** Figma "Show Trailing Icon". */
  showTrailingIcon?: boolean;
  /** Figma "Show Label". Defaults per Type, as in Figma. */
  showLabel?: boolean;
  /** Figma "Show Helper". Defaults per Type, as in Figma. */
  showHelper?: boolean;
  /** Replaces the default Icon/MagnifyingGlass glyph in the leading icon. */
  leadingIcon?: ReactNode;
  /** Replaces the default trailing glyph (EnvelopeSimple; CheckCircle on Success; XCircle on Error). */
  trailingIcon?: ReactNode;
  /** The HTML input type. Renamed because Figma's "Type" owns `type`; see docs/naming-suggestions.md. */
  htmlType?: InputHTMLAttributes<HTMLInputElement>['type'];
  /** Text Input only: visible rows of the textarea. */
  rows?: number;
  /** Search Input with Button: the button's "Label text". */
  buttonLabel?: string;
  /** Search Input with Button: called when the button is clicked. */
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  /** Class name for the root element. */
  className?: string;
}

const LABEL_HIDDEN_BY_DEFAULT: FieldsType[] = ['Text Input', 'Search Input'];

export function Fields({
  type = 'Form Input',
  size = 'sm',
  state = 'Default',
  formLabel = 'Label',
  placeholderText,
  helperText = 'Helper Label',
  showLeadingIcon = true,
  showTrailingIcon = false,
  showLabel,
  showHelper,
  leadingIcon,
  trailingIcon,
  htmlType,
  rows,
  buttonLabel = 'Search',
  onButtonClick,
  className,
  disabled,
  id,
  ...rest
}: FieldsProps) {
  const autoId = useId();
  const controlId = id ?? `cc-field-${autoId}`;
  const helperId = `${controlId}-helper`;
  const isDisabled = disabled || state === 'Disable';
  const effectiveState: FieldsState = isDisabled ? 'Disable' : state;
  const isSearch = type === 'Search Input' || type === 'Search Input with Button';
  const labelVisible = showLabel ?? !LABEL_HIDDEN_BY_DEFAULT.includes(type);
  const helperVisible = showHelper ?? !LABEL_HIDDEN_BY_DEFAULT.includes(type);
  const placeholder = placeholderText ?? (type === 'Search Input' ? 'Search' : 'Placeholder');

  const icon = (glyph: ReactNode) => (
    <Icon className="cc-field__icon" size="16" type="Standard" shape="Rounded" swapIcon={glyph} />
  );
  const defaultTrailing =
    effectiveState === 'Success' ? <CheckCircleGlyph /> : effectiveState === 'Error' ? <XCircleGlyph /> : <EnvelopeSimpleGlyph />;

  const common = {
    id: controlId,
    className: 'cc-field__control',
    placeholder,
    disabled: isDisabled,
    'aria-invalid': effectiveState === 'Error' ? true : undefined,
    'aria-describedby': helperVisible ? helperId : undefined,
    'aria-label': labelVisible ? undefined : (rest['aria-label'] ?? formLabel),
  };

  const control =
    type === 'Text Input' ? (
      <textarea
        {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        {...common}
        rows={rows ?? (size === 'Lg' ? 3 : 2)}
      />
    ) : (
      <input {...rest} {...common} type={htmlType ?? (isSearch ? 'search' : 'text')} />
    );

  const box = (
    <FieldBox
      leading={showLeadingIcon ? icon(leadingIcon ?? <MagnifyingGlassGlyph />) : undefined}
      trailing={showTrailingIcon ? icon(trailingIcon ?? defaultTrailing) : undefined}
      corner={
        type === 'Text Input' ? (
          <span className="cc-field__resize" aria-hidden="true">
            {icon(<ResizeWindowGlyph />)}
          </span>
        ) : undefined
      }
    >
      {control}
    </FieldBox>
  );

  const helper = helperVisible ? <FieldHelper id={helperId}>{helperText}</FieldHelper> : null;

  return (
    <div
      className={['cc-field', className].filter(Boolean).join(' ')}
      data-type={type}
      data-size={size}
      data-state={effectiveState}
      role={isSearch ? 'search' : undefined}
    >
      {labelVisible && <FieldLabel htmlFor={controlId}>{formLabel}</FieldLabel>}
      {type === 'Search Input with Button' ? (
        <div className="cc-field__with-button">
          {box}
          <Button
            labelText={buttonLabel}
            size="32"
            shape="Rounded"
            type="Default"
            iconStyle="none"
            state={isDisabled ? 'Disable' : 'Default'}
            onClick={onButtonClick}
          />
          {helper}
        </div>
      ) : (
        <>
          {box}
          {helper}
        </>
      )}
    </div>
  );
}

/**
 * Search Input on its own (Fields Type=Search Input), for composing into
 * other components such as Top Bar.
 */
export function SearchInput(props: Omit<FieldsProps, 'type'>) {
  return <Fields {...props} type="Search Input" />;
}
