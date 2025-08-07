import React, { useState } from 'react';
import axios from 'axios';
import './BooksPage.css';

const BooksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    book_name: '',
    books_author: '',
    books_isbn: '',
    books_price: '',
    stock: '',
    select_availability: '',
    days_limit_for_check_in: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/books/', formData);
      
      if (response.status === 200 || response.status === 201) {
        alert('Book saved successfully!');
        setShowForm(false);
        setFormData({
          book_name: '',
          books_author: '',
          books_isbn: '',
          books_price: '',
          stock: '',
          select_availability: '',
          days_limit_for_check_in: '',
          description: '',
        });
      }
    } catch (error) {
      console.error('Error saving book:', error);
      setError(error.response?.data?.message || 'Error saving book. Please try again.');
      alert(error.response?.data?.message || 'Error saving book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="books-container">
      <div className="books-header">
        <h2>Books</h2>
        <button 
          className="add-button" 
          onClick={() => setShowForm(true)}
          disabled={isLoading}
        >
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
          {error && <div className="error-message">{error}</div>}
          <form className="book-form" onSubmit={handleSubmit}>
            <div className="left-column">
              <div className="book-image"></div>
            </div>
            <div className="right-column">
              <h3>📖 Books Details</h3>
              <div className="form-grid">
                <input 
                  name="book_name" 
                  value={formData.book_name} 
                  onChange={handleChange} 
                  placeholder="Books Name *" 
                  required 
                  disabled={isLoading}
                />
                <input 
                  name="books_author" 
                  value={formData.books_author} 
                  onChange={handleChange} 
                  placeholder="Books Author" 
                  disabled={isLoading}
                />
                <input 
                  name="books_isbn" 
                  value={formData.books_isbn} 
                  onChange={handleChange} 
                  placeholder="Books ISBN" 
                  disabled={isLoading}
                />
                <input 
                  type="number" 
                  name="books_price" 
                  value={formData.books_price} 
                  onChange={handleChange} 
                  placeholder="Books Price *" 
                  required 
                  disabled={isLoading}
                />
                <input 
                  type="number" 
                  name="stock" 
                  value={formData.stock} 
                  onChange={handleChange} 
                  placeholder="Stock *" 
                  required 
                  disabled={isLoading}
                />
                <select 
                  name="select_availability" 
                  value={formData.select_availability} 
                  onChange={handleChange} 
                  required 
                  disabled={isLoading}
                >
                  <option value="">Select Availability</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
                <input 
                  name="days_limit_for_check_in" 
                  value={formData.days_limit_for_check_in} 
                  onChange={handleChange} 
                  placeholder="Days Limit for Check-in" 
                  disabled={isLoading}
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                disabled={isLoading}
              />
              <div className="form-buttons">
                <button 
                  type="submit" 
                  className="save" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button 
                  type="button" 
                  className="cancel" 
                  onClick={() => setShowForm(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BooksPage;