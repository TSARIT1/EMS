import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentInfoPage.css';

import {
  FaBook,
  FaUsers,
  FaClipboardList,
  FaRegCalendarCheck,
  FaHeartbeat,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaRegAddressBook,
  FaBookOpen,
  FaClipboardCheck,
  FaUserCog,
} from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { AiOutlineTool } from 'react-icons/ai';

const StudentFieldsPage = () => {
  const navigate = useNavigate();
  const goToDashboard = () => navigate('/admin');

  const cards = [
    {
      icon: <FaBook />,
      title: 'Class & Subjects',
      items: [
        { label: 'Class & Subjects', path: '/admin/student-info/class-subjects', icon: <FaBook /> },
      ],
    },
    {
      icon: <FaUserGraduate />,
      title: 'Students',
      items: [
        { label: 'Students', path: '/admin/student-info/students', icon: <FaUsers /> },
        { label: 'Student Fields', path: '/admin/student-info/student-fields', icon: <FaClipboardList /> },
      ],
    },
    {
      icon: <FaClipboardCheck />,
      title: 'Assessment & Gradings',
      items: [
        { label: 'Assessment & Gradings', path: '/admin/student-info/assessment', icon: <FaClipboardCheck /> },
      ],
    },
    {
      icon: <FaRegCalendarCheck />,
      title: 'Attendance',
      items: [
        { label: 'Attendance', path: '/admin/student-info/attendance', icon: <FaRegCalendarCheck /> },
      ],
    },
    {
      icon: <FaHeartbeat />,
      title: 'Health Records',
      items: [
        { label: 'Students', path: '/admin/student-info/health-students', icon: <FaUserGraduate /> },
      ],
    },
    {
      icon: <MdLibraryBooks />,
      title: 'Library',
      items: [
        { label: 'Books', path: '/admin/student-info/books', icon: <FaBookOpen /> },
        { label: 'Check In/Out Log', path: '/admin/student-info/book-log', icon: <BsJournalBookmarkFill /> },
      ],
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'Teachers/Admin Staff',
      items: [
        { label: 'Teachers/Admin', path: "/teachersd", icon: <FaUsers /> },
        { label: 'Subjects Allocation', path: '/subject-allocation', icon: <FaRegAddressBook /> },
        { label: 'Teachers Fields', path: '/admin/student-info/teacher-fields', icon: <AiOutlineTool /> },
      ],
    },
  ];

  return (
    <div className="module-page">
      <div className="navbar">
        <button className="nav-btn" onClick={goToDashboard}><b>Go back to Dashboard</b></button>
      </div>
      <h2 className="page-title"><FaClipboardList /> Student Fields</h2>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div key={index} className="info-card">
            <h3><span className="card-icon">{card.icon}</span> {card.title}</h3>
            <ul>
              {card.items.map((item, idx) => (
                <li key={idx} onClick={() => navigate(item.path)}>
                  <span className="card-icon">{item.icon}</span> {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentFieldsPage;




