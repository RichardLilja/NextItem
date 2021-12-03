import React from 'react'
import styles from './Button.module.css'

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
    const stylesArray = [styles.button]
    width === 'full' ? stylesArray.push(styles.fullWidth) : ''
    type === 'outlined' ? stylesArray.push(styles.outlined) : ''
    underlined === true ? stylesArray.push(styles.underlined) : ''
    size === 'small' ? stylesArray.push(styles.smallSize) : ''
    size === 'large' ? stylesArray.push(styles.largeSize) : ''

    return (
        <button type="button" className={stylesArray.join(' ')} {...props}>
            {label}
        </button>
    )
}
