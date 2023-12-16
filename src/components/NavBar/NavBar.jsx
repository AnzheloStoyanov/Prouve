import styles from './NavBar.module.css';
import { ProfileButton } from '../index';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { categoriesService } from '../../services';
import { AuthContext } from '../../auth/AuthWrapper';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavBar = ({ isMobile, onClose }) => {
  const [submenuOpenState, setSubmenuOpenState] = useState(false);
  const [categories, setCategories] = useState({});
  const [language, setLanguage] = useState(i18n.language);
  const { t } = useTranslation();
  const context = useContext(AuthContext);
  const { isAdmin } = context.user;

  const toggleMenu = () => {
    setSubmenuOpenState(!submenuOpenState);
  }

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const appendParamerers = (path, parameter) => {
    return `${path}?categories=${parameter}`
  }

  const loadCategories = async () => {
    const categories = await categoriesService.getAllCategories();
    setCategories(categories);
  }

  useEffect(() => {
    loadCategories();

  }, []);

  return (
    <div className={styles.navStyle}>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={onClose}>
              {t("navbar.home")}
            </Link>
          </li>
          <li
            className={`${styles.submenu} ${
              submenuOpenState ? styles.submenuOpen : styles.submenuClosed
            }`}
            onClick={toggleMenu}
          >
            {isMobile ? (
              <a>{t("navbar.shop")}</a>
            ) : (
              <Link to="/store">{t("navbar.shop")}</Link>
            )}
            <ul>
              {Object.keys(categories).map((category) => {
                return language === "en" ? (
                  <li key={"nav-category" + categories[category].id}>
                    <Link
                      to={appendParamerers("/store", categories[category].id)}
                      onClick={onClose}
                    >
                      {categories[category].en_name}
                    </Link>
                  </li>
                ) : (
                  <li key={"nav-category" + categories[category].id}>
                    <Link
                      to={appendParamerers("/store", categories[category].id)}
                      onClick={onClose}
                    >
                      {categories[category].bg_name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <Link to="/blog" onClick={onClose}>
              {t("navbar.blog")}
            </Link>
          </li>
          <li>
            <Link to="/contacts" onClick={onClose}>
              {t("navbar.contacts")}
            </Link>
          </li>
          <li className={styles.languageSwitcher}>
            <span
              onClick={() => handleLanguageChange("en")}
              className={language === "en" ? styles.activeLanguage : ""}
            >
              EN
            </span>
            <span> | </span>
            <span
              onClick={() => handleLanguageChange("bg")}
              className={language === "bg" ? styles.activeLanguage : ""}
            >
              BG
            </span>
          </li>
          {isAdmin ? (
            <li>
              <Link to="/admin" onClick={onClose}>
                <AdminPanelSettingsIcon />
              </Link>
            </li>
          ) : (
            ""
          )}
          {!isMobile && (
            <li>
              <ProfileButton />
            </li>
          )}
          {!isMobile && (
            <li>
              <Link to="/cart" onClick={onClose}>
                <ShoppingCartIcon
                  className={styles.cardIcon}
                  style={{ fill: "#131313" }}
                />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
