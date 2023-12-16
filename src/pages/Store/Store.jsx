import { useLocation } from "react-router-dom";
import { Banner, StoreItems } from "../../components";
import StoreBannerImg from "../../assets/images/store-banner.png";
import styles from './Store.module.css';

const Store = () => {
    const location = useLocation();

    return <div className="globalPagePaddingMedium">
        <div className={styles.bannerPadding}>
            <Banner path={StoreBannerImg}>
                <h1>Магазин</h1>
                <span>Начало - Магазин</span>
            </Banner>
        </div>
        <StoreItems triggerChange={location}></StoreItems>
    </div>
}

export default Store;