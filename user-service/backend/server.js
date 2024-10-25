// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 4000; // Changed to uppercase for consistency

// const users = []; // Initialize users array

// // Default user
// const defaultUser = {
//   username: 'user',
//   password: 'password123', // In a real application, passwords should be hashed
//   fullName: 'Test User',
//   email: 'testuser@example.com'
// };

// // Add default user if the users array is empty
// if (users.length === 0) {
//   users.push(defaultUser);
// }

// // Middleware
// app.use(cors()); // Enable CORS
// app.use(bodyParser.json()); // Parse JSON bodies

// // Signup endpoint
// app.post('/api/signup', (req, res) => {
//   const { username, password, fullName, email } = req.body;

//   // Check if the user already exists
//   const existingUser = users.find(user => user.username === username);
//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists.' });
//   }

//   // Add new user
//   const newUser = { username, password, fullName, email }; // In a real app, hash the password
//   users.push(newUser);
//   res.status(201).json({ message: 'Signup successful!' });
// });

// // Login endpoint
// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;

//   // Check for user existence
//   const user = users.find(user => user.username === username);
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid username or password.' });
//   }

//   // Check password (in a real app, hash comparison is needed)
//   if (user.password === password) {
//     return res.status(200).json({ message: 'Login successful!', email: user.email });
//   }

//   res.status(401).json({ message: 'Invalid username or password.' });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Import PostgreSQL client

const app = express();
const PORT = 4000;

// Initialize PostgreSQL pool (Replace with your DB credentials)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_database',
  password: 'carrot',
  port: 5432, // Default PostgreSQL port
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create users table if it doesn't exist
const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL, -- In a real app, hash passwords
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    );
  `;
  await pool.query(query);
};

createUsersTable().catch(err => console.error('Error creating table:', err));

app.post('/api/signup', async (req, res) => {
  const { username, password, fullName, email } = req.body;

  if (!username || !password || !fullName || !email) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
    // Check if the username already exists
    const checkUserQuery = 'SELECT * FROM users WHERE username = $1';
    const existingUser = await pool.query(checkUserQuery, [username]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Insert new user into the database
    const insertUserQuery = `
      INSERT INTO users (username, password, full_name, email) 
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const newUser = await pool.query(insertUserQuery, [username, password, fullName, email]); // In a real app, hash the password

    return res.status(201).json({ message: 'Signup successful!', user: newUser.rows[0] });
  } catch (err) {
    console.error('Error during signup:', err);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check for user existence
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    console.log(user.rows);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Check password (in a real app, hash comparison is needed)
    if (user.rows[0].password === password) {
      const { email } = user.rows[0]; // Destructure to get user ID and email
      return res.status(200).json({ message: 'Login successful!', email }); 
    }
    console.log("login successful");
    res.status(401).json({ message: 'Invalid username or password.' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/api/profile', async (req, res) => {
  const { email } = req.query; // Get email from query parameters

  if (!email) {
    return res.status(400).json({ message: 'Email is required to fetch profile.' });
  }

  try {
    // Fetch user details by email
    const userQuery = 'SELECT full_name, username, email, id FROM users WHERE email = $1';
    console.log(userQuery);
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Return user profile data
    return res.status(200).json(userResult.rows[0]);
  } catch (err) {
    console.error('Error fetching profile:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
