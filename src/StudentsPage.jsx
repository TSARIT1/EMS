import React, { useState } from 'react';
import './StudentsPage.css';

const StudentsPage = () => {
  const [academicSession, setAcademicSession] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [section, setSection] = useState('');
  const [viewClicked, setViewClicked] = useState(false);

  const handleView = () => {
    setViewClicked(true);
  };

  return (
    <div className="students-page">
      <h2>Students</h2>
      <div className="filters">
        <select value={academicSession} onChange={e => setAcademicSession(e.target.value)}>
          <option value="">Default Academic Session</option>
          <option value="2024-25">2024-25</option>
          <option value="2023-24">2023-24</option>
        </select>

        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          <option value="Class 1">Class 1</option>
          <option value="Class 2">Class 2</option>
        </select>

        <select value={section} onChange={e => setSection(e.target.value)}>
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>

        <button className="view-button" onClick={handleView}>
          🔍 View
        </button>
      </div>

      {viewClicked ? (
        <div className="no-records">No record found.</div>
      ) : (
        <div className="filter-hint">🔍 Filter</div>
      )}
    </div>
  );
};

export default StudentsPage; 

