import { useState, useContext } from "react";
import InputField from '../common/InputField/InputField'
import Button from "../common/Button/Button";
import styles from './LogInForm.module.css'
import { AuthContext } from "src/auth/AuthWrapper";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const LogInForm = () => {

    const [inputValue, setInputValue] = useState({ email: "", password: "", rememberMe: false });
    const { email, password, rememberMe } = inputValue;
    const t = useTranslation();
    const context = useContext(AuthContext);
    const { login, setPasswordForgotten } = context;
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: e.target.checked,
        }));
    };

    const handleForgottenPassowrdClick = (e) => {
        e.preventDefault();

        setPasswordForgotten(true);
        const href = e.target.href;
        navigate(href.substring(href.lastIndexOf('/')));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await login(inputValue.email, inputValue.password);
    }

    return (
        <form className={styles.logInForm} onSubmit={handleSubmit}>
            <InputField
                type='text'
                value={email}
                placeholder='имейл'
                label='Имейл'
                name='email'
                onChange={handleChange}
            />
            <InputField
                type='password'
                value={password}
                placeholder='парола'
                label='Парола'
                name='password'
                onChange={handleChange}
            />
            <div className={styles.forgotPassword}>
                <a href='/forgotten-password' onClick={handleForgottenPassowrdClick}>Забравих си паролата</a>
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
                type={'submit'}
            >
                Вход
            </Button>
        </form>
    );
};
