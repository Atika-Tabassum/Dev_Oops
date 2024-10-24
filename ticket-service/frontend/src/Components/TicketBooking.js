import React, { useState } from 'react';
import axios from 'axios';

const TicketBooking = ({ selectedTrain }) => {
  const [userId, setUserId] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    const paymentDetails = {}; // Replace with actual payment details if necessary

    try {
      const response = await axios.post('http://localhost:4001/book-ticket', {
        userId,
        trainId: selectedTrain.id,
        seatNumber,
        date,
        paymentDetails,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Book Ticket for {selectedTrain.name}</h2>
      <form onSubmit={handleBooking}>
        <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} required />
        <input type="number" placeholder="Seat Number" onChange={(e) => setSeatNumber(e.target.value)} required />
        <input type="date" onChange={(e) => setDate(e.target.value)} required />
        <button type="submit">Proceed to Payment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TicketBooking;
