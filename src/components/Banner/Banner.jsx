import styles from './Banner.module.css';

const Banner = ({ children, path }) => {
  return <>
    <div className={styles.wrapper} style={{ backgroundImage: `url("${path}"` }}>
      <div>
        {children}
      </div>
    </div>
  </>
};

export default Banner;
