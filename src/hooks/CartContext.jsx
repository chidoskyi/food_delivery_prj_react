import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  // Generate a unique key for localStorage based on the user's uid
  const getCartKey = () => {
    const key = isAuthenticated && user?.uid ? `cartItems_${user.uid}` : 'cartItems_guest';
    
    return key;
  };

  // Initialize state as empty, then update it once authentication is resolved
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage after authentication state is resolved
  useEffect(() => {
    const key = getCartKey();
    try {
      const savedCart = localStorage.getItem(key);
      
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      
    }
  }, [isAuthenticated, user?.uid]); // Re-run when authentication state changes

  // Update localStorage whenever cart items change
  useEffect(() => {
    const key = getCartKey();
    try {
      localStorage.setItem(key, JSON.stringify(cartItems));
      
    } catch (error) {
      
    }
  }, [cartItems, isAuthenticated, user?.uid]);

  // Migrate guest cart to user cart when user logs in
  useEffect(() => {
    if (isAuthenticated && user?.uid) {
      const guestCartKey = 'cartItems_guest';
      const userCartKey = `cartItems_${user.uid}`;

     

      // Load guest cart
      const guestCart = JSON.parse(localStorage.getItem(guestCartKey) || '[]');
      

      if (guestCart.length > 0) {
        // Load user cart
        const userCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');
        

        // Check for duplicates and remove one
        const updatedCart = removeDuplicates(userCart, guestCart);
        
        // Save updated cart to user's cart
        localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
        setCartItems(updatedCart);

        // Clear guest cart
        localStorage.removeItem(guestCartKey);
        
      }
    }
  }, [isAuthenticated, user?.uid]);

  // Helper function to remove duplicates
  const removeDuplicates = (userCart, guestCart) => {
    const updatedCart = [...userCart];

    guestCart.forEach((guestItem) => {
      const existingItemIndex = updatedCart.findIndex((item) => item.id === guestItem.id);
      if (existingItemIndex !== -1) {
        // If the item already exists, remove the duplicate
        
      } else {
        // If the item doesn't exist, add it to the cart
        updatedCart.push(guestItem);
      }
    });

    return updatedCart;
  };

  const updateCart = (newCart) => {
    try {
      setCartItems(newCart);
    } catch (error) {
      
    }
  };

  const addToCart = (item) => {
    const newCart = [...cartItems];
    const existingItem = newCart.find((cartItem) => cartItem.id === item.uid);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      newCart.push({
        id: item.uid,
        quantity: 1,
        title: item.title,
        price: item.price,
        image: item.image_url || item.image,
        deliveryOptionId: '1',
      });
    }

    updateCart(newCart);
  };

  const removeFromCart = (itemId) => {
    const newCart = cartItems.filter((item) => item.id !== itemId);
    updateCart(newCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(newCart);
    
  };

  const clearCart = () => {
    updateCart([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      updateCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};