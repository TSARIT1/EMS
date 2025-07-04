
import React, { useState } from 'react';
import './TeacherListPage.css';

const TeacherListPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    employeeType: '',
    firstName: '',
    lastName: '',
    teacherId: '',
    email: '',
    contact: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    address: '',
    zipCode: '',
    state: '',
    country: '',
    skills: '',
    facebook: '',
    linkedin: '',
    profileSummary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTeacher = () => {
    setFormData({
      employeeType: '',
      firstName: '',
      lastName: '',
      teacherId: '',
      email: '',
      contact: '',
      dob: '',
      gender: '',
      bloodGroup: '',
      address: '',
      zipCode: '',
      state: '',
      country: '',
      skills: '',
      facebook: '',
      linkedin: '',
      profileSummary: ''
    });
    setEditIndex(null);
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
    setEditIndex(null);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...teachers];
      updated[editIndex] = formData;
      setTeachers(updated);
    } else {
      setTeachers([...teachers, formData]);
    }
    setShowForm(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(teachers[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = teachers.filter((_, i) => i !== index);
    setTeachers(updated);
  };

  return (
    <div className="teacher-form-wrapper">
      {!showForm ? (
        <>
          <div className="teacher-list-header">
            <h2>👥 Teachers</h2>
            <button className="add-teacher-btn" onClick={handleAddTeacher}>➕ Add Teacher</button>
          </div>

          <table className="teacher-table">
            <thead>
              <tr>
                <th>Profile Picture</th>
                <th>Teachers Name</th>
                <th>Teacher Id</th>
                <th>Employee Type</th>
                <th>Contact Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td>
                    <img src="https://via.placeholder.com/40" alt="Profile" />
                  </td>
                  <td>{teacher.firstName} {teacher.lastName}</td>
                  <td>{teacher.teacherId}</td>
                  <td>{teacher.employeeType}</td>
                  <td>{teacher.contact}</td>
                  <td>{teacher.email}</td>
                  <td className="actions">
                    <button className="edit" onClick={() => handleEdit(index)}>✏️</button>
                    <button className="delete" onClick={() => handleDelete(index)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="form-body fade-in">
          <h3>👤 Teachers/Staff Details</h3>

          <div className="row">
            <select name="employeeType" value={formData.employeeType} onChange={handleChange}>
              <option value="">Select Employee Type</option>
              <option value="Non-academic">Non-academic</option>
              <option value="Academic">Academic</option>
            </select>
            <input type="text" name="teacherId" placeholder="Teacher ID" value={formData.teacherId} onChange={handleChange} />
          </div>

          <div className="row">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          </div>

          <div className="row">
            <input type="text" name="contact" placeholder="Contact Phone" value={formData.contact} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="row">
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <h4>📄 Additional Information</h4>

          <div className="row">
            <input type="text" name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          </div>

          <div className="row">
            <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          </div>

          <h4>🛠️ Skills & Social Details</h4>

          <textarea name="profileSummary" placeholder="Profile Summary" value={formData.profileSummary} onChange={handleChange}></textarea>

          <div className="row">
            <input type="text" name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} />
            <input type="text" name="facebook" placeholder="Facebook Profile Link" value={formData.facebook} onChange={handleChange} />
            <input type="text" name="linkedin" placeholder="LinkedIn Profile Link" value={formData.linkedin} onChange={handleChange} />
          </div>

          <div className="form-actions">
            <button className="save-btn" onClick={handleSave}>✔ Save</button>
            <button className="cancel-btn" onClick={handleBack}>❌ Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherListPage; 

