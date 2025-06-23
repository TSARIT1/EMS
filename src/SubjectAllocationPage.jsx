import React, { useState } from 'react';
import './SubjectAllocationPage.css';
import axios from 'axios';

const SubjectAllocationPage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetSubjects = async () => {
    if (!selectedClass || !selectedSection) {
      alert("Please select both class and section.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('/api/subjects', {
        params: {
          className: selectedClass,
          section: selectedSection
        }
      });
      setSubjects(response.data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      alert('Failed to fetch subjects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subject-allocation-container">
      <h2 className="title">Subjects</h2>

      <div className="selector-row">
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          {/* Add more options as needed */}
        </select>

        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
          <option value="">Select Section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>

        <button onClick={handleGetSubjects}>
          {loading ? 'Loading...' : 'Get Subjects'}
        </button>
      </div>

      <div className="subjects-table">
        {subjects.length === 0 && !loading && (
          <p className="no-subjects">No subjects found.</p>
        )}
        {subjects.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Teacher</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={subject._id || index}>
                  <td>{index + 1}</td>
                  <td>{subject.name}</td>
                  <td>{subject.code}</td>
                  <td>{subject.teacherName || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SubjectAllocationPage;

