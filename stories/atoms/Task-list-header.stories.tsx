import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TaskListHeader } from './Task-list-header'

export default {
    title: 'Atoms/Task List Header',
    component: TaskListHeader,
} as ComponentMeta<typeof TaskListHeader>

const Template: ComponentStory<typeof TaskListHeader> = args => (
    <TaskListHeader {...args} />
)

export const taskListHeader = Template.bind({})
taskListHeader.args = {
    heading: 'Heading',
    subheading: 'Subheading',
}
