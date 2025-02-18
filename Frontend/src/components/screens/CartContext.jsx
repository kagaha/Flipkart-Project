import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import React from "react";

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count from backend on load
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/cart");
        setCartCount(res.data.CartDatas.length);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCartData();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use CartContext
export const useCart = () => useContext(CartContext);
