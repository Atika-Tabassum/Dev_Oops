import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // New state for full name
  const [email, setEmail] = useState(''); // New state for email
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Input validation
    if (!username || !password || !fullName || !email) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, fullName, email }), // Include full name and email in the request
      });

      if (!response.ok) {
        // Handle errors from the server
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed.');
        setMessage('');
        return;
      }

      const data = await response.json();
      setMessage(data.message);
      setError(''); // Clear any previous errors
      setUsername(''); // Clear the username field
      setPassword(''); // Clear the password field
      setFullName(''); // Clear the full name field
      setEmail(''); // Clear the email field
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Signup;
