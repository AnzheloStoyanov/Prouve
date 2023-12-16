import React, { createContext, useState, useContext, useEffect } from 'react';
import { localStorageService } from '../services';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(localStorageService.getCart() || []);
  }, []);

  const setCartProxy = (updatedCart) => {
    localStorageService.saveCart(updatedCart);
    setCart(updatedCart);
  };

  const addToCart = (id, quantity = 1, replace = false) => {
    id = id.toString();
    const index = cart.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1) {
      const updatedCart = [...cart];
      if (replace) {
        updatedCart[index].quantity = quantity;
      } else {
        updatedCart[index].quantity += quantity;
      }

      setCartProxy(updatedCart);
    } else {

      setCartProxy([...cart, { id, quantity }]);
    }

    console.log("Added to cart:" + id, cart);
  };

  const removeFromCart = (id) => {
    id = id.toString();
    const updatedCart = cart.filter((item) => item.id !== id);

    setCartProxy(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };