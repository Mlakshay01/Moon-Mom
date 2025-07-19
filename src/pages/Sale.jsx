import { useState, useEffect } from 'react';
import styles from '../styles/Shop.module.css'; // Reuse Shop styles
import Header from '../components/Header';
import initialProducts from '../data/products';
import { useCart } from '../context/CartContext';

export default function Sale() {
  const [products, setProducts] = useState([]);
  const [addedIds, setAddedIds] = useState([]);
  const { cartItems, addItem } = useCart();

  useEffect(() => {
    const saleItems = initialProducts.filter(p => p.label === 'SALE');
    setProducts(saleItems);
  }, []);

  const addToCart = (e, product) => {
    if (addedIds.includes(product.id)) return;
    addItem(product);
    setAddedIds(prev => [...prev, product.id]);

    const icon = document.createElement('div');
    icon.innerHTML = '🛒';
    icon.className = styles.cartAnimation;
    icon.style.left = e.clientX + 'px';
    icon.style.top = e.clientY + 'px';
    document.body.appendChild(icon);
    setTimeout(() => document.body.removeChild(icon), 1000);

    setTimeout(() => {
      setAddedIds(prev => prev.filter(pid => pid !== product.id));
    }, 2000);
  };

  return (
    <main className={styles.shop}>
      <Header />
      <section className="container">
        <section className={styles.pageTitle}>
          <h1>🔥 Sale! Huge Discounts 🔥</h1>
          <p>Grab {products.length} amazing deals now!</p>
        </section>

        <section className={styles.productsGrid}>
          {products.map((p, i) => {
            const cartClass = `btn-cart-${(i % 4) + 1}`;
            const wishlistClass = `btn-wishlist-${(i % 4) + 1}`;

            return (
              <div key={p.id} className={styles.productCard}>
                <div className={styles.saleBadge}>SALE!</div>
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
                      onClick={(e) => addToCart(e, p)}
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
          <span className={styles.cartCount}>{cartItems.length}</span>
        </div>
      </section>
    </main>
  );
}
