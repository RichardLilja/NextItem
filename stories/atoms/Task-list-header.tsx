import React from 'react'
import styles from './Task-list-header.module.css'

import { Button } from '../atoms/Button'

interface TaskListHeaderProps {
    heading: string
    subheading: string
}

export const TaskListHeader = ({
    heading,
    subheading,
}: TaskListHeaderProps) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.heading}>{heading}</h2>
                <p className={styles.subheading}>{subheading}</p>
            </header>
            <div className={styles.buttonContainer}>
                <Button label="+ Add task" underlined={true} />
            </div>
        </div>
    )
}
