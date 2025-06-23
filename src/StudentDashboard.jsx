import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaPlus,
  FaBook,
  FaUserGraduate,
  FaCog,
  FaPhoneAlt,
  FaSignOutAlt,
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClipboardList,
  FaTimes
} from 'react-icons/fa';
import './AdminDashboard.css';

const StudentDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moduleOpen, setModuleOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef();
  const moduleRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (moduleRef.current && !moduleRef.current.contains(e.target)) setModuleOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => navigate('/');
  const handleSettings = () => navigate('/admin/settings');

  return (
    <div className="admin-dashboard">
      <div className="navbar">
        <div className="nav-left">
          <button className="nav-btn"><FaHome /> Home</button>
        </div>

        <div className="nav-center">
          <input className="search-input" type="text" placeholder="Search..." />
          <button className="nav-btn"><FaPlus /> Add New</button>

          <div className="module-btn-wrapper" ref={moduleRef}>
            <div className="module-btn" onClick={() => setModuleOpen(!moduleOpen)}>
              <FaBook /> Modules ▼
            </div>
          </div>
        </div>

        <div className="nav-right" ref={menuRef}>
          <div className="profile-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <FaUserGraduate /> Student ▼
          </div>
          {menuOpen && (
            <div className="dropdown">
              <p><FaUserGraduate /> Student Name</p>
              <p onClick={handleSettings}><FaCog /> Personal Settings</p>
              <p><FaPhoneAlt /> Contact Support</p>
              <p className="logout" onClick={handleLogout}><FaSignOutAlt /> Logout</p>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-wrapper">
        <div className="dashboard-grid">
          <div className="card info-card">
            <div className="card-icon"><FaUserGraduate /></div>
            <h4>Hey, Student</h4>
            <p>Welcome</p>
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
            <p className="view-profile-link" onClick={() => setShowProfilePopup(true)}>
              <FaUserGraduate /> View Profile
            </p>
          </div>

          <div className="card purple">
            <div className="card-icon"><FaUsers /></div>
            <h4>Students</h4>
            <p><b>0</b></p>
          </div>

          <div className="card green">
            <div className="card-icon"><FaChalkboardTeacher /></div>
            <h4>Social Learning</h4>
            <p>#</p>
          </div>

          <div
            className="card yellow"
            onClick={() => navigate('/studentsDash/subjects')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-icon"><FaCalendarAlt /></div>
            <h4>Subject</h4>
            <p><b>1</b></p>
          </div>

          <div className="card blue">
            <div className="card-icon"><FaClipboardList /></div>
            <h4>Today</h4>
            <p>0 Events</p>
            <p>0 Class schedule</p>
            <p>0 Live Lecture</p>
          </div>
        </div>
      </div>

      {showProfilePopup && (
        <div className="popup-overlay" onClick={() => setShowProfilePopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowProfilePopup(false)}><FaTimes /></button>
            <h2><FaUser /> Student Profile</h2>
            <p><strong>Name:</strong> Student Name</p>
            <p><strong>Email:</strong> student@example.com</p>
            <p><strong>Enrollment No:</strong> STU123456</p>
            <p><strong>Class:</strong> 10th Grade</p>
            <p><strong>Phone:</strong> +1 (555) 987-6543</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;



