import React from 'react'
import './card.css'

interface CardProps {
    children?: JSX.Element
}

export const Card = ({
    children,
    ...props
}: CardProps) => {

    return (
        <div
            className={`card`}
            {...props}
        >   
            {children}
        </div>
    )
}
