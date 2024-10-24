const { Pool } = require("pg"); // Capital 'P' for Pool

const pgClient = new Pool({
  host: process.env.DB_HOST || "localhost", // Use environment variable for Docker or fallback to localhost for local development
  user: process.env.DB_USER || "postgres", // Use environment variable for DB_USER
  password: process.env.DB_PASSWORD || "carrot", // Use environment variable for DB_PASSWORD
  database: process.env.DB_NAME || "traininfo", // Use environment variable for DB_NAME
  port: process.env.DB_PORT || 5432, // Use environment variable for DB_PORT
});

module.exports = pgClient;