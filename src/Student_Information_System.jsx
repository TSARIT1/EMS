// AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import './AdminDashboard.css';

const AdminLayout = () => {
  return (
    <div className="admin-dashboard">
      {/* Navbar stays constant */}
      <div className="navbar">
        {/* ...same navbar content as before... */}
      </div>

      {/* Page Content changes here */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
