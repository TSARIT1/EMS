import React, { useState, useEffect } from 'react';
import './TeacherFieldsPage.css';
import { FaTrash, FaGripVertical, FaChevronDown, FaChevronRight, FaPlus, FaFont, FaRegCalendarAlt, FaList, FaRegCheckSquare, FaParagraph } from 'react-icons/fa';
import axios from 'axios';

const TeacherFieldsPage = () => {
  const [groups, setGroups] = useState([]);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    fetchFieldGroups();
  }, []);

  const fetchFieldGroups = async () => {
    try {
      const res = await axios.get('/api/teacher-fields');
      setGroups(res.data);
      setExpanded(res.data.map(() => true));
    } catch (error) {
      console.error('Error fetching field groups:', error);
      // fallback
      const fallback = [
        {
          title: 'Teachers/Staff Details',
          fields: ['Employee Type*', 'Teacher Id*', 'First Name*', 'Last Name*', 'Contact Phone*', 'Email*', 'Date of Birth*', 'Gender', 'Profile Picture']
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
      setGroups(fallback);
      setExpanded(fallback.map(() => true));
    }
  };

  const toggleGroup = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const deleteGroup = async (index) => {
    try {
      const groupToDelete = groups[index];
      await axios.delete(`/api/teacher-fields/${groupToDelete.id}`);
      const newGroups = groups.filter((_, i) => i !== index);
      const newExpanded = expanded.filter((_, i) => i !== index);
      setGroups(newGroups);
      setExpanded(newExpanded);
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  return (
    <div className="teacher-fields-container">
      <div className="field-sidebar">
        <h3>Add Field</h3>
        <div className="field-option"><FaFont /> Text</div>
        <div className="field-option"><FaParagraph /> Textarea</div>
        <div className="field-option"><FaRegCalendarAlt /> Date Field</div>
        <div className="field-option"><FaList /> Selection</div>
        <div className="field-option"><FaRegCheckSquare /> Checkbox</div>
        <div className="add-group"><FaPlus /> Add Field Group</div>
      </div>

      <div className="field-groups-scroll">
        {groups.map((group, index) => (
          <div className="field-group" key={index}>
            <div className="field-group-header">
              <button onClick={() => toggleGroup(index)} className="toggle-icon">
                {expanded[index] ? <FaChevronDown /> : <FaChevronRight />}
              </button>
              <span className="group-title">{group.title}</span>
              <div className="group-actions">
                <span className="delete-icon" onClick={() => deleteGroup(index)}><FaTrash /></span>
                <span className="drag-icon"><FaGripVertical /></span>
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
};

export default TeacherFieldsPage;



