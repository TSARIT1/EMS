import React, { useState } from 'react';
import './SubjectsPage.css';

const SubjectsPage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  return (
    <div className="subject-page">
      <div className="header">
        <h2>Learning Management System</h2>
      </div>
      <div className="selector-container">
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          <option value="class1">Class 1</option>
          <option value="class2">Class 2</option>
        </select>

        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
          <option value="">Select Section</option>
          <option value="a">Section A</option>
          <option value="b">Section B</option>
        </select>
      </div>
      <div className="message">
        <h3>Select Class to render Subjects data</h3>
      </div>
    </div>
  );
};

export default SubjectsPage;