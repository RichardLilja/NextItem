import React, { useState } from 'react'
import styles from './Task-list.module.css'

import { Droppable } from 'react-beautiful-dnd'

import { Button } from '../atoms/Button'
import { TaskListItem } from './Task-list-item'
import { TaskListHeader } from '../atoms/Task-list-header'

import { ITask } from './Task-list-item'

interface TaskListProps {
    tasks: Array<ITask>
    heading: string
    subheading: string
    droppableId: string
    doneClickHandler: (id: string) => void
    createTaskClickHandler: (listId: string, taskId: string) => void
    cancelTaskClickHandler: (listId: string, taskId: string) => void
    addClickHandler: () => void
}

export const TaskList = ({
    tasks = [],
    heading,
    subheading,
    droppableId,
    doneClickHandler,
    createTaskClickHandler,
    cancelTaskClickHandler,
    addClickHandler,
}: TaskListProps) => {
    const [expanded, setExpanded] = useState(true)

    const scrollableViewStyles = [styles.scrollableView]
    if (expanded === false) {
        scrollableViewStyles.push(styles.scrollableViewCollapsed)
    }

    const toggleExpand = () => {
        setExpanded(!expanded)
    }

    const renderExpandButton = () => {
        const label = expanded === true ? 'Collapse' : 'Expand'

        return (
            <div className={styles.scrollableViewButtonContainer}>
                <Button
                    label={label}
                    outlined={true}
                    fullWidth={true}
                    onClick={toggleExpand}
                />
            </div>
        )
    }

    const renderListItems = () => {
        return tasks.map((task, index) => {
            return (
                <TaskListItem
                    task={task}
                    index={index}
                    key={`task-${task.id}`}
                    doneClickHandler={doneClickHandler}
                    createTaskClickHandler={createTaskClickHandler}
                    cancelTaskClickHandler={cancelTaskClickHandler}
                    taskListId={droppableId}
                />
            )
        })
    }

    const renderList = () => {
        return (
            <Droppable droppableId={droppableId}>
                {provided => (
                    <ul
                        className={styles.taskList}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {renderListItems()}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        )
    }

    return (
        <section className={styles.taskListSection}>
            <TaskListHeader heading={heading} subheading={subheading} addClickHandler={addClickHandler}/>

            <div className={scrollableViewStyles.join(' ')}>
                {renderExpandButton()}
                {renderList()}
            </div>
        </section>
    )
}

export default TaskList
