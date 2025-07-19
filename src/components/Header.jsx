import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Header.module.css';

export default function Header() {
  const location = useLocation(); // 👈 Get current path

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/">
          <div className={styles.logo}>
            <img src="/moon_and_moms_logo.png" alt="Moon & Mom logo" />
            <span>Moon & Mom</span>
          </div>
        </Link>

        <div className={styles.navButtons}>
          {/* ✅ Show Home button only if not on homepage */}
          {location.pathname !== '/' && (
            <Link to="/">
              <button className={`${styles.btn} ${styles.btnPink}`}>Home</button>
            </Link>
          )}

          <Link to="/shop">
            <button className={`${styles.btn} ${styles.btnPrimary}`}>Shop</button>
          </Link>
          <Link to="/sale">
            <button className={`${styles.btn} ${styles.btnSecondary}`}>Sale</button>
          </Link>
          <Link to="/new">
            <button className={`${styles.btn} ${styles.btnAccent}`}>New</button>
          </Link>
          <Link to="/account">
            <button className={`${styles.btn} ${styles.btnSuccess}`}>Account</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
