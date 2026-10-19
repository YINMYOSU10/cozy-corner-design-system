/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=448-13
 * Component set: Tag (448:13)
 *
 * Variant matrix: 2 sizes x showRemove (2) = 4 rows, one story each, plus
 * behaviour stories for the remove button (not in Figma).
 *   size        Small (448:5) · Medium (448:9)   variant
 *   showRemove  false · true                      boolean
 *   label       text property, default "cozy"
 * Tag has no hover, pressed, loading or error state in Figma. The remove
 * button adds real keyboard behaviour, a visible focus ring and a disabled state.
 *
 * Token bindings (Figma variables):
 *   fill color/bg/gray/light · radius borderRadius/circle · gap spacing/base
 *   label color color/text/gray/default · fontFamily/inter · fontWeight/semibold
 *   Small: padding spacing/sm, fontSize/12, lineHeight/16 (style Body small semibold)
 *   Medium: padding spacing/md, height spacing/3xl, fontSize/14, lineHeight/20
 *
 * Design gaps (reported, not filled in):
 *   - Small height 24: unbound (spacing/xxl exists but is not bound); carried as SVG geometry.
 *   - Small label letter-spacing 0.32px: raw value, no token. Not applied.
 *   - Remove icon box 12 / 16 and its colour: unbound/unreadable in the hidden
 *     instance (448:7, 448:11 -> Icon/X 195:268, main vector black, unbound).
 *     Exported SVG renders #364153 = color/icon/gray; used, binding unconfirmed.
 *   - Remove button hover / pressed / focus / disabled: not designed. Focus uses
 *     color/border-focus + borderWidth/2 and disabled uses color/icon-disabled (repo convention).
 */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A neutral label that describes or groups an item. Supports Small and Medium sizes with an optional remove icon.',
      },
    },
  },
  args: { size: 'Small', label: 'cozy', showRemove: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['Small', 'Medium'] },
    label: { control: 'text' },
    showRemove: { control: 'boolean' },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallDefault: Story = { name: 'Size=Small, showRemove=false', args: { size: 'Small' } };
export const SmallRemove: Story = { name: 'Size=Small, showRemove=true', args: { size: 'Small', showRemove: true } };
export const MediumDefault: Story = { name: 'Size=Medium, showRemove=false', args: { size: 'Medium' } };
export const MediumRemove: Story = { name: 'Size=Medium, showRemove=true', args: { size: 'Medium', showRemove: true } };

export const RemoveDisabled: Story = {
  name: 'Remove button disabled',
  args: { showRemove: true, removeDisabled: true, onRemove: fn() },
  play: async ({ canvasElement, args }) => {
    const btn = within(canvasElement).getByRole('button', { name: 'Remove cozy' });
    await expect(btn).toBeDisabled();
    await userEvent.click(btn);
    await expect(args.onRemove).not.toHaveBeenCalled();
  },
};

export const RemoveKeyboard: Story = {
  name: 'Remove via keyboard',
  args: { showRemove: true, size: 'Medium', onRemove: fn() },
  play: async ({ canvasElement, args }) => {
    await userEvent.tab();
    const btn = within(canvasElement).getByRole('button', { name: 'Remove cozy' });
    await expect(btn).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onRemove).toHaveBeenCalledTimes(2);
  },
};

export const RemovableList: Story = {
  name: 'Removable list',
  render: (args) => {
    const [tags, setTags] = useState(['cozy', 'warm', 'handmade']);
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
        {tags.map((t) => (
          <Tag key={t} {...args} label={t} showRemove onRemove={() => setTags(tags.filter((x) => x !== t))} />
        ))}
      </div>
    );
  },
};
