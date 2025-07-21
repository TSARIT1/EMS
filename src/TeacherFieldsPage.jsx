import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeacherFieldsPage.css';

const API_URL = 'http://127.0.0.1:8000/api/teachers/';

const initialFieldGroups = [
  {
    title: 'Teachers/Staff Details',
    fields: [
      'Employee Type*', 'Teacher Id*', 'First Name*', 'Last Name*',
      'Contact Phone*', 'Email*', 'Date of Birth*', 'Gender', 'Profile Picture'
    ]
  },
  {
    title: 'Additional Information',
    fields: ['Blood Group', 'Address', 'Zip Code', 'State', 'Country']
  },
  {
    title: 'Skills & Social Details',
    fields: ['Profile Summary', 'Skills', 'Facebook Profile Link', 'Linkedin Profile Link']
  }
];

const initialFormData = {
  employee_type: '',
  teacher_id: '',
  first_name: '',
  last_name: '',
  contact_phone: '',
  email: '',
  date_of_birth: '',
  gender: '',
  profile_picture: null,
  blood_group: '',
  address: '',
  zip_code: '',
  state: '',
  country: '',
  profile_summary: '',
  skills: '',
  facebook_profile: '',
  linkedin_profile: ''
};

export default function TeachersFieldsPage() {
  const [groups, setGroups] = useState(initialFieldGroups);
  const [expanded, setExpanded] = useState(initialFieldGroups.map(() => true));
  const [formData, setFormData] = useState(initialFormData);
  const [teachers, setTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      alert('Failed to fetch teachers data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, profile_picture: 'Only JPEG, PNG, or GIF images are allowed' }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB
        setErrors(prev => ({ ...prev, profile_picture: 'Image must be less than 2MB' }));
        return;
      }
      
      setFormData({
        ...formData,
        profile_picture: file
      });
      setErrors(prev => ({ ...prev, profile_picture: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const formDataToSend = new FormData();
      
      // Append all fields except profile_picture
      Object.keys(formData).forEach(key => {
        if (key !== 'profile_picture' && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Append the file if it exists
      if (formData.profile_picture instanceof File) {
        formDataToSend.append('profile_picture', formData.profile_picture);
      }

      let response;
      if (editingId) {
        response = await axios.put(`${API_URL}${editingId}/`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Teacher updated successfully');
      } else {
        response = await axios.post(API_URL, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Teacher added successfully');
      }
      
      resetForm();
      fetchTeachers();
    } catch (error) {
      console.error('Error saving teacher:', error);
      if (error.response) {
        if (error.response.status === 400) {
          // Handle validation errors
          setErrors(error.response.data);
        } else {
          alert(`Error: ${error.response.status} - ${error.response.statusText}`);
        }
      } else {
        alert('Failed to save teacher data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (teacher) => {
    setFormData({
      employee_type: teacher.employee_type,
      teacher_id: teacher.teacher_id,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      contact_phone: teacher.contact_phone,
      email: teacher.email,
      date_of_birth: teacher.date_of_birth,
      gender: teacher.gender,
      profile_picture: teacher.profile_picture, // This will be a URL string
      blood_group: teacher.blood_group,
      address: teacher.address,
      zip_code: teacher.zip_code,
      state: teacher.state,
      country: teacher.country,
      profile_summary: teacher.profile_summary,
      skills: teacher.skills,
      facebook_profile: teacher.facebook_profile,
      linkedin_profile: teacher.linkedin_profile
    });
    setEditingId(teacher.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        setIsLoading(true);
        await axios.delete(`${API_URL}${id}/`);
        alert('Teacher deleted successfully');
        fetchTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert('Failed to delete teacher');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setErrors({});
  };

  const toggleGroup = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const deleteGroup = (index) => {
    const newGroups = groups.filter((_, i) => i !== index);
    const newExpanded = expanded.filter((_, i) => i !== index);
    setGroups(newGroups);
    setExpanded(newExpanded);
  };

  return (
    <div className="teacher-fields-container">
      <div className="field-sidebar">
        <h3>Add Field</h3>
        <div className="field-option">🅰️ Text</div>
        <div className="field-option">📝 Textarea</div>
        <div className="field-option">📅 Date Field</div>
        <div className="field-option">📂 Selection</div>
        <div className="field-option">☑️ Checkbox</div>
        <div className="add-group">➕ Add Field Group</div>
      </div>

      <div className="field-groups-scroll">
        <form onSubmit={handleSubmit}>
          {groups.map((group, index) => (
            <div className="field-group" key={index}>
              <div className="field-group-header">
                <button 
                  type="button" 
                  onClick={() => toggleGroup(index)} 
                  className="toggle-icon"
                >
                  {expanded[index] ? '▾' : '▸'}
                </button>
                <span className="group-title">{group.title}</span>
                <div className="group-actions">
                  <span 
                    className="delete-icon" 
                    onClick={() => deleteGroup(index)}
                  >
                    🗑️
                  </span>
                  <span className="drag-icon">⠿</span>
                </div>
              </div>
              
              {expanded[index] && (
                <div className="field-items">
                  {group.title === 'Teachers/Staff Details' && (
                    <>
                      <div className="field-item">
                        <label>Employee Type*</label>
                        <input
                          type="text"
                          name="employee_type"
                          value={formData.employee_type}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.employee_type && <span className="error">{errors.employee_type}</span>}
                      </div>
                      <div className="field-item">
                        <label>Teacher Id*</label>
                        <input
                          type="text"
                          name="teacher_id"
                          value={formData.teacher_id}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.teacher_id && <span className="error">{errors.teacher_id}</span>}
                      </div>
                      <div className="field-item">
                        <label>First Name*</label>
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.first_name && <span className="error">{errors.first_name}</span>}
                      </div>
                      <div className="field-item">
                        <label>Last Name*</label>
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.last_name && <span className="error">{errors.last_name}</span>}
                      </div>
                      <div className="field-item">
                        <label>Contact Phone*</label>
                        <input
                          type="tel"
                          name="contact_phone"
                          value={formData.contact_phone}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.contact_phone && <span className="error">{errors.contact_phone}</span>}
                      </div>
                      <div className="field-item">
                        <label>Email*</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                      </div>
                      <div className="field-item">
                        <label>Date of Birth*</label>
                        <input
                          type="date"
                          name="date_of_birth"
                          value={formData.date_of_birth}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.date_of_birth && <span className="error">{errors.date_of_birth}</span>}
                      </div>
                      <div className="field-item">
                        <label>Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="field-item">
                        <label>Profile Picture</label>
                        <input
                          type="file"
                          name="profile_picture"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        {errors.profile_picture && <span className="error">{errors.profile_picture}</span>}
                        {formData.profile_picture && typeof formData.profile_picture === 'string' && (
                          <div className="current-image">
                            <p>Current Image:</p>
                            <img 
                              src={formData.profile_picture} 
                              alt="Current profile" 
                              style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Other field groups remain the same */}
                  {group.title === 'Additional Information' && (
                    <>
                      <div className="field-item">
                        <label>Blood Group</label>
                        <select
                          name="blood_group"
                          value={formData.blood_group}
                          onChange={handleInputChange}
                        >
                          <option value="">Select</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      <div className="field-item">
                        <label>Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="field-item">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          name="zip_code"
                          value={formData.zip_code}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="field-item">
                        <label>State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="field-item">
                        <label>Country</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}

                  {group.title === 'Skills & Social Details' && (
                    <>
                      <div className="field-item">
                        <label>Profile Summary</label>
                        <textarea
                          name="profile_summary"
                          value={formData.profile_summary}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="field-item">
                        <label>Skills</label>
                        <input
                          type="text"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="field-item">
                        <label>Facebook Profile Link</label>
                        <input
                          type="url"
                          name="facebook_profile"
                          value={formData.facebook_profile}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="field-item">
                        <label>Linkedin Profile Link</label>
                        <input
                          type="url"
                          name="linkedin_profile"
                          value={formData.linkedin_profile}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : editingId ? 'Update Teacher' : 'Add Teacher'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} disabled={isLoading}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Teachers List */}
        <div className="teachers-list">
          <h3>Teachers List</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.teacher_id}</td>
                    <td>{teacher.first_name} {teacher.last_name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.contact_phone}</td>
                    <td>
                      <button onClick={() => handleEdit(teacher)}>Edit</button>
                      <button onClick={() => handleDelete(teacher.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}