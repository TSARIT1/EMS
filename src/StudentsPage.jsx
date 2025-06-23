import React, { useState } from 'react';
import './StudentsPage.css';
import axios from 'axios';

const StudentsPage = () => {
  const [academicSession, setAcademicSession] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [section, setSection] = useState('');
  const [viewClicked, setViewClicked] = useState(false);
  const [students, setStudents] = useState([]);

  const handleView = async () => {
    setViewClicked(true);

    try {
      const res = await axios.get('/api/students', {
        params: {
          session: academicSession,
          className: selectedClass,
          section: section
        }
      });

      setStudents(res.data || []);
    } catch (err) {
      console.error('Error fetching students:', err);
      setStudents([]);
    }
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
        students.length === 0 ? (
          <div className="no-records">No record found.</div>
        ) : (
          <div className="student-results">
            <table className="students-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Admission No</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id || index}>
                    <td>{index + 1}</td>
                    <td>{student.firstName} {student.lastName}</td>
                    <td>{student.admissionNo}</td>
                    <td>{student.className}</td>
                    <td>{student.section}</td>
                    <td>{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="filter-hint">🔍 Filter</div>
      )}
    </div>
  );
};

export default StudentsPage;

