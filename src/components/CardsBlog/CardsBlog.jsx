import PropTypes from "prop-types";
import "./cardsBlog.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CardsBlog = ({ title, description, img, url, isTrue, id }) => {
  const { t } = useTranslation()
  return (
    <Link to={`/blog/${id}`}>
    <div className="cardsWrapper">
      <div className="imgWrapper">
        <img className="innerImg" src={img} alt={title} />
        <div className="cardsContnet">
          <div
            className={
              isTrue
                ? "cardsContentTitle cardsContentTitleMobie"
                : "cardsContentTitle"
            }
          >
            {title}
          </div>
          <div className="cardsContentDescriptionWithButton">
            <div className="cardsContentDescription bahurDesc">
              {description}
            </div>
            <Link to={`/blog/${id}`}>{t("blogCards.share")}</Link>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default CardsBlog;

CardsBlog.propTypes = {
  // Corrected the prop types
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
