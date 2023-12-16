import styles from './Divider.module.css'


const Divider = ({ children, style }) => {
    return (
        <div className={children ? styles.divider : styles.dividerNoText} style={style}>{children}</div>
    )
}


export default Divider