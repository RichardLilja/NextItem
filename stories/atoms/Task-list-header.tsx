import React from 'react'
import styles from './Task-list-header.module.css'

interface TaskListHeaderProps {
    headingText: string
    subHeadingText: string
}

export const TaskListHeader = ({
    headingText,
    subHeadingText,
    ...props
}: TaskListHeaderProps) => {
    return (
        <header className={styles.taskListHeader}>
            <h2 className={styles.heading}>{headingText}</h2>
            <p className={styles.subHeading}>{subHeadingText}</p>
        </header>
    )
}
