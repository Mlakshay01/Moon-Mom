import { useState, useEffect, useMemo } from 'react';
import styles from '../styles/Shop.module.css';
import cartStyles from '../styles/Cart.module.css';
import Header from '../components/Header';
import initialProducts from '../data/products';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const [sortMode, setSortMode] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const { cartItems, addItem, removeItem, updateQuantity } = useCart();
  const [addedIds, setAddedIds] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  const initialAge = searchParams.get('age') || 'all';

  const [filterCat, setFilterCat] = useState(initialCat);
  const [filterAge, setFilterAge] = useState(initialAge);

  // selectedSizes[product.id] = size string
  const [selectedSizes, setSelectedSizes] = useState({});
  const colorClasses = [
    styles.btnPrimary, styles.btnSecondary, styles.btnAccent,
    styles.btnSuccess, styles.btnWarning, styles.btnPurple, styles.btnPink
  ];

  const ageButtonColors = useMemo(() =>
    ['all', 'boys', 'girls', 'babies', 'toddlers'].map(() =>
      colorClasses[Math.floor(Math.random() * colorClasses.length)]
    ), []);

  const categoryButtonColors = useMemo(() =>
    ['tops', 'bottoms', 'dresses', 'shoes', 'accessories'].map(() =>
      colorClasses[Math.floor(Math.random() * colorClasses.length)]
    ), []);

  const sortButtonColors = useMemo(() =>
    ['price-low', 'price-high', 'newest', 'popular'].map(() =>
      colorClasses[Math.floor(Math.random() * colorClasses.length)]
    ), []);

  useEffect(() => {
    let list = [...initialProducts];
    list = list.filter(p =>
      (filterAge === 'all' || p.age === filterAge) &&
      (filterCat === 'all' || p.category === filterCat)
    );
    if (sortMode === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sortMode === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sortMode === 'newest') list.sort((a, b) => (b.label === 'NEW') - (a.label === 'NEW'));
    else if (sortMode === 'popular') list.sort(() => Math.random() - 0.5);
    setProducts(list);
  }, [filterAge, filterCat, sortMode]);

  const addToCart = (e, product) => {
  const selectedSize = selectedSizes[product.id] || "";
  if (product.sizes?.length && !selectedSize) {
    alert("Please select a size before adding to cart.");
    return;
  }

  const itemToAdd = {
    ...product,
    selectedSize
  };

  if (addedIds.includes(product.id + selectedSize)) return;

  addItem(itemToAdd);
  setAddedIds(prev => [...prev, product.id + selectedSize]);

  const icon = document.createElement('div');
  icon.innerHTML = '🛒';
  icon.className = styles.cartAnimation;
  icon.style.left = e.clientX + 'px';
  icon.style.top = e.clientY + 'px';
  document.body.appendChild(icon);
  setTimeout(() => document.body.removeChild(icon), 1000);

  setTimeout(() => {
    setAddedIds(prev => prev.filter(pid => pid !== product.id + selectedSize));
  }, 2000);
};


  const handleLoadMore = () => {
    setLoadingMore(true);
    const btn = document.querySelector(`.${styles.loadMoreBtn}`);
    if (btn) {
      btn.textContent = 'Loading...';
      btn.classList.add(styles.spinTwiceControlled);
    }

    setTimeout(() => {
      const newItems = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        age: ['girls', 'boys', 'babies'][Math.floor(Math.random() * 3)],
        category: ['tops', 'bottoms', 'dresses', 'shoes', 'accessories'][Math.floor(Math.random() * 5)],
        label: Math.random() > 0.5 ? 'NEW' : '',
        image: '/categories/placeholder.jpg',
        name: `Item ${Date.now() + i}`,
        price: Number((Math.random() * 50 + 10).toFixed(2)),
        sizes: ['S', 'M', 'L']
      }));

      setProducts(p => [...p, ...newItems]);
      setLoadingMore(false);

      if (btn) {
        btn.textContent = '🌟 Load More Amazing Items! 🌟';
        btn.classList.remove(styles.spinTwiceControlled);
        const rect = btn.getBoundingClientRect();
        const sparkle = document.createElement('div');
        sparkle.className = styles.sparkle;
        sparkle.textContent = '✨✨✨';
        sparkle.style.left = `${rect.left + rect.width / 2}px`;
        sparkle.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`;
        sparkle.style.position = 'absolute';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
      }
    }, 2000);
  };

  return (
    <main className={styles.shop}>
      <Header />
      <section className="container">
        {/* Decorations */}
        <div className={styles.floatingElements}>
          <div className={styles.floatingStar}>⭐</div>
          <div className={styles.floatingStar}>✨</div>
          <div className={styles.floatingStar}>🌟</div>
          <div className={styles.floatingStar}>🛍️</div>
        </div>

        {/* Title */}
        <section className={styles.pageTitle}>
          <h1>🛍️ Shop Amazing Kids Clothes! 🛍️</h1>
          <p>Over {products.length} super cool items waiting for you!</p>
        </section>

        {/* Filters */}
        <section className={styles.filtersSection}>
          <div className={styles.filterRow}>
            {['all', 'boys', 'girls', 'babies', 'toddlers'].map((f, i) => (
              <button
                key={f}
                className={`${styles.filterBtn} ${ageButtonColors[i]} ${filterAge === f ? styles.active : ''}`}
                onClick={() => setFilterAge(f)}
              >
                {f === 'all' ? 'All Items 🌟' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className={styles.filterRow}>
            {['tops', 'bottoms', 'dresses', 'shoes', 'accessories'].map((f, i) => (
              <button
                key={f}
                className={`${styles.filterBtn} ${categoryButtonColors[i]} ${filterCat === f ? styles.active : ''}`}
                onClick={() => setFilterCat(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className={styles.sortSection}>
            {[{ mode: 'price-low', label: 'Low→High' }, { mode: 'price-high', label: 'High→Low' },
              { mode: 'newest', label: 'Newest' }, { mode: 'popular', label: 'Popular' }]
              .map((s, i) => (
                <button
                  key={s.mode}
                  className={`btn ${styles.sortButton} ${sortMode === s.mode ? styles.sortButtonActive : ''} ${sortButtonColors[i]}`}
                  onClick={() => setSortMode(s.mode)}
                >
                  {s.label}
                </button>
              ))}
          </div>
        </section>

        {/* Products */}
        <section className={styles.productsGrid}>
          {products.map((p, i) => {
            const cartClass = `btn-cart-${(i % 4) + 1}`;
            const wishlistClass = `btn-wishlist-${(i % 4) + 1}`;
            return (
              <div key={p.id} className={styles.productCard}>
                {p.label === 'SALE' && <div className={styles.saleBadge}>SALE!</div>}
                {p.label === 'NEW' && <div className={styles.newBadge}>NEW!</div>}
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
      onClick={() => {
        setSelectedSizes(prev => ({ ...prev, [p.id]: sz }));
      }}
    >
      {sz}
    </button>
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

        {/* Load More */}
        <section className={styles.loadMore}>
          <button
            className={`btn ${styles.loadMoreBtn} ${styles.btnPrimary}`}
            onClick={handleLoadMore}
          >
            {loadingMore ? '⏳ Loading...' : '🌟 Load More Amazing Items! 🌟'}
          </button>
        </section>
      </section>

      {/* Cart Button + Popup */}
      <div className={cartStyles.cartToggle} onClick={() => setIsCartOpen(!isCartOpen)}>
        🛒 ({cartItems.length})
      </div>

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
                <img src={item.image || '/categories/placeholder.jpg'} alt={item.name} className={cartStyles.cartItemImg} />
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
