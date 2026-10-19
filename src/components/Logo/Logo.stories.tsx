/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=4-484
 * Component set: Logo (4:484)
 *
 * Variant matrix: 2 variants × 2 × 2 booleans = 8 rows
 *   Platform       Dashboard · Website     (2)  variant
 *   Show Glyph     true · false            (2)  boolean
 *   Show Wordmark  true · false            (2)  boolean
 * Logo is not interactive: no hover, press, focus, disabled or loading states.
 *
 * Every visible paint is bound to a semantic token in Figma.
 * Design gaps (unbound in Figma, reported, not filled in):
 *   - Glyph frame size (48 / 32) and the fixed component frames (265×74 / 185×45);
 *     the build hugs its content.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The Cozy Corner brand mark, with the book glyph and wordmark. Supports Dashboard and Website layouts.',
      },
    },
  },
  args: {
    platform: 'Website',
    showGlyph: true,
    showWordmark: true,
  },
  argTypes: {
    platform: { control: 'inline-radio', options: ['Dashboard', 'Website'] },
    showGlyph: { control: 'boolean' },
    showWordmark: { control: 'boolean' },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WebsiteGlyphAndWordmark: Story = {
  name: 'Platform=Website · Glyph · Wordmark',
  args: { platform: 'Website', showGlyph: true, showWordmark: true },
};
export const WebsiteGlyphOnly: Story = {
  name: 'Platform=Website · Glyph only',
  args: { platform: 'Website', showGlyph: true, showWordmark: false },
};
export const WebsiteWordmarkOnly: Story = {
  name: 'Platform=Website · Wordmark only',
  args: { platform: 'Website', showGlyph: false, showWordmark: true },
};
export const WebsiteNeither: Story = {
  name: 'Platform=Website · Neither',
  args: { platform: 'Website', showGlyph: false, showWordmark: false },
};
export const DashboardGlyphAndWordmark: Story = {
  name: 'Platform=Dashboard · Glyph · Wordmark',
  args: { platform: 'Dashboard', showGlyph: true, showWordmark: true },
};
export const DashboardGlyphOnly: Story = {
  name: 'Platform=Dashboard · Glyph only',
  args: { platform: 'Dashboard', showGlyph: true, showWordmark: false },
};
export const DashboardWordmarkOnly: Story = {
  name: 'Platform=Dashboard · Wordmark only',
  args: { platform: 'Dashboard', showGlyph: false, showWordmark: true },
};
export const DashboardNeither: Story = {
  name: 'Platform=Dashboard · Neither',
  args: { platform: 'Dashboard', showGlyph: false, showWordmark: false },
};
