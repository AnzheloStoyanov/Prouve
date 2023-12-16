import styles from './InputField.module.css'

const InputField = ({ value, label, name, placeholder, type, onChange, className, style, disabled, defaultChecked }) => (

  < div className={className ? styles[className] : styles.formGroup} style={style} >
    {label && <label htmlFor='input-field'>{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className='form-control'
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      defaultChecked={defaultChecked}
    />
  </div >
);


export default InputField