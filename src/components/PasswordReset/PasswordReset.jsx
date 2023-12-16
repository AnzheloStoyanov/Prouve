import Button from '../../components/common/Button/Button'
import LinkButton from '../../components/common/LinkButton/LinkButton'
import Instructions from '../common/Instructions/Instructions'
import { Link } from 'react-router-dom'
import Divider from '../common/Divider/Divider'
import styles from './PasswordReset.module.css'

const PasswordReset = () => {
    return (<>
        <Instructions
            header={'Забрави паролата си?'}
            instructions={'Моля, провери имейла си и кликни върху линка, който сме ти изпратили, за да промениш паролата си.'}
        />
        <span className={styles.registerLink}>{'Обратно към '}
            <LinkButton to='/login' className='textButton'>
                Вход
            </LinkButton>
        </span>
        <Divider style={{ margin: '22px 0' }}>или</Divider>
        <Link to='/login' style={{ width: '100%' }}>
            <Button className='simpleButtonDark' style={{ width: '100%' }}>
                Към магазина
            </Button>
        </Link >
    </>
    )
}

export default PasswordReset