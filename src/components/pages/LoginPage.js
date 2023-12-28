import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../../App.css';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    channel: 'web',
    ipAddress: '', // This field should be filled dynamically
  });

  const API_URL = process.env.REACT_APP_BaseApi_URL ;

  useEffect(() => {
    // Function to fetch user's IP address
    const fetchIPAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org/?format=json');
         if (response.data && response.data.ip) {
          setFormData((prevData) => ({
            ...prevData,
            ipAddress: response.data.ip,
          }));
        }
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIPAddress(); // Fetch IP address when the component mounts
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Assuming ipAddress will be fetched dynamically before form submission
      const response = await axios.post(`${API_URL}user/login`, formData);
      if (response.status === 200) {
        const responseData = response.data;
  
        // Check if registration was successful based on status and handle accordingly
        if (responseData.status === 200) {
          // Successful registration
          alert(responseData.message); // Display success message using alert
          // Redirect logic goes here (e.g., using react-router-dom)
          // history.push('/some-path');
        } else {
          // Handle other status codes if needed
          alert('Login failed'); // Display a generic failure message
        }
    } else {
        // Handle non-200 status codes if needed
        alert('Login request failed'); // Display a generic failure message
      }
    } catch (error) {
        // Handle errors here
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorResponse = error.response.data;
    
          alert(`Error: ${errorResponse.message}`);
        } else if (error.request) {
          // The request was made but no response was received
          alert('Network error. Please try again.');
        } else {
          // Something happened in setting up the request
          alert('Error occurred during signin');
        }
      }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Username or email address</label><br />
          <input type="text" name="email" onChange={handleChange} required />
        </p>
        <p>
          <label>Password</label>
          <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
          <br />
          <input type="password" name="password" onChange={handleChange} required />
        </p>
        <p>
          <button id="sub_btn" type="submit">Login</button>
        </p>
      </form>
      <footer>
        <p>First time? <Link to="/register">Create an account</Link>.</p>
        <p>validate Otp? <Link to="/verifyAccount">verify account</Link>.</p>
        <p><Link to="/">Back to Homepage</Link>.</p>
      </footer>
    </div>
  );
}
