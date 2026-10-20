/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=453-4975
 * Component: Sidebar (453:4975), 237 wide. Subcomponents: SidebarItem (453:135),
 * SidebarSubItem (453:148), SidebarSectionLabel (453:149), SidebarUser (453:151).
 * Imports Logo (Platform=Dashboard), Avatar and Icon; never copies their styles.
 *
 * Properties: Navigation (slot) -> children; Show user (boolean, default true) -> showUser.
 * Stories: Default (the Figma layout), Without user, Interactive (click through items).
 *
 * Design gaps (unbound in Figma, reported, not filled in):
 *   - Sidebar width 237 and height 900: no size tokens; width carried as SVG geometry,
 *     height fills its container.
 *   - Nav icon box 20 and min height 40: no tokens.
 *   (Letter-spacing 0.32px on small text is NOT a gap: --typography-bodysmall-letterspacing and
 *   --typography-bodysmallsemibold-letterspacing exist and are used in Sidebar.css.)
 *   - Sub-item has no Focused variant.
 */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BooksGlyph, BrowserGlyph, ChartBarGlyph, HeartGlyph, HouseGlyph, TagGlyph, UsersGlyph,
} from '../Icon/glyphs';
import { Sidebar } from './Sidebar';
import { SidebarItem } from './SidebarItem';
import { SidebarSectionLabel } from './SidebarSectionLabel';
import { SidebarSubItem } from './SidebarSubItem';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The main navigation of the dashboard. Shows the logo, navigation items with an expandable Blind date group, and the signed-in user.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    showUser: { control: 'boolean', description: 'Figma boolean `Show user`' },
    children: { control: false, description: 'Figma slot `Navigation`' },
  },
  args: { showUser: true },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SUB_ITEMS: { label: string; count?: string }[] = [
  { label: 'Matches', count: '6' },
  { label: 'Wrapped books' },
  { label: 'Clue cards' },
  { label: 'Reveals' },
  { label: 'Swaps', count: '2' },
  { label: 'Settings' },
];

const navigation = (
  <>
    <SidebarItem label="Overview" icon={<HouseGlyph />} href="#overview" />
    <SidebarItem label="Blind date with a book" icon={<HeartGlyph />} expand="Expanded" />
    <div className="cc-sidebar__sub-items">
      {SUB_ITEMS.map((s, i) => (
        <SidebarSubItem key={s.label} label={s.label} count={s.count} showCount={!!s.count} state={i === 0 ? 'Active' : 'Default'} href="#sub" />
      ))}
    </div>
    <SidebarSectionLabel label="SHOP" />
    <SidebarItem label="Orders" icon={<BrowserGlyph />} showCount count="12" href="#orders" />
    <SidebarItem label="Inventory" icon={<BooksGlyph />} href="#inventory" />
    <SidebarItem label="Readers" icon={<UsersGlyph />} href="#readers" />
    <SidebarSectionLabel label="INSIGHTS" />
    <SidebarItem label="Reports" icon={<ChartBarGlyph />} href="#reports" />
    <SidebarItem label="Promotions" icon={<TagGlyph />} href="#promotions" />
  </>
);

/** Showing the layout of 453:4975. Show user = true. */
export const Default: Story = { args: { children: navigation } };

/** Show user = false. */
export const WithoutUser: Story = { name: 'Show user = false', args: { children: navigation, showUser: false } };

/** Click items to move the Active state; click the Blind date item to collapse and expand its group. */
export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = useState('Overview');
    const [open, setOpen] = useState(true);
    const pick = (name: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setActive(name);
    };
    const st = (name: string) => (active === name ? 'Active' : 'Default');
    const top = [
      ['Orders', <BrowserGlyph />, '12'],
      ['Inventory', <BooksGlyph />, undefined],
      ['Readers', <UsersGlyph />, undefined],
    ] as const;
    const insights = [
      ['Reports', <ChartBarGlyph />],
      ['Promotions', <TagGlyph />],
    ] as const;
    return (
      <Sidebar {...args}>
        <SidebarItem label="Overview" icon={<HouseGlyph />} href="#overview" state={st('Overview')} onClick={pick('Overview')} />
        <SidebarItem
          label="Blind date with a book"
          icon={<HeartGlyph />}
          expand={open ? 'Expanded' : 'Collapsed'}
          onClick={() => setOpen(!open)}
        />
        {open && (
          <div className="cc-sidebar__sub-items">
            {SUB_ITEMS.map((s) => (
              <SidebarSubItem key={s.label} label={s.label} count={s.count} showCount={!!s.count} href="#sub" state={st(s.label)} onClick={pick(s.label)} />
            ))}
          </div>
        )}
        <SidebarSectionLabel label="SHOP" />
        {top.map(([name, icon, count]) => (
          <SidebarItem key={name} label={name} icon={icon} showCount={!!count} count={count} href="#x" state={st(name)} onClick={pick(name)} />
        ))}
        <SidebarSectionLabel label="INSIGHTS" />
        {insights.map(([name, icon]) => (
          <SidebarItem key={name} label={name} icon={icon} href="#x" state={st(name)} onClick={pick(name)} />
        ))}
      </Sidebar>
    );
  },
};
