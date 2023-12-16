import styles from './Button.module.css'

const Button = ({ children, style, onClick, className, disabled, type }) => {
  return (
    <button
      type={type ?? 'button'}
      className={className ? styles[className] : styles.simpleButtonLight}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;