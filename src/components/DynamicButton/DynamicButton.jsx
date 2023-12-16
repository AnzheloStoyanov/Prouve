import './styles.css';
import '../../assets/css/variables.scss'
import PropTypes from 'prop-types';

const DynamicButton = ({ onClick, text, backgroundColor }) => {
  return <button onClick={onClick} className="dynamic-button" style={{backgroundColor: backgroundColor ? backgroundColor : ''}}>{text}</button>;
};

DynamicButton.propTypes = {
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string, 
};

export default DynamicButton;
