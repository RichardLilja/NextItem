import React from 'react'
import styles from './Task-list-item.module.css'

import { Draggable } from 'react-beautiful-dnd'

export interface ITask {
    id: string,
    text: string
}

interface TaskListItemProps {
    task: ITask
    index: number
}

export const TaskListItem = ({
    task,
    index,
}: TaskListItemProps) => {
    const { id, text } = task

    return (
        <Draggable draggableId={`drg-${id}`} index={index}>
            {provided => (
                <li className={styles.item}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {text}
                </li>
            )}
        </Draggable>
    )
}
