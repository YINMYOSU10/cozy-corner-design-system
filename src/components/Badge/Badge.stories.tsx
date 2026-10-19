/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=385-14
 * Component set: Badge (385:14)
 *
 * Variant matrix: 6 rows, one story each
 *   Type   Warning · Positive · Negative · Info · Update · Neutral  (6)  variant
 *   label  text property, default "Badge"
 * Badge is not interactive: no hover, press, focus, disabled, loading or error states.
 *
 * Token bindings (all from Figma variables, identical across the 6 variants except colours):
 *   padding        spacing/md (horizontal), spacing/base (vertical)
 *   radius         borderRadius/circle
 *   text style     Label: typography/label/{fontFamily, fontSize, fontWeight, lineHeight, letterSpacing}
 *   fill / text    Warning  color/bg/warning/light   / color/text/warning
 *                  Positive color/bg/positive/light  / color/text/positive
 *                  Negative color/bg/negative/light  / color/text/negative
 *                  Info     color/bg/info/light      / color/text/info
 *                  Update   color/bg/update/light    / color/text/update
 *                  Neutral  color/bg/gray/light      / color/text/gray/default
 *
 * Design gaps: none. Size is hugged from content + padding tokens (30px tall = 22 + 4 + 4).
 *
 * Suspected design slips (built as Figma says):
 *   - get_variable_defs on 385:14 also lists spacing/3xl (32) and spacing/5xl (40),
 *     which no Badge layer uses visibly: likely stray bindings on the set frame.
 *   - Neutral binds text to color/text/gray/default and fill to color/bg/gray/light,
 *     unlike its siblings' color/{bg,text}/<type> pattern. Consistent, but name differs.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A small status pill, such as the status of a row in a table. Supports Warning, Positive, Negative, Info, Update and Neutral types.',
      },
    },
  },
  args: { type: 'Warning', label: 'Badge' },
  argTypes: {
    type: { control: 'select', options: ['Warning', 'Positive', 'Negative', 'Info', 'Update', 'Neutral'] },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = { name: 'Type=Warning', args: { type: 'Warning' } };
export const Positive: Story = { name: 'Type=Positive', args: { type: 'Positive' } };
export const Negative: Story = { name: 'Type=Negative', args: { type: 'Negative' } };
export const Info: Story = { name: 'Type=Info', args: { type: 'Info' } };
export const Update: Story = { name: 'Type=Update', args: { type: 'Update' } };
export const Neutral: Story = { name: 'Type=Neutral', args: { type: 'Neutral' } };
