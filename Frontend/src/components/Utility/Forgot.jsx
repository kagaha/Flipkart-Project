import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../Alert Styling/ToastNotification";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const checkEmailExists = async () => {
    try {
      const response = await axios.post("http://localhost:8000/check-email", { email });
      if (response.status==200) {
        sendOtp();
      } else {
        // alert("Email not found!");
        ToastNotification("error","Email Not found");
      }
    } catch (error) {
      // alert(error.response.data.message);
      ToastNotification("error",error.response.data.message);
    }
  };

  const sendOtp = () => {
    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);

    const templateParams = { reply_to: email, otp: newOtp };

    emailjs
      .send("service_cj3hhvw", "template_f083738", templateParams, "FUHQJhIfH_TMq8S_V")
      .then(() => {
        // alert("OTP sent successfully!");
        ToastNotification("success", "OTP Sent Successfully!!")
        setEmailVerified(true);
      })
      .catch(() => ToastNotification("error","Failed to sent OTP"));
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      // alert("OTP verified successfully!");
      ToastNotification("success", "OTP Verified Successfully!!")
      navigate("/update-password",{state:{email}});
    } else {
      // alert("Invalid OTP. Try again.");
      ToastNotification("error","Invalid OTP. Try Again!!");
    }
  };

  return (
    // <div className="mb-80 text-center">
    //   <h2 className="mb-5 text-xl font-bold">Forgot Password</h2>
    //   {!emailVerified ? (
    //     <div className="">
    //       <input
    //         type="email"
    //         placeholder="Enter your email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}

    //       />
    //       <button onClick={checkEmailExists}>Send OTP</button>
    //     </div>
    //   ) : (
    //     <>
    //       <input
    //         type="text"
    //         placeholder="Enter OTP"
    //         value={otp}
    //         onChange={(e) => setOtp(e.target.value)}
    //       />
    //       <button onClick={verifyOtp}>Verify OTP</button>
    //     </>
    //   )}
    // </div>
    <div className="flex min-h-screen items-center justify-center">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all hover:scale-105">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Forgot Password
      </h2>

      {!emailVerified ? (
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={checkEmailExists}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={verifyOtp}
            className="w-full rounded-lg bg-green-600 px-4 py-3 text-white transition-all hover:bg-green-700 hover:shadow-lg"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  </div>
  );
};

export default ForgotPassword;
