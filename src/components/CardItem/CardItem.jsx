import styles from './CardItem.module.css';


const CardItem = ({ text, imagePath, selected, onClick }) => {

  return <div className={selected? styles.wrapperSelected : styles.wrapper} onClick={onClick}>
    <img src={imagePath} alt="" /><span>{text}</span>
  </div>
};

export default CardItem;
