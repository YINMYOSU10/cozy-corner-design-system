/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=500-95
 * Component set: Header (500:95); sub-component Header/item/nav-item (500:20)
 *
 * Variant matrix: Platform (2) = 2 stories
 *   Platform    Website (500:21, 1440 wide) · Mobile (500:45, 430 wide)
 *   Navigation  slot -> children (HeaderNavItem instances)
 * Nav item matrix (see Header Nav Item stories): Website x Default/Hover/Active,
 * Mobile x Default/Active = 5 stories.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BooksGlyph, HeartGlyph, HouseGlyph, MapPinGlyph, UserGlyph } from '../Icon/glyphs';
import { Header } from './Header';
import { HeaderNavItem } from './HeaderNavItem';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    platform: { control: 'inline-radio', options: ['Website', 'Mobile'], description: 'Figma variant `Platform`' },
  },
  args: { platform: 'Website' },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Platform=Website (500:21): Logo + five pill items, "Date" active. */
export const Website: Story = {
  name: 'Platform=Website',
  args: { platform: 'Website' },
  render: (args) => (
    <Header {...args}>
      <HeaderNavItem platform="Website" label="Home" href="#home" />
      <HeaderNavItem platform="Website" label="Date" href="#date" state="Active" />
      <HeaderNavItem platform="Website" label="Shelf" href="#shelf" />
      <HeaderNavItem platform="Website" label="About" href="#about" />
      <HeaderNavItem platform="Website" label="Visit" href="#visit" />
    </Header>
  ),
};

/** Platform=Mobile (500:45): five icon tabs, "Date" active. */
export const Mobile: Story = {
  name: 'Platform=Mobile',
  args: { platform: 'Mobile' },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: (args) => (
    <Header {...args}>
      <HeaderNavItem platform="Mobile" label="Home" href="#home" icon={<HouseGlyph />} />
      <HeaderNavItem platform="Mobile" label="Date" href="#date" icon={<HeartGlyph />} state="Active" />
      <HeaderNavItem platform="Mobile" label="Shelf" href="#shelf" icon={<BooksGlyph />} />
      <HeaderNavItem platform="Mobile" label="Visit" href="#visit" icon={<MapPinGlyph />} />
      <HeaderNavItem platform="Mobile" label="Profile" href="#profile" icon={<UserGlyph />} />
    </Header>
  ),
};

/** The Header (Website) at the top of a page-sized frame, with a little page content under it. */
export const OnAPage: Story = {
  name: 'On A Page',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ minHeight: 480, background: 'var(--color-bg-base)', display: 'flex', flexDirection: 'column' }}>
      <Header platform="Website">
        <HeaderNavItem platform="Website" label="Home" href="#home" state="Active" />
        <HeaderNavItem platform="Website" label="Date" href="#date" />
        <HeaderNavItem platform="Website" label="Shelf" href="#shelf" />
        <HeaderNavItem platform="Website" label="About" href="#about" />
        <HeaderNavItem platform="Website" label="Visit" href="#visit" />
      </Header>
      <main style={{ padding: 'var(--spacing-3xl)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <h1 style={{ margin: 0, font: 'var(--cozy-corner-typography-body-large-semibold)', color: 'var(--color-text-primary)' }}>Home</h1>
        <p style={{ margin: 0, font: 'var(--cozy-corner-typography-body)', color: 'var(--color-text-secondary)' }}>Pick a mood and find your next book.</p>
      </main>
    </div>
  ),
};
