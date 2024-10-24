const { Pool } = require("pg"); // Capital 'P' for Pool

const pgClient = new Pool({
  host: "localhost",
  user: "postgres",
  password: "carrot", // Make sure this matches your actual password
  database: "traininfo",
  port: 5432, // Optional: Default PostgreSQL port is 5432
});

module.exports = pgClient;
