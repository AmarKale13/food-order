
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(item, qty = 1) {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      } else {
        return [...prev, { ...item, quantity: qty }];
      }
    });
  }

  function updateItemQty(id, qty) {
    setItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, quantity: qty } : i))
        .filter(i => i.quantity > 0) 
    );
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  // Clear the whole cart
  function clearCart() {
    setItems([]);
  }

  function getTotalCount() {
    return items.reduce((sum, i) => sum + i.quantity, 0);
  }

  function getTotalPrice() {
    return items
      .reduce((sum, i) => sum + i.price * i.quantity, 0)
      .toFixed(2);
  }

  const value = {
    items,
    addItem,
    updateItemQty,
    removeItem,
    clearCart,
    getTotalCount,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
