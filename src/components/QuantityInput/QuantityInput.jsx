import styles from './QuantityInput.module.css';
import { useEffect, useState } from 'react';

const QuantityInput = ({ initValue, onChange }) => {
  const [value, setValue] = useState(initValue || 1);
  const max = 999;
  const min = 1;

  useEffect(() => {
    onChange(value);
  }, [])

  const add = () => {
    const newValue = +value + 1;
    if (newValue > max) {
      return;
    }
    setValue(newValue);
    onChange(newValue);
  };

  const sub = () => {
    const newValue = +value - 1;
    if (newValue < min) {
      return;
    }
    setValue(newValue);
    onChange(newValue);
  };

  const changeValue = (newValue) => {
    if (newValue > max || newValue < min) {
      return;
    }
    setValue(+newValue);
    onChange(+newValue);
  }

  return <div className={styles.QuantityInput}>
    <div className={styles.btn} onClick={sub}>-</div>
    <div><input type="number" min="1" max="100" value={value} onChange={e => changeValue(e.target.value)} /></div>
    <div className={styles.btn} onClick={add}>+</div>
  </div>
};

export default QuantityInput;
