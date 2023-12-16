import { useState, useEffect } from "react";
import BackToTopSvg from '../../assets/images/back-to-top.svg';
import styles from "./BackToTop.module.scss";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 100);
    };

    const scrollToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div onClick={scrollToTop} className={`${styles.backToTop} ${isVisible ? styles.backToTopVisible : ''}`}>
            <img src={BackToTopSvg} alt="back-to-top" />
        </div>
    );
};

export default BackToTop;