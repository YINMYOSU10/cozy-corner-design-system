/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=500-20
 * Component set: Header/item/nav-item (500:20), used in the Header Navigation slot.
 *
 * Variant matrix: 5 variants = 5 stories
 *   Platform=Website  State=Default (500:2) · Hover (500:4) · Active (500:6)
 *   Platform=Mobile   State=Default (500:8) · Active (500:14)   (no Mobile Hover in Figma)
 * Properties: Label (text) -> label; Icon (instance swap, default Icon/House) -> icon.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeartGlyph, HouseGlyph } from '../Icon/glyphs';
import { HeaderNavItem } from './HeaderNavItem';

const meta = {
  title: 'Components/Header Nav Item',
  component: HeaderNavItem,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Figma text `Label`' },
    platform: { control: 'inline-radio', options: ['Website', 'Mobile'], description: 'Figma variant `Platform`' },
    state: { control: 'inline-radio', options: ['Default', 'Hover', 'Active'], description: 'Figma variant `State`' },
    icon: { control: false, description: 'Figma instance swap `Icon` (Mobile only)' },
  },
  args: { label: 'Home', platform: 'Website', state: 'Default', href: '#home' },
} satisfies Meta<typeof HeaderNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Platform=Website, State=Default (500:2) */
export const WebsiteDefault: Story = {
  name: 'Platform=Website, State=Default',
  args: { platform: 'Website', state: 'Default' },
};

/** Platform=Website, State=Hover (500:4) */
export const WebsiteHover: Story = {
  name: 'Platform=Website, State=Hover',
  args: { platform: 'Website', state: 'Hover' },
};

/** Platform=Website, State=Active (500:6) */
export const WebsiteActive: Story = {
  name: 'Platform=Website, State=Active',
  args: { platform: 'Website', state: 'Active' },
};

/** Platform=Mobile, State=Default (500:8) */
export const MobileDefault: Story = {
  name: 'Platform=Mobile, State=Default',
  args: { platform: 'Mobile', state: 'Default', icon: <HouseGlyph /> },
};

/** Platform=Mobile, State=Active (500:14) */
export const MobileActive: Story = {
  name: 'Platform=Mobile, State=Active',
  args: { platform: 'Mobile', state: 'Active', label: 'Date', icon: <HeartGlyph /> },
};
