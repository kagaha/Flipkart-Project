import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ToastNotification from "../Alert Styling/ToastNotification";
export function AddressForm() {
    const location=useLocation();
    const total=location.state;
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate=useNavigate();
    console.log(total);
    const handlePayment=async(e)=>{
        try{
            e.preventDefault();
        const formData = { address, city, state, pincode, phoneNumber,total };
        if(!address || !city || !state || !pincode || !phoneNumber){
            ToastNotification("warning","Enter all the Details");
        }
        console.log("Submitted Data:", formData);
            const res=await axios.post("http://localhost:8000/order",formData);
            if(res.status==200){
                ToastNotification("success","Procceding to payment Gateway");
                navigate("/payment", { state: formData });
            }
        }
        catch(err){
            ToastContainer(err.response.data.message);
            console.log(err);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Shipping Address</h2>
          <form className="space-y-4">

            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="City"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="State"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Pincode"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 shadow-md transition duration-300"
            onClick={handlePayment}>
              Procced to Payment Gateway.
            </button>
          </form>
        </div>
      </div>
    );
  }
