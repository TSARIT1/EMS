import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OtpVerificationPage.css';

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!otp || otp.length !== 4) {
      alert('Please enter a valid 4-digit OTP.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/verify-otp', { otp });

      if (response.data.success) {
        navigate('/setup');
      } else {
        alert(response.data.message || 'Invalid OTP. Try again.');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      alert('An error occurred during verification. Try again.');
    } finally {
      setLoading(false);
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
        <button onClick={handleVerify} disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationPage;


