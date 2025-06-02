import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const TeacherDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moduleOpen, setModuleOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');
  const handleSettings = () => navigate('/admin/settings');

  return (
    <div className="admin-dashboard">
      <div className="navbar">
        <div className="nav-left">
          <button className="nav-btn">🏠 Home</button>
        </div>

        <div className="nav-center">
          <input className="search-input" type="text" placeholder="Search..." />
          <button className="nav-btn">➕ Add New</button>
          <div className="module-btn-wrapper" style={{ position: 'relative' }}>
            <div className="module-btn" onClick={() => setModuleOpen(!moduleOpen)}>
              📚 Modules ▼
            </div>
          </div>
        </div>

        <div className="nav-right">
          <div className="profile-btn" onClick={() => setMenuOpen(!menuOpen)}>
            🤵🏼‍♂ Teacher ▼
          </div>
          {menuOpen && (
            <div className="dropdown">
              <p>🤵🏼‍♂ Teacher Name</p>
              <p onClick={handleSettings}>⚙️ Personal Settings</p>
              <p>📞 Contact Support</p>
              <p className="logout" onClick={handleLogout}>🚪 Logout</p>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-wrapper">
        <div className="dashboard-grid">
          <div className="card info-card">
            <div className="card-icon">🤵🏼‍♂</div>
            <h4>Hey, Testing</h4>
            <p>Testing</p>
            {(() => {
              const now = new Date();
              const weekday = now.toLocaleDateString('en-US', { weekday: 'short' });
              const day = now.getDate();
              const month = now.toLocaleDateString('en-US', { month: 'short' });
              return (
                <>
                  <strong>{weekday}</strong>
                  <p>{day} {month}</p>
                </>
              );
            })()}
            <p className="view-profile-link" onClick={() => { setShowProfilePopup(true); setMenuOpen(false); }}>
              🤵🏼‍♂ View Profile
            </p>
          </div>

          <div className="card purple">
            <div className="card-icon">👥</div>
            <h4>Students</h4>
            <p><b>0</b></p>
          </div>

          <div className="card green">
            <div className="card-icon">🧑‍🏫</div>
            <h4>Social Learning</h4>
            <p>#</p>
          </div>

          <div
            className="card yellow"
            onClick={() => navigate('/teachersDash/subjects')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-icon"><b>📅</b></div>
            <h4>Subject</h4>
            <p><b>1</b></p>
          </div>

          <div className="card blue">
            <div className="card-icon">📋</div>
            <h4>Today</h4>
            <p>0 Events</p>
            <p>0 Class schedule</p>
            <p>0 Live Lecture</p>
          </div>
        </div>
      </div>

      {/* ✅ Profile Popup */}
      {showProfilePopup && (
        <div className="popup-overlay" onClick={() => setShowProfilePopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowProfilePopup(false)}>❎</button>
            <h2>🤵🏼‍♂ Teacher Profile</h2>
            <p><strong>Name:</strong> Teacher Name</p>
            <p><strong>Email:</strong> teacher@example.com</p>
            <p><strong>Employee ID:</strong> TCH567890</p>
            <p><strong>Department:</strong> Science</p>
            <p><strong>Phone:</strong> +1 (555) 654-3210</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;

