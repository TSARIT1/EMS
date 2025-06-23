import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilter } from 'react-icons/fa';
import './CheckInOutLog.css';

const CheckInOutLog = () => {
  const [activeTab, setActiveTab] = useState('checkout');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/logs/${type}`);
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs(activeTab);
  }, [activeTab]);

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

          {loading ? (
            <div className="log-empty">
              <p>Loading...</p>
            </div>
          ) : logs.length === 0 ? (
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
          ) : (
            <div className="log-list">
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Book Name</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={index}>
                      <td>{log.studentName}</td>
                      <td>{log.bookName}</td>
                      <td>{log.date}</td>
                      <td>{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckInOutLog;



