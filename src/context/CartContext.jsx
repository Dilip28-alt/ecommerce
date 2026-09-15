import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredCart, setStoredCart } from '../utils/localStorage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = getStoredCart();
    setCartItems(stored);
  }, []);

  const saveCartState = (newCart) => {
    setCartItems(newCart);
    setStoredCart(newCart);
  };

  const addToCart = (product, quantity = 1) => {
    const existingIndex = cartItems.findIndex(item => item.product.id === product.id);
    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cartItems, { product, quantity }];
    }
    saveCartState(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.product.id !== productId);
    saveCartState(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updatedCart = cartItems.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    saveCartState(updatedCart);
  };

  const clearCart = () => {
    saveCartState([]);
  };

  // Total item count across all quantities
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Total price sum
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
