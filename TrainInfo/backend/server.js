const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const pgClient = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/trains", async (req, res) => {
  try {
    const result = await pgClient.query(`SELECT 
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
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
