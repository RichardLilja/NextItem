import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button'

export default {
    title: 'Atoms/Button',
    component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Solid = Template.bind({})
Solid.args = {
    type: 'solid',
    width: 'auto',
    size: 'medium',
    label: 'button',
    underlined: false,
}

export const Outlined = Template.bind({})
Outlined.args = {
    type: 'outlined',
    width: 'auto',
    size: 'medium',
    label: 'button',
    underlined: false,
}
