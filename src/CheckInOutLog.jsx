import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import './CheckInOutLog.css'; // Import the CSS file

const CheckInOutLog = () => {
  const [activeTab, setActiveTab] = useState('checkout');

  return (
    <div className="log-container">
      <h1 className="log-title">Check In / Check Out Log</h1>

      <div className="log-card">
        <div className="log-tabs">
          <button
            className={`tab-btn ${activeTab === 'checkout' ? 'active' : ''}`}
            onClick={() => setActiveTab('checkout')}
          >
            Check Out Log
          </button>
          <button
            className={`tab-btn ${activeTab === 'checkin' ? 'active' : ''}`}
            onClick={() => setActiveTab('checkin')}
          >
            Check In Log
          </button>
        </div>

        <div className="log-content">
          <div className="log-filter">
            <FaFilter className="filter-icon" />
            <span>Filter</span>
          </div>

          <div className="log-empty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="log-empty-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2a4 4 0 014-4h6M3 9l3-3m0 0l3 3m-3-3v12"
              />
            </svg>
            <p>No record found.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInOutLog;


