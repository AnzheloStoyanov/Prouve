import Button from '../../components/common/Button/Button'
import InputField from '../../components/common/InputField/InputField'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import styles from './ForgottenPasswordForm.module.css'
import { AuthContext } from '../../auth/AuthWrapper'


const ForgottenPasswordForm = () => {

    const [email, setEmail] = useState('');
    const context = useContext(AuthContext);
    const { isPasswordForgotten } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if(!isPasswordForgotten) {
            navigate('/login')
        }
    },[])

    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/password-reset')
    }

    return (
        <>
            <span className={styles.registerLink}>Нямаш акаунт?
                <Link to='/register'>
                    <Button className='textButton'> Регистрирай се
                    </Button>
                </Link>
            </span>
            <span className={styles.header}>Забрави паролата си?</span>
            <span className={styles.instructions}>Моля, въведи имейла, който си използвал/а при регистрация и ние ще ти изпратим линк, за да промениш паролата си.</span>
            <form>
                <InputField
                    type='text'
                    value={email}
                    placeholder='имейл'
                    label='Имейл'
                    name='email'
                    onChange={handleChange}
                />
                <Button
                    className='simpleButtonDark'
                    style={{ width: '100%', marginTop: '32px' }}
                    onClick={handleSubmit}
                    disabled={email == ''}
                >
                    Промени паролата
                </Button>
            </form>
            <span className={styles.registerLink}>Обратно към
                <Link to='/login'>
                    <Button className='textButton'> Вход
                    </Button>
                </Link>
            </span>
        </>
    )
}


export default ForgottenPasswordForm