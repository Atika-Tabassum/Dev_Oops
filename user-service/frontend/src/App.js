import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/signup">
          <button style={buttonStyle}>Signup</button>
        </Link>
        <Link to="/login">
          <button style={buttonStyle}>Login</button>
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

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

export default App;
