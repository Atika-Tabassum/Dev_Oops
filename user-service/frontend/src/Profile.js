import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import axios from 'axios'; // Import axios to make HTTP requests

function Profile() {
  const location = useLocation(); // Get location object
  const email = location.state?.email; // Access email from state
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return; // Exit if no email is present

      try {
        const response = await axios.get('http://localhost:4000/api/profile', {
          params: { email },
        });

        if (response.status === 200) {
          setProfileData(response.data);
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || 'An error occurred while fetching the profile.'
        );
      }
    };

    fetchProfile();
  }, [email]);

  const handleLogout = () => {
    navigate('/'); // Navigate to the Home page
  };

  const handleShowTickets = () => {
    // Redirect to the other frontend service
    window.location.href = 'http://localhost:3001/?userId=${id}/trains'; // Replace with the URL of your ticketing frontend
  };

  if (!email) {
    return <p>Email is required to view the profile.</p>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {profileData ? (
        <div>
          <p><strong>Full Name:</strong> {profileData.full_name}</p>
          <p><strong>Username:</strong> {profileData.username}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>userId:</strong> {profileData.id}</p>
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleShowTickets} style={buttonStyle}>Show Tickets</button> {/* Book Tickets button */}
            <button onClick={handleLogout} style={buttonStyle}>Logout</button> {/* Logout button */}
          </div>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
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
  backgroundColor: '#007bff', // Blue background for buttons
  color: 'white',
  transition: 'background-color 0.3s',
};

export default Profile;
