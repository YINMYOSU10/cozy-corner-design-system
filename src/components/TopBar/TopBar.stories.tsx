/**
 * Figma node: https://www.figma.com/design/MWuaFZQ58G4WvtbCyeaE1X/cozy-corner.Global.Components.v1.0.0.In-Progress?node-id=576-22718
 * Component: Top Bar (576:22718), 1203x56. No variants, no states of its own.
 *
 * Matrix: Show search (2) x Show avatar (2) = 4 stories
 *   Show search  true | false  -> showSearch
 *   Show avatar  true | false  -> showAvatar
 * Composes Breadcrumb (Levels=2), Fields SearchInput (sm, Default), Avatar (32, Initials "SU").
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopBar } from './TopBar';

const meta = {
  title: 'Components/Top Bar',
  component: TopBar,
  parameters: { layout: 'fullscreen' },
  args: { showSearch: true, showAvatar: true },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Show search=true, Show avatar=true (default, 576:22718). */
export const Default: Story = {};
/** Show search=false, Show avatar=true. */
export const WithoutSearch: Story = { args: { showSearch: false } };
/** Show search=true, Show avatar=false. */
export const WithoutAvatar: Story = { args: { showAvatar: false } };
/** Show search=false, Show avatar=false: breadcrumb only. */
export const BreadcrumbOnly: Story = { args: { showSearch: false, showAvatar: false } };
