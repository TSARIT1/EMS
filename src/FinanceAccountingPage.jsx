import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentInfoPage.css';

const FinanceAccountingPage = () => {
  const navigate = useNavigate();
  const goToDashboard = () => navigate('/admin');

  const cards = [
    {
      icon: '🧾',
      title: 'Fees & Invoicing',
      items: [
        { label: 'Fees & Invoicing', path: '/admin/finance/fees' },
      ],
    },
    {
      icon: '💰',
      title: 'Finance & Accounting',
      items: [
        { label: 'Finance & Accounting', path: '/admin/finance/accounting' },
      ],
    },
  ];

  return (
    <div className="module-page">
      <div className="navbar">
        <button className="nav-btn" onClick={goToDashboard}>Go back to Dashboard</button>
      </div>
      <h2 className="page-title">💰 Finance & Accounting</h2>
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

export default FinanceAccountingPage;

