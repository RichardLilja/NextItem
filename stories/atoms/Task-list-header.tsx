import React from "react"
import './task-list-header.css'

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
        <header className="taskListHeader">
            <h2 className="taskListHeader--heading">{headingText}</h2>
            <p className="taskListheader--subHeading">{subHeadingText}</p>
        </header>
    )
}
