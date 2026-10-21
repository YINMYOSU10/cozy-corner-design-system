/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=173-4829
 * Component set: Progress Loading / Website (173:4829). Property: Step 1 · 2 · 3 · 4 · 5 (5 variants).
 *
 * Token bindings:
 *   ring (Steps 1-4)   color/bg/primary/idle  -> --color-bg-primary-idle
 *   ring (Step 5)      color/bg/positive/idle -> --color-bg-positive-idle
 *   half-ring cover    color/bg/base          -> --color-bg-base
 *   check stroke       color/icon/positive    -> --color-icon-positive
 *
 * Composes: Icon (Icon/Check glyph, Step 5).
 * Design gaps: 350 frame, ring geometry and Check size (221) are unbound; Smart Animate
 * transitions between steps are prototype-only and not reproduced.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressLoadingWebsite } from './ProgressLoadingWebsite';

const meta = {
  title: 'Components/ProgressLoadingWebsite',
  component: ProgressLoadingWebsite,
  parameters: { layout: 'centered' },
  argTypes: {
    step: { control: 'inline-radio', options: [1, 2, 3, 4, 5], description: 'Figma property `Step`' },
  },
  args: { step: 1 },
} satisfies Meta<typeof ProgressLoadingWebsite>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Step=1 (173:4827) */
export const Step1: Story = { name: 'Step=1', args: { step: 1 } };
/** Step=2 (173:4825) */
export const Step2: Story = { name: 'Step=2', args: { step: 2 } };
/** Step=3 (173:4823) */
export const Step3: Story = { name: 'Step=3', args: { step: 3 } };
/** Step=4 (173:4821) */
export const Step4: Story = { name: 'Step=4', args: { step: 4 } };
/** Step=5 (173:4819) */
export const Step5: Story = { name: 'Step=5', args: { step: 5 } };

/** The loading ring centred on a page-sized screen with a short label. */
export const OnAScreen: Story = {
  name: 'On A Screen',
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        inlineSize: 960,
        blockSize: 600,
        background: 'var(--color-bg-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--spacing-xl)',
      }}
    >
      <ProgressLoadingWebsite step={3} />
      <span style={{ font: 'var(--cozy-corner-typography-label-large)', color: 'var(--color-text-primary)' }}>Finding your book</span>
    </div>
  ),
};
