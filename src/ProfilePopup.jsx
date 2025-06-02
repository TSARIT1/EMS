// components/ProfilePopup.js
import React from 'react';
import './ProfilePopup.css'; // Style the popup

const ProfilePopup = ({ role, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{role} Profile</h2>
        <p><strong>Name:</strong> Testing User</p>
        <p><strong>Email:</strong> testing@example.com</p>
        <p><strong>Phone:</strong> +1234567890</p>
        <p><strong>Role:</strong> {role}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default ProfilePopup;
