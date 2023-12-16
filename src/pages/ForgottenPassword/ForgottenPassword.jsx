import { AuthContainer } from '../../components/AuthContainer/AuthContainer'
import ForgottenPasswordForm from '../../components/ForgottenPasswordForm/ForgottenPasswordForm'
import PasswordReset from '../../components/PasswordReset/PasswordReset'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { localStorageService } from '../../services'
import styles from './ForgottenPassword.module.css'

const ForgottenPassword = () => {

    const showForm = window.location.pathname.endsWith('forgotten-password')
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorageService.getUser();

        if (user && user.isAuthenticated) {
            navigate('/profile')
        }
    }, [])

    return (
        <AuthContainer>
            <div className={styles.mainSection}>
                {showForm
                    ? <ForgottenPasswordForm />
                    : <PasswordReset />
                }
            </div>
        </AuthContainer>
    )
}

export default ForgottenPassword;