import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {  useNavigate } from 'react-router-dom';
import './Footer.css';
import { useCart } from '../screens/CartContext';
import ToastNotification from '../Alert Styling/ToastNotification';


const Header = () => {
  const navigate= useNavigate();
  const {cartCount}=useCart();
  const userData =JSON.parse(localStorage.getItem('user')) || null;
  // console.log(userData);
  // console.log(userData?.username);
  // const location=useLocation();
  // console.log(location);
  // const user= location.state;
  // console.log(user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const navigateToCart=()=>{
    if(localStorage.getItem("user")){
      navigate("/cart");
    }
    else{
      // alert("You need to be loggedIn to see the CartItems");
      ToastNotification("error","You need to be LoggedIN to see the CartItems");
      navigate('/login');
    }
  }

  const handleLogout = () => {
    // Remove user data from context and localStorage
    localStorage.removeItem('user');
    setDropdownOpen(false);
    ToastNotification("success","Loggedout Successfully!!");
    navigate("/login"); // Redirect to login page after logout
  };
  const LoginHandler=()=>{
    if(userData?.username){

    }else{
      navigate("/login");
    }
  }
  return (
    <div className="flex sm:w-full h-[80px] bg-white items-center justify-evenly navbar mb-10 z-10">
        <div onClick={()=>navigate("/")} className=" mr-4">
        <img
        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
        />
        </div>
        <div className="relative ">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Search for Products Brands and More" className="border-[2px] border-solid border-black
            h-[40px] px-8 rounded-[10px]  xs:w-2xs sm:w-sm lg:w-xl bg-blue-50 text-md"/>
        </div>
      {/* User Profile / Login Button */}
      <div className="relative"  onClick={LoginHandler}>
        <button onClick={toggleDropdown} className="flex items-center space-x-2 bg-transparent text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-300 rounded px-4 py-2">
          <CgProfile className="text-gray-500 text-xl" />
          {userData?.username ? `Welcome, ${userData.username}` : "Login"}
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && userData && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200">
              Logout
            </button>
          </div>
        )}
      </div>
      {/* <div className="flex items-center space-x-2 cursor-pointer" onClick={navigateToCart}>
        <FaShoppingCart className="text-gray-700" />
        <span className="text-gray-700">Cart</span>
      </div> */}

      <div className="relative flex items-center space-x-2 cursor-pointer" onClick={navigateToCart}>
        <FaShoppingCart className="text-gray-700 text-2xl" />
        {cartCount > 0 && localStorage.getItem("user") &&(
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
            {cartCount}
          </span>
      )}
      <span className="text-gray-700">Cart</span>
    </div>
      {/* <div className="flex items-center space-x-2 cursor-pointer">
        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg" alt="Become a Seller" className="h-6" />
        <span className="text-gray-700">Become a Seller</span>
      </div> */}

    </div>
  )
}

export default Header;
