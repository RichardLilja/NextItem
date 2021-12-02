import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from './Card'

export default {
    title: 'Atoms/Card',
    component: Card,
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => {
    return (
        <Card {...args}>
            <div style={{minHeight: '10rem'}}>
            </div>
        </Card>
    )
}
export const card = Template.bind({})
