import React from 'react'
import './button.css'

interface ButtonProps {
    type?: 'solid' | 'outlined'
    width?: 'auto' | 'full'
    size?: 'small' | 'medium' | 'large'
    label?: string
    underlined?: boolean
    onClick?: () => void
}

export const Button = ({
    type = 'solid',
    width = 'auto',
    size = 'medium',
    label,
    underlined = false,
    ...props
}: ButtonProps) => {
    const btnWidth = width === 'auto' ? '' : 'button--fullWidth'
    const btnType = type === 'solid' ? '' : 'button--outlined'
    const btnUnderlined = underlined === true ? 'button--underlined' : ''

    let btnSize = ''
    btnSize = size === 'small' ? 'button--smallSize' : btnSize
    btnSize = size === 'large' ? 'button--largeSize' : btnSize

    return (
        <button
            type="button"
            className={`button ${btnType} ${btnWidth} ${btnSize} ${btnUnderlined}`}
            {...props}
        >
            {label}
        </button>
    )
}
