import React, { useState } from 'react';
import axios from 'axios';
import { FaFilter, FaInbox, FaBook } from 'react-icons/fa';
import './BooksPage.css';

const BooksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    isbn: '',
    price: '',
    stock: '',
    availability: '',
    daysLimit: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/books', formData);
      alert('Book added successfully!');
      setFormData({
        name: '',
        author: '',
        isbn: '',
        price: '',
        stock: '',
        availability: '',
        daysLimit: '',
        description: ''
      });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to submit book:', err);
      alert('Error adding book. Please try again.');
    }
  };

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
          <span className="filter-link">
            <FaFilter style={{ marginRight: '5px' }} /> Filter
          </span>
          <div className="no-record">
            <div className="icon">
              <FaInbox size={30} />
            </div>
            <p>No record found.</p>
          </div>
        </div>
      ) : (
        <div className="form-container">
          <form className="book-form" onSubmit={handleSubmit}>
            <div className="left-column">
              <div className="book-image"></div>
            </div>
            <div className="right-column">
              <h3>
                <FaBook style={{ marginRight: '6px' }} />
                Book Details
              </h3>
              <div className="form-grid">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Book Name *" required />
                <input name="author" value={formData.author} onChange={handleChange} placeholder="Book Author" />
                <input name="isbn" value={formData.isbn} onChange={handleChange} placeholder="Book ISBN" />
                <input name="price" value={formData.price} onChange={handleChange} placeholder="Book Price *" required />
                <input name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock *" required />
                <select name="availability" value={formData.availability} onChange={handleChange} required>
                  <option value="">Select Availability</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
                <input name="daysLimit" value={formData.daysLimit} onChange={handleChange} placeholder="Days Limit for Check-in" />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
              />
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


