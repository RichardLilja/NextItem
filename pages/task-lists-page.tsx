import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import styles from '../styles/TaskListsPage.module.css'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { PageFooter } from '../stories/composites/Page-footer'
const TaskList = dynamic(() => import('../stories/composites/Task-list'))

const TaskListsPage: NextPage = () => {
    const [winReady, setwinReady] = useState(false)
    useEffect(() => {
        setwinReady(true)
    }, [])

    let data = [
        [
            {
                id: '157324095',
                text: 'Här står det en enkelt beskrivning av vad som behöver göras.',
            },
            {
                id: '147829304',
                text: 'I framtiden kan dessa kort uppdateras med meta-info.',
            },
        ],
        [
            {
                id: '257324095',
                text: 'Här står det en enkelt beskrivning av vad som behöver göras.',
            },
            {
                id: '247829304',
                text: 'I framtiden kan dessa kort uppdateras med meta-info.',
            },
        ],
        [
            {
                id: '357324095',
                text: 'Här står det en enkelt beskrivning av vad som behöver göras.',
            },
            {
                id: '347829304',
                text: 'I framtiden kan dessa kort uppdateras med meta-info.',
            },
        ],
        [
            {
                id: '457324095',
                text: 'Här står det en enkelt beskrivning av vad som behöver göras.',
            },
            {
                id: '447829304',
                text: 'I framtiden kan dessa kort uppdateras med meta-info.',
            },
        ],
    ]

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return

        if (result.source.droppableId !== result.destination.droppableId) {
            const sourceDroppableId = result.source.droppableId
            const sourceItems = Array.from(data[sourceDroppableId])
            const [reorderedItem] = sourceItems.splice(result.source.index, 1)

            const destinationDroppableId = result.destination.droppableId
            const destinationItems = data[destinationDroppableId]
            destinationItems.splice(result.destination.index, 0, reorderedItem)

            data[sourceDroppableId] = sourceItems
            data[destinationDroppableId] = destinationItems
        } else {
            const sourceDroppableId = result.source.droppableId
            const items = Array.from(data[sourceDroppableId])
            const [reorderedItem] = items.splice(result.source.index, 1)

            items.splice(result.destination.index, 0, reorderedItem)
            data[sourceDroppableId] = items
        }
    }

    function lists() {
        if (winReady) {
            return (
                <>
                    <Droppable droppableId="0">
                        {provided => (
                            <TaskList
                                provided={provided}
                                items={data[0]}
                                headingText="Small"
                                subHeadingText="Less than a day"
                            />
                        )}
                    </Droppable>

                    <Droppable droppableId="1">
                        {provided => (
                            <TaskList
                                provided={provided}
                                items={data[1]}
                                headingText="Medium"
                                subHeadingText="1 - 2 days"
                            />
                        )}
                    </Droppable>

                    <Droppable droppableId="2">
                        {provided => (
                            <TaskList
                                provided={provided}
                                items={data[2]}
                                headingText="Large"
                                subHeadingText="3 - 5 days"
                            />
                        )}
                    </Droppable>

                    <Droppable droppableId="3">
                        {provided => (
                            <TaskList
                                provided={provided}
                                items={data[3]}
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
