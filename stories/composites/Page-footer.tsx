import React from 'react'
import styles from './Page-footer.module.css'

interface PageFooterProps {}

export const PageFooter = ({ ...props }: PageFooterProps) => {
    return (
        <footer className={styles.pageFooter} {...props}>
            <img src="./next-item-logo.svg" alt="" />
        </footer>
    )
}
