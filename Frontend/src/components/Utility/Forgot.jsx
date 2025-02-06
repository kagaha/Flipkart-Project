import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

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
        alert("Email not found!");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const sendOtp = () => {
    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);

    const templateParams = { reply_to: email, otp: newOtp };

    emailjs
      .send("service_cj3hhvw", "template_f083738", templateParams, "FUHQJhIfH_TMq8S_V")
      .then(() => {
        alert("OTP sent successfully!");
        setEmailVerified(true);
      })
      .catch(() => alert("Failed to send OTP."));
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      alert("OTP verified successfully!");
      navigate("/");
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }} className="mb-80">
      <h2>Forgot Password</h2>
      {!emailVerified ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={checkEmailExists}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
