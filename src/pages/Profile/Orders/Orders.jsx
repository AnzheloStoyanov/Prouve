import { useEffect, useState } from 'react'
import OrderLine from '../../../components/OrderLine/OrderLine';
import styles from './Orders.module.css'
import Divider from '../../../components/common/Divider/Divider';
import { ordersService } from '../../../services/orders.service';


const Orders = () => {

    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        // const orders = [
        //     {
        //         id: 1,
        //         number: 1234,
        //         status: 'Доставена',
        //         date: '10-10-2023',
        //         amount: 14.88
        //     }, {
        //         id: 2,
        //         number: 2364,
        //         status: 'Обработва се',
        //         date: '21-08-2023',
        //         amount: 44.18
        //     }, {
        //         id: 3,
        //         number: 1348,
        //         status: 'Доставена',
        //         date: '02-10-2023',
        //         amount: 14.88
        //     }, {
        //         id: 4,
        //         number: 7890,
        //         status: 'Потвърдена',
        //         date: '10-07-2023',
        //         amount: 100.23
        //     },
        // ]
        async function getAllOrders() {
            const orders = await ordersService.getAllOrders();
            const active = orders.filter((order) => {
                return order.stateOfOrder !== 'Delivered'
            })

            const completed = orders.filter((order) => {
                return order.stateOfOrder === 'Delivered'
            })

            setActiveOrders(active);
            setCompletedOrders(completed)
        }
        getAllOrders()
    }, [])

    return (
        <>
            <div className={styles.activeOrders}>
                <span className={styles.sectionHeader}>Активни поръчки</span>
                <Divider style={{ margin: '20px 0px 30px 0px' }} />
                {activeOrders.map((order) => {
                    return (
                        <OrderLine
                            key={order.id}
                            amount={order.productCost}
                            date={order.dateOfOrder.substring(0, 10)}
                            status={order.stateOfOrder}
                            orderNumber={order.orderNumber}
                        />
                    )
                })}
            </div>
            <div className={styles.completedOrders}>
                <span className={styles.sectionHeader}>Изпълнени поръчки</span>
                <Divider style={{ margin: '20px 0px 30px 0px' }} />
                {completedOrders.map((order) => {
                    return (
                        <OrderLine
                            key={order.id}
                            amount={order.productCost}
                            date={order.dateOfOrder.substring(0, 10)}
                            status={order.stateOfOrder}
                            orderNumber={order.orderNumber}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Orders