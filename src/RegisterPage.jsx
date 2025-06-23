import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgName: '',
    fullName: '',
    email: '',
    phone: '',
    subDomain: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch( {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' ,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        
        navigate('/verify-otp');
      } else {
        alert(`Registration failed: ${data.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h1>TSAR</h1>
        <blockquote>
          TSAR is all about flexibility, affordability, and technological sophistication.
        </blockquote>
      </div>

      <div className="register-right">
        <h2>Create Your Account</h2><br /><br /><br />

        <div className="form-grid">
          <input type="text" name="orgName" placeholder="Organization Name" onChange={handleChange} />
          <input type="text" name="fullName" placeholder="Your Full Name" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
          <input type="text" name="phone" placeholder="Contact Number" onChange={handleChange} />
          <input type="text" name="subDomain" placeholder="Your Sub-Domain" onChange={handleChange} />
          <input type="text" name="username" placeholder="Username" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        </div>
        <button className="register-btn" onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;



