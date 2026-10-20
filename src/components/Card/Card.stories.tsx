/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=381-1660
 * Component set: Card (381:1660)
 *
 * Variant matrix (Card set): 4 variants
 *   Platform=Dashboard, Type=Default  381:1648
 *   Platform=Mobile,    Type=Default  381:1661
 *   Platform=Website,   Type=Default  381:1691
 *   Platform=Dashboard, Type=Clue     492:476
 * x nested container State (Card/item/container 366:1973): Default | Hover = 8 stories.
 * Plus nested text Trend (Card/item/text 366:1953) Down and None on the Dashboard card
 * (Up is the Card default) = 2 more stories. 10 matrix rows in total.
 * Hover also works for real: point at any card.
 *
 * Token bindings (read from Figma variables):
 *   container fill        color/bg/surfacePrimary
 *   container radius      borderRadius/md
 *   container padding     spacing/lg (V) spacing/xl (H); Clue: spacing/xl all round
 *   container gap         spacing/sm
 *   shadow Default        elevation/level1 shadow1 + shadow2 (Clue: none)
 *   shadow Hover          elevation/level2 shadow1 + shadow2
 *   Clue stroke           color/border/secondary
 *   ReportText            gap spacing/md, group gap spacing/sm;
 *                         Label dashboard/Body large, color/text/primary;
 *                         Value dashboard/Display, color/text/bold;
 *                         Trend dashboard/Body large medium, Up text/positive,
 *                         Down text/negative, None text/secondary
 *   BookDescription       Mobile gap spacing/lg, Website gap spacing/xxl, group gap spacing/base;
 *                         Title mobile|website/H2 text/bold; Author mobile/Body small |
 *                         website/Body text/secondary; Description mobile|website/Body text/primary
 *   Clue text             gap spacing/md; Twine fill color/border/secondary; Moods gap spacing/sm
 *                         (Tag Size=Small, imported); Clue mobile/H2 text/bold;
 *                         Caption dashboard/Body small text/secondary
 *
 * Gaps (unbound in Figma): variant frame fill raw #FFFFFF; container sizes 275x146 (H fixed),
 * 390x177, 567x180, 374 wide; CardSlot/CardText widths 235, 358, 527, 335, 386; Clue stroke
 * weight 1 (rendered with borderWidth/1); Twine height 2 (rendered with borderWidth/2).
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const WIDTH: Record<string, number | undefined> = { Mobile: 390, Website: 567 };

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: { platform: 'Dashboard', type: 'Default', state: 'Default', trend: 'Up' },
  argTypes: {
    platform: { control: 'inline-radio', options: ['Dashboard', 'Mobile', 'Website'] },
    type: { control: 'inline-radio', options: ['Default', 'Clue'] },
    state: { control: 'inline-radio', options: ['Default', 'Hover'] },
    trend: { control: 'inline-radio', options: ['Up', 'None', 'Down'] },
  },
  decorators: [
    (Story, ctx) => (
      <div
        style={{
          maxWidth: ctx.args.type === 'Clue' ? 374 : WIDTH[ctx.args.platform ?? 'Dashboard'],
          padding: 'var(--spacing-lg)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const DashboardDefault: Story = { args: { platform: 'Dashboard', type: 'Default' } };
export const DashboardDefaultHover: Story = { args: { platform: 'Dashboard', type: 'Default', state: 'Hover' } };
export const DashboardTrendDown: Story = { args: { platform: 'Dashboard', type: 'Default', trend: 'Down' } };
export const DashboardTrendNone: Story = { args: { platform: 'Dashboard', type: 'Default', trend: 'None' } };
export const MobileDefault: Story = { args: { platform: 'Mobile', type: 'Default' } };
export const MobileDefaultHover: Story = { args: { platform: 'Mobile', type: 'Default', state: 'Hover' } };
export const WebsiteDefault: Story = { args: { platform: 'Website', type: 'Default' } };
export const WebsiteDefaultHover: Story = { args: { platform: 'Website', type: 'Default', state: 'Hover' } };
export const DashboardClue: Story = { args: { platform: 'Dashboard', type: 'Clue' } };
export const DashboardClueHover: Story = { args: { platform: 'Dashboard', type: 'Clue', state: 'Hover' } };
