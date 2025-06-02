import React, { useState } from 'react';
import './AssessmentAndGradingsPage.css';

const AssessmentAndGradingsPage = () => {
  const [activeTab, setActiveTab] = useState('gradebook');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gradebook':
        return <GradeBookTab />;
      case 'reportcards':
        return <ReportCardsTab />;
      case 'assessment':
        return <AssessmentTab />;
      case 'gradesetup':
        return <GradeSetupTab />;
      default:
        return null;
    }
  };

  return (
    <div className="assessment-container">
      <h1 className="page-heading">🧾 Manage Assessment</h1>
      <div className="tabs">
        <button className={activeTab === 'gradebook' ? 'active' : ''} onClick={() => setActiveTab('gradebook')}>
          Grade Book
        </button>
        <button className={activeTab === 'reportcards' ? 'active' : ''} onClick={() => setActiveTab('reportcards')}>
          Report Cards
        </button>
        <button className={activeTab === 'assessment' ? 'active' : ''} onClick={() => setActiveTab('assessment')}>
          Assessment
        </button>
        <button className={activeTab === 'gradesetup' ? 'active' : ''} onClick={() => setActiveTab('gradesetup')}>
          Grade Setup
        </button>
      </div>

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

const GradeBookTab = () => {
  return (
    <div className="gradebook-card">
      <select>
        <option>Select Class</option>
      </select>
      <select>
        <option>Select Section</option>
      </select>
      <select>
        <option>Select Subjects</option>
      </select>
      <button className="start-btn">✏️ Let's Start</button>
    </div>
  );
};

const ReportCardsTab = () => {
  return (
    <div className="report-cards-tab">
      <input
        type="text"
        className="student-input"
        placeholder="Start typing Students name .."
      />
      <button className="view-button">View Report Cards</button>
    </div>
  );
};

const AssessmentTab = () => {
  return (
    <div>
      <div className="assessment-panel">
        <div className="filter-link">
          <i className="fas fa-filter"></i> Filter
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="add-btn">+ Add</button>
          <div className="selection-count">
            <span>0</span> Selected ▾
          </div>
        </div>
      </div>

      <div className="no-record">
        <i className="fas fa-comment-alt" style={{ fontSize: '2rem', color: '#ccc' }}></i>
        <div>No record found.</div>
      </div>
    </div>
  );
};

const GradeSetupTab = () => {
  return <div className="tab-placeholder">⚙️ Grade Setup Content Coming Soon</div>;
};

export default AssessmentAndGradingsPage;


