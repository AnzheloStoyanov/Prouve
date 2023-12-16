import styles from './Instructions.module.css'

const Instructions = ({ header, instructions }) => {

    return (
        <>
            <span className={styles.header}>{header}</span>
            <span className={styles.instructions}>{instructions}</span>
        </>
    )
}

export default Instructions