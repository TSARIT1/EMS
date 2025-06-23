import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHome, FaPlus, FaBook, FaCalendarAlt, FaMoneyBillAlt, FaBuilding,
  FaUserCircle, FaCog, FaPhoneAlt, FaSignOutAlt, FaUserFriends, FaChalkboardTeacher,
  FaClipboardList
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moduleOpen, setModuleOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => navigate('/login');
  const handleSettings = () => navigate('/admin/settings');
  const goToStudentInfo = () => navigate('/admin/student-info');
  const goToSchedules = () => navigate('/admin/schedules-communication');
  const goToFinance = () => navigate('/admin/finance-accounting');
  const goToAdministration = () => navigate('/admin/administration');

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      <div className="navbar">
        <div className="nav-left">
          <button className="nav-btn"><FaHome /> Home</button>
        </div>

        <div className="nav-center">
          <input className="search-input" type="text" placeholder="Search..." />
          <button className="nav-btn"><FaPlus /> Add New</button>

          <div className="module-btn-wrapper" style={{ position: 'relative' }}>
            <div className="module-btn" onClick={() => setModuleOpen(!moduleOpen)}>
              <FaBook /> Modules ▼
            </div>
            {moduleOpen && (
              <div className="dropdown module-dropdown">
                <p onClick={goToStudentInfo}><FaUserFriends /> Student Information System</p>
                <p onClick={goToSchedules}><FaCalendarAlt /> Schedules & Communication</p>
                <p onClick={goToFinance}><FaMoneyBillAlt /> Finance & Accounting</p>
                <p onClick={goToAdministration}><FaBuilding /> Administration</p>
              </div>
            )}
          </div>
        </div>

        <div className="nav-right">
          <div className="profile-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <FaUserCircle /> Admin ▼
          </div>
          {menuOpen && (
            <div className="dropdown">
              <p><FaUserCircle /> Admin Name</p>
              <p onClick={handleSettings}><FaCog /> Personal Settings</p>
              <p><FaPhoneAlt /> Contact Support</p>
              <p className="logout" onClick={handleLogout}><FaSignOutAlt /> Logout</p>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-wrapper">
        <div className="dashboard-grid">
          <div className="card info-card">
            <div className="card-icon"><FaUserCircle /></div>
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
            <p className="view-profile-link" onClick={() => setShowProfilePopup(true)}>
              <FaUserCircle /> View Profile
            </p>
          </div>

          <div className="card purple">
            <div className="card-icon"><FaUserFriends /></div>
            <h4>Students</h4>
            <p>0 Active</p>
            <p>0 Alumni</p>
            <p>0 Licenses</p>
          </div>
          <div className="card green">
            <div className="card-icon"><FaChalkboardTeacher /></div>
            <h4>Teachers & Admin Staff</h4>
            <p>0 Teacher</p>
            <p>0 Admin</p>
          </div>
          <div className="card yellow">
            <div className="card-icon"><FaCalendarAlt /></div>
            <h4>Events</h4>
            <p>0 Upcoming</p>
          </div>
          <div className="card blue">
            <div className="card-icon"><FaClipboardList /></div>
            <h4>New Submissions</h4>
            <p>0 Generic</p>
            <p>0 Student Pre-Admission</p>
            <p>0 Teacher Registration</p>
          </div>
        </div>
      </div>

      {/* Profile Popup Modal */}
      {showProfilePopup && (
        <div className="popup-overlay" onClick={() => setShowProfilePopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2><FaUserCircle /> Admin Profile</h2>
            <p><strong>Name:</strong> Admin Name</p>
            <p><strong>Email:</strong> admin@example.com</p>
            <p><strong>Role:</strong> System Administrator</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Joined:</strong> Jan 1, 2023</p>
            <button onClick={() => setShowProfilePopup(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;




