import React, { useState } from 'react';
import axios from 'axios';
import './SubjectsPage.css';

const SubjectsPage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchSubjects = async () => {
    if (!selectedClass || !selectedSection) {
      alert("Please select both class and section.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get('/api/subjects', {
        params: {
          className: selectedClass,
          section: selectedSection
        }
      });
      setSubjects(res.data || []);
      setFetched(true);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      alert("Failed to fetch subjects.");
    } finally {
      setLoading(false);
    }
  };

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

        <button onClick={fetchSubjects}>
          {loading ? 'Loading...' : 'Get Subjects'}
        </button>
      </div>

      <div className="message">
        {!fetched ? (
          <h3>Select Class to render Subjects data</h3>
        ) : subjects.length === 0 ? (
          <p>No subjects found.</p>
        ) : (
          <table className="subjects-table">
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

export default SubjectsPage;
