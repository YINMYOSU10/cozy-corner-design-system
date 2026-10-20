/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=212-690
 * Component set: Loading Animation (212:690). Variants Step=1..7 (212:689, 688, 687, 685, 686, 684, 683), each 48x48.
 *
 * Decision: the steps are frames of one animation (three dots; the raised dot is dot 1 in
 * steps 1-3, dot 2 in steps 4-5, dot 3 in steps 6-7). `step` is the Figma prop; `autoPlay`
 * cycles the frames with CSS and is switched off under prefers-reduced-motion.
 *
 * Token bindings:
 *   raised dot fill   color/bg/inverse          -> --color-bg-inverse
 *   resting dot fill  color/bg/surfaceSecondary -> --color-bg-surfacesecondary
 *
 * Design gaps (unbound in Figma): dot size 8, dot gap 4, canvas 48, lift 10, step timing.
 * Size/gap/canvas coincide with spacing tokens; lift and step duration have none, so they are props.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './Loading';

const meta = {
  title: 'Components/Loading',
  component: Loading,
  parameters: { layout: 'padded' },
  argTypes: {
    step: { control: 'inline-radio', options: [1, 2, 3, 4, 5, 6, 7], description: 'Figma property `Step`' },
    autoPlay: { control: 'boolean' },
    stepDuration: { control: 'text', description: 'CSS time; no motion token exists (design gap)' },
    lift: { control: 'text', description: 'CSS length; unbound in Figma (design gap)' },
  },
  args: { step: 1, lift: '10px', stepDuration: '150ms', autoPlay: false },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Step=1 (212:689) */
export const Step1: Story = { name: 'Step=1', args: { step: 1 } };
/** Step=2 (212:688) */
export const Step2: Story = { name: 'Step=2', args: { step: 2 } };
/** Step=3 (212:687) */
export const Step3: Story = { name: 'Step=3', args: { step: 3 } };
/** Step=4 (212:685) */
export const Step4: Story = { name: 'Step=4', args: { step: 4 } };
/** Step=5 (212:686) */
export const Step5: Story = { name: 'Step=5', args: { step: 5 } };
/** Step=6 (212:684) */
export const Step6: Story = { name: 'Step=6', args: { step: 6 } };
/** Step=7 (212:683) */
export const Step7: Story = { name: 'Step=7', args: { step: 7 } };
/** Auto-play cycles Step 1-7 (stills under prefers-reduced-motion). */
export const AutoPlay: Story = { name: 'Auto-play', args: { autoPlay: true } };
