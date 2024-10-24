// import React, { useState } from 'react';
// import TrainList from './Components/TrainList';
// import TicketBooking from './Components/TicketBooking';



// const App = () => {
  
//   return (
//     <div>
//       <h1>Train Ticket Booking</h1>
//       <button onClick={setSelectedTrain()}>Back to Train List</button>
//     </div>
//   );
// };

// export default App;
// src/App.js
import React, { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the welcome message from the API
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.text(); // Get the response as text
        setMessage(data); // Set the message state
      } catch (error) {
        console.error("Error fetching the welcome message:", error);
      }
    };

    fetchMessage();
  }, []); // Empty dependency array to run once on component mount

  return (
    <div>
      <h1>Train Ticket </h1>
      <h1>{message}</h1>
    </div>
  );
};

export default App;
