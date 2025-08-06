import React, { useState } from 'react';
import './TeacherFieldsPage.css';

const fieldGroups = [
  {
    title: 'Teachers/Staff Details',
    fields: [
      'Employee Type*', 'Teacher Id*', 'First Name*', 'Last Name*',
      'Contact Phone*', 'Email*', 'Date of Birth*', 'Gender', 'Profile Picture'
    ]
  },
  {
    title: 'Additional Information',
    fields: ['Blood Group', 'Address', 'Zip Code', 'State', 'Country']
  },
  {
    title: 'Skills & Social Details',
    fields: ['Profile Summary', 'Skills', 'Facebook Profile Link', 'Linkedin Profile Link']
  }
];

export default function TeachersFieldsPage() {
  const [groups, setGroups] = useState(fieldGroups);
  const [expanded, setExpanded] = useState(groups.map(() => true));
  const [selectedField, setSelectedField] = useState(null); // for configuration view

  const toggleGroup = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const deleteGroup = (index) => {
    const newGroups = groups.filter((_, i) => i !== index);
    const newExpanded = expanded.filter((_, i) => i !== index);
    setGroups(newGroups);
    setExpanded(newExpanded);
  };

  // Dummy configuration values
  const configDefaults = {
    fieldId: 'is_academic',
    label: 'Employee Type',
    fieldType: '',
    status: 'Published',
    rules: {
      required: true,
      email: false,
      date: false
    },
    editableTo: ['Teachers']
  };

  return (
    <div className="teacher-fields-container">
      <div className="field-sidebar">
        <h3>Add Field</h3>
        <div className="field-option">🅰️ Text</div>
        <div className="field-option">📝 Textarea</div>
        <div className="field-option">📅 Date Field</div>
        <div className="field-option">📂 Selection</div>
        <div className="field-option">☑️ Checkbox</div>
        <div className="add-group">➕ Add Field Group</div>
      </div>

      <div className="field-groups-scroll">
        {!selectedField ? (
          groups.map((group, index) => (
            <div className="field-group" key={index}>
              <div className="field-group-header">
                <button onClick={() => toggleGroup(index)} className="toggle-icon">
                  {expanded[index] ? '▾' : '▸'}
                </button>
                <span className="group-title">{group.title}</span>
                <div className="group-actions">
                  <span className="delete-icon" onClick={() => deleteGroup(index)}>🗑️</span>
                  <span className="drag-icon">⠿</span>
                </div>
              </div>
              {expanded[index] && (
                <div className="field-items">
                  {group.fields.map((field, i) => (
                    <div key={i} className="field-item">
                      {field}
                      <span className="arrow" onClick={() => setSelectedField({ field, groupIndex: index })}>›</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="field-config-panel">
            <div className="field-config-header">
              <button className="back-btn" onClick={() => setSelectedField(null)}>← Back</button>
              <h3>{selectedField.field}</h3>
            </div>

            <div className="field-config-body">
              <div className="config-row">
                <div className="config-col">
                  <label>Field Id</label>
                  <input type="text" value={configDefaults.fieldId} readOnly />
                </div>
                <div className="config-col">
                  <label>Label</label>
                  <input type="text" value={configDefaults.label} readOnly />
                </div>
              </div>

              <div className="config-row">
                <div className="config-col">
                  <label>Field Type</label>
                  <select>
                    <option>Select</option>
                    <option>Text</option>
                    <option>Date</option>
                    <option>Checkbox</option>
                    <option>Textarea</option>
                  </select>
                </div>
                <div className="config-col">
                  <label>Status</label>
                  <select>
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div className="config-section">
                <label>Rules</label>
                <div className="checkbox-group">
                  <label><input type="checkbox" checked /> Required</label>
                  <label><input type="checkbox" /> Email</label>
                  <label><input type="checkbox" /> Date</label>
                </div>
              </div>

              <div className="config-section">
                <label>Editable To</label>
                <div className="checkbox-group">
                  <label><input type="checkbox" checked /> Teachers</label>
                  <label><input type="checkbox" /> Admin</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



