import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/events/my-events', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching my events:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchMyEvents();
    }
  }, [user]);

  if (loading) return <div className="loading">Loading your events...</div>;

  return (
    <div className="my-events">
      <h2>My Registered Events</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <div className="event-date-badge">
              {new Date(event.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <h3>{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <div className="event-details">
              <p>
                <i className="far fa-calendar"></i>
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {event.location}
              </p>
              <p>
                <i className="fas fa-users"></i>
                {event.capacity} attendees
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="no-events">
          <p>You haven't registered for any events yet</p>
        </div>
      )}
    </div>
  );
}

export default MyEvents;