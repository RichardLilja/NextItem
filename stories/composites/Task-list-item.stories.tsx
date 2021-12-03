import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { TaskListItem } from './Task-list-item'

export default {
    title: 'Composites/Task List Item',
    component: TaskListItem,
} as ComponentMeta<typeof TaskListItem>

const Template: ComponentStory<typeof TaskListItem> = args => {
    const text =
        'Här står det en enkelt beskrivning av vad som behöver göras. I framtiden kan dessa kort uppdateras med meta-info.'

    return (
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="taskList">
                {provided => (
                    <div ref={provided.innerRef}>
                        <Draggable
                            key="item.id"
                            draggableId="item.id"
                            index={0}
                        >
                            {provided => (
                                <TaskListItem
                                    key="item.id"
                                    text={text}
                                    provided={provided}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                />
                            )}
                        </Draggable>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export const taskListItem = Template.bind({})
