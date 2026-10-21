/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=525-49
 * Component set: Status Bar (525:49)
 *
 * Variant matrix: 2 variants
 *   Mode   Light (525:3) · Dark (525:26)
 * Other props: Time (text, "9:41"), Signal / Wifi / Battery (instance swaps)
 *
 * Token bindings:
 *   Light  bg color/bg/base, time + glyphs color/text/bold
 *   Dark   bg color/bg/inverse, time + glyphs color/text/inverse
 *   padding-inline spacing/xl; time typography/labelLarge (all five parts)
 *
 * Design gaps: bar height 44 and indicator size 22 are not bound to variables
 * (carried as sizer SVG geometry); indicator gap 0 and padding-block 0 unbound.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBar } from './StatusBar';
import { WifiHighGlyph, BatteryFullGlyph } from '../Icon';

const meta = {
  title: 'Components/StatusBar',
  component: StatusBar,
  parameters: { layout: 'padded' },
  argTypes: {
    mode: { control: 'inline-radio', options: ['Light', 'Dark'], description: 'Figma property `Mode`' },
    time: { control: 'text', description: 'Figma property `Time`' },
  },
  args: { mode: 'Light', time: '9:41' },
  decorators: [(Story) => <div style={{ maxWidth: 430 }}><Story /></div>],
} satisfies Meta<typeof StatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Mode=Light (525:3) */
export const Light: Story = { name: 'Mode=Light', args: { mode: 'Light' } };

/** Mode=Dark (525:26) */
export const Dark: Story = { name: 'Mode=Dark', args: { mode: 'Dark' } };

/** Time property changed */
export const CustomTime: Story = { name: 'Time=custom', args: { time: '12:30' } };

/** Signal / Wifi / Battery instance swaps */
export const SwappedIndicators: Story = {
  name: 'Indicators=swapped',
  args: { wifi: <WifiHighGlyph />, battery: <BatteryFullGlyph /> },
};

/** The StatusBar at the top of a phone-sized frame, with some content below. */
export const OnAPhoneScreen: Story = {
  name: 'On A Phone Screen',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ inlineSize: 390, blockSize: 640, background: 'var(--color-bg-base)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar mode="Light" time="9:41" />
      <div style={{ padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <span style={{ font: 'var(--cozy-corner-typography-label-large)', color: 'var(--color-text-primary)' }}>Home</span>
        <span style={{ font: 'var(--cozy-corner-typography-body)', color: 'var(--color-text-secondary)' }}>Pick a mood and find your next book.</span>
      </div>
    </div>
  ),
};
