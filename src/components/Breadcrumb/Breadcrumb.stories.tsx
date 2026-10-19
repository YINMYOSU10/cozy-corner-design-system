/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=431-68
 * Component set: Breadcrumb (431:68)
 * Sub-components: Breadcrumb/item/link (431:26), Breadcrumb/item/current (431:27), Breadcrumb/item/separator (430:15)
 *
 * Variant matrix: 3 variants of Breadcrumb
 *   Levels  2 · 3 · 4                                (3)
 * Breadcrumb/item/link: State Default · Hover · Focused (3)
 * Breadcrumb/item/current (1), Breadcrumb/item/separator (1)
 * One story per matrix row, plus Playground.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItemCurrent } from './BreadcrumbItemCurrent';
import { BreadcrumbItemLink } from './BreadcrumbItemLink';
import { BreadcrumbItemSeparator } from './BreadcrumbItemSeparator';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A nav landmark with an ordered list of links to parent pages. The last item is the current page (aria-current). Separators are hidden from assistive tech.',
      },
    },
  },
  argTypes: { levels: { control: 'inline-radio', options: [2, 3, 4] } },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { levels: 3 } };
export const Levels2: Story = { name: 'Matrix/Levels=2', args: { levels: 2 } };
export const Levels3: Story = { name: 'Matrix/Levels=3', args: { levels: 3 } };
export const Levels4: Story = { name: 'Matrix/Levels=4', args: { levels: 4 } };

export const ItemLinkDefault: Story = {
  name: 'Item/link/State=Default',
  render: () => <BreadcrumbItemLink href="#x" state="Default" />,
};
export const ItemLinkHover: Story = {
  name: 'Item/link/State=Hover',
  render: () => <BreadcrumbItemLink href="#x" state="Hover" />,
};
export const ItemLinkFocused: Story = {
  name: 'Item/link/State=Focused',
  render: () => <BreadcrumbItemLink href="#x" state="Focused" />,
};
export const ItemCurrent: Story = {
  name: 'Item/current',
  render: () => <BreadcrumbItemCurrent />,
};
export const ItemSeparator: Story = {
  name: 'Item/separator',
  render: () => <BreadcrumbItemSeparator />,
};
