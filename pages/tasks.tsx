import type { NextPage } from 'next'

import React from 'react'
import { useState, useEffect } from 'react'

import { useQuery } from 'react-query'
import axios from 'axios'

import styles from '../styles/TasksPage.module.css'

import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { PageFooter } from '../stories/composites/Page-footer'
import TaskList from '../stories/composites/Task-list'

import { ITask } from '../stories/composites/Task-list-item'

export interface ITasks {
    [key: string]: Array<ITask>
}

const TasksPage: NextPage = () => {
    const [ready, setReady] = useState<boolean>(false)
    const [tasks, setTasks] = useState<ITasks | null>(null)

    useEffect(() => {
        setReady(true)
    }, [])

    useQuery('tasks', async () => {
        const { data } = await axios.get('http://192.168.0.2:3033/tasks')
        setTasks(data)
    })

    const putTasks = async (newTasks: ITasks) => {
        setTasks(newTasks)
        const { data } = await axios.put(
            'http://192.168.0.2:3033/tasks',
            newTasks
        )
        setTasks(data)
    }

    const onDragEndHandler = (result: DropResult) => {
        if (result.destination === null || tasks === null) return

        const taskObject = Object.assign({}, tasks)

        const sourceId = result.source.droppableId
        const sourceIndex = result.source.index

        const destinationId = result.destination?.droppableId
        const destinationIndex = result.destination?.index

        if (!tasks[sourceId]) return

        const sourceItems = Array.from(tasks[sourceId])
        const [item] = sourceItems.splice(sourceIndex, 1)

        const sameList = sourceId === destinationId ? true : false

        if (sameList && destinationIndex !== undefined) {
            sourceItems.splice(destinationIndex, 0, item)
            taskObject[sourceId] = sourceItems
        } else if (destinationId && destinationIndex !== undefined) {
            const destinationItems = Array.from(tasks[destinationId])
            destinationItems.splice(destinationIndex, 0, item)
            taskObject[sourceId] = sourceItems
            taskObject[destinationId] = destinationItems
        }

        putTasks(taskObject)
    }

    const doneClickHandler = async (id: string) => {
        const { data } = await axios.delete(
            `http://192.168.0.2:3033/tasks/${id}`
        )
        setTasks(data)
    }

    const renderLists = () => {
        if (tasks === null) return

        return (
            <>
                <TaskList
                    tasks={tasks.small}
                    heading="Small"
                    subheading="Less than a day"
                    droppableId="small"
                    doneClickHandler={doneClickHandler}
                />
                <TaskList
                    tasks={tasks.medium}
                    heading="Medium"
                    subheading="1 - 2 days"
                    droppableId="medium"
                    doneClickHandler={doneClickHandler}
                />
                <TaskList
                    tasks={tasks.large}
                    heading="Large"
                    subheading="3 - 5 days"
                    droppableId="large"
                    doneClickHandler={doneClickHandler}
                />
                <TaskList
                    tasks={tasks.extraLarge}
                    heading="Extra large"
                    subheading="More than 5 days"
                    droppableId="extraLarge"
                    doneClickHandler={doneClickHandler}
                />
            </>
        )
    }

    const renderLoading = () => {
        return <div>Loading</div>
    }

    return (
        <DragDropContext onDragEnd={onDragEndHandler}>
            <div className={styles.pageLayout}>
                <main className={styles.pageMain}>
                    <div className={styles.mainInnerContainer}>
                        {ready === true ? renderLists() : renderLoading()}
                    </div>
                </main>
                <PageFooter />
            </div>
        </DragDropContext>
    )
}

export default TasksPage
