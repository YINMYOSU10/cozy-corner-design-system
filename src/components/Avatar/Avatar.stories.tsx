/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=576-24
 * Component set: Avatar (576:24)
 *
 * Variant matrix: 3 × 2 = 6 rows, one story each
 *   Size      32 · 40 · 48          (3)  variant
 *   Type      Initials · Icon       (2)  variant
 *   Initials  text property, default "SU" (applies to Type=Initials)
 * No image type in Figma. Avatar is not interactive: no hover, press, focus,
 * disabled, loading or error states.
 *
 * Token bindings (all from Figma variables):
 *   container fill        color/bg/primary/light          (all 6)
 *   container radius      borderRadius/circle             (all 6)
 *   initials fill         color/text/brand
 *   initials font         fontFamily/inter, fontWeight/semibold
 *   initials Size 32      fontSize/12, lineHeight/16
 *   initials Size 40, 48  fontSize/14, lineHeight/20
 *   Icon/User stroke      color/text/brand
 *
 * Design gaps (unbound in Figma, reported, not filled in):
 *   - Container size 32 / 40 / 48: unbound (size/32 and size/48 exist but are
 *     not bound, and there is no size/40); carried as SVG geometry from Size.
 *   - Icon box 16 / 20 / 24: unbound; carried as SVG geometry from Size.
 *   - Size 32 initials letter-spacing 0.32px: raw value, no token (the
 *     Body small semibold style token reads 0px). Not applied.
 *   - Icon/User stroke is bound to a text token (color/text/brand), not an
 *     icon token. Kept as bound; color/icon/brand was not substituted.
 *   - Icon/User stroke weight 1.5: unbound; kept as the glyph's geometry.
 *   - fontWeight/semibold resolves to "semibold", which CSS does not accept as
 *     a font-weight, so the browser drops it. Token value issue, reported.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A small circle that stands for a person, such as the signed-in staff member. Supports Initials and Icon types in 32, 40 and 48 sizes.',
      },
    },
  },
  args: { size: '32', type: 'Initials', initials: 'SU' },
  argTypes: {
    size: { control: 'inline-radio', options: ['32', '40', '48'] },
    type: { control: 'inline-radio', options: ['Initials', 'Icon'] },
    initials: { control: 'text' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Size32Initials: Story = { name: 'Size=32, Type=Initials', args: { size: '32', type: 'Initials' } };
export const Size32Icon: Story = { name: 'Size=32, Type=Icon', args: { size: '32', type: 'Icon' } };
export const Size40Initials: Story = { name: 'Size=40, Type=Initials', args: { size: '40', type: 'Initials' } };
export const Size40Icon: Story = { name: 'Size=40, Type=Icon', args: { size: '40', type: 'Icon' } };
export const Size48Initials: Story = { name: 'Size=48, Type=Initials', args: { size: '48', type: 'Initials' } };
export const Size48Icon: Story = { name: 'Size=48, Type=Icon', args: { size: '48', type: 'Icon' } };
