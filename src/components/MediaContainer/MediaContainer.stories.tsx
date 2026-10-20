/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=304-2006
 * Component set: Media Container (304:2006)
 *
 * Variant matrix: 12 variants
 *   Ratio / Type   5:3 (Landscape) · 1:1 (Square)    (2, paired in Figma)
 *   Device         Website · Mobile                  (2)
 *   State          Default · Hover · Focus           (3)
 * Frame sizes: 5:3 Website 380x225, 5:3 Mobile 315x185, 1:1 Website 280x280, 1:1 Mobile 264x264.
 *
 * One story per matrix row (Matrix/...), plus Playground and an Interactive demo.
 *
 * Design gaps (unbound in Figma, reported, not filled in):
 *   - Frame width/height (380/315/280/264 x 225/185/280/264): unbound, no size
 *     token; carried as SVG sizer geometry. The 5:3 frames are not exactly 5:3
 *     (380x225 = 1.69, 315x185 = 1.70).
 *   - Overlay gradient stop 0 (transparent): unbound; stop 1 is color/bg/overlay.
 *   - Overlay sits below "Slide Image" in the Figma layer order, so Figma's own
 *     render hides it; built above the image, as the visible Hover fill intends.
 *   - Default stroke colour differs by variant: 5:3 Website uses
 *     color/border/neutral/light, every other Default uses color/border/primary.
 *   - Focus is a borderWidth/1 stroke outside in color/border/neutral/light (all four
 *     Focus variants): a light, low-contrast focus indicator (no color/border/focus).
 *   - "Supporting Icons" instance (type=video) is hidden in all 12 variants and no
 *     component property exposes it, so it is not part of the API.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MediaContainer,
  type MediaContainerDevice,
  type MediaContainerRatio,
  type MediaContainerState,
} from './MediaContainer';

/** Placeholder media drawn with tokens only (stands in for the Figma image fill). */
function SampleMedia() {
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Sample landscape">
      <rect width="100" height="60" style={{ fill: 'var(--color-bg-neutral-light)' }} />
      <circle cx="74" cy="18" r="8" style={{ fill: 'var(--color-icon-brand)' }} />
      <path d="M0 60 L30 26 L52 48 L66 36 L100 60 Z" style={{ fill: 'var(--color-bg-neutral-idle)' }} />
      <path d="M0 60 L18 44 L40 60 Z" style={{ fill: 'var(--color-icon-secondary)' }} />
    </svg>
  );
}

const RATIOS: MediaContainerRatio[] = ['5:3', '1:1'];
const DEVICES: MediaContainerDevice[] = ['Website', 'Mobile'];
const STATES: MediaContainerState[] = ['Default', 'Hover', 'Focus'];

const meta = {
  title: 'Components/Media Container',
  component: MediaContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Holds an image or video at a fixed ratio. Two ratios (5:3 Landscape, 1:1 Square), two devices, three states.',
      },
    },
  },
  args: {
    ratio: '5:3',
    device: 'Website',
    state: 'Default',
    media: <SampleMedia />,
  },
  argTypes: {
    ratio: { control: 'inline-radio', options: RATIOS },
    device: { control: 'inline-radio', options: DEVICES },
    state: { control: 'inline-radio', options: STATES },
    type: { control: false },
    media: { control: false },
  },
} satisfies Meta<typeof MediaContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Try every property with the controls. In Default, hover and Tab-focus work for real. */
export const Playground: Story = {};

const row = (ratio: MediaContainerRatio, device: MediaContainerDevice, state: MediaContainerState): Story => ({
  name: `${ratio} ${ratio === '1:1' ? 'Square' : 'Landscape'} · ${device} · ${state}`,
  parameters: { controls: { disable: true } },
  args: { ratio, device, state },
});

export const Matrix53WebsiteDefault = row('5:3', 'Website', 'Default');
export const Matrix53WebsiteHover = row('5:3', 'Website', 'Hover');
export const Matrix53WebsiteFocus = row('5:3', 'Website', 'Focus');
export const Matrix53MobileDefault = row('5:3', 'Mobile', 'Default');
export const Matrix53MobileHover = row('5:3', 'Mobile', 'Hover');
export const Matrix53MobileFocus = row('5:3', 'Mobile', 'Focus');
export const Matrix11WebsiteDefault = row('1:1', 'Website', 'Default');
export const Matrix11WebsiteHover = row('1:1', 'Website', 'Hover');
export const Matrix11WebsiteFocus = row('1:1', 'Website', 'Focus');
export const Matrix11MobileDefault = row('1:1', 'Mobile', 'Default');
export const Matrix11MobileHover = row('1:1', 'Mobile', 'Hover');
export const Matrix11MobileFocus = row('1:1', 'Mobile', 'Focus');

/** Real behaviour: hover shows the overlay, Tab moves the outside stroke between containers. */
export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-lg)', alignItems: 'flex-start' }}>
      <MediaContainer ratio="5:3" device="Website" media={<SampleMedia />} />
      <MediaContainer ratio="1:1" device="Mobile" media={<SampleMedia />} />
    </div>
  ),
};
