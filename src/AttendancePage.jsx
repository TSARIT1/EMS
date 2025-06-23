import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlay, FaPlus } from 'react-icons/fa';
import './AttendancePage.css';

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState('Manage');
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (activeTab === 'Manage' || activeTab === 'Attendance Submission Analytics') {
      fetchDropdowns();
    }
  }, [activeTab]);

  const fetchDropdowns = async () => {
    try {
      const classRes = await axios.get('/api/classes');
      const sectionRes = await axios.get('/api/sections');
      const subjectRes = await axios.get('/api/subjects');

      setClasses(classRes.data);
      setSections(sectionRes.data);
      setSubjects(subjectRes.data);
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  };

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

      {/* Manage Tab */}
      {activeTab === 'Manage' && (
        <div className="manage-form">
          <select>
            <option>Select Class</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
          <select>
            <option>Select Section</option>
            {sections.map(sec => (
              <option key={sec.id} value={sec.id}>{sec.name}</option>
            ))}
          </select>
          <select>
            <option>Select Subjects</option>
            {subjects.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
          <input type="date" />
          <button className="start-btn">
            <FaPlay style={{ marginRight: '6px' }} />
            Let's Start
          </button>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'Attendance Submission Analytics' && (
        <div className="analytics-form">
          <input type="date" className="analytics-input" placeholder="Date" />
          <select className="analytics-input">
            <option>Select Class · Section</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
          <select className="analytics-input">
            <option>View All</option>
            {subjects.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
          <button className="start-btn">
            <FaPlay style={{ marginRight: '6px' }} />
            Let's Start
          </button>

          <div className="analytics-links">
            <a href="#">Select All</a> / <a href="#">Unselect All</a><br />
            Apply further filter on <a href="#">Subjects</a><br />
            or <a href="#">Teachers</a>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'Settings' && (
        <div className="settings-wrapper">
          <div className="settings-status">
            <div className="section-header">
              <h4>Attendance Status</h4>
              <a href="#" className="add-status">
                <FaPlus style={{ marginRight: '6px' }} /> Add New Status
              </a>
            </div>
            <p className="section-subtitle">
              Manage required attendance status (e.g. Present, Absent, Tardy etc.)
            </p>
            <table className="status-table">
              <thead>
                <tr>
                  <th>Status</th><th>Keyword</th><th>ShortCode</th><th>Color</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Present', key: 'p', code: 'P', color: 'green' },
                  { label: 'Absent', key: 'a', code: 'A', color: 'red' },
                  { label: 'Null', key: 'n', code: 'N', color: 'gray' },
                  { label: 'Tardy', key: 't', code: 'T', color: 'orange' }
                ].map((status, i) => (
                  <tr key={i}>
                    <td>{status.label}</td>
                    <td>{status.key}</td>
                    <td>{status.code}</td>
                    <td><span className={`dot ${status.color}`} /></td>
                    <td>
                      <button className="action-btn"><FaEdit /></button>
                      <button className="action-btn"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="settings-meetings">
            <h4>Attendance Sessions/Meetings</h4>
            <p className="section-subtitle">
              Manage settings like whether you want Subjects wise attendance or not and set sessions if you need attendance for multiple times each day
            </p>
            <div className="toggle-row">
              Subjects wise attendance?
              <button className="yes">Yes</button>
              <button className="no">No</button>
            </div>
            <div className="toggle-row">
              Multiple sessions each day?
              <button className="yes">Yes</button>
              <button className="no">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


