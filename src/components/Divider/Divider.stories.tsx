/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=17-3671
 * Component set: Divider (17:3671)
 *
 * Variant matrix: 2 variants
 *   IsDashed    False · True                                           (2)
 *
 * Token bindings (both variants):
 *   stroke colour  color/border/secondary  -> var(--color-border-secondary)
 *   stroke weight  borderWidth/1           -> var(--borderwidth-1)
 *
 * Design gap: the dashed variant's dash and gap lengths (about 4 on / 4 off
 * in Figma) are not bound to a variable, so the native CSS dashed style is used.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  argTypes: {
    isDashed: { control: 'boolean', description: 'Figma property `IsDashed`' },
  },
  args: { isDashed: false },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** IsDashed=False (17:3670) */
export const Solid: Story = {
  name: 'IsDashed=False',
  args: { isDashed: false },
};

/** IsDashed=True (17:3672) */
export const Dashed: Story = {
  name: 'IsDashed=True',
  args: { isDashed: true },
};

/** A solid Divider between two groups of text, with a dashed one inside the second group. */
export const BetweenGroups: Story = {
  name: 'Between Groups',
  parameters: { controls: { disable: true } },
  render: () => {
    const text = { font: 'var(--cozy-corner-typography-body-small)', color: 'var(--color-text-primary)', margin: 0 } as const;
    return (
      <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          <p style={text}>Home</p>
          <p style={text}>Date</p>
        </div>
        <Divider isDashed={false} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          <p style={text}>Shelf</p>
          <Divider isDashed />
          <p style={text}>About</p>
        </div>
      </div>
    );
  },
};
