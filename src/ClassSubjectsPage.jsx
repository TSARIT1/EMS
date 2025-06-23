// ClassSubjectsPage.js with Axios API integration
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    if (fields.every(f => formData[f.key]?.toString().trim())) {
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

  const endpoints = {
    class: '/api/classes',
    section: '/api/sections',
    subject: '/api/subjects'
  };

  const fetchAll = async () => {
    try {
      const [cls, sec, subj] = await Promise.all([
        axios.get(endpoints.class),
        axios.get(endpoints.section),
        axios.get(endpoints.subject)
      ]);
      setClasses(cls.data);
      setSections(sec.data);
      setSubjects(subj.data);
    } catch (error) {
      console.error('Fetch failed', error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const openModal = (type, index = null, data = {}) => {
    setModalData({ type, open: true, index, data });
  };

  const closeModal = () => {
    setModalData({ type: '', open: false, index: null, data: {} });
  };

  const handleSave = async (data) => {
    const { type, index } = modalData;
    const list = { class: classes, section: sections, subject: subjects }[type];
    const setFn = { class: setClasses, section: setSections, subject: setSubjects }[type];

    try {
      let updated;
      if (data.id) {
        await axios.put(`${endpoints[type]}/${data.id}`, data);
        updated = [...list];
        updated[index] = data;
      } else {
        const res = await axios.post(endpoints[type], data);
        updated = [...list, res.data];
      }
      setFn(updated);
    } catch (error) {
      console.error('Save failed', error);
    }
  };

  const handleDelete = async (type, index) => {
    const list = { class: classes, section: sections, subject: subjects }[type];
    const setFn = { class: setClasses, section: setSections, subject: setSubjects }[type];
    const id = list[index].id;
    try {
      await axios.delete(`${endpoints[type]}/${id}`);
      const updated = [...list];
      updated.splice(index, 1);
      setFn(updated);
    } catch (error) {
      console.error('Delete failed', error);
    }
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

      {/* UI code omitted for brevity - reuse your existing layout */}
    </div>
  );
};

export default ClassSubjectsPage;















