import styles from './BasketIcon.module.css';
import { Link } from 'react-router-dom';
import BasketImg from '../../assets/images/basket-icon.png';
import { useCart } from '../../providers/cartContext';

const BasketIcon = () => {
  const { cart } = useCart();

  return (
    <Link to="/cart" className={styles.wrapper}><img src={BasketImg} />
      <div>
        <span>{cart.length}</span>
      </div>
    </Link>
  )
};

export default BasketIcon;
