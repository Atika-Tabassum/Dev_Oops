
// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup

const pgClient = require("./db");



// Express route definitions
app.get("/", async (req, res) => {
  try {
    const availabilityCheck = await pgClient.query("SELECT * FROM train_schedule");
    res.send(availabilityCheck.rows);
  } catch (error) { // Use a specific name for the error variable
    console.error(error); // Log the error
    res.status(500).json({ error: "Internal Server Error" }); // Send a 500 error response
  }
});
//POST from suchi



// POST /book-ticket route to book a ticket for a specific date
app.post("/book-ticket", async (req, res) => {
  const { userId, trainId, seatNumber, date,paymentDetails } = req.body;

  if (!userId || !trainId || !seatNumber || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check seat availability for the specified date
    const availabilityCheck = await pgClient.query(
      "SELECT available_seats FROM train_schedule WHERE train_id = $1 AND date = $2",
      [trainId, date]
    );

    if (availabilityCheck.rows.length === 0) {
      return res.status(400).json({ error: "No availability for this date" });
    }

    const availableSeats = availabilityCheck.rows[0].available_seats;
    
    if (availableSeats <= 0) {
      return res.status(400).json({ error: "No seats available for this date" });
    }

    // Check if the seat is already booked for the specified date
    const seatCheck = await pgClient.query(
      "SELECT * FROM tickets WHERE train_id = $1 AND seat_number = $2 AND date = $3",
      [trainId, seatNumber, date]
    );

    if (seatCheck.rows.length > 0) {
      return res.status(400).json({ error: "Seat already booked for this date" });
    }
    const result = await pgClient.query(
      "INSERT INTO tickets (user_id, train_id, seat_number, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, trainId, seatNumber, date]
    );
    bookingId=result.rows[0].id;
    await pgClient.query(
      "UPDATE train_schedule SET available_seats = available_seats - 1 WHERE train_id = $1 AND date = $2",
      [trainId, date]
    );


    // Book the ticket
     // Call the payment microservice to process the payment
     const paymentResponse = await axios.post("http://localhost:4002/initiate-payment",userId, paymentDetails,bookingId);
    

     if (paymentResponse.data.success) {
       // Book the ticket if the payment was successful
       
       
       await pgClient.query("COMMIT");
       return res.status(201).json({ message: "Ticket booked successfully", ticket: result.rows[0] });
     } else {
       // Payment failed, return an error
       await client.query("ROLLBACK");

       // Delete the ticket from the tickets table
       await pgClient.query(
         "DELETE FROM tickets WHERE id = $1",
         [bookingId]
       );
 
       // Increase available seat count
       await pgClient.query(
         "UPDATE train_schedule SET available_seats = available_seats + 1 WHERE train_id = $1 AND date = $2",
         [trainId, date]
       );
       return res.status(400).json({ error: "Payment failed, ticket not booked" });
     }
   
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
