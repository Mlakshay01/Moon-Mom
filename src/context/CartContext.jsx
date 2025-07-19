import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => {
  setCartItems((prev) => {
    const exists = prev.find(p => p.id === item.id && p.selectedSize === item.selectedSize);
    if (exists) {
      return prev.map(p =>
        p.id === item.id && p.selectedSize === item.selectedSize
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    } else {
      return [...prev, { ...item, quantity: 1 }];
    }
  });
};

const removeItem = (id, selectedSize) => {
  setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === selectedSize)));
};

const updateQuantity = (id, qty, selectedSize) => {
  setCartItems(prev =>
    prev.map(item =>
      item.id === id && item.selectedSize === selectedSize
        ? { ...item, quantity: Number(qty) }
        : item
    )
  );
};



  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
