import React, { useState } from 'react';
import './BooksPage.css';

const BooksPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="books-container">
      <div className="books-header">
        <h2>Books</h2>
        <button className="add-button" onClick={() => setShowForm(true)}>
          + Add Books
        </button>
      </div>

      {!showForm ? (
        <div className="books-content">
          <span className="filter-link">🔍Filter</span>
          <div className="no-record">
            <div className="icon">📭</div>
            <p>No record found.</p>
          </div>
        </div>
      ) : (
        <div className="form-container">
          <form className="book-form">
            <div className="left-column">
              <div className="book-image"></div>
            </div>
            <div className="right-column">
              <h3>📖 Books Details</h3>
              <div className="form-grid">
                <input placeholder="Books Name *" required />
                <input placeholder="Books Author" />
                <input placeholder="Books ISBN" />
                <input placeholder="Books Price *" required />
                <input placeholder="Stock *" required />
                <select required>
                  <option value="">Select Availability</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
                <input placeholder="Days Limit for Check-in" />
              </div>
              <textarea placeholder="Description" />
              <div className="form-buttons">
                <button type="submit" className="save">Save</button>
                <button type="button" className="cancel" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
