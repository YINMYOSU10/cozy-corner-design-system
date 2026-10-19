/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=299-317
 * Component set: Toggle (299:317)
 *
 * Variant matrix: 6 variants
 *   State     Default · Focus · Disabled   (3)
 *   Checked?  True · False                 (2)
 *
 * One story per matrix row, plus "All variants" (the Figma frame) and
 * "Interactive" (click, Space or Enter to flip it).
 */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle, type ToggleState } from './Toggle';

const STATES: ToggleState[] = ['Default', 'Focus', 'Disabled'];

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Toggle. Turns a setting on or off. Supports Default, Focus and Disabled states, checked or unchecked.',
      },
    },
  },
  args: {
    state: 'Default',
    checked: false,
    'aria-label': 'Toggle setting',
  },
  argTypes: {
    state: { control: 'inline-radio', options: STATES },
    checked: { control: 'boolean' },
    defaultChecked: { control: false },
    onCheckedChange: { action: 'checkedChange' },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultUnchecked: Story = {
  name: 'State=Default, Checked?=False',
  args: { state: 'Default', checked: false },
};
export const FocusUnchecked: Story = {
  name: 'State=Focus, Checked?=False',
  args: { state: 'Focus', checked: false },
};
export const DisabledUnchecked: Story = {
  name: 'State=Disabled, Checked?=False',
  args: { state: 'Disabled', checked: false },
};
export const DefaultChecked: Story = {
  name: 'State=Default, Checked?=True',
  args: { state: 'Default', checked: true },
};
export const FocusChecked: Story = {
  name: 'State=Focus, Checked?=True',
  args: { state: 'Focus', checked: true },
};
export const DisabledChecked: Story = {
  name: 'State=Disabled, Checked?=True',
  args: { state: 'Disabled', checked: true },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 'var(--spacing-6xl)' }}>
      {[false, true].map((checked) =>
        STATES.map((state) => (
          <Toggle
            key={`${state}-${checked}`}
            state={state}
            checked={checked}
            aria-label={`State=${state}, Checked?=${checked ? 'True' : 'False'}`}
          />
        )),
      )}
    </div>
  ),
};

function InteractiveDemo() {
  const [on, setOn] = useState(false);
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
      <Toggle checked={on} onCheckedChange={setOn} aria-label="Notifications" />
      <span>Notifications: {on ? 'On' : 'Off'}</span>
    </label>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
};
