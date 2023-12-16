import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { pages } from '../../core/profile-menu';
import { Button } from '@mui/material';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import styles from './Profile.module.css'
import { useLocation } from 'react-router-dom'
import { useProfilePageContext } from '../../providers/profileContext';

const Profile = ({ content }) => {

    const profileContext = useProfilePageContext();
    const { selectedPage, updatePage } = profileContext
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })
    const [showMenu, setShowMenu] = useState(true);

    useEffect(() => {

        if (isTabletOrMobile) {
            updatePage(null)
        }
        setShowMenu(true)

    }, [isTabletOrMobile])

    useEffect(() => {

        if (!selectedPage && isTabletOrMobile) {
            setShowMenu(true)
        } else if (selectedPage && isTabletOrMobile) {
            setShowMenu(false);
        }
    }, [selectedPage])

    const handleMenuChange = (page) => {
        updatePage(page);
    }

    const handleBackButton = () => {
        setShowMenu(true)
        updatePage(null);

    }

    //handleChange={handleMenuChange}
    return (
        <div className={styles.profileWrapper}>
            {showMenu && <div className={styles.menuSection}>
                <ProfileMenu title={"Моят Профил"} selected={selectedPage} />
            </div>}
            <div className={styles.generalProfileSection}>
                {!showMenu &&
                    <div className={styles.labelContainer}>
                        <Button onClick={handleBackButton} style={{ minWidth: '30px' }}>{'<'}</Button>
                        <span>{selectedPage?.label}</span>
                    </div>}
                {selectedPage?.component}
            </div>
        </div>
    )
}

export default Profile;