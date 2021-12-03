import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TaskListHeader } from './Task-list-header'

export default {
    title: 'Atoms/Task List Header',
    component: TaskListHeader,
} as ComponentMeta<typeof TaskListHeader>

const Template: ComponentStory<typeof TaskListHeader> = args => {
    return (
        <TaskListHeader
            {...args}
            headingText="Small"
            subHeadingText="Less than a day"
        />
    )
}
export const taskListHeader = Template.bind({})
