import styles from "./BlogLayout.module.css";
import DynamicButton from "../../components/DynamicButton/DynamicButton";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogLayout = ({ children }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.mainBlogContainer}>
      <div className={styles.blogContainer}>
        <div className={styles.productsHomeContainerTitle}>
    <h1 className={styles.titlePartOne}>{t("blogCards.dogs")}</h1>
          <h1 className={styles.titlePartTwo}> {t("blogCards.blog")}</h1>
        </div>
        {children}
      </div>
      <div className={styles.blogBanner}>
        <h1>разгледайте целия ни асортимент от изкушения</h1>
        <div className={styles.buttonContainer}>
          <Link to="/store">
            <DynamicButton text={"КЪМ МАГАЗИНА"} />
          </Link>
        </div>
      </div>
    </div>
  );
};
BlogLayout.propTypes = {
  children: PropTypes.node, // Validate children prop as a React node
};
export default BlogLayout;
