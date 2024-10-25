const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const pgClient = require("./db"); // Assuming pgClient is correctly set up to connect to your database

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get details for a specific train
app.get("/:trainId/getTrain", (req, res) => {
  const trainId = req.params.trainId;

  pgClient.query(
    `SELECT 
      t.id AS train_id,
      t.name AS train_name,
      t.route,
      t.schedule,
      t.fare
    FROM
      trains t
    WHERE
      t.id = $1`,
    [trainId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // If no train found, return a 404 error
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Train not found" });
        return;
      }

      res.json({ train: result.rows[0] }); // Return the train details
    }
  );
});

// Get list of all trains with schedule and seat availability
app.get("/:userId/trains", async (req, res) => {
  try {
    const result = await pgClient.query(`
      SELECT 
        t.id AS train_id,
        t.name AS train_name,
        t.route,
        t.schedule,
        t.fare,
        t.seats AS total_seats,
        ts.available_seats,
        ts.date
      FROM 
        trains t
      LEFT JOIN 
        train_schedule ts ON t.id = ts.train_id
      ORDER BY 
        t.id;
    `);
    res.json(result.rows); // Send the list of trains with schedule and seat availability
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
