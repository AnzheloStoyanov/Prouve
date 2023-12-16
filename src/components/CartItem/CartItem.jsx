import { useContext, useState } from 'react';
import { isMobileContext } from '../../providers/isMobileContext';
import QuantityInput from '../QuantityInput/QuantityInput';
import styles from './CartItem.module.css';
import binIcon from '../../assets/images/bin-icon.svg';
import i18n from 'i18next';
import { useTranslation } from "react-i18next";


const CartItem = ({ item, initQuantity, onQuantityChange, onRemove }) => {
    const { isMobile } = useContext(isMobileContext);
    const [quantity, setQuantity] = useState(initQuantity || 0);
    const { t } = useTranslation();


    const changeQuantity = (value) => {
        onQuantityChange(value);
        setQuantity(value);
    };

    const nameValidator = (value) => {
      console.log(value)
        return value;
    }

    return (
        <div className={styles.wrapper}>
            {!isMobile ? (<>
                <img src={item.photos[0]} />
                <div>
                    <div className={styles.spaceBetween}>
                    {  i18n.language === "en" ?
                        <span>{nameValidator(item.en_name)}</span>
                        :
                        <span>{nameValidator(item.bg_name)}</span>
                        }
                                                <span>{item.price} {t("homePage.leva")}.</span>
                    </div>
                    <div className={styles.quantity}>
                        <span>Количество:</span> <QuantityInput initValue={initQuantity} onChange={changeQuantity}></QuantityInput>
                    </div>
                    <span>
                        <button onClick={onRemove}>
                            <img src={binIcon} /><span> {t("homePage.delete")}</span>
                        </button>
                    </span>
                </div>
            </>) : (<>
                <div>
                    <div className={styles.flex}>
                        <img src={item.photos[0]} />
                        {  i18n.language === "en" ?
                        <span>{nameValidator(item.en_name)}</span>
                        :
                        <span>{nameValidator(item.bg_name)}</span>
                        } 
                    </div>
                    <div className={styles.spaceBetween}>
                        <QuantityInput initValue={initQuantity} onChange={changeQuantity}></QuantityInput>
                        <span>{item.price} {t("homePage.leva")}.</span>
                      
                    </div>
                    <button onClick={onRemove} >
                        <img src={binIcon} /><span> {t("homePage.delete")}</span>
                    </button>
                </div>
            </>)}
        </div>
    )
}

export default CartItem;