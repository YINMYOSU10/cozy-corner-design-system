/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=48-1251
 * Component set: Icon (48:1251)
 *
 * Variant matrix: 4 × 2 × 2 = 16 rows, one story each
 *   Size      12 · 16 · 24 · 32        (4)  variant
 *   Type      Standard · Outlined      (2)  variant
 *   Shape     Rounded · Circle         (2)  variant
 *   swapIcon  instance swap, default Icon/Plus (34:5278) — see "swapIcon" story
 * Icon is not interactive: no hover, press, focus, disabled or loading states.
 *
 * Token bindings (all from Figma variables):
 *   glyph stroke          color/icon/secondary            (all 16)
 *   Standard·Circle fill  color/bg/base
 *   Outlined ring         color/border/neutral/default
 *   Rounded radius        borderRadius/xs
 *   Circle radius         borderRadius/circle
 * Design gaps (unbound in Figma, reported, not filled in):
 *   - Frame size 12 / 16 / 24 / 32: no size token (only size/32 exists, and Figma
 *     does not bind it); carried as SVG geometry from the Size value.
 *   - Glyph stroke weight 1.18182: unbound; kept as the export's geometry.
 *   - Outlined stroke weight 1: unbound; drawn with borderwidth-1, as Button does.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Holds and presents one glyph, keeping its size and shape consistent. Swap the glyph with `swapIcon`; it is painted with `currentColor`.',
      },
    },
  },
  args: { size: '24', type: 'Standard', shape: 'Rounded' },
  argTypes: {
    size: { control: 'inline-radio', options: ['12', '16', '24', '32'] },
    type: { control: 'inline-radio', options: ['Standard', 'Outlined'] },
    shape: { control: 'inline-radio', options: ['Rounded', 'Circle'] },
    swapIcon: { control: false },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Size12StandardRounded: Story = {
  name: 'Size=12 · Type=Standard · Shape=Rounded',
  args: { size: '12', type: 'Standard', shape: 'Rounded' },
};

export const Size12StandardCircle: Story = {
  name: 'Size=12 · Type=Standard · Shape=Circle',
  args: { size: '12', type: 'Standard', shape: 'Circle' },
};

export const Size12OutlinedRounded: Story = {
  name: 'Size=12 · Type=Outlined · Shape=Rounded',
  args: { size: '12', type: 'Outlined', shape: 'Rounded' },
};

export const Size12OutlinedCircle: Story = {
  name: 'Size=12 · Type=Outlined · Shape=Circle',
  args: { size: '12', type: 'Outlined', shape: 'Circle' },
};

export const Size16StandardRounded: Story = {
  name: 'Size=16 · Type=Standard · Shape=Rounded',
  args: { size: '16', type: 'Standard', shape: 'Rounded' },
};

export const Size16StandardCircle: Story = {
  name: 'Size=16 · Type=Standard · Shape=Circle',
  args: { size: '16', type: 'Standard', shape: 'Circle' },
};

export const Size16OutlinedRounded: Story = {
  name: 'Size=16 · Type=Outlined · Shape=Rounded',
  args: { size: '16', type: 'Outlined', shape: 'Rounded' },
};

export const Size16OutlinedCircle: Story = {
  name: 'Size=16 · Type=Outlined · Shape=Circle',
  args: { size: '16', type: 'Outlined', shape: 'Circle' },
};

export const Size24StandardRounded: Story = {
  name: 'Size=24 · Type=Standard · Shape=Rounded',
  args: { size: '24', type: 'Standard', shape: 'Rounded' },
};

export const Size24StandardCircle: Story = {
  name: 'Size=24 · Type=Standard · Shape=Circle',
  args: { size: '24', type: 'Standard', shape: 'Circle' },
};

export const Size24OutlinedRounded: Story = {
  name: 'Size=24 · Type=Outlined · Shape=Rounded',
  args: { size: '24', type: 'Outlined', shape: 'Rounded' },
};

export const Size24OutlinedCircle: Story = {
  name: 'Size=24 · Type=Outlined · Shape=Circle',
  args: { size: '24', type: 'Outlined', shape: 'Circle' },
};

export const Size32StandardRounded: Story = {
  name: 'Size=32 · Type=Standard · Shape=Rounded',
  args: { size: '32', type: 'Standard', shape: 'Rounded' },
};

export const Size32StandardCircle: Story = {
  name: 'Size=32 · Type=Standard · Shape=Circle',
  args: { size: '32', type: 'Standard', shape: 'Circle' },
};

export const Size32OutlinedRounded: Story = {
  name: 'Size=32 · Type=Outlined · Shape=Rounded',
  args: { size: '32', type: 'Outlined', shape: 'Rounded' },
};

export const Size32OutlinedCircle: Story = {
  name: 'Size=32 · Type=Outlined · Shape=Circle',
  args: { size: '32', type: 'Outlined', shape: 'Circle' },
};

/** All 16 variants laid out like the Figma component set: rows Type·Shape, columns Size. */
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 'var(--spacing-xl)', alignItems: 'center', justifyItems: 'center' }}>
      {(['Standard', 'Outlined'] as const).flatMap((type) =>
        (['Rounded', 'Circle'] as const).flatMap((shape) =>
          (['12', '16', '24', '32'] as const).map((size) => (
            <Icon key={`${type}-${shape}-${size}`} size={size} type={type} shape={shape} />
          )),
        ),
      )}
    </div>
  ),
};

/** swapIcon replaces the default Icon/Plus. The glyph fills the frame and inherits currentColor. */
export const SwapIcon: Story = {
  name: 'swapIcon',
  args: {
    size: '32',
    type: 'Outlined',
    shape: 'Circle',
    label: 'Done',
    swapIcon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M6.5 12.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth={1.18182} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};
