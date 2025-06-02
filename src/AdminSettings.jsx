import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSettings.css';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const navigate = useNavigate();

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h3>⚙️ Admin Settings</h3>
        <ul>
          <li
            className={activeTab === 'edit' ? 'active' : ''}
            onClick={() => setActiveTab('edit')}
          >
            ✏️ Edit Profile
          </li>
          <li
            className={activeTab === 'password' ? 'active' : ''}
            onClick={() => setActiveTab('password')}
          >
            🔑 Change Password
          </li>
        </ul>
        <button className="back-button" onClick={() => navigate('/admin')}>← Back to Dashboard</button>
      </div>

      <div className="settings-content">
        {activeTab === 'edit' && (
          <div className="form-box">
            <h2>Edit Profile</h2>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Full Name" />
            <button>Save Changes</button>
          </div>
        )}
        {activeTab === 'password' && (
          <div className="form-box">
            <h2>Change Password</h2>
            <input type="password" placeholder="Current Password" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm New Password" />
            <button>Change Password</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;