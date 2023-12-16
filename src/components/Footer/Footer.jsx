import { useState } from "react";
import PropTypes from "prop-types";
import "./footer.css";
import Logo from "../../assets/images/Logo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Phone } from "@mui/icons-material";
import { Mail } from "@mui/icons-material";

const Footer = () => {
  const locations = [
    "гр. София, ул. Цветна градина 38 (на ъгъла с ул. Църноок)",
    "гр. София, ул. Сан Стефано 9 (на ъгъла с ул. Марин Дринов)",
    "гр. София, ул. Цветна градина 38 (на ъгъла с ул. Църноок)",
    "гр. София, ул. Сан Стефано 9 (на ъгъла с ул. Марин Дринов)",
  ];

  const shopItems = ["Торти", "Шоколадови изкушения", "Бонбони", "Гранола"];

  return (
    <footer>
      <div className="main-footer-container">
        <div className="logo-container">
          <a href="#">
            <img className="logo" src={Logo} alt=" Woof & Roof logo"></img>
          </a>
          <div className="logo"></div>
          <p>
            Woof & Roof – любимо ти място в София за сурови и натурални десерти и
            ръчно приготвени шоколадови изделия, които ще ти напомнят, че всеки
            ден може да е повод за нещо вкусно.
          </p>
        </div>
        <div className="content-footer">
          <div className="locations-container">
            <h3>Kъде още може да ни намерите?</h3>
            <LocationListComponent locations={locations} isAcordion={false} />
          </div>

          <div className="shop-container">
            <h3>Магазин</h3>
            <ShopListComponent shopItems={shopItems} />
          </div>
        </div>
        <div className="contact-container">
          <h3>Контакти</h3>
          <ContactComponent locations={locations} />
        </div>
        <div className="mobile-accordion">
          <AccordionItem
            title={"Kъде още може да ни намерите?"}
            items={locations}
          />
          <AccordionItem title={"Магазин"} items={shopItems} />
          <AccordionItem title={"Контакти"} items={locations} />
        </div>
      </div>
      <div className="bottom-line-footer">
        <div>
          <div>
            <a href="#">Условия на пазаруване</a>
            <div className="ring"></div>
            <a href="#">Условия за ползване</a>
            <div className="ring"></div>
            <a href="#">Политика на поверителност</a>
            <div className="ring"></div>
            <a href="#">Политика относно бисквитките</a>
            <div className="ring"></div>
            <a href="#">Конфигуриране на бисквитки</a>
          </div>
          <span className="footer-coppy-right">© 2023 Woof & Roof</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const ContactComponent = ({ locations }) => {
  return (
    <>
      <div>
        <Phone
          className="icons"
          style={{ color: "white", width: "20px", marginRight: "10px" }}
        />
        <a href="tel:+359 885 824 666">+359 885 824 666</a>
      </div>
      <div>
        <Mail
          className="icons"
          style={{ color: "white", width: "20px", marginRight: "10px" }}
        />
        <a href="mailto:contact@woofandroof.bg">contact@woofandroof.bg</a>
      </div>
      {locations.slice(2).map((e, index) => (
        <div key={index}>
          <LocationOnIcon
            className="icons"
            style={{ color: "white", width: "20px", marginRight: "10px" }}
          />
          <span>{e}</span>
        </div>
      ))}
    </>
  );
};
ContactComponent.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.string),
};
const LocationListComponent = ({ locations, isAcordion }) => {
  return (
    <>
      {locations.map((location, index) => {
        const indexOfOpeningParenthesis = location.indexOf("(");
        const part1 = location.slice(0, indexOfOpeningParenthesis);
        const part2 = location.slice(indexOfOpeningParenthesis);
        return (
          <div className="locations" style={{ display: "flex", alignItems: "flex-start" }} key={index}>
            <LocationOnIcon
              style={{ color: "white", width: "20px", marginRight: "10px", marginTop: "5px" }}
            />
            <span>
              {isAcordion ? (
                <>
                  {part1}
                  {part2}
                </>
              ) : (
                <>
                  {part1}
                  <br />
                  {part2}
                </>
              )}
            </span>
          </div>
        );
      })}
    </>
  );
};

LocationListComponent.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.string),
  isAcordion: PropTypes.bool,
};
const ShopListComponent = ({ shopItems }) => {
  return (
    <>
      {" "}
      {shopItems.map((item, index) => (
        <div key={index}>
          <span>{item}</span>
        </div>
      ))}
    </>
  );
};

ShopListComponent.propTypes = {
  shopItems: PropTypes.arrayOf(PropTypes.string),
};

const AccordionItem = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
        <span className={`arrow ${isOpen ? "open" : ""}`}>
          {" "}
          <ArrowDropDownIcon
            style={{ color: "#FFF5F9", width: "30px", height: "30px" }}
          />
        </span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          {title === "Магазин" && <ShopListComponent shopItems={items} />}
          {title === "Контакти" && <ContactComponent locations={items} />}
          {title === "Kъде още може да ни намерите?" && (
            <LocationListComponent locations={items} isAcordion={true} />
          )}
        </div>
      )}
    </div>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
};
