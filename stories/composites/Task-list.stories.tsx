import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DragDropContext } from 'react-beautiful-dnd'

import { TaskList } from './Task-list'

export default {
    title: 'Composites/Task List',
    component: TaskList,
} as ComponentMeta<typeof TaskList>

const Template: ComponentStory<typeof TaskList> = args => {
    return (
        <DragDropContext onDragEnd={() => {}}>
            <TaskList 
                tasks={[]} 
                heading="Small" 
                subheading="Less than a day"
                droppableId="drp-small"
            />
        </DragDropContext>
    )
}

export const taskList = Template.bind({})
