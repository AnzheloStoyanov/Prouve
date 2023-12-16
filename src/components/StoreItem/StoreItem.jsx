import styles from './StoreItem.module.css';
import { Badge, CenterOverlay, QuantityInput } from "../index"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DynamicButton } from '../index';
import productHoverImage from '../../assets/images/product-hover-thing.svg';
import { useCart } from '../../providers/cartContext';

const StoreItem = ({ name, price, img, id, customWidth, badge }) => {
  const [overlayState, setOverlayState] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();

  const openOverlay = () => {
    setQuantity(1);
    setOverlayState(true);
  };

  const closeOverlay = () => {
    setOverlayState(false);
  };

  const quickPreview = () => {
    openOverlay();
  };

  const submitAddToCart = () => {
    // todo add breadcrumb that says successfuly added to card or some shit
    addToCart(id, quantity);
    closeOverlay();
  }

  const changeQuantity = (quantity) => {
    setQuantity(quantity);
  };

  return <>
    {overlayState && (
      <CenterOverlay onClose={closeOverlay} title={"Манго чийзкейк"}>
        <div className={styles.overlayMenu}>
          
          <img src={img} alt={name} />
          <div className={styles.quantity}><span>Количество:</span> <QuantityInput onChange={changeQuantity}></QuantityInput></div>
          <div className={styles.price}>{price} лв.</div>
          <DynamicButton onClick={submitAddToCart} text="ДОБАВИ В КОШНИЦАТА" />
        </div>
      </CenterOverlay>
    )}
    <div style={{ width: customWidth }} className={styles.wrapper}>
      {badge > 0 &&
        <Badge id={badge} />
      }
      <div className={styles.imageWrapper}>
        <Link to={"/store/" + id} className={styles.image}>
          <img src={img} />
        </Link>
        <div className={styles.overlay} onClick={quickPreview}>
          <div>
            <img src={productHoverImage} />
            <span>Поръчай</span>
          </div>
        </div>
      </div>
      <div className={styles.textWrap}>
        <div className={styles.title}><span><Link to={"/store/" + id}>{name}</Link></span></div>
        <div className={styles.price}><span><Link to={"/store/" + id}>{price}</Link></span></div>
      </div>
    </div>
  </>
};

export default StoreItem;
