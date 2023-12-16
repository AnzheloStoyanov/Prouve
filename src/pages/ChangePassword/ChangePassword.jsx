import { AuthContainer } from '../../components/AuthContainer/AuthContainer'
import Instructions from '../../components/common/Instructions/Instructions'
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { localStorageService } from '../../services'
import styles from './ChangePassword.module.css'

const ChangePassword = () => {

    const navigate = useNavigate();
    useEffect(() => {

        const user = localStorageService.getUser();

        if (user && user.isAuthenticated) {
            navigate('/profile')
        }
    }, [])
    return (
        <AuthContainer>
            <div className={styles.mainContent}>
                <Instructions
                    header={'промяна на паролата'}
                    instructions={'Моля, въведете новата си паролата.'}
                />
                <ChangePasswordForm />
            </div>
        </AuthContainer>
    )
}

export default ChangePassword;