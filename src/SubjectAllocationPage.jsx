import React, { useState } from 'react';
import './SubjectAllocationPage.css';

const SubjectAllocationPage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const handleGetSubjects = () => {
    // You can fetch subjects based on class & section here
    alert(`Fetching subjects for Class: ${selectedClass}, Section: ${selectedSection}`);
  };

  return (
    <div className="subject-allocation-container">
      <h2 className="title">Subjects</h2>
      <div className="selector-row">
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          {/* Add more options */}
        </select>

        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
          <option value="">Select Section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>

        <button onClick={handleGetSubjects}>Get Subjects</button>
      </div>
    </div>
  );
};

export default SubjectAllocationPage;
