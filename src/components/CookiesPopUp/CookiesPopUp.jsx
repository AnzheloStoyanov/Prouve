import { useState, useEffect, useContext } from "react";
import { isMobileContext } from "../../providers/isMobileContext";
import PopUpLayout from "../PopUpLayout/PopUpLayout";
import styles from "./CookiesPopUp.module.css";
import Cookie from "../../assets/images/cookies-icon.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CookiesPopUp = ({
  isCookiesPopUp,
  handleNotAcceptCookies,
  handleAcceptCookies,
}) => {
  const { isMobile } = useContext(isMobileContext);
  const { t } = useTranslation();
  const [showPopUp, setShowPopUp] = useState(false);
 

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("acceptedCookies");

    if (!hasAcceptedCookies) {
      setShowPopUp(true);
    }
    return () => {};
  }, []);

  return (
    <>
      {isMobile && (
        <PopUpLayout>
          <div className={styles.cokkies}>
            {isCookiesPopUp.isCookiesPopUp && (
              <img
                className={styles.cookiesImg}
                src={Cookie}
                alt="Cookies icon"
              />
            )}
            {isCookiesPopUp.isCookiesPopUp && (
              <p>
                {t("cookies.Title")}
                <br />
                <Link to="/"> {t("cookies.cookiePolicy")}</Link>
                <br />
                {t("cookies.cookiePS")}
              </p>
            )}
            {!isCookiesPopUp.isCookiesPopUp && (
              <p>Внимание! Този продукт съдържа посочен от вас алерген.</p>
            )}
            {isCookiesPopUp.isCookiesPopUp && (
              <div className={styles.buttonContainerCookies}>
                <button
                  className={styles.buttonAccept}
                  onClick={handleAcceptCookies}
                >
                  Приемам
                </button>
                <button
                  className={styles.buttonNot}
                  onClick={handleNotAcceptCookies}
                >
                  Отказвам
                </button>
              </div>
            )}
            {!isCookiesPopUp.isCookiesPopUp && (
              <div className={styles.buttonContainerCookies}>
                <button
                  className={styles.buttonAccept}
                  onClick={handleNotAcceptCookies}
                >
                  Разбрах
                </button>
              </div>
            )}
          </div>
        </PopUpLayout>
      )}
      {!isMobile && (
        <div className={styles.bottomPopUp}>
          {isCookiesPopUp.isCookiesPopUp && (
            <>
              <img
                className={styles.cookiesImg}
                src={Cookie}
                alt="Cookies icon"
              />
              <p>
              {t("cookies.Title")}
                <Link to="/">{t("cookies.cookiePolicy")}</Link>
                {t("cookies.cookiePS")}
              </p>
            </>
          )}
          {!isCookiesPopUp.isCookiesPopUp && (
            <p>Внимание! Този продукт съдържа посочен от вас алерген.</p>
          )}
          {isCookiesPopUp.isCookiesPopUp && (
            <div className={styles.buttonContainerCookies}>
              <button
                className={styles.buttonAccept}
                onClick={handleAcceptCookies}
              >
                Приемам
              </button>
              <button
                className={styles.buttonNot}
                onClick={handleNotAcceptCookies}
              >
                Отказвам
              </button>
            </div>
          )}
          {!isCookiesPopUp.isCookiesPopUp && (
            <div className={styles.buttonContainerCookies}>
              <button
                className={styles.buttonAccept}
                onClick={handleNotAcceptCookies}
              >
                Разбрах
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CookiesPopUp;
