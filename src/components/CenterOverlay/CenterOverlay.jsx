import { GridCloseIcon } from '@mui/x-data-grid';
import styles from './CenterOverlay.module.css';

const CenterOverlay = ({ children, title, onClose }) => {

  const close = () => {
    onClose(); // Emit close to the parent
  };

  return <div className={styles["wrapper"]}>
    <div className={styles["app"]}>
      <div className={styles["menu"]}>
        <div>
          <GridCloseIcon onClick={close} />
          <span>
            {title}
          </span>
        </div>
        {children}
      </div>
    </div>
    <div className={styles["backdrop"]} id="backdrop" onClick={close}></div>
  </div>
};

export default CenterOverlay;
