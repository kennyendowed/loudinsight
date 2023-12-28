import React, { useState } from 'react';
import axios from 'axios';
import { Link,useLocation  } from 'react-router-dom';

import '../../App.css';

export default function ValidateOtpPage() {
  const [formData, setFormData] = useState({
    otpNumber: '',
    referenceId: '',
    initiatorId: '',
    requestType: '',
  });
  const location = useLocation();
  const { otpReferenceId, userId } = location.state || {}; // Retrieve data from location state
  const API_URL = process.env.REACT_APP_BaseApi_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
         const updatedFormData = {
        ...formData,
        referenceId: otpReferenceId || formData.referenceId,
        initiatorId: userId || formData.initiatorId,
        requestType: 'signUp',
      };
      // Assuming you'll perform a POST request with the form data
      const response = await axios.post(`${API_URL}otp/validate`, updatedFormData);

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
          alert('Otp validation  failed'); // Display a generic failure message
        }
    } else {
        // Handle non-200 status codes if needed
        alert('Otp validation request failed'); // Display a generic failure message
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
          alert('Error occurred during otp validation');
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
      <h2>OTP Form</h2>
      <form onSubmit={handleSubmit}>
       
        <p>
          <label>Otp Number</label><br />
          <input
            type="text"
            name="otpNumber"
            value={formData.otpNumber}
            onChange={handleChange}
            required
          />
        </p>
      
        <p>
          <button id="sub_btn" type="submit">Login</button>
        </p>
      </form>
      <footer>
        <p>First time? <Link to="/login">Login account</Link>.</p>
        <p><Link to="/">Back to Homepage</Link>.</p>
      </footer>
    </div>
  );
}
