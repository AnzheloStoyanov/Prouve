import styles from './Overlay.module.css';
import CloseIcon from '@mui/icons-material/Close';

const Overlay = ({ children, onClose }) => {

  const close = () => {
    onClose(); // Emit close to the parent
  };

  return <div className={styles.wrapper}>
    <div className={styles.menu}>
      <div>
        <CloseIcon onClick={close} />
      </div>
      {children}
    </div>
    <div className={styles.backdrop} id="backdrop" onClick={close}></div>
  </div>
};

export default Overlay;
