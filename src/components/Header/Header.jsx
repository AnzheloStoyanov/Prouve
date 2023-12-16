import { Overlay, NavBar, BasketIcon, ProfileButton } from '../index'
import styles from './Header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState } from 'react';
import { isMobileContext } from '../../providers/isMobileContext';
import LogoImg from '../../assets/images/Logo.png'
import ProfileIconImg from '../../assets/images/profile-icon.png'
import { Link } from 'react-router-dom';

const Header = () => {
  const [burgerState, setBurgerState] = useState(false);
  const { isMobile } = useContext(isMobileContext);

  const openBurger = () => {
    setBurgerState(true);
  };

  const closeBurger = () => {
    setBurgerState(false);
  };

  return <div className={`${styles.headerWrapper} globalPagePaddingMedium`}>
    {!isMobile ?
      ('')
      : (
        <>
          <MenuIcon onClick={openBurger} />
          {
            !burgerState ? ('') :
              (
                <Overlay onClose={closeBurger}>
                  <NavBar className={styles.headerWrapper} isMobile={isMobile} onClose={closeBurger}></NavBar>
                </Overlay>
              )
          }
        </>
      )}
    <div className={styles.logo}>
      <img src={LogoImg} />
    </div>
    {!isMobile ?
      (<NavBar className={styles.headerWrapper} isMobile={isMobile}></NavBar>)
      : (<div className={styles.rightIcons}>
        <li><ProfileButton /></li>
        <li><BasketIcon /></li>
      </div>)}
  </div>
};

export default Header;
