import React, { useState } from 'react';
import './StudentListPage.css';

const StudentListPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    admissionNo: '',
    email: '',
    contact: '',
    bloodGroup: '',
    skills: '',
    facebook: '',
    linkedin: '',
    additionalDetails: '',
    address: '',
    zipCode: '',
    state: '',
    country: '',
    fatherName: '',
    motherName: '',
    parentContact: '',
    parentEmail: ''
  });

  const handleAddStudent = () => {
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setStudents([...students, formData]);
    setFormData({
      firstName: '',
      lastName: '',
      admissionNo: '',
      email: '',
      contact: '',
      bloodGroup: '',
      skills: '',
      facebook: '',
      linkedin: '',
      additionalDetails: '',
      address: '',
      zipCode: '',
      state: '',
      country: '',
      fatherName: '',
      motherName: '',
      parentContact: '',
      parentEmail: ''
    });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  const handleEdit = (index) => {
    const student = students[index];
    setFormData(student);
    handleDelete(index);
    setShowForm(true);
  };

  return (
    <div className="student-form-wrapper">
      {!showForm ? (
        <>
          <div className="student-list-header">
            <h2>📘 Students</h2>
            <button className="add-student-btn" onClick={handleAddStudent}>➕ Add Students</button>
          </div>

          <div className="student-filters">
            <select><option>Default Academic Session</option></select>
            <select><option>Select Class</option></select>
            <select><option>Select Section</option></select>
            <select><option>Select Subjects</option></select>

            <div className="filter-right">
              <span className="status-btn">Enrollment Status</span>
              <span className="status-btn">📋</span>
              <span className="status-btn">⬇️</span>
              <span className="status-btn">🗂️</span>
              <span className="status-btn">0 Selected ▾</span>
            </div>
          </div>

          {students.length === 0 ? (
            <div className="no-record">
              <p>No record found.</p>
            </div>
          ) : (
            <table className="student-table">
              <thead>
                <tr>
                  <th>👤 Student Profile</th>
                  <th>Student Name</th>
                  <th>Student Type</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, index) => (
                  <tr key={index}>
                    <td><span role="img" aria-label="avatar">👤</span></td>
                    <td>{s.firstName} {s.lastName}</td>
                    <td>Regular</td>
                    <td>{s.contact}</td>
                    <td>{s.email}</td>
                    <td>
                      <button onClick={() => handleEdit(index)}>✏️</button>
                      <button onClick={() => handleDelete(index)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <>
          <div className="header">
            <h2>➕ Add Students</h2>
          </div>

          <div className="form-body scrollable">
            <div className="form-section">
              <h4>📚 Academic Details</h4>
              <div className="row">
                <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              <input type="text" placeholder="Admission No" name="admissionNo" value={formData.admissionNo} onChange={handleChange} />
            </div>

            <div className="form-section">
              <h4>📅 Personal Information</h4>
              <div className="row">
                <input type="email" placeholder="Student Email" name="email" value={formData.email} onChange={handleChange} />
                <input type="text" placeholder="Student Contact" name="contact" value={formData.contact} onChange={handleChange} />
              </div>
              <input type="text" placeholder="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
            </div>

            <div className="form-section">
              <h4>💼 Skills</h4>
              <input type="text" placeholder="Skills (e.g. HTML, CSS, JavaScript)" name="skills" value={formData.skills} onChange={handleChange} />
            </div>

            <div className="form-section">
              <h4>🌐 Social Details</h4>
              <div className="row">
                <input type="text" placeholder="Facebook Link" name="facebook" value={formData.facebook} onChange={handleChange} />
                <input type="text" placeholder="LinkedIn Link" name="linkedin" value={formData.linkedin} onChange={handleChange} />
              </div>
            </div>

            <div className="form-section">
              <h4>📝 Additional Details</h4>
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
              <button className="save-btn" onClick={handleSave}>✔ Save</button>
              <button className="cancel-btn">❌ Cancel</button>
              <button className="back-btn" onClick={handleBack}>🔙 Back</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentListPage;






