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
        {groups.map((group, index) => (
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
                    <span className="arrow">›</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



