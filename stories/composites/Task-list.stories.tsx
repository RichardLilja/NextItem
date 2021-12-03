import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { TaskList } from './Task-list'

export default {
    title: 'Composites/Task List',
    component: TaskList,
} as ComponentMeta<typeof TaskList>

const Template: ComponentStory<typeof TaskList> = args => {
    let data = [
        {
            id: '57324095',
            text: 'Här står det en enkelt beskrivning av vad som behöver göras.',
        },
        {
            id: '47829304',
            text: 'I framtiden kan dessa kort uppdateras med meta-info.',
        },
    ]

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return
        const items = Array.from(data)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        data = items
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="taskList">
                {provided => (
                    <TaskList {...args} provided={provided} items={data} />
                )}
            </Droppable>
        </DragDropContext>
    )
}

export const taskList = Template.bind({})
