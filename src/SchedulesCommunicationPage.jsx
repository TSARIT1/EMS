import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaClock,
  FaCalendarAlt,
  FaClipboardList,
  FaStickyNote
} from 'react-icons/fa';
import './StudentInfoPage.css';

const SchedulesCommunicationPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToDashboard = () => navigate('/admin');

  const defaultCards = [
    {
      icon: <FaClock />,
      title: 'Messaging',
      items: [
        { label: 'Emails', path: '/admin/schedules/emails' },
        { label: 'SMS', path: '/admin/schedules/sms' },
        { label: 'WhatsApp', path: '/admin/schedules/whatsapp' },
      ],
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Events',
      items: [{ label: 'Events', path: '/admin/schedules/events' }],
    },
    {
      icon: <FaClipboardList />,
      title: 'Class Schedule',
      items: [{ label: 'Manage Class Schedule', path: '/admin/schedules/class-schedule' }],
    },
    {
      icon: <FaStickyNote />,
      title: 'Notice Board',
      items: [{ label: 'Notices', path: '/admin/schedules/notices' }],
    },
  ];

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get('/api/schedules-communication');
        setCards(res.data);
      } catch (err) {
        console.error('Error fetching schedule communication data:', err);
        setCards(defaultCards);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="module-page">
      <div className="navbar">
        <button className="nav-btn" onClick={goToDashboard}>Go back to Dashboard</button>
      </div>
      <h2 className="page-title">
        <FaCalendarAlt style={{ marginRight: '8px' }} />
        Schedules & Communication
      </h2>

      {loading ? (
        <p>Loading modules...</p>
      ) : (
        <div className="card-grid">
          {cards.map((card, i) => (
            <div key={i} className="info-card">
              <h3>
                <span className="card-icon">{card.icon}</span> {card.title}
              </h3>
              <ul className="card-items">
                {card.items.map((item, j) => (
                  <li key={j} onClick={() => navigate(item.path)}>{item.label}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SchedulesCommunicationPage;




