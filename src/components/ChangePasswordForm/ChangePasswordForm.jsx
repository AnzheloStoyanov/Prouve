import Button from "../common/Button/Button"
import InputField from "../common/InputField/InputField"
import { useState } from "react"
import styles from './ChangePasswordForm.module.css'

const ChangePassword = () => {

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordConfirmed, setPasswordConfirmed] = useState(false);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handlePasswordChange = (e) => {
        const { value } = e.target;

        setPasswordValid(passwordRegex.test(value));
        setPassword(value);
    };

    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setPasswordConfirmed(value === password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //return login(inputValue.email, inputValue.password);
    }

    return (
        <>
            <form className={styles.passwordChangeForm} onSubmit={handleSubmit}>
                <InputField
                    type='password'
                    value={password}
                    placeholder='парола'
                    label='Парола'
                    name='password'
                    onChange={handlePasswordChange}
                />
                <InputField
                    type='password'
                    placeholder='потвърди паролата'
                    label='Потвърди паролата'
                    name='confirm-password'
                    onChange={handleConfirmPasswordChange}
                    disabled={!passwordValid}
                />
                <Button
                    className='simpleButtonDark'
                    style={{ width: '100%', marginTop: '32px' }}
                    disabled={!passwordValid || !passwordConfirmed}
                >
                    Промени паролата
                </Button>
            </form>
        </>
    )
}

export default ChangePassword