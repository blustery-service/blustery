import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonContained: Story = {
  args: {
    variant: 'contained',
    children: 'contained',
  },
};
