// src/App.jsx
import React, { useState } from 'react';
import PaymentInitiation from './components/OTPVerification.js';
import OTPVerification from './components/OTPVerification.js';

const App = () => {
  const [isPaymentInitiated, setPaymentInitiated] = useState(false);
  const [userId, setUserId] = useState('');
  const [bookingId, setBookingId] = useState('');

  const handlePaymentInitiation = (id, booking) => {
    setUserId(id);
    setBookingId(booking);
    setPaymentInitiated(true);
  };

  return (
    <div>
      <h1>Payment System</h1>
      {!isPaymentInitiated ? (
        <PaymentInitiation onInitiatePayment={handlePaymentInitiation} />
      ) : (
        <OTPVerification userId={userId} bookingId={bookingId} />
      )}
    </div>
  );
};

export default App;
