import styles from "./PopUpLayout.module.css";
import PropTypes from "prop-types";
import { isMobileContext } from '../../providers/isMobileContext';
import {  useContext } from "react";


const PopUpLayout = ({ children }) => {
  const { isMobile } = useContext(isMobileContext);
  return (
    <div className={styles.popUpLayOut}>
     <div className={styles.bahur}>
     {children}
     </div>
       
      

    </div>
  );
};
PopUpLayout.propTypes = {
  children: PropTypes.node, // Validate children prop as a React node
};


export default PopUpLayout;

