// components/ProfilePopup.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePopup.css';

const ProfilePopup = ({ role, onClose }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call – replace '/api/profile' with your actual endpoint
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile', {
          params: { role } // Optionally pass role or auth token
        });
        setProfileData(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [role]);

  if (loading) {
    return (
      <div className="popup-overlay">
        <div className="popup-card">
          <button className="close-btn" onClick={onClose}>✖</button>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="popup-overlay">
        <div className="popup-card">
          <button className="close-btn" onClick={onClose}>✖</button>
          <p>Failed to load profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{profileData.role} Profile</h2>
        <p><strong>Name:</strong> {profileData.name}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Phone:</strong> {profileData.phone}</p>
        <p><strong>Role:</strong> {profileData.role}</p>
      </div>
    </div>
  );
};

export default ProfilePopup;

