/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=453-149
 * Component: Sidebar/item/section-label (453:149). No variants: 1 story.
 * Properties: Label (text, default "MAIN") -> label. Not interactive.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarSectionLabel } from './SidebarSectionLabel';

const meta = {
  title: 'Components/Sidebar/Sidebar Section Label',
  component: SidebarSectionLabel,
  parameters: { layout: 'padded' },
  argTypes: { label: { control: 'text', description: 'Figma text `Label`' } },
  args: { label: 'MAIN' },
} satisfies Meta<typeof SidebarSectionLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Default (453:149)' };
export const Shop: Story = { name: 'Label=SHOP (456:5330)', args: { label: 'SHOP' } };
