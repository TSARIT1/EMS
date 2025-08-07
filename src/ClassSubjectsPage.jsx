import React, { useState, useEffect } from 'react';
import './ClassSubjectsPage.css';

const Modal = ({ isOpen, onClose, onSubmit, initialData = {}, fields, title }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (fields.every(f => formData[f.key]?.trim())) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-form">
          {fields.map(f => (
            <div className="form-group" key={f.key}>
              <label>{f.placeholder}</label>
              <input
                type="text"
                value={formData[f.key] || ''}
                onChange={(e) => handleChange(f.key, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

const ActionIcons = ({ onAdd }) => (
  <div className="actions">
    <span>🔍</span>
    <span onClick={onAdd}>➕</span>
    <span>☰</span>
  </div>
);

const ClassSubjectsPage = () => {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [modalData, setModalData] = useState({ type: '', open: false, index: null, data: {} });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openModal = (type, index = null, data = {}) => {
    setModalData({ type, open: true, index, data });
  };

  const closeModal = () => {
    setModalData({ type: '', open: false, index: null, data: {} });
  };

  const handleSave = (data) => {
    let setFn, list, index = modalData.index;

    switch (modalData.type) {
      case 'class':
        setFn = setClasses;
        list = classes;
        break;
      case 'section':
        setFn = setSections;
        list = sections;
        break;
      case 'subject':
        setFn = setSubjects;
        list = subjects;
        break;
      default:
        return;
    }

    const updated = [...list];
    if (index !== null) {
      updated[index] = data;
    } else {
      updated.push(data);
    }
    setFn(updated);
  };

  const handleDelete = (type, index) => {
    const listMap = {
      class: [classes, setClasses],
      section: [sections, setSections],
      subject: [subjects, setSubjects],
    };
    const [list, setFn] = listMap[type];
    const updated = [...list];
    updated.splice(index, 1);
    setFn(updated);
  };

  const fieldMap = {
    class: {
      title: 'Class',
      fields: [
        { key: 'name', placeholder: 'Class Name' },
        { key: 'code', placeholder: 'Class Code' },
      ]
    },
    section: {
      title: 'Section',
      fields: [
        { key: 'name', placeholder: 'Section Name' },
        { key: 'code', placeholder: 'Section Code' },
      ]
    },
    subject: {
      title: 'Subject',
      fields: [
        { key: 'name', placeholder: 'Subject Name' },
        { key: 'code', placeholder: 'Subject Code' },
        { key: 'credit', placeholder: 'Credit' },
        { key: 'type', placeholder: 'Type (Core/Elective)' },
      ]
    }
  };

  // Handle import
  const handleImport = () => {
    alert("Import logic to be implemented (e.g., open file dialog)");
    setMenuOpen(false);
  };

  // Handle export
  const handleExport = () => {
    const data = { classes, sections, subjects };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'academics_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMenuOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-wrapper')) {
        setDropdownOpen(false);
      }
      if (!e.target.closest('.menu-wrapper')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="class-subjects-page">
      <Modal
        isOpen={modalData.open}
        onClose={closeModal}
        onSubmit={handleSave}
        initialData={modalData.data}
        fields={fieldMap[modalData.type]?.fields || []}
        title={`Manage ${fieldMap[modalData.type]?.title}`}
      />

      <nav className="navbar">
        <h1 className="navbar-title">Manage Academics</h1>
        <input type="text" className="navbar-search" placeholder="Search for Class, Section or Subjects" />
        <div className="navbar-actions">
          <div className="dropdown-wrapper">
            <button className="add-button" onClick={() => setDropdownOpen(prev => !prev)}>
              ➕ Add ▾
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div onClick={() => { openModal('class'); setDropdownOpen(false); }}>Class</div>
                <div onClick={() => { openModal('section'); setDropdownOpen(false); }}>Section</div>
                <div onClick={() => { openModal('subject'); setDropdownOpen(false); }}>Subject</div>
              </div>
            )}
          </div>
          <div className="menu-wrapper">
            <button className="menu-icon" onClick={() => setMenuOpen(prev => !prev)}>⋮</button>
            {menuOpen && (
              <div className="menu-dropdown">
                <div onClick={handleImport}>⬆️ Import Academics Data</div>
                <div onClick={handleExport}>⬇️ Export Academics Data</div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <h2 className="page-title">📚 Class & Subjects</h2>
      <div className="grid">
        {/* Class */}
        <div className="column class-col">
          <div className="col-header blue">
            <span>Class</span>
            <ActionIcons onAdd={() => openModal('class')} />
          </div>
          <div className="class-table-header">
            <span><b>Name</b></span>
            <span><b>Code</b></span>
            <span><b>Actions</b></span>
          </div>
          <div className="class-col-body">
            {classes.map((cls, i) => (
              <div key={i} className="class-row">
                <span>{cls.name}</span>
                <span>{cls.code}</span>
                <div className="row-actions">
                  <button onClick={() => openModal('class', i, cls)}>✏️</button>
                  <button onClick={() => handleDelete('class', i)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section */}
        <div className="column section-col">
          <div className="col-header gray">
            <span>Section</span>
            <ActionIcons onAdd={() => openModal('section')} />
          </div>
          <div className="section-table-header">
            <span><b>Name</b></span>
            <span><b>Code</b></span>
            <span><b>Actions</b></span>
          </div>
          <div className="section-col-body">
            {sections.map((sec, i) => (
              <div key={i} className="section-row">
                <span>{sec.name}</span>
                <span>{sec.code}</span>
                <div className="row-actions">
                  <button onClick={() => openModal('section', i, sec)}>✏️</button>
                  <button onClick={() => handleDelete('section', i)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject */}
        <div className="column subject-col">
          <div className="col-header white">
            <span>Subjects</span>
            <ActionIcons onAdd={() => openModal('subject')} />
          </div>
          <div className="subject-table-header">
            <span><b>Name</b></span>
            <span><b>Code</b></span>
            <span><b>Credit</b></span>
            <span><b>Type</b></span>
            <span><b>Actions</b></span>
          </div>
          <div className="subject-col-body">
            {subjects.map((subj, i) => (
              <div key={i} className="subject-row">
                <span>{subj.name}</span>
                <span>{subj.code}</span>
                <span>{subj.credit}</span>
                <span>{subj.type}</span>
                <div className="row-actions">
                  <button onClick={() => openModal('subject', i, subj)}>✏️</button>
                  <button onClick={() => handleDelete('subject', i)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSubjectsPage; 


















