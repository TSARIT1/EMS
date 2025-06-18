import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OtpVerificationPage.css';

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    if (otp === '') {
      navigate('/setup');
    } else {
      alert('Invalid OTP. Try again.');
    }
  };

  return (
    <div className="otp-fullpage">
      <div className="otp-card">
        <h1>Enter your verification code</h1>
        <p>We've sent a 4-digit code to your registered email or phone.</p>
        <input
          type="text"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="----"
        />
        <button onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
};

export default OtpVerificationPage;

