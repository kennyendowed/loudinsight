import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useHistory  } from 'react-router-dom';

import '../../App.css';

export default function SignUpPage() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: 'jobseeker',
    ipAddress: '',
    channel: 'web',
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
      console.log(formData)
      const response = await axios.post(`${API_URL}user/register`, formData);
  
      if (response.status === 200) {
        const responseData = response.data;
  
        // Check if registration was successful based on status and handle accordingly
        if (responseData.status === 200) {
          // Successful registration
          alert(responseData.message); // Display success message using alert
          // Redirect logic goes here (e.g., using react-router-dom)
        
  const { otpReferenceId, userId } = responseData.payload; // Extract data from the response

  // Redirect to the ValidateOtpPage and pass data through state
  history.push({
    pathname: '/verifyAccount',
    state: { otpReferenceId, userId }, // Pass the required data through state
  });
        } else {
          // Handle other status codes if needed
          alert('Registration failed'); // Display a generic failure message
        }
      } else {
        // Handle non-200 status codes if needed
        alert('Registration request failed'); // Display a generic failure message
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
        alert('Error occurred during signup');
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
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Username</label><br />
          <input type="text" name="username" onChange={handleChange} required />
        </p>
        <p>
          <label>Email address</label><br />
          <input type="email" name="email" onChange={handleChange} required />
        </p>
        <p>
          <label>Password</label><br />
          <input type="password" name="password" onChange={handleChange} required />
        </p>
        <p>
          <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
        </p>
        <p>
          <button id="sub_btn" type="submit">Register</button>
        </p>
      </form>
      <footer>
        <p><Link to="/">Back to Homepage</Link>.</p>
      </footer>
    </div>
  );
}
