import { useState, useEffect } from 'react';
import styles from '../styles/Shop.module.css'; // reuse Shop styles
import Header from '../components/Header';
import initialProducts from '../data/products';

export default function New() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [addedIds, setAddedIds] = useState([]);

  useEffect(() => {
    const newItems = initialProducts.filter(p => p.label === 'NEW');
    setProducts(newItems);
  }, []);

  const addToCart = (e, id) => {
    if (addedIds.includes(id)) return;
    setCartCount(c => c + 1);
    setAddedIds(prev => [...prev, id]);

    const icon = document.createElement('div');
    icon.innerHTML = '🛒';
    icon.className = styles.cartAnimation;
    icon.style.left = e.clientX + 'px';
    icon.style.top = e.clientY + 'px';
    document.body.appendChild(icon);
    setTimeout(() => document.body.removeChild(icon), 1000);

    setTimeout(() => {
      setAddedIds(prev => prev.filter(pid => pid !== id));
    }, 2000);
  };

  return (
    <main className={styles.shop}>
      <Header />
      <section className="container">
        <section className={styles.pageTitle}>
          <h1>🌟 Just Arrived!</h1>
          <p>Check out {products.length} brand new arrivals!</p>
        </section>

        <section className={styles.productsGrid}>
          {products.map((p, i) => {
            const cartClass = `btn-cart-${(i % 4) + 1}`;
            const wishlistClass = `btn-wishlist-${(i % 4) + 1}`;

            return (
              <div key={p.id} className={styles.productCard}>
                <div className={styles.newBadge}>NEW!</div>
                <div className={styles.productImage}>{p.emoji}</div>
                <div className={styles.productInfo}>
                  <h3>{p.name}</h3>
                  <div className={styles.productPrice}>${p.price}</div>
                  <div className={styles.productSizes}>
                    {p.sizes.map(sz => (
                      <button key={sz} className={styles.sizeBtn}>{sz}</button>
                    ))}
                  </div>
                  <div className={styles.productActions}>
                    <button
                      className={`btn ${styles.addToCart} ${styles[cartClass]} ${addedIds.includes(p.id) ? styles.added : ''}`}
                      onClick={(e) => addToCart(e, p.id)}
                    >
                      {addedIds.includes(p.id) ? '✔️ Added' : 'Add to Cart 🛒'}
                    </button>
                    <button
                      className={`btn ${styles.wishlistBtn} ${styles[wishlistClass]}`}
                      onClick={e => {
                        const isLiked = e.currentTarget.textContent === '❤️';
                        e.currentTarget.textContent = isLiked ? '💔' : '❤️';
                        e.currentTarget.classList.toggle(styles.wishlistBtnGrey);
                      }}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div className={styles.cartInfo}>
          <span>🛒 Cart:</span>
          <span className={styles.cartCount}>{cartCount}</span>
        </div>
      </section>
    </main>
  );
}
