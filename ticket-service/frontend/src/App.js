// src/App.js
import React, { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch train schedule
  const fetchSchedule = async () => {
    try {
      const response = await axios.get('http://localhost:4001/'); // Fetch data from the backend
      setSchedule(response.data); // Set the fetched data to state
    } catch (err) {
      setError('Error fetching train schedule'); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // useEffect to fetch schedule on component mount
  useEffect(() => {
    fetchSchedule(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error state
  }

  return (
    <div>
      <h1>Train Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Train ID</th>
            <th>Date</th>
            <th>Available Seats</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((train) => (
            <tr key={train.id}>
              <td>{train.train_id}</td>
              <td>{new Date(train.date).toLocaleDateString()}</td>
              <td>{train.available_seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
