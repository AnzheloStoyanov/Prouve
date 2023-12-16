import Button from '../Button/Button'
import { Link } from 'react-router-dom'

const LinkButton = ({ link, children, className, style }) => {
    return (
        <Link to={link} style={style}>
            <Button className={className ? className : 'simpleButtonDark'}>
                {children}
            </Button>
        </Link >
    )
}

export default LinkButton