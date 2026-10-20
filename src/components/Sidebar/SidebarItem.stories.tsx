/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=453-135
 * Component set: Sidebar/item/nav-item (453:135)
 *
 * Variant matrix: 4 State x 3 Expand = 12 variants = 12 stories
 *   State   Default · Hover · Active · Focused
 *   Expand  None · Collapsed · Expanded
 * Properties: Label (text) -> label; Icon (instance swap, default Icon/SquaresFour) -> icon;
 *   Count (text) -> count; Show count (boolean) -> showCount.
 * Hover and Focused are real :hover / :focus-visible; `state` pins that look for docs.
 *
 * Design gaps (unbound in Figma, reported, not filled in):
 *   - Icon box 20x20 and Chevron 16x16 sizes, min height 40: no size tokens (no Icon size 20).
 *   - Count and label letter-spacing 0.32px: raw value, the dashboard style tokens carry none.
 */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarItem } from './SidebarItem';

const meta = {
  title: 'Components/Sidebar/Sidebar Item',
  component: SidebarItem,
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
    state: { control: 'inline-radio', options: ['Default', 'Hover', 'Active', 'Focused'], description: 'Figma variant `State`' },
    expand: { control: 'inline-radio', options: ['None', 'Collapsed', 'Expanded'], description: 'Figma variant `Expand`' },
    icon: { control: false, description: 'Figma instance swap `Icon`' },
  },
  args: { label: 'Overview', count: '12', showCount: false, state: 'Default', expand: 'None', href: '#overview' },
} satisfies Meta<typeof SidebarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultNone: Story = { name: 'State=Default, Expand=None (453:3)', args: { state: 'Default', expand: 'None' } };
export const DefaultCollapsed: Story = { name: 'State=Default, Expand=Collapsed (453:14)', args: { state: 'Default', expand: 'Collapsed' } };
export const DefaultExpanded: Story = { name: 'State=Default, Expand=Expanded (453:25)', args: { state: 'Default', expand: 'Expanded' } };
export const HoverNone: Story = { name: 'State=Hover, Expand=None (453:36)', args: { state: 'Hover', expand: 'None' } };
export const HoverCollapsed: Story = { name: 'State=Hover, Expand=Collapsed (453:47)', args: { state: 'Hover', expand: 'Collapsed' } };
export const HoverExpanded: Story = { name: 'State=Hover, Expand=Expanded (453:58)', args: { state: 'Hover', expand: 'Expanded' } };
export const ActiveNone: Story = { name: 'State=Active, Expand=None (453:69)', args: { state: 'Active', expand: 'None' } };
export const ActiveCollapsed: Story = { name: 'State=Active, Expand=Collapsed (453:80)', args: { state: 'Active', expand: 'Collapsed' } };
export const ActiveExpanded: Story = { name: 'State=Active, Expand=Expanded (453:91)', args: { state: 'Active', expand: 'Expanded' } };
export const FocusedNone: Story = { name: 'State=Focused, Expand=None (453:102)', args: { state: 'Focused', expand: 'None' } };
export const FocusedCollapsed: Story = { name: 'State=Focused, Expand=Collapsed (453:113)', args: { state: 'Focused', expand: 'Collapsed' } };
export const FocusedExpanded: Story = { name: 'State=Focused, Expand=Expanded (453:124)', args: { state: 'Focused', expand: 'Expanded' } };

/** Show count = true (Orders 456:5332). */
export const WithCount: Story = { name: 'Show count (456:5332)', args: { label: 'Orders', showCount: true } };

/** Behaviour: click the item to toggle Collapsed / Expanded; tab to see the focus ring. */
export const Interactive: Story = {
  args: { label: 'Blind date with a book', expand: 'Collapsed', href: undefined },
  render: (args) => {
    const [expand, setExpand] = useState<'Collapsed' | 'Expanded'>('Collapsed');
    return <SidebarItem {...args} expand={expand} onClick={() => setExpand(expand === 'Expanded' ? 'Collapsed' : 'Expanded')} />;
  },
};
