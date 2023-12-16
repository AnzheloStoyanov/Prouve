import styles from './OrderLine.module.css'
import Button from '../common/Button/Button'
import Divider from '../common/Divider/Divider'

const OrderLine = ({ status, date, amount, orderNumber }) => {

    const statuses = {
        Delivered: "Доставена",
        Processing: "Обработва се",
        Refunded: "Изпълнена",
        Paid: "Платена",
        test: "Тест"
    }
    return (
        <div className={styles.orderLineWrapper}>
            <span className={`${styles.orderStatus} ${styles[status]}`}>{statuses[status]}</span>
            <div className={styles.orderInfo}>
                <span className={styles.orderNumber}>ПОРЪЧКА № {orderNumber}</span>
                <div className={styles.orderDetails}>
                    <span>Стойност на поръчката ви: <b>{amount} лв.</b> </span>
                    <span>Дата на поръчката: <b>{date} г.</b></span>
                </div>
            </div>
            {status === 'Delivered' && <Button
                style={{ width: '100%', color: '#38736F', backgroundColor: 'rgba(56, 115, 111, 0.1)', borderRadius: '24px 24px 0px 0px' }}
            >Поръчай пак
            </Button>}
            <Divider style={{ margin: '0px' }} />
        </div>
    )
}


export default OrderLine