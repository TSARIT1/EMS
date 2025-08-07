import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageClassSchedule.css';

const ManageClassSchedule = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Class Schedule Categories');
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    // fetchData();
  }, []);

  const tabs = [
    'Class Schedule Categories',
    'Teachers Class Schedule',
    'Resources',
    'Settings'
  ];

  const handleBack = () => {
    navigate('/admin/schedules-communication');
  };

  const handleAddClick = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className="manage-schedule">
      <div className="header">
        <button className="back-btn" onClick={handleBack}>← Back</button>
        <h1>Manage Class Schedule</h1>
      </div>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="content">
        {activeTab === 'Class Schedule Categories' && (
          <div className="section">
            <div className="section-header">
              <h2>Categories</h2>
              <button onClick={() => handleAddClick('category')}>+ Add</button>
            </div>
            <div className="placeholder">No categories found.</div>
          </div>
        )}

        {activeTab === 'Teachers Class Schedule' && (
          <div className="section">
            <div className="section-header">
              <h2>Teachers Schedule</h2>
              <button onClick={() => handleAddClick('teacherSchedule')}>+ Add</button>
            </div>
            <div className="placeholder">No schedules found.</div>
          </div>
        )}

        {activeTab === 'Resources' && (
          <div className="section">
            <div className="section-header">
              <h2>Resources</h2>
              <button onClick={() => handleAddClick('resource')}>+ Add</button>
            </div>
            <div className="placeholder">No resources found.</div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="section">
            <h2>Templates</h2>
            <p>Use templates to quickly configure schedule settings.</p>
            <button onClick={() => handleAddClick('template')}>+ Add Template</button>
          </div>
        )}
      </div>

      {modalType && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add {modalType.charAt(0).toUpperCase() + modalType.slice(1)}</h3>
            {modalType === 'category' && (
              <>
                <input type="text" placeholder="Category Name" />
                <textarea placeholder="Description"></textarea>
              </>
            )}
            {modalType === 'teacherSchedule' && (
              <>
                <input type="text" placeholder="Teacher Name" />
                <input type="text" placeholder="Subject" />
                <input type="time" placeholder="Start Time" />
                <input type="time" placeholder="End Time" />
              </>
            )}
            {modalType === 'resource' && (
              <>
                <input type="text" placeholder="Resource Title" />
                <input type="url" placeholder="Resource Link" />
              </>
            )}
            {modalType === 'template' && (
              <>
                <input type="text" placeholder="Template Name" />
                <textarea placeholder="Details"></textarea>
              </>
            )}
            <div className="modal-actions">
              <button className="save">Save</button>
              <button className="close" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClassSchedule;


