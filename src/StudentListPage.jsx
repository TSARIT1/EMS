import React, { useState, useEffect } from 'react';
import './StudentListPage.css';
import axios from 'axios';

import { FaUser, FaPlus, FaTrash, FaEdit, FaFilter, FaDownload, FaListUl } from 'react-icons/fa';

const StudentListPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', admissionNo: '', email: '', contact: '',
    bloodGroup: '', skills: '', facebook: '', linkedin: '',
    additionalDetails: '', address: '', zipCode: '', state: '', country: '',
    fatherName: '', motherName: '', parentContact: '', parentEmail: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const handleAddStudent = () => setShowForm(true);
  const handleBack = () => setShowForm(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/students', formData);
      fetchStudents();
      setShowForm(false);
      setFormData({
        firstName: '', lastName: '', admissionNo: '', email: '', contact: '',
        bloodGroup: '', skills: '', facebook: '', linkedin: '',
        additionalDetails: '', address: '', zipCode: '', state: '', country: '',
        fatherName: '', motherName: '', parentContact: '', parentEmail: ''
      });
    } catch (err) {
      console.error('Error saving student:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setShowForm(true);
  };

  return (
    <div className="student-form-wrapper">
      {!showForm ? (
        <>
          <div className="student-list-header">
            <h2><FaUser /> Students</h2>
            <button className="add-student-btn" onClick={handleAddStudent}><FaPlus /> Add Students</button>
          </div>

          <div className="student-filters">
            <select><option>Default Academic Session</option></select>
            <select><option>Select Class</option></select>
            <select><option>Select Section</option></select>
            <select><option>Select Subjects</option></select>

            <div className="filter-right">
              <span className="status-btn">Enrollment Status</span>
              <span className="status-btn"><FaListUl /></span>
              <span className="status-btn"><FaDownload /></span>
              <span className="status-btn"><FaFilter /></span>
              <span className="status-btn">0 Selected ▾</span>
            </div>
          </div>

          {students.length === 0 ? (
            <div className="no-record"><p>No record found.</p></div>
          ) : (
            <table className="student-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th><FaUser /> Profile</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, index) => (
                  <tr key={s._id || index}>
                    <td>{index + 1}</td>
                    <td><FaUser /></td>
                    <td>{s.firstName} {s.lastName}</td>
                    <td>Regular</td>
                    <td>{s.contact}</td>
                    <td>{s.email}</td>
                    <td>
                      <button onClick={() => handleEdit(s)}><FaEdit /></button>
                      <button onClick={() => handleDelete(s._id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <div className="modal-overlay">
          <div className="popup-form scrollable">
            <div className="header"><h2><FaPlus /> Add Students</h2></div>
            <div className="form-section">
              <h4>Academic Details</h4>
              <div className="row">
                <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              <input type="text" placeholder="Admission No" name="admissionNo" value={formData.admissionNo} onChange={handleChange} />
            </div>

            <div className="form-section">
              <h4>Personal Info</h4>
              <div className="row">
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                <input type="text" placeholder="Contact" name="contact" value={formData.contact} onChange={handleChange} />
              </div>
              <input type="text" placeholder="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
            </div>

            <div className="form-section">
              <h4>Skills & Social</h4>
              <input type="text" placeholder="Skills" name="skills" value={formData.skills} onChange={handleChange} />
              <div className="row">
                <input type="text" placeholder="Facebook" name="facebook" value={formData.facebook} onChange={handleChange} />
                <input type="text" placeholder="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} />
              </div>
            </div>

            <div className="form-section">
              <h4>Additional Details</h4>
              <textarea placeholder="Address" name="address" value={formData.address} onChange={handleChange}></textarea>
              <div className="row">
                <input type="text" placeholder="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                <input type="text" placeholder="State" name="state" value={formData.state} onChange={handleChange} />
                <input type="text" placeholder="Country" name="country" value={formData.country} onChange={handleChange} />
              </div>
              <div className="row">
                <input type="text" placeholder="Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                <input type="text" placeholder="Mother Name" name="motherName" value={formData.motherName} onChange={handleChange} />
              </div>
              <div className="row">
                <input type="text" placeholder="Parent Contact" name="parentContact" value={formData.parentContact} onChange={handleChange} />
                <input type="text" placeholder="Parent Email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} />
              </div>
              <textarea placeholder="Additional Info" name="additionalDetails" value={formData.additionalDetails} onChange={handleChange}></textarea>
            </div>

            <div className="form-actions">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={handleBack}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentListPage;









