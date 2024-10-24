import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <Link to="/signup">
          <button style={buttonStyle}>Sign Up</button>
        </Link>
        <Link to="/login">
          <button style={buttonStyle}>Log In</button>
        </Link>
      </nav>
    </div>
  );
};

// Button styles for better appearance
const buttonStyle = {
  margin: '0 10px',
  padding: '10px 15px',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: 'white',
  transition: 'background-color 0.3s',
};

export default Home;
