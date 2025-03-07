import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import React from "react";

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

//   // Fetch cart count from backend on load
//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const userDet = JSON.parse(localStorage.getItem("user"));
//         if (!userDet?.id) {
//           console.warn("User not logged in. Skipping cart fetch.");
//           return;
//         }
//         const res = await axios.get(`http://localhost:8000/cart/${userDet?.id}`);

//         if (!res.data.cart) {
//           setCartCount(0);
//           return;
//         }
//         console.log(res.data);
//         console.log(res.data.cartDatas);
//         console.log(res.data.cartDatas.items.length);
//         setCartCount(res.data.CartDatas.items.length);

//       } catch (err) {
//         console.error("Error fetching cart:", err);
//       }
//     };

//     fetchCartData();
//   }, []);

//   return (
//     <CartContext.Provider value={{ cartCount, setCartCount }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Hook to use CartContext
// export const useCart = () => useContext(CartContext);



useEffect(() => {
  console.log("Fetching cart data..."); // Check if this prints

  const fetchCartData = async () => {
    try {
      console.log("Inside fetchCartData function..."); // Debugging
      const userDet = JSON.parse(localStorage.getItem("user"));

      if (!userDet?.id) {
        console.warn("User not logged in. Skipping cart fetch.");
        return;
      }

      console.log("Fetching cart for user ID:", userDet.id);
      const res = await axios.get(`http://localhost:8000/cart/${userDet?.id}`);

      console.log("Response received:", res.data); // Check the full response

      if (!res.data.CartDatas) {
        console.warn("No cart data found, setting count to 0");
        setCartCount(0);
        return;
      }

      console.log("Cart items:", res.data.CartDatas.items.length);
      setCartCount(res.data.CartDatas.items.length);

    } catch (err) {
      console.error("Error fetching cart:", err);

    }
  };

  fetchCartData();
}, []); // Dependency array

return (
      <CartContext.Provider value={{ cartCount, setCartCount }}>
        {children}
      </CartContext.Provider>
    );
  };

  // Hook to use CartContext
  export const useCart = () => useContext(CartContext);


// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import React from "react";

// // Create context
// const CartContext = createContext();

// // Provider component
// export const CartProvider = ({ children }) => {
//   const [cartCount, setCartCount] = useState(0);

//   // Fetch cart count from backend on load
//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/cart");
//         setCartCount(res.data.CartDatas.length);
//       } catch (err) {
//         console.error("Error fetching cart:", err);
//       }
//     };

//     fetchCartData();
//   }, []);

//   return (
//     <CartContext.Provider value={{ cartCount, setCartCount }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Hook to use CartContext
// export const useCart = () => useContext(CartContext);
