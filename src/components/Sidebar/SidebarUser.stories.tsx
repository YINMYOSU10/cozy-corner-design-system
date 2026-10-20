/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=453-151
 * Component: Sidebar/item/user (453:151). No variants: 1 story.
 * Properties: Name (text, default "Su") -> name; Role (text, default "Store Admin") -> role.
 * Uses Avatar (Size=40, Type=Initials). Not interactive.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarUser } from './SidebarUser';

const meta = {
  title: 'Components/Sidebar/Sidebar User',
  component: SidebarUser,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: '13rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    name: { control: 'text', description: 'Figma text `Name`' },
    role: { control: 'text', description: 'Figma text `Role`' },
  },
  args: { name: 'Su', role: 'Store Admin' },
} satisfies Meta<typeof SidebarUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Default (453:151)' };
