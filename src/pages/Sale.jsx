import { useState, useEffect } from 'react';
import styles from '../styles/Shop.module.css';
import cartStyles from '../styles/Cart.module.css';
import Header from '../components/Header';
import initialProducts from '../data/products';
import { useCart } from '../context/CartContext';

export default function Sale() {
  const [products, setProducts] = useState([]);
  const [addedIds, setAddedIds] = useState([]);
  const { cartItems, addItem, removeItem, updateQuantity } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const saleItems = initialProducts.filter(p => p.label === 'SALE');
    setProducts(saleItems);
  }, []);

  const addToCart = (e, product) => {
    const selectedSize = selectedSizes[product.id] || '';
    if (product.sizes?.length && !selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }

    const itemToAdd = {
      ...product,
      selectedSize
    };

    const uniqueId = product.id + selectedSize;
    if (addedIds.includes(uniqueId)) return;

    addItem(itemToAdd);
    setAddedIds(prev => [...prev, uniqueId]);

    const icon = document.createElement('div');
    icon.innerHTML = '🛒';
    icon.className = styles.cartAnimation;
    icon.style.left = e.clientX + 'px';
    icon.style.top = e.clientY + 'px';
    document.body.appendChild(icon);
    setTimeout(() => document.body.removeChild(icon), 1000);

    setTimeout(() => {
      setAddedIds(prev => prev.filter(pid => pid !== uniqueId));
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
                <div className={styles.productImage}>
                  {p.image ? <img src={p.image} alt={p.name} /> : p.emoji}
                </div>
                <div className={styles.productInfo}>
                  <h3>{p.name}</h3>
                  <div className={styles.productPrice}>${p.price}</div>
                  <div className={styles.productSizes}>
                    {p.sizes.map(sz => (
                      <button
                        key={sz}
                        className={`${styles.sizeBtn} ${selectedSizes[p.id] === sz ? styles.active : ''}`}
                        onClick={() =>
                          setSelectedSizes(prev => ({ ...prev, [p.id]: sz }))
                        }
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                  <div className={styles.productActions}>
                    <button
                      className={`btn ${styles.addToCart} ${styles[cartClass]} ${addedIds.includes(p.id + selectedSizes[p.id]) ? styles.added : ''}`}
                      onClick={(e) => addToCart(e, p)}
                    >
                      {addedIds.includes(p.id + selectedSizes[p.id])
                        ? '✔️ Added'
                        : 'Add to Cart 🛒'}
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
      </section>

      {/* 🛒 Cart Toggle Button */}
      <div className={cartStyles.cartToggle} onClick={() => setIsCartOpen(!isCartOpen)}>
        🛒 ({cartItems.length})
      </div>

      {/* 🧺 Cart Popup */}
      {isCartOpen && (
        <div className={cartStyles.cartPopup}>
          <h3>🛍️ Your Cart</h3>
          <ul>
            {cartItems.map((item, i) => (
              <li key={i} className={cartStyles.cartItem}>
                <button
                  className={cartStyles.removeBtn}
                  onClick={() => removeItem(item.id, item.selectedSize)}
                >
                  ❌
                </button>
                <img
                  src={item.image || '/categories/placeholder.jpg'}
                  alt={item.name}
                  className={cartStyles.cartItemImg}
                />
                <div>
                  <span>{item.name}</span><br />
                  {item.selectedSize && <small>Size: {item.selectedSize}</small>}<br />
                  <b>${item.price}</b>
                  <div className={cartStyles.qtyControls}>
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedSize)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}>+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {cartItems.length > 0 && (
            <button className={cartStyles.checkoutBtn}>✅ Checkout Now</button>
          )}
        </div>
      )}
    </main>
  );
}
