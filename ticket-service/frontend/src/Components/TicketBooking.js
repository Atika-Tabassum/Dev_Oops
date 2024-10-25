import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TicketBooking = () => {
  const [numberOfSeats, setNumberOfSeats] = useState(1); // Default to 1 seat
  const [message, setMessage] = useState('');
  const [totalFare, setTotalFare] = useState(0); // Total fare state
  const [farePerSeat, setFarePerSeat] = useState(null); // Set fare per seat
  const [selectedTrain, setSelectedTrain] = useState(null); // Train details
  const userId = useParams().userId; 
  const trainId = useParams().trainId;
  const date = useParams().date;

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        const response = await axios.get(`http://localhost:4004/${trainId}/getTrain`);
        setSelectedTrain(response.data.train);
        setFarePerSeat(response.data.train.fare);
      } catch (error) {
        console.error('Error fetching train data: ', error);
      }
    };
    fetchTrain();
  }, [trainId]);

  // Update total fare whenever number of seats or farePerSeat changes
  useEffect(() => {
    if (farePerSeat) {
      setTotalFare(farePerSeat * numberOfSeats);
    }
  }, [farePerSeat, numberOfSeats]);

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4001/booking`, {
        userId,
        trainId,
        numberOfSeats,
        date,
      });
      setMessage(response.data.message);
      const bookingId = response.data.bookingId;
      window.location.href = `http://localhost:3002/${userId}/${bookingId}/payment`; // Redirect to the payment page
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      {/* Only display if selectedTrain is not null */}
      {selectedTrain ? (
        <>
          <h2>Book Ticket for {selectedTrain.name}</h2>
          <form onSubmit={handleBooking}>
            <input
              type="number"
              placeholder="Number of Seats"
              value={numberOfSeats}
              min="1"
              onChange={(e) => setNumberOfSeats(e.target.value)}
              required
            />
            <p>Fare per seat: {farePerSeat}</p>
            <p>Total fare: {totalFare}</p>
            <button type="submit">Proceed to Payment</button>
          </form>
          {message && <p>{message}</p>}
        </>
      ) : (
        <p>Loading train details...</p>
      )}
    </div>
  );
};

export default TicketBooking;
