import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegFileAlt, FaPlug, FaCog, FaBuilding } from 'react-icons/fa';
import './StudentInfoPage.css';

const AdministrationPage = () => {
  const navigate = useNavigate();
  const goToDashboard = () => navigate('/admin');

  const cards = [
    {
      icon: <FaRegFileAlt />,
      title: 'Reports',
      items: [
        { label: 'View Reports', path: '/admin/administration/reports' },
      ],
    },
    {
      icon: <FaPlug />,
      title: 'Integrations',
      items: [
        { label: 'Payment Gateways', path: '/admin/administration/payment' },
      ],
    },
    {
      icon: <FaCog />,
      title: 'Organisation Settings',
      items: [
        { label: 'Manage Org. Profile', path: '/admin/administration/org-profile' },
        { label: 'Terminology', path: '/admin/administration/terminology' },
        { label: 'View All', path: '/admin/administration/view-all' },
      ],
    },
  ];

  return (
    <div className="module-page">
      <div className="navbar">
        <button className="nav-btn" onClick={goToDashboard}>Go back to Dashboard</button>
      </div>
      <h2 className="page-title"><FaBuilding style={{ marginRight: '8px' }} /> Administration</h2>
      <div className="card-grid">
        {cards.map((card, i) => (
          <div key={i} className="info-card">
            <h3><span className="card-icon">{card.icon}</span> {card.title}</h3>
            <ul>
              {card.items.map((item, j) => (
                <li key={j} onClick={() => navigate(item.path)}>{item.label}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdministrationPage;

