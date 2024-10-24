// src/components/PaymentInitiation.jsx
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PaymentInitiation = () => {
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const { userId, bookingId, amount } = useParams();
  const [givenAmount, setGivenAmount] = useState(amount);

  const handleGenerateOTP = async () => {
    if (givenAmount != 200) {
      setMessage("The entered amount does not match the required amount.");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4002/initiate-payment",
          {
            userId,
            bookingId,
          }
        );

        if (response.data.success) {
          setMessage(response.data.message);
          setOtpSent(true);
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error("Error initiating payment:", error);
        setMessage("Failed to initiate payment. Please try again.");
      }
    }
  };

  const handleProcessPayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4002/verify-otp-and-process-payment",
        {
          userId,
          bookingId,
          otp,
        }
      );

      if (response.data.success) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage("Failed to process payment. Please try again.");
    }
  };

  return (
    <div>
      <h2>Initiate Payment</h2>
      <div>
        <label>
          Enter Amount:
          <input
            type="number"
            value={givenAmount}
            onChange={(e) => setGivenAmount(e.target.value)}
          />
        </label>

        <input type="button" value="Generate OTP" onClick={handleGenerateOTP} />

        {otpSent && (
          <div>
            <label>
              Enter OTP:
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </label>
            <button onClick={handleProcessPayment}>Submit OTP</button>
          </div>
        )}
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentInitiation;
