/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=33-382
 * Component set: Link (33:382)
 *
 * Variant matrix: 16 variants
 *   Type   Link · With icon                       (2)
 *   Size   S · L                                  (2)
 *   State  Default · Hover · Visited · Disable    (4)
 * Booleans showStartIcon / showEndIcon and instance swap swapIcon apply to `With icon`.
 *
 * One story per matrix row (Matrix/...), plus Playground and a keyboard/disabled demo.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowSquareDownGlyph } from '../Icon';
import { Link, type LinkSize, type LinkState, type LinkType } from './Link';

const STATES: LinkState[] = ['Default', 'Hover', 'Visited', 'Disable'];
const SIZES: LinkSize[] = ['L', 'S'];
const TYPES: LinkType[] = ['Link', 'With icon'];

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Links navigate users to another page, section, or external destination. Two sizes, four states, optional leading and trailing icons.',
      },
    },
  },
  args: {
    labelText: 'Link',
    href: '#',
    size: 'L',
    state: 'Default',
    type: 'Link',
    showStartIcon: true,
    showEndIcon: true,
  },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    state: { control: 'select', options: STATES },
    type: { control: 'inline-radio', options: TYPES },
    swapIcon: { control: false },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Try every property with the controls below. Hover, Tab-focus and visited work for real. */
export const Playground: Story = {};

const row = (type: LinkType, size: LinkSize, state: LinkState): Story => ({
  name: `${type} · ${size} · ${state}`,
  parameters: { controls: { disable: true } },
  args: { type, size, state },
});

export const MatrixLinkLDefault = row('Link', 'L', 'Default');
export const MatrixLinkLHover = row('Link', 'L', 'Hover');
export const MatrixLinkLVisited = row('Link', 'L', 'Visited');
export const MatrixLinkLDisable = row('Link', 'L', 'Disable');
export const MatrixLinkSDefault = row('Link', 'S', 'Default');
export const MatrixLinkSHover = row('Link', 'S', 'Hover');
export const MatrixLinkSVisited = row('Link', 'S', 'Visited');
export const MatrixLinkSDisable = row('Link', 'S', 'Disable');
export const MatrixWithIconLDefault = row('With icon', 'L', 'Default');
export const MatrixWithIconLHover = row('With icon', 'L', 'Hover');
export const MatrixWithIconLVisited = row('With icon', 'L', 'Visited');
export const MatrixWithIconLDisable = row('With icon', 'L', 'Disable');
export const MatrixWithIconSDefault = row('With icon', 'S', 'Default');
export const MatrixWithIconSHover = row('With icon', 'S', 'Hover');
export const MatrixWithIconSVisited = row('With icon', 'S', 'Visited');
export const MatrixWithIconSDisable = row('With icon', 'S', 'Disable');

/** Icon booleans and instance swap. */
export const IconOptions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', alignItems: 'flex-start' }}>
      <Link type="With icon" href="#" labelText="Start icon only" showEndIcon={false} />
      <Link type="With icon" href="#" labelText="End icon only" showStartIcon={false} />
      <Link type="With icon" href="#" labelText="Swapped icon" swapIcon={<ArrowSquareDownGlyph />} />
    </div>
  ),
};

/** Real behaviour: Tab to focus, hover, click. A disabled link has no href and is skipped by Tab. */
export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
      <Link href="#one" labelText="First" />
      <Link state="Disable" href="#never" labelText="Disabled (skipped)" />
      <Link href="#two" type="With icon" labelText="Last" />
    </div>
  ),
};
