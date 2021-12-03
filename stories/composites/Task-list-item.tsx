import React from 'react'
import styles from './Task-list-item.module.css'

import { DraggableProvided } from 'react-beautiful-dnd'

import { Card } from '../atoms/Card'
import { Button } from '../atoms/Button'

interface TaskListItemProps {
    text?: string
    provided: DraggableProvided
}

export const TaskListItem = ({
    text,
    provided,
    ...props
}: TaskListItemProps) => {
    return (
        <li
            className={styles.taskListItem}
            ref={provided.innerRef}
            {...props}
        >
            <Card>
                <>
                    <div className={styles.textContainer}>
                        {text}
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button label="Mark as done" size="small" type="outlined"/>
                    </div>
                </>
            </Card>
        </li>
    )
}
