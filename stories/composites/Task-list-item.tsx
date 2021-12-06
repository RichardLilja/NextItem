import React from 'react'
import styles from './Task-list-item.module.css'

import { Draggable } from 'react-beautiful-dnd'

import { Button } from '../atoms/Button'

export interface ITask {
    id: string
    text: string
}

interface TaskListItemProps {
    task: ITask
    index: number
}

export const TaskListItem = ({ task, index }: TaskListItemProps) => {
    const { id, text } = task

    return (
        <Draggable draggableId={`drg-${id}`} index={index}>
            {provided => (
                <li
                    className={styles.item}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className={styles.textContainer}>{text}</div>
                    <div className={styles.buttonContainer}>
                        <Button
                            label="Mark as done"
                            size="small"
                            outlined={true}
                        />
                    </div>
                </li>
            )}
        </Draggable>
    )
}
