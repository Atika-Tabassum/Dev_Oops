import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Input validation
    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/login', { // Update port to match your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) { // Check if the response is OK
        setEmail(data.email); // Set email on successful login
        setMessage('Login successful!');
        setIsLoggedIn(true); // Update login status
      } else {
        setMessage(data.message || 'Login failed.'); // Handle errors
        setEmail(''); // Clear email on error
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      setEmail(''); // Clear email on error
    }
  };

  const handleBookTickets = () => {
    navigate('/book-tickets'); // Navigate to the ticket booking page
  };

  const handlePayment = () => {
    navigate('/payment'); // Navigate to the payment page
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required // Add required attribute for basic HTML validation
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Add required attribute for basic HTML validation
        />
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>} {/* Success message */}
      {email && <p>Email: {email}</p>} {/* Display the email on successful login */}

      {/* Render buttons if logged in */}
      {isLoggedIn && (
        <div>
          <button onClick={handleBookTickets}>Book Tickets</button>
          <button onClick={handlePayment}>Payment Method</button>
        </div>
      )}
    </div>
  );
}

export default Login;
