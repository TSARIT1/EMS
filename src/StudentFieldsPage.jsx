import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCreditCard,
  FaExchangeAlt,
  FaFilter,
  FaDownload,
  FaUserFriends,
  FaCogs,
  FaRegSmile,
  FaKey,
  FaBell
  // ...import other icons as needed
} from "react-icons/fa";
import "./StudentFieldsPage.css";

const iconMap = {
  "Manage Org. Profile": <FaUserFriends />,
  Billing: <FaCreditCard />,
  "Import/Export Data": <FaDownload />,
  "Self Registration": <FaKey />,
  "Students Alerts": <FaBell />,
  // Add more mappings as needed
};

const StudentFieldsPage = () => {
  const [selected, setSelected] = useState("");
  const [activeBillingTab, setActiveBillingTab] = useState("Modules");
  
  const [coreModules, setCoreModules] = useState([]);
  const [addonModules, setAddonModules] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  
  const menuItems = [
    "Manage Org. Profile",
    "Billing",
    "Import/Export Data",
    "Self Registration",
    "Students Alerts",
    "Email SMTP Settings",
    "Email Templates",
    "SMS Templates",
    "WhatsApp Templates",
    "Terminologies",
    "Multilingual",
    "White Label",
    "User Portal",
    "Modules On/Off",
    "Payment Gateways",
    "Apps",
    "AI Settings",
    "APIs",
  ];

  useEffect(() => {
    if (selected === "Billing") {
      fetchModules();
      fetchPayments(activeBillingTab);
    }
  }, [selected, activeBillingTab]);

  const fetchModules = async () => {
    try {
      const res = await axios.get("/api/billing/modules");
      setCoreModules(res.data.core || []);
      setAddonModules(res.data.addon || []);
    } catch (err) {
      console.error("Error loading modules:", err);
      setCoreModules([]);
      setAddonModules([]);
    }
  };

  const fetchPayments = async () => {
    try {
      const type = activeBillingTab === "Payments History" ? "payments" : "modules";
      const res = await axios.get(`/api/billing/${type}`, {
        params: { method: activeBillingTab.includes("Credit Card") ? "credit" : "bank" }
      });
      setPaymentHistory(res.data || []);
    } catch (err) {
      console.error("Error loading payments:", err);
      setPaymentHistory([]);
    }
  };

  return (
    <div className="student-settings-page">
      <aside className="left-panel">
        <h2>👥 Student Settings</h2>
        <div className="settings-list">
          {menuItems.map((label) => (
            <div
              key={label}
              className={`settings-item ${selected === label ? "active" : ""}`}
              onClick={() => {
                setSelected(label);
                setActiveBillingTab("Modules");
              }}
            >
              <span className="icon">{iconMap[label] || "🔧"}</span>
              <span className="label">{label}</span>
            </div>
          ))}
        </div>
      </aside>

      <section className="right-panel">
        {selected === "Billing" && (
          <>
            <nav className="billing-buttons">
              {["Modules", "Payments History", "Payment Settings"].map((tab) => (
                <button
                  key={tab}
                  className={activeBillingTab === tab ? "active" : ""}
                  onClick={() => setActiveBillingTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {activeBillingTab === "Modules" && (
              <div className="modules-details">
                <div className="core-modules-box">
                  <header>
                    <strong>Core Modules</strong>
                    <div className="meta">
                      <span>Plan: {coreModules.plan || "-"}</span>
                      <span>Expires: {coreModules.expiry || "-"}</span>
                    </div>
                  </header>
                  <p>Active: {coreModules.activeCount || 0} | Alumni: {coreModules.alumniCount || 0}</p>
                </div>

                <div className="addon-modules-box">
                  <strong>Add-on Modules</strong>
                  <p>Add-on modules can be subscribed separately...</p>
                  <table className="modules-table">
                    <thead>
                      <tr>
                        <th>Name</th><th>Status</th><th>Freq.</th><th>Expires</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addonModules.map((m, i) => (
                        <tr key={i}>
                          <td>{m.name}</td>
                          <td>{m.status}</td>
                          <td>{m.frequency}</td>
                          <td>{m.expires}</td>
                          <td><button>Edit</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeBillingTab === "Payments History" && (
              <div className="payment-history">
                <nav>
                  <button className="active"><FaCreditCard /> Credit Card</button>
                  <button><FaExchangeAlt /> Bank Transfers</button>
                </nav>
                <div className="payment-actions">
                  <FaFilter /><FaDownload />
                </div>
                {!paymentHistory.length ? (
                  <div className="no-record"><FaRegSmile /> <p>No transactions found.</p></div>
                ) : (
                  <table className="payment-table">
                    <thead>
                      <tr><th>Date</th><th>Amount</th><th>Method</th></tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((p,i) => (
                        <tr key={i}>
                          <td>{p.date}</td><td>{p.amount}</td><td>{p.method}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeBillingTab === "Payment Settings" && (
              <div><h4>Payment Settings options to configure...</h4></div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default StudentFieldsPage;

