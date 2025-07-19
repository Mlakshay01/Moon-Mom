import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.buttons}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Help</button>
          <button className={`${styles.btn} ${styles.btnSecondary}`}>Shipping</button>
          <button className={`${styles.btn} ${styles.btnAccent}`}>Returns</button>
          <button className={`${styles.btn} ${styles.btnSuccess}`}>Contact</button>
          <button className={`${styles.btn} ${styles.btnWarning}`}>About</button>
        </div>
        <p>© 2025 Moon & Mom – Making childhood more colorful! 🌈</p>
      </div>
    </footer>
  );
}
