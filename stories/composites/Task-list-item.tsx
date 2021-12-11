import React, { useLayoutEffect, useState } from 'react'
import styles from './Task-list-item.module.css'

import { useQuery } from 'react-query'
import axios from 'axios'

import { Draggable } from 'react-beautiful-dnd'

import { Button } from '../atoms/Button'

export interface ITask {
    id: string
    text: string
}

interface TaskListItemProps {
    task: ITask
    index: number
    doneClickHandler: (id: string) => void
}

export const TaskListItem = ({
    task,
    index,
    doneClickHandler,
}: TaskListItemProps) => {
    const { id, text } = task

    const [width, setWidth] = useState(window.innerWidth)

    const updateWidth = () => {
        setWidth(window.innerWidth)
    }

    useLayoutEffect(() => {
        window.addEventListener('resize', updateWidth)
        updateWidth()
        return () => window.removeEventListener('resize', updateWidth)
    }, [])

    const renderButton = () => {
        const rem = 16

        let size: 'small' | 'medium' = 'medium'

        if (width > 81 * rem) {
            size = 'small'
        }

        return (
            <Button
                label="Mark as done"
                size={size}
                outlined={true}
                onClick={() => {
                    doneClickHandler(id)
                }}
            />
        )
    }

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
                        {renderButton()}
                    </div>
                </li>
            )}
        </Draggable>
    )
}
