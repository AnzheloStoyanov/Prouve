import styles from './ProfileButton.module.css';
import { Link } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Profile from '../../pages/Profile/Profile';
import { useState, useContext } from 'react';
import { AuthContext } from '../../auth/AuthWrapper';
import ProfileIconImg from '../../assets/images/profile-icon.png';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { useNavigate } from 'react-router-dom'
import { isMobileContext } from '../../providers/isMobileContext';

const ProfileButton = () => {
  const context = useContext(AuthContext);
  const { isAuthenticated } = context.user;
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const mobileContext = useContext(isMobileContext)
  const { isMobile } = mobileContext;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (!isAuthenticated) {
    return (
      <Link to="/login" className={styles.loginButton}>
        Login
      </Link>
    );
  }

  return (<>
    {isMobile ?
      (<><Link to='/profile'><img src={ProfileIconImg} /></Link></>)
      :
      (<><Link aria-describedby={id}
        onClick={handleClick}>
        <img src={ProfileIconImg} />
      </Link>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          className={styles['MuiPopover-paper']}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <div className={styles.profileMenu}>
            <ProfileMenu hasLogoutButton={true} handleChange={handleClose}></ProfileMenu>
          </div>
        </Popover></>)}
  </>);
};

export default ProfileButton;
