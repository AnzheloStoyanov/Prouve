import { useState, useContext } from 'react'
import Card from "../Card/Card"
import CardItem from "../CardItem/CardItem"
import { pages } from "../../core/profile-menu"
import { AuthContext } from '../../auth/AuthWrapper'
import { useNavigate } from 'react-router-dom'
import { useProfilePageContext } from '../../providers/profileContext'
import LogOutIcon from '../../assets/images/log-out-icon.png'
import { isMobileContext } from '../../providers/isMobileContext';
import Divider from '../common/Divider/Divider'
import styles from './ProfileMenu.module.css'

const ProfileMenu = ({ title = 'Моят профил', selected, handleChange, hasLogoutButton = false }) => {

    const context = useContext(isMobileContext);
    const { isMobile } = context;

    const authContext = useContext(AuthContext);
    const { logout } = authContext

    const profileContext = useProfilePageContext();
    const { updatePage } = profileContext

    const navigate = useNavigate();

    const handleOnChange = (page) => {
        updatePage(page);
        handleChange()
        navigate('/profile')
    }

    return (
        <Card title={title}>
            {pages.map((page, i) => {
                return (<CardItem
                    key={i}
                    selected={selected?.label === page.label}
                    text={page.label}
                    imagePath={page.icon}
                    onClick={() => handleOnChange(page)}>
                </CardItem>
                )
            })
            }
            {hasLogoutButton &&
                <>{!isMobile && <Divider style={{ margin: '0', padding: '0' }} />}
                    <div className={!isMobile ? styles.logoutSection : ''}>
                        <CardItem
                            key={pages.length + 1}
                            text={'Изход'}
                            imagePath={LogOutIcon}
                            onClick={logout}
                        >
                        </CardItem>
                    </ div>
                </>}
        </Card>
    )
}

export default ProfileMenu