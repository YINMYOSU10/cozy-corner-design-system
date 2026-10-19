/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=500-261
 * Component set: Footer (500:261); sub-component Footer/item/column (500:96)
 *
 * Variant matrix: 2 variants x Show copyright (2) = 4 stories
 *   Platform        Website · Mobile                                   (2)
 *   Show copyright  false · true (boolean, default false)              (2)
 * Text properties tagline, copyright; slot children = columns.
 * Column: heading (text) + items slot (Link instances) -> 1 story.
 *
 * Design gaps / slips: see the Engineer card; widths (470, 320, 230) are unbound.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../Link';
import { Footer } from './Footer';
import { FooterColumn } from './FooterColumn';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    platform: { control: 'inline-radio', options: ['Website', 'Mobile'], description: 'Figma variant `Platform`' },
    tagline: { control: 'text', description: 'Figma text `Tagline`' },
    copyright: { control: 'text', description: 'Figma text `Copyright`' },
    showCopyright: { control: 'boolean', description: 'Figma boolean `Show copyright`' },
  },
  args: { platform: 'Website', showCopyright: false },
  render: (args) => (
    <Footer {...args}>
      <FooterColumn heading="EXPLORE">
        <Link href="#home" labelText="Home" />
        <Link href="#blind-date" labelText="Blind Date" />
        <Link href="#browse" labelText="Browse" />
      </FooterColumn>
      <FooterColumn heading="SHOP">
        <Link href="#about" labelText="About" />
        <Link href="#visit" labelText="Visit" />
      </FooterColumn>
      <FooterColumn heading="VISIT US">
        {'14 Mercer Lane'}
        {'Tue–Sun, 10am–7pm'}
      </FooterColumn>
    </Footer>
  ),
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Platform=Website (500:105) */
export const Website: Story = { name: 'Platform=Website', args: { platform: 'Website' } };

/** Platform=Mobile (500:183) */
export const Mobile: Story = {
  name: 'Platform=Mobile',
  args: { platform: 'Mobile' },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};

/** Platform=Website, Show copyright=true */
export const WebsiteWithCopyright: Story = {
  name: 'Platform=Website, Show copyright=true',
  args: { platform: 'Website', showCopyright: true },
};

/** Platform=Mobile, Show copyright=true */
export const MobileWithCopyright: Story = {
  name: 'Platform=Mobile, Show copyright=true',
  args: { platform: 'Mobile', showCopyright: true },
};
