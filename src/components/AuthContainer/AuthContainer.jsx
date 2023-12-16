import styles from './AuthContainer.module.css'

export const AuthContainer = ({ children, className, style }) => {
    return (
        <div className={className ? styles[className] : styles.loginSmall} style={style}>
            <div className={styles.authSection}>
                {children}
            </div>
            <div className={styles.pictureSection}>
            </div>
        </div>)
}