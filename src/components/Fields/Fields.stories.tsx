/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=275-141
 * Component set: Fields (275:141)
 *
 * Variant matrix: 16 variants = 16 stories
 *   Type=Form Input   x Size sm | Lg x State Default | Hover | Active | Success | Error | Disable (12)
 *     sm: 275:140 276:161 276:182 277:239 277:269 277:294
 *     Lg: 277:1464 277:1502 277:1521 277:1537 277:1548 277:1559
 *   Type=Text Input   x Size sm | Lg, State=Default (277:1691, 277:1729)            (2)
 *   Type=Search Input, sm, Default (293:2111)                                        (1)
 *   Type=Search Input with Button, sm, Default (293:2159)                            (1)
 *
 * Properties: Form Label, Placeholder Text, Helper Text, Show Leading Icon,
 * Show Trailing Icon, Show Label, Show Helper (see Fields.tsx).
 *
 * Token bindings (read from Figma variables):
 *   root gap                 spacing/base (Search Input: spacing/sm)
 *   box padding              spacing/sm (V) / spacing/lg (H); lead gap spacing/sm
 *   box radius / stroke      borderRadius/sm; borderWidth/1 (Search types borderWidth/05)
 *   box fill / stroke        Default  color/bg/surfaceSecondary / color/border/secondary
 *                            Hover, Active  stroke color/border/primary
 *                            Success  color/bg/positive/light / color/border/positive/bold
 *                            Error    color/bg/negative/light / color/border/negative/bold
 *                            Disable  color/bg/gray/light / color/border/gray/light
 *                            Search types  color/bg/surfacePrimary / color/border/secondary
 *   label                    color/text/primary; typography Label (Lg: see gaps)
 *   placeholder              color/text/secondary (Active color/text/disabled, Disable color/text/gray/light)
 *                            Karla regular 14/22 (sm), 16/26 (Lg)
 *   typed text / cursor      color/text/bold / color/bg/inverse
 *   helper                   color/text/disabled; Success color/text/positive; Disable color/text/gray/light
 *                            typography Label small
 *   icons                    Icon Size=16 Standard Rounded; color/icon/secondary (Disable color/icon/disabled)
 *   Search button            Button / Primary, Size=32, Label text "Search"
 *
 * Design gaps (raised, not guessed): see the Engineer card. In short: no height
 * or width is bound (box 40/48/36/32/76/100, frame 398/676, box 390 inside a 398
 * frame); Error helper text is bound to color/text/positive; Form Input Lg label
 * and helper typography differ between Default and the other states; placeholder
 * text binds core fontSize/lineHeight variables rather than a typography token;
 * the Resize Icon sits outside the box; trailing-icon paint is unbound (hidden).
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fields, type FieldsState } from './Fields';

const STATES: FieldsState[] = ['Default', 'Hover', 'Active', 'Success', 'Error', 'Disable'];

const meta = {
  title: 'Components/Fields',
  component: Fields,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Fields. Form input, multi-line text input, search input, and search input with a button. Hover and focus work live on State=Default; the other State values pin a look.',
      },
    },
  },
  args: {
    type: 'Form Input',
    size: 'sm',
    state: 'Default',
    formLabel: 'Label',
    helperText: 'Helper Label',
    showLeadingIcon: true,
    showTrailingIcon: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['Form Input', 'Text Input', 'Search Input', 'Search Input with Button'],
    },
    size: { control: 'inline-radio', options: ['sm', 'Lg'] },
    state: { control: 'select', options: STATES },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  decorators: [
    (Story, ctx) => (
      <div style={{ maxWidth: ctx.args.type === 'Text Input' && ctx.args.size === 'Lg' ? 676 : 398 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Fields>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---- Type=Form Input, Size=sm ----
export const FormInputSmDefault: Story = { name: 'Form Input / sm / Default', args: { size: 'sm', state: 'Default' } };
export const FormInputSmHover: Story = { name: 'Form Input / sm / Hover', args: { size: 'sm', state: 'Hover' } };
export const FormInputSmActive: Story = {
  name: 'Form Input / sm / Active',
  args: { size: 'sm', state: 'Active', defaultValue: 'Input' },
};
export const FormInputSmSuccess: Story = {
  name: 'Form Input / sm / Success',
  args: { size: 'sm', state: 'Success', helperText: 'Success text' },
};
export const FormInputSmError: Story = {
  name: 'Form Input / sm / Error',
  args: { size: 'sm', state: 'Error', helperText: 'Error text' },
};
export const FormInputSmDisable: Story = { name: 'Form Input / sm / Disable', args: { size: 'sm', state: 'Disable' } };

// ---- Type=Form Input, Size=Lg ----
export const FormInputLgDefault: Story = { name: 'Form Input / Lg / Default', args: { size: 'Lg', state: 'Default' } };
export const FormInputLgHover: Story = { name: 'Form Input / Lg / Hover', args: { size: 'Lg', state: 'Hover' } };
export const FormInputLgActive: Story = {
  name: 'Form Input / Lg / Active',
  args: { size: 'Lg', state: 'Active', defaultValue: 'Input' },
};
export const FormInputLgSuccess: Story = {
  name: 'Form Input / Lg / Success',
  args: { size: 'Lg', state: 'Success', helperText: 'Success text' },
};
export const FormInputLgError: Story = {
  name: 'Form Input / Lg / Error',
  args: { size: 'Lg', state: 'Error', helperText: 'Error text' },
};
export const FormInputLgDisable: Story = { name: 'Form Input / Lg / Disable', args: { size: 'Lg', state: 'Disable' } };

// ---- Type=Text Input ----
export const TextInputSm: Story = { name: 'Text Input / sm / Default', args: { type: 'Text Input', size: 'sm' } };
export const TextInputLg: Story = { name: 'Text Input / Lg / Default', args: { type: 'Text Input', size: 'Lg' } };

// ---- Type=Search Input ----
export const SearchInput: Story = { name: 'Search Input / sm / Default', args: { type: 'Search Input', size: 'sm' } };
export const SearchInputWithButton: Story = {
  name: 'Search Input with Button / sm / Default',
  args: { type: 'Search Input with Button', size: 'sm' },
};

// ---- Behaviour (not matrix rows) ----
/** Trailing icon on: EnvelopeSimple by default, CheckCircle on Success, XCircle on Error. */
export const TrailingIcons: Story = {
  name: 'Behaviour / Trailing icon per state',
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
      {(['Default', 'Success', 'Error', 'Disable'] as FieldsState[]).map((s) => (
        <Fields key={s} {...args} state={s} showTrailingIcon helperText={s} />
      ))}
    </div>
  ),
};
