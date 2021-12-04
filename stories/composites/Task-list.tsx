import React from 'react'
import styles from './Task-list.module.css'

import { DroppableProvided, Draggable } from 'react-beautiful-dnd'

import { Button } from '../atoms/Button'
import { TaskListItem } from './Task-list-item'
import { TaskListHeader } from '../atoms/Task-list-header'

interface TaskListProps {
    provided: DroppableProvided
    items: { id: string; text: string }[]
    headingText: string
    subHeadingText: string
}

export const TaskList = ({
    provided,
    items = [],
    headingText,
    subHeadingText,
    ...props
}: TaskListProps) => {
    const listItems = items.map((item, index) => {
        return (
            <Draggable key={item.id} draggableId={item.id} index={index}>
                {provided => (
                    <TaskListItem
                        key={item.id}
                        text={item.text}
                        innerRef={provided.innerRef}
                        provided={provided}
                    />
                )}
            </Draggable>
        )
    })

    return (
        <section className={styles.taskListContainer}>
            <div className={styles.headerContainer}>
                <TaskListHeader
                    headingText={headingText}
                    subHeadingText={subHeadingText}
                />
                <div className={styles.buttonContainer}>
                    <Button label="+ Add task" underlined={true} />
                </div>
            </div>
            <div className={styles.scrollable}>
                <ul
                    className={styles.taskList}
                    ref={provided.innerRef}
                    {...props}
                >
                    {listItems}
                    {provided.placeholder}
                </ul>
            </div>
        </section>
    )
}

export default TaskList
