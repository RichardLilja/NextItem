import React, { ChangeEvent, TextareaHTMLAttributes, useLayoutEffect, useState } from 'react'
import styles from './Task-list-item.module.css'

import { useQuery } from 'react-query'
import axios from 'axios'

import { Draggable, DraggableProvided } from 'react-beautiful-dnd'

import { Button } from '../atoms/Button'
import { taskList } from './Task-list.stories'

export interface ITask {
    id: string
    text: string
    editable?: boolean
}

interface TaskListItemProps {
    task: ITask
    index: number
    doneClickHandler: (id: string) => void
    createTaskClickHandler: (listId: string, taskId: string) => void
    cancelTaskClickHandler: (listId: string, taskId: string) => void
    taskListId: string
}

export const TaskListItem = ({
    task,
    index,
    doneClickHandler,
    createTaskClickHandler,
    cancelTaskClickHandler,
    taskListId
}: TaskListItemProps) => {
    const { id, text, editable } = task

    const [width, setWidth] = useState(window.innerWidth)

    const [inputText, setInputText] = useState(task.text)

    const updateWidth = () => {
        setWidth(window.innerWidth)
    }

    useLayoutEffect(() => {
        window.addEventListener('resize', updateWidth)
        updateWidth()
        return () => window.removeEventListener('resize', updateWidth)
    }, [])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value)
        task.text = event.target.value
    }

    const renderCreateButton = (label: string, handler: (listId: string, taskId: string) => void) => {
        const rem = 16

        let size: 'small' | 'medium' = 'medium'

        if (width > 81 * rem) {
            size = 'small'
        }

        return (
            <Button
                label={label}
                size={size}
                outlined={true}
                onClick={() => {
                    handler(taskListId, id)
                }}
            />
        )
    }

    const renderCancelButton = (label: string, handler: (listId: string, taskId: string) => void) => {
        const rem = 16

        let size: 'small' | 'medium' = 'medium'

        if (width > 81 * rem) {
            size = 'small'
        }

        return (
            <Button
                label={label}
                size={size}
                outlined={true}
                onClick={() => {
                    handler(taskListId, id)
                }}
            />
        )
    }

    const renderDoneButton = (label: string, handler: (id: string) => void) => {
        const rem = 16

        let size: 'small' | 'medium' = 'medium'

        if (width > 81 * rem) {
            size = 'small'
        }

        return (
            <Button
                label={label}
                size={size}
                outlined={true}
                onClick={() => {
                    handler(id)
                }}
            />
        )
    }

    const renderEditableItem = (provided: DraggableProvided) => {
        return (
            <li
                className={styles.item}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <div className={styles.textInputContainer}>
                    <textarea
                        name={`textarea-${task.id}`}
                        className={styles.textInput}
                        value={inputText}
                        onChange={handleChange}
                    >
                    </textarea>
                    <div className={styles.textInputGrow}>{`${inputText}\n`}</div>
                </div>
                <div className={styles.buttonContainer}>
                    {renderCancelButton('Cancel', cancelTaskClickHandler)}
                    {renderCreateButton('Create task', createTaskClickHandler)}
                </div>
            </li>
        )
    }

    const renderItem = (provided: DraggableProvided) => {
        return (
            <li
                className={styles.item}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <div className={styles.textContainer}>{text}</div>
                <div className={styles.buttonContainer}>
                    {renderDoneButton('Mark as done', doneClickHandler)}
                </div>
            </li>
        )
    }

    return (
        <Draggable draggableId={`drg-${id}`} index={index}>
            {(provided) => (
                <>
                    {editable ? renderEditableItem(provided) : renderItem(provided)}
                </>
            )}
        </Draggable>
    )
}
