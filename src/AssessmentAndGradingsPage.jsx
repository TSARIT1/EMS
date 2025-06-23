import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

// ------------------------- Grade Book Tab -------------------------
const GradeBookTab = () => {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchDropdowns();
  }, []);

  const fetchDropdowns = async () => {
    try {
      const classRes = await axios.get('/api/classes');
      const sectionRes = await axios.get('/api/sections');
      const subjectRes = await axios.get('/api/subjects');

      setClasses(classRes.data);
      setSections(sectionRes.data);
      setSubjects(subjectRes.data);
    } catch (error) {
      console.error('Failed to load dropdowns:', error);
    }
  };

  return (
    <div className="gradebook-card">
      <select>
        <option>Select Class</option>
        {classes.map((cls) => (
          <option key={cls.id} value={cls.id}>
            {cls.name}
          </option>
        ))}
      </select>
      <select>
        <option>Select Section</option>
        {sections.map((sec) => (
          <option key={sec.id} value={sec.id}>
            {sec.name}
          </option>
        ))}
      </select>
      <select>
        <option>Select Subject</option>
        {subjects.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.name}
          </option>
        ))}
      </select>
      <button className="start-btn">✏️ Let's Start</button>
    </div>
  );
};

// ------------------------- Report Cards Tab -------------------------
const ReportCardsTab = () => {
  const [studentName, setStudentName] = useState('');
  const [report, setReport] = useState(null);

  const handleViewReport = async () => {
    try {
      const res = await axios.get(`/api/reportcards?student=${studentName}`);
      setReport(res.data);
    } catch (error) {
      console.error('Failed to fetch report card:', error);
    }
  };

  return (
    <div className="report-cards-tab">
      <input
        type="text"
        className="student-input"
        placeholder="Start typing Students name .."
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button className="view-button" onClick={handleViewReport}>
        View Report Cards
      </button>
      {report && <pre>{JSON.stringify(report, null, 2)}</pre>}
    </div>
  );
};

// ------------------------- Assessment Tab -------------------------
const AssessmentTab = () => {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const res = await axios.get('/api/assessments');
      setAssessments(res.data);
    } catch (error) {
      console.error('Failed to fetch assessments:', error);
    }
  };

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

      {assessments.length === 0 ? (
        <div className="no-record">
          <i className="fas fa-comment-alt" style={{ fontSize: '2rem', color: '#ccc' }}></i>
          <div>No record found.</div>
        </div>
      ) : (
        <ul className="assessment-list">
          {assessments.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ------------------------- Grade Setup Tab -------------------------
const GradeSetupTab = () => {
  return <div className="tab-placeholder">⚙️ Grade Setup Content Coming Soon</div>;
};

export default AssessmentAndGradingsPage;



