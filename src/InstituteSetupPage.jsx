import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InstituteSetupPage.css';

const InstituteSetupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    instituteType: '',
    role: '',
    timezone: '',
    studentSize: '',
    hearAboutUs: '',
    startType: 'fresh',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStart = () => {
    navigate('/admin');
  };

  return (
    <div className="setup-page">
      <div className="setup-left">
        <h1>Leading the Way in Education Technology</h1>
        
      </div>

      <div className="setup-right">
        <h2>Almost Done! 🎉</h2>
        <p>Set up your institute profile and you're done with account setup.</p>

        <div className="form-group">
          <label>Institute Type*</label>
          <select name="instituteType" value={formData.instituteType} onChange={handleChange}>
            <option value="">Select Institute Type</option>
            <option value="Academy">Academy</option>
            <option value="Schools / K-12">Schools / K-12</option>
            <option value="University">University</option>
          </select>
        </div>

        <div className="form-group">
          <label>Your Role in the Institute*</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Your Role</option>
            <option value="Marketing">Marketing</option>
            <option value="Admissions">Admissions</option>
            <option value="Principal">Principal</option>
            <option value="C-level">C-level</option>
          </select>
        </div>

     <div className="form-group">
          <label>Student Size*</label>
          <input
            type="number"
            name="studentSize"
            value={formData.studentSize}
            onChange={handleChange}
            placeholder="Enter number of students"
          />
        </div>

        <div className="form-group radio-group">
          <label>Just confirm, how you want to start*</label>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="startType"
               value=""
                checked={formData.startType === ''}
                onChange={handleChange}
              /> WithFreshData
            </label>
            <label>
              <input
                type="radio"
                name="startType"
                value=""
                checked={formData.startType === ''}
                onChange={handleChange}
              />
              WithDemoData
            </label>
          </div>
        </div>

        <button className="start-btn" onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  );
};

export default InstituteSetupPage;  
