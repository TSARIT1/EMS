import React, { useState } from "react";
import "./StudentFieldsPage.css";

import { FaCreditCard, FaExchangeAlt, FaFilter, FaDownload } from "react-icons/fa";

const StudentFieldsPage = () => {
  const [selected, setSelected] = useState("");
  const [activeBillingTab, setActiveBillingTab] = useState("Modules");

  const menuItems = [
    { icon: "✏️", label: "Manage Org. Profile" },
    { icon: "🔢", label: "Billing" },
    { icon: "⬆️", label: "Import/Export Data" },
    { icon: "📋", label: "Self Registration" },
    { icon: "⚠️", label: "Students Alerts" },
    { icon: "📤", label: "Email SMTP Settings" },
    { icon: "✉️", label: "Email Templates" },
    { icon: "📱", label: "SMS Templates" },
    { icon: "🟢", label: "WhatsApp Templates" },
    { icon: "🔤", label: "Terminologies" },
    { icon: "🌐", label: "Multilingual" },
    { icon: "🎨", label: "White Label" },
    { icon: "👤", label: "User Portal" },
    { icon: "👁️‍🗨️", label: "Modules On/Off" },
    { icon: "💳", label: "Payment Gateways" },
    { icon: "☁️", label: "Apps" },
    { icon: "🧠", label: "AI Settings" },
    { icon: "🔁", label: "APIs" },
  ];

  return (
    <div className="student-settings-page">
      <div className="left-panel">
        <h2>👥 Students Settings Panel</h2>
        <div className="settings-list">
          {menuItems.map((item, idx) => (
            <div
              className={`settings-item ${selected === item.label ? "active" : ""}`}
              key={idx}
              onClick={() => setSelected(item.label)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="right-panel">
        {selected === "Billing" && (
          <>
            <div className="billing-buttons">
              {["Modules", "Payments History", "Payment Settings"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-button ${activeBillingTab === tab ? "active" : ""}`}
                  onClick={() => setActiveBillingTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeBillingTab === "Modules" && (
              <div className="modules-details">
                <div className="core-modules-box">
                  <div className="core-header">
                    <strong>Core Modules</strong>
                    <div className="core-right">
                      <div>
                        <span>Active Plan</span>
                        <br />
                        <strong>-</strong>
                      </div>
                      <div>
                        <span>Expired On</span>
                        <br />
                        <strong></strong>
                      </div>
                      <div className="arrow">▼</div>
                    </div>
                  </div>
                  <div className="core-subtext">
                    Active Students: 0 | Alumni Students: 0
                  </div>
                </div>

                <div className="addon-modules-box">
                  <strong>Addon Modules</strong>
                  <p className="addon-desc">
                    Add-on Modules are advanced features that your education institution can subscribe.
                    You pay only for activation and not on students numbers.
                  </p>
                  <table className="modules-table">
                    <thead>
                      <tr>
                        <th>Modules</th>
                        <th>Status</th>
                        <th>Frequency</th>
                        <th>Expires</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Empty as per the provided image */}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeBillingTab === "Payments History" && (
              <div className="payment-history">
                <div className="payment-tabs">
                  <button className="payment-tab active">
                    <FaCreditCard /> Credit Card
                  </button>
                  <button className="payment-tab">
                    <FaExchangeAlt /> Bank Transfers
                  </button>
                </div>
                <div className="payment-actions">
                  <FaFilter className="icon-btn" title="Filter" />
                  <FaDownload className="icon-btn" title="Download" />
                </div>
                <div className="no-record">
                  <div className="no-icon">💬</div>
                  <p>No record found.</p>
                </div>
              </div>
            )}

            {activeBillingTab === "Payment Settings" && (
              <div>
                <h4>Payment Settings View</h4>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentFieldsPage; 

