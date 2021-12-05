import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import styles from '../styles/TaskListsPage.module.css'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { useQuery } from 'react-query';
import axios from 'axios'

import { PageFooter } from '../stories/composites/Page-footer'
const TaskList = dynamic(() => import('../stories/composites/Task-list'))

export interface ITasks {
    [key : string]: Array<{ id: string, text: string}>
}

const TaskListsPage: NextPage = () => {

    const [winReady, setwinReady] = useState(false)
    const [tasks, setTasks] = useState<ITasks | null>(null)

    useEffect(() => {
        setwinReady(true)
    }, [])

    useQuery('tasks', async () => {
        const { data } = await axios.get('http://localhost:3033/tasks')
        setTasks(data.tasks)
    })

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return
        if (tasks === null) return

        const srcDroppableId = String(result.source.droppableId)
        const destDroppableId = String(result.destination.droppableId)
        const isSameList = srcDroppableId === destDroppableId ? true : false

        const resSrcIndex = result.source.index
        const resDestIndex = result.destination.index

        const srcItems = Array.from(tasks[srcDroppableId])
        const [reorderedItem] = srcItems.splice(resSrcIndex, 1)
        const newTaskObject = Object.assign({}, tasks)

        if (isSameList && tasks != null) {
            srcItems.splice(resDestIndex, 0, reorderedItem)
            newTaskObject[srcDroppableId] = srcItems

        } else {
            const destItems = Array.from(tasks[destDroppableId])
            destItems.splice(resDestIndex, 0, reorderedItem)
            newTaskObject[srcDroppableId] = srcItems
            newTaskObject[destDroppableId] = destItems
        }

        setTasks(newTaskObject)

        // if (result.source.droppableId !== result.destination.droppableId) {
        //     const sourceDroppableId = result.source.droppableId
        //     const sourceItems = Array.from(data[sourceDroppableId])
        //     const [reorderedItem] = sourceItems.splice(result.source.index, 1)

        //     const destinationDroppableId = result.destination.droppableId
        //     const destinationItems = data[destinationDroppableId]
        //     destinationItems.splice(result.destination.index, 0, reorderedItem)

        //     data[sourceDroppableId] = sourceItems
        //     data[destinationDroppableId] = destinationItems
        // } else {
        //     const sourceDroppableId = result.source.droppableId
        //     const items = Array.from(data[sourceDroppableId])
        //     const [reorderedItem] = items.splice(result.source.index, 1)

        //     items.splice(result.destination.index, 0, reorderedItem)
        //     data[sourceDroppableId] = items
        // }
    }

    function lists() {
        if (winReady && tasks !== null) {
            return (
                <>
                    <Droppable droppableId="small">
                        {provided => (
                            <TaskList
                                provided={provided}
                                items={tasks.small}
                                headingText="Small"
                                subHeadingText="Less than a day"
                            />
                        )}
                    </Droppable>

                    <Droppable droppableId="medium">
                        {provided => (
                            <TaskList
                                provided={provided}
                                items={tasks.medium}
                                headingText="Medium"
                                subHeadingText="1 - 2 days"
                            />
                        )}
                    </Droppable>

                    <Droppable droppableId="large">
                        {provided => (
                            <TaskList
                                provided={provided}
                                items={tasks.large}
                                headingText="Large"
                                subHeadingText="3 - 5 days"
                            />
                        )}
                    </Droppable>

                    <Droppable droppableId="extraLarge">
                        {provided => (
                            <TaskList
                                provided={provided}
                                items={tasks.extraLarge}
                                headingText="Large"
                                subHeadingText="More than 5 days"
                            />
                        )}
                    </Droppable>
                </>
            )
        }
    }

    return (
        <div className={styles.pageWrapper}>
            <section className={styles.container}>
                <div className={styles.innerContainer}>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        {lists()}
                    </DragDropContext>
                </div>
            </section>
            <PageFooter />
        </div>
    )
}

export default TaskListsPage
