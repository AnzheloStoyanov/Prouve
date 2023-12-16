import { useContext, useEffect, useState } from "react";
import { CartItem, DynamicButton } from "../../components";
import { useCart } from "../../providers/cartContext";
import { isMobileContext } from "../../providers/isMobileContext";
import { productsService } from "../../services";
import styles from "./CartPage.module.css";
import { useTranslation } from "react-i18next";
import StripeContainer from "../../components/StripeContainer/stripeContainer";

const CartPage = () => {
  const { cart } = useCart();
  const [cartProducts, setCartProducts] = useState({});
  const [totalAmount, setTotalAmount] = useState(0); // State to store the total amount
  const { addToCart, removeFromCart } = useCart();
  const { isMobile } = useContext(isMobileContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (cart.length !== 0) {
      fetchCartItems();
    }
  }, []);

  const fetchCartItems = () => {
    const promissesArray = [];
    cart.forEach((item) => {
      promissesArray.push(productsService.getProductById(item.id));
    });

    Promise.all(promissesArray).then((data) => {
      const itemsObject = data.reduce((acc, item) => {
        if (!!item?.response?.status) {
          const itemId = +item.response.config.url.split("id=")[1];
          removeFromCart(itemId);
          return acc;
        }

        item.quantity = cart.filter((it) => +it.id === +item.id)[0].quantity;
        acc[item.id] = item;
        return acc;
      }, {});

      setCartProducts(itemsObject);
      calculateTotalAmount(itemsObject); // Calculate the total amount when cart items are fetched
    });
  };

  const calculateTotalAmount = (items) => {
    const total = Object.values(items).reduce(
      (acc, val) => acc + +val.price * val.quantity,
      0
    );
    setTotalAmount(total);
  };

  return (
    <div className={`globalPagePaddingMedium ${styles.wrapper}`}>
      <span className={styles.pageTitle}>
        {" "}
        {t("navbar.basket")} ({cart.length})
      </span>
      <div className={styles.itemsWrapper}>
        <div className={styles.items}>
          {Object.values(cartProducts).map((item) => (
            <div key={item.id}>
              <CartItem
                item={item}
                initQuantity={item.quantity}
                onQuantityChange={(quantity) => {
                  const products = { ...cartProducts };
                  if (item === undefined) {
                    return;
                  }

                  if (products[item.id]) {
                    products[item.id].quantity = quantity;

                    addToCart(item.id, quantity, true);
                    setCartProducts(products);
                    calculateTotalAmount(products); // Recalculate total amount on quantity change
                  }
                }}
                onRemove={() => {
                  const cartProductsTemp = { ...cartProducts };

                  delete cartProductsTemp[item.id];
                  setCartProducts(cartProductsTemp);

                  removeFromCart(item.id);
                  calculateTotalAmount(cartProductsTemp); // Recalculate total amount on item removal
                }}
              />
            </div>
          ))}
        </div>
        <div className={styles.paymentFormContainer}>
          <div className={styles.paymentForm}>Bahur</div>
          <StripeContainer amount={totalAmount}></StripeContainer>

          <div className={styles.purchase}>
            <div>
              <span>
                {!isMobile ? t("products.summery") : t("products.summeryShort")}:
              </span>
              <span>
                {totalAmount} лв.
              </span>
              {isMobile && (
                <DynamicButton text={t("products.pay")}></DynamicButton>
              )}
            </div>
            {!isMobile && (
              <DynamicButton text={t("products.pay")}></DynamicButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
