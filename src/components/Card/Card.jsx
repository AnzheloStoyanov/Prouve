import styles from './Card.module.css';

const Card = ({ children, title, passStyles }) => {

  return (
    <div className={styles.wrapper}>
      <div>
        <span>{title}</span>
      </div>
      <div style={passStyles}>
        {children}
      </div>
    </div>
  )
};

export default Card;
