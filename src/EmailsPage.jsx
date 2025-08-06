import React, { useState } from 'react';
import './EmailsPage.css';
import { MdOutlineEmail, MdOutlineSms, MdOutlineWhatsapp, MdOutlineCancel } from 'react-icons/md';
import { PiNotePencil } from 'react-icons/pi';
import { AiOutlinePlus, AiOutlineSend, AiOutlineFile } from 'react-icons/ai';

const EmailsPage = () => {
  const [activeTab, setActiveTab] = useState('Emails');
  const [showComposeOptions, setShowComposeOptions] = useState(false);
  const [composeType, setComposeType] = useState(null);
  const [formData, setFormData] = useState({
    from: 'noreply@yourdomain.com',
    subject: '',
    template: 'Default',
    message: '',
    receivers: [],
    attachment: null,
    customNumbers: '',
  });

  const tabs = [
    { name: 'Notices', icon: <PiNotePencil size={18} /> },
    { name: 'Emails', icon: <MdOutlineEmail size={18} /> },
    { name: 'SMS', icon: <MdOutlineSms size={18} /> },
    { name: 'WhatsApp', icon: <MdOutlineWhatsapp size={18} /> },
  ];

  const receiverGroups = [
    'Admins', 'Teachers', 'Students',
    'Parents (Active)', 'Parents (Alumni)',
    'Alumni', 'Guest',
  ];

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        receivers: checked
          ? [...prev.receivers, value]
          : prev.receivers.filter((r) => r !== value),
      }));
    } else if (type === 'file') {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${composeType} sent successfully!`);
    console.log('Sending:', formData);
  };

  const renderComposeOptions = () => (
    <div className="compose-options">
      <button onClick={() => setComposeType('notice')}>
        <PiNotePencil /> Create a Notice
      </button>
      <button onClick={() => setComposeType('email')}>
        <MdOutlineEmail /> Compose an Email
      </button>
      <button onClick={() => setComposeType('sms')}>
        <MdOutlineSms /> Compose a SMS
      </button>
    </div>
  );

  const renderNoticeForm = () => (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-group checkbox-group">
        <label>Receivers*</label>
        <div className="checkbox-list">
          {receiverGroups.map((group) => (
            <label key={group}>
              <input
                type="checkbox"
                value={group}
                checked={formData.receivers.includes(group)}
                onChange={handleChange}
              />
              {group}
            </label>
          ))}
        </div>
      </div>

      <input
        type="text"
        name="subject"
        placeholder="Notice Title"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      <textarea
        name="message"
        placeholder="Write your notice..."
        rows="6"
        value={formData.message}
        onChange={handleChange}
      ></textarea>

      <div className="form-actions">
        <button type="submit"><AiOutlineSend /> Publish</button>
        <button type="button" onClick={() => setComposeType(null)}><MdOutlineCancel /> Cancel</button>
      </div>
    </form>
  );

  const renderEmailForm = () => (
    <form onSubmit={handleSubmit} className="form-card">
      <p><strong>Send As:</strong> {formData.from}</p>
      <small>Add SMTP to continue sending emails with your domain name.</small>

      <div className="form-group checkbox-group">
        <label>Receivers*</label>
        <div className="checkbox-list">
          {receiverGroups.map((group) => (
            <label key={group}>
              <input
                type="checkbox"
                value={group}
                checked={formData.receivers.includes(group)}
                onChange={handleChange}
              />
              {group}
            </label>
          ))}
        </div>
      </div>

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      <select name="template" value={formData.template} onChange={handleChange}>
        <option>Default</option>
        <option>Newsletter</option>
        <option>Reminder</option>
      </select>

      <textarea
        name="message"
        placeholder="Type your message..."
        rows="8"
        value={formData.message}
        onChange={handleChange}
      ></textarea>

      <input type="file" name="attachment" onChange={handleChange} />
      <p className="ai-hint"><AiOutlineFile /> Write With AI</p>

      <div className="form-actions">
        <button type="submit"><MdOutlineEmail /> Send</button>
        <button type="button" onClick={() => setComposeType(null)}><MdOutlineCancel /> Cancel</button>
      </div>
    </form>
  );

  const renderSMSForm = () => (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-group checkbox-group">
        <label>Send messages to</label>
        <div className="checkbox-list">
          {receiverGroups.map((group) => (
            <label key={group}>
              <input
                type="checkbox"
                value={group}
                checked={formData.receivers.includes(group)}
                onChange={handleChange}
              />
              {group}
            </label>
          ))}
        </div>
      </div>

      <input
        type="text"
        name="customNumbers"
        placeholder="Enter comma-separated numbers..."
        value={formData.customNumbers}
        onChange={handleChange}
      />
      <small>Ex: 09005020020, 09784234560</small>

      <textarea
        name="message"
        placeholder="Type your message..."
        maxLength={304}
        rows="5"
        value={formData.message}
        onChange={handleChange}
      ></textarea>

      <div className="sms-footer">
        <span>{formData.message.length}/304 chars</span>
        <span>1 SMS Credit</span>
      </div>

      <div className="form-actions">
        <button type="submit"><AiOutlineSend /> Send</button>
        <button type="button" onClick={() => setComposeType(null)}><MdOutlineCancel /> Cancel</button>
      </div>
    </form>
  );

  return (
    <div className="emails-page">
      <div className="emails-header">
        <h2>Emails</h2>
        <div className="tab-buttons">
          {tabs.map(({ name, icon }) => (
            <button
              key={name}
              className={`tab-btn ${activeTab === name ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(name);
                setComposeType(null);
                setShowComposeOptions(false);
              }}
            >
              {icon} {name}
            </button>
          ))}
        </div>
        <button className="compose-btn" onClick={() => setShowComposeOptions(!showComposeOptions)}>
          <AiOutlinePlus /> Compose
        </button>
      </div>

      {showComposeOptions && !composeType && renderComposeOptions()}

      <div className="compose-section">
        {composeType === 'notice' && renderNoticeForm()}
        {composeType === 'email' && renderEmailForm()}
        {composeType === 'sms' && renderSMSForm()}
        {!composeType && !showComposeOptions && (
          <div className="empty-state">
            <p>No record found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailsPage;




