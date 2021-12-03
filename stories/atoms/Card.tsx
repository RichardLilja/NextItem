import React from 'react'
import styles from './Card.module.css'

interface CardProps {
    children?: JSX.Element
}

export const Card = ({
    children,
    ...props
}: CardProps) => {

    return (
        <div
            className={styles.card}
            {...props}
        >   
            {children}
        </div>
    )
}
