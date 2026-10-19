/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=391-37
 * Component set: Chip (391:37)
 *
 * Variant matrix: Selected (True, False) x State (Default, Hover, Focused, Disabled) = 8 rows,
 * one story each, plus behaviour stories (not in Figma).
 *   Label     text property, default "Chip"          -> label
 *   Selected  True | False                           -> selected (boolean)
 *   State     Default | Hover | Focused | Disabled   -> state
 *
 * Token bindings (read from Figma variables):
 *   padding-inline spacing/lg · radius borderRadius/circle · gap 0
 *   Selected=True : fill bg/primary/idle | hovered | focused | bg/disabled ; text text/inverse | text/disabled
 *   Selected=False: fill bg/primary/light | lightHovered | lightFocused | bg/disabled ; text text/primary | text/disabled
 *   Focused effects: 2px color/bg/base ring, then color/border/focus ring (spread 4)
 *   Label: typography/label (family, size, weight, line height, letter spacing all bound)
 *
 * Design gaps (reported, not filled in):
 *   - Height 40: unbound; carried as SVG geometry.
 *   - Component set has an unbound 1px stroke (purple, Figma's default set frame); not part of the chip.
 */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Chip } from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A selectable pill. A real toggle button: Tab to focus, Space or Enter to toggle. State pins Hover/Focused for docs; Disabled is a real disabled button.',
      },
    },
  },
  args: { label: 'Chip', selected: true, state: 'Default' },
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean' },
    state: { control: 'inline-radio', options: ['Default', 'Hover', 'Focused', 'Disabled'] },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectedDefault: Story = { name: 'Selected=True, State=Default', args: { selected: true, state: 'Default' } };
export const SelectedHover: Story = { name: 'Selected=True, State=Hover', args: { selected: true, state: 'Hover' } };
export const SelectedFocused: Story = { name: 'Selected=True, State=Focused', args: { selected: true, state: 'Focused' } };
export const SelectedDisabled: Story = { name: 'Selected=True, State=Disabled', args: { selected: true, state: 'Disabled' } };
export const UnselectedDefault: Story = { name: 'Selected=False, State=Default', args: { selected: false, state: 'Default' } };
export const UnselectedHover: Story = { name: 'Selected=False, State=Hover', args: { selected: false, state: 'Hover' } };
export const UnselectedFocused: Story = { name: 'Selected=False, State=Focused', args: { selected: false, state: 'Focused' } };
export const UnselectedDisabled: Story = { name: 'Selected=False, State=Disabled', args: { selected: false, state: 'Disabled' } };

export const DisabledDoesNothing: Story = {
  name: 'Disabled ignores clicks',
  args: { state: 'Disabled', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const btn = within(canvasElement).getByRole('button', { name: 'Chip' });
    await expect(btn).toBeDisabled();
    await userEvent.click(btn);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Toggleable: Story = {
  name: 'Toggles by click and keyboard',
  render: (args) => {
    const [on, setOn] = useState(false);
    return <Chip {...args} selected={on} onClick={() => setOn(!on)} />;
  },
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole('button', { name: 'Chip' });
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(btn);
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    await userEvent.keyboard(' ');
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
    await userEvent.keyboard('{Enter}');
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
  },
};

export const ChipGroup: Story = {
  name: 'Group (multi-select)',
  render: (args) => {
    const [picked, setPicked] = useState<string[]>(['Warm']);
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
        {['Warm', 'Handmade', 'Cozy'].map((t) => (
          <Chip
            key={t}
            {...args}
            label={t}
            selected={picked.includes(t)}
            onClick={() => setPicked(picked.includes(t) ? picked.filter((x) => x !== t) : [...picked, t])}
          />
        ))}
      </div>
    );
  },
};
