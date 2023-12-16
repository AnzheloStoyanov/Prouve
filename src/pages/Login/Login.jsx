import { AuthContainer } from '../../components/AuthContainer/AuthContainer'
import { LogInForm } from '../../components/LogInForm/LogInForm'
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm'
import Divider from '../../components/common/Divider/Divider'
import Button from '../../components/common/Button/Button'
import Instructions from '../../components/common/Instructions/Instructions'
import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { localStorageService } from '../../services'

const Login = () => {

    const login = window.location.pathname.endsWith('login');
    const navigate = useNavigate();

    useEffect(() => {

        const user = localStorageService.getUser();

        if (user && user.isAuthenticated) {
            navigate('/store')
        }
    }, [])

    return (
        <AuthContainer>
            <div className={login ? styles.contentWrapperSmall : styles.contentWrapperLarge}>
                <Instructions
                    header={'Здравей!'}
                    instructions={'Моля, въведи информация в следващите полета.'}
                />
                <div className={styles.buttonContainer}>
                    <Link to='/login'>
                        <Button
                            style={{ width: '50%', borderRadius: '22px' }}
                            className={login ? 'simpleButtonLight' : 'simpleButtonInactive'}
                        >
                            Вход
                        </Button>
                    </Link>
                    <Link to='/register'>
                        <Button
                            style={{ width: '50%', borderRadius: '22px' }}
                            className={!login ? 'simpleButtonLight' : 'simpleButtonInactive'}
                        >
                            Регистрация
                        </Button>
                    </Link>
                </div>
                <Button
                    className='outlinedButton'
                    style={{ marginTop: '40px' }}
                >
                    Вход с Google
                </Button>
                <Divider>{login ? 'вход' : 'регистрация'} с имейл</Divider>
                {login
                    ? <LogInForm />
                    : <RegistrationForm />}
                {login
                    ? (<span className={styles.switchSection}>Нямаш акаунт?
                        <Link to='/register'>
                            <Button className='textButton'> Регистрирай се
                            </Button>
                        </Link>
                    </span>)
                    : (<span className={styles.switchSection}>Вече имаш акаунт?
                        <Link to='/login'>
                            <Button className='textButton'>Вход
                            </Button>
                        </Link>
                    </span>)}
            </div>
        </AuthContainer>
    )
}

export default Login;