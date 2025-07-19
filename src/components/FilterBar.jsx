import styles from '../styles/Shop.module.css';

export default function FilterBar({ gender, setGender, category, setCategory }) {
  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <button className={`${styles.btn} ${gender === 'all' && styles.active}`} onClick={() => setGender('all')}>All</button>
        <button className={`${styles.btn} ${gender === 'boys' && styles.active}`} onClick={() => setGender('boys')}>👦 Boys</button>
        <button className={`${styles.btn} ${gender === 'girls' && styles.active}`} onClick={() => setGender('girls')}>👧 Girls</button>
        <button className={`${styles.btn} ${gender === 'babies' && styles.active}`} onClick={() => setGender('babies')}>👶 Babies</button>
      </div>
      <div className={styles.filterGroup}>
        <button className={`${styles.btn} ${category === 'all' && styles.active}`} onClick={() => setCategory('all')}>All</button>
        <button className={`${styles.btn} ${category === 'tops' && styles.active}`} onClick={() => setCategory('tops')}>👕 Tops</button>
        <button className={`${styles.btn} ${category === 'jeans' && styles.active}`} onClick={() => setCategory('jeans')}>👖 Jeans</button>
        <button className={`${styles.btn} ${category === 'dresses' && styles.active}`} onClick={() => setCategory('dresses')}>👗 Dresses</button>
        <button className={`${styles.btn} ${category === 'jackets' && styles.active}`} onClick={() => setCategory('jackets')}>🧥 Jackets</button>
        <button className={`${styles.btn} ${category === 'shoes' && styles.active}`} onClick={() => setCategory('shoes')}>👟 Shoes</button>
      </div>
    </div>
  );
}
