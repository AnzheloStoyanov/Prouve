import { useState, useContext } from "react";
import InputField from '../common/InputField/InputField'
import Button from "../common/Button/Button";
import { AuthContext } from "src/auth/AuthWrapper";
import { toast } from "react-toastify";
import styles from './RegistrationForm.module.css'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const RegistrationForm = () => {

    const context = useContext(AuthContext);
    const { t } = useTranslation();
    const { register } = context;
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({ email: "", password: "", rememberMe: false });
    const { email, password, rememberMe } = inputValue;
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordConfirmed, setPasswordConfirmed] = useState(false);
    const [consent, setConsent] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleEmailChange = (e) => {
        const { name, value } = e.target;

        setEmailValid(emailRegex.test(value));

        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;

        setSubmitted(false);
        setPasswordValid(passwordRegex.test(value));

        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;

        setSubmitted(false);
        setPasswordConfirmed(value === inputValue.password);
    };

    const handleCheckboxChange = (e) => {
        const { name } = e.target;

        if (name === 'consent') {
            setConsent(e.target.checked);

            return;
        }

        setInputValue((prev) => ({
            ...prev,
            [name]: e.target.checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (!passwordValid || !passwordConfirmed) return;

        const data = await register(inputValue.email, inputValue.password)
        if (data.status == '200') {

            toast.success('Успешна регистрация!')
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } else {
            toast.error('Неуспешна регистрация, моля опитайте отново')
            setTimeout(() => {
                navigate('/register')
            }, 2000)
        }
    }

    return (
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
            <InputField
                type='text'
                value={email}
                placeholder='имейл'
                label='Имейл'
                name='email'
                onChange={handleEmailChange}
            />
            <InputField
                className={(!passwordValid && submitted) ? 'formGroupError' : ''}
                type='password'
                value={password}
                placeholder='парола'
                label='Парола'
                name='password'
                onChange={handlePasswordChange}
            />
            {(!passwordValid && submitted) && <span className={styles.passwordError}>{t('registration.passwordError')}</span>}
            <InputField
                className={(passwordValid && !passwordConfirmed && submitted) ? 'formGroupError' : ''}
                type='password'
                placeholder='потвърди паролата'
                label='Потвърди паролата'
                name='confirm-password'
                onChange={handleConfirmPasswordChange}
            />
            {(passwordValid && !passwordConfirmed && submitted) && <span className={styles.passwordError}>{t('registration.passwordsMismatch')}</span>}
            <div className={styles.privacyPolicy}>
                <InputField
                    type='checkbox'
                    style={{ alignItems: 'start' }}
                    value={rememberMe}
                    name='consent'
                    onChange={handleCheckboxChange}
                    className='formGroupCheckbox'
                /> <span>Съгласен/съгласна съм, че предоставените от мен лични данни могат да бъдат използвани съгласно нашата <a href="#"><b><u>Политика за поверителност.</u></b></a></span>
            </div>
            <InputField
                type='checkbox'
                label='Запомни ме'
                value={rememberMe}
                name='rememberMe'
                onChange={handleCheckboxChange}
                className='formGroupCheckbox'
            />
            <Button
                className='simpleButtonDark'
                style={{ width: '100%', marginTop: '32px' }}
                // disabled={emailValid || passwordValid || !passwordConfirmed || consent}
            >
                Регистрация
            </Button>
        </form>
    );
};
