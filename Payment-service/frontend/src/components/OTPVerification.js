import React, { useState } from 'react';
import axios from 'axios';

const OTPVerification = ({ userId, bookingId }) => {
  const [otp, setOtp] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post('http://localhost:4002/verify-otp-and-process-payment', {
        userId,
        bookingId,
        otp,
        amount,  // Include the amount in the request
      });

      if (response.data.success) {
        setMessage(`Payment processed successfully! Transaction ID: ${response.data.transactionId}`);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Failed to verify OTP. Please try again.');
    }
  };

  return (
    <div>
      <h2>Verify OTP and Pay</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Amount to Pay"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Verify OTP & Pay</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OTPVerification;
