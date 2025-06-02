import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentInfoPage.css'; // reuse styles

const SchedulesCommunicationPage = () => {
  const navigate = useNavigate();
  const goToDashboard = () => navigate('/admin');

  const cards = [
    {
      icon: '🕑',
      title: 'Messaging',
      items: [
        { label: 'Emails', path: '/admin/schedules/emails' },
        { label: 'SMS', path: '/admin/schedules/sms' },
        { label: 'WhatsApp', path: '/admin/schedules/whatsapp' },
      ],
    },
    {
      icon: '🗓️',
      title: 'Events',
      items: [
        { label: 'Events', path: '/admin/schedules/events' },
      ],
    },
    {
      icon: '📋',
      title: 'Class Schedule',
      items: [
        { label: 'Manage Class Schedule', path: '/admin/schedules/class-schedule' },
      ],
    },
    {
      icon: '📄',
      title: 'Notice Board',
      items: [
        { label: 'Notices', path: '/admin/schedules/notices' },
      ],
    },
   
   
  ];

  return (
    <div className="module-page">
      <div className="navbar">
        <button className="nav-btn" onClick={goToDashboard}>Go back to Dashboard</button>
      </div>
      <h2 className="page-title">📆 Schedules & Communication</h2>
      <div className="card-grid">
        {cards.map((card, i) => (
          <div key={i} className="info-card">
            <h3>
              <span className="card-icon">{card.icon}</span> {card.title}
            </h3>
            <ul className="card-items">
              {card.items.map((item, j) => (
                <li key={j} onClick={() => navigate(item.path)}> {item.label}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulesCommunicationPage;


