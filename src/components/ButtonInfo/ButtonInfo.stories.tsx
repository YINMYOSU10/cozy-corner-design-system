/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=445-5037
 * Component set: Button / Info (445:5037)
 *
 * Variant matrix: 300 variants (same properties as Button / Primary)
 *   State       Default · Hover · Press · Focus · Disable              (5)
 *   Icon-style  Both icons · none · leading icon · trailing icon · Icon only (5)
 *   Shape       Rounded · Pill                                         (2)
 *   Size        32 · 48 · 56                                           (3)
 *   Type        Default · Outline                                      (2)
 *
 * Each "sheet" story below is one Type × Shape × Size block of the Figma
 * frame: 5 states (rows) × 5 icon styles (columns) = 25 matrix rows.
 * 12 sheets × 25 = all 300 rows.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ButtonInfo,
  type ButtonIconStyle,
  type ButtonShape,
  type ButtonSize,
  type ButtonState,
  type ButtonType,
} from './ButtonInfo';

const STATES: ButtonState[] = ['Default', 'Hover', 'Press', 'Focus', 'Disable'];
const ICON_STYLES: ButtonIconStyle[] = ['Both icons', 'none', 'leading icon', 'trailing icon', 'Icon only'];

const meta = {
  title: 'Components/Button Info',
  component: ButtonInfo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Button / Info. A blue button for neutral, informational actions. Same options as the Primary button. Some Disable variants carry suspected Figma binding slips, built as designed (see ButtonInfo.css).',
      },
    },
  },
  args: {
    labelText: 'Label',
    state: 'Default',
    iconStyle: 'none',
    shape: 'Rounded',
    size: '32',
    type: 'Default',
  },
  argTypes: {
    state: { control: 'select', options: STATES },
    iconStyle: { control: 'select', options: ICON_STYLES },
    shape: { control: 'inline-radio', options: ['Rounded', 'Pill'] },
    size: { control: 'inline-radio', options: ['32', '48', '56'] },
    type: { control: 'inline-radio', options: ['Default', 'Outline'] },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
} satisfies Meta<typeof ButtonInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Try every property with the controls below. Hover, press and Tab-focus work for real. */
export const Playground: Story = {};

const sheet = (type: ButtonType, shape: ButtonShape, size: ButtonSize): Story => ({
  name: `${type} · ${shape} · ${size}`,
  parameters: { controls: { disable: true } },
  render: (args) => (
    <table style={{ borderCollapse: 'separate', borderSpacing: 'var(--spacing-xxl) var(--spacing-lg)' }}>
      <thead>
        <tr>
          <th />
          {ICON_STYLES.map((s) => (
            <th key={s} style={{ font: 'var(--cozy-corner-typography-label-small)', color: 'var(--color-text-secondary)' }}>{s}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {STATES.map((state) => (
          <tr key={state}>
            <th style={{ font: 'var(--cozy-corner-typography-label-small)', color: 'var(--color-text-secondary)', textAlign: 'left' }}>{state}</th>
            {ICON_STYLES.map((iconStyle) => (
              <td key={iconStyle} data-matrix={`State=${state}, Icon-style=${iconStyle}, Shape=${shape}, Size=${size}, Type=${type}`}>
                <ButtonInfo {...args} type={type} shape={shape} size={size} state={state} iconStyle={iconStyle} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
});

export const DefaultRounded32 = sheet('Default', 'Rounded', '32');
export const DefaultRounded48 = sheet('Default', 'Rounded', '48');
export const DefaultRounded56 = sheet('Default', 'Rounded', '56');
export const DefaultPill32 = sheet('Default', 'Pill', '32');
export const DefaultPill48 = sheet('Default', 'Pill', '48');
export const DefaultPill56 = sheet('Default', 'Pill', '56');
export const OutlineRounded32 = sheet('Outline', 'Rounded', '32');
export const OutlineRounded48 = sheet('Outline', 'Rounded', '48');
export const OutlineRounded56 = sheet('Outline', 'Rounded', '56');
export const OutlinePill32 = sheet('Outline', 'Pill', '32');
export const OutlinePill48 = sheet('Outline', 'Pill', '48');
export const OutlinePill56 = sheet('Outline', 'Pill', '56');
