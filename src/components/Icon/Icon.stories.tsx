/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=48-1251
 * Component set: Icon (48:1251)
 *
 * Variant matrix: 4 × 2 × 2 = 16 rows, one story each
 *   Size      12 · 16 · 24 · 32        (4)  variant
 *   Type      Standard · Outlined      (2)  variant
 *   Shape     Rounded · Circle         (2)  variant
 *   swapIcon  instance swap, default Icon/Plus (34:5278) — see "swapIcon" story
 * Icon is not interactive: no hover, press, focus, disabled or loading states.
 *
 * Token bindings (all from Figma variables):
 *   glyph stroke          color/icon/secondary            (all 16)
 *   Standard·Circle fill  color/bg/base
 *   Outlined ring         color/border/neutral/default
 *   Rounded radius        borderRadius/xs
 *   Circle radius         borderRadius/circle
 * Design gaps (unbound in Figma, reported, not filled in):
 *   - Frame size 12 / 16 / 24 / 32: no size token (only size/32 exists, and Figma
 *     does not bind it); carried as SVG geometry from the Size value.
 *   - Glyph stroke weight 1.18182: unbound; kept as the export's geometry.
 *   - Outlined stroke weight 1: unbound; drawn with borderwidth-1, as Button does.
 *
 * Glyphs: 914 components from the Figma "Icons" page (frame 34:423), node
 * https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=34-423
 * — see the "All glyphs" story. Each is exported as <FigmaName>Glyph from '../Icon'.
 * Glyph gaps (reported, not filled in):
 *   - Every glyph master paints with "Color Tokens/Content/Dark/Primary", a
 *     variable from another library, not in our token set. Glyphs draw with
 *     currentColor; inside Icon that is color/icon/secondary.
 *   - Unbound paint: Icon/X (195:268) fill #000000; Icon/arrow_drop_down
 *     (257:4307) and resize_window (277:1814) fill #1C1B1F, each masked by an
 *     unbound #D9D9D9 bounding box (the full-frame mask is dropped, no visual change).
 *   - Unbound opacity 0.5 on one layer of Icon/Key (34:2702) and Icon/Bandaids
 *     (34:4552): no opacity token, so those layers draw at full opacity.
 * Glyph name clashes (not renamed silently):
 *   - Repeated names with different drawings get the node id as a suffix:
 *     Icon/Table (34:1199, 34:5141), Icon/List (34:2588, 34:3788),
 *     Icon/Layout (34:2670, 34:5213), Icon/GridFour (34:2918, 34:5133, 34:5138)
 *     -> e.g. TableGlyph_34_1199. There is no plain TableGlyph.
 *   - Not PascalCase / missing the "Icon/" prefix, kept as named:
 *     Icon/arrow_drop_down -> arrow_drop_downGlyph, resize_window -> resize_windowGlyph,
 *     CaretDoubleHorizontal -> CaretDoubleHorizontalGlyph.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import { UserGlyph } from './glyphs';
import { allGlyphs } from './glyphs/catalog';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Holds and presents one glyph, keeping its size and shape consistent. Swap the glyph with `swapIcon`; it is painted with `currentColor`.',
      },
    },
  },
  args: { size: '24', type: 'Standard', shape: 'Rounded' },
  argTypes: {
    size: { control: 'inline-radio', options: ['12', '16', '24', '32'] },
    type: { control: 'inline-radio', options: ['Standard', 'Outlined'] },
    shape: { control: 'inline-radio', options: ['Rounded', 'Circle'] },
    swapIcon: { control: false },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Size12StandardRounded: Story = {
  name: 'Size=12 · Type=Standard · Shape=Rounded',
  args: { size: '12', type: 'Standard', shape: 'Rounded' },
};

export const Size12StandardCircle: Story = {
  name: 'Size=12 · Type=Standard · Shape=Circle',
  args: { size: '12', type: 'Standard', shape: 'Circle' },
};

export const Size12OutlinedRounded: Story = {
  name: 'Size=12 · Type=Outlined · Shape=Rounded',
  args: { size: '12', type: 'Outlined', shape: 'Rounded' },
};

export const Size12OutlinedCircle: Story = {
  name: 'Size=12 · Type=Outlined · Shape=Circle',
  args: { size: '12', type: 'Outlined', shape: 'Circle' },
};

export const Size16StandardRounded: Story = {
  name: 'Size=16 · Type=Standard · Shape=Rounded',
  args: { size: '16', type: 'Standard', shape: 'Rounded' },
};

export const Size16StandardCircle: Story = {
  name: 'Size=16 · Type=Standard · Shape=Circle',
  args: { size: '16', type: 'Standard', shape: 'Circle' },
};

export const Size16OutlinedRounded: Story = {
  name: 'Size=16 · Type=Outlined · Shape=Rounded',
  args: { size: '16', type: 'Outlined', shape: 'Rounded' },
};

export const Size16OutlinedCircle: Story = {
  name: 'Size=16 · Type=Outlined · Shape=Circle',
  args: { size: '16', type: 'Outlined', shape: 'Circle' },
};

export const Size24StandardRounded: Story = {
  name: 'Size=24 · Type=Standard · Shape=Rounded',
  args: { size: '24', type: 'Standard', shape: 'Rounded' },
};

export const Size24StandardCircle: Story = {
  name: 'Size=24 · Type=Standard · Shape=Circle',
  args: { size: '24', type: 'Standard', shape: 'Circle' },
};

export const Size24OutlinedRounded: Story = {
  name: 'Size=24 · Type=Outlined · Shape=Rounded',
  args: { size: '24', type: 'Outlined', shape: 'Rounded' },
};

export const Size24OutlinedCircle: Story = {
  name: 'Size=24 · Type=Outlined · Shape=Circle',
  args: { size: '24', type: 'Outlined', shape: 'Circle' },
};

export const Size32StandardRounded: Story = {
  name: 'Size=32 · Type=Standard · Shape=Rounded',
  args: { size: '32', type: 'Standard', shape: 'Rounded' },
};

export const Size32StandardCircle: Story = {
  name: 'Size=32 · Type=Standard · Shape=Circle',
  args: { size: '32', type: 'Standard', shape: 'Circle' },
};

export const Size32OutlinedRounded: Story = {
  name: 'Size=32 · Type=Outlined · Shape=Rounded',
  args: { size: '32', type: 'Outlined', shape: 'Rounded' },
};

export const Size32OutlinedCircle: Story = {
  name: 'Size=32 · Type=Outlined · Shape=Circle',
  args: { size: '32', type: 'Outlined', shape: 'Circle' },
};

/** All 16 variants laid out like the Figma component set: rows Type·Shape, columns Size. */
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 'var(--spacing-xl)', alignItems: 'center', justifyItems: 'center' }}>
      {(['Standard', 'Outlined'] as const).flatMap((type) =>
        (['Rounded', 'Circle'] as const).flatMap((shape) =>
          (['12', '16', '24', '32'] as const).map((size) => (
            <Icon key={`${type}-${shape}-${size}`} size={size} type={type} shape={shape} />
          )),
        ),
      )}
    </div>
  ),
};

/** swapIcon replaces the default Icon/Plus with any glyph. It fills the frame and inherits currentColor. */
export const SwapIcon: Story = {
  name: 'swapIcon',
  args: { size: '32', type: 'Outlined', shape: 'Circle', label: 'User', swapIcon: <UserGlyph /> },
};

/** Every glyph on the Figma "Icons" page, each in a 24 Standard Rounded Icon, labelled with its Figma name. */
export const AllGlyphs: Story = {
  name: `All glyphs (${allGlyphs.length})`,
  parameters: { layout: 'padded' },
  render: () => (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(var(--spacing-jumbo), 1fr))',
        gap: 'var(--spacing-md)',
        margin: 0,
        padding: 0,
        listStyle: 'none',
        font: 'var(--cozy-corner-typography-label)',
        color: 'var(--color-text-secondary)',
      }}
    >
      {allGlyphs.map((G) => (
        <li
          key={G.figmaId}
          title={`${G.figmaName} (${G.figmaId})`}
          data-figma-id={G.figmaId}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-base)', minWidth: 0 }}
        >
          <Icon size="24" swapIcon={<G />} label={G.figmaName} />
          <span style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {G.figmaName.replace(/^Icon\//, '')}
          </span>
        </li>
      ))}
    </ul>
  ),
};
