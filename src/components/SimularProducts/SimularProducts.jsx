import { useContext } from "react";
import { isMobileContext } from "../../providers/isMobileContext";
import StoreItem from "../StoreItem/StoreItem";
import styles from "./SimularProducts.module.css";

const SimularProducts = ({ products }) => {
    const { isMobile } = useContext(isMobileContext);

    return <>
        <h1>Подобни продукти</h1>
        <div className={isMobile ? styles.mobilePositioning : ""}>
            <div className={styles.similarProductsCards}>
                {products.map((product) => (
                    <StoreItem
                        key={product.name}
                        name={product.name}
                        price={product.price}
                        img={product?.photos[0]}
                        id={product.id}
                    />
                ))}
            </div>
        </div>
    </>
};

export default SimularProducts;