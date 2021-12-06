import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { TaskListItem } from './Task-list-item'

export default {
    title: 'Composites/Task List Item',
    component: TaskListItem,
} as ComponentMeta<typeof TaskListItem>

const Template: ComponentStory<typeof TaskListItem> = () => {
    return (
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="droppableListID">
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <TaskListItem task={{ id: '0', text: 'lol'}} index={0}/>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export const taskListItem = Template.bind({})
