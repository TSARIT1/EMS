import React, { useState } from 'react';
import './AttendancePage.css';

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState('Manage');

  return (
    <div className="attendance-container">
      <h2>Attendance</h2>
      <div className="attendance-tabs">
        {['Manage', 'Attendance Submission Analytics', 'Settings'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Manage' && (
        <div className="manage-form">
          <select><option>Select Class</option></select>
          <select><option>Select Section</option></select>
          <select><option>Select Subjects</option></select>
          <input type="date" />
          <button className="start-btn">✏️ Let's Start</button>
        </div>
      )}

     
        {activeTab === 'Attendance Submission Analytics' && (
  <div className="analytics-form">
    <input type="date" className="analytics-input" placeholder="Date" />
    <select className="analytics-input"><option>Select Class · Section</option></select>
    <select className="analytics-input"><option>View All</option></select>
    <button className="start-btn">✏️ Let's Start</button>

    <div className="analytics-links">
      <a href="#">Select All</a> / <a href="#">Unselect All</a><br />
      Apply further filter on <a href="#">Subjects</a><br />
      or <a href="#">Teachers</a>
    </div>
  </div>
)}

     

     {activeTab === 'Settings' && (
  <div className="settings-wrapper">
    <div className="settings-status">
      <div className="section-header">
        <h4>Attendance Status</h4>
        <a href="#" className="add-status">+ Add New Status</a>
      </div>
      <p className="section-subtitle">Manage required attendance status (e.g. Present, Absent, Tardy etc..)</p>
      <table className="status-table">
  <thead>
    <tr>
      <th>Status</th><th>keyword</th><th>ShortCode</th><th>Color</th><th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Present</td><td>p</td><td>P</td>
      <td><span className="dot green" /></td>
      <td>
        <button className="action-btn">✏️</button>
        <button className="action-btn">🗑️</button>
      </td>
    </tr>
    <tr>
      <td>Absent</td><td>a</td><td>A</td>
      <td><span className="dot red" /></td>
      <td>
        <button className="action-btn">✏️</button>
        <button className="action-btn">🗑️</button>
      </td>
    </tr>
    <tr>
      <td>Null</td><td>n</td><td>N</td>
      <td><span className="dot gray" /></td>
      <td>
        <button className="action-btn">✏️</button>
        <button className="action-btn">🗑️</button>
      </td>
    </tr>
    <tr>
      <td>Tardy</td><td>T</td><td>T</td>
      <td><span className="dot orange" /></td>
      <td>
        <button className="action-btn">✏️</button>
        <button className="action-btn">🗑️</button>
      </td>
    </tr>
  </tbody>
</table>

      
    </div>

    <div className="settings-meetings">
      <h4>Attendance Sessions/Meetings</h4>
      <p className="section-subtitle">Manage settings like whether you want Subjects wise attendance or not and set sessions if you need attendance for multiple times each day</p>
      <div className="toggle-row">Subjects wise attendance? <button className="yes">Yes</button><button className="no">No</button></div>
      <div className="toggle-row">Multiple sessions each day? <button className="yes">Yes</button><button className="no">No</button></div>
    </div>
  </div>
)}

    </div>
  );
}  


