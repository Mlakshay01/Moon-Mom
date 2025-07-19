import { useCart } from '../context/CartContext';
import cartStyles from '../styles/Cart.module.css';
import { useState } from 'react';

export default function Cart() {
  const { cartItems, removeItem, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <div className={cartStyles.cartToggle} onClick={() => setIsCartOpen(!isCartOpen)}>
        🛒 ({cartItems.length})
      </div>

      {isCartOpen && (
        <div className={cartStyles.cartPopup}>
          <h3>🛍️ Your Cart</h3>

          {cartItems.length === 0 ? (
            <p>No items yet!</p>
          ) : (
            <ul className={cartStyles.cartList}>
              {cartItems.map((item, i) => (
                <li key={`${item.id}-${item.selectedSize || 'default'}`} className={cartStyles.cartItem}>
                  <button
                    className={cartStyles.removeBtn}
                    onClick={() => removeItem(item.id, item.selectedSize)}
                    aria-label="Remove item"
                  >
                    ❌
                  </button>

                  <img src={item.image} alt={item.name} className={cartStyles.itemImage} />

                  <div className={cartStyles.itemDetails}>
                    <div className={cartStyles.itemName}>{item.name}</div>
                    <div className={cartStyles.itemPrice}>${item.price}</div>

                    {item.selectedSize && (
                      <div style={{ fontSize: '13px', marginTop: '4px', color: '#444' }}>
                        Size: <strong>{item.selectedSize}</strong>
                      </div>
                    )}

                    <div className={cartStyles.qtyControls}>
                      <button
                        onClick={() => {
                          if (item.quantity > 1)
                            updateQuantity(item.id, item.selectedSize, item.quantity - 1);
                        }}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {cartItems.length > 0 && (
            <button className={cartStyles.checkoutBtn}>
              ✅ Checkout Now
            </button>
          )}
        </div>
      )}
    </>
  );
}
