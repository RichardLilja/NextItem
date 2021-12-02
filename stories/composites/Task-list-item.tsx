import React from 'react'
import './task-list-item.css';

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
            className="taskListItem"
            ref={provided.innerRef}
            {...props}
        >
            <Card>
                <>
                    <div className="taskListItem--textContainer">
                        {text}
                    </div>
                    <div className="taskListItem--buttonContainer">
                        <Button label="Mark as done" size="small" type="outlined"/>
                    </div>
                </>
            </Card>
        </li>
    )
}
