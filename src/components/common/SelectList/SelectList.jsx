import styles from './SelectList.module.css'

const SelectList = ({ className, onChange, options, style, label, name }) => {

    return (
        <div className={className ? styles[className] : styles.selectListWrapper}>
            {label && <label htmlFor='input-field'>{label}</label>}
            <select onChange={onChange} style={style} name={name}>
                <option value='' disabled selected></option>
                {options.map((option) => {
                    return (
                        <option
                            key={option.id}
                            value={option.id}
                            // selected={option.id === 1}
                        >
                            {option.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default SelectList