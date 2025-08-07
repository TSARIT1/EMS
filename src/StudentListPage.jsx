import React, { useEffect, useState } from 'react';
import './StudentListPage.css';
import axios from 'axios';

const StudentListPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', admission_no: '', email: '', contact: '',
    blood_group: '', skills: '', facebook: '', linkedin: '',
    additionalDetails: '', address: '', zipCode: '', state: '', country: '',
    father_name: '', mother_name: '', parent_contact: '', parent_email: ''
  });

  const handleAddStudent = () => setShowForm(true);
  const handleBack = () => setShowForm(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave =async () => {
    setStudents([...students, formData]);
    setFormData({
      first_name: '', last_name: '', admission_no: '', email: '', contact: '',
      blood_group: '', skills: '', facebook: '', linkedin: '',
      additionalDetails: '', address: '', zipCode: '', state: '', country: '',
      father_name: '', mother_name: '', parent_contact: '', parent_email: ''
    });
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/addstudents/',formData);
      console.log('data sent backend');
      alert("data submitted")
      
    } catch (error) {
      console.error(error)
      alert("data not submitted")
      
    }
    setShowForm(false);
  };

  const handleDelete = async(s) => {
   
    
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/api/addstudents/${s.id}/`);
      
    } catch (error) {
      console.error(error)
      
    }
  };

  const handleEdit = async (s) => {
    setShowForm(true);
    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/addstudents/${s.id}/`,formData);
      alert('updated success')


      
    } catch (error) {
      console.error(error);
      
      
    }
    
    
    
    
  };


  const fetchStudentData = async()=>{
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/addstudents/')
      
      setStudents(res.data)
      
    } catch (error) {
      console.error(error)
      
    }
  }
  useEffect(()=>{
    fetchStudentData()
    
  },[])

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
            <div className="no-record"><p>No record found.</p></div>
          ) : (
            <table className="student-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>👤 Profile</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, index) => (
                  <tr key={index}>
                    <td><span className="index-box">{index + 1}</span></td>
                    <td>👤</td>
                    <td>{s.first_name} {s.last_name}</td>
                    <td>Regular</td>
                    <td>{s.contact}</td>
                    <td>{s.email}</td>
                    <td>
                      <button onClick={() => handleEdit(s)}>✏️</button>
                      <button onClick={() => handleDelete(s)}>🗑️</button>
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
            <div className="header"><h2>➕ Add Students</h2></div>
            <div className="form-section">
              <h4>📚 Academic Details</h4>
              <div className="row">
                <input type="text" placeholder="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
                <input type="text" placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
              </div>
              <input type="text" placeholder="Admission No" name="admission_no" value={formData.admission_no} onChange={handleChange} />
            </div>

            <div className="form-section">
              <h4>📅 Personal Information</h4>
              <div className="row">
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                <input type="text" placeholder="Contact" name="contact" value={formData.contact} onChange={handleChange} />
              </div>
              <input type="text" placeholder="Blood Group" name="blood_group" value={formData.blood_group} onChange={handleChange} />
            </div>

            <div className="form-section">
              <h4>💼 Skills</h4>
              <input type="text" placeholder="Skills" name="skills" value={formData.skills} onChange={handleChange} />
            </div>

            <div className="form-section">
              <h4>🌐 Social</h4>
              <div className="row">
                <input type="text" placeholder="Facebook" name="facebook" value={formData.facebook} onChange={handleChange} />
                <input type="text" placeholder="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} />
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
                <input type="text" placeholder="Father Name" name="father_name" value={formData.father_name} onChange={handleChange} />
                <input type="text" placeholder="Mother Name" name="mother_name" value={formData.mother_name} onChange={handleChange} />
              </div>
              <div className="row">
                <input type="text" placeholder="Parent Contact" name="parent_contact" value={formData.parent_contact} onChange={handleChange} />
                <input type="text" placeholder="Parent Email" name="parent_email" value={formData.parent_email} onChange={handleChange} />
              </div>
              <textarea placeholder="Additional Info" name="additionalDetails" value={formData.additionalDetails} onChange={handleChange}></textarea>
            </div>

            <div className="form-actions">
              <button className="save-btn" onClick={handleSave}>✔ Save</button>
              <button className="cancel-btn" onClick={handleBack}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentListPage;









