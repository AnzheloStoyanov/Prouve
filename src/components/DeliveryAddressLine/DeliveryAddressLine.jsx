import { useEffect, useState } from "react"
import Button from "../common/Button/Button"
import styles from './DeliveryAddressLine.module.css'

const DeliveryAddressLine = ({ name, address, handleDelete }) => {

    const [edit, setEdit] = useState(false);
    const initialInfo = {
        name: name,
        address: address
    }
    const [info, setInfo] = useState(initialInfo);


    const handleInput = (e) => {

        const { name, value } = e.target;

        setInfo((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <>
            {!edit
                ? <>
                    <p>{name}</p>
                    <span>{address}</span>
                    <div className={styles.buttonSection}>
                        <Button
                            className='textButton'
                            onClick={handleDelete}
                            style={{ fontSize: '18px', fontWeight: 'normal' }}
                        >
                            Изтрий
                        </Button>
                        <Button
                            className='outlinedButton'
                            style={{ width: '136px', borderRadius: '24px', fontSize: '18px' }}
                            onClick={() => setEdit(true)}
                        >
                            Промени
                        </Button>
                    </div>
                </>
                : <>
                    <textarea
                        className={styles.updateNameTextarea}
                        value={info.name}
                        readOnly={false}
                        name='name'
                        onInput={handleInput}
                    />
                    <textarea
                        className={styles.updateAddressTextarea}
                        value={info.address}
                        readOnly={false}
                        name='address'
                        onInput={handleInput}
                    />
                    <div className={styles.buttonSection}>
                        <Button
                            className='textButton'
                            style={{ fontSize: '18px', fontWeight: 'normal' }}
                            onClick={() => setEdit(false)}
                        >
                            Откажи
                        </Button>
                        <Button
                            className='outlinedButton'
                            style={{ width: '136px', borderRadius: '24px', fontSize: '18px' }}
                        >
                            Запази
                        </Button>
                    </div>
                </>}
        </>
    )
}

export default DeliveryAddressLine