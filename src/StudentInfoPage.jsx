// src/pages/StudentFieldsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentInfoPage.css';

const StudentFieldsPage = () => {
  const navigate = useNavigate();
  const goToDashboard = () => navigate('/admin');

  const cards = [
    {
      title: '📘 Class & Subjects',
      items: [
        { label: '📚 Class & Subjects', path: '/admin/student-info/class-subjects' },
      ],
    },
    {
      title: '🧑‍🎓 Students',
      items: [
        { label: '👥 Students', path: '/admin/student-info/students' },
        { label: '📝 Student Fields', path: '/admin/student-info/student-fields' },
      ],
    },
   
    {
      title: '📊 Assessment & Gradings',
      items: [
        { label: '🧾 Assessment & Gradings', path: '/admin/student-info/assessment' },
      ],
    },
    {
      title: '🕒 Attendance',
      items: [
        { label: '✅ Attendance', path: '/admin/student-info/attendance' },
      ],
    },
    {
      title: '🏥 Health Records',
      items: [
        { label: '🧒 Students', path: '/admin/student-info/health-students' },
       
      ],
    },
    {
      title: '📚 Library',
      items: [
        { label: '📖 Books', path: '/admin/student-info/books' },
        { label: '📌 Check In/Out Log', path: '/admin/student-info/book-log' },
        
      ],
    },
    {
      title: '👩‍🏫 Teachers/Admin Staff',
      items: [
        { label: '👥 Teachers/Admin', path: "/teachersd" },
        { label: '📅 Subjects Allocation', path: '/subject-allocation' },
        { label: '🛠️ Teachers Fields', path: '/admin/student-info/teacher-fields' },
      ],
    },
  ];

  return (
    <div className="module-page">
      <div className="navbar">
        <button className="nav-btn" onClick={goToDashboard}><b>Go back to Dashboard</b></button>
      </div>
      <h2 className="page-title">📝 Student Fields</h2>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div key={index} className="info-card">
            <h3>{card.title}</h3>
            <ul>
              {card.items.map((item, idx) => (
                <li key={idx} onClick={() => navigate(item.path)}>{item.label}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentFieldsPage;



