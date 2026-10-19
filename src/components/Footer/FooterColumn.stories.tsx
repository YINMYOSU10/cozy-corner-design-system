/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=500-96
 * Component: Footer/item/column (500:96) - no variants.
 * Properties: Heading (text) -> heading; Items (slot) -> children.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../Link';
import { FooterColumn } from './FooterColumn';

const meta = {
  title: 'Components/Footer Column',
  component: FooterColumn,
  parameters: { layout: 'padded' },
  argTypes: { heading: { control: 'text', description: 'Figma text `Heading`' } },
  args: { heading: 'EXPLORE' },
} satisfies Meta<typeof FooterColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Footer/item/column (500:96) */
export const Default: Story = {
  render: (args) => (
    <FooterColumn {...args}>
      <Link href="#home" labelText="Home" />
      <Link href="#blind-date" labelText="Blind Date" />
      <Link href="#browse" labelText="Browse" />
    </FooterColumn>
  ),
};
