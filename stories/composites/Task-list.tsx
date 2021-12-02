import React from 'react'
import './task-list.css';

import { TaskListItem } from './Task-list-item';

import { DroppableProvided, Draggable } from 'react-beautiful-dnd'

interface TaskListProps {
    provided: DroppableProvided
    items: { id: string, text: string }[]
}

export const TaskList = ({
    provided,
    items = [],
    ...props
}: TaskListProps) => {
    const listItems = items.map((item, index) => {
        return (
            <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                    <TaskListItem
                        key={item.id}
                        text={item.text}
                        provided={provided}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    />
                )}
            </Draggable>
        )
    })

    return (
        <ul
            className="taskList"
            ref={provided.innerRef}
            {...props}
        >
            {listItems}
            {provided.placeholder}
        </ul>
    )
}
