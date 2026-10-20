import type { ReactNode } from 'react';

// Subcomponents of Fields (Figma 275:141). Figma draws these as layers inside
// every variant: "Label" (text), "Button / primary" (the input box, which holds
// "Leading Icon", the text "Container" and "Trailing Icon"), and
// "Helper Label" / "Success text" / "Error text". Each one is built once here
// and composed by Fields.

/** Figma layer "Label": the form label above the box. */
export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label className="cc-field__label" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

/** Figma layer "Helper Label" (Success text / Error text in those states). */
export function FieldHelper({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p className="cc-field__helper" id={id}>
      {children}
    </p>
  );
}

/**
 * Figma frame "Button / primary": the bordered input box. Holds the leading
 * icon, the control (input or textarea) and the trailing icon.
 */
export function FieldBox({
  leading,
  trailing,
  children,
  corner,
}: {
  leading?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
  /** Text Input only: the "Resize Icon" in the bottom-right corner. */
  corner?: ReactNode;
}) {
  return (
    <div className="cc-field__box">
      <div className="cc-field__lead">
        {leading && <span className="cc-field__icon-slot">{leading}</span>}
        {children}
      </div>
      {trailing && <span className="cc-field__icon-slot">{trailing}</span>}
      {corner}
    </div>
  );
}
