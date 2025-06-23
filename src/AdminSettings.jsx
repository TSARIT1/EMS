import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCog, FaEdit, FaKey, FaArrowLeft } from 'react-icons/fa';
import './AdminSettings.css';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const navigate = useNavigate();

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h3><FaCog style={{ marginRight: '8px' }} /> Admin Settings</h3>
        <ul>
          <li
            className={activeTab === 'edit' ? 'active' : ''}
            onClick={() => setActiveTab('edit')}
          >
            <FaEdit style={{ marginRight: '8px' }} />
            Edit Profile
          </li>
          <li
            className={activeTab === 'password' ? 'active' : ''}
            onClick={() => setActiveTab('password')}
          >
            <FaKey style={{ marginRight: '8px' }} />
            Change Password
          </li>
        </ul>
        <button className="back-button" onClick={() => navigate('/admin')}>
          <FaArrowLeft style={{ marginRight: '6px' }} />
          Back to Dashboard
        </button>
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
