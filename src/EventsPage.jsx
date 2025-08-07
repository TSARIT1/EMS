// EventsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AiOutlineCalendar, AiOutlinePlus, AiOutlineArrowLeft } from 'react-icons/ai';
import axios from 'axios';
import './EventsPage.css';

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Navigate back to /admin/schedules
  const goBack = () => navigate('/admin/schedules-communication');

  useEffect(() => {
    axios.get('/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleEventAdd = (e) => {
    e.preventDefault();
    const form = e.target;

    const newEvent = {
      title: form.title.value,
      description: form.description.value,
      start: `${form.startDate.value}T${form.startTime.value}`,
      end: `${form.endDate.value}T${form.endTime.value}`,
      location: form.location.value,
      color: form.color.value
    };

    axios.post('/api/events', newEvent)
      .then(response => {
        setEvents([...events, response.data]);
        form.reset();
      })
      .catch(error => {
        console.error('Error adding event:', error);
      });
  };

  return (
    <div className="events-page">
      {/* Left: Calendar */}
      <div className="calendar-section">
        <div className="top-bar">
          <button className="back-button" onClick={goBack}>
            <AiOutlineArrowLeft size={18} /> Back
          </button>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          events={events}
        />
      </div>

      {/* Right: Add Event Form */}
      <div className="form-section">
        <div className="form-header">
          <AiOutlineCalendar size={20} style={{ marginRight: '8px' }} />
          <h3>Add Event</h3>
        </div>

        <form onSubmit={handleEventAdd}>
          <input name="title" placeholder="Title" required />
          <textarea name="description" placeholder="Description" required />

          <label>Start Date</label>
          <input name="startDate" type="date" required />

          <label>End Date</label>
          <input name="endDate" type="date" required />

          <label>Start Time</label>
          <input name="startTime" type="time" required />

          <label>End Time</label>
          <input name="endTime" type="time" required />

          <label>Location</label>
          <input name="location" placeholder="Location" />

          <label>Color</label>
          <input name="color" type="color" defaultValue="#ff0000" />

          <button type="submit" className="add-button">
            <AiOutlinePlus /> Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventsPage;

