"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product with same id & color already exists
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor?.name === product.selectedColor?.name
      );

      if (existingItemIndex !== -1) {
        // Increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }

      // Add new product
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, colorName) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.id === id && item.selectedColor?.name === colorName)
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartProvider");
  return context;
};
