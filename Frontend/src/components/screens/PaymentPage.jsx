import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ToastNotification from "../Alert Styling/ToastNotification";


export function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderDetails = location.state; // Get address details + total amount

    const [paymentType, setPaymentType] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const handleSubmit = async () => {
        if (!paymentType) {
            ToastNotification("error","Please select a payment method");
            return;
        }

        // Collect all order details
        const finalOrder = { ...orderDetails, paymentType };

        try {
            const res = await axios.post("http://localhost:8000/order", finalOrder);
            console.log(res);
            console.log(paymentType);
            if(paymentType=="Cash on Delivery" || paymentType=="PhonePe"){
                ToastNotification("success","Order placed successfully!");
                await axios.delete("http://localhost:8000/cart");
                navigate("/confirmation", { state: finalOrder });

            }
            if(paymentType=="Credit Card"){
                if(!cardNumber || !expiryDate || !cvv){
                    ToastNotification("warning", "Enter all the details");
                    return;
                }
                ToastNotification("success","Order placed successfully!");
                await axios.delete("http://localhost:8000/cart");
                navigate("/confirmation", { state: finalOrder });
            }



        } catch (err) {
            ToastNotification("error","Error placing order");
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Select Payment Method</h2>

                {/* Payment Methods Row */}
                <div className="flex justify-between mb-6 gap-3">
                    <button
                        className={`w-1/3 p-3 rounded-lg text-white ${paymentType === "Credit Card" ? "bg-blue-600" : "bg-blue-400"}`}
                        onClick={() => setPaymentType("Credit Card")}
                    >
                        Credit Card
                    </button>
                    <button
                        className={`w-1/3 p-3 rounded-lg text-white ${paymentType === "PhonePe" ? "bg-purple-600" : "bg-purple-400"}`}
                        onClick={() => setPaymentType("PhonePe")}
                    >
                        PhonePe
                    </button>
                    <button
                        className={`w-1/3 p-3 rounded-lg text-white ${paymentType === "Cash on Delivery" ? "bg-green-600" : "bg-green-400"}`}
                        onClick={() => setPaymentType("Cash on Delivery")}
                    >
                        Cash on Delivery
                    </button>
                </div>

                {/* Payment Details */}
                {paymentType === "Credit Card" && (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Enter Card Details</h3>
                        <input
                            type="text"
                            placeholder="Card Number"
                            className="w-full p-3 mb-2 border rounded-lg"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                        />
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Expiry Date (MM/YY)"
                                className="w-1/2 p-3 border rounded-lg"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="CVV"
                                className="w-1/2 p-3 border rounded-lg"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                )}

                {paymentType === "PhonePe" && (
                    <div className="mb-4 flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Scan QR to Pay</h3>
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Test-Payment"
                            alt="PhonePe QR Code"
                            className="w-32 h-32"
                        />
                        <p className="text-gray-600 text-sm mt-2">Use your PhonePe app to scan and pay.</p>
                    </div>
                )}

                {paymentType === "Cash on Delivery" && (
                    <p className="text-gray-600 text-sm text-center">Pay cash when you receive your order.</p>
                )}

                {/* Order Summary */}
                <div className="mt-6 p-4 border-t border-gray-300">
                    <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                    <p><strong>Address:</strong> {orderDetails.address}, {orderDetails.city}, {orderDetails.state} - {orderDetails.pincode}</p>
                    <p><strong>Phone:</strong> {orderDetails.phoneNumber}</p>
                    <p><strong>Total Amount:</strong> ₹{orderDetails.total}</p>
                </div>

                {/* Submit Button */}
                <button
                    className="w-full bg-green-600 text-white py-3 mt-4 rounded-lg text-lg font-semibold hover:bg-green-700 shadow-md transition duration-300"
                    onClick={handleSubmit}
                >
                    Confirm Payment
                </button>
            </div>
        </div>
    );
}
