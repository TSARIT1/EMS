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

  const handleRegister = () => {
    // Here you can add form validation or API call
    navigate('/verify-otp');

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
        <h2>Create Your Account</h2><br></br><br></br><br></br>
        
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
