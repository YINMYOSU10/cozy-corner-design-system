/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=554-25
 * Component set: Detail Row (554:25)
 *
 * Variant matrix: Platform (Mobile | Website) x Show divider (on | off) = 4 stories.
 * Label / Value are text properties (defaults "Address" / "14 Mercer Lane").
 * Not interactive: no hover, press, focus, disabled, loading or error states.
 *
 * Token bindings (read from Figma variables):
 *   root fill            color/bg/base
 *   row padding V        Mobile spacing/md, Website spacing/lg
 *   Label fill           color/text/secondary
 *   Value fill           color/text/primary
 *   text                 Karla / regular / 16 / 26 (typography Mobile|Website/Body)
 *   divider fill         color/border/secondary (Figma: bare 1px frame; built by
 *                        importing the Divider component, same token)
 *
 * Gaps / slips: root width 390 / 560 unbound (fills container); Divider is a bare
 * frame in Figma (554:7, 554:19), not a Divider instance; no gap/radius bound.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DetailRow } from './DetailRow';

const meta: Meta<typeof DetailRow> = {
  title: 'Components/DetailRow',
  component: DetailRow,
  args: { label: 'Address', value: '14 Mercer Lane', showDivider: true },
  argTypes: { platform: { control: 'inline-radio', options: ['Mobile', 'Website'] } },
  decorators: [
    (Story, ctx) => (
      <div style={{ maxWidth: ctx.args.platform === 'Website' ? 560 : 390 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof DetailRow>;

export const MobileWithDivider: Story = { args: { platform: 'Mobile', showDivider: true } };
export const MobileNoDivider: Story = { args: { platform: 'Mobile', showDivider: false } };
export const WebsiteWithDivider: Story = { args: { platform: 'Website', showDivider: true } };
export const WebsiteNoDivider: Story = { args: { platform: 'Website', showDivider: false } };
