import React from 'react'
import './task-list.css'

import { DroppableProvided, Draggable } from 'react-beautiful-dnd'

import { Button } from '../atoms/Button'
import { TaskListItem } from './Task-list-item'
import { TaskListHeader } from '../atoms/Task-list-header'

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
        <section className="taskList--container">
            <div className="taskList--headerContainer">
                <TaskListHeader headingText="Small" subHeadingText="Less than a day"/>
                <div className="taskList--buttonContainer">
                    <Button label="+ Add task" underlined={true}/>
                </div>
            </div>
            <ul
                className="taskList"
                ref={provided.innerRef}
                {...props}
            >
                {listItems}
                {provided.placeholder}
            </ul>
        </section>
    )
}
