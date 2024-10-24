// src/components/PaymentInitiation.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PaymentInitiation = () => {
  const [userId, setUserId] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(null); // Optional, to display the amount

  const handleInitiatePayment = async () => {
    try {
      const response = await axios.post('http://localhost:4002/initiate-payment', {
        userId,
        bookingId,
      });

      if (response.data.success) {
        setMessage(response.data.message);
        setAmount(response.data.amount); // Set the amount from response
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      setMessage('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div>
      <h2>Initiate Payment</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
      />
      <button onClick={handleInitiatePayment}>Send OTP</button>
      {message && <p>{message}</p>}
      {amount && <p>Amount to be paid: {amount}</p>}
    </div>
  );
};

export default PaymentInitiation;
