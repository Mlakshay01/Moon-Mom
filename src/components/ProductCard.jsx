import styles from '../styles/ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <img src={product.img} alt={product.name} className={styles.image} />
      <h3>{product.name}</h3>
      <p className={styles.price}>₹{product.price}</p>
      <button className={styles.buyBtn}>Buy Now</button>
    </div>
  );
}
