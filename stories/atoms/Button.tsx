import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
    outlined?: boolean
    underlined?: boolean
    fullWidth?: boolean
    size?: 'small' | 'medium' | 'large'
    label?: string
    onClick?: () => void
}

export const Button = ({
    outlined = false,
    underlined = false,
    fullWidth = false,
    size = 'medium',
    label,
    ...props
}: ButtonProps) => {
    const buttonStyles = [styles.button]

    outlined === true ? buttonStyles.push(styles.outlined) : ''
    underlined === true ? buttonStyles.push(styles.underlined) : ''
    fullWidth === true ? buttonStyles.push(styles.fullWidth) : ''

    size === 'small' ? buttonStyles.push(styles.smallSize) : ''
    size === 'large' ? buttonStyles.push(styles.largeSize) : ''

    return (
        <button type="button" className={buttonStyles.join(' ')} {...props}>
            {label}
        </button>
    )
}
