import React from "react";
import { useNavigate } from "react-router-dom";

const CartEmpty = () => {
    const navigate=useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center bg-white p-10 rounded-2xl shadow-lg">
        <img
          src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/products/empty-shopping-bag.gif"
          alt="Empty Cart"
          className="w-64 h-64"
        />
        <h2 className="text-2xl font-bold mt-5">Oops, Your cart is empty!</h2>
        <p className="text-gray-600 text-lg text-center mt-2">
          Get back to shopping and get rewards from it.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        onClick={()=>navigate("/")}>
          GO FOR SHOPPING!
        </button>
      </div>
    </div>
  );
};

export default CartEmpty;
