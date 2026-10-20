/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=453-148
 * Component set: Sidebar/item/sub-item (453:148)
 *
 * Variant matrix: State Default (453:136) · Hover (453:140) · Active (453:144) = 3 stories,
 *   plus Show count = true.
 * Properties: Label (text) -> label; Count (text) -> count; Show count (boolean) -> showCount.
 * No Focused variant in Figma: the keyboard focus ring is a design gap (an inset
 * border/focus ring is drawn so keyboard users are not left without one).
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarSubItem } from './SidebarSubItem';

const meta = {
  title: 'Components/Sidebar/Sidebar Sub Item',
  component: SidebarSubItem,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: '13rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: 'text', description: 'Figma text `Label`' },
    count: { control: 'text', description: 'Figma text `Count`' },
    showCount: { control: 'boolean', description: 'Figma boolean `Show count`' },
    state: { control: 'inline-radio', options: ['Default', 'Hover', 'Active'], description: 'Figma variant `State`' },
  },
  args: { label: 'Fiction', count: '6', showCount: false, state: 'Default', href: '#fiction' },
} satisfies Meta<typeof SidebarSubItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'State=Default (453:136)', args: { state: 'Default' } };
export const Hover: Story = { name: 'State=Hover (453:140)', args: { state: 'Hover' } };
export const Active: Story = { name: 'State=Active (453:144)', args: { state: 'Active' } };
export const DefaultWithCount: Story = { name: 'State=Default, Show count', args: { state: 'Default', showCount: true } };
export const ActiveWithCount: Story = { name: 'State=Active, Show count (456:5310)', args: { state: 'Active', label: 'Matches', showCount: true } };
