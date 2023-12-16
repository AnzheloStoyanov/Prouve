import { useState, useEffect, useContext } from "react";
import { productsService,usersService} from "../../services";
import { localStorageService } from "../../services";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./ProductPage.module.css";
import Rating from "@mui/material/Rating";
import Carousel from "./Carousel";
import DynamicButton from "../../components/DynamicButton/DynamicButton";
import { Footer, Header, StoreItem } from "../../components";
import { isMobileContext } from "../../providers/isMobileContext";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CookiesPopUp from "../../components/CookiesPopUp/CookiesPopUp";
import { QuantityInput, SimularProducts } from "../../components";
import { useCart } from "../../providers/cartContext";

const ProductsPage = () => {
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("tab1"); // Initial active tab
  const [similarProducts, setSimilarProducts] = useState([]);
  const [productReviewStatistics, setProductReviewStatistics] = useState([]);
  const [productRaiting, setProductRaiting] = useState([]);
  const [allAllergen, setAllAllergen] = useState([]);
  const [userAllergen, setUserAllergen] = useState([]);
  const [allergenDetected, setAllergenDetected] = useState(false);
    const { isMobile } = useContext(isMobileContext);
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();
  const { id } = useParams();
useEffect(()=>{
  const user = JSON.parse(localStorageService.getUser());
  if (user?.id) {
    fetchUserAllergens(user.id)
  }
},[])
  useEffect(() => {
    // Define an array of promises for fetching data
    const promises = [
      fetchProductData(id),
      fetchSimilarProducts(id),
      fetchProductReviewStatistics(id),
      fetchProductRaiting(id),
      fetchAllAlergients(),
      fetchUserAllergens('user1')
      
    ];

    // Use Promise.all to ensure all data fetching is complete
    Promise.all(promises)
      .then(() => {
        // All data fetching is complete, rendering can start
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    return () => { };
  }, [id]);

  const fetchProductData = async () => {
    try {
      const blogData = await productsService.getProductById(id);
      setProduct(blogData);
    } catch (error) {
      console.error("Error fetching blog post:", error);
    }
  };

  const fetchSimilarProducts = async (productId) => {
    try {
      const response = await productsService.getSimilarProducts(productId, 4);
      setSimilarProducts(response.slice(0, 4));
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  const fetchProductReviewStatistics = async (productId) => {
    try {
      const response = await productsService.getProductReviewStatistics(
        productId
      );
      setProductReviewStatistics(response);
    } catch (error) {
      console.error("Error fetching product review statistics:", error);
    }
  };

  const fetchProductRaiting = async (productId) => {
    try {
      const response = await productsService.getRatingById(productId);
      setProductRaiting(response);
      console.log("productRaiting");
      console.log(productRaiting);
    } catch (error) {
      console.error("Error fetching product review statistics:", error);
    }
  };
  const fetchAllAlergients = async () => {
    try {
      const response = await productsService.getAllergen();
      setAllAllergen(response);
    } catch (error) {
      console.error("Error fetching blog post:", error);
    }
  };
  const fetchUserAllergens = async (userId) => {
    try {
      const response = await usersService.getUserAllergen(userId);
      setUserAllergen(response);
    } catch (error) {
      console.error("Error fetching user allergens:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handleAllergenDetection = () => {
    // Check if any allergen in product?.allergens is also in userAllergen
    const detectedAllergen = product?.allergens.find((productAllergen) =>
      userAllergen.some((userAllergen) => userAllergen.id === productAllergen.id)
    );

    // If an allergen is detected, show the pop-up
    if (detectedAllergen) {
      setAllergenDetected(true);
    }
  };
  useEffect(() => {
    handleAllergenDetection();
  }, [product, userAllergen]); // Run the detection whenever product or userAllergen changes

  const handleClosePopUP = () => {
    setAllergenDetected(false);
  };
  const submitAddToCart = () => {
    // todo add breadcrumb that says successfuly added to card or some shit
    addToCart(id, quantity);
  }

  const changeQuantity = (quantity) => {
    setQuantity(quantity);
  };
  return (
    <>
    <Header/>
      {allergenDetected && (
        <CookiesPopUp
          isCookiesPopUp={{ isCookiesPopUp: false }}
          handleNotAcceptCookies={handleClosePopUP}
         
        />
      )}
      <div className={styles.productMainContainer}>
        <div>
          <Link to="/store">
            <div className={styles.goBackButton}>
              <ArrowBackIosIcon />
              Обратно към Продукти
            </div>
          </Link>
          <div className={styles.carouselAndMainInfo}>
            {isMobile && <h1>{product?.name}</h1>}

            <Carousel images={product?.photos}></Carousel>
            <div className={styles.productMainInfo}>
              {/* Render product details here */}
              {productReviewStatistics && (
                <div className={styles.reviewRate}>
                  <Rating
                    name="read-only"
                    value={product?.averageRating}
                    readOnly
                  />
                  {productReviewStatistics?.rows?.length} отзива
                </div>
              )}
              <h1>{product?.name}</h1>
              <p>
                {
                  product?.description 
                }
              </p>
              <div className={styles.productCount}>
                <span>Количество:</span> <QuantityInput onChange={changeQuantity}></QuantityInput>
              </div>
              <h2>{product?.price} лв.</h2>
              <div className={styles.buttonContainer}>
                <DynamicButton text="ДОБАВИ В КОШНИЦАТА" onClick={submitAddToCart} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tabs}>
          <div className={styles.tabsHeader}>
            <div
              onClick={() => handleTabChange("tab1")}
              className={styles.tabOne}
              style={activeTab === "tab1" ? { backgroundColor: "white" } : {}}
            >
              Допълнителна информация
            </div>
            <div
              onClick={() => handleTabChange("tab2")}
              className={activeTab === "tab2" ? "active-tab" : ""}
              style={activeTab === "tab2" ? { backgroundColor: "white" } : {}}
            >
              Материали
            </div>
            <div
              onClick={() => handleTabChange("tab3")}
              className={activeTab === "tab3" ? "active-tab" : ""}
              style={activeTab === "tab3" ? { backgroundColor: "white" } : {}}
            >
              Време за изработване
            </div>
          </div>
          <div className={styles.tabsInfo}>
            {activeTab === "tab1" && (
              <div>
                <div className={styles.tabTitle}> Много яка къща братле</div>
                <div>{product?.caloriesPer100Grams}</div>
              </div>
            )}
            {activeTab === "tab2" && (
              <div>
                <div className={styles.tabTitle}>Материали</div>
                {/* {product?.ingredients.map((ingredient, index) => (
                  <div key={index}>{ingredient.name}</div>
                ))} */}
                <div>всчико правено от дръвя брат</div>
              </div>
            )}
            {activeTab === "tab3" && (
              <div>
                <div className={styles.tabTitle}> Време за изработване</div>
                {activeTab === "tab3" && (
                  <div>
                    {/* {allAllergen.map((allergen, index) => (
                      <div key={index}>
                        {product?.allergens.some(
                          (a) => a.id === allergen.id
                        ) ? (
                          <span className={styles.trueAlergen}>
                            {allergen.name} <DoneIcon />
                          </span>
                        ) : (
                          <span className={styles.falseAlergen}>
                            {allergen.name} <CloseIcon />
                          </span>
                        )}
                      </div>
                    ))} */}
                        <span className={styles.trueAlergen}>
                            за 16 мин сме готови <DoneIcon />
                          </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.ClientsComments}>
        <h1>Отзиви</h1>
        <Rating name="read-only" value={product?.averageRating} readOnly />
        <p>На базата на {productReviewStatistics?.rows?.length} отзива</p>
        {productRaiting && (
          <div>
            {Array.isArray(productRaiting) ? (
              productRaiting.map((e, index) => (
                <div key={index}>
                  <div
                    className={styles.ClientsProfileImg}
                    style={
                      e.images ? { backgroundImage: `url(${e.images})` } : {}
                    }
                  ></div>
                  <div>
                    <Rating name="read-only" value={e.value} readOnly />
                    <span>
                      {new Date(e.dateRated).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                  <h4>{e.userId}</h4>
                  <p>{e.comment}</p>
                </div>
              ))
            ) : (
              <div>
                <div className={styles.clientsDetails}>
                  <div
                    className={styles.ClientsProfileImg}
                    style={
                      productRaiting.images
                        ? { backgroundImage: `url(${productRaiting.images})` }
                        : {}
                    }
                  ></div>
                  <div>
                    <Rating
                      name="read-only"
                      value={productRaiting.value}
                      readOnly
                    />
                    <span>
                      {new Date(productRaiting.dateRated).toLocaleDateString(
                        "en-GB"
                      )}
                    </span>
                    <h4>{productRaiting.userId}</h4>
                  </div>
                </div>
                <p> {productRaiting.comment}</p>
              </div>
            )}
          </div>
        )}
      </div>
      { }
      <div className={styles.SimilarProducts}>
        <SimularProducts products={similarProducts}></SimularProducts>
      </div>
      <Footer/>
    </>
  );
};

export default ProductsPage;
