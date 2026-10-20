/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=438-14
 * Component: Table (438:14), built from four subcomponents:
 *   TableTitleBar  Table/item/title-bar   437:20  https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/?node-id=437-20
 *   TableHeaderCell Table/item/header-cell 437:27  https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/?node-id=437-27
 *   TableCell      Table/item/cell        437:59  https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/?node-id=437-59
 *   TableColumn    "Column: Column"       438:19  (plain frame, no properties)
 *
 * Variant matrix (one story per row)
 *   Table           Show title true | false                                  (2)
 *   Title bar       Show helper false | true                                (2)
 *   Header cell     Align Left | Right                                      (2)
 *   Cell            Type=Text x Emphasis=Default | Muted | Strong           (3)
 *                   Type=Number | Badge | Tags | Toggle | Action | Custom | More (7)
 *                   Tags: Show tag 2 and Show tag 3 booleans                (in the Tags story)
 *
 * States: Figma defines NO hover, pressed, focus, selected, disabled or loading state for the
 * Table, title bar, header cell or cell, so none is invented. Toggle, Button / Info, Badge and
 * Tag inside cells keep their own states because they are the real components.
 *
 * Token bindings: surface bg color/bg/surfacePrimary, stroke color/border/gray/light (borderWidth/1),
 * radius borderRadius/md, padding spacing/lg (cell, header), spacing/xl + spacing/lg (title bar),
 * gap spacing/sm / spacing/xl, text colour color/text/gray/{bold,default}, Inter type tokens.
 *
 * Design gaps (built as Figma says, reported): cell height 56, Custom content 168x57, Action button
 * width 130 and More icon 20 have no size token; header-cell letterSpacing 0.32 is unbound
 * (no token), so it is not applied. The More button has no Figma focus state; it uses the repo
 * focus ring (2px color/border/focus via borderWidth/2) as Tag and Toggle do.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import { TableTitleBar } from './TableTitleBar';
import { TableColumn } from './TableColumn';
import { TableHeaderCell } from './TableHeaderCell';
import { TableCell, type TableCellProps } from './TableCell';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A table for dashboard data, organized in columns. Supports an optional title bar. Built from TableTitleBar, TableColumn, TableHeaderCell and TableCell.',
      },
    },
  },
  args: { showTitle: true },
  argTypes: { showTitle: { control: 'boolean' } },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Show title=true' };
export const NoTitle: Story = { name: 'Show title=false', args: { showTitle: false } };
export const WithHelper: Story = {
  name: 'Title bar: Show helper=true',
  args: { titleBar: <TableTitleBar title="Table title" showHelper helperText="Helper text" /> },
};
export const MixedCells: Story = {
  name: 'Mixed cell types',
  render: (args) => (
    <Table {...args}>
      <TableColumn header={<TableHeaderCell label="ORDER" />}>
        <TableCell type="Text" emphasis="Strong" />
        <TableCell type="Text" emphasis="Default" />
        <TableCell type="Text" emphasis="Muted" />
      </TableColumn>
      <TableColumn header={<TableHeaderCell label="STATUS" />}>
        <TableCell type="Badge" />
        <TableCell type="Tags" showTag3 />
        <TableCell type="Toggle" />
      </TableColumn>
      <TableColumn header={<TableHeaderCell label="QTY" align="Right" />}>
        <TableCell type="Number" />
        <TableCell type="Number" number="12" />
        <TableCell type="More" />
      </TableColumn>
    </Table>
  ),
};

// ---- Subcomponent stories (each shown in a Table column so layout matches Figma) ----
const column = (header: React.ReactNode, cell: TableCellProps) => (
  <div style={{ width: 200 }}>
    <TableColumn header={header}>
      <TableCell {...cell} />
    </TableColumn>
  </div>
);

export const HeaderCellLeft: Story = {
  name: 'Header cell: Align=Left',
  render: () => column(<TableHeaderCell align="Left" />, {}),
};
export const HeaderCellRight: Story = {
  name: 'Header cell: Align=Right',
  render: () => column(<TableHeaderCell align="Right" />, {}),
};
export const CellTextDefault: Story = {
  name: 'Cell: Type=Text, Emphasis=Default',
  render: () => column(<TableHeaderCell />, { type: 'Text', emphasis: 'Default' }),
};
export const CellTextMuted: Story = {
  name: 'Cell: Type=Text, Emphasis=Muted',
  render: () => column(<TableHeaderCell />, { type: 'Text', emphasis: 'Muted' }),
};
export const CellTextStrong: Story = {
  name: 'Cell: Type=Text, Emphasis=Strong',
  render: () => column(<TableHeaderCell />, { type: 'Text', emphasis: 'Strong' }),
};
export const CellNumber: Story = {
  name: 'Cell: Type=Number',
  render: () => column(<TableHeaderCell align="Right" />, { type: 'Number' }),
};
export const CellBadge: Story = {
  name: 'Cell: Type=Badge',
  render: () => column(<TableHeaderCell />, { type: 'Badge' }),
};
export const CellTags: Story = {
  name: 'Cell: Type=Tags (Show tag 2, Show tag 3)',
  render: () => column(<TableHeaderCell />, { type: 'Tags', showTag2: true, showTag3: true }),
};
export const CellToggle: Story = {
  name: 'Cell: Type=Toggle',
  render: () => column(<TableHeaderCell />, { type: 'Toggle' }),
};
export const CellAction: Story = {
  name: 'Cell: Type=Action',
  render: () => column(<TableHeaderCell />, { type: 'Action' }),
};
export const CellCustom: Story = {
  name: 'Cell: Type=Custom (Content slot)',
  render: () => column(<TableHeaderCell />, { type: 'Custom', children: 'Custom content' }),
};
export const CellMore: Story = {
  name: 'Cell: Type=More',
  render: () => column(<TableHeaderCell align="Right" />, { type: 'More' }),
};
