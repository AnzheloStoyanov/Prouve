import styles from './PaymentsTable.module.css'

const PaymentsTable = ({ data }) => {

    return (
        <>
            <table width="100%">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Поръчка</th>
                        <th>Платежен инструмент</th>
                        <th>Сума</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => {
                        return (<>
                            <tr>
                                <td>{row.date} г.</td>
                                <td>{row.number}</td>
                                <td>{row.paymentTool}</td>
                                <td>{row.amount} лв.</td>
                            </tr>
                        </>)

                
                    })}
                </tbody>
            </table >
        </>
    )
}


export default PaymentsTable