import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import AdminDashboard from './AdminDashboard';
import AdminSettings from './AdminSettings';
import StudentInfoPage from './StudentInfoPage';
import SchedulesCommunicationPage from './SchedulesCommunicationPage';
import FinanceAccountingPage from './FinanceAccountingPage';
import AdministrationPage from './AdministrationPage';
import ClassSubjectsPage from './ClassSubjectsPage';
import StudentListPage from './StudentListPage';
import StudentFieldsPage from './StudentFieldsPage';
import TeacherListPage from './TeacherListPage';
import SubjectAllocationPage from './SubjectAllocationPage';
import TeacherFieldsPage from './TeacherFieldsPage';
import AssessmentAndGradingsPage from './AssessmentAndGradingsPage';
import AttendancePage from './AttendancePage';
import StudentsPage from './StudentsPage';
import BooksPage from './BooksPage';
import CheckInOutLog from './CheckInOutLog';
import FeesAndInvoicing from './FeesAndInvoicing';
import TeacherDashboard from './TeacherDashboard';
import SubjectsPage from './SubjectsPage';
import StudentDashboard from './StudentDashboard';
import RegisterPage from './RegisterPage';
import OtpVerificationPage from './OtpVerificationPage';
import InstituteSetupPage from './InstituteSetupPage';

import './App.css';



function LoginPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('');
  const navigate = useNavigate();

  const handleSelect = (view) => {
    setSelectedView(view);
    setMenuOpen(false);
    
  };

  const handleLogin = () => {
    if (selectedView === 'admin') {
      navigate('/admin');
    } else if (selectedView === 'teachers') {
      navigate('/teachers');
    } else if (selectedView === 'students') {
      navigate('/studentsDash'); 
    } else if (selectedView === 'parents') {
      navigate('/parents');
    }
  };

  return (
    <div className="Edc_img">
      <div className="navbar">
        <div className="logo">
          <div className="logo-image"></div>
          <span className="demo"><b>Educational Management</b></span>
        </div>
        <div className="menu-area">
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>&#9776;</div>
          {menuOpen && (
            <div className="login-box">
              <button onClick={() => handleSelect('overview')}>Overview</button>
            </div>
          )}
        </div>
      </div>

      <div className="login-buttons">
        <button onClick={() => handleSelect('admin')}><b>Sign in as Admin</b></button>
        <button onClick={() => handleSelect('teachers')}><b>Sign in as Teachers</b></button>
        <button onClick={() => handleSelect('students')}><b>Sign in as Students</b></button>
        <button onClick={() => handleSelect('parents')}><b>Sign in as Parents</b></button>
      </div>

      {selectedView === 'overview' && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="close-btn" onClick={() => setSelectedView('')}>X</div>
            <h2>Overview</h2>
            <p>This system manages student admission, attendance, fees, exams, and more.</p>
          </div>
        </div>
      )}

      {['admin', 'teachers', 'students', 'parents'].includes(selectedView) && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="close-btn" onClick={() => setSelectedView('')}>x</div>
            <h2>Login as {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}</h2>
            <input type="text" placeholder="Username or Email" />
            <input type="password" placeholder="Password" />
            <a href="#" className="forgot-link">Forgot your password?</a>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const getUser = () =>{
  fetch("/api/user")
  .then(res => res.json())
  .then(json => console.log(json))
}

useEffect(()=>{
  
  getUser()

},[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/student-info" element={<StudentInfoPage />} />
        <Route path="/admin/schedules-communication" element={<SchedulesCommunicationPage />} />
        <Route path="/admin/finance-accounting" element={<FinanceAccountingPage />} />
        <Route path="/admin/administration" element={<AdministrationPage />} />
        <Route path="/admin/student-info/class-subjects" element={<ClassSubjectsPage />} />
        <Route path="/admin/student-info/students" element={<StudentListPage />} />
        <Route path="/admin/student-info/student-fields" element={<StudentFieldsPage />} />
        <Route path="/teachersd" element={<TeacherListPage />} />
        <Route path="/subject-allocation" element={<SubjectAllocationPage />} />
        <Route path="/admin/student-info/teacher-fields" element={<TeacherFieldsPage />} />
        <Route path="/admin/student-info/assessment" element={<AssessmentAndGradingsPage />} />
        <Route path="/admin/student-info/attendance" element={<AttendancePage />} />
        <Route path="/admin/student-info/health-students" element={<StudentsPage />} />
        <Route path="/admin/student-info/books" element={<BooksPage />} />
        <Route path="/admin/student-info/book-log" element={<CheckInOutLog />} />
        <Route path="/admin/finance/fees" element={<FeesAndInvoicing />} />
        <Route path="/teachers" element={<TeacherDashboard />} />
        <Route path="/teachersDash/subjects" element={<SubjectsPage />} />
        <Route path="/studentsDash" element={<StudentDashboard />} /> 
        <Route path="/studentsDash/subjects" element={<SubjectsPage />} />
        <Route path="/" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/setup" element={<InstituteSetupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;









  



