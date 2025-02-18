import React from "react";

import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const location=useLocation();
    console.log(location.state);
    const details=location.state;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-96">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWN-SLzk5eeEuA9zBJKzsM0qbvtLsKDfJ-w&s"alt="Success" className="w-16 h-16 mx-auto"/>
        <h2 className="text-2xl font-semibold text-green-600 mt-4">Payment Successful</h2>
        <p className="text-gray-600 mt-2">Your payment has been processed!</p>
        <p className="text-gray-500 text-sm">Details of the transaction have been included below</p>

        <div className="mt-4 border-t-4 border-green-500 p-4 bg-white shadow rounded-md">
          <div className="flex justify-between">
            <span className="font-semibold">Amount</span>
            <span className="font-semibold">₹ {details.total}</span>
          </div>
          <div className="flex justify-between mt-2 text-gray-600">
            <span>Transaction ID</span>
            <span>64702678</span>
          </div>
          <div className="flex justify-between mt-2 text-gray-600">
            <span>Payment Type</span>
            <span>{details.paymentType}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;