import "./Home.module.scss";
import { useState, useEffect, useContext } from "react";
import styles from "./Home.module.css";
import { productsService } from "../../services";
import DynamicButton from "../../components/DynamicButton/DynamicButton";
import icon from "../../assets/images/icons_raw-16.png";
import veganRecepiesBadge from "../../assets/images/vegan-recepies-badge.png";
import madeWithLoveBadge from "../../assets/images/made-with-love-badge.png";
import healthyIngredientsBadge from "../../assets/images/healthy-ingredients-badge.png";
import veganBadge from "../../assets/images/vegan-badge.png";
import Frame from "../../components/Frame/Frame";
import { FormatQuoteSharp } from "@mui/icons-material";
import imageCardOne from "../../assets/images/imageCardOne.png";
import PhoneIcon from "../../assets/images/contacts-phone-icon.png";
import MailIcon from "../../assets/images/contacts-mail-icon.png";
import LocationIcon from "../../assets/images/contacts-locations-icon.png";
import LocationIconMIN from "../../assets/images/location-icon.png";
import { Link } from "react-router-dom";
import { StoreItem } from "../../components";
import CardsBlog from "../../components/CardsBlog/CardsBlog";
import { isMobileContext } from "../../providers/isMobileContext";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import Aos from "aos";
import { blogsService } from "../../services";
import "aos/dist/aos.css"; // Import the AOS CSS
import axios from "axios";
import Mama1 from "../../assets/images/мама1.jpg";
import Mama2 from "../../assets/images/мама2.jpg";
import Mama3 from "../../assets/images/мама3.jpg";
import mamaMobile from "../../assets/images/mamaMobile.jpg"
import mamaMobile1 from "../../assets/images/mamaMobile1.jpg"
import Carousel from "../ProductPage/Carousel";

const Home = () => {
  const { isMobile } = useContext(isMobileContext);
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchProductsData();
    fetchBlogData();
    Aos.init();

    return () => {};
  }, []);
  const fetchBlogData = async () => {
    try {
      const blogsData = await blogsService.getAllBlogs();
      // temporary coppy one of the blogs for rendering it and matching design
      if (blogsData.length < 3) {
        // If there are fewer than 3 elements, repeat the last element to fill the array.
        while (blogsData.length < 3) {
          blogsData.push(blogsData[blogsData.length - 1]);
        }
      }
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchProductsData = async () => {
    try {
      const productsData = await productsService.getFilteredProducts(1, 8, {
        ShowOnHomePage: true,
      });
      setProducts(productsData.data);
      console.log(productsData.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
        {!isMobile &&
              <Carousel images={[Mama1, Mama2, Mama3]}></Carousel>

        }
 {isMobile &&
   <Carousel images={[mamaMobile,mamaMobile1]}></Carousel>
 }
    
      

      <div className={styles.backgroundImageLetMeetUs}>
        <div data-aos="fade-up" className={styles.productsHomeContainerTitle}>
          <h1 className={styles.titlePartOne}>Коя съм АЗ</h1>
        </div>
        <div className={styles.meetUsContentContainer}>
          <div className={styles.firstQuote}>
            <FormatQuoteSharp data-aos="fade-up" />
          </div>
          <div data-aos="fade-up" className={styles.meetUsContentLetter}>
            <p>
              Здравейте, аз съм Роси и искам да ви споделя историята за моето
              вълнуващо приключение в света на мултилевъл-маркетинга (MLM) с
              компанията 
              <strong> Prouve</strong>.
            </p>
            <p>
              Всичко започна, когато открих тази полска компания, специализирана
              в продажбата на парфюми, козметика и почистващи продукти. Веднага
              бях впечатлена от качеството на техните продукти и възможност за
              финансов успех. Решителна да променя своя живот и да споделя тези
              страхотни продукти с други хора, започнах своя собствена
              предприемаческа история с Prouve. Създадох свой екип от амбициозни
              и мотивирани хора, които също искаха да изградят успешен бизнес.
            </p>
            <p>
              С подкрепата на екипа ни и с усърдна работа, успяхме не само да
              представим продуктите на Prouve на много хора, но и да разрастваме
              нашия екип, привличайки нови хора, готови да се присъединят към
              нашата успешна общност.
            </p>
            <p>
              Ден след ден, нещата ставаха все по-добре и гордо споделях
              успехите си с моя екип. Prouve не само ми предостави възможност за
              финансов успех, но и ме свърза с невероятни хора, които се
              превърнаха в истински приятели.
            
            </p>
            <p>Сега аз, Росица, съм горда дама в света на MLM с Prouve. 
              Ако и вие мечтаете за финансова независимост и желаете да бъдете част от успешен екип и да изградите свой, 
              не се колебайте да се свържете с мен. 
              <strong>  Нека заедно изградим светът на успеха и възможностите!</strong>
            </p>
          </div>
          <div className={styles.secondQuote}>
            <FormatQuoteSharp data-aos="fade-up" />
          </div>

          <div className={styles.signment}>
            <div>
              <h4> {t("homePage.founderContentLetter")}</h4>
              <h4> {t("homePage.descOfOwner")}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.backgroundImageFirstClass}>
        <div className={styles.productsHomeContainerTitle}>
          <h1 data-aos="fade-up" className={styles.titlePartOne}>
            {" "}
           първокласно качество
          </h1>
       
          {!isMobile && (
            <p data-aos="fade-up"> {t("homePage.housesWithLove")}</p>
          )}
        </div>
        {isMobile && <p data-aos="fade-up">{t("homePage.housesWithLove")}</p>}

        <div className={styles.missingContent}>
          <Frame
            data-aos="fade-up"
            title="100+"
            description={t("homePage.satisfiedCustomers")}
          />
          <Frame
            data-aos="fade-up"
            title="100%"
            description={t("homePage.qualityMaterials")}
          />
          <Frame
            data-aos="fade-up"
            title="100%"
            description={t("homePage.realizedDeliveries")}
          />
        </div>
        <div data-aos="fade-up" className={styles.buttonContainer}>
          <Link to="/store">
            <DynamicButton text={t("homePage.headerToTheShop")} />
          </Link>
        </div>
      </div>
      <div className={styles.choseUsContainer}>
        <div className={styles.productsHomeContainerTitle}>
          <h1 className={styles.titlePartOne}>{t("homePage.whyChose")}</h1>
          <h1 className={styles.titlePartTwo}>{t("homePage.us")} </h1>
        </div>
        <div className={styles.choseUsContainerIcons}>
          <div data-aos="fade-up">
            <img src={veganRecepiesBadge}></img>
            <span>100% {t("homePage.qualityMaterials")}</span>
            <p>{t("homePage.qualityMaterialsDescription")}</p>
          </div>
          <div data-aos="fade-up">
            <img src={madeWithLoveBadge}></img>
            <span>{t("homePage.healthyMaterials")}</span>
            <p>{t("homePage.healthyMaterialsDesc")}</p>
          </div>
          <div data-aos="fade-up">
            <img src={healthyIngredientsBadge}></img>
            <span> {t("homePage.handMade")}</span>
            <p>{t("homePage.handMadeDesc")}</p>
          </div>
          <div data-aos="fade-up">
            <img src={veganBadge}></img>
            <span> {t("homePage.inovation")}</span>
            <p>{t("homePage.inovationDesc")}</p>
          </div>
        </div>
      </div>
      <div className={styles.blogContainer}>
        <div className={styles.productsHomeContainerTitle}>
          <h1 className={styles.titlePartOne}>веган</h1>
          <h1 className={styles.titlePartTwo}> блог</h1>
        </div>
        {!isMobile && (
          <div className={styles.cardsContainer}>
            {blogs.slice(0, 3).map((blog, index) =>
              i18n.language === "en" ? (
                <CardsBlog
                  key={index}
                  title={blog.en_title}
                  description={blog.bg_content}
                  img={blog.imagePath} // Assuming there is an 'image' property in your 'blog' object
                  id={blog.id}
                />
              ) : (
                <CardsBlog
                  key={index}
                  title={blog.bg_title}
                  description={blog.bg_content}
                  img={blog.imagePath} // Assuming there is an 'image' property in your 'blog' object
                  id={blog.id}
                />
              )
            )}
          </div>
        )}
        {isMobile && (
          <div className={styles.cardsContainerMobile}>
            <div>
              {blogs.slice(0, 1).map((blog, index) =>
                i18n.language === "en" ? (
                  <CardsBlog
                    key={index}
                    title={blog.en_title}
                    img={blog.imagePath} // Assuming there is an 'image' property in your 'blog' object
                    id={blog.id}
                  />
                ) : (
                  <CardsBlog
                    key={index}
                    title={blog.bg_title}
                    img={blog.imagePath} // Assuming there is an 'image' property in your 'blog' object
                    id={blog.id}
                  />
                )
              )}
            </div>
            <div className={styles.secondElemenetCardsContainer}>
              {blogs.slice(1, 3).map((blog, index) =>
                i18n.language === "en" ? (
                  <CardsBlog
                    key={index}
                    title={blog.en_title}
                    img={blog.imagePath} // Assuming there is an 'image' property in your 'blog' object
                    isTrue={true}
                    id={blog.id}
                  />
                ) : (
                  <CardsBlog
                    key={index}
                    title={blog.bg_title}
                    img={blog.imagePath} // Assuming there is an 'image' property in your 'blog' object
                    isTrue={true}
                    id={blog.id}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.contactUsContainer}>
        <div className={styles.productsHomeContainerTitle}>
          <h1 className={styles.titlePartOne}>Свържи се</h1>
          <h1 className={styles.titlePartTwo}> с нас</h1>
        </div>
        <div className={styles.mainContactUsContainer}>
          <div className={styles.contactForm}>
            <div>
              <h1>Изпрати ни съобщение</h1>
              <form>
                <label htmlFor="name">Име</label>
                <input
                  type="text"
                  placeholder="Напишете името си тук"
                  id="name"
                  name="name"
                  required
                />
                <br />

                <label htmlFor="email">Имейл адрес</label>
                <input
                  type="email"
                  placeholder="Напишете имейл адреса си тук"
                  id="email"
                  name="email"
                  required
                />
                <br />

                <label htmlFor="message">Съобщение</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Напишете съобщението си тук"
                  rows="4"
                  required
                ></textarea>
                <br />
                <div className={styles.acceptPolicy}>
                  <input
                    type="checkbox"
                    id="privacyPolicyAccepted"
                    name="privacyPolicyAccepted"
                    required
                  />
                  <label htmlFor="privacyPolicyAccepted">
                    Съгласен/съгласна съм, че предоставените от мен лични данни
                    могат да бъдат използвани съгласно нашата{" "}
                    <a href="#">Политика за поверителност</a>.
                  </label>
                </div>
                <br />
                <div className={styles.buttonContainer}>
                  <DynamicButton text="Изпрати" />
                </div>
              </form>
            </div>
          </div>
          <div className={styles.middleImage}></div>
          <div className={styles.contactsContainer}>
            <div className={styles.contactsContainerInner}>
              <h1>Контакти</h1>
              <div className={styles.locationContainerM}>
                <div>
                  <img className={styles.phone} src={PhoneIcon} />
                  <div>
                    <h4>Обадете ни се</h4>
                    <div>+359 885 824 666</div>
                  </div>
                </div>
                <div>
                  <img className={styles.mail} src={MailIcon} />
                  <div>
                    <h4>Напишете ни имейл</h4>
                    <div>contact@rawandmore.bg</div>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.locationContainer} ${styles.locationContainerCol}`}
              >
                <div className={styles.locationContainerTitle}>
                  <img src={LocationIcon} />
                  <h4>Посетете ни</h4>
                </div>

                <div>
                  <div>
                    <div className={styles.locatioins}>
                      <img src={LocationIconMIN} />
                      гр. София, ул. Цветна градина 38 <br />
                      (на ъгъла с ул. Църноок){" "}
                    </div>
                    <div className={styles.locatioins}>
                      <img src={LocationIconMIN} />
                      гр. София, ул. Сан Стефано 9 <br />
                      (на ъгъла с ул. Марин Дринов)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
