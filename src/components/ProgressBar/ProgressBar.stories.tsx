/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=416-46
 * Component set: Progress Bar (416:46). Sub-component set: Progress Bar/item/segment (416:5).
 *
 * Variant matrix: Step 1 · 2 · 3 · 4 · 5 (5), plus Show label on/off, plus segment Filled True/False.
 *
 * Token bindings:
 *   label colour    color/twoTone/gold/foreground -> --color-twotone-gold-foreground
 *   label type      typography/bodySmall/*        -> --typography-bodysmall-*
 *   label/track gap spacing/sm (8) / spacing/base (4)
 *   segment filled  color/bg/primary/idle  · unfilled color/bg/primary/light
 *   segment radius  borderRadius/circle
 *
 * Design gap: segment height (4) is unbound in Figma, so `segmentHeight` is a prop;
 * stories pass it explicitly.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';
import { ProgressBarSegment } from './ProgressBarSegment';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'padded' },
  argTypes: {
    step: { control: 'inline-radio', options: [1, 2, 3, 4, 5], description: 'Figma property `Step`' },
    label: { control: 'text', description: 'Figma property `Label`' },
    showLabel: { control: 'boolean', description: 'Figma property `Show label`' },
    segmentHeight: { control: 'text', description: 'CSS length; unbound in Figma (design gap)' },
  },
  args: { step: 1, label: 'Step 1 of 5', showLabel: true, segmentHeight: '4px' },
  decorators: [(Story) => <div style={{ maxInlineSize: '390px' }}><Story /></div>],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Step=1 (416:6) */
export const Step1: Story = { name: 'Step=1', args: { step: 1 } };
/** Step=2 (416:14) */
export const Step2: Story = { name: 'Step=2', args: { step: 2, label: 'Step 2 of 5' } };
/** Step=3 (416:22) */
export const Step3: Story = { name: 'Step=3', args: { step: 3, label: 'Step 3 of 5' } };
/** Step=4 (416:30) */
export const Step4: Story = { name: 'Step=4', args: { step: 4, label: 'Step 4 of 5' } };
/** Step=5 (416:38) */
export const Step5: Story = { name: 'Step=5', args: { step: 5, label: 'Step 5 of 5' } };
/** Show label=false */
export const LabelHidden: Story = { name: 'Show label=false', args: { step: 3, showLabel: false, label: 'Step 3 of 5' } };

/** Sub-component: Filled=True (416:3) */
export const SegmentFilled: StoryObj = {
  name: 'Segment Filled=True',
  render: () => <div style={{ inlineSize: '40px', ['--cc-progress-bar-segment-height' as string]: '4px' }}><ProgressBarSegment filled /></div>,
};
/** Sub-component: Filled=False (416:4) */
export const SegmentUnfilled: StoryObj = {
  name: 'Segment Filled=False',
  render: () => <div style={{ inlineSize: '40px', ['--cc-progress-bar-segment-height' as string]: '4px' }}><ProgressBarSegment filled={false} /></div>,
};
