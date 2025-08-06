import React, { useState } from 'react';
import './AssessmentAndGradingsPage.css';

const AssessmentAndGradingsPage = () => {
  const [activeTab, setActiveTab] = useState('gradebook');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gradebook': return <GradeBookTab />;
      case 'reportcards': return <ReportCardsTab />;
      case 'assessment': return <AssessmentTab />;
      case 'gradesetup': return <GradeSetupTab />;
      default: return null;
    }
  };

  return (
    <div className="assessment-container">
      <h1 className="page-heading">🧾 Manage Assessment</h1>
      <div className="tabs">
        <button className={activeTab === 'gradebook' ? 'active' : ''} onClick={() => setActiveTab('gradebook')}>Grade Book</button>
        <button className={activeTab === 'reportcards' ? 'active' : ''} onClick={() => setActiveTab('reportcards')}>Report Cards</button>
        <button className={activeTab === 'assessment' ? 'active' : ''} onClick={() => setActiveTab('assessment')}>Assessment</button>
        <button className={activeTab === 'gradesetup' ? 'active' : ''} onClick={() => setActiveTab('gradesetup')}>Grade Setup</button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

const GradeBookTab = () => (
  <div className="gradebook-card">
    <select><option>Select Class</option></select>
    <select><option>Select Section</option></select>
    <select><option>Select Subjects</option></select>
    <button className="start-btn">✏️ Let's Start</button>
  </div>
);

const ReportCardsTab = () => (
  <div className="report-cards-tab">
    <input type="text" className="student-input" placeholder="Start typing Students name .." />
    <button className="view-button">View Report Cards</button>
  </div>
);

const AssessmentTab = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <div className="assessment-panel">
        <div className="filter-link">
          <i className="fas fa-filter"></i> Filter
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="add-btn" onClick={() => setShowPopup(true)}>+ Add</button>
          <div className="selection-count"><span>0</span> Selected ▾</div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-form">
            <div className="popup-header">
              <h2>Add Assessment</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            </div>

            <form className="assessment-form">
              <div className="form-row">
                <label>Category*</label>
                <select><option>Assessment Category</option></select>
                <label>Name*</label>
                <input type="text" placeholder="Name" />
              </div>

              <div className="form-row">
                <label>Points*</label>
                <input type="number" placeholder="Points" />
                <label>Passing Points*</label>
                <input type="number" placeholder="Passing points" />
              </div>

              <div className="form-row">
                <label>Status*</label>
                <select><option>Unpublished</option><option>Published</option></select>
              </div>

              <div className="form-row radio-group">
                <label>Counts towards Overall Score</label>
                <div>
                  <input type="radio" id="yes" name="score" defaultChecked />
                  <label htmlFor="yes">Yes</label>
                  <input type="radio" id="no" name="score" />
                  <label htmlFor="no">No</label>
                </div>
              </div>

              <div className="form-row">
                <label>Grading Scale*</label>
                <select><option>Grading Scale</option></select>
              </div>

              <div className="form-row radio-group">
                <label>Applied To*</label>
                <div>
                  <input type="radio" name="apply" defaultChecked /> All
                  <input type="radio" name="apply" /> All Subjects of Particular Class - Section
                  <input type="radio" name="apply" /> Particular Subjects
                </div>
              </div>

              <div className="form-row radio-group">
                <label>Display Assessment*</label>
                <div>
                  <input type="radio" name="display" /> Beginning of List
                  <input type="radio" name="display" defaultChecked /> End of List
                </div>
              </div>

              <div className="form-row">
                <label>
                  <input type="checkbox" /> Send Notification Emails
                </label>
              </div>

              <div className="form-buttons">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="no-record">
        <i className="fas fa-comment-alt" style={{ fontSize: '2rem', color: '#ccc' }}></i>
        <div>No record found.</div>
      </div>
    </div>
  );
};

const GradeSetupTab = () => (
  <div className="tab-placeholder">⚙️ Grade Setup Content Coming Soon</div>
);

export default AssessmentAndGradingsPage;



