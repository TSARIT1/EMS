import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import './ClassSubjectsPage.css';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; 

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const formatDataForApi = (type, data) => {
    switch (type) {
      case 'class':
        return {
          class_name: data.name,
          class_code: data.code
        };
      case 'section':
        return {
          section_name: data.name,
          section_code: data.code
        };
      case 'subject':
        return {
          subject_name: data.name,
          subject_code: data.code,
          credit: data.credit,
          subject_type: data.type
        };
      default:
        return data;
    }
  };


  const formatDataFromApi = (type, apiData) => {
    return apiData.map(item => {
      switch (type) {
        case 'class':
          return {
            id: item.id,
            name: item.class_name,
            code: item.class_code
          };
        case 'section':
          return {
            id: item.id,
            name: item.section_name,
            code: item.section_code
          };
        case 'subject':
          return {
            id: item.id,
            name: item.subject_name,
            code: item.subject_code,
            credit: item.subject_credit,
            type: item.subject_type 
          };
        default:
          return item;
      }
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [classesRes, sectionsRes, subjectsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/classes/`),
          axios.get(`${API_BASE_URL}/sections/`),
          axios.get(`${API_BASE_URL}/subjects/`)
        ]);
        
        setClasses(classesRes.data);
        setSections(sectionsRes.data);
        setSubjects(subjectsRes.data);
        console.log("dataaaaa...",subjectsRes.data);
        
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (type, index = null, data = {}) => {
    setModalData({ type, open: true, index, data });
  };

  const closeModal = () => {
    setModalData({ type: '', open: false, index: null, data: {} });
  };

  const handleSave = async (data) => {
    try {
      const formattedData = formatDataForApi(modalData.type, data);
      let response;
      const isEdit = modalData.index !== null;

      switch (modalData.type) {
        case 'class':
          if (isEdit) {
            response = await axios.put(
              `${API_BASE_URL}/classes/${data.id}/`,
              formattedData
            );
            setClasses(classes.map((cls, i) => 
              i === modalData.index ? formatDataFromApi('class', [response.data])[0] : cls));
          } else {
            response = await axios.post(
              `${API_BASE_URL}/classes/`,
              formattedData
            );
            setClasses([...classes, formatDataFromApi('class', [response.data])[0]]);
          }
          break;
          
        case 'section':
          if (isEdit) {
            response = await axios.put(
              `${API_BASE_URL}/sections/${data.id}/`,
              formattedData
            );
            setSections(sections.map((sec, i) => 
              i === modalData.index ? formatDataFromApi('section/', [response.data])[0] : sec
            ));
          } else {
            response = await axios.post(
              `${API_BASE_URL}/sections/`,
              formattedData
            );
            setSections([...sections, formatDataFromApi('section', [response.data])[0]]);
          }
          break;
          
        case 'subject':
          if (isEdit) {
            response = await axios.put(
              `${API_BASE_URL}/subjects/${data.id}/`,
              formattedData
            );
            setSubjects(subjects.map((subj, i) => 
              i === modalData.index ? formatDataFromApi('subject', [response.data])[0] : subj
            ));
          } else {
            response = await axios.post(
              `${API_BASE_URL}/subjects/`,
              formattedData
            );
            setSubjects([...subjects, formatDataFromApi('subject', [response.data])[0]]);
          }
          break;
          
        default:
          return;
      }

      closeModal();
    } catch (err) {
      setError(err.message || 'Failed to save data');
      console.error('Error saving data:', err);
    }
  };

 const handleDelete = async (type, index) => {
  try {
    const listMap = {
      class: [classes, setClasses],
      section: [sections, setSections],
      subject: [subjects, setSubjects],
    };
    
    const [list, setFn] = listMap[type];
    const item = list[index];
    
    // Ensure we have the correct endpoint structure
    let endpoint;
    switch (type) {
      case 'class':
        endpoint = `${API_BASE_URL}/classes/${item.id}/`;
        break;
      case 'section':
        endpoint = `${API_BASE_URL}/sections/${item.id}/`;
        break;
      case 'subject':
        endpoint = `${API_BASE_URL}/subjects/${item.id}/`;
        break;
      default:
        return;
    }

    // Call API to delete with proper endpoint
    await axios.delete(endpoint);
    
    // Update local state
    const updated = [...list];
    updated.splice(index, 1);
    setFn(updated);
  } catch (err) {
    console.error('Delete error details:', {
      error: err,
      response: err.response,
    });
    setError(err.response?.data?.message || err.message || 'Failed to delete item');
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

  // Handle import
  const handleImport = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(`${API_BASE_URL}/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      

      setClasses(response.data.classes || []);
      setSections(response.data.sections || []);
      setSubjects(response.data.subjects || []);
      
      setMenuOpen(false);
      alert('Data imported successfully!');
    } catch (err) {
      setError(err.message || 'Failed to import data');
      console.error('Error importing data:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleExport = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/export`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'academics_data.json');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(err.message || 'Failed to export data');
      console.error('Error exporting data:', err);
    } finally {
      setMenuOpen(false);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImport(file);
    }
    e.target.value = null; 
  };

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
                <div>
                  <label htmlFor="import-file" style={{ cursor: 'pointer' }}>
                    ⬆️ Import Academics Data
                  </label>
                  <input
                    id="import-file"
                    type="file"
                    accept=".json"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
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
              <div key={cls.id || i} className="class-row">
                <span>{cls.class_name}</span>
                <span>{cls.class_code}</span>
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
              <div key={sec.id || i} className="section-row">
                <span>{sec.section_name}</span>
                <span>{sec.section_code}</span>
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
              <div key={subj.id || i} className="subject-row">
                <span>{subj.subject_name}</span>
                <span>{subj.subject_code}</span>
                <span>{subj.subject_credit}</span>
                <span>{subj.subject_type}</span>
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

<<<<<<< HEAD
export default ClassSubjectsPage; 


















=======
export default ClassSubjectsPage;
>>>>>>> e78e8e69e93e7224074c77a9cfffecc81a08339b
