import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeesAndInvoicing.css';
import { FaFilter } from 'react-icons/fa';
import { IoEllipsisVertical } from 'react-icons/io5';

const FeesAndInvoicing = () => {
  const [activeTab, setActiveTab] = useState('fees');
  const [showForm, setShowForm] = useState(false);
  const [feesData, setFeesData] = useState([]);
  const [formData, setFormData] = useState({});

  const tabs = [
    { id: 'fees', label: 'Fees & Invoicing' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'transactions', label: 'Payment Transactions' },
    { id: 'settings', label: 'Settings' },
  ];

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await axios.get('/api/fees');
      setFeesData(res.data);
    } catch (err) {
      console.error('Error fetching fees:', err);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/fees', formData);
      fetchFees();
      setShowForm(false);
      setFormData({});
    } catch (err) {
      console.error('Error saving fee:', err);
    }
  };

  const renderContent = () => {
    if (showForm) {
      return (
        <div className="form-wrapper slide-in">
          <div className="form-header">
            <h2>Add Fees & Invoices</h2>
            <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
          </div>
          <div className="form-scroll">
            <div className="form-left">
              <div className="form-group"><label>Fee Name *</label><input type="text" onChange={(e) => handleInputChange('name', e.target.value)} /></div>
              <div className="form-group"><label>Fee Type *</label><input type="text" onChange={(e) => handleInputChange('type', e.target.value)} /></div>
              <div className="form-group"><label>Invoice Date *</label><input type="date" onChange={(e) => handleInputChange('invoiceDate', e.target.value)} /></div>
              <div className="form-group"><label>Due Date</label><input type="date" onChange={(e) => handleInputChange('dueDate', e.target.value)} /></div>
              <div className="form-group"><label>Description</label><textarea onChange={(e) => handleInputChange('description', e.target.value)} /></div>
              <h3>Line Item</h3>
              <div className="form-group">
                <input type="text" placeholder="Item Name" onChange={(e) => handleInputChange('itemName', e.target.value)} />
                <input type="text" placeholder="Item Description" style={{ marginTop: "10px" }} onChange={(e) => handleInputChange('itemDescription', e.target.value)} />
              </div>
            </div>

            <div className="form-right">
              <h3>Settings</h3>
              <div className="form-group"><label>Invoice Template</label><select onChange={(e) => handleInputChange('template', e.target.value)}><option>Default</option></select></div>
              <div className="form-toggle-group"><label>Payers</label><span className="link">Add Payers</span></div>
              <div className="form-toggle-group"><label>Partial Payments</label><label className="switch"><input type="checkbox" onChange={(e) => handleInputChange('partialPayments', e.target.checked)} /><span className="slider"></span></label></div>
              <div className="form-toggle-group"><label>Credit Balance</label><label className="switch"><input type="checkbox" onChange={(e) => handleInputChange('creditBalance', e.target.checked)} /><span className="slider"></span></label></div>
              <div className="form-toggle-group"><label>Link with Finance</label><label className="switch"><input type="checkbox" onChange={(e) => handleInputChange('linkFinance', e.target.checked)} /><span className="slider"></span></label></div>
              <div className="form-toggle-group"><label>Multi-Currency</label><label className="switch"><input type="checkbox" onChange={(e) => handleInputChange('multiCurrency', e.target.checked)} /><span className="slider"></span></label></div>
            </div>
          </div>
          <div className="form-footer">
            <textarea placeholder="Comments" onChange={(e) => handleInputChange('comments', e.target.value)} />
            <div className="notify-email"><input type="checkbox" onChange={(e) => handleInputChange('notify', e.target.checked)} /><label>Email Notification</label></div>
            <div className="footer-actions">
              <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'settings') {
      return (
        <div className="settings-wrapper">
          <div className="settings-sidebar">
            <ul>
              <li className="active"><i className="icon-list" /> Invoice Notifications</li>
              <li><i className="icon-payment" /> Payment Methods</li>
              <li><i className="icon-template" /> Invoice Templates</li>
            </ul>
          </div>
          <div className="settings-content">
            <h3>Send Invoice and Payment Notification Emails To</h3>
            <div className="checkbox-group">
              <label><input type="checkbox" defaultChecked /> Students</label>
              <label><input type="checkbox" /> Parents</label>
              <label><input type="checkbox" /> Custom</label>
            </div>
            <button className="settings-save-btn">Save</button>
          </div>
        </div>
      );
    }

    return (
      <div className="content-area">
        <div className="filter-bar">
          <span className="filter"><FaFilter /><span>Filter</span></span>
          <div className="right-actions">
            <span className="status">Active</span>
            <div className="selected-box"><span>0</span><select><option>Selected</option></select></div>
            <IoEllipsisVertical size={20} />
          </div>
        </div>
        <div className="empty-state">
          <svg className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h6M3 9l3-3m0 0l3 3m-3-3v12" /></svg>
          <p>{feesData.length === 0 ? 'No record found.' : 'Records available.'}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fees-container">
      <div className="fees-header">
        <h1>Fees & Invoicing</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Fees & Invoices</button>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab.id); setShowForm(false); }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};

export default FeesAndInvoicing;


