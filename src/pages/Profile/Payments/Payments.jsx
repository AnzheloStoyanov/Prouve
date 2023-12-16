import { useEffect, useState } from "react"
import PaymentsTable from "../../../components/PaymentsTable/PaymentsTable";
import Divider from "../../../components/common/Divider/Divider";
import { useMediaQuery } from "react-responsive";
import styles from './Payments.module.css'

const Payments = () => {

    const [payments, setPayments] = useState([]);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })

    const testPayments = [
        {
            date: '11.10.2023',
            number: 1234,
            paymentTool: 1234567890,
            amount: 123.45
        }, {
            date: '22.08.2023',
            number: 5432,
            paymentTool: 1234567890,
            amount: 123.45
        }, {
            date: '12.02.2022',
            number: 5678,
            paymentTool: 1234567890,
            amount: 123.45
        }, {
            date: '02.01.2023',
            number: 1488,
            paymentTool: 1234567890,
            amount: 123.45
        },
    ]

    const sum = payments.reduce((accumulator, payment) => {
        return accumulator + payment.amount;
    }, 0);

    useEffect(() => {
        setPayments(testPayments);
    }, [])

    return (
        <div className={styles.paymentsWrapper}>
            <span className={styles.header}>Плащания</span>
            {!isTabletOrMobile && <Divider style={{ margin: '25px 0' }} />}
            <PaymentsTable data={payments} />

            {isTabletOrMobile && <ul className={styles.paymentsList}>
                {payments.map((payment) => {
                    return (<li key={payment.number}>
                        <span>{payment.date + ' г.'} </span>
                        <div>
                            <span>{payment.paymentTool}</span>
                            <span>{'№' + payment.number}</span>
                        </div>
                        <span>{payment.amount + ' лв.'}</span>
                    </li>)
                })
                }
            </ul>}
            <div className={styles.totalSum}>
                <span>Общо: {sum.toFixed(2)} лв.</span>
            </div>
        </div>
    )
}

export default Payments