import {Link} from "react-router-dom";
import DynamicButton from "../../components/DynamicButton/DynamicButton.jsx";
import styles from "./NotFound.module.scss";

const NotFound = () => {
    return (
        <div className={styles.background}>
            <div className={styles.contentWrapper}>
                <div className={styles.headText}>ОПА! СТРАНИЦАТА НЕ МОЖЕ ДА БЪДЕ НАМЕРЕНА</div>
                <div className={styles.subHeadText}>Предлагаме Ви да се върнете на началната страница и да прегледате другите раздели на нашия уебсайт.</div>
                <div className={styles.buttonContainer}>
                    <Link to='/'>
                        <DynamicButton text="Начало" backgroundColor="#EA9CB7" />
                    </Link >
                </div>
            </div>
        </div>
    );
};

export default NotFound;
