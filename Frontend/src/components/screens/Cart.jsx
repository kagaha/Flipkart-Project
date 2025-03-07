import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../Alert Styling/ToastNotification';
import { useCart } from './CartContext';
import { LuIndianRupee } from "react-icons/lu";
import CartEmpty from '../404page/CartEmpty';
const Cart = () => {
  const navigate=useNavigate();
  const {setCartCount}=useCart();
  const [cartData, SetCartData]=useState([]);
  const [subtotalval,SetsubTotalVal]=useState(0);
  const userDet= JSON.parse(localStorage.getItem("user"));
  useEffect(()=>{
    const fectchDatafromCart=async()=>{
        try{

          // console.log(userDet.id);
          const res=await axios.get(`http://localhost:8000/cart/${userDet.id}`);

          // console.log(res.data.cartDatas.items);
          SetCartData(res.data.CartDatas.items);
          const subtotal = res.data.CartDatas.items.reduce(
            (acc, item) => acc + item.price*item.quantity,
            0
          );
          SetsubTotalVal(subtotal);
        }catch(err){
          // alert(err.response.data.message);
          ToastNotification("error",err.response.data.message);
          console.log(err);
        }
    }
    fectchDatafromCart();
  },[cartData]);//Re-run the useEffect when there are any changes in the cart.

  //Delete cart
  const deleteCart=async(item)=>{
    try{
      console.log({item});
      const res=await axios.delete(`http://localhost:8000/cart/${item.productId}/${userDet.id}`);
      console.log(res.data);
      // alert(res.data.message);
      // SetCartData((prevCart) => prevCart.filter((cartItem) => cartItem._id !== item._id));

      // Instantly decrease cart count
      setCartCount((prevCount) => Math.max(prevCount - 1, 0));
      ToastNotification("success",res.data.message);
    }catch(err){
      console.log(err);
      // alert(err.response.data.message);
      ToastNotification("error",err.response.data.message);
    }
  }


  //Upadte Cart Logic and Increment and Decrement
  const UpdateQuantity=async(id,newQuantity)=>{
    try{
      console.log(id);
      console.log(newQuantity);
      const res=await axios.put(`http://localhost:8000/cart/${id}/${userDet.id}`,{
        quantity:newQuantity
      });
      console.log(res.data);
      if(res.status===200){
        fectchDatafromCart();
      }

    }
    catch(err){
      // alert(err.response.data.message || "data Not fsxdfrtgyhujik");
      ToastNotification("error",err?.response?.data?.message);
      
    }

  }

  //Navigate to the Individual Item when click on the image:
  const NavigatetoIndItem=async(item)=>{
    try{
        const res= await axios.get(`http://localhost:8000/product/${item.category}/${item.title}`);
        navigate(`/product/${item.category}/${item.title}`);
    }
    catch(err){
      ToastNotification("error",err.response.data.message);
      console.log(err);
    }
  }


  // console.log(cartData);
  const shipping = 5.0;
  const tax = (subtotalval * 0.08).toFixed(2);
  const total = (subtotalval + shipping + parseFloat(tax)).toFixed(2);
  return (
    subtotalval?(
    <div className="w-full max-w-6xl mx-auto p-5 ">
      <h2 className="text-2xl font-bold mb-5">Shopping Cart</h2>
      <div className="flex flex-col gap-5">
        {cartData.map((item) => (

          <div
            key={item._id}
            className="flex items-center justify-between border p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 rounded-lg"
                onClick={()=>NavigatetoIndItem(item)}
              />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500"><LuIndianRupee className="inline"/>{item.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-3 py-1 bg-gray-200 rounded-md text-xl font-semibold hover:bg-gray-300"
              onClick={()=>UpdateQuantity(item.productId, item.quantity-1)}>
                − </button>
              <span className="text-lg font-medium">{item.quantity}</span>
              <button className="px-3 py-1 bg-gray-200 rounded-md text-xl font-semibold hover:bg-gray-300"
              onClick={()=>UpdateQuantity(item.productId, item.quantity+1)}>
                + </button>

              <button className="text-red-500 hover:text-red-700 cursor-pointer" onClick={()=>deleteCart(item)}>
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 border p-4 rounded-lg shadow-md bg-gray-50">
        <h3 className="text-lg font-bold">Order Summary</h3>
        <div className="flex justify-between mt-2">
          <span>Subtotal</span>
          <span><LuIndianRupee className="inline"/>{subtotalval.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Shipping estimate</span>
          <span><LuIndianRupee className="inline"/>{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Tax estimate</span>
          <span><LuIndianRupee className="inline"/>{tax}</span>
        </div>
        <div className="flex justify-between mt-4 font-semibold text-lg">
          <span>Order Total</span>
          <span><LuIndianRupee className="inline"/>{total}</span>
        </div>
        <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
        onClick={()=>navigate(`/address`,{state:total})}>
          Checkout
        </button>

      </div>
    </div>
    ):(
      <div>
       <CartEmpty/>
      </div>
    )
  )
}

export default Cart;

