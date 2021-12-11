import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './Button'

export default {
    title: 'Atoms/Button',
    component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const button = Template.bind({})
button.args = {
    outlined: false,
    underlined: false,
    fullWidth: false,
    size: 'medium',
    label: 'Push me',
}
