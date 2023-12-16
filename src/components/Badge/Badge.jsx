import styles from './Badge.module.css';
import image1 from '../../assets/images/favourite-badge_1.svg';
import image2 from '../../assets/images/best-selling-badge.svg';
import image3 from '../../assets/images/keto-friendly-badge.svg';
import image4 from '../../assets/images/high-protein-badge_1.svg';
import image5 from '../../assets/images/product-or-the-mont-badge.svg';
import image6 from '../../assets/images/new-badge_1.svg';
import image7 from '../../assets/images/out-of-stock-badge_1.svg';

const Badge = ({ id }) => {
  const images = [image1, image2, image3, image4, image5, image6, image7];

  return <>
    <img className={styles.wrapper} src={images[id]} alt="Badge" />
  </>
};

export default Badge;
